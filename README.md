# Samrat Power — E-Commerce Website

A professional, high-performance static e-commerce site for **Samrat Power System Pvt Ltd** (EV chargers, lithium battery packs, solar inverters).

## Structure

```
index.html        Home (hero, what-we-do, featured products, safety, reviews)
products.html     Catalog with category filters + product gallery modal
about.html        Our Story
contact.html       Contact details + enquiry form
assets/css/styles.css  Design system & responsive layout
assets/js/data.js      Product catalog (images grouped per product)
assets/js/main.js      Header/footer, parallax, reveal, counters, RTL gallery
picsdear/          Product images
```

## Key features

- **Right-to-left auto-scrolling product gallery** — click any product's *View Gallery*; all images of that product loop seamlessly RTL, pausing on hover.
- **Parallax** backgrounds and floating hero visual.
- **Kinetic typography** — staggered hero headline reveal and animated gradient headings.
- **Performance** — `requestAnimationFrame`-throttled scroll, `transform`-only animations (GPU), `IntersectionObserver` reveals, lazy-loaded images, no framework/build step.
- **Fully responsive** with an accessible mobile drawer nav.
- Respects `prefers-reduced-motion`.

## Run locally

It is fully static — open `index.html`, or serve the folder:

```bash
python3 -m http.server 8080
```

Products are configured in `assets/js/data.js`. Add a product by appending an object with its `images` array; the gallery groups them automatically.
