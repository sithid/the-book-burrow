<template>
  <div class="search-component">
    <div class="search-container">
      <button @click="filter.toggleFilterPanel" class="filter-button">
        <i class="fa fa-filter" aria-hidden="true"></i>
      </button>
      <input id="search-input" type="text" v-model="basicQuery" @keyup.enter="searchBtnOnClick" class="search-input"
        required />
      <button v-if="!filter.isPanelOpen" @click="searchBtnOnClick" class="search-button">
        <i class="fa fa-search" aria-hidden="true"></i>
      </button>
    </div>
    <FilterPanelComponent></FilterPanelComponent>
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

const basicQuery = ref(search.basicQuery);
const router = useRouter();

const searchBtnOnClick = () => {
  search.basicQuery = basicQuery.value;
  router.push("/search");
};
</script>
