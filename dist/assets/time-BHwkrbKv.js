import"./index-DkIkTDby.js";import{N as j}from"./classNewGame-Dn1j-uFa.js";import"./countryDataManajerJson-BXTmO6C4.js";let i,B=null,N;function O(e){let t=document.getElementsByClassName("time-trial-mode")[0];K(t,e.correctAnswers),z()}function z(){const e=document.getElementsByClassName("game__answer-letter");for(let t of e)t.textContent=""}function K(e,t,n){const o=`
    <div class="answer-results">
    <button class="answer-results__close" title="Cerrar" type="button">
    </button>
    <p class="answer-results__paragraph">
    <span class="answer-results__span">RESULTADOS</span>
    <span class="answer-results__span">
      Respuestas correctas
    </span>
    <span class="answer-results__span">
      ${t}
    </span>
    <span class="answer-results__span">Tiempo</span>
    <span class="answer-results__span">${localStorage.getItem("time")/1e3}s</span>
    </p>
    <a href="/game-modes.html" class="answer-results__button--change-mode" title="Cambiar de modo" target="_self"><span>CAMBIAR DE MODO</span></a>
    <button class="answer-results__button--start-again" title="Jugar de nuevo" type="button"><span>JUGAR DE NUEVO</span></button>

    </div>
    <div class="blurry-background"></div>`,[s]=document.getElementsByClassName("presentation__section"),[c]=document.getElementsByClassName("blurry-background"),[d]=document.getElementsByClassName("header__settings");d.blur(),s&&(s.remove(),c.remove()),e.insertAdjacentHTML("beforeend",o);const r=document.getElementsByClassName("keyboard__button");for(let _ of r)_.removeEventListener("click",b);document.removeEventListener("keydown",b);const l=document.getElementsByClassName("answer-results")[0],m=document.getElementsByClassName("blurry-background")[0],g=document.getElementsByClassName("answer-results__button--start-again")[0],E=document.getElementsByClassName("answer-results__close")[0];g.addEventListener("click",function(){l.style.top="-20rem",m.style.opacity="0",m.remove(),l.remove(),v()}),E.addEventListener("click",function(){l.style.top="-20rem",m.style.opacity="0",m.remove(),l.remove(),v()}),document.addEventListener("keydown",p);function p(_){const[k]=document.getElementsByClassName("answer-results");_.key==="Escape"&&k&&(l.style.top="-20rem",m.style.opacity="0",m.remove(),l.remove(),v(),document.removeEventListener("keydown",p))}}function q(e){const t=document.getElementsByClassName("game__answer-letter");if(t[t.length-1].textContent!=="")return;let n;if(e.answerUser.length===1&&(n=t[0],n.style.border="2px solid rgb(190, 190, 190)",t[1].style.border="2px solid rgb(62, 125, 214)"),e.answerUser.length!==1){if(e.answerUser.length===t.length){n=t[e.answerUser.length-1],n.style.border="2px solid rgb(190, 190, 190)",n.textContent=e.answerUser[e.answerUser.length-1],U(n);return}n=t[e.answerUser.length-1],n.style.border="2px solid rgb(190, 190, 190)",t[e.answerUser.length].style.border="2px solid rgb(62, 125, 214)"}n.textContent=e.answerUser[e.answerUser.length-1],U(n)}function G(e){const t=document.getElementsByClassName("game__answer-letter");let n=t[e.answerUser.length];if(e.answerUser.length+1===t.length){t[e.answerUser.length].style.border="2px solid rgb(62, 125, 214)",n.textContent="";return}t[e.answerUser.length+1].style.border="2px solid rgb(175, 190, 211)",t[e.answerUser.length].style.border="2px solid rgb(62, 125, 214)",n.textContent=""}function U(e){e.style.opacity="0.9",setTimeout(()=>{e.style.opacity="1"},20),e.style.height="1.7rem",e.style.width="1.7rem",e.style.fontSize="0.8rem",setTimeout(()=>{e.style.height="2.2rem",e.style.width="2.2rem"},60),setTimeout(()=>{e.style.height="2rem",e.style.width="2rem",e.style.fontSize="1rem"},70)}function $(e){e.style.fontSize="1.5rem",setTimeout(()=>{e.style.fontSize="1.2rem"},140)}function J(e){const t=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","ç","ñ","arrowright"],n="enter",o="backspace";return t.includes(e)?"letter":e===n?"enter":e===o?"backspace":null}function T(e,t){let n="";for(let o=0;o<e.length;o++){if(e[o]===" "){n+='<div class="game__answer-letter--space"></div>';continue}n+='<div class="keyboard__container-button"><div class="game__answer-letter"></div></div>'}t.innerHTML=n}function P(e){const[t]=document.getElementsByClassName("country__flag");t.src=e.countries[0].flagUrl;let n=`Bandera de ${e.countries[0].name}`;t.alt=n}function Z(e,t){function n(s,c){const[d]=document.getElementsByClassName("response");if(d&&(s==="correct"&&d.classList.contains("correct")||s==="incorrect"&&d.classList.contains("incorrect")||s==="incomplete"&&d.classList.contains("incomplete")))return;let r=document.createElement("div");r.className="response",r.style.opacity=0,s==="correct"&&(r.textContent="Respuesta correcta",r.classList.add("correct")),s==="incorrect"&&(r.textContent="Respuesta incorrecta",r.classList.add("incorrect")),s==="incomplete"&&(r.textContent="Palabra incompleta",r.classList.add("incomplete")),c.appendChild(r),r.style.display="block",setTimeout(function(){r.style.opacity=1},100),setTimeout(function(){r.style.opacity=0},1e3),setTimeout(function(){r.remove()},1100)}let o=e.countries[0].name.replace(/\s/g,"");if(e.lastResponseStatus){n("correct",t);return}if(!e.lastResponseStatus){e.answerUser.length!==o.length?n("incomplete",t):n("incorrect",t);return}}function V(e){return{africa:"Continente: ÁFRICA",americas:"Continente: AMÉRICA",asia:"Continente: ASIA",europe:"Continente: EUROPA",oceania:"Continente: OCEANÍA","all continents":"Continente: TODOS"}[e]}async function v(){B&&clearInterval(B),N&&clearInterval(N);const e=document.getElementsByClassName("game__time");let t=localStorage.getItem("time")?Number(localStorage.getItem("time")):-1;t===-1&&(t=3e4),t!==-1&&(e[0].textContent=Q(t),t-=1e3,W(t,e[0]),t+=1e3);const[n]=document.getElementsByClassName("country__flag"),[o]=document.getElementsByClassName("game__answer"),[s]=document.getElementsByClassName("country__description"),[c]=document.getElementsByClassName("game__correct-answers"),d=document.getElementsByClassName("keyboard__button");let r=localStorage.getItem("continent")?localStorage.getItem("continent"):"all continents";s.textContent=V(r),c.textContent="0",i=await j.create(r,-1,"/images/flags"),T(i.countries[0].name,o),n.src=i.countries[0].flagUrl;let l=`Bandera de ${i.countries[0].name}`;n.alt=l;for(let m of d)m.addEventListener("click",b);document.addEventListener("keydown",b)}function I(e,t){return("0"+e).slice(-2)}function Q(e){let t=Math.floor(e/1e3),n=Math.floor(t/60),o=t%60,s=I(n),c=I(o);return s+":"+c}function W(e,t){e===-1&&(B=setInterval(function(){i&&i.correctAnswers===10&&clearInterval(B)},1e3)),e!==-1&&(N=setInterval(function(){if(e<0)clearInterval(N),O(i);else{let n=Math.floor(e/6e4),o=Math.floor(e%6e4/1e3),s=I(n)+":"+I(o);t.textContent=s,e-=1e3}},1e3))}function b(e){let t;if(e.key&&(t=e.key.toLowerCase()),e.target.value&&(t=e.target.value.toLowerCase()),!J(t))return;if(t==="arrowright"){D();return}if(t==="enter"){const s=document.getElementsByClassName("keyboard__button"),[c]=document.getElementsByClassName("game__correct-answers"),[d]=document.getElementsByClassName("game__answer");for(let r of s)r.removeEventListener("click",b);if(document.removeEventListener("keydown",b),i=i.verifyAnswer(i.answerUser,i.countries[0].name),Z(i,document.getElementsByClassName("time-trial-mode")[0]),!i.lastResponseStatus&&i.answerUser.length!==i.countries[0].name.replace(/\s/g,"").length){for(let r of s)r.addEventListener("click",b);document.addEventListener("keydown",b);return}i.lastResponseStatus||(o(),R(i.lastResponseStatus,"/images/icons"),i.correctAnswers===10&&setTimeout(()=>{O(i)},1500)),i.lastResponseStatus&&(c.textContent=`${i.correctAnswers}`,$(c),n(),R(i.lastResponseStatus,"/images/icons"),setTimeout(()=>{P(i)},0),setTimeout(()=>{T(i.countries[0].name,d),i=i.resetAnswerUser()},1e3)),setTimeout(()=>{for(let r of s)r.addEventListener("click",b);document.addEventListener("keydown",b)},1e3);return}if(t==="backspace"){if(i.answerUser.length===0)return;i=i.modifyAnswer(t,i.answerUser),G(i);return}if(t!=="backspace"){i=i.modifyAnswer(t,i.answerUser),q(i);return}function n(){const s=document.getElementsByClassName("game__answer-letter");for(let c of s)c.style.border="2px solid #a1cc8e",c.style.backgroundColor="#ecfde4"}function o(){const s=document.getElementsByClassName("game__answer-letter");for(let c of s)c.style.border="2px solid #f5abab",c.style.backgroundColor="#ffeeee";setTimeout(()=>{for(let c of s)c.style.border="",c.style.backgroundColor=""},1e3)}}document.addEventListener("DOMContentLoaded",function(){const[e]=document.getElementsByClassName("country__btNext"),[t]=document.getElementsByClassName("game__start-again"),[n]=document.getElementsByClassName("game__bt-information");Y(),e.addEventListener("click",D),t.addEventListener("click",v),n.addEventListener("click",x),n.addEventListener("mouseenter",L),te(),H(),X()});function X(){const[e]=document.getElementsByClassName("header__title"),[t]=document.getElementsByClassName("footer__paragraph");e.addEventListener("mouseenter",function(n){e.style.userSelect="text"}),e.addEventListener("mouseleave",function(n){e.style.userSelect="none"}),t.addEventListener("mouseenter",function(n){t.style.userSelect="text"}),t.addEventListener("mouseleave",function(n){t.style.userSelect="none"})}async function Y(){const[e]=document.getElementsByClassName("header__settings"),[t]=document.getElementsByClassName("time-trial-mode");e.addEventListener("click",()=>{o(t)});async function n(s){const c=`        
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
`;return new Promise(d=>{e.blur(),s.insertAdjacentHTML("beforeend",c);let[r]=document.getElementsByClassName("presentation__section"),[l]=document.getElementsByClassName("blurry-background");const[m]=document.getElementsByClassName("continents-dropdown"),g=document.getElementsByClassName("presentation__button-time"),[E]=document.getElementsByClassName("presentation__button-start"),[p]=document.getElementsByClassName("presentation__header-link");r.classList.add("presentation"),r.classList.add("presentation-with-time");let _="all continents",k=[15e3,3e4,6e4];m.addEventListener("change",function(u){_=u.target.value,u.target.classList.add("continents-dropdown--focus")});for(let u=0;u<g.length;u++)g[u].addEventListener("click",function(h){localStorage.setItem("time",k[u]);for(let a of g){if(a===g[u]){a.classList.add("presentation__button-time--focus");continue}a.classList.remove("presentation__button-time--focus")}});E.addEventListener("click",function(){localStorage.setItem("continent",_),l.style.opacity="0",l.remove(),r.remove(),document.removeEventListener("click",f),v()});function f(u){!r.contains(u.target)&&u.target!==e&&(localStorage.setItem("continent",_),l.style.opacity="0",l.remove(),r.remove(),document.removeEventListener("click",f),v())}p.addEventListener("click",function(){localStorage.setItem("continent",_),l.style.opacity="0",l.remove(),r.remove(),document.removeEventListener("click",f),v()}),document.addEventListener("keydown",C),document.addEventListener("click",f);function C(u){y(u)}function y(u){u.key==="Escape"&&r&&(localStorage.setItem("continent",_),l.style.opacity="0",l.remove(),r.remove(),document.removeEventListener("click",f),v(),document.removeEventListener("keydown",C))}})}function o(s){function c(a){a.style.height="23rem",a.style.width="26rem",a.style.opacity="0",setTimeout(()=>{a.style.opacity="1"},15),setTimeout(()=>{a.style.height="30rem",a.style.width="28rem"},15)}async function d(a){return new Promise(w=>{a.style.height="23rem",a.style.width="26rem",setTimeout(()=>{a.style.opacity="0"},15),setTimeout(()=>{w()},100)})}const r=`       
               <div class="presentation__section">
               <button class="presentation__header-link" title="Cerrar" type="button"
                       >
                   </button>
               
                  <div class="presentation__div">
   
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

                   <p
                       class="presentation__label-time"
                       >Elige el tiempo</p
                   >

                   <div class="presentation__div-time">
                     <button class="presentation__button-time" title="15 segundos" type="button"
                       ><span>00:15</span></button
                   >
                   <button class="presentation__button-time" title="30 segundos" type="button"
                       ><span>00:30</span></button
                   >
                   <button class="presentation__button-time" title="1 minuto" type="button"
                       ><span>1:00</span></button
                   >
                   </div>

                   <button class="presentation__button-start" title="Empezar" type="button"
                       ><span>EMPEZAR</span></button
                   >
               </div>
           </div>
           <div class="blurry-background"></div>
   `,[l]=document.getElementsByClassName("header__settings");l.blur(),s.insertAdjacentHTML("beforeend",r);const[m]=document.getElementsByClassName("presentation__section");c(m);const[g]=document.getElementsByClassName("blurry-background"),[E]=document.getElementsByClassName("continents-dropdown"),p=document.getElementsByClassName("presentation__button-time"),[_]=document.getElementsByClassName("presentation__button-start"),[k]=document.getElementsByClassName("presentation__header-link");m.classList.add("settings");let f="all continents",C=[15e3,3e4,6e4];E.addEventListener("change",function(a){f=a.target.value,a.target.classList.add("continents-dropdown--focus")});for(let a=0;a<p.length;a++)p[a].addEventListener("click",function(w){localStorage.setItem("time",C[a]);for(let S of p){if(S===p[a]){S.classList.add("presentation__button-time--focus");continue}S.classList.remove("presentation__button-time--focus")}});_.addEventListener("click",function(){localStorage.setItem("continent",f),g.style.opacity="0",g.remove(),d(m).then(a=>{m.remove(),document.removeEventListener("click",y),document.removeEventListener("keydown",u),v()})});function y(a){!m.contains(a.target)&&a.target!==l&&m.classList.contains("settings")&&(g.style.opacity="0",g.remove(),d(m).then(w=>{m.remove(),document.removeEventListener("click",y),document.removeEventListener("keydown",u)}))}H(),k.addEventListener("click",function(){g.style.opacity="0",g.remove(),d(m).then(a=>{m.remove(),document.removeEventListener("click",y),document.removeEventListener("keydown",u)})}),document.addEventListener("keydown",u),document.addEventListener("click",y);function u(a){h(a)}function h(a){a.key==="Escape"&&m&&(g.style.opacity="0",g.remove(),d(m).then(w=>{m.remove(),document.removeEventListener("click",y),document.removeEventListener("keydown",u)}))}}!localStorage.getItem("time")&&!localStorage.getItem("continent")?await n(t):v()}function x(){const[e]=document.getElementsByClassName("information-card"),[t]=document.getElementsByClassName("game__bt-information");e?M(e).then(()=>{t.style.backgroundColor="",e.remove(),t.addEventListener("mouseenter",L)}):(F(),document.addEventListener("mousemove",A),t.removeEventListener("mouseenter",L))}function L(){const[e]=document.getElementsByClassName("information-card"),[t]=document.getElementsByClassName("game__bt-information");if(t.removeEventListener("click",x),setTimeout(()=>{t.addEventListener("click",x)},0),e){t.style.backgroundColor="",e.remove(),t.addEventListener("mouseenter",L),document.removeEventListener("mousemove",A);return}F(),document.addEventListener("mousemove",A),t.removeEventListener("mouseenter",L)}function A(e){const[t]=document.getElementsByClassName("information-card"),[n]=document.getElementsByClassName("presentation__div"),[o]=document.getElementsByClassName("information-card__subtitle"),[s]=document.getElementsByClassName("information-card__paragraph"),[c]=document.getElementsByClassName("game__bt-information");t&&e.target!==t&&e.target!==n&&e.target!==o&&e.target!==s&&e.target!==c&&M(t).then(()=>{c.style.backgroundColor="",t.remove(),c.addEventListener("mouseenter",L),document.removeEventListener("mousemove",A)})}function ee(e){e.style.opacity="0",e.style.width="21rem",e.style.height="11rem",setTimeout(()=>{e.style.opacity="1"},15),setTimeout(()=>{e.style.width="22rem",e.style.height="12rem"},15)}async function M(e){return new Promise(t=>{e.style.width="21rem",e.style.height="11rem",setTimeout(()=>{e.style.opacity="0"},15),setTimeout(()=>{t()},100)})}function D(){const[e]=document.getElementsByClassName("country__btNext");e.blur();const[t]=document.getElementsByClassName("country__flag"),[n]=document.getElementsByClassName("game__answer");t.addEventListener("load",o);function o(){T(i.countries[0].name,n),t.removeEventListener("load",o)}i=i.resetAnswerUser(i.countries),i=i.nextCountry(),P(i)}function te(){const[e]=document.getElementsByClassName("navbar__button--open"),[t]=document.getElementsByClassName("navbar"),[n]=document.getElementsByClassName("navbar__button--close"),[o]=document.getElementsByClassName("footer__icon-github"),[s]=document.getElementsByClassName("time-trial-mode");o.addEventListener("mouseover",()=>{s.classList.contains("dark-mode__page")?o.style.backgroundImage="url('/images/icons/icons-github-dark-mode-hover.svg')":o.style.backgroundImage="url('/images/icons/icons-github.svg')",o.addEventListener("mouseout",()=>{s.classList.contains("dark-mode__page")?o.style.backgroundImage="url('/images/icons/icons-github-dark-mode.svg')":o.style.backgroundImage="url('/images/icons/icons-github-hover.svg')"})}),e.addEventListener("click",function(d){if(t.style.left==="-25rem"||t.style.left===""){new Promise(r=>{t.style.left="0rem",r()}).then(r=>{setTimeout(()=>{document.addEventListener("click",c)},0)});return}if(t.style.left==="0rem"){t.contains(d.target)||(t.style.left="-25rem",document.removeEventListener("click",c));return}});function c(d){t.contains(d.target)||(t.style.left="-25rem",document.removeEventListener("click",c))}n.addEventListener("click",function(){t.style.left="-25rem",document.removeEventListener("click",c)}),document.addEventListener("keydown",d=>{d.key==="Escape"&&t.style.left==="0rem"&&(t.style.left="-25rem")})}function R(e,t){const[n]=document.getElementsByClassName("country__container");let o=document.createElement("div"),s=document.createElement("img");const[c]=document.getElementsByClassName("time-trial-mode");e?(t+="/icons-correct.svg",s.src=t):(t+="/icons-incorrect.svg",s.src=t),o.classList.add("overlappingBackground"),c.classList.contains("dark-mode__page")&&o.classList.add("dark-mode__overlappingBackground"),s.classList.add("multiple-choice__iconAnswer--defoult"),n.appendChild(o),n.appendChild(s),setTimeout(()=>{s.classList.add("multiple-choice__iconAnswer--active")},100),setTimeout(()=>{o.remove(),s.remove()},1e3)}function F(e){const t=`       
            <div class="information-card">
            <div class="presentation__div">
                <h3 class="information-card__subtitle">¿Cómo jugar?</h3>

                <p
                    class="information-card__paragraph"
                    >En este formato hay que adivinar la mayor cantidad de países en
               el menor tiempo posible antes de que se acabe el contador.</p
                >
            </div>
        </div>
`,[n]=document.getElementsByClassName("game__bt-information"),[o]=document.getElementsByClassName("game__container");o.insertAdjacentHTML("beforeend",t);const[s]=document.getElementsByClassName("information-card");ee(s),n.style.backgroundColor="rgb(225, 225, 225)";function c(l){!s.contains(l.target)&&l.target!==n&&(s.remove(),n.style.backgroundColor="white",document.removeEventListener("keydown",d),document.removeEventListener("click",c))}document.addEventListener("keydown",d),document.addEventListener("click",c);function d(l){r(l)}function r(l){if(l.key==="Escape"){const[m]=document.getElementsByClassName("information-card"),[g]=document.getElementsByClassName("game__bt-information");s&&M(m).then(()=>{g.style.backgroundColor="",m.remove(),g.addEventListener("mouseenter",L)})}}}function H(){function e(s){const[c]=document.getElementsByClassName("header"),[d]=document.getElementsByClassName("footer"),[r]=document.getElementsByClassName("header__title"),[l]=document.getElementsByClassName("country__description"),[m]=document.getElementsByClassName("time-trial-mode"),[g]=document.getElementsByClassName("time-trial-mode__main"),[E]=document.getElementsByClassName("navbar__button--open"),[p]=document.getElementsByClassName("footer__paragraph"),[_]=document.getElementsByClassName("header__settings"),[k]=document.getElementsByClassName("keyboard__button--enter"),[f]=document.getElementsByClassName("game__start-again"),[C]=document.getElementsByClassName("footer__icon-github"),y=document.getElementsByClassName("navbar__icon"),u=document.getElementsByClassName("multiple-choice__option"),h=document.getElementsByClassName("game__statistics-item");if(s==="activate"){c.classList.add("dark-mode__header"),d.classList.add("dark-mode__footer"),r.classList.add("dark-mode__header--title"),l.classList.add("dark-mode__game-text"),p.classList.add("dark-mode__game-text"),m.classList.add("dark-mode__page"),g.classList.add("dark-mode__page"),_.classList.add("dark-mode__button-settings"),E.classList.add("dark-mode__navbar-button-open"),k.classList.add("dark-mode__enter"),f.classList.add("dark-mode__start-again"),C.classList.add("dark-mode__github-bt");for(let a of h)a.classList.add("dark-mode__game-text");for(let a of y)a.classList.add("dark-mode__navbar-icon");for(let a of u)a.classList.add("dark-mode__keyboard-button")}if(s==="deactivate"){c.classList.remove("dark-mode__header"),d.classList.remove("dark-mode__footer"),r.classList.remove("dark-mode__header--title"),l.classList.remove("dark-mode__game-text"),p.classList.remove("dark-mode__game-text"),m.classList.remove("dark-mode__page"),g.classList.remove("dark-mode__page"),_.classList.remove("dark-mode__button-settings"),E.classList.remove("dark-mode__navbar-button-open"),k.classList.remove("dark-mode__enter"),f.classList.remove("dark-mode__start-again"),C.classList.remove("dark-mode__github-bt");for(let a of h)a.classList.remove("dark-mode__game-text");for(let a of y)a.classList.remove("dark-mode__navbar-icon");for(let a of u)a.classList.remove("dark-mode__keyboard-button")}}const[t]=document.getElementsByClassName("dark-mode-bt"),[n]=document.getElementsByClassName("dark-mode-bt__circle");let o;if(localStorage.getItem("darkMode")===""){if(window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?(localStorage.setItem("darkMode","1"),o=Number(localStorage.getItem("darkMode"))):(localStorage.setItem("darkMode","0"),o=Number(localStorage.getItem("darkMode"))),o){e("activate");return}return}else o=Number(localStorage.getItem("darkMode"));e(o?"activate":"deactivate"),t&&(o?(n.style.left="32px",t.style.backgroundColor="#0D336B"):(n.style.left="3px",t.style.backgroundColor="#BFE1FF")),t&&t.addEventListener("click",function(){n.style.left==="3px"?(n.style.left="32px",t.style.backgroundColor="#0D336B",localStorage.setItem("darkMode","1"),e("activate")):(n.style.left="3px",t.style.backgroundColor="#BFE1FF",localStorage.setItem("darkMode","0"),e("deactivate"))})}
