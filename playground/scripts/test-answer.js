import "@styles/global.css";
import Answer from "@components/Answer/Answer.js";

let state = {
  game: {
    country: "islas malvinas",
    answer: "",
  },
};

let answer = new Answer(state);

document.body.prepend(answer.dom);
answer.syncState({ game: { answer: "islas" } });
