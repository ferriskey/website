import { writeFile, mkdir } from 'node:fs/promises'
import { dirname } from 'node:path'
import { Resvg } from '@resvg/resvg-js'

export async function renderThumbnail(svg: string, width = 960): Promise<Buffer> {
  const resvg = new Resvg(svg, {
    background: 'transparent',
    fitTo: { mode: 'width', value: width },
  })
  const png = resvg.render()
  return png.asPng() as Buffer
}

export async function renderThumbnailToFile(svg: string, outputPath: string, width = 960): Promise<void> {
  const png = await renderThumbnail(svg, width)
  await mkdir(dirname(outputPath), { recursive: true })
  await writeFile(outputPath, png)
}
