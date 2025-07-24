import htmlString from "@components/Response-type/template.html?raw";

// Styles
import "@components/Response-type/style.css";

import { base } from "@components/Response-type/Response-type-class-names.js";
import BaseComponent from "@shared/Base-component.js";

export default class ResponseType extends BaseComponent {
  constructor(dispatch) {
    super();
    this.htmlString = htmlString;
    this.base = base;
    this.dom = this._createDom();
    this.dispatch = dispatch;
  }

  syncState(state) {
    if (state.game.responseType.isActive) {
      this.dispatch({
        game: {
          responseType: {
            isActive: false,
            message: "",
          },
        },
      });
      
      this.modifyMessage(state.game.responseType.message);

      // Animacion
      let container = this.dom.querySelector(".response-type_container");
      this.dom.classList.add("response-type--show");
      container.classList.add("response-type_container--show");

      setTimeout(() => {
        container.classList.add("response-type_container--hidden");
        container.addEventListener(
          "animationend",
          () => {
            this.dom.classList.remove("response-type--show");
            container.classList.remove("response-type_container--show");
            container.classList.remove("response-type_container--hidden");
          },
          { once: true }
        );
      }, 2000);
    }
  }

  modifyMessage(message) {
    const messageElement = this.dom.querySelector(".response-type_message");
    if (messageElement) {
      messageElement.textContent = message;
    }
  }
}
