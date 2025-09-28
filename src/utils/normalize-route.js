// Normaliza hash → siempre devuelve ruta tipo "/about"
export function normalizeRoute(path) {
    if (!path) return "/";

    // Eliminar "#"
    let route = path.replace(/^#/, "");

    // Si está vacío => raíz
    if (route === "" || route === "/") return "/";

    // Asegurar que empieza con "/"
    if (!route.startsWith("/")) {
        route = "/" + route;
    }

    // Quitar barra final innecesaria
    if (route.length > 1 && route.endsWith("/")) {
        route = route.slice(0, -1);
    }

    return route;
}
