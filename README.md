# tnyc — tonycloud

Official site of **tnyc**, the independent software lab of tonycloud — a lab-notebook-style single-page site with a spectral hero, generative figures and a periodic table of tools.

## Stack

- React 19
- Vite 8
- Tailwind CSS 4 (CSS-first config, `@tailwindcss/vite`)
- No other runtime dependencies

## Features

- Interactive ASCII particle field with spring physics
- Spectral hero with a search console that filters projects
- Generative SVG project figures
- Periodic-table stack
- Custom cursor
- Reduced-motion support

## Develop

```bash
pnpm install   # install dependencies
pnpm dev       # start the dev server
pnpm build     # production build into dist/
pnpm preview   # preview the production build
pnpm lint      # run oxlint
```

## Customize

- `src/data/site.js` — name, links, nav, categories and projects. Projects are sample placeholders. Set `email` to enable the mailto button; while it is empty, contact buttons fall back to GitHub.
- `src/index.css` — theme tokens (colors, fonts, animations) and shared utilities.

## Project structure

```
src/
├── App.jsx            # page composition
├── main.jsx           # entry point
├── index.css          # Tailwind theme + utilities
├── data/
│   └── site.js        # all editable content
└── components/
    ├── Navbar.jsx, Announcement.jsx, Hero.jsx, Console.jsx
    ├── AsciiField.jsx, Specimen.jsx, Figure.jsx
    ├── Projects.jsx, Method.jsx, Elements.jsx
    ├── SectionHeading.jsx, Reveal.jsx, Cursor.jsx
    ├── Contact.jsx, Footer.jsx
    └── Logo.jsx, icons.jsx
```

## Deploy to Vercel

1. Import the GitHub repo (`github.com/Dulun/tnyc-site`) in Vercel.
2. The framework is auto-detected as Vite. `vercel.json` pins `pnpm install`, `pnpm build` and the `dist` output directory.
3. Deploy — or run `vercel --prod` from the CLI.
