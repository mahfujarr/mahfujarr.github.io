// Hide/remove preloader once page fully loads
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.classList.add("loaded");
    const remove = () => preloader?.remove();
    preloader.addEventListener("transitionend", remove, { once: true });
    setTimeout(remove, 1000); // fallback if transitionend doesn't fire
  }
});

const navbar = document.querySelector(".navbar");
fetch("../assets/components/navbar/navbar.html")
  .then((res) => res.text())
  .then((data) => {
    navbar.innerHTML = data;
  });

const footer = document.querySelector(".footer");
fetch("../assets/components/footer/footer.html")
  .then((res) => res.text())
  .then((data) => {
    footer.innerHTML = data;
  });

const srtop = ScrollReveal({
  origin: "top",
  distance: "20px",
  duration: 1000,
  reset: false,
});
const toast = document.getElementById("toast");

const profilePhotos = [
  "assets/images/profile.webp",
  "assets/images/profile2.webp",
  // "assets/images/profile3.webp",
  "assets/images/profile4.webp",
];
let currentPhotoIndex = 0;

// Profile image cycling function
function cycleProfilePhoto() {
  const profileImg = document.querySelector(".about .image img");
  if (profileImg && profilePhotos.length > 1) {
    currentPhotoIndex = (currentPhotoIndex + 1) % profilePhotos.length;
    const newImg = new Image();
    newImg.onload = function () {
      profileImg.style.opacity = "0";
      setTimeout(() => {
        profileImg.src = profilePhotos[currentPhotoIndex];
        profileImg.style.opacity = "1";
      }, 150);
    };
    newImg.src = profilePhotos[currentPhotoIndex];
  }
}

function showToast(message, type) {
  toast.innerText = message;
  toast.className = type + " show";
  setTimeout(() => {
    toast.className = toast.className.replace("show", "");
  }, 3000);
}
// Toggle mobile navigation
document.addEventListener("click", function (e) {
  const menuBtn = e.target.closest("#menu");
  if (menuBtn) {
    menuBtn.classList.toggle("fa-times");
    const nav = document.querySelector("header .navbar");
    if (nav) nav.classList.toggle("nav-toggle");
  }
});

// Profile image cycling on click
document.addEventListener("click", function (e) {
  if (e.target.closest(".about .image img")) {
    cycleProfilePhoto();
    showToast(
      "Since you've clicked here, here's another photo of me ^_^",
      "success",
    );
  }
});

// Scroll listener: scroll-to-top button visibility & scroll spy
function handleScroll() {
  const menuBtn = document.getElementById("menu");
  const nav = document.querySelector("header .navbar");
  if (menuBtn) menuBtn.classList.remove("fa-times");
  if (nav) nav.classList.remove("nav-toggle");

  const scrollTopBtn = document.getElementById("scroll-top");
  if (scrollTopBtn) {
    if (window.scrollY > 60) {
      scrollTopBtn.classList.add("active");
    } else {
      scrollTopBtn.classList.remove("active");
    }
  }

  // Scroll spy active link tracking
  const offsetPadding = window.innerWidth <= 768 ? 100 : 200;
  const scrollPos = window.scrollY;
  const sections = document.querySelectorAll("section[id]");

  sections.forEach((section) => {
    const top = section.offsetTop - offsetPadding;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");

    if (scrollPos >= top && scrollPos < top + height) {
      document.querySelectorAll(".navbar ul li a").forEach((a) => a.classList.remove("active"));
      const activeLink = document.querySelector(`header .navbar a[href="/#${id}"]`);
      if (activeLink) activeLink.classList.add("active");
    }
  });
}

window.addEventListener("scroll", handleScroll, { passive: true });
window.addEventListener("load", handleScroll);

// Smooth scrolling with navbar offset
document.addEventListener("click", function (e) {
  const link = e.target.closest('a[href^="#"], a[href^="/#"]');
  if (!link) return;

  const href = link.getAttribute("href");
  const hashIndex = href.indexOf("#");
  if (hashIndex === -1) return;

  const targetId = href.substring(hashIndex + 1);
  if (!targetId) return;

  const targetEl = document.getElementById(targetId);
  if (targetEl) {
    e.preventDefault();
    const navbarHeight = window.innerWidth <= 768 ? 55 : 65;
    const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  }
});

// Scroll to top button click
document.addEventListener("click", function (e) {
  if (e.target.closest("#scroll-top")) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

// EmailJS contact form submission
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      if (typeof emailjs !== "undefined") {
        emailjs.init("6aenJm83oWfvaPDTd");
        emailjs
          .sendForm("mahfujarr_portfolio", "template_d7uy1y4", "#contact-form")
          .then(
            function (response) {
              console.log("SUCCESS!", response.status, response.text);
              contactForm.reset();
              showToast("Message received, Thanks!", "success");
            },
            function (error) {
              console.log("FAILED...", error);
              showToast("Something went wrong. Retry?", "error");
            },
          );
      }
    });
  }
});

const ageEl = document.getElementById("author-age");
if (ageEl) {
  ageEl.textContent = new Date().getFullYear() - 2002;
}

document.addEventListener("visibilitychange", function () {
  const favicon = document.getElementById("favicon");
  if (document.visibilityState === "visible") {
    document.title = "Portfolio | Mahfujar";
    if (favicon) favicon.setAttribute("href", "/assets/images/favicon.png");
  } else {
    document.title = "Come Back To Portfolio";
    if (favicon) favicon.setAttribute("href", "/assets/images/favhand.png");
  }
});

