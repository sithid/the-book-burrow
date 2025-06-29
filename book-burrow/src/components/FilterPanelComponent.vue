<template>
  <div v-if="filter.isPanelOpen" class="filter-options-panel">
    <form id="advanced-search-form">
      <h3>Advanced Search Options</h3>
      <span
        ><label for="book-title">Title: </label>
        <input
          id="book-title"
          name="title"
          type="text"
          placeholder="Enter book title here..."
        />

        <label for="book-title">Author: </label>
        <input
          id="book-title"
          name="title"
          type="text"
          placeholder="Enter book title here..."
        />
      </span>
    </form>
  </div>
</template>

<script setup>
import { useFilterStore } from "@/stores/filter";

const filter = useFilterStore();
</script>

<style scoped>
.filter-options-panel {
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: var(--color-secondary);
  text-align: left;
  width: 100%;
  padding: 10px;
}

#advanced-search-form h3 {
  text-align: center;
  margin: 10px;
  padding-left: 10px;
}
</style>
