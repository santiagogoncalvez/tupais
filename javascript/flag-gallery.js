import {
   allCountries,
   countryByName,
} from "../javascript/imports/countryDataManager.mjs";

// Bindings
let flagSearch = true;

// Elements
const infoButton = document.getElementsByClassName("flag-gallery__button-info");
const menu = document.getElementsByClassName("navbar");
const menuButtonOpen = document.getElementsByClassName("navbar__button--open");
const menuButtonClose = document.getElementsByClassName(
   "navbar__button--close"
);

function filter(array, callback) {
   var resultado = [];
   for (var i = 0; i < array.length; i++) {
      if (callback(array[i], i, array)) {
         resultado.push(array[i]);
      }
   }
   return resultado;
}

// Pidiendo todos los paises juntos
async function insertFlagsAll(element) {
   let countries = await allCountries();
   let textHtml = "";

   let orderedName = [];

   for (let country of countries) {
      orderedName.push(country.name.common);
   }

   orderedName = orderedName.sort();

   for (let i = 0; i < orderedName.length; i++) {
      let country = filter(
         countries,
         (country) => country.name.common === orderedName[i]
      )[0];

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
              <figcaption class="flag-gallery__flag-description">${countryName}</figcaption>
              <div class="flag-gallery__flag-fullname">${country.name.official}</div>
               <button class="flag-gallery__button-info" type="button" title="Info">
                  <span class="flag-gallery__button-info--text">
                     !
                  </span>
               </button>
           </figure>
              </div>
      </li>`;
   }

   element.innerHTML = textHtml;
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
   let body = document.getElementsByClassName("flag-gallery")[0];
   let country = await countryByName(countrie);
   let textHtml = `
      <div class="features">
         <button class="features__close-button" title="Cerrar" type="button"
                    >
                    <span class="features__icon--close1"></span>
               <span class="features__icon--close2"></span>
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
            ${country.capital}
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

   body.insertAdjacentHTML("beforeend", textHtml);

   let [closeFt] = document.getElementsByClassName("features__close-button");
   closeFt.addEventListener("click", () => {
      const [features] = document.getElementsByClassName("features");
      features.remove();
   });
}

// Input Search dynamic
(() => {
   function detectScrollDirection() {
      const currentPosition = document.documentElement.scrollTop;
      const searchDynamicHtml = `
      <form class="flag-gallery__form--dynamic">
               <input
                  class="flag-gallery__search--dynamic"
                  type="search"
                  name="search"
                  placeholder="Buscar país"
               />
               <button
                  class="flag-gallery__btSearch--dynamic"
                  type="button"
                  title="Buscar"
               ></button>
            </form>
   `;
      const [body] = document.getElementsByClassName("flag-gallery");
      const [searchCommon] = document.getElementsByClassName(
         "flag-gallery__search"
      );

      if (currentPosition >= 200 && flagSearch) {
         body.insertAdjacentHTML("beforeend", searchDynamicHtml);
         const [formDynamic] = document.getElementsByClassName(
            "flag-gallery__form--dynamic"
         );
         const [searchDynamic] = document.getElementsByClassName(
            "flag-gallery__search--dynamic"
         );
         const [btSearchDynamic] = document.getElementsByClassName(
            "flag-gallery__btSearch--dynamic"
         );
         btSearchDynamic.addEventListener("click", activeSearchBt);
         searchDynamic.addEventListener("input", (event) => {
            searchCommon.value = event.target.value;
         });
         searchDynamic.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
               event.preventDefault();
               activeSearchBt();
            }
         });

         flagSearch = false;
         searchDynamic.value = searchCommon.value;
         setTimeout(() => {
            formDynamic.style.top = "26px";
         }, 50);
      }

      if (currentPosition < 200 && !flagSearch) {
         const [formDynamic] = document.getElementsByClassName(
            "flag-gallery__form--dynamic"
         );
         const [searchDynamic] = document.getElementsByClassName(
            "flag-gallery__search--dynamic"
         );

         formDynamic.style.top = "-100px";
         flagSearch = true;
         // searchCommon.focus();
         setTimeout(() => {
            formDynamic.remove();
         }, 200);
      }
   }
   window.addEventListener("scroll", detectScrollDirection);
})();

// Events
menuButtonOpen[0].addEventListener("click", function () {
   menu[0].style.left = "0rem";
});

menuButtonClose[0].addEventListener("click", function () {
   menu[0].style.left = "-25rem";
});
document.addEventListener("click", function (event) {
   const menuButtonOpenSpan = document.getElementsByClassName("navbar__icon");
   if (
      !Array.from(menuButtonOpenSpan).some((element) => {
         return event.target === element;
      }) &&
      event.target !== menuButtonOpen[0]
   ) {
      if (menu[0].style.left === "0rem") {
         if (
            !menu[0].contains(event.target) &&
            !menuButtonClose[0].contains(event.target)
         ) {
            menu[0].style.left = "-25rem";
         }
      }
   }
});

document.addEventListener("DOMContentLoaded", function () {
   const [list] = document.getElementsByClassName("flag-gallery__list");
   const [scrollUp] = document.getElementsByClassName(
      "flag-gallery__scroll-top"
   );
   const [btSearch] = document.getElementsByClassName("flag-gallery__btSearch");
   const [search] = document.getElementsByClassName("flag-gallery__search");
   const [homeBt] = document.getElementsByClassName("flag-gallery__home");

   insertFlagsAll(list);

   scrollUp.addEventListener("click", () => {
      window.scrollTo({
         top: 0,
         behavior: "smooth",
      });
   });

   btSearch.addEventListener("click", activeSearchBt);
   search.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
         event.preventDefault();
         activeSearchBt();
      }
   });
   homeBt.addEventListener("click", () => {
      const [inputSearch] = document.getElementsByClassName(
         "flag-gallery__search"
      );
      let enteredText = "";
      var regex = new RegExp(`${enteredText}`);

      inputSearch.value = "";

      document.querySelectorAll(".flag-gallery__item").forEach((item) => {
         const description = item.querySelector(
            ".flag-gallery__flag-description"
         );

         if (regex.test(removeAccents(description.textContent.toLowerCase()))) {
            setTimeout(function () {
               item.classList.remove("filter");
            }, 100);
            setTimeout(function () {
               item.style.opacity = 1;
            }, 200);
         }

         if (
            !regex.test(removeAccents(description.textContent.toLowerCase()))
         ) {
            setTimeout(function () {
               item.classList.add("filter");
            }, 300);
            item.style.opacity = 0;
         }
      });
   });
});

document.addEventListener("keydown", (event) => {
   const [features] = document.getElementsByClassName("features");

   if (features) {
      if (event.key === "Escape") {
         features.remove();
      }
   }
})

// Search
function activeSearchBt() {
   const [inputSearch] = document.getElementsByClassName(
      "flag-gallery__search"
   );
   let enteredText = removeAccents(inputSearch.value.toLowerCase());
   var regex = new RegExp(`${enteredText}`);

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
}

document.addEventListener("click", (event) => {
   const [features] = document.getElementsByClassName("features");
   if (features) {
      if (!features.contains(event.target)) {
         features.remove();
      }
   }
});

setTimeout(() => {
   const fullName = document.getElementsByClassName(
      "flag-gallery__flag-fullname"
   );
   for (let i = 0; i < infoButton.length; i++) {
      infoButton[i].addEventListener("click", () => {
         insertFeatures(fullName[i].textContent);
      });
   }
}, 1000);
