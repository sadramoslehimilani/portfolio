# Sadra Milani - Developer Portfolio Tech Context

## Technologies Used

- **HTML5**: Semantic markup and modern web standards
- **CSS3**: Flexbox, Grid, Custom Properties, and modern styling techniques
- **JavaScript (ES6+)**: Modern JavaScript features and best practices
- **GSAP (GreenSock Animation Platform)**: Professional animation library for scroll-triggered effects and transitions
- **GitHub Pages**: Free static site hosting and deployment platform

## Development Setup

- **Code Editor**: VS Code with relevant extensions (HTML, CSS, JavaScript, Live Server)
- **Version Control**: Git with GitHub for source control and deployment
- **Local Development**: File-based development with live reloading
- **Browser Testing**: Chrome, Firefox, Safari, Edge for cross-browser compatibility
- **Performance Tools**: Chrome DevTools for performance analysis and optimization
- **Accessibility Testing**: Lighthouse and axe-core for accessibility auditing

## Technical Constraints

- **No Backend**: Pure static site with no server-side processing
- **No Build Tools**: Vanilla implementation without bundlers or preprocessors
- **Single Page**: All content in one HTML file for simplicity
- **Lightweight**: Minimal dependencies to ensure fast loading
- **Modern Browser Support**: Targeting modern browsers (last 2 versions)
- **Mobile Optimization**: Responsive design for all screen sizes

## Dependencies

### Core Dependencies

- **GSAP Core**: Animation library core functionality
- **GSAP ScrollTrigger**: Scroll-based animation plugin
- **GSAP TextPlugin**: Text animation capabilities (if needed)

### Development Dependencies

- **Live Server**: Local development server with live reload
- **Prettier**: Code formatting consistency
- **ESLint**: JavaScript code quality and style checking

## Tool Usage Patterns

- **File Organization**: Clear separation of concerns with dedicated folders for CSS, JS, and assets
- **CSS Methodology**: BEM naming convention with custom properties for theming
- **JavaScript Patterns**: Module pattern for organization, event delegation for performance
- **Performance Optimization**: Minimize reflows, optimize animations, lazy loading where appropriate
- **Accessibility**: Semantic HTML, proper ARIA attributes, keyboard navigation support
- **Responsive Design**: Mobile-first approach with CSS media queries and flexible units

## Development Workflow

1. **Local Development**: Edit files locally with live server for immediate feedback
2. **Version Control**: Commit changes to Git with descriptive commit messages
3. **Testing**: Test across browsers and devices during development
4. **Performance Monitoring**: Regular performance audits using browser dev tools
5. **Accessibility Checks**: Periodic accessibility audits during development
6. **Deployment**: Push to GitHub for automatic deployment to GitHub Pages

## Browser Support

- **Primary**: Chrome, Firefox, Safari, Edge (last 2 versions)
- **Secondary**: Mobile browsers (iOS Safari, Chrome Android)
- **Minimum**: Modern browsers with ES6+ support and CSS Grid/Flexbox

## Performance Considerations

- **Asset Optimization**: Compressed images and minimal CSS/JS
- **Critical Rendering Path**: Optimized CSS delivery and minimal blocking resources
- **Animation Performance**: Using transform and opacity for smooth animations
- **Lazy Loading**: Implement where appropriate for images and content
- **Caching**: Leverage browser caching through proper HTTP headers
