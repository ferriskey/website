import { visit } from 'unist-util-visit'

const specialLanguages: Record<string, string> = {
  math: 'MathBlock',
  latex: 'MathBlock',
  mermaid: 'MermaidBlock',
}

export function remarkCodeBlocks() {
  return (tree: any) => {
    visit(tree, 'code', (node: any, index: number | undefined, parent: any) => {
      const componentName = specialLanguages[node.lang]
      if (!componentName || index === undefined || !parent) return

      parent.children[index] = {
        type: 'mdxJsxFlowElement',
        name: componentName,
        attributes: [{ type: 'mdxJsxAttribute', name: 'code', value: node.value }],
        children: [],
      }
    })
  }
}
