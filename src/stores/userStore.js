import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
    const users = ref([]);
    const userLoading = ref(false);
    const error = ref(null);

    const fetchUsers = async () => {
        userLoading.value = true;
        error.value = null;
        try {
            const response = await axios.get('https://projectapis-o9v7.onrender.com/api/users')
            users.value = response.data;
        } catch (err) {
            error.value = 'error fetching data';
            console.log(err);
        } finally {
            userLoading.value = false;
        }
    };

    const fetchSingleUser = async (id) => {
        userLoading.value = true;
        error.value = null;
        try {
            const response = await axios.get(`https://projectapis-o9v7.onrender.com/api/users/${id}`)
            users.value = response.data;
        } catch (err) {
            error.value = 'error fetching data';
            console.log(err);
        } finally {
            userLoading.value = false;
        }
    };

    const fetchMembers = async () => {
        userLoading.value = true;
        error.value = null;
        try {
            const response = await axios.get('https://projectapis-o9v7.onrender.com/api/users/members')
            users.value = response.data;
        } catch (err) {
            error.value = 'error fetching data';
            console.log(err);
        } finally {
            userLoading.value = false;
        }
    };

    const addUser = async (newUser) => {
        userLoading.value = true;
        error.value = null;
        try {
            const response = await axios.post('https://projectapis-o9v7.onrender.com/api/users', newUser)
            users.value.push(response.data);
        } catch (err) {
            error.value = 'error adding user';
            console.log(err);
        } finally {
            userLoading.value = false;
        }
    };

    const updateUser = async (id, updateUser) => {
        userLoading.value = true;
        error.value = null;
        try {
            const response = await axios.put(`https://projectapis-o9v7.onrender.com/api/users/${id}`, updateUser)
            const index = users.value.findIndex(user => user.id === id);
            if (index !== -1) {
                this.users[index] = response.data;
            }
        } catch (err) {
            error.value = 'error updating user';
            console.log(err);
        } finally {
            userLoading.value = false;
        }
    }

    const deleteUser = async (id) => {
        userLoading.value = true;
        error.value = null;
        try {
            await axios.delete(`https://projectapis-o9v7.onrender.com/api/users/${id}`)
            users.value = users.value.filter(user => user.id !== id);
        } catch (err) {
            error.value = 'error deleting user';
            console.log(err);
        } finally {
            userLoading.value = false;
        }
    }

    return { users, userLoading, error, fetchUsers, addUser, updateUser, deleteUser, fetchMembers, fetchSingleUser }
});