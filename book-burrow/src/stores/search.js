import { defineStore } from "pinia";
import { ref } from "vue";
import { config } from "../config.js";
import { GoogleBook } from "../GoogleBook.js";

export const useSearchStore = defineStore("search", () => {
  const googleBookResults = ref([]);

  // Simple search, querys google api for any book with any field that
  // matches this search string.  ?q={term+term+term...}
  const basicQuery = ref("");

  // The advanced query string that was built for the advanced search.
  const completeQuery = ref("");

  // Advanced search. https://www.googleapis.com/books/v1/volumes?q=<string>
  const allWords = ref(""); // ./books/v1/volumes?q=term+term+term
  const exactWords = ref(""); // ./books/v1/volumes?q="test+test+test"
  const withoutTheseWords = ref(""); // ./books/v1/volumes?q=test+OR+test+OR+test
  const atleastOneWord = ref(""); // ./books/v1/volumes?q=-test+-test+-test

  const title = ref(""); // inTitle:title
  const author = ref(""); // inAuthor:author
  const publisher = ref(""); // inPublisher:publisher
  const published = ref(""); // inPublished:published
  const subject = ref(""); // subject:subject

  // formats allWords/exactWords/atleastOneWord/withoutTheseWords query string
  function formatFindResultsOptions() {
    return "";
  }

  // formats title, author, publisher, published, subject query string
  function formatFilterByOptions() {
    let keywords = "";

    if (title.value != "") {
      if (keywords === "") keywords = `intitle:"${title.value}"`;
      else keywords += `+intitle:"${title.value}"`;
    }

    if (author.value != "") {
      if (keywords === "") keywords = `inauthor:"${author.value}"`;
      else keywords += `+inauthor:"${author.value}"`;
    }

    if (publisher.value != "") {
      if (keywords === "") keywords = `inpublisher:"${publisher.value}"`;
      else keywords += `+inpublisher:"${publisher.value}"`;
    }

    if (subject.value != "") {
      if (keywords === "") keywords = `subject:"${subject.value}"`;
      else keywords += `+subject:"${subject.value}"`;
    }

    if (published.value != "") {
      if (keywords === "") keywords = `inpublished:"${published.value}"`;
      else keywords += `+inpublished:"${published.value}"`;
    }

    if( config.DEBUG )
      console.log(keywords);

    return keywords;
  }

  // formats addtional options query string
  function formatAdditionalOptions() {
    return "";
  }

  // build the entire formatted advanced query string
  function buildQueryUrl(words, filters, options, maxResults = config.MAX_RESULTS) {
    let queryString = `${config.API_URL}?q=`;

    if (words != "") {
      queryString += `${words}`;
    }

    if (filters != "") {
      if (words != "") {
        queryString += `+${filters}`;
      } else {
        queryString += `${filters}`;
      }
    }

    queryString += `&maxResults=${maxResults}`;
    console.log(queryString);
    return queryString;
  }

  // perform a generic search across a wide trange of fields
  async function queryApiBasic(params, maxResults = config.MAX_RESULTS) {
    const requestHeaders = new Headers();
    requestHeaders.append("Content-Type", "application/json");
    requestHeaders.append("key", config.API_TOKEN);

    const url = `${config.API_URL}?q=${params}&maxResults=${maxResults}`;

    const options = {
      method: "GET",
      headers: requestHeaders,
    };

    const response = await fetch(url, options);

    if (response.ok) {
      const data = await response.json();

      // Make sure we 'reset' the book result array, otherwise it will get huge.
      // I may implement dictionary or map for result history in the future.
      this.googleBookResults = [];

      for (let index = 0; index < data.items.length; index++) {
        const book = new GoogleBook(data.items[index]);
        this.googleBookResults.push(book);
      }
    }
  }

  // perform an advanced, targeted search for combined terms, filters, and options
  async function queryApiAdvanced(maxResults = config.MAX_RESULTS) {
    const findResults = this.formatFindResultsOptions();
    const filterByOptions = this.formatFilterByOptions();
    const additionalOptions = this.formatAdditionalOptions();

    const url = this.buildQueryUrl(
      findResults,
      filterByOptions,
      additionalOptions
    );

    const requestHeaders = new Headers();
    requestHeaders.append("Content-Type", "application/json");
    requestHeaders.append("key", config.API_TOKEN);

    const options = {
      method: "GET",
      headers: requestHeaders,
    };

    const response = await fetch(url, options);

    if (response.ok) {
      const data = await response.json();

      this.googleBookResults = [];

      for (let index = 0; index < data.items.length; index++) {
        const book = new GoogleBook(data.items[index]);
        this.googleBookResults.push(book);
      }
    }
  }

  return {
    /* properties */
    googleBookResults, // array of books populated by response
    basicQuery, // last simple query string from input
    completeQuery, // last advanced query string we built

    allWords, // search across a wide range of fields that includes all of the words
    exactWords, // includes this exact phrase
    atleastOneWord, // includes atleast one of the words in this input "volumes?q=harry+OR+potter+OR+sorcerers+OR+stone"
    withoutTheseWords, // does not include these words ex: volumes?q=-harry+-potter

    title, // books with this in the title
    author, // books with this in the author
    publisher, // books with this in the publisher
    published, // books with this in the published
    subject, // books with this in the subject (genre)

    /* functions */
    formatFindResultsOptions, // formats allWords/exactWords/atleastOneWord/withoutTheseWords query string
    formatFilterByOptions, // formats title, author, publisher, published, subject query string
    formatAdditionalOptions, // formats addtional options query string
    buildQueryUrl, // build the entire formatted advanced query string
    queryApiBasic, // perform a generic search across a wide trange of fields
    queryApiAdvanced, // perform an advanced, targeted search for combined terms, filters, and options
  };
});
