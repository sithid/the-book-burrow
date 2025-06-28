<template>
  <div class="search-component">
    <div class="search-container">
      <button @click="filter.toggleFilterPanel" class="filter-button">
        <i class="fa fa-filter" aria-hidden="true"></i>
      </button>
      <input id="search-input" type="text" v-model="searchKeywords" @keyup.enter="searchBtnOnClick"
        class="search-input" />
      <button @click="searchBtnOnClick" class="search-button">
        <i class="fa fa-search" aria-hidden="true"></i>
      </button>
    </div>
    <div>
      <FilterPanelComponent></FilterPanelComponent>
    </div>
  </div>
</template>

<script setup>
import FilterPanelComponent from "../components/FilterPanelComponent.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

import { useFilterStore } from "@/stores/filter";
import { useSearchStore } from "@/stores/search";

const filter = useFilterStore();
const search = useSearchStore();

const searchKeywords = ref(search.keywords);
const router = useRouter();

const searchBtnOnClick = () => {
  search.keywords = searchKeywords.value;
  router.push("/search");
};
</script>

<style scoped>
@media (min-width: 768px) {
  .search-container {
    padding: 0 10px 0 10px;
  }
}
</style>
