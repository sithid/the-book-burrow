<template>
  <div class="header">
    <h1>The Book Burrow</h1>
    <nav class="nav-menu">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">Bookshelf</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <button @click="preferencesBtnOnClick" class="preferences-button">
        <i class="fa fa-user" aria-hidden="true"></i>
      </button>
    </nav>
  </div>
  <div class="content-panel">
    <div v-if="filterStore.isPanelOpen" class="filter-options-panel">
      <h1>testing all this stuff to see what works and what doesnt this is just temp text bleh bleh bleh</h1>
    </div>
    <RouterView />
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { useFilterStore } from '@/stores/filter';

const filterStore = useFilterStore();

function preferencesBtnOnClick() {
  console.log("Preferences button clicked!");
}
</script>

<style scoped>
.header {
  display: flex;
  flex-direction: column;
  margin: 0 0;
  width: 100%;
  background-color: lightblue;
  border-bottom: 2px solid black;
}

h1 {
  text-align: center;
}

.nav-menu {
  display: flex;
  flex-direction: row;
  font-size: 1.5rem;
  gap: 15px;
  justify-content: center;
}

.preferences-button,
.filter-button {
  max-width: 100px;
  max-height: 50px;
}

.filter-options-panel {
  position: fixed;
  top: 165px;
  width: 280px;
  height: 100%;
  background-color: #f0f0f0;
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

  .nav-menu {
    font-size: 1.5rem;
    justify-content: right;
    gap: 35px;
  }
  
  .preferences-button {
    margin-left: 0;
  }

  .filter-button {
    margin-left: 50px;
    margin-right: 0;
  }

  .filter-options-panel {
    top: 135px;
  }
}
</style>