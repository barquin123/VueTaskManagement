<script setup>
import { ref, onMounted, watch } from 'vue';
import { useChatStore } from '@/stores/chatStore';
import { useAuthStore } from '@/stores/authStore';
import { useRoute, useRouter } from 'vue-router';
import chatBox from '@/components/chat/chatBox.vue';


const route = useRoute();
const router = useRouter();
const convoID = route.params.id;
const authStore = useAuthStore();
const chatStore = useChatStore();
const convo = ref(null);
const messages = ref([]);
const sender = ref('');
const receiver = ref('');
const message = ref('');
const currentUserId = authStore.user._id;

const scrollToBottom = () => {
  setTimeout(() => {
    const chatBox = document.querySelector('.chatBox');
    if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;
  }, 100);
};

onMounted(async () => {
  try {
    const fetchedConvo = await chatStore.fetchConversations(convoID);
    if (fetchedConvo.members.length === 2) {
      convo.value = fetchedConvo;
      const sortedMessages = [...convo.value.messages].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

      const senderMember = fetchedConvo.members.find(m => m._id === currentUserId);
      const receiverMember = fetchedConvo.members.find(m => m._id !== currentUserId);

      sender.value = senderMember.name;
      receiver.value = receiverMember.name;
      messages.value = sortedMessages.map(m => ({
        text: m.text,
        timestamp: m.timestamp,
        sender: m.sender._id,
        receiver: m.receiver._id,
      }));

      scrollToBottom();
    }
  } catch (err) {
    console.error('Error fetching conversation:', err);
  }
});

watch(
    () => chatStore.conversation?.messages,
    (newMessages) => {
        if (newMessages) {
            messages.value = newMessages.map((m) => ({
                text: m.text,
                timestamp: m.timestamp,
                sender: m.sender._id,
                receiver: m.receiver._id,
            }));
            scrollToBottom();
        }
    },
    { deep: true }
);

const sendMessage = async () => {
  if (!convo.value || !message.value.trim()) return;

  const senderMember = convo.value.members.find(m => m._id === currentUserId);
  const receiverMember = convo.value.members.find(m => m._id !== currentUserId);

  const messageData = {
    conversationId: convoID,
    senderId: senderMember._id,
    receiverId: receiverMember._id,
    text: message.value.trim(),
  };

  try {
    await chatStore.sendMessage(messageData);
    // yourMessages.value.push({ text: message.value.trim(), timestamp: new Date().toISOString() });
    message.value = '';
    scrollToBottom();
  } catch (error) {
    console.error('Error sending message:', error);
  }
};

const handleClick = () => {
  router.push({ name: 'Chat List' });
};
</script>

<template>
  <div class="othersName">
    <div class="otherNameinner"> <span @click="handleClick()"> < </span> {{ receiver }}</div>
  </div>
  <chatBox 
    :messages = "messages"
    :youName="sender" 
    :otherName="receiver" 
  />
  <div class="chantInputs">
    <form @submit.prevent="sendMessage">
      <input 
        type="text" 
        placeholder="Type a message..." 
        class="chatInput" 
        v-model="message"
      />
      <button type="submit" class="sendBtn">Send</button>
    </form>
  </div>
</template>

<style scoped>
.othersName {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  background: #3e69bc;
  position: relative;
}
.chantInputs {
  position: relative;
}
.otherNameinner{
  padding-left: 20px;
}
.otherNameinner span{
  font-size: 20px;
  font-weight: 700;
  position: absolute;
  top: 6px;
  left: 15px;
}
.chatContainer {
  width: 100%;
}
.sendBtn {
  position: absolute;
  right: 0;
  top: 0;
  padding: 11px 20px;
  background-color: #3e69bc;
  color: white;
  border: none;
  cursor: pointer;
}
.chatInput {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  outline: none;
}
</style>
