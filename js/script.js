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

const slider = (
  contentSelector,
  preSelecrot,
  nextSelector,
  pointSelector,
  dir
) => {
  let slideIndex = 1,
    paused = false;

  const items = document.querySelectorAll(contentSelector),
    points = document.querySelectorAll(pointSelector);

  function showSlides(n) {
    if (n > items.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = items.length;
    }

    items.forEach(item => {
      item.style.display = "none";
    });

    items[slideIndex - 1].style.display = "flex";
  }

  function plusSlides(n) {
    showSlides((slideIndex += n));
  }

  try {
    const prevBtn = document.querySelector(preSelecrot),
      nextBtn = document.querySelector(nextSelector);

    prevBtn.addEventListener("click", () => {
      plusSlides(-1);
      items[slideIndex - 1].classList.remove("slideInLeft");
      items[slideIndex - 1].classList.add("slideInRight");
    });

    nextBtn.addEventListener("click", () => {
      plusSlides(1);
      items[slideIndex - 1].classList.remove("slideInRight");
      items[slideIndex - 1].classList.add("slideInLeft");
    });
  } catch (error) {}

  function activateAnimation() {
    if (dir === "vertical") {
      paused = setInterval(function() {
        plusSlides(1);
        items[slideIndex - 1].classList.add("slideInDown");
      }, 5000);
    } else {
      paused = setInterval(function() {
        plusSlides(1);
        items[slideIndex - 1].classList.remove("slideInRight");
        items[slideIndex - 1].classList.add("slideInLeft");
      }, 5000);
    }
  }
  activateAnimation();
  items[0].parentNode.addEventListener("mouseenter", () => {
    clearInterval(paused);
  });
  items[0].parentNode.addEventListener("mouseleave", () => {
    activateAnimation();
  });

};

window.addEventListener("DOMContentLoaded", () => {
  showHiddenItems(".gallery__item", ".gallery__text");
  scrollToAnchor();
  addActionClass(".menu__list", ".menu__item", "menu__item_action");
  slider('.slider__content', '.slider__pre', '.slider__next','.slider__dot', 'horizontal');
});
