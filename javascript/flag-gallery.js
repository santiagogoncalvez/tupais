import {
   allCountries,
   countryByName,
} from "../javascript/imports/countryDataManager.mjs";

const orderedCountries = [
   "Afghanistan",
   "Albania",
   "Algeria",
   "American Samoa",
   "Andorra",
   "Angola",
   "Anguilla",
   "Antarctica",
   "Antigua and Barbuda",
   "Argentina",
   "Armenia",
   "Aruba",
   "Australia",
   "Austria",
   "Azerbaijan",
   "Bahamas",
   "Bahrain",
   "Bangladesh",
   "Barbados",
   "Belarus",
   "Belgium",
   "Belize",
   "Benin",
   "Bermuda",
   "Bhutan",
   "Bolivia",
   "Bosnia and Herzegovina",
   "Botswana",
   "Bouvet Island",
   "Brazil",
   "British Indian Ocean Territory",
   "British Virgin Islands",
   "Brunei",
   "Bulgaria",
   "Burkina Faso",
   "Burundi",
   "Cambodia",
   "Cameroon",
   "Canada",
   "Cape Verde",
   "Caribbean Netherlands",
   "Cayman Islands",
   "Central African Republic",
   "Chad",
   "Chile",
   "China",
   "Christmas Island",
   "Cocos (Keeling) Islands",
   "Colombia",
   "Comoros",
   "Cook Islands",
   "Costa Rica",
   "Croatia",
   "Cuba",
   "Curaçao",
   "Cyprus",
   "Czechia",
   "DR Congo",
   "Denmark",
   "Djibouti",
   "Dominica",
   "Dominican Republic",
   "Ecuador",
   "Egypt",
   "El Salvador",
   "Equatorial Guinea",
   "Eritrea",
   "Estonia",
   "Eswatini",
   "Ethiopia",
   "Falkland Islands",
   "Faroe Islands",
   "Fiji",
   "Finland",
   "France",
   "French Guiana",
   "French Polynesia",
   "French Southern and Antarctic Lands",
   "Gabon",
   "Gambia",
   "Georgia",
   "Germany",
   "Ghana",
   "Gibraltar",
   "Greece",
   "Greenland",
   "Grenada",
   "Guadeloupe",
   "Guam",
   "Guatemala",
   "Guernsey",
   "Guinea",
   "Guinea-Bissau",
   "Guyana",
   "Haiti",
   "Heard Island and McDonald Islands",
   "Honduras",
   "Hong Kong",
   "Hungary",
   "Iceland",
   "India",
   "Indonesia",
   "Iran",
   "Iraq",
   "Ireland",
   "Isle of Man",
   "Israel",
   "Italy",
   "Ivory Coast",
   "Jamaica",
   "Japan",
   "Jersey",
   "Jordan",
   "Kazakhstan",
   "Kenya",
   "Kiribati",
   "Kosovo",
   "Kuwait",
   "Kyrgyzstan",
   "Laos",
   "Latvia",
   "Lebanon",
   "Lesotho",
   "Liberia",
   "Libya",
   "Liechtenstein",
   "Lithuania",
   "Luxembourg",
   "Macau",
   "Madagascar",
   "Malawi",
   "Malaysia",
   "Maldives",
   "Mali",
   "Malta",
   "Marshall Islands",
   "Martinique",
   "Mauritania",
   "Mauritius",
   "Mayotte",
   "Mexico",
   "Micronesia",
   "Moldova",
   "Monaco",
   "Mongolia",
   "Montenegro",
   "Montserrat",
   "Morocco",
   "Mozambique",
   "Myanmar",
   "Namibia",
   "Nauru",
   "Nepal",
   "Netherlands",
   "New Caledonia",
   "New Zealand",
   "Nicaragua",
   "Niger",
   "Nigeria",
   "Niue",
   "Norfolk Island",
   "North Korea",
   "North Macedonia",
   "Northern Mariana Islands",
   "Norway",
   "Oman",
   "Pakistan",
   "Palau",
   "Palestine",
   "Panama",
   "Papua New Guinea",
   "Paraguay",
   "Peru",
   "Philippines",
   "Pitcairn Islands",
   "Poland",
   "Portugal",
   "Puerto Rico",
   "Qatar",
   "Republic of the Congo",
   "Romania",
   "Russia",
   "Rwanda",
   "Réunion",
   "Saint Barthélemy",
   "Saint Helena, Ascension and Tristan da Cunha",
   "Saint Kitts and Nevis",
   "Saint Lucia",
   "Saint Martin",
   "Saint Pierre and Miquelon",
   "Saint Vincent and the Grenadines",
   "Samoa",
   "San Marino",
   "Saudi Arabia",
   "Senegal",
   "Serbia",
   "Seychelles",
   "Sierra Leone",
   "Singapore",
   "Sint Maarten",
   "Slovakia",
   "Slovenia",
   "Solomon Islands",
   "Somalia",
   "South Africa",
   "South Georgia",
   "South Korea",
   "South Sudan",
   "Spain",
   "Sri Lanka",
   "Sudan",
   "Suriname",
   "Svalbard and Jan Mayen",
   "Sweden",
   "Switzerland",
   "Syria",
   "São Tomé and Príncipe",
   "Taiwan",
   "Tajikistan",
   "Tanzania",
   "Thailand",
   "Timor-Leste",
   "Togo",
   "Tokelau",
   "Tonga",
   "Trinidad and Tobago",
   "Tunisia",
   "Turkey",
   "Turkmenistan",
   "Turks and Caicos Islands",
   "Tuvalu",
   "Uganda",
   "Ukraine",
   "United Arab Emirates",
   "United Kingdom",
   "United States",
   "United States Minor Outlying Islands",
   "United States Virgin Islands",
   "Uruguay",
   "Uzbekistan",
   "Vanuatu",
   "Vatican City",
   "Venezuela",
   "Vietnam",
   "Wallis and Futuna",
   "Western Sahara",
   "Yemen",
   "Zambia",
   "Zimbabwe",
   "Åland Islands",
];

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

