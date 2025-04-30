<script setup>
import { ref, onMounted, watch } from 'vue';
import chatBox from '@/components/chat/chatBox.vue';
</script>

<template>
    <div class="othersName">
        <div class="otherName">John Doe</div>
        <div class="otherStatus">Online</div>
    </div>
    <chatBox />
    <div class="chantInputs">
            <form>
                <input type="text" placeholder="Type a message..." class="chatInput" v-model="message" @keyup.enter="sendMessage">
                <button type="submit" class="sendBtn">Send</button>
            </form>
        </div>
</template>

<style scoped>
.othersName{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px;
    background: #3e69bc;
}
.chantInputs{
    position: relative;
}
.chatContainer{
    width: 100%;
}
.sendBtn{
    position: absolute;
    right: 0;
    top: 0;
    padding: 11px 20px;
    background-color: #3e69bc;
    color: white;
    border: none;
    cursor: pointer;
}
.chatInput{
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    margin-bottom: 10px;
    outline: none;
}
</style>