import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/test',
    name: 'home',
    component: () => import('../components/Test.vue')
  },
  {
    path: '/admin/equipment',
    name: 'equipment',
		meta: {layout: 'admin'},
    component: () => import('../components/Equipment/EquipmentData.vue')
  },
	{
    path: '/login',
    name: 'login',
		meta: {layout: 'empty'},
    component: () => import('../components/Login/Login.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
