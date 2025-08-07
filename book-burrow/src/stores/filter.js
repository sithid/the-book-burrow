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
    const language = ref(user.defaultLanguage); // &langRestrict=en
    const isbn = ref(""); // volumes?q=isbn:9781098147907

    const errorMsg = ref("");

    const filterPanelOpen = ref(false);

    const isPanelOpen = computed(() => {
      return filterPanelOpen.value;
    });

    const clearAll = () => {
      allWords.value = "";
      exactWords.value = "";
      withoutTheseWords.value = "";
      atleastOneWord.value = "";

      title.value = "";
      author.value = "";
      publisher.value = "";
      subject.value = "";

      language.value = user.defaultLanguage;
      isbn.value = "";
      errorMsg.value = "";
    };

    const toggleFilterPanel = () => {
      filterPanelOpen.value = !filterPanelOpen.value;
    };

    const anyFilterHasValue = computed(() => {
      return (
        allWords.value !== "" ||
        exactWords.value !== "" ||
        withoutTheseWords.value !== "" ||
        atleastOneWord.value !== "" ||
        title.value !== "" ||
        author.value !== "" ||
        publisher.value !== "" ||
        subject.value !== ""
      );
    });

    /*
     * Feature: Use a regular expression to validate user input and either prevent the invalid input or inform the user about it.
     * This function validates an ISBN number, allowing both 10-digit and 13-digit formats.
     */
    const isValidISBN = (value) => {
      const cleanedValue = value.replace(/[- ]/g, "").replace(/[a-zA-Z]/g, "");
      return /^\d{10}$|^\d{13}$/.test(cleanedValue);
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
        const newIsbnValue = newValues[8];
        const oldIsbnValue = oldValues[8];

        if (newIsbnValue && isValidISBN(newIsbnValue)) {
          if (!isValidISBN(oldIsbnValue) || newIsbnValue !== oldIsbnValue) {
            allWords.value = "";
            exactWords.value = "";
            withoutTheseWords.value = "";
            atleastOneWord.value = "";
            title.value = "";
            author.value = "";
            publisher.value = "";
            subject.value = "";
            language.value = user.defaultLanguage;
            errorMsg.value = "";
          }
        } else {
          if (
            anyFilterHasValue.value ||
            (newIsbnValue && newIsbnValue !== "")
          ) {
            if (
              newIsbnValue &&
              newIsbnValue.length > 0 &&
              !isValidISBN(newIsbnValue)
            ) {
              errorMsg.value = "ISBN must be 10 or 13 digits.";
            } else {
              errorMsg.value = "";
            }
          } else {
            errorMsg.value = "You must have text in at least one field!";
          }
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
      anyFilterHasValue,
      errorMsg,

      clearAll,
      toggleFilterPanel,
      isValidISBN,
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
