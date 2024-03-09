// Imports
import { getRandomCountries } from "./imports/countryDataManager.mjs";
import { NewGame } from "./imports/classNewGame.mjs";

// Elements
const startAgain = document.getElementsByClassName("game__start-again");
// Bindings
let game;
let timeElapsed = 0;
let freeTimeInterval;
let timeInterval;
const presentationHtml = `        
            <section class="presentation__section">
            <header class="presentation__header">
                <h2 class="presentation__header-title">TÚ PAÍS</h2>

                <!-- icono de cruz para salir -->
                <a href="#" class="presentation__header-link"
                    ><img
                        src="../images/close.png"
                        alt=""
                        class="presentation__header-close"
                    />
                </a>
            </header>

            <div class="presentation__div">
                <h3 class="presentation__subtitle">¿Cómo jugar?</h3>

                <p class="presentation__paragraph">
                    <strong>TÚ PAÍS</strong> es un juego de adivinanzas
                    geográficas en el que tenés que acertar el nombre de países
                    de los diferentes continentes. Si llegas a las 10 respuestas
                    correctas ¡Ganás!
                </p>

                <label
                    for="continents-dropdown"
                    class="presentation__label-continents"
                    >Elige el continente de los paises</label
                >

                <select name="" id="continents-dropdown">
                    <option
                        value="all continents"
                        class="presentation__continents-dropdown-option"
                    >
                        TODO EL MUNDO
                    </option>
                    <option
                        value="africa"
                        class="presentation__continents-dropdown-option"
                    >
                        ÁFRICA
                    </option>
                    <option
                        value="america"
                        class="presentation__continents-dropdown-option"
                    >
                        AMÉRICA
                    </option>
                    <option
                        value="asia"
                        class="presentation__continents-dropdown-option"
                    >
                        ASIA
                    </option>
                    <option
                        value="europe"
                        class="presentation__continents-dropdown-option"
                    >
                        EUROPA
                    </option>
                    <option
                        value="oceania"
                        class="presentation__continents-dropdown-option"
                    >
                        OCEANÍA
                    </option>
                </select>

                <label for="" class="presentation__label-time">
                    Elige el tiempo
                </label>
                <div class="presentation__div-time">
                    <button class="presentation__button-time">LIBRE</button>
                    <button class="presentation__button-time">0:30</button>
                    <button class="presentation__button-time">1:00</button>
                </div>

                <a href="#" class="presentation__button-start"
                    ><span>¡EMPEZAR!</span></a
                >
            </div>
        </section>
        <div class="blurry-background"></div>
`;

// Functions

async function createNewGame() {
    // Clean timer
    clearInterval(freeTimeInterval);
    clearInterval(timeInterval);

    // Create timer
    const timerElement = document.getElementsByClassName("game__time");
    let timeStorage = sessionStorage.getItem("time")
        ? Number(sessionStorage.getItem("time"))
        : -1;
    if (timeStorage === -1) {
        timerElement[0].textContent = "LIBRE";
        countDown(timeStorage);
    }
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

    let gameContinent = sessionStorage.getItem("continent")
        ? sessionStorage.getItem("continent")
        : "all continents";
    let randomCountries = await getRandomCountries(gameContinent, 10);

    NewGame.innerLetterElements(randomCountries[0].name, answerDiv[0]);
    flagImg[0].src = randomCountries[0].flagUrl;

    // Continent text
    if (gameContinent === "all continents") {
        continentElement[0].textContent = "todos los continentes";
    } else {
        continentElement[0].textContent = gameContinent;
    }

    const answerLetterElements = document.getElementsByClassName(
        "game__answer-letter"
    );

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
            answerLetters: answerLetterElements,
            continentSpan: continentElement,
            correctAnswerSpan: correctAnswerSpan,
        },
    };

    game = new NewGame(stateGame);
    console.log(game);
}

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
    if (milliseconds === -1) {
        freeTimeInterval = setInterval(function () {
            if (game.correctAnswers === 10) {
                clearInterval(freeTimeInterval);
            } else {
                timeElapsed++;
            }
        }, 1000);
    }

    if (milliseconds !== -1) {
        timeInterval = setInterval(function () {
            if (milliseconds < 0) {
                clearInterval(timeInterval);
                game.insertAnswerResults(
                    document.getElementsByClassName("homepage")[0],
                    game.correctAnswers,
                    timeElapsed++
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
                timeElapsed++;
            }
        }, 1000);
    }
}

