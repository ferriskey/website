import type { Root } from 'mdast'

const docsPathPattern = /^\/(en|fr)\/explainer\//

function visitNodes(node: any, visitor: (n: any) => void) {
  visitor(node)
  if (node.children) {
    for (const child of node.children) {
      visitNodes(child, visitor)
    }
  }
}

/**
 * Remark plugin that rewrites internal docs links to point to the docs app URL.
 * Links matching `/(en|fr)/explainer/...` are prefixed with the docs base URL.
 */
export function remarkDocsLinks(options?: { docsUrl?: string }) {
  const docsUrl = (options?.docsUrl ?? '').replace(/\/$/, '')

  return (tree: Root) => {
    if (!docsUrl) return

    visitNodes(tree, (node: any) => {
      // Rewrite markdown links: [text](/en/explainer/...)
      if (node.type === 'link' && typeof node.url === 'string' && docsPathPattern.test(node.url)) {
        node.url = docsUrl + node.url
      }

      // Rewrite directive href attributes: :::card{href="/en/explainer/..."}
      if (
        (node.type === 'containerDirective' || node.type === 'leafDirective') &&
        node.attributes?.href &&
        docsPathPattern.test(node.attributes.href)
      ) {
        node.attributes.href = docsUrl + node.attributes.href
      }
    })
  }
}
