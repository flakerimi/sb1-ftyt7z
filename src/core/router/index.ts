import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@core/stores/auth'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@modules/home/views/HomeView.vue'),
  },
  {
    path: '/posts',
    component: () => import('@modules/posts/views/PostsView.vue'),
  },
  {
    path: '/admin',
    component: () => import('@modules/admin/views/AdminView.vue'),
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.matched.some(record => record.meta.requiresAuth) && !authStore.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router