<template>
  <!-- Шаблон формы для внесения мероприятия по установке -->
  <div class="card">
    <!-- Вывод не установленного списка оборудования -->
    <DataTable
      class="pt-1 p-datatable-sm h-25rem mb-8"
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
      <template #empty> Оборудование не найдено. </template>
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
                <span>{{ slotProps.option.equipment_category_name }}</span>
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
        @click="createEntryAction"
      />
      <Button
        label="Очистить"
        class="w-full md:w-10rem ml-4"
        icon="pi pi-eraser"
        @click="clearData"
        text
      />
    </div>
  </div>
</template>

<script>
import { FilterMatchMode } from "primevue/api";

import ActionCompositionService from "../../../../services/ActionCompositionService";
import ActionService from "../../../../services/ActionService";
import EquipmentService from "../../../../services/EquipmentService";
import EquipmentCategoryService from "../../../../services/EquipmentCategoryService";
import WellService from "../../../../services/WellService";

export default {
  name: "EntryTemplate",
  props: {
    selectedWell: null,
    selectedUser: null,
    dateBegin: null,
    dateEnd: null,
    actionNote: null,
  },
  data() {
    return {
      equipmentCategoryList: [],
      equipmentList: [],
      selectedEquipments: [],
      equipmentStateId: 1,
      createdActionData: null,
      updateData: {
        wellStateId: 3,
        equipmentStateId: 2,
      },
      actionData: {
        dateComplete: null,
        actionCompositionNote: null,
        actionStateId: 1,
        actionTypeId: 1,
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
    getEquipmentDataList: async function () {
      const equipmentStateId = this.equipmentStateId;
      const equipmentData = await EquipmentService.getListByState(
        equipmentStateId
      );
      this.equipmentList = equipmentData;
      const equipmentCategoryData = await EquipmentCategoryService.getList();
      this.equipmentCategoryList = equipmentCategoryData;
    },
    updateWellState() {
      const wellId = this.selectedWell.well_id;
      const wellStateId = this.updateData.wellStateId;
      WellService.updateState(wellId, wellStateId);
    },
    updateEquipmentState(equipmentId) {
      const equipmentStateId = this.updateData.equipmentStateId;
      EquipmentService.updateState(equipmentId, equipmentStateId);
    },
    // Логика создания мероприятия по установке оборудования
    createAction: async function () {
      const wellId = this.selectedWell.well_id;
      const userId = this.selectedUser.user_id;
      const actionTypeId = this.actionData.actionTypeId;
      const actionStateId = this.actionData.actionStateId;
      const requestData = {
        date_begin: this.dateBegin.toLocaleDateString(),
        date_end: this.dateEnd.toLocaleDateString(),
        action_note: this.actionNote,
      };
      const data = await ActionService.create(
        wellId,
        userId,
        actionTypeId,
        actionStateId,
        requestData
      );
      this.updateWellState();
      this.createdActionData = data;
    },
    // Привязка выбранного оборудования к текущему мероприятию
    createActionComposition(equipmentId) {
      const actionId = this.createdActionData.action_id;
      const actionCompositionStateId = this.actionData.actionCompositionStateId;
      const requestData = {
        date_complete: this.actionData.dateComplete,
        action_composition_note: this.actionData.actionCompositionNote,
      };
      ActionCompositionService.create(
        actionId,
        equipmentId,
        actionCompositionStateId,
        requestData
      );
    },
    // Обновление состояния добавленного оборудования
    updateEquipmentStateInCurrentAction(equipment) {
      const equipmentId = equipment.equipment_id;
      this.updateEquipmentState(equipmentId);
      this.createActionComposition(equipmentId);
    },
    // Привязка оборудования к мероприятияю через цикл
    addDataToActionComposition() {
      this.selectedEquipments.forEach(this.updateEquipmentStateInCurrentAction);
    },
    createData: async function () {
      await this.createAction();
      this.addDataToActionComposition();
    },
    // Проверки и вызов метода для создания мероприятия по установке
    createEntryAction: async function () {
      if (this.selectedWell === null) {
        this.$toast.add({
          severity: "info",
          summary: "Внимание",
          detail: "Выберите объект",
          group: "br",
          life: 3000,
        });
        return;
      }
      if (this.selectedUser === null) {
        this.$toast.add({
          severity: "info",
          summary: "Внимание",
          detail: "Выберите сотрудника",
          group: "br",
          life: 3000,
        });
        return;
      }
      if (this.selectedEquipments.length === 0) {
        this.$toast.add({
          severity: "info",
          summary: "Внимание",
          detail: "Выберите оборудование из списка",
          group: "br",
          life: 3000,
        });
        return;
      }
      this.$confirm.require({
        message: "Подтвердите внесение мероприятия?",
        header: "Подтверждение внесения",
        icon: "pi pi-info-circle",
        acceptClass: "p-button-danger",
        accept: async () => {
          await this.createData();
          this.clearData();
          this.$toast.add({
            severity: "success",
            summary: "Выполнено",
            detail: "Мероприятие внесено",
            group: "br",
            life: 3000,
          });
          this.getEquipmentDataList();
        },
        reject: () => {
          this.$toast.add({
            severity: "error",
            summary: "Отмена",
            detail: "Отмена внесения мероприятия",
            group: "br",
            life: 3000,
          });
        },
      });
    },
    clearData() {
      this.selectedEquipments = [];
    },
  },
  mounted() {
    this.getEquipmentDataList();
  },
};
</script>