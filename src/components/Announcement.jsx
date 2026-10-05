import { useState } from 'react'
import { site } from '../data/site'
import { CloseIcon } from './icons'

export default function Announcement() {
  const [open, setOpen] = useState(true)
  if (!open) return null
  const { tag, text, href } = site.announcement

  return (
    <div className="relative z-[60] bg-[linear-gradient(90deg,#1e3a8a,#3730a3_38%,#5b21b6_68%,#1e3a8a)] text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-10 py-2 text-center text-[13px] sm:text-sm">
        <span className="hidden font-mono text-[10px] tracking-[0.22em] text-white/55 uppercase sm:inline">{tag}</span>
        <span className="hidden h-3 w-px bg-white/25 sm:inline" />
        <a href={href} className="underline-offset-4 hover:underline">
          {text} <span aria-hidden="true">→</span>
        </a>
      </div>
      <button
        type="button"
        aria-label="Dismiss announcement"
        onClick={() => setOpen(false)}
        className="absolute top-1/2 right-3 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-lg transition hover:bg-white/10"
      >
        <CloseIcon />
      </button>
    </div>
  )
}
