<template>
	<Toast />
	<ConfirmDialog/>
	<Dialog
		v-model:visible="visibleDialog"
		:style="{width: '450px'}"
		header="Оборудование" 
		:modal="true"
		class="p-fluid">
		<div class="field">
				<label for="factory_number">Заводской номер</label>
				<InputText 
					id="factory_number" 
					v-model.trim="equipmentData.factory_number" 
					required="true" 
					:class="{'p-invalid': submitted && !equipmentData.factory_number}" />
				<small 
					class="p-error" 
					v-if="submitted && !equipmentData.factory_number">
					Укажите заводской номер.
				</small>
		</div>
		<div class="field">
				<label for="inventory_number">Инвентарный номер</label>
				<InputText 
					id="inventory_number" 
					v-model.trim="equipmentData.inventory_number" 
					required="true" 
					:class="{'p-invalid': submitted && !equipmentData.inventory_number}" />
				<small 
					class="p-error" 
					v-if="submitted && !equipmentData.inventory_number">
					Укажите инвентарный номер.
				</small>
		</div>

		<div class="field">
			<label 
				for="equipment_class_name" 
				class="mb-3">Класс оборудования</label>
			<Dropdown 
				id="equipment_class_name" 
				v-model="equipmentData.equipmentClass" 
				:options="classList"
				@change="getModelList"
				optionLabel="equipment_class_name" 
				placeholder="Выберите класс"
				:class="{'p-invalid': submitted && !equipmentData.equipmentClass}">
				<template #option="slotProps">
					<div v-if="slotProps.option.equipment_class_name">
						<span>{{ slotProps.option.equipment_class_name }}</span>
					</div>
					<span v-else>
						{{ slotProps.placeholder }}
					</span>
				</template>
				<small 
					class="p-error" 
					v-if="submitted && !equipmentData.equipmentClass">
				</small>
			</Dropdown>
		</div>

		<div class="field">
			<label 
				for="equipment_model_name" 
				class="mb-3">Модель оборудования</label>
			<Dropdown 
				id="equipment_model_name" 
				v-model="equipmentData.equipmentModel" 
				:options="modelList" 
				optionLabel="equipment_model_name" 
				placeholder="Выберите модель"
				:class="{'p-invalid': submitted && !equipmentData.equipmentModel}">
				<template #option="slotProps">
					<div v-if="slotProps.option.equipment_model_name">
						<span>{{ slotProps.option.equipment_model_name }}</span>
					</div>
					<span v-else>
						{{ slotProps.placeholder }}
					</span>
				</template>
				<small 
					class="p-error" 
					v-if="submitted && !equipmentData.equipmentModel">
				</small>
			</Dropdown>
		</div>
		<template #footer>
				<Button label="Закрыть" icon="pi pi-times" text @click="hideDialog"/>
				<Button label="Сохранить" icon="pi pi-check" text @click="saveEquipment" />
		</template>
	</Dialog>
	<Toolbar>
		<template #start>
			<span class="font-bold text-3xl">Оборудование</span>
		</template>
		<template #end>
			<Button
				label="Добавить"
				@click="showDialog"
				icon="pi pi-plus"
				class="mr-2"
				style="color: gray"
				outlined />
			<Button 
				label="Изменить" 
				icon="pi pi-pencil" 
				class="mr-2"
				style="color: gray"
				outlined />
			<Button 
				label="Удалить"
				@click="deleteData"
				icon="pi pi-times"
				class="mr-2"
				style="color: gray"
				outlined />
		</template>
	</Toolbar>	

	<DataTable 
		class="pt-1 p-datatable-sm"
		paginator :rows="19"
		v-model:selection="selectedEquipment"
		v-model:filters="filters"
		:value="equipmentList"
		selectionMode="single" 
		dataKey="equipment_id"
		filterDisplay="row"
		showGridlines
		:globalFilterFields="['equipmentModel.equipmentClass.equipmentCategory.equipment_category_name',
													'equipmentModel.equipmentClass.equipment_class_name',
													'equipmentModel.equipment_model_name',
													'equipmentState.equipment_state_name',
													'inventory_number',
													'factory_number',
													'date_entry']">
		<Column
			style="max-width: 10rem"
			header="Модель"
			filterField="equipmentModel.equipment_model_name"
			sortable
			:showFilterMenu="false">
			<template #body="{ data }">
				{{ data.equipmentModel.equipment_model_name }}
			</template>
			<template #filter="{ filterModel, filterCallback }">
				<Dropdown
					class="p-column-filter"
					style="width: 165px"
					:showClear="true"
					v-model="filterModel.value"
					@change="filterCallback()"
					:options="equipmentModelList"
					optionLabel="equipment_model_name" 
					optionValue="equipment_model_name"
					placeholder="Модель">
					<template #option="slotProps">
						<div>
							<span>{{ slotProps.option.equipment_model_name }}</span>
						</div>
					</template>
				</Dropdown>
			</template>
		</Column>

			
		<Column
			style="max-width: 10rem"
			header="Класс"
			filterField="equipmentModel.equipmentClass.equipment_class_name" 
			sortable
			:showFilterMenu="false">
			<template #body="{ data }">
				{{ data.equipmentModel.equipmentClass.equipment_class_name }}
			</template>
			<template #filter="{ filterModel, filterCallback }">
				<Dropdown
					class="p-column-filter"
					style="width: 165px"
					:showClear="true"
					v-model="filterModel.value"
					@change="filterCallback()"
					:options="equipmentClassList"
					optionLabel="equipment_class_name" 
					optionValue="equipment_class_name"
					placeholder="Класс">
					<template #option="slotProps">
						<div>
							<span>{{ slotProps.option.equipment_class_name }}</span>
						</div>
					</template>
				</Dropdown>
			</template>
		</Column>

		<Column
			style="max-width: 10rem"
			header="Категория"
			filterField="equipmentModel.equipmentClass.equipmentCategory.equipment_category_name"
			sortable 
			:showFilterMenu="false">
			<template #body="{ data }">
				{{ data.equipmentModel.equipmentClass.equipmentCategory.equipment_category_name }}
			</template>
			<template #filter="{ filterModel, filterCallback }">
				<Dropdown
					class="p-column-filter"
					style="width: 165px"
					:showClear="true"
					v-model="filterModel.value"
					@change="filterCallback()" 
					:options="equipmentCategoryList"
					optionLabel="equipment_category_name" 
					optionValue="equipment_category_name"
					placeholder="Категория">
					<template #option="slotProps">
						<div>
							<span>{{ slotProps.option.equipment_category_name }}</span>
						</div>
					</template>
				</Dropdown>
			</template>
		</Column>

		<Column
			style="max-width: 10rem"
			header="Инвентарный номер"
			filterField="inventory_number"
			sortable
			:showFilterMenu="false">
			<template #body="{ data }">
				{{ data.inventory_number }}
			</template>
			<template #filter="{ filterModel, filterCallback }">
				<InputText 
					class="p-column-filter p-inputtext-sm"
					v-model="filterModel.value"
					type="text"
					@input="filterCallback()"
					placeholder="Поиск"
					showClear/>
			</template>
		</Column>
		
		<Column
			style="max-width: 9rem"
			header="Заводской номер"
			filterField="factory_number"
			sortable
			:showFilterMenu="false">
			<template #body="{ data }">
				{{ data.factory_number }}
			</template>
			<template #filter="{ filterModel, filterCallback }">
				<InputText 
					class="p-column-filter p-inputtext-sm"
					v-model="filterModel.value"
					type="text"
					@input="filterCallback()"
					placeholder="Поиск"/>
			</template>
		</Column>

		<Column
			style="max-width: 12rem"
			header="Дата добавления"
			filterField="date_entry"
			dataType="date"
			:showFilterMenu="false"
			sortable>
			<template #body="{ data }">
					{{ data.date_entry }}
			</template>
			<template #filter="{ filterModel }">
					<Calendar
						v-model="filterModel.value"
						dateFormat="dd-mm-yy"
						placeholder="дд-мм-гггг"
						mask="99-99-9999"
						style="width: 7rem" />
			</template>
		</Column>

		<Column
			style="max-width: 10rem"
			filterField="equipmentState.equipment_state_name"
			sortable
			header="Состояние"
			:showFilterMenu="false">
			<template #body="{ data }">
				{{ data.equipmentState.equipment_state_name }}
			</template>
			<template #filter="{ filterModel, filterCallback }">
				<Dropdown
					class="p-column-filter"
					style="width: 165px"
					:showClear="true"
					v-model="filterModel.value"
					@change="filterCallback()"
					:options="equipmentStateList"
					optionLabel="equipment_state_name" 
					optionValue="equipment_state_name"
					placeholder="Состояние">
					<template #option="slotProps">
						<div>
							<span>{{ slotProps.option.equipment_state_name }}</span>
						</div>
					</template>
				</Dropdown>
			</template>
		</Column>
	</DataTable>
