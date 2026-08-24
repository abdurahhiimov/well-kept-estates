# Well Kept Estates

Marketing site for **Well Kept Estates** — a solo-founder, full-service estate
sale company in the San Fernando Valley. Founder-story and process-forward (no
fake proof), with a flagship **settlement-reporting** mock UI as the trust hook.

Built as a single-page launch site (Home) plus a dedicated **For Attorneys &
Fiduciaries** landing page and a **Contact** page.

---

## Stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS 3** with **shadcn/ui**-style primitives (hand-added, `new-york`)
- **Framer Motion** for all scroll-triggered motion
- **lucide-react** icons, **Fraunces** (display) + **Inter** (body) via `next/font`
- Deploy-ready for **Vercel**

---

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

Build / run production:

```bash
npm run build
npm start
```

> Note: this project was scaffolded with exact dependency pins (see
> `package.json`) because the build machine runs Socket's npm proxy, which
> quarantines packages newer than ~14 days. Loosen to caret ranges (`^`) any
> time you like.

---

## Deploy to Vercel

1. Push this repo to GitHub/GitLab.
2. In Vercel, **New Project → import the repo**. Framework preset auto-detects
   Next.js — no config needed.
3. (Optional) add the contact-email env vars below under
   **Settings → Environment Variables**.
4. Deploy. That's it.

Or from the CLI:

```bash
npm i -g vercel
vercel        # preview
vercel --prod # production
```

---

## Contact form / email

The contact + attorney forms POST to `/app/api/contact`. **It works with zero
config** — submissions are validated and logged to the server, and the form
shows a success state that also surfaces the direct phone/email.

To actually receive inquiries by email, set these (see `.env.example`) — the
route uses [Resend](https://resend.com):

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Resend API key (free tier is plenty) |
| `CONTACT_TO_EMAIL` | Where inquiries are delivered |
| `CONTACT_FROM_EMAIL` | Optional verified sender (defaults to Resend's shared address) |

`resend` is an **optional** dependency and is imported dynamically only when a
key is present, so builds don't require it.

---

## Editing content

**Almost everything a non-developer would change lives in one file:**
[`src/lib/content.ts`](src/lib/content.ts) — contact details, the 30% / $1,500
commission numbers, service-area cities, the process steps, and the sample
settlement report. Edit that, not the components.

### Colors — three palette directions (not finalized)

Palettes are defined as CSS variables in
[`src/app/globals.css`](src/app/globals.css). The default is **"Clay"** (warm
paper + espresso ink + terracotta). Two alternates are included:

- **Plum & Rose** — deep aubergine ink, dusty-wine accent
- **Slate & Ochre** — warm slate ink, mustard accent

To preview one, set the attribute on `<html>` in
[`src/app/layout.tsx`](src/app/layout.tsx):

```tsx
<html lang="en" data-palette="plum">   {/* or "ochre" */}
```

Deliberately **avoided** per the brief: navy + gold (funeral-home cliché) and
sage + cream (competitor Estate360). The logo is a **wordmark**, not a house
icon — see [`src/components/site/wordmark.tsx`](src/components/site/wordmark.tsx).

### Pre-launch checklist (placeholders to replace)

- [ ] `contact.phone` — currently a fictional `(818) 555-0143`
- [ ] `contact.email` — confirm the domain
- [ ] `founder.name` — blank by default; the note signs "The founder" until set
- [ ] Founder photo — the note shows an honest empty frame
      ([`founder-note.tsx`](src/components/sections/founder-note.tsx)); drop in a
      real photo when you have one
- [ ] `metadataBase` URL in [`layout.tsx`](src/app/layout.tsx)

---

## Motion & accessibility

- All reveals are **scroll-triggered** (`whileInView`), one-shot — nothing loops.
- **`prefers-reduced-motion` is respected everywhere**: the reveal wrapper, the
  hero text reveal, the count-up tickers, and the timeline progress line all fall
  back to a static final state. (`src/components/motion/*`.)
- Layout is responsive with no horizontal overflow; there is a skip-to-content
  link and the mock report is exposed to screen readers via `aria-label`.

---

## Component sourcing (swap-later notes)

The brief asked to source pre-built animated components and adapt them. Here's
what was pulled vs. custom-built, per section — so any of these can be swapped:

| Section | Source | Notes |
| --- | --- | --- |
| **Hero headline** | **21st.dev** — [_Vertical Cut Reveal_ by @cnippet.dev](https://21st.dev/@cnippet.dev/components/vertical-cut-reveal) | Line-by-line clip reveal. Adapted: import switched to `framer-motion`, added a reduced-motion fallback. File: [`motion/vertical-cut-reveal.tsx`](src/components/motion/vertical-cut-reveal.tsx) |
| **How it works** | **21st.dev** — [_Scroll Reveal Content A_ by @abui](https://21st.dev/@abui/components/scroll-reveal-content-a) | Used the *growing vertical progress line* pattern; rebuilt text-only (no images) and reduced-motion-safe. File: [`sections/how-it-works.tsx`](src/components/sections/how-it-works.tsx) |
| **Commission counter** | Inspired by **Magic UI** number-ticker / 21st _Count Up_ | Custom `Ticker` (Framer `useSpring`) so currency formatting + reduced-motion match the site. File: [`motion/ticker.tsx`](src/components/motion/ticker.tsx) |
| **Settlement report** *(flagship)* | **Custom** | No library has a per-item timestamped sale ledger; hand-built to feel like software. File: [`sections/settlement-ledger.tsx`](src/components/sections/settlement-ledger.tsx) |
| **Service area map** | **Custom** | Stylized local map + staggered city reveals (Aceternity-style faint grid background). File: [`sections/service-area.tsx`](src/components/sections/service-area.tsx) |
| **Hero / attorney backgrounds** | **Aceternity UI**-style, custom CSS | Subtle radial gradient + masked hairline grid — no particles/glow. |
| **Founder note, forms, CTA** | **Custom** | — |

> The two 21st.dev components were retrieved via the 21st MCP (free tier caps
> retrievals per day). Their `shadcn add` install commands are in each file's
> header comment if you'd rather pull the originals fresh and re-restyle.

---

## Project structure

```
src/
  app/
    page.tsx              Home (all sections)
    for-attorneys/        Attorney & fiduciary landing page
    contact/              Contact page
    api/contact/route.ts  Form handler (Resend, optional)
    layout.tsx  globals.css
  components/
    sections/   hero, how-it-works, settlement-ledger,
                commission, service-area, founder-note, cta-band
    motion/     reveal, ticker, vertical-cut-reveal
    site/       header, footer, wordmark
    forms/      lead-form (general + attorney variants)
    ui/         button, input, textarea, label
  lib/
    content.ts            ← all copy & business config
    utils.ts
```
