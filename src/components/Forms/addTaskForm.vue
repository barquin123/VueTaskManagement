<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const members = ref([]);

onMounted(async () => {
  await userStore.fetchMembers();
  members.value = userStore.users;
});

const todayDate = ref(new Date().toISOString().split('T')[0]); // yyyy-mm-dd format
const taskName = ref('');
const taskDescription = ref('');
const taskDueDate = ref('');
const taskPriority = ref('');
const taskAssignedTo = ref('');
const taskStatus = ref('Pending');

    // Handle form submission
const submitForm = () => {
    const taskData = {
        taskName: taskName.value,
        taskDescription: taskDescription.value,
        taskDueDate: taskDueDate.value,
        taskPriority: taskPriority.value,
        taskStatus: taskStatus.value,
        assignedTo: taskAssignedTo.value
    };
    console.log(taskData);
};
</script>

<template>
    <div class="addtask" @submit.prevent="submitForm">
        <form action="addTask">
            <label for="taskName">Task Name:</label>
            <input type="text" id="taskName" v-model="taskName" required>
            <div class="clearfix"></div>
            <label for="taskDescription">Task Description:</label>
            <textarea type="text" id="taskDescription" v-model="taskDescription" required></textarea>
            <div class="clearfix"></div>
            <label for="taskDueDate">Task Due Date:</label>
            <input type="date" id="taskDueDate" v-model="taskDueDate" name="taskDueDate" :min="todayDate" required>
            <div class="clearfix"></div>
            <label>Task Priority</label>
            <div class="taskPriorityContainer">
                <div>
                    <input type="radio" id="Low" v-model="taskPriority" value="Low">
                    <label for="Low">Low</label>
                </div>
                <div>
                    <input type="radio" id="Medium" v-model="taskPriority" value="Medium">
                    <label for="Medium">Medium</label>
                </div>
                <div>
                    <input type="radio" id="High" v-model="taskPriority" value="High">
                    <label for="High">High</label>
                </div>
            </div>
            <div class="clearfix"></div>
            <label for="assignedTo">Assigned To:</label>
            <select id="assignedTo" v-model="taskAssignedTo" required>
                <option v-for="(member, index) in members" :key="index" :value="member._id">{{ member.name }}</option>
            </select>
            <label for="taskStatus">Task Status:</label>
            <select  id="taskStatus" v-model="taskStatus" required>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
            </select>
            <div class="clearfix"></div>
            <input type="submit" value="Submit">
        </form>
    </div>
</template>

<style scoped>
    input, textarea, select{
        display: block;
        width: 100%;
        padding: 10px;
        border-radius: 8px;
        background: none;
        color: #fff;
        border: 1px solid #555;
        outline: none;
    }
    .taskPriorityContainer{
        display: flex;
        align-items: center;
        gap: 30px;
        height: auto;
    }
    .taskPriorityContainer label{
        margin-left: 10px;
    }
    input[type="radio"]{
        width: auto;
        display: unset;
    }
    input[type="date"]{
        color-scheme: dark;
    }
    input[type="submit"]{
        font-weight: 700;
        max-width: 150px;
        margin-top: 15px;
        background: #47af3e;
        border: none;
    }
    textarea{
        max-height: 50vh;
        min-height: 25vh;
        resize: vertical;
    }
    select option{
        background: #333;
        color: #fff;
    }
    .addtask{
        max-width: 70vw;
        margin: auto;
        padding: 30px;
    }
</style>