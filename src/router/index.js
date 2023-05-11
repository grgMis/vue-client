import { createRouter, createWebHistory } from 'vue-router'
import TestVue from "../components/Test.vue";
import Equipment from "../components/Equipment/EquipmentData.vue"

const routes = [
  {
    path: '/test',
    name: 'home',
    component: TestVue
  },
  {
    path: '/equipment',
    name: 'equipment',
    component: Equipment
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
