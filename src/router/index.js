import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/activite',
    name: 'Home',
    component: () => import('@/containers/TheContainer'),
    children: [
      {
        path: 'activite',
        name: 'activite',
        component: () => import('@/views/Activite')
      },
      {
        path: 'opportunites',
        name: 'opportunites',
        component: () => import('@/views/Opportunites')
      },
      {
        path: 'devis',
        name: 'devis',
        component: () => import('@/views/Devis')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
