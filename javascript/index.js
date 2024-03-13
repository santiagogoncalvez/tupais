// Imports
import { getRandomCountries } from "./imports/countryDataManager.mjs";
import { NewGame } from "./imports/classNewGame.mjs";

// Elements
const startAgain = document.getElementsByClassName("game__start-again");
const menuButtonOpen = document.getElementsByClassName("navbar__button--open");
const menu = document.getElementsByClassName("navbar");
const menuButtonClose = document.getElementsByClassName(
   "navbar__button--close"
);
const buttonsKeyboard = document.getElementsByClassName("keyboard__button");

// Bindings
let game;
let timeElapsed = 0;
let freeTimeInterval;
let timeInterval;
const presentationHtml = `        
            <section class="presentation__section">
            <header class="presentation__header">
                <h2 class="presentation__header-title">TU PAÍS</h2>

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
                    <strong>TU PAÍS</strong> es un juego de adivinanzas
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
function showResults(timeElapsed, game) {
   let body = document.getElementsByClassName("homepage")[0];
   insertAnswerResults(body, game.correctAnswers, timeElapsed);
   deleteAllLetters();
}

function deleteAllLetters() {
   const answerLetterElements = document.getElementsByClassName(
      "game__answer-letter"
   );
   for (let element of answerLetterElements) {
      element.textContent = "";
   }
}

function insertAnswerResults(element, correctAnswers, time) {
   const textHtml = `
    <div class="answer-results">
    <button class="answer-results__close">
    </button>
    <p class="answer-results__paragraph">
    <span class="answer-results__span">RESULTADOS</span>
    <span class="answer-results__span"></span>
    <span class="answer-results__span">
      Respuestas correctas
    </span>
    <span class="answer-results__span">
      ${correctAnswers}/10
    </span>
    <span class="answer-results__span">Tiempo</span>
    <span class="answer-results__span">00:${time}</span>
    </p>
    <button class="answer-results__button--start-again"><span>JUGAR DE NUEVO</span></button>

    </div>
    <div class="blurry-background"></div>`;
   /*<button class="answer-results__button--change-mode">
      <span>CAMBIAR DE MODO</span>
   </button> */
   
   element.insertAdjacentHTML("beforeend", textHtml);

   // Quitar eventos del teclado
   for (let element of buttonsKeyboard) {
      element.removeEventListener("click", listenKeyboard);
   }
   document.removeEventListener("keydown", listenKeyboard);

   const cardResults = document.getElementsByClassName("answer-results")[0];
   const bgBlurry = document.getElementsByClassName("blurry-background")[0];
   const startButton = document.getElementsByClassName(
      "answer-results__button--start-again"
   )[0];
   const closeButton = document.getElementsByClassName(
      "answer-results__close"
   )[0];

   startButton.addEventListener("click", function () {
      cardResults.style.top = "-20rem";
      bgBlurry.style.opacity = "0";
      bgBlurry.remove();
      cardResults.remove();
      createNewGame();
   });

   closeButton.addEventListener("click", function () {
      cardResults.style.top = "-20rem";
      bgBlurry.style.opacity = "0";
      bgBlurry.remove();
      cardResults.remove();
      createNewGame();
   });
}

function insertLetter(game) {
   const answerLetterElements = document.getElementsByClassName(
      "game__answer-letter"
   );
   let letterElement;
   if (game.answerUser.length === 1) {
      letterElement = answerLetterElements[0];
   } else {
      letterElement = answerLetterElements[game.answerUser.length - 1];
   }
   letterElement.textContent = game.answerUser[game.answerUser.length - 1];
}
function deleteLetter(game) {
   const answerLetterElements = document.getElementsByClassName(
      "game__answer-letter"
   );
   let letterElement = answerLetterElements[game.answerUser.length];
   letterElement.textContent = "";
}

function typeKey(key) {
   const letter = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
      "ç",
   ];
   const enterString = "enter";
   const backspaceString = "backspace";

   if (letter.includes(key)) return "letter";
   if (key === enterString) return "enter";
   if (key === backspaceString) return "backspace";
   return null;
}

function innerLetterElements(string, element) {
   let textHtml = "";
   for (let i = 0; i < string.length; i++) {
      if (string[i] === " ") {
         textHtml += '<div class="game__answer-letter--space"></div>';
         continue;
      }
      textHtml += '<div class="game__answer-letter"></div>';
   }
   element.innerHTML = textHtml;
}

function showNewFlag(game) {
   const flagImg = document.getElementsByClassName("game__flag");
   flagImg[0].src = game.countries[game.correctAnswers].flagUrl;
}

function typeResponse(game) {
   function showTypeResponse(type, element) {
      let responseDiv = document.createElement("div");
      responseDiv.className = "response";
      responseDiv.style.opacity = 0;

      if (type === "correct") {
         responseDiv.textContent = "Respuesta correcta";
      }

      if (type === "incorrect") {
         responseDiv.textContent = "Respuesta incorrecta";
         responseDiv.classList.add("incorrect");
      }

      if (type === "incomplete") {
         responseDiv.textContent = "Palabra incompleta";
         responseDiv.classList.add("incomplete");
      }
      element.appendChild(responseDiv);

      responseDiv.style.display = "block";

      setTimeout(function () {
         responseDiv.style.opacity = 1;
      }, 10);

      setTimeout(function () {
         responseDiv.style.opacity = 0;
      }, 2000);

      setTimeout(function () {
         responseDiv.remove();
      }, 3000);
   }

   const correctAnswerSpan = document.getElementsByClassName(
      "game__correct-answers"
   )[0];
   let countryName = game.countries[game.correctAnswers].name
      .toLowerCase()
      .replace(/\s/g, "");

   if (!game.lastResponseStatus) {
      // Incomplete answer
      if (game.answerUser.length !== countryName.length) {
         showTypeResponse(
            "incomplete",
            document.getElementsByClassName("homepage")[0]
         );
      }

      // Incorrect answer
      if (game.answerUser.length === countryName.length) {
         showTypeResponse(
            "incorrect",
            document.getElementsByClassName("homepage")[0]
         );
      }
   }

   // Correct answer
   if (game.lastResponseStatus) {
      showTypeResponse(
         "correct",
         document.getElementsByClassName("homepage")[0]
      );
      correctAnswerSpan.textContent = `${game.correctAnswers}/10`;
   }
}

function insertTextContinent(continent) {
   let result = {
      africa: "ÁFRICA",
      america: "AMÉRICA",
      asia: "ASIA",
      europa: "EUROPA",
      oceania: "OCEANÍA",
      ["all continents"]: "TODOS LOS CONTINENTES",
   };

   return result[continent];
}

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

   const flagImg = document.getElementsByClassName("game__flag")[0];
   const answerContainer = document.getElementsByClassName("game__answer")[0];
   const continentElement = document.getElementsByClassName(
      "game__countrie-description"
   )[0];
   const correctAnswerSpan = document.getElementsByClassName(
      "game__correct-answers"
   )[0];

   let gameContinent = sessionStorage.getItem("continent")
      ? sessionStorage.getItem("continent")
      : "all continents";
   let randomCountries = await getRandomCountries(gameContinent, 10);

   innerLetterElements(randomCountries[0].name, answerContainer);
   flagImg.src = randomCountries[0].flagUrl;
   // Continent text
   continentElement.textContent = insertTextContinent(gameContinent);
   // Correc answers reset
   correctAnswerSpan.textContent = "0/10";

   let stateGame = {
      time: timeStorage,
      continent: gameContinent,
      countries: randomCountries,
      answerUser: "",
      correctAnswers: 0,
      lastResponseStatus: false,
      elementsHtml: {},
   };

   game = new NewGame(stateGame);
   console.log(game);

   // Keyboards buttons event
   for (let element of buttonsKeyboard) {
      element.addEventListener("click", listenKeyboard);
   }

   document.addEventListener("keydown", listenKeyboard);
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

            showResults(timeElapsed, game);
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

function listenKeyboard(event) {
   let pressedKey;
   if (event.key) {
      pressedKey = event.key.toLowerCase();
   }
   if (event.target.value) {
      pressedKey = event.target.value.toLowerCase();
   }

   if (!typeKey(pressedKey)) return;

   if (pressedKey === "enter") {
      game = game.verifyAnswer(
         game.answerUser,
         game.countries[game.correctAnswers].name
      );

      // Mostrar resultados
      if (game.correctAnswers === 10) {
         showResults(timeElapsed, game);
         return;
      }

      typeResponse(game);

      const answerContainer =
         document.getElementsByClassName("game__answer")[0];
      if (game.lastResponseStatus) {
         showNewFlag(game);
         innerLetterElements(
            game.countries[game.correctAnswers].name,
            answerContainer
         );
      }
      return;
   }

   game = game.modifyAnswer(pressedKey, game.answerUser);

   if (pressedKey === "backspace") {
      deleteLetter(game);
   }

   // other letter
   if (pressedKey !== "backspace") {
      insertLetter(game);
   }
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
      )[0];
      let bgBlurry = document.getElementsByClassName("blurry-background")[0];

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
               presentation.style.top = "-20rem";
               bgBlurry.style.opacity = "0";
               bgBlurry.remove();
               presentation.remove();
               resolve();
            });

            closeIcon.addEventListener("click", function () {
               sessionStorage.setItem("continent", continent);
               sessionStorage.setItem("time", time);
               presentation.style.top = "-20rem";
               bgBlurry.style.opacity = "0";
               bgBlurry.remove();
               presentation.remove();
               resolve();
            });
         });
      }

      await insertPresentation();
   }

   createNewGame();
});

startAgain[0].addEventListener("click", async function () {
   createNewGame();
});

menuButtonOpen[0].addEventListener("click", function () {
   menu[0].style.left = "0rem";
});

menuButtonClose[0].addEventListener("click", function () {
   menu[0].style.left = "-25rem";
});

document.addEventListener("click", function (event) {
   const menuButtonOpenSpan = document.getElementsByClassName("navbar__icon");
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
