<template>
  <div v-if="filter.isPanelOpen" class="advanced-search-container">
    <div class="left-panel">
      <p id="left-panel-info">Find Results:</p>
      <div class="option-group">
        <input
          id="all-words"
          name="allWords"
          type="text"
          v-model="search.allWords"
          placeholder="with all of these words"
        />
      </div>
      <div class="option-group">
        <input
          id="exact-words"
          name="exactWords"
          type="text"
          v-model="search.exactWords"
          placeholder="with these exact words"
        />
      </div>
      <div class="option-group">
        <input
          id="atleast-one-word"
          name="atleastOneWord"
          type="text"
          v-model="search.atleastOneWord"
          placeholder="with at least one of these words"
        />
      </div>
      <div class="option-group">
        <input
          id="without-these-words"
          name="withoutTheseWords"
          type="text"
          v-model="search.withoutTheseWords"
          placeholder="without these words"
        />
      </div>
    </div>
    <div class="middle-panel">
      <p id="middle-panel-info">Filter By:</p>
      <div class="option-group">
        <label for="book-title">Title</label>
        <input
          id="book-title"
          name="title"
          type="text"
          v-model="search.title"
          placeholder="Enter book title here..."
        />
      </div>
      <div class="option-group">
        <label for="book-author">Author</label>
        <input
          id="book-author"
          name="author"
          type="text"
          v-model="search.author"
          placeholder="Enter book author here..."
        />
      </div>
      <div class="option-group">
        <label for="book-subject">Subject</label>
        <input
          id="book-subject"
          name="subject"
          type="text"
          v-model="search.subject"
          placeholder="Enter book subject here..."
        />
      </div>
      <div class="option-group">
        <label for="book-publisher">Publisher</label>
        <input
          id="book-publisher"
          name="publisher"
          type="text"
          v-model="search.publisher"
          placeholder="Enter book publisher here..."
        />
      </div>
      <div class="option-group">
        <label for="book-published">Published</label>
        <input
          id="book-published"
          name="published"
          type="text"
          v-model="search.published"
          placeholder="Enter book published here..."
        />
      </div>
    </div>
    <div class="right-panel">
      <p id="right-panel-info">Additional Options:</p>

      <label for="language-select">Language</label>
      <select id="language-select">
        <option value="en">English</option>
        <option value="es">Spanish</option>
      </select>
      
      <div class="option-group">
        <button id="adv-search-button" @click="queryApiAdvanced">Search</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useFilterStore } from "@/stores/filter";
import { useSearchStore } from "@/stores/search";

const filter = useFilterStore();
const search = useSearchStore();

async function queryApiAdvanced() {
  await search.queryApiAdvanced(40);
}
</script>

<style scoped>
.left-panel {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-bottom: 5px;
}

.middle-panel {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.right-panel {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

#left-panel-info,
#middle-panel-info,
#right-panel-info {
  text-align: left;
  margin: 0 10px;
  padding-left: 0 10px;
  font-size: 0.6rem;
}

.advanced-search-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  padding-left: 2px;
  justify-content: left;
}

.option-group {
  display: flex;
  flex-direction: row;
  justify-content: end;
}

.option-group input {
  margin: 0px 0px;
  font-size: 1rem;
}

.option-group label {
  margin-left: 20px;
  font-size: 1rem;
}

.left-panel input {
  margin-left: 10px;
  font-size: 1rem;
}

@media (min-width: 768px) {
  .advanced-search-container {
    flex-direction: row;
    width: 100vw;
  }

  .option-group input {
    font-size: 1rem;
  }

  .option-group label {
    font-size: 1rem;
  }

  .left-panel input {
    font-size: 1rem;
  }

  #left-panel-info,
  #middle-panel-info,
  #right-panel-info {
    font-size: 0.8rem;
  }

  #adv-search-button {
    max-height: 25px;
    font-size: 0.6rem;
    margin: 0 10px;
  }
}
</style>
