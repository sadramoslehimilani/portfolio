// GSAP ScrollSmoother and Animations

/**
 * Initializes enhanced smooth scrolling using GSAP ScrollSmoother
 * Provides smoother scrolling for all page interactions including mouse wheel, touch, and keyboard
 */
function initSmoothScrolling() {
  // Register ScrollTrigger and ScrollSmoother plugins
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (!prefersReducedMotion) {
    // Add CSS smooth scrolling as fallback
    document.documentElement.style.scrollBehavior = "smooth";

    // Initialize GSAP ScrollSmoother for enhanced smoothness
    // This affects all scrolling: mouse wheel, touch, keyboard, programmatic
    try {
      if (typeof ScrollSmoother !== "undefined") {
        ScrollSmoother.create({
          wrapper: "#smooth-wrapper",
          content: "#smooth-content",
          smooth: 1.2, // Smoothness level (0-3, higher = smoother)
          effects: true, // Enable parallax and speed effects
          normalizeScroll: true, // Normalize scroll across different devices
        });
      }
    } catch (error) {
      console.log("ScrollSmoother not available, using CSS smooth scrolling");
    }
  } else {
    // For reduced motion users, disable smooth scrolling
    document.documentElement.style.scrollBehavior = "auto";
  }
}

/**
 * Initializes the typing animation for the hero title
 * Animates "Hi, my name is Sadra." with a blinking cursor
 */
function initTypingAnimation() {
  const typingText = document.querySelector(".typing-text");
  const cursor = document.querySelector(".cursor");

  if (!typingText || !cursor) {
    console.warn("Typing animation elements not found");
    return;
  }

  const fullText = "Hi, my name is ";
  const nameText = "Sadra";
  const endText = ".";
  const completeText = fullText + nameText + endText;

  // Clear initial content
  typingText.textContent = "";

  // Create GSAP timeline
  const tl = gsap.timeline({ delay: 0.8 });

  // Cursor blink animation (runs continuously)
  const cursorBlink = gsap.to(cursor, {
    opacity: 0,
    duration: 0.4,
    repeat: -1,
    yoyo: true,
    ease: "power2.inOut",
  });

  // Typing animation
  tl.to(
    {},
    {
      duration: completeText.length * 0.12, // 120ms per character
      ease: "none",
      onUpdate: function () {
        const progress = this.progress();
        const currentLength = Math.floor(progress * completeText.length);
        const currentText = completeText.substring(0, currentLength);

        // Apply different styling to different parts of the text
        if (currentLength <= fullText.length) {
          // Typing "Hi, my name is "
          typingText.innerHTML = currentText;
        } else if (currentLength <= fullText.length + nameText.length) {
          // Typing "Sadra" with blue color
          const nameProgress = currentLength - fullText.length;
          const currentName = nameText.substring(0, nameProgress);
          typingText.innerHTML =
            fullText +
            '<span style="color: #2c3e50; font-weight: bold;">' +
            currentName +
            "</span>";
        } else {
          // Adding the final period
          const finalText = currentText.substring(
            fullText.length + nameText.length
          );
          typingText.innerHTML =
            fullText +
            '<span style="color: #2c3e50; font-weight: bold;">' +
            nameText +
            "</span>" +
            finalText;
        }
      },
      onComplete: function () {
        // Animate subtitle and scroll hint appearance immediately after typing
        const description = document.querySelector(".hero__description");
        const scrollHint = document.querySelector(".hero__scroll-hint");

        if (description) {
          description.classList.add("visible");
        }

        if (scrollHint) {
          scrollHint.classList.add("visible");
        }

        // Stop cursor blinking after 2 seconds
        gsap.delayedCall(2, () => {
          cursorBlink.kill();
          gsap.set(cursor, { opacity: 1 });
        });
      },
    }
  );
}

/**
 * Initialize About Me section animations
 * Handles fade-in for bio and Lottie animation
 */
function initAboutAnimations() {
  const aboutSection = document.querySelector(".about");
  const aboutDescription = document.querySelector(".about__description");
  const lottieContainer = document.querySelector(".lottie-container");

  if (!aboutSection) return;

  // Initialize Lottie animation
  let lottieAnimation = null;
  if (lottieContainer && typeof lottie !== "undefined") {
    lottieAnimation = lottie.loadAnimation({
      container: lottieContainer,
      renderer: "svg",
      loop: true,
      autoplay: false,
      path: "/assets/animations/Web Design Animation.json",
    });
  }

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) {
    // Show all elements immediately for users who prefer reduced motion
    if (aboutDescription) {
      aboutDescription.classList.add("visible");
    }
    if (lottieContainer) {
      lottieContainer.classList.add("visible");
    }
    // Don't autoplay animation for reduced motion users
    return;
  }

  // Create ScrollTrigger for About section
  ScrollTrigger.create({
    trigger: aboutSection,
    start: "top 80%",
    onEnter: () => {
      // Animate bio description
      if (aboutDescription) {
        aboutDescription.classList.add("visible");
      }

      // Animate Lottie container and start animation
      if (lottieContainer) {
        lottieContainer.classList.add("visible");
        if (lottieAnimation) {
          setTimeout(() => {
            lottieAnimation.play();
          }, 400); // Start animation after container fade-in
        }
      }
    },
    once: true, // Only trigger once
  });
}

