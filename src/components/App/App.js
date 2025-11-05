import { GAME_MODES } from "@constants/game-modes.js";
import store from "@store/store.js";

import { ACTIONS } from "@constants/action-types.js";
import { ROUTES } from "@constants/routes.js";

import countryNames from "@data/country-names.json" with { type: "json" };

import elt from "@utils/elt.js";
import { normalizeRoute, urlToCountry, normalizeCountryForSearch } from "@utils/normalize-route.js";


import "@styles/global.css";
import "@components/App/style.css";

import ContinentSelector from "@components/Continent-selector/Continent-selector.js";
import Presentation from "@Modal/Presentation/Presentation.js";
import GameOver from "@Modal/Game-over/Game-over.js";
import Header from "@components/Header/Header.js";
import Game from "@components/Game/Game";
import Notifications from "@components/Notifications/Notifications.js";

import About from "@components/About/About.js";
import Credits from "@components/Credits/Credits.js";
import FlagGallery from "@components/Flag-gallery/Flag-gallery.js";
import FlagInfo from "@components/Flag-gallery/Flag-info/Flag-info.js";
import ScrollTop from "@components/Scroll-top/Scroll-top.js";

import GameModes from "@Modal/Game-over/Game-modes/Game-modes.js";



export default class App {
    constructor() {
        this.store = store;

        this.dom = elt("div", { className: "app" }, elt("div", { className: "app__container" }, elt("main", {})));

        this.prevRoute = null; // <--- almacenar la ruta anterior
        this.hasPausedTimer = false; // flag para pausar solo 1 vez al salir de un modo de juego

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

        this.gameModes = new GameModes(
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
        s(this.gameOver.syncState.bind(this.gameOver));
        s(this.header.syncState.bind(this.header));
        s(this.game.syncState.bind(this.game));
        s(this.notifications.syncState.bind(this.notifications));
        s(this.about.syncState.bind(this.about));
        s(this.credits.syncState.bind(this.credits));
        s(this.flagGallery.syncState.bind(this.flagGallery));
        s(this.flagInfo.syncState.bind(this.flagInfo));


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
        let { currentRoute, id } = this.store.getState().router;
        currentRoute = normalizeRoute(currentRoute);

        // ✅ actualizar prevRoute antes de cualquier dispatch
        const fromRoute = this.prevRoute;
        this.prevRoute = { route: currentRoute, id };

        // ✅ ignorar cuando vinimos por el mismo estado de ruta
        if (fromRoute?.route === currentRoute && fromRoute?.id === id) {
            return;
        }

        const gameRoutes = [
            ROUTES.HOME,
            ROUTES.CHALLENGE,
            ROUTES.RECORD,
            ROUTES.TIME_TRIAL
        ];

        this.main.innerHTML = "";
        this.dom.querySelector(".app__container").scrollTo({ top: 0 });

        // ✅ pausar timer solo cuando se sale de modo juego
        if (fromRoute && gameRoutes.includes(fromRoute.route) &&
            !gameRoutes.includes(currentRoute) &&
            !this.hasPausedTimer) {
            this.store.dispatch({ type: ACTIONS.PAUSE_TIMER });
            this.hasPausedTimer = true;
        }

        if (gameRoutes.includes(currentRoute)) {
            this.hasPausedTimer = false;
        }

        const newState = this.store.getState();

        switch (true) {

            //* Rutas de juego
            case currentRoute === ROUTES.HOME:
                if (!this.main.contains(this.game.dom)) this.main.appendChild(this.game.dom);
                this.store.dispatch({ type: ACTIONS.SET_GAME_MODE, payload: GAME_MODES.CLASSIC });
                this.store.dispatch({ type: ACTIONS.NEW_GAME_CLASSIC });
                break;

            case currentRoute === ROUTES.CHALLENGE:
                if (!this.main.contains(this.game.dom)) this.main.appendChild(this.game.dom);
                this.store.dispatch({ type: ACTIONS.SET_GAME_MODE, payload: GAME_MODES.CHALLENGE });
                this.store.dispatch({ type: ACTIONS.NEW_GAME });
                break;

            case currentRoute === ROUTES.RECORD:
                if (!this.main.contains(this.game.dom)) this.main.appendChild(this.game.dom);
                this.store.dispatch({ type: ACTIONS.SET_GAME_MODE, payload: GAME_MODES.RECORD });
                this.store.dispatch({ type: ACTIONS.NEW_GAME_RECORD });
                break;

            case currentRoute === ROUTES.TIME_TRIAL:
                if (!this.main.contains(this.game.dom)) this.main.appendChild(this.game.dom);
                this.store.dispatch({ type: ACTIONS.SET_GAME_MODE, payload: GAME_MODES.TIME_TRIAL });
                this.store.dispatch({ type: ACTIONS.NEW_GAME_TIME_TRIAL });
                break;
            
            
            //* Rutas de información
            case currentRoute === ROUTES.FLAG_GALLERY:
                this.about.dom.remove();
                this.credits.dom.remove();
                this.main.appendChild(this.flagGallery.dom);
                break;

            case currentRoute.startsWith(`${ROUTES.FLAG_GALLERY}/`):
                this.store.dispatch({ type: ACTIONS.CLOSE_ALL_MODALS });
                this.about.dom.remove();
                this.credits.dom.remove();

                let countryName = decodeURIComponent(currentRoute.split("/")[2]);
                countryName = urlToCountry(countryName);

                const exists = countryNames.some(
                    name => normalizeCountryForSearch(name) === normalizeCountryForSearch(countryName)
                );

                if (!exists) {
                    this.showNotFound(this.store.dispatch);
                    break;
                }

                this.main.appendChild(this.flagInfo.dom);
                this.flagInfo.renderInfo({ name: countryName });
                break;

            case currentRoute === ROUTES.ABOUT:
                this.flagGallery.dom.remove();
                this.credits.dom.remove();
                this.main.appendChild(this.about.dom);
                break;

            case currentRoute === ROUTES.CREDITS:
                this.flagGallery.dom.remove();
                this.about.dom.remove();
                this.main.appendChild(this.credits.dom);
                break;

            default:
                this.showNotFound(this.store.dispatch);
                break;
        }
    }




    showNotFound(dispatch) {
        dispatch({ type: ACTIONS.NOT_FOUND });

        const notFound = document.createElement("div");
        notFound.className = "app__not-found";

        const title = document.createElement("h2");
        title.textContent = "Página no encontrada";

        const subtitle = document.createElement("p");
        subtitle.textContent = "Parece que la página que buscás no existe o fue movida.";

        notFound.append(title, subtitle, this.gameModes.dom);
        this.main.appendChild(notFound);
    };
}
