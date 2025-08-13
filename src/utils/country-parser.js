// Manejador de datos de los países de rescountries.com pero sin hacerle solicitudes a la api, los datos están guardados en el proyecto.
import { moreThan2Words, formatWord } from "@utils/string-parser.js";
import countriesJson from "@src/data/countries.json" with { type: "json" };
import countriesCca2Json from "@src/data/country-cca2.json" with { type: "json" };

function urlFlag(code, imageRute) {
   let url = imageRute + "/" + code + ".svg";
   if (code === "om") url = imageRute + "/" + code + ".png";
   return url;
}

function shuffleArray(arr) {
   for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
   }
   return arr;
}

function getClues(country) {
   let requiredClues = [
      "capital",
      "coatOfArms",
      "subregion",
      "landlocked",
      "borders",
      "area",
      "population",
      "car",
      "languages",
      "currencies",
   ];

   let clues = {};
   for (let property of requiredClues) {
      clues[property] = country[property] ? country[property] : null;
   }

   return clues;
}

function getCountriesByContinent(continent) {
   // return new Promise(async (resolve, reject) => {
      try {
         let countries = [];
         for (let i = 0; i < countriesJson.length; i++) {
            if (
               countriesJson[i].region.toLowerCase() === continent.toLowerCase()
            ) {
               countries.push(countriesJson[i]);
            }
         }
         return(countries);
      } catch (err) {
         return(new Error(`Error request restCoutries API: ${err}`));
      }
   // });
}

export async function getCoutryByName(name) {
   return new Promise(async (resolve, reject) => {
      try {
         let response = [];

         for (let i = 0; i < countriesJson.length; i++) {
            if (countriesJson[i].name.official === name) {
               response.push(countriesJson[i]);
            }
         }

         resolve(response[0]);
      } catch (err) {
         reject(new Error(`Error request restCoutries API: ${err}`));
      }
   });
}

export function getAllCountries() {
   // return new Promise(async (resolve, reject) => {
      try {
         let countries = countriesJson;
         return(countries);
      } catch (err) {
         return(new Error(`Error request restCoutries API: ${err}`));
      }
   // });
}

export function getRandomCountries(
   continent,
   quantityCountries = 10,
) {
   // return new Promise(async (resolve, reject) => {
      let aceptedStrings = [
         "all",
         "asia",
         "europe",
         "americas",
         "oceania",
         "africa",
      ];
      if (!aceptedStrings.includes(continent))
         throw new Error(
            `Incorrect string of argument 'continent'. Value: ${continent}`
         );

      try {
         let countries;
         if (continent === "all") {
            countries = getAllCountries();
         }

         if (continent !== "all") {
            countries = getCountriesByContinent(continent);
         }

         countries = shuffleArray(countries);

         if (quantityCountries === -1) {
            quantityCountries = countries.length;
         }

         let result = [];
         for (let i = 0; i < quantityCountries; i++) {
            let randomCountry = countries[i];
            if (!randomCountry) break;

            let formattedName =
               // formatWord(
               randomCountry.translations.spa.common
            // );

            // Ignorar elemntos con más de 2 palabras
            if (moreThan2Words(formattedName)) {
               quantityCountries++;
               continue;
            }

            result.push(formattedName);
         }

         return(result);
      } catch (err) {
         return(new Error(`Error request getRandomCoutries: ${err}`));
      }
   // });
}

export async function getRandomCountrieClues(continent, imageRute) {
   return new Promise(async (resolve, reject) => {
      let aceptedStrings = [
         "all",
         "asia",
         "europe",
         "americas",
         "oceania",
         "africa",
      ];
      if (!aceptedStrings.includes(continent))
         throw new Error(
            `Incorrect string of argument 'continent'. Value: ${continent}`
         );

      try {
         let countries;
         if (continent === "all") {
            countries = await getAllCountries();
         }

         if (continent !== "all") {
            countries = await getCountriesByContinent(continent);
         }

         let result = [];
         let more2Words = false;
         do {
            let randomCountry =
               countries[Math.floor(Math.random() * countries.length)];
            let formattedName = formatWord(
               randomCountry.translations.spa.common
            );

            // Ignorar elemntos con más de 2 palabras
            if (moreThan2Words(formattedName)) {
               more2Words = true;
               continue;
            } else {
               more2Words = false;
            }

            result.push({
               name: formattedName,
               code: randomCountry.cca2.toLowerCase(),
               region: randomCountry.region,
               flagUrl: urlFlag(randomCountry.cca2.toLowerCase(), imageRute),
               clues: getClues(randomCountry),
            });
         } while (more2Words);

         resolve(result);
      } catch (err) {
         reject(new Error(`Error request getRandomCoutries: ${err}`));
      }
   });
}

export function getCountryCodeByName(name) {
   return countriesCca2Json[name] || null;  
} 
