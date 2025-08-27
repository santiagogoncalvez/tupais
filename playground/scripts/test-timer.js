import "@styles/global.css";
import Timer from "@components/Game/Score/Timer/Timer.js";

let timer = new Timer();

document.body.prepend(timer.dom);
