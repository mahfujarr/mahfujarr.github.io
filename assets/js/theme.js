function updateMetaThemeColor(theme) {
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute("content", theme === "dark" ? "#08111f" : "#ffffff");
  }
}

function updateToggleAttributes(theme) {
  const isDark = theme === "dark";
  document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
    btn.setAttribute("aria-pressed", isDark ? "true" : "false");
    btn.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
  });
}

function setThemeInDOM(theme) {
  const activeTheme = theme === "dark" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", activeTheme);
  updateMetaThemeColor(activeTheme);
  updateToggleAttributes(activeTheme);
  window.dispatchEvent(new CustomEvent("themechange", { detail: { theme: activeTheme } }));
}

function setThemeAndSave(theme) {
  setThemeInDOM(theme);
  try {
    localStorage.setItem("theme", theme);
  } catch (e) {
    // Handle privacy mode / blocked localStorage
  }
}

function getSystemTheme() {
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getTheme() {
  try {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark" || savedTheme === "light") {
      return savedTheme;
    }
  } catch (e) {}

  return getSystemTheme();
}

// Apply theme immediately on script load to prevent flash of wrong theme
setThemeInDOM(getTheme());

// Listen for OS system theme changes if no explicit user preference is saved
try {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  if (mediaQuery && mediaQuery.addEventListener) {
    mediaQuery.addEventListener("change", (e) => {
      try {
        if (!localStorage.getItem("theme")) {
          setThemeInDOM(e.matches ? "dark" : "light");
        }
      } catch (err) {}
    });
  }
} catch (e) {}

// Sync attributes once DOM components are ready
document.addEventListener("DOMContentLoaded", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme") || getTheme();
  updateMetaThemeColor(currentTheme);
  updateToggleAttributes(currentTheme);
});

// Global theme toggle button listener
document.addEventListener("click", (event) => {
  if (!event.target.closest("[data-theme-toggle]")) return;

  const currentTheme = document.documentElement.getAttribute("data-theme") || getTheme();
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  setThemeAndSave(newTheme);
});

// ==========================================
// Mobile Navigation Drawer Controller
// ==========================================
function closeMobileNav() {
  const menuBtn = document.getElementById("menu");
  const nav = document.querySelector("header .navbar");
  const overlay = document.getElementById("nav-overlay");
  if (menuBtn) {
    menuBtn.classList.remove("fa-times");
    menuBtn.setAttribute("aria-expanded", "false");
  }
  if (nav) nav.classList.remove("nav-toggle");
  if (overlay) overlay.classList.remove("active");
  document.body.classList.remove("nav-open");
}

function toggleMobileNav() {
  const menuBtn = document.getElementById("menu");
  const nav = document.querySelector("header .navbar");
  const overlay = document.getElementById("nav-overlay");
  if (!nav || !menuBtn) return;

  const isOpen = nav.classList.toggle("nav-toggle");
  menuBtn.classList.toggle("fa-times", isOpen);
  menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  if (overlay) overlay.classList.toggle("active", isOpen);
  document.body.classList.toggle("nav-open", isOpen);
}

// Global click delegation for mobile nav drawer
document.addEventListener("click", (e) => {
  // 1. Menu hamburger button clicked
  if (e.target.closest("#menu")) {
    toggleMobileNav();
    return;
  }

  // 2. Clicked on backdrop overlay or outside header when nav is open
  if (e.target.closest("#nav-overlay")) {
    closeMobileNav();
    return;
  }

  // 3. Navigation link clicked - close drawer immediately
  if (e.target.closest("header .navbar a")) {
    closeMobileNav();
    return;
  }
});

// Close drawer on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeMobileNav();
  }
});

// Touchscreen swipe-right to dismiss drawer
let navTouchStartX = 0;
let navTouchStartY = 0;

document.addEventListener(
  "touchstart",
  (e) => {
    if (e.changedTouches && e.changedTouches[0]) {
      navTouchStartX = e.changedTouches[0].screenX;
      navTouchStartY = e.changedTouches[0].screenY;
    }
  },
  { passive: true }
);

document.addEventListener(
  "touchend",
  (e) => {
    const nav = document.querySelector("header .navbar");
    if (!nav || !nav.classList.contains("nav-toggle")) return;

    if (e.changedTouches && e.changedTouches[0]) {
      const dx = e.changedTouches[0].screenX - navTouchStartX;
      const dy = e.changedTouches[0].screenY - navTouchStartY;
      // Horizontal swipe to the right by > 45px
      if (dx > 45 && Math.abs(dy) < 60) {
        closeMobileNav();
      }
    }
  },
  { passive: true }
);
