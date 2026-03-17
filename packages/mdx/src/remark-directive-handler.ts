import type { Root } from 'mdast'
import { visit } from 'unist-util-visit'

type DirectiveNode = {
  type: 'containerDirective' | 'leafDirective' | 'textDirective'
  name: string
  attributes?: Record<string, string>
  children: any[]
  data?: Record<string, unknown>
}

/**
 * Maps v1 directive names (kebab-case) to v2 component names (PascalCase).
 */
const componentMap: Record<string, string> = {
  'card-group': 'CardGroup',
  card: 'Card',
  callout: 'Callout',
  'step-group': 'Steps',
  step: 'Step',
  preview: 'Preview',
  'code-preview': 'PreviewDemo',
  'content-preview': 'PreviewCode',
  codegroup: 'CodeGroup',
  'code-group': 'CodeGroup',
}

/**
 * Attributes that should be parsed as numbers.
 */
const numericAttributes: Record<string, Set<string>> = {
  CardGroup: new Set(['cols']),
}

/**
 * Extract `[label]` from a code block's meta string.
 */
function extractLabel(meta: string | null | undefined): string | null {
  if (!meta) return null
  const match = meta.match(/\[(.*?)\]/)
  return match ? match[1] : null
}

/**
 * Recursively find all code blocks inside a directive node.
 */
function findCodeBlocks(node: any): any[] {
  const blocks: any[] = []
  if (node.type === 'code') {
    blocks.push(node)
  }
  if (node.children) {
    for (const child of node.children) {
      blocks.push(...findCodeBlocks(child))
    }
  }
  return blocks
}

/**
 * Remark plugin that transforms `remark-directive` nodes into MDX JSX elements
 * matching the v2 component API.
 */
export function remarkDirectiveHandler() {
  return (tree: Root) => {
    visit(tree, (node: any) => {
      if (node.type !== 'containerDirective' && node.type !== 'leafDirective') return

      const directive = node as DirectiveNode
      const componentName = componentMap[directive.name]
      if (!componentName) return

      const attributes: any[] = []

      // Convert directive attributes to JSX attributes
      if (directive.attributes) {
        for (const [key, value] of Object.entries(directive.attributes)) {
          if (value === undefined || value === '') continue

          const isNumeric = numericAttributes[componentName]?.has(key)
          if (isNumeric) {
            attributes.push({
              type: 'mdxJsxAttribute',
              name: key,
              value: {
                type: 'mdxJsxAttributeValueExpression',
                value: value,
                data: {
                  estree: {
                    type: 'Program',
                    sourceType: 'module',
                    body: [
                      {
                        type: 'ExpressionStatement',
                        expression: {
                          type: 'Literal',
                          value: Number(value),
                          raw: value,
                        },
                      },
                    ],
                  },
                },
              },
            })
          } else {
            attributes.push({
              type: 'mdxJsxAttribute',
              name: key,
              value: value,
            })
          }
        }
      }

      // For CodeGroup, extract titles from child code blocks' meta [label]
      if (componentName === 'CodeGroup') {
        const codeBlocks = findCodeBlocks(directive)
        const titles = codeBlocks
          .map((block) => extractLabel(block.meta))
          .filter(Boolean)

        if (titles.length > 0) {
          const titlesValue = JSON.stringify(titles)
          attributes.push({
            type: 'mdxJsxAttribute',
            name: 'titles',
            value: {
              type: 'mdxJsxAttributeValueExpression',
              value: titlesValue,
              data: {
                estree: {
                  type: 'Program',
                  sourceType: 'module',
                  body: [
                    {
                      type: 'ExpressionStatement',
                      expression: {
                        type: 'ArrayExpression',
                        elements: titles.map((t: string) => ({
                          type: 'Literal',
                          value: t,
                          raw: JSON.stringify(t),
                        })),
                      },
                    },
                  ],
                },
              },
            },
          })
        }
      }

      // Transform the directive node into an MDX JSX element
      node.type = 'mdxJsxFlowElement'
      node.name = componentName
      node.attributes = attributes
      // children are kept as-is
    })
  }
}
