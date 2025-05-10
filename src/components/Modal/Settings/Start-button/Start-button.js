// Style
import "@Modal/Settings/Start-button/Start-button.css";

import elt from "@utils/elt.js";
import {
   startButtonBase,
   startButtonModifiers,
} from "@Modal/Settings/Start-button/Start-button-class-names.js";
import BaseComponent from "@shared/Base-component.js";

export default class StartButton extends BaseComponent {
   constructor(dispatch, getContinentValue) {
      super();
      this.base = startButtonBase;
      this.modifiers = startButtonModifiers;
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
}
