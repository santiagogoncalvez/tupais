import htmlString from "@components/Flag-gallery/Flag-info/template.html?raw";
import { parseCountryFromUrl } from "@utils/normalize-route.js";


// Styles
import "@components/Flag-gallery/Flag-info/style.css";

import {
  base,
  modifiers,
} from "@components/Flag-gallery/Flag-info/Flag-info-class-names.js";
import BaseComponent from "@shared/Base-component.js";

import elt from "@utils/elt.js";

import countriesCca2 from "@data/country-cca2.json" with { type: "json" };
import countriesInfo from "@data/countries-info.json" with { type: "json" };

import FlagList from "@components/Flag-gallery/Flag-list/Flag-list.js";

import CountriesMap from "@components/Flag-gallery/Flag-info/Countries-map/Countries-map.js";



export default class FlagInfo extends BaseComponent {
  constructor(state, dispatch) {
    super();
    this.htmlString = htmlString;
    this.base = base;
    this.modifiers = modifiers;
    this.state = state;
    this.dispatch = dispatch;

    this.dom = this._createDom();

    this.countriesMap = new CountriesMap(state, dispatch);

    this._init();
  }

  _init() {
  }

  syncState(state) {
  }

  renderInfo(country) {
    // Normaliza un nombre para comparaciones en bruto
    function normalizeCountryName(name) {
      if (!name) return "";
      return name
        .normalize("NFD")                // separar tildes
        .replace(/[\u0300-\u036f]/g, "") // eliminar tildes
        .replace(/[\s\-]/g, "")          // quitar espacios y guiones
        .toLowerCase();                  // minúsculas
    }

    // Ejemplo de uso:
    if (!country) return;

    // Decodificar country desde URL
    let countryName = decodeURIComponent(country.name);

    // Convertir a formato legible (espacios, sin tildes)
    countryName = parseCountryFromUrl(countryName);

    // Buscar en bruto en la info de países
    const countryInfo = countriesInfo.find(
      c => normalizeCountryName(c.translations?.spa?.common) === normalizeCountryName(countryName)
    );


    const container = this.dom.querySelector(".flag-info__container");

    // Limpiar todo el contenedor
    container.innerHTML = "";

    // Nombre
    container.appendChild(
      elt("h2", { className: "flag-info__name" },
        "Bandera de ",
        elt("span", { className: "flag-info__country-name" }, countryInfo.translations.spa.common)
      )
    );

    // Bandera
    container.appendChild(
      elt("img", {
        className: "flag-info__flag",
        src: `/tupais/images/flags/${countriesCca2[countryInfo.translations.spa.common]}.svg`,
        alt: countryInfo.translations.spa.common,
        loading: "lazy"
      })
    );

    // Descripción
    if (countryInfo?.flags?.alt) {
      container.appendChild(
        elt("p", { className: "flag-info__description" }, countryInfo.flags.alt)
      );
    }

    // Determinar subtítulo dinámico
    const getInfoSubtitle = (country, countryInfo) => {
      const noBorders = !countryInfo?.borders || countryInfo.borders.length === 0;
      return noBorders
        ? `Información de ${countryInfo.translations.spa.common}`
        : "Información del país";
    };

    // Subtítulo Información
    container.appendChild(
      elt("h3", { className: "flag-info__subtitle" }, getInfoSubtitle(country, countryInfo))
    );


    // Lista de detalles
    const detailsList = elt("ul", { className: "flag-info__details" });

    // Independencia
    detailsList.appendChild(
      elt("li", { className: "flag-info__item flag-info__item--independence" },
        elt("span", { className: "flag-info__label" }, "Independiente: "),
        elt("div", { className: "flag-info__data-container" },
          elt("span", { className: `flag-info__value flag-info__value--boolean ${countryInfo?.independent ? "true" : "false"}` }, countryInfo?.independent ? "Sí" : "No")
        )
      )
    );

    // Miembro de la ONU
    detailsList.appendChild(
      elt("li", { className: "flag-info__item flag-info__item--un-member" },
        elt("span", { className: "flag-info__label" }, "Miembro de la ONU: "),
        elt("div", { className: "flag-info__data-container" },
          elt("span", { className: `flag-info__value flag-info__value--boolean ${countryInfo?.unMember ? "true" : "false"}` }, countryInfo?.unMember ? "Sí" : "No")
        )
      )
    );

    // Salida al mar
    detailsList.appendChild(
      elt("li", { className: "flag-info__item flag-info__item--landlocked" },
        elt("span", { className: "flag-info__label" }, "Salida al mar: "),
        elt("div", { className: "flag-info__data-container" },
          elt("span", { className: "flag-info__value" }, countryInfo?.landlocked ? "No" : "Sí")
        )
      )
    );

    // Helper: obtiene el texto del label de códigos
    function getCodesLabel(countryInfo) {
      const noBorders = !countryInfo?.borders || countryInfo.borders.length === 0;
      return noBorders ? "Códigos:" : "Códigos de país:";
    }

    // Códigos de país
    detailsList.appendChild(
      elt("li", { className: "flag-info__item flag-info__item--codes" },
        elt("span", { className: "flag-info__label" }, getCodesLabel(countryInfo)),
        elt("div", { className: "flag-info__data-container" },
          elt("span", { className: "flag-info__value" }, getCountryCodesString(countryInfo),
            elt("span", { className: "flag-info__note" }, " (ISO 3166-1)")
          )
        )
      )
    );


    // Nombre oficial
    detailsList.appendChild(
      elt("li", { className: "flag-info__item flag-info__item--official-name" },
        elt("span", { className: "flag-info__label" }, "Nombre oficial: "),
        elt("div", { className: "flag-info__data-container" },
          elt("span", { className: "flag-info__value" }, countryInfo?.translations?.spa?.official)
        )
      )
    );

    // Capital
    if (countryInfo?.capital) {
      detailsList.appendChild(
        elt("li", { className: "flag-info__item flag-info__item--capital" },
          elt("span", { className: "flag-info__label" }, "Capital: "),
          elt("div", { className: "flag-info__data-container" },
            elt("span", { className: "flag-info__value" }, countryInfo.capital.join(", "))
          )
        )
      );
    }

    // Continente
    detailsList.appendChild(
      elt("li", { className: "flag-info__item flag-info__item--region" },
        elt("span", { className: "flag-info__label" }, "Continente: "),
        elt("div", { className: "flag-info__data-container" },
          elt("span", { className: "flag-info__value" }, countryInfo.region)
        )
      )
    );

    // Subregión
    if (countryInfo?.subregion) {
      detailsList.appendChild(
        elt("li", { className: "flag-info__item flag-info__item--subregion" },
          elt("span", { className: "flag-info__label" }, "Subregión: "),
          elt("div", { className: "flag-info__data-container" },
            elt("span", { className: "flag-info__value" }, countryInfo.subregion)
          )
        )
      );
    }

    // Población
    detailsList.appendChild(
      elt("li", { className: "flag-info__item flag-info__item--population" },
        elt("span", { className: "flag-info__label" }, "Población: "),
        elt("div", { className: "flag-info__data-container" },
          elt("span", { className: "flag-info__value" }, countryInfo.population.toLocaleString("es-ES"))
        )
      )
    );

    // Área
    detailsList.appendChild(
      elt("li", { className: "flag-info__item flag-info__item--area" },
        elt("span", { className: "flag-info__label" }, "Área: "),
        elt("div", { className: "flag-info__data-container" },
          elt("span", { className: "flag-info__value" }, countryInfo.area.toLocaleString("es-ES") + " km²")
        )
      )
    );

    // Índice Gini
    if (countryInfo?.gini && Object.keys(countryInfo.gini).length > 0) {
      const years = Object.keys(countryInfo.gini);
      const latestYear = years[years.length - 1];
      const giniValue = countryInfo.gini[latestYear];

      // Solo agregar si giniValue existe y es un número
      if (typeof giniValue === "number") {
        detailsList.appendChild(
          elt("li", { className: "flag-info__item flag-info__item--gini" },
            elt("span", { className: "flag-info__label" }, "Índice Gini: "),
            elt("div", { className: "flag-info__data-container" },
              elt("span", { className: "flag-info__value" }, `${giniValue}`),
              elt("span", { className: "flag-info__note" }, ` (${latestYear})`)
            )
          )
        );
      }
    }


    // Moneda
    if (countryInfo?.currencies) {
      const currencySpans = Object.entries(countryInfo.currencies).map(([code, c]) =>
        elt("span", { className: "flag-info__currency" },
          c.name, " ",
          elt("span", { className: "flag-info__note" }, `(${c.symbol}, ${code})`)
        )
      );

      // Intercalar comas
      const currenciesWithCommas = currencySpans.reduce((acc, el, idx) => {
        if (idx > 0) acc.push(", ");
        acc.push(el);
        return acc;
      }, []);

      detailsList.appendChild(
        elt("li", { className: "flag-info__item flag-info__item--currency" },
          elt("span", { className: "flag-info__label" }, "Moneda: "),
          elt("div", { className: "flag-info__data-container" },
            ...currenciesWithCommas
          )
        )
      );
    }


    // Lenguajes
    if (countryInfo?.languages) {
      detailsList.appendChild(
        elt("li", { className: "flag-info__item flag-info__item--languages" },
          elt("span", { className: "flag-info__label" }, "Lenguajes: "),
          elt("div", { className: "flag-info__data-container" },
            elt("span", { className: "flag-info__value" }, Object.values(countryInfo.languages).join(", "))
          )
        )
      );
    }

    // Dominio de Internet
    if (countryInfo?.tld) {
      detailsList.appendChild(
        elt("li", { className: "flag-info__item flag-info__item--tld" },
          elt("span", { className: "flag-info__label" }, "Dominio de Internet: "),
          elt("div", { className: "flag-info__data-container" },
            elt("span", { className: "flag-info__value" }, countryInfo.tld.join(", "))
          )
        )
      );
    }

    // Código telefónico
    if (countryInfo?.idd?.length > 0) {
      detailsList.appendChild(
        elt("li", { className: "flag-info__item flag-info__item--phone" },
          elt("span", { className: "flag-info__label" }, "Código telefónico: "),
          elt("div", { className: "flag-info__data-container" },
            elt("span", { className: "flag-info__value" }, getPhoneCode(countryInfo))
          )
        )
      );
    }

    // Lado de conducción
    if (countryInfo?.car) {
      detailsList.appendChild(
        elt("li", { className: "flag-info__item flag-info__item--car-side" },
          elt("span", { className: "flag-info__label" }, "Lado de conducción: "),
          elt("div", { className: "flag-info__data-container" },
            elt("span", { className: "flag-info__value" }, countryInfo.car.side === "right" ? "Derecha" : "Izquierda")
          )
        )
      );
    }

    // Zonas horarias
    if (countryInfo?.timezones) {
      detailsList.appendChild(
        elt("li", { className: "flag-info__item flag-info__item--timezones" },
          elt("span", { className: "flag-info__label" }, "Zonas horarias: "),
          elt("div", { className: "flag-info__data-container" },
            elt("span", { className: "flag-info__value" }, countryInfo.timezones.join(", "))
          )
        )
      );
    }

    // Escudo de armas
    if (countryInfo?.coatOfArms && Object.keys(countryInfo.coatOfArms).length > 0) {
      detailsList.appendChild(
        elt("li", { className: "flag-info__item flag-info__item--coat-of-arms" },
          elt("span", { className: "flag-info__label" }, "Escudo de armas: "),
          elt("div", { className: "flag-info__data-container" },
            elt("img", { className: "flag-info__coat-of-arms", src: `/tupais/images/coat-of-arms/${countryInfo.cca2.toLowerCase()}.svg`, alt: `Escudo de armas de ${countryInfo.translations.spa.common}`, width: 40, height: 40 })
          )
        )
      );
    }

    container.appendChild(detailsList);

    // Países vecinos
    const containerNeighbors = elt("div", { className: "flag-info__neighboards-container" });
    if (countryInfo?.borders?.length > 0) {
      container.appendChild(
        elt("h3", { className: "flag-info__subtitle neighboards" }, "Banderas de países vecinos:")
      );

      const neighborCountries = countryInfo.borders.map(cca3 => {
        const neighbor = countriesInfo.find(c => c.cca3 === cca3);
        return neighbor ? neighbor.translations?.spa?.common || neighbor.name : cca3;
      });

      const flagList = new FlagList(this.state, this.dispatch);
      flagList.renderItems(neighborCountries);
      containerNeighbors.appendChild(flagList.dom);
      container.appendChild(containerNeighbors);
    }

    // Mapa
    //* Parche temporal por ser la verificación asíncrona, ya que en el momento que se llama al método si se entra directo a la página no se cargaron todos los datos a la vez.
    // Eliminar subtítulo previo si existe
    const prevSubtitle = container.querySelector(".flag-info__subtitle.location");
    if (prevSubtitle) prevSubtitle.remove();

    // Eliminar mapa previo si existe
    const prevMap = container.querySelector(".countries-map");
    if (prevMap) prevMap.remove();

    // Helper: obtiene el subtítulo de ubicación
    function getLocationSubtitle(country, countryInfo) {
      const noBorders = !countryInfo?.borders || countryInfo.borders.length === 0;
      return noBorders ? `Ubicación de ${countryInfo.translations.spa.common}` : "Ubicación del país";
    }

    // Dentro del render
    if (this.countriesMap.isCountryAvailable(countryInfo.translations.spa.common)) {
      container.appendChild(
        elt("h3", { className: "flag-info__subtitle location" }, getLocationSubtitle(country, countryInfo))
      );

      container.appendChild(this.countriesMap.dom);

      // Esperá un frame y luego mostrás el país
      requestAnimationFrame(() => this.countriesMap.showCountry(countryInfo.translations.spa.common));
    }

  }
}

function getCountryCodesString(countryInfo) {
  if (!countryInfo) return "";

  // Tomamos los códigos en el orden deseado
  const codes = [countryInfo.cca2, countryInfo.cca3, countryInfo.ccn3, countryInfo.cioc];

  // Filtrar valores falsy y eliminar duplicados
  const uniqueCodes = [...new Set(codes.filter(Boolean))];

  // Unir con comas
  return uniqueCodes.join(", ");
}

function getPhoneCode(countryInfo) {
  const idd = countryInfo.idd;
  if (!idd || !idd.root || !idd.suffixes || idd.suffixes.length === 0) {
    return null; // o "" si preferís string vacío
  }

  // Combina root con el primer sufijo
  return `${idd.root}${idd.suffixes[0]}`;
}