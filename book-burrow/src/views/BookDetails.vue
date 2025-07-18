<template>
  <div class="book-details-view">
    <h1>Book Details View</h1>
    <BookDetailsComponent></BookDetailsComponent>
  </div>
</template>

<script setup>
import BookDetailsComponent from "../components/BookDetailsComponent.vue";

</script>
<style>
.book-details-view {
  display: flex;
  flex-direction: column;
  text-align: center;
  background-color: var(--color-offset);
}
</style>
