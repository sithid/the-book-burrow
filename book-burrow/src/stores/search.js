import { defineStore } from 'pinia';
import { ref } from 'vue';
import { config } from "../../config.js";

export const useSearchStore = defineStore('search', () => {
  const items = ref({});
  
  const basicQuery = ref('');

  const title = ref('');
  const author = ref('');
  const publisher = ref('');
  const published = ref('');
  const genre = ref('');

  function formatAdvancedQuery() {

    let keywords = new URLSearchParams();

    if (title.value != '')
      keywords.append("intitle", title.value);

    if (author.value != '')
      keywords.append("inauthor", author.value);
    
    if (publisher.value != '')
      keywords.append("inpublisher", publisher.value);

    if (genre.value != '')
      keywords.append("subject", genre.value);
    
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
    items,
    basicQuery,
    title,
    author,
    publisher,
    published,
    genre,
    formatAdvancedQuery,
    queryApiBasic,
    queryApiAdvanced
  }
});