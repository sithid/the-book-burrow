<template>
  <div class="bookshelf-panel">
    <div class="bookshelf-content">
      <h1 id="bookshelf-name">{{ props.bookshelf.name }}</h1>
      <BookListComponent :books="props.bookshelf.books"></BookListComponent>
      <button @click="clearAllBooks">Clear All Books</button>
    </div>

  </div>
</template>

<script setup>
import BookListComponent from "./BookListComponent.vue";
import { Bookshelf } from "@/Bookshelf.js";

const props = defineProps({
  bookshelf: {
    type: Bookshelf,
    required: true,
  },
});

const clearAllBooks = () => {
  props.bookshelf.clearBooks();
  config.FMT_PRINT_DEBUG(
    "SingleBookshelfComponent::clearAllBooks",
    `Cleared all books from bookshelf: ${props.bookshelf.name}`
  );
};
</script>

<style scoped>
.bookshelf-panel {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image: url("../assets/bookshelf-art.jpg");
  background-color: var(--color-primary);
  background-size: cover;
  color: var(--color-offset);
  padding: 5px;
}

.bookshelf-content {
  display: flex;
  flex-direction: column;
}

h1 {
  background-color: var(--color-secondary);
  text-align: center;
  padding-top: 0;
}

@media (min-width: 768px) {
  .bookshelf-panel {
    flex-direction: row;
    background-size: contain;
    width: 100%;
    height: 100vh;
    margin: 0 auto;
    padding: 15px;
  }

  .bookshelf-content {
    width: 100%;
    height: 100%;
  }
}
</style>
