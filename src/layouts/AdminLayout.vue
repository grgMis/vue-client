<template>
  <div>
		<Menubar>
			<template #start>
				<Button icon="pi pi-bars"
								style="color: gray"
								outlined
								@click="visible = true"/>
			</template>
		</Menubar>
		<div class="card flex justify-content-center">
			<Sidebar v-model:visible="visible"
							 class="w-full md:w-15rem lg:w-15rem">
				<div class="card flex justify-content-center">
					<Menu :model="items">
						<template #start>
							<div>
								<span class="w-full p-link flex align-items-center p-2 pl-3 text-color hover:surface-200 font-bold">Оборудование</span>
							</div>
						</template>
					</Menu>
				</div>
			</Sidebar>
		</div>
		<router-view></router-view>
	</div>	
</template>

<script>
import router from '../router'

export default {
	data() {
		return {
			visible: false,
			items: [
				{
					label: 'Список',
					command: () => {
						router.push('/admin/equipment');
					}
				},
				{
					label: 'Модели',
					command: () => {
						router.push('/admin/equipment-model');
					}
				},
				{
					label: 'Классы',
					command: () => {
						router.push('/admin/equipment-class');
					}
				},
					{
					label: 'Категории',
					command: () => {
						router.push('/admin/equipment-category');
					}
				},
					{
					label: 'Состояния',
					command: () => {
						router.push('/admin/equipment-state');
					}
				}
			]
		}
	}
}
</script>