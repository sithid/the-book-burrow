<template>
  <div class="search-component">
    <div class="search-container">
      <button @click="filter.toggleFilterPanel" class="filter-button">
        <i class="fa fa-filter" aria-hidden="true"></i>
      </button>
      <input id="search-input" type="text" v-model="search.basicQuery" @keyup.enter="searchBtnOnClick"
        class="search-input" required />
      <button v-if="!filter.isPanelOpen" @click="searchBtnOnClick" class="search-button">
        <i class="fa fa-search" aria-hidden="true"></i>
      </button>
    </div>
    <FilterPanelComponent></FilterPanelComponent>
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

const searchBtnOnClick = async () => {
  await search.queryApiBasic(search.basicQuery, 10);
}

onMounted(async () => {
  if (search.basicQuery != '')
    await search.queryApiBasic(search.basicQuery, 10);
  else {
    search.basicQuery = "popular";
    await search.queryApiBasic(search.basicQuery, 10)
  }
});

</script>

<style scoped>
.results-container {
  display: flex;
  flex-direction: row;
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
  background-color: var(--color-primary);
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

@media (min-width: 1024px) {

  .to-read-container,
  .read-container {
    display: flex;
  }
}
</style>
