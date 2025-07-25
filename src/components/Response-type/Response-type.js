// Popup que muestra el tipo de respuesta
import htmlString from "@components/Response-type/template.html?raw";

// Styles
import "@components/Response-type/style.css";

import elt from "@utils/elt.js";
import {
  base,
  modifiers,
} from "@components/Response-type/Response-type-class-names.js";
import BaseComponent from "@shared/Base-component.js";

import CloseButton from "@components/Button/Close-button/Close-button.js";

export default class ResponseType extends BaseComponent {
  constructor(dispatch) {
    super();
    this.htmlString = htmlString;
    this.base = base;
    this.modifiers = modifiers;
    this.dom = this._createDom();
    this.closeButton = new CloseButton(
      dispatch,
      {
        game: {
          responseType: {
            isActive: false,
            close: true,
            message: "",
          },
        },
      },
      { top: "3px", right: "3px" }
    );
    this.dispatch = dispatch;
  }

  syncState(state) {
    if (state.game.responseType.isActive) {
      // Si no hay notificaciones, se agrega una nueva
      // Si ya hay una notificación, se actualiza el mensaje
      if (this.dom.querySelectorAll("." + this.base.notification).length == 0) {
        this.addNotification(state.game.responseType.message);
      } else {
        this.removeNotification();
        this.addNotification(state.game.responseType.message);
      }
    } else {
      let notification = this.dom.querySelector("." + this.base.notification);

      if (state.game.responseType.close) {
        notification.classList.add(this.modifiers.hidden.notification);
        notification.addEventListener(
          "animationend", // Usá "transitionend" si estás usando transition en CSS
          () => {
            this.removeNotification();
            this.notificationTimeout = null; // Limpiar referencia
            this.dispatch({
              game: {
                responseType: {
                  isActive: false,
                  close: false,
                  message: "",
                },
              },
            });
          },
          { once: true }
        );
      }
    }
  }

  addNotification(message) {
    this.dispatch({
      game: {
        responseType: {
          isActive: false,
          close: false,
          message: "",
        },
      },
    });

    // Cancelar timeout anterior si existe
    if (this.notificationTimeout) {
      clearTimeout(this.notificationTimeout);
      this.notificationTimeout = null;
    }

    let newNotification = elt(
      "div",
      { className: this.base.notification },
      elt("p", { className: this.base.message }, message),
      this.closeButton.dom
    );

    this.dom.appendChild(newNotification);

    // Animación de entrada
    newNotification.classList.add(this.modifiers.show.notification);

    // Programar animación de salida
    this.notificationTimeout = setTimeout(() => {
      newNotification.classList.add(this.modifiers.hidden.notification);

      newNotification.addEventListener(
        "animationend", // Usá "transitionend" si estás usando transition en CSS
        () => {
          this.removeNotification();
          this.notificationTimeout = null; // Limpiar referencia
        },
        { once: true }
      );
    }, 2000); // Tiempo antes de empezar a ocultarla
  }

  removeNotification() {
    let notification = this.dom.querySelector("." + this.base.notification);
    if (notification) {
      notification.remove();
    }
  }
}
