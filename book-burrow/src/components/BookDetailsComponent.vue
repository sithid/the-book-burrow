<template>
  <div class="book-card-large">
    <h3 id="book-card-title">{{ props.book.title }}</h3>
    <div class="book-card-details">
      <img :src="`${props.book.fmtThumbnail()}`" @click="onThumbnailClicked" />
      <!--
          id,
          selflink
          title        
          authors      
          subject
          publisher
          publishedDate
          description  
          industryIdentifiers::isbn_10/isbn_13
          pageCOunt
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
      <section class="book-info">
        <p class="info-text">
          <span id="author">
            {{ props.book.fmtAuthors() }}
          </span>
          <span id="publish-year">
            {{ props.book.fmtPublishedDate() }}
          </span>
        </p>
        <p class="info-text">
          <span id="description">
            {{ props.book.fmtDescription() }}
          </span>
        </p>
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
.book-card-large {
  display: flex;
  flex-direction: column;
  padding: 0 10px 10px 10px;
  color: black;
  background-color: var(--color-secondary);
}

#book-card-title {
  font-size: .9rem;
  text-align: center;
  font-weight: bold;
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
    gap: 5px;
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
    padding-right: 10px;
    font-size: 0.7rem;
  }
}
</style>
