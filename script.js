const header = document.querySelector("#site-header");
const navbar = document.querySelector("#navbar");
const menuToggle = document.querySelector("#menu-toggle");

const searchToggle = document.querySelector("#search-toggle");
const searchPanel = document.querySelector("#search-panel");
const searchInput = document.querySelector("#site-search");
const searchMessage = document.querySelector("#search-message");

const searchForm = document.querySelector("#search-panel");
const currentYear = document.querySelector("#current-year");

const navLinks = document.querySelectorAll(".nav-link");


/* ==============================
   2. HEADER SCROLL EFFECT
============================== */

function updateHeader() {
  if (window.scrollY > 40) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", updateHeader, {
  passive: true
});

// Set the correct header style on page load.
updateHeader();


/* ==============================
   3. MOBILE NAVIGATION MENU
============================== */

function closeMenu() {
  navbar.classList.remove("menu-open");
  menuToggle.classList.remove("active");

  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
}

function openMenu() {
  navbar.classList.add("menu-open");
  menuToggle.classList.add("active");

  menuToggle.setAttribute("aria-expanded", "true");
  menuToggle.setAttribute("aria-label", "Close navigation menu");
}

menuToggle.addEventListener("click", () => {
  const isOpen = navbar.classList.contains("menu-open");

  if (isOpen) {
    closeMenu();
  } else {
    openMenu();
  }
});

// Close the mobile menu after selecting a navigation link.
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeMenu();
    closeSearch();
  });
});

// Close the mobile menu when switching back to desktop.
window.addEventListener("resize", () => {
  if (window.innerWidth > 760) {
    closeMenu();
  }
});


/* ==============================
   4. SEARCH PANEL
============================== */

function openSearch() {
  searchPanel.hidden = false;

  searchToggle.setAttribute("aria-expanded", "true");
  searchToggle.setAttribute("aria-label", "Close search");

  searchInput.focus();
}

function closeSearch() {
  searchPanel.hidden = true;

  searchToggle.setAttribute("aria-expanded", "false");
  searchToggle.setAttribute("aria-label", "Open search");

  searchMessage.textContent = "";
}

searchToggle.addEventListener("click", () => {
  const isOpen = !searchPanel.hidden;

  if (isOpen) {
    closeSearch();
  } else {
    openSearch();
  }
});


/* ==============================
   5. WEBSITE SEARCH
============================== */

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const query = searchInput.value.trim().toLowerCase();

  if (!query) {
    searchMessage.textContent = "Please enter something to search.";
    searchInput.focus();
    return;
  }

  const sections = document.querySelectorAll("main section");

  let matchingSection = null;

  sections.forEach((section) => {
    if (matchingSection) return;

    const text = section.textContent.toLowerCase();

    if (text.includes(query)) {
      matchingSection = section;
    }
  });

  if (matchingSection) {
    searchMessage.textContent = "Result found.";

    closeMenu();
    closeSearch();

    matchingSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  } else {
    searchMessage.textContent = "No matching content found.";
  }
});


/* ==============================
   6. KEYBOARD ACCESSIBILITY
============================== */

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
    closeSearch();
  }
});


/* ==============================
   7. ACTIVE NAVIGATION LINK
============================== */

const observedSections = document.querySelectorAll(
  "main section[id]"
);

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        navLinks.forEach((link) => {
          const isActive =
            link.getAttribute("href") === `#${entry.target.id}`;

          link.classList.toggle("active", isActive);

          if (isActive) {
            link.setAttribute("aria-current", "location");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      });
    },
    {
      rootMargin: "-30% 0px -60% 0px",
      threshold: 0
    }
  );

  observedSections.forEach((section) => {
    sectionObserver.observe(section);
  });
}


/* ==============================
   8. AUTOMATIC FOOTER YEAR
============================== */

currentYear.textContent = new Date().getFullYear();
