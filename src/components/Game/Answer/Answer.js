import htmlString from "@components/Game/Answer/template.html?raw";
import "@components/Game/Answer/style.css";
import { base, modifiers } from "@components/Game/Answer/Answer-class-names.js";
import BaseComponent from "@shared/Base-component.js";
import elt from "@utils/elt.js";

export default class Answer extends BaseComponent {
  constructor(state) {
    super();
    this.htmlString = htmlString;
    this.base = base;
    this.modifiers = modifiers;
    this.state = state;
    this.dom = this._createDom();
    this._init(state);
  }

  syncState(state) {
    if (state.game.countryIndex == this.state.game.countryIndex) {
      this._insertAnswer(state);
    } else {
      this._clearTextOfLetters();
      this._renderLetters(state);
    }

    this.state = state;
  }

  _init(state) {
    // Una sola palabra
    const row = this.dom.querySelector("." + this.base.row1);
    const row2 = this.dom.querySelector("." + this.base.row2);

    let country = state.game.countries[state.game.countryIndex];
    let firstWord = country.split(" ")[0];
    let secondWord = country.split(" ")[1] || [];

    // Primera ejecución
    for (let i = 0; i < firstWord.length; i++) {
      row.appendChild(
        elt(
          "div",
          { className: this.base.letter },
          elt("span", { className: this.base.letterText })
        )
      );
    }

    // Seleccionar la primer letra
    row
      .querySelector("." + this.base.letter)
      .classList.add(this.modifiers.selected.letter);

    if (secondWord.length) {
      row2.classList.add(this.modifiers.show.row);
    }
    for (let i = 0; i < secondWord.length; i++) {
      row2.appendChild(
        elt(
          "div",
          { className: this.base.letter },
          elt("span", { className: this.base.letterText })
        )
      );
    }
  }

  _insertAnswer(state) {
    const letters = this.dom.querySelectorAll("." + this.base.letter);
    let size = state.game.answer.length - this.state.game.answer.length;
    if (size > 0) {
      letters[state.game.answer.length - 1].querySelector(
        "." + this.base.letterText
      ).textContent = state.game.answer[state.game.answer.length - 1];
      this._changeSelected(state.game.answer.length);
      this._changeInserted(state.game.answer.length - 1);
    } else if (size < 0) {
      letters[state.game.answer.length].querySelector(
        "." + this.base.letterText
      ).textContent = " ";
      // TODO: definir tipo
      this._changeSelected(state.game.answer.length);
    }
  }

  _renderLetters(state) {
    // Una sola palabra
    const row = this.dom.querySelector("." + this.base.row1);
    const row2 = this.dom.querySelector("." + this.base.row2);

    let oldCountry = this.state.game.countries[this.state.game.countryIndex];
    let oldFirstWord = oldCountry.split(" ")[0];
    let newCountry = state.game.countries[state.game.countryIndex];
    let newFirstWord = newCountry.split(" ")[0];

    let difference = newFirstWord.length - oldFirstWord.length;

    if (difference > 0) {
      for (let i = oldFirstWord.length; i < newFirstWord.length; i++) {
        row.appendChild(
          elt(
            "div",
            { className: this.base.letter },
            elt("span", { className: this.base.letterText })
          )
        );
      }
    } else {
      const letters = Array.from(row.children);
      for (let i = oldFirstWord.length - 1; i > newFirstWord.length - 1; i--) {
        letters[i].remove();
      }
    }

    this._changeSelected(0);

    // Si tiene más de 2 letras.
    let oldSecondWord = oldCountry.split(" ")[1] || [];
    let newSecondWord = newCountry.split(" ")[1] || [];
    if (!oldSecondWord.length && !newSecondWord.length) return;

    if (!newSecondWord.length) {
      row2.textContent = "";
      row2.classList.remove(this.modifiers.show.row);
      return;
    }

    if (newSecondWord.length) {
      row2.classList.add(this.modifiers.show.row);
    }

    this._changeSelected(0);

    difference = newSecondWord.length - oldSecondWord.length;

    if (difference >= 0) {
      let i;
      if (difference == 0) {
        i = 0;
      } else {
        i = oldSecondWord.length;
      }

      for (i; i < newSecondWord.length; i++) {
        row2.appendChild(
          elt(
            "div",
            { className: this.base.letter },
            elt("span", { className: this.base.letterText })
          )
        );
      }
    } else {
      const letters = Array.from(row2.children);
      for (
        let i = oldSecondWord.length - 1;
        i > newSecondWord.length - 1;
        i--
      ) {
        letters[i].remove();
      }
    }
  }

  _clearTextOfLetters() {
    const letterText = this.dom.querySelectorAll("." + this.base.letterText);
    for (let text of letterText) {
      text.textContent = "";
    }
  }

  _changeSelected(curIndex) {
    const letters = this.dom.querySelectorAll("." + this.base.letter);
    this.dom
      .querySelector("." + this.modifiers.selected.letter)
      ?.classList.remove(this.modifiers.selected.letter);
    letters[curIndex]?.classList.add(this.modifiers.selected.letter);
  }

  _changeInserted(index) {
    const letters = this.dom.querySelectorAll("." + this.base.letter);
    letters[index].classList.add(this.modifiers.insert.letter);
    letters[index].addEventListener(
      "animationend",
      () => {
        letters[index].classList.remove(this.modifiers.insert.letter);
      },
      { once: true }
    );
  }
}
