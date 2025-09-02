// GSAP Typing Animation for Hero Section

/**
 * Initializes the typing animation for the hero title
 * Animates "Hi, my name is Sadra." with a blinking cursor
 */
function initTypingAnimation() {
  const typingText = document.querySelector('.typing-text');
  const cursor = document.querySelector('.cursor');
  
  if (!typingText || !cursor) {
    console.warn('Typing animation elements not found');
    return;
  }

  const fullText = 'Hi, my name is ';
  const nameText = 'Sadra';
  const endText = '.';
  const completeText = fullText + nameText + endText;
  
  // Clear initial content
  typingText.textContent = '';
  
  // Create GSAP timeline
  const tl = gsap.timeline({ delay: 0.8 });
  
  // Cursor blink animation (runs continuously)
  const cursorBlink = gsap.to(cursor, {
    opacity: 0,
    duration: 0.4,
    repeat: -1,
    yoyo: true,
    ease: "power2.inOut"
  });
  
  // Typing animation
  tl.to({}, {
    duration: completeText.length * 0.12, // 120ms per character
    ease: "none",
    onUpdate: function() {
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
        typingText.innerHTML = fullText + '<span style="color: #000; font-weight: bold;">' + currentName + '</span>';
      } else {
        // Adding the final period
        const finalText = currentText.substring(fullText.length + nameText.length);
        typingText.innerHTML = fullText + '<span style="color: #000; font-weight: bold;">' + nameText + '</span>' + finalText;
      }
    },
    onComplete: function() {
      // Stop cursor blinking after 2 seconds
      gsap.delayedCall(2, () => {
        cursorBlink.kill();
        gsap.set(cursor, { opacity: 1 });
      });
    }
  });
}

/**
 * Initialize animations when DOM is ready
 */
document.addEventListener('DOMContentLoaded', function() {
  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (!prefersReducedMotion) {
    initTypingAnimation();
  } else {
    // For users who prefer reduced motion, show the complete text immediately
    const typingText = document.querySelector('.typing-text');
    const cursor = document.querySelector('.cursor');
    
    if (typingText && cursor) {
      typingText.innerHTML = 'Hi, my name is <span style="color: #000; font-weight: bold;">Sadra</span>.';
      cursor.style.display = 'none';
    }
  }
});

// Export for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initTypingAnimation };
}