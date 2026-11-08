/**
 * Les sprites du site, dessinés à la main sur une grille. Une ligne par rangée
 * de pixels, un caractère par pixel, « . » pour transparent. La palette dit
 * quelle couleur prend chaque caractère.
 *
 * Le crabe reprend exactement public/logo.svg (9 × 9) : c'est l'unité de base
 * de toute la direction artistique.
 */
export interface Sprite {
  rows: string[]
  palette: Record<string, string>
}

const RUST = { D: '#a83e08', O: '#f2670f', E: '#1c1917' }

export const crab: Sprite = {
  rows: [
    '.........',
    '..D...D..',
    '.DD...DD.',
    '.D.E.E.D.',
    '.DOOOOOD.',
    'OOOOOOOOO',
    '.OOOOOOO.',
    'D.OOOOO.D',
    '.........',
  ],
  palette: RUST,
}

/** Ferriskey : une clé dorée. */
export const key: Sprite = {
  rows: [
    '.GGG.......',
    'GYYYG......',
    'GY.YGGGGGGG',
    'GYYYGYYYYYG',
    '.GGG...G.GG',
    '.......G.G.',
  ],
  palette: { G: '#b7791f', Y: '#f3b544' },
}

const MOD = { O: '#3b6cf0', D: '#1e3a8a', Y: '#bcd2ff' }

/** Compass : le moteur de flux d'authentification. */
export const compassSprite: Sprite = {
  rows: ['..OOOOO..', '.O.....O.', 'O.....Y.O', 'O....YY.O', 'O...DD..O', 'O.YYD...O', 'O.Y.....O', '.O.....O.', '..OOOOO..'],
  palette: MOD,
}

/** Trident : l'authentification multi-facteurs. */
export const tridentSprite: Sprite = {
  rows: ['O...O...O', 'O...O...O', 'O...O...O', 'OO..O..OO', '.OOOOOOO.', '....O....', '....O....', '....O....', '....O....'],
  palette: MOD,
}

/** Abyss : la fédération d'identités, deux cadres qui s'emboîtent. */
export const abyssSprite: Sprite = {
  rows: ['.........', '.OOOOO...', '.O...O...', '.O..DDDDD', '.OOODO..D', '....D...D', '....D...D', '....DDDDD', '.........'],
  palette: MOD,
}

/** Aegis : le bouclier des scopes et des mappers. */
export const aegisSprite: Sprite = {
  rows: ['OOOOOOOOO', 'ODDDYDDDO', 'ODDDYDDDO', 'OYYYYYYYO', 'ODDDYDDDO', '.ODDYDDO.', '..ODYDO..', '...ODO...', '....O....'],
  palette: MOD,
}

/** SeaWatch : l'œil de l'audit. */
export const seawatchSprite: Sprite = {
  rows: ['.........', '..OOOOO..', '.O.....O.', 'O..DDD..O', 'O.DYYYD.O', 'O..DDD..O', '.O.....O.', '..OOOOO..', '.........'],
  palette: MOD,
}

/** Webhooks : l'éclair des événements. */
export const webhooksSprite: Sprite = {
  rows: ['.....OO..', '....OO...', '...OO....', '..OOOOO..', '....OO...', '...OO....', '..OO.....', '.OO......', '.........'],
  palette: MOD,
}

/** Chariot élévateur, tourné vers la droite : le mât et les fourches sont à droite. */
export const forklift: Sprite = {
  rows: [
    '.........D..',
    '.........D..',
    '.OOOOOO..D..',
    '.OWWWWO..D..',
    '.OWWWWOOOD..',
    '.OOOOOOOOD..',
    '.OOOOOOOODDD',
    '..KKK..KKK..',
    '..KKK..KKK..',
  ],
  palette: { O: '#f2670f', D: '#7a2d06', W: '#bcd2ff', K: '#1c1917' },
}

/** Camion de livraison, cabine à droite. */
export const truck: Sprite = {
  rows: [
    'DDDDDDDDDDDDD.......',
    'DOOOOOOOOOOOD.......',
    'DOOOOOOOOOOOD.DDDD..',
    'DOOOYYYYYOOOD.DWWDD.',
    'DOOOOOOOOOOODDDWWDDD',
    'DOOOOOOOOOOODDDDDDDD',
    'DDDDDDDDDDDDDDDDDDDD',
    '..KKK.......KKK.KKK.',
    '..KKK.......KKK.KKK.',
  ],
  palette: { O: '#ffb547', D: '#7a2d06', Y: '#f2670f', W: '#bcd2ff', K: '#1c1917' },
}

/** Organizations : un immeuble. */
export const orgSprite: Sprite = {
  rows: ['.OOOOOOO.', '.OYOYOYO.', '.OOOOOOO.', '.OYOYOYO.', '.OOOOOOO.', '.OYOYOYO.', '.OOODOOO.', '.OOODOOO.', 'DDDDDDDDD'],
  palette: { O: '#3b6cf0', D: '#1e3a8a', Y: '#bcd2ff' },
}

/** Politiques Cedar : une feuille avec une coche. */
export const policySprite: Sprite = {
  rows: ['.OOOOOO..', '.O....OO.', '.O.OOO.O.', '.O.....O.', '.O..YY.O.', '.O.YY..O.', '.OYY...O.', '.O.....O.', '.OOOOOOO.'],
  palette: { O: '#3b6cf0', D: '#1e3a8a', Y: '#bcd2ff' },
}

/** Serveur MCP : une prise. */
export const mcpSprite: Sprite = {
  rows: ['..O...O..', '..O...O..', '.OOOOOOO.', '.OYYYYYO.', '.OYYYYYO.', '..OOOOO..', '...OOO...', '...DOD...', '...D.D...'],
  palette: { O: '#3b6cf0', D: '#1e3a8a', Y: '#bcd2ff' },
}

/** Le crabe qui dort, pour le pied de page : yeux fermés, pinces baissées. */
export const crabAsleep: Sprite = {
  rows: ['.........', '.........', '.DD...DD.', '.D.....D.', '.DOEOEOD.', 'OOOOOOOOO', '.OOOOOOO.', 'D.OOOOO.D', '.........'],
  palette: { D: '#a83e08', O: '#f2670f', E: '#1c1917' },
}

/** Cadenas fermé, puis ouvert : l'arrivée de la clé au bout du mot. */
export const padlockClosed: Sprite = {
  rows: ['..OOO..', '.O...O.', '.O...O.', 'OOOOOOO', 'OOODOOO', 'OOODOOO', 'OOOOOOO'],
  palette: { O: '#f3b544', D: '#7a2d06' },
}
export const padlockOpen: Sprite = {
  rows: ['..OOO..', '.O...O.', '.O.....', 'OOOOOOO', 'OOODOOO', 'OOODOOO', 'OOOOOOO'],
  palette: { O: '#f3b544', D: '#7a2d06' },
}
