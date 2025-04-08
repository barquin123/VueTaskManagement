<script setup>
import { useAuthStore } from '@/stores/authStore';
import { ref, onMounted, watchEffect, watch } from 'vue';
import { useTaskStore } from '@/stores/taskStore';

const authStore = useAuthStore();
const taskStore = useTaskStore();

const { user } = authStore;

defineProps({
    assignedBy: String,
    assignedTo: String,
    taskTitle: String,
    taskDescription: String,
    taskPriority: String,
    taskDueDate: String,
    taskCreatedDate: String,
    taskLink: String,
    userStatus: String,
    taskDescriptionLink: String,
    taskId: String,
    assassignedToId: String,
    assignedById: String
})

const formatDate = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString(); // YYYY-MM-DD format
};
</script>

<template>
    <tr>
        <td><a :href="'/profile/'+assignedById">{{ assignedBy }}</a></td>
        <td><a :href="'/profile/'+assassignedToId">{{ assignedTo }}</a></td>
        <td><a :href="'/description/' + taskId" class="taskLink">{{ taskTitle }}</a></td>
        <td>
            <select>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
            </select>
        </td>
        <td>{{ taskPriority }}</td>
        <td>{{ formatDate(taskDueDate) }}</td>
        <td>{{ formatDate(taskCreatedDate) }}</td>
        <td v-if="user.accountType=='admin'" class="adminButtons">
            <a class="adminButton edit" :href="'/task/edit/' + taskId">Edit</a>
            <span class="adminButton delete" @click.prevent = "taskStore.deleteTask(taskId)">Delete</span>
        </td>
    </tr>
</template>

<style scoped>
    th, td {
        padding: 10px;
        border: 1px solid #fff;
    }
    table{
        border: 1px solid #fff;
        width: 100%;
        min-width: 700px;
    }
    a{
        text-decoration: none;
        color: #fff;
    }

    select{
        background:none ;
        color: #fff;
        border: none;
        width: 100%;
        outline: none;
    }
    select option{
        background: #000;
        color: #fff;
    }
    .adminButtons{
        display: flex;
        gap: 10px;
        justify-content: center;
    }
    .adminButton{
        padding: 5px 10px;
        cursor: pointer;
    }
    .adminButton.edit{
        background: #1faef0f6;
    }
    .adminButton.delete{
        background: #f53939f6;
    }
    .taskLink{
        width: 100%;
        height: 100%;
        display: block;
    }
    a:hover{
        text-decoration: underline;
    }
</style>