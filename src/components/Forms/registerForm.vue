<script setup>
</script>

<template>
    <div class="registerForm">
        <h1>Registration</h1>
        <form action="register">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username">
            <div class="clearfix"></div>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password">
            <div class="clearfix"></div>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email">
            <div class="clearfix"></div>
            <input class="submitBtn" type="submit" value="Submit">
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