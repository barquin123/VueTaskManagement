import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

const useAuthStore = defineStore("auth", () => {
    const user = ref(null);
    const loading = ref(false);
    const error = ref(null);

    const register = async (credentials) => {
        loading.value = true;
        error.value = null;
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', credentials);
            user.value = response.data;
        } catch (err) {
            error.value = 'error registering';
            console.log(err);
        } finally {
            loading.value = false;
        }
    };

    const login = async (credentials) => {
        loading.value = true;
        error.value = null;
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', credentials);
            user.value = response.data;
        } catch (err) {
            error.value = 'error logging in';
            console.log(err);
        } finally {
            loading.value = false;
        }
    };

    const logout = () => {
        user.value = null;
    };
});