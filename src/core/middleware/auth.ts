import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from '@core/stores/auth'

export default function authMiddleware(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const authStore = useAuthStore()
  
  if (to.matched.some(record => record.meta.requiresAuth) && !authStore.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
}