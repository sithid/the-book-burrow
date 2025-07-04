<template>
  <section class="book-card-mini">
    <p id="book-card-title">{{ props.book.title }}</p>
    <div class="book-card-details">
      <img :src="`${props.book.fmtThumbnail()}`" />
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
  </section>
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
.book-card-mini {
  display: flex;
  flex-direction: column;
  padding: 10px;
  color: var(black);
  background-color: var(--color-secondary);
}

.book-card-mini img {
  width: 75%;
  align-self: center;
  max-width: 200px;
  max-height: 250px;
}

#book-card-title {
  font-size: 1rem;
  text-align: left;
  font-weight: bold;
  align-self: center;
  color: var(--color-offset);
}

.book-card-details {
  display: flex;
  flex-direction: column;
  gap: 15px;
}


.book-info {
  display: flex;
  flex-direction: column;
  align-items: left;
}

.info-text {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 0;
}

#author,
#publish-year {
  padding-left: 10px;
  font-size: 0.8rem;
}

#description {
  padding-left: 10px;
  padding-right: 10px;
  font-size: 0.6rem;
  text-align: justify;
}

@media (min-width: 768px) {
  .book-card-mini {
    padding-left: 10px;
    padding-right: 10px;
  }

  .book-card-details {
    display: flex;
    flex-direction: row;
    gap: 0;
  }

  #book-card-title {
    font-size: .9rem;
    text-align: left;
  }

  #author,
  #publish-year {
    padding-left: 10px;
    font-size: .8rem;
  }

  #description {
    text-align: justify;
    padding-left: 10px;
    font-size: 0.7rem;
  }
}
</style>
