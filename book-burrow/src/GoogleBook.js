export class GoogleBook {
  constructor(gBook) {
    this.id = gBook.id; // string
    this.selflink = gBook.selflink; // string
    this.title = gBook.volumeInfo.title; // string
    this.authors = gBook.volumeInfo.authors; // string
    this.subject = gBook.volumeInfo.categories; // [string, ...]
    this.publisher = gBook.volumeInfo.publisher; // string
    this.publishedDate = gBook.volumeInfo.publishedDate; // Date
    this.description = gBook.volumeInfo.description; // string
    this.industryIdentifiers = gBook.volumeInfo.industryIdentifiers; // [ { type, id }, ... ]
    this.pageCount = gBook.volumeInfo.pageCount; // string
    this.printedPageCount = gBook.volumeInfo.printedPageCount; // string
    this.averageRating = gBook.volumeInfo.averageRating; // number
    this.ratingCount = gBook.volumeInfo.ratingCount; // number
    this.maturityRating = gBook.volumeInfo.maturityRating; // string
    this.imageLinks = gBook.volumeInfo.imageLinks; // { smallThumbnail, thumbnail, small, medium, large } :: { string, string, string, string, string }
    this.language = gBook.volumeInfo.language; // string
    this.infoLink = gBook.volumeInfo.infoLink; // string
    this.canonicalVolumeLink = gBook.volumeInfo.canonicalVolumeLink; // string
    this.saleInfo = gBook.volumeInfo.saleInfo; // { saleability, listPrice { amount, currencyCode } } :: { string, { number, string } }
  }

  fmtAuthors() {
    let fmtAuthors = "";

    if (!this.authors) {
      return "Unknown Authors";
    }

    for (let key in this.authors) {
      fmtAuthors += `[${this.authors[key]}] `;
    }

    return fmtAuthors;
  }

  debugPrintBook() {
    console.log("Debug Book: attrs");

    let output = "";

    for (const attr in this) {
      let key = `${attr}`;
      let val = `${this[key]}`;

      if (key === "description" && val.length > 80)
        val = val.slice(0, 80) + "...";

      output += key.padEnd(24, " ") + `= ${val}\n\r`;
    }

    console.log(output + "\n\r");

    console.log("Debug Book: fn");
    console.log("fmtAuthors: " + this.fmtAuthors());
  }
}
