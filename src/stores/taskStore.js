import { defineStore, storeToRefs } from "pinia";
import axios from "axios";
import { ref, computed } from "vue";
import { useAuthStore } from "./authStore";

export const useTaskStore = defineStore("task", () => {
  const tasks = ref([]);
  const Taskloading = ref(false);
  const error = ref(null);
  const taskAdded = ref(false);
  const AuthStore = useAuthStore();
  const { user } = AuthStore;

  const noTask = computed(() => tasks.value.length === 0);
  
    // get all tasks
  const fetchTasks = async () => {
    Taskloading.value = true;
    error.value = null;
    try {
        const response = await axios.get('https://projectapis-o9v7.onrender.com/api/tasks')
        tasks.value = response.data;
        tasks.value.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
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
        const taskWithAsignee = {...newTask, assignedBy: user._id};
        const response = await axios.post('https://projectapis-o9v7.onrender.com/api/tasks', taskWithAsignee);
        tasks.value.push(response.data);
        taskAdded.value = true;
    }catch(err){
        error.value = 'error adding task';
        console.log(err);
    }finally{
        Taskloading.value = false; 
    }
  };

  const fetchTaskById = async (id) => {
    Taskloading.value = true;
    error.value = null;
    try {
      const response = await axios.get(`https://projectapis-o9v7.onrender.com/api/tasks/${id}`);
      return response.data;
    } catch (err) {
      error.value = 'Error fetching task';
      console.error(err);
    } finally {
      Taskloading.value = false;
    }
  };

  const updateTask = async (id, updateTask) =>{
    Taskloading.value = true;
    error.value = null;
    try{
        const response = await axios.put(`https://projectapis-o9v7.onrender.com/api/tasks/${id}`, updateTask)
        const index = tasks.value.findIndex(task => task._id === id);
        if (index !== -1){
            tasks.value[index] = response.data;
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
        await axios.delete(`https://projectapis-o9v7.onrender.com/api/tasks/${id}`)
        tasks.value = tasks.value.filter(task => task._id !== id);
    }catch(err){
        error.value = 'error deleting task';
        console.log(err);
    } finally{
        Taskloading.value = false;
    }
  }

  return { tasks, Taskloading, error, fetchTasks, addTask, updateTask, deleteTask, taskAdded, noTask, fetchTaskById };
});