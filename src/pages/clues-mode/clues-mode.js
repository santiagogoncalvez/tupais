import "@src/index.css";

let base = import.meta.env.BASE_URL;

// url escudos de armas (coat-of-arms): https://mainfacts.com/coat-of-arms-countries-world
import { Clues } from "@scripts/imports/classNewGame.mjs";

// Bindings
let game;

// Functions
function showResults(game) {
   let [body] = document.getElementsByClassName("clues-mode");
   insertAnswerResults(body, game.shownClues);
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

function insertAnswerResults(element, shownClues) {
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
      }, 1500);

      setTimeout(function () {
         responseDiv.remove();
      }, 1600);
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

   // Continent text
   continentElement.textContent = insertTextContinent(gameContinent);
   // Correc answers reset
   numberClues.textContent = "1";
   scoreClues.textContent = "10";

   let imagePath = base + "images/flags";
   game = await Clues.create(gameContinent, imagePath);

   innerLetterElements(game.countries[0].name, answerContainer);
   insertClues(game);

   //Agregar eventos a boton next y previous
   previousBt.style.cursor = "initial";
   previousBt.style.opacity = "0";
   previousBt.disabled = true;
   nextBt.style.cursor = "pointer";
   nextBt.style.opacity = "1";
   nextBt.disabled = false;
   nextBt.addEventListener("click", activeNextBt);
   previousBt.addEventListener("click", activePreviousBt);

   // Keyboards buttons event
   for (let element of buttonsKeyboard) {
      element.addEventListener("click", listenKeyboard);
   }

   document.addEventListener("keydown", listenKeyboard);

   cluesList.style.transform = "translateX(0%)";
}

function insertClues(game) {
   const coatOfArmsPath = base + "images/coat-of-arms";
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

         //? Este dato tiene que estar en countryDataManajer y solo se tiene que llamar por una función que haga la verificación o que exponga los códigos de países que tienen escudo de armas .svg
         let notAllowedCodes = [
            "eh",
            "yt",
            "tk",
            "nu",
            "mp",
            "vi",
            "hm",
            "pn",
            "gs",
            "um",
            "as",
            "pr",
            "cc",
            "io",
            "cg",
            "mf",
            "bl",
            "bv",
            "pm",
            "tc",
            "nf",
            "wf",
            "re",
            "sz",
            "sx",
            "sh",
            "sj",
            "tl",
         ];

         //? Parche: se evalúa si existe la imagen con un array de codigos, pero se tiene que refactorizar
         if (
            notAllowedCodes.some((notAllowedCode) => {
               return notAllowedCode == game.countries[0].code;
            })
         ) {
            //? !!Parche: la imagen cuando se cambia a un país que no tiene escudo sigue siendo el de el anterior país o sigue apareciendo. Siendo que tendría que eliminarse u ocultarse para que se muestre el texto "No tiene".
            imgCoatOfArms.style.display = "none";
            clueSpan.textContent = "Escudo de armas:\nNo tiene";
         } else {
            imgCoatOfArms.style.display = "block";
            let path = coatOfArmsPath + `/${game.countries[0].code}.svg`;
            imgCoatOfArms.src = path;
            clueSpan.textContent = "Escudo de armas:";
         }
         continue;
      }

      //*

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

      let iconsPath = base + "images/icons";
      // Incorrect answer
      if (!game.lastResponseStatus) {
         incorrecLetterAnimation();
         addIconAnimation(game.lastResponseStatus, iconsPath);
      }
      // Correct answer
      if (game.lastResponseStatus) {
         correcLetterAnimation();
         addIconAnimation(game.lastResponseStatus, iconsPath);
         // Show results
         setTimeout(() => {
            showResults(game);
         }, 1500);
      }

      setTimeout(() => {
         // Pausar eventos de entrada
         for (let element of buttonsKeyboard) {
            element.addEventListener("click", listenKeyboard);
         }
         document.addEventListener("keydown", listenKeyboard);
         nextBt.addEventListener("click", activeNextBt);
         previousBt.addEventListener("click", activePreviousBt);
      }, 1500);

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
      }, 1500);
   }
}

