<script setup>

</script>

<template>
    <div class="addtask">
        <form action="addTask">
            <label for="taskName">Task Name:</label>
            <input type="text" id="taskName" name="taskName">
            <div class="clearfix"></div>
            <label for="taskDescription">Task Description:</label>
            <textarea type="text" id="taskDescription" name="taskDescription"></textarea>
            <div class="clearfix"></div>
            <label for="taskDueDate">Task Due Date:</label>
            <input type="date" id="taskDueDate" name="taskDueDate">
            <div class="clearfix"></div>
            <label for="taskPriority">Task Priority</label>
            <div>
                <input type="radio" id="taskPriority" name="taskPriority" value="Low">
                <input type="radio" id="taskPriority" name="taskPriority" value="Medium">
                <input type="radio" id="taskPriority" name="taskPriority" value="High">
            </div>
            <label for="taskStatus">Task Status:</label>
            <select  id="taskStatus" name="taskStatus">
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