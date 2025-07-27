<template>
  <div class="bookshelf-side-panel">
    <h1>{{ props.bookshelf.name }}</h1>
    <BookListComponent :books="props.bookshelf.books"></BookListComponent>
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
.bookshelf-side-panel {
  background-color: var(--color-secondary);
}

@media (min-width: 768px) {
  .bookshelf-side-panel {
  }
}
</style>
