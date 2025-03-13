<script setup>

</script>

<template>
    <form action="addTask">
        <label for="taskName">Task Name:</label>
        <input type="text" id="taskName" name="taskName"><br><br>
        <label for="taskDescription">Task Description:</label>
        <input type="text" id="taskDescription" name="taskDescription"><br><br>
        <label for="taskDueDate">Task Due Date:</label>
        <input type="date" id="taskDueDate" name="taskDueDate"><br><br>
        <label for="taskStatus">Task Status:</label>
        <input type="text" id="taskStatus" name="taskStatus"><br><br>
        <input type="submit" value="Submit">
    </form>
</template>

<style scoped>

</style>