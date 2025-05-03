import "@src/index.css";


// Imports
import { NewGame } from "@utils/class-new-game.js";

// Bindings
let game;

// Functions
function showResults(game) {
   let body = document.getElementsByClassName("record-mode")[0];
   insertAnswerResults(body, game.correctAnswers);
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

function insertAnswerResults(element, correctAnswers) {
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
      ${correctAnswers}
    </span>
    </p>
    <a href="/game-modes.html" class="answer-results__button--change-mode" title="Cambiar de modo" target="_self"><span>CAMBIAR DE MODO</span></a>
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

   if (answerLetterElements[answerLetterElements.length - 1].textContent !== "")
      return;

   let letterElement;
   if (game.answerUser.length === 1) {
      letterElement = answerLetterElements[0];
      letterElement.style.border = "2px solid rgb(190, 190, 190)";
      answerLetterElements[1].style.border = "2px solid rgb(62, 125, 214)";
   }
   if (game.answerUser.length !== 1) {
      if (game.answerUser.length === answerLetterElements.length) {
         letterElement = answerLetterElements[game.answerUser.length - 1];
         letterElement.style.border = "2px solid rgb(190, 190, 190)";
         letterElement.textContent =
            game.answerUser[game.answerUser.length - 1];

         letterAnimation(letterElement);

         return;
      }
      letterElement = answerLetterElements[game.answerUser.length - 1];
      letterElement.style.border = "2px solid rgb(190, 190, 190)";
      answerLetterElements[game.answerUser.length].style.border =
         "2px solid rgb(62, 125, 214)";
   }

   letterElement.textContent = game.answerUser[game.answerUser.length - 1];
   letterAnimation(letterElement);
}

function deleteLetter(game) {
   const answerLetterElements = document.getElementsByClassName(
      "game__answer-letter"
   );
   let letterElement = answerLetterElements[game.answerUser.length];

   if (game.answerUser.length + 1 === answerLetterElements.length) {
      answerLetterElements[game.answerUser.length].style.border =
         "2px solid rgb(62, 125, 214)";
      letterElement.textContent = "";
      return;
   }

   answerLetterElements[game.answerUser.length + 1].style.border =
      "2px solid rgb(175, 190, 211)";
   answerLetterElements[game.answerUser.length].style.border =
      "2px solid rgb(62, 125, 214)";
   letterElement.textContent = "";
}

function letterAnimation(element) {
   element.style.opacity = "0.9";

   setTimeout(() => {
      element.style.opacity = "1";
   }, 20);

   element.style.height = "1.7rem";
   element.style.width = "1.7rem";
   element.style.fontSize = "0.8rem";

   setTimeout(() => {
      element.style.height = "2.2rem";
      element.style.width = "2.2rem";
   }, 60);

   setTimeout(() => {
      element.style.height = "2rem";
      element.style.width = "2rem";
      element.style.fontSize = "1rem";
   }, 70);
}

function textChangeAnimation(element) {
   element.style.fontSize = "1.5rem";

   setTimeout(() => {
      element.style.fontSize = "1.2rem";
   }, 140);
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
      "ñ",
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
      textHtml +=
         '<div class="keyboard__container-button"><div class="game__answer-letter"></div></div>';
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
      const [responseElement] = document.getElementsByClassName("response");

      if (responseElement) {
         if (
            type === "correct" &&
            responseElement.classList.contains("correct")
         ) {
            return;
         }

         if (
            type === "incorrect" &&
            responseElement.classList.contains("incorrect")
         ) {
            return;
         }

         if (
            type === "incomplete" &&
            responseElement.classList.contains("incomplete")
         ) {
            return;
         }
      }

      let responseDiv = document.createElement("div");
      responseDiv.className = "response";
      responseDiv.style.opacity = 0;

      if (type === "correct") {
         responseDiv.textContent = "Respuesta correcta";
         responseDiv.classList.add("correct");
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
      }, 100);

      setTimeout(function () {
         responseDiv.style.opacity = 0;
      }, 1200);

      setTimeout(function () {
         responseDiv.remove();
      }, 1400);
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

   // Continent text
   continentElement.textContent = insertTextContinent(gameContinent);
   // Correc answers reset
   correctAnswerSpan.textContent = "0";

   game = await NewGame.create(gameContinent, -1, "/tupais/images/flags");

   innerLetterElements(game.countries[0].name, answerContainer);
   flagImg.src = game.countries[0].flagUrl;
   let alt = `Bandera de ${game.countries[0].name}`;
   flagImg.alt = alt;

   // Keyboards buttons event
   for (let element of buttonsKeyboard) {
      element.addEventListener("click", listenKeyboard);
   }

   document.addEventListener("keydown", listenKeyboard);
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
      const buttonsKeyboard =
         document.getElementsByClassName("keyboard__button");
      const [correctAnswerSpan] = document.getElementsByClassName(
         "game__correct-answers"
      );
      const [answerContainer] = document.getElementsByClassName("game__answer");

      // Pausar eventos de entrada
      for (let element of buttonsKeyboard) {
         element.removeEventListener("click", listenKeyboard);
      }
      document.removeEventListener("keydown", listenKeyboard);

      game = game.verifyAnswer(game.answerUser, game.countries[0].name);

      typeResponse(game, document.getElementsByClassName("record-mode")[0]);

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
            return;
         }
      }

      // Incorrect answer
      if (!game.lastResponseStatus) {
         incorrecLetterAnimation();
         addIconAnimation(game.lastResponseStatus);
         // Show results
         setTimeout(() => {
            showResults(game);
         }, 1200);
      }
      // Correct answer
      if (game.lastResponseStatus) {
         correctAnswerSpan.textContent = `${game.correctAnswers}`;
         textChangeAnimation(correctAnswerSpan);
         correcLetterAnimation();
         addIconAnimation(game.lastResponseStatus);

         setTimeout(() => {
            showNewFlag(game);
         }, 0);

         setTimeout(() => {
            innerLetterElements(game.countries[0].name, answerContainer);
            game = game.resetAnswerUser(game.countries);
         }, 1200);
      }

      setTimeout(() => {
         // Pausar eventos de entrada
         for (let element of buttonsKeyboard) {
            element.addEventListener("click", listenKeyboard);
         }
         document.addEventListener("keydown", listenKeyboard);
      }, 1200);

      return;
   }

   if (pressedKey === "backspace") {
      if (game.answerUser.length === 0) return;
      game = game.modifyAnswer(pressedKey, game.answerUser);
      deleteLetter(game);
      return;
   }

   // other letter
   if (pressedKey !== "backspace") {
      game = game.modifyAnswer(pressedKey, game.answerUser);
      insertLetter(game);
      return;
   }

   function correcLetterAnimation() {
      const letterElements = document.getElementsByClassName(
         "game__answer-letter"
      );

      for (let element of letterElements) {
         element.style.border = "2px solid #a1cc8e";
         element.style.backgroundColor = "#ecfde4";
      }
   }
   function incorrecLetterAnimation() {
      const letterElements = document.getElementsByClassName(
         "game__answer-letter"
      );

      for (let element of letterElements) {
         element.style.border = "2px solid #f5abab";
         element.style.backgroundColor = "#ffeeee";
      }

      setTimeout(() => {
         for (let element of letterElements) {
            element.style.border = "";
            element.style.backgroundColor = "";
         }
      }, 1200);
   }
}

