<template>
  <div class="search-container">
    <button @click="filterStore.toggleFilterPanel" class="filter-button">
      <i class="fa fa-filter" aria-hidden="true"></i>
    </button>
    <input type="text" class="search-input" placeholder="Search...">
    <button @click="searchBtnOnClick" class="search-button">
      <i class="fa fa-search" aria-hidden="true"></i>
    </button>
  </div>
</template>

<script setup>
import { useFilterStore } from '@/stores/filter';

const filterStore = useFilterStore();

function searchBtnOnClick() {
  console.log("Search button clicked!");
}

</script>

<style scoped>
  .search-container {
    display: flex;
    flex-direction: row;
    padding: 10px;
    gap: 10px;
  }

  .search-button, .filter-button {
    border-radius: 35%;
  }

  .search-input {
    width: 75vw;
    height: 30px;
    border-radius: 10px;
  }

</style>