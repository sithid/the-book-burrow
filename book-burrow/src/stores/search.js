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

  // formats allWords/exactWords/atleastOneWord/withoutTheseWords query string
  // regex REALLY makes this so much easier <3

  function formatFindResultsOptions() {
    let queryParts = []; // query string 'parts'

    if (filter.allWords.length > 0) {
      const trimmedWords = filter.allWords.trim();
      if (trimmedWords) {
        queryParts.push(encodeURIComponent(trimmedWords).replace(/%20/g, "+"));
      }
    }

    if (filter.exactWords.length > 0) {
      const trimmedExactWords = filter.exactWords.trim();
      if (trimmedExactWords) {
        queryParts.push(`"${encodeURIComponent(trimmedExactWords)}"`);
      }
    }

    if (filter.atleastOneWord.length > 0) {
      const trimmedAtLeastOneWord = filter.atleastOneWord.trim();
      if (trimmedAtLeastOneWord) {
        const words = trimmedAtLeastOneWord
          .split(/\s+/)
          .filter((word) => word !== "");
        if (words.length > 0) {
          queryParts.push(
            `(${words.map((word) => encodeURIComponent(word)).join(" OR ")})`
          );
        }
      }
    }

    if (filter.withoutTheseWords.length > 0) {
      const trimmedWithoutTheseWords = filter.withoutTheseWords.trim();
      if (trimmedWithoutTheseWords) {
        const words = trimmedWithoutTheseWords
          .split(/\s+/)
          .filter((word) => word !== "");
        const excludedTerms = words.map(
          (word) => `-${encodeURIComponent(word)}`
        );
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
      if (keywords === "")
        keywords = `intitle:"${encodeURIComponent(filter.title)}"`;
      else keywords += `+intitle:"${encodeURIComponent(filter.title)}"`;
    }

    if (filter.author && filter.author != "") {
      if (keywords === "")
        keywords = `inauthor:"${encodeURIComponent(filter.author)}"`;
      else keywords += `+inauthor:"${encodeURIComponent(filter.author)}"`;
    }

    if (filter.publisher && filter.publisher != "") {
      if (keywords === "")
        keywords = `inpublisher:"${encodeURIComponent(filter.publisher)}"`;
      else keywords += `+inpublisher:"${encodeURIComponent(filter.publisher)}"`;
    }

    if (filter.subject && filter.subject != "") {
      if (keywords === "")
        keywords = `subject:"${encodeURIComponent(filter.subject)}"`;
      else keywords += `+subject:"${encodeURIComponent(filter.subject)}"`;
    }

    config.FMT_PRINT_DEBUG("formatFilterByOptions::keywords", keywords);

    return keywords;
  }

  function clear() {
    googleBookResults.value = [];
    basicQuery.value = "";
  }

  // formats addtional options query string
  function formatAdditionalOptions(maxResults = config.MAX_RESULTS) {
    let keywords = `&langRestrict=${filter.language}`;
    keywords += `&maxResults=${maxResults}`;
    keywords += `&key=${config.API_TOKEN}`;

    config.FMT_PRINT_DEBUG("formatAdditionalOptions::keywords", keywords);

    return keywords;
  }

  // build the entire formatted advanced query string
  function buildQueryUrl(words, filters, additionalOptions) {
    let queryString = `${config.API_URL}?q=`;

    if (words) {
      queryString += `${encodeURIComponent(words)}`;
    }

    if (filters) {
      if (words === "") {
        queryString += `${encodeURIComponent(filters)}`;
      } else {
        queryString += `+${encodeURIComponent(filters)}`;
      }
    }

    if (additionalOptions) {
      queryString += `${additionalOptions}`;
    }

    return queryString;
  }

  // perform a generic search across a wide trange of fields
  async function queryApiBasic(params, maxResults = config.MAX_RESULTS) {
    const requestHeaders = new Headers();
    requestHeaders.append("Content-Type", "application/json");

    const url = `${config.API_URL}?q=${encodeURIComponent(
      params
    )}&maxResults=${maxResults}&key=${config.API_TOKEN}`;

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
  async function queryApiAdvanced() {
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

      // even though we are filtering by language from the api, there are apparently
      // some weird edge cases that make it nessessary to filter by language on the
      // client side of things.
      for (let index = 0; index < data.items.length; index++) {
        const item = data.items[index];
        if (item.volumeInfo && item.volumeInfo.language === filter.language) {
          const book = new GoogleBook(item);
          googleBookResults.value.push(book);
        }
      }
    }
  }

  return {
    /* properties */
    googleBookResults, // array of books populated by response
    basicQuery, // last simple query string from input

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
