# Chiranjeev Kumar — AI & Full-Stack Engineer Portfolio

[![Live Site](https://img.shields.io/badge/Live-Vercel-000?style=flat&logo=vercel)](https://chiranjeev-ai-engineer.vercel.app)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=flat&logo=linkedin)](https://linkedin.com/in/chiranjeev-kumar-07071997)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=flat&logo=github)](https://github.com/chiranjeevbitm)
[![Kaggle](https://img.shields.io/badge/Kaggle-Top%200.5%25-20BEFF?style=flat&logo=kaggle)](https://kaggle.com/chiranjeevbit)

> **Data Science Consultant @ Deloitte** | Production GenAI Specialist | NVIDIA Certified | Dual Master's in AI/ML

---

## About

A modern, responsive portfolio website built with **React + TypeScript + Vite** showcasing my expertise in Production Generative AI, Agentic Systems, and Multi-Agent Architectures. The site features a glassmorphism design language, animated typing effect code blocks, and comprehensive project showcases.

**Live URL:** [https://chiranjeev-ai-engineer.vercel.app](https://chiranjeev-ai-engineer.vercel.app)

---

## Features

### Sections
- **Home** — Animated hero with typewriter code block, LinkedIn stats grid, badges (NVIDIA Certified, Available for Consulting)
- **Experience** — Professional journey timeline (TCS → Soroco → Tredence → Deloitte) with sidebar for Education, Certifications, and Articles
- **Skills** — Categorized skills matrix with progress bars, categorized certifications wall (6 groups), awards, and digital presence metrics
- **Projects** — Filterable project grid with impact metrics, live demos, GitHub repos, and featured badges
- **Footer** — Social links with hover stats, "Last updated" badge, scroll-to-top button

### UI/UX
- 🌗 Dark/Light mode with smooth theme transitions
- 📱 Fully responsive (mobile-first with clamp() fluid typography)
- 🎯 Touch-optimized (44px minimum tap targets)
- ♿ Accessibility (prefers-reduced-motion support, semantic HTML)
- ✨ Smooth scroll animations with Framer Motion
- 🔝 Floating scroll-to-top button
- 📄 PDF resume download modal

### Technical
- **Framework:** React 18 + TypeScript
- **Build:** Vite 8
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Fonts:** Inter + JetBrains Mono
- **Hosting:** Vercel
- **Theming:** CSS custom properties with class-based dark mode

---

## Project Structure

```
src/
├── components/
│   ├── AIStatusBar.tsx        # Live AI status indicator
│   ├── AnimatedBlobs.tsx      # Background blob animation
│   ├── CodeBlock.tsx          # Typing animation code block
│   ├── Footer.tsx             # Social links, last updated badge
│   ├── Layout.tsx             # Root layout with navbar + resume modal
│   ├── MagneticButton.tsx     # Magnetic hover effect button
│   ├── Navbar.tsx             # Fixed navbar with hamburger menu
│   ├── PageTransition.tsx     # Page transition wrapper
│   ├── ResumeModal.tsx        # PDF resume viewer
│   ├── ScrollToTop.tsx        # Floating ^ scroll-to-top button
│   └── ThemeToggle.tsx        # Dark/light mode toggle
├── context/
│   └── ThemeContext.tsx        # Theme state management
├── data/
│   └── projects.ts            # Projects, GitHub repos, certifications data
├── pages/
│   ├── PortfolioScroll.tsx     # Main scroll container
│   ├── HomeSection.tsx         # Hero + About + Stats
│   ├── ExperienceSection.tsx   # Timeline + sidebar
│   ├── SkillsSection.tsx       # Skills + Certifications + Awards
│   └── ProjectsSection.tsx     # Projects grid + GitHub repos
├── App.tsx                    # Router setup
├── index.css                  # Global styles, CSS variables
└── main.tsx                   # Entry point
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/chiranjeevbitm/chiranjeev-ai-engineer.git

# Navigate to project directory
cd chiranjeev-ai-engineer

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build

```bash
npm run build
```

Build output goes to `dist/`. Preview with `npm run preview`.

---

## Customization

### Update Content
- **Projects:** Edit `src/data/projects.ts`
- **Certifications:** Edit `certifications` array in `src/data/projects.ts`
- **Experience:** Edit `timeline` array in `src/pages/ExperienceSection.tsx`
- **Articles:** Edit `articles` array in `src/pages/ExperienceSection.tsx`
- **Stats:** Edit `stats` array in `src/pages/HomeSection.tsx`

### Theme
- Colors defined in `tailwind.config.js`
- CSS variables in `src/index.css`
- Dark mode uses `.dark` class on `html` element

### Social Links
Update profile URLs in:
- `src/components/Footer.tsx` — Footer links
- `src/pages/SkillsSection.tsx` — Digital Presence section
- `src/data/projects.ts` — GitHub/LinkedIn references

---

## Deployment

The site is automatically deployed via **Vercel** on every push to the `main` branch.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000?style=flat&logo=vercel)](https://chiranjeev-ai-engineer.vercel.app)

---

## License

MIT License — see [LICENSE](LICENSE) for details.

---

## Connect

- **LinkedIn:** [linkedin.com/in/chiranjeev-kumar-07071997](https://linkedin.com/in/chiranjeev-kumar-07071997)
- **GitHub:** [github.com/chiranjeevbitm](https://github.com/chiranjeevbitm)
- **Kaggle:** [kaggle.com/chiranjeevbit](https://kaggle.com/chiranjeevbit)
- **Medium:** [medium.com/@chiranjeevkumar47](https://medium.com/@chiranjeevkumar47)