import"./index-DQllQ-ab.js";import{M as D}from"./classNewGame-Dn1j-uFa.js";import"./countryDataManajerJson-BXTmO6C4.js";const w="/tupais/";let l;function U(t,e){$(e,t.correctAnswers)}function $(t,e){const o=`
    <div class="answer-results">
    <button class="answer-results__close" title="Cerrar" type="button">
    </button>
    <p class="answer-results__paragraph">
    <span class="answer-results__span">RESULTADOS</span>
    <span class="answer-results__span"></span>
    <span class="answer-results__span">
      Respuestas correctas
    </span>
    <span class="answer-results__span">
      ${e}/10
    </span>
    </p>
    <a href="/game-modes.html" class="answer-results__button--change-mode" title="Cambiar de modo" target="_self"><span>CAMBIAR DE MODO</span></a>
    <button class="answer-results__button--start-again" title="Jugar de nuevo" type="button"><span>JUGAR DE NUEVO</span></button>

    </div>
    <div class="blurry-background"></div>`;t.insertAdjacentHTML("beforeend",o);const n=document.getElementsByClassName("answer-results")[0],a=document.getElementsByClassName("blurry-background")[0],i=document.getElementsByClassName("answer-results__button--start-again")[0],s=document.getElementsByClassName("answer-results__close")[0];i.addEventListener("click",function(){n.style.top="-20rem",a.style.opacity="0",a.remove(),n.remove(),y()}),s.addEventListener("click",function(){n.style.top="-20rem",a.style.opacity="0",a.remove(),n.remove(),y()}),document.addEventListener("keydown",r);function r(c){const[p]=document.getElementsByClassName("answer-results");c.key==="Escape"&&p&&(n.style.top="-20rem",a.style.opacity="0",a.remove(),n.remove(),y(),document.removeEventListener("keydown",r))}}function F(t){const[e]=document.getElementsByClassName("country__flag");e.src=t.countries[0].flagUrl;let o=`Bandera de ${t.countries[0].name}`;e.alt=o}function S(t,e){function o(n,a){const[i]=document.getElementsByClassName("response");if(i&&(n==="correct"&&i.classList.contains("correct")||n==="incorrect"&&i.classList.contains("incorrect")||n==="incomplete"&&i.classList.contains("incomplete")))return;let s=document.createElement("div");s.className="response",s.style.opacity=0,n==="correct"&&(s.textContent="Respuesta correcta",s.classList.add("correct")),n==="incorrect"&&(s.textContent="Respuesta incorrecta",s.classList.add("incorrect")),n==="incomplete"&&(s.textContent="Elige una opción",s.classList.add("incomplete")),a.appendChild(s),s.style.display="block",setTimeout(function(){s.style.opacity=1},100),setTimeout(function(){s.style.opacity=0},1500),setTimeout(function(){s.remove()},1600)}if(t.answerUser.length===0){o("incomplete",e);return}if(t.lastResponseStatus){o("correct",e);return}if(!t.lastResponseStatus){o("incorrect",e);return}}function H(t){return{africa:"Continente: ÁFRICA",americas:"Continente: AMÉRICA",asia:"Continente: ASIA",europe:"Continente: EUROPA",oceania:"Continente: OCEANÍA","all continents":"Continente: TODOS"}[t]}function R(t){const e=document.getElementsByClassName("multiple-choice__option");let o=Math.floor(Math.random()*e.length),n=[t.countries[0].name];for(let a=0;a<e.length;a++){let i,s;if(a===o){s=t.countries[0].name,i=`${t.countries[0].name}`,e[a].textContent=i,e[a].value=s;continue}for(let r=0;r<t.countries.length;r++)if(s=t.countries[Math.floor(Math.random()*t.countries.length)].name,!n.some(c=>c===s)){n.push(s);break}i=`${s}`,e[a].textContent=i,e[a].value=s}}async function y(){const[t]=document.getElementsByClassName("country__flag"),[e]=document.getElementsByClassName("country__description"),[o]=document.getElementsByClassName("game__correct-answers"),[n]=document.getElementsByClassName("game__remaining-countries"),[a]=document.getElementsByClassName("multiple-choice__send"),i=document.getElementsByClassName("multiple-choice__option");for(let p of i)p.style.backgroundColor="",p.style.border="";let s=localStorage.getItem("continent")?localStorage.getItem("continent"):"all continents";e.textContent=H(s),o.textContent="0",n.textContent="10";let r=w+"/images/flags";l=await D.create(s,-1,r),t.src=l.countries[0].flagUrl;let c=`Bandera de ${l.countries[0].name}`;t.alt=c,R(l),A("activate"),a.addEventListener("click",h)}function h(){const[t]=document.getElementsByClassName("game__correct-answers"),[e]=document.getElementsByClassName("game__remaining-countries"),[o]=document.getElementsByClassName("multiple-choice__send"),n=document.getElementsByClassName("multiple-choice__option");let a=l.answerUser.toLowerCase().replace(/\s/g,""),i=l.countries[0].name.toLowerCase().replace(/\s/g,"");if(o.removeEventListener("click",h),l.answerUser.length===0){S(l,document.getElementsByClassName("multiple-choice")[0]),o.addEventListener("click",h);return}l=l.verifyAnswer(a,i);let s=w+"images/icons";if(q(l.lastResponseStatus,s),S(l,document.getElementsByClassName("multiple-choice")[0]),A("deactivate"),T("activate",i),setTimeout(()=>{A("activate"),T("deactivate")},1500),l=l.resetAnswerUser(),l.lastResponseStatus&&(t.textContent=`${l.correctAnswers}`,O(t)),l=l.nextCountry(),l.countriesShown===10){setTimeout(()=>{U(l,document.getElementsByClassName("multiple-choice")[0])},1500);return}setTimeout(()=>{F(l)},0),setTimeout(()=>{e.textContent=`${e.textContent-1}`,O(e),R(l),o.addEventListener("click",h);for(let r of n)r.style.backgroundColor="",r.style.border=""},1500)}document.addEventListener("DOMContentLoaded",function(){const[t]=document.getElementsByClassName("game__start-again"),[e]=document.getElementsByClassName("game__bt-information");J(),t.addEventListener("click",y),e.addEventListener("click",N),e.addEventListener("mouseenter",k),G(),P(),j()});function j(){const[t]=document.getElementsByClassName("header__title"),[e]=document.getElementsByClassName("footer__paragraph");t.addEventListener("mouseenter",function(o){t.style.userSelect="text"}),t.addEventListener("mouseleave",function(o){t.style.userSelect="none"}),e.addEventListener("mouseenter",function(o){e.style.userSelect="text"}),e.addEventListener("mouseleave",function(o){e.style.userSelect="none"})}function N(){const[t]=document.getElementsByClassName("information-card"),[e]=document.getElementsByClassName("game__bt-information");t?I(t).then(()=>{e.style.backgroundColor="",t.remove(),e.addEventListener("mouseenter",k)}):(x(),document.addEventListener("mousemove",B),e.removeEventListener("mouseenter",k))}function k(){const[t]=document.getElementsByClassName("information-card"),[e]=document.getElementsByClassName("game__bt-information");if(e.removeEventListener("click",N),setTimeout(()=>{e.addEventListener("click",N)},0),t){e.style.backgroundColor="",t.remove(),e.addEventListener("mouseenter",k),document.removeEventListener("mousemove",B);return}x(),document.addEventListener("mousemove",B),e.removeEventListener("mouseenter",k)}function B(t){const[e]=document.getElementsByClassName("information-card"),[o]=document.getElementsByClassName("presentation__div"),[n]=document.getElementsByClassName("information-card__subtitle"),[a]=document.getElementsByClassName("information-card__paragraph"),[i]=document.getElementsByClassName("game__bt-information");e&&t.target!==e&&t.target!==o&&t.target!==n&&t.target!==a&&t.target!==i&&I(e).then(()=>{i.style.backgroundColor="",e.remove(),i.addEventListener("mouseenter",k),document.removeEventListener("mousemove",B)})}function z(t){t.style.opacity="0",t.style.width="21rem",t.style.height="11rem",setTimeout(()=>{t.style.opacity="1"},15),setTimeout(()=>{t.style.width="22rem",t.style.height="12rem"},15)}async function I(t){return new Promise(e=>{t.style.width="21rem",t.style.height="11rem",setTimeout(()=>{t.style.opacity="0"},15),setTimeout(()=>{e()},100)})}document.addEventListener("keydown",t=>{t.key==="Enter"&&h()});function G(){const[t]=document.getElementsByClassName("navbar__button--open"),[e]=document.getElementsByClassName("navbar"),[o]=document.getElementsByClassName("navbar__button--close"),[n]=document.getElementsByClassName("footer__icon-github"),[a]=document.getElementsByClassName("multiple-choice");n.addEventListener("mouseover",()=>{let s=w+"/images/icons";a.classList.contains("dark-mode__page")?n.style.backgroundImage=`url(${s+"/icons-github-dark-mode-hover.svg"})`:n.style.backgroundImage=`url(${s+"/icons-github.svg"})`,n.addEventListener("mouseout",()=>{a.classList.contains("dark-mode__page")?n.style.backgroundImage=`url(${s+"/icons-github-dark-mode.svg"})`:n.style.backgroundImage=`url(${s+"/icons-github-hover.svg"})`})}),t.addEventListener("click",function(s){if(e.style.left==="-25rem"||e.style.left===""){new Promise(r=>{e.style.left="0rem",r()}).then(r=>{setTimeout(()=>{document.addEventListener("click",i)},0)});return}if(e.style.left==="0rem"){e.contains(s.target)||(e.style.left="-25rem",document.removeEventListener("click",i));return}});function i(s){e.contains(s.target)||(e.style.left="-25rem",document.removeEventListener("click",i))}o.addEventListener("click",function(){e.style.left="-25rem",document.removeEventListener("click",i)}),document.addEventListener("keydown",s=>{s.key==="Escape"&&e.style.left==="0rem"&&(e.style.left="-25rem")})}function q(t,e){const[o]=document.getElementsByClassName("country__container");let n=document.createElement("div"),a=document.createElement("img");const[i]=document.getElementsByClassName("multiple-choice");t?(e+="/icons-correct.svg",a.src=e):(e+="/icons-incorrect.svg",a.src=e),n.classList.add("overlappingBackground"),i.classList.contains("dark-mode__page")&&n.classList.add("dark-mode__overlappingBackground"),a.classList.add("multiple-choice__iconAnswer--defoult"),o.appendChild(n),o.appendChild(a),setTimeout(()=>{a.classList.add("multiple-choice__iconAnswer--active")},100),setTimeout(()=>{n.remove(),a.remove()},1500)}function A(t){const e=document.getElementsByClassName("multiple-choice__option");if(t==="activate")for(let o of e)o.addEventListener("click",M),o.style.cursor="pointer";if(t==="deactivate")for(let o of e)o.removeEventListener("click",M),o.style.cursor="initial"}function M(t){const e=document.getElementsByClassName("multiple-choice__option");let o=t.target;l=l.modifyAnswer(o.value),o.style.backgroundColor="#b3dbff",o.style.border="0.25rem solid whitesmoke";for(let n of e)n!==o&&(n.style.backgroundColor="",n.style.border="")}function T(t,e){const o=document.getElementsByClassName("multiple-choice__option");if(t==="activate")for(let n of o){let a=n.value.toLowerCase().replace(/\s/g,"");n.classList.remove("multiple-choice__option--active"),l.lastResponseStatus&&a===e&&(n.style.backgroundColor="#dff0d8",n.style.borderColor="#a3cc91"),l.lastResponseStatus||(a===e&&(n.style.backgroundColor="#dff0d8",n.style.borderColor="#a3cc91"),a!==e&&(n.style.backgroundColor="#f2dede"))}if(t==="deactivate")for(let n of o)n.style.backgroundColor=""}async function J(){const[t]=document.getElementsByClassName("header__settings"),[e]=document.getElementsByClassName("multiple-choice");t.addEventListener("click",()=>{n(e)});async function o(a){const i=`        
      <div class="presentation__section">
      <button class="presentation__header-link" title="Cerrar" type="button"
              >
          </button>
      <header class="presentation__header">
          <h2 class="presentation__header-title">TU PAÍS</h2>   
      </header>

      <div class="presentation__div">
          <p class="presentation__paragraph">
              <strong>TU PAÍS</strong> es un juego de adivinanzas
              geográficas en el que tenés que acertar el nombre de países de los diferentes continentes por sus banderas
              . Si completas las respuestas correctamente ¡Ganás!
          </p>

          <p
              class="presentation__label-continents"
              >Elige el continente de los paises</p
          >

          <select name="countries" title="countries" class="continents-dropdown">
              <option
                  value="all continents"
                  class="presentation__continents-dropdown-option"
              >
                  TODO EL MUNDO
              </option>
              <option
                  value="africa"
                  class="presentation__continents-dropdown-option"
              >
                  ÁFRICA
              </option>
              <option
                  value="americas"
                  class="presentation__continents-dropdown-option"
              >
                  AMÉRICA
              </option>
              <option
                  value="asia"
                  class="presentation__continents-dropdown-option"
              >
                  ASIA
              </option>
              <option
                  value="europe"
                  class="presentation__continents-dropdown-option"
              >
                  EUROPA
              </option>
              <option
                  value="oceania"
                  class="presentation__continents-dropdown-option"
              >
                  OCEANÍA
              </option>
          </select>

          <button class="presentation__button-start" title="Empezar" type="button"
              ><span>EMPEZAR</span></button
          >
      </div>
  </div>
  <div class="blurry-background"></div>
`;return new Promise(s=>{t.blur(),a.insertAdjacentHTML("beforeend",i);let[r]=document.getElementsByClassName("presentation__section"),[c]=document.getElementsByClassName("blurry-background");const[p]=document.getElementsByClassName("continents-dropdown"),[d]=document.getElementsByClassName("presentation__button-start"),[_]=document.getElementsByClassName("presentation__header-link");r.classList.add("presentation");let v="all continents";p.addEventListener("change",function(u){v=u.target.value,u.target.classList.add("continents-dropdown--focus")}),d.addEventListener("click",function(){localStorage.setItem("continent",v),c.style.opacity="0",c.remove(),r.remove(),document.removeEventListener("click",f),y()});function f(u){!r.contains(u.target)&&u.target!==t&&(localStorage.setItem("continent",v),c.style.opacity="0",c.remove(),r.remove(),document.removeEventListener("click",f),y())}_.addEventListener("click",function(){localStorage.setItem("continent",v),c.style.opacity="0",c.remove(),r.remove(),document.removeEventListener("click",f),y()}),document.addEventListener("keydown",b),document.addEventListener("click",f);function b(u){C(u)}function C(u){u.key==="Escape"&&r&&(localStorage.setItem("continent",v),c.style.opacity="0",c.remove(),r.remove(),document.removeEventListener("click",f),y(),document.removeEventListener("keydown",b))}})}function n(a){function i(m){m.style.height="23rem",m.style.width="26rem",m.style.opacity="0",setTimeout(()=>{m.style.opacity="1"},15),setTimeout(()=>{m.style.height="25rem",m.style.width="28rem"},15)}async function s(m){return new Promise(g=>{m.style.height="23rem",m.style.width="26rem",setTimeout(()=>{m.style.opacity="0"},15),setTimeout(()=>{g()},100)})}let r=w+"images/icons";const c=`       
               <div class="presentation__section">
               <button class="presentation__header-link" title="Cerrar" type="button"
                       >
                   </button>
               
                  <div class="presentation__div">
                  <h2 class="presentation__subtitle">Configuración</h2>
   
                  <div class="presentation__subtitle">Modo oscuro</div>
                  <button class="dark-mode-bt" type="button" title="Modo oscuro">
                     <img width="20" height="20"
                     src="${r}/icons-sun.svg" alt="sun-symbol" class="dark-mode-bt__sun"/ >
       
                     <div class="dark-mode-bt__circle"></div>
              
                     <img width="20" height="20"
                     src="${r}/icons-moon.png" alt="moon-symbol" class="dark-mode-bt__moon"/>
                  </button>
                  <div class="presentation__subtitle">Juego</div>
                   <p
                       class="presentation__label-continents"
                       >Elige el continente de los paises</p
                   >
   
                   <select name="countries" class="continents-dropdown" title="countries">
                       <option
                           value="all continents"
                           class="presentation__continents-dropdown-option"
                       >
                           TODO EL MUNDO
                       </option>
                       <option
                           value="africa"
                           class="presentation__continents-dropdown-option"
                       >
                           ÁFRICA
                       </option>
                       <option
                           value="americas"
                           class="presentation__continents-dropdown-option"
                       >
                           AMÉRICA
                       </option>
                       <option
                           value="asia"
                           class="presentation__continents-dropdown-option"
                       >
                           ASIA
                       </option>
                       <option
                           value="europe"
                           class="presentation__continents-dropdown-option"
                       >
                           EUROPA
                       </option>
                       <option
                           value="oceania"
                           class="presentation__continents-dropdown-option"
                       >
                           OCEANÍA
                       </option>
                   </select>
                   <button class="presentation__button-start" title="Empezar" type="button"
                       ><span>EMPEZAR</span></button
                   >
               </div>
           </div>
           <div class="blurry-background"></div>
   `,[p]=document.getElementsByClassName("header__settings");p.blur(),a.insertAdjacentHTML("beforeend",c);const[d]=document.getElementsByClassName("presentation__section");i(d);const[_]=document.getElementsByClassName("blurry-background"),[v]=document.getElementsByClassName("continents-dropdown"),[f]=document.getElementsByClassName("presentation__button-start"),[b]=document.getElementsByClassName("presentation__header-link");d.classList.add("settings");let C="all continents";v.addEventListener("change",function(m){C=m.target.value,m.target.classList.add("continents-dropdown--focus")}),f.addEventListener("click",function(){localStorage.setItem("continent",C),_.style.opacity="0",_.remove(),s(d).then(m=>{d.remove(),document.removeEventListener("click",u),document.removeEventListener("keydown",E),y()})});function u(m){!d.contains(m.target)&&m.target!==p&&d.classList.contains("settings")&&(_.style.opacity="0",_.remove(),s(d).then(g=>{d.remove(),document.removeEventListener("click",u),document.removeEventListener("keydown",E)}))}P(),b.addEventListener("click",function(){_.style.opacity="0",_.remove(),s(d).then(m=>{d.remove(),document.removeEventListener("click",u),document.removeEventListener("keydown",E)})}),document.addEventListener("keydown",E),document.addEventListener("click",u);function E(m){L(m)}function L(m){m.key==="Escape"&&d&&(_.style.opacity="0",_.remove(),s(d).then(g=>{d.remove(),document.removeEventListener("click",u),document.removeEventListener("keydown",E)}))}}!localStorage.getItem("time")&&!localStorage.getItem("continent")?await o(e):y()}function O(t){t.style.fontSize="1.5rem",setTimeout(()=>{t.style.fontSize="1.2rem"},140)}function x(t){const e=`       
            <div class="information-card">
            <div class="presentation__div">
                <h3 class="information-card__subtitle">¿Cómo jugar?</h3>

                <p
                    class="information-card__paragraph"
                    >En este formato hay que adivinar 10 países. Por cada país, se van
               a mostrar 4 opciones para poder adivinar el nombre, con la
               temática múltiple choice.</p
                >
            </div>
        </div>
`,[o]=document.getElementsByClassName("game__bt-information"),[n]=document.getElementsByClassName("game__container");n.insertAdjacentHTML("beforeend",e);const[a]=document.getElementsByClassName("information-card");z(a),o.style.backgroundColor="rgb(225, 225, 225)";function i(c){!a.contains(c.target)&&c.target!==o&&(a.remove(),o.style.backgroundColor="white",document.removeEventListener("keydown",s),document.removeEventListener("click",i))}document.addEventListener("keydown",s),document.addEventListener("click",i);function s(c){r(c)}function r(c){if(c.key==="Escape"){const[p]=document.getElementsByClassName("information-card"),[d]=document.getElementsByClassName("game__bt-information");a&&I(p).then(()=>{d.style.backgroundColor="",p.remove(),d.addEventListener("mouseenter",k)})}}}function P(){function t(a){const[i]=document.getElementsByClassName("header"),[s]=document.getElementsByClassName("footer"),[r]=document.getElementsByClassName("header__title"),[c]=document.getElementsByClassName("country__description"),[p]=document.getElementsByClassName("multiple-choice"),[d]=document.getElementsByClassName("multiple-choice__main"),[_]=document.getElementsByClassName("navbar__button--open"),[v]=document.getElementsByClassName("footer__paragraph"),[f]=document.getElementsByClassName("header__settings"),[b]=document.getElementsByClassName("game__start-again"),[C]=document.getElementsByClassName("footer__icon-github"),[u]=document.getElementsByClassName("multiple-choice__send"),E=document.getElementsByClassName("navbar__icon"),L=document.getElementsByClassName("multiple-choice__option"),m=document.getElementsByClassName("game__statistics-item");if(a==="activate"){i.classList.add("dark-mode__header"),s.classList.add("dark-mode__footer"),r.classList.add("dark-mode__header--title"),c.classList.add("dark-mode__game-text"),v.classList.add("dark-mode__game-text"),p.classList.add("dark-mode__page"),d.classList.add("dark-mode__page"),f.classList.add("dark-mode__button-settings"),_.classList.add("dark-mode__navbar-button-open"),b.classList.add("dark-mode__start-again"),C.classList.add("dark-mode__github-bt"),u.classList.add("dark-mode__send");for(let g of m)g.classList.add("dark-mode__game-text");for(let g of E)g.classList.add("dark-mode__navbar-icon");for(let g of L)g.classList.add("dark-mode__keyboard-button")}if(a==="deactivate"){i.classList.remove("dark-mode__header"),s.classList.remove("dark-mode__footer"),r.classList.remove("dark-mode__header--title"),c.classList.remove("dark-mode__game-text"),v.classList.remove("dark-mode__game-text"),p.classList.remove("dark-mode__page"),d.classList.remove("dark-mode__page"),f.classList.remove("dark-mode__button-settings"),_.classList.remove("dark-mode__navbar-button-open"),b.classList.remove("dark-mode__start-again"),C.classList.remove("dark-mode__github-bt"),u.classList.remove("dark-mode__send");for(let g of m)g.classList.remove("dark-mode__game-text");for(let g of E)g.classList.remove("dark-mode__navbar-icon");for(let g of L)g.classList.remove("dark-mode__keyboard-button")}}const[e]=document.getElementsByClassName("dark-mode-bt"),[o]=document.getElementsByClassName("dark-mode-bt__circle");let n;if(localStorage.getItem("darkMode")===""){if(window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?(localStorage.setItem("darkMode","1"),n=Number(localStorage.getItem("darkMode"))):(localStorage.setItem("darkMode","0"),n=Number(localStorage.getItem("darkMode"))),n){t("activate");return}return}else n=Number(localStorage.getItem("darkMode"));t(n?"activate":"deactivate"),e&&(n?(o.style.left="32px",e.style.backgroundColor="#0D336B"):(o.style.left="3px",e.style.backgroundColor="#BFE1FF")),e&&e.addEventListener("click",function(){o.style.left==="3px"?(o.style.left="32px",e.style.backgroundColor="#0D336B",localStorage.setItem("darkMode","1"),t("activate")):(o.style.left="3px",e.style.backgroundColor="#BFE1FF",localStorage.setItem("darkMode","0"),t("deactivate"))})}
