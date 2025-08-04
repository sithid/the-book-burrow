<template>
  <div class="nyt-list-component">
    <div class="lists-panel">
      <h2>Best Seller Lists</h2>
      <div v-for="list in nytStore.nytBooklists" :key="list.list_name" class="list-item">
        <div 
          class="list-button"
          :class="{ active: selectedList?.list_name === list.list_name }"
          @click="selectList(list)"
        >
          {{ list.display_name }}
        </div>
      </div>
    </div>
    <div class="details-panel">
      <div v-if="selectedList" class="list-details">
        <h2>{{ selectedList.display_name }}</h2>
        <p class="list-description">{{ selectedList.list_name }}</p>
        <div v-if="selectedList.books && selectedList.books.length > 0" class="books-preview">
          <h3>Top Books:</h3>
          <div v-for="book in selectedList.books" class="book-item">
            <span class="rank">{{ book.rank }}.</span>
            <span class="title">{{ book.title }}</span>
            <span class="author">by {{ book.author }}</span>
          </div>
          <button class="view-all-btn" @click="viewFullList">
            View Full Results ({{ selectedList.books.length }} books)
          </button>
        </div>
      </div>
      <div v-else class="no-selection">
        <p>Select a list to view details</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useSearchStore } from "@/stores/search.js";
import { useRouter } from "vue-router";
import { useNytStore } from "@/stores/nyt";

const nytStore = useNytStore();
const search = useSearchStore();
const router = useRouter();

const selectedList = ref(null);

onMounted(() => {
  if (nytStore.nytBooklists.length > 0) {
    selectedList.value = nytStore.nytBooklists[0];
  }
});

const selectList = (list) => {
  selectedList.value = list;
  nytStore.activeNytList = list;
};

const viewFullList = async () => {
  if (selectedList.value) {
    nytStore.activeNytList = selectedList.value;
    router.push("/search");
    await search.loadNYTResults(selectedList.value);
  }
};
</script>

<style scoped>
.nyt-list-component {
  display: none;
}

@media (min-width: 1024px) {
  .nyt-list-component {
    display: flex;
    flex-direction: row;
    gap: 30px;
    height: 500px;
    border: 2px solid var(--color-offset);
    border-radius: 10px;
    overflow: hidden;
  }

  .lists-panel {
    flex: 0 0 300px;
    background-color: var(--color-primary);
    padding: 20px;
    overflow-y: auto;
    border-right: 2px solid var(--color-offset);
  }

  .lists-panel h2 {
    margin: 0 0 15px 0;
    color: var(--color-text);
    font-size: 1.2rem;
    text-align: center;
  }

  .list-item {
    margin-bottom: 10px;
  }

  .list-button {
    padding: 12px 15px;
    background-color: var(--color-secondary);
    border: 2px solid var(--color-offset);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    color: var(--color-text);
    font-size: 0.9rem;
    text-align: center;
  }

  .list-button:hover {
    background-color: var(--color-primary);
    transform: translateY(-2px);
  }

  .list-button.active {
    background-color: var(--color-primary);
    border-color: var(--color-text);
    font-weight: bold;
  }

  .details-panel {
    flex: 1;
    padding: 20px;
    background-color: var(--color-secondary);
    overflow-y: auto;
  }

  .list-details h2 {
    margin: 0 0 10px 0;
    color: var(--color-text);
    font-size: 1.4rem;
  }

  .list-description {
    color: var(--color-text);
    font-style: italic;
    margin-bottom: 20px;
    opacity: 0.8;
  }

  .books-preview h3 {
    margin: 20px 0 15px 0;
    color: var(--color-text);
    font-size: 1.1rem;
  }

  .book-item {
    display: flex;
    gap: 10px;
    margin-bottom: 8px;
    padding: 8px 0;
    border-bottom: 1px solid var(--color-offset);
  }

  .rank {
    font-weight: bold;
    color: var(--color-primary);
    min-width: 25px;
  }

  .title {
    font-weight: bold;
    color: var(--color-text);
    flex: 1;
  }

  .author {
    color: var(--color-text);
    font-style: italic;
    opacity: 0.8;
  }

  .view-all-btn {
    margin-top: 15px;
    padding: 10px 20px;
    background-color: var(--color-secondary);
    color: var(--color-text);

    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.3s ease;
  }

  .view-all-btn:hover {
    background-color: var(--color-primary);
    transform: translateY(-2px);
  }

  .no-selection {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: var(--color-text);
    font-style: italic;
    opacity: 0.7;
  }
}
</style>
