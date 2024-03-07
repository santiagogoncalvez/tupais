/* Structure game:
let stateGame = {
    time: timeStorage,
    continent: gameContinent,
    countries: randomCountries,
    answerUser: "",
    correctAnswers: 0,
    lastResponseStatus: true;
    elementsHtml: {
        flagImg: flagImg,
        answerDiv: answerDiv,
        answerLetters: answerWordElements,
        continentSpan: continentElement,
        correctAnswerSpan: correctAnswerSpan,
    },
};
*/

// Modificar funcion para que se ejecute en un elemento especifico
function showResponse(type, element) {
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
    element.appendChild(responseDiv);

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

    insertAnswerResults(element, correctAnswers, time) {
        const elementHtml = `
    <div class="answer-results">
    <a href="./index.html" class="answer-results__close-link"><img src="" alt="" class="answer-results__close-img" />
    </a>
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
    <a href="./index.html" class="answer-results__button--start-again"><span>JUGAR DE NUEVO</span></a>
     <a href="./pages-html/timer-mode.html" class="answer-results__button--change-mode"><span>CAMBIAR DE MODO</span></a>
    </div>
    <div class="blurry-background"></div>`;

        element.insertAdjacentHTML("beforeend", elementHtml);
    }

    modifyAnswer(pressedKey, lastAnswer) {
        if (typeof pressedKey !== "string" || typeof lastAnswer !== "string") {
            throw new Error(
                `The arguments are not strings. pressedKey: ${pressedKey}, arrAnswer: ${lastAnswer}`
            );
        }

        let currentAnswer,
            letterElement,
            countryName = this.countries[this.correctAnswers].name
                .toLowerCase()
                .replace(/\s/g, "");

        if (!this.typeKey(pressedKey)) {
            return new NewGame(this.modifyProperty());
        }

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
                this.modifyProperty({ answerUser: currentAnswer })
            );
        }

        // completed word
        if (this.answerUser.length === countryName.length) {
            return new NewGame(this.modifyProperty());
        }

        // Insert letter
        if (this.answerUser.length === 0) {
            letterElement = this.elementsHtml.answerLetters[0];
        } else {
            letterElement =
                this.elementsHtml.answerLetters[this.answerUser.length];
        }

        if (this.answerUser.length === countryName.length) {
            return new NewGame(this.modifyProperty());
        }

        this.insertLetter(pressedKey, letterElement);
        currentAnswer = lastAnswer + pressedKey;
        return new NewGame(
            this.modifyProperty({
                answerUser: currentAnswer,
            })
        );
    }

    verifyAnswer(answerUser, countryName) {
        countryName = countryName.toLowerCase().replace(/\s/g, "");

        // Incomplete answer
        if (answerUser.length !== countryName.length) {
            showResponse(
                "incomplete",
                document.getElementsByClassName("homepage")[0]
            );
            return new NewGame(
                this.modifyProperty({
                    lastResponseStatus: false,
                })
            );
        }

        // Incorrect answer
        if (answerUser !== countryName) {
            showResponse(
                "incorrect",
                document.getElementsByClassName("homepage")[0]
            );
            return new NewGame(
                this.modifyProperty({
                    lastResponseStatus: false,
                })
            );
        }

        // Correct answer
        showResponse("correct", document.getElementsByClassName("homepage")[0]);
        this.elementsHtml.correctAnswerSpan[0].textContent = `${
            this.correctAnswers + 1
        }/10`;

        let newState = this.modifyProperty({
            answerUser: "",
            correctAnswers: this.correctAnswers + 1,
            lastResponseStatus: true,
        });

        return new NewGame(newState);
    }

    modifyProperty(state = {}) {
        let result = {};

        for (let property in this) {
            result[property] = this[property];
        }

        for (let property in state) {
            result[property] = state[property];
        }

        return result;
    }

    showResults(timeElapsed) {
        let body = document.getElementsByClassName("homepage")[0];
        this.insertAnswerResults(body, this.correctAnswers, timeElapsed);
        this.deleteAllLetters(this.elementsHtml.answerLetters);
    }

    showNewFlag() {
        this.elementsHtml.flagImg[0].src =
            this.countries[this.correctAnswers].flagUrl;
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

    static innerLetterElements(countryName, element) {
        let textHtml = "";
        for (let i = 0; i < countryName.length; i++) {
            if (countryName[i] === " ") {
                textHtml += '<div class="game__answer-letter--space"></div>';
                continue;
            }
            textHtml += '<div class="game__answer-letter"></div>';
        }
        element.innerHTML = textHtml;
    }
}
