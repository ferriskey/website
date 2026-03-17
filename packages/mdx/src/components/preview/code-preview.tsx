import * as React from 'react'

export function Preview({ children }: { children: React.ReactNode }) {
  return <div className="my-5">{children}</div>
}

export function PreviewDemo({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-t-lg border px-4 py-5 [&>*]:m-0">
      {children}
    </div>
  )
}

export function PreviewCode({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-b-lg border-x border-b [&_.code-block-header]:hidden [&_.code-block]:my-0 [&_.code-block]:rounded-none [&_.code-block]:border-0 [&_pre]:my-0 [&_pre]:rounded-none [&_pre]:border-0">
      {children}
    </div>
  )
}
