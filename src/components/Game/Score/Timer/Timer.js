import { ACTIONS } from "@constants/action-types.js";

import { formatTime } from "@utils/format-time.js";

import htmlString from "@components/Game/Score/Timer/template.html?raw";

// Styles
import "@components/Game/Score/Timer//style.css";

import {
  base,
  modifiers,
} from "@components/Game/Score/Timer/Timer-class-names.js";
import BaseComponent from "@shared/Base-component.js";

export default class Timer extends BaseComponent {
  constructor(state, dispatch) {
    super();
    this.htmlString = htmlString;
    this.base = base;
    this.modifiers = modifiers;
    this.state = state;
    this.dispatch = dispatch;
    this.dom = this._createDom();

    this._rafId = null;
    this._elapsed = 0;
    this._timeElapsed = 0;
    this._paused = false;
    this._start = null;

    this._totalTime = 0;

    // enlazar animate para poder usarlo en resume
    this._animate = this._animate.bind(this);
  }

  syncState(state) {
    // Pausar
    if (state.game.timer.pause) {
      this.pause();
      this.dispatch({ type: ACTIONS.CLEAR_PAUSE_TIMER });
    }

    // Reset
    if (state.game.timer.reset !== this.state.game.timer.reset) {
      this.reset(state.game.timer.time);
    }

    // Aplicar penalización
    if (state.game.timer.discount != this.state.game.timer.discount) {
      if (state.game.timer.discount) {
        let penalty = 0;
        const secondsLeft = this._ascending
          ? Math.floor(this._duration ? this._elapsed : 0) // seguro
          : Math.ceil(this._duration - this._elapsed);

        if (secondsLeft >= 8) penalty = 2;
        else if (secondsLeft >= 5) penalty = 2;
        else penalty = 1;

        if (this._ascending) {
          this._timeElapsed = Math.max(0, this._timeElapsed - penalty);
        } else {
          this._timeElapsed = Math.min(
            this._duration,
            this._timeElapsed + penalty
          );
        }
      }
    }

    // Pausar
    if (state.game.completed != this.state.game.completed) {
      if (state.game.completed) this.pause();
    }

    this.state = state;
  }

  init(state) { }

  startTimer(
    duration,
    ascending = false,
    colors = ["#9ED2FF", "#00b0f8", "#0088c2", "#001f31"],
    weights,
    limit = 600,
    cycle = 60
  ) {
    const steps = colors.length - 1;
    if (!weights || weights.length !== steps)
      weights = Array(steps).fill(1 / steps);

    const checkpoints = weights.reduce((acc, w, i) => {
      acc.push((acc[i - 1] || 0) + w);
      return acc;
    }, []);

    this._duration = duration;
    this._ascending = ascending;
    this._colors = colors;
    this._weights = weights;
    this._limit = limit;
    this._cycle = cycle;
    this._checkpoints = checkpoints;
    this._steps = steps;

    this._start = null;
    this._rafId = requestAnimationFrame(this._animate);
  }

