import type { Sprite } from '../components/pixel/sprites'
import {
  abyssSprite,
  aegisSprite,
  compassSprite,
  seawatchSprite,
  tridentSprite,
  webhooksSprite,
} from '../components/pixel/sprites'

/** Le pixel art de chaque module, indexé par son slug. */
export const moduleSprites: Record<string, Sprite> = {
  trident: tridentSprite,
  seawatch: seawatchSprite,
  compass: compassSprite,
  abyss: abyssSprite,
  aegis: aegisSprite,
  webhooks: webhooksSprite,
}
