// Normaliza hash → siempre devuelve ruta tipo "/about"
export function normalizeRoute(hash) {
    if (!hash) return "/";
    return hash.startsWith("#") ? hash.slice(1) || "/" : hash;
}