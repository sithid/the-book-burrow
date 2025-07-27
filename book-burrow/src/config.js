export const config = {
  DEBUG: true,
  API_TOKEN: import.meta.env.VITE_API_KEY,
  API_URL: "/google-books-api/books/v1/volumes",

  // i use this to handle all debug messaging logic.
  // this allows me to standardize how logging works
  // and allows for me to much more easily adjust and
  // maintain debug messaging.
  FMT_PRINT_DEBUG: (source, message, isError = false) => {
    if (!config.DEBUG) return;

    const timestamp = new Date().toISOString();
    const prefix = isError ? "[ERROR]" : "[DEBUG]";
    console.log(`${prefix} [${timestamp}] ${source}: ${message}`);
  }
};
