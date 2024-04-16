// Menu events
function addMenuEvents() {
   const menuButtonOpen = document.getElementsByClassName(
      "navbar__button--open"
   );
   const menu = document.getElementsByClassName("navbar");
   const menuButtonClose = document.getElementsByClassName(
      "navbar__button--close"
   );

   menuButtonOpen[0].addEventListener("click", function () {
      menu[0].style.left = "0rem";
   });

   menuButtonClose[0].addEventListener("click", function () {
      menu[0].style.left = "-25rem";
   });

   document.addEventListener("click", function (event) {
      const menuButtonOpenSpan =
         document.getElementsByClassName("navbar__icon");
      if (
         !Array.from(menuButtonOpenSpan).some((element) => {
            return event.target === element;
         }) &&
         event.target !== menuButtonOpen[0]
      ) {
         if (menu[0].style.left === "0rem") {
            if (
               !menu[0].contains(event.target) &&
               !menuButtonClose[0].contains(event.target)
            ) {
               menu[0].style.left = "-25rem";
            }
         }
      }
   });
}
addMenuEvents();
