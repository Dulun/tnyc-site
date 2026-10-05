import { useId } from 'react'

// Deterministic generative cover art for project cards. All shapes are computed
// from closed-form functions so every render is identical.

const W = 320
const H = 176
const CX = W / 2
const CY = H / 2

const path = (pts) => pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join('')

function Flow({ paint }) {
  const lines = []
  for (let y = 12; y < H; y += 16) {
    for (let x = 12; x < W; x += 16) {
      const a = Math.sin(x * 0.021) * 1.4 + Math.cos(y * 0.034 + x * 0.006) * 1.1
      const r = 5 + 2.5 * Math.sin((x + y) * 0.03)
      lines.push(
        <line
          key={`${x}-${y}`}
          x1={x - Math.cos(a) * r}
          y1={y - Math.sin(a) * r}
          x2={x + Math.cos(a) * r}
          y2={y + Math.sin(a) * r}
          stroke={paint}
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity={0.45 + 0.5 * Math.abs(Math.sin(x * 0.01 + y * 0.02))}
        />,
      )
    }
  }
  return <g>{lines}</g>
}

function Spectrum({ paint }) {
  const bars = []
  for (let i = 0; i < 46; i++) {
    const v = 0.18 + 0.82 * Math.abs(Math.sin(i * 0.33) * Math.cos(i * 0.11)) + 0.12 * Math.sin(i * 2.7) ** 2
    const h = Math.min(1, v) * 116
    bars.push(<rect key={i} x={14 + i * 6.6} y={H - 22 - h} width="3.2" height={h} rx="1.6" fill={paint} />)
  }
  return (
    <g>
      {bars}
      <line x1="10" x2={W - 10} y1={H - 16} y2={H - 16} stroke="white" strokeOpacity=".25" />
    </g>
  )
}

function Lattice({ paint }) {
  const dots = []
  for (let y = 10; y < H; y += 13) {
    for (let x = 10; x < W; x += 13) {
      const d = ((x - CX * 1.15) ** 2 + (y - CY) ** 2) / (2 * 52 ** 2)
      const r = 0.7 + 3.1 * Math.exp(-d)
      dots.push(<circle key={`${x}-${y}`} cx={x} cy={y} r={r} fill={paint} opacity={0.35 + 0.65 * Math.exp(-d)} />)
    }
  }
  return <g>{dots}</g>
}

function Orbit({ paint, glow }) {
  const ellipse = 'M50 88a110 34 0 1 0 220 0a110 34 0 1 0-220 0'
  return (
    <g>
      <circle cx={CX} cy={CY} r="34" fill={paint} opacity=".25" filter={`url(#${glow})`} />
      {[0, 60, 120].map((deg, i) => (
        <g key={deg} transform={`rotate(${deg} ${CX} ${CY})`}>
          <path d={ellipse} fill="none" stroke={paint} strokeWidth="1.2" opacity=".85" />
          <circle r="3.4" fill="white">
            <animateMotion dur={`${7 + i * 2.5}s`} repeatCount="indefinite" path={ellipse} />
          </circle>
        </g>
      ))}
      <circle cx={CX} cy={CY} r="9" fill={paint} />
    </g>
  )
}

function Ascii({ paint }) {
  const rows = []
  const glyphs = 'tnyc'
  let k = 0
  for (let y = 14; y < H; y += 11) {
    let line = ''
    for (let x = 8; x < W; x += 7.2) {
      const d = Math.hypot(x - 206, y - 92)
      line += d < 42 ? ' ' : glyphs[k++ % 4]
    }
    rows.push(
      <text key={y} x="8" y={y} fontSize="10.5" fill={paint} xmlSpace="preserve" letterSpacing="0.55" fontFamily="JetBrains Mono, monospace">
        {line}
      </text>,
    )
  }
  return (
    <g>
      {rows}
      <circle cx="206" cy="92" r="22" fill="none" stroke="white" strokeWidth="1.3" />
      <circle cx="206" cy="92" r="3" fill="white" />
    </g>
  )
}

function Helix({ paint }) {
  const a = []
  const b = []
  const rungs = []
  for (let x = 0; x <= W; x += 4) {
    const s = Math.sin(x * 0.045)
    a.push([x, CY + s * 42])
    b.push([x, CY - s * 42])
    if (x % 12 === 0) {
      rungs.push(
        <line key={x} x1={x} x2={x} y1={CY + s * 42} y2={CY - s * 42} stroke={paint} strokeWidth="1.2" opacity={0.15 + 0.6 * Math.abs(Math.cos(x * 0.045))} />,
      )
    }
  }
  return (
    <g>
      {rungs}
      <path d={path(a)} fill="none" stroke={paint} strokeWidth="2.2" />
      <path d={path(b)} fill="none" stroke={paint} strokeWidth="2.2" opacity=".7" />
    </g>
  )
}

const KINDS = { flow: Flow, spectrum: Spectrum, lattice: Lattice, orbit: Orbit, ascii: Ascii, helix: Helix }

export default function Figure({ kind, className = '' }) {
  const id = useId().replace(/[^\w-]/g, '')
  const grad = `fg${id}`
  const grid = `fgrid${id}`
  const glow = `fglow${id}`
  const Art = KINDS[kind] ?? Lattice

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
      <defs>
        {/* userSpaceOnUse: objectBoundingBox gradients vanish on perfectly straight lines */}
        <linearGradient id={grad} x1="0" x2={W} y1="0" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#60a5fa" />
          <stop offset=".38" stopColor="#a78bfa" />
          <stop offset=".7" stopColor="#f472b6" />
          <stop offset="1" stopColor="#facc15" />
        </linearGradient>
        <pattern id={grid} width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M16 0H0V16" fill="none" stroke="white" strokeOpacity=".05" />
        </pattern>
        <filter id={glow} x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>
      <rect width={W} height={H} fill={`url(#${grid})`} />
      <Art paint={`url(#${grad})`} glow={glow} />
    </svg>
  )
}
