const navbar = document.querySelector(".navbar");
fetch("/assets/components/navbar/navbar.html")
  .then((res) => res.text())
  .then((data) => {
    navbar.innerHTML = data;
  });

const footer = document.querySelector(".footer");
fetch("/assets/components/footer/footer.html")
  .then((res) => res.text())
  .then((data) => {
    footer.innerHTML = data;
  });

$(document).ready(function () {
  $(document).on("click", "#menu", function () {
    $(this).toggleClass("fa-times");
    $("header .navbar").toggleClass("nav-toggle");
  });
});
