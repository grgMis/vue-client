<template>
  <Toast position="bottom-right" group="br" />
  <ConfirmDialog />

  <ActionEntryDialog v-model:visible="visibleEntryDialog"></ActionEntryDialog>
  <ActionRepairDialog v-model:visible="visibleRepairDialog"></ActionRepairDialog>
  <ActionDemolitionDialog v-model:visible="visibleDemolitionDialog"></ActionDemolitionDialog>
	<ActionInfoDialog v-model:visible="visibleInfoDialog" :selectedAction="selectedAction"></ActionInfoDialog>

  <Toolbar>
    <template #start>
      <span class="font-bold text-3xl">Мероприятия</span>
    </template>
    <template #end>
      <Button
        label="Установка"
        @click="showEntryDialog"
        icon="pi pi-plus"
        class="mr-2"
        style="color: gray"
        outlined
      />
      <Button
        label="Демонтаж"
        @click="showDemolitionDialog"
        icon="pi pi-times"
        class="mr-2"
        style="color: gray"
        outlined
      />
      <Button
        label="Ремонт"
        @click="showRepairDialog"
        icon="pi pi-wrench"
        class="mr-2"
        style="color: gray"
        outlined
      />
      <Button
        @click="refreshData"
        icon="pi pi-refresh"
        class="mr-2"
        style="color: gray"
        outlined
      />
    </template>
  </Toolbar>

  <DataTable
    class="pt-1 p-datatable-sm"
    paginator
    @dblclick="showInfo"
    :rows="19"
    v-model:selection="selectedAction"
    v-model:filters="filters"
    :value="actionList"
    selectionMode="single"
    dataKey="action_id"
    filterDisplay="row"
    showGridlines
    :globalFilterFields="[
      'wellEquipment.well.well_name',
      'wellEquipment.equipment.inventory_number',
      'wellEquipment.equipment.equipmentModel.equipmentClass.equipment_class_name',
      'actionType.action_type_sysname',
      'actionType.actionGroup.action_group_sysname',
      'actionState.action_state_name',
    ]"
  >
    <Column
      style="max-width: 10rem"
      header="Объект"
      field="wellEquipment.well.well_name"
      filterField="wellEquipment.well.well_name"
      sortable
      :showFilterMenu="false"
    >
      <template #body="{ data }">
        {{ data.wellEquipment.well.well_name }}
      </template>
      <template #filter="{ filterModel, filterCallback }">
        <Dropdown
          class="p-column-filter w-full md:w-10rem"
          :showClear="true"
          v-model="filterModel.value"
          @change="filterCallback()"
          :options="wellList"
          optionLabel="well_name"
          optionValue="well_name"
          placeholder="Объект"
        >
          <template #option="slotProps">
            <div>
              <span>{{ slotProps.option.well_name }}</span>
            </div>
          </template>
        </Dropdown>
      </template>
    </Column>

    <Column
      style="max-width: 10rem"
      header="Инвентарный номер"
      field="wellEquipment.equipment.inventory_number"
      filterField="wellEquipment.equipment.inventory_number"
      sortable
      :showFilterMenu="false"
    >
      <template #body="{ data }">
        {{ data.wellEquipment.equipment.inventory_number }}
      </template>
      <template #filter="{ filterModel, filterCallback }">
        <InputText
          class="p-column-filter p-inputtext-sm w-full md:w-10rem"
          v-model="filterModel.value"
          type="text"
          @input="filterCallback()"
          placeholder="Поиск"
        />
      </template>
    </Column>

    <Column
      style="max-width: 10rem"
      header="Класс"
      field="wellEquipment.equipment.equipmentModel.equipmentClass.equipment_class_name"
      filterField="wellEquipment.equipment.equipmentModel.equipmentClass.equipment_class_name"
      sortable
      :showFilterMenu="false"
    >
      <template #body="{ data }">
        {{
          data.wellEquipment.equipment.equipmentModel.equipmentClass
            .equipment_class_name
        }}
      </template>
      <template #filter="{ filterModel, filterCallback }">
        <Dropdown
          class="p-column-filter w-full md:w-10rem"
          :showClear="true"
          v-model="filterModel.value"
          @change="filterCallback()"
          :options="equipmentClassList"
          optionLabel="equipment_class_name"
          optionValue="equipment_class_name"
          placeholder="Класс"
        >
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
      header="Тип мероприятия"
      field="actionType.action_type_sysname"
      filterField="actionType.action_type_sysname"
      sortable
      :showFilterMenu="false"
    >
      <template #body="{ data }">
        {{ data.actionType.action_type_name }}
      </template>
      <template #filter="{ filterModel, filterCallback }">
        <InputText
          class="p-column-filter p-inputtext-sm w-full md:w-10rem"
          v-model="filterModel.value"
          type="text"
          @input="filterCallback()"
          placeholder="Поиск"
        />
      </template>
    </Column>

    <Column
      style="max-width: 10rem"
      header="Группа мероприятия"
      field="actionType.actionGroup.action_group_sysname"
      filterField="actionType.actionGroup.action_group_sysname"
      sortable
      :showFilterMenu="false"
    >
      <template #body="{ data }">
        {{ data.actionType.actionGroup.action_group_name }}
      </template>
      <template #filter="{ filterModel, filterCallback }">
        <Dropdown
          class="p-column-filter w-full md:w-10rem"
          :showClear="true"
          v-model="filterModel.value"
          @change="filterCallback()"
          :options="actionGroupList"
          optionLabel="actionGroup"
          optionValue="action_group_sysname"
          placeholder="Группа"
        >
          <template #option="slotProps">
            <div>
              <span>{{ slotProps.option.action_group_sysname }}</span>
            </div>
          </template>
        </Dropdown>
      </template>
    </Column>

    <Column
      style="max-width: 12rem"
      header="Дата начала"
      field="date_begin"
      dataType="date"
      :showFilterMenu="false"
      sortable
    >
      <template #body="{ data }">
        {{ data.date_begin }}
      </template>
    </Column>

    <Column
      style="max-width: 12rem"
      header="Дата окончания"
      field="date_end"
      dataType="date"
      :showFilterMenu="false"
      sortable
    >
      <template #body="{ data }">
        {{ data.date_end }}
      </template>
    </Column>

    <Column
      style="max-width: 10rem"
      header="Состояние"
      field="actionState.action_state_name"
      filterField="actionState.action_state_name"
      sortable
      :showFilterMenu="false"
    >
      <template #body="slotProps">
        <Tag
          :value="slotProps.data.actionState.action_state_name"
          :severity="getSeverity(slotProps.data)"
        />
      </template>
      <template #filter="{ filterModel, filterCallback }">
        <Dropdown
          class="p-column-filter w-full md:w-10rem"
          :showClear="true"
          v-model="filterModel.value"
          @change="filterCallback()"
          :options="actionStateList"
          optionLabel="action_state_name"
          optionValue="action_state_name"
          placeholder="Состояние"
        >
          <template #option="slotProps">
            <div>
              <span>{{ slotProps.option.action_state_name }}</span>
            </div>
          </template>
        </Dropdown>
      </template>
    </Column>
  </DataTable>
