<template>
  <div class="header">
    <h1>The Book Burrow</h1>
    <nav class="nav-menu">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/search">Search</RouterLink>
      <RouterLink to="/bookshelfs">Bookshelfs</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <button @click="preferencesBtnOnClick" class="preferences-button">
        <i class="fa fa-bars" aria-hidden="true"></i>
      </button>
    </nav>
  </div>
  <div>
    <DataPreferencesPanel v-if="user.isPrefsPanelOpen" class="prefs-panel">
    </DataPreferencesPanel>
  </div>
  <div class="content-panel">
    <RouterView />
  </div>
  <div class="footer">
    <p>&copy; 2025 The Book Burrow. All rights reserved.</p>
  </div>
</template>

<script setup>
import DataPreferencesPanel from "./components/DataPreferencesPanel.vue";
import { RouterLink, RouterView } from "vue-router";
import { useFilterStore } from "./stores/filter.js";
import { useUserStore } from "./stores/user.js";
import { config } from "@/config.js";
import { onMounted } from "vue";

const user = useUserStore();
const filter = useFilterStore();

const preferencesBtnOnClick = () => {
  user.togglePrefsPanel();

  if (user.isPrefsPanelOpen) {
    if (filter.isPanelOpen) {
      filter.toggleFilterPanel();
    }
  }
};

</script>

<style scoped>
.header {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  color: var(--color-text);
  background-color: var(--color-primary);
  margin: 10px 10px 10px 10px;
}

.footer {
  background-color: var(--color-offset);
  color: #fff;
  text-align: center;
  padding: 10px;
}

h1 {
  text-align: center;
  text-wrap: nowrap;
}

.nav-menu {
  display: flex;
  flex-direction: row;
  font-size: 1.5rem;
  gap: 15px;
  justify-content: space-around;
}

.nav-menu a {
  font-size: 1rem;
  justify-content: right;
  align-content: center;
  color: white;
}

@media (min-width: 768px) {
  .header {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 20px 10px;
  }

  h1 {
    margin: 0 0;
  }

  .nav-menu a {
    font-size: 0.8rem;
    justify-content: right;
    align-content: center;
    color: white;
  }
}
</style>
