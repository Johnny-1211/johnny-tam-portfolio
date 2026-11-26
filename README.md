# Johnny Tam — portfolio

Vite + React build of the Claude Design file `Johnny Tam Portfolio v38.dc.html`.

```bash
npm install
npm run dev      # local development
npm run build    # static site in dist/
npm run preview  # serve the build
```

- `src/PortfolioView.jsx` — markup
- `src/Portfolio.jsx` — content (projects, skills, links) and interactions
- `src/house-scene.js` — three.js house backdrop
- `src/styles.css` — global and responsive styles
- `public/` — résumé PDF, project screenshots, house stills

Append `?view=full` or `?view=recruiter` to force a mode.
