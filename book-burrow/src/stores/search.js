import { defineStore } from "pinia";
import { ref } from "vue";
import { config } from "../config.js";
import { GoogleBook } from "../GoogleBook.js";
import { useFilterStore } from "@/stores/filter";

export const useSearchStore = defineStore("search", () => {
  const filter = useFilterStore();

  const googleBookResults = ref([]);

  // Simple search, querys google api for any book with any field that
  // matches this search string.  ?q={}
  const basicQuery = ref("");

  // The advanced query string that was built for the advanced search.
  const completeQuery = ref("");

  // formats allWords/exactWords/atleastOneWord/withoutTheseWords query string
  // regex REALLY makes this so much easier <3

  function formatFindResultsOptions() {
    let queryParts = []; // query string 'parts'

    if (filter.allWords.length > 0) {
      const trimmedWords = filter.allWords.trim();
      if (trimmedWords) {
        queryParts.push(trimmedWords.replace(/\s+/g, "+"));
      }
    }

    if (filter.exactWords.length > 0) {
      const trimmedExactWords = filter.exactWords.trim();
      if (trimmedExactWords) {
        queryParts.push(`"${trimmedExactWords}"`);
      }
    }

    if (filter.atleastOneWord.length > 0) {
      const trimmedAtLeastOneWord = filter.atleastOneWord.trim();
      if (trimmedAtLeastOneWord) {
        const words = trimmedAtLeastOneWord
          .split(/\s+/)
          .filter((word) => word !== "");
        if (words.length > 0) {
          queryParts.push(`(${words.join(" OR ")})`);
        }
      }
    }

    if (filter.withoutTheseWords.length > 0) {
      const trimmedWithoutTheseWords = filter.withoutTheseWords.trim();
      if (trimmedWithoutTheseWords) {
        const words = trimmedWithoutTheseWords
          .split(/\s+/)
          .filter((word) => word !== "");
        const excludedTerms = words.map((word) => `-${word}`);
        queryParts.push(...excludedTerms);
      }
    }

    const finalKeywords = queryParts.join("+");

    config.FMT_PRINT_DEBUG("formatFindResultsOptions::keywords", finalKeywords);

    return finalKeywords;
  }

  // formats title, author, publisher, published, subject query string
  function formatFilterByOptions() {
    let keywords = "";

    if (filter.title && filter.title != "") {
      if (keywords === "") keywords = `intitle:"${filter.title}"`;
      else keywords += `+intitle:"${filter.title}"`;
    }

    if (filter.author && filter.author != "") {
      if (keywords === "") keywords = `inauthor:"${filter.author}"`;
      else keywords += `+inauthor:"${filter.author}"`;
    }

    if (filter.publisher && filter.publisher != "") {
      if (keywords === "") keywords = `inpublisher:"${filter.publisher}"`;
      else keywords += `+inpublisher:"${filter.publisher}"`;
    }

    if (filter.subject && filter.subject != "") {
      if (keywords === "") keywords = `subject:"${filter.subject}"`;
      else keywords += `+subject:"${filter.subject}"`;
    }

    config.FMT_PRINT_DEBUG("formatFilterByOptions::keywords", keywords);

    return keywords;
  }

  function clear() {
    googleBookResults.value = [];
    basicQuery.value = "";
    completeQuery.value = "";
  }

  // formats addtional options query string
  function formatAdditionalOptions() {
    let keywords = "";

    config.FMT_PRINT_DEBUG("formatAdditionalOptions::keywords", keywords);

    return "";
  }

  // build the entire formatted advanced query string
  function buildQueryUrl(
    words,
    filters,
    options,
    maxResults = config.MAX_RESULTS
  ) {
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
    queryString += `&key=${config.API_TOKEN}`;

    config.FMT_PRINT_DEBUG("buildQueryUrl::queryString", queryString);
    return queryString;
  }

  // perform a generic search across a wide trange of fields
  async function queryApiBasic(params, maxResults = config.MAX_RESULTS) {
    const requestHeaders = new Headers();
    requestHeaders.append("Content-Type", "application/json");

    const url = `${config.API_URL}?q=${params}&maxResults=${maxResults}&key=${config.API_TOKEN}`;

    config.FMT_PRINT_DEBUG("queryApiBasic::url", url);

    const options = {
      method: "GET",
      headers: requestHeaders,
    };

    const response = await fetch(url, options);

    if (response.ok) {
      const data = await response.json();

      // Make sure we 'reset' the book result array, otherwise it will get huge.
      // I may implement dictionary or map for result history in the future.
      googleBookResults.value = [];

      for (let index = 0; index < data.items.length; index++) {
        const book = new GoogleBook(data.items[index]);
        googleBookResults.value.push(book);
      }
    }
  }

  // perform an advanced, targeted search for combined terms, filters, and options
  async function queryApiAdvanced(maxResults = config.MAX_RESULTS) {
    const findResults = formatFindResultsOptions();
    const filterByOptions = formatFilterByOptions();
    const additionalOptions = formatAdditionalOptions();

    const url = buildQueryUrl(findResults, filterByOptions, additionalOptions);
    config.FMT_PRINT_DEBUG("queryApiAdvanced::url", url);

    const requestHeaders = new Headers();
    requestHeaders.append("Content-Type", "application/json");

    const options = {
      method: "GET",
      headers: requestHeaders,
    };

    const response = await fetch(url, options);

    if (response.ok) {
      const data = await response.json();

      if (!data.items) {
        console.log("Something went wrong...");
        return;
      }

      googleBookResults.value = [];

      for (let index = 0; index < data.items.length; index++) {
        const book = new GoogleBook(data.items[index]);
        googleBookResults.value.push(book);
      }
    }
  }

  return {
    /* properties */
    googleBookResults, // array of books populated by response
    basicQuery, // last simple query string from input
    completeQuery, // last advanced query string we built

    /* functions */
    clear, // clears values.
    formatFindResultsOptions, // formats allWords/exactWords/atleastOneWord/withoutTheseWords query string
    formatFilterByOptions, // formats title, author, publisher, published, subject query string
    formatAdditionalOptions, // formats addtional options query string
    buildQueryUrl, // build the entire formatted advanced query string
    queryApiBasic, // perform a generic search across a wide trange of fields
    queryApiAdvanced, // perform an advanced, targeted search for combined terms, filters, and options
  };
});
