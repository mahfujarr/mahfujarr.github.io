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

document.addEventListener("visibilitychange", function () {
  if (document.visibilityState === "visible") {
    document.title = "Experience | Portfolio Mahfujar";
    $("#favicon").attr("href", "/assets/images/favicon.png");
  } else {
    document.title = "Come Back To Portfolio";
    $("#favicon").attr("href", "/assets/images/favhand.png");
  }
});
