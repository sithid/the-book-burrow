import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { config } from "../config.js";
import { GoogleBook } from "../GoogleBook.js";
import { useFilterStore } from "@/stores/filter";

export const useSearchStore = defineStore(
  "search",
  () => {
    const filter = useFilterStore();

    const googleBookResults = ref([]);

    // Simple search, querys google api for any book with any field that
    // matches this search string.  ?q={}
    const basicQuery = ref("");

    // formats allWords/exactWords/atleastOneWord/withoutTheseWords query string
    // regex REALLY makes this so much easier <3
    const formatFindResultsOptions = computed(() => {
      let queryParts = []; // query string 'parts'

      if (filter.allWords.length > 0) {
        const trimmedWords = filter.allWords.trim();
        if (trimmedWords) {
          queryParts.push(
            encodeURIComponent(trimmedWords).replace(/%20/g, "+")
          );
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

      config.FMT_PRINT_DEBUG(
        "formatFindResultsOptions::keywords",
        finalKeywords
      );

      return finalKeywords;
    });

    // formats title, author, publisher, published, subject query string
    const formatFilterByOptions = computed(() => {
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
        else
          keywords += `+inpublisher:"${encodeURIComponent(filter.publisher)}"`;
      }

      if (filter.subject && filter.subject != "") {
        if (keywords === "")
          keywords = `subject:"${encodeURIComponent(filter.subject)}"`;
        else keywords += `+subject:"${encodeURIComponent(filter.subject)}"`;
      }

      config.FMT_PRINT_DEBUG("formatFilterByOptions::keywords", keywords);

      return keywords;
    });

    function clear() {
      googleBookResults.value = [];
      basicQuery.value = "";
    }

    // formats addtional options query string
    const formatAdditionalOptions = computed(() => {
      let keywords = "";

      if (filter.language !== "Any" && filter.language !== "")
        keywords += `&langRestrict=${filter.language}`;

      keywords += `&printType=books`;
      keywords += `&maxResults=${config.MAX_RESULTS}`;
      keywords += `&key=${config.API_TOKEN}`;

      config.FMT_PRINT_DEBUG("formatAdditionalOptions::keywords", keywords);

      return keywords;
    });

    // build the entire formatted advanced query string
    const advancedQueryUrl = computed(() => {
      let queryString = `${config.API_URL}?q=`;

      const words = formatFindResultsOptions.value;
      const filters = formatFilterByOptions.value;
      const additionalOptions = formatAdditionalOptions.value;

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
    });

    // perform a generic search across a wide trange of fields
    async function queryApiBasic(params, maxResults = config.MAX_RESULTS) {
      googleBookResults.value = [];

      const requestHeaders = new Headers();
      requestHeaders.append("Content-Type", "application/json");

      const url = `${config.API_URL}?q=${encodeURIComponent(
        params
      )}&printType=books&maxResults=${maxResults}&key=${config.API_TOKEN}`;

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

        for (let index = 0; index < data.items.length; index++) {
          const book = new GoogleBook(data.items[index]);
          googleBookResults.value.push(book);
        }
      }
    }

    // perform an advanced, targeted search for combined terms, filters, and options
    async function queryApiAdvanced() {
      googleBookResults.value = [];
      const url = advancedQueryUrl.value;

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
      advancedQueryUrl, // build the entire formatted advanced query string
      queryApiBasic, // perform a generic search across a wide trange of fields
      queryApiAdvanced, // perform an advanced, targeted search for combined terms, filters, and options
    };
  },
  {
    // state persistence, automatically saves and loads state to/from localStorage
    // our google book is a custom object, so we need to serialize it properly
    // using a custom serializer/deserializer.
    persist: {
      serializer: {
        // stringify the state, but we need to handle the GoogleBook object
        // deserialize manually, since it is a custom object.
        serialize: (state) => {
          const newState = {
            ...state,
            googleBookResults: state.googleBookResults.map((book) => {
              return { ...book };
            }),
          };
          return JSON.stringify(newState);
        },
        deserialize: (str) => {
          // we previously had to stringify the book object, so we need to parse it back.
          const loadedState = JSON.parse(str);
          if (loadedState.googleBookResults) {
            // here we need to map each element of the loaded googleBookResults array to a new array
            // of google books that we build from the plain object.
            loadedState.googleBookResults = loadedState.googleBookResults.map(
              (plainObject) => {
                return new GoogleBook({
                  id: plainObject.id,
                  selfLink: plainObject.selfLink,
                  volumeInfo: {
                    title: plainObject.title,
                    authors: plainObject.authors,
                    categories: plainObject.subject,
                    publisher: plainObject.publisher,
                    publishedDate: plainObject.publishedDate,
                    description: plainObject.description,
                    industryIdentifiers: [
                      plainObject.isbn10 ? { type: "ISBN_10", identifier: plainObject.isbn10 } : null, // ternary operator to handle nulls
                      plainObject.isbn13 ? { type: "ISBN_13", identifier: plainObject.isbn13 } : null, // ternary  operator to handle nulls
                    ].filter(Boolean), // shortish syntax for filtering out nulls
                    pageCount: plainObject.pageCount,
                    printedPageCount: plainObject.printedPageCount,
                    averageRating: plainObject.averageRating,
                    ratingCount: plainObject.ratingCount,
                    maturityRating: plainObject.maturityRating,
                    imageLinks: plainObject.imageLinks,
                    language: plainObject.language,
                    infoLink: plainObject.infoLink,
                    canonicalVolumeLink: plainObject.canonicalVolumeLink,
                    saleInfo: plainObject.saleInfo,
                  },
                });
              }
            );
          }
          return loadedState;
        },
      },
    },
  }
);
