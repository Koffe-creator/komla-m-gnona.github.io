/* Small bits of interactivity. No libraries, no build step. */

// --- Theme toggle -----------------------------------------------------------
// The site follows the OS theme until you click the toggle. After that, the
// saved choice wins.

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

// --- Highlight the nav link for the section you're looking at ---------------

const navLinkFor = {};
navLinks.querySelectorAll("a").forEach((a) => {
  navLinkFor[a.getAttribute("href").slice(1)] = a;
});

const sections = document.querySelectorAll("section[id], footer[id]");

if ("IntersectionObserver" in window) {
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const link = navLinkFor[entry.target.id];
        if (!link || !entry.isIntersecting) return;
        Object.values(navLinkFor).forEach((a) => a.classList.remove("is-active"));
        link.classList.add("is-active");
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );

  sections.forEach((section) => spy.observe(section));
}

// --- Fade things in as they scroll into view --------------------------------

const revealTargets = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          revealer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealTargets.forEach((el) => revealer.observe(el));
} else {
  // No observer support: just show everything.
  revealTargets.forEach((el) => el.classList.add("in"));
}

// --- Email, assembled in the browser ----------------------------------------
// Keeping the address out of the HTML source means naive scrapers don't get it.

const emailLink = document.getElementById("email-link");
const emailUser = "gnonakomla";
const emailHost = "gmail.com";

emailLink.addEventListener("click", (event) => {
  event.preventDefault();
  window.location.href = "mailto:" + emailUser + "@" + emailHost;
});
