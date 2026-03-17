import * as React from 'react'
import { cn } from '@explainer/ui'
import { useTranslations } from '../i18n/utils'

interface ShareButtonsProps {
  url: string
  title: string
  horizontal?: boolean
  locale?: string
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

function LinkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

export function ShareButtons({ url, title, horizontal, locale = 'en' }: ShareButtonsProps) {
  const t = useTranslations(locale)
  const [copied, setCopied] = React.useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`

  const buttonClass = cn(
    'flex items-center justify-center rounded-full size-10 border text-muted-foreground transition-colors',
    'hover:bg-primary/10 hover:text-primary hover:border-primary/30',
  )

  const buttons = (
    <>
      <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className={buttonClass} aria-label={t('share.linkedin')}>
        <LinkedInIcon />
      </a>
      <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className={buttonClass} aria-label={t('share.twitter')}>
        <TwitterIcon />
      </a>
      <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className={buttonClass} aria-label={t('share.facebook')}>
        <FacebookIcon />
      </a>
      <button onClick={handleCopy} className={buttonClass} aria-label={t('share.copyLink')}>
        {copied ? <CheckIcon /> : <LinkIcon />}
      </button>
    </>
  )

  if (horizontal) {
    return <div className="flex gap-3 justify-center">{buttons}</div>
  }

  return (
    <div className="sticky top-24 flex flex-col gap-3">
      {buttons}
    </div>
  )
}
