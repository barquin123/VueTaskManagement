<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
import navigationElem from '@/components/header/nav.vue'

const route = useRoute();

const userData = {
  name: 'John Doe',
  userStatus: 'member'
}

const hideHeader = ['/login', '/login/'];
</script>

<template>
  <header v-if = "!hideHeader.includes(route.path)">
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
