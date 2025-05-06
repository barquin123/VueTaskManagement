import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
import { io } from "socket.io-client";

export const useChatStore = defineStore("chat", () => {
    const conversation = ref([]);
    const chatLoading = ref(false);
    const error = ref(null);
    const chatAdded = ref(false);
    const socket = ref(io('http://localhost:5000'))

    const fetchConversations = async (id) => {
        chatLoading.value = true;
        error.value = null;
        try {
            const response = await axios.get(`http://localhost:5000/api/convo/conversations/${id}`)
            conversation.value = response.data;
            socket.value.emit('joinRoom', id);
            return response.data;
        } catch (err) {
            error.value = 'error fetching data';
            console.log(err);
        } finally {
            chatLoading.value = false;
        }
    };

    const startConversation = async (userId, recipientId) => {
        try {
            const response = await axios.post(`http://localhost:5000/api/convo/start-conversation`, { userId, recipientId });
            const newConversation = response.data.conversation;
    
            // Optionally add it to the conversation list in the store
            if (!conversation.value.some(c => c._id === newConversation._id)) {
                conversation.value.push(newConversation);
            }

            // console.log('New conversation started:', newConversation);
    
            return newConversation._id; // Return for navigation or use
        } catch (err) {
            console.error('Error starting conversation:', err);
        }
    };

    const fetchUserConversations = async (userId) => {
        chatLoading.value = true;
        error.value = null;
        try {
            const response = await axios.get(`http://localhost:5000/api/convo/${userId}`)
            conversation.value = response.data;
            console.log(response.data)
        } catch (err) {
            error.value = 'error fetching data';
            console.log(err);
        } finally {
            chatLoading.value = false;
        }
    }

    const sendMessage = async (newMessage) => {
        chatLoading.value = true;
        error.value = null;
        try {
            const response = await axios.post('http://localhost:5000/api/convo/send', newMessage)
            if (conversation.value && conversation.value._id === newMessage.conversationId) {
                if (!conversation.value.messages) {
                    conversation.value.messages = [];
                }
                conversation.value.messages.push(response.data);
            }
            chatAdded.value = true;
        } catch (err) {
            error.value = 'error adding message';
            console.log(err);
        } finally {
            chatLoading.value = false;
        }
    }

    socket.value.on('newMessage', (message) => {
        // Find the conversation in the store
        if (conversation.value && conversation.value._id === message.conversationId) {
            // Push the message to the store's conversation messages
            fetchConversations(conversation.value._id);
            console.log('New message received:', message);
        }
    });


    return {
        chatLoading,
        error,
        chatAdded,
        fetchConversations,
        sendMessage,
        startConversation,
        fetchUserConversations,
        conversation
    };
})