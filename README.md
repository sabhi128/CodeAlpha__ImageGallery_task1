# Aether — Editorial Interactive Image Gallery

A premium, responsive, and interactive image gallery built as part of the **CodeAlpha Frontend Developer Internship — Task 1**. 

Shifting away from generic "AI landing page" templates (which rely on heavy glowing neon blobs and tech grids), **Aether** embraces a minimal, high-contrast, editorial gallery aesthetic inspired by luxury portfolios and art museums.

---

## 🎨 Visual Aesthetics & Design Philosophy

- **Typography**: Built with **Cormorant Garamond**, a high-contrast editorial serif typeface, for elegant headings and captions, paired with **Inter** for clean and legible UI elements.
- **Color Palette**: An elegant, deep obsidian-charcoal dark theme (`#0a0a0b`) featuring soft off-white typography (`#f5f5f7`) and warm champagne gold accents (`#c5a880`).
- **Composition**: Focuses on sharp 90-degree geometry, generous padding, and clean typography layouts that mimic physical art museum label placards.
- **Lighting**: Features a subtle radial vignette overlay that softly dims screen borders to keep focus entirely on the photography collection.

---

## ✨ Features

1. **Dynamic Category Filtering**:
   - Filter items instantly by categories: `all`, `nature`, `architecture`, and `space`.
   - Text-link controls with smooth champagne-gold underline active transitions.
2. **Cascading Staggered Grid reveals**:
   - Dynamic JavaScript stagger delays (0.05s increments) cascade filtered items into view with a smooth slide-and-fade animation.
3. **LCP Loading & Fade Optimization**:
   - Images start with a transparent opacity of `0`.
   - Once the browser confirms the image has fully loaded (`img.complete` or `onload`), it smoothly transitions opacity to `1`, avoiding jarring layout snaps.
4. **Slide-Projector Lightbox Modal**:
   - Opens a full-screen theater overlay with a deep black backdrop (`rgba(7, 7, 8, 0.98)`).
   - **Directional Slide Navigation**: Clicking Next/Prev or using arrow keys slides the old image out (left or right) and slides the new image in from the opposite side.
   - **Counter & Metadata Syncing**: Displays current index position relative to the active dataset (e.g. `2 of 3`) alongside dynamic metadata specifications.
5. **Layout Shift Prevention**:
   - Implements `scrollbar-gutter: stable` to lock browser gutters when body scrolling is locked, eliminating page shifting when opening/closing the lightbox.
6. **Accessible Navigation**:
   - Full keyboard navigation supported (`Escape` to close, `ArrowLeft` / `ArrowRight` to cycle).
   - ARIA tags and semantic HTML5 landmarks throughout the application.

---

## 📂 Project Structure

```
CodeAlpha_ImageGallery_task1/
├── images/
│   ├── nature_forest.png
│   ├── nature_mountains.png
│   ├── nature_waterfall.png
│   ├── architecture_skyline.png
│   ├── architecture_cathedral.png
│   ├── architecture_bridge.png
│   ├── space_nebula.png
│   ├── space_cybercity.png
│   └── space_astronaut.png
├── index.html
├── style.css
├── script.js
├── .gitignore
└── README.md
```

---

## 🛠️ Technologies Used

- **Markup**: Semantic HTML5
- **Styling**: Vanilla CSS3 (Custom Variables, Compositor-Thread Transitions, Flexbox/Grid layouts)
- **Interactions**: Vanilla JavaScript (ES6, Paint-Frame optimization, DOM manipulation)

---

## 🚀 Setup & Launch Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/sabhi128/CodeAlpha__ImageGallery_task1.git
   ```
2. **Navigate into the folder**:
   ```bash
   cd CodeAlpha__ImageGallery_task1
   ```
3. **Run locally**:
   - Double-click `index.html` to open the file directly in any modern web browser.
   - Alternatively, serve it using VS Code's **Live Server** extension or Python's HTTP server:
     ```bash
     python -m http.server 8000
     ```
     Then open `http://localhost:8000` in your browser.

---

## 📄 License & Credits

Designed and developed as part of the CodeAlpha Frontend Web Developer Internship program.
