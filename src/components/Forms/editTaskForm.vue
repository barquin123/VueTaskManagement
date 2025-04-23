<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useTaskStore } from '@/stores/taskStore';
import { useUserStore } from '@/stores/userStore';
import router from '@/router';

const taskStore = useTaskStore();
const userStore = useUserStore();

const members = ref([]);
const route = useRoute();
const taskID = route.params.id;
const taskName = ref('');
const taskDescription = ref('');
const taskPriority = ref('');
const taskDueDate = ref('');
const taskAssignedTo = ref('');
const taskStatus = ref('Pending');
const updatedByUser = ref('');
const todayDate = ref(new Date().toISOString().split('T')[0]);
const loading = ref(false);


onMounted( async () => {
    await userStore.fetchMembers();
    members.value = userStore.users;
  try{
    const task = await taskStore.fetchTaskById(taskID);
    console.log(task);
    taskName.value = task.taskName;
    taskDescription.value = task.taskDescription;
    taskPriority.value = task.priorityLevel;
    taskDueDate.value = task.dueDate.split("T")[0];
    taskAssignedTo.value = task.assignedTo._id;
    taskStatus.value = task.status;
    if (task.updatedBy) {
            updatedByUser.value = task.updatedBy.name;  
        }
  }catch(error){
    console.log(error);
  }
});

const submitForm = async () => {
    const taskData = {
        taskName: taskName.value,
        taskDescription: taskDescription.value,
        dueDate: new Date(taskDueDate.value).toISOString(),
        priorityLevel: taskPriority.value,
        status: taskStatus.value,
        assignedTo: taskAssignedTo.value
    };
    // console.log("Submitting task data:", taskData);
    try{
        loading.value = true;
        await taskStore.updateTask(taskID, taskData);
        router.push('/description/'+taskID);
    }catch(error){
        console.error('Error updating task:', error);
    }
};

</script>

<template>
    <div class="loading" v-if="loading">loading....</div>
    <div class="editTask" @submit.prevent="submitForm">
        <form action="editTask">
            <label for="taskName">Task Name:</label>
            <input type="text" id="taskName" v-model="taskName">
            <div class="clearfix"></div>
            <label for="taskDescription">Task Description:</label>
            <textarea type="text" id="taskDescription" v-model="taskDescription"></textarea>
            <div class="clearfix"></div>
            <label for="taskDueDate">Task Due Date:</label>
            <input type="date" id="taskDueDate" v-model="taskDueDate" name="taskDueDate" :min="todayDate">
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
            <select id="assignedTo" v-model="taskAssignedTo">
                <option v-for="(member, index) in members" :key="index" :value="member._id">{{ member.name }}</option>
            </select>
            <label for="taskStatus">Task Status:</label>
            <select  id="taskStatus" v-model="taskStatus">
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
            </select>
            <div class="clearfix"></div>
            <input type="submit" value="Submit">
        </form>
        <div v-if="updatedByUser">
            <label>Last Updated By:</label>
            <p>{{ updatedByUser }}</p> <!-- Display the name of the user who last updated the task -->
        </div>
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