/**
 * Les sprites des cartes de partage, en SVG autonomes. Une ligne par rangée de
 * pixels, un caractère par pixel, « . » pour transparent. Ce sont les mêmes
 * dessins que ceux de apps/website (hero et sections), recopiés ici parce que
 * ce paquet est partagé avec le blog et les docs.
 */
export interface Sprite {
  rows: string[]
  palette: Record<string, string>
}

const MOD = { O: '#3b6cf0', D: '#1e3a8a', Y: '#bcd2ff' }

export const crab: Sprite = {
  rows: ['.........', '..D...D..', '.DD...DD.', '.D.E.E.D.', '.DOOOOOD.', 'OOOOOOOOO', '.OOOOOOO.', 'D.OOOOO.D', '.........'],
  palette: { D: '#a83e08', O: '#f2670f', E: '#1c1917' },
}
export const key: Sprite = {
  rows: ['.GGG.......', 'GYYYG......', 'GY.YGGGGGGG', 'GYYYGYYYYYG', '.GGG...G.GG', '.......G.G.'],
  palette: { G: '#b7791f', Y: '#f3b544' },
}
export const compass: Sprite = {
  rows: ['..OOOOO..', '.O.....O.', 'O.....Y.O', 'O....YY.O', 'O...DD..O', 'O.YYD...O', 'O.Y.....O', '.O.....O.', '..OOOOO..'],
  palette: MOD,
}
export const trident: Sprite = {
  rows: ['O...O...O', 'O...O...O', 'O...O...O', 'OO..O..OO', '.OOOOOOO.', '....O....', '....O....', '....O....', '....O....'],
  palette: MOD,
}
export const abyss: Sprite = {
  rows: ['.........', '.OOOOO...', '.O...O...', '.O..DDDDD', '.OOODO..D', '....D...D', '....D...D', '....DDDDD', '.........'],
  palette: MOD,
}
export const aegis: Sprite = {
  rows: ['OOOOOOOOO', 'ODDDYDDDO', 'ODDDYDDDO', 'OYYYYYYYO', 'ODDDYDDDO', '.ODDYDDO.', '..ODYDO..', '...ODO...', '....O....'],
  palette: MOD,
}
export const seawatch: Sprite = {
  rows: ['.........', '..OOOOO..', '.O.....O.', 'O..DDD..O', 'O.DYYYD.O', 'O..DDD..O', '.O.....O.', '..OOOOO..', '.........'],
  palette: MOD,
}
export const cone: Sprite = {
  rows: ['...W...', '..OOO..', '..WWW..', '.OOOOO.', '.WWWWW.', 'OOOOOOO', 'DDDDDDD'],
  palette: { W: '#f5f5f4', O: '#f2670f', D: '#57534e' },
}
export const barrier: Sprite = {
  rows: ['OOWWOOWWOOWWO', 'OOWWOOWWOOWWO', '.D.........D.', '.D.........D.', '.D.........D.', 'DDD.......DDD'],
  palette: { W: '#f5f5f4', O: '#f2670f', D: '#57534e' },
}

/** Un sprite seul, en SVG autonome. */
export function spriteSvg(sprite: Sprite): string {
  const cols = Math.max(...sprite.rows.map((r) => r.length))
  const rows = sprite.rows.length
  const rects = sprite.rows
    .flatMap((row, y) =>
      [...row].map((ch, x) =>
        ch === '.' ? '' : `<rect x="${x * 10}" y="${y * 10}" width="10.3" height="10.3" fill="${sprite.palette[ch]}"/>`,
      ),
    )
    .join('')
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${cols * 10} ${rows * 10}" shape-rendering="crispEdges">${rects}</svg>`
}
