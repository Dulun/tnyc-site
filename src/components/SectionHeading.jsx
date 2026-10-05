import Reveal from './Reveal'

export default function SectionHeading({ index, label, title, kicker }) {
  return (
    <div className="grid items-end gap-6 md:grid-cols-12">
      <Reveal className="md:col-span-7">
        <p className="label-mono flex items-center gap-3 text-ink/50">
          <span className="text-ink">§ {index}</span>
          <span className="h-px w-10 bg-ink/30" />
          {label}
        </p>
        <h2 className="mt-5 text-4xl leading-[1.02] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
          {title}
        </h2>
      </Reveal>
      {kicker && (
        <Reveal delay={120} as="p" className="text-lg leading-relaxed text-pretty text-ink/60 md:col-span-5">
          {kicker}
        </Reveal>
      )}
    </div>
  )
}
