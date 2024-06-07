import {
   getAllCountries,
   getCoutryByName,
} from "../javascript/imports/countryDataManajerJson.mjs";

// Bindings

// Elements;

function filter(array, callback) {
   let resultado = [];
   for (let i = 0; i < array.length; i++) {
      if (callback(array[i], i, array)) {
         resultado.push(array[i]);
      }
   }
   return resultado;
}

// Pidiendo todos los paises juntos
async function insertAllFlags(element) {
   return new Promise(async (resolve, reject) => {
      let countries = await getAllCountries();
      let textHtml = "";

      let orderedName = [];

      for (let country of countries) {
         orderedName.push(country.translations.spa.common);
      }

      orderedName = orderedName.sort();

      for (let i = 0; i < orderedName.length; i++) {
         let [country] = filter(
            countries,
            (country) => country.translations.spa.common === orderedName[i]
         );

         let code = country.cca2.toLowerCase();
         let countryName = country.translations.spa.common;

         if (country.name.official === "Sultanate of Oman") {
            textHtml += `<li class="flag-gallery__item">
         <figure class="flag-gallery__flag-container">
              <img src="../images/flags-svg/om.png" alt="" class="flag-gallery__flag" />
              <figcaption class="flag-gallery__flag-description">${countryName}</figcaption>
           </figure></li>`;
            continue;
         }

         textHtml += `
      <li class="flag-gallery__item">
         <figure class="flag-gallery__flag-container">
              <img src="../images/flags-svg/${code}.svg" alt="Bandera de ${countryName}" loading="eager" class="flag-gallery__flag" />
              <div class="flag-gallery__description-container">
              <figcaption class="flag-gallery__flag-description ${
                 localStorage.getItem("darkMode") === "1"
                    ? "dark-mode__game-text"
                    : ""
              }">${countryName}</figcaption>
              <div class="flag-gallery__flag-fullname">${
                 country.name.official
              }</div>
               <button class="flag-gallery__button-info ${
                  localStorage.getItem("darkMode") === "1"
                     ? "dark-mode__info-button"
                     : ""
               }" type="button" title="Info">
                  <span class="flag-gallery__button-info--text">
                     !
                  </span>
               </button>
           </figure>
              </div>
      </li>`;
      }

      element.innerHTML = textHtml;
      resolve();
   });
}

//Functions
function removeAccents(word) {
   const accentMap = {
      á: "a",
      é: "e",
      í: "i",
      ó: "o",
      ú: "u",
      ü: "u",
      Á: "A",
      É: "E",
      Í: "I",
      Ó: "O",
      Ú: "U",
      Ü: "U",
   };

   return word.replace(/[áéíóúüÁÉÍÓÚÜ]/g, function (match) {
      return accentMap[match];
   });
}

function formatProperties(property, type) {
   if (type === "gini") {
      if (!property) return "--";
      let keys = Object.keys(property);
      return `${property[keys[0]]} (${keys[0]})`;
   }

   if (type === "languages") {
      if (!property) return "--";
      let keys = Object.keys(property);
      let text = "";
      for (let i = 0; i < keys.length; i++) {
         if (i === keys.length - 1) {
            text += `${property[keys[i]]}`;
            continue;
         }
         text += `${property[keys[i]]}, `;
      }

      return text;
   }

   if (type === "borders") {
      if (!property) return "--";

      let keys = Object.keys(property);
      let text = "";
      for (let i = 0; i < keys.length; i++) {
         if (i === keys.length - 1) {
            text += `${property[keys[i]]}`;
            continue;
         }
         text += `${property[keys[i]]}, `;
      }

      return text;
   }

   if (type === "currencies") {
      if (!property) return "--";

      let keys = Object.keys(property);
      let text = "";

      if (keys.length === 1) {
         let currencie = property[keys[0]];
         let keysCurrencie = Object.keys(currencie);

         text += `${currencie[keysCurrencie[0]]} (${
            currencie[keysCurrencie[1]]
         })`;
      }

      if (keys.length > 1) {
         for (let i = 0; i < keys.length; i++) {
            if (i === keys.length - 1) {
               let currencie = property[keys[i]];
               let keysCurrencie = Object.keys(currencie);

               text += `${currencie[keysCurrencie[0]]} (${
                  currencie[keysCurrencie[1]]
               })`;
               continue;
            }

            let currencie = property[keys[i]];
            let keysCurrencie = Object.keys(currencie);

            text += `${currencie[keysCurrencie[0]]} (${
               currencie[keysCurrencie[1]]
            }), `;
         }
      }

      return text;
   }
}

