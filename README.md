# Alex Mills portfolio

A software engineering portfolio built with Next.js 14, React, and TypeScript. The Classic Red palette (near-black, charcoal, deep red, bright red, and neutral grays) includes an interactive canvas visual, professional work summaries, a career timeline, and a downloadable resume.

## Run locally

```bash
npm install
npm run dev
```

## Update content

- Professional work and experience are defined in `app/page.tsx`.
- The interactive engineering visual is in `app/system-visual.tsx`.
- Styles and responsive layouts are in `app/globals.css`.
- Replace `public/Alex_Mills_Resume.pdf` when the resume changes.
- Metadata and the generated social preview live in `app/layout.tsx` and `app/opengraph-image.tsx`.

Work visuals are original concept studies based on professional experience; they do not contain client screenshots or patient data.

## Contact form

Copy `.env.example` to `.env.local` and set `DISCORD_WEBHOOK_URL`. The existing server action reads this private setting on the server. Without it, the form provides an error and a direct email link.

## Checks

```bash
npx tsc --noEmit
npm run build
```
