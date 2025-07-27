<template>
  <div class="book-card-large">
    <div class="book-detail-section cover">
      <img
        id="thumbnail"
        :src="`${book.ActiveBook.fmtThumbnail()}`"
        :alt="`Thumbnail of ${book.ActiveBook.title}`"
        @click="onThumbnailClicked"
      />
      <h1 class="title-header">{{ book.ActiveBook.title }}</h1>
    </div>
    <div class="book-detail-section">
      <div class="info-text">
        <span class="category-text">Written By</span>
        <span id="author">{{ book.ActiveBook.fmtAuthors() }}</span>
      </div>
      <div class="info-text">
        <span class="category-text">Published By</span>
        <span id="publisher">{{ book.ActiveBook.fmtPublisher() }}</span>
      </div>
      <div class="info-text">
        <span class="category-text"></span>
        <span id="publish-year">{{ book.ActiveBook.fmtPublishedDate() }}</span>
      </div>
    </div>
    <div class="book-detail-section">
      <div class="info-text">
        <p id="description">{{ book.ActiveBook.fmtDescription() }}</p>
      </div>
    </div>
    <div class="book-detail-section">
      <h1 class="title-header">Additional Information</h1>
      <div class="info-text" v-if="book.ActiveBook.subject">
        <span class="category-text">Genre/Subject</span>
        <span id="subject">{{ book.ActiveBook.subject.join() }}</span>
      </div>
      <div class="info-text" v-if="book.ActiveBook.averageRating">
        <span class="category-text">Average Rating</span>
        <span id="average-rating">{{ book.ActiveBook.averageRating }}</span>
      </div>
      <div class="info-text" v-if="book.ActiveBook.ratingCount">
        <span class="category-text">Rating Count</span>
        <span id="rating-count">{{ book.ActiveBook.ratingCount }}</span>
      </div>
      <div class="info-text" v-if="book.ActiveBook.maturityRating">
        <span class="category-text">Maturity Rating</span>
        <span id="maturity-rating">{{ book.ActiveBook.maturityRating }}</span>
      </div>
      <div class="info-text" v-if="book.ActiveBook.pageCount">
        <span class="category-text">Page Count</span>
        <span id="page-count">{{ book.ActiveBook.pageCount }}</span>
      </div>
      <div class="info-text" v-if="book.ActiveBook.printedPageCount">
        <span class="category-text">Printed Page Count</span>
        <span id="printed-page-count">{{
          book.ActiveBook.printedPageCount
        }}</span>
      </div>
      <div class="info-text" v-if="book.ActiveBook.language">
        <span class="category-text">Language</span>
        <span id="book-language">{{ book.ActiveBook.language }}</span>
      </div>
      <div class="info-text" v-if="book.ActiveBook.canonicalVolumeLink">
        <span class="category-text">Canonical Volume Link</span>
        <span id="book-canonical-link">
          <a :href="book.ActiveBook.canonicalVolumeLink" target="_blank">
            Here
          </a>
        </span>
      </div>
      <div class="info-text" v-if="book.ActiveBook.saleInfo" target="_blank">
        <span class="category-text">Sale Info</span>
        <span id="sale-info">
          <a :href="book.ActiveBook.saleInfo"> Here </a>
        </span>
      </div>
      <div class="info-text" v-if="book.ActiveBook.isbn13">
        <span class="category-text">ISBN_13</span>
        <span id="book-isbn13">{{ book.ActiveBook.isbn13 }}</span>
      </div>
      <div class="info-text" v-if="book.ActiveBook.isbn10">
        <span class="category-text">ISBN_10</span>
        <span id="book-isbn10">{{ book.ActiveBook.isbn10 }}</span>
      </div>
      <div class="info-text" v-if="book.ActiveBook.id">
        <span class="category-text">Id</span>
        <span id="book-id">{{ book.ActiveBook.id }}</span>
      </div>
    </div>
    <div class="book-detail-section">
      <h1 class="title-header">Options</h1>
      <label for="add-to-bookshelf"></label>
    </div>
  </div>
</template>

<script setup>
import { useBookStore } from "@/stores/book.js";

import { config } from "../config.js";
import { onMounted } from "vue";

const book = useBookStore();

function onThumbnailClicked() {
  if (book.ActiveBook.infoLink) window.open(book.ActiveBook.infoLink, "_blank");
  else
    config.FMT_PRINT_DEBUG(
      "BookDetailsComponent::onThumbnailClicked",
      "No infolink available for this book: " + book.ActiveBook.title
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
