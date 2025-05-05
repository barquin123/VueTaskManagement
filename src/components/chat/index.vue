<script setup>
import { ref, onMounted } from 'vue';
import { useChatStore } from '@/stores/chatStore';
import chatBox from '@/components/chat/chatBox.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const convoID = route.params.id;
const chatStore = useChatStore();
const convo = ref(null); // Store the conversation in a reactive reference
const yourMessages = ref([]);
const otherMessages = ref([]);
const sender = ref('');
const receiver = ref('');
const message = ref('');

onMounted(async () => {
    try {
        const fetchedConvo = await chatStore.fetchConversations(convoID);
        
        if (fetchedConvo.members.length === 2) {
            convo.value = fetchedConvo; // Store the fetched conversation in the ref
            receiver.value = convo.value.members[1].name;
            sender.value = convo.value.members[0].name;
            yourMessages.value = convo.value.messages.filter(msg => msg.sender === convo.value.members[0]._id);
            otherMessages.value = convo.value.messages.filter(msg => msg.sender === convo.value.members[1]._id);
        } else {
            console.error('Conversation members are not correctly populated');
        }
    } catch (err) {
        console.error('Error fetching conversation:', err);
    }
});

const sendMessage = async () => {
    if (!convo.value) {
        console.error('Conversation not loaded yet');
        return;
    }
    if (!message.value.trim()) {
        return; // Do nothing if the message is empty or just spaces
    }

    const messageData = {
        conversationId: convoID,
        senderId: convo.value.members[0]._id,
        receiverId: convo.value.members[1]._id,
        text: message.value,
    };
    console.log(messageData);
    try {
        await chatStore.sendMessage(messageData);
        yourMessages.value.push({ message: message.value, sender: convo.value.members[0]._id }); // <--- useless when using socket.io
        message.value = '';
    } catch (error) {
        console.error('Error sending message:', error);
    }
};
</script>

<template>
    <div class="othersName">
        <div class="otherName">{{ receiver }}</div>
        <!-- <div class="otherStatus">Online</div> -->
    </div>
    <chatBox 
        :youMsg="yourMessages" 
        :otherMsg="otherMessages" 
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
