const burgerLines = document.querySelector(".hamburger-lines");
const sectionList = document.querySelectorAll("section");
const navigationBar = document.querySelector(".nav-sublist");
const navigationSublist = document.querySelectorAll(".nav-sublist li");

const removeActiveClassfromSections = () => {
  sectionList.forEach((elem) => {
    elem.classList.remove("your-active-class", "active");
  });
};

const isInViewport = (elem) => {
  const distance = elem.getBoundingClientRect();
  return (
    distance.top >= 0 &&
    distance.left >= 0 &&
    distance.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    distance.right <=
      (window.innerWidth || document.documentElement.clientWidth)
  );
};

const removeInnerHTMLofUnorderedListofNavBar = () => {
  navigationBar.innerHTML = "";
};

const navigationSlide = () => {
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
  removeActiveClassfromSections();
  removeInnerHTMLofUnorderedListofNavBar();
  window.addEventListener("load", () => {
    sectionList.forEach((elem) => {
      const sectionID = elem.id;
      const navToken = document.createElement("li");
      navToken.innerHTML = `<a href="#${sectionID}">${sectionID}</a>`;
      navigationBar.appendChild(navToken);
    });
  });
  navigationSlide();
  window.addEventListener("scroll", () => {
    const headerBar = document.querySelector("header");
    headerBar.classList.toggle("sticky-header", window.scrollY > 0);
    for (const section of sectionList) {
      if (isInViewport(section)) {
        section.classList.add("your-active-class", "active");
      } else {
        section.classList.remove("your-active-class", "active");
      }
    }
  });
};

window.addEventListener("load", app());
