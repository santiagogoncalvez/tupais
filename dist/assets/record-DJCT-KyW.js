import"./index-DkIkTDby.js";import{N as U}from"./classNewGame-Dn1j-uFa.js";import"./countryDataManajerJson-BXTmO6C4.js";let i;function M(e){let t=document.getElementsByClassName("record-mode")[0];O(t,e.correctAnswers),R()}function R(){const e=document.getElementsByClassName("game__answer-letter");for(let t of e)t.textContent=""}function O(e,t){const n=`
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
    <div class="blurry-background"></div>`;e.insertAdjacentHTML("beforeend",n);const r=document.getElementsByClassName("keyboard__button");for(let l of r)l.removeEventListener("click",b);document.removeEventListener("keydown",b);const s=document.getElementsByClassName("answer-results")[0],o=document.getElementsByClassName("blurry-background")[0],c=document.getElementsByClassName("answer-results__button--start-again")[0],a=document.getElementsByClassName("answer-results__close")[0];c.addEventListener("click",function(){s.style.top="-20rem",o.style.opacity="0",o.remove(),s.remove(),v()}),a.addEventListener("click",function(){s.style.top="-20rem",o.style.opacity="0",o.remove(),s.remove(),v()}),document.addEventListener("keydown",m);function m(l){const[u]=document.getElementsByClassName("answer-results");l.key==="Escape"&&u&&(s.style.top="-20rem",o.style.opacity="0",o.remove(),s.remove(),v(),document.removeEventListener("keydown",m))}}function P(e){const t=document.getElementsByClassName("game__answer-letter");if(t[t.length-1].textContent!=="")return;let n;if(e.answerUser.length===1&&(n=t[0],n.style.border="2px solid rgb(190, 190, 190)",t[1].style.border="2px solid rgb(62, 125, 214)"),e.answerUser.length!==1){if(e.answerUser.length===t.length){n=t[e.answerUser.length-1],n.style.border="2px solid rgb(190, 190, 190)",n.textContent=e.answerUser[e.answerUser.length-1],A(n);return}n=t[e.answerUser.length-1],n.style.border="2px solid rgb(190, 190, 190)",t[e.answerUser.length].style.border="2px solid rgb(62, 125, 214)"}n.textContent=e.answerUser[e.answerUser.length-1],A(n)}function D(e){const t=document.getElementsByClassName("game__answer-letter");let n=t[e.answerUser.length];if(e.answerUser.length+1===t.length){t[e.answerUser.length].style.border="2px solid rgb(62, 125, 214)",n.textContent="";return}t[e.answerUser.length+1].style.border="2px solid rgb(175, 190, 211)",t[e.answerUser.length].style.border="2px solid rgb(62, 125, 214)",n.textContent=""}function A(e){e.style.opacity="0.9",setTimeout(()=>{e.style.opacity="1"},20),e.style.height="1.7rem",e.style.width="1.7rem",e.style.fontSize="0.8rem",setTimeout(()=>{e.style.height="2.2rem",e.style.width="2.2rem"},60),setTimeout(()=>{e.style.height="2rem",e.style.width="2rem",e.style.fontSize="1rem"},70)}function F(e){e.style.fontSize="1.5rem",setTimeout(()=>{e.style.fontSize="1.2rem"},140)}function H(e){const t=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","ç","ñ"],n="enter",r="backspace";return t.includes(e)?"letter":e===n?"enter":e===r?"backspace":null}function S(e,t){let n="";for(let r=0;r<e.length;r++){if(e[r]===" "){n+='<div class="game__answer-letter--space"></div>';continue}n+='<div class="keyboard__container-button"><div class="game__answer-letter"></div></div>'}t.innerHTML=n}function j(e){const[t]=document.getElementsByClassName("country__flag");t.src=e.countries[0].flagUrl;let n=`Bandera de ${e.countries[0].name}`;t.alt=n}function z(e,t){function n(s,o){const[c]=document.getElementsByClassName("response");if(c&&(s==="correct"&&c.classList.contains("correct")||s==="incorrect"&&c.classList.contains("incorrect")||s==="incomplete"&&c.classList.contains("incomplete")))return;let a=document.createElement("div");a.className="response",a.style.opacity=0,s==="correct"&&(a.textContent="Respuesta correcta",a.classList.add("correct")),s==="incorrect"&&(a.textContent="Respuesta incorrecta",a.classList.add("incorrect")),s==="incomplete"&&(a.textContent="Palabra incompleta",a.classList.add("incomplete")),o.appendChild(a),a.style.display="block",setTimeout(function(){a.style.opacity=1},100),setTimeout(function(){a.style.opacity=0},1200),setTimeout(function(){a.remove()},1400)}let r=e.countries[0].name.replace(/\s/g,"");if(e.lastResponseStatus){n("correct",t);return}if(!e.lastResponseStatus){e.answerUser.length!==r.length?n("incomplete",t):n("incorrect",t);return}}function K(e){return{africa:"Continente: ÁFRICA",americas:"Continente: AMÉRICA",asia:"Continente: ASIA",europe:"Continente: EUROPA",oceania:"Continente: OCEANÍA","all continents":"Continente: TODOS"}[e]}async function v(){const[e]=document.getElementsByClassName("country__flag"),[t]=document.getElementsByClassName("game__answer"),[n]=document.getElementsByClassName("country__description"),[r]=document.getElementsByClassName("game__correct-answers"),s=document.getElementsByClassName("keyboard__button");let o=localStorage.getItem("continent")?localStorage.getItem("continent"):"all continents";n.textContent=K(o),r.textContent="0",i=await U.create(o,-1,"/images/flags"),S(i.countries[0].name,t),e.src=i.countries[0].flagUrl;let c=`Bandera de ${i.countries[0].name}`;e.alt=c;for(let a of s)a.addEventListener("click",b);document.addEventListener("keydown",b)}function b(e){let t;if(e.key&&(t=e.key.toLowerCase()),e.target.value&&(t=e.target.value.toLowerCase()),!H(t))return;if(t==="enter"){const s=document.getElementsByClassName("keyboard__button"),[o]=document.getElementsByClassName("game__correct-answers"),[c]=document.getElementsByClassName("game__answer");for(let a of s)a.removeEventListener("click",b);if(document.removeEventListener("keydown",b),i=i.verifyAnswer(i.answerUser,i.countries[0].name),z(i,document.getElementsByClassName("record-mode")[0]),!i.lastResponseStatus&&i.answerUser.length!==i.countries[0].name.replace(/\s/g,"").length){for(let a of s)a.addEventListener("click",b);document.addEventListener("keydown",b);return}i.lastResponseStatus||(r(),I(i.lastResponseStatus,"/images/icons"),setTimeout(()=>{M(i)},1200)),i.lastResponseStatus&&(o.textContent=`${i.correctAnswers}`,F(o),n(),I(i.lastResponseStatus,"/images/icons"),setTimeout(()=>{j(i)},0),setTimeout(()=>{S(i.countries[0].name,c),i=i.resetAnswerUser(i.countries)},1200)),setTimeout(()=>{for(let a of s)a.addEventListener("click",b);document.addEventListener("keydown",b)},1200);return}if(t==="backspace"){if(i.answerUser.length===0)return;i=i.modifyAnswer(t,i.answerUser),D(i);return}if(t!=="backspace"){i=i.modifyAnswer(t,i.answerUser),P(i);return}function n(){const s=document.getElementsByClassName("game__answer-letter");for(let o of s)o.style.border="2px solid #a1cc8e",o.style.backgroundColor="#ecfde4"}function r(){const s=document.getElementsByClassName("game__answer-letter");for(let o of s)o.style.border="2px solid #f5abab",o.style.backgroundColor="#ffeeee";setTimeout(()=>{for(let o of s)o.style.border="",o.style.backgroundColor=""},1200)}}document.addEventListener("DOMContentLoaded",function(){const[e]=document.getElementsByClassName("game__start-again"),[t]=document.getElementsByClassName("game__bt-information");G(),e.addEventListener("click",v),t.addEventListener("click",B),t.addEventListener("mouseenter",k),J(),T(),q()});function q(){const[e]=document.getElementsByClassName("header__title"),[t]=document.getElementsByClassName("footer__paragraph");e.addEventListener("mouseenter",function(n){e.style.userSelect="text"}),e.addEventListener("mouseleave",function(n){e.style.userSelect="none"}),t.addEventListener("mouseenter",function(n){t.style.userSelect="text"}),t.addEventListener("mouseleave",function(n){t.style.userSelect="none"})}async function G(){const[e]=document.getElementsByClassName("header__settings"),[t]=document.getElementsByClassName("record-mode");e.addEventListener("click",()=>{r(t)});async function n(s){const o=`        
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
`;return new Promise(c=>{e.blur(),s.insertAdjacentHTML("beforeend",o);let[a]=document.getElementsByClassName("presentation__section"),[m]=document.getElementsByClassName("blurry-background");const[l]=document.getElementsByClassName("continents-dropdown"),[u]=document.getElementsByClassName("presentation__button-start"),[C]=document.getElementsByClassName("presentation__header-link");a.classList.add("presentation");let y="all continents";l.addEventListener("change",function(g){y=g.target.value,g.target.classList.add("continents-dropdown--focus")}),u.addEventListener("click",function(){localStorage.setItem("continent",y),m.style.opacity="0",m.remove(),a.remove(),document.removeEventListener("click",_),v()});function _(g){!a.contains(g.target)&&g.target!==e&&(localStorage.setItem("continent",y),m.style.opacity="0",m.remove(),a.remove(),document.removeEventListener("click",_),v())}C.addEventListener("click",function(){localStorage.setItem("continent",y),m.style.opacity="0",m.remove(),a.remove(),document.removeEventListener("click",_),v()}),document.addEventListener("keydown",E),document.addEventListener("click",_);function E(g){f(g)}function f(g){g.key==="Escape"&&a&&(localStorage.setItem("continent",y),m.style.opacity="0",m.remove(),a.remove(),document.removeEventListener("click",_),v(),document.removeEventListener("keydown",E))}})}function r(s){function o(d){d.style.height="23rem",d.style.width="26rem",d.style.opacity="0",setTimeout(()=>{d.style.opacity="1"},15),setTimeout(()=>{d.style.height="25rem",d.style.width="28rem"},15)}async function c(d){return new Promise(L=>{d.style.height="23rem",d.style.width="26rem",setTimeout(()=>{d.style.opacity="0"},15),setTimeout(()=>{L()},100)})}const a=`       
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
   `,[m]=document.getElementsByClassName("header__settings");m.blur(),s.insertAdjacentHTML("beforeend",a);const[l]=document.getElementsByClassName("presentation__section");o(l);const[u]=document.getElementsByClassName("blurry-background"),[C]=document.getElementsByClassName("continents-dropdown"),[y]=document.getElementsByClassName("presentation__button-start"),[_]=document.getElementsByClassName("presentation__header-link");l.classList.add("settings");let E="all continents";C.addEventListener("change",function(d){E=d.target.value,d.target.classList.add("continents-dropdown--focus")}),y.addEventListener("click",function(){localStorage.setItem("continent",E),u.style.opacity="0",u.remove(),c(l).then(d=>{l.remove(),document.removeEventListener("click",f),document.removeEventListener("keydown",g),v()})});function f(d){!l.contains(d.target)&&d.target!==m&&l.classList.contains("settings")&&(u.style.opacity="0",u.remove(),c(l).then(L=>{l.remove(),document.removeEventListener("click",f),document.removeEventListener("keydown",g)}))}T(),_.addEventListener("click",function(){u.style.opacity="0",u.remove(),c(l).then(d=>{l.remove(),document.removeEventListener("click",f),document.removeEventListener("keydown",g)})}),document.addEventListener("keydown",g),document.addEventListener("click",f);function g(d){h(d)}function h(d){d.key==="Escape"&&l&&(u.style.opacity="0",u.remove(),c(l).then(L=>{l.remove(),document.removeEventListener("click",f),document.removeEventListener("keydown",g)}))}}!localStorage.getItem("time")&&!localStorage.getItem("continent")?await n(t):v()}function B(){const[e]=document.getElementsByClassName("information-card"),[t]=document.getElementsByClassName("game__bt-information");e?N(e).then(()=>{t.style.backgroundColor="",e.remove(),t.addEventListener("mouseenter",k)}):(x(),document.addEventListener("mousemove",w),t.removeEventListener("mouseenter",k))}function k(){const[e]=document.getElementsByClassName("information-card"),[t]=document.getElementsByClassName("game__bt-information");if(t.removeEventListener("click",B),setTimeout(()=>{t.addEventListener("click",B)},0),e){t.style.backgroundColor="",e.remove(),t.addEventListener("mouseenter",k),document.removeEventListener("mousemove",w);return}x(),document.addEventListener("mousemove",w),t.removeEventListener("mouseenter",k)}function w(e){const[t]=document.getElementsByClassName("information-card"),[n]=document.getElementsByClassName("presentation__div"),[r]=document.getElementsByClassName("information-card__subtitle"),[s]=document.getElementsByClassName("information-card__paragraph"),[o]=document.getElementsByClassName("game__bt-information");t&&e.target!==t&&e.target!==n&&e.target!==r&&e.target!==s&&e.target!==o&&N(t).then(()=>{o.style.backgroundColor="",t.remove(),o.addEventListener("mouseenter",k),document.removeEventListener("mousemove",w)})}function $(e){e.style.opacity="0",e.style.width="21rem",e.style.height="11rem",setTimeout(()=>{e.style.opacity="1"},15),setTimeout(()=>{e.style.width="22rem",e.style.height="12rem"},15)}async function N(e){return new Promise(t=>{e.style.width="21rem",e.style.height="11rem",setTimeout(()=>{e.style.opacity="0"},15),setTimeout(()=>{t()},100)})}function J(){const[e]=document.getElementsByClassName("navbar__button--open"),[t]=document.getElementsByClassName("navbar"),[n]=document.getElementsByClassName("navbar__button--close"),[r]=document.getElementsByClassName("footer__icon-github"),[s]=document.getElementsByClassName("record-mode");r.addEventListener("mouseover",()=>{s.classList.contains("dark-mode__page")?r.style.backgroundImage="url('/images/icons/icons-github-dark-mode-hover.svg')":r.style.backgroundImage="url('/images/icons/icons-github.svg')",r.addEventListener("mouseout",()=>{s.classList.contains("dark-mode__page")?r.style.backgroundImage="url('/images/icons/icons-github-dark-mode.svg')":r.style.backgroundImage="url('/images/icons/icons-github-hover.svg')"})}),e.addEventListener("click",function(c){if(t.style.left==="-25rem"||t.style.left===""){new Promise(a=>{t.style.left="0rem",a()}).then(a=>{setTimeout(()=>{document.addEventListener("click",o)},0)});return}if(t.style.left==="0rem"){t.contains(c.target)||(t.style.left="-25rem",document.removeEventListener("click",o));return}});function o(c){t.contains(c.target)||(t.style.left="-25rem",document.removeEventListener("click",o))}n.addEventListener("click",function(){t.style.left="-25rem",document.removeEventListener("click",o)}),document.addEventListener("keydown",c=>{c.key==="Escape"&&t.style.left==="0rem"&&(t.style.left="-25rem")})}function I(e,t){const[n]=document.getElementsByClassName("country__container");let r=document.createElement("div"),s=document.createElement("img");const[o]=document.getElementsByClassName("record-mode");e?(t+="/icons-correct.svg",s.src=t):(t+="/icons-incorrect.svg",s.src=t),r.classList.add("overlappingBackground"),o.classList.contains("dark-mode__page")&&r.classList.add("dark-mode__overlappingBackground"),s.classList.add("multiple-choice__iconAnswer--defoult"),n.appendChild(r),n.appendChild(s),setTimeout(()=>{s.classList.add("multiple-choice__iconAnswer--active")},100),setTimeout(()=>{r.remove(),s.remove()},1200)}function x(e){const t=`       
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
`,[n]=document.getElementsByClassName("game__bt-information"),[r]=document.getElementsByClassName("game__container");r.insertAdjacentHTML("beforeend",t);const[s]=document.getElementsByClassName("information-card");$(s),n.style.backgroundColor="rgb(225, 225, 225)";function o(m){!s.contains(m.target)&&m.target!==n&&(s.remove(),n.style.backgroundColor="white",document.removeEventListener("keydown",c),document.removeEventListener("click",o))}document.addEventListener("keydown",c),document.addEventListener("click",o);function c(m){a(m)}function a(m){if(m.key==="Escape"){const[l]=document.getElementsByClassName("information-card"),[u]=document.getElementsByClassName("game__bt-information");s&&N(l).then(()=>{u.style.backgroundColor="",l.remove(),u.addEventListener("mouseenter",k)})}}}function T(){function e(s){const[o]=document.getElementsByClassName("record-mode"),[c]=document.getElementsByClassName("record-mode__main"),[a]=document.getElementsByClassName("header"),[m]=document.getElementsByClassName("footer"),[l]=document.getElementsByClassName("header__title"),[u]=document.getElementsByClassName("country__description"),[C]=document.getElementsByClassName("navbar__button--open"),[y]=document.getElementsByClassName("footer__paragraph"),[_]=document.getElementsByClassName("header__settings"),[E]=document.getElementsByClassName("keyboard__button--enter"),[f]=document.getElementsByClassName("game__start-again"),[g]=document.getElementsByClassName("footer__icon-github"),h=document.getElementsByClassName("navbar__icon"),d=document.getElementsByClassName("button-keyboard"),L=document.getElementsByClassName("game__statistics-item");if(s==="activate"){a.classList.add("dark-mode__header"),m.classList.add("dark-mode__footer"),l.classList.add("dark-mode__header--title"),u.classList.add("dark-mode__game-text"),y.classList.add("dark-mode__game-text"),o.classList.add("dark-mode__page"),c.classList.add("dark-mode__page"),_.classList.add("dark-mode__button-settings"),C.classList.add("dark-mode__navbar-button-open"),E.classList.add("dark-mode__enter"),f.classList.add("dark-mode__start-again"),g.classList.add("dark-mode__github-bt");for(let p of L)p.classList.add("dark-mode__game-text");for(let p of h)p.classList.add("dark-mode__navbar-icon");for(let p of d)p.classList.add("dark-mode__keyboard-button")}if(s==="deactivate"){a.classList.remove("dark-mode__header"),m.classList.remove("dark-mode__footer"),l.classList.remove("dark-mode__header--title"),u.classList.remove("dark-mode__game-text"),y.classList.remove("dark-mode__game-text"),o.classList.remove("dark-mode__page"),c.classList.remove("dark-mode__page"),_.classList.remove("dark-mode__button-settings"),C.classList.remove("dark-mode__navbar-button-open"),E.classList.remove("dark-mode__enter"),f.classList.remove("dark-mode__start-again"),g.classList.remove("dark-mode__github-bt");for(let p of L)p.classList.remove("dark-mode__game-text");for(let p of h)p.classList.remove("dark-mode__navbar-icon");for(let p of d)p.classList.remove("dark-mode__keyboard-button")}}const[t]=document.getElementsByClassName("dark-mode-bt"),[n]=document.getElementsByClassName("dark-mode-bt__circle");let r;if(localStorage.getItem("darkMode")===""){if(window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?(localStorage.setItem("darkMode","1"),r=Number(localStorage.getItem("darkMode"))):(localStorage.setItem("darkMode","0"),r=Number(localStorage.getItem("darkMode"))),r){e("activate");return}return}else r=Number(localStorage.getItem("darkMode"));e(r?"activate":"deactivate"),t&&(r?(n.style.left="32px",t.style.backgroundColor="#0D336B"):(n.style.left="3px",t.style.backgroundColor="#BFE1FF")),t&&t.addEventListener("click",function(){n.style.left==="3px"?(n.style.left="32px",t.style.backgroundColor="#0D336B",localStorage.setItem("darkMode","1"),e("activate")):(n.style.left="3px",t.style.backgroundColor="#BFE1FF",localStorage.setItem("darkMode","0"),e("deactivate"))})}
