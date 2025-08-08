export const config = {
  DEBUG: true,
  FORCE_ECO_MODE: false,
  GOOGLE_API_KEY: import.meta.env.VITE_GOOGLE_API_KEY,
  NYT_API_KEY: import.meta.env.VITE_NYT_API_KEY,
  API_URL: "/google-books-api/books/v1/volumes",
  FMT_PRINT_DEBUG: (source, message, isError = false) => {
    if (!config.DEBUG) return;

    const timestamp = new Date().toISOString();
    const prefix = isError ? "[ERROR]" : "[DEBUG]";

    if (isError) console.warn(`${prefix} [${timestamp}] ${source}: ${message}`);
    else console.log(`${prefix} [${timestamp}] ${source}: ${message}`);
  },
};
