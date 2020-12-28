import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
    name: 'Home',
    component: () => import('@/containers/TheContainer'),
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/Dashboard')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
