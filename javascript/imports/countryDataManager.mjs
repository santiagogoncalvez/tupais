//API countries:  "https://restcountries.com"
// API flags of countries: "https://flagcdn.com"

/*
Recomendaciones:
    -Englobar la funcion de pedir un pais en otra funcion y que devuelva el json, por ejemplo getCoutry() o getAPI()-
    - Escribir los url concatenando strings asi no se generan errores 404
*/

function moreThan2Words(str) {
    let words = str.split(" ");
    return words.length >= 3;
}

function formatWord(word) {
    let formatedWord = replaceHyphensWithSpaces(word);
    formatedWord = removeAccents(formatedWord);
    formatedWord = removeParentheses(formatedWord);

    return formatedWord;
}
function replaceHyphensWithSpaces(str) {
    return str.replace(/-/g, " ");
}

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

function removeParentheses(text) {
    return text.replace(/\s*\([^)]*\)/g, "").trim();
}

function urlFlag(code) {
    return "./images/flags-svg/" + code + ".svg";
}

function getAllCountries() {
    return new Promise(async (resolve, reject) => {
        let url = "https://restcountries.com/v3.1/all";
        try {
            let response = await fetch(url);
            let countries = await response.json();
            resolve(countries);
        } catch (err) {
            reject(new Error(`Error request restCoutries API: ${err}`));
        }
    });
}

function getCountriesByContinent(continent) {
    return new Promise(async (resolve, reject) => {
        if (continent === "america") continent = "americas";
        let url = "https://restcountries.com/v3.1/region/" + continent;
        try {
            let response = await fetch(url);
            let countries = await response.json();
            resolve(countries);
        } catch (err) {
            reject(new Error(`Error request restCoutries API: ${err}`));
        }
    });
}

export function getRandomCountries(continent, quantityCountries = 10) {
    return new Promise(async (resolve, reject) => {
        let aceptedStrings = [
            "all continents",
            "asia",
            "europe",
            "america",
            "oceania",
            "africa",
        ];
        if (!aceptedStrings.includes(continent))
            throw new Error(
                `Incorrect string of argument 'continent'. Value: ${continent}`
            );

        try {
            let countries;
            if (continent === "all continents") {
                countries = await getAllCountries();
            }

            if (continent !== "all continents") {
                countries = await getCountriesByContinent(continent);
            }

            let result = [];
            for (let i = 0; i < quantityCountries; i++) {
                let randomCountry =
                    countries[Math.floor(Math.random() * countries.length)];
                let formattedName = formatWord(randomCountry.name.common);

                // No deben repetirse los países
                if (result.some((element) => element.name === formattedName)) {
                    i--;
                    continue;
                }

                // Ignorar elemntos con más de 2 palabras
                if (moreThan2Words(formattedName)) {
                    i--;
                    continue;
                }

                result.push({
                    name: formattedName,
                    code: randomCountry.cca2.toLowerCase(),
                    region: randomCountry.region,
                    flagUrl: urlFlag(randomCountry.cca2.toLowerCase()),
                });
            }

            resolve(result);
        } catch (err) {
            reject(new Error(`Error request getRandomCoutries: ${err}`));
        }
    });
}
