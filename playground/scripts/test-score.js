import "@styles/global.css";
import Score from "@components/Game/Score/Score.js";

let state = {
  game: {
    correctAnswers: 0,
    remainingAnswers: 10,
  },
};

let score = new Score(state);

document.body.prepend(score.dom);

setTimeout(() => {
  score.syncState({
    game: {
      correctAnswers: 1,
      remainingAnswers: 9,
    },
  });
}, 1500);
