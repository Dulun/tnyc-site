import { site, nav } from '../data/site'
import Logo from './Logo'

const elsewhere = [
  { label: 'GitHub', href: site.github },
  { label: 'Source', href: site.repo },
]

const colophon = [
  'Set in Space Grotesk, Instrument Serif & JetBrains Mono.',
  'Built with React, Vite & Tailwind CSS.',
  'Deployed on Vercel.',
]

export default function Footer() {
  return (
    <footer className="bg-paper text-ink">
      <div className="mx-auto max-w-7xl px-4 pt-20 pb-10 sm:px-6">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="text-ink">
              <Logo />
            </div>
            <p className="mt-6 max-w-sm text-base leading-relaxed text-pretty text-ink/60">
              tnyc &mdash; the independent software lab of tonycloud. Built in public, one experiment at a time.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:col-span-7">
            <div>
              <h3 className="label-mono text-ink/45">Index</h3>
              <ul className="mt-5 space-y-3 text-sm">
                {nav.map((n) => (
                  <li key={n.id}>
                    <a href={`#${n.id}`} className="transition hover:text-ink/50">
                      {n.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="label-mono text-ink/45">Elsewhere</h3>
              <ul className="mt-5 space-y-3 text-sm">
                {elsewhere.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} target="_blank" rel="noreferrer" className="transition hover:text-ink/50">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h3 className="label-mono text-ink/45">Colophon</h3>
              <ul className="mt-5 space-y-3 text-sm text-ink/60">
                {colophon.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div aria-hidden="true" className="group relative mt-16 cursor-default overflow-hidden text-center sm:mt-20">
          <p className="font-serif text-[22vw] leading-none whitespace-nowrap text-transparent italic [-webkit-text-stroke:1px_rgb(20_20_22/0.22)] min-[1280px]:text-[17rem]">
            {site.fullName}
          </p>
          <p className="text-spectrum-deep absolute inset-0 font-serif text-[22vw] leading-none whitespace-nowrap italic opacity-0 transition-opacity duration-700 group-hover:opacity-100 min-[1280px]:text-[17rem]">
            {site.fullName}
          </p>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-ink/10 pt-6 font-mono text-[11px] text-ink/50">
          <span>
            &copy; {new Date().getFullYear()} tnyc &middot; tonycloud
          </span>
          <span className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            All systems nominal
          </span>
          <a href="#top" className="transition hover:text-ink">
            Back to top &uarr;
          </a>
        </div>
      </div>
    </footer>
  )
}
