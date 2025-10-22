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
  "assets/images/profile3.webp",
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
$(document).ready(function () {
  $("#menu").click(function () {
    $(this).toggleClass("fa-times");
    $(".navbar").toggleClass("nav-toggle");
  });

  // Profile image cycling on click
  $(".about .image img").click(function () {
    cycleProfilePhoto();
    showToast(
      "Since you've clicked here, here's another photo of me ^_^",
      "success"
    );
  });

  $(window).on("scroll load", function () {
    $("#menu").removeClass("fa-times");
    $(".navbar").removeClass("nav-toggle");

    if (window.scrollY > 60) {
      document.querySelector("#scroll-top").classList.add("active");
    } else {
      document.querySelector("#scroll-top").classList.remove("active");
    }

    // scroll spy
    $("section").each(function () {
      let height = $(this).height();
      let offset =
        $(this).offset().top - (window.innerWidth <= 768 ? 100 : 200);
      let top = $(window).scrollTop();
      let id = $(this).attr("id");

      if (top > offset && top < offset + height) {
        $(".navbar ul li a").removeClass("active");
        $(".navbar").find(`[href="#${id}"]`).addClass("active");
      }
    });
  });

  // smooth scrolling
  $('a[href*="#"]').on("click", function (e) {
    e.preventDefault();
    const target = $($(this).attr("href"));
    const navbarHeight = window.innerWidth <= 768 ? 55 : 65;
    $("html, body").animate(
      {
        scrollTop: target.offset().top - navbarHeight,
      },
      500,
      "linear"
    );
  });

  // <!-- emailjs to mail contact form data -->
  $("#contact-form").submit(function (event) {
    emailjs.init("6aenJm83oWfvaPDTd");

    emailjs
      .sendForm("mahfujarr_portfolio", "template_d7uy1y4", "#contact-form")
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
          document.getElementById("contact-form").reset();
          showToast("Message received, Thanks!", "success");
        },
        function (error) {
          console.log("FAILED...", error);
          showToast("Something went wrong. Retry?", "error");
        }
      );
    event.preventDefault();
  });
  // <!-- emailjs to mail contact form data -->
});

document.addEventListener("visibilitychange", function () {
  if (document.visibilityState === "visible") {
    document.title = "Portfolio | Mahfujar";
    $("#favicon").attr("href", "assets/images/favicon.png");
  } else {
    document.title = "Come Back To Portfolio";
    $("#favicon").attr("href", "assets/images/favhand.png");
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
                <img src=${skill.icon} alt="skill" />
                <span style="cursor:default;">${skill.name}</span>
              </div>
            </div>`;
  });
  skillsContainer.innerHTML = skillHTML;
  srtop.reveal(".skills .container .bar", { interval: 50 });
}

function showProjects(projects) {
  let projectsContainer = document.querySelector("#work .box-container");
  let projectHTML = "";
  projects
    .slice(0, 8)
    // .filter((project) => project.category != "script")
    .forEach((project) => {
      const viewLink =
        project.links.view && project.links.view.trim() !== ""
          ? `<a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>`
          : `<span class="btn disabled" style="opacity:0.6; cursor:not-allowed;"><i class="fas fa-eye"></i> View</span>`;

      projectHTML += `
        <div class="box tilt">
          <img draggable="false" src="/assets/images/projects/${
            project.image
          }.png" alt="project" />
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

  // <!-- tilt js effect starts -->
  VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 10,
  });
  // <!-- tilt js effect ends -->

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
VanillaTilt.init(document.querySelectorAll(".tilt"), {
  max: 15,
});
// <!-- tilt js effect ends -->

// disable developer mode
document.onkeydown = function (e) {
  if (e.key === "F12") {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.key === "I") {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.key === "C") {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.key === "J") {
    return false;
  }
  if (e.ctrlKey && e.key === "u") {
    return false;
  }
};

//Start of Tawk.to Script
var Tawk_API = Tawk_API || {},
  Tawk_LoadStart = new Date();
(function () {
  var s1 = document.createElement("script"),
    s0 = document.getElementsByTagName("script")[0];
  s1.async = true;
  s1.src = "https://embed.tawk.to/68e0462628fea3194d8c5b91/1j6m141tl";
  s1.charset = "UTF-8";
  s1.setAttribute("crossorigin", "*");
  s0.parentNode.insertBefore(s1, s0);
})();
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
