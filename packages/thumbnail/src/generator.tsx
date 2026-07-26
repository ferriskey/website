import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { resolve, dirname } from 'node:path'
import satori from 'satori'
import { resolveColor } from './colors'

const __dirname = dirname(fileURLToPath(import.meta.url))

const interRegular = readFileSync(resolve(__dirname, 'assets/Inter-Regular.woff'))
const interSemiBold = readFileSync(resolve(__dirname, 'assets/Inter-SemiBold.woff'))
const interBold = readFileSync(resolve(__dirname, 'assets/Inter-Bold.woff'))

export interface ThumbnailOptions {
  headline?: string
  title: string
  description?: string
  primaryColor?: string
}

// Satori's line-clamp support isn't reliable here (text kept overflowing past the
// intended line count), so length is capped in plain JS instead — deterministic
// regardless of font metrics, and keeps the backing panel sizing predictable.
function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  const cut = text.slice(0, maxLength)
  const lastSpace = cut.lastIndexOf(' ')
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : maxLength)}…`
}

// Light theme, FerrisKey colors — a warm off-white base (same family as the
// feature panels' paper tone) with a crisp white spotlight card on top for contrast.
const BG_COLOR = '#fdf6ec'
const WIDTH = 960
const HEIGHT = 540
const SPOTLIGHT_BG = '#ffffff'
const PIXEL_DARK = '#1c1409'
const PIXEL_LIGHT = '#fde68a'
const TITLE_COLOR = '#1c1409'
const DESCRIPTION_COLOR = '#57534e'

// Uniform mosaic: every drawn tile is the exact same, larger square — no merged/
// bigger squares, just fewer, bigger tiles with generous gaps between them.
const CELL = 120
const COLS = Math.ceil(WIDTH / CELL) // 8
const ROWS = Math.ceil(HEIGHT / CELL) // 5 (last row runs slightly past the canvas, clipped by the svg viewport)

// The spotlight badge takes over this exact grid cell instead of floating at its
// own offset — same size, same position as any other tile in the mosaic.
const SPOTLIGHT_COL = 6
const SPOTLIGHT_ROW = 1

interface MosaicTile {
  x: number
  y: number
  dark: boolean
}

function buildMosaic(): MosaicTile[] {
  const tiles: MosaicTile[] = []
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (r === SPOTLIGHT_ROW && c === SPOTLIGHT_COL) continue // reserved for the spotlight badge
      const hash = (c * 13 + r * 7 + (c % 5) * (r % 3)) % 9
      if (hash < 5) continue // gap: base background shows through — more gaps than tiles
      tiles.push({ x: c * CELL, y: r * CELL, dark: hash < 7 })
    }
  }
  return tiles
}
const MOSAIC = buildMosaic()

// An 8x14 "pixel art" key, drawn as a bitmap — each character is one cell,
// rendered as its own <rect>, the same way a retro app-icon sprite is built.
const KEY_SPRITE = [
  '..KKKK..',
  '.KOOOOK.',
  'KOOHHOOK',
  'KOH..HOK',
  'KOOHHOOK',
  '.KOOOOK.',
  '..KKKK..',
  '...KK...',
  '...KK...',
  '...KKKK.',
  '...KK.K.',
  '...KKKK.',
  '...KK.K.',
  '...KKKK.',
]
const PIXEL_CELL = 8

function pixelIcon(primaryColor: string) {
  const rects: { x: number; y: number; fill: string }[] = []
  KEY_SPRITE.forEach((row, ry) => {
    row.split('').forEach((ch, rx) => {
      if (ch === '.') return
      const fill = ch === 'K' ? PIXEL_DARK : ch === 'H' ? PIXEL_LIGHT : primaryColor
      rects.push({ x: rx * PIXEL_CELL, y: ry * PIXEL_CELL, fill })
    })
  })
  return rects
}

export async function generateThumbnail(options: ThumbnailOptions): Promise<string> {
  const { headline } = options
  const title = truncate(options.title, 50)
  const description = options.description ? truncate(options.description, 130) : undefined
  const primaryColor = resolveColor(options.primaryColor)
  const spotlightSize = CELL - 2
  const spotlightX = SPOTLIGHT_COL * CELL + 1
  const spotlightY = SPOTLIGHT_ROW * CELL + 1
  const iconW = 8 * PIXEL_CELL
  const iconH = 14 * PIXEL_CELL

  return satori(
    <div tw="w-full h-full flex flex-col justify-center" style={{ backgroundColor: BG_COLOR }}>
      {/* Mosaic: square tiles only (60px or 120px), two orange tones, gaps showing the
          cream base through — the same texture language as the feature panels */}
      <svg tw="absolute inset-0" width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`} fill="none">
        {MOSAIC.map((t) => (
          <rect
            x={t.x + 1}
            y={t.y + 1}
            width={CELL - 2}
            height={CELL - 2}
            fill={t.dark ? '#9a3412' : primaryColor}
            fill-opacity={t.dark ? 0.55 : 0.5}
          />
        ))}

        {/* Text backing panel: guarantees contrast for the title/description regardless of
            which mosaic tile happens to fall behind them, instead of relying on luck */}
        <rect x="60" y="70" width="640" height="400" fill={BG_COLOR} fill-opacity="0.9" />

        {/* Small accents in the untouched left margin, echoing the reference cards' scattered glyphs */}
        <circle cx="40" cy="454" r="10" fill="none" stroke={primaryColor} stroke-opacity="0.6" stroke-width="1.6" stroke-dasharray="2.5 2.5" />
        <path d="M 26 508 L 40 486 L 54 508 Z" fill="none" stroke={primaryColor} stroke-opacity="0.6" stroke-width="1.6" stroke-linejoin="round" />
      </svg>

      {/* Spotlight badge: a light card with a pixel-art key, in the clear space the text never reaches */}
      <div
        tw="absolute flex items-center justify-center"
        style={{
          left: spotlightX,
          top: spotlightY,
          width: spotlightSize,
          height: spotlightSize,
          backgroundColor: SPOTLIGHT_BG,
          border: '1px solid rgba(28,20,9,0.08)',
        }}
      >
        <svg width={iconW} height={iconH} viewBox={`0 0 ${iconW} ${iconH}`}>
          {pixelIcon(primaryColor).map((p) => (
            <rect x={p.x} y={p.y} width={PIXEL_CELL} height={PIXEL_CELL} fill={p.fill} />
          ))}
        </svg>
      </div>

      <div tw="flex flex-col w-[580px] pl-[100px]">
        {headline && (
          <p tw="uppercase text-[24px] mb-4" style={{ color: primaryColor, fontWeight: 600 }}>
            {headline}
          </p>
        )}
        <h1
          tw="w-[580px] m-0 text-[62px] font-bold mb-4"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            color: TITLE_COLOR,
            fontWeight: 700,
          }}
        >
          {title}
        </h1>
        {description && (
          <p
            tw="text-[32px] leading-tight"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              color: DESCRIPTION_COLOR,
              opacity: 0.85,
            }}
          >
            {description}
          </p>
        )}
      </div>
    </div>,
    {
      width: 960,
      height: 540,
      fonts: [
        {
          name: 'Inter',
          data: interRegular,
          weight: 400,
        },
        {
          name: 'Inter',
          data: interSemiBold,
          weight: 600,
        },
        {
          name: 'Inter',
          data: interBold,
          weight: 700,
        },
      ],
    },
  )
}
