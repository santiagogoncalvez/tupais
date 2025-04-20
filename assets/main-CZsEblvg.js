import"./index-DQllQ-ab.js";import{N as O}from"./classNewGame-Dn1j-uFa.js";import"./countryDataManajerJson-BXTmO6C4.js";let i,N="/tupais/";function D(e){let t=document.getElementsByClassName("homepage")[0];F(t,e.correctAnswers),$()}function $(){const e=document.getElementsByClassName("game__answer-letter");for(let t of e)t.textContent=""}function F(e,t){const n=`
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
      ${t}/10
    </span>
    <a href="/game-modes.html" class="answer-results__button--change-mode" title="Cambiar de modo" target="_self"><span>CAMBIAR DE MODO</span></a>
    <button class="answer-results__button--start-again" title="Jugar de nuevo" type="button"><span>JUGAR DE NUEVO</span></button>

    </div>
    <div class="blurry-background"></div>`;e.insertAdjacentHTML("beforeend",n);const a=document.getElementsByClassName("keyboard__button");for(let u of a)u.removeEventListener("click",E);document.removeEventListener("keydown",E);const s=document.getElementsByClassName("answer-results")[0],o=document.getElementsByClassName("blurry-background")[0],c=document.getElementsByClassName("answer-results__button--start-again")[0],r=document.getElementsByClassName("answer-results__close")[0];c.addEventListener("click",function(){s.style.top="-20rem",o.style.opacity="0",o.remove(),s.remove(),v()}),r.addEventListener("click",function(){s.style.top="-20rem",o.style.opacity="0",o.remove(),s.remove(),v()}),document.addEventListener("keydown",l);function l(u){const[m]=document.getElementsByClassName("answer-results");u.key==="Escape"&&m&&(s.style.top="-20rem",o.style.opacity="0",o.remove(),s.remove(),v(),document.removeEventListener("keydown",l))}}function H(e){const t=document.getElementsByClassName("game__answer-letter");if(t[t.length-1].textContent!=="")return;let n;if(e.answerUser.length===1&&(n=t[0],n.style.border="2px solid rgb(190, 190, 190)",t[1].style.border="2px solid rgb(62, 125, 214)"),e.answerUser.length!==1){if(e.answerUser.length===t.length){n=t[e.answerUser.length-1],n.style.border="2px solid rgb(190, 190, 190)",n.textContent=e.answerUser[e.answerUser.length-1],S(n);return}n=t[e.answerUser.length-1],n.style.border="2px solid rgb(190, 190, 190)",t[e.answerUser.length].style.border="2px solid rgb(62, 125, 214)"}n.textContent=e.answerUser[e.answerUser.length-1],S(n)}function j(e){const t=document.getElementsByClassName("game__answer-letter");let n=t[e.answerUser.length];if(e.answerUser.length+1===t.length){t[e.answerUser.length].style.border="2px solid rgb(62, 125, 214)",n.textContent="";return}t[e.answerUser.length+1].style.border="2px solid rgb(175, 190, 211)",t[e.answerUser.length].style.border="2px solid rgb(62, 125, 214)",n.textContent=""}function S(e){e.style.opacity="0.9",setTimeout(()=>{e.style.opacity="1"},20),e.style.height="1.7rem",e.style.width="1.7rem",e.style.fontSize="0.8rem",setTimeout(()=>{e.style.height="2.2rem",e.style.width="2.2rem"},60),setTimeout(()=>{e.style.height="2rem",e.style.width="2rem",e.style.fontSize="1rem"},70)}function T(e){e.style.fontSize="1.5rem",setTimeout(()=>{e.style.fontSize="1.2rem"},140)}function z(e){const t=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","ç","ñ","arrowright"],n="enter",a="backspace";return t.includes(e)?"letter":e===n?"enter":e===a?"backspace":null}function I(e,t){let n="";for(let a=0;a<e.length;a++){if(e[a]===" "){n+='<div class="game__answer-letter--space"></div>';continue}n+='<div class="keyboard__container-button"><div class="game__answer-letter"></div></div>'}t.innerHTML=n}function M(e){const[t]=document.getElementsByClassName("country__flag");t.src=e.countries[0].flagUrl;let n=`Bandera de ${e.countries[0].name}`;t.alt=n}function K(e,t){function n(s,o){const[c]=document.getElementsByClassName("response");if(c&&(s==="correct"&&c.classList.contains("correct")||s==="incorrect"&&c.classList.contains("incorrect")||s==="incomplete"&&c.classList.contains("incomplete")))return;let r=document.createElement("div");r.className="response",r.style.opacity=0,s==="correct"&&(r.textContent="Respuesta correcta",r.classList.add("correct")),s==="incorrect"&&(r.textContent="Respuesta incorrecta",r.classList.add("incorrect")),s==="incomplete"&&(r.textContent="Palabra incompleta",r.classList.add("incomplete")),o.appendChild(r),r.style.display="block",setTimeout(function(){r.style.opacity=1},100),setTimeout(function(){r.style.opacity=0},1200),setTimeout(function(){r.remove()},1400)}let a=e.countries[0].name.replace(/\s/g,"");if(e.lastResponseStatus){n("correct",t);return}if(!e.lastResponseStatus){e.answerUser.length!==a.length?n("incomplete",t):n("incorrect",t);return}}function G(e){return{africa:"Continente: ÁFRICA",americas:"Continente: AMÉRICA",asia:"Continente: ASIA",europe:"Continente: EUROPA",oceania:"Continente: OCEANÍA","all continents":"Continente: TODOS"}[e]}async function v(){const[e]=document.getElementsByClassName("country__flag"),[t]=document.getElementsByClassName("game__answer"),[n]=document.getElementsByClassName("country__description"),[a]=document.getElementsByClassName("game__correct-answers"),s=document.getElementsByClassName("keyboard__button"),[o]=document.getElementsByClassName("game__remaining-countries");let c=localStorage.getItem("continent")?localStorage.getItem("continent"):"all continents";n.textContent=G(c),a.textContent="0",o.textContent="10";let r=N+"images/flags";i=await O.create(c,-1,r),I(i.countries[0].name,t),e.src=i.countries[0].flagUrl;let l=`Bandera de ${i.countries[0].name}`;e.alt=l;for(let u of s)u.addEventListener("click",E);document.addEventListener("keydown",E)}function E(e){let t;if(e.key&&(t=e.key.toLowerCase()),e.target.value&&(t=e.target.value.toLowerCase()),!z(t))return;if(t==="arrowright"){h();return}if(t==="enter"){const[s]=document.getElementsByClassName("game__answer"),[o]=document.getElementsByClassName("game__correct-answers"),[c]=document.getElementsByClassName("game__remaining-countries"),[r]=document.getElementsByClassName("country__btNext"),l=document.getElementsByClassName("keyboard__button");for(let m of l)m.removeEventListener("click",E);if(document.removeEventListener("keydown",E),r.removeEventListener("click",h),i=i.verifyAnswer(i.answerUser,i.countries[0].name),K(i,document.getElementsByClassName("homepage")[0]),!i.lastResponseStatus&&i.answerUser.length!==i.countries[0].name.replace(/\s/g,"").length){for(let m of l)m.addEventListener("click",E);document.addEventListener("keydown",E),r.addEventListener("click",h);return}let u=N+"images/icons";i.lastResponseStatus||(a(),U(i.lastResponseStatus,u)),i.lastResponseStatus&&(o.textContent=`${i.correctAnswers}`,T(o),n(),U(i.lastResponseStatus,u),i.correctAnswers===10&&setTimeout(()=>{D(i)},1200),setTimeout(()=>{M(i)},0),setTimeout(()=>{c.textContent=`${c.textContent-1}`,T(c),I(i.countries[0].name,s),i=i.resetAnswerUser()},1200)),setTimeout(()=>{for(let m of l)m.addEventListener("click",E);document.addEventListener("keydown",E),r.addEventListener("click",h)},1200);return}if(t==="backspace"){if(i.answerUser.length===0)return;i=i.modifyAnswer(t,i.answerUser),j(i);return}if(t!=="backspace"){i=i.modifyAnswer(t,i.answerUser),H(i);return}function n(){const s=document.getElementsByClassName("game__answer-letter");for(let o of s)o.style.border="2px solid #a1cc8e",o.style.backgroundColor="#ecfde4"}function a(){const s=document.getElementsByClassName("game__answer-letter");for(let o of s)o.style.border="2px solid #f5abab",o.style.backgroundColor="#ffeeee";setTimeout(()=>{for(let o of s)o.style.border="",o.style.backgroundColor=""},1200)}}async function q(){const[e]=document.getElementsByClassName("header__settings"),[t]=document.getElementsByClassName("homepage");e.addEventListener("click",()=>{a(t)});async function n(s){const o=`        
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
`;return new Promise(c=>{e.blur(),s.insertAdjacentHTML("beforeend",o);let[r]=document.getElementsByClassName("presentation__section"),[l]=document.getElementsByClassName("blurry-background");const[u]=document.getElementsByClassName("continents-dropdown"),[m]=document.getElementsByClassName("presentation__button-start"),[p]=document.getElementsByClassName("presentation__header-link");r.classList.add("presentation");let _="all continents";u.addEventListener("change",function(g){_=g.target.value,g.target.classList.add("continents-dropdown--focus")}),m.addEventListener("click",function(){localStorage.setItem("continent",_),l.style.opacity="0",l.remove(),r.remove(),document.removeEventListener("click",f),v()});function f(g){!r.contains(g.target)&&g.target!==e&&(localStorage.setItem("continent",_),l.style.opacity="0",l.remove(),r.remove(),document.removeEventListener("click",f),v())}p.addEventListener("click",function(){localStorage.setItem("continent",_),l.style.opacity="0",l.remove(),r.remove(),document.removeEventListener("click",f),v()}),document.addEventListener("keydown",k),document.addEventListener("click",f);function k(g){C(g)}function C(g){g.key==="Escape"&&r&&(localStorage.setItem("continent",_),l.style.opacity="0",l.remove(),r.remove(),document.removeEventListener("click",f),v(),document.removeEventListener("keydown",k))}})}function a(s){function o(d){d.style.height="23rem",d.style.width="26rem",d.style.opacity="0",setTimeout(()=>{d.style.opacity="1"},15),setTimeout(()=>{d.style.height="25rem",d.style.width="28rem"},15)}async function c(d){return new Promise(y=>{d.style.height="23rem",d.style.width="26rem",setTimeout(()=>{d.style.opacity="0"},15),setTimeout(()=>{y()},100)})}let r=N+"images/icons";const l=`       
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
              
                     <img width="20" height="20" src="${r}/icons-moon.png" alt="moon-symbol" class="dark-mode-bt__moon"/>
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
   `,[u]=document.getElementsByClassName("header__settings");u.blur(),s.insertAdjacentHTML("beforeend",l);const[m]=document.getElementsByClassName("presentation__section");o(m);const[p]=document.getElementsByClassName("blurry-background"),[_]=document.getElementsByClassName("continents-dropdown"),[f]=document.getElementsByClassName("presentation__button-start"),[k]=document.getElementsByClassName("presentation__header-link");m.classList.add("settings");let C="all continents";_.addEventListener("change",function(d){C=d.target.value,d.target.classList.add("continents-dropdown--focus")}),f.addEventListener("click",function(){localStorage.setItem("continent",C),p.style.opacity="0",p.remove(),c(m).then(d=>{m.remove(),document.removeEventListener("click",g),document.removeEventListener("keydown",b),v()})});function g(d){!m.contains(d.target)&&d.target!==u&&m.classList.contains("settings")&&(p.style.opacity="0",p.remove(),c(m).then(y=>{m.remove(),document.removeEventListener("click",g),document.removeEventListener("keydown",b)}))}P(),k.addEventListener("click",function(){p.style.opacity="0",p.remove(),c(m).then(d=>{m.remove(),document.removeEventListener("click",g),document.removeEventListener("keydown",b)})}),document.addEventListener("keydown",b),document.addEventListener("click",g);function b(d){w(d)}function w(d){d.key==="Escape"&&m&&(p.style.opacity="0",p.remove(),c(m).then(y=>{m.remove(),document.removeEventListener("click",g),document.removeEventListener("keydown",b)}))}}!localStorage.getItem("time")&&!localStorage.getItem("continent")?await n(t):v()}document.addEventListener("DOMContentLoaded",function(){const[e]=document.getElementsByClassName("country__btNext"),[t]=document.getElementsByClassName("game__start-again"),[n]=document.getElementsByClassName("game__bt-information");q(),e.addEventListener("click",h),t.addEventListener("click",v),n.addEventListener("click",A),n.addEventListener("mouseenter",L),V(),P(),J()});function J(){const[e]=document.getElementsByClassName("header__title"),[t]=document.getElementsByClassName("footer__paragraph");e.addEventListener("mouseenter",function(n){e.style.userSelect="text"}),e.addEventListener("mouseleave",function(n){e.style.userSelect="none"}),t.addEventListener("mouseenter",function(n){t.style.userSelect="text"}),t.addEventListener("mouseleave",function(n){t.style.userSelect="none"})}function A(){const[e]=document.getElementsByClassName("information-card"),[t]=document.getElementsByClassName("game__bt-information");e?x(e).then(()=>{t.style.backgroundColor="",e.remove(),t.addEventListener("mouseenter",L)}):(R(),document.addEventListener("mousemove",B),t.removeEventListener("mouseenter",L))}function L(){const[e]=document.getElementsByClassName("information-card"),[t]=document.getElementsByClassName("game__bt-information");if(t.removeEventListener("click",A),setTimeout(()=>{t.addEventListener("click",A)},0),e){t.style.backgroundColor="",e.remove(),t.addEventListener("mouseenter",L),document.removeEventListener("mousemove",B);return}R(),document.addEventListener("mousemove",B),t.removeEventListener("mouseenter",L)}function B(e){const[t]=document.getElementsByClassName("information-card"),[n]=document.getElementsByClassName("presentation__div"),[a]=document.getElementsByClassName("information-card__subtitle"),[s]=document.getElementsByClassName("information-card__paragraph"),[o]=document.getElementsByClassName("game__bt-information");t&&e.target!==t&&e.target!==n&&e.target!==a&&e.target!==s&&e.target!==o&&x(t).then(()=>{o.style.backgroundColor="",t.remove(),o.addEventListener("mouseenter",L),document.removeEventListener("mousemove",B)})}function Z(e){e.style.opacity="0",e.style.width="20rem",e.style.height="9rem",setTimeout(()=>{e.style.opacity="1"},15),setTimeout(()=>{e.style.width="21rem",e.style.height="10rem"},15)}async function x(e){return new Promise(t=>{e.style.width="21rem",e.style.height="11rem",setTimeout(()=>{e.style.opacity="0"},15),setTimeout(()=>{t()},100)})}function h(){const[e]=document.getElementsByClassName("country__btNext");e.blur();const[t]=document.getElementsByClassName("country__flag"),[n]=document.getElementsByClassName("game__answer");t.addEventListener("load",a);function a(){I(i.countries[0].name,n),t.removeEventListener("load",a)}i=i.resetAnswerUser(i.countries),i=i.nextCountry(),M(i)}function V(){const[e]=document.getElementsByClassName("navbar__button--open"),[t]=document.getElementsByClassName("navbar"),[n]=document.getElementsByClassName("navbar__button--close"),[a]=document.getElementsByClassName("footer__icon-github"),[s]=document.getElementsByClassName("homepage");a.addEventListener("mouseover",()=>{let c=N+"/images/icons";s.classList.contains("dark-mode__page")?a.style.backgroundImage=`url(${c+"/icons-github-dark-mode-hover.svg"})`:a.style.backgroundImage=`url(${c+"/icons-github.svg"})`,a.addEventListener("mouseout",()=>{s.classList.contains("dark-mode__page")?a.style.backgroundImage=`url(${c+"/icons-github-dark-mode.svg"})`:a.style.backgroundImage=`url(${c+"/icons-github-hover.svg"})`})}),e.addEventListener("click",function(c){if(t.style.left==="-25rem"||t.style.left===""){new Promise(r=>{t.style.left="0rem",r()}).then(r=>{setTimeout(()=>{document.addEventListener("click",o)},0)});return}if(t.style.left==="0rem"){t.contains(c.target)||(t.style.left="-25rem",document.removeEventListener("click",o));return}});function o(c){t.contains(c.target)||(t.style.left="-25rem",document.removeEventListener("click",o))}n.addEventListener("click",function(){t.style.left="-25rem",document.removeEventListener("click",o)}),document.addEventListener("keydown",c=>{c.key==="Escape"&&t.style.left==="0rem"&&(t.style.left="-25rem")})}function U(e,t){const[n]=document.getElementsByClassName("country__container");let a=document.createElement("div"),s=document.createElement("img");const[o]=document.getElementsByClassName("homepage");e?(t+="/icons-correct.svg",s.src=t):(t+="/icons-incorrect.svg",s.src=t),a.classList.add("overlappingBackground"),o.classList.contains("dark-mode__page")&&a.classList.add("dark-mode__overlappingBackground"),s.classList.add("multiple-choice__iconAnswer--defoult"),n.appendChild(a),n.appendChild(s),setTimeout(()=>{s.classList.add("multiple-choice__iconAnswer--active")},100),setTimeout(()=>{a.remove(),s.remove()},1200)}function R(e){const t=`       
            <div class="information-card">
            <div class="presentation__div">
                <h3 class="information-card__subtitle">¿Cómo jugar?</h3>

                <p
                    class="information-card__paragraph"
                    >En este formato hay que adivinar 10 países escribiendo sus
                    nombres completos. Se pueden saltear los países.</p
                >
            </div>
        </div>
`,[n]=document.getElementsByClassName("game__bt-information"),[a]=document.getElementsByClassName("game__container");a.insertAdjacentHTML("beforeend",t);const[s]=document.getElementsByClassName("information-card");Z(s),n.style.backgroundColor="rgb(225, 225, 225)";function o(l){!s.contains(l.target)&&l.target!==n&&(s.remove(),n.style.backgroundColor="white",document.removeEventListener("keydown",c),document.removeEventListener("click",o))}document.addEventListener("keydown",c),document.addEventListener("click",o);function c(l){r(l)}function r(l){if(l.key==="Escape"){const[u]=document.getElementsByClassName("information-card"),[m]=document.getElementsByClassName("game__bt-information");s&&x(u).then(()=>{m.style.backgroundColor="",u.remove(),m.addEventListener("mouseenter",L)})}}}function P(){function e(s){const[o]=document.getElementsByClassName("homepage"),[c]=document.getElementsByClassName("game"),[r]=document.getElementsByClassName("header"),[l]=document.getElementsByClassName("footer"),[u]=document.getElementsByClassName("header__title"),[m]=document.getElementsByClassName("country__description"),[p]=document.getElementsByClassName("navbar__button--open"),[_]=document.getElementsByClassName("footer__paragraph"),[f]=document.getElementsByClassName("header__settings"),[k]=document.getElementsByClassName("keyboard__button--enter"),[C]=document.getElementsByClassName("game__start-again"),[g]=document.getElementsByClassName("footer__icon-github"),b=document.getElementsByClassName("navbar__icon"),w=document.getElementsByClassName("button-keyboard"),d=document.getElementsByClassName("game__statistics-item");if(s==="activate"){r.classList.add("dark-mode__header"),l.classList.add("dark-mode__footer"),u.classList.add("dark-mode__header--title"),m.classList.add("dark-mode__game-text"),_.classList.add("dark-mode__game-text"),o.classList.add("dark-mode__page"),c.classList.add("dark-mode__page"),f.classList.add("dark-mode__button-settings"),p.classList.add("dark-mode__navbar-button-open"),k.classList.add("dark-mode__enter"),C.classList.add("dark-mode__start-again"),g.style.backgroundImage="url('./images/icons/icons-github-dark-mode.svg')";for(let y of d)y.classList.add("dark-mode__game-text");for(let y of b)y.classList.add("dark-mode__navbar-icon");for(let y of w)y.classList.add("dark-mode__keyboard-button")}if(s==="deactivate"){r.classList.remove("dark-mode__header"),l.classList.remove("dark-mode__footer"),u.classList.remove("dark-mode__header--title"),m.classList.remove("dark-mode__game-text"),_.classList.remove("dark-mode__game-text"),o.classList.remove("dark-mode__page"),c.classList.remove("dark-mode__page"),f.classList.remove("dark-mode__button-settings"),p.classList.remove("dark-mode__navbar-button-open"),k.classList.remove("dark-mode__enter"),C.classList.remove("dark-mode__start-again"),g.style.backgroundImage="url('./images/icons/icons-github-hover.svg')";for(let y of d)y.classList.remove("dark-mode__game-text");for(let y of b)y.classList.remove("dark-mode__navbar-icon");for(let y of w)y.classList.remove("dark-mode__keyboard-button")}}const[t]=document.getElementsByClassName("dark-mode-bt"),[n]=document.getElementsByClassName("dark-mode-bt__circle");let a;if(localStorage.getItem("darkMode")===""){if(window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?(localStorage.setItem("darkMode","1"),a=Number(localStorage.getItem("darkMode"))):(localStorage.setItem("darkMode","0"),a=Number(localStorage.getItem("darkMode"))),a){e("activate");return}return}else a=Number(localStorage.getItem("darkMode"));e(a?"activate":"deactivate"),t&&(a?(n.style.left="32px",t.style.backgroundColor="#0D336B"):(n.style.left="3px",t.style.backgroundColor="#BFE1FF")),t&&t.addEventListener("click",function(){n.style.left==="3px"?(n.style.left="32px",t.style.backgroundColor="#0D336B",localStorage.setItem("darkMode","1"),e("activate")):(n.style.left="3px",t.style.backgroundColor="#BFE1FF",localStorage.setItem("darkMode","0"),e("deactivate"))})}
