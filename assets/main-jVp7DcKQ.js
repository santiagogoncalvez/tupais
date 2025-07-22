var P=Object.defineProperty;var F=(e,t,n)=>t in e?P(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var A=(e,t,n)=>F(e,typeof t!="symbol"?t+"":t,n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function n(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(i){if(i.ep)return;i.ep=!0;const o=n(i);fetch(i.href,o)}})();function _(e,t){return(e+1)%t}function x(e,t){return(e-1+t)%t}function z(e,t,n){const s=(t-e+n)%n,i=(e-t+n)%n;return s===0?"none":s<i?"forward":"backward"}const R=`<dialog class="presentation">\r
  <div class="presentation__overflow">\r
    <div class="presentation__container">\r
      <h2 class="presentation__title">TU PAÍS</h2>\r
      <p class="presentation__text">\r
        Este es un juego de adivinanzas sobre banderas del mundo en el que tenés\r
        que adivinar a qué país pertenece cada bandera. <br />\r
        ¡Si respondés correctamente todas las preguntas, ganás!\r
      </p>\r
    </div>\r
  </div>\r
</dialog>\r
`,$=`<button class="navbar__button" title="Cerrar" type="button">\r
</button>\r
`,G={block:"navbar__button"},U={darkMode:{block:"navbar__button--dark-mode"}};function j(e,t,n,s){if(!e)throw new Error("Don´t exist root");const i=n[s];e.classList.add(i.block);const o=(a,r,m)=>{for(const b in r){const d=r[b],l=m==null?void 0:m[b];if(typeof d=="string"){const h=a.querySelectorAll(`.${d}`);h.length&&h.forEach(S=>{l&&S.classList.add(l)})}else typeof d=="object"&&o(a,d,l||{})}};o(e,t,i)}function V(e,t,n,s){if(!e)throw new Error("Don´t exist root");const i=n[s];e.classList.remove(i.block);const o=(a,r,m)=>{for(const b in r){const d=r[b],l=m==null?void 0:m[b];if(typeof d=="string"){const h=a.querySelectorAll(`.${d}`);h.length&&h.forEach(S=>{l&&S.classList.remove(l)})}else typeof d=="object"&&o(a,d,l||{})}};o(e,t,i)}class c{constructor(){A(this,"_createDom",()=>{const t=document.createElement("template");return t.innerHTML=this.htmlString,t.content.cloneNode(!0).querySelector("."+this.base.block)})}_setDarkMode(t){t&&j(this.dom,this.base,this.modifiers,"darkMode"),t||V(this.dom,this.base,this.modifiers,"darkMode")}}class C extends c{constructor(t,n){super(),this.htmlString=$,this.base=G,this.modifiers=U,this.dom=this._createDom(),this._init(t,n)}syncState(t){var n;((n=this.state)==null?void 0:n.ui.darkMode)!=(t==null?void 0:t.ui.darkMode)&&this._setDarkMode(t==null?void 0:t.ui.darkMode),this.state=t}_init(t,n){this.dom.addEventListener("click",()=>{t(n)})}}const K=`<div class="flag-slide">
  <div class="flag-slide__container">
    <div class="flag-slide__flags">
      <div class="flag-slide__container-flag">
        <img class="flag-slide__flag" src="/tupais/images/flags/ar.svg" />
        <div class="flag-slide__tooltip">Agentina</div>
      </div>
      <div class="flag-slide__container-flag">
        <img class="flag-slide__flag" src="/tupais/images/flags/at.svg" />
        <div class="flag-slide__tooltip">Austria</div>
      </div>
      <div class="flag-slide__container-flag">
        <img class="flag-slide__flag" src="/tupais/images/flags/bg.svg" />
        <div class="flag-slide__tooltip">Bulgaria</div>
      </div>
      <div class="flag-slide__container-flag">
        <img class="flag-slide__flag" src="/tupais/images/flags/bw.svg" />
        <div class="flag-slide__tooltip">Botsuana</div>
      </div>
      <div class="flag-slide__container-flag">
        <img class="flag-slide__flag" src="/tupais/images/flags/cw.svg" />
        <div class="flag-slide__tooltip">Curaçao</div>
      </div>
      <div class="flag-slide__container-flag">
        <img class="flag-slide__flag" src="/tupais/images/flags/fr.svg" />
        <div class="flag-slide__tooltip">Francia</div>
      </div>
      <div class="flag-slide__container-flag">
        <img class="flag-slide__flag" src="/tupais/images/flags/gp.svg" />
        <div class="flag-slide__tooltip">Guadalupe</div>
      </div>
      <div class="flag-slide__container-flag">
        <img class="flag-slide__flag" src="/tupais/images/flags/kw.svg" />
        <div class="flag-slide__tooltip">Kuwait</div>
      </div>
    </div>

    <div class="flag-slide__flags">
      <div class="flag-slide__container-flag">
        <img class="flag-slide__flag" src="/tupais/images/flags/ar.svg" />
        <div class="flag-slide__tooltip">Agentina</div>
      </div>
      <div class="flag-slide__container-flag">
        <img class="flag-slide__flag" src="/tupais/images/flags/at.svg" />
        <div class="flag-slide__tooltip">Austria</div>
      </div>
      <div class="flag-slide__container-flag">
        <img class="flag-slide__flag" src="/tupais/images/flags/bg.svg" />
        <div class="flag-slide__tooltip">Bulgaria</div>
      </div>
      <div class="flag-slide__container-flag">
        <img class="flag-slide__flag" src="/tupais/images/flags/bw.svg" />
        <div class="flag-slide__tooltip">Botsuana</div>
      </div>
      <div class="flag-slide__container-flag">
        <img class="flag-slide__flag" src="/tupais/images/flags/cw.svg" />
        <div class="flag-slide__tooltip">Curaçao</div>
      </div>
      <div class="flag-slide__container-flag">
        <img class="flag-slide__flag" src="/tupais/images/flags/fr.svg" />
        <div class="flag-slide__tooltip">Francia</div>
      </div>
      <div class="flag-slide__container-flag">
        <img class="flag-slide__flag" src="/tupais/images/flags/gp.svg" />
        <div class="flag-slide__tooltip">Guadalupe</div>
      </div>
      <div class="flag-slide__container-flag">
        <img class="flag-slide__flag" src="/tupais/images/flags/kw.svg" />
        <div class="flag-slide__tooltip">Kuwait</div>
      </div>
    </div>
  </div>
</div>
`,H={block:"flag-slide"};class W extends c{constructor(){super(),this.htmlString=K,this.base=H,this.dom=this._createDom()}}const J=`<div class="continent-selector">\r
  <p class="continent-selector__text">Elegir continente</p>\r
  <div class="continent-selector__select"></div>\r
</div>\r
`,Z={block:"continent-selector",select:"continent-selector__select",button:{block:"continent-selector__button",text:"continent-selector__button-text"},container:{block:"continent-selector__options",option:"continent-selector__option"},modalBackdrop:"modal-backdrop"},Y={show:{container:{block:"continent-selector__options--show"},modalBackdrop:"modal-backdrop--show"},display:{container:{block:"continent-selector__options--display"}},focus:{button:{block:"continent-selector__button--focus"}},darkMode:{block:"continent-selector--dark-mode",button:{block:"continent-selector__button--dark-mode"},container:{block:"continent-selector__options--dark-mode"}},selectedOption:{container:{option:"continent-selector__option--selected"}}},Q=`<button class="continent-selector__button" title="Elegir continente">\r
  <span class="continent-selector__button-text">TODOS</span>\r
  <img\r
    class="continent-selector__selector-icon"\r
    src="/tupais/icons/selector-arrow.png"\r
    alt="Ícono para seleccionar opciones"\r
  />\r
</button>\r
`,L={block:"continent-selector__button",text:"continent-selector__button-text"},X={focus:{block:"continent-selector__button--focus"},darkMode:{block:"continent-selector__button--dark-mode"}},w={ALL:"todos",AFRICA:"africa",AMERICAS:"america",ASIA:"asia",EUROPE:"europa",OCEANIA:"oceania"};class tt extends c{constructor(t,n,s){super(),this.htmlString=Q,this.base=L,this.modifiers=X,this.state=t,this.dom=this._createDom(),this.getContinent=s,this._init(n,s)}syncState(t){this.dom.querySelector("."+L.text).textContent=w[this.getContinent().toUpperCase()].toUpperCase();let n;this.state.ui.settings.continentSelector.options.show!=(n=t.ui.settings.continentSelector.options.show)&&(n||this.dom.focus()),this.state=t}_init(t){this.dom.querySelector("."+L.text).textContent=w[this.getContinent().toUpperCase()].toUpperCase(),this.dom.addEventListener("click",n=>{n.stopImmediatePropagation(),t({ui:{settings:{continentSelector:{options:{show:!this.state.ui.settings.continentSelector.options.show}}},backdrop:{show:!0}}})}),this.dom.addEventListener("keydown",n=>{(n.key=="ArrowUp"||n.key=="ArrowDown")&&t({ui:{settings:{continentSelector:{options:{show:!this.state.ui.settings.continentSelector.options.show}}},backdrop:{show:!0}}})})}}const nt=`<div class="continent-selector__options" tabindex="-1">\r
  <div\r
    data-value="all"\r
    class="continent-selector__option"\r
  >\r
    <span>TODOS</span>\r
  </div>\r
  <div data-value="africa" class="continent-selector__option">\r
    <span>ÁFRICA</span>\r
  </div>\r
  <div data-value="americas" class="continent-selector__option">\r
    <span>AMÉRICA</span>\r
  </div>\r
  <div data-value="asia" class="continent-selector__option">\r
    <span>ASIA</span>\r
  </div>\r
  <div data-value="europe" class="continent-selector__option">\r
    <span>EUROPA</span>\r
  </div>\r
  <div data-value="oceania" class="continent-selector__option">\r
    <span>OCEANÍA</span>\r
  </div>\r
</div>\r
`,et={block:"continent-selector__options",option:"continent-selector__option",modalBackdrop:"modal-backdrop"},st={show:{block:"continent-selector__options--show",modalBackdrop:"modal-backdrop--show"},display:{block:"continent-selector__options--display"},darkMode:{block:"continent-selector__options--dark-mode"},selectedOption:{option:"continent-selector__option--selected"}};let it=class extends c{constructor(t,n,s){super(),this.htmlString=nt,this.base=et,this.modifiers=st,this.state=t,this.continent=t.game.continent,this.dom=this._createDom(),this._init(n,s)}syncState(t){this.state.ui.settings.continentSelector.options.show!=t.ui.settings.continentSelector.options.show&&(this._show(t.ui.settings.continentSelector.options.show),this._assignSelected(t.ui.settings.continentSelector.options.show)),this.state=t}_init(t,n){const s=this.dom.querySelectorAll("."+this.base.option);let i=!0;this._assignSelected(!0);for(let o of s)o.addEventListener("click",()=>{this.continent=o.dataset.value,n(this.continent),t({ui:{settings:{continentSelector:{options:{show:!1}}},backdrop:{show:!1}}})}),o.addEventListener("mouseenter",()=>{let a=this.dom.querySelector("."+this.modifiers.selectedOption.option);a&&a.classList.remove(this.modifiers.selectedOption.option),o.classList.add(this.modifiers.selectedOption.option)}),o.addEventListener("mouseleave",()=>{let a=this.dom.querySelector("."+this.modifiers.selectedOption.option);a&&a.classList.remove(this.modifiers.selectedOption.option),o.classList.remove(this.modifiers.selectedOption.option)}),o.addEventListener("mousemove",()=>{i&&(this.dom.querySelector("."+this.modifiers.selectedOption.option).classList.remove(this.modifiers.selectedOption.option),o.classList.add(this.modifiers.selectedOption.option),i=!1)});this.dom.addEventListener("keydown",o=>{o.stopPropagation(),o.stopImmediatePropagation(),o.key=="Escape"&&(o.preventDefault(),t({ui:{settings:{continentSelector:{options:{show:!1}}},backdrop:{show:!1}}}));let a=this.dom.querySelector("."+this.modifiers.selectedOption.option);if(o.key=="ArrowDown")if(i=!0,a){let r=a.nextElementSibling;r&&(a.classList.remove(this.modifiers.selectedOption.option),r.classList.add(this.modifiers.selectedOption.option))}else s[0].classList.add(this.modifiers.selectedOption.option);if(o.key=="ArrowUp")if(i=!0,a){let r=a.previousElementSibling;r&&(a.classList.remove(this.modifiers.selectedOption.option),r.classList.add(this.modifiers.selectedOption.option))}else s[s.length-1].classList.add(this.modifiers.selectedOption.option);if(o.key=="Enter"){let r=this.dom.querySelector("."+this.modifiers.selectedOption.option);if(!a)return;this.continent=r.dataset.value,n(this.continent),t({ui:{settings:{continentSelector:{options:{show:!1}}},backdrop:{show:!1}}})}})}_show(t){t&&(this.dom.classList.add(this.modifiers.display.block),requestAnimationFrame(()=>{this.dom.classList.add(this.modifiers.show.block)}),this.dom.focus()),t||(this.dom.classList.remove(this.modifiers.show.block),this.dom.addEventListener("transitionend",()=>{this.dom.classList.remove(this.modifiers.display.block)},{once:!0}))}_getContinent(){return this.continent}_assignSelected(t){let n;t&&(n=this.dom.querySelector(`[data-value="${this.continent}"]`),n.classList.add(this.modifiers.selectedOption.option)),t||(n=this.dom.querySelector("."+this.modifiers.selectedOption.option),n&&n.classList.remove(this.modifiers.selectedOption.option))}};function u(e,t,...n){let s=document.createElement(e);t&&Object.assign(s,t);for(let i of n)typeof i!="string"?s.appendChild(i):s.appendChild(document.createTextNode(i));return s}const M={block:"settings__start-button",span:"settings__start-button-text"},ot={darkMode:{block:"settings__start-button--dark-mode",span:"settings__start-button-text--dark-mode"}};class at extends c{constructor(t,n){super(),this.base=M,this.modifiers=ot,this.dom=u("button",{className:`${M.block}`,onclick:()=>{t({ui:{settings:{show:!1},presentation:{show:!1}},game:{continent:n()}})},title:"Empezar",type:"button"},u("span",{className:M.span},"EMPEZAR"))}}const rt='<div class="modal-backdrop"></div>',ct={block:"modal-backdrop"},lt={show:{block:"modal-backdrop--show"}};class dt extends c{constructor(t,n){super(),this.htmlString=rt,this.base=ct,this.modifiers=lt,this.state=t,this.dom=this._createDom(),this._init(n)}syncState(t){t.ui.backdrop.show!=this.state.ui.backdrop.show&&this._show(t.ui.backdrop.show),this.state=t}_init(t){this.dom.addEventListener("click",()=>{t({ui:{settings:{continentSelector:{options:{show:!1}}},backdrop:{show:!1}}})})}_show(t){t&&this.dom.classList.add(this.modifiers.show.block),t||this.dom.classList.remove(this.modifiers.show.block)}}class q extends c{constructor(t,n){super(),this.htmlString=J,this.base=Z,this.modifiers=Y,this.state=t,this.continent=t.game.continent,this.button=new tt(t,n,this.getContinent.bind(this)),this.options=new it(t,n,this.setContinent.bind(this)),this.startButton=new at(n,this.getContinent.bind(this)),this.backdrop=new dt(t,n),this.dom=this._createDom(),this._init(n)}syncState(t){var n;((n=this.state)==null?void 0:n.ui.darkMode)!=(t==null?void 0:t.ui.darkMode)&&this._setDarkMode(t==null?void 0:t.ui.darkMode),this.button.syncState(t),this.options.syncState(t),this.backdrop.syncState(t),this.state=t}_init(){let t=this.dom.querySelector("."+this.base.select);t.appendChild(this.button.dom),t.appendChild(this.options.dom),t.appendChild(this.startButton.dom),t.appendChild(this.backdrop.dom)}getContinent(){return this.continent}setContinent(t){this.continent=t}}const B={block:"presentation",title:"presentation__title",subtitle:"presentation__subtitle",continentsText:"presentation__continents-text",container:"presentation__container"},p={show:{block:"presentation--show"},display:{block:"presentation--display"},darkMode:{block:"presentation--dark-mode",title:"presentation__title--dark-mode",subtitle:"presentation__subtitle--dark-mode",continentsText:"presentation__continents-text--dark-mode"}};let ut=class extends c{constructor(t,n){super(),this.htmlString=R,this.base=B,this.modifiers=p,this.dispatch=n,this.state=t,this.continent=w.ALL,this.closeButton=new C(n,{ui:{presentation:{show:!1}}}),this.flagSlide=new W,this.continentSelector=new q(t,n),this.dom=this._createDom(),this._init(n)}_init(){this.dom.querySelector("."+B.title).insertAdjacentElement("afterend",this.flagSlide.dom),this.dom.appendChild(this.closeButton.dom),this.dom.querySelector("."+this.base.container).appendChild(this.continentSelector.dom),this.dom.addEventListener("cancel",t=>{t.preventDefault()})}_activeEvents(t){this._escEvent||(this._escEvent=n=>{n.key=="Escape"&&(n.preventDefault(),n.stopImmediatePropagation(),this.dispatch({ui:{presentation:{show:!1}}}),this.dom.blur())}),t?window.addEventListener("keydown",this._escEvent):window.removeEventListener("keydown",this._escEvent)}syncState(t){this.state.ui.presentation.show!=t.ui.presentation.show&&(this._show(t.ui.presentation.show),this._activeEvents(t.ui.presentation.show),this.isShow=t.ui.presentation.show),this.state.ui.darkMode!=t.ui.darkMode&&(this._setDarkMode(t.ui.darkMode),this.continentSelector._setDarkMode(t.ui.darkMode)),this.closeButton.syncState(t),this.continentSelector.syncState(t),this.state=t}_show(t){t&&(document.readyState==="interactive"?(this.dom.showModal(),this.dom.classList.add(p.display.block),requestAnimationFrame(()=>{this.dom.classList.add(p.show.block)})):document.addEventListener("DOMContentLoaded",()=>{this._show(!0)})),t||(this.dom.classList.remove(p.show.block),this.dom.addEventListener("transitionend",()=>{this.dom.classList.remove(p.display.block),this.dom.close()},{once:!0}))}_setContinentValue(t){this.continent=t}_getContinentValue(){return this.continent}};const ht=`<header class="header">\r
   <div class="header__container">\r
      <h1 class="header__title">TU PAÍS</h1>\r
   </div>\r
</header>\r
`,mt=`<button\r
   class="header__open-navbar-button"\r
   title="Abrir navegación"\r
   type="button"\r
></button>\r
`,gt={block:"header__open-navbar-button"},bt={darkMode:{block:"header__open-navbar-button--dark-mode"}};class _t extends c{constructor(t,n){super(),this.htmlString=mt,this.base=gt,this.modifiers=bt,this.show=t.ui.navbar.show,this.dom=this._createDom(),this._init(n)}syncState(t){this._setDarkMode(t.ui.darkMode),this.show=t.ui.navbar.show}_init(t){this.dom.addEventListener("click",n=>{n.stopPropagation(),n.stopImmediatePropagation(),t({ui:{navbar:{show:!this.show}}})})}}const pt=`<button\r
   class="header__open-setting-button"\r
   title="Configuración"\r
   type="button"\r
></button>\r
`,ft={block:"header__open-setting-button"},vt={darkMode:{block:"header__open-setting-button--dark-mode"}};class kt extends c{constructor(t){super(),this.htmlString=pt,this.base=ft,this.modifiers=vt,this.dom=this._createDom(),this._init(t)}_init(t){this.dom.addEventListener("click",()=>{t({ui:{settings:{show:!0}}})})}syncState(t){this._setDarkMode(t.ui.darkMode)}}const yt=`<nav class="navbar" tabindex="-1">\r
  <p class="navbar__paragraph navbar__paragraph--first">Modos de juego</p>\r
  <ul class="navbar__list">\r
    <li class="navbar__item">\r
      <a href="/tupais/src/index.html" class="navbar__link"\r
        ><div class="navbar__icon navbar__icon--classic"></div>\r
        <span>Clásico</span></a\r
      >\r
    </li>\r
    <li class="navbar__item">\r
      <a\r
        href="/tupais/src/index.html"\r
        class="navbar__link"\r
        ><div class="navbar__icon navbar__icon--multiple-choice"></div>\r
        <span>Opción múltiple</span></a\r
      >\r
    </li>\r
    <li class="navbar__item">\r
      <a\r
        href="/tupais/src/index.html"\r
        class="navbar__link"\r
        ><div class="navbar__icon navbar__icon--clues"></div>\r
        <span>Pistas</span></a\r
      >\r
    </li>\r
    <li class="navbar__item">\r
      <a\r
        href="/tupais/src/index.html"\r
        class="navbar__link"\r
        ><div class="navbar__icon navbar__icon--record"></div>\r
        <span>Récord</span></a\r
      >\r
    </li>\r
    <li class="navbar__item">\r
      <a\r
        href="/tupais/src/index.html"\r
        class="navbar__link"\r
        ><div class="navbar__icon navbar__icon--time-trial"></div>\r
        <span>Contrareloj</span></a\r
      >\r
    </li>\r
  </ul>\r
  <p class="navbar__paragraph">Información</p>\r
  <ul class="navbar__list">\r
    <li class="navbar__item">\r
      <a\r
        href="/tupais/src/index.html"\r
        class="navbar__link"\r
        ><div class="navbar__icon navbar__icon--flag"></div>\r
        <span>Banderas</span></a\r
      >\r
    </li>\r
    <li class="navbar__item">\r
      <a href="/tupais/src/index.html" class="navbar__link"\r
        ><div class="navbar__icon navbar__icon--about"></div>\r
        <span>Acerca del juego</span></a\r
      >\r
    </li>\r
    <li class="navbar__item">\r
      <a href="/tupais/src/index.html" class="navbar__link"\r
        ><div class="navbar__icon navbar__icon--credits"></div>\r
        <span>Créditos</span></a\r
      >\r
    </li>\r
  </ul>\r
</nav>\r
`,wt={block:"navbar",list:{block:"navbar__list",paragraph:"navbar__paragraph",item:{block:"navbar__item",link:"navbar__link"},icons:"navbar__icon"},button:{block:"navbar__button",span:"navbar__icon"}},St={darkMode:{block:"navbar--dark-mode",list:{block:"navbar__list--dark-mode",paragraph:"navbar__paragraph--dark-mode",item:{block:"navbar__item--dark-mode",link:"navbar__link--dark-mode"},icons:"navbar__icon--dark-mode"},button:{block:"navbar__button--dark-mode",span:"navbar__icon--dark-mode"}}};class xt extends c{constructor(t,n){super(),this.htmlString=yt,this.base=wt,this.modifiers=St,this.state=t,this.dispatch=n,this.button=new C(this.dispatch,{ui:{navbar:{show:!1}}}),this.dom=this._createDom(),this._init()}_init(){this.dom.prepend(this.button.dom)}syncState(t){var n,s;((n=this.state)==null?void 0:n.ui.navbar.show)!=(t==null?void 0:t.ui.navbar.show)&&(this._showDom(t==null?void 0:t.ui.navbar.show),this._activeEvents(t==null?void 0:t.ui.navbar.show)),((s=this.state)==null?void 0:s.ui.darkMode)!=(t==null?void 0:t.ui.darkMode)&&this._setDarkMode(t==null?void 0:t.ui.darkMode),this.state=t}_showDom(t){t&&(this.dom.classList.add("navbar--show"),this.dom.focus()),t||this.dom.classList.remove("navbar--show")}_activeEvents(t){this._clickEvent||(this._clickEvent=n=>{this.dom.contains(n.target)||this.dispatch({ui:{navbar:{show:!1}}})}),this._escEvent||(this._escEvent=n=>{n.stopImmediatePropagation(),n.key=="Escape"&&(this.dispatch({ui:{navbar:{show:!1}}}),this.dom.blur(),this.dom.removeEventListener("keydown",this._escEvent))}),t?(window.addEventListener("click",this._clickEvent),this.dom.addEventListener("keydown",this._escEvent)):(window.removeEventListener("click",this._clickEvent),this.dom.removeEventListener("keydown",this._escEvent))}}const Lt={block:"header",container:"header__container",title:"header__title"},Mt={darkMode:{block:"header--dark-mode",container:"header__container--dark-mode",title:"header__title--dark-mode"}};class Et extends c{constructor(t,n){super(),this.htmlString=ht,this.base=Lt,this.modifiers=Mt,this.openNavbarButton=new _t(t,n),this.openSettingsButton=new kt(n),this.navbar=new xt(t,n),this.dom=this._createDom(),this._init(),this.syncState(t)}syncState(t){this.navbar.syncState(t),this.openNavbarButton.syncState(t),this.openSettingsButton.syncState(t);let n=t.ui.darkMode;this.isDarkMode!=n&&(this._setDarkMode(n),this.isDarkMode=n)}_init(){this.dom.querySelector(".header__container").prepend(this.openNavbarButton.dom),this.dom.querySelector(".header__container").appendChild(this.openSettingsButton.dom),this.dom.querySelector(".header__container").appendChild(this.navbar.dom)}}const Ct=`<dialog class="settings">\r
   <div class="settings__container">\r
      <h2 class="settings__title">Configuración</h2>\r
      <h3 class="settings__subtitle">Modo oscuro</h3>\r
      <h3 class="settings__subtitle">Juego</h3>\r
   </div>\r
</dialog>\r
`,At=`<label class="dark-mode-button" tabindex="0">\r
  <input\r
    type="checkbox"\r
    class="dark-mode-button__checkbox"\r
    name="checkbox"\r
    tabindex="-1"\r
  />\r
  <span class="dark-mode-button__circle">\r
    <img\r
      class="dark-mode-button__sun"\r
      width="18"\r
      height="18"\r
      src="/tupais/icons/sun.svg"\r
      alt="sun-symbol"\r
    />\r
    <img\r
      class="dark-mode-button__moon"\r
      width="20"\r
      height="20"\r
      src="/tupais/icons/moon.png"\r
      alt="moon-symbol"\r
    />\r
  </span>\r
</label>\r
`,I={block:"dark-mode-button",circle:"dark-mode-button__circle",checkbox:"dark-mode-button__checkbox"};class Bt extends c{constructor(t,n){super(),this.base=I,this.htmlString=At,this.dom=this._createDom(),this._init(t,n)}_init(t,n){const s=this.dom.querySelector("."+I.checkbox);s.checked=t.ui.darkMode,this.dom.addEventListener("change",()=>{n({ui:{darkMode:s.checked}})}),this.dom.addEventListener("keydown",i=>{i.key=="Enter"&&s.click()})}}const E={block:"settings",title:"settings__title",subtitle:"settings__subtitle",continentsText:"settings__continents-text",container:"settings__container"},f={show:{block:"settings--show"},display:{block:"settings--display"},darkMode:{block:"settings--dark-mode",title:"settings__title--dark-mode",subtitle:"settings__subtitle--dark-mode",continentsText:"settings__continents-text--dark-mode"}};class It extends c{constructor(t,n){super(),this.htmlString=Ct,this.base=E,this.modifiers=f,this.dispatch=n,this.state=t,this.continent=w.ALL,this.closeButton=new C(n,{ui:{settings:{show:!1}}}),this.darkModeButton=new Bt(t,n),this.continentSelector=new q(t,n),this.dom=this._createDom(),this._init(n)}_init(){this.dom.querySelector("."+E.container),this.dom.appendChild(this.closeButton.dom),this.dom.querySelector("."+E.subtitle).insertAdjacentElement("afterend",this.darkModeButton.dom),this.dom.querySelector("."+this.base.container).appendChild(this.continentSelector.dom),this.dom.addEventListener("cancel",t=>{t.preventDefault()})}_activeEvents(t){this._escEvent||(this._escEvent=n=>{n.key=="Escape"&&(n.preventDefault(),n.stopImmediatePropagation(),this.dispatch({ui:{settings:{show:!1}}}),this.dom.blur())}),t?window.addEventListener("keydown",this._escEvent):window.removeEventListener("keydown",this._escEvent)}syncState(t){this.state.ui.settings.show!=t.ui.settings.show&&(this._show(t.ui.settings.show),this._activeEvents(t.ui.settings.show),this.isShow=t.ui.settings.show),this.state.ui.darkMode!=t.ui.darkMode&&(this._setDarkMode(t.ui.darkMode),this.continentSelector._setDarkMode(t.ui.darkMode)),this.closeButton.syncState(t),this.continentSelector.syncState(t),this.state=t}_show(t){t&&(this.dom.showModal(),this.dom.classList.add(f.display.block),requestAnimationFrame(()=>{this.dom.classList.add(f.show.block)})),t||(this.dom.classList.remove(f.show.block),this.dom.addEventListener("transitionend",()=>{this.dom.classList.remove(f.display.block),this.dom.close()},{once:!0}))}_setContinentValue(t){this.continent=t}_getContinentValue(){return this.continent}}const qt={block:"game"},Ot=`<div class="score">\r
  <div class="score__statistics score__statistics--remaining">\r
    <div class="score__title">Aciertos</div>\r
    <div class="score__points">10</div>\r
  </div>\r
  <div class="score__statistics score__statistics--successes">\r
    <div class="score__title">Restantes</div>\r
    <div class="score__points">10</div>\r
  </div>\r
</div>\r
`,Dt={block:"score",remaining:"score__statistics--remaining",successes:"score__statistics--successes",title:"score__title",points:"score__points"},Nt={change:{points:"score__points--change"}};class Tt extends c{constructor(t){super(),this.htmlString=Ot,this.base=Dt,this.modifiers=Nt,this.state=t,this.dom=this._createDom(),this._init(t)}syncState(t){if(t.game.correctAnswers!=this.state.game.correctAnswers||t.game.remainingAnswers!=this.state.game.remainingAnswers){const n=this.dom.querySelector("."+this.base.remaining).querySelector("."+this.base.points),s=this.dom.querySelector("."+this.base.successes).querySelector("."+this.base.points);n.textContent=t.game.correctAnswers,s.textContent=t.game.remainingAnswers,n.classList.add(this.modifiers.change.points),n.addEventListener("animationend",()=>{n.classList.remove(this.modifiers.change.points)}),s.classList.add(this.modifiers.change.points),s.addEventListener("animationend",()=>{s.classList.remove(this.modifiers.change.points)}),this.state=t}}_init(t){const n=this.dom.querySelector("."+this.base.remaining).querySelector("."+this.base.points),s=this.dom.querySelector("."+this.base.successes).querySelector("."+this.base.points);n.textContent=t.game.correctAnswers,s.textContent=t.game.remainingAnswers}}const Pt={block:"country"},Ft=`<div class="country__flags">\r
  <div class="country__flags-conainter">\r
    <img\r
    class="country__flag"\r
    src="/tupais/images/flags/fr.svg"\r
    alt="Imagen de bandera"\r
  />\r
  <img\r
    class="country__flag"\r
    src="/tupais/images/flags/ar.svg"\r
    alt="Imagen de bandera"\r
  />\r
  <img\r
    class="country__flag"\r
    src="/tupais/images/flags/br.svg"\r
    alt="Imagen de bandera"\r
  />\r
  </div>\r
</div>\r
`,zt={block:"country__flags",container:"country__flags-conainter",flag:"country__flag",previousFlag:"country__flag--previous",currentFlag:"country__flag--current",nextFlag:"country__flag--next"},Rt={darkMode:{block:""},animationInLeft:{flag:"country__flag--in-left"},animationOutRight:{flag:"country__flag--out-right"},animationInRight:{flag:"country__flag--in-right"},animationOutLeft:{flag:"country__flag--out-left"}},$t="md",Gt="yt",Ut="nr",jt="mz",Vt="br",Kt="al",Ht="nu",Wt="pw",Jt="ng",Zt="gm",Yt="so",Qt="ye",Xt="my",tn="dm",nn="mg",en="cy",sn="ie",on="py",an="kw",rn="dz",cn="hr",ln="mq",dn="rw",un="sy",hn="xk",mn="hn",gn="jo",bn="tv",_n="np",pn="lr",fn="at",vn="gg",kn="mr",yn="dj",wn="fj",Sn="no",xn="lv",Ln="ax",Mn="bg",En="bb",Cn="bn",An="ar",Bn="ma",In="gt",qn="ke",On="mt",Dn="cz",Nn="gi",Tn="aw",Pn="fr",Fn="bw",zn="sr",Rn="ua",$n="fi",Gn="ir",Un="cu",jn="er",Vn="lt",Kn="ms",Hn="ph",Wn="vu",Jn="bo",Zn="ro",Yn="kh",Qn="zw",Xn="je",te="gy",ne="am",ee="me",se="gl",ie="zm",oe="se",ae="in",re="mn",ce="sn",le="tz",de="cn",ue="co",he="mm",me="ru",ge="by",be="pt",_e="sz",pe="pl",fe="ch",ve="cg",ke="ve",ye="ws",we="dk",Se="lu",xe="si",Le="tg",Me="th",Ee="bs",Ce="to",Ae="gr",Be="bi",Ie="bh",qe="il",Oe="ly",De="uy",Ne="ni",Te="la",Pe="ai",Fe="fm",ze="de",Re="gu",$e="ki",Ge="jm",Ue="ps",je="ad",Ve="cl",Ke="ls",He="au",We="gd",Je="gh",Ze="sc",Ye="ao",Qe="bm",Xe="ml",ts="cw",ns="gp",es="bd",ss="km",is="bz",os="ug",as="sg",rs="li",cs="is",ls="na",ds="eg",us="rs",hs="mu",ms="mo",gs="mv",bs="id",_s="ee",ps="vn",fs="it",vs="gn",ks="td",ys="ec",ws="ge",Ss="mw",xs="iq",Ls="qa",v={Moldavia:$t,"Estados Unidos":"us",Mayotte:Gt,Nauru:Ut,Mozambique:jt,Brasil:Vt,"Cabo Verde":"cv","Guinea Ecuatorial":"gq",Albania:Kt,"Islas Vírgenes de los Estados Unidos":"vi",Niue:Ht,Palau:Wt,Nigeria:Jt,"Islas Vírgenes del Reino Unido":"vg",Gambia:Zt,Somalia:Yt,Yemen:Qt,Malasia:Xt,Dominica:tn,"Reino Unido":"gb",Madagascar:nn,"Sahara Occidental":"eh",Chipre:en,"Antigua y Barbuda":"ag",Irlanda:sn,Paraguay:on,"Sri Lanka":"lk",Sudáfrica:"za",Kuwait:an,Argelia:rn,Croacia:cn,Martinica:ln,"Sierra Leone":"sl","Islas Marianas del Norte":"mp",Ruanda:dn,Siria:un,"San Vicente y Granadinas":"vc",Kosovo:hn,"Santa Lucía":"lc",Honduras:mn,Jordania:gn,Tuvalu:bn,Nepal:_n,Liberia:pn,"Islas Heard y McDonald":"hm",Austria:fn,Guernsey:vn,"República Centroafricana":"cf",Mauritania:kn,Djibouti:yn,Fiyi:wn,Noruega:Sn,Letonia:xn,"Islas Malvinas":"fk",Kazajistán:"kz",Alandia:Ln,Turkmenistán:"tm","Islas Cocos o Islas Keeling":"cc",Bulgaria:Mn,"Islas Tokelau":"tk","Nueva Caledonia":"nc",Barbados:En,"Santo Tomé y Príncipe":"st",Antártida:"aq",Brunei:Cn,Bután:"bt",Camerún:"cm",Argentina:An,Azerbaiyán:"az",México:"mx",Marruecos:Bn,Guatemala:In,Kenia:qn,Malta:On,Chequia:Dn,Gibraltar:Nn,Aruba:Tn,"San Bartolomé":"bl",Mónaco:"mc","Emiratos Árabes Unidos":"ae","Sudán del Sur":"ss","Puerto Rico":"pr","El Salvador":"sv",Francia:Pn,Níger:"ne","Costa de Marfil":"ci","Islas Georgias del Sur y Sandwich del Sur":"gs",Botswana:Fn,"Territorio Británico del Océano Índico":"io",Uzbekistán:"uz",Túnez:"tn","Hong Kong":"hk","Macedonia del Norte":"mk",Surinam:zn,Bélgica:"be","Samoa Americana":"as","Islas Salomón":"sb",Ucrania:Rn,Finlandia:$n,"Burkina Faso":"bf","Bosnia y Herzegovina":"ba",Iran:Gn,Cuba:Un,Eritrea:jn,"República Eslovaca":"sk",Lituania:Vn,"Saint Martin":"mf","Islas Pitcairn":"pn","Guinea-Bisáu":"gw",Montserrat:Kn,Turquía:"tr",Filipinas:Hn,Vanuatu:Wn,Bolivia:Jn,"San Cristóbal y Nieves":"kn",Rumania:Zn,Camboya:Yn,Zimbabue:Qn,Jersey:Xn,Kirguizistán:"kg","Caribe Neerlandés":"bq",Guyana:te,"Islas Ultramarinas Menores de Estados Unidos":"um",Armenia:ne,Líbano:"lb",Montenegro:ee,Groenlandia:se,"Papúa Nueva Guinea":"pg",Zambia:ie,"Trinidad y Tobago":"tt","Tierras Australes y Antárticas Francesas":"tf",Perú:"pe",Suecia:oe,Sudán:"sd","San Pedro y Miquelón":"pm",Omán:"om",India:ae,Taiwán:"tw",Mongolia:re,Senegal:ce,Tanzania:le,Canadá:"ca","Costa Rica":"cr",China:de,Colombia:ue,Myanmar:he,Rusia:me,"Corea del Norte":"kp","Islas Caimán":"ky","Isla Bouvet":"bv",Bielorrusia:ge,Portugal:be,Suazilandia:_e,Polonia:pe,Suiza:fe,Congo:ve,Venezuela:ke,Panamá:"pa","Países Bajos":"nl",Samoa:ye,Dinamarca:we,Luxemburgo:Se,"Islas Faroe":"fo",Eslovenia:xe,Togo:Le,Tailandia:Me,"Wallis y Futuna":"wf",Bahamas:Ee,Tonga:Ce,Grecia:Ae,"San Marino":"sm",Reunión:"re","Ciudad del Vaticano":"va",Burundi:Be,Bahrein:Ie,"Islas Marshall":"mh","Islas Turks y Caicos":"tc","Isla de Man":"im",Haití:"ht",Afganistán:"af",Israel:qe,Libia:Oe,Uruguay:De,"Isla de Norfolk":"nf",Nicaragua:Ne,"Islas Cook":"ck",Laos:Te,"Isla de Navidad":"cx","Santa Elena, Ascensión y Tristán de Acuña":"sh",Anguilla:Pe,Micronesia:Fe,Alemania:ze,Guam:Re,Kiribati:$e,"Sint Maarten":"sx",España:"es",Jamaica:Ge,Palestina:Ue,"Guayana Francesa":"gf",Andorra:je,Chile:Ve,Lesotho:Ke,Australia:He,Grenada:We,Ghana:Je,Seychelles:Ze,Angola:Ye,Bermudas:Qe,Pakistán:"pk",Mali:Xe,"Arabia Saudí":"sa",Curazao:ts,"Corea del Sur":"kr",Etiopía:"et",Guadalupe:ns,Bangladesh:es,"Nueva Zelanda":"nz",Comoras:ss,Belice:is,Uganda:os,Singapur:as,Liechtenstein:rs,Hungría:"hu",Islandia:cs,Tayikistán:"tj",Namibia:ls,"Timor Oriental":"tl",Egipto:ds,Serbia:us,Mauricio:hs,Macao:ms,"Polinesia Francesa":"pf",Maldivas:gs,Indonesia:bs,"Congo (Rep. Dem.)":"cd",Estonia:_s,Vietnam:ps,Italia:fs,Guinea:vs,Chad:ks,Ecuador:ys,Georgia:ws,Malawi:Ss,Irak:xs,"Islas Svalbard y Jan Mayen":"sj",Benín:"bj",Japón:"jp","República Dominicana":"do",Catar:Ls,Gabón:"ga"},k="/tupais/images/flags/";class Ms extends c{constructor(t,n){super(),this.htmlString=Ft,this.base=zt,this.modifiers=Rt,this.state=t,this.dispatch=n,this.flagIndex=1,this.dom=this._createDom(),this._init(t)}_init(t){const n=this.dom.querySelectorAll("."+this.base.flag);n[0].src=k+`${v[t.game.countries[t.game.countries.length-1]]}.svg`,n[1].src=k+`${v[t.game.countries[t.game.countryIndex]]}.svg`,n[2].src=k+`${v[t.game.countries[t.game.countryIndex+1]]}.svg`,this.dom.querySelectorAll("."+this.base.flag)[1].classList.add("country__flag--active",this.modifiers.animationInLeft.flag)}syncState(t){const n=this.dom.querySelectorAll("."+this.base.flag);let s=this.state.game.countryIndex,i=t.game.countryIndex;if(i==s)return;let o=z(s,i,t.game.countries.length);if(o=="forward"){let a=this.flagIndex,r=_(this.flagIndex,3);n[_(r,3)].src=k+`${v[t.game.countries[_(t.game.countryIndex,t.game.countries.length)]]}.svg`,n[r].classList.remove("country__flag--active",this.modifiers.animationInLeft.flag),n[a].classList.add(this.modifiers.animationOutLeft.flag),n[r].classList.add("country__flag--active",this.modifiers.animationInRight.flag),n[a].addEventListener("animationend",()=>{n[a].classList.remove("country__flag--active",this.modifiers.animationInRight.flag,this.modifiers.animationOutLeft.flag),this.dispatch({ui:{country:{animation:!1}}})},{once:!0}),this.flagIndex=r}if(o=="backward"){let a=this.flagIndex,r=x(this.flagIndex,3);n[x(r,3)].src=k+`${v[t.game.countries[x(t.game.countryIndex,t.game.countries.length)]]}.svg`,n[a].classList.remove(this.modifiers.animationInRight.flag),n[a].classList.add(this.modifiers.animationOutRight.flag),n[r].classList.add("country__flag--active",this.modifiers.animationInLeft.flag),n[a].addEventListener("animationend",()=>{n[a].classList.remove("country__flag--active",this.modifiers.animationInLeft.flag,this.modifiers.animationOutRight.flag),this.dispatch({ui:{country:{animation:!1}}})},{once:!0}),this.flagIndex=r}this.state=t}}const Es={block:"country__next-button"};class Cs extends c{constructor(t,n){super(),this.state=t,this.dom=u("button",{className:Es.block,title:"Siguiente ",onclick:()=>{n({ui:{country:{animation:!0}},game:{countryIndex:_(this.state.game.countryIndex,this.state.game.countries.length),answer:""}})}},u("div",{className:"country__button-icon--right"}))}syncState(t){t.ui.country.animation?this.dom.disabled=!0:this.dom.disabled=!1,this.state=t}}class As extends c{constructor(t,n){super(),this.base=Pt,this.nextButton=new Cs(t,n),this.flag=new Ms(t,n),this.state=t,this.dom=u("div",{className:this.base.block},u("div",{className:"country__fill"}),this.flag.dom,this.nextButton.dom)}syncState(t){this.flag.syncState(t),this.nextButton.syncState(t)}}const Bs=`<div class="answer">\r
  <div class="answer__row answer__row--1"></div>\r
  <div class="answer__row answer__row--2">\r
  </div>\r
</div>\r
`,Is={block:"answer",row1:"answer__row--1",row2:"answer__row--2",letter:"answer__letter",letterText:"answer__letter-text"},qs={darkMode:{block:""},show:{row:"answer__row--show"},selected:{letter:"answer__letter--selected"},insert:{letter:"answer__letter--insert"}};class Os extends c{constructor(t){super(),this.htmlString=Bs,this.base=Is,this.modifiers=qs,this.state=t,this.dom=this._createDom(),this._init(t)}syncState(t){t.game.countryIndex==this.state.game.countryIndex?this._insertAnswer(t):(this._clearTextOfLetters(),this._renderLetters(t)),this.state=t}_init(t){const n=this.dom.querySelector("."+this.base.row1),s=this.dom.querySelector("."+this.base.row2);let i=t.game.countries[t.game.countryIndex],o=i.split(" ")[0],a=i.split(" ")[1]||[];for(let r=0;r<o.length;r++)n.appendChild(u("div",{className:this.base.letter},u("span",{className:this.base.letterText})));n.querySelector("."+this.base.letter).classList.add(this.modifiers.selected.letter),a.length&&s.classList.add(this.modifiers.show.row);for(let r=0;r<a.length;r++)s.appendChild(u("div",{className:this.base.letter},u("span",{className:this.base.letterText})))}_insertAnswer(t){const n=this.dom.querySelectorAll("."+this.base.letter);let s=t.game.answer.length-this.state.game.answer.length;s>0?(n[t.game.answer.length-1].querySelector("."+this.base.letterText).textContent=t.game.answer[t.game.answer.length-1],this._changeSelected(t.game.answer.length),this._changeInserted(t.game.answer.length-1)):s<0&&(n[t.game.answer.length].querySelector("."+this.base.letterText).textContent=" ",this._changeSelected(t.game.answer.length))}_renderLetters(t){const n=this.dom.querySelector("."+this.base.row1),s=this.dom.querySelector("."+this.base.row2);let i=this.state.game.countries[this.state.game.countryIndex],o=i.split(" ")[0],a=t.game.countries[t.game.countryIndex],r=a.split(" ")[0],m=r.length-o.length;if(m>0)for(let l=o.length;l<r.length;l++)n.appendChild(u("div",{className:this.base.letter},u("span",{className:this.base.letterText})));else{const l=Array.from(n.children);for(let h=o.length-1;h>r.length-1;h--)l[h].remove()}this._changeSelected(0);let b=i.split(" ")[1]||[],d=a.split(" ")[1]||[];if(!(!b.length&&!d.length)){if(!d.length){s.textContent="",s.classList.remove(this.modifiers.show.row);return}if(d.length&&s.classList.add(this.modifiers.show.row),this._changeSelected(0),m=d.length-b.length,m>=0){let l;for(m==0?l=0:l=b.length,l;l<d.length;l++)s.appendChild(u("div",{className:this.base.letter},u("span",{className:this.base.letterText})))}else{const l=Array.from(s.children);for(let h=b.length-1;h>d.length-1;h--)l[h].remove()}}}_clearTextOfLetters(){const t=this.dom.querySelectorAll("."+this.base.letterText);for(let n of t)n.textContent=""}_changeSelected(t){var s,i;const n=this.dom.querySelectorAll("."+this.base.letter);(s=this.dom.querySelector("."+this.modifiers.selected.letter))==null||s.classList.remove(this.modifiers.selected.letter),(i=n[t])==null||i.classList.add(this.modifiers.selected.letter)}_changeInserted(t){const n=this.dom.querySelectorAll("."+this.base.letter);n[t].classList.add(this.modifiers.insert.letter),n[t].addEventListener("animationend",()=>{n[t].classList.remove(this.modifiers.insert.letter)},{once:!0})}}const Ds=`<div class="keyborad">\r
  <div class="keyboard__row--1">\r
    <button\r
      type="button"\r
      name="button-keyboard"\r
      value="q"\r
      class="keyboard__button"\r
    >\r
      Q\r
    </button>\r
    <button\r
      type="button"\r
      name="button-keyboard"\r
      value="w"\r
      class="keyboard__button"\r
    >\r
      W\r
    </button>\r
    <button\r
      type="button"\r
      name="button-keyboard"\r
      value="e"\r
      class="keyboard__button"\r
    >\r
      E\r
    </button>\r
    <button\r
      type="button"\r
      name="button-keyboard"\r
      value="r"\r
      class="keyboard__button"\r
    >\r
      R\r
    </button>\r
    <button\r
      type="button"\r
      name="button-keyboard"\r
      value="t"\r
      class="keyboard__button"\r
    >\r
      T\r
    </button>\r
    <button\r
      type="button"\r
      name="button-keyboard"\r
      value="y"\r
      class="keyboard__button"\r
    >\r
      Y\r
    </button>\r
    <button\r
      type="button"\r
      name="button-keyboard"\r
      value="u"\r
      class="keyboard__button"\r
    >\r
      U\r
    </button>\r
    <button\r
      type="button"\r
      name="button-keyboard"\r
      value="i"\r
      class="keyboard__button"\r
    >\r
      I\r
    </button>\r
    <button\r
      type="button"\r
      name="button-keyboard"\r
      value="o"\r
      class="keyboard__button"\r
    >\r
      O</button\r
    ><button\r
      type="button"\r
      name="button-keyboard"\r
      value="p"\r
      class="keyboard__button"\r
    >\r
      P\r
    </button>\r
  </div>\r
  <div class="keyboard__row--2">\r
    <button\r
      type="button"\r
      name="button-keyboard"\r
      value="a"\r
      class="keyboard__button"\r
    >\r
      A</button\r
    ><button\r
      type="button"\r
      name="button-keyboard"\r
      value="s"\r
      class="keyboard__button"\r
    >\r
      S</button\r
    ><button\r
      type="button"\r
      name="button-keyboard"\r
      value="d"\r
      class="keyboard__button"\r
    >\r
      D</button\r
    ><button\r
      type="button"\r
      name="button-keyboard"\r
      value="f"\r
      class="keyboard__button"\r
    >\r
      F</button\r
    ><button\r
      type="button"\r
      name="button-keyboard"\r
      value="g"\r
      class="keyboard__button"\r
    >\r
      G</button\r
    ><button\r
      type="button"\r
      name="button-keyboard"\r
      value="h"\r
      class="keyboard__button"\r
    >\r
      H</button\r
    ><button\r
      type="button"\r
      name="button-keyboard"\r
      value="j"\r
      class="keyboard__button"\r
    >\r
      J</button\r
    ><button\r
      type="button"\r
      name="button-keyboard"\r
      value="k"\r
      class="keyboard__button"\r
    >\r
      K</button\r
    ><button\r
      type="button"\r
      name="button-keyboard"\r
      value="l"\r
      class="keyboard__button"\r
    >\r
      L\r
    </button>\r
    <button\r
      type="button"\r
      name="button-keyboard"\r
      value="ñ"\r
      class="keyboard__button"\r
    >\r
      Ñ\r
    </button>\r
  </div>\r
  <div class="keyboard__row--3">\r
    <button\r
      type="button"\r
      name="button-keyboard"\r
      value="backspace"\r
      class="keyboard__button--backspace"\r
    >\r
      ➜\r
    </button>\r
    <button\r
      type="button"\r
      name="button-keyboard"\r
      value="z"\r
      class="keyboard__button"\r
    >\r
      Z</button\r
    ><button\r
      type="button"\r
      name="button-keyboard"\r
      value="x"\r
      class="keyboard__button"\r
    >\r
      X</button\r
    ><button\r
      type="button"\r
      name="button-keyboard"\r
      value="c"\r
      class="keyboard__button"\r
    >\r
      C\r
    </button>\r
    <button\r
      type="button"\r
      name="button-keyboard"\r
      value="v"\r
      class="keyboard__button"\r
    >\r
      V\r
    </button>\r
    <button\r
      type="button"\r
      name="button-keyboard"\r
      value="b"\r
      class="keyboard__button"\r
    >\r
      B\r
    </button>\r
    <button\r
      type="button"\r
      name="button-keyboard"\r
      value="n"\r
      class="keyboard__button"\r
    >\r
      N\r
    </button>\r
    <button\r
      type="button"\r
      name="button-keyboard"\r
      value="m"\r
      class="keyboard__button"\r
    >\r
      M\r
    </button>\r
    <button\r
      type="button"\r
      name="button-keyboard"\r
      value="enter"\r
      class="keyboard__button--enter"\r
    >\r
      ENVIAR\r
    </button>\r
  </div>\r
</div>\r
`,Ns={block:"keyborad",letterButton:"keyboard__button",backSpaceButton:"keyboard__button--backspace",sendButton:"keyboard__button--enter"};class Ts extends c{constructor(t,n){super(),this.htmlString=Ds,this.base=Ns,this.state=t,this.answer=t.game.answer,this.dom=this._createDom(),this._init(n)}syncState(t){this.answer=t.game.answer,this.state=t}_init(t){const n=this.dom.querySelectorAll("."+this.base.letterButton),s=this.dom.querySelector("."+this.base.backSpaceButton),i=this.dom.querySelector("."+this.base.sendButton);for(let o of n)o.addEventListener("click",()=>{this.answer.length!=this.state.game.countries[this.state.game.countryIndex].replace(/\s+/g,"").length&&(this.answer+=o.value,t({game:{answer:this.answer}}))});s.addEventListener("click",()=>{this.state.game.answer.length!=0&&(this.answer=this.answer.slice(0,this.answer.length-1),t({game:{answer:this.answer}}))}),i.addEventListener("click",()=>{t({game:{sendAnser:!0}})}),window.addEventListener("keydown",o=>{if(["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","ç","ñ"].includes(o.key)){if(this.answer.length==this.state.game.countries[this.state.game.countryIndex].replace(/\s+/g,"").length)return;this.answer+=o.key,t({game:{answer:this.answer}})}if(o.key=="Backspace"){if(this.state.game.answer.length==0)return;this.answer=this.answer.slice(0,this.answer.length-1),t({game:{answer:this.answer}})}o.key=="Enter"&&t({game:{sendAnser:!0}})})}}class Ps extends c{constructor(t,n){super(),this.state=t,this.score=new Tt(t,n),this.country=new As(t,n),this.answer=new Os(t),this.keyboard=new Ts(t,n),this.dom=u("div",{className:qt.block},this.score.dom,this.country.dom,this.answer.dom,this.keyboard.dom)}syncState(t){this.score.syncState(t),this.country.syncState(t),this.answer.syncState(t),this.keyboard.syncState(t)}}function Fs(e){var s,i;const t=e.game.correctAnswers;let n={ui:{...e.ui,settings:{...e.ui.settings},presentation:{...e.ui.presentation}},game:{...e.game}};return((i=(s=e.game)==null?void 0:s.answer)==null?void 0:i.toLowerCase().replace(" ",""))==e.game.countries[e.game.countryIndex].toLowerCase().replace(" ","")?n.game={...n.game,countryIndex:_(e.game.countryIndex,e.game.countries.length),answer:"",sendAnser:!1,correctAnswers:t+1,remainingAnswers:e.game.remainingAnswers-1}:n.game={...n.game,countryIndex:_(e.game.countryIndex,e.game.countries.length),answer:"",sendAnser:!1,remainingAnswers:e.game.remainingAnswers-1},console.log("def:",n),n}function zs(e,t){var n,s,i;return(n=t==null?void 0:t.game)!=null&&n.sendAnser?Fs(e):{ui:{...e.ui,...t.ui,settings:{...e.ui.settings,...(s=t.ui)==null?void 0:s.settings},presentation:{...e.ui.presentation,...(i=t.ui)==null?void 0:i.presentation}},game:{...e.game,...t.game}}}let g={ui:{darkMode:!1,navbar:{show:!1},settings:{show:!1,continentSelector:{options:{show:!1}}},presentation:{show:!1,continentSelector:{options:{show:!1}}},backdrop:{show:!1},country:{animation:!1}},game:{continent:"all",countries:["Islas Malvinas","Francia","Argentina","Brasil","Chile","Estados Unidos"],countryIndex:0,answer:"",sendAnser:!1,correctAnswers:0,remainingAnswers:10}},O=new ut(g,y),D=new Et(g,y),N=new It(g,y),T=new Ps(g,y);function y(e){console.log("Action:",e),g=zs(g,e),console.log("New state: ",g),console.log(""),O.syncState(g),D.syncState(g),N.syncState(g),T.syncState(g)}document.body.prepend(D.dom);document.body.appendChild(O.dom);document.body.querySelector("main").appendChild(T.dom);document.body.appendChild(N.dom);y({ui:{presentation:{show:!0}}});
