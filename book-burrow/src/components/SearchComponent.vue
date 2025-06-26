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
        @keyup.enter="searchBtnOnClick"
        class="search-input"
      />
      <button @click="searchBtnOnClick" class="search-button">
        <i class="fa fa-search" aria-hidden="true"></i>
      </button>
    </div>
    <div>
      <FilterPanelComponent></FilterPanelComponent>
    </div>
    <div class="results-container">
      <div class="to-read-container">
        <h1>Bookshelf</h1>
        <p>To Be Read</p>
      </div>
      <div class="result-cards">
        <div v-for="item of search.items.value">
          <SearchResultComponent :item="item"></SearchResultComponent>
        </div>
      </div>
      <div class="read-container">
        <h1>Bookshelf</h1>
        <p>Have Read</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { config } from "../../config.js";
import { ref, onMounted } from "vue";
import { useFilterStore } from "@/stores/filter";
import { useSearchStore } from "@/stores/search";
import SearchResultComponent from "../components/SearchResultComponent.vue";
import FilterPanelComponent from "../components/FilterPanelComponent.vue";

const filter = useFilterStore();
const search = useSearchStore();

const searchKeywords = ref(search.keywords);

async function queryApi(params) {
  const keywords = new URLSearchParams();
  keywords.append("q", params);
  keywords.append("maxResults", config.MAX_RESULTS);

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
    search.items.value = data.items;

    return data;
  }
}

const searchBtnOnClick = async () => {
  search.keywords = searchKeywords.value;
  await queryApi(search.keywords);
}

onMounted( async ()  => {
  console.log("SearchComponent mounted.");
  await queryApi(search.keywords);
});

</script>

<style scoped>
.search-component {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: var( --color-primary );
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
  border: 1px solid black;
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
  padding-left: 10px;
  padding-right: 10px;
  gap: 10px;
}

.result-cards {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
}

.to-read-container,
.read-container {
  display: none;
  flex-direction: column;
  width: 600px;
  background-color: var(--color-secondary);
}

.to-read-container h1,
.to-read-container p,
.read-container h1,
.read-container p {
  padding: 10px;
  margin: 10px;
  border: 1px solid black;
  background-color: #fff;
}

@media (min-width: 768px) {
  .search-container {
    padding: 0 10px 0 10px;
  }
}

@media (min-width: 1024px) {
  .to-read-container,
  .read-container {
    display: flex;
  }
}
</style>