async function insertFeatures(countrie) {
   let [body] = document.getElementsByClassName("flag-gallery");
   let country = await getCoutryByName(countrie);
   let textHtml = `
      <div class="features">
         <button class="features__close-button" title="Cerrar" type="button"
                    >
                </button>
      
         <h3 class="features__title">Características</h3>
         <ul class="features__list">
            <li class="features__item">
            Nombre oficial: <br />
            ${country.name.official}
            </li>
            <li class="features__item">
            Continenete: <br />
            ${country.region}
            </li>
            <li class="features__item">
            Subregión: <br />
            ${country.subregion}
            </li>
            <li class="features__item">
            Capital: <br />
            ${country.capital ? country.capital : "--"}
            </li>
            <li class="features__item">
               Área: <br />
               ${country.area} km<sup>2</sup>
            </li>
            <li class="features__item">
               Idiomas: <br />
               ${formatProperties(country.languages, "languages")}
            </li>
            <li class="features__item">
               Población: <br />
               ${country.population} hab.
            </li>
            <li class="features__item">
               Países limítrofes: <br />
               ${formatProperties(country.borders, "borders")}
            </li>
            <li class="features__item">
               Monedas: <br />
               ${formatProperties(country.currencies, "currencies")}
            </li>
            <li class="features__item">
               Coeficiente de Gini: <br />
               ${formatProperties(country.gini, "gini")}
            </li>
            <li class="features__item">
               Acceso al mar: <br />
               ${country.landlocked ? "No" : "Yes"}
            </li>
         </ul>
      </div>
   `;

   setTimeout(() => {
      body.insertAdjacentHTML("beforeend", textHtml);
      let [closeFt] = document.getElementsByClassName("features__close-button");
      closeFt.addEventListener("click", () => {
         const [features] = document.getElementsByClassName("features");
         features.remove();
      });
   }, 0);
}

// Events
document.addEventListener("DOMContentLoaded", async function () {
   const [list] = document.getElementsByClassName("flag-gallery__list");
   const [scrollUp] = document.getElementsByClassName(
      "flag-gallery__scroll-top"
   );
   const [btSearch] = document.getElementsByClassName("flag-gallery__btSearch");
   const [search] = document.getElementsByClassName("flag-gallery__search");
   const [homeBt] = document.getElementsByClassName("flag-gallery__home");
   ("flag-gallery__clearSearch");
   const [clearBt] = document.getElementsByClassName(
      "flag-gallery__clearSearch"
   );
   const [namesPreviewList] = document.getElementsByClassName(
      "preview-names__list"
   );

   activeBtSettings();
   changeBtDarkMode();

   await insertAllFlags(list).then(() => {
      const fullName = document.getElementsByClassName(
         "flag-gallery__flag-fullname"
      );
      const infoButton = document.getElementsByClassName(
         "flag-gallery__button-info"
      );
      for (let i = 0; i < infoButton.length; i++) {
         infoButton[i].addEventListener("click", () => {
            insertFeatures(fullName[i].textContent);
         });
      }
   });

   scrollUp.addEventListener("click", () => {
      window.scrollTo({
         top: 0,
         behavior: "instant",
      });
   });

   btSearch.addEventListener("click", activeSearchBt);
   search.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
         event.preventDefault();
         const [previewNamesList] = document.getElementsByClassName(
            "preview-names__list"
         );
         previewNamesList.style.display = "none";
         activeSearchBt(event);
      }
   });

   homeBt.addEventListener("click", activeSearchBt);

   search.addEventListener("input", activePreviwNames);

   search.addEventListener("focus", (event) => {
      const [previewNamesList] = document.getElementsByClassName(
         "preview-names__list"
      );
      const previewNamesItems = document.getElementsByClassName(
         "preview-names__item"
      );
      const [search] = document.getElementsByClassName("flag-gallery__search");

      activePreviwNames({ target: search });

      previewNamesList.style.display = "block";

      if (previewNamesItems.length === 0 && search.value === "") {
         document
            .querySelectorAll(".flag-gallery__flag-description")
            .forEach((description) => {
               const newItem = document.createElement("li");
               const span = document.createElement("span");
               span.textContent = description.textContent;
               span.classList.add("preview-names__span");
               newItem.classList.add("preview-names__item");
               newItem.appendChild(span);
               previewNamesList.appendChild(newItem);

               newItem.addEventListener("click", selectPreviewName);
            });
      }

      if (search.value === "") {
         activePreviwNames(event);
      }
   });

   clearBt.addEventListener("click", () => {
      search.value = "";
      search.focus();
      clearBt.style.display = "none";
   });

   namesPreviewList.addEventListener("mouseenter", () => {
      const previewNamesItems = document.getElementsByClassName(
         "preview-names__item"
      );

      for (let i = 0; i < previewNamesItems.length; i++) {
         if (
            previewNamesItems[i].style.backgroundColor === "rgb(245, 245, 245)"
         ) {
            previewNamesItems[i].style.backgroundColor = "";
            break;
         }
      }
   });

   window.addEventListener("scroll", showBtScroll);

   addMenuEvents();
});

