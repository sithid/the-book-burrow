import { GoogleBook } from "@/GoogleBook.js";
import { Bookshelf } from "@/Bookshelf.js";
import { config } from "@/config.js";
import { v4 as uuidv4 } from "uuid";

import { useSearchStore } from "@/stores/search.js";
import { useNytStore } from "@/stores/nyt.js";
import { useUserStore } from "@/stores/user.js";
import { useFilterStore } from "@/stores/filter.js";
import { useBookStore } from "@/stores/book.js";

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

export const utility = {
  getCombinedBookshelfs: (
    bookshelf1,
    bookshelf2,
    newBookshelfName = `${bookshelf1.name} & ${bookshelf2.name}`,
    newBookshelfDescription = `${bookshelf1.description} & ${bookshelf2.description}`
  ) => {
    if (!bookshelf1 || !bookshelf2) {
      config.FMT_PRINT_DEBUG(
        "bookshelf::getCombinedBookshelfs",
        "One or both bookshelves are undefined.",
        true
      );
      return false;
    }

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
  },

  clearAllData() {
    const search = useSearchStore();
    const nyt = useNytStore();
    const user = useUserStore();
    const filter = useFilterStore();
    const book = useBookStore();
    
    search.clearAll();
    nyt.clearAll();
    user.clearAll();
    filter.clearAll();
    book.clearAll();
  },

  getBookshelfForm: (bookshelf) => {
    if (!bookshelf) {
      config.FMT_PRINT_DEBUG(
        "utility::getBookshelfForm",
        "Provided object is undefined or null.",
        true
      );
      return null;
    }

    return {
      id: bookshelf.id,
      name: bookshelf.name,
      description: bookshelf.description,
      isDefault: bookshelf.isDefault,
      books: bookshelf.books.map((book) => utility.getGBookForm(book)),
    };
  },

  getBookshelfFrom: (plainObject) => {
    if (!plainObject || !plainObject.name || !plainObject.id) {
      config.FMT_PRINT_DEBUG(
        "utility::getBookshelfFrom",
        "Invalid plain object provided for Bookshelf conversion.",
        true
      );
      return null;
    }

    let books = [];
    if (plainObject.books && Array.isArray(plainObject.books)) {
      books = plainObject.books.map((book) => utility.getGBookFrom(book));
    }

    let newShelf = new Bookshelf(
      plainObject.name,
      plainObject.description,
      plainObject.isDefault,
      plainObject.id,
      books
    );

    config.FMT_PRINT_DEBUG("utility::constructBookshelfFromObject", newShelf);
    return newShelf;
  },

  getGBookForm: (googleBook) => {
    if (!googleBook || !googleBook.id) {
      config.FMT_PRINT_DEBUG(
        "utility::getGBookForm",
        "Invalid GoogleBook object provided for conversion.",
        true
      );
      return null;
    }
     
    return {
      id: googleBook.id,
      selfLink: googleBook.selfLink,
      title: googleBook.title,
      authors: googleBook.authors,
      subject: googleBook.subject,
      publisher: googleBook.publisher,
      publishedDate: googleBook.publishedDate,
      description: googleBook.description,
      isbn10: googleBook.isbn10,
      isbn13: googleBook.isbn13,
      pageCount: googleBook.pageCount,
      printedPageCount: googleBook.printedPageCount,
      averageRating: googleBook.averageRating,
      ratingCount: googleBook.ratingCount,
      maturityRating: googleBook.maturityRating,
      imageLinks: googleBook.imageLinks,
      language: googleBook.language,
      infoLink: googleBook.infoLink,
      canonicalVolumeLink: googleBook.canonicalVolumeLink,
      saleInfo: googleBook.saleInfo,
    };
  },

  getGBookFrom: (plainObject) => {
    // the GoogleBook constructor expects an object that matches the Google Books API response structure.
    // build a plain object that matches the expected structure from the plain object that was passed.
    const gbook = {
      id: plainObject.id, // string
      selfLink: plainObject.selfLink, // string
      volumeInfo: {
        title: plainObject.title, // string
        authors: plainObject.authors, // string
        subject: plainObject.subject, // [string, ...]
        publisher: plainObject.publisher, // string
        publishedDate: plainObject.publishedDate, // Date
        description: plainObject.description, // string
        industryIdentifiers: [
          { type: "ISBN_10", identifier: plainObject.isbn10 },
          { type: "ISBN_13", identifier: plainObject.isbn13 },
        ].filter((id) => id.identifier), // if identifier exists
        pageCount: plainObject.pageCount, // string
        printedPageCount: plainObject.printedPageCount, // string
        averageRating: plainObject.averageRating, // number
        ratingCount: plainObject.ratingCount, // number
        maturityRating: plainObject.maturityRating, // string
        imageLinks: plainObject.imageLinks || {}, // missing imageLinks
        language: plainObject.language, // string
        infoLink: plainObject.infoLink, // string
        canonicalVolumeLink: plainObject.canonicalVolumeLink, // string
      },
      saleInfo: plainObject.saleInfo, // Move saleInfo to top level
    };

    return new GoogleBook(gbook);
  },
};
