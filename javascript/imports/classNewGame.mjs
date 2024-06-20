import { getRandomCountries } from "./countryDataManajerJson.mjs";
import { getRandomCountrieClues } from "./countryDataManajerJson.mjs";

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

async function getData(continent, quantity, url) {
   let result = await getRandomCountries(continent, quantity, url);
   return result;
}

export class NewGame {
   constructor(
      countriesData,
      answerUser = "",
      correctAnswers = 0,
      lastResponseStatus = false
   ) {
      this.countries = countriesData;
      this.answerUser = answerUser;
      this.correctAnswers = correctAnswers;
      this.lastResponseStatus = lastResponseStatus;
   }

   static async create(continent, quantity, url) {
      let countries = await getData(continent, quantity, url);
      return new NewGame(countries);
   }

   modifyAnswer(pressedKey) {
      let currentAnswer,
         countryName = this.countries[0].name.toLowerCase().replace(/\s/g, "");

      // Delete letter
      if (pressedKey === "backspace") {
         if (this.answerUser.length === 0) {
            return new NewGame(this.countries);
         }
         currentAnswer = this.answerUser.slice(0, this.answerUser.length - 1);
         return new NewGame(
            this.countries,
            currentAnswer,
            this.correctAnswers,
            this.lastResponseStatus
         );
      }

      // completed word
      if (this.answerUser.length === countryName.length) {
         return new NewGame(
            this.countries,
            this.answerUser,
            this.correctAnswers,
            this.lastResponseStatus
         );
      }

      if (this.answerUser.length === countryName.length) {
         return new NewGame(
            this.countries,
            this.answerUser,
            this.correctAnswers,
            this.lastResponseStatus
         );
      }

      currentAnswer = this.answerUser + pressedKey;
      return new NewGame(
         this.countries,
         currentAnswer,
         this.correctAnswers,
         this.lastResponseStatus
      );
   }

   verifyAnswer(answerUser, countryName) {
      countryName = countryName.toLowerCase().replace(/\s/g, "");

      // Incomplete answer
      if (answerUser.length !== countryName.length) {
         return new NewGame(
            this.countries,
            this.answerUser,
            this.correctAnswers,
            false
         );
      }

      // Incorrect answer
      if (answerUser !== countryName) {
         return new NewGame(
            this.countries,
            this.answerUser,
            this.correctAnswers,
            false
         );
      }

      return new NewGame(
         this.countries.slice(1, this.countries.length),
         this.answerUser,
         this.correctAnswers + 1,
         true
      );
   }

   nextCountry() {
      let first = this.countries[0];
      let result = this.countries.slice(1, this.countries.length);
      result.push(first);

      return new NewGame(
         result,
         this.answerUser,
         this.correctAnswers,
         this.lastResponseStatus
      );
   }

   resetAnswerUser() {
      return new NewGame(
         this.countries,
         "",
         this.correctAnswers,
         this.lastResponseStatus
      );
   }
}

export class MultipleChoice {
   constructor(
      countriesData,
      answerUser = "",
      correctAnswers = 0,
      lastResponseStatus = false
   ) {
      this.countries = countriesData;
      this.answerUser = answerUser;
      this.correctAnswers = correctAnswers;
      this.lastResponseStatus = lastResponseStatus;
   }

   static async create(continent, quantity, url) {
      let countries = await getData(continent, quantity, url);
      return new MultipleChoice(countries);
   }

   modifyAnswer(pressedKey) {
      let currentAnswer = pressedKey;
      return new MultipleChoice(
         this.countries,
         currentAnswer,
         this.correctAnswers,
         this.lastResponseStatus
      );
   }

   verifyAnswer(answerUser, countryName) {
      countryName = countryName.toLowerCase().replace(/\s/g, "");

      // Incomplete answer
      if (answerUser.length !== countryName.length) {
         return new MultipleChoice(
            this.countries,
            this.answerUser,
            this.correctAnswers,
            false
         );
      }

      // Incorrect answer
      if (answerUser !== countryName) {
         return new MultipleChoice(
            this.countries,
            this.answerUser,
            this.correctAnswers,
            false
         );
      }

      return new MultipleChoice(
         this.countries.slice(1, this.countries.length),
         this.answerUser,
         this.correctAnswers + 1,
         true
      );
   }

   nextCountry() {
      let first = this.countries[0];
      let result = this.countries.slice(1, this.countries.length);
      result.push(first);

      return new MultipleChoice(
         result,
         this.answerUser,
         this.correctAnswers,
         this.lastResponseStatus
      );
   }

   resetAnswerUser() {
      return new MultipleChoice(
         this.countries,
         "",
         this.correctAnswers,
         this.lastResponseStatus
      );
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
