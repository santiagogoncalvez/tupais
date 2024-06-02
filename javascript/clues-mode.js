import { getRandomCountrie_Clues } from "../javascript/imports/countryDataManager.mjs";
import { Clues } from "./imports/classNewGame.mjs";

// Bindings
let game;

// Functions
function showResults(timeElapsed, game) {
   let body = document.getElementsByClassName("clues-mode")[0];
   insertAnswerResults(body, game.shownClues, timeElapsed);
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

function insertAnswerResults(element, shownClues, time) {
   const textHtml = `
    <div class="answer-results">
    <button class="answer-results__close" title="Cerrar" type="button">
    </button>
    <p class="answer-results__paragraph">
    <span class="answer-results__span">RESULTADOS</span>
    <span class="answer-results__span"></span>
    <span class="answer-results__span">
      Puntaje
    </span>
    <span class="answer-results__span">
      ${11 - shownClues}
    </span>
    <span class="answer-results__span">Tiempo</span>
    <span class="answer-results__span">00:${time}</span>
    </p>
    <a href="game-modes.html" class="answer-results__button--change-mode" title="Cambiar de modo" target="_self"><span>CAMBIAR DE MODO</span></a>
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
   const [nextBt] = document.getElementsByClassName("clues-mode__btNext");
   const [previousBt] = document.getElementsByClassName(
      "clues-mode__btPrevious"
   );
   const [answerContainer] = document.getElementsByClassName("game__answer");
   const [continentElement] = document.getElementsByClassName(
      "country__description"
   );
   const buttonsKeyboard = document.getElementsByClassName("keyboard__button");
   const [numberClues] = document.getElementsByClassName("game__clues");
   const [scoreClues] = document.getElementsByClassName("game__score");
   const [cluesList] = document.getElementsByClassName(
      "clues-mode__clues-list"
   );

   let gameContinent = localStorage.getItem("continent")
      ? localStorage.getItem("continent")
      : "all continents";
   let randomCountries = await getRandomCountrie_Clues(
      gameContinent,
      "./images/flags-svg"
   );

   innerLetterElements(randomCountries[0].name, answerContainer);

   // Continent text
   continentElement.textContent = insertTextContinent(gameContinent);
   // Correc answers reset
   numberClues.textContent = "1";
   scoreClues.textContent = "10";

   let stateGame = {
      continent: gameContinent,
      countries: randomCountries,
      answerUser: "",
      correctAnswers: 0,
      lastResponseStatus: false,
      shownClues: 1,
      currentClue: 0,
   };

   game = new Clues(stateGame);
   console.log(game);

   insertClues(game);

   //Agregar eventos a boton next y previous
   previousBt.style.cursor = "initial";
   previousBt.style.opacity = "0";
   previousBt.disabled = true;
   nextBt.style.cursor = "pointer";
   nextBt.style.opacity = "1";
   nextBt.disabled = false;
   nextBt.addEventListener("click", activeNextBt);
   previousBt.addEventListener("click", activeNextBt);

   // Keyboards buttons event
   for (let element of buttonsKeyboard) {
      element.addEventListener("click", listenKeyboard);
   }

   document.addEventListener("keydown", listenKeyboard);

   cluesList.style.transform = "translateX(0%)";
}

function insertClues(game) {
   const cluesItem = document.getElementsByClassName("clues-mode__clues-item");
   let cluesPropertys = Object.keys(game.countries[0].clues);

   function formatClueText(property, value) {
      function formatArray(array) {
         if (!Array.isArray(array)) return;
         let result = "";
         for (let i = 0; i < array.length; i++) {
            if (i === array.length - 1) {
               result += `${array[i]}`;
               continue;
            }
            result += `${array[i]}, `;
         }

         return result;
      }

      function formatObject(object) {
         if (
            value !== null &&
            typeof value === "object" &&
            !Array.isArray(object)
         ) {
            let result = "";
            let propertys = Object.keys(object);

            if (object.side) {
               result = `${object.side === "right" ? "Derecha" : "Izquierda"}`;
               return result;
            }

            if (object[propertys[0]]) {
               if (object[propertys[0]].symbol) {
                  for (let i = 0; i < propertys.length; i++) {
                     if (i === propertys.length - 1) {
                        result += `${propertys[i]} (${
                           object[propertys[i]].symbol
                        })`;
                        continue;
                     }
                     result += `${propertys[i]} (${
                        object[propertys[i]].symbol
                     }), `;
                  }
               } else {
                  for (let i = 0; i < propertys.length; i++) {
                     if (i === propertys.length - 1) {
                        result += `${object[propertys[i]]}`;
                        continue;
                     }
                     result += `${object[propertys[i]]}, `;
                  }
               }
            }

            return result;
         } else {
            return;
         }
      }

      let results = {
         area: `Area:\n${value} km`,
         borders: `${
            value ? "Paises limitrofes:\n" + formatArray(value) : `Es una isla`
         }`,
         capital: `Capital:\n${value ? formatArray(value) : "No tiene"}`,
         currencies: `Monedas:\n${formatObject(value)}`,
         landlocked: `Acceso al mar:\n${value ? "Si" : "No"}`,
         languages: `Lenguajes:\n${formatObject(value)}`,
         population: `Población:\n${value}`,
         subregion: `Subregión:\n${value}`,
         car: `Sentido de conducción:\n${formatObject(value)}`,
      };

      return results[property];
   }

   for (let i = 0; i < cluesItem.length; i++) {
      if (cluesItem[i].classList.contains("clues-mode__coatOfArms")) {
         const [imgCoatOfArms] =
            document.getElementsByClassName("coat-of-arms-img");
         const [clueSpan] = document.getElementsByClassName(
            "clues-mode__clues-span"
         );

         if (!game.countries[0].clues.coatOfArms.svg) {
            clueSpan.textContent = "Escudo de armas:\nNo tiene";
            continue;
         } else {
            imgCoatOfArms.src = `${game.countries[0].clues.coatOfArms.svg}`;
            clueSpan.textContent = "Escudo de armas:";
         }

         continue;
      }

      if (cluesItem[i].classList.contains("clues-mode__poblation")) {
         const [clueSpanPoblation] = document.getElementsByClassName(
            "clues-mode__clues-span--poblation"
         );

         clueSpanPoblation.textContent = formatClueText(
            cluesPropertys[i],
            game.countries[0].clues[cluesPropertys[i]]
         );

         continue;
      }

      cluesItem[i].textContent = formatClueText(
         cluesPropertys[i],
         game.countries[0].clues[cluesPropertys[i]]
      );
   }

   return;
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
      const [nextBt] = document.getElementsByClassName("clues-mode__btNext");
      const [previousBt] = document.getElementsByClassName(
         "clues-mode__btPrevious"
      );
      const buttonsKeyboard =
         document.getElementsByClassName("keyboard__button");

      // Pausar eventos de entrada
      for (let element of buttonsKeyboard) {
         element.removeEventListener("click", listenKeyboard);
      }
      document.removeEventListener("keydown", listenKeyboard);
      nextBt.removeEventListener("click", activeNextBt);
      previousBt.removeEventListener("click", activeNextBt);

      game = game.verifyAnswer(game.answerUser, game.countries[0].name);

      typeResponse(game, document.getElementsByClassName("clues-mode")[0]);

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
            previousBt.addEventListener("click", activeNextBt);
            return;
         }
      }

      addIconAnimation(game.lastResponseStatus, "../images/icons-images");

      // Correct answer
      if (game.lastResponseStatus) {
         // Show results
         if (game.correctAnswers === 1) {
            setTimeout(() => {
               showResults(timeElapsed, game);
            }, 3400);
            return;
         }
      }

      setTimeout(() => {
         // Pausar eventos de entrada
         for (let element of buttonsKeyboard) {
            element.addEventListener("click", listenKeyboard);
         }
         document.addEventListener("keydown", listenKeyboard);
         nextBt.addEventListener("click", activeNextBt);
         previousBt.addEventListener("click", activeNextBt);
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

                <button class="presentation__button-start" title="Empezar" type="button"
                    ><span>EMPEZAR</span></button
                >
            </div>
        </section>
        <div class="blurry-background"></div>
`;

   const [btSettings] = document.getElementsByClassName("header__settings");
   let [body] = document.getElementsByClassName("clues-mode");

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

         // Events
         continentsDropdown.addEventListener("change", function (event) {
            continent = event.target.value;
            event.target.classList.add("continents-dropdown--focus");
         });

         for (let i = 0; i < buttonsTime.length; i++) {
            buttonsTime[i].addEventListener("click", function (event) {
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
   const [startAgain] = document.getElementsByClassName("game__start-again");

   await startupEvents();

   startAgain.addEventListener("click", createNewGame);

   addMenuEvents();
});

function activeNextBt(event) {
   const [cluesList] = document.getElementsByClassName(
      "clues-mode__clues-list"
   );
   const [nextBt] = document.getElementsByClassName("clues-mode__btNext");
   const [previousBt] = document.getElementsByClassName(
      "clues-mode__btPrevious"
   );
   const cluesItems = document.getElementsByClassName("clues-mode__clues-item");
   const regex = /[0-9]+/;
   let numberTranslate;

   function matchesSpan(target) {
      const [spanNext1] = document.getElementsByClassName(
         "clues-mode__btNext--span1"
      );
      const [spanNext2] = document.getElementsByClassName(
         "clues-mode__btNext--span2"
      );

      // Si es true es span de nextBt
      if (target === spanNext1 || target === spanNext2) {
         return true;
      }

      // Si es false es span de previousBt
      if (target !== spanNext1 && target !== spanNext2) {
         return false;
      }
   }

   if (event.target === nextBt || matchesSpan(event.target)) {
      const [score] = document.getElementsByClassName("game__score");
      const [currentClue] = document.getElementsByClassName("game__clues");

      game = game.addCurrentClue();

      if (game.shownClues <= 10) {
         if (game.shownClues + 1 - game.currentClue === 1) {
            game = game.addShownClue();
            score.textContent = `${11 - game.shownClues}`;
            currentClue.textContent = `${game.currentClue + 1}`;
         }
      }

      if (cluesList.style.transform === "") {
         cluesList.style.transform = "translateX(-100%)";

         if (game.currentClue === 1) {
            previousBt.style.opacity = "1";
            previousBt.style.cursor = "pointer";
            previousBt.disabled = false;
         }
         return;
      }

      if (cluesList.style.transform !== "") {
         numberTranslate = Number(regex.exec(cluesList.style.transform));

         if (game.currentClue === 1) {
            previousBt.style.opacity = "1";
            previousBt.style.cursor = "pointer";
            previousBt.disabled = false;
         }

         if (game.currentClue === cluesItems.length - 1) {
            nextBt.style.opacity = "0";
            nextBt.style.cursor = "initial";
            nextBt.disabled = true;
         } else {
            nextBt.style.opacity = "1";
            nextBt.style.cursor = "pointer";
            nextBt.disabled = false;
         }

         if (numberTranslate === 900) return;

         cluesList.style.transform = `translateX(-${numberTranslate + 100}%)`;
         return;
      }
   }

   if (event.target === previousBt || !matchesSpan(event.target)) {
      const [currentClue] = document.getElementsByClassName("game__clues");

      game = game.substractCurrentClue();

      numberTranslate = Number(regex.exec(cluesList.style.transform));
      if (cluesList.style.transform === "" || numberTranslate === 1) {
         return;
      }

      if (cluesList.style.transform !== "") {
         if (game.currentClue === cluesItems.length - 2) {
            nextBt.style.opacity = "1";
            nextBt.style.cursor = "pointer";
            nextBt.disabled = false;
         }

         if (game.currentClue === 0) {
            previousBt.style.opacity = "0";
            previousBt.style.cursor = "initial";
            previousBt.disabled = true;
         }

         numberTranslate = Number(regex.exec(cluesList.style.transform));

         if (numberTranslate === 0) return;
         cluesList.style.transform = `translateX(-${numberTranslate - 100}%)`;
         return;
      }
   }
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
   const [countryElement] = document.getElementsByClassName(
      "clues-mode__sliderClues"
   );
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
