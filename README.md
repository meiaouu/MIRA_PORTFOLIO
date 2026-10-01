# Futuristic Portfolio — Next.js + TypeScript + Tailwind

A scroll-animated, dark violet/purple portfolio built with:

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS 3**
- **Framer Motion** (scroll-linked background + reveal animations)
- **React Icons**

Color theme (used throughout via Tailwind tokens):

| Token    | Hex       |
|----------|-----------|
| `onyx`   | `#1A1A1D` |
| `plum`   | `#3B1C32` |
| `violet` | `#6A1E55` |
| `mauve`  | `#A64D79` |
| `navy`   | `#021A54` |

---

## 1. What you're getting

```
portfolio/
├── app/
│   ├── layout.tsx        # fonts + metadata
│   ├── page.tsx          # assembles all sections
│   └── globals.css       # base styles, glass/gradient utilities
├── components/
│   ├── AnimatedBackground.tsx  # the scroll-driven color background
│   ├── Navbar.tsx
│   ├── Hero.tsx           # Home
│   ├── About.tsx
│   ├── Skills.tsx
│   ├── Projects.tsx
│   ├── Experience.tsx
│   ├── Certificates.tsx
│   ├── Resume.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   ├── Reveal.tsx         # scroll-reveal wrapper
│   └── SectionHeading.tsx
├── data/
│   └── portfolio.ts       # ALL your content lives here
├── public/
│   └── (add resume.pdf, profile.jpg, project screenshots here)
├── tailwind.config.ts
└── package.json
```

**The background animation**: `AnimatedBackground.tsx` uses Framer Motion's
`useScroll` + `useTransform` to read your scroll position (0 to 1 across the
whole page) and interpolate the background color and three blurred "orb"
glows through the 5 palette colors. It sits in a `fixed` layer behind
everything (`-z-10`), so it stays put while your content scrolls over it.

---

## 2. Step-by-step: run it locally

**Prerequisite:** [Node.js](https://nodejs.org) 18.17 or newer installed.

1. Unzip the project and open a terminal in that folder:
   ```bash
   cd portfolio
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
4. Open **http://localhost:3000** in your browser. You should see the site
   with the animated background — try scrolling to watch it shift through
   the color palette.

---

## 3. Step-by-step: make it yours

1. **Edit your content in one place.**
   Open `data/portfolio.ts` and replace:
   - `profile` — your name, role, tagline, email, phone, social links
   - `about` — intro text and stats
   - `skills` — your tech stack, grouped
   - `projects` — title, description, tags, live/repo URLs
   - `experience` — your work history
   - `certificates` — your certifications
   - `navLinks` — only touch this if you rename a section

2. **Add your resume.**
   Drop your PDF into `public/resume.pdf` (exact filename). The button in
   the Resume section already points at `/resume.pdf`.

3. **Add your photos.**
   The About section uses a scroll-triggered pop-in/pop-out photo card
   (`components/AboutPhoto.tsx`). Drop two PNGs into `public/`:
   - `public/me1.png` — shown by default
   - `public/me2.png` — crossfades in when a visitor hovers the card

   The card pops in with a spring scale/rotate animation as soon as it's
   ~40% visible while scrolling down, and pops back out the same way if you
   scroll away — in either direction. If you only have one photo, just save
   the same file as both `me1.png` and `me2.png`, or remove the hover
   crossfade logic in `AboutPhoto.tsx` and keep a single `<Image src="/me1.png" .../>`.

4. **Add real project screenshots (optional).**
   Drop images into `public/projects/`, then in `components/Projects.tsx`
   replace the placeholder `<div>` with:
   ```tsx
   import Image from "next/image";
   // ...
   <Image src={project.image} alt={project.title} fill className="object-cover" />
   ```

5. **Wiring up the contact form (optional but recommended).**
   Right now, submitting the form opens the visitor's email client with a
   pre-filled message (`mailto:`) — works with zero setup, no backend
   needed. If you'd rather send messages silently in the background,
   pick one:
   - **Formspree** (easiest): create a form at formspree.io, then in
     `components/Contact.tsx` replace the `handleSubmit` body with a
     `fetch("https://formspree.io/f/yourFormId", { method: "POST", body: ... })`.
   - **EmailJS**: similar, fully client-side, no server needed.
   - **Your own API route**: create `app/api/contact/route.ts` using the
     Next.js Route Handler pattern and call it from the form with `fetch`.

6. **Change colors or fonts.**
   All theme colors live in `tailwind.config.ts` under `theme.extend.colors`.
   Fonts are wired in `app/layout.tsx` (currently Space Grotesk for display,
   Inter for body, JetBrains Mono for labels) — swap the `next/font/google`
   imports for any other Google Font.

---

## 4. Step-by-step: deploy to Vercel

**Option A — via GitHub (recommended)**

1. Create a new repository on GitHub and push this project:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and log in (GitHub login is
   easiest).
3. Click **Add New → Project**, then select your repository.
4. Vercel auto-detects Next.js — leave the default build settings
   (`next build`) as they are.
5. Click **Deploy**. In about a minute you'll get a live URL like
   `your-project.vercel.app`.
6. (Optional) Go to **Project → Settings → Domains** to attach a custom
   domain.

**Option B — via Vercel CLI (no GitHub needed)**

1. Install the CLI:
   ```bash
   npm install -g vercel
   ```
2. From the project folder, run:
   ```bash
   vercel
   ```
   Follow the prompts (log in, confirm project settings).
3. For a production deployment:
   ```bash
   vercel --prod
   ```

That's it — every future `git push` (Option A) or `vercel --prod` (Option B)
redeploys automatically.

---

## 5. Accessibility & performance notes

- `prefers-reduced-motion` is respected globally (see `globals.css`) —
  animations shrink to near-zero duration for visitors who've asked for
  reduced motion at the OS level.
- All interactive elements have visible keyboard focus states.
- The layout is responsive from small phones up through large desktop
  screens; test with your browser's device toolbar if you resize
  breakpoints.
- Fonts load via `next/font`, which self-hosts Google Fonts with no
  layout shift and no third-party request at runtime.

Enjoy the site — and don't forget to swap in your real name, photo, and
projects before sharing the link!