function activePreviwNames(event) {
   const [previewNamesList] = document.getElementsByClassName(
      "preview-names__list"
   );
   const [search] = document.getElementsByClassName("flag-gallery__search");
   const [clearBt] = document.getElementsByClassName(
      "flag-gallery__clearSearch"
   );
   const [itemInputSearch] = document.getElementsByClassName(
      "preview-names__inputText"
   );

   itemInputSearch.textContent = event.target.value;

   let enteredText = removeAccents(event.target.value.toLowerCase());
   let searchRegex = new RegExp(`${enteredText}`);

   if (search.value !== "") {
      clearBt.style.display = "block";
   }

   if (search.value === "") {
      clearBt.style.display = "none";
   }

   document
      .querySelectorAll(".flag-gallery__flag-description")
      .forEach((description) => {
         const itemsStatus = document.getElementsByClassName(
            "preview-names__item"
         );

         // Si el texto insertado es un string vacio
         if (search.value === "") {
            for (let item of itemsStatus) {
               if (
                  removeAccents(description.textContent.toLowerCase()) ===
                  removeAccents(item.textContent.toLowerCase())
               ) {
                  return;
               }
            }

            const newItem = document.createElement("li");
            const span = document.createElement("span");
            span.textContent = description.textContent;
            newItem.classList.add("preview-names__item");
            span.classList.add("preview-names__span");
            newItem.appendChild(span);
            previewNamesList.appendChild(newItem);

            newItem.addEventListener("click", selectPreviewName);
         }
         // Buscar coincidencias entre input-descriptionCountries
         if (
            searchRegex.test(
               removeAccents(description.textContent.toLowerCase())
            )
         ) {
            // Verificar si existe ese nombre en la lista de previewNames
            for (let item of itemsStatus) {
               if (
                  removeAccents(description.textContent.toLowerCase()) ===
                  removeAccents(item.textContent.toLowerCase())
               ) {
                  return;
               }
            }

            const newItem = document.createElement("li");
            const span = document.createElement("span");
            span.textContent = description.textContent;
            newItem.classList.add("preview-names__item");
            span.classList.add("preview-names__span");
            newItem.appendChild(span);
            previewNamesList.appendChild(newItem);

            newItem.addEventListener("click", selectPreviewName);
         }

         // Buscar coincidencias entre input-previewItems
         const listStatus = document.getElementsByClassName(
            "preview-names__item"
         );
         for (let item of listStatus) {
            if (
               !searchRegex.test(removeAccents(item.textContent.toLowerCase()))
            ) {
               item.remove();
            }
         }

         // Ordenar alfabéticamente la lista
         Array.from(previewNamesList.children)
            .sort((a, b) => a.textContent.localeCompare(b.textContent))
            .forEach((li) => previewNamesList.appendChild(li));
      });

   const previewItems = previewNamesList.getElementsByClassName(
      "preview-names__item"
   );

   if (
      previewItems.length === 0 &&
      !document.getElementsByClassName("preview-names__item--not-found")[0]
   ) {
      const newItem = document.createElement("li");
      const span = document.createElement("span");
      span.textContent = "No se encontraron resultados";
      newItem.classList.add("preview-names__item--not-found");
      span.classList.add("preview-names__span");
      newItem.appendChild(span);
      previewNamesList.appendChild(newItem);
   }

   if (previewItems.length !== 0) {
      const [itemNotfound] = document.getElementsByClassName(
         "preview-names__item--not-found"
      );
      if (itemNotfound) itemNotfound.remove();
   }

   const previewNamesItems = document.getElementsByClassName(
      "preview-names__item"
   );

   for (let i = 0; i < previewNamesItems.length; i++) {
      if (previewNamesItems[i].style.backgroundColor === "rgb(245, 245, 245)") {
         previewNamesItems[i].style.backgroundColor = "";
         break;
      }
   }
}

