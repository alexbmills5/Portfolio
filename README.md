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

## Deploy from a local Jenkins server

Jenkins polls GitHub every two minutes. Manual builds deploy to a Vercel
preview. Builds triggered by a new commit on `main` deploy to production
after `npm run build` passes. Jenkins submits the checked-out source and
Vercel builds it with the target environment's settings.

1. Install the [NodeJS plugin](https://plugins.jenkins.io/nodejs/) under
   **Manage Jenkins → Plugins**. Then open **Manage Jenkins → Tools**,
   add a NodeJS installation named exactly `NodeJS 24`, enable
   **Install automatically**, and select a Node.js 24.x release. Jenkins
   adds that installation to the agent's PATH when the job starts.
   The agent also needs Git and outbound HTTPS access to GitHub,
   nodejs.org, npm, Google Fonts, and Vercel.
2. In Jenkins, add a **Secret text** credential with ID
   `portfolio-vercel-token`. Use a Vercel token scoped to the team that owns
   the `portfolio` project.
3. Once the Jenkinsfile is on `main`, create a **Pipeline** job and select
   **Pipeline script from SCM**. Use Git, the repository
   `https://github.com/alexbmills5/Portfolio.git`, the branch specifier
   `*/main`, and the script path `Jenkinsfile`.
4. Select **Build Now** to register polling and create the first preview.
   Open the deployment URL from the Jenkins console to verify it.
5. After verifying the preview, add this setting to `vercel.json` on
   `main` so Jenkins handles production and Vercel continues to create
   previews for other branches.

   ```json
   {
     "git": {
       "deploymentEnabled": {
         "main": false
       }
     }
   }
   ```
