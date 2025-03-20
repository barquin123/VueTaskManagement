<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import navigationElem from '@/components/header/nav.vue'
const userData = {
  name: 'John Doe',
  userStatus: 'member'
}
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
  main{
    padding: 20px;
  }
  header{
    background: #3e69bc;
  }
</style>
