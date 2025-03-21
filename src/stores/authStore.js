import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const loading = ref(false);
  const error = ref(null);
  const loggedIn = ref(false); // Updated to be false by default

  const register = async (credentials) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', credentials);
      user.value = response.data;
    } catch (err) {
      error.value = 'Error registering';
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
      loggedIn.value = true;
    } catch (err) {
      error.value = 'Error logging in';
      console.log(err);
      loggedIn.value = false;
    } finally {
      loading.value = false;
    }
  };

  const logout = () => {
    user.value = null;
    loggedIn.value = false;
  };

  return {
    user,
    loading,
    error,
    loggedIn,
    register,
    login,
    logout,
  };
});