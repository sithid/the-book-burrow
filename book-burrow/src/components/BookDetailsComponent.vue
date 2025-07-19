<template>
  <div class="book-details-view">
    <h1>Book Details Component</h1>
    <p>{{ props.book.title }}</p>

    <p id="book-card-title">{{ props.book.title }}</p>
    <div class="book-card-details">
      <img :src="`${props.book.fmtThumbnail()}`" @click="onThumbnailClicked" />
      <section class="book-info">
        <p class="info-text">
          <span id="author">
            {{ props.book.fmtAuthors() }}
          </span>
          <span id="publish-year">
            {{ props.book.fmtPublishedDate() }}
          </span>
        </p>
        <article class="info-text">
          <span id="description">
            {{ props.book.fmtDescription() }}
          </span>
        </article>
      </section>
    </div>
  </div>
</template>

<script setup>
import { GoogleBook } from "../GoogleBook.js";
import { onMounted } from 'vue';

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
  background-color: var(--color-secondary);
}
</style>
