import "@styles/global.css";
import ResponseType from "@components/Response-type/Response-type.js";

let responseType = new ResponseType();

document.body.prepend(responseType.dom);

responseType.syncState({
  game: {
    responseType: {
      message: "Correcto",
    },
  },
});