// Eventos
// Event after loading content
document.addEventListener("DOMContentLoaded", function () {
   const [nextBt] = document.getElementsByClassName("clues-mode__btNext");
   const [startAgain] = document.getElementsByClassName("game__start-again");
   const [btInformation] = document.getElementsByClassName(
      "game__bt-information"
   );

   startupEvents();

   nextBt.addEventListener("click", activeNextBt);
   startAgain.addEventListener("click", createNewGame);
   btInformation.addEventListener("click", mouseClickCardInformation);
   btInformation.addEventListener("mouseenter", mouseInCardInformation);

   document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight") {
         activeNextBt();
      }

      if (event.key === "ArrowLeft") {
         activePreviousBt();
      }
   });

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
   const [body] = document.getElementsByClassName("clues-mode");

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
      let iconPath = base + "images/icons";
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
                     src="${iconPath}/icons-sun.svg" alt="sun-symbol" class="dark-mode-bt__sun"/ >
       
                     <div class="dark-mode-bt__circle"></div>
              
                     <img width="20" height="20" src="${iconPath}/icons-moon.png" alt="moon-symbol" class="dark-mode-bt__moon"/>
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

function activeNextBt() {
   if (game.currentClue === 9) return;
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

   // Next button
   const [score] = document.getElementsByClassName("game__score");
   const [currentClue] = document.getElementsByClassName("game__clues");

   game = game.addCurrentClue();

   if (game.shownClues <= 10) {
      if (game.shownClues + 1 - game.currentClue === 1) {
         game = game.addShownClue();
         score.textContent = `${11 - game.shownClues}`;
         currentClue.textContent = `${game.currentClue + 1}`;
         textChangeAnimation(score);
         textChangeAnimation(currentClue);
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

function activePreviousBt() {
   if (game.currentClue === 0) return;

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
   // Previous button
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

function addMenuEvents() {
   const [menuButtonOpen] = document.getElementsByClassName(
      "navbar__button--open"
   );
   const [menu] = document.getElementsByClassName("navbar");
   const [menuButtonClose] = document.getElementsByClassName(
      "navbar__button--close"
   );
   const [btGithub] = document.getElementsByClassName("footer__icon-github");
   const [body] = document.getElementsByClassName("clues-mode");

   btGithub.addEventListener("mouseover", () => {
      let iconsPath = base + "/images/icons";
      if (body.classList.contains("dark-mode__page")) {
         // TODO: Correjir la ruta para que sea un path
         btGithub.style.backgroundImage = `url(${
            iconsPath + "/icons-github-dark-mode-hover.svg"
         })`;
      } else {
         btGithub.style.backgroundImage = `url(${
            iconsPath + "/icons-github.svg"
         })`;
      }

      btGithub.addEventListener("mouseout", () => {
         if (body.classList.contains("dark-mode__page")) {
            btGithub.style.backgroundImage = `url(${
               iconsPath + "/icons-github-dark-mode.svg"
            })`;
         } else {
            btGithub.style.backgroundImage = `url(${
               iconsPath + "/icons-github-hover.svg"
            })`;
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
function addIconAnimation(typeAnswer, url) {
   const [countryElement] = document.getElementsByClassName(
      "clues-mode__container--1"
   );
   let blurryBackground = document.createElement("div");
   let iconImg = document.createElement("img");
   const [body] = document.getElementsByClassName("clues-mode");

   if (typeAnswer) {
      url += "/icons-correct.svg";
      iconImg.src = url;
   } else {
      url += "/icons-incorrect.svg";
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
   }, 1500);
}

function insertInformation(event) {
   const cardHtml = `       
            <div class="information-card">
            <div class="presentation__div">
                <h3 class="information-card__subtitle">¿Cómo jugar?</h3>

                <p
                    class="information-card__paragraph"
                    >En este formato hay que adivinar un pasís a partir de 10 pistas
               que van a ir apareciendo. Cuantas menos pistas hayas utilizado
               mejor va a ser tu puntaje de adivinanza.</p
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
      const [header] = document.getElementsByClassName("header");
      const [footer] = document.getElementsByClassName("footer");
      const [title] = document.getElementsByClassName("header__title");
      const [descriptionCountry] = document.getElementsByClassName(
         "country__description"
      );
      const [body] = document.getElementsByClassName("clues-mode");
      const [main] = document.getElementsByClassName("clues-mode__main");
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
         enter.classList.remove("dark-mode__enter");
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
