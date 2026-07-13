# Anthony Zettner — Portfolio

Plain HTML/CSS/JS. No build step, no framework, no dependencies to install.

## File structure
```
index.html
css/style.css
js/main.js
```

## Adding your Digital, Logos/Icons, and Packaging work
Print already has your real pieces pulled from your old site. The other three
categories are placeholder cards in `index.html` (search for `SLOT — 01`,
`SLOT — 02`, `SLOT — 03`). To swap in real work:

1. Drop image files into an `images/` folder (create it if it's not there).
2. In `index.html`, find the placeholder `<article class="work-card ...">`
   block for that category and replace the `<div class="frame">...</div>`
   with `<div class="frame"><img src="images/your-file.jpg" alt="..."></div>`.
3. Remove the `placeholder` class from that card.

The Print images currently point at your old Squarespace CDN links, which
will keep working for now — but once you cancel Squarespace those links will
break. When you get a chance, download those images and swap them to local
`images/` paths the same way.

## Deploying: GitHub → Cloudflare Pages

The build error you hit before happened because Cloudflare's newer
**Workers Builds** flow auto-detected the repo as a Worker project and tried
to run `wrangler versions upload` on it — this site doesn't need a Worker
build. Use **Pages** instead, which serves static files with no build step:

1. Push this folder to your `work765/Portfolio` GitHub repo, replacing what's
   there now (delete `wrangler.json`/`wrangler.toml` if either exists).
2. In the Cloudflare dashboard: **Workers & Pages → Create application →
   Pages → Connect to Git**.
3. Select the `work765/Portfolio` repo.
4. Framework preset: **None**. Build command: leave blank. Build output
   directory: leave as `/` (repo root).
5. Click **Save and Deploy**.

If a `portfolio` Worker project from the earlier attempt still exists, delete
it first (Workers & Pages → portfolio → Settings → scroll down → Delete) so
it doesn't collide with the new Pages project name.

Once deployed, Cloudflare gives you a `*.pages.dev` URL immediately. You can
attach your own domain afterward under the project's **Custom domains** tab.
