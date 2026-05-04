function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

function getTheme() {
  return (
    localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light")
  );
}

setTheme(getTheme());

window.addEventListener("load", () => {
  if (document.documentElement.getAttribute("data-theme") !== "dark") return;

  setTimeout(() => {
    if (typeof showToast === "function") {
      showToast("This website is best in light mode", "success");
    }
  }, 200);
});

document.addEventListener("click", (event) => {
  if (!event.target.closest("[data-theme-toggle]")) return;

  const theme = document.documentElement.getAttribute("data-theme");
  setTheme(theme === "dark" ? "light" : "dark");
  if (theme === "light") {
    showToast("This website is best in light mode", "success");
  }
});
