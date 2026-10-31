// Hide & remove preloader once page fully loads
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.classList.add("loaded");
    const remove = () => preloader?.remove();
    preloader.addEventListener("transitionend", remove, { once: true });
    setTimeout(remove, 800);
  }
});

// Component fetching using absolute root paths
const navbar = document.querySelector(".navbar");
if (navbar) {
  fetch("/assets/components/navbar/navbar.html")
    .then((res) => res.text())
    .then((data) => {
      navbar.innerHTML = data;
      // In 404, remove active class from home link and sync theme button state
      setTimeout(() => {
        $(".navbar ul li a").removeClass("active");
        if (typeof updateToggleAttributes === "function") {
          const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
          updateToggleAttributes(currentTheme);
        }
      }, 100);
    })
    .catch((err) => console.error("Error loading navbar:", err));
}

const footer = document.querySelector(".footer");
if (footer) {
  fetch("/assets/components/footer/footer.html")
    .then((res) => res.text())
    .then((data) => {
      footer.innerHTML = data;
    })
    .catch((err) => console.error("Error loading footer:", err));
}

// Clean up existing particle animation frames before re-init
function destroyPreviousParticles() {
  if (window.pJSDom && window.pJSDom.length > 0) {
    for (let i = 0; i < window.pJSDom.length; i++) {
      if (
        window.pJSDom[i] &&
        window.pJSDom[i].pJS &&
        window.pJSDom[i].pJS.fn &&
        window.pJSDom[i].pJS.fn.drawAnimFrame
      ) {
        cancelAnimationFrame(window.pJSDom[i].pJS.fn.drawAnimFrame);
      }
    }
    window.pJSDom = [];
  }
}

// Particles.js initialization matching active theme
function initParticles() {
  if (
    typeof particlesJS !== "function" ||
    !document.getElementById("particles-js")
  )
    return;

  destroyPreviousParticles();

  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  const particleColors = isDark
    ? ["#7aa2ff", "#a855f7", "#38bdf8", "#34d399"]
    : ["#2506ad", "#011aff", "#10b981", "#420177"];
  const lineColor = isDark ? "#7aa2ff" : "#2506ad";
  const lineOpacity = isDark ? 0.3 : 0.24;

  particlesJS("particles-js", {
    particles: {
      number: {
        value: 45,
        density: {
          enable: true,
          value_area: 850,
        },
      },
      color: {
        value: particleColors,
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: 0.65,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.2,
          sync: false,
        },
      },
      size: {
        value: 3.5,
        random: true,
        anim: {
          enable: true,
          speed: 2,
          size_min: 0.8,
          sync: false,
        },
      },
      line_linked: {
        enable: true,
        distance: 130,
        color: lineColor,
        opacity: lineOpacity,
        width: 1.15,
      },
      move: {
        enable: true,
        speed: 1.8,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "grab",
        },
        onclick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 160,
          line_linked: {
            opacity: 0.65,
          },
        },
        push: {
          particles_nb: 3,
        },
      },
    },
    retina_detect: true,
  });
}

// React immediately whenever theme changes
window.addEventListener("themechange", () => {
  setTimeout(initParticles, 50);
});

// Fallback click listener for theme toggle
document.addEventListener("click", (e) => {
  if (e.target.closest("[data-theme-toggle]")) {
    setTimeout(initParticles, 100);
  }
});

$(document).ready(function () {
  initParticles();


  // Scroll listener: handle mobile menu closing & scroll-top button
  $(window).on("scroll load", function () {
    if (typeof closeMobileNav === "function") {
      closeMobileNav();
    } else {
      $("#menu").removeClass("fa-times");
      $("header .navbar").removeClass("nav-toggle");
    }

    const scrollTop = document.querySelector("#scroll-top");
    if (scrollTop) {
      if (window.scrollY > 60) {
        scrollTop.classList.add("active");
      } else {
        scrollTop.classList.remove("active");
      }
    }
  });

  // Smooth scroll back to top
  $(document).on("click", "#scroll-top", function (e) {
    e.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, 500);
  });
});
