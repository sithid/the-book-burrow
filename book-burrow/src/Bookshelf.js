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

  /*
   * Feature: Create a function that accepts two or more input parameters and
   * returns a value that is calculated or determined by the inputs.
   *
   * getCombinedBookshelfs: Combine two bookshelves into a new, single, bookshelf.
   * This function takes two Bookshelf instances and combines their books into a new Bookshelf instance.
   * It also allows for custom naming and description of the new bookshelf.
   * If no name is supplied, it defaults to a combination of the two bookshelves' names.
   * If no description is supplied, it defaults to a combination of the two bookshelves' descriptions.
   * 
   * This will allow me to have simple buttons for combining bookshelves into custom bookshelves within the ui
   * without having to repeat this code in multiple places.
   */
  getCombinedBookshelfs(
    bookshelf1,
    bookshelf2,
    newBookshelfName = `${bookshelf1.name} & ${bookshelf2.name}`,
    newBookshelfDescription = `${bookshelf1.description} & ${bookshelf2.description}`
  ) {
    if (!bookshelf1 || !bookshelf2) {
      config.FMT_PRINT_DEBUG(
        "bookshelf::getCombinedBookshelfs",
        "One or both bookshelves are undefined.",
        true
      );
      return false;
    }

    // spread operator provides a shallow copy of the books arrays from both bookshelfs.
    const combinedBooks = [...bookshelf1.books, ...bookshelf2.books];

    if (combinedBooks.length === 0) {
      return new Bookshelf(
        newBookshelfName,
        newBookshelfDescription,
        false,
        uuidv4(),
        combinedBooks
      );
    }
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