// Eventos
// Event after loading content
document.addEventListener("DOMContentLoaded", function () {
   const [startAgain] = document.getElementsByClassName("game__start-again");
   const [btInformation] = document.getElementsByClassName(
      "game__bt-information"
   );

   startupEvents();

   startAgain.addEventListener("click", createNewGame);
   btInformation.addEventListener("click", mouseClickCardInformation);
   btInformation.addEventListener("mouseenter", mouseInCardInformation);

   addMenuEvents();
   changeBtDarkMode();

   // Manejar user select
   userSelect();
});

function userSelect() {
   const [title] = document.getElementsByClassName("header__title");
   const [footerParagraph] =
      document.getElementsByClassName("footer__paragraph");
   title.addEventListener("mouseenter", function (event) {
      title.style.userSelect = "text";
   });
   title.addEventListener("mouseleave", function (event) {
      title.style.userSelect = "none";
   });
   footerParagraph.addEventListener("mouseenter", function (event) {
      footerParagraph.style.userSelect = "text";
   });
   footerParagraph.addEventListener("mouseleave", function (event) {
      footerParagraph.style.userSelect = "none";
   });
}

async function startupEvents() {
   const [btSettings] = document.getElementsByClassName("header__settings");
   const [body] = document.getElementsByClassName("record-mode");

   // Events
   btSettings.addEventListener("click", () => {
      insertSettings(body);
   });

   async function insertPresentation(body) {
      const presentationHtml = `        
            <div class="presentation__section">
            <button class="presentation__header-link" title="Cerrar" type="button"
                    >
                </button>
            <header class="presentation__header">
                <h2 class="presentation__header-title">TU PAÍS</h2>   
            </header>

            <div class="presentation__div">
                <p class="presentation__paragraph">
                    <strong>TU PAÍS</strong> es un juego de adivinanzas
                    geográficas en el que tenés que acertar el nombre de países de los diferentes continentes por sus banderas
                    . Si completas las respuestas correctamente ¡Ganás!
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

                <button class="presentation__button-start" title="Empezar" type="button"
                    ><span>EMPEZAR</span></button
                >
            </div>
        </div>
        <div class="blurry-background"></div>
`;
      return new Promise((resolve) => {
         btSettings.blur();
         body.insertAdjacentHTML("beforeend", presentationHtml);

         let [presentation] = document.getElementsByClassName(
            "presentation__section"
         );
         let [bgBlurry] = document.getElementsByClassName("blurry-background");

         const [continentsDropdown] = document.getElementsByClassName(
            "continents-dropdown"
         );
         const [startButton] = document.getElementsByClassName(
            "presentation__button-start"
         );
         const [closeIcon] = document.getElementsByClassName(
            "presentation__header-link"
         );

         presentation.classList.add("presentation");

         // Millisenconds
         let continent = "all continents";

         // Events
         continentsDropdown.addEventListener("change", function (event) {
            continent = event.target.value;
            event.target.classList.add("continents-dropdown--focus");
         });

         startButton.addEventListener("click", function () {
            localStorage.setItem("continent", continent);

            bgBlurry.style.opacity = "0";
            bgBlurry.remove();
            presentation.remove();
            document.removeEventListener("click", listenOutsidePresent);
            createNewGame();
         });

         function listenOutsidePresent(event) {
            if (
               !presentation.contains(event.target) &&
               event.target !== btSettings
            ) {
               localStorage.setItem("continent", continent);

               bgBlurry.style.opacity = "0";
               bgBlurry.remove();
               presentation.remove();
               document.removeEventListener("click", listenOutsidePresent);
               createNewGame();
            }
         }

         closeIcon.addEventListener("click", function () {
            localStorage.setItem("continent", continent);

            bgBlurry.style.opacity = "0";
            bgBlurry.remove();
            presentation.remove();
            document.removeEventListener("click", listenOutsidePresent);
            createNewGame();
         });

         document.addEventListener("keydown", actPresentation);

         document.addEventListener("click", listenOutsidePresent);

         function actPresentation(event) {
            escPresentation(event);
         }

         function escPresentation(event) {
            if (event.key === "Escape") {
               if (presentation) {
                  localStorage.setItem("continent", continent);

                  bgBlurry.style.opacity = "0";
                  bgBlurry.remove();
                  presentation.remove();
                  document.removeEventListener("click", listenOutsidePresent);
                  createNewGame();

                  document.removeEventListener("keydown", actPresentation);
               }
            }
         }
      });
   }
   function insertSettings(body) {
      function animationIn(element) {
         element.style.height = "23rem";
         element.style.width = "26rem";
         element.style.opacity = "0";

         setTimeout(() => {
            element.style.opacity = "1";
         }, 15);

         setTimeout(() => {
            element.style.height = "25rem";
            element.style.width = "28rem";
         }, 15);
      }

      async function animationOut(element) {
         return new Promise((resolve) => {
            element.style.height = "23rem";
            element.style.width = "26rem";

            setTimeout(() => {
               element.style.opacity = "0";
            }, 15);
            setTimeout(() => {
               resolve();
            }, 100);
         });
      }

      const settingsHtml = `       
               <div class="presentation__section">
               <button class="presentation__header-link" title="Cerrar" type="button"
                       >
                   </button>
               
                  <div class="presentation__div">
                  <h2 class="presentation__subtitle">Configuración</h2>
   
                  <div class="presentation__subtitle">Modo oscuro</div>
                  <button class="dark-mode-bt" type="button" title="Modo oscuro">
                     <img width="20" height="20"
                     src="${
                        new URL("/src/assets/icons/sun.svg", import.meta.url)
                           .href
                     }" alt="sun-symbol" class="dark-mode-bt__sun"/ >
       
                     <div class="dark-mode-bt__circle"></div>
              
                     <img width="20" height="20" src="${
                        new URL("/src/assets/icons/moon.png", import.meta.url)
                           .href
                     }" alt="moon-symbol" class="dark-mode-bt__moon"/>
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
           </div>
           <div class="blurry-background"></div>
   `;

      const [btSettings] = document.getElementsByClassName("header__settings");

      btSettings.blur();

      body.insertAdjacentHTML("beforeend", settingsHtml);

      const [presentation] = document.getElementsByClassName(
         "presentation__section"
      );

      animationIn(presentation);

      const [bgBlurry] = document.getElementsByClassName("blurry-background");

      const [continentsDropdown] = document.getElementsByClassName(
         "continents-dropdown"
      );
      const [startButton] = document.getElementsByClassName(
         "presentation__button-start"
      );
      const [closeIcon] = document.getElementsByClassName(
         "presentation__header-link"
      );
      presentation.classList.add("settings");
      // Millisenconds
      let continent = "all continents";

      // Events
      continentsDropdown.addEventListener("change", function (event) {
         continent = event.target.value;
         event.target.classList.add("continents-dropdown--focus");
      });
      startButton.addEventListener("click", function () {
         localStorage.setItem("continent", continent);

         bgBlurry.style.opacity = "0";
         bgBlurry.remove();
         animationOut(presentation).then((result) => {
            presentation.remove();
            document.removeEventListener("click", listenOutsidePresent);
            document.removeEventListener("keydown", actPresentation);
            createNewGame();
         });
      });
      function listenOutsidePresent(event) {
         if (
            !presentation.contains(event.target) &&
            event.target !== btSettings
         ) {
            if (presentation.classList.contains("settings")) {
               bgBlurry.style.opacity = "0";
               bgBlurry.remove();
               animationOut(presentation).then((result) => {
                  presentation.remove();
                  document.removeEventListener("click", listenOutsidePresent);
                  document.removeEventListener("keydown", actPresentation);
               });
            }
         }
      }

      changeBtDarkMode();
      closeIcon.addEventListener("click", function () {
         bgBlurry.style.opacity = "0";
         bgBlurry.remove();
         animationOut(presentation).then((result) => {
            presentation.remove();
            document.removeEventListener("click", listenOutsidePresent);
            document.removeEventListener("keydown", actPresentation);
         });
      });

      document.addEventListener("keydown", actPresentation);
      document.addEventListener("click", listenOutsidePresent);

      function actPresentation(event) {
         escPresentation(event);
      }

      function escPresentation(event) {
         if (event.key === "Escape") {
            if (presentation) {
               bgBlurry.style.opacity = "0";
               bgBlurry.remove();
               animationOut(presentation).then((result) => {
                  presentation.remove();
                  document.removeEventListener("click", listenOutsidePresent);
                  document.removeEventListener("keydown", actPresentation);
               });
            }
         }
      }
   }

   // Presentation
   if (!localStorage.getItem("time") && !localStorage.getItem("continent")) {
      await insertPresentation(body);
   } else {
      createNewGame();
   }
}
function mouseClickCardInformation() {
   const [cardInformation] =
      document.getElementsByClassName("information-card");
   const [btInformation] = document.getElementsByClassName(
      "game__bt-information"
   );

   if (!cardInformation) {
      insertInformation();

      document.addEventListener("mousemove", outOfTarjetInformation);

      btInformation.removeEventListener("mouseenter", mouseInCardInformation);
   } else {
      cardAnimationOut(cardInformation).then(() => {
         btInformation.style.backgroundColor = "";
         cardInformation.remove();
         btInformation.addEventListener("mouseenter", mouseInCardInformation);
      });
   }
}

