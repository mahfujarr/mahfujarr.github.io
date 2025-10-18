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
      value: ["#2506ad", "#011aff", "#fc8c05"],
    },
    shape: {
      type: ["circle"],
      stroke: {
        width: 0,
        color: "#2506ad",
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
      color: "#2506ad",
      opacity: 0.4,
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
  config_demo: {
    hide_card: false,
    background_color: "#0a192f",
    background_image: "",
    background_position: "50% 50%",
    background_repeat: "no-repeat",
    background_size: "cover",
  },
});