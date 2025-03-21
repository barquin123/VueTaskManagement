<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';

// Define form fields
const name = ref('');
const email = ref('');
const password = ref('');
const accountType = ref('member'); // Default value is 'member'

// Get the authStore instance
const authStore = useAuthStore();
const router = useRouter(); // To redirect after registration

// Submit handler
const submitForm = async () => {
  const credentials = {
    name: name.value,
    email: email.value,
    password: password.value,
    accountType: accountType.value,
  };
  try {
    await authStore.register(credentials);
    if (authStore.user) {
      // Redirect to login or homepage upon successful registration
      router.push('/tasks');
    }
  } catch (error) {
    console.log('Registration failed:', error);
    errorMessage.value = 'Registration failed, please try again!'; 
  }
};
</script>

<template>
    <div class="registerForm">
      <h1>Registration</h1>
      <form @submit.prevent="submitForm">
        <label for="name">Name</label>
        <input type="text" id="name" v-model="name" name="name" required />
  
        <div class="clearfix"></div>
  
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" name="email" required />
  
        <div class="clearfix"></div>
  
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" name="password" required />
  
        <div class="clearfix"></div>
  
        <label for="accountType">Account Type</label>
        <select v-model="accountType" name="accountType" id="accountType">
          <option value="member">Member</option>
          <option value="admin">Admin</option>
        </select>
  
        <div class="clearfix"></div>
  
        <input class="submitBtn" type="submit" value="Submit" />
      </form>
    </div>
  </template>

<style scoped>
h1{
    font-weight: 700;
    text-align: center;
}
.registerForm{
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