<script setup>
import TaskList from '@/components/HomeComponents/TaskList.vue';
import { ref, onMounted, watchEffect, watch } from 'vue';
import { useTaskStore } from '@/stores/taskStore';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/authStore';
import { useUserStore } from '@/stores/userStore';

const taskStore = useTaskStore();
const authStore = useAuthStore();
const userStore = useUserStore();
const { tasks, Taskloading, error,noTask  } = storeToRefs(taskStore);
const { user, taskList } = authStore;

// Fetch tasks when the component is mounted
onMounted( async () => {
  taskStore.fetchTasks();
  console.log(user)
});

// const singleUser = (id) => {
//   userStore.fetchSingleUser(id);
// }

watch(() => taskStore.noTask, (noTask) => {
  console.log(noTask);
  if (!noTask){
    noTask = false;
  }

  if (!user.taskList){
      noTask = false;
  }
});
</script>


<template>
    <div class="tastListContainer">
      <h1>Task List</h1>
      <div v-if="Taskloading">
        <p>Loading...</p>
      </div>
      
      <div v-if="error">
        <p>Error: {{ error }}</p>
      </div>

      <table v-if="!Taskloading && !error">
        <tbody>
          <tr>
            <th>Assigned By</th>
            <th>Assigned To</th>
            <th>Task Title</th>
            <th>Task Status</th>
            <th>Task Priority</th>
            <th>Task Due Date</th>
            <th>Task Created Date</th>
            <th v-if="user.accountType=='admin'"></th>
          </tr>
          <TaskList v-if = "user.accountType == 'admin'" v-for="(task, index) in tasks" 
            :key="index"
            :assignedBy="task.assignedBy.name"
            :assignedTo="task.assignedTo.name"
            :taskTitle="task.taskName"
            :taskPriority="task.priorityLevel"
            :taskDueDate="task.dueDate"
            :taskCreatedDate="task.createdAt"
            :taskLink="task.taskLink"
            :userStatus="user.accountType"
            :taskId = 'task._id'
          />
          <TaskList v-if = "user.accountType == 'member'" v-for="(task, index) in user.taskList" 
            :key="index"
            :assignedBy="task.assignedBy.name"
            :assignedTo="task.assignedTo.name"
            :taskTitle="task.taskName"
            :taskPriority="task.priorityLevel"
            :taskDueDate="task.dueDate"
            :taskCreatedDate="task.createdAt"
            :taskLink="task.taskLink"
            :userStatus="user.accountType"
            :taskId = 'task._id'
          />
        </tbody>
      </table>
      <div v-if ="noTask">
        <p>No tasks</p>
      </div>
      <div v-if ="user.taskList.length == 0 && user.accountType == 'member'">
        <p>No tasks</p>
      </div>
    </div>
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
</style>
