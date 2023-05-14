import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/test',
    name: 'home',
    component: () => import('../components/Test.vue')
  },
	{
    path: '/login',
    name: 'login',
		meta: {layout: 'empty'},
    component: () => import('../components/Login/Login.vue')
  },
  {
    path: '/admin/equipment',
    name: 'equipment',
		meta: {layout: 'admin'},
    component: () => import('../components/Equipment/EquipmentData.vue')
  },
	{
    path: '/admin/equipment-category',
    name: 'equipment-category',
		meta: {layout: 'admin'},
    component: () => import('../components/Equipment/EquipmentCategoryData.vue')
  },
	{
    path: '/admin/equipment-class',
    name: 'equipment-class',
		meta: {layout: 'admin'},
    component: () => import('../components/Equipment/EquipmentClassData.vue')
  },
	{
    path: '/admin/equipment-model',
    name: 'equipment-model',
		meta: {layout: 'admin'},
    component: () => import('../components/Equipment/EquipmentModelData.vue')
  },
	{
    path: '/admin/equipment-state',
    name: 'equipment-state',
		meta: {layout: 'admin'},
    component: () => import('../components/Equipment/EquipmentStateData.vue')
  },
	{
    path: '/admin/field',
    name: 'field',
		meta: {layout: 'admin'},
    component: () => import('../components/Well/FieldData.vue')
  },
	{
    path: '/admin/dept-type',
    name: 'dept-type',
		meta: {layout: 'admin'},
    component: () => import('../components/Well/DeptTypeData.vue')
  },
	{
    path: '/admin/well-state',
    name: 'well-state',
		meta: {layout: 'admin'},
    component: () => import('../components/Well/WellStateData.vue')
  },
	{
    path: '/admin/dept',
    name: 'dept',
		meta: {layout: 'admin'},
    component: () => import('../components/Well/DeptData.vue')
  },
	{
    path: '/admin/well',
    name: 'well',
		meta: {layout: 'admin'},
    component: () => import('../components/Well/Well.vue')
  },
	
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
