async function getCountrie(continent) {
    let url = `https://restcountries.com/v3.1/region/${continent}`;
    let countries = await fetch(url);
    return countries.json()
}

console.log(getCountrie("europe"));