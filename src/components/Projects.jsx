import { categories, projects, site } from '../data/site'
import Figure from './Figure'
import { ArrowUpRight } from './icons'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const statusStyle = {
  Live: 'bg-emerald-400',
  Beta: 'bg-amber-400',
  Research: 'bg-violet-400',
  'Open source': 'bg-sky-400',
}

function track(e) {
  const rect = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--x', `${e.clientX - rect.left}px`)
  e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`)
}

export default function Projects({ query, category, onReset }) {
  const q = query.trim().toLowerCase()
  const filtered = projects.filter((p) => {
    if (category !== 'all' && p.category !== category) return false
    if (!q) return true
    return [p.title, p.description, ...p.tags, p.category, p.status].join(' ').toLowerCase().includes(q)
  })
  const active = q !== '' || category !== 'all'
  const categoryLabel = categories.find((c) => c.id === category)?.label ?? category

  return (
    <section id="work" className="relative scroll-mt-16 bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          index="02"
          label="Selected Work"
          title={
            <>
              Experiments that <em>escaped</em> the lab
            </>
          }
          kicker="A few things built in the open, each one a small bet on a better way to make software."
        />

        {active && (
          <div
            role="status"
            className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl border border-dashed border-ink/20 bg-white/40 px-4 py-3 font-mono text-xs text-ink/60"
          >
            <span>
              results: <b className="text-ink">{filtered.length}</b> / {projects.length}
            </span>
            {q && <span className="break-all">query "{query.trim()}"</span>}
            {category !== 'all' && <span>category {categoryLabel.toLowerCase()}</span>}
            <button
              type="button"
              onClick={onReset}
              className="ml-auto cursor-pointer rounded-full border border-ink/20 px-3 py-1 tracking-widest uppercase transition hover:bg-ink hover:text-paper"
            >
              clear
            </button>
          </div>
        )}

        {filtered.length === 0 ? (
          <div className="mt-10 flex flex-col items-center rounded-3xl border border-dashed border-ink/25 px-6 py-20 text-center">
            <p className="font-mono text-sm tracking-widest text-ink/60 uppercase">∅ no specimens match</p>
            <p className="mt-3 max-w-sm text-ink/50">Nothing in the collection fits those filters. Loosen them and look again.</p>
            <button type="button" onClick={onReset} className="btn-line mt-8">
              Reset filters
            </button>
          </div>
        ) : (
          <div className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${active ? 'mt-6' : 'mt-14'}`}>
            {filtered.map((p, i) => (
              <Reveal key={p.slug} delay={i * 80}>
                <a
                  href={p.url || site.github}
                  target="_blank"
                  rel="noreferrer"
                  onPointerMove={track}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-ink/10 bg-white/60 transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_60px_-28px_rgb(20_20_22/0.35)]"
                >
                  <div className="relative h-44 overflow-hidden bg-abyss">
                    <Figure
                      kind={p.figure}
                      className="absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute top-4 left-4 font-mono text-[10px] tracking-[0.18em] text-white/50 uppercase">
                      FIG. {String(i + 1).padStart(2, '0')} — {p.figure}
                    </span>
                    <span className="absolute top-3.5 right-4 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/35 px-2.5 py-1 font-mono text-[10px] tracking-wider text-white/80 uppercase backdrop-blur-md">
                      <span className={`h-1.5 w-1.5 rounded-full ${statusStyle[p.status] || 'bg-white/60'}`} />
                      {p.status}
                    </span>
                  </div>

                  <div className="relative flex flex-1 flex-col p-6">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="text-2xl font-semibold tracking-tight">{p.title}</h3>
                      <span className="font-mono text-xs text-ink/45">{p.year}</span>
                    </div>
                    <p className="mt-3 leading-relaxed text-ink/65">{p.description}</p>
                    <div className="mt-6 flex items-end justify-between gap-4">
                      <ul className="flex flex-wrap gap-1.5">
                        {p.tags.map((t) => (
                          <li key={t} className="rounded-md border border-ink/10 bg-paper px-2 py-0.5 font-mono text-[11px] text-ink/60">
                            {t}
                          </li>
                        ))}
                      </ul>
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink transition duration-500 group-hover:rotate-45 group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background: 'radial-gradient(420px circle at var(--x) var(--y), rgb(124 58 237 / 0.10), transparent 45%)',
                    }}
                  />
                </a>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
