'use client'

import * as React from 'react'

interface MermaidProps {
  code: string
}

export function Mermaid({ code }: MermaidProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [svg, setSvg] = React.useState<string | null>(null)

  React.useEffect(() => {
    let cancelled = false

    async function render() {
      const mermaid = (await import('mermaid')).default

      const isDark = document.documentElement.classList.contains('dark')
      mermaid.initialize({
        startOnLoad: false,
        theme: isDark ? 'dark' : 'default',
      })

      const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`
      const { svg } = await mermaid.render(id, code)
      if (!cancelled) setSvg(svg)
    }

    render()
    return () => { cancelled = true }
  }, [code])

  if (!svg) {
    return <pre className="my-4 rounded-lg border bg-muted p-4 text-sm">{code}</pre>
  }

  return (
    <div
      ref={containerRef}
      className="mermaid-block my-4 flex justify-center [&>svg]:max-w-full"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}
