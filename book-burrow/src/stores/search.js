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

    // even though im paging the results, I still want to keep track of all of the results
    // in one big array for usage later.  maybe i can use this to add a cache mode or something
    // where users could store all results that are not duplicates and then toggle between
    // online and offline modes where they can search through the cached results
    // without having to query the API again. may also help lower API usage.
    const googleBookResults = ref([]);
    const resultPages = ref([]);
    const currentPageIndex = ref(0);
    const pageCount = ref(0);

    const basicQuery = ref("");

    const clear = () => {
      googleBookResults.value = [];
      resultPages.value = [];
      pageCount.value = 0;
      currentPageIndex.value = 0;
    };

    const formatFindResultsOptions = computed(() => {
      let queryParts = [];

      if (filter.allWords.length > 0) {
        const trimmedWords = filter.allWords.trim();
        if (trimmedWords) {
          queryParts.push(
            encodeURIComponent(trimmedWords).replace(/%20/g, "+") // regex to replace spaces with +
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

    const formatFilterByOptions = computed(() => {
      let keywords = "";

      if (filter.title && filter.title != "") {
        let tmp = filter.title.split(" ");

        for (let i = 0; i < tmp.length; i++) {
          tmp[i] = `intitle:"${encodeURIComponent(tmp[i])}"`;
        }

        keywords = tmp.join("+");
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
        const subjects = filter.subject.split(";");
        for (let i = 0; i < subjects.length; i++) {
          subjects[i] = `subject:"${encodeURIComponent(subjects[i].trim())}"`;
        }
        keywords += `+${subjects.join("+")}`;
      }

      config.FMT_PRINT_DEBUG("formatFilterByOptions::keywords", keywords);

      return keywords;
    });

    const formatAdditionalOptions = computed(() => {
      let keywords = "";

      if (filter.language !== "" && filter.language !== "any")
        keywords += `&langRestrict=${filter.language}`;

      keywords += `&printType=books`;
      keywords += `&maxResults=${user.maxResults}`;
      keywords += `&key=${config.GOOGLE_API_KEY}`;

      config.FMT_PRINT_DEBUG("formatAdditionalOptions::keywords", keywords);

      return keywords;
    });

    const advancedQueryUrl = computed(() => {
      let queryString = `${config.API_URL}?q=`;

      const words = formatFindResultsOptions.value;
      const filters = formatFilterByOptions.value;
      const additionalOptions = formatAdditionalOptions.value;

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

    async function queryApiBasic(params) {
      clear();

      const requestHeaders = new Headers();
      requestHeaders.append("Content-Type", "application/json");

      const url = `${config.API_URL}?q=${encodeURIComponent(
        params
      )}&printType=books&maxResults=${user.maxResults}&key=${
        config.GOOGLE_API_KEY
      }`;

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
          "search::queryApiBasic",
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

            break;
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

    async function queryApiISBN(isbn) {
      clear();

      if (!isbn || isbn.trim() === "") {
        config.FMT_PRINT_DEBUG(
          "queryApiISBN::isbn",
          "ISBN is empty or undefined.",
          true
        );
        return;
      }

      config.FMT_PRINT_DEBUG("queryApiISBN::isbn", isbn);

      if (isbn.length < 10 || isbn.length > 13) {
        config.FMT_PRINT_DEBUG(
          "queryApiISBN::isbn",
          "ISBN length is invalid. Must be 10 or 13 characters.",
          true
        );
        return;
      }

      const requestHeaders = new Headers();
      requestHeaders.append("Content-Type", "application/json");

      const url = `${config.API_URL}?q=isbn:${encodeURIComponent(
        isbn
      )}&printType=books&maxResults=${user.maxResults}&key=${
        config.GOOGLE_API_KEY
      }`;

      config.FMT_PRINT_DEBUG("queryApiISBN::url", url);

      const options = {
        method: "GET",
        headers: requestHeaders,
      };

      const response = await fetch(url, options);

      if (response.ok) {
        const data = await response.json();

        if (data.items && data.items.length > 0) {
          const book = new GoogleBook(data.items[0]);
          googleBookResults.value.push(book);

          resultPages.value.push({
            index: 0,
            results: [book],
          });
        } else {
          config.FMT_PRINT_DEBUG(
            "queryApiISBN::isbn",
            "No results found for the provided ISBN.",
            true
          );
        }

        pageCount.value = 1;
      }

      currentPageIndex.value = 0;
    }

    async function queryApiAdvanced() {
      googleBookResults.value = [];
      resultPages.value = [];

      const url = advancedQueryUrl.value;

      config.FMT_PRINT_DEBUG("queryApiAdvanced::url", url);

      const requestHeaders = new Headers();
      requestHeaders.append("Content-Type", "application/json");

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
            break;
          }

          for (let itemIndex = 0; itemIndex < data.items.length; itemIndex++) {
            const item = data.items[itemIndex];
            if (
              (item.volumeInfo &&
                item.volumeInfo.language === filter.language) ||
              filter.language == "any"
            ) {
              const book = new GoogleBook(item);
              googleBookResults.value.push(book);
              page.results.push(book);
            }
          }

          resultPages.value.push(page);
        }

        currentPageIndex.value = 0;
      }
    }

    async function queryForRecommended(isbn) {
      clear();

      if (!isbn || isbn.trim() === "") {
        config.FMT_PRINT_DEBUG(
          "queryForRecommended::isbn",
          "ISBN is empty or undefined.",
          true
        );
        return;
      }

      config.FMT_PRINT_DEBUG("queryForRecommended::isbn", isbn);

      if (isbn.length < 10 || isbn.length > 13) {
        config.FMT_PRINT_DEBUG(
          "queryForRecommended::isbn",
          "ISBN length is invalid. Must be 10 or 13 characters.",
          true
        );
        return;
      }

      const requestHeaders = new Headers();
      requestHeaders.append("Content-Type", "application/json");

      const url = `${config.API_URL}?q=isbn:${encodeURIComponent(isbn)}&key=${
        config.GOOGLE_API_KEY
      }`;

      config.FMT_PRINT_DEBUG("queryForRecommended::url", url);

      const options = {
        method: "GET",
        headers: requestHeaders,
      };

      const response = await fetch(url, options);

      if (response.ok) {
        const data = await response.json();

        if (data.items && data.items.length > 0) {
          const book = new GoogleBook(data.items[0]);
          return book;
        }
      }
    }

    const loadResultsFromSource = (books) => {
      clear();

      if (!books || books.length === 0) {
        config.FMT_PRINT_DEBUG(
          "loadResultsFromSource",
          "No books provided to load.",
          true
        );
        return;
      }

      googleBookResults.value = [...books];

      const pageSize = user.maxResults;

      for (let i = 0; i < books.length; i += pageSize) {
        const pageBooks = books.slice(i, i + pageSize);

        resultPages.value.push({
          index: resultPages.value.length,
          results: pageBooks,
        });
      }

      pageCount.value = resultPages.value.length;

      currentPageIndex.value = 0;

      config.FMT_PRINT_DEBUG(
        "loadBooksIntoStore",
        `Loaded ${books.length} books into ${pageCount.value} pages.`
      );
    };

    return {
      googleBookResults,
      pageCount,
      basicQuery,
      resultPages,
      currentPageIndex,

      formatFindResultsOptions,
      formatFilterByOptions,
      formatAdditionalOptions,
      advancedQueryUrl,

      clear,
      queryApiBasic,
      queryApiAdvanced,
      queryApiISBN,
      queryForRecommended,
      loadResultsFromSource,
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
              return utility.getGBookForm(book);
            }),
            resultPages: state.resultPages.map((page) => {
              return {
                index: page.index,
                results: page.results.map((book) => {
                  return utility.getGBookForm(book);
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
            loadedState.pageCount = loadedState.resultPages.length;
          } else {  
            loadedState.currentPageIndex = 0;
            loadedState.pageCount = 0;
          }

          return loadedState;
        },
      },
    },
  }
);
