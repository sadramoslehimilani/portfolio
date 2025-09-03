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
 * Initialize animations when DOM is ready
 */
document.addEventListener("DOMContentLoaded", function () {
  // Initialize smooth scrolling first
  initSmoothScrolling();

  // Initialize About Me animations
  initAboutAnimations();

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
  };
}
