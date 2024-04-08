export const publicRoutes = ["/", "/verificar-cuenta"];

export const authRoutes = [
  "/login",
  "/register",
  "/error",
  "/recuperar-contrasena",
  "/nueva-contrasena",
];

/**
 * The prefix for the API auth routes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * Default redirect after login and register
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/";
