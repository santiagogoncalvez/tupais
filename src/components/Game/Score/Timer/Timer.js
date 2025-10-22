import { GAME_MODES } from "@constants/game-modes.js";

import { ACTIONS } from "@constants/action-types.js";
import { formatTime } from "@utils/format-time.js";
import htmlString from "@components/Game/Score/Timer/template.html?raw";
import "@components/Game/Score/Timer/style.css";
import { base, modifiers } from "@components/Game/Score/Timer/Timer-class-names.js";
import BaseComponent from "@shared/Base-component.js";

export default class Timer extends BaseComponent {
  constructor(state, dispatch) {
    super();
    this.state = state;
    this.dispatch = dispatch;
    this.htmlString = htmlString;
    this.base = base;
    this.modifiers = modifiers;
    this.dom = this._createDom();

    this._rafId = null;
    this._elapsed = 0;
    this._timeElapsed = 0;
    this._paused = false;
    this._start = null;
    this._duration = 0;
    this._ascending = false;
    this._colors = ["#9ED2FF", "#00b0f8", "#0088c2", "#001f31"];
    this._weights = [0.5, 0.3, 0.15];
    this._checkpoints = [];
    this._steps = 0;
    this._limit = 600;
    this._cycle = 60;
    this._endTimeout = null;

    this._animate = this._animate.bind(this);
  }

  // helper: añade clase de animación y opcionalmente muestra un texto flotante
  animateOnce(selector, className, timeout = 1200, message = null) {
    const el = document.querySelector(selector);
    if (!el) return;

    // Reiniciar animación si ya estaba activa
    el.classList.remove(className);
    void el.offsetWidth; // forzar reflow

    requestAnimationFrame(() => {
      el.classList.add(className);

      // Si hay mensaje, crear texto flotante
      if (message) {
        const float = document.createElement("span");
        float.className = `timer-float ${className}`;
        float.textContent = message;
        this.dom.querySelector(".timer__container").appendChild(float);

        // eliminarlo cuando termina la animación
        float.addEventListener("animationend", () => float.remove(), { once: true });
      }

      // limpiar clase principal al finalizar animación
      const onEnd = () => {
        el.classList.remove(className);
        el.removeEventListener("animationend", onEnd);
        clearTimeout(fallback);
      };
      el.addEventListener("animationend", onEnd, { once: true });

      const fallback = setTimeout(() => {
        el.classList.remove(className);
        el.removeEventListener("animationend", onEnd);
      }, timeout + 100);
    });
  }

  // syncState (idéntico a tu versión pero con tiempo de animación más largo)
  syncState(state) {
    if (state.game.timer.pause) {
      this.pause();
      this.dispatch({ type: ACTIONS.CLEAR_PAUSE_TIMER });
    }

    if (state.game.timer.reset !== this.state.game.timer.reset) {
      this.reset(state.game.timer.time);
    }

    const now = performance.now();

    // Descuento de tiempo
    if (state.game.timer.discount !== this.state.game.timer.discount) {
      this._timeElapsed += (now - this._start) / 1000;
      const penalty = state.game.timer.cantDiscount;

      if (this._ascending) {
        this._timeElapsed = Math.max(0, this._timeElapsed - penalty);
      } else {
        this._timeElapsed = Math.min(this._duration, this._timeElapsed + penalty);
      }

      this._start = now;
      if (!this._ascending && this._duration > 0) {
        if (this._endTimeout) clearTimeout(this._endTimeout);
        const remaining = this._duration - this._timeElapsed;
        this._endTimeout = setTimeout(() => this._finishTimer(), remaining * 1000);
      }

      // 💥 animación roja (penalty)
      this.animateOnce(".timer__points", "timer--penalty", 1200, `-${penalty}s`);
    }

    // Aumento de tiempo
    if (state.game.timer.count !== this.state.game.timer.count) {
      this._timeElapsed += (now - this._start) / 1000;
      const bonus = state.game.timer.cantCount;

      if (this._ascending) {
        this._timeElapsed = Math.max(0, this._timeElapsed + bonus);
      } else {
        this._timeElapsed = Math.min(this._duration, this._timeElapsed - bonus);
      }

      this._start = now;
      if (!this._ascending && this._duration > 0) {
        if (this._endTimeout) clearTimeout(this._endTimeout);
        const remaining = this._duration - this._timeElapsed;
        this._endTimeout = setTimeout(() => this._finishTimer(), remaining * 1000);
      }

      // 💚 animación verde (bonus)
      this.animateOnce(".timer__points", "timer--bonus", 1200, `+${bonus}s`);
    }

    if (state.game.completed !== this.state.game.completed) {
      if (state.game.completed) this.pause();
    }

    this.state = state;
  }




