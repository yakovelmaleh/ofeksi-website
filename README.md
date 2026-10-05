# Ofek Si Website Redesign

Modern local redesign of [ofeksi.com](https://www.ofeksi.com) for Emil Staroselski's mortgage and family-finance consultancy.

## Structure

- `index.html` — stable entry point that redirects to the latest version.
- `v1/` — the original redesigned version.
- `v2/` — Apple-design version with translucent materials, tactile feedback, refined typography, fluid motion, and accessibility fallbacks.
- `v1/content.js` — editable services, process steps, reviews, and contact details.
- `v1/styles.css` — responsive RTL design system and page styling.
- `v1/app.js` — mobile navigation, reveal effects, mortgage calculator, and WhatsApp lead form.
- `v1/assets/` — locally stored logo, portrait, association badge, and favicon.

## Run locally

From this folder:

```bash
python3 -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

No installation or build step is required.

## Edit the website

1. Change business content, testimonials, or contact data in the latest version's `content.js`.
2. Change page copy or section order in the latest version's `index.html`.
3. Change base colors in `styles.css`; Apple-design refinements are in `v2/apple.css`.
4. Replace files under the latest version's `assets/` while keeping the existing filenames, or update their paths in the HTML.

The lead form intentionally has no backend. It builds a prefilled WhatsApp message and opens it in a new tab, so the local demo does not store personal information.
