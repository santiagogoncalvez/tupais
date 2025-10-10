// src/constants/routes.js

// 🔹 Rutas principales de la aplicación
export const ROUTES = {
    HOME: "/",
    CHALLENGE: "/challenge",
    RECORD: "/record",
    TIME_TRIAL: "/time-trial",
    FLAG_GALLERY: "/flag-gallery",
    FLAG_GALLERY_DETAIL: "/flag-gallery/:country", // ruta dinámica
    ABOUT: "/about",
    CREDITS: "/credits",
};

// 🔹 Helper: devuelve true si una ruta empieza con otra (útil para match parciales)
export function isRoute(current, target) {
    return current === target || current.startsWith(target + "/");
}

// 🔹 Helper: devuelve la ruta base (sin parámetros)
export function getBaseRoute(path) {
    return path.split("/")[1] ? `/${path.split("/")[1]}` : "/";
}
