import { getRandomCountries } from "@utils/countryDataManajerJson.mjs";
import { getRandomCountrieClues } from "@utils/countryDataManajerJson.mjs";

async function getDataClues(continent, url) {
   let result = await getRandomCountrieClues(continent, url);
   return result;
}

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
      lastResponseStatus = false,
      countriesShown = 0
   ) {
      this.countries = countriesData;
      this.answerUser = answerUser;
      this.correctAnswers = correctAnswers;
      this.lastResponseStatus = lastResponseStatus;
      this.countriesShown = countriesShown;
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
         this.lastResponseStatus,
         this.countriesShown
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
            false,
            this.countriesShown
         );
      }

      // Incorrect answer
      if (answerUser !== countryName) {
         return new MultipleChoice(
            this.countries,
            this.answerUser,
            this.correctAnswers,
            false,
            this.countriesShown
         );
      }

      return new MultipleChoice(
         this.countries.slice(1, this.countries.length),
         this.answerUser,
         this.correctAnswers + 1,
         true,
         this.countriesShown
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
         this.lastResponseStatus,
         this.countriesShown + 1
      );
   }

   resetAnswerUser() {
      return new MultipleChoice(
         this.countries,
         "",
         this.correctAnswers,
         this.lastResponseStatus,
         this.countriesShown
      );
   }
}

export class Clues {
   constructor(
      countriesData,
      answerUser = "",
      lastResponseStatus = false,
      shownClues = 1,
      currentClue = 0
   ) {
      this.countries = countriesData;
      this.answerUser = answerUser;
      this.lastResponseStatus = lastResponseStatus;
      this.shownClues = shownClues;
      this.currentClue = currentClue;
   }

   modifyAnswer(pressedKey, lastAnswer) {
      let currentAnswer,
         countryName = this.countries[0].name.toLowerCase().replace(/\s/g, "");

      // Delete letter
      if (pressedKey === "backspace") {
         if (this.answerUser.length === 0) {
            return new Clues(
               this.countries,
               this.answerUser,
               this.lastResponseStatus,
               this.shownClues,
               this.currentClue
            );
         }
         currentAnswer = lastAnswer.slice(0, lastAnswer.length - 1);
         return new Clues(
            this.countries,
            currentAnswer,
            this.lastResponseStatus,
            this.shownClues,
            this.currentClue
         );
      }

      // completed word
      if (this.answerUser.length === countryName.length) {
         return new Clues(
            this.countries,
            this.answerUser,
            this.lastResponseStatus,
            this.shownClues,
            this.currentClue
         );
      }

      currentAnswer = lastAnswer + pressedKey;
      return new Clues(
         this.countries,
         currentAnswer,
         this.lastResponseStatus,
         this.shownClues,
         this.currentClue
      );
   }

   verifyAnswer(answerUser, countryName) {
      countryName = countryName.toLowerCase().replace(/\s/g, "");

      // Incomplete answer
      if (answerUser.length !== countryName.length) {
         return new Clues(
            this.countries,
            this.answerUser,
            false,
            this.shownClues + 1,
            this.currentClue
         );
      }

      // Incorrect answer
      if (answerUser !== countryName) {
         return new Clues(
            this.countries,
            this.answerUser,
            false,
            this.shownClues + 1,
            this.currentClue
         );
      }

      return new Clues(
         this.countries,
         this.answerUser,
         true,
         this.shownClues,
         this.currentClue
      );
   }

   resetAnswerUser() {
      return new Clues(
         this.countries,
         (this.answerUser = ""),
         this.lastResponseStatus,
         this.shownClues,
         this.currentClue
      );
   }

   addShownClue() {
      return new Clues(
         this.countries,
         this.answerUser,
         this.lastResponseStatus,
         this.shownClues + 1,
         this.currentClue
      );
   }

   addCurrentClue() {
      return new Clues(
         this.countries,
         this.answerUser,
         this.lastResponseStatus,
         this.shownClues,
         this.currentClue + 1
      );
   }

   substractCurrentClue() {
      return new Clues(
         this.countries,
         this.answerUser,
         this.lastResponseStatus,
         this.shownClues,
         this.currentClue - 1
      );
   }

   static async create(continent, url) {
      let countries = await getDataClues(continent, url);
      return new Clues(countries);
   }
}
