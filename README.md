# Student Portfolio — Alex Carter

A single-page personal portfolio built with **React 18 + Vite**. It presents a hero introduction, an about section, a skills list, and selected projects, with a sticky navigation bar that highlights the section currently in view (via `IntersectionObserver`).

The app is deliberately small and dependency-light: plain CSS with design tokens, one CSS file per component, and runtime prop validation with `prop-types` — easy to read, extend, and defend in a viva.

---

## Screenshots

> **Placeholder — replace before submission.** Capture the three views below and
> drop them into `docs/screenshots/`.

| Home / Hero | Skills & Projects | Responsive (mobile) |
| --- | --- | --- |
| ![Home hero section](docs/screenshots/home.png) | ![Skills and projects sections](docs/screenshots/sections.png) | ![Mobile layout](docs/screenshots/mobile.png) |

---

## Tech stack

| Layer | Choice | Why |
| --- | --- | --- |
| UI library | React 18 (`react`, `react-dom`) | Component model, hooks, `StrictMode` |
| Build tool | Vite 5 + `@vitejs/plugin-react` | Instant dev server, fast production builds |
| Language | JSX (JavaScript) | No type-layer build step needed at this size |
| Styling | Plain CSS — tokens in `index.css`, one file per component | Zero runtime cost, easy theming through `--theme-color` |
| Prop validation | `prop-types` | Surfaces prop mismatches during development |
| Scroll tracking | `IntersectionObserver` | No scroll listeners, no layout thrash |

---

## Getting started

**Requirements:** Node.js 18+ and npm 9+.

```bash
# 1. install dependencies
npm install

# 2. start the dev server (hot reload at http://localhost:5173)
npm run dev
```

Other scripts:

```bash
npm run build         # production build into dist/
npm run preview       # serve the production build locally
npm run check:render  # server-render smoke test: landmarks, ARIA, console warnings
```

---

## Folder structure

```
student-portfolio/
├── index.html                    # Vite entry document (meta, favicon, #root)
├── package.json                  # scripts + dependencies
├── vite.config.js                # React plugin
├── .gitignore
├── scripts/
│   ├── smoke.jsx                 # server-render smoke test (structure + warnings)
│   └── run-smoke.cjs             # dev-mode runner for the smoke test
└── src/
    ├── main.jsx                  # createRoot + <StrictMode>, top-level props
    ├── App.jsx                   # page shell: landmarks + data wiring
    ├── index.css                 # design tokens, reset, focus/skip-link, motion prefs
    ├── data/
    │   └── portfolio.js          # skills + projects content (data layer)
    └── components/
        ├── NavBar.jsx / .css     # sticky nav + IntersectionObserver highlight
        ├── Header.jsx / .css     # banner/hero with call-to-action buttons
        ├── About.jsx / .css      # intro text + facts list (<dl>)
        ├── Skills.jsx / .css     # reusable, prop-driven skill chips
        ├── Projects.jsx / .css   # reusable, prop-driven project cards
        ├── Footer.jsx / .css     # contact links + copyright
        └── SectionWrapper.jsx / .css   # shared <section> shell (id, title, subtitle)
```

---

## Component tree

```
<App name themeColor>                          ← props from main.jsx; sets --theme-color
├── <a class="skip-link">                      ← skip-to-content link
├── <NavBar />                                 ← <nav aria-label="Primary">, no props
├── <Header name />                            ← <header id="home"> banner + hero
├── <main id="main-content" tabIndex={-1}>
│   ├── <About />                              ← <SectionWrapper id="about">
│   ├── <Skills skillList />                   ← <SectionWrapper id="skills">
│   │   └── skill chip × n                     ← visible name + percentage
│   └── <Projects projects />                  ← <SectionWrapper id="projects">
│       └── project card × n
└── <Footer />
    └── <SectionWrapper id="contact" headerTag="div">
```

**Data flow:** `main.jsx` → `App` (props) → feature components (`skillList`, `projects`).
All content lives in `src/data/portfolio.js`, so copy changes never touch component logic.

**Why the shared wrapper matters:** every section renders the same
`<section id aria-labelledby>` + heading + body structure, so `SectionWrapper` keeps that in
one place. It accepts `headerTag="div"` for the footer, where an inner `<header>` would be
invalid HTML (a `<footer>` element may not contain `<header>` descendants).

---

## Accessibility notes

- Landmarks: `header` (banner) · `nav` · `main` · `section` (each labelled by its heading) · `footer`.
- Skip link jumps keyboard users straight to `#main-content`.
- Every `:focus-visible` element gets a high-contrast outline; `.skip-link` reveals on focus.
- Repeated link texts ("View project") carry unique `aria-label`s; links that open a new tab announce "(opens in new tab)".
- Decorative accents are `aria-hidden="true"`; skill percentages are visible text, never hidden behind ARIA labels.
- Motion respects `prefers-reduced-motion`.
- `npm run check:render` re-verifies the landmark structure and confirms zero console warnings.

---

## License

Free to use for personal portfolio purposes.
