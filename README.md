# Mary's Pet Grooming Studio — demo site (v3)

One-page site for Mary's Pet Grooming Studio (895 Main St E, Hamilton), built with **Astro 5**, TypeScript and plain CSS. It builds to static files, so it can be hosted on Netlify, Vercel, Cloudflare Pages or GitHub Pages.

The earlier single-file version is still at `marys-pet-grooming-demo-v2.html` for comparison.

## Run it

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static site in dist/
npm run preview    # serve dist/ locally
npm run check      # type-check
```

## What's on the page

| Section | Component | Notes |
| --- | --- | --- |
| Hours pill in header | `Header.astro` | Shows "Open now · till 3 pm" or "Napping · back 9 am" (Hamilton time) |
| Hero | `Hero.astro`, `Bubbles.astro` | Soap bubbles you can pop, squiggle underline, polaroids, doodles |
| Photo wall | `Gallery.astro` | Polaroids with washi tape; swipes on phones |
| Before / after | `BeforeAfter.astro` | Drag the paw; supports several pairs |
| Reviews | `Reviews.astro` | Speech bubbles, paw ratings |
| Meet Mary | `MeetMary.astro` | Placeholder photo and bio, "Groomer ID" card |
| Services + cats | `Services.astro` | Icon cards, gingham "Yes, cats too" block |
| Pet picker | `PetPicker.astro`, `lib/picker.ts` | Dog/cat → size/coat → need, then writes a text to Mary (`sms:` link + copy button) |
| How a visit works | `Steps.astro` | Paw-print trail between steps |
| FAQ | `Faq.astro` | Paw toggles |
| Hours & map | `Visit.astro` | Today's row is highlighted |
| Closing CTA | `Closing.astro` | Illustrated pup peeking over the edge |

All motion respects the visitor's "reduce motion" setting.

## Editing content

Almost everything lives in **`src/data/site.ts`**: phone, address, hours, reviews, services, FAQ, gallery captions and photo IDs. Change it there and the whole page follows.

## Photos

- **Stock photos** are Unsplash placeholders, referenced by ID in `src/data/site.ts` and served from Unsplash's CDN (`src/lib/unsplash.ts`). Unsplash's license allows commercial use.
- **Pet stickers** (`src/assets/stickers/*.png`) are cut out of Unsplash photos, then Astro optimizes them to small WebP files at build time.

### Swapping in Mary's real photos

1. Put her photos in `src/assets/photos/`.
2. For the before/after, gallery and Meet Mary sections, switch `Photo.astro` to Astro's `<Image>` (like `Sticker.astro` does), or keep the Unsplash IDs for anything that stays stock.
3. Replace the bio in `MeetMary.astro` with Mary's own words, and remove the "Your photo here" and "Stand-in photos" notes.

### Making new stickers (macOS 14+)

The stickers are made with Apple's built-in subject lifting, the same feature as "Lift subject" in Photos. Nothing extra to install:

```bash
npm run sticker -- ~/Desktop/biscuit.jpg src/assets/stickers/biscuit.png
```

An optional third argument sets the white border thickness as a % of the image size (default 2.4).

## Before going live

- **Upgrade Node and Astro.** This machine has Node 20, so the project is on Astro 5. `npm audit` flags issues in build-time dependencies (esbuild, sharp). They don't reach the published site, but the fix is Astro 7, which needs Node 22.12+. Upgrade with `nvm install 22 && npm i astro@latest`.
- Set the real domain in `astro.config.mjs` (`site`).
- Remove the "Preview design" banner in `Header.astro`.
- Confirm hours, services and review quotes with Mary.
