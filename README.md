# Student Portfolio — Alex Carter

A multi-page personal portfolio built with **React 18 + Vite** and **React Router v6**. It features a responsive layout with a dark/light mode toggle, a custom 404 page, and a fully controlled contact form.

---

## Screenshots

> **Placeholder — replace before submission.**

| Home | Projects | Contact | Mobile Nav |
| --- | --- | --- | --- |
| ![Home](docs/screenshots/home.png) | ![Projects](docs/screenshots/projects.png) | ![Contact](docs/screenshots/contact.png) | ![Mobile Nav](docs/screenshots/mobile-nav.png) |

---

## Projects page: GitHub API integration
The Projects page natively fetches public repositories using the unauthenticated GitHub REST API (`https://api.github.com/users/<username>/repos`). 

**Setup instructions:**
1. Open `src/components/Projects.jsx`
2. Change the `GITHUB_USERNAME` constant on line 8 to your own username.
3. Reload the page.

*Note on Rate Limiting: Unauthenticated GitHub API requests are limited to 60 requests per hour per IP. If you receive a 403 error during development, wait or connect to a different network.*

---

## Routes Table

| Path | Component | Description |
| --- | --- | --- |
| `/` | `<Home />` | Composes the Hero, About, and Skills sections. |
| `/projects` | `<ProjectsPage />` | Renders the Projects list on its own dedicated route. |
| `/contact` | `<Contact />` | Contains the controlled contact form and live preview. |
| `*` | `<NotFound />` | Catch-all for undefined routes, offering a link back to Home. |

---

## State Variables (`useState`)

| Component | State | Purpose |
| --- | --- | --- |
| `App` | `theme` | Tracks 'light' or 'dark' mode; applies the class to the root `<div>`. |
| `NavBar` | `open` | Toggles the mobile hamburger menu open/closed. |
| `Contact` | `values` | Tracks the controlled input fields (name, email, message). |
| `Contact` | `touched` | Tracks whether a user has blurred an input, triggering validation errors. |
| `Contact` | `helpOpen` | Toggles the visibility of the message help tooltip. |
| `Contact` | `sent` | Tracks form submission success to show the confirmation message. |

---

## Component Tree

```text
<App>
├── <NavBar theme toggleTheme>         ← Uses NavLink for internal routing
├── <Header> (rendered on '/' only)
├── <Routes>
│   ├── <Route path="/">
│   │   └── <Home>
│   │       ├── <About>
│   │       └── <Skills>
│   ├── <Route path="/projects">
│   │   └── <ProjectsPage>
│   │       └── <Projects>
│   ├── <Route path="/contact">
│   │   └── <Contact>                  ← Controlled form, live preview, character count
│   └── <Route path="*">
│       └── <NotFound>                 ← Custom 404 with Back to Home link
└── <Footer>
```

---

## Getting started

**Requirements:** Node.js 18+ and npm 9+.

```bash
# 1. install dependencies
npm install

# 2. start the dev server
npm run dev

# 3. run the automated structure checks
npm run check:render
```
