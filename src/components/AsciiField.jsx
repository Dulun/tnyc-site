import { useEffect, useRef } from 'react'
import { RefreshIcon } from './icons'

// A cloud silhouette rendered from a stream of characters, with a word set in
// spectral type on top. Every glyph is a particle on a spring: the pointer (or an
// autonomous probe when idle) pushes them away, and they relax back home.

const MONO = '"JetBrains Mono", ui-monospace, monospace'
const SERIF = '"Instrument Serif", Georgia, serif'
const PHRASE = 'TONYCLOUD—INDEPENDENT—DEVELOPER—THE—WORK—IS—THE—PROOF—'
const WORD_GLYPHS = 'tnyc'
const STOPS = [
  [47, 91, 234],
  [109, 63, 224],
  [181, 48, 154],
  [217, 72, 15],
]
const BUCKETS = 14

const SPRING = 0.045
const DAMPING = 0.86
const FORCE = 5.5

// Cloud in "unit" space (1 unit = cloud box height). Bounds: x 0.23–1.79, y 0.02–0.93.
const PUFFS = [
  [0.62, 0.62, 0.3],
  [0.98, 0.42, 0.4],
  [1.38, 0.58, 0.3],
  [0.4, 0.76, 0.17],
  [1.62, 0.76, 0.17],
]

function spectrum(t) {
  const n = STOPS.length - 1
  const i = Math.min(n - 1, Math.floor(t * n))
  const f = t * n - i
  const [a, b] = [STOPS[i], STOPS[i + 1]]
  return `rgb(${a.map((v, k) => Math.round(v + (b[k] - v) * f)).join(',')})`
}
const COLORS = Array.from({ length: BUCKETS }, (_, i) => spectrum((i + 0.5) / BUCKETS))

function particle(x, y, ch) {
  return { hx: x, hy: y, x, y, vx: 0, vy: 0, ch }
}

function buildField(w, h, word) {
  const u = Math.min((w * 0.9) / 1.56, (h * 0.86) / 0.91)
  const ox = (w - 1.56 * u) / 2 - 0.23 * u
  const oy = (h - 0.91 * u) / 2 - 0.02 * u

  // Paint both masks into one offscreen canvas: cloud → red channel, word → green channel.
  const W = Math.ceil(w)
  const H = Math.ceil(h)
  const off = document.createElement('canvas')
  off.width = W
  off.height = H
  const c = off.getContext('2d', { willReadFrequently: true })
  c.globalCompositeOperation = 'lighter'

  c.fillStyle = '#f00'
  c.beginPath()
  for (const [x, y, r] of PUFFS) {
    c.moveTo(ox + (x + r) * u, oy + y * u)
    c.arc(ox + x * u, oy + y * u, r * u, 0, Math.PI * 2)
  }
  c.roundRect(ox + 0.4 * u, oy + 0.6 * u, 1.22 * u, 0.33 * u, 0.16 * u)
  c.fill()

  c.fillStyle = '#0f0'
  c.font = `italic 100px ${SERIF}`
  const size = (100 * Math.min(1.3 * u, w * 0.86)) / Math.max(1, c.measureText(word).width)
  c.font = `italic ${size}px ${SERIF}`
  c.textAlign = 'center'
  c.textBaseline = 'middle'
  c.fillText(word, ox + 1.01 * u, oy + 0.56 * u)

  const data = c.getImageData(0, 0, W, H).data
  const at = (x, y, ch) => {
    const xi = x | 0
    const yi = y | 0
    if (xi < 0 || yi < 0 || xi >= W || yi >= H) return 0
    return data[(yi * W + xi) * 4 + ch]
  }

  const cell = Math.max(8, Math.min(12, w / 100))
  const col = cell * 0.72
  const edge = []
  const body = []
  const words = Array.from({ length: BUCKETS }, () => [])

  let k = 0
  for (let y = cell / 2; y < h; y += cell) {
    for (let x = col / 2; x < w; x += col) {
      if (at(x, y, 0) < 128 || at(x, y, 1) > 40) continue
      const isEdge =
        at(x - col, y, 0) < 128 || at(x + col, y, 0) < 128 || at(x, y - cell, 0) < 128 || at(x, y + cell, 0) < 128
      ;(isEdge ? edge : body).push(particle(x, y, PHRASE[k++ % PHRASE.length]))
    }
  }

  const fine = cell * 0.58
  const left = ox + 0.23 * u
  k = 0
  for (let y = fine / 2; y < h; y += fine) {
    for (let x = fine / 2; x < w; x += fine * 0.8) {
      if (at(x, y, 1) < 128) continue
      const t = Math.min(0.999, Math.max(0, (x - left) / (1.56 * u)))
      words[(t * BUCKETS) | 0].push(particle(x, y, WORD_GLYPHS[k++ % WORD_GLYPHS.length]))
    }
  }

  return {
    cell,
    fine,
    edge,
    body,
    words,
    all: [...edge, ...body, ...words.flat()],
    radius: Math.max(48, Math.min(110, u * 0.16)),
    // Lissajous orbit for the idle probe
    cx: ox + 1.01 * u,
    cy: oy + 0.5 * u,
    ax: 0.62 * u,
    ay: 0.3 * u,
  }
}

