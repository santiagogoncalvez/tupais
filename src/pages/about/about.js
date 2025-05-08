import "@src/index.css";

// Menu events
function addMenuEvents() {
   const [menuButtonOpen] = document.getElementsByClassName(
      "navbar__button--open"
   );
   const [menu] = document.getElementsByClassName("navbar");
   const [menuButtonClose] = document.getElementsByClassName(
      "navbar__button--close"
   );
   const [btGithub] = document.getElementsByClassName("footer__icon-github");
   const [body] = document.getElementsByClassName("about");

   let iconPathHoverDark = new URL(
      "/src/assets/icons/github-dark-mode-hover.svg",
      import.meta.url
   ).href;
   let iconPathDark = new URL(
      "/src/assets/icons/github-dark-mode.svg",
      import.meta.url
   ).href;
   let iconPathHover = new URL("/src/assets/icons/github.svg", import.meta.url)
      .href;
   let iconPath = new URL("/src/assets/icons/github-hover.svg", import.meta.url)
      .href;

   btGithub.addEventListener("mouseover", () => {
      if (body.classList.contains("dark-mode__page")) {
         // TODO: Correjir la ruta para que sea un path
         btGithub.style.backgroundImage = `url("${iconPathHoverDark}")`;
      } else {
         btGithub.style.backgroundImage = `url("${iconPath}")`;
      }

      btGithub.addEventListener("mouseout", () => {
         if (body.classList.contains("dark-mode__page")) {
            btGithub.style.backgroundImage = `url("${iconPathDark}")`;
         } else {
            btGithub.style.backgroundImage = `url("${iconPathHover}")`;
         }
      });
   });

   menuButtonOpen.addEventListener("click", function (event) {
      if (menu.style.left === "-25rem" || menu.style.left === "") {
         new Promise((resolve) => {
            menu.style.left = "0rem";
            resolve();
         }).then((resolve) => {
            setTimeout(() => {
               document.addEventListener("click", closeNavbar);
            }, 0);
         });
         return;
      }
      if (menu.style.left === "0rem") {
         if (!menu.contains(event.target)) {
            menu.style.left = "-25rem";
            document.removeEventListener("click", closeNavbar);
         }
         return;
      }
   });

   function closeNavbar(event) {
      if (!menu.contains(event.target)) {
         menu.style.left = "-25rem";
         document.removeEventListener("click", closeNavbar);
      }
   }

   menuButtonClose.addEventListener("click", function () {
      menu.style.left = "-25rem";
      document.removeEventListener("click", closeNavbar);
   });

   document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
         if (menu.style.left === "0rem") {
            menu.style.left = "-25rem";
         }
      }
   });
}

document.addEventListener("DOMContentLoaded", async function () {
   addMenuEvents();
   activeBtSettings();
   changeBtDarkMode();
});

function changeBtDarkMode() {
   function addClassDarkMode(type) {
      // Pagina actual
      const [body] = document.getElementsByClassName("about");
      const [main] = document.getElementsByClassName("about__main");

      const [header] = document.getElementsByClassName("header");
      const [footer] = document.getElementsByClassName("footer");
      const [title] = document.getElementsByClassName("header__title");
      const [navbarButton] = document.getElementsByClassName(
         "navbar__button--open"
      );
      const [footerParagraph] =
         document.getElementsByClassName("footer__paragraph");
      const [btSettings] = document.getElementsByClassName("header__settings");
      const [subtitle] = document.getElementsByClassName("about__subtitle");
      const [github] = document.getElementsByClassName("footer__icon-github");
      const [descriptionList] =
         document.getElementsByClassName("description-list");
      const links = document.getElementsByClassName("about__text-link");
      const navbarIcon = document.getElementsByClassName("navbar__icon");
      const h3 = document.getElementsByClassName("about__h4");
      const paragraph = document.getElementsByClassName("about__paragraph");

      let iconPath = new URL("/src/assets/icons/github.svg", import.meta.url)
         .href;
      let iconPathDark = new URL(
         "/src/assets/icons/github-dark-mode.svg",
         import.meta.url
      ).href;
      if (type === "activate") {
         header.classList.add("dark-mode__header");
         footer.classList.add("dark-mode__footer");
         title.classList.add("dark-mode__header--title");
         footerParagraph.classList.add("dark-mode__game-text");
         body.classList.add("dark-mode__page");
         main.classList.add("dark-mode__page");
         btSettings.classList.add("dark-mode__button-settings");
         navbarButton.classList.add("dark-mode__navbar-button-open");
         github.style.backgroundImage = `url("${iconPathDark}")`;
         subtitle.classList.add("dark-mode__game-text");
         descriptionList.classList.add("dark-mode__game-text");

         for (let element of navbarIcon) {
            element.classList.add("dark-mode__navbar-icon");
         }
         for (let element of h3) {
            element.classList.add("dark-mode__game-text");
         }
         for (let element of paragraph) {
            element.classList.add("dark-mode__game-text");
         }
         for (let element of links) {
            element.classList.add("dark-mode__links-text");
         }
      }

      if (type === "deactivate") {
         header.classList.remove("dark-mode__header");
         footer.classList.remove("dark-mode__footer");
         title.classList.remove("dark-mode__header--title");
         footerParagraph.classList.remove("dark-mode__game-text");
         body.classList.remove("dark-mode__page");
         main.classList.remove("dark-mode__page");
         btSettings.classList.remove("dark-mode__button-settings");
         navbarButton.classList.remove("dark-mode__navbar-button-open");
         github.style.backgroundImage = `url("${iconPath}")`;
         subtitle.classList.remove("dark-mode__game-text");
         descriptionList.classList.remove("dark-mode__game-text");

         for (let element of navbarIcon) {
            element.classList.remove("dark-mode__navbar-icon");
         }
         for (let element of h3) {
            element.classList.remove("dark-mode__game-text");
         }
         for (let element of paragraph) {
            element.classList.remove("dark-mode__game-text");
         }
         for (let element of links) {
            element.classList.remove("dark-mode__links-text");
         }
      }
   }

   const [btDarkMode] = document.getElementsByClassName("dark-mode-bt");
   const [circle] = document.getElementsByClassName("dark-mode-bt__circle");

   let darkMode;

   if (localStorage.getItem("darkMode") === "") {
      if (
         window.matchMedia &&
         window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
         localStorage.setItem("darkMode", "1");
         darkMode = Number(localStorage.getItem("darkMode"));
      } else {
         localStorage.setItem("darkMode", "0");
         darkMode = Number(localStorage.getItem("darkMode"));
      }
      if (darkMode) {
         addClassDarkMode("activate");
         return;
      }

      return;
   } else {
      darkMode = Number(localStorage.getItem("darkMode"));
   }

   if (darkMode) {
      addClassDarkMode("activate");
   } else {
      addClassDarkMode("deactivate");
   }

   if (btDarkMode) {
      if (darkMode) {
         circle.style.left = "32px";
         btDarkMode.style.backgroundColor = "#0D336B";
      } else {
         circle.style.left = "3px";
         btDarkMode.style.backgroundColor = "#BFE1FF";
      }
   }

   if (btDarkMode) {
      btDarkMode.addEventListener("click", function activeDarkMode() {
         // Activar
         if (circle.style.left === "3px") {
            circle.style.left = "32px";
            btDarkMode.style.backgroundColor = "#0D336B";
            localStorage.setItem("darkMode", "1");
            addClassDarkMode("activate");
         } else {
            circle.style.left = "3px";
            btDarkMode.style.backgroundColor = "#BFE1FF";
            localStorage.setItem("darkMode", "0");
            addClassDarkMode("deactivate");
         }
      });
   }
}

