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
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../components/taskDescription.vue'),
    },
    {
      path: '/login',
      name: 'Login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
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
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
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
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/singleTaskView.vue'),
    },
    {
      path: '/task/edit/:id',
      name: 'Edit Task',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/editTaskView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',  // Matches any path that doesn't exist in the routes
      name: 'NotFound',
      component: NotFound,  // The 404 page component
    },
  ],
})

export default router