function selectPreviewName(event) {
   const [search] = document.getElementsByClassName("flag-gallery__search");
   const [previewNamesList] = document.getElementsByClassName(
      "preview-names__list"
   );

   // Verificar si el elemento clickeado es un <li>
   if (event.target.nodeName === "LI") {
      const [span] = event.target.getElementsByClassName("preview-names__span");

      search.value = span.textContent;
      previewNamesList.style.display = "none";
      activeSearchBt(event);
   }

   // Verificar si el elemento clickeado es un <span>
   if (event.target.nodeName === "SPAN") {
      search.value = event.target.textContent;
      previewNamesList.style.display = "none";
      activeSearchBt(event);
   }
}

async function searchItem() {
   const [inputSearch] = document.getElementsByClassName(
      "flag-gallery__search"
   );
   let enteredText = removeAccents(inputSearch.value.toLowerCase());
   let regex = new RegExp(`${enteredText}`);

   document.querySelectorAll(".flag-gallery__item").forEach((item) => {
      const description = item.querySelector(".flag-gallery__flag-description");

      if (regex.test(removeAccents(description.textContent.toLowerCase()))) {
         setTimeout(function () {
            item.classList.remove("filter");
         }, 100);
         setTimeout(function () {
            item.style.opacity = 1;
         }, 200);
      }

      if (!regex.test(removeAccents(description.textContent.toLowerCase()))) {
         setTimeout(function () {
            item.classList.add("filter");
         }, 300);
         item.style.opacity = 0;
      }
   });

   setTimeout(() => {
      const flagItems = document.getElementsByClassName("flag-gallery__item");
      const [itemNotFound] = document.getElementsByClassName(
         "flag-gallery__item--not-found"
      );

      for (let item of flagItems) {
         if (!item.classList.contains("filter")) {
            if (itemNotFound) {
               itemNotFound.remove();
            }
            return;
         }
      }

      const [flagList] = document.getElementsByClassName("flag-gallery__list");
      const item = document.createElement("li");
      item.textContent = "No se encontraron resultados";
      item.classList.add("flag-gallery__item--not-found");
      item.style.display = "block";
      flagList.appendChild(item);
   }, 500);

   inputSearch.blur();
}

async function searchItemHome() {
   const [btClearInput] = document.getElementsByClassName(
      "flag-gallery__clearSearch"
   );
   const [inputSearch] = document.getElementsByClassName(
      "flag-gallery__search"
   );

   btClearInput.style.display = "none";

   let enteredText = "";
   let regex = new RegExp(`${enteredText}`);

   inputSearch.value = "";

   document.querySelectorAll(".flag-gallery__item").forEach((item) => {
      const description = item.querySelector(".flag-gallery__flag-description");

      if (regex.test(removeAccents(description.textContent.toLowerCase()))) {
         setTimeout(function () {
            item.classList.remove("filter");
         }, 100);
         setTimeout(function () {
            item.style.opacity = 1;
         }, 200);
      }

      if (!regex.test(removeAccents(description.textContent.toLowerCase()))) {
         setTimeout(function () {
            item.classList.add("filter");
         }, 300);
         item.style.opacity = 0;
      }
   });

   setTimeout(() => {
      const flagItems = document.getElementsByClassName("flag-gallery__item");
      const [itemNotFound] = document.getElementsByClassName(
         "flag-gallery__item--not-found"
      );

      for (let item of flagItems) {
         if (!item.classList.contains("filter")) {
            if (itemNotFound) {
               itemNotFound.remove();
            }
            return;
         }
      }
   }, 500);
}

