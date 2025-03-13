<script setup>
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
    taskDescriptionLink: String
})
</script>

<template>
    <tr>
        <td>{{ assignedBy }}</td>
        <td>{{ assignedTo }}</td>
        <td><a :href="taskLink">{{ taskTitle }}</a></td>
        <td>
            <select>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
            </select>
        </td>
        <td>{{ taskPriority }}</td>
        <td>{{ taskDueDate }}</td>
        <td>{{ taskCreatedDate }}</td>
        <td v-if="userStatus=='admin'"><span class="icon">Edit</span></td>
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
    .icon{
        cursor: pointer;
    }
    a{
        text-decoration: none;
        color: #fff;
    }
</style>