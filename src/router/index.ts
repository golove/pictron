import { createRouter, createWebHashHistory } from 'vue-router'
import Beauty from '../views/Beauty.vue'
import Layout from '../Layout/index.vue'
const routes = [
  {
    path: '/',
    name: 'Layout',
    redirect: '/beauty',
    component: Layout,
    children: [
      { path: '/beauty', name: 'Beauty', component: Beauty },
      { path: '/ustyle', name: 'Ustyle', component: () => import('../views/Ustyle.vue') }, // Lazy load route component
      { path: '/carton', name: 'Carton', component: () => import('../views/Carton.vue') },
      { path: '/leisi', name: 'Leisi', component: () => import('../views/Leisi.vue') },
      { path: '/selfie', name: 'Selfie', component: () => import('../views/Selfie.vue') },
      { path: '/passion', name: 'Passion', component: () => import('../views/Passion.vue') },
      { path: '/collect', name: 'Collect', component: () => import('../views/MyCollect.vue') },
      // { path: '/about', name: 'About', component: () => import('../views/About.vue') },
      { path: '/setting', name: 'Setting', component: () => import('../views/Setting.vue') }
    ]
  }

]

export default createRouter({
  routes,
  history: createWebHashHistory()
})
