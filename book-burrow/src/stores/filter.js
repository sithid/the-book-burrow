import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useFilterStore = defineStore("filter", () => {
  // Advanced filter options. https://www.googleapis.com/books/v1/volumes?q=<string>
  const allWords = ref(""); // ./books/v1/volumes?q=term+term+term
  const exactWords = ref(""); // ./books/v1/volumes?q="test+test+test"
  const withoutTheseWords = ref(""); // ./books/v1/volumes?q=test+OR+test+OR+test
  const atleastOneWord = ref(""); // ./books/v1/volumes?q=-test+-test+-test

  const title = ref(""); // inTitle:title
  const author = ref(""); // inAuthor:author
  const publisher = ref(""); // inPublisher:publisher
  const subject = ref(""); // subject:subject

  const filterPanelOpen = ref(false);

  const isPanelOpen = computed(() => {
    return filterPanelOpen.value;
  });

  const toggleFilterPanel = computed(() => {
    filterPanelOpen.value = !filterPanelOpen.value;

    allWords.value = "";
    exactWords.value = "";
    withoutTheseWords.value = "";
    atleastOneWord.value = "";

    title.value = "";
    author.value = "";
    publisher.value = "";
    subject.value = "";
  });

  return {
    allWords, // search across a wide range of fields that includes all of the words
    exactWords, // includes this exact phrase
    atleastOneWord, // includes atleast one of the words in this input "volumes?q=harry+OR+potter+OR+sorcerers+OR+stone"
    withoutTheseWords, // does not include these words ex: volumes?q=-harry+-potter

    title, // books with this in the title
    author, // books with this in the author
    publisher, // books with this in the publisher
    subject, // books with this in the subject (genre)

    isPanelOpen,
    toggleFilterPanel,
  };
});
