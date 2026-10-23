# Responsible Hybrid Intelligence

A React/Vite prototype for the Leverhulme Doctoral Programme at Strathclyde and Glasgow. Structure is inspired by NIA Leverhulme; visual direction and project filtering are inspired by AQT. Reference-site copy and custom artwork have not been reproduced.

## Run locally

Requires Node.js 22.12+ (or a supported newer release).

```sh
npm install
npm run dev
```

Vite prints the preview URL, normally http://localhost:5173.

```sh
npm run lint
npm run build
npm run preview
```

## Editing

Main navigation: Home, Themes, About, Students, a Programme drop-down (PhD Programme, Masters+, Postdoctoral & PDRA support, Conferences & cohort activities), and a prominent Opportunities link leading to the opportunity catalogue. Applications are not yet open; How to Apply and Contact remain available through the footer. Themes covers co-adaptation, agency, and grounding, separately from About, with guiding questions and connections for each theme. About includes a "One connected community" disciplines section. Masters+ has its own pathway page and is offered at the University of Glasgow only.

The proposal catalogue contains three Masters+ opportunities and eight PhD scholarships. The first three placeholder entries are provisionally assigned Masters+; replace these assignments when the approved catalogue arrives. Projects support keyword search, combined pathway/theme/university filters, expandable details, and empty results. Supervisor and host information and a View details link are visible without expanding. Each link leads to that opportunity's own page at `/projects/1` through `/projects/11`; individual opportunities are not linked from the main navigation. These are public pages, not access-controlled pages, and no submission form is live.

Only Cohort 1 is visible by default. To re-enable Cohorts 2 and 3, set `VITE_SHOW_FUTURE_COHORTS=true` in a local `.env` file or the build environment, then restart the dev server or rebuild. Cohort tabs support arrow keys, Home, and End for the visible cohorts.

Content and project data are in `src/App.jsx`. Global styles are in `src/index.css`; layouts are in `src/App.css`. Images and logos are hosted locally in `public/images`.

## Before publication

- Replace the 11 placeholder projects with approved briefs, supervisors, pathway assignments, themes, and university allocations. The draft's alternating 6/5 host allocations are placeholders, not a promised recruitment split. The supplied 50/50 figure describes the overall partnership. Theme descriptions and guiding questions are draft explanatory copy and need approval. The Programme page gives a general overview of interdisciplinary exchange; confirm the activities, training offer, formats, and schedule before making more specific promises.
- Confirm application dates, eligibility, duration, stipend, home/international fee coverage, and visa/language requirements. Applications are made by email (no form): set `applicationEmail` in `src/App.jsx` to the confirmed address to show it on the How to Apply page and enable the "Open in your email app" button.
- Confirm Master's courses, modules, duration, funding, entry criteria, progression requirements, and cohort dates. The Masters+ page describes the pathway without promising unapproved terms. Student profiles have not been invented.
- The PDRA support and cohort activities pages describe the planned framework; add confirmed call dates, budgets, and dated events when available.
- Add the approved programme email, accessibility/privacy statements, and institutional branding approvals. The privacy link currently points to Strathclyde's notice, not a bespoke website policy.
- Confirm usage rights for the supplied RHI artwork. Review institutional logo and Trust acknowledgement requirements before launch.
- Funding headlines use the £5 million Leverhulme Trust award. The pasted programme announcement separately identifies £4.1 million of university investment; do not describe the combined figure as studentship funding.

There is no backend, application submission, analytics, or email collection. Applications are not claimed to be open. Google Fonts makes third-party requests; self-host fonts if institutional policy requires it.

## Deployment

### GitHub Pages

1. Sign in to https://github.com/new and create a public repository, for example `responsible-hybrid-intelligence`. Leave README, licence, and gitignore options unchecked because this folder already has its own files. Free GitHub Pages hosting requires a public repository; supported paid plans can publish from private repositories.
2. Upload this project to the repository's `main` branch. Include `src`, `public`, `.github/workflows/deploy-pages.yml`, and the root configuration files. Do not upload `node_modules` or `dist`; both are gitignored. Review all content and image usage rights before publishing.
3. In the repository, select **Settings > Pages > Build and deployment > Source > GitHub Actions**.
4. Open **Actions > Deploy website to GitHub Pages** and run the workflow on `main`, or push another change to `main`.
5. Once deployment succeeds, Pages settings will show `https://USERNAME.github.io/REPOSITORY/`. Future pushes to `main` automatically rebuild and deploy the site.

The workflow installs locked dependencies, runs lint, builds with `npm run build:pages`, and uploads `dist`. Vite derives the repository base path from GitHub's `GITHUB_REPOSITORY` environment variable. A repository named `USERNAME.github.io` uses the domain root instead. The Pages build uses hash routing, so direct links such as `/REPOSITORY/#/projects` survive refresh without server rewrites. The normal local development server retains clean URLs.

To test a Pages-style build locally in PowerShell:

```powershell
$env:GITHUB_REPOSITORY = 'USERNAME/REPOSITORY'
npm run build:pages
Remove-Item Env:GITHUB_REPOSITORY
npm run preview -- --base /REPOSITORY/
```

### Other hosting

For hosting outside GitHub Pages, run `npm run build` and deploy `dist`. The normal build uses clean URLs and assumes domain-root hosting. Configure an `index.html` history fallback for unmatched paths, otherwise direct links such as `/projects` will return 404. Custom-domain and subdirectory hosting may require separate base-path configuration.

## Assets

- RHI artwork: user-supplied WebP assets. All page banners use `logo-banner-3.webp` over a consistent blue background. The homepage artwork is capped at its 1024px native width; a higher-resolution source is needed for a full-bleed photograph-quality background. Header and footer marks use `Logo-Circle-2.webp` and `logo-circle.webp`. Confirm attribution and usage rights with the programme before publication.
- Unused research photo retained in the image folder: National Cancer Institute, Unsplash, image ID `1579154204601-01588f351e67`, under the Unsplash licence. It is no longer displayed on the website.
- Glasgow skyline: Giuseppe Milo, [Clyde arch, Glasgow, Scotland](https://www.flickr.com/photos/giuseppemilo/16331067284/), [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/), also [documented on Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Clyde_Arc_at_night.jpg). A 1024px image is hosted locally as `glasgow-clyde-skyline.jpg` and displayed with CSS cropping. The footer links the author/source and licence. The previous rooftop skyline and campus photographs are retained but not displayed.
- Trust logo: official asset at `https://www.leverhulme.ac.uk/sites/default/files/Leverhulme_Trust_RGB_blue_0_0.png`.
- University logos: institutional marks served by AQT at `https://www.aqt.ac.uk/wp-content/uploads/2024/10/logo-uos.png` and `https://www.aqt.ac.uk/wp-content/uploads/2024/10/logo-uog.svg`. Marks remain the property of their institutions.
