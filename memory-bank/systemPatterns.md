# Sadra Milani - Developer Portfolio System Patterns

## System Architecture

Single-page application (SPA) architecture with client-side routing and smooth scrolling navigation. All content is loaded in a single HTML file with modular CSS and JavaScript organization.

### File Structure

```
sadra-portfolio/
├── index.html          # Main HTML structure
├── css/
│   ├── styles.css      # Main stylesheet
│   └── responsive.css  # Responsive design breakpoints
├── js/
│   ├── main.js         # Core JavaScript functionality
│   ├── animations.js   # GSAP animation implementations
│   └── utils.js        # Utility functions
├── assets/
│   ├── images/         # Project images and icons
│   └── fonts/          # Custom fonts (if any)
└── README.md          # Project documentation
```

## Key Technical Decisions

- **Vanilla Implementation**: Using pure HTML, CSS, and JavaScript without frameworks for maximum performance and simplicity
- **GSAP for Animations**: Leveraging GreenSock Animation Platform for professional-grade animations and scroll-triggered effects
- **Mobile-First Approach**: Designing for mobile devices first, then scaling up for larger screens
- **Semantic HTML**: Using proper HTML5 semantic elements for accessibility and SEO
- **CSS Grid & Flexbox**: Modern layout techniques for responsive design
- **Performance Focus**: Minimizing HTTP requests and optimizing asset loading

## Design Patterns in Use

- **Component-Based Structure**: Organizing CSS and JavaScript around functional components (Hero, About, Projects, Contact)
- **CSS Custom Properties**: Using CSS variables for consistent theming and easy maintenance
- **BEM Naming Convention**: Following Block Element Modifier methodology for CSS class naming
- **Progressive Enhancement**: Base functionality works without JavaScript, enhanced with JS and animations
- **Modular JavaScript**: Separating concerns with dedicated files for different functionality areas

## Component Relationships

```
index.html
├── Header/Navigation (pending)
├── Hero Section ✅ (implemented)
│   ├── hero__content (text content with GSAP typing animation)
│   │   ├── typing-container (animation wrapper)
│   │   ├── typing-text (animated text content)
│   │   └── cursor (blinking cursor effect)
│   └── hero__photo (image with hover effects)
├── About Section (pending)
├── Projects Section (pending)
└── Contact Section (pending)
```

## Implemented Patterns

### Hero Section Architecture
- **Layout**: CSS Grid for desktop (50/50), Flexbox for mobile (stacked)
- **Typography**: Inter font family with weights 300-700
- **Animation**: GSAP typing animation with cursor blinking effect
- **Responsive Design**: Mobile-first approach with breakpoints
- **Accessibility**: Focus states, reduced motion support, high contrast compatibility
- **Performance**: Optimized image loading with hover effects, efficient GSAP animations

### CSS Organization
- **styles.css**: Base styles, desktop layouts, and animation styles
- **responsive.css**: Mobile-first responsive breakpoints
- **BEM-style naming**: `.hero`, `.hero__content`, `.hero__photo`, `.typing-container`
- **Animation Classes**: `.typing-text`, `.cursor`, `@keyframes blink`
- **Custom Properties**: CSS variables for consistent theming
- **Accessibility**: `@media (prefers-reduced-motion)` support
styles.css
├── Global Styles (typography, colors, reset)
├── Layout Components (grid, flexbox utilities)
├── Section Styles (hero, about, projects, contact)
└── Animation Classes

main.js
├── DOM Ready Initialization
├── Navigation Handling
├── Scroll Position Management
└── Event Listeners

animations.js ✅ (implemented)
├── GSAP Typing Animation (`initTypingAnimation`)
├── Cursor Blinking Effects
├── Text Styling and Formatting
├── Accessibility Support (prefers-reduced-motion)
└── DOM Ready Initialization
```

## Critical Implementation Paths

1. **Core Structure**: Establish semantic HTML foundation with proper accessibility
2. **Responsive Design**: Implement mobile-first CSS with breakpoints for different screen sizes
3. **Navigation System**: Create smooth scrolling navigation with active state management
4. **Animation Framework**: Integrate GSAP and set up animation timelines
5. **Performance Optimization**: Optimize loading and rendering performance
6. **Cross-Browser Compatibility**: Ensure consistent experience across modern browsers
7. **Deployment Setup**: Configure for GitHub Pages deployment