// Search
async function activeSearchBt(event) {
   const [btHome] = document.getElementsByClassName("flag-gallery__home");

   const [galleryContainer] = document.getElementsByClassName(
      "flag-gallery__container--1"
   );

   const loadingBackground = document.createElement("div");
   const loagingImg = document.createElement("img");

   document.body.style.overflow = "hidden";

   galleryContainer.appendChild(loadingBackground);
   loadingBackground.classList.add("overlappingBackground__flag-gallery");
   localStorage.getItem("darkMode") === "1"
      ? loadingBackground.classList.add("dark-mode__page")
      : null;
   loadingBackground.style.height = `${galleryContainer.clientHeight}px`;

   loagingImg.src = "../images/icons-images/icons-loading.gif";
   loagingImg.alt = "Cargando gif";
   loagingImg.classList.add("flag-gallery__loading");
   galleryContainer.appendChild(loagingImg);

   if (event.target !== btHome) await searchItem();
   if (event.target === btHome) await searchItemHome();

   setTimeout(() => {
      loadingBackground.style.opacity = "0";
      loagingImg.style.opacity = "0";
   }, 1500);

   setTimeout(() => {
      loadingBackground.remove();
      loagingImg.remove();
      document.body.style.overflow = "";
   }, 1800);
}

document.addEventListener("click", (event) => {
   const [features] = document.getElementsByClassName("features");

   if (features) {
      if (!features.contains(event.target)) {
         features.remove();
      }
   }
});

document.addEventListener("click", (event) => {
   const [previewNamesList] = document.getElementsByClassName(
      "preview-names__list"
   );
   const [search] = document.getElementsByClassName("flag-gallery__search");

   if (event.target !== search && !previewNamesList.contains(event.target)) {
      if (document.activeElement === search) return;
      previewNamesList.style.display = "none";
      return;
   }
});

document.addEventListener("keydown", (event) => {
   const [features] = document.getElementsByClassName("features");
   const [search] = document.getElementsByClassName("flag-gallery__search");
   const [previewNamesList] = document.getElementsByClassName(
      "preview-names__list"
   );
   const [inputSearchItem] = document.getElementsByClassName(
      "preview-names__inputText"
   );
   const [clearBt] = document.getElementsByClassName(
      "flag-gallery__clearSearch"
   );

   if (document.activeElement === search) {
      const previewNamesItems = document.getElementsByClassName(
         "preview-names__item"
      );

      if (event.key === "Escape") {
         event.preventDefault();
         // Sacarle el focus al search cuando se hace click
         search.blur();
         search.value = inputSearchItem.textContent;
         previewNamesList.style.display = "none";
         return;
      }

      if (event.key === "ArrowUp") {
         event.preventDefault();
         if (previewNamesItems.length === 0) return;

         let index = null;
         for (let i = 0; i < previewNamesItems.length; i++) {
            if (
               previewNamesItems[i].style.backgroundColor ===
               "rgb(245, 245, 245)"
            ) {
               index = i - 1;
               break;
            }
         }

         // Mostrar texto introducido
         if (index === -1) {
            previewNamesItems[0].style.backgroundColor = "";
            search.value = inputSearchItem.textContent;

            if (search.value !== "") {
               clearBt.style.display = "block";
            } else {
               clearBt.style.display = "none";
            }
            return;
         }

         // Ir al final de la lista
         if (index === null) {
            index = previewNamesItems.length - 1;
            previewNamesItems[index].style.backgroundColor =
               "rgb(245, 245, 245)";
            search.value = previewNamesItems[index].textContent;

            // Desplazar la vista de la lista al elemento
            previewNamesList.scrollTo({
               top:
                  previewNamesItems[previewNamesItems.length - 1].offsetTop -
                  50,
               behavior: "smooth",
            });

            if (search.value !== "") {
               clearBt.style.display = "block";
            } else {
               clearBt.style.display = "none";
            }
            return;
         }

         // Desplazar la vista de la lista al elemento
         previewNamesList.scrollTo({
            top: previewNamesItems[index].offsetTop - 50,
            behavior: "smooth",
         });

         previewNamesItems[index + 1].style.backgroundColor = "";
         previewNamesItems[index].style.backgroundColor = "rgb(245, 245, 245)";
         search.value = previewNamesItems[index].textContent;

         if (search.value !== "") {
            clearBt.style.display = "block";
         } else {
            clearBt.style.display = "none";
         }
      }

      if (event.key === "ArrowDown") {
         if (previewNamesItems.length === 0) return;

         let index = null;
         for (let i = 0; i < previewNamesItems.length; i++) {
            if (
               previewNamesItems[i].style.backgroundColor ===
               "rgb(245, 245, 245)"
            ) {
               index = i + 1;
               break;
            }
         }

         // Mostrar texto introducido
         if (index === previewNamesItems.length) {
            previewNamesItems[
               previewNamesItems.length - 1
            ].style.backgroundColor = "";
            search.value = inputSearchItem.textContent;

            if (search.value !== "") {
               clearBt.style.display = "block";
            } else {
               clearBt.style.display = "none";
            }
            return;
         }

         // Ir al principio de la lista
         if (index === null) {
            index = 0;
            previewNamesItems[index].style.backgroundColor =
               "rgb(245, 245, 245)";
            search.value = previewNamesItems[index].textContent;

            // Desplazar la vista de la lista al elemento
            previewNamesList.scrollTo({
               top: previewNamesItems[0].offsetTop - 50,
               behavior: "smooth",
            });

            if (search.value !== "") {
               clearBt.style.display = "block";
            } else {
               clearBt.style.display = "none";
            }
            return;
         }

         // Desplazar la vista de la lista al elemento
         previewNamesList.scrollTo({
            top: previewNamesItems[index].offsetTop - 50,
            behavior: "smooth",
         });

         previewNamesItems[index - 1].style.backgroundColor = "";
         previewNamesItems[index].style.backgroundColor = "rgb(245, 245, 245)";
         search.value = previewNamesItems[index].textContent;

         if (search.value !== "") {
            clearBt.style.display = "block";
         } else {
            clearBt.style.display = "none";
         }
      }
   }

   if (event.key === "Escape") {
      if (features) {
         features.remove();
      }
   }
});

