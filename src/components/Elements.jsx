import { elementGroups, elements } from '../data/site'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function Elements() {
  return (
    <section id="stack" className="relative scroll-mt-16 bg-paper-2 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          index="04"
          label="Elements of the Stack"
          title={
            <>
              The periodic table of <em>tools</em>
            </>
          }
          kicker="The reagents behind everything on this page — chosen for how well they combine, not how loudly they trend."
        />

        <Reveal delay={80} as="ul" className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
          {Object.entries(elementGroups).map(([id, g]) => (
            <li key={id} className="flex items-center gap-2 text-sm text-ink/70">
              <span className="h-3 w-3 rounded-[3px]" style={{ background: g.color }} />
              {g.label}
              <span className="font-mono text-[10px] tracking-wider text-ink/45">{g.short}</span>
            </li>
          ))}
        </Reveal>

        <div className="mt-10 grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3 md:grid-cols-6">
          {elements.map((el, i) => {
            const g = elementGroups[el.group]
            return (
              <Reveal key={el.sym + el.name} delay={(i % 6) * 30}>
                <div
                  className="element group relative flex aspect-square flex-col overflow-hidden rounded-xl border border-ink/10 bg-white/70 p-2.5 sm:p-3"
                  style={{ '--c': g.color }}
                >
                  <div className="flex items-start justify-between font-mono text-[10px]">
                    <span className="text-ink/45">{i + 1}</span>
                    <span style={{ color: 'var(--c)' }}>{g.short}</span>
                  </div>
                  <div className="flex flex-1 items-center justify-center">
                    <span className="text-3xl font-semibold sm:text-4xl" style={{ color: 'var(--c)' }}>
                      {el.sym}
                    </span>
                  </div>
                  <p className="truncate text-[11px] text-ink/70 sm:text-xs">{el.name}</p>
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100 sm:h-[3px]"
                    style={{ background: 'var(--c)' }}
                  />
                </div>
              </Reveal>
            )
          })}
        </div>

        <p className="mt-8 font-mono text-xs text-ink/50">Table 1 — Elements in active use. Hover to excite a sample.</p>
      </div>
    </section>
  )
}
