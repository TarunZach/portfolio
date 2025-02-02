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

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show');
    }
  })
})

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach(element => {
  observer.observe(element);
})

/* tech-stack */
document.querySelectorAll(".tech__stack-card").forEach((card) => {
  const img = card.querySelector("img");

  card.addEventListener("mouseenter", () => {
    img.src = card.getAttribute("data-color"); // Switch to colored SVG
  });

  card.addEventListener("mouseleave", () => {
    img.src = card.getAttribute("data-bw"); // Switch back to black & white SVG
  });
});

/* the funny */
let funnyText = document.querySelector('.the__funny-text');
let funnySection = document.querySelector('.the__funny');

window.addEventListener("scroll", () => {
  let scrollPosition = window.scrollY - 2500;

  if (scrollPosition >= 0 && scrollPosition <= window.innerHeight) {
    let moveLeft = -(scrollPosition * 5.5);
    let moveDown = scrollPosition * 1;

    funnyText.style.transform = `translate(${moveLeft}px, ${moveDown}px)`;
  }
});



/* Get in Touch */
document.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('.my-resume');
  const windowHeight = window.innerHeight;

  // Function to calculate scroll percentage
  const calculateScrollPercentage = () => {
    const rect = section.getBoundingClientRect();
    const sectionTop = rect.top;
    const sectionHeight = rect.height;

    // Calculate how far through the section we've scrolled
    let scrollPercentage = 1 - (sectionTop / (windowHeight * 0.5));

    scrollPercentage = Math.min(Math.max(scrollPercentage, 0), 1);

    section.style.setProperty('--scroll-percent', 1 - scrollPercentage);
  };

  calculateScrollPercentage();

  // Update on scroll
  window.addEventListener('scroll', () => {
    window.requestAnimationFrame(calculateScrollPercentage);
  });

  window.addEventListener('resize', () => {
    windowHeight = window.innerHeight;
    calculateScrollPercentage();
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




