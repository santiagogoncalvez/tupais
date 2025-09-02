import htmlString from "@Modal/Game-over/Statistics/template.html?raw";

// Styles
import "@Modal/Game-over/Statistics/style.css";

import {
  base,
  modifiers,
} from "@Modal/Game-over/Statistics/Statistics-class-names.js";
import BaseComponent from "@shared/Base-component.js";

export default class Statistics extends BaseComponent {
  constructor(state) {
    super();
    this.htmlString = htmlString;
    this.base = base;
    this.modifiers = modifiers;
    this.state = state;
    this.dom = this._createDom();
  }

  syncState(state) {
    if (state.ui.modals.gameOver.show != this.state.ui.modals.gameOver.show) {
      const gamesPlayed = this.dom.querySelector(
        ".statistics__score--games-played"
      );
      const gamesWon = this.dom.querySelector(".statistics__score--games-won");
      const currentStreak = this.dom.querySelector(
        ".statistics__score--current-streak"
      );
      const bestStreak = this.dom.querySelector(
        ".statistics__score--best-streak"
      );

      gamesPlayed.querySelector(".statistics__data").textContent =
        state.stats.gamesPlayed;
      gamesWon.querySelector(".statistics__data").textContent = winRate({
        played: state.stats.gamesPlayed,
        wins: state.stats.gamesWon,
        losses: state.stats.gamesLost,
      }) + "%";
      currentStreak.querySelector(".statistics__data").textContent =
        state.stats.currentStreak;
      bestStreak.querySelector(".statistics__data").textContent =
        state.stats.bestStreak;

      console.log("Perdidas:", state.stats.gamesLost);
    }
    this.state = state;
  }
}

function winRate({ played, wins, losses, draws = 0 }, decimals = 1) {
  // Si no pasás played, lo calculamos con lo disponible
  if (played == null) {
    played = (wins ?? 0) + (losses ?? 0) + (draws ?? 0);
  }

  if (!played) return 0;

  const rate = (wins / played) * 100;
  return Number(rate.toFixed(decimals)); // ej: 63.6
}
