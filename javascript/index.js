// Imports
import { getRandomCountries } from "./imports/countryDataManager.mjs";
import { NewGame } from "../tests/classNewGame-copy.mjs";

// Elements
const startAgain = document.getElementsByClassName("game__start-again");

// Bindings
let game,
    timeOfGame = 0;

// Functions

function formatTime(milliseconds) {
    // Calcular minutos y segundos
    let totalSeconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    // Formatear los minutos y segundos
    let formattedMinutes = pad(minutes, 2);
    let formattedSeconds = pad(seconds, 2);

    // Concatenar minutos y segundos formateados
    return formattedMinutes + ":" + formattedSeconds;
}
// Timer
function countDown(milliseconds, element) {
    let interval = setInterval(function () {
        if (milliseconds < 0) {
            clearInterval(interval);
            let secondsAnswer = Math.floor((milliseconds % 60000) / 1000);
            game.insertAnswerResults(
                document.getElementsByClassName("homepage")[0],
                game.correctAnswers,
                timeOfGame
            );
        } else {
            let minutes = Math.floor(milliseconds / 60000);
            let seconds = Math.floor((milliseconds % 60000) / 1000);

            // Formatear los minutos y segundos en un string en formato MM:SS
            let formattedTime = pad(minutes, 2) + ":" + pad(seconds, 2);

            // Mostrar el tiempo restante en el elemento
            element.textContent = formattedTime;

            // Restar un segundo al tiempo restante
            milliseconds -= 1000;
            timeOfGame++;
        }
    }, 1000);
}

// Función para añadir ceros delante de un número si es necesario
function pad(number, length) {
    return ("0" + number).slice(-length);
}

// Eventos
// Event after loading content
document.addEventListener("DOMContentLoaded", async function () {
    // Create timer
    const timerElement = document.getElementsByClassName("game__time");
    let timeStorage = sessionStorage.getItem("time")
        ? Number(sessionStorage.getItem("time"))
        : -1;
    if (timeStorage === -1) timerElement[0].textContent = "LIBRE";
    if (timeStorage !== -1) {
        timerElement[0].textContent = formatTime(timeStorage);
        countDown(timeStorage, timerElement[0]);
    }

    const flagImg = document.getElementsByClassName("game__flag");
    const answerDiv = document.getElementsByClassName("game__answer");
    const continentElement = document.getElementsByClassName(
        "game__countrie-description"
    );
    const correctAnswerSpan = document.getElementsByClassName(
        "game__correct-answers"
    );
    const buttonsKeyboard = document.getElementsByClassName("keyboard__button");

    let gameContinent = sessionStorage.getItem("continent")
        ? sessionStorage.getItem("continent")
        : "all continents";
    let randomCountries = await getRandomCountries(gameContinent, 10);

    NewGame.innerHtmlWord(randomCountries[0].name, answerDiv[0]);
    flagImg[0].src = randomCountries[0].flagUrl;

    // Continent text
    if (gameContinent === "all continents") {
        continentElement[0].textContent = "todos los continentes";
    } else {
        continentElement[0].textContent = gameContinent;
    }

    const answerWordElements =
        document.getElementsByClassName("game__answer-word");

    let stateGame = {
        time: timeStorage,
        continent: gameContinent,
        countries: randomCountries,
        answerUser: "",
        correctAnswers: 0,
        lastResponseStatus: false,
        elementsHtml: {
            flagImg: flagImg,
            answerDiv: answerDiv,
            answerLetters: answerWordElements,
            continentSpan: continentElement,
            correctAnswerSpan: correctAnswerSpan,
        },
    };

    game = new NewGame(stateGame);
    console.log(game);

    // Keyboards buttons event
    for (let element of buttonsKeyboard) {
        element.addEventListener("click", function () {
            let pressedKey = element.value.toLowerCase();
            game = game.modifyAnswer(pressedKey, game.answerUser);
        });
    }
});

// startAgain.addEventListener("click", async function () {});

document.addEventListener("keydown", function (event) {
    let pressedKey = event.key.toLowerCase();
    if (pressedKey === "enter") {
        game = game.verifyAnswer(
            game.anwserUser,
            game.countries[correcAnswers]
        );

        if (game.lastResponseStatus === true) {
            game.showNewFlag();
        }
    }

    game = game.modifyAnswer(pressedKey, game.answerUser);

    // Mostrar resultados
    if (game.correcAnswers === 10) {
        game.showResults();
    }
});
