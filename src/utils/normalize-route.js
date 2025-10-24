// Normaliza hash o URL-encoded → devuelve ruta tipo "/about" o "/flag-gallery/arabia saudi"
export function normalizeRoute(path) {
    if (!path) return "/";

    // 1. Decodificar URI (por si vienen %2F, %20, etc)
    try {
        path = decodeURIComponent(path);
    } catch (e) {
        // si decode falla, usamos path tal cual
    }

    // 2. Eliminar "#" al inicio
    path = path.replace(/^#/, "");

    // 3. Separar en partes y filtrar vacíos (evita "//")
    const parts = path.split("/").filter(Boolean);

    if (parts.length === 0) return "/"; // raíz

    // 4. Si es flag-gallery con país
    if (parts[0] === "flag-gallery" && parts[1]) {
        const countryName = parts[1]
            .replace(/-/g, " ")        // guiones → espacios
            .normalize("NFD")          // separar tildes
            .replace(/[\u0300-\u036f]/g, "") // quitar tildes
            .toLowerCase()
            .trim();
        parts[1] = countryName;
    }

    // 5. Reconstruir ruta con "/" inicial
    return "/" + parts.join("/");
}




// Convierte nombre de país → URL (espacios → guiones, sin tildes, minúsculas)
export function formatCountryForUrl(name) {
    return encodeURIComponent(
        name
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "") // quitar tildes
            .replace(/\s+/g, "-")            // espacios → guiones
            .toLowerCase()
    );
}

// Convierte nombre de URL → nombre legible (guiones → espacios, sin tildes)
export function parseCountryFromUrl(urlName) {
    if (!urlName) return "";
    return decodeURIComponent(urlName)
        .replace(/-/g, " ")               // guiones → espacios
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")  // quitar tildes
        .trim()
        .toLowerCase();
}

// Función para normalizar nombres de países para búsqueda
export function normalizeCountryForSearch(name) {
    if (!name) return "";
    return name
        .normalize("NFD")                // separar tildes
        .replace(/[\u0300-\u036f]/g, "") // quitar tildes
        .replace(/[\s\-]/g, "")          // quitar espacios y guiones
        .toLowerCase();                  // minúsculas
}

// Función para convertir nombre a URL-friendly (guiones)
export function countryToUrl(name) {
    if (!name) return "";
    return name
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim()
        .replace(/\s+/g, "-") // espacios a guiones
        .toLowerCase();
}

// Función inversa, para mostrar nombre legible
export function urlToCountry(urlName) {
    if (!urlName) return "";
    return urlName
        .replace(/-/g, " ") // guiones a espacios
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
}