function addMenuEvents() {
   const [menuButtonOpen] = document.getElementsByClassName(
      "navbar__button--open"
   );
   const [menu] = document.getElementsByClassName("navbar");
   const [menuButtonClose] = document.getElementsByClassName(
      "navbar__button--close"
   );

   menuButtonOpen.addEventListener("click", function () {
      menu.style.left = "0rem";
   });

   menuButtonClose.addEventListener("click", function () {
      menu.style.left = "-25rem";
   });

   document.addEventListener("click", function (event) {
      const menuButtonOpenSpan =
         document.getElementsByClassName("navbar__icon");
      if (
         !Array.from(menuButtonOpenSpan).some((element) => {
            return event.target === element;
         }) &&
         event.target !== menuButtonOpen
      ) {
         if (menu.style.left === "0rem") {
            if (
               !menu.contains(event.target) &&
               !menuButtonClose.contains(event.target)
            ) {
               menu.style.left = "-25rem";
            }
         }
      }
   });

   document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
         if (menu.style.left === "0rem") {
            menu.style.left = "-25rem";
         }
      }
   });
}

function showBtScroll() {
   const [btScroll] = document.getElementsByClassName(
      "flag-gallery__scroll-top"
   );
   let scrollTop = window.scrollY;

   if (scrollTop >= 200) {
      if (btScroll.style.display !== "block") {
         btScroll.style.display = "block";

         // Animacion
         setTimeout(() => {
            btScroll.style.opacity = "1";
         }, 0);
      }
   } else {
      if (btScroll.style.display === "block") {
         btScroll.style.opacity = "0";

         setTimeout(() => {
            btScroll.style.display = "none";
         }, 400);
      }
   }
}