function drawField(ctx, f, w, h, probe) {
  ctx.clearRect(0, 0, w, h)
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  ctx.font = `500 ${f.cell * 0.9}px ${MONO}`
  ctx.fillStyle = 'rgba(24,24,27,0.46)'
  for (const p of f.body) ctx.fillText(p.ch, p.x, p.y)

  ctx.font = `700 ${f.cell * 0.95}px ${MONO}`
  ctx.fillStyle = 'rgb(24,24,27)'
  for (const p of f.edge) ctx.fillText(p.ch, p.x, p.y)

  ctx.font = `600 ${f.fine * 1.15}px ${MONO}`
  for (let i = 0; i < BUCKETS; i++) {
    ctx.fillStyle = COLORS[i]
    for (const p of f.words[i]) ctx.fillText(p.ch, p.x, p.y)
  }

  // the autonomous probe draws its own reticle (the real pointer has the custom cursor)
  if (probe.active && probe.ghost) {
    ctx.strokeStyle = 'rgba(24,24,27,0.75)'
    ctx.lineWidth = 1.25
    ctx.beginPath()
    ctx.arc(probe.x, probe.y, f.radius * 0.42, 0, Math.PI * 2)
    ctx.stroke()
    ctx.fillStyle = 'rgb(24,24,27)'
    ctx.beginPath()
    ctx.arc(probe.x, probe.y, 3, 0, Math.PI * 2)
    ctx.fill()
  }
}

function stepField(f, probe, springMul) {
  const R = f.radius
  const R2 = R * R
  const k = SPRING * springMul
  let energy = 0
  for (let i = 0; i < f.all.length; i++) {
    const p = f.all[i]
    let ax = (p.hx - p.x) * k
    let ay = (p.hy - p.y) * k
    if (probe.active) {
      const dx = p.x - probe.x
      const dy = p.y - probe.y
      const d2 = dx * dx + dy * dy
      if (d2 < R2) {
        const d = Math.sqrt(d2) || 0.001
        const s = (1 - d / R) * FORCE
        ax += (dx / d) * s
        ay += (dy / d) * s
      }
    }
    p.vx = (p.vx + ax) * DAMPING
    p.vy = (p.vy + ay) * DAMPING
    p.x += p.vx
    p.y += p.vy
    energy += p.vx * p.vx + p.vy * p.vy
  }
  return energy
}

function Corner({ className }) {
  return <span aria-hidden="true" className={`pointer-events-none absolute h-4 w-4 border-ink/40 ${className}`} />
}

