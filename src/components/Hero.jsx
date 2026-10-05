import { useEffect, useRef } from 'react'
import { marquee } from '../data/site'
import Console from './Console'

// Mission-clock style counter since page load, written straight to the DOM.
function Uptime() {
  const ref = useRef(null)
  useEffect(() => {
    const start = performance.now()
    const pad = (n, l = 2) => String(n).padStart(l, '0')
    const id = setInterval(() => {
      const ms = Math.floor(performance.now() - start)
      const s = Math.floor(ms / 1000)
      if (ref.current) {
        ref.current.textContent = `T+ ${pad(Math.floor(s / 3600))}:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}.${pad(ms % 1000, 3)}`
      }
    }, 47)
    return () => clearInterval(id)
  }, [])
  return <span ref={ref}>T+ 00:00:00.000</span>
}

function Annotation({ className, children }) {
  return (
    <div
      aria-hidden="true"
      className={`animate-float pointer-events-none absolute hidden items-center gap-3 font-mono text-[11px] tracking-wider text-white/30 lg:flex ${className}`}
    >
      {children}
    </div>
  )
}

function Marquee() {
  const items = [...marquee, ...marquee]
  return (
    <div className="marquee-mask group relative mt-16 overflow-hidden sm:mt-20">
      <ul className="animate-marquee flex w-max gap-4 group-hover:[animation-play-state:paused]">
        {items.map((m, i) => (
          <li
            key={i}
            aria-hidden={i >= marquee.length}
            className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3.5 whitespace-nowrap backdrop-blur-sm"
          >
            <span className="text-spectrum font-serif text-2xl leading-none italic">{m.sym}</span>
            <span className="text-[15px] text-white/90">{m.label}</span>
            <span className="font-mono text-[11px] text-white/30">0x{(i % marquee.length).toString(16).padStart(2, '0')}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Hero(props) {
  const ref = useRef(null)

  const onPointerMove = (e) => {
    const el = ref.current
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <section
      id="top"
      ref={ref}
      onPointerMove={onPointerMove}
      className="relative -mt-[72px] overflow-hidden rounded-b-[2rem] bg-abyss text-white sm:rounded-b-[2.75rem]"
    >
      <div aria-hidden="true" className="hero-bg absolute inset-0" />
      <div aria-hidden="true" className="hero-grid absolute inset-0" />
      <div aria-hidden="true" className="hero-spot absolute inset-0" />
      <div aria-hidden="true" className="grain absolute inset-0" />

      <Annotation className="top-[30%] left-[5%]">
        <span className="h-px w-8 bg-white/25" />∇ · E = ρ / ε₀
      </Annotation>
      <Annotation className="top-[24%] right-[6%] [animation-delay:-3s]">
        λ = 532 nm <span className="h-px w-8 bg-white/25" />
      </Annotation>
      <Annotation className="bottom-[34%] left-[7%] [animation-delay:-5s]">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/70" />
        <Uptime />
      </Annotation>
      <Annotation className="right-[5%] bottom-[38%] [animation-delay:-1.5s]">
        φ = 1.618 · σ = 0.002 <span className="h-px w-8 bg-white/25" />
      </Annotation>

      <div className="relative mx-auto max-w-7xl px-4 pt-[calc(72px+4.5rem)] pb-14 text-center sm:px-6 sm:pt-[calc(72px+6rem)] sm:pb-20">
        <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/[0.05] px-5 py-2 shadow-[inset_0_1px_0_rgb(255_255_255/0.08)] backdrop-blur">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping-slow absolute inset-0 rounded-full bg-emerald-400" />
            <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="text-spectrum text-sm font-medium sm:text-base">Independent Developer · Research-grade Software</span>
        </div>

        <h1 className="mx-auto mt-8 max-w-5xl text-5xl leading-[0.98] font-semibold tracking-tight text-balance sm:text-7xl lg:text-8xl">
          Engineering the <span className="text-spectrum">Improbable</span>
          <sup className="ml-1 align-super font-mono text-sm font-normal tracking-normal text-white/40 sm:text-base">[1]</sup>
        </h1>

        <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-pretty text-white/65 sm:text-lg">
          Precise, fast and slightly obsessive software — designed, built and shipped by one independent developer.
          Query the lab below.
        </p>

        <Console {...props} />

        <Marquee />

        <p className="mx-auto mt-12 max-w-xl font-mono text-[11px] leading-relaxed text-white/35">
          [1] <span className="text-white/55">tnyc</span> (n.) — the independent software lab of tonycloud. See also:
          experiments that escaped.
        </p>
      </div>
    </section>
  )
}
