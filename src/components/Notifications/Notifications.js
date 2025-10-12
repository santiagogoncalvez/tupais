import { ANSWER_TYPES_TRANSLATIONS } from "@constants/answer-types.js";


import { ACTIONS } from "@constants/action-types.js";
import htmlString from "@components/Notifications/template.html?raw";
import "@components/Notifications/style.css";
import elt from "@utils/elt.js";
import { base, modifiers } from "@components/Notifications/Notifications-class-names.js";
import BaseComponent from "@shared/Base-component.js";
import CloseButton from "@components/Button/Close-button/Close-button.js";


export default class Notifications extends BaseComponent {
  constructor(state, dispatch) {
    super();
    this.htmlString = htmlString;
    this.base = base;
    this.modifiers = modifiers;
    this.state = state;
    this.dom = this._createDom();
    this.dispatch = dispatch;

    this.mouseenter = false;
    this.notificationTimeout = null;
    this.currentNotification = null;

    this.closeButton = new CloseButton(
      dispatch,
      { type: ACTIONS.HIDE_NOTIFICATION },
      { top: "5px", right: "5px" }
    );

    this.init();
  }

  init() {
    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && this.currentNotification) {
        this.closeButton.dom.click();
      }
    });
  }

  syncState(state) {
    const prevNotif = this.state.ui.notifications;
    const newNotif = state.ui.notifications;

    if (newNotif.show) {
      if (newNotif.id !== prevNotif.id) {
        this.removeNotification();
        this.showNotification(newNotif.message);
      }
    } else {
      this.hideNotification();
    }

    this.state = state;
  }

  showNotification(message) {
    this.currentNotification = elt(
      "div",
      { className: this.base.notification },
      elt("p", { className: this.base.message }, ANSWER_TYPES_TRANSLATIONS[message] || message),
      this.closeButton.dom
    );

    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;

    // Mostrar la cruz siempre en mobile
    if (isTouchDevice) {
      this.closeButton.show();
    } else {
      this.closeButton.hide();
    }

    const onMouseEnter = () => {
      if (!isTouchDevice) {
        this.mouseenter = true;
        this.clearNotificationTimeout();
        this.closeButton.show();
      }
    };

    const onMouseLeave = () => {
      if (!isTouchDevice) {
        this.mouseenter = false;
        this.closeButton.hide();
        this.startNotificationTimeout();
      }
    };

    this.currentNotification.addEventListener("mouseenter", onMouseEnter);
    this.currentNotification.addEventListener("mouseleave", onMouseLeave);

    this._mouseEnterHandler = onMouseEnter;
    this._mouseLeaveHandler = onMouseLeave;

    this.dom.appendChild(this.currentNotification);

    // Animación de entrada
    this.currentNotification.classList.add(this.modifiers.show.notification);

    // Timeout automático: esperar a que la animación de entrada termine
    this.currentNotification.addEventListener(
      "animationend",
      () => {
        this.startNotificationTimeout();
      },
      { once: true }
    );
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

    this.currentNotification.removeEventListener("mouseenter", this._mouseEnterHandler);
    this.currentNotification.removeEventListener("mouseleave", this._mouseLeaveHandler);
    document.removeEventListener("click", this._clickOutsideHandler);
    this.clearNotificationTimeout();

    this.currentNotification.remove();
    this.currentNotification = null;
  }

  startNotificationTimeout() {
    this.clearNotificationTimeout();
    this.notificationTimeout = setTimeout(() => {
      if (!this.mouseenter) {
        this.closeButton.dom.click();
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
