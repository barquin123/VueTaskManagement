<script setup>
import { RouterLink, RouterView } from 'vue-router'
import navigationElem from '@/components/header/nav.vue'
</script>

<template>
  <header>
    <navigationElem />
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
  header{
    background: #3e69bc;
  }
</style>
