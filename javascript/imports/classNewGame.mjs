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
         countryName = this.countries[this.correctAnswers].name
            .toLowerCase()
            .replace(/\s/g, "");

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
}
