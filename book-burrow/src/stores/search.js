import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { config } from "@/config.js";
import { GoogleBook } from "@/GoogleBook.js";
import { utility } from "@/utility.js";
import { useFilterStore } from "@/stores/filter";
import { useUserStore } from "@/stores/user";

export const useSearchStore = defineStore(
  "search",
  () => {
    const filter = useFilterStore();
    const user = useUserStore();

    const googleBookResults = ref([]);
    const resultPages = ref([]);
    const currentPageIndex = ref(0);
    const pageCount = ref(0);
    
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
            encodeURIComponent(trimmedWords).replace(/%20/g, "+") // regex matches spaces and replaces them with +
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

    const clear = () => {
      googleBookResults.value = [];
      basicQuery.value = "";
    };

    // formats addtional options query string
    const formatAdditionalOptions = computed(() => {
      let keywords = "";

      if (filter.language !== "" && filter.language !== "any")
        keywords += `&langRestrict=${filter.language}`;

      keywords += `&printType=books`;
      keywords += `&maxResults=${user.maxResults}`;
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

      // because we use encodeURIComponent to encode the query string in the
      // respective format functions, we should not encode it again here (double encoding).
      // this can break the query string or return unexpected results.
      // Now i understand some of the results ive been getting.
      if (words) {
        queryString += `${words}`;
      }

      if (filters) {
        if (words === "") {
          queryString += `${filters}`;
        } else {
          queryString += `+${filters}`;
        }
      }

      if (additionalOptions) {
        queryString += `${additionalOptions}`;
      }

      return queryString;
    });

    // perform a generic search across a wide range of fields
    // if any field has content that matches the query string,
    // it will return the book.
    async function queryApiBasic(params) {
      // Make sure i 'reset' the book result array, otherwise it will get huge.
      // just clear the array and repopulate it with the new results.
      googleBookResults.value = [];
      resultPages.value = [];

      const requestHeaders = new Headers();
      requestHeaders.append("Content-Type", "application/json");

      const url = `${config.API_URL}?q=${encodeURIComponent(
        params
      )}&printType=books&maxResults=${user.maxResults}&key=${config.API_TOKEN}`;

      config.FMT_PRINT_DEBUG("queryApiBasic::url", url);

      const options = {
        method: "GET",
        headers: requestHeaders,
      };

      for (let index = 0; index < user.maxPages; index++) {
        const page = {
          index: resultPages.value.length,
          results: [],
        };

        let indexedUrl = `${url}&startIndex=${index * user.maxResults}`;

        config.FMT_PRINT_DEBUG(
          "search::queryApiAdvanced",
          `Querying page ${index + 1} with URL: ${indexedUrl}`
        );

        const response = await fetch(indexedUrl, options);

        if (response.ok) {
          const data = await response.json();

          if (data.items === undefined) {
            config.FMT_PRINT_DEBUG(
              "search::queryApiAdvanced",
              `No more results found on page ${index + 1}.`
            );

            break; // no more results, so break out of the loop.
          }

          for (let itemIndex = 0; itemIndex < data.items.length; itemIndex++) {
            const book = new GoogleBook(data.items[itemIndex]);
            googleBookResults.value.push(book);
            page.results.push(book);
          }

          resultPages.value.push(page);
        }

        currentPageIndex.value = 0;

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

      for (let index = 0; index < user.maxPages; index++) {
        let indexedUrl = `${url}&startIndex=${index * user.maxResults}`;

        config.FMT_PRINT_DEBUG(
          "search::queryApiAdvanced",
          `Querying page ${index + 1} with URL: ${indexedUrl}`
        );

        const response = await fetch(indexedUrl, options);

        if (response.ok) {
          const data = await response.json();

          if (data.items === undefined) {
            config.FMT_PRINT_DEBUG(
              "search::queryApiAdvanced",
              `No more results found on page ${index + 1}.`
            );
            break; // no more results, so break out of the loop.
          }
          // even though i am filtering by language from the api, there are apparently
          // some weird edge cases that make it nessessary to filter by language on the
          // client side of things.
          for (let itemIndex = 0; itemIndex < data.items.length; itemIndex++) {
            const item = data.items[itemIndex];
            if (
              (item.volumeInfo &&
                item.volumeInfo.language === filter.language) ||
              filter.language == "any"
            ) {
              const book = new GoogleBook(item);
              googleBookResults.value.push(book);
            }
          }

          pageCount.value = Math.ceil(data.totalItems / user.maxResults); // calculate the number of pages based on total items and max results
          config.FMT_PRINT_DEBUG(
            "search::queryApiAdvanced",
            `Page ${index + 1} of ${pageCount.value} loaded.`
          );
        }
      }

      if (googleBookResults.value.length === 0) {
        config.FMT_PRINT_DEBUG(
          "search::queryApiAdvanced",
          "No books found matching the query."
        );
        pageCount.value = 0;
      } else if (googleBookResults.value.length < user.maxResults) {
        pageCount.value = 1;
      } else {
        config.FMT_PRINT_DEBUG(
          "search::queryApiAdvanced",
          `Found ${googleBookResults.value.length} books matching the query.`
        );
      }
    }

    return {
      googleBookResults, // array of books populated by response
      pageCount, // number of pages of results
      basicQuery, // last simple query string from input
      resultPages, // an array of page objects
      currentPageIndex, // the index of the current page within the resultPages array

      formatFindResultsOptions, // formats allWords/exactWords/atleastOneWord/withoutTheseWords query string
      formatFilterByOptions, // formats title, author, publisher, published, subject query string
      formatAdditionalOptions, // formats addtional options query string
      advancedQueryUrl, // build the entire formatted advanced query string
      clear, // clears values.
      queryApiBasic, // perform a generic search across a wide trange of fields
      queryApiAdvanced, // perform an advanced, targeted search for combined terms, filters, and options
    };
  },
  {
    persist: {
      paths: [
        "googleBookResults",
        "pageCount",
        "basicQuery",
        "resultPages",
        "currentPageIndex",
      ],
      serializer: {
        serialize: (state) => {
          const newState = {
            ...state,
            googleBookResults: state.googleBookResults.map((book) => {
              return { ...book };
            }),
            resultPages: state.resultPages.map((page) => {
              return {
                index: page.index,
                results: page.results.map((book) => {
                  return { ...book };
                }),
              };
            }),
          };

          return JSON.stringify(newState);
        },
        deserialize: (str) => {
          const loadedState = JSON.parse(str);

          if (loadedState.googleBookResults) {
            loadedState.googleBookResults = loadedState.googleBookResults.map(
              (plainObject) => {
                return utility.getGBookFrom(plainObject);
              }
            );
          }

          if (loadedState.resultPages) {
            loadedState.resultPages = loadedState.resultPages.map((page) => {
              return {
                index: page.index,
                results: page.results.map((plainObject) => {
                  return utility.getGBookFrom(plainObject);
                }),
              };
            });
          }

          if (loadedState.resultPages && loadedState.resultPages.length > 0) {
            loadedState.currentPageIndex = 0;
          }

          return loadedState;
        },
      },
    },
  }
);