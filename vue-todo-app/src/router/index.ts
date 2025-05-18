import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useAuthStore } from '../stores/auth';

import LoginPage from '../pages/LoginPage.vue';
import TodosPage from '../pages/TodosPage.vue';
import NotFoundPage from '../pages/NotFoundPage.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/todos'
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    meta: { requiresAuth: false }
  },
  {
    path: '/todos',
    name: 'Todos',
    component: TodosPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundPage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const requiresAuth = to.meta.requiresAuth;
  
  if (requiresAuth && !authStore.isAuthenticated) {
    next('/login');
  } else if (to.path === '/login' && authStore.isAuthenticated) {
    next('/todos');
  } else {
    next();
  }
});

export default router;