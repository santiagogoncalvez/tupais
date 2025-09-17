import { ACTIONS } from "@constants/action-types.js";

import countriesCca2 from "@data/country-cca2.json" with { type: "json" };
import translationsCountryNames from "@data/country-names-eng-spa.json" with { type: "json" };

// Importar Leaflet
import L from "leaflet";
// Importar el CSS de Leaflet
import "leaflet/dist/leaflet.css";

// css personalizado para el mapa
import "@components/Flag-gallery/Flag-info/Countries-map/style.css";

let dom = document.createElement("div");
dom.id = "map";

export default class CountriesMap {
    constructor(state, dispatch) {
        this.state = state;
        this.dispatch = dispatch;

        this.dom = dom;

        //* his.countryLayers es asíncrono
        this.countryLayers = {};
        this.countryMarkers = {};
        // this.colors = ["#00b0f8", "#0088c2", "#00638e", "#00405d", "#001f31"];
        this.colors = ["#7fe77bff"];
        this.colorIndex = 0;
        // this.highlightColor = "#00b0f8";
        this.highlightColor = "#ffcc00";
        this.activeCountry = null;

        this.manualCenters = {
            russia: [61, 100],
            canada: [60, -95],
            australia: [-25, 133],
            usa: [39, -98],
        };

        this._initMap();
    }

    _initMap() {
        this.map = L.map(this.dom, {
            center: [20, 0],
            zoom: 4,
            minZoom: 2,
            maxZoom: 6,
        });

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "&copy; OSM contributors"
        }).addTo(this.map);

        fetch("https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json")
            .then(res => res.json())
            .then(data => this._addGeoJSON(data));

        window.addEventListener("resize", () => {
            if (this.map) {
                this.map.invalidateSize();
            }
        });
    }

    _addGeoJSON(data) {
        const geojson = L.geoJSON(data, {
            style: (feature) => {
                const fillColor = this.colors[this.colorIndex++ % this.colors.length];
                feature.originalColor = fillColor;
                return {
                    color: "#767676ff",
                    weight: 1,
                    fillColor,
                    fillOpacity: 0.6,
                    interactive: false
                };
            }
        }).addTo(this.map);

        geojson.eachLayer((layer) => this._addCountryMarker(layer));

        this.namesEnglish = Object.keys(this.countryLayers);
    }

    _addCountryMarker(layer) {
        const name = layer.feature.properties.name;
        if (!name) return;
        const key = name.toLowerCase();
        this.countryLayers[key] = layer;

        const center = this.manualCenters[key] || layer.getBounds().getCenter();

        const icon = L.divIcon({
            className: "country-btn",
            html: "<img class='country-icon' src='/tupais/icons/location.png' alt=''>",
            iconSize: [24, 24],
            iconAnchor: [12, 12],
        });

        const marker = L.marker(center, { icon }).addTo(this.map);

        // Click solo en el marcador: llama a selectCountry para pintar y abrir popup
        marker.on("click", () => this.selectCountry(layer));

        this.countryMarkers[key] = marker;
    }


    selectCountry(layer) {
        if (this.activeCountry && this.activeCountry !== layer) {
            this.activeCountry.setStyle({ fillColor: this.activeCountry.feature.originalColor });
        }

        layer.setStyle({ fillColor: this.highlightColor });

        const key = layer.feature.properties.name.toLowerCase();
        const center = this.manualCenters[key] || layer.getBounds().getCenter();

        if (!layer.getPopup()) {
            let originalName = layer.feature.properties.name;
            if (originalName === "The Bahamas") originalName = "Bahamas";

            let countryName = translationsCountryNames[originalName];
            if (!countryName) {
                const lowerOriginal = originalName.toLowerCase();
                countryName = Object.keys(translationsCountryNames).find(k =>
                    k.toLowerCase().includes(lowerOriginal)
                );
                if (countryName) countryName = translationsCountryNames[countryName];
                else countryName = originalName;
            }

            let route = `/flag-gallery/${countryName}`;
            layer.bindPopup(`
    <a class='country-link' href='${route}'>
    <img class='country-flag' src="/tupais/images/flags/${countriesCca2[countryName]}.svg" alt="">
    ${countryName}
  </a>
`);
            // Cuando se abre el popup, vincular el click
            layer.on("popupopen", (e) => {
                const link = e.popup._contentNode.querySelector(".country-link");
                if (link) {
                    link.addEventListener("click", (event) => {
                        event.preventDefault(); // evita recarga
                        this.showCountry(countryName); // o tu función de navegación
                        this.dispatch({ type: ACTIONS.NAVIGATE_TO, payload: route });
                    });
                }
            });

        }

        layer.getPopup().setLatLng(center).openOn(this.map);
        this.activeCountry = layer;

        this.map.invalidateSize();
        this.map.setView(center, 4);
    }

    showCountry(spanishName) {
        // Buscar traducción inversa: spa -> eng
        const englishName = Object.keys(translationsCountryNames).find(
            key => translationsCountryNames[key].trim().toLowerCase() === spanishName.trim().toLowerCase()
        ) || spanishName; // fallback al mismo nombre si no encuentra

        // console.log(englishName);

        setTimeout(() => {
            // console.log(this.countryLayers);
            const layer = this.countryLayers[englishName.toLowerCase()];
            if (!layer) return console.warn("País no encontrado:", spanishName);

            // Ajustar vista al país
            this.map.fitBounds(layer.getBounds());
            this.selectCountry(layer);
        }, 500);
    }

    syncState(state) {
        this.state = state;
        // Si necesitas reaccionar a cambios de estado, aquí
    }

    isCountryAvailable(spanishName) {
        // Buscar traducción inversa: español -> inglés
        const englishName = Object.keys(translationsCountryNames).find(
            key => translationsCountryNames[key].trim().toLowerCase() === spanishName.trim().toLowerCase()
        ) || spanishName; // fallback al mismo nombre si no encuentra

        // Verificar si el layer existe en el mapa
        return !!this.countryLayers[englishName.toLowerCase()];
    }
}
