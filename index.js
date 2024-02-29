// Imports
import { getRandomCountrie } from "./countries-codes/codes.js";

// Elements
const img = document.getElementById("image-flag");
const startAgain = document.getElementsByClassName("game__start-again")[0];
const selectContinent = document.getElementsByClassName(
    "presentation__continents-dropdown-option"
);

// Class
class NewGame {
    constructor(time, continent, quantityCountries = 1) {
        this.time = time;
        this.continent = continent;
        this.countries = [];
        (async () => {
            for (let i = 0; i < quantityCountries; i++) {
                let country = await getRandomCountrie(continent);
                this.countries.push(country);
            }
        })();
    }
}

let game = new NewGame(sessionStorage.getItem("time"), sessionStorage.getItem("continent"), 10);

console.log(game);

// Bindings

// Functions

// Homepage
document.addEventListener("DOMContentLoaded", function () {
    if (document.body.classList.contains("presentation")) {
        const continentsDropdown = document.getElementById(
            "continents-dropdown"
        );
        const buttonsTime = document.getElementsByClassName(
            "presentation__button-time"
        );
        const startButton = document.getElementsByClassName(
            "presentation__button-start"
        )[0];
        const closeIcon = document.getElementsByClassName(
            "presentation__header-link"
        )[0];

        // Millisenconds
        let continent = "todo el mundo";
        let time = -1; //free time
        let timesOptions = [-1, 30000, 100000];

        // Events
        continentsDropdown.addEventListener("change", function (event) {
            continent = event.target.value;
            console.log("Continent: ", continent);
        });

        for (let i = 0; i < buttonsTime.length; i++) {
            buttonsTime[i].addEventListener("click", function () {
                time = timesOptions[i];
                console.log(time);
            });
        }

        startButton.addEventListener("click", function () {
            sessionStorage.setItem("continent", continent);
            sessionStorage.setItem("time", time);
        });

        closeIcon.addEventListener("click", function () {
            sessionStorage.setItem("continent", continent);
            sessionStorage.setItem("time", time);
        });
    }
});

if (img) {
    startAgain.addEventListener("click", async function () {
        let result = await randCountrie(parameters.continent);
        let _url = `https://flagcdn.com/w160/${result.code}.png`;
        img.setAttribute("src", _url);
        countrie = randomCountrie();
    });
}