// Función para añadir ceros delante de un número si es necesario
function pad(number, length) {
    return ("0" + number).slice(-length);
}

function listenKeyboard(pressedKey) {
    if (pressedKey === "enter") {
        game = game.verifyAnswer(
            game.answerUser,
            game.countries[game.correctAnswers].name
        );

        // Mostrar resultados
        if (game.correctAnswers === 10) {
            game.showResults(timeElapsed);
            return;
        }

        if (game.lastResponseStatus) {
            game.showNewFlag();
            NewGame.innerLetterElements(
                game.countries[game.correctAnswers].name,
                game.elementsHtml.answerDiv[0]
            );
        }
        return;
    }

    game = game.modifyAnswer(pressedKey, game.answerUser);
}

// Eventos
// Event after loading content
document.addEventListener("DOMContentLoaded", async function () {
    // Presentation
    if (
        sessionStorage.getItem("time") === null &&
        sessionStorage.getItem("continent") === null
    ) {
        let body = document.getElementsByClassName("homepage")[0];
        body.insertAdjacentHTML("beforeend", presentationHtml);
        let presentation = document.getElementsByClassName(
            "presentation__section"
        );
        let blurry = document.getElementsByClassName("blurry-background")[0];

        async function insertPresentation() {
            return new Promise((resolve, reject) => {
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
                let continent = "all continents";
                let time = -1; //free time
                let timesOptions = [-1, 30000, 60000];

                // Events
                continentsDropdown.addEventListener("change", function (event) {
                    continent = event.target.value;
                });

                for (let i = 0; i < buttonsTime.length; i++) {
                    buttonsTime[i].addEventListener("click", function () {
                        time = timesOptions[i];
                    });
                }

                startButton.addEventListener("click", function () {
                    sessionStorage.setItem("continent", continent);
                    sessionStorage.setItem("time", time);
                    presentation[0].style.top = "-20rem";
                    blurry.style.opacity = "0";
                    blurry.remove();
                    resolve();
                });

                closeIcon.addEventListener("click", function () {
                    sessionStorage.setItem("continent", continent);
                    sessionStorage.setItem("time", time);
                    presentation[0].style.top = "-20rem";
                    blurry.style.opacity = "0";
                    blurry.remove();
                    resolve();
                });
            });
        }

        await insertPresentation();
    }

    createNewGame();

    // Keyboards buttons event
    const buttonsKeyboard = document.getElementsByClassName("keyboard__button");
    for (let element of buttonsKeyboard) {
        element.addEventListener("click", function () {
            listenKeyboard(element.value.toLowerCase());
        });
    }
});

startAgain[0].addEventListener("click", async function () {
    createNewGame();
});

document.addEventListener("keydown", function (event) {
    listenKeyboard(event.key.toLowerCase());
    return;
});

const menuButtonOpen = document.getElementsByClassName("navbar__button--open");
const menu = document.getElementsByClassName("navbar");
const menuButtonClose = document.getElementsByClassName(
    "navbar__button--close"
);
const menuButtonOpenSpan = document.getElementsByClassName("navbar__icon");

menuButtonOpen[0].addEventListener("click", function () {
    menu[0].style.left = "0rem";
});

menuButtonClose[0].addEventListener("click", function () {
    menu[0].style.left = "-25rem";
});

document.addEventListener("click", function (event) {
    if (
        !Array.from(menuButtonOpenSpan).some((element) => {
            return event.target === element;
        }) &&
        event.target !== menuButtonOpen[0]
    ) {
        if (menu[0].style.left === "0rem") {
            if (
                !menu[0].contains(event.target) &&
                !menuButtonClose[0].contains(event.target)
            ) {
                menu[0].style.left = "-25rem";
            }
        }
    }
});
