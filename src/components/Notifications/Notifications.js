import { ACTIONS } from "@constants/action-types.js";

// Popup que muestra el tipo de respuesta
import htmlString from "@components/Notifications/template.html?raw";

// Styles
import "@components/Notifications/style.css";

import elt from "@utils/elt.js";
import {
  base,
  modifiers,
} from "@components/Notifications/Notifications-class-names.js";
import BaseComponent from "@shared/Base-component.js";

import CloseButton from "@components/Button/Close-button/Close-button.js";

const lastAnswerTypeTranslations = {
  Correct: "Correcto",
  Incorrect: "Incorrecto",
  Incomplete: "Respuesta incompleta",
};

export default class Notifications extends BaseComponent {
  constructor(state, dispatch) {
    super();
    this.htmlString = htmlString;
    this.base = base;
    this.modifiers = modifiers;
    this.state = state;
    this.dom = this._createDom();
    this.dispatch = dispatch;

    // Estado interno del componente
    this.mouseenter = false;
    this.notificationTimeout = null;
    this.currentNotification = null;

    // Botón de cerrar
    this.closeButton = new CloseButton(
      dispatch,
      { type: ACTIONS.HIDE_NOTIFICATION }, // "Intención" de cerrar
      { top: "5px", right: "5px" }
    );
  }

  syncState(state) {
    const prevNotif = this.state.ui.notifications;
    const newNotif = state.ui.notifications;

    if (newNotif.show) {
      if (newNotif.id != prevNotif.id) {
        // Limpiar notificación previa
        this.removeNotification();
        // Si se ha solicitado un reset, limpiar notificación previa
        this.showNotification(newNotif.message);
      }
    } else {
      // Ocultar notificación actual
      this.hideNotification();
    }

    this.state = state;
  }

  showNotification(message) {
    // Crear nueva
    this.currentNotification = elt(
      "div",
      { className: this.base.notification },
      elt("p", { className: this.base.message }, lastAnswerTypeTranslations[message]),
      this.closeButton.dom
    );

    this.closeButton.hide();

    // Eventos del mouse
    const onMouseEnter = () => {
      this.mouseenter = true;
      this.closeButton.show();
      this.clearNotificationTimeout();
    };

    const onMouseLeave = () => {
      this.mouseenter = false;
      this.closeButton.hide();
      this.startNotificationTimeout();
    };

    this.currentNotification.addEventListener("mouseenter", onMouseEnter);
    this.currentNotification.addEventListener("mouseleave", onMouseLeave);

    // Guardar referencias para limpiar después
    this._mouseEnterHandler = onMouseEnter;
    this._mouseLeaveHandler = onMouseLeave;

    // Agregar al DOM
    this.dom.appendChild(this.currentNotification);

    // Animación de entrada
    this.currentNotification.classList.add(this.modifiers.show.notification);

    // Iniciar timeout automático
    this.startNotificationTimeout();
  }

  hideNotification() {
    if (!this.currentNotification) return;

    const el = this.currentNotification;
    el.classList.add(this.modifiers.hidden.notification);

    el.addEventListener(
      "animationend",
      () => {
        this.removeNotification();
      },
      { once: true }
    );
  }

  removeNotification() {
    if (!this.currentNotification) return;

    // Limpiar eventos y timeout
    this.currentNotification.removeEventListener(
      "mouseenter",
      this._mouseEnterHandler
    );
    this.currentNotification.removeEventListener(
      "mouseleave",
      this._mouseLeaveHandler
    );
    this.clearNotificationTimeout();

    // Quitar del DOM
    this.currentNotification.remove();
    this.currentNotification = null;
  }

  startNotificationTimeout() {
    this.clearNotificationTimeout();
    this.notificationTimeout = setTimeout(() => {
      if (!this.mouseenter) {
        // Solo avisa que el usuario quiere cerrar
        this.dispatch({ type: ACTIONS.HIDE_NOTIFICATION });
      }
    }, 2000);
  }

  clearNotificationTimeout() {
    if (this.notificationTimeout) {
      clearTimeout(this.notificationTimeout);
      this.notificationTimeout = null;
    }
  }
}
