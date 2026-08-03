# Personal website — Komla Gnona

A static personal site: plain HTML, CSS, and a little JavaScript. No frameworks,
no build step, no dependencies to install.

```
index.html    all the content — edit the text right here
styles.css    all the styling — colors are variables at the top
script.js     theme toggle, mobile menu, scroll reveals, email link
sitemap.xml   one URL, for submitting to Google Search Console
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

## Getting indexed by Google

Verifying in Search Console needs a Google sign-in, so it has to be done by hand
at https://search.google.com/search-console. The site is already prepped:

1. Add a **Domain** property for `komlagnona.com`. Since the domain is on
   Cloudflare, verification is a single TXT record — Search Console gives you the
   value, and Cloudflare has a one-click flow for it. A Domain property covers
   `www`, the apex, http and https all at once.
2. **Sitemaps** → submit `sitemap.xml`
3. **URL Inspection** on `https://komlagnona.com/` → **Request indexing**

The `google-site-verification` meta tag in `index.html` is only needed for the
HTML-tag method. With a Domain property you can leave it commented out.

If `sitemap.xml` ever lists more than the homepage, update `<lastmod>`.

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
