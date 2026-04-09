# Matthew Vollo Resume Site

Personal resume site. Built with vanilla HTML, CSS, and JavaScript

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
- `assets/img/` - favicon and images

## Editing content

For the easiest updates, edit only the files in `data/` and `assets/js/main.js`.

### Recommended workflow

1. Update `data/experience.js` for job changes.
2. Update `data/projects.js` for project highlights.
3. Update `data/skills.js` for skill categories.
4. Update `data/site.js` for header text, email, or footer text.

## Local preview

The site must be served over HTTP rather than opened directly from the filesystem.

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Deployment

Hosted on GitHub Pages. Push to `main` to deploy.
