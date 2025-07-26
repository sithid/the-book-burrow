<template>
  <div class="book-card-large">
    <div class="book-detail-section cover">
      <img
        id="thumbnail"
        :src="`${book.activeBook.fmtThumbnail()}`"
        :alt="`Thumbnail of ${book.activeBook.title}`"
        @click="onThumbnailClicked"
      />
      <h1 class="title-header">{{ book.activeBook.title }}</h1>
    </div>
    <div class="book-detail-section">
      <div class="info-text">
        <span class="category-text">Written By</span>
        <span id="author">{{ book.activeBook.fmtAuthors() }}</span>
      </div>
      <div class="info-text">
        <span class="category-text">Published By</span>
        <span id="publisher">{{ book.activeBook.fmtPublisher() }}</span>
      </div>
      <div class="info-text">
        <span class="category-text"></span>
        <span id="publish-year">{{ book.activeBook.fmtPublishedDate() }}</span>
      </div>
    </div>
    <div class="book-detail-section">
      <div class="info-text">
        <p id="description">{{ book.activeBook.fmtDescription() }}</p>
      </div>
    </div>
    <div class="book-detail-section">
      <h1>Additional Information</h1>
      <div class="info-text" v-if="book.activeBook.subject">
        <span class="category-text">Genre/Subject</span>
        <span id="subject">{{ book.activeBook.subject.join() }}</span>
      </div>
      <div class="info-text" v-if="book.activeBook.averageRating">
        <span class="category-text">Average Rating</span>
        <span id="average-rating">{{ book.activeBook.averageRating }}</span>
      </div>
      <div class="info-text" v-if="book.activeBook.ratingCount">
        <span class="category-text">Rating Count</span>
        <span id="rating-count">{{ book.activeBook.ratingCount }}</span>
      </div>
      <div class="info-text" v-if="book.activeBook.maturityRating">
        <span class="category-text">Maturity Rating</span>
        <span id="maturity-rating">{{ book.activeBook.maturityRating }}</span>
      </div>
      <div class="info-text" v-if="book.activeBook.pageCount">
        <span class="category-text">Page Count</span>
        <span id="page-count">{{ book.activeBook.pageCount }}</span>
      </div>
      <div class="info-text" v-if="book.activeBook.printedPageCount">
        <span class="category-text">Printed Page Count</span>
        <span id="printed-page-count">{{
          book.activeBook.printedPageCount
        }}</span>
      </div>
      <div class="info-text" v-if="book.activeBook.language">
        <span class="category-text">Language</span>
        <span id="book-language">{{ book.activeBook.language }}</span>
      </div>
      <div class="info-text" v-if="book.activeBook.canonicalVolumeLink">
        <span class="category-text">Canonical Volume Link</span>
        <span id="book-canonical-link">
          <a :href="book.activeBook.canonicalVolumeLink" target="_blank">
            Here
          </a>
        </span>
      </div>
      <div class="info-text" v-if="book.activeBook.saleInfo" target="_blank">
        <span class="category-text">Sale Info</span>
        <span id="sale-info">
          <a :href="book.activeBook.saleInfo"> Here </a>
        </span>
      </div>
      <div class="info-text" v-if="book.activeBook.isbn13">
        <span class="category-text">ISBN_13</span>
        <span id="book-isbn13">{{ book.activeBook.isbn13 }}</span>
      </div>
      <div class="info-text" v-if="book.activeBook.isbn10">
        <span class="category-text">ISBN_10</span>
        <span id="book-isbn10">{{ book.activeBook.isbn10 }}</span>
      </div>
      <div class="info-text" v-if="book.activeBook.id">
        <span class="category-text">Id</span>
        <span id="book-id">{{ book.activeBook.id }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useBookStore } from "@/stores/book.js";

import { config } from "../config.js";
import { onMounted } from "vue";

const book = useBookStore();

function onThumbnailClicked() {
  if (book.activeBook.infoLink) window.open(book.activeBook.infoLink, "_blank");
  else
    config.FMT_PRINT_DEBUG(
      "BookDetailsComponent::onThumbnailClicked",
      "No infolink available for this book: " + book.activeBook.title
    );
}
</script>

<style scoped>
span {
  padding-left: 0px;
  font-size: 0.6rem;
  white-space: nowrap;
}

.book-card-large {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin: 20px auto;
  border-radius: 8px;
  color: var(--color-offset);
  background-color: var(--color-secondary);
}

.book-detail-section {
  display: flex;
  flex-direction: column;
  padding-top: 10px;
  gap: 3px;
  width: 100%;
  font-size: 0.6rem;
}

.cover {
  align-items: center;
  margin-bottom: 25px;
}

.info-text {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.category-text {
  padding-right: 10px;
  font-size: 0.6rem;
  text-align: left;
  white-space: nowrap;
  justify-content: space-between;
}

#infoLink {
  font-size: 0.5rem;
}

#description {
  white-space: wrap;
  text-align: justify;
}

#thumbnail {
  width: 100%;
  max-width: 250px;
  height: auto;
  object-fit: contain;
  border-radius: 8px;
  cursor: pointer;
}

@media (min-width: 768px) {
  span {
    font-size: 0.8rem;
  }

  .book-card-large {
    max-width: 600px;
  }

  .book-detail-section {
    flex-direction: column;
  }

  .category-text {
    font-size: 0.8rem;
  }

  #thumbnail {
    align-self: center;
  }

  #thumbnail:hover {
    transform: translateY(-5px);
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.35);
  }

  #infoLink {
    font-size: 0.8rem;
  }

  #description {
    font-size: 0.7rem;
  }
}
</style>
