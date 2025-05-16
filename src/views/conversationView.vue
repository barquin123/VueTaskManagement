<script setup>
import { ref, onMounted } from 'vue';
import ConversationList from '@/components/chat/conversationLists.vue';
import { useChatStore } from '@/stores/chatStore';
import { useAuthStore } from '@/stores/authStore';

const chatStore = useChatStore();
const authStore = useAuthStore();
const conversations = ref([]);

const userID = authStore.user._id;

onMounted(async () => {
    try {
        const fetchedConversation = await chatStore.fetchUserConversations(userID);
        // console.log('Fetched conversation:', fetchedConversation);
        if (fetchedConversation && fetchedConversation.success) {
            // Process fetched conversations to include other participants' names
            conversations.value = fetchedConversation.Conversation.map(conversation => {
                const otherMembers = conversation.members.filter(member => member._id !== userID);
                const currentUser = conversation.members.filter(member => member._id === userID);
                const currentUserName = currentUser.map(member => member.name).join(' ');
                const otherMemberNames = otherMembers.map(member => member.name).join(' ');
                const latestMessage = conversation.messages.reduce((latest, current) => {
                    return new Date(current.timestamp) > new Date(latest.timestamp) ? current : latest;
                }, conversation.messages[0]);
                return {
                    ...conversation,
                    otherMemberNames,
                    currentUserName,
                    latestMessage,
                };
            });
            console.log('Fetched conversations:', conversations.value);
        } else {
            console.error('No conversations found for this user.');
        }
    } catch (err) {
        console.error('Error fetching conversations:', err);
    }
});
</script>

<template>
    <ConversationList 
        :conversations="conversations"
    />
</template>

<style scoped>
</style>
