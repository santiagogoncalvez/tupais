/* Structure game:
let stateGame = {
    time: timeStorage,
    continent: gameContinent,
    countries: randomCountries,
    previousAnswerUser: "";
    currentAnswerUser: "",
    correctAnswers: 0,
    lastResponseStatus: true;
};
*/

export class NewGame {
   constructor(state) {
      for (let property in state) {
         this[property] = state[property];
      }
   }

   modifyAnswer(pressedKey, lastAnswer) {
      if (typeof pressedKey !== "string" || typeof lastAnswer !== "string") {
         throw new Error(
            `The arguments are not strings. pressedKey: ${pressedKey}, arrAnswer: ${lastAnswer}`
         );
      }

      let currentAnswer,
         countryName = this.countries[0].name.toLowerCase().replace(/\s/g, "");

      // Delete letter
      if (pressedKey === "backspace") {
         if (this.answerUser.length === 0) {
            return new NewGame(this.modifyProperty());
         }
         currentAnswer = lastAnswer.slice(0, lastAnswer.length - 1);
         return new NewGame(this.modifyProperty({ answerUser: currentAnswer }));
      }

      // completed word
      if (this.answerUser.length === countryName.length) {
         return new NewGame(this.modifyProperty());
      }

      if (this.answerUser.length === countryName.length) {
         return new NewGame(this.modifyProperty());
      }

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
         return new NewGame(
            this.modifyProperty({
               lastResponseStatus: false,
            })
         );
      }

      // Incorrect answer
      if (answerUser !== countryName) {
         return new NewGame(
            this.modifyProperty({
               lastResponseStatus: false,
            })
         );
      }

      // Correct answer
      let newState = this.modifyProperty({
         correctAnswers: this.correctAnswers + 1,
         lastResponseStatus: true,
         countries: this.countries.slice(1, this.countries.length),
      });

      return new NewGame(newState);
   }

   nextCountry() {
      let first = this.countries[0];
      let result = this.countries.slice(1, this.countries.length);
      result.push(first);

      return new NewGame(this.modifyProperty({ countries: result }));
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

   resetAnswerUser() {
      return new NewGame(this.modifyProperty({ answerUser: "" }));
   }
}

export class MultipleChoice {
   constructor(state) {
      for (let property in state) {
         this[property] = state[property];
      }
   }

   modifyAnswer(enteredAnswer) {
      if (typeof enteredAnswer !== "string") {
         throw new Error(
            `The arguments are not strings. enteredAnswer: ${enteredAnswer}`
         );
      }
      return new MultipleChoice(
         this.modifyProperty({
            answerUser: enteredAnswer,
         })
      );
   }

   verifyAnswer(answerUser, countryName) {
      answerUser = answerUser.toLowerCase().replace(/\s/g, "");
      countryName = countryName.toLowerCase().replace(/\s/g, "");

      // Incorrect answer
      if (answerUser !== countryName) {
         return new MultipleChoice(
            this.modifyProperty({
               lastResponseStatus: false,
               countries: this.countries.slice(1, this.countries.length),
            })
         );
      }

      // Correct answer
      let newState = this.modifyProperty({
         correctAnswers: this.correctAnswers + 1,
         lastResponseStatus: true,
         countries: this.countries.slice(1, this.countries.length),
      });

      return new MultipleChoice(newState);
   }

   nextCountry() {
      let first = this.countries[0];
      let result = this.countries.slice(1, this.countries.length);
      result.push(first);

      return new MultipleChoice(this.modifyProperty({ countries: result }));
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

   addCountryShown() {
      return new MultipleChoice(
         this.modifyProperty({ countriesShown: this.countriesShown + 1 })
      );
   }

   resetAnswerUser() {
      return new MultipleChoice(this.modifyProperty({ answerUser: "" }));
   }
}

export class Clues {
   constructor(state) {
      for (let property in state) {
         this[property] = state[property];
      }
   }

   modifyAnswer(pressedKey, lastAnswer) {
      if (typeof pressedKey !== "string" || typeof lastAnswer !== "string") {
         throw new Error(
            `The arguments are not strings. pressedKey: ${pressedKey}, arrAnswer: ${lastAnswer}`
         );
      }

      let currentAnswer,
         countryName = this.countries[0].name.toLowerCase().replace(/\s/g, "");

      // Delete letter
      if (pressedKey === "backspace") {
         if (this.answerUser.length === 0) {
            return new Clues(this.modifyProperty());
         }
         currentAnswer = lastAnswer.slice(0, lastAnswer.length - 1);
         return new Clues(this.modifyProperty({ answerUser: currentAnswer }));
      }

      // completed word
      if (this.answerUser.length === countryName.length) {
         return new Clues(this.modifyProperty());
      }

      if (this.answerUser.length === countryName.length) {
         return new Clues(this.modifyProperty());
      }

      currentAnswer = lastAnswer + pressedKey;
      return new Clues(
         this.modifyProperty({
            answerUser: currentAnswer,
         })
      );
   }

   verifyAnswer(answerUser, countryName) {
      countryName = countryName.toLowerCase().replace(/\s/g, "");

      // Incomplete answer
      if (answerUser.length !== countryName.length) {
         return new Clues(
            this.modifyProperty({
               lastResponseStatus: false,
            })
         );
      }

      // Incorrect answer
      if (answerUser !== countryName) {
         return new Clues(
            this.modifyProperty({
               lastResponseStatus: false,
            })
         );
      }

      // Correct answer
      let newState = this.modifyProperty({
         correctAnswers: this.correctAnswers + 1,
         lastResponseStatus: true,
      });

      return new Clues(newState);
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

   resetAnswerUser() {
      return new Clues(this.modifyProperty({ answerUser: "" }));
   }

   addShownClue() {
      return new Clues(
         this.modifyProperty({ shownClues: this.shownClues + 1 })
      );
   }

   addCurrentClue() {
      return new Clues(
         this.modifyProperty({ currentClue: this.currentClue + 1 })
      );
   }

   substractCurrentClue() {
      return new Clues(
         this.modifyProperty({ currentClue: this.currentClue - 1 })
      );
   }
}
