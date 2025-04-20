import"./index-DQllQ-ab.js";import{C as R}from"./classNewGame-Dn1j-uFa.js";import"./countryDataManajerJson-BXTmO6C4.js";let w="/tupais/",c;function U(e){let[t]=document.getElementsByClassName("clues-mode");D(t,e.shownClues),$()}function $(){const e=document.getElementsByClassName("game__answer-letter");for(let t of e)t.textContent=""}function D(e,t){const n=`
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
    <div class="blurry-background"></div>`;e.insertAdjacentHTML("beforeend",n);const r=document.getElementsByClassName("keyboard__button");for(let f of r)f.removeEventListener("click",b);document.removeEventListener("keydown",b);const a=document.getElementsByClassName("answer-results")[0],s=document.getElementsByClassName("blurry-background")[0],o=document.getElementsByClassName("answer-results__button--start-again")[0],i=document.getElementsByClassName("answer-results__close")[0];o.addEventListener("click",function(){a.style.top="-20rem",s.style.opacity="0",s.remove(),a.remove(),v()}),i.addEventListener("click",function(){a.style.top="-20rem",s.style.opacity="0",s.remove(),a.remove(),v()}),document.addEventListener("keydown",m);function m(f){const[l]=document.getElementsByClassName("answer-results");f.key==="Escape"&&l&&(a.style.top="-20rem",s.style.opacity="0",s.remove(),a.remove(),v(),document.removeEventListener("keydown",m))}}function z(e){const t=document.getElementsByClassName("game__answer-letter");if(t[t.length-1].textContent!=="")return;let n;if(e.answerUser.length===1&&(n=t[0],n.style.border="2px solid rgb(190, 190, 190)",t[1].style.border="2px solid rgb(62, 125, 214)"),e.answerUser.length!==1){if(e.answerUser.length===t.length){n=t[e.answerUser.length-1],n.style.border="2px solid rgb(190, 190, 190)",n.textContent=e.answerUser[e.answerUser.length-1],S(n);return}n=t[e.answerUser.length-1],n.style.border="2px solid rgb(190, 190, 190)",t[e.answerUser.length].style.border="2px solid rgb(62, 125, 214)"}n.textContent=e.answerUser[e.answerUser.length-1],S(n)}function H(e){const t=document.getElementsByClassName("game__answer-letter");let n=t[e.answerUser.length];if(e.answerUser.length+1===t.length){t[e.answerUser.length].style.border="2px solid rgb(62, 125, 214)",n.textContent="";return}t[e.answerUser.length+1].style.border="2px solid rgb(175, 190, 211)",t[e.answerUser.length].style.border="2px solid rgb(62, 125, 214)",n.textContent=""}function S(e){e.style.opacity="0.9",setTimeout(()=>{e.style.opacity="1"},20),e.style.height="1.7rem",e.style.width="1.7rem",e.style.fontSize="0.8rem",setTimeout(()=>{e.style.height="2.2rem",e.style.width="2.2rem"},60),setTimeout(()=>{e.style.height="2rem",e.style.width="2rem",e.style.fontSize="1rem"},70)}function P(e){e.style.fontSize="1.5rem",setTimeout(()=>{e.style.fontSize="1.2rem"},140)}function F(e){const t=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","ç","ñ"],n="enter",r="backspace";return t.includes(e)?"letter":e===n?"enter":e===r?"backspace":null}function j(e,t){let n="";for(let r=0;r<e.length;r++){if(e[r]===" "){n+='<div class="game__answer-letter--space"></div>';continue}n+='<div class="keyboard__container-button"><div class="game__answer-letter"></div></div>'}t.innerHTML=n}function K(e,t){function n(a,s){const[o]=document.getElementsByClassName("response");if(o&&(a==="correct"&&o.classList.contains("correct")||a==="incorrect"&&o.classList.contains("incorrect")||a==="incomplete"&&o.classList.contains("incomplete")))return;let i=document.createElement("div");i.className="response",i.style.opacity=0,a==="correct"&&(i.textContent="Respuesta correcta",i.classList.add("correct")),a==="incorrect"&&(i.textContent="Respuesta incorrecta",i.classList.add("incorrect")),a==="incomplete"&&(i.textContent="Palabra incompleta",i.classList.add("incomplete")),s.appendChild(i),i.style.display="block",setTimeout(function(){i.style.opacity=1},100),setTimeout(function(){i.style.opacity=0},1500),setTimeout(function(){i.remove()},1600)}let r=e.countries[0].name.replace(/\s/g,"");if(e.lastResponseStatus){n("correct",t);return}if(!e.lastResponseStatus){e.answerUser.length!==r.length?n("incomplete",t):n("incorrect",t);return}}function q(e){return{africa:"Continente: ÁFRICA",americas:"Continente: AMÉRICA",asia:"Continente: ASIA",europe:"Continente: EUROPA",oceania:"Continente: OCEANÍA","all continents":"Continente: TODOS"}[e]}async function v(){const[e]=document.getElementsByClassName("clues-mode__btNext"),[t]=document.getElementsByClassName("clues-mode__btPrevious"),[n]=document.getElementsByClassName("game__answer"),[r]=document.getElementsByClassName("country__description"),a=document.getElementsByClassName("keyboard__button"),[s]=document.getElementsByClassName("game__clues"),[o]=document.getElementsByClassName("game__score"),[i]=document.getElementsByClassName("clues-mode__clues-list");let m=localStorage.getItem("continent")?localStorage.getItem("continent"):"all continents";r.textContent=q(m),s.textContent="1",o.textContent="10";let f=w+"images/flags";c=await R.create(m,f),j(c.countries[0].name,n),G(c),t.style.cursor="initial",t.style.opacity="0",t.disabled=!0,e.style.cursor="pointer",e.style.opacity="1",e.disabled=!1,e.addEventListener("click",C),t.addEventListener("click",I);for(let l of a)l.addEventListener("click",b);document.addEventListener("keydown",b),i.style.transform="translateX(0%)"}function G(e){const t=w+"images/coat-of-arms",n=document.getElementsByClassName("clues-mode__clues-item");let r=Object.keys(e.countries[0].clues);function a(s,o){function i(l){if(!Array.isArray(l))return;let u="";for(let d=0;d<l.length;d++){if(d===l.length-1){u+=`${l[d]}`;continue}u+=`${l[d]}, `}return u}function m(l){if(o!==null&&typeof o=="object"&&!Array.isArray(l)){let u="",d=Object.keys(l);if(l.side)return u=`${l.side==="right"?"Derecha":"Izquierda"}`,u;if(l[d[0]])if(l[d[0]].symbol)for(let g=0;g<d.length;g++){if(g===d.length-1){u+=`${d[g]} (${l[d[g]].symbol})`;continue}u+=`${d[g]} (${l[d[g]].symbol}), `}else for(let g=0;g<d.length;g++){if(g===d.length-1){u+=`${l[d[g]]}`;continue}u+=`${l[d[g]]}, `}return u}else return}return{area:`Area:
${o} km`,borders:`${o?`Paises limitrofes:
`+i(o):"Es una isla"}`,capital:`Capital:
${o?i(o):"No tiene"}`,currencies:`Monedas:
${m(o)}`,landlocked:`Acceso al mar:
${o?"Si":"No"}`,languages:`Lenguajes:
${m(o)}`,population:`Población:
${o}`,subregion:`Subregión:
${o}`,car:`Sentido de conducción:
${m(o)}`}[s]}for(let s=0;s<n.length;s++){if(n[s].classList.contains("clues-mode__coatOfArms")){const[o]=document.getElementsByClassName("coat-of-arms-img"),[i]=document.getElementsByClassName("clues-mode__clues-span");if(["eh","yt","tk","nu","mp","vi","hm","pn","gs","um","as","pr","cc","io","cg","mf","bl","bv","pm","tc","nf","wf","re","sz","sx","sh","sj","tl"].some(f=>f==e.countries[0].code))o.style.display="none",i.textContent=`Escudo de armas:
No tiene`;else{o.style.display="block";let f=t+`/${e.countries[0].code}.svg`;o.src=f,i.textContent="Escudo de armas:"}continue}if(n[s].classList.contains("clues-mode__poblation")){const[o]=document.getElementsByClassName("clues-mode__clues-span--poblation");o.textContent=a(r[s],e.countries[0].clues[r[s]]);continue}n[s].textContent=a(r[s],e.countries[0].clues[r[s]])}}function b(e){let t;if(e.key&&(t=e.key.toLowerCase()),e.target.value&&(t=e.target.value.toLowerCase()),!F(t))return;if(t==="enter"){const[a]=document.getElementsByClassName("clues-mode__btNext"),[s]=document.getElementsByClassName("clues-mode__btPrevious"),o=document.getElementsByClassName("keyboard__button");for(let m of o)m.removeEventListener("click",b);if(document.removeEventListener("keydown",b),a.removeEventListener("click",C),s.removeEventListener("click",C),c=c.verifyAnswer(c.answerUser,c.countries[0].name),K(c,document.getElementsByClassName("clues-mode")[0]),!c.lastResponseStatus&&c.answerUser.length!==c.countries[0].name.replace(/\s/g,"").length){for(let m of o)m.addEventListener("click",b);document.addEventListener("keydown",b),a.addEventListener("click",C),s.addEventListener("click",C);return}let i=w+"images/icons";c.lastResponseStatus||(r(),T(c.lastResponseStatus,i)),c.lastResponseStatus&&(n(),T(c.lastResponseStatus,i),setTimeout(()=>{U(c)},1500)),setTimeout(()=>{for(let m of o)m.addEventListener("click",b);document.addEventListener("keydown",b),a.addEventListener("click",C),s.addEventListener("click",I)},1500);return}if(t==="backspace"){if(c.answerUser.length===0)return;c=c.modifyAnswer(t,c.answerUser),H(c);return}if(t!=="backspace"){c=c.modifyAnswer(t,c.answerUser),z(c);return}function n(){const a=document.getElementsByClassName("game__answer-letter");for(let s of a)s.style.border="2px solid #a1cc8e",s.style.backgroundColor="#ecfde4"}function r(){const a=document.getElementsByClassName("game__answer-letter");for(let s of a)s.style.border="2px solid #f5abab",s.style.backgroundColor="#ffeeee";setTimeout(()=>{for(let s of a)s.style.border="",s.style.backgroundColor=""},1500)}}document.addEventListener("DOMContentLoaded",function(){const[e]=document.getElementsByClassName("clues-mode__btNext"),[t]=document.getElementsByClassName("game__start-again"),[n]=document.getElementsByClassName("game__bt-information");J(),e.addEventListener("click",C),t.addEventListener("click",v),n.addEventListener("click",A),n.addEventListener("mouseenter",L),document.addEventListener("keydown",r=>{r.key==="ArrowRight"&&C(),r.key==="ArrowLeft"&&I()}),V(),O(),X()});function X(){const[e]=document.getElementsByClassName("header__title"),[t]=document.getElementsByClassName("footer__paragraph");e.addEventListener("mouseenter",function(n){e.style.userSelect="text"}),e.addEventListener("mouseleave",function(n){e.style.userSelect="none"}),t.addEventListener("mouseenter",function(n){t.style.userSelect="text"}),t.addEventListener("mouseleave",function(n){t.style.userSelect="none"})}async function J(){const[e]=document.getElementsByClassName("header__settings"),[t]=document.getElementsByClassName("clues-mode");e.addEventListener("click",()=>{r(t)});async function n(a){const s=`        
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
`;return new Promise(o=>{e.blur(),a.insertAdjacentHTML("beforeend",s);let[i]=document.getElementsByClassName("presentation__section"),[m]=document.getElementsByClassName("blurry-background");const[f]=document.getElementsByClassName("continents-dropdown"),[l]=document.getElementsByClassName("presentation__button-start"),[u]=document.getElementsByClassName("presentation__header-link");i.classList.add("presentation");let d="all continents";f.addEventListener("change",function(p){d=p.target.value,p.target.classList.add("continents-dropdown--focus")}),l.addEventListener("click",function(){localStorage.setItem("continent",d),m.style.opacity="0",m.remove(),i.remove(),document.removeEventListener("click",g),v()});function g(p){!i.contains(p.target)&&p.target!==e&&(localStorage.setItem("continent",d),m.style.opacity="0",m.remove(),i.remove(),document.removeEventListener("click",g),v())}u.addEventListener("click",function(){localStorage.setItem("continent",d),m.style.opacity="0",m.remove(),i.remove(),document.removeEventListener("click",g),v()}),document.addEventListener("keydown",k),document.addEventListener("click",g);function k(p){h(p)}function h(p){p.key==="Escape"&&i&&(localStorage.setItem("continent",d),m.style.opacity="0",m.remove(),i.remove(),document.removeEventListener("click",g),v(),document.removeEventListener("keydown",k))}})}function r(a){function s(y){y.style.height="23rem",y.style.width="26rem",y.style.opacity="0",setTimeout(()=>{y.style.opacity="1"},15),setTimeout(()=>{y.style.height="25rem",y.style.width="28rem"},15)}async function o(y){return new Promise(_=>{y.style.height="23rem",y.style.width="26rem",setTimeout(()=>{y.style.opacity="0"},15),setTimeout(()=>{_()},100)})}let i=w+"images/icons";const m=`       
               <div class="presentation__section">
               <button class="presentation__header-link" title="Cerrar" type="button"
                       >
                   </button>
               
                  <div class="presentation__div">
                  <h2 class="presentation__subtitle">Configuración</h2>
   
                  <div class="presentation__subtitle">Modo oscuro</div>
                  <button class="dark-mode-bt" type="button" title="Modo oscuro">
                     <img width="20" height="20"
                     src="${i}/icons-sun.svg" alt="sun-symbol" class="dark-mode-bt__sun"/ >
       
                     <div class="dark-mode-bt__circle"></div>
              
                     <img width="20" height="20" src="${i}/icons-moon.png" alt="moon-symbol" class="dark-mode-bt__moon"/>
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
   `,[f]=document.getElementsByClassName("header__settings");f.blur(),a.insertAdjacentHTML("beforeend",m);const[l]=document.getElementsByClassName("presentation__section");s(l);const[u]=document.getElementsByClassName("blurry-background"),[d]=document.getElementsByClassName("continents-dropdown"),[g]=document.getElementsByClassName("presentation__button-start"),[k]=document.getElementsByClassName("presentation__header-link");l.classList.add("settings");let h="all continents";d.addEventListener("change",function(y){h=y.target.value,y.target.classList.add("continents-dropdown--focus")}),g.addEventListener("click",function(){localStorage.setItem("continent",h),u.style.opacity="0",u.remove(),o(l).then(y=>{l.remove(),document.removeEventListener("click",p),document.removeEventListener("keydown",E),v()})});function p(y){!l.contains(y.target)&&y.target!==f&&l.classList.contains("settings")&&(u.style.opacity="0",u.remove(),o(l).then(_=>{l.remove(),document.removeEventListener("click",p),document.removeEventListener("keydown",E)}))}O(),k.addEventListener("click",function(){u.style.opacity="0",u.remove(),o(l).then(y=>{l.remove(),document.removeEventListener("click",p),document.removeEventListener("keydown",E)})}),document.addEventListener("keydown",E),document.addEventListener("click",p);function E(y){B(y)}function B(y){y.key==="Escape"&&l&&(u.style.opacity="0",u.remove(),o(l).then(_=>{l.remove(),document.removeEventListener("click",p),document.removeEventListener("keydown",E)}))}}!localStorage.getItem("time")&&!localStorage.getItem("continent")?await n(t):v()}function A(){const[e]=document.getElementsByClassName("information-card"),[t]=document.getElementsByClassName("game__bt-information");e?x(e).then(()=>{t.style.backgroundColor="",e.remove(),t.addEventListener("mouseenter",L)}):(M(),document.addEventListener("mousemove",N),t.removeEventListener("mouseenter",L))}function L(){const[e]=document.getElementsByClassName("information-card"),[t]=document.getElementsByClassName("game__bt-information");if(t.removeEventListener("click",A),setTimeout(()=>{t.addEventListener("click",A)},0),e){t.style.backgroundColor="",e.remove(),t.addEventListener("mouseenter",L),document.removeEventListener("mousemove",N);return}M(),document.addEventListener("mousemove",N),t.removeEventListener("mouseenter",L)}function N(e){const[t]=document.getElementsByClassName("information-card"),[n]=document.getElementsByClassName("presentation__div"),[r]=document.getElementsByClassName("information-card__subtitle"),[a]=document.getElementsByClassName("information-card__paragraph"),[s]=document.getElementsByClassName("game__bt-information");t&&e.target!==t&&e.target!==n&&e.target!==r&&e.target!==a&&e.target!==s&&x(t).then(()=>{s.style.backgroundColor="",t.remove(),s.addEventListener("mouseenter",L),document.removeEventListener("mousemove",N)})}function Z(e){e.style.opacity="0",e.style.width="21rem",e.style.height="11rem",setTimeout(()=>{e.style.opacity="1"},15),setTimeout(()=>{e.style.width="22rem",e.style.height="12rem"},15)}async function x(e){return new Promise(t=>{e.style.width="21rem",e.style.height="11rem",setTimeout(()=>{e.style.opacity="0"},15),setTimeout(()=>{t()},100)})}function C(){if(c.currentClue===9)return;const[e]=document.getElementsByClassName("clues-mode__clues-list"),[t]=document.getElementsByClassName("clues-mode__btNext"),[n]=document.getElementsByClassName("clues-mode__btPrevious"),r=document.getElementsByClassName("clues-mode__clues-item"),a=/[0-9]+/;let s;const[o]=document.getElementsByClassName("game__score"),[i]=document.getElementsByClassName("game__clues");if(c=c.addCurrentClue(),c.shownClues<=10&&c.shownClues+1-c.currentClue===1&&(c=c.addShownClue(),o.textContent=`${11-c.shownClues}`,i.textContent=`${c.currentClue+1}`,P(o),P(i)),e.style.transform===""){e.style.transform="translateX(-100%)",c.currentClue===1&&(n.style.opacity="1",n.style.cursor="pointer",n.disabled=!1);return}if(e.style.transform!==""){if(s=Number(a.exec(e.style.transform)),c.currentClue===1&&(n.style.opacity="1",n.style.cursor="pointer",n.disabled=!1),c.currentClue===r.length-1?(t.style.opacity="0",t.style.cursor="initial",t.disabled=!0):(t.style.opacity="1",t.style.cursor="pointer",t.disabled=!1),s===900)return;e.style.transform=`translateX(-${s+100}%)`;return}}function I(){if(c.currentClue===0)return;const[e]=document.getElementsByClassName("clues-mode__clues-list"),[t]=document.getElementsByClassName("clues-mode__btNext"),[n]=document.getElementsByClassName("clues-mode__btPrevious"),r=document.getElementsByClassName("clues-mode__clues-item"),a=/[0-9]+/;let s;if(c=c.substractCurrentClue(),s=Number(a.exec(e.style.transform)),!(e.style.transform===""||s===1)&&e.style.transform!==""){if(c.currentClue===r.length-2&&(t.style.opacity="1",t.style.cursor="pointer",t.disabled=!1),c.currentClue===0&&(n.style.opacity="0",n.style.cursor="initial",n.disabled=!0),s=Number(a.exec(e.style.transform)),s===0)return;e.style.transform=`translateX(-${s-100}%)`;return}}function V(){const[e]=document.getElementsByClassName("navbar__button--open"),[t]=document.getElementsByClassName("navbar"),[n]=document.getElementsByClassName("navbar__button--close"),[r]=document.getElementsByClassName("footer__icon-github"),[a]=document.getElementsByClassName("clues-mode");r.addEventListener("mouseover",()=>{let o=w+"/images/icons";a.classList.contains("dark-mode__page")?r.style.backgroundImage=`url(${o+"/icons-github-dark-mode-hover.svg"})`:r.style.backgroundImage=`url(${o+"/icons-github.svg"})`,r.addEventListener("mouseout",()=>{a.classList.contains("dark-mode__page")?r.style.backgroundImage=`url(${o+"/icons-github-dark-mode.svg"})`:r.style.backgroundImage=`url(${o+"/icons-github-hover.svg"})`})}),e.addEventListener("click",function(o){if(t.style.left==="-25rem"||t.style.left===""){new Promise(i=>{t.style.left="0rem",i()}).then(i=>{setTimeout(()=>{document.addEventListener("click",s)},0)});return}if(t.style.left==="0rem"){t.contains(o.target)||(t.style.left="-25rem",document.removeEventListener("click",s));return}});function s(o){t.contains(o.target)||(t.style.left="-25rem",document.removeEventListener("click",s))}n.addEventListener("click",function(){t.style.left="-25rem",document.removeEventListener("click",s)}),document.addEventListener("keydown",o=>{o.key==="Escape"&&t.style.left==="0rem"&&(t.style.left="-25rem")})}function T(e,t){const[n]=document.getElementsByClassName("clues-mode__container--1");let r=document.createElement("div"),a=document.createElement("img");const[s]=document.getElementsByClassName("clues-mode");e?(t+="/icons-correct.svg",a.src=t):(t+="/icons-incorrect.svg",a.src=t),r.classList.add("overlappingBackground"),s.classList.contains("dark-mode__page")&&r.classList.add("dark-mode__overlappingBackground"),a.classList.add("multiple-choice__iconAnswer--defoult"),n.appendChild(r),n.appendChild(a),setTimeout(()=>{a.classList.add("multiple-choice__iconAnswer--active")},100),setTimeout(()=>{r.remove(),a.remove()},1500)}function M(e){const t=`       
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
`,[n]=document.getElementsByClassName("game__bt-information"),[r]=document.getElementsByClassName("game__container");r.insertAdjacentHTML("beforeend",t);const[a]=document.getElementsByClassName("information-card");Z(a),n.style.backgroundColor="rgb(225, 225, 225)";function s(m){!a.contains(m.target)&&m.target!==n&&(a.remove(),n.style.backgroundColor="white",document.removeEventListener("keydown",o),document.removeEventListener("click",s))}document.addEventListener("keydown",o),document.addEventListener("click",s);function o(m){i(m)}function i(m){if(m.key==="Escape"){const[f]=document.getElementsByClassName("information-card"),[l]=document.getElementsByClassName("game__bt-information");a&&x(f).then(()=>{l.style.backgroundColor="",f.remove(),l.addEventListener("mouseenter",L)})}}}function O(){function e(a){const[s]=document.getElementsByClassName("header"),[o]=document.getElementsByClassName("footer"),[i]=document.getElementsByClassName("header__title"),[m]=document.getElementsByClassName("country__description"),[f]=document.getElementsByClassName("clues-mode"),[l]=document.getElementsByClassName("clues-mode__main"),[u]=document.getElementsByClassName("navbar__button--open"),[d]=document.getElementsByClassName("footer__paragraph"),[g]=document.getElementsByClassName("header__settings"),[k]=document.getElementsByClassName("keyboard__button--enter"),[h]=document.getElementsByClassName("game__start-again"),[p]=document.getElementsByClassName("footer__icon-github"),E=document.getElementsByClassName("navbar__icon"),B=document.getElementsByClassName("button-keyboard"),y=document.getElementsByClassName("game__statistics-item");if(a==="activate"){s.classList.add("dark-mode__header"),o.classList.add("dark-mode__footer"),i.classList.add("dark-mode__header--title"),m.classList.add("dark-mode__game-text"),d.classList.add("dark-mode__game-text"),f.classList.add("dark-mode__page"),l.classList.add("dark-mode__page"),g.classList.add("dark-mode__button-settings"),u.classList.add("dark-mode__navbar-button-open"),k.classList.add("dark-mode__enter"),h.classList.add("dark-mode__start-again"),p.classList.add("dark-mode__github-bt");for(let _ of y)_.classList.add("dark-mode__game-text");for(let _ of E)_.classList.add("dark-mode__navbar-icon");for(let _ of B)_.classList.add("dark-mode__keyboard-button")}if(a==="deactivate"){s.classList.remove("dark-mode__header"),o.classList.remove("dark-mode__footer"),i.classList.remove("dark-mode__header--title"),m.classList.remove("dark-mode__game-text"),d.classList.remove("dark-mode__game-text"),f.classList.remove("dark-mode__page"),l.classList.remove("dark-mode__page"),g.classList.remove("dark-mode__button-settings"),u.classList.remove("dark-mode__navbar-button-open"),k.classList.remove("dark-mode__enter"),h.classList.remove("dark-mode__start-again"),p.classList.remove("dark-mode__github-bt");for(let _ of y)_.classList.remove("dark-mode__game-text");for(let _ of E)_.classList.remove("dark-mode__navbar-icon");for(let _ of B)_.classList.remove("dark-mode__keyboard-button")}}const[t]=document.getElementsByClassName("dark-mode-bt"),[n]=document.getElementsByClassName("dark-mode-bt__circle");let r;if(localStorage.getItem("darkMode")===""){if(window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?(localStorage.setItem("darkMode","1"),r=Number(localStorage.getItem("darkMode"))):(localStorage.setItem("darkMode","0"),r=Number(localStorage.getItem("darkMode"))),r){e("activate");return}return}else r=Number(localStorage.getItem("darkMode"));e(r?"activate":"deactivate"),t&&(r?(n.style.left="32px",t.style.backgroundColor="#0D336B"):(n.style.left="3px",t.style.backgroundColor="#BFE1FF")),t&&t.addEventListener("click",function(){n.style.left==="3px"?(n.style.left="32px",t.style.backgroundColor="#0D336B",localStorage.setItem("darkMode","1"),e("activate")):(n.style.left="3px",t.style.backgroundColor="#BFE1FF",localStorage.setItem("darkMode","0"),e("deactivate"))})}