function mouseInCardInformation() {
   const [cardInformation] =
      document.getElementsByClassName("information-card");
   const [btInformation] = document.getElementsByClassName(
      "game__bt-information"
   );

   btInformation.removeEventListener("click", mouseClickCardInformation);
   setTimeout(() => {
      btInformation.addEventListener("click", mouseClickCardInformation);
   }, 0);

   if (cardInformation) {
      btInformation.style.backgroundColor = "";
      cardInformation.remove();
      btInformation.addEventListener("mouseenter", mouseInCardInformation);
      document.removeEventListener("mousemove", outOfTarjetInformation);
      return;
   }

   insertInformation();

   document.addEventListener("mousemove", outOfTarjetInformation);

   btInformation.removeEventListener("mouseenter", mouseInCardInformation);
}

function outOfTarjetInformation(event) {
   const [cardInformationActive] =
      document.getElementsByClassName("information-card");
   const [div] = document.getElementsByClassName("presentation__div");
   const [subtitle] = document.getElementsByClassName(
      "information-card__subtitle"
   );
   const [cardParagraph] = document.getElementsByClassName(
      "information-card__paragraph"
   );
   const [btInformation] = document.getElementsByClassName(
      "game__bt-information"
   );

   if (cardInformationActive) {
      if (
         event.target !== cardInformationActive &&
         event.target !== div &&
         event.target !== subtitle &&
         event.target !== cardParagraph &&
         event.target !== btInformation
      ) {
         cardAnimationOut(cardInformationActive).then(() => {
            btInformation.style.backgroundColor = "";
            cardInformationActive.remove();
            btInformation.addEventListener(
               "mouseenter",
               mouseInCardInformation
            );
            document.removeEventListener("mousemove", outOfTarjetInformation);
         });
      }
   }
}

