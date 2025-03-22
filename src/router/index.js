import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useUserStore } from '@/stores/userStore'

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
      component: HomeView,
      beforeEnter: (to, from, next ) => {
        const userStore = useUserStore();
        if (!userStore.loggedIn){
          next('/login'); 
        }else{
          next();
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
    },
    {
      path: '/addtask',
      name: 'Create Task',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/createTaskView.vue'),
    },
    {
      path: '/task/:id',
      name: 'Task',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/singleTaskView.vue'),
    },
  ],
})

export default router