</template>

<script>
import { FilterMatchMode, FilterOperator } from 'primevue/api'
import EquipmentCategoryDataService from '../../services/EquipmentCategoryDataService'
import EquipmentClassDataService from '../../services/EquipmentClassDataService'
import EquipmentDataService from '../../services/EquipmentDataService'
import EquipmentModelDataService from '../../services/EquipmentModelDataService'
import EquipmentStateDataService from '../../services/EquipmentStateDataService'

export default {
	name: "Equipment",
	data() {
		return {
			visibleDialog: false,
			submitted: false,
			modelList: [],
			classList: [],
			equipmentData: {
				factory_number: null,
				inventory_number: null,
				equipmentModel: null,
				equipmentClass: null,
				equipment_state_id: 1,
			},
			createData: [],
			equipmentList: [],
			equipmentModelList: [],
			equipmentClassList: [],
			equipmentCategoryList: [],
			equipmentStateList: [],
			selectedEquipment: null,
			filters: {
				'equipmentModel.equipmentClass.equipmentCategory.equipment_category_name': { value: null, matchMode: FilterMatchMode.EQUALS },
				'equipmentModel.equipmentClass.equipment_class_name': { value: null, matchMode: FilterMatchMode.EQUALS },
				'equipmentModel.equipment_model_name': { value: null, matchMode: FilterMatchMode.EQUALS },
				'equipmentState.equipment_state_name': { value: null, matchMode: FilterMatchMode.EQUALS },
				inventory_number: { value:null, matchMode: FilterMatchMode.CONTAINS },
				factory_number: { value:null, matchMode: FilterMatchMode.CONTAINS },
				date_entry: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS}] },
			}
		}
	},
	methods: {
		getModelList: async function() {
			const equipmentClassId = this.equipmentData.equipmentClass.equipment_class_id;
			if (equipmentClassId === null) {
				const data = await EquipmentModelDataService.getList();
				this.modelList = data;
				console.log(this.modelList);
			} else {
				const data = await EquipmentModelDataService.getListByEquipClass(equipmentClassId);
				this.modelList = data;
				console.log(this.modelList);
			}	
		},
		getClassList: async function() {
			const data = await EquipmentClassDataService.getList();
			this.classList = data;
			console.log(this.classList);
		},
		createEquipment: async function() {
			const equipmentModelId = this.equipmentData.equipmentModel.equipment_model_id;
			const equipmentStateId = this.equipmentData.equipment_state_id;
			const requestData = {
				factory_number: this.equipmentData.factory_number,
				inventory_number: this.equipmentData.inventory_number,
			};
			const data = await EquipmentDataService.create(equipmentModelId, equipmentStateId, requestData);
			this.createData = data;
			console.log(this.createData);
		},
		saveEquipment() {
      this.submitted = true;
			if (this.equipmentData.factory_number !== null && this.equipmentData.inventory_number !== null) {
				if (this.equipmentData.equipmentModel !== null && this.equipmentData.equipmentClass !== null ) {
					this.createEquipment();
					this.$toast.add({severity:'success', summary: 'Successful', detail: 'Оборудование добавлено', life: 3000});
					this.equipmentData = {
						factory_number: null,
						inventory_number: null,
						equipmentModel: null,
						equipment_state_id: 1,
					};
				}
			}
		},
		showDialog() {
			this.visibleDialog = true;
		},
		hideDialog() {
			this.visibleDialog = false;
			this.submitted = false;
			this.equipmentData = {};
			this.getEquipmentList();
		},
		deleteData() {
			if (this.selectedEquipment === null) {
				this.$toast.add({severity:'info', summary: 'Info', detail: 'Выберите оборудование', life: 3000});
			} else {
				this.deleteEquipment();
			}
		},
		deleteEquipment: async function() {
			const selectedId = this.selectedEquipment.equipment_id;
			await EquipmentDataService.delete(selectedId);
			this.getEquipmentList();
			this.selectedEquipment = null;
		},
		getEquipmentList: async function() {
			const data = await EquipmentDataService.getList();
			this.equipmentList = data;
			console.log(this.equipmentList);
		},
		getEquipmentModelList: async function() {
			const data = await EquipmentModelDataService.getList();
			this.equipmentModelList = data;
			console.log(this.equipmentModelList);
		},
		getEquipmentCategoryList: async function() {
			const data = await EquipmentCategoryDataService.getList();
			this.equipmentCategoryList = data;
			console.log(this.equipmentCategoryList);
		},
		getEquipmentClassList: async function() {
			const data = await EquipmentClassDataService.getList();
			this.equipmentClassList = data;
			console.log(this.equipmentClassList);
		},
		getEquipmentStateList: async function() {
			const data = await EquipmentStateDataService.getList();
			this.equipmentStateList = data;
			console.log(this.equipmentStateList);
		},		
	},
	mounted() {
			this.getEquipmentList();
			this.getEquipmentModelList();
			this.getEquipmentCategoryList();
			this.getEquipmentClassList();
			this.getEquipmentStateList();
			this.getClassList();
		}
}
</script>