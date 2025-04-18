import"./index-DkIkTDby.js";import{M as P}from"./classNewGame-Dn1j-uFa.js";import"./countryDataManajerJson-BXTmO6C4.js";let c;function D(t,e){U(e,t.correctAnswers)}function U(t,e){const s=`
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
    <div class="blurry-background"></div>`;t.insertAdjacentHTML("beforeend",s);const n=document.getElementsByClassName("answer-results")[0],o=document.getElementsByClassName("blurry-background")[0],i=document.getElementsByClassName("answer-results__button--start-again")[0],a=document.getElementsByClassName("answer-results__close")[0];i.addEventListener("click",function(){n.style.top="-20rem",o.style.opacity="0",o.remove(),n.remove(),y()}),a.addEventListener("click",function(){n.style.top="-20rem",o.style.opacity="0",o.remove(),n.remove(),y()}),document.addEventListener("keydown",l);function l(r){const[d]=document.getElementsByClassName("answer-results");r.key==="Escape"&&d&&(n.style.top="-20rem",o.style.opacity="0",o.remove(),n.remove(),y(),document.removeEventListener("keydown",l))}}function F(t){const[e]=document.getElementsByClassName("country__flag");e.src=t.countries[0].flagUrl;let s=`Bandera de ${t.countries[0].name}`;e.alt=s}function I(t,e){function s(n,o){const[i]=document.getElementsByClassName("response");if(i&&(n==="correct"&&i.classList.contains("correct")||n==="incorrect"&&i.classList.contains("incorrect")||n==="incomplete"&&i.classList.contains("incomplete")))return;let a=document.createElement("div");a.className="response",a.style.opacity=0,n==="correct"&&(a.textContent="Respuesta correcta",a.classList.add("correct")),n==="incorrect"&&(a.textContent="Respuesta incorrecta",a.classList.add("incorrect")),n==="incomplete"&&(a.textContent="Elige una opción",a.classList.add("incomplete")),o.appendChild(a),a.style.display="block",setTimeout(function(){a.style.opacity=1},100),setTimeout(function(){a.style.opacity=0},1500),setTimeout(function(){a.remove()},1600)}if(t.answerUser.length===0){s("incomplete",e);return}if(t.lastResponseStatus){s("correct",e);return}if(!t.lastResponseStatus){s("incorrect",e);return}}function H(t){return{africa:"Continente: ÁFRICA",americas:"Continente: AMÉRICA",asia:"Continente: ASIA",europe:"Continente: EUROPA",oceania:"Continente: OCEANÍA","all continents":"Continente: TODOS"}[t]}function O(t){const e=document.getElementsByClassName("multiple-choice__option");let s=Math.floor(Math.random()*e.length),n=[t.countries[0].name];for(let o=0;o<e.length;o++){let i,a;if(o===s){a=t.countries[0].name,i=`${t.countries[0].name}`,e[o].textContent=i,e[o].value=a;continue}for(let l=0;l<t.countries.length;l++)if(a=t.countries[Math.floor(Math.random()*t.countries.length)].name,!n.some(r=>r===a)){n.push(a);break}i=`${a}`,e[o].textContent=i,e[o].value=a}}async function y(){const[t]=document.getElementsByClassName("country__flag"),[e]=document.getElementsByClassName("country__description"),[s]=document.getElementsByClassName("game__correct-answers"),[n]=document.getElementsByClassName("game__remaining-countries"),[o]=document.getElementsByClassName("multiple-choice__send"),i=document.getElementsByClassName("multiple-choice__option");for(let r of i)r.style.backgroundColor="",r.style.border="";let a=localStorage.getItem("continent")?localStorage.getItem("continent"):"all continents";e.textContent=H(a),s.textContent="0",n.textContent="10",c=await P.create(a,-1,"/images/flags"),t.src=c.countries[0].flagUrl;let l=`Bandera de ${c.countries[0].name}`;t.alt=l,O(c),N("activate"),o.addEventListener("click",h)}function h(){const[t]=document.getElementsByClassName("game__correct-answers"),[e]=document.getElementsByClassName("game__remaining-countries"),[s]=document.getElementsByClassName("multiple-choice__send"),n=document.getElementsByClassName("multiple-choice__option");let o=c.answerUser.toLowerCase().replace(/\s/g,""),i=c.countries[0].name.toLowerCase().replace(/\s/g,"");if(s.removeEventListener("click",h),c.answerUser.length===0){I(c,document.getElementsByClassName("multiple-choice")[0]),s.addEventListener("click",h);return}if(c=c.verifyAnswer(o,i),G(c.lastResponseStatus,"/images/icons"),I(c,document.getElementsByClassName("multiple-choice")[0]),N("deactivate"),M("activate",i),setTimeout(()=>{N("activate"),M("deactivate")},1500),c=c.resetAnswerUser(),c.lastResponseStatus&&(t.textContent=`${c.correctAnswers}`,T(t)),c=c.nextCountry(),c.countriesShown===10){setTimeout(()=>{D(c,document.getElementsByClassName("multiple-choice")[0])},1500);return}setTimeout(()=>{F(c)},0),setTimeout(()=>{e.textContent=`${e.textContent-1}`,T(e),O(c),s.addEventListener("click",h);for(let a of n)a.style.backgroundColor="",a.style.border=""},1500)}document.addEventListener("DOMContentLoaded",function(){const[t]=document.getElementsByClassName("game__start-again"),[e]=document.getElementsByClassName("game__bt-information");q(),t.addEventListener("click",y),e.addEventListener("click",w),e.addEventListener("mouseenter",b),z(),x(),j()});function j(){const[t]=document.getElementsByClassName("header__title"),[e]=document.getElementsByClassName("footer__paragraph");t.addEventListener("mouseenter",function(s){t.style.userSelect="text"}),t.addEventListener("mouseleave",function(s){t.style.userSelect="none"}),e.addEventListener("mouseenter",function(s){e.style.userSelect="text"}),e.addEventListener("mouseleave",function(s){e.style.userSelect="none"})}function w(){const[t]=document.getElementsByClassName("information-card"),[e]=document.getElementsByClassName("game__bt-information");t?A(t).then(()=>{e.style.backgroundColor="",t.remove(),e.addEventListener("mouseenter",b)}):(R(),document.addEventListener("mousemove",B),e.removeEventListener("mouseenter",b))}function b(){const[t]=document.getElementsByClassName("information-card"),[e]=document.getElementsByClassName("game__bt-information");if(e.removeEventListener("click",w),setTimeout(()=>{e.addEventListener("click",w)},0),t){e.style.backgroundColor="",t.remove(),e.addEventListener("mouseenter",b),document.removeEventListener("mousemove",B);return}R(),document.addEventListener("mousemove",B),e.removeEventListener("mouseenter",b)}function B(t){const[e]=document.getElementsByClassName("information-card"),[s]=document.getElementsByClassName("presentation__div"),[n]=document.getElementsByClassName("information-card__subtitle"),[o]=document.getElementsByClassName("information-card__paragraph"),[i]=document.getElementsByClassName("game__bt-information");e&&t.target!==e&&t.target!==s&&t.target!==n&&t.target!==o&&t.target!==i&&A(e).then(()=>{i.style.backgroundColor="",e.remove(),i.addEventListener("mouseenter",b),document.removeEventListener("mousemove",B)})}function $(t){t.style.opacity="0",t.style.width="21rem",t.style.height="11rem",setTimeout(()=>{t.style.opacity="1"},15),setTimeout(()=>{t.style.width="22rem",t.style.height="12rem"},15)}async function A(t){return new Promise(e=>{t.style.width="21rem",t.style.height="11rem",setTimeout(()=>{t.style.opacity="0"},15),setTimeout(()=>{e()},100)})}document.addEventListener("keydown",t=>{t.key==="Enter"&&h()});function z(){const[t]=document.getElementsByClassName("navbar__button--open"),[e]=document.getElementsByClassName("navbar"),[s]=document.getElementsByClassName("navbar__button--close"),[n]=document.getElementsByClassName("footer__icon-github"),[o]=document.getElementsByClassName("multiple-choice");n.addEventListener("mouseover",()=>{o.classList.contains("dark-mode__page")?n.style.backgroundImage="url('/images/icons/icons-github-dark-mode-hover.svg')":n.style.backgroundImage="url('/images/icons/icons-github.svg')",n.addEventListener("mouseout",()=>{o.classList.contains("dark-mode__page")?n.style.backgroundImage="url('/images/icons/icons-github-dark-mode.svg')":n.style.backgroundImage="url('/images/icons/icons-github-hover.svg')"})}),t.addEventListener("click",function(a){if(e.style.left==="-25rem"||e.style.left===""){new Promise(l=>{e.style.left="0rem",l()}).then(l=>{setTimeout(()=>{document.addEventListener("click",i)},0)});return}if(e.style.left==="0rem"){e.contains(a.target)||(e.style.left="-25rem",document.removeEventListener("click",i));return}});function i(a){e.contains(a.target)||(e.style.left="-25rem",document.removeEventListener("click",i))}s.addEventListener("click",function(){e.style.left="-25rem",document.removeEventListener("click",i)}),document.addEventListener("keydown",a=>{a.key==="Escape"&&e.style.left==="0rem"&&(e.style.left="-25rem")})}function G(t,e){const[s]=document.getElementsByClassName("country__container");let n=document.createElement("div"),o=document.createElement("img");const[i]=document.getElementsByClassName("multiple-choice");t?(e+="/icons-correct.svg",o.src=e):(e+="/icons-incorrect.svg",o.src=e),n.classList.add("overlappingBackground"),i.classList.contains("dark-mode__page")&&n.classList.add("dark-mode__overlappingBackground"),o.classList.add("multiple-choice__iconAnswer--defoult"),s.appendChild(n),s.appendChild(o),setTimeout(()=>{o.classList.add("multiple-choice__iconAnswer--active")},100),setTimeout(()=>{n.remove(),o.remove()},1500)}function N(t){const e=document.getElementsByClassName("multiple-choice__option");if(t==="activate")for(let s of e)s.addEventListener("click",S),s.style.cursor="pointer";if(t==="deactivate")for(let s of e)s.removeEventListener("click",S),s.style.cursor="initial"}function S(t){const e=document.getElementsByClassName("multiple-choice__option");let s=t.target;c=c.modifyAnswer(s.value),s.style.backgroundColor="#b3dbff",s.style.border="0.25rem solid whitesmoke";for(let n of e)n!==s&&(n.style.backgroundColor="",n.style.border="")}function M(t,e){const s=document.getElementsByClassName("multiple-choice__option");if(t==="activate")for(let n of s){let o=n.value.toLowerCase().replace(/\s/g,"");n.classList.remove("multiple-choice__option--active"),c.lastResponseStatus&&o===e&&(n.style.backgroundColor="#dff0d8",n.style.borderColor="#a3cc91"),c.lastResponseStatus||(o===e&&(n.style.backgroundColor="#dff0d8",n.style.borderColor="#a3cc91"),o!==e&&(n.style.backgroundColor="#f2dede"))}if(t==="deactivate")for(let n of s)n.style.backgroundColor=""}async function q(){const[t]=document.getElementsByClassName("header__settings"),[e]=document.getElementsByClassName("multiple-choice");t.addEventListener("click",()=>{n(e)});async function s(o){const i=`        
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
`;return new Promise(a=>{t.blur(),o.insertAdjacentHTML("beforeend",i);let[l]=document.getElementsByClassName("presentation__section"),[r]=document.getElementsByClassName("blurry-background");const[d]=document.getElementsByClassName("continents-dropdown"),[p]=document.getElementsByClassName("presentation__button-start"),[C]=document.getElementsByClassName("presentation__header-link");l.classList.add("presentation");let _="all continents";d.addEventListener("change",function(u){_=u.target.value,u.target.classList.add("continents-dropdown--focus")}),p.addEventListener("click",function(){localStorage.setItem("continent",_),r.style.opacity="0",r.remove(),l.remove(),document.removeEventListener("click",v),y()});function v(u){!l.contains(u.target)&&u.target!==t&&(localStorage.setItem("continent",_),r.style.opacity="0",r.remove(),l.remove(),document.removeEventListener("click",v),y())}C.addEventListener("click",function(){localStorage.setItem("continent",_),r.style.opacity="0",r.remove(),l.remove(),document.removeEventListener("click",v),y()}),document.addEventListener("keydown",E),document.addEventListener("click",v);function E(u){f(u)}function f(u){u.key==="Escape"&&l&&(localStorage.setItem("continent",_),r.style.opacity="0",r.remove(),l.remove(),document.removeEventListener("click",v),y(),document.removeEventListener("keydown",E))}})}function n(o){function i(m){m.style.height="23rem",m.style.width="26rem",m.style.opacity="0",setTimeout(()=>{m.style.opacity="1"},15),setTimeout(()=>{m.style.height="25rem",m.style.width="28rem"},15)}async function a(m){return new Promise(k=>{m.style.height="23rem",m.style.width="26rem",setTimeout(()=>{m.style.opacity="0"},15),setTimeout(()=>{k()},100)})}const l=`       
               <div class="presentation__section">
               <button class="presentation__header-link" title="Cerrar" type="button"
                       >
                   </button>
               
                  <div class="presentation__div">
                  <h2 class="presentation__subtitle">Configuración</h2>
   
                  <div class="presentation__subtitle">Modo oscuro</div>
                  <button class="dark-mode-bt" type="button" title="Modo oscuro">
                     <img width="20" height="20" src="/images/icons/icons-sun.svg" alt="sun-symbol" class="dark-mode-bt__sun"/>
       
                     <div class="dark-mode-bt__circle"></div>
              
                     <img width="20" height="20" src="/images/icons/icons-moon.png" alt="moon-symbol" class="dark-mode-bt__moon"/>
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
   `,[r]=document.getElementsByClassName("header__settings");r.blur(),o.insertAdjacentHTML("beforeend",l);const[d]=document.getElementsByClassName("presentation__section");i(d);const[p]=document.getElementsByClassName("blurry-background"),[C]=document.getElementsByClassName("continents-dropdown"),[_]=document.getElementsByClassName("presentation__button-start"),[v]=document.getElementsByClassName("presentation__header-link");d.classList.add("settings");let E="all continents";C.addEventListener("change",function(m){E=m.target.value,m.target.classList.add("continents-dropdown--focus")}),_.addEventListener("click",function(){localStorage.setItem("continent",E),p.style.opacity="0",p.remove(),a(d).then(m=>{d.remove(),document.removeEventListener("click",f),document.removeEventListener("keydown",u),y()})});function f(m){!d.contains(m.target)&&m.target!==r&&d.classList.contains("settings")&&(p.style.opacity="0",p.remove(),a(d).then(k=>{d.remove(),document.removeEventListener("click",f),document.removeEventListener("keydown",u)}))}x(),v.addEventListener("click",function(){p.style.opacity="0",p.remove(),a(d).then(m=>{d.remove(),document.removeEventListener("click",f),document.removeEventListener("keydown",u)})}),document.addEventListener("keydown",u),document.addEventListener("click",f);function u(m){L(m)}function L(m){m.key==="Escape"&&d&&(p.style.opacity="0",p.remove(),a(d).then(k=>{d.remove(),document.removeEventListener("click",f),document.removeEventListener("keydown",u)}))}}!localStorage.getItem("time")&&!localStorage.getItem("continent")?await s(e):y()}function T(t){t.style.fontSize="1.5rem",setTimeout(()=>{t.style.fontSize="1.2rem"},140)}function R(t){const e=`       
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
`,[s]=document.getElementsByClassName("game__bt-information"),[n]=document.getElementsByClassName("game__container");n.insertAdjacentHTML("beforeend",e);const[o]=document.getElementsByClassName("information-card");$(o),s.style.backgroundColor="rgb(225, 225, 225)";function i(r){!o.contains(r.target)&&r.target!==s&&(o.remove(),s.style.backgroundColor="white",document.removeEventListener("keydown",a),document.removeEventListener("click",i))}document.addEventListener("keydown",a),document.addEventListener("click",i);function a(r){l(r)}function l(r){if(r.key==="Escape"){const[d]=document.getElementsByClassName("information-card"),[p]=document.getElementsByClassName("game__bt-information");o&&A(d).then(()=>{p.style.backgroundColor="",d.remove(),p.addEventListener("mouseenter",b)})}}}function x(){function t(o){const[i]=document.getElementsByClassName("header"),[a]=document.getElementsByClassName("footer"),[l]=document.getElementsByClassName("header__title"),[r]=document.getElementsByClassName("country__description"),[d]=document.getElementsByClassName("multiple-choice"),[p]=document.getElementsByClassName("multiple-choice__main"),[C]=document.getElementsByClassName("navbar__button--open"),[_]=document.getElementsByClassName("footer__paragraph"),[v]=document.getElementsByClassName("header__settings"),[E]=document.getElementsByClassName("game__start-again"),[f]=document.getElementsByClassName("footer__icon-github"),[u]=document.getElementsByClassName("multiple-choice__send"),L=document.getElementsByClassName("navbar__icon"),m=document.getElementsByClassName("multiple-choice__option"),k=document.getElementsByClassName("game__statistics-item");if(o==="activate"){i.classList.add("dark-mode__header"),a.classList.add("dark-mode__footer"),l.classList.add("dark-mode__header--title"),r.classList.add("dark-mode__game-text"),_.classList.add("dark-mode__game-text"),d.classList.add("dark-mode__page"),p.classList.add("dark-mode__page"),v.classList.add("dark-mode__button-settings"),C.classList.add("dark-mode__navbar-button-open"),E.classList.add("dark-mode__start-again"),f.classList.add("dark-mode__github-bt"),u.classList.add("dark-mode__send");for(let g of k)g.classList.add("dark-mode__game-text");for(let g of L)g.classList.add("dark-mode__navbar-icon");for(let g of m)g.classList.add("dark-mode__keyboard-button")}if(o==="deactivate"){i.classList.remove("dark-mode__header"),a.classList.remove("dark-mode__footer"),l.classList.remove("dark-mode__header--title"),r.classList.remove("dark-mode__game-text"),_.classList.remove("dark-mode__game-text"),d.classList.remove("dark-mode__page"),p.classList.remove("dark-mode__page"),v.classList.remove("dark-mode__button-settings"),C.classList.remove("dark-mode__navbar-button-open"),E.classList.remove("dark-mode__start-again"),f.classList.remove("dark-mode__github-bt"),u.classList.remove("dark-mode__send");for(let g of k)g.classList.remove("dark-mode__game-text");for(let g of L)g.classList.remove("dark-mode__navbar-icon");for(let g of m)g.classList.remove("dark-mode__keyboard-button")}}const[e]=document.getElementsByClassName("dark-mode-bt"),[s]=document.getElementsByClassName("dark-mode-bt__circle");let n;if(localStorage.getItem("darkMode")===""){if(window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?(localStorage.setItem("darkMode","1"),n=Number(localStorage.getItem("darkMode"))):(localStorage.setItem("darkMode","0"),n=Number(localStorage.getItem("darkMode"))),n){t("activate");return}return}else n=Number(localStorage.getItem("darkMode"));t(n?"activate":"deactivate"),e&&(n?(s.style.left="32px",e.style.backgroundColor="#0D336B"):(s.style.left="3px",e.style.backgroundColor="#BFE1FF")),e&&e.addEventListener("click",function(){s.style.left==="3px"?(s.style.left="32px",e.style.backgroundColor="#0D336B",localStorage.setItem("darkMode","1"),t("activate")):(s.style.left="3px",e.style.backgroundColor="#BFE1FF",localStorage.setItem("darkMode","0"),t("deactivate"))})}
