import { readFileSync } from 'node:fs'
import type { Font } from 'satori'

let data: Buffer | undefined

export function getCjkFonts(text: string): Font[] {
  if (!/\p{Script=Han}/u.test(text)) return []
  data ??= readFileSync(new URL('./assets/NotoSansCJKsc-Regular.otf', import.meta.url))
  return [{ name: 'Noto Sans CJK SC', data, weight: 400, style: 'normal' }]
}
