// Imports
import { getRandomCountries } from "../imports/countryDataManager.mjs";
import { NewGame } from "../imports/classNewGame.mjs";

// Elements
const startAgain = document.getElementsByClassName("game__start-again")[0];

// Class

// Bindings

let game;

// Functions

// Eventos
// Event after loading content
document.addEventListener("DOMContentLoaded", async function () {
    const flagImg = document.getElementById("image-flag");
    const answerDiv = document.getElementsByClassName("game__answer")[0];
    const answerWordElements =
        document.getElementsByClassName("game__answer-word");
    const continentElement = document.getElementsByClassName

    let gameTime = sessionStorage.getItem("time")
        ? sessionStorage.getItem("time")
        : -1;
    let gameContinent = sessionStorage.getItem("continent")
        ? sessionStorage.getItem("continent")
        : "all continents";
    let randomCountries = await getRandomCountries(gameContinent, 10);

    let stateGame = {
        time: gameTime,
        continent: gameContinent,
        countries: randomCountries,
        answerUser: "",
        correctAnswers: 0,
        elementsHtml: {
            flagImg: flagImg,
            answerDiv: answerDiv,
            answerLetters: answerWordElements,
        },
    };

    game = new NewGame(stateGame);

    game.innerHtmlWord(game.countries[0].name, answerDiv);
    console.log(game);
    flagImg.src = game.countries[0].flagUrl;
});

startAgain.addEventListener("click", async function () {});

document.addEventListener("keydown", function (event) {
    // console.log("Old state", game);
    let pressedKey = event.key.toLowerCase();
    game = game.modifyAnswer(pressedKey, game.answerUser);
    // console.log("New game: ", game);
});
