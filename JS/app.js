const navigationSlide = () => {
  const burgerLines = document.querySelector(".hamburger-lines");
  const navigationBar = document.querySelector(".nav-sublist");
  const navigationSublist = document.querySelectorAll(".nav-sublist li");
  burgerLines.addEventListener("click", (event) => {
    event.preventDefault();
    navigationBar.classList.toggle("nav-sublist-active");
    navigationSublist.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `nav-sublist-li-fade 0.5s ease forwards ${
          index / 7 + 0.5
        }s`;
      }
    });
    burgerLines.classList.toggle("switch");
  });
};

const app = () => {
  navigationSlide();
  window.addEventListener("scroll", () => {
    const headerBar = document.querySelector("header");
    headerBar.classList.toggle("sticky-header", window.scrollY > 0);
  });
};

window.addEventListener("load", app());
