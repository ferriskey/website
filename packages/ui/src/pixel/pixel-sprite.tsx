import type { Sprite } from './sprites'

/**
 * Dessine un sprite en SVG net (crispEdges). La taille vient de la classe : le
 * viewBox suit la grille, donc un pixel du sprite reste un carré parfait.
 */
export function PixelSprite({
  sprite,
  className,
  title,
  x,
  y,
  width: w,
  height: h,
}: {
  sprite: Sprite
  className?: string
  /** Placement quand le sprite est imbriqué dans un autre SVG. */
  x?: number
  y?: number
  width?: number
  height?: number
  /** Sans titre, le sprite est décoratif et masqué aux lecteurs d'écran. */
  title?: string
}) {
  const width = Math.max(...sprite.rows.map((r) => r.length))
  const height = sprite.rows.length

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      x={x}
      y={y}
      width={w}
      height={h}
      shapeRendering="crispEdges"
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {sprite.rows.flatMap((row, y) =>
        [...row].map((char, x) =>
          char === '.' ? null : (
            <rect key={`${x}-${y}`} x={x} y={y} width={1.02} height={1.02} fill={sprite.palette[char]} />
          ),
        ),
      )}
    </svg>
  )
}
