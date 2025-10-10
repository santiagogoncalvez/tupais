import store from "@store/store.js";

import { ACTIONS } from "@constants/action-types.js";

import elt from "@utils/elt.js";
import { normalizeRoute } from "@utils/normalize-route.js";

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
import ScrollTop from "@components/Flag-gallery/Scroll-top/Scroll-top.js";



export default class App {
    constructor() {
        this.store = store;

        this.dom = elt("div", { className: "app" }, elt("div", { className: "app__container" }, elt("main", {})));

        this.prevRoute = null; // <--- almacenar la ruta anterior

        // Setear modo de juego
        // this.store.dispatch({
        //     type: ACTIONS.SET_GAME_MODE,
        //     payload: "challenge",
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

        this.scrollTop = new ScrollTop(this.dom.querySelector(".app__container"));


        this.mount();
        this.subscribeComponents();
        this.initRouting();


    }

    mount() {
        // Montar header fijo
        const container = this.dom.querySelector(".app__container");
        container.prepend(this.header.dom);

        // Montar modales
        this.dom.appendChild(this.presentation.dom);
        this.dom.appendChild(this.settings.dom);
        this.dom.appendChild(this.gameOver.dom);
        this.dom.appendChild(this.notifications.dom);


        // Contenedor principal
        this.main = this.dom.querySelector("main");
        this.main.appendChild(this.game.dom);

        // Botón scroll to top
        this.dom.appendChild(this.scrollTop.dom);
    }

    syncState(state) {
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
        // s(this.syncState.bind(this));


        // Suscripción para renderizar según currentRoute
        s(this.renderRoute.bind(this));
    }

    initRouting() {
        // Forzar hash inicial si no hay
        if (!location.hash) {
            location.replace("#/");
        }

        // Escuchar cambios reales del hash
        window.addEventListener("hashchange", () => {
            const route = normalizeRoute(location.hash);
            this.store.dispatch({ type: ACTIONS.NAVIGATE_TO, payload: route });
        });

        // Navegación inicial
        const initialRoute = normalizeRoute(location.hash);
        this.store.dispatch({ type: ACTIONS.NAVIGATE_TO, payload: initialRoute });
    }


    // Navegación programática (cambia el hash y despacha)
    navigateTo(route) {
        const normalized = normalizeRoute(route);

        if (normalizeRoute(location.hash) !== normalized) {
            location.hash = normalized; // esto dispara "hashchange"
        } else {
            // Si ya estamos en la misma ruta, forzar dispatch
            this.store.dispatch({ type: ACTIONS.NAVIGATE_TO, payload: normalized });
        }
    }



    renderRoute() {
        let { currentRoute } = this.store.getState().router;
        currentRoute = normalizeRoute(currentRoute);

        // Evitar renders duplicados
        if (this.prevRoute === currentRoute) return;

        // Guardar prevRoute antes de hacer cualquier dispatch
        const fromRoute = this.prevRoute;
        this.prevRoute = currentRoute;

        // Resetear filtros solo si venimos de otra ruta que no sea /flag-gallery
        if (currentRoute.startsWith("/flag-gallery") && !fromRoute?.startsWith("/flag-gallery")) {
            // Dispatch después de actualizar prevRoute
            // TODO: modificar esto por un método de reseteo de FlagGallery: this.flagGallery.resetFilters() que resetea:
            // - CountrySearch
            // - SortDropdown
            // - FiltersPanel
            // - FiltersPanelMobile;

            this.store.dispatch({ type: ACTIONS.SET_FILTERS, payload: {} });
        }

        // Reset del contenedor principal
        this.main.innerHTML = "";
        this.dom.querySelector(".app__container").scrollTo({ top: 0, left: 0, behavior: "auto" });
        this.store.dispatch({ type: ACTIONS.PAUSE_TIMER });

        // Cerrar Navbar si está abierto
        const state = this.store.getState();
        if (state.ui.navbar.show) {
            this.store.dispatch({ type: ACTIONS.CLOSE_NAVBAR });
        }

        const newState = this.store.getState();
        // --- Ruteo ---
        switch (true) {
            case currentRoute === "/":
                if (newState.ui.firstLaunch) {
                    this.store.dispatch({ type: ACTIONS.OPEN_PRESENTATION });
                }
                if (!this.main.contains(this.game.dom)) this.main.appendChild(this.game.dom);
                this.store.dispatch({ type: ACTIONS.SET_GAME_MODE, payload: "classic" });
                this.store.dispatch({ type: ACTIONS.NEW_GAME_CLASSIC });
                break;

            case currentRoute === "/challenge":
                if (newState.ui.firstLaunch) {
                    this.store.dispatch({ type: ACTIONS.OPEN_PRESENTATION });
                }
                this.store.dispatch({ type: ACTIONS.SET_GAME_MODE, payload: "challenge" });
                this.store.dispatch({ type: ACTIONS.NEW_GAME });
                if (!this.main.contains(this.game.dom)) this.main.appendChild(this.game.dom);
                break;

            case currentRoute === "/record":
                if (newState.ui.firstLaunch) {
                    this.store.dispatch({ type: ACTIONS.OPEN_PRESENTATION });
                }
                if (!this.main.contains(this.game.dom)) this.main.appendChild(this.game.dom);
                this.store.dispatch({ type: ACTIONS.SET_GAME_MODE, payload: "record" });
                this.store.dispatch({ type: ACTIONS.NEW_GAME_RECORD });
                break;

            case currentRoute === "/time-trial":
                if (newState.ui.firstLaunch) {
                    this.store.dispatch({ type: ACTIONS.OPEN_PRESENTATION });
                }
                if (!this.main.contains(this.game.dom)) this.main.appendChild(this.game.dom);
                this.store.dispatch({ type: ACTIONS.SET_GAME_MODE, payload: "time-trial" });
                this.store.dispatch({ type: ACTIONS.NEW_GAME_TIME_TRIAL });
                break;

            case currentRoute === "/flag-gallery":
                this.about.dom.remove();
                this.credits.dom.remove();
                this.main.appendChild(this.flagGallery.dom);
                break;

            case currentRoute.startsWith("/flag-gallery/"):
                this.store.dispatch({ type: ACTIONS.CLOSE_ALL_MODALS });
                this.about.dom.remove();
                this.credits.dom.remove();
                const country = currentRoute.split("/")[2];
                if (country) {
                    this.main.appendChild(this.flagInfo.dom);
                    this.flagInfo.renderInfo({ name: country });
                }
                break;

            case currentRoute === "/about":
                this.flagGallery.dom.remove();
                this.credits.dom.remove();
                this.main.appendChild(this.about.dom);
                break;

            case currentRoute === "/credits":
                this.flagGallery.dom.remove();
                this.about.dom.remove();
                this.main.appendChild(this.credits.dom);
                break;

            default:
                const notFound = document.createElement("div");
                notFound.textContent = "404 - Página no encontrada";
                this.main.appendChild(notFound);
                break;
        }
    }

}
