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

    const sendMessage = async (newMessage) => {
        chatLoading.value = true;
        error.value = null;
        try {
            const response = await axios.post('http://localhost:5000/api/messages', newMessage)
            conversation.value.push(response.data);
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
        fetchConversations
    };
})