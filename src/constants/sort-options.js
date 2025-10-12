export const SORT_TYPES = {
    NAME_ASC: "name-asc",
    NAME_DESC: "name-desc",
    CONTINENT: "continent",
    POPULATION_ASC: "population-asc",
    POPULATION_DESC: "population-desc",
    AREA_ASC: "area-asc",
    AREA_DESC: "area-desc"
};

export const sortOptions = {
    [SORT_TYPES.NAME_ASC]: "Nombre (A-Z)",
    [SORT_TYPES.NAME_DESC]: "Nombre (Z-A)",
    [SORT_TYPES.CONTINENT]: "Continente",
    [SORT_TYPES.POPULATION_ASC]: "Menor población",
    [SORT_TYPES.POPULATION_DESC]: "Mayor población",
    [SORT_TYPES.AREA_ASC]: "Menor superficie",
    [SORT_TYPES.AREA_DESC]: "Mayor superficie",
};
