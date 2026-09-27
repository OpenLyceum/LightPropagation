# Light Propagation

[![CI](../../actions/workflows/ci.yml/badge.svg)](../../actions/workflows/ci.yml)

An interactive simulation of how light propagates through polarizers and wave plates, built with
[SceneryStack](https://scenerystack.org/), Vite 8, TypeScript 7, and Biome 2.

The physics model is a faithful port of **[EMANIM](https://emanim.szialab.org)** (Electromagnetic
Waves Animated) by András Szilágyi — the source of the model equations, control ranges, and the 20
preset phenomena on the Lab screen. See [`doc/model.md`](doc/model.md) for the model description
and [CREDITS.md](CREDITS.md) for full acknowledgments.

## Features

### Screens

- **Intro** (`src/intro/`) — single vertical wave; introduces polarization, amplitude, wavelength, and the 3D view
- **Polarization** (`src/polarization/`) — two waves through an optional dichroic polarizing filter
- **Wave Plates** (`src/wave-plates/`) — birefringent slab with retardation readout (quarter- and half-wave presets)
- **Lab** (`src/lab/`) — full control surface with 20 presets and custom exploration

Each screen composes the shared `WaveSceneModel` (`src/common/model/`) — electromagnetic wave propagation, optical materials, and field sampling — with screen-specific initial state and controls.

### Capabilities

- Four-screen SceneryStack simulation with model/view separation per screen
- English, French, and Spanish localization via `StringManager`
- Default and projector color profiles
- Progressive Web App (installable, offline-capable)
- Git hooks for Biome pre-commit checks
- Shared GitHub Actions CI via `OpenLyceum/Baton`

## Quick Start

```bash
npm install
npm run icons    # generate PNG icons from public/icons/icon.svg
npm start        # dev server → http://localhost:5173
```

## Scripts

| Command | Description |
|---|---|
| `npm start` / `npm run dev` | Start Vite dev server |
| `npm run build` | Type-check + production build → `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm test` | Run Vitest unit tests (includes memory-leak suite) |
| `npm run test:fuzz` | Optional Playwright fuzz smoke: pointer (`?fuzz`) + keyboard (`?fuzzBoard`), with `?ea`, 30s each |
| `npm run test:fuzz -- 90` | Same fuzz for 90 seconds (`--duration 90` or `FUZZ_DURATION=90` also work) |
| `npm run test:fuzz:quick` | Shorter fuzz smoke (10s) |
| `npm run test:fuzz:long` | Longer fuzz smoke (300s) |
| `npm run check` | TypeScript type check |
| `npm run lint` | Biome lint check |
| `npm run format` | Auto-format all files |
| `npm run fix` | Lint + auto-fix |
| `npm run icons` | Regenerate PNG icons from `public/icons/icon.svg` |
| `npm run release` | `check && lint && build && test`, then version patch + push tags |
| `npm run clean` | Remove `dist/` |

New sims start at `version: "0.0.0"` in `package.json`. Bump only when cutting a release (for example `npm version patch` and a matching git tag). Keep `name` in kebab-case; it is separate from the SceneryStack sim identifier in `src/init.ts`, which reads its `version` from `package.json`.

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| [SceneryStack](https://scenerystack.org/) | ^3.0.0 | Simulation framework |
| [Vite](https://vitejs.dev/) | ^8 | Build tool + dev server |
| [TypeScript](https://www.typescriptlang.org/) | ^7 | Type-safe JavaScript |
| [Biome](https://biomejs.dev/) | ^2.5 | Linting + formatting |
| [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) | ^1 | PWA + service worker |

## License

GNU Affero General Public License v3.0 — see [OpenLyceum org license](https://github.com/OpenLyceum/.github/blob/main/LICENSE).

## Contributing

See [OpenLyceum contributing guidelines](https://github.com/OpenLyceum/.github/blob/main/CONTRIBUTING.md).
Report bugs via GitHub Issues; use org issue templates.
