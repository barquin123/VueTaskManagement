<script setup>
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();
const currentUserId = authStore.user._id;

// Define props and destructure
const { messages, youName, otherName, youimg, otherimg } = defineProps({
  messages: Array,
  youName: String,
  otherName: String,
  youimg: String,
  otherimg: String,
});


</script>

<template>
  <div class="chatContainer">
    <div class="chatBox">
      <div v-for="(msg, index) in messages" :key="index" :class="msg.sender === currentUserId ? 'youMsgContainer' : 'otherMsgContainer'">
        <div :Class = "msg.sender === currentUserId ? 'youMsg-row' : 'otherMsg-row'">
          <div :class="msg.sender === currentUserId ? 'youmMsg' : 'otherMsg'">
          <pre>{{ msg.text }}</pre>
          <small class="timestamp">{{ new Date(msg.timestamp).toLocaleTimeString() }}</small>
          </div>
          <div :class="msg.sender === currentUserId ? 'youProfile' : 'otherProfile'">
            <img :src="msg.sender === currentUserId ? youimg || 'https://www.w3schools.com/howto/img_avatar.png' : otherimg || 'https://www.w3schools.com/howto/img_avatar.png'" alt="Avatar" class="avatar">
            <div class="name">{{ msg.sender === currentUserId ? youName : otherName }}</div>
          </div>
      </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chatBox {
  height: 80vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}
.youMsgContainer, .otherMsgContainer {
  display: flex;
  align-items: flex-end;
  padding: 15px;
}
.youMsgContainer {
  justify-content: flex-end;
}
.otherMsgContainer {
  justify-content: flex-start;
}
.youmMsg, .otherMsg {
  background-color: #333;
  padding: 10px;
  border-radius: 10px;
  width:100%;
  max-width: 70vw;
}
.youmMsg pre, .otherMsg pre {
  text-wrap: inherit;
}
.timestamp {
  font-size: 10px;
  color: gray;
  text-align: right;
}
.youMsg-row{
  display: flex;
}
.otherMsg-row {
  display: flex;
  flex-direction: row-reverse;
}

.youProfile, .otherProfile {
  margin: 0 10px;
  text-align: center;
}
img.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
</style>
