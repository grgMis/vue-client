<template>
	<div>
		<Dialog class="p-fluid" v-model:visible="visible" :position="position" modal header="Авторизация" :style="{ width: '15vw' }">
			<div class="field">
				<label>Логин</label>
				<InputText />
			</div>
			<div class="field">
				<label>Пароль</label>
				<InputText  />
			</div>
    	<template #footer>
        <Button label="No" icon="pi pi-times" @click="visible = false" text />
        <Button label="Yes" icon="pi pi-check" @click="visible = false" autofocus />
    	</template>
		</Dialog>
	</div>
</template>

<script>
export default {
	data() {
		return {
			position: 'top',
			visible: true,
		}
	}
}
</script>