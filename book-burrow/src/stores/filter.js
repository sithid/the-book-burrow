import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { watch } from "vue";
import { useUserStore } from "@/stores/user.js";
import { config } from "@/config.js";

export const useFilterStore = defineStore(
  "filter",
  () => {
    const user = useUserStore();

    // Advanced filter options. https://www.googleapis.com/books/v1/volumes?q=<string>
    const allWords = ref(""); // ./books/v1/volumes?q=term+term+term
    const exactWords = ref(""); // ./books/v1/volumes?q="test+test+test"
    const withoutTheseWords = ref(""); // ./books/v1/volumes?q=test+OR+test+OR+test
    const atleastOneWord = ref(""); // ./books/v1/volumes?q=-test+-test+-test

    const title = ref(""); // inTitle:title
    const author = ref(""); // inAuthor:author
    const publisher = ref(""); // inPublisher:publisher
    const subject = ref(""); // subject:subject
    const language = ref("any"); // &langRestrict=en
    const isbn = ref(""); // volumes?q=isbn:9781098147907

    const errorMsg = ref("");

    const filterPanelOpen = ref(false);

    const isPanelOpen = computed(() => {
      return filterPanelOpen.value;
    });

    const reset = () => {
      allWords.value = "";
      exactWords.value = "";
      withoutTheseWords.value = "";
      atleastOneWord.value = "";

      title.value = "";
      author.value = "";
      publisher.value = "";
      subject.value = "";

      language.value = "any";
      isbn.value = "";
      errorMsg.value = "";

      console.clear();
    };

    const toggleFilterPanel = () => {
      filterPanelOpen.value = !filterPanelOpen.value;
    };

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
        isbn,
      ],
      (newValues, oldValues) => {
        const newValueNotEmpty = newValues.some((value) => value !== "");
        if (isbn.value !== "") {
          errorMsg.value = "";
        } else if (newValueNotEmpty) {
          if (isbn.value.length < 10 || isbn.value.length > 13) {
            errorMsg.value = "ISBN must be between 10 and 13 characters long.";
          } else {
            errorMsg.value = "";
          }
        } else {
          errorMsg.value = "You must include text in at least one field!";
        }
      },
      { immediate: true }
    );
    return {
      allWords,
      exactWords,
      atleastOneWord,
      withoutTheseWords,

      title,
      author,
      publisher,
      subject,
      language,
      isbn,

      isPanelOpen,
      errorMsg,

      reset,
      toggleFilterPanel,
    };
  },
  {
    persist: {
      paths: [
        "allWords",
        "exactWords",
        "withoutTheseWords",
        "atleastOneWord",
        "title",
        "author",
        "publisher",
        "subject",
        "language",
        "filterPanelOpen",
      ],
    },
  }
);
