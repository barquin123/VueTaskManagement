<script setup>
import { RouterLink, RouterView } from 'vue-router'
import logo from '@/components/header/logo.vue'
import { watch } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { onMounted } from 'vue';

const AuthStore = useAuthStore();
const { user } = AuthStore;

//  watch (() => AuthStore.userData, (userData) => {
//      console.log(userData);
//  });
</script>

<template>
    <div class="wrapper">
    <logo />
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink v-if="user?.accountType == 'admin'" to="/addtask">Create Task</RouterLink>
        <RouterLink to="/messages">Messages</RouterLink>
        <RouterLink v-if="AuthStore.loggedIn" to="/login" @click.prevent = "AuthStore.logout">Log Out</RouterLink>
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
