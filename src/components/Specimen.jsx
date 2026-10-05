import { site, stats } from '../data/site'
import AsciiField from './AsciiField'
import { ArrowRight } from './icons'
import Reveal from './Reveal'

export default function Specimen() {
  const contactHref = site.email ? `mailto:${site.email}` : '#contact'

  return (
    <section id="lab" className="relative scroll-mt-16 bg-paper-2 pt-16 pb-24 sm:pt-20 sm:pb-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-paper-2 px-5 py-6 sm:px-7">
              <div className="text-3xl font-semibold tracking-tight sm:text-4xl">{s.value}</div>
              <div className="label-mono mt-2 text-[10px] text-ink/50">{s.label}</div>
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-16 flex flex-wrap justify-center gap-3 sm:mt-20 sm:gap-5">
          <a href="#work" className="btn-ink">
            Explore the work <ArrowRight className="h-5 w-5" />
          </a>
          <a href={site.github} target="_blank" rel="noreferrer" className="btn-line">
            GitHub <ArrowRight className="h-5 w-5" />
          </a>
          <a href={contactHref} className="btn-line">
            Get in touch <ArrowRight className="h-5 w-5" />
          </a>
        </Reveal>
      </div>

      <Reveal className="mx-auto mt-10 max-w-6xl px-2 sm:mt-14 sm:px-6">
        <AsciiField word={site.name} className="aspect-square w-full sm:aspect-[16/10] lg:aspect-[2/1]" />
      </Reveal>

      <div className="mx-auto mt-14 max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 border-t border-ink/15 pt-10 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <p className="label-mono flex items-center gap-3 text-ink/50">
              <span className="text-ink">§ 01</span>
              <span className="h-px w-10 bg-ink/30" />
              Abstract
            </p>
            <h2 className="mt-5 text-3xl leading-[1.05] font-semibold tracking-tight sm:text-4xl">
              One developer. <em>Many</em> experiments.
            </h2>
          </Reveal>
          <Reveal delay={120} className="grid gap-8 leading-relaxed text-pretty text-ink/70 sm:grid-cols-2 md:col-span-8">
            <p>
              <span className="float-left mt-1 mr-2 font-serif text-6xl leading-[0.75] text-ink">t</span>
              nyc is the independent software practice of {site.fullName}. No committees, no roadmaps written by people
              who will never use the product — just a tight loop between an idea, the code that tests it, and the
              people it is for.
            </p>
            <p>
              Every project starts as a hypothesis and is treated like an experiment: instrumented, measured and
              iterated in public. Above is a live specimen — a few thousand characters held together by springs. Move
              your cursor through it, or let the probe wander.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
