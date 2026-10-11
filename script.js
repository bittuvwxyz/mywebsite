
const header = document.querySelector(".site-header");
const menuToggle = document.querySelector("#menu-toggle");
const navLinks = document.querySelectorAll(".nav-link");
const searchToggle = document.querySelector("#search-toggle");
const searchPanel = document.querySelector("#site-search");
const searchInput = document.querySelector("#search-input");

// Change the header from transparent to white while scrolling.
function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 30);
}

window.addEventListener("scroll", updateHeader, {
  passive: true,
});

updateHeader();

// Open and close the mobile navigation.
function closeMenu() {
  header.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
  document.body.classList.remove("menu-open");
}

menuToggle.addEventListener("click", () => {
  const isOpen = header.classList.toggle("menu-open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu"
  );

  document.body.classList.toggle("menu-open", isOpen);

  if (isOpen) {
    closeSearch();
  }
});

// Close the mobile menu after a navigation link is clicked.
navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

// Search panel controls.
function closeSearch() {
  searchPanel.hidden = true;
  header.classList.remove("searching");
  searchToggle.setAttribute("aria-expanded", "false");
  searchToggle.setAttribute("aria-label", "Open search");
}

searchToggle.addEventListener("click", () => {
  const willOpen = searchPanel.hidden;

  searchPanel.hidden = !willOpen;
  header.classList.toggle("searching", willOpen);
  searchToggle.setAttribute("aria-expanded", String(willOpen));
  searchToggle.setAttribute(
    "aria-label",
    willOpen ? "Close search" : "Open search"
  );

  if (willOpen) {
    closeMenu();
    searchInput.focus();
  }
});

// Close search when the user presses Escape.
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
    closeSearch();
  }
});

// Demo search: searches the text of sections on this page.
searchPanel.addEventListener("submit", (event) => {
  event.preventDefault();

  const query = searchInput.value.trim().toLowerCase();

  if (!query) {
    searchInput.focus();
    return;
  }

  const sections = [...document.querySelectorAll("main section")];

  const match = sections.find((section) =>
    section.textContent.toLowerCase().includes(query)
  );

  if (match) {
    match.scrollIntoView({ behavior: "smooth" });
    closeSearch();
  } else {
    searchInput.setCustomValidity(
      "No matching section found. Try About, Services, Projects, or Contact."
    );
    searchInput.reportValidity();
  }
});

searchInput.addEventListener("input", () => {
  searchInput.setCustomValidity("");
});
