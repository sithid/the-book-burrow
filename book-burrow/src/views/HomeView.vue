<template>
  <div class="home">
    <h1>Welcome</h1>
    <MinimalSearchComponent></MinimalSearchComponent>
  </div>
</template>

<script setup>
import MinimalSearchComponent from "../components/MinimalSearchComponent.vue";
</script>

<style scoped>
.home {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background-color: var( --color-primary );
}
</style>
