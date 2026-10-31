function destroyHeroParticles() {
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
    const container = document.getElementById("particles-js");
    if (container) {
      const canvas = container.querySelector("canvas");
      if (canvas) canvas.remove();
    }
  }
}

function initHeroParticles() {
  const container = document.getElementById("particles-js");
  if (!container || typeof particlesJS === "undefined") return;

  destroyHeroParticles();

  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  const particleColors = isDark
    ? ["#7aa2ff", "#60a5fa", "#34d399"]
    : ["#2506ad", "#011aff", "#10b981"];
  const lineColor = isDark ? "#7aa2ff" : "#2506ad";
  const lineOpacity = isDark ? 0.35 : 0.4;

  particlesJS("particles-js", {
    particles: {
      number: {
        value: 60,
        density: {
          enable: true,
          value_area: 900,
        },
      },
      color: {
        value: particleColors,
      },
      shape: {
        type: ["circle"],
        stroke: {
          width: 0,
          color: lineColor,
        },
        polygon: {
          nb_sides: 5,
        },
      },
      opacity: {
        value: 0.7,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.3,
          sync: false,
        },
      },
      size: {
        value: 4,
        random: true,
        anim: {
          enable: true,
          speed: 4,
          size_min: 0.5,
          sync: false,
        },
      },
      line_linked: {
        enable: true,
        distance: 130,
        color: lineColor,
        opacity: lineOpacity,
        width: 1.2,
      },
      move: {
        enable: true,
        speed: 2.5,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: ["grab", "bubble"],
        },
        onclick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 200,
          line_linked: {
            opacity: 0.7,
          },
        },
        bubble: {
          distance: 180,
          size: 8,
          duration: 2,
          opacity: 0.8,
          speed: 3,
        },
        repulse: {
          distance: 120,
        },
        push: {
          particles_nb: 3,
        },
        remove: {
          particles_nb: 2,
        },
      },
    },
    retina_detect: true,
  });
}

initHeroParticles();

window.addEventListener("themechange", () => {
  initHeroParticles();
});
