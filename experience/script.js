// Hide/remove preloader once page fully loads
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.classList.add("loaded");
    const remove = () => preloader?.remove();
    preloader.addEventListener("transitionend", remove, { once: true });
    setTimeout(remove, 1000);
  }
});

const navbar = document.querySelector(".navbar");
fetch("../assets/components/navbar/navbar.html")
  .then((res) => res.text())
  .then((data) => {
    navbar.innerHTML = data;
    // Highlight the experience link in navbar
    setTimeout(() => {
      $(".navbar ul li a").removeClass("active");
      $("header .navbar").find('[href="/#experience"]').addClass("active");
    }, 100);
  });

const footer = document.querySelector(".footer");
fetch("../assets/components/footer/footer.html")
  .then((res) => res.text())
  .then((data) => {
    footer.innerHTML = data;
  });
$(document).ready(function () {
  $(document).on("click", "#menu", function () {
    $(this).toggleClass("fa-times");
    $("header .navbar").toggleClass("nav-toggle");
  });
  // Scroll-top click handler
  $(document).on("click", "#scroll-top", function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      500,
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

/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
  origin: "top",
  distance: "80px",
  duration: 1000,
  reset: true,
});

/* SCROLL EXPERIENCE */
srtop.reveal(".experience .timeline", { delay: 200 });
srtop.reveal(".experience .timeline .container", { interval: 200 });

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

document.addEventListener("visibilitychange", function () {
  if (document.visibilityState === "visible") {
    document.title = "Experience | Portfolio Mahfujar";
    $("#favicon").attr("href", "/assets/images/favicon.png");
  } else {
    document.title = "Come Back To Portfolio";
    $("#favicon").attr("href", "/assets/images/favhand.png");
  }
});
