import { useEffect, useLayoutEffect, useRef, useState } from 'react'

interface Square {
  col: number
  row: number
  colorClass: string
}

const GRID = 56
const SIZE = GRID
const COUNT = 10
const COLORS = [
  'bg-primary/30',
  'bg-primary/20',
  'bg-primary/45',
  'bg-orange-400/25',
  'bg-amber-400/20',
]
const DIRECTIONS = [
  { dc: 0, dr: -1 },
  { dc: 0, dr: 1 },
  { dc: -1, dr: 0 },
  { dc: 1, dr: 0 },
]

function randomCell(cols: number, rows: number) {
  return {
    col: Math.floor(Math.random() * cols),
    row: Math.floor(Math.random() * rows),
  }
}

function makeSquares(cols: number, rows: number): Square[] {
  return Array.from({ length: COUNT }, (_, i) => ({
    ...randomCell(cols, rows),
    colorClass: COLORS[i % COLORS.length],
  }))
}

export function BackgroundAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dims, setDims] = useState({ cols: 12, rows: 8 })
  const [squares, setSquares] = useState<Square[]>(() => makeSquares(12, 8))
  const [ready, setReady] = useState(false)
  const hasMeasured = useRef(false)

  useLayoutEffect(() => {
    function measure() {
      const el = containerRef.current
      if (!el) return
      const cols = Math.max(4, Math.ceil(el.offsetWidth / GRID))
      const rows = Math.max(4, Math.ceil(el.offsetHeight / GRID))
      setDims({ cols, rows })
      setSquares(makeSquares(cols, rows))
      hasMeasured.current = true
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  useEffect(() => {
    if (!hasMeasured.current) return
    const id = requestAnimationFrame(() => setReady(true))
    return () => cancelAnimationFrame(id)
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!squares.length) return

    const timers = squares.map((_, i) =>
      setInterval(
        () => {
          setSquares((prev) =>
            prev.map((sq, j) => {
              if (j !== i) return sq
              const { dc, dr } = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)]
              return {
                ...sq,
                col: Math.min(dims.cols - 1, Math.max(0, sq.col + dc)),
                row: Math.min(dims.rows - 1, Math.max(0, sq.row + dr)),
              }
            }),
          )
        },
        900 + i * 250 + Math.random() * 600,
      ),
    )

    return () => timers.forEach(clearInterval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [squares.length, dims.cols, dims.rows])

  return (
    <div ref={containerRef} className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {squares.map((sq, i) => (
        <div
          key={i}
          className={`absolute ${sq.colorClass} ${ready ? 'transition-transform ease-in-out duration-700' : ''}`}
          style={{
            width: SIZE,
            height: SIZE,
            transform: `translate3d(${sq.col * GRID + (GRID - SIZE) / 2}px, ${sq.row * GRID + (GRID - SIZE) / 2}px, 0)`,
          }}
        />
      ))}
    </div>
  )
}
