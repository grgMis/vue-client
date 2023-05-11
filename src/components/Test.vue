<template>
	<div>
		<DataTable 
			class="border-round pt-1 p-datatable-sm"
			paginator :rows="19"
			v-model:filters="filters"
			:value="entryActionList"
			dataKey="eqntry_action_id"
			filterDisplay="row"
			showGridlines
			:globalFilterFields="['wellEquipment.well.well_name',
														'wellEquipment.well.dept.dept_name',
														'wellEquipment.equipment.equipmentModel.equipmentClass.equipmentCategory.equipment_category_name',
														'wellEquipment.equipment.equipmentModel.equipmentClass.equipment_class_name',
														'wellEquipment.equipment.equipmentModel.equipment_model_name',
														'wellEquipment.equipment.inventory_number',
														'wellEquipment.equipment.factory_number',
														'wellEquipment.equipment.equipmentState.equipment_state_name',
														'date_begin']">
			<Column
				style="max-width: 10.2rem"
				header="Объект"
				filterField="wellEquipment.well.well_name"
				sortable
				:showFilterMenu="false">
				<template #body="{ data }">
					{{ data.wellEquipment.well.well_name }}
				</template>
				<template #filter="{ filterModel, filterCallback }">
					<Dropdown
					  class="p-column-filter"
						style="width: 145px"
						:showClear="true"
						v-model="filterModel.value"
						@change="filterCallback()"
						:options="wellList"
						optionLabel="well_name" 
						optionValue="well_name"
						placeholder="Объект">
						<template #option="slotProps">
							<div>
								<span>{{ slotProps.option.well_name }}</span>
							</div>
						</template>
					</Dropdown>
				</template>
			</Column>

			<Column
				style="max-width: 12.5rem"
				header="Компания"
				filterField="wellEquipment.well.dept.dept_name"
				sortable
				:showFilterMenu="false">
				<template #body="{ data }">
					{{ data.wellEquipment.well.dept.dept_name }}
				</template>
				<template #filter="{ filterModel, filterCallback }">
					<Dropdown
					class="p-column-filter"
					style="width: 165px"
					:showClear="true"
					v-model="filterModel.value"
					@change="filterCallback()"
					:options="deptList"
					optionLabel="dept_name" 
					optionValue="dept_name"
					placeholder="Компания">
						<template #option="slotProps">
							<div>
								<span>{{ slotProps.option.dept_name }}</span>
							</div>
						</template>
					</Dropdown>
				</template>
			</Column>

			<Column
				style="max-width: 12.5rem"
				header="Категория"
				filterField="wellEquipment.equipment.equipmentModel.equipmentClass.equipmentCategory.equipment_category_name"
				field="wellEquipment.equipment.equipmentModel.equipmentClass.equipmentCategory.equipment_category_name" 
				sortable 
				:showFilterMenu="false">
				<template #body="{ data }">
					{{ data.wellEquipment.equipment.equipmentModel.equipmentClass.equipmentCategory.equipment_category_name }}
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
				style="max-width: 12.5rem"
				header="Класс"
				filterField="wellEquipment.equipment.equipmentModel.equipmentClass.equipment_class_name" 
			  field="wellEquipment.equipment.equipmentModel.equipmentClass.equipment_class_name"
				sortable
				:showFilterMenu="false">
				<template #body="{ data }">
					{{ data.wellEquipment.equipment.equipmentModel.equipmentClass.equipment_class_name }}
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
				style="max-width: 12.5rem"
				header="Модель"
				filterField="wellEquipment.equipment.equipmentModel.equipment_model_name"
				field="wellEquipment.equipment.equipmentModel.equipment_model_name"
				sortable
				:showFilterMenu="false">
				<template #body="{ data }">
					{{ data.wellEquipment.equipment.equipmentModel.equipment_model_name }}
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
				style="width: 10%"
				header="Инвентарный номер"
				field="wellEquipment.equipment.inventory_number"
				sortable
				:showFilterMenu="false">
				<template #body="{ data }">
					{{ data.wellEquipment.equipment.inventory_number }}
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
				style="width: 10%"
				header="Заводской номер"
				field="wellEquipment.equipment.factory_number"
				sortable
				:showFilterMenu="false">
				<template #body="{ data }">
					{{ data.wellEquipment.equipment.factory_number }}
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
				style="width: 10%"
				header="Дата установки"
				filterField="date_begin"
				dataType="date"
				:showFilterMenu="false"
				sortable>
        <template #body="{ data }">
            {{ data.date_begin }}
        </template>
        <template #filter="{ filterModel }">
            <Calendar
							v-model="filterModel.value"
							dateFormat="dd-mm-yy"
							placeholder="dd-mm-yy"
							mask="99-99-99"
							style="width: 7rem" />
        </template>
    	</Column>

			<Column
				style="max-width: 12.5rem"
				field="wellEquipment.equipment.equipmentState.equipment_state_name"
				sortable
				header="Состояние"
				:showFilterMenu="false">
				<template #body="{ data }">
					{{ data.wellEquipment.equipment.equipmentState.equipment_state_name }}
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

			<Column
				style="width: 10%"
				field="depth_begin"
				sortable
				header="H нач."
				:showFilterMenu="false">
				<template #body="{ data }">
					{{ data.depth_begin }}
				</template>
			</Column>

			<Column
				style="width: 10%"
				field="depth_end"
				sortable
				header="H кон."
				:showFilterMenu="false">
				<template #body="{ data }">
					{{ data.depth_end }}
				</template>
			</Column>

			<Column
				style="width: 10%"
				field="depth_length"
				sortable
				header="Длина"
				:showFilterMenu="false">
				<template #body="{ data }">
					{{ data.depth_length }}
				</template>
			</Column>
		</DataTable>
	</div>
