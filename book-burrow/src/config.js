export const config = {
  DEBUG: true,
  API_TOKEN: import.meta.env.VITE_API_KEY,
  API_URL: "/google-books-api/books/v1/volumes",
  MAX_RESULTS: "10"
};
