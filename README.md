# FORME React Storefront

A production-oriented React conversion of the supplied Claude Design export. The original `Main.dc.html`, `ProductCard.dc.html`, runtime files, and assets remain unchanged in the parent directory.

## Run locally

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
```

The generated static site is written to `dist/`.

## Structure

- `src/App.jsx` — shared storefront state, theme application, GSAP/ScrollTrigger setup
- `src/components/Header.jsx` — announcement bar, responsive navigation, mega menus, cart toast
- `src/components/Sections.jsx` — the 14 homepage content sections
- `src/components/ProductCard.jsx` — reusable product card and product interactions
- `src/components/ThemeCustomizer.jsx` — palette presets, custom palette editing, validation, schemes, and persistence
- `src/components/Shared.jsx` — shared buttons, headings, and category cards
- `src/data.js` — mock catalog and editorial content
- `src/theme.js` — semantic token generation and WCAG contrast utilities
- `src/styles.css` — the original visual foundation plus small React-specific refinements
- `public/assets/` — copied local image assets from the design export

## Color palette system

The bottom-left **Colors** control exposes six presets and custom palettes. A custom palette can be created, duplicated, edited, or deleted. Edits preview live. The palette engine derives coordinated light/dark semantic CSS variables for text, surfaces, accents, controls, borders, sale states, focus states, and errors. Contrast checks show ratios and can automatically propose compliant values.

The active palette, custom palettes, and section light/dark choices are persisted in `localStorage` under `forme.theme.v1`.

## Interactions

The demo includes the hero slider, announcement controls, desktop mega menus, mobile navigation drawer, product carousel, wishlist, swatches, quick add and bag count, collection tabs, lookbook hotspots, FAQ accordion, newsletter validation, region selector, and theme settings.

GSAP and `@gsap/react` power the hero choreography and ScrollTrigger entry reveals. CSS handles simple hover and state transitions. Both respect `prefers-reduced-motion`.

## Known limitations

- This is a storefront UI demo only; checkout, payments, accounts, inventory, and commerce backends are intentionally mocked.
- The Claude export referenced several non-exported `/_blob/...` images. Those unavailable references were mapped to the closest bundled FORME imagery so no product or campaign media is broken.
- Google Fonts load from the network. System fallbacks are provided if the font request is unavailable.
