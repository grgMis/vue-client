import { createRouter, createWebHistory } from 'vue-router'

const routes = [
	{
		path: '/login',
		name: 'login',
		meta: { layout: 'empty' },
		component: () => import('../components/Login/Login.vue')
	},
	{
		path: '/admin',
		name: 'admin',
		meta: { layout: 'admin' },
	},
	{
		path: '/operator',
		name: 'operator',
		meta: { layout: 'operator' },
	},
	{
		path: '/dispatcher',
		name: 'dispatcher',
		meta: { layout: 'dispatcher' },
	},
	{
		path: '/admin/equipment',
		name: 'equipment',
		meta: { layout: 'admin' },
		component: () => import('../components/Equipment/EquipmentData.vue')
	},
	{
		path: '/admin/equipment-category',
		name: 'equipment-category',
		meta: { layout: 'admin' },
		component: () => import('../components/Equipment/EquipmentCategoryData.vue')
	},
	{
		path: '/admin/equipment-class',
		name: 'equipment-class',
		meta: { layout: 'admin' },
		component: () => import('../components/Equipment/EquipmentClassData.vue')
	},
	{
		path: '/admin/equipment-model',
		name: 'equipment-model',
		meta: { layout: 'admin' },
		component: () => import('../components/Equipment/EquipmentModelData.vue')
	},
	{
		path: '/admin/equipment-state',
		name: 'equipment-state',
		meta: { layout: 'admin' },
		component: () => import('../components/Equipment/EquipmentStateData.vue')
	},
	{
		path: '/admin/field',
		name: 'field',
		meta: { layout: 'admin' },
		component: () => import('../components/Well/FieldData.vue')
	},
	{
		path: '/admin/well-state',
		name: 'well-state',
		meta: { layout: 'admin' },
		component: () => import('../components/Well/WellStateData.vue')
	},
	{
		path: '/admin/company',
		name: 'company',
		meta: { layout: 'admin' },
		component: () => import('../components/Well/CompanyData.vue')
	},
	{
		path: '/admin/well',
		name: 'well',
		meta: { layout: 'admin' },
		component: () => import('../components/Well/WellData.vue')
	},
	{
		path: '/admin/current-equipment',
		name: 'current-equipment',
		meta: { layout: 'admin' },
		component: () => import('../components/Well/CurrentEquipment.vue')
	},
	{
		path: '/admin/action-state',
		name: 'action-state',
		meta: { layout: 'admin' },
		component: () => import('../components/Action/ActionStateData.vue')
	},
	{
		path: '/admin/action-type',
		name: 'action-type',
		meta: { layout: 'admin' },
		component: () => import('../components/Action/ActionTypeData.vue')
	},
	{
		path: '/admin/action',
		name: 'action',
		meta: { layout: 'admin' },
		component: () => import('../components/Action/ActionData.vue')
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
