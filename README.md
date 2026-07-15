# ☕ Ahlan Café & Restaurant — Multi-Page Café Website

> A professional, multi-page website for a local café business with **TSH currency**, **proper database (JSON)**, **dark/light theme**, and full **accessibility compliance**.

---

## 🗂️ Project Structure

```
the-daily-grind/
├── index.html              # Homepage (hero, features, menu preview, testimonials, CTA)
├── about.html              # About page (story, values, team)
├── menu.html               # Full menu page (5 categories, 30 items, tabbed filtering)
├── gallery.html            # Gallery page (photo grid + video tour)
├── contact.html            # Contact page (info, form, map, FAQ)
├── assets/
│   ├── data.json           # Central database (menu, testimonials, business info)
│   ├── styles.css          # Shared styles with CSS variables for theming
│   └── script.js           # Shared JavaScript (theme, nav, scroll, toast, lightbox)
└── README.md
```

---

## 💰 Currency: TSH (Tanzanian Shillings)

All prices are displayed in TSH format:
- Coffee: TSH 4,000 – TSH 6,000
- Breakfast: TSH 6,500 – TSH 18,000
- Lunch: TSH 8,000 – TSH 18,000
- Desserts: TSH 3,500 – TSH 9,000
- Drinks: TSH 4,500 – TSH 8,000

---

## 🗃️ Database: assets/data.json

Central JSON database containing:
- **Business info** — name, contact, hours, location, social links
- **Menu** — 30 items across 5 categories with prices (TSH), descriptions, tags, images
- **Features** — 4 value propositions with icons
- **Testimonials** — 4 customer reviews with ratings
- **Gallery** — 6 images with sizes for grid layout

---

## ♿ Accessibility Compliance

### Links with `rel="noopener"`
All external links (social media, WhatsApp, maps) include:
```html
<a href="..." target="_blank" rel="noopener noreferrer">...</a>
```

### Buttons with discernible text
Every button has both `title` and `aria-label`:
```html
<button class="theme-toggle" id="themeToggle" title="Toggle dark mode" aria-label="Toggle dark mode">
    <i class="fas fa-moon" aria-hidden="true"></i>
</button>
```

### Screen reader support
- All decorative icons: `aria-hidden="true"`
- Star ratings: `aria-label="5 out of 5 stars"`
- Form inputs: proper `<label>` with `for` attribute
- Toast notifications: `role="status" aria-live="polite"`
- Images: descriptive `alt` text on every image
- Iframes: `title` attribute for context

---

## 🚀 How to Run

```bash
# Option 1: Open index.html directly in browser

# Option 2: Local server (recommended for JSON loading)
cd the-daily-grind
python -m http.server 8000
# Visit http://localhost:8000

# Option 3: Deploy to GitHub Pages / Netlify / Vercel
```

---

## 🎨 Pages Overview

| Page | Purpose | Key Features |
|------|---------|--------------|
| **Home** | First impression | Hero, features, 4 menu highlights, 3 testimonials, CTA banner |
| **About** | Build trust | Origin story, stats by numbers, team portraits |
| **Menu** | Full offerings | 5 tabbed categories, 30 items, TSH pricing, WhatsApp CTA |
| **Gallery** | Visual proof | Photo grid with lightbox, embedded video tour |
| **Contact** | Convert leads | Contact info, form with subject categories, Google Maps, FAQ |

---

## 📱 Responsive Breakpoints

- **> 1024px**: Full desktop, multi-column layouts
- **768–1024px**: Tablet adjustments, 2-column grids
- **< 768px**: Mobile hamburger menu, single column, stacked CTAs

---

## 🎤 Pitch Script

> "Hi [Owner], I've built a complete 5-page website for Ahlan Café & Restaurant — a real café located at Village Walk in Masaki, Dar es Salaam.
Who they are: Ahlan is an authentic café and restaurant serving the Dar es Salaam community since 2018. They're known for great food, a welcoming atmosphere, and their signature hospitality — 'Karibu Sana!'
Before this, Ahlan had no online presence. Potential customers couldn't find their menu, hours, location, or contact info online. They were losing walk-ins and catering inquiries simply because people couldn't discover them digitally.
I've built a fully responsive, multi-page site with a dark/light theme, tabbed menu with TSH pricing, a photo gallery featuring their actual space, a contact form with WhatsApp integration, and an embedded video tour. It's accessibility-compliant and mobile-first — critical since most Tanzanian customers browse on phones.
The menu page showcases their full offerings with prices in local currency. The contact page puts their phone (+255 712 587 587) and WhatsApp one tap away. The gallery builds trust by showing the real interior. And the SEO-friendly structure helps them rank when people search 'café Masaki Dar es Salaam.'
Here's the live demo..."


---

*Built with ❤️ for Future Interns — Task 3 (2026)*
