
<script setup>
    import { ref, computed } from 'vue'
    import loginForm from '../components/Forms/loginForm.vue'
    import registerForm from '../components/Forms/registerForm.vue'
    const activeForm = ref("LogInForm");
    const changeForm = (form) => {
        activeForm.value = form;  
        if (activeForm.value === 'registerForm') {
            document.querySelector('.NoteforRegistrations').style.opacity = '1';
            document.querySelector('.NoteforLogIn').style.opacity = '0';
            document.querySelector('.NoteforLogIn').style.zIndex = '-1';
            document.querySelector('.NoteforRegistrations').style.zIndex = '1';
        } else {
            document.querySelector('.NoteforLogIn').style.opacity = '1';
            document.querySelector('.NoteforRegistrations').style.opacity = '0';
            document.querySelector('.NoteforRegistrations').style.opacity = '0';
            document.querySelector('.NoteforRegistrations').style.zIndex = '-1';
            document.querySelector('.NoteforLogIn').style.zIndex = '1';
        }
    }
    const activeFormClass = computed(() => {
        return activeForm.value === "LogInForm" ? "LogInForm" : "registerForm";
        });
    
</script>
<template>
    <div class="loginWrapper">
        <div class="inner" :class="activeFormClass">
            <loginForm :active="activeForm === 'LogInForm'" />
            <span class="NoteforLogIn">Welcom Back!<span class="registerBtn" @click="changeForm('registerForm')">No Account Register Here</span></span>
            <span class="NoteforRegistrations">You Can Register Here! <span class="signInBtn" @click="changeForm('LogInForm')">Sign In Here</span></span>
            <registerForm :active="activeForm === 'registerForm'"/>
        </div>
    </div>
</template>

<style scoped>
    .NoteforLogIn, .NoteforRegistrations{
        opacity: 0;
        position: absolute;
        transition: all 0.5s ease;
        width:50%;
    }
    .NoteforLogIn{
        opacity: 1;
    }
    .NoteforLogIn {
        left: 50%;
        padding: 20px;
        font-weight: 700;
        font-size: 40px;
        text-align: center;
    }
    .NoteforLogIn span{
        display: block;
        font-size: 15px;
        margin-top: 10vh;
        cursor: pointer;
    }

    .NoteforRegistrations {
        right: 50%;
        padding: 20px;
        font-weight: 700;
        font-size: 40px;
        text-align: center;
        z-index: -1;
    }
    .NoteforRegistrations span{
        display: block;
        font-size: 15px;
        margin-top: 10vh;
        cursor: pointer;
    }

    .loginWrapper .inner{
        display: flex;
        gap: 25px;
        border:1px solid #d2d2d2;
        max-width: 60vw;
        margin: auto;
        padding: 30px;
        border-radius: 15px;
        position: relative;
    }
    .loginWrapper{
        width: 100%;
        height:95vh;
        align-content: center;
    }
    .loginWrapper .inner::before{
        background: #3e69bc;
        position: absolute;
        content: "";
        width: 50%;
        height: 100%;
        top: 0;
        transition: 0.5s ease all;
    }
    .loginWrapper .inner.registerForm::before{
        transform: translateX(0%);
        left: 0;
        border-radius:15px 0px 0px 15px;
    }
    .loginWrapper .inner.LogInForm::before{
        transform: translateX(100%);
        left: 0;
        border-radius:0 15px 15px 0;
    }
</style>