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
        ui: {
          responseType: {
            isActive: false,
            close: true,
            message: "",
          },
        },
      },
      { top: "5px", right: "5px" }
    );
    this.dispatch = dispatch;
  }

  syncState(state) {
    // isActive indica si se ya se creó o existe una notificación.
    if (state.ui.responseType.isActive) {
      // Si no hay notificaciones, se agrega una nueva
      // Si ya hay una notificación, se actualiza el mensaje
      if (this.dom.querySelectorAll("." + this.base.notification).length == 0) {
        this.addNotification(state.ui.responseType.message, state);
      } else {
        this.removeNotification();
        this.addNotification(state.ui.responseType.message, state);
      }
    } else {
      let notification = this.dom.querySelector("." + this.base.notification);

      if (state.ui.responseType.close) {
        notification.classList.add(this.modifiers.hidden.notification);
        notification.addEventListener(
          "animationend", // Usá "transitionend" si estás usando transition en CSS
          () => {
            this.removeNotification();
            this.notificationTimeout = null; // Limpiar referencia
            this.dispatch({
              ui: {
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

    this.state = state;
  }

  addNotification(message) {
    this.dispatch({
      ui: {
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
    this.closeButton.hide(); // Ocultar el botón de cerrar inicialmente

    newNotification.addEventListener("mouseenter", () => {
      // Cambiarlo por propiedad del componente
      this.mouseenter = true;
      this.closeButton.show(); // Mostrar el botón de cerrar al pasar el mouse
    });

    newNotification.addEventListener("mouseleave", () => {
      // Cambiarlo por propiedad del componente
      this.mouseenter = false;
      this.closeButton.hide(); // Ocultar el botón de cerrar al salir el mouse

      // Programar animación de salida
      this.notificationTimeout = notificationTimeout(this, newNotification);
    });

    this.dom.appendChild(newNotification);

    // Animación de entrada
    newNotification.classList.add(this.modifiers.show.notification);

    // Programar animación de salida
    this.notificationTimeout = notificationTimeout(this, newNotification); // Tiempoantes de empezar a ocultarla
  }

  removeNotification() {
    let notification = this.dom.querySelector("." + this.base.notification);
    if (notification) {
      notification.remove();
    }
  }
}

function notificationTimeout(componentInstance, notificationElement) {
  return setTimeout(() => {
    if (componentInstance.mouseenter) {
      return; // No ocultar si el mouse está encima
    }

    notificationElement.classList.add(
      componentInstance.modifiers.hidden.notification
    );

    notificationElement.addEventListener(
      "animationend",
      () => {
        componentInstance.removeNotification();
        componentInstance.notificationTimeout = null;
      },
      { once: true }
    );
  }, 2000);
}
