/* Horizontal Scroll */
gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  const timelineLine = document.querySelector(".timeline-line");
  const timelineCircles = document.querySelectorAll(".timeline-circle");
  const panelsContainer = document.querySelector("#panels-container");
  const panels = gsap.utils.toArray("#panels-container .panel");

  const totalWidth = panels.length * window.innerWidth;

  const pinTl = gsap.timeline({
    scrollTrigger: {
      trigger: panelsContainer,
      pin: true,
      start: "top top",
      end: () => `+=${totalWidth}`,
      scrub: 1,
      snap: {
        snapTo: 1 / (panels.length - 1),
        duration: { min: 0.2, max: 0.5 },
        ease: "power1.inOut"
      },
      anticipatePin: 1,
      pinSpacing: true,
      onUpdate: (self) => {
        // Calculate progress and update line width
        const progress = Math.min(1, Math.max(0, self.progress));
        gsap.to(timelineLine, {
          width: `${progress * 100}%`,
          duration: 0.1,
          ease: "none"
        });

        // Update circle states
        timelineCircles.forEach((circle, index) => {
          const circleProgress = index / (timelineCircles.length - 1);
          if (progress >= circleProgress) {
            gsap.to(circle, {
              backgroundColor: "#000",
              duration: 0.3,
              ease: "power2.inOut"
            });
          } else {
            gsap.to(circle, {
              backgroundColor: "#ddd",
              duration: 0.3,
              ease: "power2.inOut"
            });
          }
        });
      }
    }
  });

  pinTl.to(panels, {
    xPercent: -100 * (panels.length - 1),
    ease: "none"
  });

  // Initial setup
  gsap.set(panelsContainer, { opacity: 1 });
  gsap.set(timelineLine, { width: 0 });
  gsap.set(timelineCircles[0], { backgroundColor: "#000" }); // First circle starts active
});

/* vertical scrolling */
const scrollSection = document.querySelectorAll(".scroll-section");

scrollSection.forEach((section) => {
  const wrapper = section.querySelector(".wrapper");
  const items = wrapper.querySelectorAll(".item");

  // Initialize
  let direction = null;

  if (section.classList.contains("vertical-section")) {
    direction = "vertical";
  } else if (section.classList.contains("horizontal-section")) {
    direction = "horizontal";
  }

  initScroll(section, items, direction);
});

function initScroll(section, items, direction) {
  // Initial states
  items.forEach((item, index) => {
    if (index !== 0) {
      direction == "horizontal"
        ? gsap.set(item, { xPercent: 100 })
        : gsap.set(item, { yPercent: 100 });
    }
  });

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      pin: true,
      start: "top top",
      end: () => `+=${items.length * 100}%`,
      scrub: 1,
      invalidateOnRefresh: true,
      // markers: true,
    },
    defaults: { ease: "none" },
  });
  items.forEach((item, index) => {
    timeline.to(item, {
      scale: 0.9,
      borderRadius: "10px",
    });

    direction == "horizontal"
      ? timeline.to(
        items[index + 1],
        {
          xPercent: 0,
        },
        "<"
      )
      : timeline.to(
        items[index + 1],
        {
          yPercent: 0,
        },
        "<"
      );
  });
}

/* Detect screen size */
function isMobile() {
  return window.innerWidth <= 768; // Adjust breakpoint as needed
}

/* Hide cursor on mobile */
function updateCursorVisibility() {
  const cursorBalls = document.querySelectorAll('.cursor__ball');
  if (isMobile()) {
    cursorBalls.forEach(ball => ball.style.display = 'none');
  } else {
    cursorBalls.forEach(ball => ball.style.display = 'block');
  }
}

/* Cursors */
const $bigBall = document.querySelector('.cursor__ball--big');
const $smallBall = document.querySelector('.cursor__ball--small');
const $hoverables = document.querySelectorAll('.hoverable');

// Hide cursor initially if on mobile
updateCursorVisibility();

// Listeners
if (!isMobile()) {
  document.body.addEventListener('mousemove', onMouseMove);
  $hoverables.forEach(el => {
    el.addEventListener('mouseenter', onMouseHover);
    el.addEventListener('mouseleave', onMouseHoverOut);
  });
}

// Cursor movement
function onMouseMove(e) {
  const x = e.clientX;
  const y = e.clientY;

  gsap.to($bigBall, { duration: 0.4, x: x - 15, y: y - 15 });
  gsap.to($smallBall, { duration: 0.1, x: x - 5, y: y - 5 });
}

// Hover effects
function onMouseHover() {
  gsap.to($bigBall, { duration: 0.3, scale: 4 });
}
function onMouseHoverOut() {
  gsap.to($bigBall, { duration: 0.3, scale: 1 });
}

// Update visibility on window resize
window.addEventListener('resize', updateCursorVisibility);

