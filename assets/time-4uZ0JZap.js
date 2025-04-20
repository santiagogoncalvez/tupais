import"./index-DQllQ-ab.js";import{N as z}from"./classNewGame-Dn1j-uFa.js";import"./countryDataManajerJson-BXTmO6C4.js";let M="/tupais/",a,N=null,I;function D(e){let t=document.getElementsByClassName("time-trial-mode")[0];q(t,e.correctAnswers),K()}function K(){const e=document.getElementsByClassName("game__answer-letter");for(let t of e)t.textContent=""}function q(e,t,n){const o=`
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
    <div class="blurry-background"></div>`,[s]=document.getElementsByClassName("presentation__section"),[i]=document.getElementsByClassName("blurry-background"),[l]=document.getElementsByClassName("header__settings");l.blur(),s&&(s.remove(),i.remove()),e.insertAdjacentHTML("beforeend",o);const r=document.getElementsByClassName("keyboard__button");for(let _ of r)_.removeEventListener("click",b);document.removeEventListener("keydown",b);const c=document.getElementsByClassName("answer-results")[0],g=document.getElementsByClassName("blurry-background")[0],d=document.getElementsByClassName("answer-results__button--start-again")[0],f=document.getElementsByClassName("answer-results__close")[0];d.addEventListener("click",function(){c.style.top="-20rem",g.style.opacity="0",g.remove(),c.remove(),v()}),f.addEventListener("click",function(){c.style.top="-20rem",g.style.opacity="0",g.remove(),c.remove(),v()}),document.addEventListener("keydown",E);function E(_){const[C]=document.getElementsByClassName("answer-results");_.key==="Escape"&&C&&(c.style.top="-20rem",g.style.opacity="0",g.remove(),c.remove(),v(),document.removeEventListener("keydown",E))}}function G(e){const t=document.getElementsByClassName("game__answer-letter");if(t[t.length-1].textContent!=="")return;let n;if(e.answerUser.length===1&&(n=t[0],n.style.border="2px solid rgb(190, 190, 190)",t[1].style.border="2px solid rgb(62, 125, 214)"),e.answerUser.length!==1){if(e.answerUser.length===t.length){n=t[e.answerUser.length-1],n.style.border="2px solid rgb(190, 190, 190)",n.textContent=e.answerUser[e.answerUser.length-1],P(n);return}n=t[e.answerUser.length-1],n.style.border="2px solid rgb(190, 190, 190)",t[e.answerUser.length].style.border="2px solid rgb(62, 125, 214)"}n.textContent=e.answerUser[e.answerUser.length-1],P(n)}function J(e){const t=document.getElementsByClassName("game__answer-letter");let n=t[e.answerUser.length];if(e.answerUser.length+1===t.length){t[e.answerUser.length].style.border="2px solid rgb(62, 125, 214)",n.textContent="";return}t[e.answerUser.length+1].style.border="2px solid rgb(175, 190, 211)",t[e.answerUser.length].style.border="2px solid rgb(62, 125, 214)",n.textContent=""}function P(e){e.style.opacity="0.9",setTimeout(()=>{e.style.opacity="1"},20),e.style.height="1.7rem",e.style.width="1.7rem",e.style.fontSize="0.8rem",setTimeout(()=>{e.style.height="2.2rem",e.style.width="2.2rem"},60),setTimeout(()=>{e.style.height="2rem",e.style.width="2rem",e.style.fontSize="1rem"},70)}function Z(e){e.style.fontSize="1.5rem",setTimeout(()=>{e.style.fontSize="1.2rem"},140)}function V(e){const t=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","ç","ñ","arrowright"],n="enter",o="backspace";return t.includes(e)?"letter":e===n?"enter":e===o?"backspace":null}function U(e,t){let n="";for(let o=0;o<e.length;o++){if(e[o]===" "){n+='<div class="game__answer-letter--space"></div>';continue}n+='<div class="keyboard__container-button"><div class="game__answer-letter"></div></div>'}t.innerHTML=n}function $(e){const[t]=document.getElementsByClassName("country__flag");t.src=e.countries[0].flagUrl;let n=`Bandera de ${e.countries[0].name}`;t.alt=n}function Q(e,t){function n(s,i){const[l]=document.getElementsByClassName("response");if(l&&(s==="correct"&&l.classList.contains("correct")||s==="incorrect"&&l.classList.contains("incorrect")||s==="incomplete"&&l.classList.contains("incomplete")))return;let r=document.createElement("div");r.className="response",r.style.opacity=0,s==="correct"&&(r.textContent="Respuesta correcta",r.classList.add("correct")),s==="incorrect"&&(r.textContent="Respuesta incorrecta",r.classList.add("incorrect")),s==="incomplete"&&(r.textContent="Palabra incompleta",r.classList.add("incomplete")),i.appendChild(r),r.style.display="block",setTimeout(function(){r.style.opacity=1},100),setTimeout(function(){r.style.opacity=0},1e3),setTimeout(function(){r.remove()},1100)}let o=e.countries[0].name.replace(/\s/g,"");if(e.lastResponseStatus){n("correct",t);return}if(!e.lastResponseStatus){e.answerUser.length!==o.length?n("incomplete",t):n("incorrect",t);return}}function W(e){return{africa:"Continente: ÁFRICA",americas:"Continente: AMÉRICA",asia:"Continente: ASIA",europe:"Continente: EUROPA",oceania:"Continente: OCEANÍA","all continents":"Continente: TODOS"}[e]}async function v(){N&&clearInterval(N),I&&clearInterval(I);const e=document.getElementsByClassName("game__time");let t=localStorage.getItem("time")?Number(localStorage.getItem("time")):-1;t===-1&&(t=3e4),t!==-1&&(e[0].textContent=X(t),t-=1e3,Y(t,e[0]),t+=1e3);const[n]=document.getElementsByClassName("country__flag"),[o]=document.getElementsByClassName("game__answer"),[s]=document.getElementsByClassName("country__description"),[i]=document.getElementsByClassName("game__correct-answers"),l=document.getElementsByClassName("keyboard__button");let r=localStorage.getItem("continent")?localStorage.getItem("continent"):"all continents";s.textContent=W(r),i.textContent="0",a=await z.create(r,-1,"/tupais/images/flags"),U(a.countries[0].name,o),n.src=a.countries[0].flagUrl;let c=`Bandera de ${a.countries[0].name}`;n.alt=c;for(let g of l)g.addEventListener("click",b);document.addEventListener("keydown",b)}function A(e,t){return("0"+e).slice(-2)}function X(e){let t=Math.floor(e/1e3),n=Math.floor(t/60),o=t%60,s=A(n),i=A(o);return s+":"+i}function Y(e,t){e===-1&&(N=setInterval(function(){a&&a.correctAnswers===10&&clearInterval(N)},1e3)),e!==-1&&(I=setInterval(function(){if(e<0)clearInterval(I),D(a);else{let n=Math.floor(e/6e4),o=Math.floor(e%6e4/1e3),s=A(n)+":"+A(o);t.textContent=s,e-=1e3}},1e3))}function b(e){let t;if(e.key&&(t=e.key.toLowerCase()),e.target.value&&(t=e.target.value.toLowerCase()),!V(t))return;if(t==="arrowright"){F();return}if(t==="enter"){const s=document.getElementsByClassName("keyboard__button"),[i]=document.getElementsByClassName("game__correct-answers"),[l]=document.getElementsByClassName("game__answer");for(let c of s)c.removeEventListener("click",b);if(document.removeEventListener("keydown",b),a=a.verifyAnswer(a.answerUser,a.countries[0].name),Q(a,document.getElementsByClassName("time-trial-mode")[0]),!a.lastResponseStatus&&a.answerUser.length!==a.countries[0].name.replace(/\s/g,"").length){for(let c of s)c.addEventListener("click",b);document.addEventListener("keydown",b);return}let r=M+"images/icons";a.lastResponseStatus||(o(),O(a.lastResponseStatus,r),a.correctAnswers===10&&setTimeout(()=>{D(a)},1500)),a.lastResponseStatus&&(i.textContent=`${a.correctAnswers}`,Z(i),n(),O(a.lastResponseStatus,r),setTimeout(()=>{$(a)},0),setTimeout(()=>{U(a.countries[0].name,l),a=a.resetAnswerUser()},1e3)),setTimeout(()=>{for(let c of s)c.addEventListener("click",b);document.addEventListener("keydown",b)},1e3);return}if(t==="backspace"){if(a.answerUser.length===0)return;a=a.modifyAnswer(t,a.answerUser),J(a);return}if(t!=="backspace"){a=a.modifyAnswer(t,a.answerUser),G(a);return}function n(){const s=document.getElementsByClassName("game__answer-letter");for(let i of s)i.style.border="2px solid #a1cc8e",i.style.backgroundColor="#ecfde4"}function o(){const s=document.getElementsByClassName("game__answer-letter");for(let i of s)i.style.border="2px solid #f5abab",i.style.backgroundColor="#ffeeee";setTimeout(()=>{for(let i of s)i.style.border="",i.style.backgroundColor=""},1e3)}}document.addEventListener("DOMContentLoaded",function(){const[e]=document.getElementsByClassName("country__btNext"),[t]=document.getElementsByClassName("game__start-again"),[n]=document.getElementsByClassName("game__bt-information");te(),e.addEventListener("click",F),t.addEventListener("click",v),n.addEventListener("click",T),n.addEventListener("mouseenter",h),se(),j(),ee()});function ee(){const[e]=document.getElementsByClassName("header__title"),[t]=document.getElementsByClassName("footer__paragraph");e.addEventListener("mouseenter",function(n){e.style.userSelect="text"}),e.addEventListener("mouseleave",function(n){e.style.userSelect="none"}),t.addEventListener("mouseenter",function(n){t.style.userSelect="text"}),t.addEventListener("mouseleave",function(n){t.style.userSelect="none"})}async function te(){const[e]=document.getElementsByClassName("header__settings"),[t]=document.getElementsByClassName("time-trial-mode");e.addEventListener("click",()=>{o(t)});async function n(s){const i=`        
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
`;return new Promise(l=>{e.blur(),s.insertAdjacentHTML("beforeend",i);let[r]=document.getElementsByClassName("presentation__section"),[c]=document.getElementsByClassName("blurry-background");const[g]=document.getElementsByClassName("continents-dropdown"),d=document.getElementsByClassName("presentation__button-time"),[f]=document.getElementsByClassName("presentation__button-start"),[E]=document.getElementsByClassName("presentation__header-link");r.classList.add("presentation"),r.classList.add("presentation-with-time");let _="all continents",C=[15e3,3e4,6e4];g.addEventListener("change",function(u){_=u.target.value,u.target.classList.add("continents-dropdown--focus")});for(let u=0;u<d.length;u++)d[u].addEventListener("click",function(k){localStorage.setItem("time",C[u]);for(let p of d){if(p===d[u]){p.classList.add("presentation__button-time--focus");continue}p.classList.remove("presentation__button-time--focus")}});f.addEventListener("click",function(){localStorage.setItem("continent",_),c.style.opacity="0",c.remove(),r.remove(),document.removeEventListener("click",y),v()});function y(u){!r.contains(u.target)&&u.target!==e&&(localStorage.setItem("continent",_),c.style.opacity="0",c.remove(),r.remove(),document.removeEventListener("click",y),v())}E.addEventListener("click",function(){localStorage.setItem("continent",_),c.style.opacity="0",c.remove(),r.remove(),document.removeEventListener("click",y),v()}),document.addEventListener("keydown",L),document.addEventListener("click",y);function L(u){w(u)}function w(u){u.key==="Escape"&&r&&(localStorage.setItem("continent",_),c.style.opacity="0",c.remove(),r.remove(),document.removeEventListener("click",y),v(),document.removeEventListener("keydown",L))}})}function o(s){function i(m){m.style.height="23rem",m.style.width="26rem",m.style.opacity="0",setTimeout(()=>{m.style.opacity="1"},15),setTimeout(()=>{m.style.height="30rem",m.style.width="28rem"},15)}async function l(m){return new Promise(B=>{m.style.height="23rem",m.style.width="26rem",setTimeout(()=>{m.style.opacity="0"},15),setTimeout(()=>{B()},100)})}let r=M+"images/icons";const c=`       
               <div class="presentation__section">
               <button class="presentation__header-link" title="Cerrar" type="button"
                       >
                   </button>
               
                  <div class="presentation__div">
   
                  <div class="presentation__subtitle">Modo oscuro</div>
                  <button class="dark-mode-bt" type="button" title="Modo oscuro">
                    <img width="20" height="20" src="${r}/icons-sun.svg" alt="sun-symbol" class="dark-mode-bt__sun"/>
       
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
   `,[g]=document.getElementsByClassName("header__settings");g.blur(),s.insertAdjacentHTML("beforeend",c);const[d]=document.getElementsByClassName("presentation__section");i(d);const[f]=document.getElementsByClassName("blurry-background"),[E]=document.getElementsByClassName("continents-dropdown"),_=document.getElementsByClassName("presentation__button-time"),[C]=document.getElementsByClassName("presentation__button-start"),[y]=document.getElementsByClassName("presentation__header-link");d.classList.add("settings");let L="all continents",w=[15e3,3e4,6e4];E.addEventListener("change",function(m){L=m.target.value,m.target.classList.add("continents-dropdown--focus")});for(let m=0;m<_.length;m++)_[m].addEventListener("click",function(B){localStorage.setItem("time",w[m]);for(let x of _){if(x===_[m]){x.classList.add("presentation__button-time--focus");continue}x.classList.remove("presentation__button-time--focus")}});C.addEventListener("click",function(){localStorage.setItem("continent",L),f.style.opacity="0",f.remove(),l(d).then(m=>{d.remove(),document.removeEventListener("click",u),document.removeEventListener("keydown",k),v()})});function u(m){!d.contains(m.target)&&m.target!==g&&d.classList.contains("settings")&&(f.style.opacity="0",f.remove(),l(d).then(B=>{d.remove(),document.removeEventListener("click",u),document.removeEventListener("keydown",k)}))}j(),y.addEventListener("click",function(){f.style.opacity="0",f.remove(),l(d).then(m=>{d.remove(),document.removeEventListener("click",u),document.removeEventListener("keydown",k)})}),document.addEventListener("keydown",k),document.addEventListener("click",u);function k(m){p(m)}function p(m){m.key==="Escape"&&d&&(f.style.opacity="0",f.remove(),l(d).then(B=>{d.remove(),document.removeEventListener("click",u),document.removeEventListener("keydown",k)}))}}!localStorage.getItem("time")&&!localStorage.getItem("continent")?await n(t):v()}function T(){const[e]=document.getElementsByClassName("information-card"),[t]=document.getElementsByClassName("game__bt-information");e?R(e).then(()=>{t.style.backgroundColor="",e.remove(),t.addEventListener("mouseenter",h)}):(H(),document.addEventListener("mousemove",S),t.removeEventListener("mouseenter",h))}function h(){const[e]=document.getElementsByClassName("information-card"),[t]=document.getElementsByClassName("game__bt-information");if(t.removeEventListener("click",T),setTimeout(()=>{t.addEventListener("click",T)},0),e){t.style.backgroundColor="",e.remove(),t.addEventListener("mouseenter",h),document.removeEventListener("mousemove",S);return}H(),document.addEventListener("mousemove",S),t.removeEventListener("mouseenter",h)}function S(e){const[t]=document.getElementsByClassName("information-card"),[n]=document.getElementsByClassName("presentation__div"),[o]=document.getElementsByClassName("information-card__subtitle"),[s]=document.getElementsByClassName("information-card__paragraph"),[i]=document.getElementsByClassName("game__bt-information");t&&e.target!==t&&e.target!==n&&e.target!==o&&e.target!==s&&e.target!==i&&R(t).then(()=>{i.style.backgroundColor="",t.remove(),i.addEventListener("mouseenter",h),document.removeEventListener("mousemove",S)})}function ne(e){e.style.opacity="0",e.style.width="21rem",e.style.height="11rem",setTimeout(()=>{e.style.opacity="1"},15),setTimeout(()=>{e.style.width="22rem",e.style.height="12rem"},15)}async function R(e){return new Promise(t=>{e.style.width="21rem",e.style.height="11rem",setTimeout(()=>{e.style.opacity="0"},15),setTimeout(()=>{t()},100)})}function F(){const[e]=document.getElementsByClassName("country__btNext");e.blur();const[t]=document.getElementsByClassName("country__flag"),[n]=document.getElementsByClassName("game__answer");t.addEventListener("load",o);function o(){U(a.countries[0].name,n),t.removeEventListener("load",o)}a=a.resetAnswerUser(a.countries),a=a.nextCountry(),$(a)}function se(){const[e]=document.getElementsByClassName("navbar__button--open"),[t]=document.getElementsByClassName("navbar"),[n]=document.getElementsByClassName("navbar__button--close"),[o]=document.getElementsByClassName("footer__icon-github"),[s]=document.getElementsByClassName("time-trial-mode");o.addEventListener("mouseover",()=>{let l=M+"/images/icons";s.classList.contains("dark-mode__page")?o.style.backgroundImage=`url(${l+"/icons-github-dark-mode-hover.svg"})`:o.style.backgroundImage=`url(${l+"/icons-github.svg"})`,o.addEventListener("mouseout",()=>{s.classList.contains("dark-mode__page")?o.style.backgroundImage=`url(${l+"/icons-github-dark-mode.svg"})`:o.style.backgroundImage=`url(${l+"/icons-github-hover.svg"})`})}),e.addEventListener("click",function(l){if(t.style.left==="-25rem"||t.style.left===""){new Promise(r=>{t.style.left="0rem",r()}).then(r=>{setTimeout(()=>{document.addEventListener("click",i)},0)});return}if(t.style.left==="0rem"){t.contains(l.target)||(t.style.left="-25rem",document.removeEventListener("click",i));return}});function i(l){t.contains(l.target)||(t.style.left="-25rem",document.removeEventListener("click",i))}n.addEventListener("click",function(){t.style.left="-25rem",document.removeEventListener("click",i)}),document.addEventListener("keydown",l=>{l.key==="Escape"&&t.style.left==="0rem"&&(t.style.left="-25rem")})}function O(e,t){const[n]=document.getElementsByClassName("country__container");let o=document.createElement("div"),s=document.createElement("img");const[i]=document.getElementsByClassName("time-trial-mode");e?(t+="/icons-correct.svg",s.src=t):(t+="/icons-incorrect.svg",s.src=t),o.classList.add("overlappingBackground"),i.classList.contains("dark-mode__page")&&o.classList.add("dark-mode__overlappingBackground"),s.classList.add("multiple-choice__iconAnswer--defoult"),n.appendChild(o),n.appendChild(s),setTimeout(()=>{s.classList.add("multiple-choice__iconAnswer--active")},100),setTimeout(()=>{o.remove(),s.remove()},1e3)}function H(e){const t=`       
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
`,[n]=document.getElementsByClassName("game__bt-information"),[o]=document.getElementsByClassName("game__container");o.insertAdjacentHTML("beforeend",t);const[s]=document.getElementsByClassName("information-card");ne(s),n.style.backgroundColor="rgb(225, 225, 225)";function i(c){!s.contains(c.target)&&c.target!==n&&(s.remove(),n.style.backgroundColor="white",document.removeEventListener("keydown",l),document.removeEventListener("click",i))}document.addEventListener("keydown",l),document.addEventListener("click",i);function l(c){r(c)}function r(c){if(c.key==="Escape"){const[g]=document.getElementsByClassName("information-card"),[d]=document.getElementsByClassName("game__bt-information");s&&R(g).then(()=>{d.style.backgroundColor="",g.remove(),d.addEventListener("mouseenter",h)})}}}function j(){function e(s){const[i]=document.getElementsByClassName("header"),[l]=document.getElementsByClassName("footer"),[r]=document.getElementsByClassName("header__title"),[c]=document.getElementsByClassName("country__description"),[g]=document.getElementsByClassName("time-trial-mode"),[d]=document.getElementsByClassName("time-trial-mode__main"),[f]=document.getElementsByClassName("navbar__button--open"),[E]=document.getElementsByClassName("footer__paragraph"),[_]=document.getElementsByClassName("header__settings"),[C]=document.getElementsByClassName("keyboard__button--enter"),[y]=document.getElementsByClassName("game__start-again"),[L]=document.getElementsByClassName("footer__icon-github"),w=document.getElementsByClassName("navbar__icon"),u=document.getElementsByClassName("multiple-choice__option"),k=document.getElementsByClassName("game__statistics-item");if(s==="activate"){i.classList.add("dark-mode__header"),l.classList.add("dark-mode__footer"),r.classList.add("dark-mode__header--title"),c.classList.add("dark-mode__game-text"),E.classList.add("dark-mode__game-text"),g.classList.add("dark-mode__page"),d.classList.add("dark-mode__page"),_.classList.add("dark-mode__button-settings"),f.classList.add("dark-mode__navbar-button-open"),C.classList.add("dark-mode__enter"),y.classList.add("dark-mode__start-again"),L.classList.add("dark-mode__github-bt");for(let p of k)p.classList.add("dark-mode__game-text");for(let p of w)p.classList.add("dark-mode__navbar-icon");for(let p of u)p.classList.add("dark-mode__keyboard-button")}if(s==="deactivate"){i.classList.remove("dark-mode__header"),l.classList.remove("dark-mode__footer"),r.classList.remove("dark-mode__header--title"),c.classList.remove("dark-mode__game-text"),E.classList.remove("dark-mode__game-text"),g.classList.remove("dark-mode__page"),d.classList.remove("dark-mode__page"),_.classList.remove("dark-mode__button-settings"),f.classList.remove("dark-mode__navbar-button-open"),C.classList.remove("dark-mode__enter"),y.classList.remove("dark-mode__start-again"),L.classList.remove("dark-mode__github-bt");for(let p of k)p.classList.remove("dark-mode__game-text");for(let p of w)p.classList.remove("dark-mode__navbar-icon");for(let p of u)p.classList.remove("dark-mode__keyboard-button")}}const[t]=document.getElementsByClassName("dark-mode-bt"),[n]=document.getElementsByClassName("dark-mode-bt__circle");let o;if(localStorage.getItem("darkMode")===""){if(window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?(localStorage.setItem("darkMode","1"),o=Number(localStorage.getItem("darkMode"))):(localStorage.setItem("darkMode","0"),o=Number(localStorage.getItem("darkMode"))),o){e("activate");return}return}else o=Number(localStorage.getItem("darkMode"));e(o?"activate":"deactivate"),t&&(o?(n.style.left="32px",t.style.backgroundColor="#0D336B"):(n.style.left="3px",t.style.backgroundColor="#BFE1FF")),t&&t.addEventListener("click",function(){n.style.left==="3px"?(n.style.left="32px",t.style.backgroundColor="#0D336B",localStorage.setItem("darkMode","1"),e("activate")):(n.style.left="3px",t.style.backgroundColor="#BFE1FF",localStorage.setItem("darkMode","0"),e("deactivate"))})}
