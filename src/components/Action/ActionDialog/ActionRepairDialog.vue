<template>
  <Dialog
    :style="{ width: '1000px' }"
    header="Ремонт оборудования"
    :modal="true"
    class="p-fluid"
  >
    <Toast position="bottom-right" group="br" />
    <div class="card">
      <div class="flex align-items-stretch flex-wrap">
        <div class="field align-items-center">
          <label for="well_name" class="mb-3">Объект</label>
          <Dropdown
            id="well_name"
            v-model="selectedData.selectedWell"
            :options="wellList"
            @change="getWellEquipListByWell"
            optionLabel="well_name"
            placeholder="Выберите объект"
            class="w-full md:w-10rem"
            :class="{ 'p-invalid': submitted && !selectedData.selectedWell }"
          >
            <template #option="slotProps">
              <div v-if="slotProps.option.well_name">
                <span>{{ slotProps.option.well_name }}</span>
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
            <small
              class="p-error"
              v-if="submitted && !selectedData.selectedWell"
            >
            </small>
          </Dropdown>
        </div>

        <div class="field align-items-center ml-4">
          <label for="well_state_name" class="mb-3">Состояние объекта</label>
          <Dropdown
            id="well_state_name"
            v-model="selectedData.selectedWellState"
            :options="wellStateList"
            optionLabel="well_state_name"
            placeholder="Выберите состояние объекта"
            class="w-full md:w-10rem"
            :class="{
              'p-invalid': submitted && !selectedData.selectedWellState,
            }"
          >
            <template #option="slotProps">
              <div v-if="slotProps.option.well_state_name">
                <span>{{ slotProps.option.well_state_name }}</span>
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
            <small
              class="p-error"
              v-if="submitted && !selectedData.selectedWellState"
            >
            </small>
          </Dropdown>
        </div>

        <div class="field align-items-center ml-4">
          <label for="equipment_state_name" class="mb-3"
            >Состояние оборудования</label
          >
          <Dropdown
            id="equipment_state_name"
            v-model="selectedData.selectedEquipmentState"
            :options="equipmentStateList"
            optionLabel="equipment_state_name"
            placeholder="Выберите состояние оборудования"
            class="w-full md:w-10rem"
            :class="{
              'p-invalid': submitted && !selectedData.selectedEquipmentState,
            }"
          >
            <template #option="slotProps">
              <div v-if="slotProps.option.equipment_state_name">
                <span>{{ slotProps.option.equipment_state_name }}</span>
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
            <small
              class="p-error"
              v-if="submitted && !selectedData.selectedEquipmentState"
            >
            </small>
          </Dropdown>
        </div>

        <div class="field align-items-center ml-4">
          <label for="action_group_sysname" class="mb-3"
            >Группа мероприятия</label
          >
          <Dropdown
            id="action_group_sysname"
            v-model="selectedData.selectedActionGroup"
            :options="actionGroupList"
            @change="getActionTypeListByGroup"
            optionLabel="action_group_sysname"
            placeholder="Выберите группу"
            class="w-full md:w-10rem"
            :class="{
              'p-invalid': submitted && !selectedData.selectedActionGroup,
            }"
          >
            <template #option="slotProps">
              <div v-if="slotProps.option.action_group_sysname">
                <span>{{ slotProps.option.action_group_sysname }}</span>
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
            <small
              class="p-error"
              v-if="submitted && !selectedData.selectedActionGroup"
            >
            </small>
          </Dropdown>
        </div>

        <div class="field align-items-center ml-4">
          <label for="action_type_sysname" class="mb-3">Тип мероприятия</label>
          <Dropdown
            id="action_type_sysname"
            v-model="actionData.actionType"
            :options="actionTypeList"
            optionLabel="action_type_sysname"
            placeholder="Выберите тип"
            class="w-full md:w-10rem"
            :class="{ 'p-invalid': submitted && !actionData.actionType }"
          >
            <template #option="slotProps">
              <div v-if="slotProps.option.action_type_sysname">
                <span>{{ slotProps.option.action_type_sysname }}</span>
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
            <small class="p-error" v-if="submitted && !actionData.actionType">
            </small>
          </Dropdown>
        </div>

        <div class="field align-items-center ml-4">
          <label for="action_state_name" class="mb-3">Состояние</label>
          <Dropdown
            id="action_state_name"
            v-model="actionData.actionState"
            :options="actionStateList"
            optionLabel="action_state_name"
            placeholder="Выберите состояние"
            class="w-full md:w-10rem"
            :class="{ 'p-invalid': submitted && !actionData.actionState }"
          >
            <template #option="slotProps">
              <div v-if="slotProps.option.action_state_name">
                <span>{{ slotProps.option.action_state_name }}</span>
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
            <small class="p-error" v-if="submitted && !actionData.actionState">
            </small>
          </Dropdown>
        </div>

        <div class="field align-items-center">
          <label for="date_begin">Дата начала</label>
          <Calendar
            v-model="actionData.date_begin"
            showIcon
            dateFormat="dd-mm-yy"
            placeholder="дд-мм-гггг"
            mask="99-99-9999"
          />
        </div>

        <div class="field align-items-center ml-4">
          <label for="date_end">Дата окончания</label>
          <Calendar
            v-model="actionData.date_end"
            showIcon
            dateFormat="dd-mm-yy"
            placeholder="дд-мм-гггг"
            mask="99-99-9999"
          />
        </div>

        <div class="field align-items-center ml-4">
          <label for="action_note">Примечание</label>
          <Textarea
            id="action_note"
            v-model="actionData.action_note"
            required="true"
            rows="5"
            cols="30"
          />
        </div>
      </div>
    </div>

    <div class="field">
      <DataTable
        class="pt-1 p-datatable-sm h-30rem"
        v-model:selection="actionData.wellEquipment"
        v-model:filters="filters"
        :value="wellEquipmentList"
        selectionMode="single"
        dataKey="well_equipment_id"
        filterDisplay="row"
        showGridlines
        :globalFilterFields="[
          'equipment.inventory_number',
          'equipment.equipmentModel.equipmentClass.equipmentCategory.equipment_category_name',
        ]"
      >
        <Column
          style="max-width: 10rem"
          header="Инвентарный номер"
          field="inventory_number"
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
          header="Категория"
          field="equipment.equipmentModel.equipmentClass.equipmentCategory.equipment_category_name"
          filterField="equipment.equipmentModel.equipmentClass.equipmentCategory.equipment_category_name"
          sortable
        >
          <template #body="{ data }">
            {{
              data.equipment.equipmentModel.equipmentClass.equipmentCategory
                .equipment_category_name
            }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <Dropdown
              class="p-column-filter w-full md:w-10rem"
              :showClear="true"
              v-model="filterModel.value"
              @change="filterCallback()"
              :options="equipmentCategoryList"
              optionLabel="equipment_category_name"
              optionValue="equipment_category_name"
              placeholder="Категория"
            >
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
          sortable
        >
          <template #body="{ data }">
            {{ data.equipment.equipmentState.equipment_state_name }}
          </template>
        </Column>
      </DataTable>
    </div>

    <template #footer>
      <Button label="Очистить" icon="pi pi-eraser" text @click="refreshData" />
      <Button label="Сохранить" icon="pi pi-check" text @click="createRepair" />
    </template>
  </Dialog>
</template>

<script>
import { FilterMatchMode, FilterOperator } from "primevue/api";

import ActionService from "../../../services/ActionService";
import ActionTypeService from "../../../services/ActionTypeService";
import ActionStateService from "../../../services/ActionStateService";
import EquipmentCategoryService from "../../../services/EquipmentCategoryService";
import EquipmentService from "../../../services/EquipmentService";
import EquipmentStateService from "../../../services/EquipmentStateService";
import WellService from "../../../services/WellService";
import WellStateService from "../../../services/WellStateService";

export default {
  data() {
    return {
      submitted: false,
      wellList: [],
      wellStateList: [],
      wellEquipmentList: [],
      equipmentStateList: [],
      actionGroupList: [],
      actionTypeList: [],
      equipmentList: [],
      equipmentCategoryList: [],
      updatedWellState: {},
      updatedEquipmentState: {},
      createdActionData: {},
      actionData: {
        date_begin: "",
        date_end: "",
        action_note: null,
        wellEquipment: null,
        actionType: null,
        actionState: null,
      },
      selectedData: {
        selectedWell: null,
        selectedWellState: null,
        selectedEquipmentState: null,
        selectedActionGroup: null,
      },
      filters: {
        "equipment.inventory_number": {
          value: null,
          matchMode: FilterMatchMode.CONTAINS,
        },
        "equipment.equipmentModel.equipmentClass.equipmentCategory.equipment_category_name":
          {
            value: null,
            matchMode: FilterMatchMode.EQUALS,
          },
      },
    };
  },
  methods: {
    getWellList: async function () {
      const data = await WellService.getList();
      this.wellList = data;
      console.log(this.wellList);
    },
    getWellStateList: async function () {
      const data = await WellStateService.getList();
      this.wellStateList = data;
      console.log(this.wellStateList);
    },
    getEquipmentStateList: async function () {
      const data = await EquipmentStateService.getList();
      this.equipmentStateList = data;
      console.log(this.equipmentStateList);
    },
    getEquipmentCategoryList: async function () {
      const data = await EquipmentCategoryService.getList();
      this.equipmentCategoryList = data;
      console.log(this.equipmentCategoryList);
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
    getActionTypeListByGroup: async function () {
      const actionGroupId =
        this.selectedData.selectedActionGroup.action_group_id;
      const data = await ActionTypeService.getListByGroup(actionGroupId);
      this.actionData.actionType = null;
      this.actionTypeList = data;
      console.log(this.actionTypeList);
    },
    getWellEquipListByWell: async function () {
      const wellId = this.selectedData.selectedWell.well_id;
      const data = await WellEquipmentService.getListByWell(wellId);
      this.wellEquipmentList = data;
      console.log(this.wellEquipmentList);
    },
    updateEquipmentState: async function () {
      const equipmentId = this.actionData.wellEquipment.equipment.equipment_id;
      const equipmentStateId =
        this.selectedData.selectedEquipmentState.equipment_state_id;
      const data = await EquipmentService.updateState(
        equipmentId,
        equipmentStateId
      );
      this.updatedEquipmentState = data;
      console.log(this.updatedEquipmentState);
    },
    updateWellState: async function () {
      const wellId = this.selectedData.selectedWell.well_id;
      const wellStateId = this.selectedData.selectedWellState.well_state_id;
      const data = await WellService.updateState(wellId, wellStateId);
      this.updatedWellState = data;
      console.log(this.updatedWellState);
    },
    createActionData: async function () {
      const wellEquipmentId = this.actionData.wellEquipment.well_equipment_id;
      const actionTypeId = this.actionData.actionType.action_type_id;
      const actionStateId = this.actionData.actionState.action_state_id;
      const requestData = {
        date_begin: this.actionData.date_begin,
        date_end: this.actionData.date_end,
        action_note: this.actionData.action_note,
      };
      const data = await ActionService.create(
        wellEquipmentId,
        actionTypeId,
        actionStateId,
        requestData
      );
      this.createdActionData = data;
      console.log(this.createdActionData);
    },
    createRepair() {
      this.submitted = true;
      if (
        this.selectedData.selectedWell !== null &&
        this.selectedData.selectedWellState !== null &&
        this.selectedData.selectedEquipmentState !== null &&
        this.selectedData.selectedActionGroup !== null &&
        this.actionData.actionType !== null &&
        this.actionData.actionState !== null &&
        this.actionData.wellEquipment !== null
      ) {
        this.createActionData();
        this.updateEquipmentState();
        this.updateWellState();
        this.submitted = false;
        this.$toast.add({
          severity: "success",
          summary: "Успешно",
          detail: "Мероприятие по установке добавлено",
          group: "br",
          life: 3000,
        });
        this.refreshData();
      } else {
        this.$toast.add({
          severity: "error",
          summary: "Внимание",
          detail: "Заполните выделенные поля",
          group: "br",
          life: 3000,
        });
      }
    },
    refreshData() {
      this.wellEquipmentList = null;
      this.actionData = {
        date_begin: "",
        date_end: "",
        action_note: null,
        wellEquipment: null,
        actionType: null,
        actionState: null,
      };
      this.selectedData = {
        selectedWell: null,
        selectedWellState: null,
        selectedEquipmentState: null,
        selectedActionGroup: null,
      };
    },
  },
  mounted() {
    this.getWellList();
    this.getWellStateList();
    this.getEquipmentStateList();
    this.getEquipmentCategoryList();
    this.getActionGroupList();
    this.getActionStateList();
  },
};
</script>