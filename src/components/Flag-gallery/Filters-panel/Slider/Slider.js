import htmlString from "@components/Flag-gallery/Filters-panel/Slider/template.html?raw";
import "@components/Flag-gallery/Filters-panel/Slider/style.css";
import { base, modifiers } from "@components/Flag-gallery/Filters-panel/Slider/Slider-class-names.js";
import BaseComponent from "@shared/Base-component.js";

export default class Slider extends BaseComponent {
  constructor(state, dispatch, min = 0, max = 1402112000, filterAction = null, minGap = 10, maxGap = 1100000000, aceptedDecimals = false) {
    super();
    this.htmlString = htmlString;
    this.base = base;
    this.modifiers = modifiers;
    this.state = state;
    this.dom = this._createDom();

    this.min = min;
    this.max = max;
    this.currentMin = min;
    this.currentMax = max;
    this.minGap = minGap;   // gap absoluto en valores bajos
    this.maxGap = maxGap;

    this.aceptedDecimals = aceptedDecimals;
    // gap relativo en valores altos
    this.filterAction = filterAction;

    this.thumbMin = this.dom.querySelector(".thumb-min");
    this.thumbMax = this.dom.querySelector(".thumb-max");
    this.range = this.dom.querySelector(".slider-range");
    this.labelMin = this.dom.querySelector("#min-label");
    this.labelMax = this.dom.querySelector("#max-label");

    this.inputMin = this.dom.querySelector(".slider-input-min");
    this.inputMax = this.dom.querySelector(".slider-input-max");

    this.dragging = null;

    this.init();
  }

  init() {
    // Ajuste de atributos y eventos
    this.inputMin.setAttribute("min", this.min); // setea el valor mínimo
    this.inputMax.setAttribute("min", this.min);
    this.inputMin.setAttribute("step", this.aceptedDecimals ? "0.01" : "1");
    this.inputMax.setAttribute("step", this.aceptedDecimals ? "0.01" : "1");

    this.updatePositions();

    this.thumbMin.addEventListener("mousedown", e => this.startDrag(e, "min"));
    this.thumbMax.addEventListener("mousedown", e => this.startDrag(e, "max"));

    document.addEventListener("mousemove", e => this.onDrag(e));
    document.addEventListener("mouseup", () => this.stopDrag());

    this.inputMin.addEventListener("change", () => this.onInputChange("min"));
    this.inputMax.addEventListener("change", () => this.onInputChange("max"));
  }

  startDrag(e, type) {
    e.preventDefault();
    this.dragging = type;
    const rect = this.dom.getBoundingClientRect();
    this.startX = e.clientX;
    this.startPercent = type === "min"
      ? this.populationToPosition(this.currentMin)
      : this.populationToPosition(this.currentMax);
    this.sliderRect = rect;
    document.body.style.cursor = "grabbing";
  }

  stopDrag() {
    if (this.dragging) {
      this.dragging = null;
      document.body.style.cursor = "default";
      if (this.filterAction) this.filterAction({ min: this.currentMin, max: this.currentMax });
    }
  }

  onDrag(e) {
    if (!this.dragging) return;

    let deltaPercent = (e.clientX - this.startX) / this.sliderRect.width;
    let newPercent = this.startPercent + deltaPercent;
    newPercent = Math.min(Math.max(newPercent, 0), 1);

    // 👉 si se aceptan decimales no redondeamos
    let value = this.aceptedDecimals
      ? this.positionToPopulation(newPercent)
      : Math.round(this.positionToPopulation(newPercent));

    const minGapPercent =
      this.populationToPosition(this.min + this.minGap) -
      this.populationToPosition(this.min);

    const maxGapPercent =
      this.populationToPosition(this.max) -
      this.populationToPosition(this.max - this.maxGap || this.minGap);

    const minPercent = this.populationToPosition(this.currentMin);
    const maxPercent = this.populationToPosition(this.currentMax);

    if (this.dragging === "min") {
      newPercent = Math.min(newPercent, maxPercent - maxGapPercent);
      newPercent = Math.max(newPercent, 0);
      this.currentMin = this.aceptedDecimals
        ? this.positionToPopulation(newPercent)
        : Math.round(this.positionToPopulation(newPercent));
    } else if (this.dragging === "max") {
      newPercent = Math.max(newPercent, minPercent + minGapPercent);
      newPercent = Math.min(newPercent, 1);
      this.currentMax = this.aceptedDecimals
        ? this.positionToPopulation(newPercent)
        : Math.round(this.positionToPopulation(newPercent));
    }

    this.updatePositions();
  }


