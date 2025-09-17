const fuseConfig = {
  isCaseSensitive: false,
  includeScore: false,
  shouldSort: true,
  minMatchCharLength: 1,
  threshold: 0.3, // sensibilidad (0 más estricto, 1 más permisivo)
  distance: 100,
  ignoreLocation: false,
  ignoreDiacritics: true, // ignora acentos (México == Mexico)
};

export default fuseConfig;
