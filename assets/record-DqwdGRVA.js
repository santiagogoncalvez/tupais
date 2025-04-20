import"./index-DQllQ-ab.js";import{N as M}from"./classNewGame-Dn1j-uFa.js";import"./countryDataManajerJson-BXTmO6C4.js";let N="/tupais/",c;function R(e){let t=document.getElementsByClassName("record-mode")[0];O(t,e.correctAnswers),P()}function P(){const e=document.getElementsByClassName("game__answer-letter");for(let t of e)t.textContent=""}function O(e,t){const n=`
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
      ${t}
    </span>
    </p>
    <a href="/game-modes.html" class="answer-results__button--change-mode" title="Cambiar de modo" target="_self"><span>CAMBIAR DE MODO</span></a>
    <button class="answer-results__button--start-again" title="Jugar de nuevo" type="button"><span>JUGAR DE NUEVO</span></button>

    </div>
    <div class="blurry-background"></div>`;e.insertAdjacentHTML("beforeend",n);const r=document.getElementsByClassName("keyboard__button");for(let p of r)p.removeEventListener("click",b);document.removeEventListener("keydown",b);const s=document.getElementsByClassName("answer-results")[0],o=document.getElementsByClassName("blurry-background")[0],i=document.getElementsByClassName("answer-results__button--start-again")[0],a=document.getElementsByClassName("answer-results__close")[0];i.addEventListener("click",function(){s.style.top="-20rem",o.style.opacity="0",o.remove(),s.remove(),v()}),a.addEventListener("click",function(){s.style.top="-20rem",o.style.opacity="0",o.remove(),s.remove(),v()}),document.addEventListener("keydown",l);function l(p){const[m]=document.getElementsByClassName("answer-results");p.key==="Escape"&&m&&(s.style.top="-20rem",o.style.opacity="0",o.remove(),s.remove(),v(),document.removeEventListener("keydown",l))}}function D(e){const t=document.getElementsByClassName("game__answer-letter");if(t[t.length-1].textContent!=="")return;let n;if(e.answerUser.length===1&&(n=t[0],n.style.border="2px solid rgb(190, 190, 190)",t[1].style.border="2px solid rgb(62, 125, 214)"),e.answerUser.length!==1){if(e.answerUser.length===t.length){n=t[e.answerUser.length-1],n.style.border="2px solid rgb(190, 190, 190)",n.textContent=e.answerUser[e.answerUser.length-1],I(n);return}n=t[e.answerUser.length-1],n.style.border="2px solid rgb(190, 190, 190)",t[e.answerUser.length].style.border="2px solid rgb(62, 125, 214)"}n.textContent=e.answerUser[e.answerUser.length-1],I(n)}function F(e){const t=document.getElementsByClassName("game__answer-letter");let n=t[e.answerUser.length];if(e.answerUser.length+1===t.length){t[e.answerUser.length].style.border="2px solid rgb(62, 125, 214)",n.textContent="";return}t[e.answerUser.length+1].style.border="2px solid rgb(175, 190, 211)",t[e.answerUser.length].style.border="2px solid rgb(62, 125, 214)",n.textContent=""}function I(e){e.style.opacity="0.9",setTimeout(()=>{e.style.opacity="1"},20),e.style.height="1.7rem",e.style.width="1.7rem",e.style.fontSize="0.8rem",setTimeout(()=>{e.style.height="2.2rem",e.style.width="2.2rem"},60),setTimeout(()=>{e.style.height="2rem",e.style.width="2rem",e.style.fontSize="1rem"},70)}function H(e){e.style.fontSize="1.5rem",setTimeout(()=>{e.style.fontSize="1.2rem"},140)}function $(e){const t=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","ç","ñ"],n="enter",r="backspace";return t.includes(e)?"letter":e===n?"enter":e===r?"backspace":null}function x(e,t){let n="";for(let r=0;r<e.length;r++){if(e[r]===" "){n+='<div class="game__answer-letter--space"></div>';continue}n+='<div class="keyboard__container-button"><div class="game__answer-letter"></div></div>'}t.innerHTML=n}function j(e){const[t]=document.getElementsByClassName("country__flag");t.src=e.countries[0].flagUrl;let n=`Bandera de ${e.countries[0].name}`;t.alt=n}function z(e,t){function n(s,o){const[i]=document.getElementsByClassName("response");if(i&&(s==="correct"&&i.classList.contains("correct")||s==="incorrect"&&i.classList.contains("incorrect")||s==="incomplete"&&i.classList.contains("incomplete")))return;let a=document.createElement("div");a.className="response",a.style.opacity=0,s==="correct"&&(a.textContent="Respuesta correcta",a.classList.add("correct")),s==="incorrect"&&(a.textContent="Respuesta incorrecta",a.classList.add("incorrect")),s==="incomplete"&&(a.textContent="Palabra incompleta",a.classList.add("incomplete")),o.appendChild(a),a.style.display="block",setTimeout(function(){a.style.opacity=1},100),setTimeout(function(){a.style.opacity=0},1200),setTimeout(function(){a.remove()},1400)}let r=e.countries[0].name.replace(/\s/g,"");if(e.lastResponseStatus){n("correct",t);return}if(!e.lastResponseStatus){e.answerUser.length!==r.length?n("incomplete",t):n("incorrect",t);return}}function K(e){return{africa:"Continente: ÁFRICA",americas:"Continente: AMÉRICA",asia:"Continente: ASIA",europe:"Continente: EUROPA",oceania:"Continente: OCEANÍA","all continents":"Continente: TODOS"}[e]}async function v(){const[e]=document.getElementsByClassName("country__flag"),[t]=document.getElementsByClassName("game__answer"),[n]=document.getElementsByClassName("country__description"),[r]=document.getElementsByClassName("game__correct-answers"),s=document.getElementsByClassName("keyboard__button");let o=localStorage.getItem("continent")?localStorage.getItem("continent"):"all continents";n.textContent=K(o),r.textContent="0",c=await M.create(o,-1,"/tupais/images/flags"),x(c.countries[0].name,t),e.src=c.countries[0].flagUrl;let i=`Bandera de ${c.countries[0].name}`;e.alt=i;for(let a of s)a.addEventListener("click",b);document.addEventListener("keydown",b)}function b(e){let t;if(e.key&&(t=e.key.toLowerCase()),e.target.value&&(t=e.target.value.toLowerCase()),!$(t))return;if(t==="enter"){const s=document.getElementsByClassName("keyboard__button"),[o]=document.getElementsByClassName("game__correct-answers"),[i]=document.getElementsByClassName("game__answer");for(let l of s)l.removeEventListener("click",b);if(document.removeEventListener("keydown",b),c=c.verifyAnswer(c.answerUser,c.countries[0].name),z(c,document.getElementsByClassName("record-mode")[0]),!c.lastResponseStatus&&c.answerUser.length!==c.countries[0].name.replace(/\s/g,"").length){for(let l of s)l.addEventListener("click",b);document.addEventListener("keydown",b);return}let a=N+"images/icons";c.lastResponseStatus||(r(),S(c.lastResponseStatus,a),setTimeout(()=>{R(c)},1200)),c.lastResponseStatus&&(o.textContent=`${c.correctAnswers}`,H(o),n(),S(c.lastResponseStatus,a),setTimeout(()=>{j(c)},0),setTimeout(()=>{x(c.countries[0].name,i),c=c.resetAnswerUser(c.countries)},1200)),setTimeout(()=>{for(let l of s)l.addEventListener("click",b);document.addEventListener("keydown",b)},1200);return}if(t==="backspace"){if(c.answerUser.length===0)return;c=c.modifyAnswer(t,c.answerUser),F(c);return}if(t!=="backspace"){c=c.modifyAnswer(t,c.answerUser),D(c);return}function n(){const s=document.getElementsByClassName("game__answer-letter");for(let o of s)o.style.border="2px solid #a1cc8e",o.style.backgroundColor="#ecfde4"}function r(){const s=document.getElementsByClassName("game__answer-letter");for(let o of s)o.style.border="2px solid #f5abab",o.style.backgroundColor="#ffeeee";setTimeout(()=>{for(let o of s)o.style.border="",o.style.backgroundColor=""},1200)}}document.addEventListener("DOMContentLoaded",function(){const[e]=document.getElementsByClassName("game__start-again"),[t]=document.getElementsByClassName("game__bt-information");G(),e.addEventListener("click",v),t.addEventListener("click",B),t.addEventListener("mouseenter",L),Z(),U(),q()});function q(){const[e]=document.getElementsByClassName("header__title"),[t]=document.getElementsByClassName("footer__paragraph");e.addEventListener("mouseenter",function(n){e.style.userSelect="text"}),e.addEventListener("mouseleave",function(n){e.style.userSelect="none"}),t.addEventListener("mouseenter",function(n){t.style.userSelect="text"}),t.addEventListener("mouseleave",function(n){t.style.userSelect="none"})}async function G(){const[e]=document.getElementsByClassName("header__settings"),[t]=document.getElementsByClassName("record-mode");e.addEventListener("click",()=>{r(t)});async function n(s){const o=`        
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
`;return new Promise(i=>{e.blur(),s.insertAdjacentHTML("beforeend",o);let[a]=document.getElementsByClassName("presentation__section"),[l]=document.getElementsByClassName("blurry-background");const[p]=document.getElementsByClassName("continents-dropdown"),[m]=document.getElementsByClassName("presentation__button-start"),[y]=document.getElementsByClassName("presentation__header-link");a.classList.add("presentation");let _="all continents";p.addEventListener("change",function(u){_=u.target.value,u.target.classList.add("continents-dropdown--focus")}),m.addEventListener("click",function(){localStorage.setItem("continent",_),l.style.opacity="0",l.remove(),a.remove(),document.removeEventListener("click",f),v()});function f(u){!a.contains(u.target)&&u.target!==e&&(localStorage.setItem("continent",_),l.style.opacity="0",l.remove(),a.remove(),document.removeEventListener("click",f),v())}y.addEventListener("click",function(){localStorage.setItem("continent",_),l.style.opacity="0",l.remove(),a.remove(),document.removeEventListener("click",f),v()}),document.addEventListener("keydown",k),document.addEventListener("click",f);function k(u){C(u)}function C(u){u.key==="Escape"&&a&&(localStorage.setItem("continent",_),l.style.opacity="0",l.remove(),a.remove(),document.removeEventListener("click",f),v(),document.removeEventListener("keydown",k))}})}function r(s){function o(d){d.style.height="23rem",d.style.width="26rem",d.style.opacity="0",setTimeout(()=>{d.style.opacity="1"},15),setTimeout(()=>{d.style.height="25rem",d.style.width="28rem"},15)}async function i(d){return new Promise(g=>{d.style.height="23rem",d.style.width="26rem",setTimeout(()=>{d.style.opacity="0"},15),setTimeout(()=>{g()},100)})}let a=N+"images/icons";const l=`       
               <div class="presentation__section">
               <button class="presentation__header-link" title="Cerrar" type="button"
                       >
                   </button>
               
                  <div class="presentation__div">
                  <h2 class="presentation__subtitle">Configuración</h2>
   
                  <div class="presentation__subtitle">Modo oscuro</div>
                  <button class="dark-mode-bt" type="button" title="Modo oscuro">
                     <img width="20" height="20"
                     src="${a}/icons-sun.svg" alt="sun-symbol" class="dark-mode-bt__sun"/ >
       
                     <div class="dark-mode-bt__circle"></div>
              
                     <img width="20" height="20" src="${a}/icons-moon.png" alt="moon-symbol" class="dark-mode-bt__moon"/>
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
   `,[p]=document.getElementsByClassName("header__settings");p.blur(),s.insertAdjacentHTML("beforeend",l);const[m]=document.getElementsByClassName("presentation__section");o(m);const[y]=document.getElementsByClassName("blurry-background"),[_]=document.getElementsByClassName("continents-dropdown"),[f]=document.getElementsByClassName("presentation__button-start"),[k]=document.getElementsByClassName("presentation__header-link");m.classList.add("settings");let C="all continents";_.addEventListener("change",function(d){C=d.target.value,d.target.classList.add("continents-dropdown--focus")}),f.addEventListener("click",function(){localStorage.setItem("continent",C),y.style.opacity="0",y.remove(),i(m).then(d=>{m.remove(),document.removeEventListener("click",u),document.removeEventListener("keydown",E),v()})});function u(d){!m.contains(d.target)&&d.target!==p&&m.classList.contains("settings")&&(y.style.opacity="0",y.remove(),i(m).then(g=>{m.remove(),document.removeEventListener("click",u),document.removeEventListener("keydown",E)}))}U(),k.addEventListener("click",function(){y.style.opacity="0",y.remove(),i(m).then(d=>{m.remove(),document.removeEventListener("click",u),document.removeEventListener("keydown",E)})}),document.addEventListener("keydown",E),document.addEventListener("click",u);function E(d){h(d)}function h(d){d.key==="Escape"&&m&&(y.style.opacity="0",y.remove(),i(m).then(g=>{m.remove(),document.removeEventListener("click",u),document.removeEventListener("keydown",E)}))}}!localStorage.getItem("time")&&!localStorage.getItem("continent")?await n(t):v()}function B(){const[e]=document.getElementsByClassName("information-card"),[t]=document.getElementsByClassName("game__bt-information");e?A(e).then(()=>{t.style.backgroundColor="",e.remove(),t.addEventListener("mouseenter",L)}):(T(),document.addEventListener("mousemove",w),t.removeEventListener("mouseenter",L))}function L(){const[e]=document.getElementsByClassName("information-card"),[t]=document.getElementsByClassName("game__bt-information");if(t.removeEventListener("click",B),setTimeout(()=>{t.addEventListener("click",B)},0),e){t.style.backgroundColor="",e.remove(),t.addEventListener("mouseenter",L),document.removeEventListener("mousemove",w);return}T(),document.addEventListener("mousemove",w),t.removeEventListener("mouseenter",L)}function w(e){const[t]=document.getElementsByClassName("information-card"),[n]=document.getElementsByClassName("presentation__div"),[r]=document.getElementsByClassName("information-card__subtitle"),[s]=document.getElementsByClassName("information-card__paragraph"),[o]=document.getElementsByClassName("game__bt-information");t&&e.target!==t&&e.target!==n&&e.target!==r&&e.target!==s&&e.target!==o&&A(t).then(()=>{o.style.backgroundColor="",t.remove(),o.addEventListener("mouseenter",L),document.removeEventListener("mousemove",w)})}function J(e){e.style.opacity="0",e.style.width="21rem",e.style.height="11rem",setTimeout(()=>{e.style.opacity="1"},15),setTimeout(()=>{e.style.width="22rem",e.style.height="12rem"},15)}async function A(e){return new Promise(t=>{e.style.width="21rem",e.style.height="11rem",setTimeout(()=>{e.style.opacity="0"},15),setTimeout(()=>{t()},100)})}function Z(){const[e]=document.getElementsByClassName("navbar__button--open"),[t]=document.getElementsByClassName("navbar"),[n]=document.getElementsByClassName("navbar__button--close"),[r]=document.getElementsByClassName("footer__icon-github"),[s]=document.getElementsByClassName("record-mode");r.addEventListener("mouseover",()=>{let i=N+"/images/icons";s.classList.contains("dark-mode__page")?r.style.backgroundImage=`url(${i+"/icons-github-dark-mode-hover.svg"})`:r.style.backgroundImage=`url(${i+"/icons-github.svg"})`,r.addEventListener("mouseout",()=>{s.classList.contains("dark-mode__page")?r.style.backgroundImage=`url(${i+"/icons-github-dark-mode.svg"})`:r.style.backgroundImage=`url(${i+"/icons-github-hover.svg"})`})}),e.addEventListener("click",function(i){if(t.style.left==="-25rem"||t.style.left===""){new Promise(a=>{t.style.left="0rem",a()}).then(a=>{setTimeout(()=>{document.addEventListener("click",o)},0)});return}if(t.style.left==="0rem"){t.contains(i.target)||(t.style.left="-25rem",document.removeEventListener("click",o));return}});function o(i){t.contains(i.target)||(t.style.left="-25rem",document.removeEventListener("click",o))}n.addEventListener("click",function(){t.style.left="-25rem",document.removeEventListener("click",o)}),document.addEventListener("keydown",i=>{i.key==="Escape"&&t.style.left==="0rem"&&(t.style.left="-25rem")})}function S(e,t){const[n]=document.getElementsByClassName("country__container");let r=document.createElement("div"),s=document.createElement("img");const[o]=document.getElementsByClassName("record-mode");e?(t+="/icons-correct.svg",s.src=t):(t+="/icons-incorrect.svg",s.src=t),r.classList.add("overlappingBackground"),o.classList.contains("dark-mode__page")&&r.classList.add("dark-mode__overlappingBackground"),s.classList.add("multiple-choice__iconAnswer--defoult"),n.appendChild(r),n.appendChild(s),setTimeout(()=>{s.classList.add("multiple-choice__iconAnswer--active")},100),setTimeout(()=>{r.remove(),s.remove()},1200)}function T(e){const t=`       
            <div class="information-card">
            <div class="presentation__div">
                <h3 class="information-card__subtitle">¿Cómo jugar?</h3>

                <p
                    class="information-card__paragraph"
                    >En este formato hay que adivinar la mayor cantidad de países
               posibles sin equivocarse.</p
                >
            </div>
        </div>
`,[n]=document.getElementsByClassName("game__bt-information"),[r]=document.getElementsByClassName("game__container");r.insertAdjacentHTML("beforeend",t);const[s]=document.getElementsByClassName("information-card");J(s),n.style.backgroundColor="rgb(225, 225, 225)";function o(l){!s.contains(l.target)&&l.target!==n&&(s.remove(),n.style.backgroundColor="white",document.removeEventListener("keydown",i),document.removeEventListener("click",o))}document.addEventListener("keydown",i),document.addEventListener("click",o);function i(l){a(l)}function a(l){if(l.key==="Escape"){const[p]=document.getElementsByClassName("information-card"),[m]=document.getElementsByClassName("game__bt-information");s&&A(p).then(()=>{m.style.backgroundColor="",p.remove(),m.addEventListener("mouseenter",L)})}}}function U(){function e(s){const[o]=document.getElementsByClassName("record-mode"),[i]=document.getElementsByClassName("record-mode__main"),[a]=document.getElementsByClassName("header"),[l]=document.getElementsByClassName("footer"),[p]=document.getElementsByClassName("header__title"),[m]=document.getElementsByClassName("country__description"),[y]=document.getElementsByClassName("navbar__button--open"),[_]=document.getElementsByClassName("footer__paragraph"),[f]=document.getElementsByClassName("header__settings"),[k]=document.getElementsByClassName("keyboard__button--enter"),[C]=document.getElementsByClassName("game__start-again"),[u]=document.getElementsByClassName("footer__icon-github"),E=document.getElementsByClassName("navbar__icon"),h=document.getElementsByClassName("button-keyboard"),d=document.getElementsByClassName("game__statistics-item");if(s==="activate"){a.classList.add("dark-mode__header"),l.classList.add("dark-mode__footer"),p.classList.add("dark-mode__header--title"),m.classList.add("dark-mode__game-text"),_.classList.add("dark-mode__game-text"),o.classList.add("dark-mode__page"),i.classList.add("dark-mode__page"),f.classList.add("dark-mode__button-settings"),y.classList.add("dark-mode__navbar-button-open"),k.classList.add("dark-mode__enter"),C.classList.add("dark-mode__start-again"),u.classList.add("dark-mode__github-bt");for(let g of d)g.classList.add("dark-mode__game-text");for(let g of E)g.classList.add("dark-mode__navbar-icon");for(let g of h)g.classList.add("dark-mode__keyboard-button")}if(s==="deactivate"){a.classList.remove("dark-mode__header"),l.classList.remove("dark-mode__footer"),p.classList.remove("dark-mode__header--title"),m.classList.remove("dark-mode__game-text"),_.classList.remove("dark-mode__game-text"),o.classList.remove("dark-mode__page"),i.classList.remove("dark-mode__page"),f.classList.remove("dark-mode__button-settings"),y.classList.remove("dark-mode__navbar-button-open"),k.classList.remove("dark-mode__enter"),C.classList.remove("dark-mode__start-again"),u.classList.remove("dark-mode__github-bt");for(let g of d)g.classList.remove("dark-mode__game-text");for(let g of E)g.classList.remove("dark-mode__navbar-icon");for(let g of h)g.classList.remove("dark-mode__keyboard-button")}}const[t]=document.getElementsByClassName("dark-mode-bt"),[n]=document.getElementsByClassName("dark-mode-bt__circle");let r;if(localStorage.getItem("darkMode")===""){if(window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?(localStorage.setItem("darkMode","1"),r=Number(localStorage.getItem("darkMode"))):(localStorage.setItem("darkMode","0"),r=Number(localStorage.getItem("darkMode"))),r){e("activate");return}return}else r=Number(localStorage.getItem("darkMode"));e(r?"activate":"deactivate"),t&&(r?(n.style.left="32px",t.style.backgroundColor="#0D336B"):(n.style.left="3px",t.style.backgroundColor="#BFE1FF")),t&&t.addEventListener("click",function(){n.style.left==="3px"?(n.style.left="32px",t.style.backgroundColor="#0D336B",localStorage.setItem("darkMode","1"),e("activate")):(n.style.left="3px",t.style.backgroundColor="#BFE1FF",localStorage.setItem("darkMode","0"),e("deactivate"))})}
