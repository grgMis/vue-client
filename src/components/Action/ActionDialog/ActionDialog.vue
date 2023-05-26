<template>
  <Dialog
    :style="{ width: '1000px' }"
    header="Создание мероприятия"
    :modal="true"
    class="p-fluid"
  >
    <Toast position="bottom-right" group="br" />
    <div class="card">
      <div class="flex align-items-stretch flex-wrap">
        <div class="field align-items-center ml-4">
          <label for="well_name" class="mb-3">Объект</label>
          <Dropdown
            id="well_name"
            v-model="selectedData.selectedWell"
            :options="wellList"
            filter
            optionLabel="well_name"
            placeholder="Объект"
            class="w-full md:w-15rem"
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
          <label for="action_type_name" class="mb-3">Вид мероприятия</label>
          <Dropdown
            id="action_type_name"
            v-model="selectedData.selectedActionType"
            :options="actionTypeList"
            filter
            optionLabel="action_type_name"
            placeholder="Вид мероприятия"
            class="w-full md:w-15rem"
            :class="{
              'p-invalid': submitted && !selectedData.selectedActionType,
            }"
          >
            <template #option="slotProps">
              <div v-if="slotProps.option.action_type_name">
                <span>{{ slotProps.option.action_type_name }}</span>
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
            <small
              class="p-error"
              v-if="submitted && !selectedData.selectedActionType"
            >
            </small>
          </Dropdown>
        </div>

        <div class="field align-items-center ml-4">
          <label for="user_name" class="mb-3">Ответственный</label>
          <Dropdown
            id="user_name"
            v-model="selectedData.selectedUser"
            :options="userList"
            filter
            optionLabel="user_name"
            placeholder="Сотрудник"
            class="w-full md:w-15rem"
            :class="{ 'p-invalid': submitted && !selectedData.selectedUser }"
          >
            <template #option="slotProps">
              <div v-if="slotProps.option.employee.employee_last_name">
                <span>{{ slotProps.option.employee.employee_last_name + " " +
									slotProps.option.employee.employee_first_name[0] + "." + " " +
									slotProps.option.employee.employee_father_name[0] + "." }}</span>
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
            <small
              class="p-error"
              v-if="submitted && !selectedData.selectedUser"
            >
            </small>
          </Dropdown>
        </div>

        <div class="field align-items-center ml-4">
          <label for="date_begin" class="mb-3">Дата начала</label>
          <Calendar
            v-model="actionData.date_begin"
            class="w-full md:w-10rem"
            showIcon
						dateFormat="dd/mm/yyyy"
            placeholder="дд.мм.гггг"
            mask="99.99.9999"
          />
        </div>

        <div class="field align-items-center ml-4">
          <label for="date_end" class="mb-3">Дата окончания</label>
          <Calendar
						style="p-calendar"
            v-model="actionData.date_end"
            class="w-full md:w-10rem"
						dateOnly
            showIcon
            placeholder="дд.мм.гггг"
            mask="99.99.9999"
          />
        </div>

        <div class="field align-items-center ml-4">
          <label for="action_note" class="mb-3">Примечание</label>
          <Textarea
            id="action_note"
            v-model="actionData.action_note"
            required="true"
            rows="4"
            cols="30"
          />
        </div>
      </div>
    </div>

    <div class="field">
      <TabView class="tabview-custom">
        <TabPanel>
          <template #header>
            <i class="pi pi-plus mr-2"></i>
            <span>Монтаж</span>
          </template>
          <DataTable
            class="pt-1 p-datatable-sm h-25rem"
            v-model:selection="selectedEquipments"
            v-model:filters="filters"
            :value="equipmentList"
            selectionMode="multiple"
            paginator
            :rows="6"
            dataKey="equipment_id"
            filterDisplay="row"
            showGridlines
            :globalFilterFields="[
              'inventory_number',
              'equipmentModel.equipmentClass.equipmentCategory.equipment_category_name',
            ]"
          >
            <Column selectionMode="multiple" headerStyle="width: 3rem" />
            <Column
              style="max-width: 10rem"
              header="Инвентарный номер"
              field="inventory_number"
              filterField="inventory_number"
              sortable
              :showFilterMenu="false"
            >
              <template #body="{ data }">
                {{ data.inventory_number }}
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
              field="equipmentModel.equipmentClass.equipmentCategory.equipment_category_name"
              filterField="equipmentModel.equipmentClass.equipmentCategory.equipment_category_name"
              :showFilterMenu="false"
							sortable
            >
              <template #body="{ data }">
                {{
                  data.equipmentModel.equipmentClass.equipmentCategory
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
                      <span>{{
                        slotProps.option.equipment_category_name
                      }}</span>
                    </div>
                  </template>
                </Dropdown>
              </template>
            </Column>

            <Column
              style="max-width: 10rem"
              header="Модель"
              field="equipmentModel.equipment_model_name"
              sortable
            >
              <template #body="{ data }">
                {{ data.equipmentModel.equipment_model_name }}
              </template>
            </Column>

            <Column
              style="max-width: 10rem"
              header="Класс"
              field="equipmentModel.equipmentClass.equipment_class_name"
              sortable
            >
              <template #body="{ data }">
                {{ data.equipmentModel.equipmentClass.equipment_class_name }}
              </template>
            </Column>

            <Column
              style="max-width: 10rem"
              header="Состояние"
              field="equipmentState.equipment_state_name"
              sortable
            >
              <template #body="{ data }">
                {{ data.equipmentState.equipment_state_name }}
              </template>
            </Column>
          </DataTable>
          <div class="card">
            <Button
              label="Сохранить"
              class="w-full md:w-10rem"
              icon="pi pi-save"
              text
              @click="createEntryAction"
            />
            <Button
              label="Очистить"
              class="w-full md:w-10rem"
              icon="pi pi-eraser"
              text
              @click="showDateData"
            />
          </div>
        </TabPanel>
        <TabPanel>
          <template #header>
            <i class="pi pi-times mr-2"></i>
            <span>Демонтаж</span>
          </template>
        </TabPanel>
        <TabPanel>
          <template #header>
            <i class="pi pi-wrench mr-2"></i>
            <span>Ремонт</span>
          </template>
        </TabPanel>
      </TabView>
    </div>
  </Dialog>
</template>

<script>
import { FilterMatchMode } from "primevue/api";

import ActionCompositionService from "../../../services/ActionCompositionService";
import EquipmentService from "../../../services/EquipmentService";
import WellService from "../../../services/WellService";
import UserService from "../../../services/UserService";
import ActionService from "../../../services/ActionService";
import ActionTypeService from "../../../services/ActionTypeService";
import EquipmentCategoryService from '../../../services/EquipmentCategoryService';

export default {
  data() {
    return {
      submitted: false,
      meatKey: true,
      equipmentList: [],
      wellList: [],
      actionTypeList: [],
      userList: [],
			equipmentCategoryList: [],
      selectedEquipments: [],
			createdAction: null,
      updateStateData: {
        wellStateId: 3,
        equipmentStateId: 2,
      },
      selectedData: {
        selectedWell: null,
        selectedUser: null,
        selectedActionType: null,
      },
      actionData: {
        actionStateId: 1,
        date_begin: null,
        date_end: null,
        action_note: null,
      },
      actionCompositionData: {
        date_complete: null,
        action_composition_note: null,
        actionCompositionStateId: 1,
      },
      filters: {
        inventory_number: {
          value: null,
          matchMode: FilterMatchMode.CONTAINS,
        },
        "equipmentModel.equipmentClass.equipmentCategory.equipment_category_name":
          {
            value: null,
            matchMode: FilterMatchMode.EQUALS,
          },
      },
    };
  },
  methods: {
		showDateData() {
			console.log(this.actionData.date_begin.toLocaleDateString());
		},
    getEquipmentList: async function () {
      const data = await EquipmentService.getList();
      this.equipmentList = data;
    },
		getEquipmentCategoryList: async function () {
      const data = await EquipmentCategoryService.getList();
      this.equipmentCategoryList = data;
    },
    getWellList: async function () {
      const data = await WellService.getList();
      this.wellList = data;
    },
    getActionTypeList: async function () {
      const data = await ActionTypeService.getList();
      this.actionTypeList = data;
    },
    getUserList: async function () {
      const data = await UserService.getList();
      this.userList = data;
    },
    updateWellState() {
      const wellStateId = this.updateStateData.wellStateId;
      const wellId = this.selectedData.selectedWell.well_id;
      WellService.updateState(wellId, wellStateId);
    },
    updateEquipmentState(equipmentId) {
      const equipmentStateId = this.updateStateData.equipmentStateId;
      EquipmentService.updateState(equipmentId, equipmentStateId);
    },
		createAction: async function() {
      const wellId = this.selectedData.selectedWell.well_id;
      const userId = this.selectedData.selectedUser.user_id;
      const actionTypeId = this.selectedData.selectedActionType.action_type_id;
      const actionStateId = this.actionData.actionStateId;
      const requestData = {
        date_begin: this.actionData.date_begin.toLocaleDateString(),
        date_end: this.actionData.date_end.toLocaleDateString(),
        action_note: this.actionData.action_note,
      };
			const data = await ActionService.create(
        wellId,
        userId,
        actionTypeId,
        actionStateId,
        requestData
      );
			this.createdAction = data;
			console.log(this.createdAction);
      this.updateWellState(); 
    },
    createActionComposition(equipmentId) {
			console.log("Action", this.createdAction);
      const actionId = this.createdAction.action_id;
      const actionCompositionStateId =
        this.actionCompositionData.actionCompositionStateId;
      const requestData = {
        date_complete: this.actionCompositionData.date_complete,
        action_composition_note:
          this.actionCompositionData.action_composition_note,
      };
      ActionCompositionService.create(
        actionId,
        equipmentId,
        actionCompositionStateId,
        requestData
      );
    },  
    addEquipmentToAction(equipment) {
      const equipmentId = equipment.equipment_id;
      this.updateEquipmentState(equipmentId);
      this.createActionComposition(equipmentId);
    },
    createData: async function() {
      this.selectedEquipments.forEach(this.addEquipmentToAction);
    },
    createEntryAction: async function() {
      this.submitted = true;
      if (
        this.selectedData.selectedWell !== null &&
        this.selectedData.selectedUser !== null &&
        this.selectedEquipments.length !== 0
      ) {
        this.submitted = false;
        await this.createAction();
				await this.createData();
        this.$toast.add({
          severity: "success",
          summary: "Успешно",
          detail: "Мероприятие по установке добавлено",
          group: "br",
          life: 3000,
        });
				console.log(this.createdAction);
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
  },
  mounted() {
    this.getEquipmentList();
    this.getWellList();
    this.getUserList();
    this.getActionTypeList();
		this.getEquipmentCategoryList();
  },
};
</script>