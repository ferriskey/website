import * as culori from 'culori'

const DEFAULT_PRIMARY_COLOR = 'oklch(0.707 0.217 293)'

export function resolveTailwindColor(value: string): string {
  if (/^\d+\s+\d+\s+\d+$/.test(value)) {
    return `rgb(${value})`
  }

  if (value.startsWith('oklch(')) {
    const parsed = culori.parse(value)
    if (parsed) {
      return culori.formatHex(parsed)
    }
  }

  return value
}

export function resolveColor(color?: string): string {
  return resolveTailwindColor(color ?? DEFAULT_PRIMARY_COLOR)
}
