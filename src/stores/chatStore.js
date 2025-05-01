import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

export const useChatStore = defineStore("chat", () => {
    const conversation = ref([]);
    const chatLoading = ref(false);
    const error = ref(null);
    const chatAdded = ref(false);


    const fetchConversations = async (id) => {
        chatLoading.value = true;
        error.value = null;
        try {
            const response = await axios.get(`http://localhost:5000/api/conversations/${id}`)
            conversation.value = response.data;
            console.log(response.data)
            // return response.data;
        } catch (err) {
            error.value = 'error fetching data';
            console.log(err);
        } finally {
            chatLoading.value = false;
        }
    };

    const startConversation = async (userId, recipientId) => {
        try {
            const response = await axios.post(`/api/start-conversation`, { userId, recipientId });
            const newConversation = response.data.conversation;
    
            // Optionally add it to the conversation list in the store
            if (!conversation.value.some(c => c._id === newConversation._id)) {
                conversation.value.push(newConversation);
            }

            console.log('New conversation started:', newConversation);
    
            return newConversation; // Return for navigation or use
        } catch (err) {
            console.error('Error starting conversation:', err);
        }
    };

    const sendMessage = async (newMessage) => {
        chatLoading.value = true;
        error.value = null;
        try {
            const response = await axios.post('http://localhost:5000/api/send', newMessage)
            conversation.value.push(response.data);
            console.log(response.data)
            chatAdded.value = true;
        } catch (err) {
            error.value = 'error adding message';
            console.log(err);
        } finally {
            chatLoading.value = false;
        }
    }

    return {
        chats,
        chatLoading,
        error,
        chatAdded,
        fetchConversations,
        sendMessage,
        startConversation
    };
})