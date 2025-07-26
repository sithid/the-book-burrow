import { GoogleBook } from "@/GoogleBook.js";
import { config } from "@/config.js";
import { v4 as uuidv4 } from "uuid";

export class Bookshelf {
  // this constructor is used to create a new bookshelf object from parameters only
  // all-purpose constructor
  constructor(
    name,
    description = "",
    isDefault = false,
    id = uuidv4(),
    books = []
  ) {
    this.id = id; // I want every bookshelf to have a unique ID, uuid seems to be an accepted standard.
    this.name = name; // this will be validated elsewhere
    this.description = description; // this will be validated elsewhere (Library.js, add bookshelf component, etc).
    this.isDefault = isDefault; // is this a default bookshelf or custom bookshelf?
    this.books = books; // pinia will make sure this serializes/deserializes correctly.
  }

  addBook(gBook) {
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

  // returns true if the book is removed.
  removeBook(bookId) {
    // i use the built in array.filter to filter out the book with the matching id, which
    // will always be unique.
    if (!bookId) {
      config.FMT_PRINT_DEBUG(
        "bookshelf::removeBook",
        "No book ID provided for removal.",
        true
      );
      return false;
    }
    // filter should never return undefined, if the id doesnt exist it will just return the same array.
    // I like this approach better than having to check if the book exists first and handling error logic
    // for if it doesn't.
    this.books = this.books.filter((book) => book.id !== bookId);
    return true;
  }

  // simple combine function that uses the spread operator to combine this bookshelf with an input bookshelf.
  // this will be usful for user bookshelf control (button for 'combine a bookshelf with this one')
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
