const yearElement = document.getElementById("year");
if (yearElement) {
  yearElement.textContent = String(new Date().getFullYear());
}

const collapsedNav = document.getElementById("mainNav");
const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

if (collapsedNav && window.bootstrap) {
  const navCollapse = new window.bootstrap.Collapse(collapsedNav, { toggle: false });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 992) {
        navCollapse.hide();
      }
    });
  });
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

function setActiveLink() {
  let currentId = "";

  sections.forEach((section) => {
    const top = window.scrollY;
    const sectionTop = section.offsetTop - 140;
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
