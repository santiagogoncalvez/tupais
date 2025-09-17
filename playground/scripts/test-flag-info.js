import "@styles/global.css";
import Header from "@components/Header/Header.js";
import FlagInfo from "@components/Flag-gallery/Flag-info/Flag-info.js";

let header = new Header({ ui: { navbar: { show: false } } }, function dispatch(action) {
    console.log("Action: ", action);
});
let flagInfo = new FlagInfo();

document.body.prepend(header.dom);
document.querySelector("main").prepend(flagInfo.dom);

setTimeout(() => {
    flagInfo.renderInfo({ name: "Argentina" });
}, 1000);

