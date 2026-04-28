const THEME_STORAGE_KEY = "portfolio-theme";
const DARK_THEME = "dark";
const LIGHT_THEME = "light";

function getPreferredTheme() {
  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (storedTheme === DARK_THEME || storedTheme === LIGHT_THEME) {
    return storedTheme;
  }

  return window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
    ? DARK_THEME
    : LIGHT_THEME;
}

function ensureThemeColorMeta() {
  let themeColorMeta = document.querySelector('meta[name="theme-color"]');
  if (!themeColorMeta) {
    themeColorMeta = document.createElement("meta");
    themeColorMeta.setAttribute("name", "theme-color");
    document.head.appendChild(themeColorMeta);
  }

  return themeColorMeta;
}

function applyTheme(theme) {
  const normalizedTheme = theme === DARK_THEME ? DARK_THEME : LIGHT_THEME;
  document.documentElement.setAttribute("data-theme", normalizedTheme);
  localStorage.setItem(THEME_STORAGE_KEY, normalizedTheme);

  const themeColorMeta = ensureThemeColorMeta();
  themeColorMeta.setAttribute(
    "content",
    normalizedTheme === DARK_THEME ? "#08111f" : "#ffffff",
  );

  document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
    button.setAttribute(
      "aria-pressed",
      normalizedTheme === DARK_THEME ? "true" : "false",
    );
    button.setAttribute(
      "aria-label",
      normalizedTheme === DARK_THEME
        ? "Switch to light mode"
        : "Switch to dark mode",
    );
  });
}

applyTheme(getPreferredTheme());

const themeObserver = new MutationObserver(() => {
  if (document.querySelector("[data-theme-toggle]")) {
    applyTheme(
      document.documentElement.getAttribute("data-theme") ||
        getPreferredTheme(),
    );
    themeObserver.disconnect();
  }
});

themeObserver.observe(document.documentElement, {
  childList: true,
  subtree: true,
});

document.addEventListener("click", (event) => {
  const toggleButton = event.target.closest("[data-theme-toggle]");
  if (!toggleButton) {
    return;
  }

  const nextTheme =
    document.documentElement.getAttribute("data-theme") === DARK_THEME
      ? LIGHT_THEME
      : DARK_THEME;
  applyTheme(nextTheme);
});
