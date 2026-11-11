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

Main navigation: Home, Themes, About, Leverhulme PhD Students, a Programme drop-down (PhD Programme, Masters+, Postdoctoral & PDRA support, Conferences & cohort activities), and a prominent Opportunities link leading to the opportunity catalogue. Applications are not yet open; How to Apply and Contact remain available through the footer. Themes covers co-adaptation, agency, and grounding, separately from About, with guiding questions and connections for each theme. About includes a "One connected community" disciplines section. Masters+ has its own pathway page and is offered at the University of Glasgow only. How to Apply (`/apply`) opens with the apply-by-email steps, with a sidebar of Ready to apply / Contact the programme / Register interest links and international-applicant information beneath them; the eligibility check follows. The checklist, email template, and CV guidance are on a separate Application template page (`/apply/template`).

The proposal catalogue lists the 18 approved Cohort 1 research proposals. Proposal content lives in `src/data/proposals.json`, extracted from the approved Word adverts; edit that file to change titles, summaries, aims, supervisors, or add/remove proposals. Each entry has an `id` (used in the URL, e.g. `/projects/av-1`), a `reference` applicants quote in their email (e.g. `RHI-AV-1`), `title`, `theme` (must match one of the site's three themes), `hostUniversity`, `leadSupervisor` (name, department, university), `summary`, `keywords`, and `background`/`aims`/`methods` paragraph arrays plus a `supervision` paragraph. Proposals are listed alphabetically by title (the display number follows that order, not the file order). Projects support keyword search (title, summary, keywords, supervisors), combined theme/university filters, expandable details with Expand all / Collapse all, and empty results. The reference, theme, supervisor, host, and a View details link are visible without expanding. Supervisor emails and job titles are deliberately not published: applicants must contact the Programme Director or Deputy Director, not the lead supervisor, and each lead supervisor's name links to their card on the About page (`/about#person-…`, generated from the name, so it must match a `team` entry or director in `src/App.jsx`). Individual proposals are not linked from the main navigation. These are public pages, not access-controlled pages, and no submission form is live.

Only Cohort 1 is visible by default. To re-enable Cohorts 2 and 3, set `VITE_SHOW_FUTURE_COHORTS=true` in a local `.env` file or the build environment, then restart the dev server or rebuild. Cohort tabs support arrow keys, Home, and End for the visible cohorts.

Page content is in `src/App.jsx`; proposal data is in `src/data/proposals.json`. Global styles are in `src/index.css`; layouts are in `src/App.css`. Typography follows the AQT CDT site: Sora (Google Fonts) for body text via `--body`, and bold Helvetica/Arial for headings via `--heading`. Keep secondary text at `--muted` or darker for contrast. Images and logos are hosted locally in `public/images`.

Refer to the programme's students as "Leverhulme PhD Students" (not "doctoral researchers" or "students"); "studentships" still describes the funded positions.

Cohort 1, round 1 dates (applications close mid-December 2026; interviews early January 2027) appear on the Home, How to Apply, PhD Proposals, opportunity, and Masters+ pages. Update all of them together when exact dates are confirmed.

## Before publication

- Confirm which proposals follow the Masters+ route (Glasgow-hosted proposals currently show "Four-year PhD or Masters+ (to be confirmed)"). The supplied 50/50 figure describes the overall partnership. Theme descriptions and guiding questions are draft explanatory copy and need approval. The Programme page gives a general overview of interdisciplinary exchange; confirm the activities, training offer, formats, and schedule before making more specific promises.
- Confirm exact application dates, duration, stipend, home/international fee coverage, and visa/language requirements. Applications are made by email (no form): set `programmeEmail` in `src/App.jsx` to the confirmed address. It is shown on the Application template, Register interest, Contact, Accessibility, EDI, and Privacy pages, and enables the "Open in your email app" button.
- Confirm Master's courses, modules, duration, funding, entry criteria, progression requirements, and cohort dates. Masters+ is described as University of Glasgow only for the first cohort; update this if future cohorts differ. Masters+ eligibility (the Eligibility page at `/eligibility`, linked from How to Apply, each proposal, the Masters+ page, and the EDI page) follows the Leverhulme Centenary Doctoral Scholarships 2026 terms and conditions: UK-domiciled, no existing Master's from the host institution, and a low-income household background and/or one of the Trust's listed ethnicity categories. Do not publish monetary values from the terms and conditions. The Masters+ page describes the pathway without promising unapproved terms. Student profiles have not been invented.
- The PDRA support and cohort activities pages describe the planned framework; add confirmed call dates, budgets, and dated events when available.
- Add each team member's one-line RHI/theme-lead role via the `role` field in the `team` array in `src/App.jsx` (a placeholder is shown until set). The Grounding theme description was reframed around responsibility and accountability and should be reviewed by a Grounding lead.
- The Accessibility, EDI, and Privacy notice pages are drafts marked as awaiting approval; have them reviewed by the universities' accessibility, EDI, and data protection teams, then remove the draft notices. Confirm institutional branding approvals.
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

- RHI artwork: user-supplied WebP assets. All page banners use `logo-banner-3.webp` over a consistent blue background, at a fixed height (`--page-intro-height` in `src/App.css`: 410px desktop, 400px at ≤800px, 490px at ≤480px) so every page header matches; raise it if a longer title overflows. The homepage artwork is capped at its 1024px native width; a higher-resolution source is needed for a full-bleed photograph-quality background. Header and footer marks use `Logo-Circle-2.webp` and `logo-circle.webp`. Confirm attribution and usage rights with the programme before publication.
- Unused research photo retained in the image folder: National Cancer Institute, Unsplash, image ID `1579154204601-01588f351e67`, under the Unsplash licence. It is no longer displayed on the website.
- Glasgow skyline: Giuseppe Milo, [Clyde arch, Glasgow, Scotland](https://www.flickr.com/photos/giuseppemilo/16331067284/), [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/), also [documented on Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Clyde_Arc_at_night.jpg). A 1024px image is hosted locally as `glasgow-clyde-skyline.jpg` and displayed with CSS cropping. The footer links the author/source and licence. The previous rooftop skyline and campus photographs are retained but not displayed.
- Trust logo: official asset at `https://www.leverhulme.ac.uk/sites/default/files/Leverhulme_Trust_RGB_blue_0_0.png`.
- University logos: institutional marks served by AQT at `https://www.aqt.ac.uk/wp-content/uploads/2024/10/logo-uos.png` and `https://www.aqt.ac.uk/wp-content/uploads/2024/10/logo-uog.svg`. Marks remain the property of their institutions.
