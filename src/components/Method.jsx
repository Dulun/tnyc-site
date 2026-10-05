import { useId } from 'react'
import { method } from '../data/site'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const W = 1200
const MARKS = [150, 450, 750, 1050]

const wave = (x) => 70 + Math.sin(x * 0.03) * (6 + (40 * x) / W)

const curve = Array.from({ length: 241 }, (_, i) => {
  const x = i * 5
  return `${i ? 'L' : 'M'}${x} ${wave(x).toFixed(1)}`
}).join('')

export default function Method() {
  const gid = `scope-${useId().replace(/\W/g, '')}`

  return (
    <section id="method" className="relative scroll-mt-16 overflow-hidden bg-paper py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="graph-paper absolute inset-0"
        style={{ maskImage: 'radial-gradient(ellipse 75% 65% at 50% 45%, #000 25%, transparent 75%)' }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          index="03"
          label="Protocol"
          title={
            <>
              A method, <em>not</em> a mood.
            </>
          }
          kicker="Every product starts as a hypothesis. Each step below either strengthens the signal or sends it back to the bench."
        />

        <Reveal className="mt-14 hidden sm:block">
          <svg viewBox={`0 0 ${W} 140`} className="h-auto w-full" aria-hidden="true">
            <defs>
              <linearGradient id={gid} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={W} y2="0">
                <stop offset="0" stopColor="#2f5bea" />
                <stop offset="0.38" stopColor="#6d3fe0" />
                <stop offset="0.7" stopColor="#b5309a" />
                <stop offset="1" stopColor="#d9480f" />
              </linearGradient>
            </defs>
            <line x1="0" y1="70" x2={W} y2="70" stroke="#141416" strokeOpacity="0.25" strokeDasharray="4 6" />
            <path d={curve} pathLength="1" className="draw-path" fill="none" stroke={`url(#${gid})`} strokeWidth="2.5" strokeLinecap="round" />
            {MARKS.map((x, i) => (
              <g key={x}>
                <circle cx={x} cy={wave(x)} r="6" fill="#f1f0eb" stroke={`url(#${gid})`} strokeWidth="2.5" />
                <text x={x} y="134" textAnchor="middle" fontSize="12" fill="#141416" fillOpacity="0.5" fontFamily="JetBrains Mono, monospace">
                  t{'₀₁₂₃'[i]}
                </text>
              </g>
            ))}
          </svg>
        </Reveal>

        <ol className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-ink/10 bg-ink/10 sm:mt-6 md:grid-cols-4">
          {method.map((m, i) => (
            <li key={m.title} className="bg-paper transition-colors duration-300 hover:bg-white/80">
              <Reveal delay={i * 120} className="flex h-full flex-col p-7 sm:p-8">
                <span className="label-mono text-ink/45">Step {String(i + 1).padStart(2, '0')}</span>
                <span aria-hidden="true" className="text-spectrum-deep mt-6 block font-serif text-6xl leading-none italic">
                  {m.sym}
                </span>
                <h3 className="mt-6 text-2xl font-semibold tracking-tight">{m.title}</h3>
                <p className="mt-3 leading-relaxed text-ink/65">{m.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
