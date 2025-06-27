# The Book Burrow

The Book Burrow is a responsive website that allows the user to search for books, view information such as name, publisher, date published, synopsis, etc via [Google Books API](https://developers.google.com/books) Users can build bookshelves for books that they plan to read, and books they have already read.

# Tech Stack

HTML, CSS, JS, & Vue.

# Features:

- Book Search: Users can search for books, filtered by various preferences such as title, author, category (genre), and publisher. Time permitting, filter preferences will also allow the user to choose which book APIs are searched.
- Bookshelves: Users will have bookshelves they can add books to: `To Be Read` and `Read`. A 3rd bookshelf, reading, may be added. For now, when adding books to the read bookshelf, a started reading date and finished reading date will be available. Books in progress can be given a start date and then the finished date can be set to TBD.
- Local Preferences: Users will have the option to change various user preferences such as theme. Users will also be able to clear all local data if they want to.
- Data Export: All data will be stored as local data. Assuming I have time, an export and import option will allow users to export local bookshelf data as well as user preferences into a portable file format to be imported on another device. This will allow a user to import bookshelf data created on another device. This feature will be implemented if time permits.

# Separation of Concerns (SoC)

I need to break down current components into a couple more reusable components.
