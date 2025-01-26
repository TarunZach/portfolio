/* Horizontal Scroll */
gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

/* Main navigation */
let panelsSection = document.querySelector("#panels"),
  panelsContainer = document.querySelector("#panels-container"),
  tween;
document.querySelectorAll(".anchor").forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    let targetElem = document.querySelector(e.target.getAttribute("href")),
      y = targetElem;
    if (targetElem && panelsContainer.isSameNode(targetElem.parentElement)) {
      let totalScroll = tween.scrollTrigger.end - tween.scrollTrigger.start,
        totalMovement = (panels.length - 1) * targetElem.offsetWidth;
      y = Math.round(tween.scrollTrigger.start + (targetElem.offsetLeft / totalMovement) * totalScroll);
    }
    gsap.to(window, {
      scrollTo: {
        y: y,
        autoKill: false
      },
      duration: 1
    });
  });
});

/* Panels */
const panels = gsap.utils.toArray("#panels-container .panel");

// Ensure total scroll height matches panel count
const totalWidth = panels.length * window.innerWidth;

gsap.to(panels, {
  xPercent: -100 * (panels.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: panelsContainer,
    pin: true,
    start: "top top",
    end: () => `+=${totalWidth}`,
    scrub: 1,
    snap: 1 / (panels.length - 1)
  }
});

/* cursors */
const $bigBall = document.querySelector('.cursor__ball--big');
const $smallBall = document.querySelector('.cursor__ball--small');
const $hoverables = document.querySelectorAll('.hoverable');

// Listeners
document.body.addEventListener('mousemove', onMouseMove);
for (let i = 0; i < $hoverables.length; i++) {
  $hoverables[i].addEventListener('mouseenter', onMouseHover);
  $hoverables[i].addEventListener('mouseleave', onMouseHoverOut);
}

function onMouseMove(e) {
  const x = e.clientX;
  const y = e.clientY;

  gsap.to($bigBall, { duration: 0.4, x: x - 15, y: y - 15 });
  gsap.to($smallBall, { duration: 0.1, x: x - 5, y: y - 5 });
}

// Hover an element
function onMouseHover() {
  gsap.to($bigBall, {
    duration: 0.3,
    scale: 4
  });
}
function onMouseHoverOut() {
  gsap.to($bigBall, {
    duration: 0.3,
    scale: 1
  });
}
