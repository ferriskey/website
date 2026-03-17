import { parse } from 'acorn'

const importStatements = [
  `import Callout from '@explainer/mdx/components/callout.astro'`,
  `import CardGroup from '@explainer/mdx/components/card-group.astro'`,
  `import Card from '@explainer/mdx/components/card.astro'`,
  `import Steps from '@explainer/mdx/components/steps.astro'`,
  `import Step from '@explainer/mdx/components/step.astro'`,
  `import Tabs from '@explainer/mdx/components/tabs.astro'`,
  `import Tab from '@explainer/mdx/components/tab.astro'`,
  `import CodeGroup from '@explainer/mdx/components/code-group.astro'`,
  `import Preview from '@explainer/mdx/components/preview.astro'`,
  `import PreviewDemo from '@explainer/mdx/components/preview-demo.astro'`,
  `import PreviewCode from '@explainer/mdx/components/preview-code.astro'`,
  `import MathBlock from '@explainer/mdx/components/math.astro'`,
  `import MermaidBlock from '@explainer/mdx/components/mermaid.astro'`,
]

const importBlock = importStatements.join('\n')

const estree = parse(importBlock, {
  ecmaVersion: 'latest',
  sourceType: 'module',
})

export function remarkAutoImport() {
  return (tree: any) => {
    tree.children.unshift({
      type: 'mdxjsEsm',
      value: importBlock,
      data: { estree },
    })
  }
}
