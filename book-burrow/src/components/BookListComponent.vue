<template>
  <div class="book-list-container">
    <ul id="book-list" v-if="books && books.length > 0">
      <li v-for="book in books" :key="book.id" class="list-item">
        {{ book.fmtTitle() }}
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
.book-list-container {
  display: flex;
  flex-direction: column;
  justify-content: right;
}

.list-item {
  font-size: .9rem;
  text-align: left;
  text-wrap: nowrap;
  color: var(--color-offset);
  font-weight: bold;
}

@media (min-width: 768px) {
  .list-item {
    font-size: .9rem;
    text-align: left;
  }
}
</style>