</template>


<script>
import ActionEntryDialog from "./ActionDialog/ActionEntryDialog.vue";
import ActionRepairDialog from "./ActionDialog/ActionRepairDialog.vue";
import ActionDemolitionDialog from "./ActionDialog/ActionDemolitionDialog.vue";
import ActionInfoDialog from "./ActionDialog/ActionInfoDialog.vue"

import { FilterMatchMode } from "primevue/api";
import ActionService from "../../services/ActionService";
import WellService from "../../services/WellService";
import ActionTypeService from "../../services/ActionTypeService";
import ActionGroupService from "../../services/ActionGroupService";
import ActionStateService from "../../services/ActionStateService";
import EquipmentClassService from "../../services/EquipmentClassService";

export default {
  name: "Action",
  components: {
    ActionEntryDialog,
    ActionRepairDialog,
    ActionDemolitionDialog,
		ActionInfoDialog
  },
  data() {
    return {
      submitted: false,
      visibleRepairDialog: false,
      visibleEntryDialog: false,
      visibleDemolitionDialog: false,
      visibleInfoDialog: false,

      createData: [],
      actionList: [],
      selectedAction: null,
      actionData: {
        date_begin: "",
        date_end: "",
        action_note: null,
        wellEquipment: null,
        actionType: null,
        actionState: null,
      },
      wellList: [],
      equipmentClassList: [],
      actionTypeList: [],
      actionGroupList: [],
      actionStateList: [],
      filters: {
        "wellEquipment.well.well_name": {
          value: null,
          matchMode: FilterMatchMode.EQUALS,
        },
        "wellEquipment.equipment.inventory_number": {
          value: null,
          matchMode: FilterMatchMode.CONTAINS,
        },
        "wellEquipment.equipment.equipmentModel.equipmentClass.equipment_class_name":
          {
            value: null,
            matchMode: FilterMatchMode.EQUALS,
          },
        "actionType.action_type_sysname": {
          value: null,
          matchMode: FilterMatchMode.CONTAINS,
        },
        "actionType.actionGroup.action_group_sysname": {
          value: null,
          matchMode: FilterMatchMode.EQUALS,
        },
        "actionState.action_state_name": {
          value: null,
          matchMode: FilterMatchMode.EQUALS,
        },
      },
    };
  },
  methods: {
    showEntryDialog() {
      this.visibleEntryDialog = true;
    },
    showRepairDialog() {
      this.visibleRepairDialog = true;
    },
    showDemolitionDialog() {
      this.visibleDemolitionDialog = true;
    },
    showInfo() {
      this.visibleInfoDialog = true;
    },
    getActionList: async function () {
      const data = await ActionService.getList();
      this.actionList = data;
      console.log(this.actionList);
    },
    getWellList: async function () {
      const data = await WellService.getList();
      this.wellList = data;
      console.log(this.wellList);
    },
    getEquipmentClassList: async function () {
      const data = await EquipmentClassService.getList();
      this.equipmentClassList = data;
      console.log(this.equipmentClassList);
    },
    getActionTypeList: async function () {
      const data = await ActionTypeService.getList();
      this.actionTypeList = data;
      console.log(this.actionTypeList);
    },
    getActionGroupList: async function () {
      const data = await ActionGroupService.getList();
      this.actionGroupList = data;
      console.log(this.actionGroupList);
    },
    getActionStateList: async function () {
      const data = await ActionStateService.getList();
      this.actionStateList = data;
      console.log(this.actionStateList);
    },
    refreshData() {
      this.$toast.add({
        severity: "success",
        summary: "Внимание",
        detail: "Данные перезагружены",
        group: "br",
        life: 3000,
      });
      this.getActionList();
    },
    getSeverity(action) {
      switch (action.actionState.action_state_name) {
        case "Активно":
          return "danger";

        case "Завершено":
          return "success";

        default:
          return null;
      }
    },
  },
  mounted() {
    this.getActionList();
    this.getWellList();
    this.getEquipmentClassList();
    this.getActionTypeList();
    this.getActionGroupList();
    this.getActionStateList();
  },
};
</script>