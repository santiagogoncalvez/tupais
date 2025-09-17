import store from "@store/store.js";

import { ACTIONS } from "@constants/action-types.js";

import elt from "@utils/elt.js";

import "@styles/global.css";
import "@components/App/style.css";

import ContinentSelector from "@components/Continent-selector/Continent-selector.js";
import Presentation from "@Modal/Presentation/Presentation.js";
import Settings from "@Modal/Settings/Settings.js";
import GameOver from "@Modal/Game-over/Game-over.js";
import Header from "@components/Header/Header.js";
import Game from "@components/Game/Game";
import Notifications from "@components/Notifications/Notifications.js";

import About from "@components/About/About.js";
import Credits from "@components/Credits/Credits.js";
import FlagGallery from "@components/Flag-gallery/Flag-gallery.js";
import FlagInfo from "@components/Flag-gallery/Flag-info/Flag-info.js";




// Como la app está en un subdirectorio, si no: ""
import {
    BASE_PATH
} from "@constants/base-path.js";

export default class App {
    constructor() {
        this.store = store;

        this.dom = elt("div", { className: "app" }, elt("main", {}));

        this.prevRoute = null; // <--- almacenar la ruta anterior

        // Setear modo de juego
        // this.store.dispatch({
        //     type: ACTIONS.SET_GAME_MODE,
        //     payload: "classic",
        // });

        // Instanciar componentes
        this.continentSelector = new ContinentSelector(
            this.store.getState(),
            this.store.dispatch.bind(this.store)
        );

        this.presentation = new Presentation(
            this.store.getState(),
            this.store.dispatch.bind(this.store),
            this.continentSelector
        );

        this.settings = new Settings(
            this.store.getState(),
            this.store.dispatch.bind(this.store),
            this.continentSelector
        );

        this.gameOver = new GameOver(
            this.store.getState(),
            this.store.dispatch.bind(this.store),
            this.continentSelector
        );

        this.header = new Header(
            this.store.getState(),
            this.store.dispatch.bind(this.store)
        );

        this.game = new Game(
            this.store.getState(),
            this.store.dispatch.bind(this.store)
        );

        this.notifications = new Notifications(
            this.store.getState(),
            this.store.dispatch.bind(this.store)
        );

        this.about = new About(
            this.store.getState(),
            this.store.dispatch.bind(this.store)
        );

        this.credits = new Credits(
            this.store.getState(),
            this.store.dispatch.bind(this.store)
        );

        this.flagGallery = new FlagGallery(
            this.store.getState(),
            this.store.dispatch.bind(this.store)
        );

        this.flagInfo = new FlagInfo(
            this.store.getState(),
            this.store.dispatch.bind(this.store)
        );


        this.mount();
        this.subscribeComponents();
        this.initRouting();
    }

    mount() {
        // Montar header fijo
        this.dom.prepend(this.header.dom);

        // Montar modales
        this.dom.appendChild(this.presentation.dom);
        this.dom.appendChild(this.settings.dom);
        this.dom.appendChild(this.gameOver.dom);
        this.dom.appendChild(this.notifications.dom);


        // Contenedor principal
        this.main = this.dom.querySelector("main");
        this.main.appendChild(this.game.dom);
    }

    syncState(state) {
        if (state.ui.modals.settings.show) {
            document.body.classList.add("hidden");
        } else {
            document.body.classList.remove("hidden");
        }
    }

    subscribeComponents() {
        const s = this.store.subscribe.bind(this.store);
        s(this.presentation.syncState.bind(this.presentation));
        s(this.settings.syncState.bind(this.settings));
        s(this.gameOver.syncState.bind(this.gameOver));
        s(this.header.syncState.bind(this.header));
        s(this.game.syncState.bind(this.game));
        s(this.notifications.syncState.bind(this.notifications));
        s(this.about.syncState.bind(this.about));
        s(this.credits.syncState.bind(this.credits));
        s(this.flagGallery.syncState.bind(this.flagGallery));
        s(this.flagInfo.syncState.bind(this.flagInfo));
        s(this.syncState.bind(this));


        // Suscripción para renderizar según currentRoute
        s(this.renderRoute.bind(this));
    }

    initRouting() {
        // Detectar cambios con atrás/adelante
        window.addEventListener("popstate", () => {
            this.store.dispatch({
                type: ACTIONS.NAVIGATE_TO,
                payload: this.normalizeRoute(location.pathname),
            });
        });

        // Navegación inicial
        const initialRoute = this.normalizeRoute(location.pathname);
        this.store.dispatch({
            type: ACTIONS.NAVIGATE_TO,
            payload: initialRoute,
        });
    }

