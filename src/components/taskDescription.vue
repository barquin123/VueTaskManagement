<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useTaskStore } from '@/stores/taskStore';
import { useAuthStore } from '@/stores/authStore';

const route = useRoute();
const AuthStore = useAuthStore();
const taskStore = useTaskStore();
const taskID = route.params.id;
const tasks = ref({});
const assignedBy = ref('');
const assignedTo = ref('');
const taskName = ref('');
const Status = ref('Pending');
const dueDate = ref('');
const priorityLevel = ref('');
const taskDescription = ref('');

const { user } = AuthStore;

onMounted( async () => {
    const tasks = await taskStore.fetchTaskById(taskID);
    console.log(tasks);
    assignedBy.value = tasks.assignedBy.name;
    assignedTo.value = tasks.assignedTo.name;
    taskName.value = tasks.taskName;
    Status.value = tasks.status;
    dueDate.value = formatDate(tasks.dueDate);
    priorityLevel.value = tasks.priorityLevel;
    taskDescription.value = tasks.taskDescription;
    console.log(user);
})

const formatDate = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString(); // YYYY-MM-DD format
};

</script>

<template>
    <div class="taskDetails">
        <h1>{{taskName}}</h1>
        <div class="taskContents">
            <div class="topContents">
                <h2>Task Description</h2>
                <a class="editButton" v-if="user.accountType == 'admin'" :href="'/task/edit/'+taskID">Edit Task</a>
            </div>
            <div class="taskBox">
                <p>{{taskDescription}}</p>
            </div>
            <div class="flex">
                <p>assigned by: {{assignedBy}}</p>
                <p>assigned to: {{assignedTo}}</p>
            </div>

            <div class="statusSub">
                <p><span>status:</span> {{Status}}</p>
                <p><span>Deadline:</span> {{dueDate}}</p>
                <p><span>priority:</span> <span :class="priorityLevel">{{priorityLevel}}</span></p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.taskBox {
    padding: 20px;
    width: 100%;
    height: 100%;
    border: 1px solid #ddd;
    min-height: 30vh;
}
.flex{
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
    padding:0 40px;
}
.statusSub{
    display: flex;
    flex-direction: column;
    gap: 20px;
}
.statusSub span{
    font-weight: bold;
    color: #fff;
}
.statusSub span:nth-child(2){
    padding: 5px 15px;
    border-radius: 15px;
}
.High{
    background-color: red;
}
.Medium{
    background-color: orange;
}
.Low{
    background-color: #3e69bc;
}
.topContents {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.editButton{
    background: #1faef0f6;
    padding: 10px;
    color: #fff;
    text-decoration: none;
    border-radius: 5px;
    font-size: 14px;
    font-weight: bold;
}


</style>