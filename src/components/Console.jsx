import { useEffect, useState } from 'react'
import { categories, searchHints } from '../data/site'
import { SearchIcon } from './icons'

// Types and deletes each hint in turn, used as the input placeholder.
function useTypewriter(words) {
  const [text, setText] = useState('')
  useEffect(() => {
    let word = 0
    let len = 0
    let deleting = false
    let timer = 0
    const tick = () => {
      const full = words[word]
      if (!deleting) {
        len++
        if (len === full.length) {
          deleting = true
          timer = setTimeout(tick, 1600)
          setText(full.slice(0, len))
          return
        }
      } else {
        len--
        if (len === 0) {
          deleting = false
          word = (word + 1) % words.length
        }
      }
      setText(full.slice(0, len))
      timer = setTimeout(tick, deleting ? 32 : 70)
    }
    timer = setTimeout(tick, 600)
    return () => clearTimeout(timer)
  }, [words])
  return text
}

export default function Console({ query, onQuery, category, onCategory, onSubmit }) {
  const hint = useTypewriter(searchHints)

  return (
    <div className="relative mx-auto mt-12 max-w-4xl sm:mt-14">
      {/* light streak */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[62%] left-1/2 h-28 w-[150vw] max-w-[1900px] -translate-x-1/2 -translate-y-1/2"
      >
        <div className="streak-wide animate-streak absolute inset-0" />
        <div className="streak-core animate-streak absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2" />
      </div>

      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit()
        }}
        className="relative rounded-[28px] border border-white/15 bg-white/[0.06] p-3 text-left shadow-[0_30px_80px_-30px_rgb(10_10_60/0.9),inset_0_1px_0_rgb(255_255_255/0.08)] backdrop-blur-xl sm:p-4"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex rounded-2xl border border-white/15 bg-white/[0.04] p-1">
            {categories.map((c) => {
              const active = c.id === category
              return (
                <button
                  key={c.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => onCategory(c.id)}
                  className={`rounded-xl px-4 py-2 text-sm font-medium transition sm:px-6 sm:text-[15px] ${
                    active
                      ? 'bg-abyss text-white shadow-[0_6px_20px_-6px_rgb(0_0_0/0.8),inset_0_0_0_1px_rgb(255_255_255/0.14)]'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {c.label}
                </button>
              )
            })}
          </div>
          <span className="hidden pr-2 font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase sm:block">
            ⌘ query the lab
          </span>
        </div>

        <div className="beam mt-3 rounded-full p-[1.5px] shadow-[0_0_50px_-8px_rgb(167_139_250/0.55)]">
          <label className="flex h-14 items-center gap-3 rounded-full bg-field px-5 sm:h-16 sm:px-7">
            <span className="hidden font-mono text-sm text-white/35 sm:inline">~/tnyc $</span>
            <span className="sr-only">Search projects</span>
            <input
              value={query}
              onChange={(e) => onQuery(e.target.value)}
              placeholder={hint ? `${hint}▍` : 'Search the lab'}
              spellCheck={false}
              autoComplete="off"
              className="min-w-0 flex-1 bg-transparent text-base text-white outline-none placeholder:text-white/45 sm:text-xl"
            />
            <button
              type="submit"
              aria-label="Search projects"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-2xl text-white/85 transition hover:bg-white/10 hover:text-white"
            >
              <SearchIcon />
            </button>
          </label>
        </div>
      </form>
    </div>
  )
}
