/**
 *
 * The herein js script builds a navigation bar dynamically based on the number of sections and its respective ids.
 * In the navigation menu, all options are anchored to a given section in the main body. All sections within the viewport
 * have active classes associated to them. When the screen size is 768 px and below, the menu switchs to a side-bar format.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * The three necessary global variables are defined.
 */
const burgerLines = document.querySelector(".hamburger-lines");
const sectionList = document.querySelectorAll("section");
const navigationBar = document.querySelector(".nav-sublist");

/**
 * This functions removes all active classes associated to a given section.
 */
const removeActiveClassfromSections = () => {
  sectionList.forEach((elem) => {
    elem.classList.remove("your-active-class", "active");
  });
};

/**
 * This function returns a boolean based on weither an element is within the screen view or not.
 * By using the herein local variable 'height', when at least half of the section is within view,
 * the actions classes will remain on that section and its respective navigation link.
 */
const isInViewport = (elem) => {
  const distance = elem.getBoundingClientRect();
  let elemHeight = -0.5 * distance.height;
  return (
    distance.top >= elemHeight &&
    distance.left >= 0 &&
    distance.bottom <=
      (1.3 * window.innerHeight || document.documentElement.clientHeight) &&
    distance.right <=
      (window.innerWidth || document.documentElement.clientWidth)
  );
};

/**
 * This function dynamically toggles the action classes for sections based on weither
 * they are within the viewport or not. By using the 'matchSectionWithNavLink' function,
 * the matching navigation link also has different styling when its corresponding section
 * is visable within the viewport.
 */
const toggleActiveClasses = () => {
  const navigationBarLinks = navigationBar.querySelectorAll(".nav-link-font");
  for (const section of sectionList) {
    let navLink = matchSectionWithNavLink(section, navigationBarLinks);
    if (isInViewport(section)) {
      navLink.classList.add("nav-link-active");
      section.classList.add("your-active-class", "active");
    } else {
      navLink.classList.remove("nav-link-active");
      section.classList.remove("your-active-class", "active");
    }
  }
};

/**
 * @param {*} section
 * @param {*} navLinks
 * The following fonction returns the navigation link that has a matching title to
 * the id of a particular section.
 */
const matchSectionWithNavLink = (section, navLinks) => {
  const sectionID = section.id;
  for (const navLink of navLinks) {
    if (sectionID === navLink.innerHTML) {
      return navLink;
    } else {
      continue;
    }
  }
};

/**
 * The herein function adds an eventlistener to every navigation link. Upon click,
 * the matching section is fetched and the pages scrolls smoothly to it. Also, the
 * section is aligned at the center of the page.
 */
const scrollToSectionWithNavLink = () => {
  const navigationBarLinks = navigationBar.querySelectorAll(".nav-link-font");
  for (const navigationBarLink of navigationBarLinks) {
    navigationBarLink.addEventListener("click", function () {
      for (const section of sectionList) {
        let sectionID = section.id;
        if (sectionID === navigationBarLink.innerHTML) {
          section.scrollIntoView({ behavior: "smooth", block: "center" });
        } else {
          continue;
        }
      }
    });
  }
};

/**
 * The herein function fetchs all the nav links and once a link is clicked a 'nav-click'
 * CSS rules are applied to it. If another link is clicked, all the other links lose that
 * particular CSS class. Also, the class is applied to the newly clicked link.
 */
const toggleActiveOnClickNavLink = () => {
  const navigationBarLinks = navigationBar.querySelectorAll(".nav-link-font");
  console.log(navigationBarLinks);
  for (const navigationBarLink of navigationBarLinks) {
    navigationBarLink.addEventListener("click", function () {
      navigationBarLinks.forEach(function (elem) {
        elem.classList.remove("nav-click");
      });
      navigationBarLink.classList.add("nav-click");
    });
  }
};

/**
 * This functions removes all content from the navigation bar.
 */
const removeInnerHTMLofUnorderedListofNavBar = () => {
  navigationBar.innerHTML = "";
};

/**
 * This function enables the toggling of the side-bar menu by clickling the hamburger lines.
 */
const navigationSlide = () => {
  burgerLines.addEventListener("click", (event) => {
    event.preventDefault();
    navigationBar.classList.toggle("nav-sublist-active");
    burgerLines.classList.toggle("switch");
  });
};

/**
 * This function adds the section aanchors in the navigation bar based on the name of their respective IDs.
 * The 'toggleActiveClasses', 'scrollToSectionWithNavLink', 'toggleActiveOnClickNavLink' functions are \
 * added because it needs to be called at 'load'.
 */
const actionsAtLoad = () => {
  window.addEventListener("load", () => {
    sectionList.forEach((elem) => {
      const sectionID = elem.id;
      const navToken = document.createElement("li");
      navToken.innerHTML = `<a class="nav-link-font">${sectionID}</a>`;
      navigationBar.appendChild(navToken);
    });
    toggleActiveClasses();
    scrollToSectionWithNavLink();
    toggleActiveOnClickNavLink();
  });
};

/**
 * This function enables the header to be stuck in the viewport at all times.
 * The 'toggleActiveClasses' function is add because it needs to be called upon each 'scroll' instance.
 */
const actionsAtScroll = () => {
  window.addEventListener("scroll", () => {
    const headerBar = document.querySelector("header");
    headerBar.classList.toggle("sticky-header", window.scrollY > 0);
    toggleActiveClasses();
  });
};

/**
 * The herein function calls all the necessary functions for the js script.
 */
const app = () => {
  removeActiveClassfromSections();
  removeInnerHTMLofUnorderedListofNavBar();
  actionsAtLoad();
  actionsAtScroll();
  navigationSlide();
};

window.addEventListener("load", app());
