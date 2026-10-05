// Everything content-related lives here — edit this file to make the site yours.

export const site = {
  name: 'tnyc',
  fullName: 'tonycloud',
  role: 'Independent Developer',
  github: 'https://github.com/Dulun',
  repo: 'https://github.com/Dulun/tnyc-site',
  // Public contact address. Leave empty to route the contact buttons to GitHub instead.
  email: '',
  announcement: {
    tag: 'Log 2026.10',
    text: 'New experiments are live in the lab — explore the latest builds',
    href: '#work',
  },
}

export const nav = [
  { id: 'lab', label: 'Lab' },
  { id: 'work', label: 'Work' },
  { id: 'method', label: 'Method' },
  { id: 'stack', label: 'Stack' },
  { id: 'contact', label: 'Contact' },
]

export const categories = [
  { id: 'all', label: 'All' },
  { id: 'apps', label: 'Apps' },
  { id: 'tools', label: 'Tools' },
  { id: 'research', label: 'Research' },
]

// Cycled as the placeholder of the hero search console.
export const searchHints = [
  'realtime sync',
  'webgl analytics',
  'state machines',
  'semantic search',
  'ascii physics',
  'cli toolkit',
]

export const marquee = [
  { sym: '∇', label: 'WebGL / WebGPU' },
  { sym: 'λ', label: 'Functional TypeScript' },
  { sym: '∂', label: 'Realtime systems' },
  { sym: 'Σ', label: 'Data visualization' },
  { sym: 'Ψ', label: 'LLM tooling' },
  { sym: 'Ω', label: 'Edge infrastructure' },
  { sym: 'π', label: 'Generative art' },
  { sym: '∞', label: 'Developer tools' },
]

export const stats = [
  { value: '1', label: 'Human, zero committees' },
  { value: '100%', label: 'Independent' },
  { value: '∞', label: 'Curiosity budget' },
  { value: '24/7', label: 'Shipping mindset' },
]

// Sample projects — replace with your own. `figure` picks the generative cover art:
// flow | spectrum | lattice | orbit | ascii | helix
export const projects = [
  {
    slug: 'nimbus',
    title: 'Nimbus',
    category: 'tools',
    status: 'Research',
    year: '2026',
    figure: 'flow',
    description: 'An edge-native realtime sync engine — CRDT state that converges across tabs, devices and regions.',
    tags: ['Rust', 'CRDT', 'WebSocket'],
    url: '',
  },
  {
    slug: 'prism',
    title: 'Prism',
    category: 'apps',
    status: 'Live',
    year: '2026',
    figure: 'spectrum',
    description: 'A spectral analytics dashboard that decomposes raw event streams into signals you can act on.',
    tags: ['React', 'WebGL', 'DuckDB'],
    url: '',
  },
  {
    slug: 'quanta',
    title: 'Quanta',
    category: 'tools',
    status: 'Open source',
    year: '2025',
    figure: 'lattice',
    description: 'Tiny, fully-typed state machines for complex UI flows. Zero dependencies, ~2 kB.',
    tags: ['TypeScript', 'State machines'],
    url: '',
  },
  {
    slug: 'orbit',
    title: 'Orbit',
    category: 'apps',
    status: 'Beta',
    year: '2026',
    figure: 'orbit',
    description: 'A personal knowledge graph with local-first semantic search, powered by on-device LLMs.',
    tags: ['LLM', 'Vector search', 'Local-first'],
    url: '',
  },
  {
    slug: 'lattice',
    title: 'Lattice',
    category: 'research',
    status: 'Live',
    year: '2026',
    figure: 'ascii',
    description: 'A generative ASCII renderer with spring physics — the engine behind the particle field on this page.',
    tags: ['Canvas', 'Physics', 'ASCII'],
    url: '',
  },
  {
    slug: 'helix',
    title: 'Helix',
    category: 'tools',
    status: 'Beta',
    year: '2025',
    figure: 'helix',
    description: 'A CLI toolkit to scaffold, ship and observe side projects in minutes, not weekends.',
    tags: ['Node', 'CLI', 'DX'],
    url: '',
  },
]

export const method = [
  {
    sym: '∂',
    title: 'Observe',
    text: 'Talk to people, read the logs, find the real problem hiding behind the requested feature.',
  },
  {
    sym: 'λ',
    title: 'Hypothesize',
    text: 'Sketch the smallest system that could possibly work — and decide up front how we will know.',
  },
  {
    sym: 'Σ',
    title: 'Experiment',
    text: 'Prototype in production-grade code. Instrument everything. Keep only what survives contact.',
  },
  {
    sym: 'Ω',
    title: 'Ship',
    text: 'Deploy to the edge, observe in the wild, iterate. A product is a living experiment.',
  },
]

export const elementGroups = {
  lang: { label: 'Language', short: 'LNG', color: '#2f5bea' },
  ui: { label: 'Interface', short: 'UI', color: '#6d3fe0' },
  run: { label: 'Runtime', short: 'RT', color: '#0e7490' },
  data: { label: 'Data', short: 'DB', color: '#047857' },
  ops: { label: 'Infra', short: 'OPS', color: '#c2410c' },
  ai: { label: 'Intelligence', short: 'AI', color: '#be185d' },
}

export const elements = [
  { sym: 'Ts', name: 'TypeScript', group: 'lang' },
  { sym: 'Rs', name: 'Rust', group: 'lang' },
  { sym: 'Go', name: 'Go', group: 'lang' },
  { sym: 'Py', name: 'Python', group: 'lang' },
  { sym: 'Re', name: 'React', group: 'ui' },
  { sym: 'Tw', name: 'Tailwind', group: 'ui' },
  { sym: 'Gl', name: 'WebGL', group: 'ui' },
  { sym: 'Gp', name: 'WebGPU', group: 'ui' },
  { sym: 'No', name: 'Node.js', group: 'run' },
  { sym: 'Vi', name: 'Vite', group: 'run' },
  { sym: 'Bn', name: 'Bun', group: 'run' },
  { sym: 'Wa', name: 'WebAssembly', group: 'run' },
  { sym: 'Pg', name: 'PostgreSQL', group: 'data' },
  { sym: 'Rd', name: 'Redis', group: 'data' },
  { sym: 'Sb', name: 'Supabase', group: 'data' },
  { sym: 'Dk', name: 'DuckDB', group: 'data' },
  { sym: 'Vc', name: 'Vercel', group: 'ops' },
  { sym: 'Cf', name: 'Cloudflare', group: 'ops' },
  { sym: 'Dc', name: 'Docker', group: 'ops' },
  { sym: 'Gh', name: 'GitHub Actions', group: 'ops' },
  { sym: 'Ll', name: 'LLMs', group: 'ai' },
  { sym: 'Ag', name: 'Agents', group: 'ai' },
  { sym: 'Em', name: 'Embeddings', group: 'ai' },
  { sym: 'Rg', name: 'RAG', group: 'ai' },
]
