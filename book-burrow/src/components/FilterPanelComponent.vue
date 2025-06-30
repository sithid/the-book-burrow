<template>
  <div v-if="filter.isPanelOpen" class="filter-options-panel">
    <div class="advanced-search-container">
      <div class="left-panel">
        <p id="left-panel-info">Find Results:</p>
        <div class="option-group">
          <input id="all-words" name="allWords" type="text" v-model="search.allWords"
            placeholder="with all of the words" />
        </div>
        <div class="option-group">
          <input id="exact-words" name="exactWords" type="text" v-model="search.exactWords"
            placeholder="with the exact words" />
        </div>
        <div class="option-group">
          <input id="atleast-one-word" name="atleastOneWord" type="text" v-model="search.atleastOneWord"
            placeholder="with atleast one of the words" />
        </div>
        <div class="option-group">
          <input id="without-these-words" name="withoutTheseWords" type="text" v-model="search.withoutTheseWords"
            placeholder="without these words" />
        </div>
      </div>
      <div class="middle-panel">
        <p id="middle-panel-info">Include:</p>
        <div class="option-group">
          <label for="book-title">Title</label>
          <input id="book-title" name="title" type="text" v-model="search.title"
            placeholder="Enter book title here..." />
        </div>
        <div class="option-group">
          <label for="book-author">Author</label>
          <input id="book-author" name="author" type="text" v-model="search.author"
            placeholder="Enter book author here..." />
        </div>
        <div class="option-group">
          <label for="book-subject">Subject</label>
          <input id="book-subject" name="subject" type="text" v-model="search.subject"
            placeholder="Enter book subject here..." />
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
        <p id="middle-panel-info">Additional Options:</p>
        <div class="option-group">
          <button id="adv-search-button" @click="queryApiAdvanced">Search</button>
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
  await search.queryApiAdvanced(40);
}
</script>

<style scoped>
.filter-options-panel {
  display: flex;
  flex-direction: row;
  position: relative;
  background-color: var(--color-secondary);
}

.advanced-search-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.left-panel,
.middle-panel,
.right-panel {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

#left-panel-info {
  text-align: left;
  margin: 0 10px;
  padding-left: 0 10px;
  font-size: 0.5rem;
}

#middle-panel-info {
  text-align: left;
  margin: 0 10px;
  padding-left: 0 10px;
  font-size: 0.5rem;
}

#right-panel-info {
  text-align: left;
  margin: 0 10px;
  padding-left: 0 10px;
  font-size: 0.5rem;
}

.option-group {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.option-group input {
  margin: 0 5px;
  text-align: center;
  font-size: 0.5rem;
}

.option-group label {
  margin-left: 20px;
  font-size: 0.5rem;
}

.left-panel input {
  margin-left: 10px;
}

@media (min-width: 768px) {
  .advanced-search-container {
    flex-direction: row;
  }
}
</style>
