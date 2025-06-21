<template>
  <div class="search-component">
    <div class="search-container">
      <button @click="filter.toggleFilterPanel" class="filter-button">
        <i class="fa fa-filter" aria-hidden="true"></i>
      </button>
      <input
        id="search-input"
        type="text"
        v-model="searchKeywords"
        class="search-input"
      />
      <button @click="searchBtnOnClick" class="search-button">
        <i class="fa fa-search" aria-hidden="true"></i>
      </button>
    </div>
    <div class="results-container">
      <div class="to-read-container">
        <h1>Bookshelf</h1>
        <p>To Be Read</p>
      </div>
      <div class="result-cards">
        <div v-for="item of search.getItems().value">
          <SearchResultComponent :item="item"></SearchResultComponent>
        </div>
      </div>
      <div class="read-container">
        <h1>Bookshelf</h1>
        <p>Read</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { BOOKS_API } from "../../config.js";
import { ref, onMounted } from "vue";
import { useFilterStore } from "@/stores/filter";
import { useSearchStore } from "@/stores/search";
import SearchResultComponent from "../components/SearchResultComponent.vue";

const filter = useFilterStore();
const search = useSearchStore();

const searchKeywords = ref("potter");

async function queryApi(params) {
  const keywords = new URLSearchParams();
  keywords.append("q", params);
  keywords.append("maxResults", BOOKS_API.MAX_RESULTS);

  const requestHeaders = new Headers();
  requestHeaders.append("Content-Type", "application/json");
  requestHeaders.append("key", BOOKS_API.API_TOKEN);

  const url = `${BOOKS_API.API_URL}?${keywords}`;

  const options = {
    method: "GET",
    headers: requestHeaders,
  };

  const response = await fetch(url, options);

  if (response.ok) {
    const data = await response.json();
    search.items.value = data.items;

    return data;
  }
}

async function searchBtnOnClick() {
  await queryApi(searchKeywords.value);
  console.log(search.items.value);
}

onMounted(() => {
  queryApi(searchKeywords.value);
});
</script>

<style scoped>
.search-component {
  display: flex;
  flex-direction: column;
}

.search-container {
  display: flex;
  justify-content: center;
  flex-direction: row;
  padding: 10px;
  margin-top: 10px;
  gap: 10px;
}

.search-input {
  width: 100%;
  height: 30px;
  border: 2px solid black;
  font-size: 0.9rem;
  margin: 10px;
  padding: 10px;
}

.search-button,
.filter-button {
  margin: 10px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.results-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
}

.result-cards {
  display: flex;
  flex-direction: column;
}

.to-read-container,
.read-container {
  display: none;
  flex-direction: column;
  background-color: red;
  border: 2px solid black;
}

.to-read-container h1,
.to-read-container p,
.read-container h1,
.read-container p {
  padding: 0;
  margin: 0;
  border: 2px solid black;
}

@media (min-width: 768px) {
  .search-container {
    padding: 0px 10px 0px 10px;
  }

  .to-read-container,
  .read-container {
    display: flex;
  }
}
</style>
