# FocusBoard — Task Dashboard

A responsive single-user task dashboard built with React 19, Vite and CSS for the FocusBoard frontend trainee assessment.

## Features
- Six initial sample tasks with title, description, category, status, priority and due date.
- Create, edit (all fields), delete (with confirmation), and update status.
- Required-title validation with an inline error message.
- Case-insensitive title search combined with status and priority filters.
- Live statistics and completion rate derived from task data.
- Three-slide Focus Notes carousel with previous/next and slide indicators.
- Browser localStorage persistence; no backend required.
- Responsive layout, semantic controls, associated labels and visible keyboard focus.

## Run locally
Requires Node.js compatible with Vite 8 (Node 20.19+ or 22.12+).

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. For production:

```bash
npm run build
npm run preview
```

## State management
React `useState` is the single source of truth for tasks, filters, and edit state. React `useEffect` saves task changes to localStorage. Task counts and filtered results are derived from task state, not hardcoded. Updates use immutable `map`, `filter`, and array spreading. The carousel keeps its own active slide index.

## Deployment
Import the public GitHub repository into [Vercel](https://vercel.com/new) or [Netlify](https://app.netlify.com/start). Select Vite, build command `npm run build`, output directory `dist`. No environment variables required.

**Hosted URL:** Add your deployed HTTPS URL here after deployment.

## Known limitations
- Single-browser localStorage only; tasks do not sync across devices.
- No accounts, backend, or notifications (not required by the assignment).
- Focus Notes copy is illustrative and should be checked against the live Figma reference for exact text and visual fidelity.
- Navigation provides dashboard/task/important shortcuts rather than additional pages.

## Screenshots
Add a desktop screenshot (1440 px) and a mobile screenshot (390 px) to `screenshots/` after checking the running application. These cannot be authentically captured from source code alone.

## AI disclosure
See [AI_USAGE.md](AI_USAGE.md).
