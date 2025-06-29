<template>
  <div v-if="filter.isPanelOpen" class="filter-options-panel">
    <form id="advanced-search-form">
      <h3>Advanced Search Options</h3>
      <div class="option-group">
        <label for="book-title">Title:</label>
        <input id="book-title" name="title" type="text" v-model="title" placeholder="Enter book title here..." />
      </div>
      <div class="option-group">
        <label for="book-author">Author: </label>
        <input id="book-author" name="author" type="text" placeholder="Enter book author here..." />
      </div>
      <div class="option-group">
        <label for="book-publisher">Publisher: </label>
        <input id="book-publisher" name="publisher" type="text" placeholder="Enter book publisher here..." />
      </div>
      <div class="option-group">
        <label for="book-published">Published: </label>
        <input id="book-published" name="published" type="text" placeholder="Enter book published here..." />
      </div>
      <div class="option-group">
        <label for="book-genre">Genre: </label>
        <input id="book-genre" name="genre" type="text" placeholder="Enter book genre here..." />
      </div>
    </form>
    <div>Spacer</div>
  </div>
</template>

<script setup>
import { useFilterStore } from "@/stores/filter";
import { useSearchStore } from "@/stores/search";
import { ref } from "vue";

const filter = useFilterStore();
const search = useSearchStore();

const basicQuery = ref(search.basicQuery);
const advancedQuery = ref(search.advancedQuery);
const title = ref(search.title);
const author = ref(search.author);
const publisher = ref(search.publisher);
const published = ref(search.published);
const genre = ref(search.genre);
</script>

<style scoped>
.filter-options-panel {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  background-color: var(--color-secondary);
  width: 100%;
  padding: 10px;
}
#advanced-search-form {
  display: flex;
  flex-direction: column;
}

h3 {
  text-align: left;
  margin: 10px;
  padding-left: 10px;
}

input {
  width: 75%;
}

.option-group {
  display: flex;
  flex-direction: row;
  justify-content: right;
  gap: 10px;
}

@media (min-width: 768px) {
  
  .option-group {
    margin: 10px auto;
  }
}
</style>
