import type { ShikiConfig } from 'astro'
import type { ShikiTransformer } from 'shiki'
import {
  transformerMetaHighlight,
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationFocus,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from '@shikijs/transformers'

function transformerMetaLabel(): ShikiTransformer {
  return {
    name: 'transformer-meta-label',
    pre(node) {
      const meta = this.options.meta as { __raw?: string } | string | undefined
      const metaString = typeof meta === 'string' ? meta : meta?.__raw

      if (!metaString) return

      const match = metaString.match(/\[(.*?)\]/)
      if (match) {
        const label = match[1]
        if (node.properties) {
          node.properties['data-label'] = label
        }
      }
    },
  }
}

export const shikiConfig: ShikiConfig = {
  themes: {
    light: 'github-light',
    dark: 'github-dark',
  },
  wrap: true,
  transformers: [
    transformerNotationDiff(),
    transformerNotationHighlight(),
    transformerNotationWordHighlight(),
    transformerNotationFocus(),
    transformerNotationErrorLevel(),
    transformerMetaHighlight(),
    transformerMetaLabel(),
  ],
}
