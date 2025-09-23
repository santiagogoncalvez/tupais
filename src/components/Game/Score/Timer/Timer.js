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

  syncState(state) {
    if (state.game.timer.pause) {
      this.pause();
      this.dispatch({ type: ACTIONS.CLEAR_PAUSE_TIMER });
    }

    if (state.game.timer.reset !== this.state.game.timer.reset) {
      this.reset(state.game.timer.time);
    }

    if (state.game.timer.discount !== this.state.game.timer.discount) {
      if (state.game.timer.discount) {
        let penalty = 0;
        const secondsLeft = this._ascending
          ? Math.floor(this._elapsed)
          : Math.ceil(this._duration - this._elapsed);

        if (secondsLeft >= 8) penalty = 2;
        else if (secondsLeft >= 5) penalty = 2;
        else penalty = 1;

        if (this._ascending) {
          this._timeElapsed = Math.max(0, this._timeElapsed - penalty);
        } else {
          this._timeElapsed = Math.min(this._duration, this._timeElapsed + penalty);
        }

        // ⚡ Reiniciamos _start para que _elapsed se calcule bien
        this._start = performance.now();

        // ⚡ Recalculamos _endTimeout si no es ascendente
        if (!this._ascending && this._duration > 0) {
          if (this._endTimeout) clearTimeout(this._endTimeout);
          const remaining = this._duration - this._timeElapsed;
          this._endTimeout = setTimeout(() => this._finishTimer(), remaining * 1000);
        }
      }
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
    const progress = this.dom.querySelector(".timer__progress");
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
      progress.style.transform = `scaleX(${ratio})`;
      progress.style.background = color;

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

      progress.style.transform = `scaleX(${value})`;
      progress.style.background = color;

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

    const progress = this.dom.querySelector(".timer__progress");
    const points = this.dom.querySelector(".timer__points");
    progress.style.transform = "scaleX(0)";
    points.textContent = "00:00";

    this.startTimer(time, this._ascending, this._colors, this._weights, this._limit, this._cycle);
  }

  _finishTimer() {
    const progress = this.dom.querySelector(".timer__progress");
    const points = this.dom.querySelector(".timer__points");
    points.textContent = this._ascending ? formatTime(this._duration) : "00:00";
    progress.style.transform = "scaleX(1)";
    progress.style.background = this._colors[this._colors.length - 1];

    this.dispatch({ type: ACTIONS.SET_ANSWER, payload: null });
    if (this.state.game.mode === "classic") {
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
