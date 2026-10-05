import { useEffect, useState } from 'react'
import { nav, site } from '../data/site'
import { CloseIcon, GitHubIcon, MenuIcon } from './icons'
import Logo from './Logo'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="sticky top-0 z-50 text-white">
      <nav
        className={`border-b transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled || open ? 'border-white/10 bg-abyss/75 backdrop-blur-xl' : 'border-transparent bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6">
          <Logo />

          <ul className="hidden items-center gap-1 md:flex">
            {nav.map((item, i) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="group flex items-baseline gap-1.5 rounded-full px-4 py-2 text-[15px] text-white/80 transition hover:bg-white/[0.07] hover:text-white"
                >
                  <span className="font-mono text-[10px] text-white/35 transition group-hover:text-white/60">
                    0{i + 1}
                  </span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="hidden h-10 w-10 place-items-center rounded-full border border-white/25 text-lg text-white/85 transition hover:border-white/60 hover:text-white sm:grid"
            >
              <GitHubIcon />
            </a>
            <a
              href="#contact"
              className="relative hidden rounded-full p-px sm:inline-flex"
            >
              <span aria-hidden="true" className="bg-spectrum absolute inset-0 rounded-full opacity-80" />
              <span className="relative rounded-full bg-abyss/90 px-5 py-2 text-sm font-medium transition hover:bg-abyss/60">
                Get in touch
              </span>
            </a>
            <button
              type="button"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/25 text-xl md:hidden"
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {open && (
          <ul className="border-t border-white/10 px-4 pt-2 pb-6 md:hidden">
            {nav.map((item, i) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-3 border-b border-white/[0.06] py-4 text-2xl font-medium"
                >
                  <span className="font-mono text-xs text-white/40">0{i + 1}</span>
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={site.github}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-white/70"
              >
                <GitHubIcon /> GitHub
              </a>
            </li>
          </ul>
        )}
      </nav>
    </header>
  )
}
