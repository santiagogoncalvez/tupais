// Style
import "@Modal/Settings/Start-button/Start-button.css";

import elt from "@utils/elt.js";
import {
   startButtonBase,
   startButtonModifiers,
} from "@Modal/Settings/Start-button/Start-button-class-names.js";
import { applyClasses, deleteClasses } from "@utils/dom-class-handler.js";

export default class StartButton {
   constructor(dispatch, getContinentValue) {
      this.dom = elt(
         "button",
         {
            className: `${startButtonBase.block}`,
            onclick: () => {
               dispatch({ game: { continent: getContinentValue() } });
            },
            title: "Empezar",
            type: "button",
         },
         elt("span", { className: startButtonBase.span }, "EMPEZAR")
      );
   }

   _setDarkMode(isDarkMode) {
      if (isDarkMode) {
         applyClasses(
            this.dom,
            startButtonBase,
            startButtonModifiers,
            "darkMode"
         );
      }

      if (!isDarkMode) {
         deleteClasses(
            this.dom,
            startButtonBase,
            startButtonModifiers,
            "darkMode"
         );
      }
   }
}
