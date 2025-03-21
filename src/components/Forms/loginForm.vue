<script setup>
import { ref, watch } from 'vue';
import { useAuthStore } from '@/stores/authStore';

const email = ref('');
const password = ref('');

const authStore = useAuthStore();

watch(() => authStore.loggedIn, (loggedIn) => {
            if (loggedIn){
                console.log('User logged in');
            }
        }
    ) 

const submitForm = async () => {
    const loginData = {
        email: email.value,
        password: password.value
    };
    console.log(loginData);
    
    await authStore.login(loginData);
};
</script>

<template>
    <div class="loginForm">
        <h1>Log In</h1>
        <form action="login" @submit.prevent="submitForm">
            <label for="username">Email:</label>
            <input type="email" id="Email" v-model="email" name="Email">
            <div class = "clearfix"></div>
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" name="password">
            <div class = "clearfix"></div>
            <input class="submitBtn" type="submit" value="Submit">
        </form>
    </div>
</template>

<style scoped>
h1{
    font-weight: 700;
    text-align: center;
}
    .loginForm{
        width: 100%;
    }
    form{
        width: 100%;
    }
    input{
        display: block;
        width: 100%;
        padding: 10px;
        background:none;
        border: 1px solid #ccc;
        border-radius: 5px;
        margin-bottom: 15px;
        color: #fff;
    }
    .submitBtn{
        max-width: 150px;
        font-weight:700;
        border: none;
        background: #47af3e;
    }
</style>