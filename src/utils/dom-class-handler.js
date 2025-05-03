export function applyClasses(root, baseClasses, modifiersMap, mode) {
   if (!root) throw new Error("Don´t exist root");

   const modeModifiers = modifiersMap[mode];

   // Aplicar al root
   root.classList.add(modeModifiers.block);

   const apply = (root, baseNode, modNode) => {
      for (const prop in baseNode) {
         const baseClass = baseNode[prop];
         const modClass = modNode?.[prop];

         if (typeof baseClass === "string") {
            const targets = root.querySelectorAll(`.${baseClass}`);

            if (targets.length) {
               targets.forEach((el) => {
                  if (modClass) el.classList.add(modClass);
               });
            }
         } else if (typeof baseClass === "object") {
            apply(root, baseClass, modClass || {});
         }
      }
   };

   apply(root, baseClasses, modeModifiers);
}

export function deleteClasses(root, baseClasses, modifiersMap, mode) {
   if (!root) throw new Error("Don´t exist root");

   const modeModifiers = modifiersMap[mode];

   // Aplicar al root
   root.classList.remove(modeModifiers.block);

   const remove = (root, baseNode, modNode) => {
      for (const prop in baseNode) {
         const baseClass = baseNode[prop];
         const modClass = modNode?.[prop];

         if (typeof baseClass === "string") {
            const targets = root.querySelectorAll(`.${baseClass}`);

            if (targets.length) {
               targets.forEach((el) => {
                  if (modClass) el.classList.remove(modClass);
               });
            }
         } else if (typeof baseClass === "object") {
            remove(root, baseClass, modClass || {});
         }
      }
   };

   remove(root, baseClasses, modeModifiers);
}
