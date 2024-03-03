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

        // Enter answer
        if (this.typeKey(pressedKey) === "enter") {
            /*remove spaces and convert to lowercase */
            let nameCounty = this.countries[0].name
                .toLowerCase()
                .replace(/\s/g, "");

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
            this.elementsHtml.flagImg.src = this.countries[1].flagUrl;
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
