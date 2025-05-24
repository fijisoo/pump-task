# 🚀 Solana Pump Listener – Front-End Template

A modern **React + Vite** starter packed with Tailwind CSS, Framer Motion and best-practice project structure.  
Drop-in ready for Solana on-chain data via **Helius RPC**.

---

## Table of Contents

1. [Project Structure](#project-structure)
2. [Core Dependencies](#core-dependencies)
3. [Environment Variables](#environment-variables)
4. [Quick Start](#quick-start)
5. [NPM Scripts](#npm-scripts)
6. [Technical Decisions](#technical-decisions)
7. [Live Preview](#live-preview)
8. [License](#license)

---

## Project Structure

```
.
├── App.js               # Entry point – top-level page shell
├── components
│   ├── layout/          # Layout components + ThemeProvider
│   ├── ui/              # Atomic UI components
│   └── containers/      # Components containing business logic
├── hooks/               # Custom hooks (e.g. usePumpListener)
└── ...
```

| Path / File              | Purpose                                                                        |
|--------------------------|--------------------------------------------------------------------------------|
| `App.js`                 | Wraps the entire app (global providers, router, etc.).                         |
| `components/layout`      | Houses `ThemeProvider` (light / dark toggle) implemented with **Context API**. |
| `components/ui`          | Small, isolated, reusable atoms (Input, Switch).                               |
| `components/containers`  | Logic-heavy components that consume hooks and orchestrate UI atoms.            |
| `hooks`                  | App-level abstractions – **`usePumpListener`** keeps RPC logic out of UI.      |

---

## Core Dependencies

| Package            | Why it’s here                                            |
|--------------------|----------------------------------------------------------|
| **Tailwind CSS**   | Utility-first styling with zero runtime.                 |
| **lucide-react**   | Feather-weight SVG icon set.                             |
| **framer-motion**  | Smooth animations (used for dynamically added list items).|

> **Dynamic list animations**  
> `framer-motion` layout animations ensure only new items re-render and animate, leaving the rest of the list untouched.

---

## Environment Variables

A single env value is required – your **Helius RPC** endpoint for Solana:

```bash
# .env
VITE_APP_HELIUS_RPC_URL="https://helius.api.key/..."
```

> If `VITE_APP_HELIUS_RPC_URL` is missing, on-chain data will not load.

---

## Quick Start

```bash
# 1 ▪ Install dependencies
npm ci              # or: pnpm i / yarn

# 2 ▪ Create env file
cp .env.example .env
# → paste your VITE_APP_HELIUS_RPC_URL

# 3 ▪ Run the dev server
npm run dev
```

### Production build

```bash
npm run build       # Bundles optimized /dist
```

---

## NPM Scripts

| Script              | Description              |
|---------------------|--------------------------|
| `npm run dev`       | Vite dev-server with HMR |
| `npm run build`     | Production bundle        |

---

## Technical Decisions

* **PumpListener → custom hook (`usePumpListener`)**  
  Moving RPC subscription logic to a hook decouples UI from data and simplifies unit testing.

* **ThemeProvider using Context API**  
  While a global context isn’t strictly needed yet, it future-proofs theme state if the app scales.

* **Animated, non-re-rendering lists**  
  The toughest challenge was rendering new list items without re-rendering the entire list, while animating their entry – solved via Framer Motion’s `layout` prop.

---

## Live Preview

👉 **https://storied-cat-7b6c7f.netlify.app/**

---
