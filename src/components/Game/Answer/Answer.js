import { GAME_MODES } from "@constants/game-modes.js";


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


    // Recalcular tamaño de letras al redimensionar ventana
    window.addEventListener("resize", () => this._resizeLetters());
  }

  syncState(state) {

    if (state.game.answer == null || state.game.mode === GAME_MODES.CLASSIC) {
      this.state = state;
      return;
    }

    // if (state.game.mode === GAME_MODES.CHALLENGE && state.game.isSkipped) {
    //   this._showCorrectAnswer(state);
    // }

    // 🔹 Si el país, continente o modo cambió, o hubo un salto de más de 1
    if (state.game.newGameId !== this.state.game.newGameId ||
      state.game.countryIndex !== this.state.game.countryIndex
    ) {
      this._clearTextOfLetters();
      this._renderLetters(state);
      // ✅ Esperar al siguiente frame antes de redimensionar
      requestAnimationFrame(() => this._resizeLetters());
    } else {
      this._insertAnswer(state);
    }

    this.state = state;
  }

  _init(state) {
    const row1 = this.dom.querySelector("." + this.base.row1);
    const row2 = this.dom.querySelector("." + this.base.row2);

    const country = state.game.countries[state.game.countryIndex];
    const [firstWord, secondWord = ""] = country.split(" ");

    // Crear letras primera palabra
    for (let i = 0; i < firstWord.length; i++) {
      row1.appendChild(
        elt("div", { className: this.base.letter }, elt("span", { className: this.base.letterText }))
      );
    }

    row1.querySelector("." + this.base.letter)?.classList.add(this.modifiers.selected.letter);

    // Crear letras segunda palabra si existe
    if (secondWord.length) row2.classList.add(this.modifiers.show.row);
    for (let i = 0; i < secondWord.length; i++) {
      row2.appendChild(
        elt("div", { className: this.base.letter }, elt("span", { className: this.base.letterText }))
      );
    }
  }

  _insertAnswer(state) {
    const newAnswer = state.game.answer ?? "";
    const oldAnswer = this.state.game.answer ?? "";

    const letters = this.dom.querySelectorAll("." + this.base.letter);
    const size = newAnswer.length - oldAnswer.length;

    if (size > 0 && letters[newAnswer.length - 1]) {
      letters[newAnswer.length - 1].querySelector("." + this.base.letterText).textContent =
        newAnswer[newAnswer.length - 1];
      this._changeSelected(newAnswer.length);
      this._changeInserted(newAnswer.length - 1);
    } else if (size < 0 && letters[newAnswer.length]) {
      letters[newAnswer.length].querySelector("." + this.base.letterText).textContent = " ";
      this._changeSelected(newAnswer.length);
    }
  }

  _renderLetters(state) {
    const row1 = this.dom.querySelector("." + this.base.row1);
    let row2 = this.dom.querySelector("." + this.base.row2);

    const newCountry = state.game.countries[state.game.countryIndex];
    const [newFirst, newSecond = ""] = newCountry.split(" ");

    this._adjustRowLetters(row1, newFirst.length);

    if (newSecond.length) {
      if (!row2) {
        row2 = elt("div", { className: `answer__row ${this.base.row2}` });
        this.dom.querySelector(".answer__container")?.appendChild(row2);
      }
      this._adjustRowLetters(row2, newSecond.length);
      row2.classList.add(this.modifiers.show.row);
    } else if (row2) {
      row2.textContent = "";
      row2.classList.remove(this.modifiers.show.row);
    }

    this._changeSelected(0);
  }


  _adjustRowLetters(row, newLength) {
    const currentLength = row.children.length;

    if (newLength > currentLength) {
      for (let i = currentLength; i < newLength; i++) {
        row.appendChild(
          elt(
            "div",
            { className: this.base.letter },
            elt("span", { className: this.base.letterText })
          )
        );
      }
    } else if (newLength < currentLength) {
      for (let i = currentLength - 1; i >= newLength; i--) {
        row.children[i]?.remove();
      }
    }
  }


  _clearTextOfLetters() {
    this.dom.querySelectorAll("." + this.base.letterText).forEach((text) => (text.textContent = ""));
  }

  _changeSelected(curIndex) {
    const letters = this.dom.querySelectorAll("." + this.base.letter);
    this.dom.querySelector("." + this.modifiers.selected.letter)?.classList.remove(this.modifiers.selected.letter);
    letters[curIndex]?.classList.add(this.modifiers.selected.letter);
  }

  _changeInserted(index) {
    const letters = this.dom.querySelectorAll("." + this.base.letter);
    letters[index].classList.add(this.modifiers.insert.letter);
    letters[index].addEventListener(
      "animationend",
      () => letters[index].classList.remove(this.modifiers.insert.letter),
      { once: true }
    );
  }

  // NUEVO: Redimensiona las letras según el ancho del contenedor
  _resizeLetters() {
    const rows = [this.dom.querySelector("." + this.base.row1), this.dom.querySelector("." + this.base.row2)].filter(Boolean);
    if (!rows.length) return;

    const maxLetterSize = 40; // px
    const gap = parseInt(getComputedStyle(rows[0]).gap) || 4;

    // 1️⃣ Encontrar la fila con más elementos
    const maxElements = Math.max(...rows.map(row => row.children.length));

    // 2️⃣ Calcular tamaño según la fila más ancha
    rows.forEach(row => {
      const containerWidth = row.clientWidth;
      const totalGap = gap * (maxElements - 1); // usar maxElements
      const letterSize = Math.min(maxLetterSize, (containerWidth - totalGap) / maxElements);

      // 3️⃣ Aplicar tamaño a todas las letras de todas las filas
      rows.forEach(r => {
        Array.from(r.children).forEach(letter => {
          letter.style.width = `${letterSize}px`;
          letter.style.height = `${letterSize}px`;
          letter.style.flex = `0 0 ${letterSize}px`;
          const span = letter.querySelector("." + this.base.letterText);
          if (span) {
            span.style.fontSize = `${Math.floor(letterSize * 0.5)}px`;
          }
        });
      });
    });
  }

  // Método para mostrar la respuesta correcta en los cubos
  _showCorrectAnswer(state) {
    const userAnswer = state.game.answer ?? "";
    const country = state.game.countries[state.game.countryIndex];
    const [firstWord, secondWord = ""] = country.split(" ");

    const correctAnswer = (firstWord + secondWord).toUpperCase(); // todo junto para comparar
    const letters = this.dom.querySelectorAll("." + this.base.letterText);

    letters.forEach((span, i) => {
      const userChar = userAnswer[i]?.toUpperCase() ?? "";
      const correctChar = correctAnswer[i] ?? "";

      if (userChar && userChar !== correctChar) {
        // Letra incorrecta del usuario → rojo
        span.textContent = userChar;
        span.style.color = "#a33b3b"; // rojo similar a tu score fail
      }

      if (correctChar && userChar !== correctChar) {
        // Mostrar letra correcta en verde suave
        const float = document.createElement("span");
        float.className = "timer-float"; // reutilizar estilo flotante si querés
        float.textContent = correctChar;
        float.style.color = "#2f8143"; // verde similar a tu score success
        float.style.position = "absolute";
        float.style.top = "-5px";
        float.style.left = "50%";
        float.style.transform = "translateX(-50%)";
        float.style.fontWeight = "700";
        float.style.opacity = 0;
        float.style.transition = "opacity 0.3s ease, top 0.3s ease";
        span.parentElement.appendChild(float);

        requestAnimationFrame(() => {
          float.style.opacity = 1;
          float.style.top = "-25px";
        });

        setTimeout(() => {
          float.remove();
          // TODO: poner acá la parte que llama al dispatch después de haber ejecutado la animación al igual que la animación que muestra las respuestas correctas en GameOptions en los modos multiple-choice
        }, 1200);
      }
    });
  }

}
