// Imports
import { getRandomCountries } from "./imports/countryDataManager.mjs";
import { NewGame } from "./imports/classNewGame.mjs";

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
                <button class="presentation__header-link" title="Cerrar"
                    >
                </button>
            </header>

            <div class="presentation__div">
                <h3 class="presentation__subtitle">¿Cómo jugar?</h3>

                <p class="presentation__paragraph">
                    <strong>TU PAÍS</strong> es un juego de adivinanzas
                    geográficas en el que tenés que acertar el nombre de países
                    de los diferentes continentes. Si llegas a las 10 respuestas
                    correctas ¡Ganás!
                </p>

                <div
                    for="continents-dropdown"
                    class="presentation__label-continents"
                    >Elige el continente de los paises</div
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
                        value="americas"
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

                <button class="presentation__button-start" title="Empezar"
                    ><span>¡EMPEZAR!</span></button
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
    <button class="answer-results__close" title="Cerrar">
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
    <button class="answer-results__button--start-again" title="Jugar d nuevo"><span>JUGAR DE NUEVO</span></button>

    </div>
    <div class="blurry-background"></div>`;
   /*<button class="answer-results__button--change-mode" title="Cambiar de modo">
       <span>CAMBIAR DE MODO</span>
    </button> */

   element.insertAdjacentHTML("beforeend", textHtml);

   // Quitar eventos del teclado
   const buttonsKeyboard = document.getElementsByClassName("keyboard__button");
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
   }
   if (game.answerUser.length !== 1) {
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
   const [flagImg] = document.getElementsByClassName("country__flag");
   flagImg.src = game.countries[0].flagUrl;
   let alt = `Bandera de ${game.countries[0].name}`;
   flagImg.alt = alt;
}

function typeResponse(game, element) {
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

   let countryName = game.countries[0].name.toLowerCase().replace(/\s/g, "");

   if (!game.lastResponseStatus) {
      // Incomplete answer
      if (game.answerUser.length !== countryName.length) {
         showTypeResponse("incomplete", element);
      }

      // Incorrect answer
      if (game.answerUser.length === countryName.length) {
         showTypeResponse("incorrect", element);
      }
   }

   // Correct answer
   if (game.lastResponseStatus) {
      showTypeResponse("correct", element);
   }
}

function insertTextContinent(continent) {
   let result = {
      africa: "Continente: ÁFRICA",
      americas: "Continente: AMÉRICA",
      asia: "Continente: ASIA",
      europa: "Continente: EUROPA",
      oceania: "Continente: OCEANÍA",
      ["all continents"]: "Continente: TODOS",
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

   const [flagImg] = document.getElementsByClassName("country__flag");
   const [answerContainer] = document.getElementsByClassName("game__answer");
   const [continentElement] = document.getElementsByClassName(
      "country__description"
   );
   const [correctAnswerSpan] = document.getElementsByClassName(
      "game__correct-answers"
   );
   const buttonsKeyboard = document.getElementsByClassName("keyboard__button");

   let gameContinent = sessionStorage.getItem("continent")
      ? sessionStorage.getItem("continent")
      : "all continents";
   let randomCountries = await getRandomCountries(
      gameContinent,
      -1,
      "./images/flags-svg"
   );

   innerLetterElements(randomCountries[0].name, answerContainer);
   flagImg.src = randomCountries[0].flagUrl;
   let alt = `Bandera de ${randomCountries[0].name}`;
   flagImg.alt = alt;

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
   };

   game = new NewGame(stateGame);
   console.log(game);

   // Keyboards buttons event
   for (let element of buttonsKeyboard) {
      element.addEventListener("click", listenKeyboard);
   }

   document.addEventListener("keydown", listenKeyboard);
}

// Timer

// Función para añadir ceros delante de un número si es necesario
function pad(number, length) {
   return ("0" + number).slice(-length);
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
      const [answerContainer] = document.getElementsByClassName("game__answer");
      const [correctAnswerSpan] = document.getElementsByClassName(
         "game__correct-answers"
      );

      // Incomplete answer
      if (
         game.answerUser.length !==
         game.countries[0].name.replace(/\s/g, "").length
      ) {
         typeResponse(game, document.getElementsByClassName("homepage")[0]);
         return;
      }

      game = game.verifyAnswer(game.answerUser, game.countries[0].name);

      addIconAnimation(game.lastResponseStatus, "./images");

      typeResponse(game, document.getElementsByClassName("homepage")[0]);

      // Incorrect answer
      if (!game.lastResponseStatus) {
         return;
      }

      // Correct answer
      if (game.lastResponseStatus) {
         setTimeout(() => {
            correctAnswerSpan.textContent = `${game.correctAnswers}/10`;
            showNewFlag(game);
            innerLetterElements(game.countries[0].name, answerContainer);
            game = game.resetAnswerUser();
         }, 3500);

         // Show results
         if (game.correctAnswers === 10) {
            showResults(timeElapsed, game);
            return;
         }

         return;
      }

      return;
   }

   game = game.modifyAnswer(pressedKey, game.answerUser);

   if (pressedKey === "backspace") {
      deleteLetter(game);
      return;
   }

   // other letter
   if (pressedKey !== "backspace") {
      insertLetter(game);
      return;
   }
}

// Eventos
// Event after loading content
document.addEventListener("DOMContentLoaded", async function () {
   const [startAgain] = document.getElementsByClassName("game__start-again");

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
         return new Promise((resolve) => {
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

   const [nextBt] = document.getElementsByClassName("country__btNext");
   nextBt.addEventListener("click", () => {
      const [answerContainer] = document.getElementsByClassName("game__answer");
      game = game.resetAnswerUser();
      game = game.nextCountry();
      showNewFlag(game);
      innerLetterElements(game.countries[0].name, answerContainer);
   });

   startAgain.addEventListener("click", async function () {
      createNewGame();
   });
});

function addMenuEvents() {
   const menuButtonOpen = document.getElementsByClassName(
      "navbar__button--open"
   );
   const menu = document.getElementsByClassName("navbar");
   const menuButtonClose = document.getElementsByClassName(
      "navbar__button--close"
   );

   menuButtonOpen[0].addEventListener("click", function () {
      menu[0].style.left = "0rem";
   });

   menuButtonClose[0].addEventListener("click", function () {
      menu[0].style.left = "-25rem";
   });

   document.addEventListener("click", function (event) {
      const menuButtonOpenSpan =
         document.getElementsByClassName("navbar__icon");
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
}
addMenuEvents();

// Animación de icono de respuesta correcta o incorrecta
function addIconAnimation(typeAnswer, url) {
   const [countryElement] =
      document.getElementsByClassName("country__container");
   let blurryBackground = document.createElement("div");
   let iconImg = document.createElement("img");

   if (typeAnswer) {
      iconImg.src = url + "/icons-correct.svg";
   } else {
      iconImg.src = url + "/icons-incorrect.svg";
   }

   blurryBackground.classList.add("multiple-choice__iconBackground");
   iconImg.classList.add("multiple-choice__iconAnswer--defoult");

   countryElement.appendChild(blurryBackground);
   countryElement.appendChild(iconImg);

   setTimeout(() => {
      iconImg.classList.add("multiple-choice__iconAnswer--active");
   }, 300);

   // Borrar elementos
   setTimeout(() => {
      blurryBackground.remove();
      iconImg.remove();
   }, 3500);
}
