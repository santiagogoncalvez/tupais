// Manejador de datos de los países de rescountries.com pero sin hacerle solicitudes a la api, los datos están guardados en el proyecto.
import { moreThan2Words } from "@utils/string-parser.js";
import countriesInfo from "@data/countries-info.json" with { type: "json" };
import countriesCca2Json from "@data/country-cca2.json" with { type: "json" };


function shuffleArray(arr) {
   for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
   }
   return arr;
}

function getCountriesByContinent(continent) {
   let aceptedStrings = {
      "asia": "asia",
      "europe": "europa",
      "americas": "américa",
      "oceania": "oceanía",
      "africa": "áfrica",
   };
   continent = aceptedStrings[continent];
   // return new Promise(async (resolve, reject) => {
   try {
      let countries = [];
      for (let i = 0; i < countriesInfo.length; i++) {
         if (
            countriesInfo[i].region.toLowerCase() === continent.toLowerCase()
         ) {
            countries.push(countriesInfo[i]);
         }
      }
      return (countries);
   } catch (err) {
      return (new Error(`Error request restCoutries API: ${err}`));
   }
   // });
}

export async function getCoutryByName(name) {
   return new Promise(async (resolve, reject) => {
      try {
         let response = [];

         for (let i = 0; i < countriesInfo.length; i++) {
            if (countriesInfo[i].name.official === name) {
               response.push(countriesInfo[i]);
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
      let countries = countriesInfo;
      return (countries);
   } catch (err) {
      return (new Error(`Error request restCoutries API: ${err}`));
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

      return (result);
   } catch (err) {
      return (new Error(`Error request getRandomCoutries: ${err}`));
   }
   // });
}

export function getCountryCodeByName(name) {
   return countriesCca2Json[name] || null;
} 

/**
 * Busca el continente (region) de un país en countriesInfo
 * @param {string} countryName - Nombre común u oficial del país
 * @param {Array} countriesInfo - Array con la info de países
 * @returns {string|null} - Región (continente) o null si no se encontró
 */
export function getContinent(countryName) {
   if (!countryName || !Array.isArray(countriesInfo)) return null;

   // Normalizar string para comparación
   const normalize = str =>
      str
         ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim()
         : "";

   const target = normalize(countryName);

   const country = countriesInfo.find(c => {
      const common = normalize(c.name?.common);
      const official = normalize(c.name?.official);
      const translation = normalize(c.translations?.spa?.common);

      return target === common || target === official || target === translation;
   });

   return country ? country.region : null;
}

export function getPopulation(countryName) {
   if (!countryName || !Array.isArray(countriesInfo)) return null;

   const normalize = str =>
      str
         ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim()
         : "";

   const target = normalize(countryName);

   const country = countriesInfo.find(c => {
      const common = normalize(c.name?.common);
      const official = normalize(c.name?.official);
      const translation = normalize(c.translations?.spa?.common);

      return target === common || target === official || target === translation;
   });

   return country ? country.population : null;
}

export function getArea(countryName) {
   if (!countryName || !Array.isArray(countriesInfo)) return null;

   const normalize = str =>
      str
         ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim()
         : "";

   const target = normalize(countryName);

   const country = countriesInfo.find(c => {
      const common = normalize(c.name?.common);
      const official = normalize(c.name?.official);
      const translation = normalize(c.translations?.spa?.common);

      return target === common || target === official || target === translation;
   });

   return country ? country.area : null;
}

export function getSubregion(countryName) {
   if (!countryName || !Array.isArray(countriesInfo)) return null;

   const normalize = str =>
      str
         ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim()
         : "";

   const target = normalize(countryName);

   const country = countriesInfo.find(c => {
      const common = normalize(c.name?.common);
      const official = normalize(c.name?.official);
      const translation = normalize(c.translations?.spa?.common);

      return target === common || target === official || target === translation;
   });

   return country ? country.subregion : null;
}
