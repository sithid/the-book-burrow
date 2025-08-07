<template>
  <div class="paged-bookshelf-component">
    <div v-if="user.bookshelfs.length > 0" class="has-bookshelfs">
      <div class="bookshelf-paging-container">
        <button @click="prevBookshelf" :disabled="currentBookshelfIndex === 0">
          Previous
        </button>

        <h1 id="bookshelf-displayed-info">
          Displaying bookshelf {{ currentBookshelfIndex + 1 }} of
          {{ user.bookshelfs.length }} bookshelfs
        </h1>

        <button @click="nextBookshelf" :disabled="currentBookshelfIndex >= user.bookshelfs.length - 1">
          Next
        </button>
      </div>
      <div class="bookshelf-info-container">
        <SingleBookshelfComponent :bookshelf="user.bookshelfs[currentBookshelfIndex]">
        </SingleBookshelfComponent>
      </div>
    </div>
    <div v-else class="empty-bookshelfs">
      <h1>No bookshelfs found.</h1>
      <p>Click the button below to reset your bookshelfs to default.</p>
      <button @click="user.resetBookshelfsToDefault">Reset</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import SingleBookshelfComponent from "../components/SingleBookshelfComponent.vue";
import { useUserStore } from "@/stores/user";

const user = useUserStore();
const currentBookshelfIndex = ref(0);

const prevBookshelf = () => {
  if (currentBookshelfIndex.value > 0) {
    currentBookshelfIndex.value--;
  }
};

const nextBookshelf = () => {
  if (currentBookshelfIndex.value < user.bookshelfs.length - 1) {
    currentBookshelfIndex.value++;
  }
};
</script>

<style>
.paged-bookshelf-component {
  display: flex;
  flex-direction: column;
  background-color: var(--color-offset);
}

.has-bookshelfs {
  display: flex;
  flex-direction: column;
}

.bookshelf-paging-container {
  box-sizing: content-box;
  display: flex;
  margin: 0 10px;
  flex-direction: row;
  justify-content: space-between;
  height: 50px;
  background-color: var(--color-secondary);
  border: 10px solid var(--color-offset);
  border-top: none;
  
}

.bookshelf-info-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.empty-bookshelfs {
  display: flex;
  flex-direction: column;
  background-color: var(--color-secondary);
  text-align: center;
}

#bookshelf-displayed-info {
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
  color: var(--color-offset);
  font-size: 0.8em;
}

@media (min-width: 768px) {
  .paged-bookshelf-component {
    flex-direction: row;
    justify-content: center;
    margin: 0 10px;

  }

  #bookshelf-displayed-info {
    font-size: 1.2em;
    margin: 10px 5px;
  }
}
</style>
