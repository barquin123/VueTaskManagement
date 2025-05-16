<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
import navigationElem from '@/components/header/nav.vue'
import { computed } from 'vue';

const route = useRoute();

const hideHeader = computed(() => {
  return route.path === '/login' ||
         route.path === '/login/' ||
         route.path.startsWith('/chat')
})
</script>

<template>
  <header v-if="!hideHeader">
    <navigationElem />
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
  main{
    padding: 20px;
  }
  header{
    background: #3e69bc;
  }
</style>
