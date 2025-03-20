<script setup>
import TaskList from '@/components/HomeComponents/TaskList.vue';
const datas = [
  {assignedBy: 'assignee 1', assignedTo: 'assigned 1', taskTitle: 'Task 1', taskPriority: 'High', taskDueDate: '2022-12-31', taskCreatedDate: '2022-12-01', taskLink: 'javascript:;'},
  {assignedBy: 'assignee 2', assignedTo: 'assigned 2', taskTitle: 'Task 2', taskPriority: 'High', taskDueDate: '2022-12-31', taskCreatedDate: '2022-12-01', taskLink: 'javascript:;'},
]


const userData = {
  name: 'John Doe',
  userStatus: 'member'
}

</script>


<template>
    <div class="tastListContainer">
      <h1>Task List</h1>
      <table>
        <tbody>
          <tr>
            <th>Assigned By</th>
            <th>Assigned To</th>
            <th>Task Title</th>
            <th>Task Status</th>
            <th>Task Priority</th>
            <th>Task Due Date</th>
            <th>Task Created Date</th>
            <th v-if="userData.userStatus=='admin'">Edit Task</th>
          </tr>
          <TaskList v-for="(data, index) in datas" 
            :key="index"
            :assignedBy="data.assignedBy"
            :assignedTo="data.assignedTo"
            :taskTitle="data.taskTitle"
            :taskPriority="data.taskPriority"
            :taskDueDate="data.taskDueDate"
            :taskCreatedDate="data.taskCreatedDate"
            :taskLink="data.taskLink"
            :userStatus="userData.userStatus"
          />
        </tbody>
      </table>
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
    .icon{
        cursor: pointer;
    }
</style>
