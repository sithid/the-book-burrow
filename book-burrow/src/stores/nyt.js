import { defineStore } from "pinia";
import { ref } from "vue";
import { config } from "@/config.js";

export const useNytStore = defineStore(
  "nyt",
  () => {
    const nytBooklists = ref([]);
    const activeNytList = ref(null);
    const lastFetched = ref(null);

    const clearBooklists = () => {
      nytBooklists.value = [];
    };

    const clearActiveNytList = () => {
      activeNytList.value = null;
    };

    const clearAll = () => {
      clearBooklists();
      clearActiveNytList();
      lastFetched.value = null;
    }

    const fetchNytBooklists = async () => {
      try {
        const response = await fetch(
          `https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=${config.NYT_API_KEY}`
        );

        const data = await response.json();

        config.FMT_PRINT_DEBUG(
          "NYT Store",
          `Fetched ${data.results.lists.length} book lists`
        );

        for( let i = 0; i < data.results.lists.length; i++ ) {
          const list = data.results.lists[i];
          list.fmtTitle = () => {
            return `${list.display_name} (${list.list_name})`;
          };

          config.FMT_PRINT_DEBUG(
            "NYT Store",
            `Formatted title for list: ${list.fmtTitle()}`
          );
          
        }   
        if (!data.results.lists || data.results.lists.length === 0) {
          config.FMT_PRINT_DEBUG(
            "NYT Store",
            "No book lists found", 
            true
          );
          return;
        }

        nytBooklists.value = data.results.lists;
        activeNytList.value = data.results.lists[0];
        lastFetched.value = new Date();
        
        config.FMT_PRINT_DEBUG(
          "NYT Store",
          `NYT book lists fetched successfully at ${lastFetched.value.toLocaleString()}`
        );  

        config.FMT_PRINT_DEBUG(
          "NYT Store",
          `Active NYT list set to: ${activeNytList.value.fmtTitle()}`
        );

      } catch (error) {

        config.FMT_PRINT_DEBUG(
          "NYT Store",
          `Error fetching NYT book lists: ${error.message}`,
          true
        );

        nytBooklists.value = [];
      }
    };

    return {
      nytBooklists,
      activeNytList,
      lastFetched,
      clearBooklists,
      clearActiveNytList,
      clearAll,
      fetchNytBooklists,
    };
  },
  {
    persist: {
      paths: ["nytBooklists", "activeNytList", "lastFetched"],
      serializer: {
        serialize: (data) => JSON.stringify(data),
        deserialize: (data) => JSON.parse(data),
      },
    },
  }
);
