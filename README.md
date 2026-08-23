# Alex Mills portfolio

A graphic design portfolio built with Next.js 14, TypeScript, Tailwind CSS, and NextUI. Its graphite, chrome, and violet visual system is derived from Alex Mills' brand mark.

## Run locally

```bash
npm install
npm run dev
```

## Add portfolio work

1. Put project images in `public/`.
2. Update `upcomingWork` in `app/page.tsx` with your project categories or case-study links.
3. Update the project title, discipline, and image alt text together.

The current layout uses a project index for upcoming work. When projects are ready, each entry can become a link to a full case study.

## Contact form

Copy `.env.example` to `.env.local` and set a private Discord webhook URL. The webhook is read only by the server action and is never included in the browser bundle.

```env
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/...
```

## Checks

```bash
npm run build
```
