<script setup>
import { RouterLink, RouterView } from 'vue-router'
import logo from '@/components/header/logo.vue'
</script>

<template>
    <div class="wrapper">
    <logo />
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
</template>

<style scoped>
.wrapper {
    width:100%;
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding: 10px 20px;
}
nav {
    display:flex;
    gap: 20px;
}
nav a{
    color:#fff;
    text-decoration:none;
    font-size:18px;
}
</style>
