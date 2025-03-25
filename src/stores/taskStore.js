import { defineStore, storeToRefs } from "pinia";
import axios from "axios";
import { ref } from "vue";
import { useAuthStore } from "./authStore";

export const useTaskStore = defineStore("task", () => {
  const tasks = ref([]);
  const Taskloading = ref(false);
  const error = ref(null);
  const taskAdded = ref(false);
  const AuthStore = useAuthStore();
  const { user } = AuthStore;
  
    // get all tasks
  const fetchTasks = async () => {
    Taskloading.value = true;
    error.value = null;
    try {
        const response = await axios.get('http://localhost:5000/api/tasks')
        tasks.value = response.data;
    }catch(err){
        error.value = 'error fetching data';
        console.log(err);
    }finally{
        Taskloading.value = false;
    }
  };

//   post tasks
  const addTask = async (newTask) => {
    Taskloading.value = true;
    error.value = null;
    try {
        const taskWithAsignee = {...newTask, assignedBy: user.id};
        const response = await axios.post('http://localhost:5000/api/tasks', taskWithAsignee);
        tasks.value.push(response.data);
        taskAdded.value = true;
    }catch(err){
        error.value = 'error adding task';
        console.log(err);
    }finally{
        Taskloading.value = false; 
    }
  };

  const updateTask = async (id, updateTask) =>{
    Taskloading.value = true;
    error.value = null;
    try{
        const response = await axios.put(`http://localhost:5000/api/tasks/${id}`, updateTask)
        const index = tasks.value.findIndex(task => task.id === id);
        if (index !== -1){
            this.tasks[index] = response.data;
        }
    }catch(err){
        error.value = 'error updating task';
        console.log(err);
    } finally{
        Taskloading.value = false;
    }   
  }

  const deleteTask = async (id) =>{
    Taskloading.value = true;
    error.value = null;
    try{
        await axios.delete(`http://localhost:5000/api/tasks/${id}`)
        tasks.value = tasks.value.filter(task => task.id !== id);
    }catch(err){
        error.value = 'error deleting task';
        console.log(err);
    } finally{
        Taskloading.value = false;
    }
  }

  return { tasks, Taskloading, error, fetchTasks, addTask, updateTask, deleteTask, taskAdded };
});