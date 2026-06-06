function setThemeInDOM(theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

function setThemeAndSave(theme) {
  setThemeInDOM(theme);
  localStorage.setItem("theme", theme);
}

function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    return savedTheme;
  }

  return getSystemTheme();
}

setThemeInDOM(getTheme());

window.addEventListener("load", () => {
  if (document.documentElement.getAttribute("data-theme") !== "dark") return;

  // setTimeout(() => {
  //   if (typeof showToast === "function") {
  //     showToast("This website is best in light mode", "success");
  //   }
  // }, 200);
});

document.addEventListener("click", (event) => {
  if (!event.target.closest("[data-theme-toggle]")) return;

  const theme = document.documentElement.getAttribute("data-theme");
  const newTheme = theme === "dark" ? "light" : "dark";

  setThemeAndSave(newTheme);

  // if (newTheme === "dark") {
  //   showToast("This website is best in light mode", "success");
  // }
});
