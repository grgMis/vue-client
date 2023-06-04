<template>
  <div class="card">
    <DataTable
      class="pt-1 p-datatable-sm h-25rem mb-8"
      v-model:filters="filters"
      :value="equipmentList"
      paginator
      :rows="10"
      dataKey="action_composition_id"
      filterDisplay="row"
      showGridlines
      :globalFilterFields="[
        'equipment.inventory_number',
        'equipment.equipmentState.equipment_state_name',
      ]"
    >
		<template #empty> Метрологического оборудования не найден. </template>
      <Column
        style="max-width: 10rem"
        header="Инвентарный номер"
        field="equipment.inventory_number"
        filterField="equipment.inventory_number"
        sortable
        :showFilterMenu="false"
      >
        <template #body="{ data }">
          {{ data.equipment.inventory_number }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            class="p-column-filter p-inputtext-sm w-full md:w-10rem"
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            placeholder="Поиск"
            showClear
          />
        </template>
      </Column>

			<Column
        style="max-width: 10rem"
        header="Инвентарный номер"
        field="equipment.factory_number"
        sortable
        :showFilterMenu="false"
      >
        <template #body="{ data }">
          {{ data.equipment.factory_number }}
        </template>
      </Column>

      <Column
        style="max-width: 10rem"
        header="Модель"
        field="equipment.equipmentModel.equipment_model_name"
        sortable
      >
        <template #body="{ data }">
          {{ data.equipment.equipmentModel.equipment_model_name }}
        </template>
      </Column>

      <Column
        style="max-width: 10rem"
        header="Класс"
        field="equipment.equipmentModel.equipmentClass.equipment_class_name"
        sortable
      >
        <template #body="{ data }">
          {{
            data.equipment.equipmentModel.equipmentClass.equipment_class_name
          }}
        </template>
      </Column>

      <Column
        style="max-width: 10rem"
        header="Состояние"
        field="equipment.equipmentState.equipment_state_name"
        filterField="equipment.equipmentState.equipment_state_name"
        :showFilterMenu="false"
        sortable
      >
        <template #body="{ data }">
          {{
            data.equipment.equipmentState.equipment_state_name
          }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <Dropdown
            class="p-column-filter w-full md:w-10rem"
            :showClear="true"
            v-model="filterModel.value"
            @change="filterCallback()"
            :options="equipmentStateList"
            optionLabel="equipment_state_name"
            optionValue="equipment_state_name"
            placeholder=""
          >
            <template #option="slotProps">
              <div>
                <span>{{ slotProps.option.equipment_state_name }}</span>
              </div>
            </template>
          </Dropdown>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
import { FilterMatchMode } from "primevue/api";

import ActionCompositionService from '../../../services/ActionCompositionService';
import EquipmentStateService from '../../../services/EquipmentStateService';

export default {
  name: "MetrologyTemplate",
	props: {
    selectedWell: null
	},
  data() {
    return {
			equipmentList: [],
			equipmentStateList: [],
			equipmentCategoryId: 4,
			filters: {
        "equipment.inventory_number": {
          value: null,
          matchMode: FilterMatchMode.CONTAINS,
        },
        "equipment.equipmentState.equipment_state_name":
          {
            value: null,
            matchMode: FilterMatchMode.EQUALS,
          },
      },
		};
  },
	methods: {
		getEquipmentDataList: async function () {
      const equipmentCategoryId = this.equipmentCategoryId;
      const wellId = this.selectedWell.well_id;
      const data =
        await ActionCompositionService.getListByWellAndEquipmentCategory(
          wellId,
          equipmentCategoryId
        );
      this.equipmentList = data;
      console.log(this.equipmentList);
    },
		getEquipmentStateList: async function () {
      const data = await EquipmentStateService.getList();
      this.equipmentStateList = data;
    },
	},
	created() {
		this.getEquipmentDataList();
		this.getEquipmentStateList();
	}
};
</script>