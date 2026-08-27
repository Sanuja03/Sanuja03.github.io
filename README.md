# Sanuja — developer portfolio

A responsive React + Vite portfolio for an IT & Management student. Content lives in `src/data/portfolio.js` so personal details and projects are easy to update.

## Local development

```bash
npm install
npm run dev
```

For the optional contact API, copy `backend/.env.example` to `backend/.env`, fill in the Resend settings, then run `npm install && npm start` inside `backend/`. Set `VITE_API_URL` in the root `.env` when wiring the form to the API.

## Production and deployment

`npm run build` creates `dist/`, suitable for GitHub Pages or another static host. Set Vite's `base` to the repository path if deploying to a project page. Deploy `backend/` separately to a Node host such as Render and configure `PORT`, `FRONTEND_ORIGIN`, `CONTACT_TO`, and `RESEND_API_KEY` there.

## Personalise

Replace every `[TODO: ...]` value in `src/data/portfolio.js`, update project links/descriptions, and replace the placeholder email and LinkedIn URL before publishing. No secrets belong in the frontend or repository.
