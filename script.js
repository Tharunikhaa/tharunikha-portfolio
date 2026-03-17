const yearElement = document.getElementById("year");
if (yearElement) {
  yearElement.textContent = String(new Date().getFullYear());
}

const revealItems = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${index * 90}ms`;
  observer.observe(item);
});

const meterFills = document.querySelectorAll(".meter-fill");
if (meterFills.length > 0) {
  const meterObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const fill = entry.target;
        const value = fill.getAttribute("data-progress") || "0";
        fill.style.width = `${value}%`;
        obs.unobserve(fill);
      });
    },
    { threshold: 0.3 }
  );

  meterFills.forEach((fill) => meterObserver.observe(fill));
}

const sections = document.querySelectorAll("main section");
const navLinks = document.querySelectorAll(".nav a");

function setActiveLink() {
  let currentId = "";
  sections.forEach((section) => {
    const top = window.scrollY;
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;

    if (top >= sectionTop && top < sectionTop + sectionHeight) {
      currentId = section.getAttribute("id") || "";
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentId}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", setActiveLink);
setActiveLink();
