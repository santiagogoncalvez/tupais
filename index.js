//Images of flags from: https://flagpedia.net

import { codesAndCountries } from "./countries-codes/codes.js";
console.log(codesAndCountries);

const onlyCodes = Object.keys(codesAndCountries);
console.log(onlyCodes);

const img = document.getElementById("flag");

img.addEventListener("click", async function (event) {
    let c = onlyCodes[Math.floor(Math.random() * onlyCodes.length)];
    console.log(c);
    img.setAttribute("src", `https://flagcdn.com/${[c]}.svg`);
});
