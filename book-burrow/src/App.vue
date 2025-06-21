<template>
  <div class="header">
    <h1>The Book Burrow</h1>
    <nav class="nav-menu">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/bookshelf">Bookshelf</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <button @click="preferencesBtnOnClick" class="preferences-button">
        <i class="fa fa-user" aria-hidden="true"></i>
      </button>
    </nav>
  </div>
  <div class="content-panel">
    <div v-if="filterStore.isPanelOpen" class="filter-options-panel">
      <p>testing all this stuff to see what works and what doesnt this is just temp text bleh bleh bleh</p>
    </div>
    <RouterView />
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { ref, onMounted, onBeforeUnmount } from "vue";

import { useFilterStore } from '@/stores/filter';
import { useScreenStore } from '@/stores/screen';

const filterStore = useFilterStore();
const screen = useScreenStore();

function preferencesBtnOnClick() {
  console.log("Preferences button clicked!");
}

onMounted(() => {
  screen.updateScreenDimensions()
  window.addEventListener("resize", screen.updateScreenDimensions);
});

onBeforeUnmount(() => {
  screen.updateScreenDimensions()
  window.removeEventListener("resize", screen.updateScreenDimensions);
});

</script>

<style scoped>
.header {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 100%;
  background-color: coral;
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

.preferences-button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-position: center;
  background-size: cover;
  margin-bottom: 20px;
}

.filter-options-panel {
  position: fixed;
  top: 185px;
  left: 10px;
  width: 280px;
  height: 100%;
  background-color: white;
  border: 1px solid black;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.3);
  padding: 20px;
  z-index: 10;
}

@media (min-width: 768px) {
  .header {
    flex-direction: row;
    justify-content:  space-around;
    align-items: center;
    padding: 20px 20px;
  }
  
  h1 {
    margin: 0 0;
  }

  .nav-menu a{
    font-size: .8rem;
    justify-content: right;
    align-content: center;
    gap: 35px;
  }

  .filter-options-panel {
    top: 180px;
    left: 10px;
  }
}
</style>