// Imports
import { getRandomCountries } from "./imports/countryDataManager.mjs";
import { MultipleChoice } from "./imports/classNewGame.mjs";

// Bindigs
let game;

function showResults(game, element) {
   insertAnswerResults(element, game.correctAnswers);
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
      ${correctAnswers}/10
    </span>
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
      }, 0);

      setTimeout(function () {
         responseDiv.style.opacity = 0;
      }, 2000);

      setTimeout(function () {
         responseDiv.remove();
      }, 2200);
   }

   // Incomplete options
   if (game.answerUser.length === 0) {
      showTypeResponse("incomplete option", element);
      return;
   }

   // Correct answer
   if (game.lastResponseStatus) {
      showTypeResponse("correct", element);
      return;
   }

   // Incorrect answer
   if (!game.lastResponseStatus) {
      showTypeResponse("incorrect", element);
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
   const [sendBt] = document.getElementsByClassName("multiple-choice__send");
   const optionBt = document.getElementsByClassName("multiple-choice__option");

   for (let button of optionBt) {
      button.style.backgroundColor = "";
      button.style.border = "";
   }

   let gameContinent = localStorage.getItem("continent")
      ? localStorage.getItem("continent")
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

   sendBt.addEventListener("click", sendAnswer);
}

function sendAnswer() {
   const [correctAnswerSpan] = document.getElementsByClassName(
      "game__correct-answers"
   );
   const [remainingCountries] = document.getElementsByClassName(
      "game__remaining-countries"
   );
   const [sendBt] = document.getElementsByClassName("multiple-choice__send");
   const optionBt = document.getElementsByClassName("multiple-choice__option");
   let answerUser = game.answerUser.toLowerCase().replace(/\s/g, "");
   let countryName = game.countries[0].name.toLowerCase().replace(/\s/g, "");

   // Pausar entrada de respuestas
   sendBt.removeEventListener("click", sendAnswer);

   if (game.answerUser.length === 0) {
      typeResponse(game, document.getElementsByClassName("multiple-choice")[0]);
      sendBt.addEventListener("click", sendAnswer);
      return;
   }

   game = game.verifyAnswer(answerUser, countryName);

   addIconAnimation(game.lastResponseStatus, "../images/icons-images");
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
            game,
            document.getElementsByClassName("multiple-choice")[0]
         );
      }, 3400);
      return;
   }

   setTimeout(() => {
      remainingCountries.textContent = `${remainingCountries.textContent - 1}`;
      showNewFlag(game);
      showOptions(game);
      sendBt.addEventListener("click", sendAnswer);
      for (let button of optionBt) {
         button.style.backgroundColor = "";
         button.style.border = "";
      }
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
               option.style.borderColor = "#a3cc91";
            }
         }

         if (!game.lastResponseStatus) {
            if (optionValue === countryName) {
               option.style.backgroundColor = "#dff0d8";
               option.style.borderColor = "#a3cc91";
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
