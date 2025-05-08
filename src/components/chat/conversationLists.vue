<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const {conversations} = defineProps({
    conversations: Array,
})

const handleClick = (convoId) => {
    const id = convoId
    router.push({ name: 'chat', params: { id } })
}
</script>

<template>
    <h2>conversation list</h2>
    <div v-for = "(convo, index) in conversations" :key="index">
        <div class="chatMessageContainer" @click="handleClick(convo._id)">
            <div class="avatar">
                <img src=https://www.w3schools.com/howto/img_avatar.png alt="Avatar" class="avatar" width="100" height="100">
            </div>
            <div class="messageContainer">
                <div class="membername">
                    {{ convo.otherMemberNames }}
                </div>
                <div class="lastMessage">
                    {{ convo.latestMessage.text }}
                </div>
                <div class="timeStamp">
                    {{ new Date(convo.latestMessage.timestamp).toLocaleTimeString() }}
                </div>
            </div>
        </div>
    </div>
    
</template>

<style scoped>
.avatar{
    border-radius: 50%;
}
.chatMessageContainer{
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    gap: 30px;
}
.membername{
    font-weight: 700;
    color: #ffff;
    font-size: 20px;
}
.lastMessage{
    color: #918b8b;
    font-size: 14px;
}
.timeStamp{
    color: #918b8b;
    font-size: 12px;
    margin-top: 5px;
}
</style>