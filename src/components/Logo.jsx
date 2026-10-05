import { useId } from 'react'
import { site } from '../data/site'

export function LogoMark({ className = 'h-8 w-8' }) {
  const id = `lg${useId().replace(/[^\w-]/g, '')}`
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#60a5fa" />
          <stop offset=".4" stopColor="#a78bfa" />
          <stop offset=".7" stopColor="#f472b6" />
          <stop offset="1" stopColor="#facc15" />
        </linearGradient>
      </defs>
      <g fill="none" stroke={`url(#${id})`} strokeWidth="1.7">
        <ellipse cx="16" cy="16" rx="13" ry="5.2" transform="rotate(-30 16 16)" />
        <ellipse cx="16" cy="16" rx="13" ry="5.2" transform="rotate(30 16 16)" />
      </g>
      <circle cx="16" cy="16" r="3.4" fill={`url(#${id})`} />
      <g transform="rotate(-30 16 16)">
        <circle r="1.5" fill="currentColor">
          <animateMotion dur="5s" repeatCount="indefinite" path="M3 16a13 5.2 0 1 0 26 0a13 5.2 0 1 0-26 0" />
        </circle>
      </g>
    </svg>
  )
}

export default function Logo({ className = '' }) {
  return (
    <a href="#top" className={`group inline-flex items-center gap-2.5 ${className}`} aria-label={`${site.name} home`}>
      <LogoMark className="h-8 w-8 transition-transform duration-500 group-hover:rotate-90" />
      <span className="flex flex-col leading-none">
        <span className="text-xl font-semibold tracking-tight">{site.name}</span>
        <span className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.28em] opacity-50">{site.fullName}</span>
      </span>
    </a>
  )
}
