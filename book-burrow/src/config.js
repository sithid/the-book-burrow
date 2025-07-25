export const config = {
  DEBUG: true,
  API_TOKEN: import.meta.env.VITE_API_KEY,
  API_URL: "/google-books-api/books/v1/volumes",
  MAX_RESULTS: "40",
  FMT_PRINT_DEBUG: (frm = 'generic', msg, isError = false) => {
    if (config.DEBUG) {
      if (isError) {
        console.error(`ERROR::${frm} | ${msg}\n\r`);
      } else {
        console.log(`DEBUG::${frm} | ${msg}\n\r`);
      }
    }
  }
};
