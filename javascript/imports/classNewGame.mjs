function showResponse(type) {
    // Create a div element for the response card
    let responseDiv = document.createElement("div");
    responseDiv.className = "response"; // Add the base CSS class
    responseDiv.style.opacity = 0;

    // Set the text of the response card based on the type
    if (type === "correct") {
        responseDiv.textContent = "Respuesta correcta";
    }
    if (type === "incorrect") {
        responseDiv.textContent = "Respuesta incorrecta";
        responseDiv.classList.add("incorrect"); // Add CSS class for incorrect response
    }

    if (type === "incomplete") {
        responseDiv.textContent = "Palabra incompleta";
        responseDiv.classList.add("incomplete");
    }
    // Add the response card to the document body
    document.body.appendChild(responseDiv);

    // Show the response card
    responseDiv.style.display = "block";

    // Hide the response card after 3 seconds

    setTimeout(function () {
        responseDiv.style.opacity = 1;
    }, 10); // Delay to ensure smooth transition

    // Hide the response card after 3 seconds
    setTimeout(function () {
        responseDiv.style.opacity = 0;
        // responseDiv.style.display = "none";
    }, 2000);
}

export class NewGame {
    constructor(state) {
        for (let property in state) {
            this[property] = state[property];
        }
    }

    insertLetter(letter, element) {
        element.textContent = letter;
    }

    deleteLetter(element) {
        element.textContent = "";
    }

    deleteAllLetters(arrElements) {
        for (let element of arrElements) {
            element.textContent = "";
        }
    }

    insertAnswerResults(element, correcAnswers, time) {
        element.insertAdjacentHTML(
            "beforeend",
            `
    <div class="answer-results">
  <a href="./index.html" class="answer-results__close-link"><img src="./images/close.png" alt="" class="answer-results__close-img" />
  </a>
  <p class="answer-results__paragraph">
    <span class="answer-results__span">RESULTADOS</span>
    <span class="answer-results__span"></span>
    <span class="answer-results__span">
      Respuestas correctas
    </span>
    <span class="answer-results__span">
      ${correcAnswers}/10
    </span>
    <span class="answer-results__span">Tiempo</span>
    <span class="answer-results__span">00:${time}</span>
  </p>

  <a href="./index.html" class="answer-results__button--start-again"><span>JUGAR DE NUEVO</span></a>
  <a href="./pages-html/timer-mode.html" class="answer-results__button--change-mode"><span>CAMBIAR DE MODO</span></a>
</div>
<div class="blurry-background"></div>`
        );
    }

    nextCountry() {
        if (this.countries.length === 0) return null;
        return new NewGame(
            this.modifyProperty("countries", this.countries.slice(1))
        );
    }

    modifyAnswer(pressedKey, lastAnswer) {
        if (typeof pressedKey !== "string" || typeof lastAnswer !== "string") {
            throw new Error(
                `The arguments are not strings. pressedKey: ${pressedKey}, arrAnswer: ${lastAnswer}`
            );
        }

        let currentAnswer, letterElement;

        if (!this.typeKey(pressedKey))
            return new NewGame(this.modifyProperty());

        // Delete letter
        if (this.typeKey(pressedKey) === "backspace") {
            if (this.answerUser.length === 0) {
                return new NewGame(this.modifyProperty());
            }
            letterElement =
                this.elementsHtml.answerLetters[this.answerUser.length - 1];
            this.deleteLetter(letterElement);
            currentAnswer = lastAnswer.slice(0, lastAnswer.length - 1);
            return new NewGame(
                this.modifyProperty("answerUser", currentAnswer)
            );
        }

        /*remove spaces and convert to lowercase */
        let nameCounty = this.countries[0].name
            .toLowerCase()
            .replace(/\s/g, "");

        // Enter answer
        if (this.typeKey(pressedKey) === "enter") {
            // Incomplete answer
            if (this.answerUser.length !== nameCounty.length) {
                showResponse("incomplete");
                return new NewGame(this.modifyProperty());
            }

            // Incorrect answer
            if (this.answerUser !== nameCounty) {
                showResponse("incorrect");
                return new NewGame(this.modifyProperty());
            }

            // Correct answer
            showResponse("correct");
            // efecto verde sobre letras:
            /*aplicar clase efect-correct-answer a los eleentos de respuesta cuando se responde correctamente */

            this.elementsHtml.correctAnswerSpan[0].textContent = `${
                this.correctAnswers + 1
            }/10`;

            // Mostrar resultados
            if (this.correctAnswers === 9) {
                let body = document.getElementsByClassName("homepage")[0];
                this.insertAnswerResults(body, this.correctAnswers + 1, 35);
                let object = this.modifyProperty(
                    "correctAnswers",
                    this.correctAnswers + 1
                );
                object.countries = this.countries.slice(1);
                object.answerUser = "";
                this.deleteAllLetters(this.elementsHtml.answerLetters);
                return new NewGame(object);
            }

            this.elementsHtml.flagImg[0].src = this.countries[1].flagUrl;
            let object = this.modifyProperty(
                "correctAnswers",
                this.correctAnswers + 1
            );
            object.countries = this.countries.slice(1);
            object.answerUser = "";
            NewGame.innerHtmlWord(
                object.countries[0].name,
                this.elementsHtml.answerDiv[0]
            );
            this.deleteAllLetters(this.elementsHtml.answerLetters);

            return new NewGame(object);
        }

        // completed word
        if (this.answerUser.length === nameCounty.length) {
            return new NewGame(this.modifyProperty());
        }

        // Insert letter
        if (this.answerUser.length === 0) {
            letterElement = this.elementsHtml.answerLetters[0];
        } else {
            letterElement =
                this.elementsHtml.answerLetters[this.answerUser.length];
        }

        if (this.answerUser.length === this.countries[0].name.length) {
            return new NewGame(this.modifyProperty());
        }
        this.insertLetter(pressedKey, letterElement);
        currentAnswer = lastAnswer + pressedKey;
        return new NewGame(this.modifyProperty("answerUser", currentAnswer));
    }

    modifyProperty(property = null, newValue = null) {
        let state = {};
        for (let propertyGame in this) {
            if (property === propertyGame) {
                state[property] = newValue;
                continue;
            }

            state[propertyGame] = this[propertyGame];
        }

        return state;
    }

    typeKey(key) {
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

    static innerHtmlWord(countryName, element) {
        let textHtml = "";
        for (let i = 0; i < countryName.length; i++) {
            if (countryName[i] === " ") {
                textHtml += '<div class="game__answer-word--space"></div>';
                continue;
            }
            textHtml += '<div class="game__answer-word"></div>';
        }
        element.innerHTML = textHtml;
    }
}
