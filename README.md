# Personal website — Komla Gnona

A static personal site: plain HTML, CSS, and a little JavaScript. No frameworks,
no build step, no dependencies. Open `index.html` in a browser and it works.

```
index.html    all the content — edit the text right here
styles.css    all the styling — colors are variables at the top
script.js     theme toggle, mobile menu, scroll effects, email reveal
assets/       résumé PDF
```

## Editing it

**Text and sections** — everything lives in `index.html`. Each section is marked
with a comment (`<!-- ==== EXPERIENCE ==== -->`) so it's easy to find what you want
to change.

**Colors** — the top of `styles.css` has a `:root` block with every color as a
variable. Changing `--accent` in both the light and dark blocks re-themes the
whole site.

**Adding a project** — copy any `<article class="card">` block in the projects
section and edit the four parts: kicker, title, body, tags.

**Updating the résumé** — replace `assets/Komla_Gnona_Resume.pdf` with a new file
of the same name and the download buttons keep working.

## Before publishing

- [ ] Add your LinkedIn URL — search `YOUR-LINKEDIN-HANDLE` in `index.html`
- [ ] Check the numbers in the hero stats block still read the way you want
- [ ] Confirm the résumé PDF in `assets/` is the version you want public

## Viewing it locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000. (You can also just double-click `index.html`,
but a local server is closer to how GitHub Pages will serve it.)

## Publishing to GitHub Pages

The repo name decides the URL:

| Repo name              | Site URL                             |
| ---------------------- | ------------------------------------ |
| `Koffe-creator.github.io` | `https://koffe-creator.github.io`  |
| anything else          | `https://koffe-creator.github.io/<repo-name>/` |

Once the repo exists and the code is pushed, turn Pages on under
**Settings → Pages → Build and deployment → Deploy from a branch → `main` / root**.
The first build takes a minute or two.

The `.nojekyll` file tells GitHub to serve the files as-is instead of running them
through Jekyll. Leave it there.
