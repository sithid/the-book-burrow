import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { config } from "../config.js";
import { GoogleBook } from "../GoogleBook.js";
import { Bookshelf } from "../Bookshelf.js";
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
          differnt;
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
    async function queryApiBasic(params, maxResults = config.MAX_RESULTS) {
      // Make sure i 'reset' the book result array, otherwise it will get huge.
      // just clear the array and repopulate it with the new results.
      // i could save all the results, but there would be no point
      // since i are only displaying 40 results and there will
      // likely be more duplicates than unique results.  Google Books API
      // returns a maximum of 40 results per query, the sample is just too small
      // to filter client side and expect unique results. I have considered
      // breaking the query into multiple querys, mutating user input in differnt ways
      // and then filtering on client side but that would be
      // a lot of work and would likely not yield any better results.
      // in the fucture i may save all unique results to a separate results
      // array that users can look through, maybe like a 'session result history'
      // or something and only include results with unique ids.
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

        const bookshelf = new Bookshelf(
          "Default Shelf",
          "A default bookshelf for testing",
          false,
          "default-shelf-id"
        );

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

      for (let index = 0; index < 10; index++) {
        let indexedUrl = `${url}&startIndex=${
          (index + 1) * config.MAX_RESULTS
        }`;
        const response = await fetch(indexedUrl, options);

        if (response.ok) {
          const data = await response.json();

          if (!data.items && index === 0) {
            // if index is 0 then theres no results, if its > 0 we have some results so we dont need to report an error.
            config.FMT_PRINT_DEBUG("Something went wrong...", true);
            pageCount.value = index - 1 < 0 ? 0 : index - 1;
            return;
          }

          // even though i am filtering by language from the api, there are apparently
          // some weird edge cases that make it nessessary to filter by language on the
          // client side of things.
          for (let index = 0; index < data.items.length; index++) {
            const item = data.items[index];
            if (
              item.volumeInfo &&
              item.volumeInfo.language === filter.language
            ) {
              const book = new GoogleBook(item);
              googleBookResults.value.push(book);
            }
          }
        }
      }

      if (googleBookResults.value.length === 0) {
        config.FMT_PRINT_DEBUG(
          "search::queryApiAdvanced",
          "No books found matching the query."
        );
        pageCount.value = 0;
      } else if (googleBookResults.value.length < config.MAX_RESULTS) {
        pageCount.value = 1;
      } else {
        config.FMT_PRINT_DEBUG(
          "search::queryApiAdvanced",
          `Found ${googleBookResults.value.length} books matching the query.`
        );
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
    // our google book is a custom object, so i need to serialize it properly
    // using a custom serializer/deserializer.
    persist: {
      serializer: {
        // stringify the state(state includes all of the properties of the store)
        // but i only need to manually deserialize the googleBookResults array
        serialize: (state) => {
          const newState = {
            ...state, // the spread will help copy all other properties.
            googleBookResults: state.googleBookResults.map((book) => {
              return { ...book };
            }),
          };
          return JSON.stringify(newState);
        },
        deserialize: (str) => {
          // i previously serialized the store as a json object, so i need to parse it back.
          const loadedState = JSON.parse(str);
          if (loadedState.googleBookResults) {
            // here i need to map each element of the loaded googleBookResults array to a new array
            // of google books that i build from the plain object.
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
                      plainObject.isbn10
                        ? { type: "ISBN_10", identifier: plainObject.isbn10 }
                        : null, // ternary operator to handle nulls
                      plainObject.isbn13
                        ? { type: "ISBN_13", identifier: plainObject.isbn13 }
                        : null, // ternary  operator to handle nulls
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
