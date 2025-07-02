import { defineStore } from "pinia";
import { ref } from "vue";
import { config } from "../../config.js";

export const useSearchStore = defineStore("search", () => {
  const items = ref({});

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

  function formatFindResultsOptions() {
    return "";
  }

  function formatFilterByOptions() {
    let keywords = new URLSearchParams();

    if (title.value != "") keywords.append("intitle", title.value);

    if (author.value != "") keywords.append("inauthor", author.value);

    if (publisher.value != "") keywords.append("inpublisher", publisher.value);

    if (subject.value != "") keywords.append("subject", subject.value);

    if (published.value != "") keywords.append("inpublished", published.value);

    let keywordString = `${keywords}`;
    keywordString = keywordString.replace(/&/g, "+");
    keywordString = keywordString.replace(/=/g, ":");

    return keywordString;
  }

  function formatAdditionalOptions() {
    return "";
  }

  function buildQueryUrl(words, filters, options) {
    let queryString = `${config.API_URL}?q=${words}+${filters}`;

    console.log(queryString);
    return queryString;
  }

  async function queryApiAdvanced(maxResults = config.MAX_RESULTS) {
    const url = this.buildQueryUrl(
      this.formatFindResultsOptions(),
      this.formatFilterByOptions(),
      this.formatAdditionalOptions()
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
      this.items.value = data.items;

      return data;
    }
  }

  async function queryApiBasic(params, maxResults = config.MAX_RESULTS) {
    const keywords = new URLSearchParams();
    keywords.append("q", `"${params}"`);
    keywords.append("maxResults", maxResults);

    const requestHeaders = new Headers();
    requestHeaders.append("Content-Type", "application/json");
    requestHeaders.append("key", config.API_TOKEN);

    const url = `${config.API_URL}?${keywords}`;

    const options = {
      method: "GET",
      headers: requestHeaders,
    };

    const response = await fetch(url, options);

    if (response.ok) {
      const data = await response.json();
      this.items.value = data.items;

      return data;
    }
  }

  return {
    items, // search result item data
    basicQuery, // search across a wide range of fields within the book's metadata
    allWords, // search across a wide range of fields that includes all of the words
    exactWords, // includes this exact phrase
    atleastOneWord, // includes atleast one of the words in this input "volumes?q=harry+OR+potter+OR+sorcerers+OR+stone"
    withoutTheseWords, // does not include these words ex: volumes?q=-harry+-potter
    title, // books with this in the title
    author, // books with this in the author
    publisher, // books with this in the publisher
    published, // books with this in the published
    subject, // books with this in the subject (genre)
    formatFindResultsOptions,
    formatFilterByOptions,
    formatAdditionalOptions,
    buildQueryUrl,
    queryApiBasic, // perform a generic search across a wide trange of fields.
    queryApiAdvanced, // perform a targetted search for specific metadata fields for a precise search.
  };
});