function activeBtSettings() {
   function animationIn(element) {
      element.style.height = "14rem";
      element.style.width = "26rem";
      element.style.opacity = "0";

      setTimeout(() => {
         element.style.opacity = "1";
      }, 15);

      setTimeout(() => {
         element.style.height = "15rem";
         element.style.width = "28rem";
      }, 15);
   }

   async function animationOut(element) {
      return new Promise((resolve) => {
         element.style.height = "14rem";
         element.style.width = "26rem";

         setTimeout(() => {
            element.style.opacity = "0";
         }, 15);
         setTimeout(() => {
            resolve();
         }, 100);
      });
   }

   const settingsHtml = `       
            <section class="presentation__section">
            <button class="presentation__header-link" title="Cerrar" type="button"
                    >
                </button>
            
               <div class="presentation__div">
               <h2 class="presentation__subtitle">Configuración</h2>

               <div class="presentation__subtitle">Modo oscuro</div>
               <button class="dark-mode-bt" type="button" title="Modo oscuro">
                  <img width="20" height="20"
                  src="${
                     new URL("/src/assets/icons/sun.svg", import.meta.url).href
                  }"alt="sun-symbol" class="dark-mode-bt__sun"/>
    
                  <div class="dark-mode-bt__circle"></div>
           
                  <img width="20" height="20" 
                  src="${
                     new URL("/src/assets/icons/moon.png", import.meta.url).href
                  }"alt="moon-symbol" class="dark-mode-bt__moon"/>
               </button>
        </section>
        <div class="blurry-background"></div>
`;
   const [btSettings] = document.getElementsByClassName("header__settings");
   let [body] = document.getElementsByClassName("about");

   // Events
   btSettings.addEventListener("click", async () => {
      insertCardSettings();
   });

   async function insertCardSettings(type) {
      return new Promise((resolve) => {
         btSettings.blur();
         body.insertAdjacentHTML("beforeend", settingsHtml);

         let [presentation] = document.getElementsByClassName(
            "presentation__section"
         );
         let [bgBlurry] = document.getElementsByClassName("blurry-background");
         const [closeIcon] = document.getElementsByClassName(
            "presentation__header-link"
         );

         presentation.classList.add("settings");

         animationIn(presentation);

         function listenOutsidePresent(event) {
            if (
               !presentation.contains(event.target) &&
               event.target !== btSettings
            ) {
               if (presentation.classList.contains("settings")) {
                  animationOut(presentation).then(() => {
                     bgBlurry.remove();
                     presentation.remove();
                     document.removeEventListener(
                        "click",
                        listenOutsidePresent
                     );
                  });
               }
            }
         }

         changeBtDarkMode();

         closeIcon.addEventListener("click", function () {
            animationOut(presentation).then(() => {
               bgBlurry.remove();
               presentation.remove();
               document.removeEventListener("click", listenOutsidePresent);
            });
         });

         document.addEventListener("keydown", actPresentation);

         document.addEventListener("click", listenOutsidePresent);

         function actPresentation(event) {
            escPresentation(event, type);
         }

         function escPresentation(event, type) {
            if (event.key === "Escape") {
               if (presentation) {
                  animationOut(presentation).then(() => {
                     bgBlurry.remove();
                     presentation.remove();
                     document.removeEventListener(
                        "click",
                        listenOutsidePresent
                     );
                     document.removeEventListener("keydown", actPresentation);
                  });
               }
            }
         }
      });
   }
}
