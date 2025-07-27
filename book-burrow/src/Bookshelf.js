import { config } from "@/config.js";
import { v4 as uuidv4 } from "uuid";
import { GoogleBook } from "./GoogleBook";

export class Bookshelf {
  constructor(
    name,
    description = "",
    isDefault = false,
    id = uuidv4(),
    books = []
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.isDefault = isDefault;
    this.books = books;
  }

  addBook(gBook) {
    if (!(gBook instanceof GoogleBook)) {
      config.FMT_PRINT_DEBUG(
        "bookshelf::addBook",
        "Invalid book object provided.",
        true
      );
      return false;
    }

    if (!gBook.id || !gBook.title || !gBook.selfLink) {
      config.FMT_PRINT_DEBUG(
        "bookshelf::addBook",
        "Book object is missing required properties.",
        true
      );
      return false;
    }

    if (this.books.some((book) => book.id === gBook.id)) {
      config.FMT_PRINT_DEBUG(
        "bookshelf::addBook",
        `Book with id ${gBook.id} already exists in the bookshelf.`,
        true
      );

      return false;
    }

    try {
      this.books.push(gBook);
      return true;
    } catch (error) {
      config.FMT_PRINT_DEBUG(
        "bookshelf::addBook",
        `Failed to add book: ${error}`,
        true
      );
      return false;
    }
  }

  removeBook(bookId) {
    if (typeof bookId !== "string") {
      config.FMT_PRINT_DEBUG(
        "bookshelf::removeBook",
        "Invalid book ID provided.",
        true
      );
      return false;
    }

    if (!this.books.some((book) => book.id === bookId)) {
      config.FMT_PRINT_DEBUG(
        "bookshelf::removeBook",
        `Book with id ${bookId} does not exist in the bookshelf.`,
        true
      );
      return false;
    }

    try {
      this.books = this.books.filter((book) => book.id !== bookId);
    } catch (error) {
      config.FMT_PRINT_DEBUG(
        "bookshelf::removeBook",
        `Failed to remove book: ${error}`,
        true
      );
      return false;
    }
    return true;
  }

  clearBooks() {
    if (this.books.length === 0) {
      config.FMT_PRINT_DEBUG(
        "bookshelf::clearBooks",
        "No books to clear in the bookshelf.",
        true
      );
      return false;
    }
    config.FMT_PRINT_DEBUG(
      "bookshelf::clearBooks",
      `Clearing ${this.books.length} books from the bookshelf.`,
      true
    );
    
    this.books = [];
  }

  combineBookshelf(otherBookshelf) {
    this.books = [...this.books, ...otherBookshelf.books];
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
      `Bookshelf ID: ${this.id}, Name: ${this.name}, Description: ${this.description}, Is Default: ${this.isDefault}, Books Count: ${this.books.length}`
    );
  }
}