    // Quitar prefijo BASE_PATH para store
    normalizeRoute(pathname) {
        if (BASE_PATH && pathname.startsWith(BASE_PATH)) {
            return pathname.slice(BASE_PATH.length) || "/";
        }
        return pathname;
    }

    // Función para hacer navegación programática
    navigateTo(route) {
        const fullRoute = BASE_PATH + route;
        if (location.pathname !== fullRoute) {
            history.pushState({}, "", fullRoute);
        }
        this.store.dispatch({ type: ACTIONS.NAVIGATE_TO, payload: route });
    }

    renderRoute() {
        const { currentRoute } = this.store.getState().router;

        // Si la ruta no cambió, no hacemos nada
        if (this.prevRoute === currentRoute) return;

        this.prevRoute = currentRoute; // actualizar la ruta anterior
        this.main.innerHTML = ""; // limpiar contenedor

        // Poner el deplazamiento al principio
        window.scrollTo({
            top: 0,      // posición superior
            left: 0,     // opcional
            behavior: "auto" // o "smooth" para animación suave
        });

        // Pausar temporizador cuando se cambia de una ruta a otra
        this.store.dispatch({ type: ACTIONS.PAUSE_TIMER });

        // Cerrar Navbar ya que generalmente se navega desde ahí
        const state = this.store.getState();
        if (state.ui.navbar.show) {
            this.store.dispatch({ type: ACTIONS.CLOSE_NAVBAR });
        }

        if (currentRoute === "/") {
            this.store.dispatch({ type: ACTIONS.OPEN_PRESENTATION });

            this.store.dispatch({
                type: ACTIONS.SET_GAME_MODE,
                payload: "classic",
            });
            this.store.dispatch({
                type: ACTIONS.NEW_GAME,
            });

            if (!this.main.contains(this.game.dom)) {
                //* Fijarse donde ponser this.presentation.dom para que se abra
                // this.main.appendChild(this.presentation.dom);
                this.main.appendChild(this.game.dom);
            }

        } else if (currentRoute === "/multiple-choice") {
            this.store.dispatch({ type: ACTIONS.OPEN_PRESENTATION });

            if (!this.main.contains(this.game.dom)) {
                this.main.appendChild(this.game.dom);
            }

            this.store.dispatch({
                type: ACTIONS.SET_GAME_MODE,
                payload: "multiple-choice",
            });
            this.store.dispatch({
                type: ACTIONS.NEW_GAME_MULTIPLE_CHOICE,
            });

        } else if (currentRoute === "/record") {
            this.store.dispatch({ type: ACTIONS.OPEN_PRESENTATION });

            this.store.dispatch({
                type: ACTIONS.SET_GAME_MODE,
                payload: "record",
            });
            this.store.dispatch({
                type: ACTIONS.NEW_GAME_RECORD,
            });

            if (!this.main.contains(this.game.dom)) {
                this.main.appendChild(this.game.dom);
            }

        } else if (currentRoute === "/time-trial") {
            this.store.dispatch({ type: ACTIONS.OPEN_PRESENTATION });

            this.store.dispatch({
                type: ACTIONS.SET_GAME_MODE,
                payload: "time-trial",
            });
            this.store.dispatch({
                type: ACTIONS.NEW_GAME_TIME_TRIAL,
            });

            if (!this.main.contains(this.game.dom)) {
                this.main.appendChild(this.game.dom);
            }

        } else if (currentRoute === "/flag-gallery") {
            this.about.dom.remove();
            this.credits.dom.remove();
            this.main.appendChild(this.flagGallery.dom);

        } else if (currentRoute.startsWith("/flag-gallery/")) {
            this.about.dom.remove();
            this.credits.dom.remove();

            const country = currentRoute.split("/")[2]; // Ej: /flag-gallery/Argentina → "Argentina"
            if (country) {
                this.main.appendChild(this.flagInfo.dom);
                this.flagInfo.renderInfo({ name: country });

            }

        } else if (currentRoute === "/about") {
            this.flagGallery.dom.remove();
            this.credits.dom.remove();
            this.main.appendChild(this.about.dom);

        } else if (currentRoute === "/credits") {
            this.flagGallery.dom.remove();
            this.about.dom.remove();
            this.main.appendChild(this.credits.dom);

        } else {
            const notFound = document.createElement("div");
            notFound.textContent = "404 - Página no encontrada";
            this.main.appendChild(notFound);
        }

    }
}
