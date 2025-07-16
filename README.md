# The Book Burrow 📚

A responsive Vue.js single-page application that allows users to search for books and manage personal reading lists using the Google Books API.

![Vue.js](https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## 🎯 Project Overview

The Book Burrow is a capstone project for Code:You that demonstrates modern web development practices using Vue.js. Users can search for books using various filters, view detailed book information, and manage their personal reading collections.

## 🚀 Features

### ✅ Implemented
- **📖 Book Search**: Search books using the Google Books API
- **🔍 Basic Search**: Quick search from the home page
- **🎛️ Advanced Search**: Filter by title, author, publisher, subject, and more
- **📱 Responsive Design**: Mobile-first approach with responsive layouts
- **📋 Search Results**: Display books with covers, authors, publish dates, and descriptions
- **🎨 Custom Theming**: CSS variables for consistent color scheme

### 🚧 Planned Features
- **📚 Bookshelf Management**: "To Be Read" and "Read" collections
- **💾 Local Storage**: Save books and preferences locally
- **⚙️ User Preferences**: Theme customization and settings
- **📤 Data Export/Import**: Backup and restore bookshelf data
- **📅 Reading Dates**: Track when books were started and finished

## 🛠️ Tech Stack

- **Frontend Framework**: Vue.js 3 (Composition API)
- **Build Tool**: Vite
- **Routing**: Vue Router 4
- **State Management**: Pinia
- **Styling**: Custom CSS with CSS Variables
- **API**: Google Books API
- **Icons**: Font Awesome

## 📁 Project Structure

```
book-burrow/
├── src/
│   ├── components/
│   │   ├── FilterPanelComponent.vue     # Advanced search filters
│   │   ├── MinimalSearchComponent.vue   # Home page search
│   │   ├── SearchComponent.vue          # Main search interface
│   │   └── SearchResultComponent.vue    # Individual book display
│   ├── views/
│   │   ├── HomeView.vue                 # Landing page
│   │   ├── SearchView.vue               # Search results page
│   │   ├── BookshelfView.vue            # User's book collection
│   │   └── AboutView.vue                # Project information
│   ├── stores/
│   │   ├── search.js                    # Search state management
│   │   └── filter.js                    # Filter state management
│   ├── assets/
│   │   └── global.css                   # Global styles and theme
│   ├── router/
│   │   └── index.js                     # Route configuration
│   ├── App.vue                          # Main application component
│   ├── main.js                          # Application entry point
│   ├── GoogleBook.js                    # Book data model
│   └── config.js                        # Application configuration
├── public/
├── dist/                                # Build output
├── vite.config.js                       # Vite configuration
├── package.json
└── README.md
```

## 🔧 Installation & Setup

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

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🎨 Architecture & Design Patterns

### State Management
- **Pinia Stores**: Centralized state management for search queries and filters
- **Composition API**: Modern Vue.js patterns with reactive data

### Component Structure
- **Single File Components**: Vue SFCs with scoped styling
- **Props & Events**: Parent-child communication
- **Reusable Components**: Modular design for maintainability

### API Integration
- **Proxy Configuration**: Vite proxy to handle CORS with Google Books API
- **Error Handling**: Graceful handling of API responses
- **Custom Data Model**: GoogleBook class for consistent data structure

## 🔍 API Usage

The application uses the Google Books API with the following endpoints:

- **Basic Search**: `GET /books/v1/volumes?q={query}`
- **Advanced Search**: `GET /books/v1/volumes?q={formatted_query}`

Supported search parameters:
- `intitle:` - Search in title
- `inauthor:` - Search in author
- `inpublisher:` - Search in publisher
- `subject:` - Search in subject/genre

## 🎯 Usage

1. **Home Page**: Use the search bar for quick book searches
2. **Search Page**: Access advanced filters for detailed searches
3. **Results**: Browse through search results with book details
4. **About Page**: Learn about the project and its creator

## 🧪 Development

### Code Quality
- **ESLint**: Code linting (when configured)
- **Vue DevTools**: Development debugging
- **Vite HMR**: Hot module replacement for fast development

### Debugging
- Set `DEBUG: true` in `src/config.js` to enable console logging
- Use Vue DevTools browser extension for component inspection

## 🐛 Known Issues

- Bookshelf functionality is not yet implemented
- Preferences button only logs to console
- Some features mentioned in planning phase are not yet developed

## 🛣️ Roadmap

- [ ] Implement bookshelf functionality with local storage
- [ ] Add user preferences and theme switching
- [ ] Implement data export/import features
- [ ] Add loading states and error handling
- [ ] Unit testing setup
- [ ] Accessibility improvements

## 📝 License

This project is created for educational purposes as part of a Code:You capstone project.

## 👨‍💻 Author

**James Glosser**
- Portfolio: [sithid.github.io](http://sithid.github.io)
- Project: Code:You Capstone

## 🙏 Acknowledgments

- [Google Books API](https://developers.google.com/books) for book data
- [Vue.js](https://vuejs.org/) for the framework
- [Font Awesome](https://fontawesome.com/) for icons
- Code:You for the learning opportunity

---

*This is a non-commercial student project created for educational purposes.*
