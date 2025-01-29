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

/*Marquee*/
const root = document.documentElement;
const marqueeElementsDisplayed = getComputedStyle(root).getPropertyValue("--marquee-elements-displayed");

root.style.setProperty("--marquee-elements", marqueeContent.children.length);

for (let i = 0; i < marqueeElementsDisplayed; i++) {
  marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
}

/* info card - Marquee */
document.addEventListener("DOMContentLoaded", async () => {
  const skillsetInfo = document.querySelector(".skillset__info");
  const marqueeItems = document.querySelectorAll(".marquee-content li");

  // Fetch skills.json
  const response = await fetch('./storage/skills.json');
  const skills = await response.json();

  marqueeItems.forEach(item => {
    item.addEventListener("mouseenter", (e) => {
      const rect = item.getBoundingClientRect();

      skillsetInfo.style.opacity = 1;
      skillsetInfo.style.transition = "opacity 0.4s ease";

      const skillKey = item.getAttribute("data-skill");
      if (skills[skillKey]) {
        skillsetInfo.querySelector(".skillset__content--title").textContent = skills[skillKey].title;
        skillsetInfo.querySelector(".skillset__content--subtitle").textContent = skills[skillKey].description;
      }
    });

    item.addEventListener("mouseleave", () => {
      skillsetInfo.style.opacity = 0;
    });
  });
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

    // Update CSS variable
    section.style.setProperty('--scroll-percent', 1 - scrollPercentage);
  };

  // Initial calculation
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




