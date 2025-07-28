<template>
  <div class="bookshelf-panel">
    <div class="bookshelf-content">
      <h1>{{ props.bookshelf.name }}</h1>
      <BookListComponent :books="props.bookshelf.books"></BookListComponent>
    </div>
  </div>
</template>

<script setup>
import BookListComponent from "./BookListComponent.vue";
import { Bookshelf } from "@/Bookshelf.js";
import { useUserStore } from "@/stores/user.js";

const user = useUserStore();

const props = defineProps({
  bookshelf: {
    type: Bookshelf,
    required: true,
  },
});
</script>

<style scoped>
.bookshelf-panel {
  display: flex;
  background-size: contain;
  flex-direction: column;
  background-color: var(--color-secondary);
  background-image: url("../assets/bookshelf-art.jpg");
}

.bookshelf-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--color-secondary-transparent);
}

@media (min-width: 768px) {
  .bookshelf-panel {
    display: flex;
    padding: 10px;
    min-height: 100%;
  }
  .bookshelf-content {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    padding: 20px;
    margin: 20px;
    flex-grow: 1;
  }
}
</style>
