//API countries:  "https://restcountries.com"
// API flags of countries: "https://flagcdn.com"

/*
Recomendaciones:
    -Englobar la funcion de pedir un pais en otra funcion y que devuelva el json, por ejemplo getCoutry() o getAPI()
*/

function urlFlag(code) {
    return `https://flagcdn.com/w160/${code}.png`;
}

function getAllCountries() {
    return new Promise(async (resolve, reject) => {
        try {
            let url = `https://restcountries.com/v3.1/all`;
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
        try {

            if (continent === "america") continent = "americas";
            let url = `https://restcountries.com/v3.1/region/${continent}`;
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
            let countries = await getCountriesByContinent(continent);
            if (continent === "all continents") {
                countries = await getAllCountries();
            }

            let result = [];
            for (let i = 0; i < quantityCountries; i++) {
                let randomCountry =
                    countries[Math.floor(Math.random() * countries.length)];

                result.push({
                    name: randomCountry.name.common,
                    code: randomCountry.cca2.toLowerCase(),
                    region: randomCountry.region,
                    flagUrl: urlFlag(randomCountry.cca2.toLowerCase()),
                });
            }

            resolve(result);
        } catch (err) {
            reject(
                new Error(`Error request getRandomCoutries: ${err}`)
            );
        }
    });
}
