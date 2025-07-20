<template>
  <div class="book-card-large">
    <div class="book-detail-section cover-title">
      <img
        id="thumbnail"
        :src="`${props.book.fmtThumbnail()}`"
        :alt="`Thumbnail of ${props.book.title}`"
        @click="onThumbnailClicked"
      />
      <h1 class="title-header">{{ props.book.title }}</h1>
    </div>
    <div class="book-detail-section">
      <div class="info-text">
        <span class="category-text">Written By</span>
        <span id="author">{{ props.book.fmtAuthors() }}</span>
      </div>
      <div class="info-text">
        <span class="category-text">Published By</span>
        <span id="publisher">{{ props.book.publisher }}</span>
      </div>
      <div class="info-text">
        <span class="category-text"></span>
        <span id="publish-year">{{ props.book.fmtPublishedDate() }}</span>
      </div>
    </div>
    <div class="book-detail-section">
      <div class="info-text">
        <p id="description">{{ props.book.fmtDescription() }}</p>
      </div>
    </div>
    <div class="book-detail-section">
      <h1>Additional Information</h1>
      <div class="info-text" v-if="props.book.id">
        <span class="category-text">Id</span>
        <span id="book-id">{{ props.book.id }}</span>
      </div>
      <div class="info-text" v-if="props.book.subject">
        <span class="category-text">Genre/Subject</span>
        <span id="subject">{{ props.book.subject.join() }}</span>
      </div>
      <!--
          xid
          xselflink
          xtitle        
          xauthors      
          subject
          xpublisher
          xpublishedDate
          xdescription  
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
    </div>
  </div>
</template>

<script setup>
import { GoogleBook } from "../GoogleBook.js";
import { config } from "../config.js";

import { onMounted } from "vue";

const props = defineProps({
  book: {
    type: GoogleBook,
    required: true,
  },
});

function onThumbnailClicked() {
  if (props.book.infoLink) window.open(props.book.infoLink, "_blank");
  else
    config.FMT_PRINT_DEBUG(
      "BookDetailsComponent::onThumbnailClicked",
      "No infolink available for this book: " + props.book.title
    );
}
</script>

<style scoped>
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

.cover-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 25px;
  width: 100%;
}

.book-detail-section {
  display: flex;
  flex-direction: column;
  padding-top: 10px;
  gap: 3px;
  font-size: 0.6rem;
}

.info-text {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0;
}

.category-text {
  padding-right: 10px;
  font-size: 0.6rem;
  text-align: left;
  white-space: nowrap;
}

span {
  padding-left: 0px;
  font-size: 0.6rem;
  white-space: nowrap;
}

/*
 * Because of specificity I like all of my id selectors at the end so I can use class selectors to set
 * general element styles and then target a spefic element with specific style changes I don't want
 * shared by every one of those elements.
 */
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
  .book-card-large {
    max-width: 600px;
  }

  .book-detail-section {
    flex-direction: column;
  }

  .category-text {
    font-size: 0.8rem;
  }

  span {
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
