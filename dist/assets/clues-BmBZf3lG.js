import"./index-DQllQ-ab.js";import{C as O}from"./classNewGame-Dn1j-uFa.js";import"./countryDataManajerJson-BXTmO6C4.js";let c;function R(e){let[t]=document.getElementsByClassName("clues-mode");$(t,e.shownClues),U()}function U(){const e=document.getElementsByClassName("game__answer-letter");for(let t of e)t.textContent=""}function $(e,t){const n=`
    <div class="answer-results">
    <button class="answer-results__close" title="Cerrar" type="button">
    </button>
    <p class="answer-results__paragraph">
    <span class="answer-results__span">RESULTADOS</span>
    <span class="answer-results__span"></span>
    <span class="answer-results__span">
      Puntaje
    </span>
    <span class="answer-results__span">
      ${11-t}
    </span>
    </p>
    <a href="/game-modes.html" class="answer-results__button--change-mode" title="Cambiar de modo" target="_self"><span>CAMBIAR DE MODO</span></a>
    <button class="answer-results__button--start-again" title="Jugar de nuevo" type="button"><span>JUGAR DE NUEVO</span></button>

    </div>
    <div class="blurry-background"></div>`;e.insertAdjacentHTML("beforeend",n);const r=document.getElementsByClassName("keyboard__button");for(let d of r)d.removeEventListener("click",E);document.removeEventListener("keydown",E);const o=document.getElementsByClassName("answer-results")[0],s=document.getElementsByClassName("blurry-background")[0],a=document.getElementsByClassName("answer-results__button--start-again")[0],i=document.getElementsByClassName("answer-results__close")[0];a.addEventListener("click",function(){o.style.top="-20rem",s.style.opacity="0",s.remove(),o.remove(),b()}),i.addEventListener("click",function(){o.style.top="-20rem",s.style.opacity="0",s.remove(),o.remove(),b()}),document.addEventListener("keydown",m);function m(d){const[l]=document.getElementsByClassName("answer-results");d.key==="Escape"&&l&&(o.style.top="-20rem",s.style.opacity="0",s.remove(),o.remove(),b(),document.removeEventListener("keydown",m))}}function D(e){const t=document.getElementsByClassName("game__answer-letter");if(t[t.length-1].textContent!=="")return;let n;if(e.answerUser.length===1&&(n=t[0],n.style.border="2px solid rgb(190, 190, 190)",t[1].style.border="2px solid rgb(62, 125, 214)"),e.answerUser.length!==1){if(e.answerUser.length===t.length){n=t[e.answerUser.length-1],n.style.border="2px solid rgb(190, 190, 190)",n.textContent=e.answerUser[e.answerUser.length-1],I(n);return}n=t[e.answerUser.length-1],n.style.border="2px solid rgb(190, 190, 190)",t[e.answerUser.length].style.border="2px solid rgb(62, 125, 214)"}n.textContent=e.answerUser[e.answerUser.length-1],I(n)}function z(e){const t=document.getElementsByClassName("game__answer-letter");let n=t[e.answerUser.length];if(e.answerUser.length+1===t.length){t[e.answerUser.length].style.border="2px solid rgb(62, 125, 214)",n.textContent="";return}t[e.answerUser.length+1].style.border="2px solid rgb(175, 190, 211)",t[e.answerUser.length].style.border="2px solid rgb(62, 125, 214)",n.textContent=""}function I(e){e.style.opacity="0.9",setTimeout(()=>{e.style.opacity="1"},20),e.style.height="1.7rem",e.style.width="1.7rem",e.style.fontSize="0.8rem",setTimeout(()=>{e.style.height="2.2rem",e.style.width="2.2rem"},60),setTimeout(()=>{e.style.height="2rem",e.style.width="2rem",e.style.fontSize="1rem"},70)}function S(e){e.style.fontSize="1.5rem",setTimeout(()=>{e.style.fontSize="1.2rem"},140)}function H(e){const t=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","ç","ñ"],n="enter",r="backspace";return t.includes(e)?"letter":e===n?"enter":e===r?"backspace":null}function F(e,t){let n="";for(let r=0;r<e.length;r++){if(e[r]===" "){n+='<div class="game__answer-letter--space"></div>';continue}n+='<div class="keyboard__container-button"><div class="game__answer-letter"></div></div>'}t.innerHTML=n}function j(e,t){function n(o,s){const[a]=document.getElementsByClassName("response");if(a&&(o==="correct"&&a.classList.contains("correct")||o==="incorrect"&&a.classList.contains("incorrect")||o==="incomplete"&&a.classList.contains("incomplete")))return;let i=document.createElement("div");i.className="response",i.style.opacity=0,o==="correct"&&(i.textContent="Respuesta correcta",i.classList.add("correct")),o==="incorrect"&&(i.textContent="Respuesta incorrecta",i.classList.add("incorrect")),o==="incomplete"&&(i.textContent="Palabra incompleta",i.classList.add("incomplete")),s.appendChild(i),i.style.display="block",setTimeout(function(){i.style.opacity=1},100),setTimeout(function(){i.style.opacity=0},1500),setTimeout(function(){i.remove()},1600)}let r=e.countries[0].name.replace(/\s/g,"");if(e.lastResponseStatus){n("correct",t);return}if(!e.lastResponseStatus){e.answerUser.length!==r.length?n("incomplete",t):n("incorrect",t);return}}function K(e){return{africa:"Continente: ÁFRICA",americas:"Continente: AMÉRICA",asia:"Continente: ASIA",europe:"Continente: EUROPA",oceania:"Continente: OCEANÍA","all continents":"Continente: TODOS"}[e]}async function b(){const[e]=document.getElementsByClassName("clues-mode__btNext"),[t]=document.getElementsByClassName("clues-mode__btPrevious"),[n]=document.getElementsByClassName("game__answer"),[r]=document.getElementsByClassName("country__description"),o=document.getElementsByClassName("keyboard__button"),[s]=document.getElementsByClassName("game__clues"),[a]=document.getElementsByClassName("game__score"),[i]=document.getElementsByClassName("clues-mode__clues-list");let m=localStorage.getItem("continent")?localStorage.getItem("continent"):"all continents";r.textContent=K(m),s.textContent="1",a.textContent="10",c=await O.create(m,"/images/flags"),F(c.countries[0].name,n),q(c),t.style.cursor="initial",t.style.opacity="0",t.disabled=!0,e.style.cursor="pointer",e.style.opacity="1",e.disabled=!1,e.addEventListener("click",k),t.addEventListener("click",x);for(let d of o)d.addEventListener("click",E);document.addEventListener("keydown",E),i.style.transform="translateX(0%)"}function q(e){const t="/images/coat-of-arms",n=document.getElementsByClassName("clues-mode__clues-item");let r=Object.keys(e.countries[0].clues);function o(s,a){function i(l){if(!Array.isArray(l))return;let f="";for(let u=0;u<l.length;u++){if(u===l.length-1){f+=`${l[u]}`;continue}f+=`${l[u]}, `}return f}function m(l){if(a!==null&&typeof a=="object"&&!Array.isArray(l)){let f="",u=Object.keys(l);if(l.side)return f=`${l.side==="right"?"Derecha":"Izquierda"}`,f;if(l[u[0]])if(l[u[0]].symbol)for(let y=0;y<u.length;y++){if(y===u.length-1){f+=`${u[y]} (${l[u[y]].symbol})`;continue}f+=`${u[y]} (${l[u[y]].symbol}), `}else for(let y=0;y<u.length;y++){if(y===u.length-1){f+=`${l[u[y]]}`;continue}f+=`${l[u[y]]}, `}return f}else return}return{area:`Area:
${a} km`,borders:`${a?`Paises limitrofes:
`+i(a):"Es una isla"}`,capital:`Capital:
${a?i(a):"No tiene"}`,currencies:`Monedas:
${m(a)}`,landlocked:`Acceso al mar:
${a?"Si":"No"}`,languages:`Lenguajes:
${m(a)}`,population:`Población:
${a}`,subregion:`Subregión:
${a}`,car:`Sentido de conducción:
${m(a)}`}[s]}for(let s=0;s<n.length;s++){if(n[s].classList.contains("clues-mode__coatOfArms")){const[a]=document.getElementsByClassName("coat-of-arms-img"),[i]=document.getElementsByClassName("clues-mode__clues-span");if(["eh","yt","tk","nu","mp","vi","hm","pn","gs","um","as","pr","cc","io","cg","mf","bl","bv","pm","tc","nf","wf","re","sz","sx","sh","sj","tl"].some(d=>d==e.countries[0].code))a.style.display="none",i.textContent=`Escudo de armas:
No tiene`;else{a.style.display="block";let d=t+`/${e.countries[0].code}.svg`;a.src=d,i.textContent="Escudo de armas:"}continue}if(n[s].classList.contains("clues-mode__poblation")){const[a]=document.getElementsByClassName("clues-mode__clues-span--poblation");a.textContent=o(r[s],e.countries[0].clues[r[s]]);continue}n[s].textContent=o(r[s],e.countries[0].clues[r[s]])}}function E(e){let t;if(e.key&&(t=e.key.toLowerCase()),e.target.value&&(t=e.target.value.toLowerCase()),!H(t))return;if(t==="enter"){const[o]=document.getElementsByClassName("clues-mode__btNext"),[s]=document.getElementsByClassName("clues-mode__btPrevious"),a=document.getElementsByClassName("keyboard__button");for(let i of a)i.removeEventListener("click",E);if(document.removeEventListener("keydown",E),o.removeEventListener("click",k),s.removeEventListener("click",k),c=c.verifyAnswer(c.answerUser,c.countries[0].name),j(c,document.getElementsByClassName("clues-mode")[0]),!c.lastResponseStatus&&c.answerUser.length!==c.countries[0].name.replace(/\s/g,"").length){for(let i of a)i.addEventListener("click",E);document.addEventListener("keydown",E),o.addEventListener("click",k),s.addEventListener("click",k);return}c.lastResponseStatus||(r(),T(c.lastResponseStatus,"/images/icons")),c.lastResponseStatus&&(n(),T(c.lastResponseStatus,"/images/icons"),setTimeout(()=>{R(c)},1500)),setTimeout(()=>{for(let i of a)i.addEventListener("click",E);document.addEventListener("keydown",E),o.addEventListener("click",k),s.addEventListener("click",x)},1500);return}if(t==="backspace"){if(c.answerUser.length===0)return;c=c.modifyAnswer(t,c.answerUser),z(c);return}if(t!=="backspace"){c=c.modifyAnswer(t,c.answerUser),D(c);return}function n(){const o=document.getElementsByClassName("game__answer-letter");for(let s of o)s.style.border="2px solid #a1cc8e",s.style.backgroundColor="#ecfde4"}function r(){const o=document.getElementsByClassName("game__answer-letter");for(let s of o)s.style.border="2px solid #f5abab",s.style.backgroundColor="#ffeeee";setTimeout(()=>{for(let s of o)s.style.border="",s.style.backgroundColor=""},1500)}}document.addEventListener("DOMContentLoaded",function(){const[e]=document.getElementsByClassName("clues-mode__btNext"),[t]=document.getElementsByClassName("game__start-again"),[n]=document.getElementsByClassName("game__bt-information");X(),e.addEventListener("click",k),t.addEventListener("click",b),n.addEventListener("click",N),n.addEventListener("mouseenter",L),document.addEventListener("keydown",r=>{r.key==="ArrowRight"&&k(),r.key==="ArrowLeft"&&x()}),Z(),M(),G()});function G(){const[e]=document.getElementsByClassName("header__title"),[t]=document.getElementsByClassName("footer__paragraph");e.addEventListener("mouseenter",function(n){e.style.userSelect="text"}),e.addEventListener("mouseleave",function(n){e.style.userSelect="none"}),t.addEventListener("mouseenter",function(n){t.style.userSelect="text"}),t.addEventListener("mouseleave",function(n){t.style.userSelect="none"})}async function X(){const[e]=document.getElementsByClassName("header__settings"),[t]=document.getElementsByClassName("clues-mode");e.addEventListener("click",()=>{r(t)});async function n(o){const s=`        
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
`;return new Promise(a=>{e.blur(),o.insertAdjacentHTML("beforeend",s);let[i]=document.getElementsByClassName("presentation__section"),[m]=document.getElementsByClassName("blurry-background");const[d]=document.getElementsByClassName("continents-dropdown"),[l]=document.getElementsByClassName("presentation__button-start"),[f]=document.getElementsByClassName("presentation__header-link");i.classList.add("presentation");let u="all continents";d.addEventListener("change",function(p){u=p.target.value,p.target.classList.add("continents-dropdown--focus")}),l.addEventListener("click",function(){localStorage.setItem("continent",u),m.style.opacity="0",m.remove(),i.remove(),document.removeEventListener("click",y),b()});function y(p){!i.contains(p.target)&&p.target!==e&&(localStorage.setItem("continent",u),m.style.opacity="0",m.remove(),i.remove(),document.removeEventListener("click",y),b())}f.addEventListener("click",function(){localStorage.setItem("continent",u),m.style.opacity="0",m.remove(),i.remove(),document.removeEventListener("click",y),b()}),document.addEventListener("keydown",C),document.addEventListener("click",y);function C(p){v(p)}function v(p){p.key==="Escape"&&i&&(localStorage.setItem("continent",u),m.style.opacity="0",m.remove(),i.remove(),document.removeEventListener("click",y),b(),document.removeEventListener("keydown",C))}})}function r(o){function s(g){g.style.height="23rem",g.style.width="26rem",g.style.opacity="0",setTimeout(()=>{g.style.opacity="1"},15),setTimeout(()=>{g.style.height="25rem",g.style.width="28rem"},15)}async function a(g){return new Promise(h=>{g.style.height="23rem",g.style.width="26rem",setTimeout(()=>{g.style.opacity="0"},15),setTimeout(()=>{h()},100)})}const i=`       
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
   `,[m]=document.getElementsByClassName("header__settings");m.blur(),o.insertAdjacentHTML("beforeend",i);const[d]=document.getElementsByClassName("presentation__section");s(d);const[l]=document.getElementsByClassName("blurry-background"),[f]=document.getElementsByClassName("continents-dropdown"),[u]=document.getElementsByClassName("presentation__button-start"),[y]=document.getElementsByClassName("presentation__header-link");d.classList.add("settings");let C="all continents";f.addEventListener("change",function(g){C=g.target.value,g.target.classList.add("continents-dropdown--focus")}),u.addEventListener("click",function(){localStorage.setItem("continent",C),l.style.opacity="0",l.remove(),a(d).then(g=>{d.remove(),document.removeEventListener("click",v),document.removeEventListener("keydown",p),b()})});function v(g){!d.contains(g.target)&&g.target!==m&&d.classList.contains("settings")&&(l.style.opacity="0",l.remove(),a(d).then(h=>{d.remove(),document.removeEventListener("click",v),document.removeEventListener("keydown",p)}))}M(),y.addEventListener("click",function(){l.style.opacity="0",l.remove(),a(d).then(g=>{d.remove(),document.removeEventListener("click",v),document.removeEventListener("keydown",p)})}),document.addEventListener("keydown",p),document.addEventListener("click",v);function p(g){w(g)}function w(g){g.key==="Escape"&&d&&(l.style.opacity="0",l.remove(),a(d).then(h=>{d.remove(),document.removeEventListener("click",v),document.removeEventListener("keydown",p)}))}}!localStorage.getItem("time")&&!localStorage.getItem("continent")?await n(t):b()}function N(){const[e]=document.getElementsByClassName("information-card"),[t]=document.getElementsByClassName("game__bt-information");e?A(e).then(()=>{t.style.backgroundColor="",e.remove(),t.addEventListener("mouseenter",L)}):(P(),document.addEventListener("mousemove",B),t.removeEventListener("mouseenter",L))}function L(){const[e]=document.getElementsByClassName("information-card"),[t]=document.getElementsByClassName("game__bt-information");if(t.removeEventListener("click",N),setTimeout(()=>{t.addEventListener("click",N)},0),e){t.style.backgroundColor="",e.remove(),t.addEventListener("mouseenter",L),document.removeEventListener("mousemove",B);return}P(),document.addEventListener("mousemove",B),t.removeEventListener("mouseenter",L)}function B(e){const[t]=document.getElementsByClassName("information-card"),[n]=document.getElementsByClassName("presentation__div"),[r]=document.getElementsByClassName("information-card__subtitle"),[o]=document.getElementsByClassName("information-card__paragraph"),[s]=document.getElementsByClassName("game__bt-information");t&&e.target!==t&&e.target!==n&&e.target!==r&&e.target!==o&&e.target!==s&&A(t).then(()=>{s.style.backgroundColor="",t.remove(),s.addEventListener("mouseenter",L),document.removeEventListener("mousemove",B)})}function J(e){e.style.opacity="0",e.style.width="21rem",e.style.height="11rem",setTimeout(()=>{e.style.opacity="1"},15),setTimeout(()=>{e.style.width="22rem",e.style.height="12rem"},15)}async function A(e){return new Promise(t=>{e.style.width="21rem",e.style.height="11rem",setTimeout(()=>{e.style.opacity="0"},15),setTimeout(()=>{t()},100)})}function k(){if(c.currentClue===9)return;const[e]=document.getElementsByClassName("clues-mode__clues-list"),[t]=document.getElementsByClassName("clues-mode__btNext"),[n]=document.getElementsByClassName("clues-mode__btPrevious"),r=document.getElementsByClassName("clues-mode__clues-item"),o=/[0-9]+/;let s;const[a]=document.getElementsByClassName("game__score"),[i]=document.getElementsByClassName("game__clues");if(c=c.addCurrentClue(),c.shownClues<=10&&c.shownClues+1-c.currentClue===1&&(c=c.addShownClue(),a.textContent=`${11-c.shownClues}`,i.textContent=`${c.currentClue+1}`,S(a),S(i)),e.style.transform===""){e.style.transform="translateX(-100%)",c.currentClue===1&&(n.style.opacity="1",n.style.cursor="pointer",n.disabled=!1);return}if(e.style.transform!==""){if(s=Number(o.exec(e.style.transform)),c.currentClue===1&&(n.style.opacity="1",n.style.cursor="pointer",n.disabled=!1),c.currentClue===r.length-1?(t.style.opacity="0",t.style.cursor="initial",t.disabled=!0):(t.style.opacity="1",t.style.cursor="pointer",t.disabled=!1),s===900)return;e.style.transform=`translateX(-${s+100}%)`;return}}function x(){if(c.currentClue===0)return;const[e]=document.getElementsByClassName("clues-mode__clues-list"),[t]=document.getElementsByClassName("clues-mode__btNext"),[n]=document.getElementsByClassName("clues-mode__btPrevious"),r=document.getElementsByClassName("clues-mode__clues-item"),o=/[0-9]+/;let s;if(c=c.substractCurrentClue(),s=Number(o.exec(e.style.transform)),!(e.style.transform===""||s===1)&&e.style.transform!==""){if(c.currentClue===r.length-2&&(t.style.opacity="1",t.style.cursor="pointer",t.disabled=!1),c.currentClue===0&&(n.style.opacity="0",n.style.cursor="initial",n.disabled=!0),s=Number(o.exec(e.style.transform)),s===0)return;e.style.transform=`translateX(-${s-100}%)`;return}}function Z(){const[e]=document.getElementsByClassName("navbar__button--open"),[t]=document.getElementsByClassName("navbar"),[n]=document.getElementsByClassName("navbar__button--close"),[r]=document.getElementsByClassName("footer__icon-github"),[o]=document.getElementsByClassName("clues-mode");r.addEventListener("mouseover",()=>{o.classList.contains("dark-mode__page")?r.style.backgroundImage="url('/images/icons/icons-github-dark-mode-hover.svg')":r.style.backgroundImage="url('/images/icons/icons-github.svg')",r.addEventListener("mouseout",()=>{o.classList.contains("dark-mode__page")?r.style.backgroundImage="url('/images/icons/icons-github-dark-mode.svg')":r.style.backgroundImage="url('/images/icons/icons-github-hover.svg')"})}),e.addEventListener("click",function(a){if(t.style.left==="-25rem"||t.style.left===""){new Promise(i=>{t.style.left="0rem",i()}).then(i=>{setTimeout(()=>{document.addEventListener("click",s)},0)});return}if(t.style.left==="0rem"){t.contains(a.target)||(t.style.left="-25rem",document.removeEventListener("click",s));return}});function s(a){t.contains(a.target)||(t.style.left="-25rem",document.removeEventListener("click",s))}n.addEventListener("click",function(){t.style.left="-25rem",document.removeEventListener("click",s)}),document.addEventListener("keydown",a=>{a.key==="Escape"&&t.style.left==="0rem"&&(t.style.left="-25rem")})}function T(e,t){const[n]=document.getElementsByClassName("clues-mode__container--1");let r=document.createElement("div"),o=document.createElement("img");const[s]=document.getElementsByClassName("clues-mode");e?(t+="/icons-correct.svg",o.src=t):(t+="/icons-incorrect.svg",o.src=t),r.classList.add("overlappingBackground"),s.classList.contains("dark-mode__page")&&r.classList.add("dark-mode__overlappingBackground"),o.classList.add("multiple-choice__iconAnswer--defoult"),n.appendChild(r),n.appendChild(o),setTimeout(()=>{o.classList.add("multiple-choice__iconAnswer--active")},100),setTimeout(()=>{r.remove(),o.remove()},1500)}function P(e){const t=`       
            <div class="information-card">
            <div class="presentation__div">
                <h3 class="information-card__subtitle">¿Cómo jugar?</h3>

                <p
                    class="information-card__paragraph"
                    >En este formato hay que adivinar un pasís a partir de 10 pistas
               que van a ir apareciendo. Cuantas menos pistas hayas utilizado
               mejor va a ser tu puntaje de adivinanza.</p
                >
            </div>
        </div>
`,[n]=document.getElementsByClassName("game__bt-information"),[r]=document.getElementsByClassName("game__container");r.insertAdjacentHTML("beforeend",t);const[o]=document.getElementsByClassName("information-card");J(o),n.style.backgroundColor="rgb(225, 225, 225)";function s(m){!o.contains(m.target)&&m.target!==n&&(o.remove(),n.style.backgroundColor="white",document.removeEventListener("keydown",a),document.removeEventListener("click",s))}document.addEventListener("keydown",a),document.addEventListener("click",s);function a(m){i(m)}function i(m){if(m.key==="Escape"){const[d]=document.getElementsByClassName("information-card"),[l]=document.getElementsByClassName("game__bt-information");o&&A(d).then(()=>{l.style.backgroundColor="",d.remove(),l.addEventListener("mouseenter",L)})}}}function M(){function e(o){const[s]=document.getElementsByClassName("header"),[a]=document.getElementsByClassName("footer"),[i]=document.getElementsByClassName("header__title"),[m]=document.getElementsByClassName("country__description"),[d]=document.getElementsByClassName("clues-mode"),[l]=document.getElementsByClassName("clues-mode__main"),[f]=document.getElementsByClassName("navbar__button--open"),[u]=document.getElementsByClassName("footer__paragraph"),[y]=document.getElementsByClassName("header__settings"),[C]=document.getElementsByClassName("keyboard__button--enter"),[v]=document.getElementsByClassName("game__start-again"),[p]=document.getElementsByClassName("footer__icon-github"),w=document.getElementsByClassName("navbar__icon"),g=document.getElementsByClassName("button-keyboard"),h=document.getElementsByClassName("game__statistics-item");if(o==="activate"){s.classList.add("dark-mode__header"),a.classList.add("dark-mode__footer"),i.classList.add("dark-mode__header--title"),m.classList.add("dark-mode__game-text"),u.classList.add("dark-mode__game-text"),d.classList.add("dark-mode__page"),l.classList.add("dark-mode__page"),y.classList.add("dark-mode__button-settings"),f.classList.add("dark-mode__navbar-button-open"),C.classList.add("dark-mode__enter"),v.classList.add("dark-mode__start-again"),p.classList.add("dark-mode__github-bt");for(let _ of h)_.classList.add("dark-mode__game-text");for(let _ of w)_.classList.add("dark-mode__navbar-icon");for(let _ of g)_.classList.add("dark-mode__keyboard-button")}if(o==="deactivate"){s.classList.remove("dark-mode__header"),a.classList.remove("dark-mode__footer"),i.classList.remove("dark-mode__header--title"),m.classList.remove("dark-mode__game-text"),u.classList.remove("dark-mode__game-text"),d.classList.remove("dark-mode__page"),l.classList.remove("dark-mode__page"),y.classList.remove("dark-mode__button-settings"),f.classList.remove("dark-mode__navbar-button-open"),C.classList.remove("dark-mode__enter"),v.classList.remove("dark-mode__start-again"),p.classList.remove("dark-mode__github-bt");for(let _ of h)_.classList.remove("dark-mode__game-text");for(let _ of w)_.classList.remove("dark-mode__navbar-icon");for(let _ of g)_.classList.remove("dark-mode__keyboard-button")}}const[t]=document.getElementsByClassName("dark-mode-bt"),[n]=document.getElementsByClassName("dark-mode-bt__circle");let r;if(localStorage.getItem("darkMode")===""){if(window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?(localStorage.setItem("darkMode","1"),r=Number(localStorage.getItem("darkMode"))):(localStorage.setItem("darkMode","0"),r=Number(localStorage.getItem("darkMode"))),r){e("activate");return}return}else r=Number(localStorage.getItem("darkMode"));e(r?"activate":"deactivate"),t&&(r?(n.style.left="32px",t.style.backgroundColor="#0D336B"):(n.style.left="3px",t.style.backgroundColor="#BFE1FF")),t&&t.addEventListener("click",function(){n.style.left==="3px"?(n.style.left="32px",t.style.backgroundColor="#0D336B",localStorage.setItem("darkMode","1"),e("activate")):(n.style.left="3px",t.style.backgroundColor="#BFE1FF",localStorage.setItem("darkMode","0"),e("deactivate"))})}
