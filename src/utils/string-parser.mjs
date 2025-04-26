//Módulo string-parser.mjs:
/*
   moreThan2Words
   formatWord
   replaceHyphensWithSpaces
   removeAccents
   removeParentheses
*/
function removeAccents(word) {
   const accentMap = {
      á: "a",
      é: "e",
      í: "i",
      ó: "o",
      ú: "u",
      ü: "u",
      Á: "A",
      É: "E",
      Í: "I",
      Ó: "O",
      Ú: "U",
      Ü: "U",
   };

   return word.replace(/[áéíóúüÁÉÍÓÚÜ]/g, function (match) {
      return accentMap[match];
   });
}

function removeParentheses(text) {
   return text.replace(/\s*\([^)]*\)/g, "").trim();
}

function replaceHyphensWithSpaces(str) {
   return str.replace(/-/g, " ");
}

export function moreThan2Words(str) {
   let words = str.split(" ");
   return words.length >= 3;
}

export function formatWord(word) {
   let formatedWord = replaceHyphensWithSpaces(word);
   formatedWord = removeAccents(formatedWord);
   formatedWord = removeParentheses(formatedWord);

   return formatedWord;
}