/**
 * Initialize Showcase section animations
 * Handles staggered reveal animations for project items
 */
function initShowcaseAnimations() {
  const showcaseItems = document.querySelectorAll(".showcase__item");

  if (!showcaseItems.length) return;

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) {
    // Show all items immediately for users who prefer reduced motion
    showcaseItems.forEach((item) => {
      item.classList.add("animate-in");
    });
    return;
  }

  // Create ScrollTrigger for each showcase item with staggered animation
  showcaseItems.forEach((item, index) => {
    ScrollTrigger.create({
      trigger: item,
      start: "top 85%",
      onEnter: () => {
        // Add staggered delay based on item index
        setTimeout(() => {
          item.classList.add("animate-in");
        }, index * 200); // 200ms delay between each item
      },
      once: true, // Only trigger once
    });
  });

  // Add hover effects for interactive elements
  showcaseItems.forEach((item) => {
    const image = item.querySelector(".showcase__image");
    const links = item.querySelectorAll(".showcase__link");

    // Enhanced hover effects for better interactivity
    item.addEventListener("mouseenter", () => {
      if (!prefersReducedMotion) {
        gsap.to(item, {
          y: -8,
          duration: 0.3,
          ease: "power2.out",
        });

        if (image) {
          gsap.to(image, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out",
          });
        }
      }
    });

    item.addEventListener("mouseleave", () => {
      if (!prefersReducedMotion) {
        gsap.to(item, {
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        });

        if (image) {
          gsap.to(image, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        }
      }
    });
  });
}

/**
 * Initializes scroll-triggered animations for the Hire section
 * Animates title, description, and links with staggered timing
 */
function initHireAnimations() {
  const hireSection = document.querySelector(".hire");
  const hireTitle = document.querySelector(".hire__title");
  const hireDescription = document.querySelector(".hire__description");
  const hireLinks = document.querySelectorAll(".hire__link");

  if (!hireSection) {
    console.warn("Hire section not found");
    return;
  }

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) {
    // For reduced motion users, show elements immediately
    if (hireTitle) hireTitle.classList.add("visible");
    if (hireDescription) hireDescription.classList.add("visible");
    hireLinks.forEach((link) => link.classList.add("visible"));
    return;
  }

  // Create ScrollTrigger for the hire section
  ScrollTrigger.create({
    trigger: hireSection,
    start: "top 80%",
    end: "bottom 20%",
    onEnter: () => {
      // Animate title
      if (hireTitle) {
        gsap.to(hireTitle, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          onComplete: () => hireTitle.classList.add("visible"),
        });
      }

      // Animate description with delay
      if (hireDescription) {
        gsap.to(hireDescription, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          ease: "power2.out",
          onComplete: () => hireDescription.classList.add("visible"),
        });
      }

      // Animate links with staggered timing
      if (hireLinks.length > 0) {
        gsap.to(hireLinks, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.4,
          stagger: 0.1,
          ease: "power2.out",
          onComplete: () => {
            hireLinks.forEach((link) => link.classList.add("visible"));
          },
        });
      }
    },
    onLeave: () => {
      // Optional: Reset animations when leaving section (for re-entry)
      // Uncomment if you want animations to replay when scrolling back
      /*
      if (hireTitle) {
        gsap.set(hireTitle, { opacity: 0, y: 30 });
        hireTitle.classList.remove("visible");
      }
      if (hireDescription) {
        gsap.set(hireDescription, { opacity: 0, y: 30 });
        hireDescription.classList.remove("visible");
      }
      hireLinks.forEach((link) => {
        gsap.set(link, { opacity: 0, y: 30 });
        link.classList.remove("visible");
      });
      */
    },
  });
}

/**
 * Initialize animations when DOM is ready
 */
document.addEventListener("DOMContentLoaded", function () {
  // Initialize smooth scrolling first
  initSmoothScrolling();

  // Initialize About Me animations
  initAboutAnimations();

  // Initialize Showcase animations
  initShowcaseAnimations();

  // Initialize Hire animations
  initHireAnimations();

  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (!prefersReducedMotion) {
    initTypingAnimation();
  } else {
    // For users who prefer reduced motion, show the complete text immediately
    const typingText = document.querySelector(".typing-text");
    const cursor = document.querySelector(".cursor");
    const description = document.querySelector(".hero__description");
    const scrollHint = document.querySelector(".hero__scroll-hint");

    if (typingText && cursor) {
      typingText.innerHTML =
        'Hi, my name is <span style="color: #2c3e50; font-weight: bold;">Sadra</span>.';
      cursor.style.display = "none";
    }

    if (description) {
      description.classList.add("visible");
    }

    if (scrollHint) {
      scrollHint.classList.add("visible");
    }
  }
});

// Export for potential use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    initSmoothScrolling,
    initTypingAnimation,
    initAboutAnimations,
    initShowcaseAnimations,
    initHireAnimations,
  };
}
