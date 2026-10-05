import { useId } from 'react'
import { site } from '../data/site'
import Reveal from './Reveal'
import { ArrowRight, ArrowUpRight } from './icons'

const orbits = [
  { angle: 0, dur: '7s', color: '#60a5fa' },
  { angle: 60, dur: '10s', color: '#f472b6' },
  { angle: 120, dur: '13s', color: '#facc15' },
]

function Atom({ className = '' }) {
  const id = `at${useId().replace(/[^\w-]/g, '')}`
  const path = 'M30 210a180 64 0 1 0 360 0a180 64 0 1 0 -360 0'
  return (
    <svg viewBox="0 0 420 420" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#60a5fa" />
          <stop offset=".4" stopColor="#a78bfa" />
          <stop offset=".7" stopColor="#f472b6" />
          <stop offset="1" stopColor="#facc15" />
        </linearGradient>
        <radialGradient id={`${id}-n`}>
          <stop offset="0" stopColor="#fff" stopOpacity=".95" />
          <stop offset=".35" stopColor="#a78bfa" stopOpacity=".7" />
          <stop offset="1" stopColor="#4f46e5" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle
        cx="210"
        cy="210"
        r="200"
        fill="none"
        stroke={`url(#${id}-g)`}
        strokeOpacity=".5"
        strokeDasharray="2 9"
        strokeLinecap="round"
        className="animate-spin-slow origin-center [transform-box:fill-box]"
      />
      {orbits.map((o) => (
        <g key={o.angle} transform={`rotate(${o.angle} 210 210)`}>
          <path d={path} fill="none" stroke={`url(#${id}-g)`} strokeOpacity=".55" strokeWidth="1.2" />
          <circle r="6" fill={o.color}>
            <animateMotion dur={o.dur} repeatCount="indefinite" path={path} />
          </circle>
        </g>
      ))}
      <circle cx="210" cy="210" r="58" fill={`url(#${id}-n)`} />
      <circle cx="210" cy="210" r="17" fill={`url(#${id}-g)`} />
    </svg>
  )
}

export default function Contact() {
  const primary = site.email
    ? { href: `mailto:${site.email}`, label: 'Start a conversation' }
    : { href: site.github, label: 'Say hi on GitHub' }

  return (
    <section id="contact" className="scroll-mt-16 bg-paper px-3 pb-6 pt-6 sm:px-6">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-abyss px-6 py-20 text-white sm:rounded-[2.75rem] sm:px-14 sm:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(900px 520px at 4% 108%, rgb(37 79 255 / 0.6), transparent 62%), radial-gradient(700px 480px at 98% 40%, rgb(109 40 217 / 0.5), transparent 60%)',
          }}
        />
        <div aria-hidden="true" className="hero-grid pointer-events-none absolute inset-0" />
        <div aria-hidden="true" className="grain pointer-events-none absolute inset-0" />

        <div className="pointer-events-none absolute top-1/2 right-[-6rem] hidden -translate-y-1/2 lg:block xl:right-8">
          <Atom className="h-[420px] w-[420px]" />
        </div>

        <div className="relative max-w-2xl">
          <Reveal>
            <p className="label-mono flex items-center gap-3 text-white/55">
              <span className="text-white">§ 05</span>
              <span className="h-px w-10 bg-white/30" />
              Correspondence
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-6 text-4xl leading-[1.02] font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
              Let&rsquo;s build something <em className="text-spectrum pr-1">improbable</em>.
            </h2>
          </Reveal>
          <Reveal delay={160} as="p" className="mt-7 max-w-xl text-lg leading-relaxed text-pretty text-white/65">
            Open to collaborations, freelance work and half-formed ideas that deserve a prototype. Tell me what you are
            imagining and we will figure out the experiment together.
          </Reveal>
          <Reveal delay={240} className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <a
              href={primary.href}
              {...(site.email ? {} : { target: '_blank', rel: 'noreferrer' })}
              className="inline-flex h-13 items-center justify-center gap-3 rounded-full bg-white px-8 text-base font-medium text-abyss transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_40px_-4px_rgb(167_139_250/0.8)] sm:h-14 sm:px-10"
            >
              {primary.label}
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={site.repo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-13 items-center justify-center gap-3 rounded-full border-[1.5px] border-white/30 px-8 text-base font-medium text-white transition duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-white/10 sm:h-14 sm:px-10"
            >
              View the source
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </Reveal>
          <Reveal delay={320} as="p" className="mt-8 flex items-center gap-3 font-mono text-xs text-white/50">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Status: accepting select collaborations · typical reply &lt; 48h
          </Reveal>
        </div>
      </div>
    </section>
  )
}