  onInputChange(type) {
    if (type === "min") {
      let val = this.aceptedDecimals
        ? parseFloat(this.inputMin.value) || this.min
        : parseInt(this.inputMin.value) || this.min;

      const gap = this.calculateGap(val, this.currentMax);
      val = Math.min(val, this.currentMax - gap);
      val = Math.max(val, this.min);
      this.currentMin = val;
    } else if (type === "max") {
      let val = this.aceptedDecimals
        ? parseFloat(this.inputMax.value) || this.max
        : parseInt(this.inputMax.value) || this.max;

      const gap = this.calculateGap(this.currentMin, val);
      val = Math.max(val, this.currentMin + gap);
      val = Math.min(val, this.max);
      this.currentMax = val;
    }
    this.updatePositions();
    if (this.filterAction) this.filterAction({ min: this.currentMin, max: this.currentMax });
  }

  // 🔹 Gap dinámico entre thumbs según escala logarítmica
  calculateGap(minVal, maxVal) {
    // Para valores bajos usamos minGap
    if (minVal < 100000) return this.minGap;

    // Para valores altos escalamos entre minGap y maxGap logarítmicamente
    const logMin = Math.log(Math.max(minVal, 1));
    const logMax = Math.log(this.max);
    const logRange = logMax - logMin;
    const scaledGap = Math.round(Math.exp(Math.log(minVal) + 0.02 * logRange) - minVal);

    return Math.max(this.minGap, Math.min(this.maxGap, scaledGap));
  }

  updatePositions() {
    const percentMin = this.populationToPosition(this.currentMin) * 100;
    const percentMax = this.populationToPosition(this.currentMax) * 100;

    this.thumbMin.style.left = `${percentMin}%`;
    this.thumbMax.style.left = `${percentMax}%`;

    this.range.style.left = `${percentMin}%`;
    this.range.style.width = `${percentMax - percentMin}%`;

    // 👉 mostrar con decimales o enteros según flag
    this.labelMin.textContent = this.aceptedDecimals
      ? this.currentMin.toFixed(2)
      : this.currentMin.toLocaleString();
    this.labelMax.textContent = this.aceptedDecimals
      ? this.currentMax.toFixed(2)
      : this.currentMax.toLocaleString();

    this.inputMin.value = this.aceptedDecimals
      ? this.currentMin.toFixed(2)
      : this.currentMin;
    this.inputMax.value = this.aceptedDecimals
      ? this.currentMax.toFixed(2)
      : this.currentMax;
  }

  reset() {
    this.currentMin = this.min;
    this.currentMax = this.max;
    this.updatePositions();
  }

  positionToPopulation(percent) {
    if (percent <= 0) return 0;
    const logMin = Math.log(1);
    const logMax = Math.log(this.max);
    const val = Math.exp(logMin + percent * (logMax - logMin));
    return this.aceptedDecimals ? parseFloat(val.toFixed(2)) : Math.round(val);
  }

  populationToPosition(value) {
    if (value <= 0) return 0;
    const logMin = Math.log(1);
    const logMax = Math.log(this.max);
    return (Math.log(value) - logMin) / (logMax - logMin);
  }

  setRange(range) {
    if (!range || typeof range.min !== "number" || typeof range.max !== "number") return;

    this.currentMin = Math.max(this.min, Math.min(range.min, this.max));
    this.currentMax = Math.max(this.min, Math.min(range.max, this.max));

    this.updatePositions();
  }
}
