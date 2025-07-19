<template>
  <div class="book-card-large">
    <div class="book-detail-section">
      <h3 id="book-card-title">{{ props.book.title }}</h3>
      <img :src="`${props.book.fmtThumbnail()}`" @click="onThumbnailClicked" />
    </div>
    <!--
          id,
          selflink
          xtitle        
          xauthors      
          subject
          publisher
          publishedDate
          description  
          industryIdentifiers::isbn_10/isbn_13
          pageCunt
          printedPageCount
          averageRating
          ratingCOunt
          maturityRating
          imageLinks {object}
          language
          infoLink
          canonicalVolumeLink
          saleInfo
        -->
    <div class="book-detail-section">
      <p class="info-text">
        <span class="category-text">Written By</span>
        <span id="author">{{ props.book.fmtAuthors() }}</span>
      </p>
      <p class="info-text">
        <span class="category-text">Published By:</span>
        <span id="publisher">{{ props.book.publisher }}</span>
      </p>
      <p class="info-text">
        <span class="category-text">Publish Year:</span>
        <span id="publish-year">{{ props.book.fmtPublishedDate() }}</span>
      </p>
    </div>
    <div class="book-detail-section">
      <p class="category-text">Description:</p>
      <p class="info-text">
        <span id="description">{{ props.book.fmtDescription() }}</span>
      </p>
    </div>
    <div class="book-detail-section">
      <p class="category-text">Additional Information:</p>
    </div>
  </div>
</template>

<script setup>
import { GoogleBook } from "../GoogleBook.js";
import { onMounted } from "vue";

const props = defineProps({
  book: {
    type: GoogleBook,
    required: true,
  },
});
</script>

<style scoped>
.book-card-large {
  display: flex;
  flex-direction: column;
  padding: 0 10px 10px 10px;
  color: var(--color-offset);
  background-color: var(--color-secondary);
}

.book-detail-section {
  display: flex;
  flex-direction: column;
  padding-top: 10px;
  gap: 3px;
  font-size: 0.6rem;
}

#book-card-title {
  font-size: 0.9rem;
  text-align: center;
  font-weight: bold;
  color: var(--color-offset);
  background-color: var(--color-priamry);
}


.info-text {
  display: flex;
  flex-direction: row;
  margin: 0;
}

.category-text {
  padding-left: 10px;
  font-size: 0.6rem;
  text-align: left;
  white-space: nowrap;
}

#description {
  padding-left: 10px;
  font-size: 0.6rem;
  text-align: justify;
}

#author,
#publisher,
#publish-year {
  padding-left: 10px;
  padding-right: 10px;
  font-size: 0.6rem;
  white-space: nowrap;
}

@media (min-width: 768px) {
  .book-card-mini {
    padding-left: 10px;
    padding-right: 10px;
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

  .category-text {
    font-size: 0.8rem;
  }

  #author,
  #publisher,
  #publish-year {
    font-size: 0.8rem;
  }

  #description {
    font-size: 0.7rem;
  }
}
</style>