</template>

<script>

import EntryActionDataService from '../services/EntryActionDataService'
import WellDataService from '../services/WellDataService'
import DeptDataService from '../services/DeptDataService'
import EquipmentCategoryDataService from '../services/EquipmentCategoryDataService'
import EquipmentClassDataService from '../services/EquipmentClassDataService'
import EquipmentModelDataService from '../services/EquipmentModelDataService'
import EquipmentStateDataService from '../services/EquipmentStateDataService'

import EquipmentDataService from "../services/EquipmentDataService"

import { FilterMatchMode, FilterOperator } from 'primevue/api'

export default {
	name: 'Test',
	data () {
		return {
			entryActionList: [],
			wellList: [],
			deptList: [],
			equipmentCategoryList: [],
			equipmentClassList: [],
			equipmentModelList: [],
			equipmentStateList: [],

			equipmentList: [],
			
			filters: {
				'wellEquipment.well.well_name': { value: null, matchMode: FilterMatchMode.EQUALS },
				'wellEquipment.well.dept.dept_name': { value: null, matchMode: FilterMatchMode.EQUALS },
				'wellEquipment.equipment.equipmentModel.equipmentClass.equipmentCategory.equipment_category_name': { value: null, matchMode: FilterMatchMode.EQUALS },
				'wellEquipment.equipment.equipmentModel.equipmentClass.equipment_class_name': { value: null, matchMode: FilterMatchMode.EQUALS },
				'wellEquipment.equipment.equipmentModel.equipment_model_name': { value: null, matchMode: FilterMatchMode.EQUALS },
				'wellEquipment.equipment.inventory_number': { value:null, matchMode: FilterMatchMode.CONTAINS },
				'wellEquipment.equipment.factory_number': { value:null, matchMode: FilterMatchMode.CONTAINS },
				date_begin: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS}] },
				'wellEquipment.equipment.equipmentState.equipment_state_name': { value:null, matchMode: FilterMatchMode.EQUALS }
      },
		}
	},
	methods: {
		getEntryActionList: async function() {
			const data = await EntryActionDataService.getList();
			this.entryActionList = data;
			console.log(this.entryActionList);
		},
		getWellList: async function() {
			const data = await WellDataService.getList();
			this.wellList = data;
			console.log(this.wellList);
		},
		getDeptList: async function() {
			const data = await DeptDataService.getList();
			this.deptList = data;
			console.log(this.deptList);
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
		getEquipmentModelList: async function() {
			const data = await EquipmentModelDataService.getList();
			this.equipmentModelList = data;
			console.log(this.equipmentModelList);
		},
		getEquipmentStateList: async function() {
			const data = await EquipmentStateDataService.getList();
			this.equipmentStateList = data;
			console.log(this.equipmentStateList);
		},

		getEquipmentList: async function() {
			const data = await EquipmentDataService.getList();
			this.equipmentList = data;
			console.log(this.equipmentList);
		},
		
	},
	mounted() {
		this.getEntryActionList();
		this.getWellList();
		this.getDeptList();
		this.getEquipmentCategoryList();
		this.getEquipmentClassList();
		this.getEquipmentModelList();
		this.getEquipmentStateList();

		this.getEquipmentList();
		
	},
}
</script>