/**
 * Les cartes de partage de FerrisKey, dans la direction artistique de
 * ferrislabs.fr : fond sombre chaud, filets de la grille, titre à gauche, et à
 * droite un chantier où une grue pose des blocs. Ici les blocs sont les
 * modules de FerrisKey (site) ou les mots-clés de l'article (blog).
 */
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import type { PixelCardOptions, PixelCardProduct } from './card'
import { abyss, aegis, barrier, compass, cone, crab, key, seawatch, spriteSvg, trident, type Sprite } from './sprites'

const SITE = 'ferriskey.rs'

/** Le vrai logo, lu dans public/ de l'app qui construit ; le crabe pixel à défaut. */
function logoSvg(): string {
  try {
    const raw = readFileSync(resolve(process.cwd(), 'public', 'logo.svg'), 'utf8')
    return raw.replace('width="100%" height="100%"', 'width="200" height="216"')
  } catch {
    return spriteSvg(crab)
  }
}

const scene = () => ({
  mark: logoSvg(),
  crab: spriteSvg(crab),
  cone: spriteSvg(cone),
  barrier: spriteSvg(barrier),
})

const block = (name: string, sprite: Sprite, color: string, light: string): PixelCardProduct => ({
  name,
  sprite: spriteSvg(sprite),
  color,
  light,
})

/** La carte du site : le titre du hero et la tour des modules. */
export function siteCard(locale: 'en' | 'fr' = 'en'): PixelCardOptions {
  const fr = locale === 'fr'
  return {
    brand: 'FerrisKey',
    eyebrow: 'IAM · OPEN SOURCE · RUST',
    lines: fr ? ['Un IAM moderne', 'pour vos clients, vos', 'équipes et agents IA.'] : ['A modern IAM', 'for customers, teams', 'and AI agents.'],
    titleSize: fr ? 50 : 52,
    lede: fr ? 'Open source. Auto-hébergé. Écrit en Rust.' : 'Open source. Self-hosted. Built in Rust.',
    site: SITE,
    ...scene(),
    products: [
      block('Compass', compass, '#a83e08', '#ff8c42'),
      block('Trident', trident, '#c2410c', '#ffb547'),
      block('Abyss', abyss, '#7a2d06', '#f2670f'),
      block('SeaWatch', seawatch, '#f2670f', '#ffb547'),
    ],
  }
}

const TAG_SPRITES: Sprite[] = [key, compass, aegis]
const TAG_BLOCKS: Array<[string, string]> = [
  ['#a83e08', '#ff8c42'],
  ['#c2410c', '#ffb547'],
  ['#f2670f', '#ffb547'],
]

export interface ArticleCardInput {
  title: string
  tags?: string[]
  lede?: string
  author?: string
  date?: string
  /** Remplace « FerrisKey Blog » (la documentation passe « FerrisKey Docs »). */
  brand?: string
  /** Remplace l'étiquette « BLOG · tags ». */
  eyebrow?: string
}

function clamp(text: string, max: number): string {
  if (text.length <= max) return text
  const cut = text.slice(0, max)
  const space = cut.lastIndexOf(' ')
  return `${cut.slice(0, space > 0 ? space : max)}…`
}

/** La carte d'un article : son titre, son chapô, et ses mots-clés posés en tour. */
export function articleCard(input: ArticleCardInput): PixelCardOptions {
  const tags = (input.tags ?? []).filter(Boolean).slice(0, 3)
  const names = tags.length ? tags : ['ferriskey']
  const title = clamp(input.title, 90)
  const size = title.length <= 34 ? 64 : title.length <= 60 ? 54 : 46
  const meta = [input.author, input.date].filter(Boolean).join(' · ')
  return {
    brand: input.brand ?? 'FerrisKey Blog',
    eyebrow: (input.eyebrow ?? `BLOG · ${names.slice(0, 2).join(' · ')}`).toUpperCase(),
    lines: [title],
    accent: false,
    titleSize: size,
    lede: input.lede ? clamp(input.lede, 130) : undefined,
    meta: meta || undefined,
    site: SITE,
    ...scene(),
    products: [...names].reverse().map((name, i) => {
      const [color, light] = TAG_BLOCKS[i % TAG_BLOCKS.length]
      const label = name.length > 12 ? name.split(/[-_\s]/)[0] : name
      return block(label.toUpperCase().slice(0, 12), TAG_SPRITES[i % TAG_SPRITES.length], color, light)
    }),
  }
}
