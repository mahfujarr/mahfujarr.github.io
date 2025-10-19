$(document).ready(function () {
  $("#menu").click(function () {
    $(this).toggleClass("fa-times");
    $(".navbar").toggleClass("nav-toggle");
  });
  // Scroll-top click handler
  $("#scroll-top").click(function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      500
    );
    return false;
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
async function getProjects() {
  const response = await fetch("projects.json");
  const data = await response.json();
  return data;
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
        <div class="grid-item ${project.category}" data-category="${project.category}">
        <div class="box tilt">
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

  // Add staggered animation delay to each item
  const gridItems = document.querySelectorAll(".grid-item");
  gridItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.2}s`;
  });

  // vanilla tilt.js
  VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 10,
  });

  // Simple filter functionality
  setupFilters();
}

function setupFilters() {
  const filterButtons = document.querySelectorAll(".button-group .btn");
  const gridItems = document.querySelectorAll(".grid-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      filterButtons.forEach((btn) => btn.classList.remove("is-checked"));
      this.classList.add("is-checked");

      const filterValue = this.getAttribute("data-filter");

      gridItems.forEach((item) => {
        item.style.animation = "none";
        item.offsetHeight; // force reflow
        item.style.animation = "";

        const category = item.getAttribute("data-category");

        if (filterValue === "*" || filterValue === "." + category) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });

      const visibleItems = Array.from(gridItems).filter(
        (item) => item.style.display !== "none"
      );
      visibleItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
      });
    });
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