// Pidiendo toddos los paises juntos

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
              <img src="../images/flags-svg/${code}.svg" alt="" class="flag-gallery__flag" />
              <div class="flag-gallery__description-container">
              <figcaption class="flag-gallery__flag-description">${countryName}</figcaption>
              <div class="flag-gallery__flag-fullname">${country.name.official}</div>
               <button class="flag-gallery__button-info">
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

document.addEventListener("DOMContentLoaded", () => {
   const list = document.getElementsByClassName("flag-gallery__list")[0];
   insertFlagsAll(list);
});

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

// Search
document.addEventListener("keyup", (event) => {
   if (event.key === "Escape") event.target.value = "";

   if (event.target.matches(".flag-gallery__search")) {
      let enteredText = removeAccents(event.target.value.toLowerCase());
      var regex = new RegExp(`${enteredText}`);

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
      if (keys.length > 1) throw new Error("Mas de una moneda");

      let text = "";
      let currencie = property[keys[0]];
      let keysCurrencie = Object.keys(currencie);

      text += `${currencie[keysCurrencie[0]]} (${
         currencie[keysCurrencie[1]]
      }) `;

      return text;
   }
}

async function insertFeatures(countrie) {
   let body = document.getElementsByClassName("flag-gallery")[0];
   let country = await countryByName(countrie);
   let textHtml = `
      <div class="features">
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
}

document.addEventListener("click", (event) => {
   const features = document.getElementsByClassName("features")[0];
   if (features) {
      if (event.target !== features) {
         features.remove();
      }
   }
});

// Input Search dinamic
const [search] = document.getElementsByClassName("flag-gallery__search");
let flagSearch = true;

function detectScrollDirection() {
   const currentPosition = document.documentElement.scrollTop;
   console.log(currentPosition);
   if (currentPosition >= 200 && flagSearch) {
      search.classList.add("search-dinamic");
      flagSearch = false;
      setTimeout(() => {
         search.style.backgroundColor = "rgb(245, 245, 245)";
         search.style.top = "0";
      }, 50);
   }

   if (currentPosition < 200) {
      search.classList.remove("search-dinamic");
      flagSearch = true;
      search.style.top = "";
      search.style.backgroundColor = "white";
   }
}

window.addEventListener("scroll", detectScrollDirection);
