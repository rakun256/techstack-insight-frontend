# TechStack Insight Frontend

> A modern React + Vite dashboard for exploring normalized software job market data, technology demand, role trends, and company-level hiring signals.

<p align="center">
  <img src="https://img.shields.io/badge/React-Frontend-61DAFB?logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Vite-Build-646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/API-Spring%20Boot-6DB33F?logo=springboot&logoColor=white" alt="Spring Boot API" />
</p>

---

## Overview

**TechStack Insight Frontend** is the client application of a multi-source job market analysis system. It visualizes normalized software job postings and helps users understand which technologies, roles, locations, work modes, and companies are most represented in the collected data.

The frontend is built with **React**, **Vite**, **JSX**, and **Tailwind CSS**. It communicates with the backend API to display real analytics data through dashboards, charts, filters, job cards, skill catalogs, and company comparison views.

---

## Features

* **Dashboard analytics** with real API data, summary cards, charts, and day-based filters.
* **Jobs explorer** with title, skill, role family, country, source, work mode, date filters, and pagination.
* **Job detail view** with source metadata, cleaned descriptions, and external apply links.
* **Skills catalog** with search, skill creation, top requested skills, and skill-to-jobs navigation.
* **Companies analysis** with company-level top skills, role distribution, work mode distribution, and side-by-side company comparison.
* **Responsive navigation** with desktop sidebar and mobile drawer menu.
* **Branded UI theme** based on the TechStack Insight identity colors.

---

## Tech Stack

| Area        | Technology       |
| ----------- | ---------------- |
| Framework   | React            |
| Build Tool  | Vite             |
| Language    | JavaScript / JSX |
| Styling     | Tailwind CSS     |
| Charts      | Recharts         |
| Routing     | React Router     |
| HTTP Client | Axios            |
| Icons       | Lucide React     |

---

## Screenshots

### Dashboard

<p align="center">
  <img src="https://github.com/user-attachments/assets/65b6a3f5-4feb-4f32-90bc-d347af6be388" alt="TechStack Insight Dashboard" width="850" />
</p>

### Jobs

<p align="center">
  <img src="https://github.com/user-attachments/assets/ef7a0236-ccec-43da-8d5d-35e1077c41c1" alt="TechStack Insight Jobs Page" width="850" />
</p>

### Skills

<p align="center">
  <img src="https://github.com/user-attachments/assets/5ac043e8-ee46-4896-a1e4-6e921d140ec0" alt="TechStack Insight Skills Page" width="850" />
</p>

### Companies

<p align="center">
  <img src="https://github.com/user-attachments/assets/b7e9615d-eec2-4e9a-b476-ceb8b407079c" alt="TechStack Insight Companies Page" width="850" />
</p>

---

## Project Structure

```txt
src/
  api/
    apiClient.js
    analyticsApi.js
    jobsApi.js
    skillsApi.js
    index.js

  components/
    charts/
    companies/
    dashboard/
    jobs/
    layout/
    skills/
    ui/

  pages/
    Dashboard.jsx
    Jobs.jsx
    JobDetail.jsx
    Skills.jsx
    Companies.jsx
    NotFound.jsx

  utils/
    chartMappers.js
    companyMappers.js
    formatters.js

  App.jsx
  main.jsx
  index.css
```

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:8080
```

If `VITE_API_URL` is not provided, the application falls back to:

```txt
http://localhost:8080
```

### 3. Run the development server

```bash
npm run dev
```

The frontend will usually be available at:

```txt
http://localhost:5173
```

---

## Main User Flows

### Dashboard

Open `/` to review global job market analytics:

* most in-demand technologies
* top job locations
* role demand by family
* work mode distribution
* trending skills
* `7`, `30`, and `90` day views

### Jobs

Open `/jobs` to explore normalized job postings:

* filter by title, skill, role family, country, source, work mode, and posted date
* use pagination to browse results
* open `/jobs/:id` from **View Details**
* open the original job posting through **Apply**

### Job Detail

Open `/jobs/:id` to inspect a single posting:

* job title and company
* location and work mode
* source metadata
* role classification
* cleaned description
* external application link

### Skills

Open `/skills` to browse the canonical skill catalog:

* search skills client-side
* add a new skill
* view most requested skills
* navigate to related jobs with **View Jobs**

### Companies

Open `/companies` to analyze company-level demand:

* companies are extracted from job data using `companyId` and `companyName`
* select one company to view top skills, role distribution, and work mode distribution
* select two companies to compare their demand snapshots side by side

---

## API Integration

The frontend uses a small API layer under `src/api/`:

| File              | Responsibility                                                     |
| ----------------- | ------------------------------------------------------------------ |
| `apiClient.js`    | Axios instance, base URL, error normalization, clean params helper |
| `analyticsApi.js` | Dashboard and company analytics endpoints                          |
| `jobsApi.js`      | Job listing, filtering, pagination, and job detail endpoints       |
| `skillsApi.js`    | Skill listing, detail, and creation endpoints                      |
| `index.js`        | Central API exports                                                |

---

## Quality Checks

Run linting:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

> The production build may warn about large chunks because charting and UI-related code are currently bundled into the main client bundle.

---

## Notes

* The frontend does **not** trigger ingestion/admin operations.
* The UI consumes already-normalized and persisted backend data.
* Company options are currently derived from job results because the frontend does not depend on a separate company listing endpoint.
* The application is designed as a lightweight analytics dashboard for software job market exploration.

---

## Brand Colors

| Token        | Color     |
| ------------ | --------- |
| Primary Dark | `#114444` |
| Primary Mint | `#bbeedd` |
| Soft Mint    | `#e8fff4` |

---

## License

This project was developed for an applied SQL / full-stack software project milestone.
