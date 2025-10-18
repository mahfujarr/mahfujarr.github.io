$(document).ready(function () {
  $("#menu").click(function () {
    $(this).toggleClass("fa-times");
    $(".navbar").toggleClass("nav-toggle");
  });

  $(window).on("scroll load", function () {
    $("#menu").removeClass("fa-times");
    $(".navbar").removeClass("nav-toggle");

    if (window.scrollY > 60) {
      document.querySelector("#scroll-top").classList.add("active");
    } else {
      document.querySelector("#scroll-top").classList.remove("active");
    }
  });
});

document.addEventListener("visibilitychange", function () {
  if (document.visibilityState === "visible") {
    document.title = "Projects | Portfolio Mahfujar";
    $("#favicon").attr("href", "/assets/images/favicon.png");
  } else {
    document.title = "Come Back To Portfolio";
    $("#favicon").attr("href", "/assets/images/favhand.png");
  }
});

// fetch projects start
function getProjects() {
  return fetch("projects.json")
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}

function showProjects(projects) {
  let projectsContainer = document.querySelector(".work .box-container");
  let projectsHTML = "";

  projects.forEach((project) => {
    const viewLink = project.links.view
      ? project.links.view
      : "javascript:void(0);";

    const viewClass = project.links.view ? "" : "disabled-link";
    const viewTarget = project.links.view ? 'target="_blank"' : "";

    projectsHTML += `
        <div class="grid-item ${project.category}">
        <div class="box tilt" style="width: 380px; margin: 1rem">
      <img draggable="false" src="/assets/images/projects/${project.image}.png" alt="project" />
      <div class="content">
        <div class="tag">
        <h3>${project.name}</h3>
        </div>
        <div class="desc">
          <p>${project.desc}</p>
          <div class="btns">
            <a href="${viewLink}" class="btn view-btn ${viewClass}" ${viewTarget}><i class="fas fa-eye"></i> View</a>
            <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
          </div>
        </div>
      </div>
    </div>
    </div>`;
  });

  projectsContainer.innerHTML = projectsHTML;

  // vanilla tilt.js
  VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 10,
  });
  // vanilla tilt.js

  /* ===== SCROLL REVEAL ANIMATION ===== */
  const srtop = ScrollReveal({
    origin: "bottom",
    distance: "80px",
    duration: 1000,
    reset: true,
  });

  /* SCROLL PROJECTS */
  srtop.reveal(".work .box", { interval: 200 });

  // isotope filter products
  var $grid = $(".box-container").isotope({
    itemSelector: ".grid-item",
    layoutMode: "fitRows",
    masonry: {
      columnWidth: 200,
    },
  });

  // filter items on button click
  $(".button-group").on("click", "button", function () {
    $(".button-group").find(".is-checked").removeClass("is-checked");
    $(this).addClass("is-checked");
    var filterValue = $(this).attr("data-filter");
    $grid.isotope({ filter: filterValue });
  });
}

getProjects().then((data) => {
  showProjects(data);
});
// fetch projects end

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
