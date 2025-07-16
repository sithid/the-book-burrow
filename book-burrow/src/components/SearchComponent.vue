<template>
  <div class="search-component">
    <div v-if="!filter.isPanelOpen" class="search-container">
      <button @click="filter.toggleFilterPanel" class="filter-button">
        <i class="fa fa-filter" aria-hidden="true"></i>
      </button>
      <button @click="clearClick" class="clear-button">
        <i class="fa fa-cancel" aria-hidden="true"></i>
      </button>
      <input id="search-input" type="text" v-model="search.basicQuery" @keyup.enter="onSearch" class="search-input"
        placeholder="Search Terms Required" />
      <button v-if="!filter.isPanelOpen" @click="onSearch" class="search-button">
        <i class="fa fa-search" aria-hidden="true"></i>
      </button>
    </div>
    <div class="filter-options-panel">
      <FilterPanelComponent></FilterPanelComponent>
    </div>
    <div class="results-container">
      <div class="to-read-container">
        <h1>Bookshelf</h1>
        <p>To Be Read</p>
      </div>
      <div class="result-cards">
        <div v-for="book of search.googleBookResults">
          <SearchResultComponent :book="book"></SearchResultComponent>
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
import { onMounted } from "vue";
import { useFilterStore } from "@/stores/filter";
import { useSearchStore } from "@/stores/search";
import SearchResultComponent from "../components/SearchResultComponent.vue";
import FilterPanelComponent from "../components/FilterPanelComponent.vue";

const filter = useFilterStore();
const search = useSearchStore();

async function onSearch() {
  if (!filter.isPanelOpen && search.basicQuery != "")
    await search.queryApiBasic(search.basicQuery);
}

function clearClick() {
  search.clear();
}

onMounted(async () => {
  if (search.basicQuery != "") await search.queryApiBasic(search.basicQuery);
});
</script>

<style scoped>
.filter-options-panel {
  display: flex;
  flex-direction: row;
  position: relative;
  background-color: var(--color-secondary);
}

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
