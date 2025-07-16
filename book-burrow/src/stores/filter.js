import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { watch } from "vue";
import { storeToRefs } from "pinia";

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
  const language = ref('en'); // &langRestrict=en

  const errorMsg = ref("");

  const filterPanelOpen = ref(false);

  const isPanelOpen = computed(() => {
    return filterPanelOpen.value;
  });

  watch(
    [
      allWords,
      exactWords,
      withoutTheseWords,
      atleastOneWord,
      title,
      author,
      publisher,
      subject,
    ],
    (newValues, oldValues) => {
      const anyFilterValueIsNotEmpty = newValues.some((value) => value !== "");

      if (anyFilterValueIsNotEmpty) {
        errorMsg.value = ""; // Clear the error message
      }
    },
    { deep: false }
  );

  function reset() {
    allWords.value = "";
    exactWords.value = "";
    withoutTheseWords.value = "";
    atleastOneWord.value = "";

    title.value = "";
    author.value = "";
    publisher.value = "";
    subject.value = "";

    language.value = 'en';
    errorMsg.value = "";

    console.clear();
  }

  function toggleFilterPanel() {
    filterPanelOpen.value = !filterPanelOpen.value;
    reset();
  }

  return {
    allWords, // search across a wide range of fields that includes all of the words
    exactWords, // includes this exact phrase
    atleastOneWord, // includes atleast one of the words in this input "volumes?q=harry+OR+potter+OR+sorcerers+OR+stone"
    withoutTheseWords, // does not include these words ex: volumes?q=-harry+-potter

    title, // books with this in the title
    author, // books with this in the author
    publisher, // books with this in the publisher
    subject, // books with this in the subject (genre)
    language, // languages available from google api
    errorMsg,

    reset,
    isPanelOpen,
    toggleFilterPanel,
  };
});
