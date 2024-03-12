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
const flagItems = document.getElementsByClassName("flag-gallery__item");

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
      );

      let code = country[0].cca2.toLowerCase();
      let countryName = country[0].name.common;
      if (countryName === "Oman") {
         textHtml += `<li class="flag-gallery__item">
         <figure class="flag-gallery__flag-container">
              <img src="../images/flags-svg/om.png" alt="" class="flag-gallery__flag" />
              <figcaption class="flag-gallery__flag-description">${countryName}</figcaption>
           </figure></li>`;
         continue;
      }

      textHtml += `<li class="flag-gallery__item">
         <figure class="flag-gallery__flag-container">
              <img src="../images/flags-svg/${code}.svg" alt="" class="flag-gallery__flag" />
              <figcaption class="flag-gallery__flag-description">${countryName}</figcaption>
           </figure></li>`;
   }

   element.innerHTML = textHtml;
}

// Pidiendo los paises uno por uno
// tiempo: 3.5-4 segundos
async function insertFlagsByname(element) {
   let textHtml = "";

   for (let i = 0; i < orderedCountries.length; i++) {
      let country = await countryByName(orderedCountries[i]);
      let code = country[0].cca2.toLowerCase();
      let countryName = country[0].name.common;

      textHtml += `<li class="flag-gallery__item">
         <figure class="flag-gallery__flag-container">
              <img src="../images/flags-svg/${code}.svg" alt="" class="flag-gallery__flag" />
              <figcaption class="flag-gallery__flag-description">${countryName}</figcaption>
           </figure></li>`;
   }

   element.innerHTML = textHtml;
}

// Events

document.addEventListener("DOMContentLoaded", () => {
   const list = document.getElementsByClassName("flag-gallery__list")[0];
   insertFlagsAll(list);
});

// Search
document.addEventListener("keyup", (event) => {
   if (event.key === "Escape") event.target.value = "";

   if (event.target.matches(".flag-gallery__search")) {
      let enteredText = event.target.value.toLowerCase();
      var regex = new RegExp(`^${enteredText}`);

      document.querySelectorAll(".flag-gallery__item").forEach((item) => {
         const description = item.querySelector(
            ".flag-gallery__flag-description"
         );

         if (regex.test(description.textContent.toLowerCase())) {
            setTimeout(function () {
               item.classList.remove("filter");
            }, 100);
            setTimeout(function () {
               item.style.opacity = 1;
            }, 200);
         }

         if (!regex.test(description.textContent.toLowerCase())) {
            setTimeout(function () {
               item.classList.add("filter");
            }, 300);
            item.style.opacity = 0;
         }
      });
   }
});

setTimeout(() => {
   for (let element of flagItems) {
      element.addEventListener("click", () => {
         const description = element.querySelector(
            ".flag-gallery__flag-description"
         );
         insertFeatures(description.textContent);
      });
   }
}, 1000);

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
               ${country.languages}
            </li>
            <li class="features__item">
               Población: <br />
               ${country.population}
            </li>
            <li class="features__item">
               Países limítrofes: <br />
               ${country.borders}
            </li>
            <li class="features__item">
               Monedas: <br />
               ${country.currencies}
            </li>
            <li class="features__item">
               Coeficiente de Gini: <br />
               ${country.gini}
            </li>
            <li class="features__item">
               Acceso al mar: <br />
               ${country.landlocked ? "Si" : "No"}
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

// insertFeatures("Argentina");

function formatedProperties(type, content) {}