// <!-- typed js effect starts -->
var typed = new Typed(".typing-text", {
  strings: [
    "Backend Development.",
    "Frontend Development.",
    "Scripting and Automation.",
    "Problem Solving.",
  ],
  loop: true,
  typeSpeed: 50,
  backSpeed: 25,
  backDelay: 500,
});
// <!-- typed js effect ends -->

// Helper: detect touch-capable devices
function isTouchDevice() {
  return (
    (typeof window !== "undefined" && "ontouchstart" in window) ||
    (navigator && navigator.maxTouchPoints && navigator.maxTouchPoints > 0) ||
    (window.matchMedia && window.matchMedia("(pointer: coarse)").matches)
  );
}

async function fetchData(type = "skills") {
  let response;
  type === "skills"
    ? (response = await fetch("skills.json"))
    : (response = await fetch("./projects/projects.json"));
  const data = await response.json();
  return data;
}

function showSkills(skills) {
  let skillsContainer = document.getElementById("skillsContainer");
  let skillHTML = "";
  skills.forEach((skill) => {
    skillHTML += `
        <div class="bar tilt">
              <div class="info">
                <img src="${skill.icon}" alt="${skill.name} logo" loading="lazy" decoding="async" />
                <span style="cursor:default;">${skill.name}</span>
              </div>
            </div>`;
  });
  skillsContainer.innerHTML = skillHTML;
  if (!isTouchDevice() && typeof VanillaTilt !== "undefined") {
    VanillaTilt.init(skillsContainer.querySelectorAll(".tilt"), {
      max: 15,
      speed: 400,
    });
  }
  srtop.reveal(".skills .container .bar", { interval: 50 });
}

function showProjects(projects) {
  let projectsContainer = document.querySelector("#work .box-container");
  let projectHTML = "";
  projects
    .slice(0, 8)
    .forEach((project) => {
      const viewLink =
        project.links.view && project.links.view.trim() !== ""
          ? `<a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>`
          : `<span class="btn disabled" style="opacity:0.6; cursor:not-allowed;"><i class="fas fa-eye"></i> View</span>`;

      const techBadges =
        Array.isArray(project.tech) && project.tech.length > 0
          ? `<div class="project-tech">${project.tech
              .map((t) => `<span class="tech-badge">${t}</span>`)
              .join("")}</div>`
          : "";

      projectHTML += `
        <div class="box tilt">
          <img draggable="false" src="/assets/images/projects/${
            project.image
          }.png" alt="${project.name} project preview" loading="lazy" decoding="async" />
          <div class="content">
            <div class="tag">
              <h3>${project.name}</h3>
            </div>
            <div class="desc">
              <p>${
                project.desc.length > 100
                  ? project.desc.substring(0, 100) + "..."
                  : project.desc
              }</p>
              ${techBadges}
              <div class="btns">
                ${viewLink}
                <a href="${
                  project.links.code
                }" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
              </div>
            </div>
          </div>
        </div>`;
    });
  projectsContainer.innerHTML = projectHTML;

  if (!isTouchDevice() && typeof VanillaTilt !== "undefined") {
    VanillaTilt.init(projectsContainer.querySelectorAll(".tilt"), {
      max: 10,
      speed: 400,
    });
  }

  /* ===== SCROLL REVEAL ANIMATION ===== */
  /* SCROLL PROJECTS */
  srtop.reveal(".work .box", { interval: 200 });
}

fetchData().then((data) => {
  showSkills(data);
});

fetchData("projects").then((data) => {
  showProjects(data);
});

// <!-- tilt js effect starts -->
if (!isTouchDevice()) {
  VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
  });
}
// <!-- tilt js effect ends -->

//Start of Tawk.to Script
// var Tawk_API = Tawk_API || {},
//   Tawk_LoadStart = new Date();
// (function () {
//   var s1 = document.createElement("script"),
//     s0 = document.getElementsByTagName("script")[0];
//   s1.async = true;
//   s1.src = "https://embed.tawk.to/68e0462628fea3194d8c5b91/1j6m141tl";
//   s1.charset = "UTF-8";
//   s1.setAttribute("crossorigin", "*");
//   s0.parentNode.insertBefore(s1, s0);
// })();
//End of Tawk.to Script

/* ===== SCROLL REVEAL ANIMATION ===== */

/* SCROLL HOME */
srtop.reveal(".home .content h3", { delay: 200 });
srtop.reveal(".home .content p", { delay: 200 });
srtop.reveal(".home .content .btn", { delay: 200 });

srtop.reveal(".home .image", { delay: 400 });
srtop.reveal(".home .linkedin", { interval: 600 });
srtop.reveal(".home .github", { interval: 800 });
srtop.reveal(".home .twitter", { interval: 1000 });
srtop.reveal(".home .telegram", { interval: 600 });
srtop.reveal(".home .instagram", { interval: 600 });
srtop.reveal(".home .dev", { interval: 600 });

/* SCROLL ABOUT */
srtop.reveal(".about .content h3", { delay: 200 });
srtop.reveal(".about .content .tag", { delay: 200 });
srtop.reveal(".about .content p", { delay: 200 });
srtop.reveal(".about .content .box-container", { delay: 200 });
srtop.reveal(".about .content .resumebtn", { delay: 200 });

/* SCROLL EDUCATION */
srtop.reveal(".education .box", { interval: 200 });

/* SCROLL PROJECTS */
srtop.reveal(".work .box", { interval: 200 });

/* SCROLL EXPERIENCE */
srtop.reveal(".experience .timeline", { delay: 200 });
srtop.reveal(".experience .timeline .container", { interval: 200 });

/* SCROLL CONTACT */
srtop.reveal(".contact .container", { delay: 400 });
srtop.reveal(".contact .container .form-group", { delay: 400 });
