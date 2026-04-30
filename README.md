# TechStack Insight Frontend

React + Vite + JSX + Tailwind CSS frontend for exploring normalized software job market data.

## Features

- Dashboard analytics with real API data, charts, summary cards, and day filters.
- Jobs listing with filters, pagination, job cards, and job detail navigation.
- Job detail view with source metadata, cleaned descriptions, and apply links.
- Skills catalog with search, create flow, top skills panel, and jobs navigation.
- Companies analysis using company data extracted from jobs, single-company analytics, and company comparison.

## Screenshots

Add current UI screenshots under `docs/screenshots/`:

- `docs/screenshots/dashboard.png`
- `docs/screenshots/jobs.png`
- `docs/screenshots/job-detail.png`
- `docs/screenshots/skills.png`
- `docs/screenshots/companies.png`

Recommended capture sizes:

- Desktop: `1440x1000`
- Mobile: `390x844`

## Getting Started

Install dependencies:

```bash
npm install
```

Run the frontend:

```bash
npm run dev
```

By default the API base URL falls back to:

```bash
http://localhost:8080
```

To override it, create an environment file:

```bash
VITE_API_URL=http://localhost:8080
```

## Main Flows

Dashboard:

- Open `/`.
- Review top skills, locations, role demand, work modes, and trending skills.
- Switch between `7`, `30`, and `90` day views.

Jobs:

- Open `/jobs`.
- Filter by title, skill, role family, country, source, work mode, and posted date.
- Use pagination to move through results.
- Open `/jobs/:id` from `View Details`.

Skills:

- Open `/skills`.
- Search the canonical skill catalog.
- Add a new skill.
- Use `View Jobs` to navigate to matching jobs.

Companies:

- Open `/companies`.
- Companies are extracted from the first jobs page using `companyId` and `companyName`.
- Select a company to view top skills, role distribution, and work mode distribution.
- Select two different companies and compare their demand snapshots.

## Quality Checks

```bash
npm run lint
npm run build
```

The build may warn about large chunks because the app currently bundles charting and UI code into the main client bundle.
