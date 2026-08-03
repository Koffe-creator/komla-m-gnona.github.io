# Personal website — Komla Gnona

A static personal site: plain HTML, CSS, and a little JavaScript. No frameworks,
no build step, no dependencies to install.

```
index.html    all the content — edit the text right here
styles.css    all the styling — colors are variables at the top
script.js     theme toggle, mobile menu, scroll reveals, email link
```

The only external request the page makes is to Google Fonts, for Fraunces and
IBM Plex. Everything else is local.

## Editing it

**Text and sections** — everything lives in `index.html`. Each section is marked
with a comment banner (`<!-- ==== EXPERIENCE ==== -->`) so it's easy to find.

**Colors** — the top of `styles.css` has a `:root` block with every color as a
variable, and a matching block for dark mode. Changing `--accent` in both
re-themes the whole site.

**Adding a job** — copy any `<li class="tl-item">` block in the experience
timeline. Keep the `reveal` class so it fades in like the others.

**Adding a project** — copy any `<article class="proj">` block. The big teal
number is `.metric__val` and the small caption under it is `.metric__label`. The
little ROC curve SVG is optional — include it only when the metric really is an
AUC, otherwise leave it out and just show the number.

**Adding the résumé back** — there is deliberately no résumé PDF in this repo.
Every version on hand opens with a line naming a city, and the site is meant to
carry no location at all. To restore the download:

1. Put a PDF with that line removed at `assets/Komla_Gnona_Resume.pdf`
2. In `index.html`, swap the "Get in touch" button in the hero for the
   commented-out download link sitting right above it

## No location, by design

Nothing on this page says where Komla lives or has lived — not the hero, the
About fact card, the timeline (dates only, no cities), or the footer. Keep it
that way when editing, and check any PDF before adding it to `assets/`.

## Viewing it locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000. (Double-clicking `index.html` also works, but a
local server is closer to how GitHub Pages will serve it.)

## Publishing to GitHub Pages

The repo name decides the URL:

| Repo name                 | Site URL                                       |
| ------------------------- | ---------------------------------------------- |
| `Koffe-creator.github.io` | `https://koffe-creator.github.io`              |
| anything else             | `https://koffe-creator.github.io/<repo-name>/` |

Once the repo exists and the code is pushed, turn Pages on under
**Settings → Pages → Build and deployment → Deploy from a branch → `main` / root**.
The first build takes a minute or two.

The `.nojekyll` file tells GitHub to serve the files as-is instead of running
them through Jekyll. Leave it there.
