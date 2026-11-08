import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { resolve, dirname } from 'node:path'
import satori from 'satori'

const __dirname = dirname(fileURLToPath(import.meta.url))
const asset = (name: string) => readFileSync(resolve(__dirname, 'assets', name))

// Les polices du site ferrislabs.fr : Space Grotesk pour les titres,
// Silkscreen (bitmap) pour les étiquettes. Satori ne lit pas le woff2.
const spaceMedium = asset('SpaceGrotesk-Medium.ttf')
const spaceSemiBold = asset('SpaceGrotesk-SemiBold.ttf')
const silkscreen = asset('Silkscreen-Regular.woff')

export const PIXEL_CARD_WIDTH = 1200
export const PIXEL_CARD_HEIGHT = 630

export interface PixelCardProduct {
  name: string
  /** SVG complet du personnage du bloc. */
  sprite: string
  /** Couleur du bloc et sa face éclairée. */
  color: string
  light: string
}

export interface PixelCardOptions {
  /** Nom de la marque, en haut à gauche à côté du logo. */
  brand: string
  /** Petite étiquette au-dessus du titre, en police bitmap. */
  eyebrow: string
  /** Le titre, une entrée par ligne ; la dernière est en couleur d'accent. */
  lines: string[]
  /** Mention sous le titre (pour un article : le chapô). Optionnelle. */
  lede?: string
  /** Ligne basse, à côté du domaine : auteur et date d'un article. Optionnelle. */
  meta?: string
  /** Taille du titre. 64 par défaut ; descendre pour les titres longs. */
  titleSize?: number
  /** La dernière ligne du titre en orange. Vrai par défaut. */
  accent?: boolean
  /** Domaine affiché en bas. */
  site: string
  /** SVG complets : le logo, et les accessoires du chantier. */
  mark: string
  crab: string
  cone: string
  barrier: string
  /**
   * Les produits, du bas de la tour vers le haut. Le dernier est celui que la
   * grue est en train de poser.
   */
  products: PixelCardProduct[]
}

const BG = '#0e0c0b'
const FG = '#f3eee9'
const MUTED = '#a8a09a'
const RULE = '#2a2422'
const ACCENT = '#f2670f'

const dataUri = (svg: string) => `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`

