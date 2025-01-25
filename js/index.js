const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav__link');
const marqueeContent = document.querySelector("ul.marquee-content");

navToggle.addEventListener('click', () => {
  document.body.classList.toggle('nav-open');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    document.body.classList.remove('nav-open');
  })
})

/*Marquee*/
const root = document.documentElement;
const marqueeElementsDisplayed = getComputedStyle(root).getPropertyValue("--marquee-elements-displayed");

root.style.setProperty("--marquee-elements", marqueeContent.children.length);

for (let i = 0; i < marqueeElementsDisplayed; i++) {
  marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
}

/* info card - Marquee */
document.addEventListener("DOMContentLoaded", () => {
  const skillsetInfo = document.querySelector(".skillset__info");
  const marqueeItems = document.querySelectorAll(".marquee-content li");

  marqueeItems.forEach(item => {
    item.addEventListener("mouseenter", (e) => {
      const rect = item.getBoundingClientRect();

      // Set position dynamically near the hovered item
      skillsetInfo.style.opacity = 1;
      skillsetInfo.style.transition = "opacity 0.4s ease";

      const skillKey = item.getAttribute("data-skill");
      skillsetInfo.querySelector(".skillset__content--title").textContent = skillKey.toUpperCase();
      skillsetInfo.querySelector(".skillset__content--subtitle").textContent = `Learn more about ${skillKey}`;
    });

    item.addEventListener("mouseleave", () => {
      skillsetInfo.style.opacity = 0;
      skillsetInfo.style.left = `-100%`; // Move off-screen
    });
  });
});


/* Timezone */
function displayTime() {
  const options = {
    timeZone: "Europe/Berlin",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  const formatter = new Intl.DateTimeFormat("en-GB", options);
  const time = formatter.format(new Date());

  document.getElementById("timezone").textContent = time;
}

// Update time every second
setInterval(displayTime, 1000);

displayTime();


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



