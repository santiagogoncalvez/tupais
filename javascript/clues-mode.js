import { getRandomCountriesClues } from "./imports/countryDataManager.mjs";

let country = await getRandomCountriesClues(
   "all continents",
   1,
   "./images/flags-svg"
);

console.log(country)