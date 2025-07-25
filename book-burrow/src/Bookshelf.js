import { GoogleBook } from "@/GoogleBook.js";
import { config } from "@/config.js";
import { v4 as uuidv4 } from "uuid";

export class Bookshelf {
  constructor(
    name,
    description = "",
    isDefault = false,
    id = uuidv4(),
    books = []
  ) {
    this.id = id; // I want every bookshelf to have a unique ID, uuid seems to be an accepted standard.
    this.name = name; // this will be validated elsewhere (Library.js, add bookshelf component, etc ).
    this.description = description; // this will be validated elsewhere (Library.js, add bookshelf component, etc).
    this.isDefault = isDefault; // is this a default bookshelf or custom bookshelf?
    this.books = books; // pinia will make sure this serializes/deserializes correctly.
  }

  addBook(gBook) {
    if (!(gBook instanceof GoogleBook)) {
      config.FMT_PRINT_DEBUG("bookshelf::addBook", "Invalid book type provided. Expected GoogleBook instance.", true);
      return false;
    }
    
    try {
      this.books.push(gBook);
      return true;
    } catch (error) {
      config.FMT_PRINT_DEBUG("bookshelf::addBook", `Failed to add book: ${error}`, true);
      return false;
    }
  }

  // returns true if the book is removed.
  removeBook(bookId) {
    // i use the built in array.filter to filter out the book with the matching id, which
    // will always be unique.
    if (!bookId) {
      config.FMT_PRINT_DEBUG("bookshelf::removeBook", "No book ID provided for removal.", true);
      return false;
    }

    this.books = this.books.filter((book) => book.id !== bookId);
    return true;
  }

  getBookInfo(bookId) {
    return this.books.find((book) => book.id === bookId);
  }

  getBooks() {
    return this.books;
  }

  debugPrint() {
    config.FMT_PRINT_DEBUG(
      "bookshelf::debugPrint",
      `Bookshelf ID: ${this.id}, Name: ${this.name}, Description: ${this.description}, Is Default: ${this.isDefault}, Books Count: ${this.books.length}`,
    );
  }       
}