  _animate(timestamp) {
    const progress = this.dom.querySelector(".timer__progress");
    const points = this.dom.querySelector(".timer__points");

    if (!this._start) this._start = timestamp;

    const elapsedSinceStart = (timestamp - this._start) / 1000;

    if (!this._paused) {
      this._elapsed = this._timeElapsed + elapsedSinceStart;
    }

    const elapsed = this._elapsed;

    // ------------------- Modo infinito -------------------
    if (this._duration === -1) {
      const seconds = Math.floor(elapsed);

      if (this._limit && seconds >= this._limit) {
        points.textContent = formatTime(this._limit);
        progress.style.transform = "scaleX(1)";
        progress.style.background = this._colors[this._colors.length - 1];

        this.dispatch({ type: ACTIONS.SET_ANSWER, payload: null });
        if (this.state.game.mode === "multiple-choice") {
          this.dispatch({ type: ACTIONS.SEND_NOT_ANSWER_MULTIPLE_CHOICE });
        } else {
          this.dispatch({ type: ACTIONS.SEND_NOT_ANSWER });
        }

        this.dispatch({ type: ACTIONS.GAME_COMPLETED });

        return;
      }

      points.textContent = formatTime(seconds);

      const cycleRatio = (elapsed % this._cycle) / this._cycle;
      progress.style.transform = `scaleX(${cycleRatio})`;

      let color = this._colors[this._colors.length - 1];
      for (let i = 0; i < this._steps; i++) {
        const startChk = i === 0 ? 0 : this._checkpoints[i - 1];
        const endChk = this._checkpoints[i];
        if (cycleRatio <= endChk) {
          const t = (cycleRatio - startChk) / (endChk - startChk);
          color = interpolateColor(
            this._colors[i],
            this._colors[i + 1] || this._colors[i],
            t
          );
          break;
        }
      }
      progress.style.background = color;

      this._rafId = requestAnimationFrame(this._animate);
      return;
    }

    // ------------------- Modo normal -------------------
    const ratio = Math.min(elapsed / this._duration, 1);
    const value = this._ascending ? ratio : 1 - ratio;
    progress.style.transform = `scaleX(${value})`;

    let color = this._colors[this._colors.length - 1];
    for (let i = 0; i < this._steps; i++) {
      const startChk = i === 0 ? 0 : this._checkpoints[i - 1];
      const endChk = this._checkpoints[i];
      if (ratio <= endChk) {
        const t = (ratio - startChk) / (endChk - startChk);
        color = interpolateColor(
          this._colors[i],
          this._colors[i + 1] || this._colors[i],
          t
        );
        break;
      }
    }
    progress.style.background = color;

    const secondsLeft = this._ascending
      ? Math.floor(elapsed)
      : Math.ceil(this._duration - elapsed);
    points.textContent = formatTime(secondsLeft);

    if (elapsed < this._duration) {
      this._rafId = requestAnimationFrame(this._animate);
    } else {
      points.textContent = this._ascending
        ? formatTime(this._duration)
        : "00:00";
      progress.style.background = this._colors[this._colors.length - 1];

      this.dispatch({ type: ACTIONS.SET_ANSWER, payload: null });
      if (this.state.game.mode === "multiple-choice") {
        this.dispatch({ type: ACTIONS.SEND_NOT_ANSWER_MULTIPLE_CHOICE });
      } else {
        this.dispatch({ type: ACTIONS.SEND_NOT_ANSWER });
      }

      this.dispatch({ type: ACTIONS.GAME_COMPLETED });
    }
  }

  pause() {
    if (this._paused) return;
    this._paused = true;
    if (this._rafId) {
      cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }

    const now = performance.now();
    this._timeElapsed += (now - this._start) / 1000;
    this._start = null; // opcional, pero deja más claro que está pausado
  }


  resume() {
    if (!this._paused) return;
    this._paused = false;
    this._start = performance.now();
    this._rafId = requestAnimationFrame(this._animate);
  }

  reset(time) {
    this._paused = false;
    this._elapsed = 0;
    this._timeElapsed = 0;
    const progress = this.dom.querySelector(".timer__progress");
    const points = this.dom.querySelector(".timer__points");
    progress.style.transform = "scaleX(0)";
    points.textContent = "00:00";
    if (this._rafId) cancelAnimationFrame(this._rafId);

    this.startTimer(
      time,
      false,
      ["#9ED2FF", "#00b0f8", "#0088c2", "#001f31"],
      [0.5, 0.3, 0.15]
    );
  }
}

function interpolateColor(c1, c2, t) {
  const c1rgb = parseInt(c1.slice(1), 16);
  const c2rgb = parseInt(c2.slice(1), 16);
  const r = Math.round(
    ((c1rgb >> 16) & 0xff) +
    t * (((c2rgb >> 16) & 0xff) - ((c1rgb >> 16) & 0xff))
  );
  const g = Math.round(
    ((c1rgb >> 8) & 0xff) + t * (((c2rgb >> 8) & 0xff) - ((c1rgb >> 8) & 0xff))
  );
  const b = Math.round((c1rgb & 0xff) + t * ((c2rgb & 0xff) - (c1rgb & 0xff)));
  return `rgb(${r},${g},${b})`;
}
