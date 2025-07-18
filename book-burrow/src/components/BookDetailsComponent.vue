<template>
  <div class="book-details-view">
    <h1>Book Details View</h1>
    <p>{{ props.book.title }}</p>
  </div>
</template>

<script setup>
import { GoogleBook } from "../GoogleBook.js";

const props = defineProps({
  book: {
    type: GoogleBook,
    required: true
  }
});

</script>

<style scoped>
.book-details-view {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin: 0 0;
  color: black;
  background-color: var(--color-offset);
}
</style>
