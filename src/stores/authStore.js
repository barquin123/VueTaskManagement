import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const loading = ref(false);
  const error = ref(null);
  const errorMessage = ref(null); // Added to store error message
  const loggedIn = ref(false); // Updated to be false by default

  if (localStorage.getItem('authUserData')) {
    user.value = JSON.parse(localStorage.getItem('authUserData'));
    loggedIn.value = JSON.parse(localStorage.getItem('loggedIn'));
  }
  const isLoggedIn = () => {
    return loggedIn.value;
  };

  const register = async (credentials) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', credentials);
      // const response = await axios.post('http://localhost:5000/api/auth/register', credentials);
      user.value = response.data;
    } catch (error) {
      if (error.response && error.response.status === 400){
        errorMessage.value = error.response.data.error;
      }
      error.value = 'Error registering';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const login = async (credentials) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', credentials);
      // const response = await axios.post('http://localhost:5000/api/auth/login', credentials);
      localStorage.setItem('authUserData', JSON.stringify(response.data));
      user.value = JSON.parse(localStorage.getItem('authUserData'));
      localStorage.setItem('loggedIn', JSON.stringify(true));
      loggedIn.value = JSON.parse(localStorage.getItem('loggedIn'));
    } catch (err) {
      error.value = 'Error logging in';
      loggedIn.value = false;
      throw err;
    } finally {
      loading.value = false;
    }
  };
  const logout = () => {
    user.value = null;
    loggedIn.value = false;
    localStorage.removeItem('authUserData');
    localStorage.removeItem('loggedIn');
  };

  return {
    user,
    loading,
    error,
    loggedIn,
    register,
    login,
    logout,
    errorMessage,
  };
});