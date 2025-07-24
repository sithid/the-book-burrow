# The Book Burrow

A responsive Vue.js single-page application that allows users to search for books and manage personal reading lists using the Google Books API.

![Vue.js](https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## Project Overview

The Book Burrow is a capstone project for Code:You that demonstrates modern web development practices using Vue.js. Users can search for books using various filters, view detailed book information, and manage their personal reading collections.

## Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/the-book-burrow.git
   cd the-book-burrow/book-burrow
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   # Create a .env file in the book-burrow directory
   echo "VITE_API_KEY=your_google_books_api_key_here" > .env
   ```

   Get your API key from [Google Books API](https://developers.google.com/books/docs/v1/using#auth)
   and follow the subsection 'Acquiring and using an API key'. You will not be using OAuth 2.0.

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

### Debugging

- Set `DEBUG: true` in `src/config.js` to enable console logging
- Use Vue DevTools browser extension for component inspection


## Author

**James Glosser**

- Portfolio: [sithid.github.io](http://sithid.github.io)
- Project: Code:You Capstone

## Credit

- [Google Books API](https://developers.google.com/books) for book data
- [Vue.js](https://vuejs.org/) for the framework
- [Font Awesome](https://fontawesome.com/) for icons
- Code:You for the learning opportunity

---

_This is a non-commercial student project created for educational purposes._
