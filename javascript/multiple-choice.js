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
                    <span class="presentation__icon--close1"></span>
               <span class="presentation__icon--close2"></span>
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

function formatTimeResults(seconds) {
   // Calculate minutes and remaining seconds
   var minutes = Math.floor(seconds / 60);
   var remainingSeconds = seconds % 60;

   // Format minutes and seconds with leading zeros if necessary
   var formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
   var formattedSeconds =
      remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;

   // Return formatted time
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

            showResults(
               timeElapsed,
               game,
               document.getElementsByClassName("multiple-choice")[0]
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

function showResults(timeElapsed, game, element) {
   insertAnswerResults(element, game.correctAnswers, timeElapsed);
}

function insertAnswerResults(element, correctAnswers, time) {
   time = formatTimeResults(time);
   const textHtml = `
    <div class="answer-results">
    <button class="answer-results__close" title="Cerrar" type="button">
      <span class="answer-results__icon--close1"></span>
      <span class="answer-results__icon--close2"></span>
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
    <span class="answer-results__span">${time}</span>
    </p>
    <a href="./game-modes.html" class="answer-results__button--change-mode" title="Cambiar de modo" target="_self"><span>CAMBIAR DE MODO</span></a>
    <button class="answer-results__button--start-again" title="Jugar de nuevo" type="button"><span>JUGAR DE NUEVO</span></button>

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
      }, 300);

      setTimeout(function () {
         responseDiv.style.opacity = 0;
      }, 3400);

      setTimeout(function () {
         responseDiv.remove();
      }, 4000);
   }

   let countryName = game.countries[0].name.toLowerCase().replace(/\s/g, "");

   // Correct answer
   if (game.lastResponseStatus) {
      showTypeResponse("correct", element);
      return;
   }

   // Incorrect answer
   if (!game.lastResponseStatus) {
      // Incomplete options
      if (game.answerUser.length === 0) {
         showTypeResponse("incomplete option", element);
         return;
      }

      if (game.answerUser !== countryName) {
         showTypeResponse("incorrect", element);
         return;
      }
   }
}

function insertTextContinent(continent) {
   let result = {
      africa: "Continente: ÁFRICA",
      americas: "Continente: AMÉRICA",
      asia: "Continente: ASIA",
      europe: "Continente: EUROPA",
      oceania: "Continente: OCEANÍA",
      ["all continents"]: "Continente: TODOS",
   };

   return result[continent];
}

function showOptions(game) {
   const optionButtons = document.getElementsByClassName(
      "multiple-choice__option"
   );

   // Answer options buttons event
   let positionCorrcAnsw = Math.floor(Math.random() * optionButtons.length);

   let nameOptions = [game.countries[0].name];
   for (let i = 0; i < optionButtons.length; i++) {
      let text, name;
      if (i === positionCorrcAnsw) {
         name = game.countries[0].name;
         text = `${game.countries[0].name}`;
         optionButtons[i].textContent = text;
         optionButtons[i].value = name;
         continue;
      }

      for (let i = 0; i < game.countries.length; i++) {
         name =
            game.countries[Math.floor(Math.random() * game.countries.length)]
               .name;
         if (!nameOptions.some((optionName) => optionName === name)) {
            nameOptions.push(name);
            break;
         }
      }

      text = `${name}`;

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
   const [remainingCountries] = document.getElementsByClassName(
      "game__remaining-countries"
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
   correctAnswerSpan.textContent = "0";
   remainingCountries.textContent = "10";

   let stateGame = {
      time: timeStorage,
      continent: gameContinent,
      countries: randomCountries,
      answerUser: "",
      correctAnswers: 0,
      lastResponseStatus: false,
      countriesShown: 0,
   };

   game = new MultipleChoice(stateGame);
   console.log(game);

   showOptions(game);

   activeBtOptions("activate");
}

function sendAnswer() {
   const [correctAnswerSpan] = document.getElementsByClassName(
      "game__correct-answers"
   );
   const [remainingCountries] = document.getElementsByClassName(
      "game__remaining-countries"
   );
   let answerUser = game.answerUser.toLowerCase().replace(/\s/g, "");
   let countryName = game.countries[0].name.toLowerCase().replace(/\s/g, "");
   const [sendBt] = document.getElementsByClassName("multiple-choice__send");

   // Pausar entrada de respuestas
   sendBt.removeEventListener("click", sendAnswer);

   if (game.answerUser.length === 0) {
      typeResponse(game, document.getElementsByClassName("multiple-choice")[0]);
      return;
   }

   game = game.verifyAnswer(answerUser, countryName);

   addIconAnimation(game.lastResponseStatus, "../images/icons");

   typeResponse(game, document.getElementsByClassName("multiple-choice")[0]);

   activeBtOptions("deactivate");
   showCorrectAnswer("activate", countryName);

   setTimeout(() => {
      activeBtOptions("activate");
      showCorrectAnswer("deactivate");
   }, 3500);

   game = game.resetAnswerUser();

   if (game.lastResponseStatus) {
      correctAnswerSpan.textContent = `${game.correctAnswers}`;
   }

   game = game.addCountryShown();

   // Mostrar resultados
   if (game.countriesShown === 10) {
      setTimeout(() => {
         showResults(
            timeElapsed,
            game,
            document.getElementsByClassName("multiple-choice")[0]
         );
      }, 4000);
      return;
   }

   setTimeout(() => {
      showNewFlag(game);
      showOptions(game);
      remainingCountries.textContent = `${remainingCountries.textContent - 1}`;
      sendBt.addEventListener("click", sendAnswer);
   }, 3400);
}

document.addEventListener("DOMContentLoaded", async function () {
   const [sendBt] = document.getElementsByClassName("multiple-choice__send");
   const [startAgain] = document.getElementsByClassName("game__start-again");

   await startupEvents();

   // Animacion de tilde correcto-incorrecto
   sendBt.addEventListener("click", sendAnswer);
   startAgain.addEventListener("click", createNewGame);
});

// Escuchar "enter"
document.addEventListener("keydown", (event) => {
   if (event.key === "Enter") {
      sendAnswer();
   }
});

// Menu events
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
      url += "/icons-correct.svg";
      iconImg.src = url;
   } else {
      url += "/icons-incorrect.svg";
      iconImg.src = url;
   }

   blurryBackground.classList.add("overlappingBackground");
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

// Activar botones de opciones
function activeBtOptions(state) {
   const optionButtons = document.getElementsByClassName(
      "multiple-choice__option"
   );

   if (state === "activate") {
      for (let option of optionButtons) {
         option.addEventListener("click", selectOption);
         option.style.cursor = "pointer";
      }
   }

   if (state === "deactivate") {
      for (let option of optionButtons) {
         option.removeEventListener("click", selectOption);
         option.style.cursor = "initial";
      }
   }
   return;
}

function selectOption(event) {
   const optionBt = document.getElementsByClassName("multiple-choice__option");
   let optionSelect = event.target;

   game = game.modifyAnswer(optionSelect.value, game.countries[0].name);

   optionSelect.style.backgroundColor = "#b3dbff";
   optionSelect.style.border = "0.25rem solid whitesmoke";

   for (let element of optionBt) {
      if (element === optionSelect) {
         continue;
      }

      element.style.backgroundColor = "";
      element.style.border = "";
   }
}

function showCorrectAnswer(state, countryName) {
   const optionButtons = document.getElementsByClassName(
      "multiple-choice__option"
   );

   if (state === "activate") {
      for (let option of optionButtons) {
         let optionValue = option.value.toLowerCase().replace(/\s/g, "");

         option.classList.remove("multiple-choice__option--active");

         if (game.lastResponseStatus) {
            if (optionValue === countryName) {
               option.style.backgroundColor = "#dff0d8";
            }
         }

         if (!game.lastResponseStatus) {
            if (optionValue === countryName) {
               option.style.backgroundColor = "#dff0d8";
            }
            if (optionValue !== countryName) {
               option.style.backgroundColor = "#f2dede";
            }
         }
      }
   }

   if (state === "deactivate") {
      for (let option of optionButtons) {
         option.style.backgroundColor = "";
      }
   }
}

async function startupEvents() {
   const presentationHtml = `        
            <section class="presentation__section">
            <button class="presentation__header-link" title="Cerrar" type="button"
                    >
                </button>
            <header class="presentation__header">
                <h2 class="presentation__header-title">TU PAÍS</h2>   
            </header>

            <div class="presentation__div">
                <h3 class="presentation__subtitle">¿Cómo jugar?</h3>

                <p class="presentation__paragraph">
                    <strong>TU PAÍS</strong> es un juego de adivinanzas
                    geográficas en el que tenés que acertar el nombre de países
                    de los diferentes continentes. Si llegas a las 10 respuestas
                    correctas ¡Ganás!
                </p>

                <p
                    class="presentation__label-continents"
                    >Elige el continente de los paises</p
                >

                <select name="countries" title="countries" class="continents-dropdown">
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

                <p class="presentation__label-time">
                    Elige el tiempo
                </p>
                <div class="presentation__div-time">
                    <button class="presentation__button-time">LIBRE</button>
                    <button class="presentation__button-time">0:30</button>
                    <button class="presentation__button-time">1:00</button>
                </div>

                <button class="presentation__button-start" title="Empezar" type="button"
                    ><span>EMPEZAR</span></button
                >
            </div>
        </section>
        <div class="blurry-background"></div>
`;

   const settingsHtml = `       
            <section class="presentation__section">
            <button class="presentation__header-link" title="Cerrar" type="button"
                    >
                </button>

            <div class="presentation__div">
                <h3 class="presentation__subtitle">Configuración</h3>

                <p
                    class="presentation__label-continents"
                    >Elige el continente de los paises</p
                >

                <select name="countries" class="continents-dropdown" title="countries">
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

                <p class="presentation__label-time">
                    Elige el tiempo
                </p>
                <div class="presentation__div-time">
                    <button class="presentation__button-time">LIBRE</button>
                    <button class="presentation__button-time">0:30</button>
                    <button class="presentation__button-time">1:00</button>
                </div>

                <button class="presentation__button-start" title="Empezar" type="button"
                    ><span>EMPEZAR</span></button
                >
            </div>
        </section>
        <div class="blurry-background"></div>
`;

   const [btSettings] = document.getElementsByClassName("header__settings");
   let [body] = document.getElementsByClassName("multiple-choice");

   async function insertPresentation(type) {
      return new Promise((resolve) => {
         if (type === "presentation") {
            body.insertAdjacentHTML("beforeend", presentationHtml);
         }

         if (type === "settings") {
            body.insertAdjacentHTML("beforeend", settingsHtml);
         }

         let [presentation] = document.getElementsByClassName(
            "presentation__section"
         );
         let [bgBlurry] = document.getElementsByClassName("blurry-background");

         const [continentsDropdown] = document.getElementsByClassName(
            "continents-dropdown"
         );
         const buttonsTime = document.getElementsByClassName(
            "presentation__button-time"
         );
         const [startButton] = document.getElementsByClassName(
            "presentation__button-start"
         );
         const [closeIcon] = document.getElementsByClassName(
            "presentation__header-link"
         );

         if (type === "presentation") {
            presentation.classList.add("presentation");
         }

         if (type === "settings") {
            presentation.classList.add("settings");
         }

         // Millisenconds
         let continent = "all continents";
         let time = -1; //free time
         let timesOptions = [-1, 30000, 60000];

         // Events
         continentsDropdown.addEventListener("change", function (event) {
            continent = event.target.value;
            event.target.classList.add("continents-dropdown--focus");
         });

         for (let i = 0; i < buttonsTime.length; i++) {
            buttonsTime[i].addEventListener("click", function (event) {
               time = timesOptions[i];

               for (let button of buttonsTime) {
                  if (event.target === button) {
                     buttonsTime[i].classList.add(
                        "presentation__button-time--focus"
                     );
                     continue;
                  }
                  button.classList.remove("presentation__button-time--focus");
               }
            });
         }

         startButton.addEventListener("click", function () {
            sessionStorage.setItem("continent", continent);
            sessionStorage.setItem("time", time);
            presentation.style.top = "-20rem";
            bgBlurry.style.opacity = "0";
            bgBlurry.remove();
            presentation.remove();
            document.removeEventListener("click", listenOutsidePresent);
            createNewGame();
            resolve();
         });

         function listenOutsidePresent(event) {
            if (
               !presentation.contains(event.target) &&
               event.target !== btSettings
            ) {
               if (presentation.classList.contains("settings")) {
                  presentation.style.top = "-20rem";
                  bgBlurry.style.opacity = "0";
                  bgBlurry.remove();
                  presentation.remove();
                  document.removeEventListener("click", listenOutsidePresent);
                  resolve();
               }

               if (presentation.classList.contains("presentation")) {
                  sessionStorage.setItem("continent", continent);
                  sessionStorage.setItem("time", time);
                  presentation.style.top = "-20rem";
                  bgBlurry.style.opacity = "0";
                  bgBlurry.remove();
                  presentation.remove();
                  document.removeEventListener("click", listenOutsidePresent);
                  createNewGame();
                  resolve();
               }
            }
         }

         if (type === "presentation") {
            closeIcon.addEventListener("click", function () {
               sessionStorage.setItem("continent", continent);
               sessionStorage.setItem("time", time);
               presentation.style.top = "-20rem";
               bgBlurry.style.opacity = "0";
               bgBlurry.remove();
               presentation.remove();
               document.removeEventListener("click", listenOutsidePresent);
               createNewGame();
               resolve();
            });
         }

         if (type === "settings") {
            closeIcon.addEventListener("click", function () {
               presentation.style.top = "-20rem";
               bgBlurry.style.opacity = "0";
               bgBlurry.remove();
               presentation.remove();
               document.removeEventListener("click", listenOutsidePresent);
               resolve();
            });
         }

         document.addEventListener("click", listenOutsidePresent);
      });
   }

   // Presentation
   if (
      !sessionStorage.getItem("time") &&
      !sessionStorage.getItem("continent")
   ) {
      await insertPresentation("presentation");
   } else {
      createNewGame();
   }

   // Events

   btSettings.addEventListener("click", async () => {
      await insertPresentation("settings");
   });
}
