<template>
  <div class="book-list-container">
    <ul id="book-list" v-if="books && books.length > 0">
      <li v-for="book in books" :key="book.id" class="list-item">
        {{ book.title }}
      </li>
    </ul>
    <p v-else>No books found in this bookshelf.</p>
  </div>
</template>

<script setup>
import { useUserStore } from "@/stores/user.js";

const user = useUserStore();

const props = defineProps({
  books: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
.list-item {
  text-align: left;
}

@media (min-width: 768px) {
  .list-item {
    text-align: left;
  }
}
</style>
