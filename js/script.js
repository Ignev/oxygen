const showHiddenItems = (parentNode, hiddenNode) => {
  const parents = document.querySelectorAll(parentNode);

  parents.forEach(item => {
    item.addEventListener("mouseover", () => {
      item.childNodes.forEach(el => {
        if (el.className == hiddenNode.replace(/\./, "")) {
          el.style.opacity = 1;
        }
      });
    });
    item.addEventListener("focus", () => {
      item.childNodes.forEach(el => {
        if (el.className == hiddenNode.replace(/\./, "")) {
          el.style.opacity = 1;
        }
      });
    });
    item.addEventListener("mouseout", () => {
      item.childNodes.forEach(el => {
        if (el.className == hiddenNode.replace(/\./, "")) {
          el.style.opacity = 0;
        }
      });
    });
  });
};
const addActionClass = (menuSelector, itmeSelector, actionClass) => {
  const menu = document.querySelector(menuSelector),
    items = document.querySelectorAll(itmeSelector);

  function hideTabContent() {
    items.forEach(item => {
      item.classList.remove(actionClass);
    });
  }
  function showTabContent(i = 0) {
    items[i].classList.add(actionClass);
  }

  menu.addEventListener("click", e => {
    const target = e.target;
    if (
      target &&
      (target.classList.contains(itmeSelector.replace(/\./, "")) ||
        target.parentNode.classList.contains(itmeSelector.replace(/\./, "")))
    ) {
      items.forEach((item, i) => {
        if (target == item || target.parentNode == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
};
const scrollToAnchor = menuSelector => {
  const menu = document.querySelector(menuSelector),
    anchors = document.querySelectorAll('a[href*="#"]');

  for (let anchor of anchors) {
    anchor.addEventListener("click", function(e) {
      e.preventDefault();
      const blockID = anchor.getAttribute("href").substr(1);

      document.getElementById(blockID).scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  }
};

const tabs = (
  headerSelector,
  tabSelector,
  contentSelector,
  activeClass,
  display = "block"
) => {
  const header = document.querySelector(headerSelector),
    tab = document.querySelectorAll(tabSelector),
    content = document.querySelectorAll(contentSelector);

  function hideTabContent() {
    content.forEach(item => {
      item.style.display = "none";
    });

    tab.forEach(item => {
      item.classList.remove(activeClass);
    });
  }
  function showTabContent(i = 0) {
    content[i].style.display = display;
    tab[i].classList.add(activeClass);
  }

  hideTabContent();
  showTabContent();

  header.addEventListener("click", e => {
    const target = e.target;
    if (
      target &&
      (target.classList.contains(tabSelector.replace(/\./, "")) ||
        target.parentNode.classList.contains(tabSelector.replace(/\./, "")))
    ) {
      tab.forEach((item, i) => {
        if (target == item || target.parentNode == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
};

window.addEventListener("DOMContentLoaded", () => {
  showHiddenItems(".gallery__item", ".gallery__text");
  scrollToAnchor();
  addActionClass(".menu__list", ".menu__item", "menu__item_action");
});