function changeBtDarkMode() {
   function addClassDarkMode(type) {
      // Pagina actual
      const [body] = document.getElementsByClassName("flag-gallery");
      const [main] = document.getElementsByClassName("flag-gallery__main");

      const [header] = document.getElementsByClassName("header");
      const [footer] = document.getElementsByClassName("footer");
      const [title] = document.getElementsByClassName("header__title");
      const [navbarButton] = document.getElementsByClassName(
         "navbar__button--open"
      );
      const [footerParagraph] =
         document.getElementsByClassName("footer__paragraph");
      const [btSettings] = document.getElementsByClassName("header__settings");
      const [subtitle] = document.getElementsByClassName(
         "flag-gallery__subtitle"
      );
      const [github] = document.getElementsByClassName("footer__icon-github");
      const infoButton = document.getElementsByClassName(
         "flag-gallery__button-info"
      );
      const navbarIcon = document.getElementsByClassName("navbar__icon");
      const descriptionCountry = document.getElementsByClassName(
         "flag-gallery__flag-description"
      );

      if (type === "activate") {
         header.classList.add("dark-mode__header");
         footer.classList.add("dark-mode__footer");
         title.classList.add("dark-mode__header--title");
         footerParagraph.classList.add("dark-mode__game-text");
         body.classList.add("dark-mode__page");
         main.classList.add("dark-mode__page");
         btSettings.classList.add("dark-mode__button-settings");
         navbarButton.classList.add("dark-mode__navbar-button-open");
         github.classList.add("dark-mode__github-bt");
         subtitle.classList.add("dark-mode__game-text");

         for (let element of navbarIcon) {
            element.classList.add("dark-mode__navbar-icon");
         }
         for (let element of descriptionCountry) {
            element.classList.add("dark-mode__game-text");
         }
         for (let element of infoButton) {
            element.classList.add("dark-mode__info-button");
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
         github.classList.remove("dark-mode__github-bt");
         subtitle.classList.remove("dark-mode__game-text");

         for (let element of navbarIcon) {
            element.classList.remove("dark-mode__navbar-icon");
         }
         for (let element of descriptionCountry) {
            element.classList.remove("dark-mode__game-text");
         }
         for (let element of infoButton) {
            element.classList.remove("dark-mode__info-button");
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
   const settingsHtml = `       
            <section class="presentation__section">
            <button class="presentation__header-link" title="Cerrar" type="button"
                    >
                </button>
            
               <div class="presentation__div">
               <h2 class="presentation__subtitle">Configuración</h2>

               <div class="presentation__subtitle">Modo oscuro</div>
               <button class="dark-mode-bt" type="button" title="Modo oscuro">
                  <img width="20" height="20" src="https://img.icons8.com/material-rounded/24/BFE1FF/sun--v1.png" alt="sun--v1" class="dark-mode-bt__sun"/>
    
                  <div class="dark-mode-bt__circle"></div>
           
                  <img width="20" height="20" src="https://img.icons8.com/ios-glyphs/30/0D336B/moon-symbol.png" alt="moon-symbol" class="dark-mode-bt__moon"/>
               </button>
        </section>
        <div class="blurry-background"></div>
`;
   const [btSettings] = document.getElementsByClassName("header__settings");
   let [body] = document.getElementsByClassName("flag-gallery");

   // Events
   btSettings.addEventListener("click", async () => {
      await insertCardSettings("settings");
   });

   async function insertCardSettings(type) {
      return new Promise((resolve) => {
         btSettings.blur();
         if (type === "settings") {
            body.insertAdjacentHTML("beforeend", settingsHtml);
         }

         let [presentation] = document.getElementsByClassName(
            "presentation__section"
         );
         let [bgBlurry] = document.getElementsByClassName("blurry-background");
         const [closeIcon] = document.getElementsByClassName(
            "presentation__header-link"
         );

         if (type === "settings") {
            presentation.classList.add("settings");
         }

         function listenOutsidePresent(event) {
            if (
               !presentation.contains(event.target) &&
               event.target !== btSettings
            ) {
               if (presentation.classList.contains("settings")) {
                  presentation.style.top = "-20rem";
                  bgBlurry.style.opacity = "0";
                  bgBlurry.remove();
                  presentation.remove();
                  document.removeEventListener("click", listenOutsidePresent);
               }
            }
         }

         if (type === "settings") {
            changeBtDarkMode();
            closeIcon.addEventListener("click", function () {
               presentation.style.top = "-20rem";
               bgBlurry.style.opacity = "0";
               bgBlurry.remove();
               presentation.remove();
               document.removeEventListener("click", listenOutsidePresent);
            });

            document.addEventListener("keydown", actPresentation);
         }

         document.addEventListener("click", listenOutsidePresent);

         function actPresentation(event) {
            escPresentation(event, type);
         }

         function escPresentation(event, type) {
            if (type === "settings") {
               if (event.key === "Escape") {
                  if (presentation) {
                     presentation.style.top = "-20rem";
                     bgBlurry.style.opacity = "0";
                     bgBlurry.remove();
                     presentation.remove();
                     document.removeEventListener(
                        "click",
                        listenOutsidePresent
                     );

                     document.removeEventListener("keydown", actPresentation);
                  }
               }
            }
         }
      });
   }
}
