import { GoogleBook } from "./GoogleBook.js";
import { config } from "./config.js";
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
    try {
      this.books.push(gBook);
      return true;
    } catch (error) {
      config.FMT_PRINT_DEBUG("bookshelf::addBook", `Failed to add book: ${error}`, true);
      return false;
    }
  }

  removeBook(bookId) {
    this.books = this.books.filter((book) => book.id !== bookId);
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