/** La grue en treillis et les immeubles du fond, en un SVG (resvg sait les motifs). */
function backdrop() {
  const lattice = 'fill="url(#l)" stroke="#f3eee9" stroke-opacity="0.28" stroke-width="2"'
  const skyline = [
    [20, 150, 90],
    [120, 220, 70],
    [200, 120, 60],
    [420, 180, 80],
    [500, 260, 60],
  ]
    .map(([x, h, w]) => `<rect x="${x}" y="${600 - h}" width="${w}" height="${h}" fill="#f3eee9" fill-opacity="0.045"/>`)
    .join('')
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 580 630" shape-rendering="crispEdges">
<defs><radialGradient id="glow" cx="0.7" cy="0.2" r="0.6"><stop offset="0" stop-color="#f2670f" stop-opacity="0.22"/><stop offset="1" stop-color="#f2670f" stop-opacity="0"/></radialGradient><pattern id="l" width="12" height="12" patternUnits="userSpaceOnUse"><path d="M0 0 L12 12 M12 0 L0 12" stroke="#f3eee9" stroke-opacity="0.28" stroke-width="2"/></pattern></defs>
<rect x="0" y="0" width="580" height="630" fill="url(#glow)"/>
${skyline}
<rect x="448" y="104" width="22" height="496" ${lattice}/>
<rect x="60" y="104" width="480" height="18" ${lattice}/>
<rect x="500" y="122" width="40" height="34" fill="#f3eee9" fill-opacity="0.3"/>
<rect x="440" y="122" width="38" height="28" fill="#f2670f" fill-opacity="0.75"/>
<rect x="253" y="122" width="34" height="10" fill="#f3eee9" fill-opacity="0.5"/>
<rect x="269" y="132" width="2" height="84" fill="#f3eee9" fill-opacity="0.5"/>
<rect x="255" y="216" width="30" height="8" fill="#f3eee9" fill-opacity="0.6"/>
<rect x="0" y="600" width="580" height="2" fill="#f3eee9" fill-opacity="0.25"/>
<rect x="0" y="610" width="580" height="2" fill="#f3eee9" fill-opacity="0.12"/>
</svg>`
}

/**
 * La carte de partage dans la direction artistique de ferrislabs.fr. À gauche
 * le titre et les produits ; à droite le chantier : une grue qui pose les
 * produits en tour, le dernier encore au bout du câble, et le crabe qui
 * surveille, entre cônes et barrière.
 */
export async function generateBrandCard(options: PixelCardOptions): Promise<string> {
  const mark = dataUri(options.mark)
  const lastIndex = options.lines.length - 1
  // Tour : chaque bloc un peu plus étroit que celui du dessous.
  const tower = options.products.map((product, i) => {
    const hanging = i === options.products.length - 1
    const width = 262 - i * 20
    const height = 92
    const left = 699 + (262 - width) / 2
    // Le bloc suspendu pend sous le crochet de la grue (x 830, y 224).
    const top = hanging ? 224 : 600 - height * (i + 1) - i * 2
    return { product, width, height, left, top, hanging }
  })

  return satori(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        position: 'relative',
        backgroundColor: BG,
        color: FG,
        fontFamily: 'Space Grotesk',
      }}
    >
      {/* Filets de la grille du site */}
      <div style={{ position: 'absolute', left: 60, top: 0, bottom: 0, width: 1, backgroundColor: RULE }} />
      <div style={{ position: 'absolute', right: 60, top: 0, bottom: 0, width: 1, backgroundColor: RULE }} />

      {/* Le chantier : fond, grue, tour de produits, accessoires */}
      <img src={dataUri(backdrop())} width={580} height={630} style={{ position: 'absolute', left: 560, top: 0 }} />

      {/* Ombre des blocs posés : un calque décalé, `boxShadow` noircit un coin de la carte avec Satori. */}
      {tower
        .filter((block) => !block.hanging)
        .map(({ product, width, height, left, top }) => (
          <div
            key={`${product.name}-shadow`}
            style={{ position: 'absolute', left: left + 8, top: top + 8, width, height, backgroundColor: 'rgba(0,0,0,0.35)' }}
          />
        ))}
      {tower.map(({ product, width, height, left, top }) => (
        <div
          key={product.name}
          style={{
            position: 'absolute',
            left,
            top,
            width,
            height,
            display: 'flex',
            alignItems: 'center',
            padding: '0 16px',
            backgroundColor: product.color,
            borderTop: `8px solid ${product.light}`,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 56, height: 56, backgroundColor: '#fdf6ec' }}>
            <img src={dataUri(product.sprite)} width={40} height={32} style={{ objectFit: 'contain' }} />
          </div>
          <span style={{ marginLeft: 14, fontFamily: 'Silkscreen', fontSize: 17, color: '#ffffff' }}>{product.name}</span>
        </div>
      ))}

      {/* Le crabe surveille le chantier, perché sur la pile de tuiles */}
      <div style={{ position: 'absolute', left: 1052, top: 482, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img src={dataUri(options.crab)} width={58} height={58} />
        <div style={{ display: 'flex' }}>
          <div style={{ width: 30, height: 30, backgroundColor: '#ffb547' }} />
          <div style={{ width: 30, height: 30, backgroundColor: '#f2670f' }} />
        </div>
        <div style={{ display: 'flex' }}>
          <div style={{ width: 30, height: 30, backgroundColor: '#d9480f' }} />
          <div style={{ width: 30, height: 30, backgroundColor: '#ffb547' }} />
        </div>
      </div>
      <img src={dataUri(options.cone)} width={40} height={40} style={{ position: 'absolute', left: 964, top: 560 }} />
      <img src={dataUri(options.barrier)} width={92} height={42} style={{ position: 'absolute', left: 612, top: 558 }} />

      {/* Barre du haut, comme la navbar */}
      <div style={{ position: 'absolute', left: 84, top: 44, display: 'flex', alignItems: 'center', fontSize: 30, fontWeight: 600 }}>
        <img src={mark} width={34} height={34} style={{ marginRight: 14 }} />
        {options.brand}
      </div>

      {/* Le texte */}
      <div style={{ position: 'absolute', left: 84, top: 168, width: 580, display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontFamily: 'Silkscreen', fontSize: 18, color: ACCENT, letterSpacing: '0.06em' }}>{options.eyebrow}</span>
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: 18, fontSize: options.titleSize ?? 64, fontWeight: 500, lineHeight: 1.04, letterSpacing: '-0.04em' }}>
          {options.lines.map((line, i) => (
            <span key={line} style={{ color: options.accent !== false && i === lastIndex ? ACCENT : FG }}>
              {line}
            </span>
          ))}
        </div>
        {options.lede ? (
          <span style={{ marginTop: 26, fontSize: 24, lineHeight: 1.35, color: MUTED, display: 'block', maxHeight: 96, overflow: 'hidden' }}>{options.lede}</span>
        ) : (
        <div style={{ display: 'flex', marginTop: 34 }}>
          {[...options.products].reverse().map((product) => (
            <div
              key={product.name}
              style={{ display: 'flex', alignItems: 'center', marginRight: 12, padding: '8px 14px 8px 10px', border: `1px solid ${RULE}`, backgroundColor: '#161312' }}
            >
              <img src={dataUri(product.sprite)} width={30} height={24} style={{ objectFit: 'contain' }} />
              <span style={{ marginLeft: 10, fontSize: 21, fontWeight: 500 }}>{product.name}</span>
            </div>
          ))}
        </div>
        )}
      </div>

      <span style={{ position: 'absolute', left: 84, bottom: 40, fontFamily: 'Silkscreen', fontSize: 18, color: MUTED }}>
        {options.meta ? `${options.meta}  ·  ${options.site}` : options.site}
      </span>
    </div>,
    {
      width: PIXEL_CARD_WIDTH,
      height: PIXEL_CARD_HEIGHT,
      fonts: [
        { name: 'Space Grotesk', data: spaceMedium, weight: 500 },
        { name: 'Space Grotesk', data: spaceSemiBold, weight: 600 },
        { name: 'Silkscreen', data: silkscreen, weight: 400 },
      ],
    },
  )
}
