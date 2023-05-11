<template>
  <div>
		<Menubar>
			<template #start>
        <Button icon="pi pi-bars" style="color: gray" outlined @click="visible = true" />
    	</template>
		</Menubar>
		<div class="card flex justify-content-center">
    	<Sidebar v-model:visible="visible" class="w-full md:w-15rem lg:w-15rem">
      <div class="card flex justify-content-center">
        <Menu :model="items">
					<template #start>
        <button class="w-full p-link flex align-items-center p-2 pl-3 text-color hover:surface-200 border-noround">
          <div class="flex flex-column align">
            <span class="font-bold">Список</span>
          </div>
        </button>
    </template>
    <template #end>
    </template>
				</Menu>
    	</div>
    	</Sidebar>
		</div>
		<router-view></router-view>
	</div>	
</template>

<script>
import router from "./router";

export default {
	data() {
		return {
			visible: false,
			items: [
				{
					label: 'Текущее оборудование',
					command: () => {
						router.push('/test');
					}
				},
				{
					label: 'Оборудование',
					command: () => {
						router.push('/equipment');
					}
				}
			]
		}
	}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.menubar {
	background: red;
}

</style>
