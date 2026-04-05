# Vollo.dev resume site

A clean, single-page resume site for `Vollo.dev`.

## What is included

- `index.html`
- `styles.css`
- `script.js`
- `.gitignore`
- `README.md`

## Deployment options

### Porkbun Static Hosting
Porkbun’s static hosting supports HTML, CSS, and JS, includes free SSL, FTP access, GitHub Connect, and up to 5 GB storage on the Pro yearly plan. Their current static hosting docs say GitHub changes can auto-update the live site after you connect the repository and branch. For the yearly bundle, Porkbun currently advertises $30 for the first year with a custom domain plus static hosting. Source docs: Porkbun Static Hosting and GitHub Connect help pages.

### GitHub Connect workflow

1. Push this folder to a GitHub repository.
2. In Porkbun, open the domain’s Static Hosting page.
3. Use **GitHub Connect**.
4. Install/select the repository.
5. Choose the branch, typically `main`.
6. Commit changes to the repository. Porkbun will update the live site automatically.

## Local preview

Open `index.html` in a browser, or use a lightweight static server.

Example:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Editing the content

The resume content is in `index.html`.

Recommended update flow:
- edit text in `index.html`
- commit to GitHub
- let Porkbun deploy the changes

## Contact choice

For a personal resume site, use `matt@vollo.dev` as the public contact address. Keep `contact@vollo.dev` for later if you want a general inbox or a shared address for other projects.

## Notes

- No frameworks.
- No dependencies.
- Easy to maintain.
- Designed to look restrained and professional rather than flashy.
