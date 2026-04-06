# Matthew Vollo Resume Site

A modular static resume site for Porkbun static hosting.

## Structure

- `index.html` - page shell
- `assets/css/styles.css` - all styling
- `assets/js/main.js` - rendering logic
- `data/site.js` - site copy and top-level metadata
- `data/experience.js` - work history
- `data/projects.js` - project highlights
- `data/skills.js` - skills blocks
- `data/education.js` - education entry
- `components/` - placeholder folder reserved for future HTML partials
- `assets/img/` - reserved for images or icons

## Editing content

For the easiest updates, edit only the files in `data/` and `assets/js/main.js`.

### Recommended workflow

1. Update `data/experience.js` for job changes.
2. Update `data/projects.js` for project highlights.
3. Update `data/skills.js` for skill categories.
4. Update `data/site.js` for header text, email, or footer text.

## Deployment

### Porkbun Static Hosting
1. Create or select your Porkbun static hosting site.
2. Connect the GitHub repository through Porkbun GitHub Connect.
3. Set the publish branch.
4. Push changes to that branch to deploy automatically.

### Local preview
Because the site uses `fetch()` for modular content loading, preview it through a local web server instead of opening `index.html` directly from the filesystem.

Examples:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Notes

- The bottom contact section was removed on purpose to avoid redundancy.
- Anchor links account for the sticky navigation bar.
- The wording avoids any "actively job hunting" language.
