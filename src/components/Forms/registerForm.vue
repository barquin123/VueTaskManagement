<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';

// Define form fields
const registername = ref('');
const registeremail = ref('');
const registerpassword = ref('');
const emailErrorMessage = ref('');
const passwordErrorMessage = ref('');
const existingUserErrorMessage = ref('');
const success = ref(false)
const accountType = ref('member'); // Default value is 'member'

// Get the authStore instance
const authStore = useAuthStore();
const router = useRouter(); // To redirect after registration

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};
const validatePassword = (password) => {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
  return re.test(password);
};

// Submit handler
const submitForm = async () => {
  const credentials = {
    name: registername.value,
    email: registeremail.value,
    password: registerpassword.value,
    accountType: accountType.value,
  };

  if(!validateEmail(credentials.email)){
    emailErrorMessage.value = 'Invalid email format!';
    return;
  } else if (!validatePassword(credentials.password)){
    passwordErrorMessage.value = 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number.';
    return;
  } else {
    passwordErrorMessage.value = "";
    emailErrorMessage.value = "";
    try {
      await authStore.register(credentials);
      if (authStore.user) {
        success.value = true;
      }
    } catch (error) {
      existingUserErrorMessage.value = authStore.errorMessage;
    }
  }
};
</script>

<template>
    <div class="registerForm">
      <h1>Registration</h1>
      <form @submit.prevent="submitForm" v-if="!success">
        <label for="registername">Name</label>
        <input type="text" id="registername" v-model="registername" name="registername" required />
  
        <div class="clearfix"></div>
  
        <label for="registeremail">Email</label>
        <input :class="{ error: emailErrorMessage !== '' || existingUserErrorMessage !== '' }" type="text" id="registeremail" v-model="registeremail" name="registeremail" required />
        <p class="errorText" v-if="emailErrorMessage !== ''">{{emailErrorMessage}}</p>
        <p class="errorText" v-if="existingUserErrorMessage !== ''">{{ existingUserErrorMessage }}</p>
  
        <div class="clearfix"></div>
  
        <label for="password">Password</label>
        <input :class="{error: passwordErrorMessage !== ''}" type="password" id="registerpassword" v-model="registerpassword" name="registerpassword" required />
        <p class="errorText" v-if="passwordErrorMessage !== ''">{{passwordErrorMessage}}</p>
  
        <div class="clearfix"></div>
  
        <label for="accountType">Account Type</label>
        <select v-model="accountType" name="accountType" id="accountType">
          <option value="member">Member</option>
          <option value="admin">Admin</option>
        </select>
  
        <div class="clearfix"></div>
  
        <input class="submitBtn" type="submit" value="Submit" />
      </form>
      <p v-if="success" class="successText">Registration successful! You can now log in.</p>
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
select:focus{
  outline: none; 
}
select option{
    background: #000;
    color: #fff;
}
input, select{
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
    input.error{
    border: 1px solid rgb(233, 61, 61);
}  
.errorText{
    color: rgb(233, 61, 61);
    font-size: 14px;
    margin-top: -10px;
    margin-bottom: 10px;
    text-transform: uppercase;
}
.successText {
  text-align: center;
}
</style>