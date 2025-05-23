import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/stores/authStore';
import NotFound from '@/views/NotFound.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/tasks',
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: () => import('../views/HomeView.vue'),
      beforeEnter: (to, from, next ) => {
        const AuthStore = useAuthStore();
        if (AuthStore.loggedIn) {
          next();
        } else {
          // If not logged in, redirect to login page
          next('/login');
        }
      }
    },
    {
      path: '/description/:id',
      name: 'description',
      component: () => import('../components/taskDescription.vue'),
      beforeEnter: (to, from, next ) => {
        const AuthStore = useAuthStore();
        if (AuthStore.loggedIn) {
          next();
        } else {
          // If not logged in, redirect to login page
          next('/login');
        }
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/loginView.vue'),
      beforeEnter: (to, from, next ) => {
        const AuthStore = useAuthStore();
        if (AuthStore.loggedIn) {
          next('/tasks');
        } else {
          // If not logged in, redirect to login page
          next();
        }
      }
      
    },
    {
      path: '/addtask',
      name: 'Create Task',
      component: () => import('../views/createTaskView.vue'),
      beforeEnter: (to, from, next ) => {
        const AuthStore = useAuthStore();
        const { user } = AuthStore;
        if (user.accountType === 'admin') {
          next();
        } else {
          // If not logged in, redirect to login page
          next('/tasks');
        }
      }
    },
    {
      path: '/task/:id',
      name: 'Task',
      component: () => import('../views/singleTaskView.vue'),
      beforeEnter: (to, from, next ) => {
        const AuthStore = useAuthStore();
        if (AuthStore.loggedIn) {
          next();
        } else {
          // If not logged in, redirect to login page
          next('/login');
        }
      }
    },
    {
      path: '/task/edit/:id',
      name: 'Edit Task',
      component: () => import('../views/editTaskView.vue'),
      beforeEnter: (to, from, next ) => {
        const AuthStore = useAuthStore();
        const { user } = AuthStore;
        if (user.accountType === 'admin') {
          next();
        } else {
          // If not logged in, redirect to login page
          next('/tasks');
        }
      }
    },
    {
      path: '/profile/:id',
      name: 'Profile',
      component: () => import('../views/profileView.vue'),
      beforeEnter: (to, from, next ) => {
        const AuthStore = useAuthStore();
        if (AuthStore.loggedIn) {
          next();
        } else {
          // If not logged in, redirect to login page
          next('/login');
        }
      }
    },
    {
      path: '/chat/:id',
      name: 'chat',
      component: () => import('../views/chat.vue'),
       beforeEnter: (to, from, next ) => {
         const AuthStore = useAuthStore();
         if (AuthStore.loggedIn) {
           next();
         } else {
           // If not logged in, redirect to login page
           next('/login');
         }
       }
    },
    {
      path: '/messages',
      name: 'Chat List',
      component: () => import('../views/conversationView.vue'),
       beforeEnter: (to, from, next ) => {
         const AuthStore = useAuthStore();
         if (AuthStore.loggedIn) {
           next();
         } else {
           // If not logged in, redirect to login page
           next('/login');
         }
       }
    },
    {
      path: '/chat',
      name: 'messages',
      component: () => import('../views/messages.vue'),
       beforeEnter: (to, from, next ) => {
         const AuthStore = useAuthStore();
         if (AuthStore.loggedIn) {
           next();
         } else {
           // If not logged in, redirect to login page
           next('/login');
         }
       }
    },
    {
      path: '/:pathMatch(.*)*',  // Matches any path that doesn't exist in the routes
      name: 'NotFound',
      component: NotFound,  // The 404 page component
    },
  ],
})

export default router
