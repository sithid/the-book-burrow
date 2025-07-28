<template>
  <div v-if="filter.isPanelOpen" class="advanced-search-container">
    <div class="left-panel">
      <p id="left-panel-info">Find Results:</p>
      <div class="option-group">
        <label for="all-words">All Words</label>
        <input
          id="all-words"
          name="allWords"
          type="text"
          v-model="filter.allWords"
          placeholder="with all of these words"
        />
      </div>
      <div class="option-group">
        <label for="exact-words">Exact Words</label>
        <input
          id="exact-words"
          name="exactWords"
          type="text"
          v-model="filter.exactWords"
          placeholder="with these exact words"
        />
      </div>
      <div class="option-group">
        <label for="atleast-one-word">Atleast One</label>
        <input
          id="atleast-one-word"
          name="atleastOneWord"
          type="text"
          v-model="filter.atleastOneWord"
          placeholder="with at least one of these words"
        />
      </div>
      <div class="option-group">
        <label for="without-these-words">Without These</label>
        <input
          id="without-these-words"
          name="withoutTheseWords"
          type="text"
          v-model="filter.withoutTheseWords"
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
          v-model="filter.title"
          placeholder="Enter book title here..."
        />
      </div>
      <div class="option-group">
        <label for="book-author">Author</label>
        <input
          id="book-author"
          name="author"
          type="text"
          v-model="filter.author"
          placeholder="Enter book author here..."
        />
      </div>
      <div class="option-group">
        <label for="book-subject">Subject</label>
        <input
          id="book-subject"
          name="subject"
          type="text"
          v-model="filter.subject"
          placeholder="Enter book subject here..."
        />
      </div>
      <div class="option-group">
        <label for="book-publisher">Publisher</label>
        <input
          id="book-publisher"
          name="publisher"
          type="text"
          v-model="filter.publisher"
          placeholder="Enter book publisher here..."
        />
      </div>
    </div>
    <div class="right-panel">
      <p id="right-panel-info">Additional Options:</p>
      <div class="option-group">
        <label for="book-isbn">ISBN</label>
        <input
          id="book-isbn"
          name="isbn"
          type="text"
          v-model="filter.isbn"
          placeholder="Enter book isbn here..."
        />
      </div>
      <label id="language-label" for="language-select">Language</label>
      <select id="language-select" v-model="filter.language">
        <option value="any">Any</option>
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="de">German</option>
        <option value="it">Italian</option>
        <option value="ja">Japanese</option>
        <option value="ko">Korean</option>
        <option value="zh">Chinese(Simplified)</option>
        <option value="zh-Hant">Chinese(Traditional)</option>
        <option value="pt">Portuguese</option>
        <option value="ru">Russian</option>
        <option value="ar">Arabic</option>
        <option value="nl">Dutch</option>
        <option value="hi">Hindi</option>
        <option value="ur">Urdu</option>
        <option value="id">Indonesian</option>
        <option value="th">Thai</option>
        <option value="tr">Turkish</option>
        <option value="vi">Vietnamese</option>
      </select>
      <div class="adv-option-group">
        <div class="option-group">
          <button id="adv-cancel-button" @click="cancelClick">Cancel</button>
        </div>
        <div class="option-group">
          <button id="adv-clear-button" @click="clearClick">Clear</button>
        </div>
        <div class="option-group">
          <button id="adv-search-button" @click="queryApiAdvanced">
            Search
          </button>
        </div>
        <div class="option-group">
          <button id="adv-close-button" @click="filter.toggleFilterPanel">
            Close
          </button>
        </div>
      </div>
      <div
        v-if="filter.errorMsg.length > 0"
        id="error-panel"
        class="error-info-panel"
      >
        <p class="error-info">{{ filter.errorMsg }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useFilterStore } from "@/stores/filter";
import { useSearchStore } from "@/stores/search";

const search = useSearchStore();
const filter = useFilterStore();

async function queryApiAdvanced() {
  if (
    !filter.allWords &&
    !filter.exactWords &&
    !filter.atleastOneWord &&
    !filter.withoutTheseWords &&
    !filter.title &&
    !filter.author &&
    !filter.publisher &&
    !filter.subject &&
    !filter.isbn
  ) {
    filter.errorMsg =
      "You must include the ISBN or text in at least other field!";
    return;
  }

  if (filter.isbn !== "") {
    if (filter.isbn.length >= 10 && filter.isbn.length <= 13)
      await search.queryApiISBN(filter.isbn);
    else filter.errorMsg = "The ISBN must be between 10 and 13 digits long.";
  } else await search.queryApiAdvanced();
}

function cancelClick() {
  filter.toggleFilterPanel();
  filter.reset();
  search.clear();
}

function clearClick() {
  filter.reset();
  search.clear();
}
</script>

<style scoped>
.advanced-search-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  padding-left: 2px;
  justify-content: left;
  width: 100%;
  gap: 10px;
}

.left-panel,
.middle-panel,
.right-panel {
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
  gap: 2px;
}

#left-panel-info,
#middle-panel-info,
#right-panel-info {
  text-align: left;
  margin: 0 10px;
  padding: 0 10px;
  font-size: 0.6rem;
}

.option-group {
  display: flex;
  flex-direction: row;
  justify-content: end;
}

.option-group input {
  margin: 0px 5px;
  font-size: 1rem;
}

.option-group label {
  display: flex;
  margin: 10px 0;
  font-size: 0.7rem;
}

.adv-option-group {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.left-panel input {
  margin-left: 10px;
  font-size: 1rem;
}

@media (min-width: 768px) {
  .advanced-search-container {
    flex-direction: row;
    width: 100%;
  }

  .option-group input {
    font-size: 0.7rem;
  }

  .option-group label {
    font-size: 0.7rem;
  }

  .adv-option-group {
    font-size: 0.7rem;
  }

  #language-label {
    text-align: left;
    font-size: 0.7rem;
  }
  #language-select {
    font-size: 0.7rem;
  }

  #left-panel-info,
  #middle-panel-info,
  #right-panel-info {
    font-size: 1rem;
  }

  #adv-cancel-button,
  #adv-clear-button,
  #adv-close-button,
  #adv-search-button {
    max-height: 25px;
    font-size: 0.6rem;
    margin: 0 10px;
  }
}
</style>
