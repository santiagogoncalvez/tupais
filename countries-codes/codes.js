//API countries:  "https://restcountries.com"
// API flags of countries: "https://flagcdn.com"

export async function getRandomCountrie(continent) {
    try {
        function urlFlag(code) {
            return `https://flagcdn.com/w160/${code}.png`;
        }

        if (continent === "all continents") {
            let url = `https://restcountries.com/v3.1/all`;
            let response = await fetch(url);
            let countries = await response.json();
            let country =
                countries[Math.floor(Math.random() * countries.length)];
            let name = country.name.common;
            let code = country.cca2.toLowerCase();
            let region = country.region;
            return { name: name, code: code, region: region };
        }

        let url = `https://restcountries.com/v3.1/region/${continent}`;
        let response = await fetch(url);
        let countries = await response.json();
        let country = countries[Math.floor(Math.random() * countries.length)];
        let name = country.name.common;
        let code = country.cca2.toLowerCase();
        let region = country.region;
        let flag = urlFlag(code);
        return { name: name, code: code, region: region, flag: flag };
    } catch (err) {
        throw new Error("Error request restAPI: ", err);
    }
}