function cardAnimationIn(element) {
   element.style.opacity = "0";
   element.style.width = "21rem";
   element.style.height = "11rem";

   setTimeout(() => {
      element.style.opacity = "1";
   }, 15);

   setTimeout(() => {
      element.style.width = "22rem";
      element.style.height = "12rem";
   }, 15);
}

async function cardAnimationOut(element) {
   return new Promise((resolve) => {
      element.style.width = "21rem";
      element.style.height = "11rem";

      setTimeout(() => {
         element.style.opacity = "0";
      }, 15);
      setTimeout(() => {
         resolve();
      }, 100);
   });
}

function addMenuEvents() {
   const [menuButtonOpen] = document.getElementsByClassName(
      "navbar__button--open"
   );
   const [menu] = document.getElementsByClassName("navbar");
   const [menuButtonClose] = document.getElementsByClassName(
      "navbar__button--close"
   );
   const [btGithub] = document.getElementsByClassName("footer__icon-github");
   const [body] = document.getElementsByClassName("record-mode");

   let iconPathHoverDark = new URL(
      "/src/assets/icons/github-dark-mode-hover.svg",
      import.meta.url
   ).href;
   let iconPathDark = new URL(
      "/src/assets/icons/github-dark-mode.svg",
      import.meta.url
   ).href;
   let iconPathHover = new URL(
      "/src/assets/icons/github-common.svg",
      import.meta.url
   ).href;
   let iconPath = new URL("/src/assets/icons/github-hover.svg", import.meta.url)
      .href;

   btGithub.addEventListener("mouseover", () => {
      if (body.classList.contains("dark-mode__page")) {
         // TODO: Correjir la ruta para que sea un path
         btGithub.style.backgroundImage = `url("${iconPathHoverDark}")`;
      } else {
         btGithub.style.backgroundImage = `url("${iconPath}")`;
      }

      btGithub.addEventListener("mouseout", () => {
         if (body.classList.contains("dark-mode__page")) {
            btGithub.style.backgroundImage = `url("${iconPathDark}")`;
         } else {
            btGithub.style.backgroundImage = `url("${iconPathHover}")`;
         }
      });
   });

   menuButtonOpen.addEventListener("click", function (event) {
      if (menu.style.left === "-25rem" || menu.style.left === "") {
         new Promise((resolve) => {
            menu.style.left = "0rem";
            resolve();
         }).then((resolve) => {
            setTimeout(() => {
               document.addEventListener("click", closeNavbar);
            }, 0);
         });
         return;
      }
      if (menu.style.left === "0rem") {
         if (!menu.contains(event.target)) {
            menu.style.left = "-25rem";
            document.removeEventListener("click", closeNavbar);
         }
         return;
      }
   });

   function closeNavbar(event) {
      if (!menu.contains(event.target)) {
         menu.style.left = "-25rem";
         document.removeEventListener("click", closeNavbar);
      }
   }

   menuButtonClose.addEventListener("click", function () {
      menu.style.left = "-25rem";
      document.removeEventListener("click", closeNavbar);
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
function addIconAnimation(typeAnswer) {
   const [countryElement] =
      document.getElementsByClassName("country__container");
   let blurryBackground = document.createElement("div");
   let iconImg = document.createElement("img");
   const [body] = document.getElementsByClassName("record-mode");

   let url;
   if (typeAnswer) {
      url = new URL("/src/assets/icons/correct.svg", import.meta.url).href;
      iconImg.src = url;
   } else {
      url = new URL("/src/assets/icons/incorrect.svg", import.meta.url).href;
      iconImg.src = url;
   }

   blurryBackground.classList.add("overlappingBackground");
   if (body.classList.contains("dark-mode__page")) {
      blurryBackground.classList.add("dark-mode__overlappingBackground");
   }
   iconImg.classList.add("multiple-choice__iconAnswer--defoult");

   countryElement.appendChild(blurryBackground);
   countryElement.appendChild(iconImg);

   setTimeout(() => {
      iconImg.classList.add("multiple-choice__iconAnswer--active");
   }, 100);

   // Borrar elementos
   setTimeout(() => {
      blurryBackground.remove();
      iconImg.remove();
   }, 1200);
}

function insertInformation(event) {
   const cardHtml = `       
            <div class="information-card">
            <div class="presentation__div">
                <h3 class="information-card__subtitle">¿Cómo jugar?</h3>

                <p
                    class="information-card__paragraph"
                    >En este formato hay que adivinar la mayor cantidad de países
               posibles sin equivocarse.</p
                >
            </div>
        </div>
`;

   const [btInformation] = document.getElementsByClassName(
      "game__bt-information"
   );
   const [container] = document.getElementsByClassName("game__container");
   container.insertAdjacentHTML("beforeend", cardHtml);

   const [presentation] = document.getElementsByClassName("information-card");

   cardAnimationIn(presentation);

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
         const [cardInformation] =
            document.getElementsByClassName("information-card");
         const [btInformation] = document.getElementsByClassName(
            "game__bt-information"
         );

         if (presentation) {
            cardAnimationOut(cardInformation).then(() => {
               btInformation.style.backgroundColor = "";
               cardInformation.remove();
               btInformation.addEventListener(
                  "mouseenter",
                  mouseInCardInformation
               );
            });
         }
      }
   }
}

function changeBtDarkMode() {
   function addClassDarkMode(type) {
      // Página actual
      const [body] = document.getElementsByClassName("record-mode");
      const [main] = document.getElementsByClassName("record-mode__main");
      const [header] = document.getElementsByClassName("header");
      const [footer] = document.getElementsByClassName("footer");
      const [title] = document.getElementsByClassName("header__title");
      const [descriptionCountry] = document.getElementsByClassName(
         "country__description"
      );
      const [navbarButton] = document.getElementsByClassName(
         "navbar__button--open"
      );
      const [footerParagraph] =
         document.getElementsByClassName("footer__paragraph");
      const [btSettings] = document.getElementsByClassName("header__settings");
      const [enter] = document.getElementsByClassName(
         "keyboard__button--enter"
      );
      const [startAgain] = document.getElementsByClassName("game__start-again");
      const [github] = document.getElementsByClassName("footer__icon-github");
      const navbarIcon = document.getElementsByClassName("navbar__icon");
      const buttonsKeyboard =
         document.getElementsByClassName("button-keyboard");

      const statistics = document.getElementsByClassName(
         "game__statistics-item"
      );

      let iconPath = new URL(
         "/src/assets/icons/github-common.svg",
         import.meta.url
      ).href;
      let iconPathDark = new URL(
         "/src/assets/icons/github-dark-mode.svg",
         import.meta.url
      ).href;
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
         enter.classList.add("dark-mode__enter");
         startAgain.classList.add("dark-mode__start-again");
         github.style.backgroundImage = `url("${iconPathDark}")`;

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
         enter.classList.remove("dark-mode__enter");
         startAgain.classList.remove("dark-mode__start-again");
         github.style.backgroundImage = `url("${iconPath}")`;

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
