<template>
  <div v-if="filter.isPanelOpen" class="filter-options-panel">
    <div id="advanced-search-form">
      <div class="left-panel">
        <h3 id="search-by">Search By</h3>
        <div class="option-group">
          <label for="book-title">Title</label>
          <input id="book-title" name="title" type="text" v-model="search.title" placeholder="Enter book title here..." />
        </div>
        <div class="option-group">
          <label for="book-author">Author</label>
          <input id="book-author" name="author" type="text" v-model="search.author" placeholder="Enter book author here..." />
        </div>
        <div class="option-group">
          <label for="book-genre">Genre</label>
          <input id="book-genre" name="genre" type="text" v-model="search.genre" placeholder="Enter book genre here..." />
        </div>
        <div class="option-group">
          <label for="book-publisher">Publisher</label>
          <input id="book-publisher" name="publisher" type="text" v-model="search.publisher"
            placeholder="Enter book publisher here..." />
        </div>
        <div class="option-group">
          <label for="book-published">Published</label>
          <input id="book-published" name="published" type="text" v-model="search.published"
            placeholder="Enter book published here..." />
        </div>
      </div>
      <div class="right-panel">
        <div class="option-group">
          <button id="adv-search-button" @click="queryApiAdvanced">
            Search
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useFilterStore } from "@/stores/filter";
import { useSearchStore } from "@/stores/search";
import { ref } from "vue";
import { useRouter } from "vue-router";

const filter = useFilterStore();
const search = useSearchStore();
const router = useRouter();

async function queryApiAdvanced() {
  await search.queryApiAdvanced( 40 );
}
</script>

<style scoped>
.filter-options-panel {
  display: flex;
  flex-direction: row;
  position: relative;
  width: 100vw;
  background-color: var(--color-secondary);
}

#advanced-search-form {
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
}

#search-by {
  text-align: left;
  margin: 10px;
  padding-left: 10px;
}

.option-group {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.option-group input {
  margin: 0 0;
  text-align: left;
}

.option-group label {
  margin-left: 20px;
}

.left-panel,
.right-panel {
  display: flex;
  flex-direction: column;
}

/* @media (min-width: 768px) {
}*/
</style>
