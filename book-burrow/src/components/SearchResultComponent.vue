<template>
  <section v-if="props.book" class="book-card-mini">
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
  </section>
</template>

<script setup>
import { useBookStore } from "@/stores/book.js";
import { GoogleBook } from "@/GoogleBook.js";
import { useRouter } from "vue-router";

const bookStore = useBookStore();
const router = useRouter();

const props = defineProps({
  book: {
    type: GoogleBook,
    required: true,
  },
});

function onThumbnailClicked() {
  bookStore.setActiveBook(props.book);
  router.push("/details");
}
</script>

<style scoped>
.book-card-mini {
  display: flex;
  flex-direction: column;
  color: var(--color-offset);
  background-color: var(--color-secondary);
  border: 10px solid var(--color-offset);

  max-width: 1200px;
}

.book-card-mini img {
  width: 75%;
  align-self: center;
  border-radius: 8px;
  cursor: pointer;
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
    padding: 20px;
  }

  .book-card-mini img {
    max-width: 200px;
    max-height: 250px;
  }

  .book-card-mini img:hover {
    transform: translateY(-5px);
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.35);
  }

  .book-card-details {
    display: flex;
    flex-direction: row;
    gap: 5px;
  }

  #book-card-title {
    font-size: 0.9rem;
    text-align: left;
  }

  #author,
  #publish-year {
    padding-left: 10px;
    font-size: 0.8rem;
  }

  #description {
    text-align: justify;
    padding-left: 10px;
    padding-right: 10px;
    font-size: 0.7rem;
  }
}
</style>
