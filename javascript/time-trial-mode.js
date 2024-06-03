// Imports
import { getRandomCountries } from "./imports/countryDataManager.mjs";
import { NewGame } from "./imports/classNewGame.mjs";

// Bindings
let game;
let timeElapsed = 0;
let freeTimeInterval = null;
let timeInterval;

// Functions
function showResults(timeElapsed, game) {
   let body = document.getElementsByClassName("time-trial-mode")[0];
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
   time = formatTimeResults(time);
   const textHtml = `
    <div class="answer-results">
    <button class="answer-results__close" title="Cerrar" type="button">
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
    <a href="./game-modes.html" class="answer-results__button--change-mode" title="Cambiar de modo" target="_self"><span>CAMBIAR DE MODO</span></a>
    <button class="answer-results__button--start-again" title="Jugar de nuevo" type="button"><span>JUGAR DE NUEVO</span></button>

    </div>
    <div class="blurry-background"></div>`;

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

   document.addEventListener("keydown", escAnswerResults);
   function escAnswerResults(event) {
      const [answerResults] = document.getElementsByClassName("answer-results");

      if (event.key === "Escape") {
         if (answerResults) {
            cardResults.style.top = "-20rem";
            bgBlurry.style.opacity = "0";
            bgBlurry.remove();
            cardResults.remove();
            createNewGame();
            document.removeEventListener("keydown", escAnswerResults);
         }
      }
   }
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
      }, 0);

      setTimeout(function () {
         responseDiv.style.opacity = 0;
      }, 2000);

      setTimeout(function () {
         responseDiv.remove();
      }, 2200);
   }

   let nameCountry = game.countries[0].name.replace(/\s/g, "");

   // Correct answer
   if (game.lastResponseStatus) {
      showTypeResponse("correct", element);
      return;
   }

   // Incorrect answer
   if (!game.lastResponseStatus) {
      // Incomplete options
      if (game.answerUser.length !== nameCountry.length) {
         showTypeResponse("incomplete", element);
      } else {
         showTypeResponse("incorrect", element);
      }

      return;
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

async function createNewGame() {
   // Clean timer
   if (freeTimeInterval) {
      clearInterval(freeTimeInterval);
   }

   if (timeInterval) {
      clearInterval(timeInterval);
   }

   // Create timer
   const timerElement = document.getElementsByClassName("game__time");
   let timeStorage = localStorage.getItem("time")
      ? Number(localStorage.getItem("time"))
      : -1;
   if (timeStorage === -1) timeStorage = 30000;
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

   let gameContinent = localStorage.getItem("continent")
      ? localStorage.getItem("continent")
      : "all continents";
   let randomCountries = await getRandomCountries(
      gameContinent,
      -1,
      "../images/flags-svg"
   );

   innerLetterElements(randomCountries[0].name, answerContainer);
   flagImg.src = randomCountries[0].flagUrl;
   let alt = `Bandera de ${randomCountries[0].name}`;
   flagImg.alt = alt;

   // Continent text
   continentElement.textContent = insertTextContinent(gameContinent);
   // Correc answers reset
   correctAnswerSpan.textContent = "0";

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
         if (game) {
            if (game.correctAnswers === 10) {
               clearInterval(freeTimeInterval);
            } else {
               timeElapsed++;
            }
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
      const [nextBt] = document.getElementsByClassName("country__btNext");
      const buttonsKeyboard =
         document.getElementsByClassName("keyboard__button");

      // Pausar eventos de entrada
      for (let element of buttonsKeyboard) {
         element.removeEventListener("click", listenKeyboard);
      }
      document.removeEventListener("keydown", listenKeyboard);
      nextBt.removeEventListener("click", activeNextBt);

      game = game.verifyAnswer(game.answerUser, game.countries[0].name);

      typeResponse(game, document.getElementsByClassName("time-trial-mode")[0]);

      // Incomplete answer
      if (!game.lastResponseStatus) {
         if (
            game.answerUser.length !==
            game.countries[0].name.replace(/\s/g, "").length
         ) {
            // Pausar eventos de entrada
            for (let element of buttonsKeyboard) {
               element.addEventListener("click", listenKeyboard);
            }
            document.addEventListener("keydown", listenKeyboard);
            nextBt.addEventListener("click", activeNextBt);
            return;
         }
      }

      addIconAnimation(game.lastResponseStatus, "../images/icons-images");

      // Correct answer
      if (game.lastResponseStatus) {
         correctAnswerSpan.textContent = `${game.correctAnswers}`;

         setTimeout(() => {
            showNewFlag(game);
            innerLetterElements(game.countries[0].name, answerContainer);
            game = game.resetAnswerUser();
         }, 3400);
      }

      setTimeout(() => {
         // Pausar eventos de entrada
         for (let element of buttonsKeyboard) {
            element.addEventListener("click", listenKeyboard);
         }
         document.addEventListener("keydown", listenKeyboard);
         nextBt.addEventListener("click", activeNextBt);
      }, 3500);

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
                    <button class="presentation__button-time">0:30</button>
                    <button class="presentation__button-time">1:00</button>
                    <button class="presentation__button-time">1:30</button>
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

      <div class="presentation__subtitle">Modo oscuro</div>
      <button class="dark-mode-bt">
         <img width="20" height="20" src="https://img.icons8.com/material-rounded/24/BFE1FF/sun--v1.png" alt="sun--v1" class="dark-mode-bt__sun"/>

         <div class="dark-mode-bt__circle"></div>
  
         <img width="20" height="20" src="https://img.icons8.com/ios-glyphs/30/0D336B/moon-symbol.png" alt="moon-symbol" class="dark-mode-bt__moon"/>
      </button>
      <div class="presentation__subtitle">Juego</div>
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

       <button class="presentation__button-start" title="Empezar" type="button"
           ><span>EMPEZAR</span></button
       >
   </div>
</section>
        <div class="blurry-background"></div>
`;

   const [btSettings] = document.getElementsByClassName("header__settings");
   let [body] = document.getElementsByClassName("time-trial-mode");

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
         let time = 30000; //free time
         let timesOptions = [30000, 60000, 90000];

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
            localStorage.setItem("continent", continent);
            localStorage.setItem("time", time);
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
                  localStorage.setItem("continent", continent);
                  localStorage.setItem("time", time);
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
               localStorage.setItem("continent", continent);
               localStorage.setItem("time", time);
               presentation.style.top = "-20rem";
               bgBlurry.style.opacity = "0";
               bgBlurry.remove();
               presentation.remove();
               document.removeEventListener("click", listenOutsidePresent);
               createNewGame();
               resolve();
            });

            document.addEventListener("keydown", actPresentation);
         }

         if (type === "settings") {
            changeBtDarkMode();
            closeIcon.addEventListener("click", function () {
               presentation.style.top = "-20rem";
               bgBlurry.style.opacity = "0";
               bgBlurry.remove();
               presentation.remove();
               document.removeEventListener("click", listenOutsidePresent);
               resolve();
            });

            document.addEventListener("keydown", actPresentation);
         }

         document.addEventListener("click", listenOutsidePresent);

         function actPresentation(event) {
            escPresentation(event, type);
         }

         function escPresentation(event, type) {
            if (type === "presentation") {
               if (event.key === "Escape") {
                  if (presentation) {
                     localStorage.setItem("continent", continent);
                     localStorage.setItem("time", time);
                     presentation.style.top = "-20rem";
                     bgBlurry.style.opacity = "0";
                     bgBlurry.remove();
                     presentation.remove();
                     document.removeEventListener(
                        "click",
                        listenOutsidePresent
                     );
                     createNewGame();
                     resolve();
                     document.removeEventListener("keydown", actPresentation);
                  }
               }
            }

            if (type === "settings") {
               if (event.key === "Escape") {
                  if (presentation) {
                     presentation.style.top = "-20rem";
                     bgBlurry.style.opacity = "0";
                     bgBlurry.remove();
                     presentation.remove();
                     document.removeEventListener(
                        "click",
                        listenOutsidePresent
                     );
                     resolve();
                     document.removeEventListener("keydown", actPresentation);
                  }
               }
            }
         }
      });
   }

   // Presentation
   if (!localStorage.getItem("time") && !localStorage.getItem("continent")) {
      await insertPresentation("presentation");
   } else {
      createNewGame();
   }

   // Events
   btSettings.addEventListener("click", async () => {
      await insertPresentation("settings");
   });
}

// Eventos
// Event after loading content
document.addEventListener("DOMContentLoaded", async function () {
   const [nextBt] = document.getElementsByClassName("country__btNext");
   const [startAgain] = document.getElementsByClassName("game__start-again");
   const [btInformation] = document.getElementsByClassName(
      "game__bt-information"
   );

   await startupEvents();

   nextBt.addEventListener("click", activeNextBt);
   startAgain.addEventListener("click", createNewGame);
   btInformation.addEventListener("click", () => {
      const [cardInformation] =
         document.getElementsByClassName("information-card");
      if (!cardInformation) {
         insertInformation();
      }
   });

   addMenuEvents();
   changeBtDarkMode();
});

function activeNextBt() {
   const [answerContainer] = document.getElementsByClassName("game__answer");
   game = game.resetAnswerUser();
   game = game.nextCountry();
   showNewFlag(game);
   innerLetterElements(game.countries[0].name, answerContainer);
}

function addMenuEvents() {
   const [menuButtonOpen] = document.getElementsByClassName(
      "navbar__button--open"
   );
   const [menu] = document.getElementsByClassName("navbar");
   const [menuButtonClose] = document.getElementsByClassName(
      "navbar__button--close"
   );

   menuButtonOpen.addEventListener("click", function () {
      menu.style.left = "0rem";
   });

   menuButtonClose.addEventListener("click", function () {
      menu.style.left = "-25rem";
   });

   document.addEventListener("click", function (event) {
      const menuButtonOpenSpan =
         document.getElementsByClassName("navbar__icon");
      if (
         !Array.from(menuButtonOpenSpan).some((element) => {
            return event.target === element;
         }) &&
         event.target !== menuButtonOpen
      ) {
         if (menu.style.left === "0rem") {
            if (
               !menu.contains(event.target) &&
               !menuButtonClose.contains(event.target)
            ) {
               menu.style.left = "-25rem";
            }
         }
      }
   });

   document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
         if (menu.style.left === "0rem") {
            menu.style.left = "-25rem";
         }
      }
   });
}

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

function insertInformation(event) {
   const cardHtml = `       
            <section class="information-card">
            <div class="presentation__div">
                <h3 class="information-card__subtitle">¿Cómo jugar?</h3>

                <p
                    class="information-card__paragraph"
                    >En este formato hay que adivinar la mayor cantidad de países en
                    el menor tiempo posible antes de que se acabe el contador.</p
                >
            </div>
        </section>
`;

   const [btInformation] = document.getElementsByClassName(
      "game__bt-information"
   );
   const [container] = document.getElementsByClassName("game__container");
   container.insertAdjacentHTML("beforeend", cardHtml);

   const [presentation] = document.getElementsByClassName("information-card");

   btInformation.style.backgroundColor = "rgb(225, 225, 225)";

   function listenOutsidePresent(event) {
      if (
         !presentation.contains(event.target) &&
         event.target !== btInformation
      ) {
         presentation.remove();
         btInformation.style.backgroundColor = "white";
         document.removeEventListener("keydown", actPresentation);
         document.removeEventListener("click", listenOutsidePresent);
      }
   }

   document.addEventListener("keydown", actPresentation);

   document.addEventListener("click", listenOutsidePresent);

   function actPresentation(event) {
      escPresentation(event);
   }

   function escPresentation(event) {
      if (event.key === "Escape") {
         if (presentation) {
            presentation.remove();
            btInformation.style.backgroundColor = "white";
            document.removeEventListener("keydown", actPresentation);
            document.removeEventListener("click", listenOutsidePresent);
         }
      }
   }
}

// DarkMode
function changeBtDarkMode() {
   function addClassDarkMode(type) {
      const [header] = document.getElementsByClassName("header");
      const [footer] = document.getElementsByClassName("footer");
      const [title] = document.getElementsByClassName("header__title");
      const [descriptionCountry] = document.getElementsByClassName(
         "country__description"
      );
      const [body] = document.getElementsByClassName("time-trial-mode");
      const [main] = document.getElementsByClassName("time-trial-mode__main");
      const [navbarButton] = document.getElementsByClassName(
         "navbar__button--open"
      );
      const [footerParagraph] =
         document.getElementsByClassName("footer__paragraph");
      const [btSettings] = document.getElementsByClassName("header__settings");
      const [startAgain] = document.getElementsByClassName("game__start-again");
      const [github] = document.getElementsByClassName("footer__icon-github");
      const navbarIcon = document.getElementsByClassName("navbar__icon");
      const buttonsKeyboard = document.getElementsByClassName(
         "multiple-choice__option"
      );
   
      const statistics = document.getElementsByClassName("game__statistics-item");
   
      if (type === "activate") {
         header.classList.add("dark-mode__header");
         footer.classList.add("dark-mode__footer");
         title.classList.add("dark-mode__header--title");
         descriptionCountry.classList.add("dark-mode__game-text");
         footerParagraph.classList.add("dark-mode__game-text");
         body.classList.add("dark-mode__page");
         main.classList.add("dark-mode__page");
         btSettings.classList.add("dark-mode__button-settings");
         navbarButton.classList.add("dark-mode__navbar-button-open");
         startAgain.classList.add("dark-mode__start-again");
         github.classList.add("dark-mode__github-bt");
   
         for (let element of statistics) {
            element.classList.add("dark-mode__game-text");
         }
         for (let element of navbarIcon) {
            element.classList.add("dark-mode__navbar-icon");
         }
         for (let element of buttonsKeyboard) {
            element.classList.add("dark-mode__keyboard-button");
         }
      }
   
      if (type === "deactivate") {
         header.classList.remove("dark-mode__header");
         footer.classList.remove("dark-mode__footer");
         title.classList.remove("dark-mode__header--title");
         descriptionCountry.classList.remove("dark-mode__game-text");
         footerParagraph.classList.remove("dark-mode__game-text");
         body.classList.remove("dark-mode__page");
         main.classList.remove("dark-mode__page");
         btSettings.classList.remove("dark-mode__button-settings");
         navbarButton.classList.remove("dark-mode__navbar-button-open");
         startAgain.classList.remove("dark-mode__start-again");
         github.classList.remove("dark-mode__github-bt");
   
         for (let element of statistics) {
            element.classList.remove("dark-mode__game-text");
         }
         for (let element of navbarIcon) {
            element.classList.remove("dark-mode__navbar-icon");
         }
         for (let element of buttonsKeyboard) {
            element.classList.remove("dark-mode__keyboard-button");
         }
      }
   }

   const [btDarkMode] = document.getElementsByClassName("dark-mode-bt");
   const [circle] = document.getElementsByClassName("dark-mode-bt__circle");

   let darkMode;

   if (localStorage.getItem("darkMode") === "") {
      if (
         window.matchMedia &&
         window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
         localStorage.setItem("darkMode", "1");
         darkMode = Number(localStorage.getItem("darkMode"));
      } else {
         localStorage.setItem("darkMode", "0");
         darkMode = Number(localStorage.getItem("darkMode"));
      }
      if (darkMode) {
         addClassDarkMode("activate");
         return;
      }

      return;
   } else {
      darkMode = Number(localStorage.getItem("darkMode"));
   }

   if (darkMode) {
      addClassDarkMode("activate");
   } else {
      addClassDarkMode("deactivate");
   }

   if (btDarkMode) {
      if (darkMode) {
         circle.style.left = "32px";
         btDarkMode.style.backgroundColor = "#0D336B";
      } else {
         circle.style.left = "3px";
         btDarkMode.style.backgroundColor = "#BFE1FF";
      }
   }

   if (btDarkMode) {
      btDarkMode.addEventListener("click", function activeDarkMode() {
         // Activar
         if (circle.style.left === "3px") {
            circle.style.left = "32px";
            btDarkMode.style.backgroundColor = "#0D336B";
            localStorage.setItem("darkMode", "1");
            addClassDarkMode("activate");
         } else {
            circle.style.left = "3px";
            btDarkMode.style.backgroundColor = "#BFE1FF";
            localStorage.setItem("darkMode", "0");
            addClassDarkMode("deactivate");
         }
      });
   }
}
