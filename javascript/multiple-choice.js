// Imports
import { getRandomCountries } from "./imports/countryDataManager.mjs";
import { MultipleChoice } from "./imports/classNewGame.mjs";

// Bindigs
let freeTimeInterval,
   timeInterval,
   game,
   timeElapsed = 0;
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

function showResults(timeElapsed, game, element) {
   insertAnswerResults(element, game.correctAnswers, timeElapsed);
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

      if (type === "incomplete option") {
         responseDiv.textContent = "Elige una opción";
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
      // Incomplete options
      if (game.answerUser.length === 0) {
         showTypeResponse("incomplete option", element);
         return;
      }

      // Incorrect answer
      if (game.answerUser !== countryName) {
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

function showOptions(game) {
   const optionButtons = document.getElementsByClassName(
      "multiple-choice__option"
   );

   for (let option of optionButtons) {
      option.style.backgroundColor = "rgb(233, 233, 233)";
      option.style.border = "none";
   }

   // Answer options buttons event
   let positionCorrcAnsw = Math.floor(Math.random() * optionButtons.length);

   let nameOptions = [game.countries[0].name];
   for (let i = 0; i < optionButtons.length; i++) {
      let listOptions = ["A)", "B)", "C)", "D)"];
      let text, name;
      if (i === positionCorrcAnsw) {
         name = game.countries[0].name;
         text = `${listOptions[i]} ${game.countries[0].name}`;
         optionButtons[i].textContent = text;
         optionButtons[i].value = name;
         continue;
      }

      for (let i = 0; i < game.countries.length; i++) {
         name =
            game.countries[Math.floor(Math.random() * game.countries.length)]
               .name;
         if (!nameOptions.some((optionName) => optionName === name)) {
            listOptions.push(name);
            break;
         }
      }

      text = `${listOptions[i]} ${name}`;

      optionButtons[i].textContent = text;
      optionButtons[i].value = name;
   }
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
   const [continentElement] = document.getElementsByClassName(
      "country__description"
   );
   const [correctAnswerSpan] = document.getElementsByClassName(
      "game__correct-answers"
   );

   let gameContinent = sessionStorage.getItem("continent")
      ? sessionStorage.getItem("continent")
      : "all continents";
   let randomCountries = await getRandomCountries(
      gameContinent,
      -1,
      "../images/flags-svg"
   );

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
      countriesShown: 0
   };

   game = new MultipleChoice(stateGame);
   console.log(game);

   showOptions(game);
   const optionButtons = document.getElementsByClassName(
      "multiple-choice__option"
   );
   for (let option of optionButtons) {
      option.addEventListener("click", () => {
         game = game.modifyAnswer(option.value, game.countries[0].name);
         option.style.backgroundColor = "rgb(204, 204, 204)";
         option.style.border = "0.2rem solid whitesmoke";

         for (let element of optionButtons) {
            if (element === option) continue;
            element.style.backgroundColor = "rgb(233, 233, 233)";
         }
      });
   }
}

document.addEventListener("DOMContentLoaded", async function () {
   // Presentation
   if (
      sessionStorage.getItem("time") === null &&
      sessionStorage.getItem("continent") === null
   ) {
      let body = document.getElementsByClassName("multiple-choice")[0];
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
      const [correctAnswerSpan] = document.getElementsByClassName(
         "game__correct-answers"
      );

      if (game.answerUser.length === 0) {
         typeResponse(
            game,
            document.getElementsByClassName("multiple-choice")[0]
         );
         return;
      }

      typeResponse(game, document.getElementsByClassName("multiple-choice")[0]);

      game = game.verifyAnswer(game.answerUser, game.countries[0].name);

      if (game.lastResponseStatus) {
         correctAnswerSpan.textContent = `${game.correctAnswers}/10`;
      }

      game = game.addCountryShown();

      // Mostrar resultados
      if (game.countriesShown === 10) {
         showResults(
            timeElapsed,
            game,
            document.getElementsByClassName("multiple-choice")[0]
         );
         return;
      }

      showNewFlag(game);
      showOptions(game);
   });
});
