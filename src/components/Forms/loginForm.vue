<script setup>
import { ref, watch } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import router from '@/router';

const email = ref('');
const password = ref('');
const EmailErrorMessage = ref('');
const passwordErrorMessage = ref('');
const authStore = useAuthStore();
const errorMessage = ref('');

const { error } = authStore;

watch(() => authStore.loggedIn, (loggedIn) => {
            if (loggedIn){
                router.push('/tasks');
            }
        }
    ) 

const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};
const validatePassword = (password) => {
    /**
     * - Valid: "Password1", "Secure123", "Abcdefg8"
     * - Invalid: "password" (no uppercase letter), "PASSWORD" (no lowercase letter),
     *            "Pass123" (less than 8 characters), "Pass@123" (contains special character).
     */
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
    return re.test(password);
};


const submitForm = async () => {
    const loginData = {
        email: email.value,
        password: password.value
    };
    if(!validateEmail(loginData.email)){
        EmailErrorMessage.value = 'invalid email format!'
    } else {
        try{
            await authStore.login(loginData);
            if(authStore.loggedIn){
                router.push('/tasks');
            }
        }catch(error){
            errorMessage.value = 'login failed, please try again!'; 
            passwordErrorMessage.value = 'login failed, please try again!';
            EmailErrorMessage.value = 'login failed, please try again!';
        }
    }
    
    
};
</script>

<template>
    <div class="loginForm">
        <h1>Log In</h1>
        <form action="login" @submit.prevent="submitForm">
            <label for="Email">Email:</label>
            <input required :class="{error: EmailErrorMessage !== ''}" type="text" id="Email" v-model="email" name="Email" autocomplete = "off">
            <p class='errorText' v-if="EmailErrorMessage !== ''">{{EmailErrorMessage}}</p>
            <div class = "clearfix"></div>

            <label for="password">Password:</label>
            <input required :class="{error: passwordErrorMessage !== ''}" type="password" id="password" v-model="password" name="password">
            <p class="errorText" v-if="passwordErrorMessage !== ''">{{ passwordErrorMessage }}</p>
            <div class = "clearfix"></div>

            <input class="submitBtn" type="submit" value="Submit">
        </form>
    </div>
</template>

<style scoped>
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
        outline: none;
    }
    .submitBtn{
        max-width: 150px;
        font-weight:700;
        border: none;
        background: #47af3e;
    }
</style>