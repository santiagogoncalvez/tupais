export function applyClasses(root, baseClasses, modifiersMap, mode) {
   if (!root) throw new Error("Don´t exist root");

   const modifiers = modifiersMap[mode];

   root.classList.add(modifiers.container);
   for (const key of Object.keys(modifiers)) {
      if (key === "container") continue;
      const selector = `.${baseClasses[key]}`;
      const child = root.querySelector(selector);
      if (child && modifiers[key]) {
         child.classList.add(modifiers[key]);
      }
   }
}

export function deleteClasses(root, baseClasses, modifiersMap, mode) {
   if (!root) throw new Error("Don´t exist root");

   const modifiers = modifiersMap[mode];

   root.classList.remove(modifiers.container);
   for (const key of Object.keys(modifiers)) {
      if (key === "container") continue;
      const selector = `.${baseClasses[key]}`;
      const child = root.querySelector(selector);
      if (child && modifiers[key]) {
         child.classList.remove(modifiers[key]);
      }
   }
}