  startTimer(duration, ascending = false, colors = ["#9ED2FF", "#00b0f8", "#0088c2", "#001f31"], weights, limit = 600, cycle = 60) {
    this._duration = duration;
    this._ascending = ascending;
    this._colors = colors;
    this._limit = limit;
    this._cycle = cycle;

    // ⚡ Corregido: steps >= 1
    const steps = Math.max(colors.length - 1, 1);
    if (!weights || weights.length !== steps) weights = Array(steps).fill(1 / steps);

    this._weights = weights;
    this._steps = steps;
    this._checkpoints = weights.reduce((acc, w, i) => {
      acc.push((acc[i - 1] || 0) + w);
      return acc;
    }, []);

    this._start = performance.now();
    this._paused = false;

    if (!ascending && duration > 0) {
      clearTimeout(this._endTimeout);
      const remaining = this._duration - this._timeElapsed;
      this._endTimeout = setTimeout(() => this._finishTimer(), remaining * 1000);
    }

    this._rafId = requestAnimationFrame(this._animate);
  }

  _animate() {
    if (this._paused) return;

    const now = performance.now();
    const points = this.dom.querySelector(".timer__points");

    const elapsedSinceStart = (now - this._start) / 1000;
    this._elapsed = this._timeElapsed + elapsedSinceStart;

    let ratio, displayTime;

    if (this._duration === -1) {
      // modo infinito con ciclos
      const cycleRatio = (this._elapsed % this._cycle) / this._cycle;
      ratio = cycleRatio;

      let color = this._colors[this._colors.length - 1];
      for (let i = 0; i < this._steps; i++) {
        const startChk = i === 0 ? 0 : this._checkpoints[i - 1];
        const endChk = this._checkpoints[i];
        if (cycleRatio <= endChk) {
          const t = (cycleRatio - startChk) / (endChk - startChk);
          color = interpolateColor(this._colors[i], this._colors[i + 1] || this._colors[i], t);
          break;
        }
      }

      displayTime = Math.floor(this._elapsed);
      points.textContent = formatTime(displayTime);
    } else {
      ratio = Math.min(this._elapsed / this._duration, 1);
      const value = this._ascending ? ratio : 1 - ratio;

      let color = this._colors[this._colors.length - 1];
      for (let i = 0; i < this._steps; i++) {
        const startChk = i === 0 ? 0 : this._checkpoints[i - 1];
        const endChk = this._checkpoints[i];
        if (ratio <= endChk) {
          const t = (ratio - startChk) / (endChk - startChk);
          color = interpolateColor(this._colors[i], this._colors[i + 1] || this._colors[i], t);
          break;
        }
      }

      displayTime = this._ascending
        ? Math.floor(this._elapsed)
        : Math.ceil(this._duration - this._elapsed);
      points.textContent = formatTime(displayTime);
    }

    if (!this._paused && (this._duration === -1 || this._elapsed < this._duration)) {
      this._rafId = requestAnimationFrame(this._animate);
    }
  }

  pause() {
    if (this._paused) return;
    this._paused = true;

    if (this._rafId) cancelAnimationFrame(this._rafId);
    if (this._endTimeout) clearTimeout(this._endTimeout);

    const now = performance.now();
    this._timeElapsed += (now - this._start) / 1000;
  }

  resume() {
    if (!this._paused) return;
    this._paused = false;
    this._start = performance.now();

    if (!this._ascending && this._duration > 0) {
      clearTimeout(this._endTimeout);
      const remaining = this._duration - this._timeElapsed;
      this._endTimeout = setTimeout(() => this._finishTimer(), remaining * 1000);
    }

    this._rafId = requestAnimationFrame(this._animate);
  }

  reset(time) {
    this._paused = false;
    this._elapsed = 0;
    this._timeElapsed = 0;

    if (this._rafId) cancelAnimationFrame(this._rafId);
    if (this._endTimeout) clearTimeout(this._endTimeout);

    const points = this.dom.querySelector(".timer__points");
    points.textContent = "00:00";

    this.startTimer(time, this._ascending, this._colors, this._weights, this._limit, this._cycle);
  }

  _finishTimer() {
    const points = this.dom.querySelector(".timer__points");
    points.textContent = this._ascending ? formatTime(this._duration) : "00:00";

    this.dispatch({ type: ACTIONS.SET_ANSWER, payload: null });
    if (this.state.game.mode === GAME_MODES.CLASSIC) {
      this.dispatch({ type: ACTIONS.SEND_NOT_ANSWER_CLASSIC });
    } else {
      this.dispatch({ type: ACTIONS.SEND_NOT_ANSWER });
    }

    this.dispatch({ type: ACTIONS.GAME_COMPLETED });
  }
}

// ------------------ Función auxiliar ------------------
function interpolateColor(c1, c2, t) {
  if (!c1) c1 = "#000000"; // fallback por si algo está mal
  if (!c2) c2 = c1;        // si no hay segundo color, usamos el primero

  const c1rgb = parseInt(c1.slice(1), 16);
  const c2rgb = parseInt(c2.slice(1), 16);

  const r = Math.round(((c1rgb >> 16) & 0xff) + t * (((c2rgb >> 16) & 0xff) - ((c1rgb >> 16) & 0xff)));
  const g = Math.round(((c1rgb >> 8) & 0xff) + t * (((c2rgb >> 8) & 0xff) - ((c1rgb >> 8) & 0xff)));
  const b = Math.round((c1rgb & 0xff) + t * ((c2rgb & 0xff) - (c1rgb & 0xff)));

  return `rgb(${r},${g},${b})`;
}
