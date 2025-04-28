import Navbar from "@components/Header/Navbar/Navbar.mjs";

let navbar = new Navbar({ navbar: { show: true } });
console.log(navbar.dom);
document.body.appendChild(navbar.dom);
