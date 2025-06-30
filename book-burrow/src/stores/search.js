import { defineStore } from 'pinia';
import { ref } from 'vue';
import { config } from "../../config.js";

export const useSearchStore = defineStore('search', () => {
  const items = ref({});
  
  const basicQuery = ref('');
  const allWords = ref('');
  const exactWords = ref('');
  const withoutTheseWords = ref('');
  const atleastOneWord = ref('');

  const title = ref('');
  const author = ref('');
  const publisher = ref('');
  const published = ref('');
  const subject = ref('');

  function formatAdvancedQuery() {
    let keywords = new URLSearchParams();

    if (title.value != '')
      keywords.append("intitle", title.value);

    if (author.value != '')
      keywords.append("inauthor", author.value);
    
    if (publisher.value != '')
      keywords.append("inpublisher", publisher.value);

    if (subject.value != '')
      keywords.append("subject", subject.value);
    
    if (published.value != '')
      keywords.append("inpublished", published.value);
    
    let keywordString = `${keywords}`; 
    keywordString = keywordString.replace(/&/g, '+');
    keywordString = keywordString.replace(/=/g, ':');
    
    return keywordString;
  }

  async function queryApiAdvanced( maxResults = config.MAX_RESULTS) {
    const terms = this.formatAdvancedQuery();
    const url = `${config.API_URL}?q=${terms}&maxResults=${maxResults}`;

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

  async function queryApiBasic( params, maxResults = config.MAX_RESULTS ) {
    const keywords = new URLSearchParams();
    keywords.append("q", params);
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
    title, // includes these words in the title
    author, // includes these words in the author
    publisher, // includes these words in the publisher
    published, // includes this date in the published field
    subject, // includes these words in the subject
    formatAdvancedQuery, // format an advanced query string to send to the end point
    queryApiBasic, // perform a generic search across a wide trange of fields.
    queryApiAdvanced // perform a targetted search for specific metadata fields for a precise search.
  }
});