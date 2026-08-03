/* Small bits of interactivity. No libraries, no build step. */

// --- Theme toggle -----------------------------------------------------------
// The site follows the OS theme until you click the toggle. After that, the
// choice is saved and wins over the OS setting.

const root = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  root.setAttribute("data-theme", savedTheme);
}

themeToggle.addEventListener("click", () => {
  // What is the page actually showing right now?
  const current =
    root.getAttribute("data-theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

  const next = current === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
});

// --- Mobile menu ------------------------------------------------------------

const navToggle = document.querySelector(".nav__toggle");
const navLinks = document.getElementById("nav-links");

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

// Close the menu after tapping a link.
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// --- Header border on scroll ------------------------------------------------

const header = document.querySelector(".site-header");

window.addEventListener(
  "scroll",
  () => {
    header.classList.toggle("is-scrolled", window.scrollY > 10);
  },
  { passive: true }
);

// --- Highlight the nav link for the section you're looking at ---------------

const sections = document.querySelectorAll("main section[id]");
const navLinkFor = {};
navLinks.querySelectorAll("a").forEach((a) => {
  navLinkFor[a.getAttribute("href").slice(1)] = a;
});

const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const link = navLinkFor[entry.target.id];
      if (!link) return;
      if (entry.isIntersecting) {
        Object.values(navLinkFor).forEach((a) => a.classList.remove("is-active"));
        link.classList.add("is-active");
      }
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);

sections.forEach((section) => spy.observe(section));

// --- Fade sections in as they scroll into view ------------------------------

const revealTargets = document.querySelectorAll(
  ".section__title, .about, .job, .card, .skillgroup, .resume-cta, .contact__lede, .contact__links"
);

revealTargets.forEach((el) => el.classList.add("reveal"));

const revealer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealTargets.forEach((el) => revealer.observe(el));

// --- Email, assembled in the browser ----------------------------------------
// Keeping the address out of the HTML source means naive scrapers don't get it.

const emailLink = document.getElementById("email-link");
const emailText = document.getElementById("email-text");
const emailUser = "gnonakomla";
const emailHost = "gmail.com";

emailLink.addEventListener("click", (event) => {
  event.preventDefault();
  const address = emailUser + "@" + emailHost;
  emailText.textContent = address;
  emailLink.href = "mailto:" + address;
  window.location.href = "mailto:" + address;
});

// --- Footer year ------------------------------------------------------------

document.getElementById("year").textContent = String(new Date().getFullYear());
