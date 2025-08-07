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
    if (!plainObject || !plainObject.id) {
      config.FMT_PRINT_DEBUG(
        "utility::getGBookFrom",
        "Invalid plain object provided for GoogleBook conversion.",
        true
      );
      return null;
    }

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

  formatNYTTitle: (title) => {
    if (!title) {
      config.FMT_PRINT_DEBUG(
        "utility::formatNYTTitle",
        "Invalid title provided for formatting.",
        true
      );
      return title;
    }

    // the nyt titles are all uppercase so we need to convert them to the title case
    title = title.toLowerCase().trim();

    return title.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1);
    });
  },

  convertFromNytToGBook: (nytBook) => {
    if (!nytBook || !nytBook.title) {
      config.FMT_PRINT_DEBUG(
        "utility::convertFromNytToGBook",
        "Invalid NYT book object provided for conversion.",
        true
      );
      return null;
    }

    let isbn10 = "";
    let isbn13 = "";

    if (nytBook.isbns && nytBook.isbns.length > 0) {
      isbn10 = nytBook.isbns[0].isbn10 || "";
      isbn13 = nytBook.isbns[0].isbn13 || "";
    }

    if (!isbn10 && nytBook.primary_isbn10) {
      isbn10 = nytBook.primary_isbn10;
    }
    if (!isbn13 && nytBook.primary_isbn13) {
      isbn13 = nytBook.primary_isbn13;
    }

    let infoLink = "";
    let selfLink = "";

    if (nytBook.buy_links && nytBook.buy_links.length > 0) {
      const amazonLink = nytBook.buy_links.find(
        (link) => link.name === "Amazon"
      );
      if (amazonLink) {
        infoLink = amazonLink.url;
        selfLink = amazonLink.url;
      } else {
        infoLink = nytBook.buy_links[0].url || "";
        selfLink = nytBook.buy_links[0].url || "";
      }
    }

    let authors = [];
    if (nytBook.author) {
      if (nytBook.author.includes(" and ")) {
        authors = nytBook.author.split(" and ").map((a) => a.trim());
      } else if (nytBook.author.includes(", ")) {
        authors = nytBook.author.split(", ").map((a) => a.trim());
      } else {
        authors = [nytBook.author];
      }
    } else if (nytBook.contributor) {
      authors = [nytBook.contributor];
    } else {
      authors = ["Unknown Author"];
    }

    let categories = [];
    if (nytBook.category) {
      categories.push(nytBook.category);
    }
    if (nytBook.list_name) {
      categories.push(`NYT: ${nytBook.list_name}`);
    }

    const imageLinks = {};

    if (nytBook.book_image) {
      imageLinks.thumbnail = nytBook.book_image;
    } else {
      imageLinks.thumbnail = `https://place-hold.it/200x250?text="nyt%20thumbnail%20missing"&fontsize=16`;
    }

    const bookId = uuidv4();

    const gbookData = {
      id: bookId,
      selfLink: selfLink,
      volumeInfo: {
        title: utility.formatNYTTitle(nytBook.title) || "Unknown Title",
        authors: authors,
        categories: categories,
        publisher: nytBook.publisher || "Unknown Publisher",
        publishedDate:
          nytBook.published_date || nytBook.created_date || "Unknown Date",
        description:
          nytBook.description || "No description available from NYT.",
        industryIdentifiers: [
          { type: "ISBN_10", identifier: isbn10 },
          { type: "ISBN_13", identifier: isbn13 },
        ].filter((id) => id.identifier),
        pageCount: nytBook.page_count || 0,
        printedPageCount: nytBook.page_count || 0,
        averageRating: nytBook.rank ? 5 - nytBook.rank * 0.2 : 0,
        ratingCount: nytBook.rank ? 1 : 0,
        maturityRating: "NOT_MATURE",
        imageLinks: imageLinks,
        language: "en",
        infoLink: infoLink,
        canonicalVolumeLink: infoLink,
      },
    };

    config.FMT_PRINT_DEBUG(
      "utility::convertFromNytToGBook",
      `Converted NYT book: ${nytBook.title} with ISBN13: ${isbn13}, ISBN10: ${isbn10}`
    );

    return new GoogleBook(gbookData);
  },

  packageUserDataObject() {
    const search = useSearchStore();
    const user = useUserStore();

    const exportData = {
      // this is the 'structure' of all of the user data
      // were adding a version number incase I change the structure
      // in the future.  This will basically export all user data combined
      // into a single object.
      version: "1.0.0",
      exportDate: new Date().toISOString(),
      appName: "The Book Burrow",
      stores: {
        user: {
          bookshelfs: user.bookshelfs.map((bookshelf) =>
            utility.getBookshelfForm(bookshelf)
          ),
          maxResults: user.maxResults,
          maxPages: user.maxPages,
          defaultLanguage: user.defaultLanguage,
          isPrefsPanelOpen: user.isPrefsPanelOpen,
        },
        search: {
          googleBookResults: search.googleBookResults.map((book) =>
            utility.getGBookForm(book)
          ),
          resultPages: search.resultPages.map((page) => ({
            index: page.index,
            results: page.results.map((book) => utility.getGBookForm(book)),
          })),
          pageCount: search.pageCount,
          basicQuery: search.basicQuery,
          currentPageIndex: search.currentPageIndex,
          minimizeApiRequests: search.minimizeApiRequests,
        },
      },
    };

    return exportData;
  },
  
  exportUserDataStringifyJson(object)
  {
    return JSON.stringify(object);
  },

  exportUserDataBase64() {
    try {
      const exportData = this.packageUserDataObject();

      // the way i am finding to do this seems to be deprecated (unescapte/encodeURIComponent)
      // so i found another way to use btoa that seems to be
      // the accepted way to do it now
      const jsonString = JSON.stringify(exportData);
      const encoder = new TextEncoder();
      const dataBytes = encoder.encode(jsonString);

      const base64String = btoa(String.fromCharCode.apply(null, dataBytes));

      config.FMT_PRINT_DEBUG(
        "utility::exportUserData",
        `Exported ${jsonString.length} characters of user data as ${base64String.length} character base64 string`
      );

      return base64String;
    } catch (error) {
      config.FMT_PRINT_DEBUG(
        "utility::exportUserData",
        `Error exporting user data: ${error.message}`,
        true
      );
      return null;
    }
  },
};