export default function AsciiField({ word = 'tnyc', className = '' }) {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const hud = useRef({})
  const api = useRef({ reassemble: () => {} })

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let field = null
    let w = 0
    let h = 0
    let raf = 0
    let pending = 0
    let frame = 0
    let ready = false
    let disposed = false
    let visible = false
    let seen = false
    let introAt = 0
    const probe = { x: 0, y: 0, active: false, ghost: false, placed: false }
    const user = { x: 0, y: 0, active: false, last: 0 }

    const fmt = (v) => v.toFixed(3)
    const updateHud = (energy) => {
      const el = hud.current
      if (el.probe) el.probe.textContent = probe.active ? `x ${fmt(probe.x / w)} · y ${fmt(probe.y / h)}` : 'x –.––– · y –.–––'
      if (el.energy) el.energy.textContent = `E ${((energy / Math.max(1, field.all.length)) * 100).toFixed(2)}`
      if (el.mode) el.mode.textContent = probe.ghost ? 'auto' : probe.active ? 'manual' : 'idle'
    }

    const tick = (now) => {
      raf = 0
      if (!field || !visible || disposed) return

      const idle = !user.active && now - user.last > 2600
      let tx = 0
      let ty = 0
      let ease = 1
      probe.ghost = false
      if (user.active) {
        tx = user.x
        ty = user.y
        ease = 0.55
        probe.active = true
      } else if (idle && !reduce) {
        const t = now / 1000
        tx = field.cx + field.ax * Math.sin(t * 0.55)
        ty = field.cy + field.ay * Math.sin(t * 0.83 + 1.3)
        ease = 0.05
        probe.active = true
        probe.ghost = true
      } else {
        probe.active = false
      }
      if (probe.active) {
        if (!probe.placed) {
          probe.x = tx
          probe.y = ty
          probe.placed = true
        }
        probe.x += (tx - probe.x) * ease
        probe.y += (ty - probe.y) * ease
      }

      const springMul = introAt ? Math.min(1, 0.12 + (now - introAt) / 1600) : 1
      const energy = stepField(field, probe, springMul)
      drawField(ctx, field, w, h, probe)
      if (++frame % 6 === 0) updateHud(energy)

      // With reduced motion there is no idle probe, so the loop may sleep until the next pointer event.
      const resting = reduce && !probe.active && energy < 0.02
      if (!resting) raf = requestAnimationFrame(tick)
    }

    const wake = () => {
      if (!raf && visible && field && !disposed) raf = requestAnimationFrame(tick)
    }

    const build = () => {
      pending = 0
      if (!ready || disposed) return
      const rect = wrap.getBoundingClientRect()
      if (rect.width < 10 || rect.height < 10) return
      w = rect.width
      h = rect.height
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const first = !field
      field = buildField(w, h, word)
      if (first && !reduce) {
        // start collapsed onto a single horizontal line, then unfold
        for (const p of field.all) {
          p.x = p.hx + (Math.random() - 0.5) * 24
          p.y = h / 2 + (Math.random() - 0.5) * 6
        }
      }
      if (hud.current.count) hud.current.count.textContent = field.all.length.toLocaleString('en-US')
      drawField(ctx, field, w, h, probe)
      wake()
    }

    api.current.reassemble = () => {
      if (!field) return
      for (const p of field.all) {
        p.x = Math.random() * w
        p.y = Math.random() * h
        p.vx = 0
        p.vy = 0
      }
      introAt = performance.now()
      wake()
    }

    const toLocal = (e) => {
      const r = canvas.getBoundingClientRect()
      user.x = e.clientX - r.left
      user.y = e.clientY - r.top
    }
    const onMove = (e) => {
      toLocal(e)
      user.active = true
      user.last = performance.now()
      wake()
    }
    const onLeave = () => {
      user.active = false
      user.last = performance.now()
    }
    const onUp = (e) => {
      if (e.pointerType !== 'mouse') onLeave()
    }

    wrap.addEventListener('pointermove', onMove)
    wrap.addEventListener('pointerdown', onMove)
    wrap.addEventListener('pointerleave', onLeave)
    wrap.addEventListener('pointercancel', onLeave)
    wrap.addEventListener('pointerup', onUp)

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible && !seen) {
          seen = true
          user.last = performance.now()
          if (!reduce) introAt = performance.now()
        }
        wake()
      },
      { threshold: 0.05 },
    )
    io.observe(wrap)

    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(pending)
      pending = requestAnimationFrame(build)
    })
    ro.observe(wrap)

    // Sampling the glyph mask needs the real fonts, not fallbacks.
    Promise.all([document.fonts.load(`italic 100px ${SERIF}`), document.fonts.load(`500 12px ${MONO}`)])
      .catch(() => {})
      .finally(() => {
        ready = true
        build()
      })

    return () => {
      disposed = true
      cancelAnimationFrame(raf)
      cancelAnimationFrame(pending)
      io.disconnect()
      ro.disconnect()
      wrap.removeEventListener('pointermove', onMove)
      wrap.removeEventListener('pointerdown', onMove)
      wrap.removeEventListener('pointerleave', onLeave)
      wrap.removeEventListener('pointercancel', onLeave)
      wrap.removeEventListener('pointerup', onUp)
    }
  }, [word])

  return (
    <div ref={wrapRef} data-cursor="field" className={`relative touch-pan-y select-none ${className}`}>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={`Interactive ASCII particle field spelling “${word}” inside a cloud`}
        className="absolute inset-0 h-full w-full"
      />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="scan-band h-1/4 w-full" />
      </div>

      <Corner className="top-0 left-0 border-t border-l" />
      <Corner className="top-0 right-0 border-t border-r" />
      <Corner className="bottom-0 left-0 border-b border-l" />
      <Corner className="right-0 bottom-0 border-r border-b" />

      <div className="pointer-events-none absolute top-3 left-4 font-mono text-[10px] tracking-[0.16em] text-ink/55 uppercase sm:top-4 sm:left-6">
        Fig. 1 — {word} / particle field
      </div>
      <div className="pointer-events-none absolute top-3 right-4 font-mono text-[10px] tracking-[0.16em] text-ink/55 sm:top-4 sm:right-6">
        n = <span ref={(el) => { hud.current.count = el }}>—</span>
      </div>
      <div className="pointer-events-none absolute bottom-3 left-4 font-mono text-[10px] tracking-[0.12em] text-ink/55 sm:bottom-4 sm:left-6">
        <span className="hidden sm:inline">probe </span>
        <span ref={(el) => { hud.current.probe = el }}>x –.––– · y –.–––</span>
      </div>
      <div className="pointer-events-none absolute right-4 bottom-3 font-mono text-[10px] tracking-[0.12em] text-ink/55 sm:right-6 sm:bottom-4">
        <span ref={(el) => { hud.current.energy = el }}>E 0.00</span> ·{' '}
        <span ref={(el) => { hud.current.mode = el }}>idle</span>
      </div>

      <button
        type="button"
        onClick={() => api.current.reassemble()}
        className="absolute bottom-10 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/70 bg-white/45 px-6 py-3 text-sm font-medium text-ink shadow-[0_10px_30px_-12px_rgb(20_20_22/0.35)] backdrop-blur-md transition hover:bg-white/70 sm:bottom-12 sm:px-8 sm:text-base"
      >
        <RefreshIcon className="h-4 w-4" />
        Reassemble
      </button>
    </div>
  )
}
