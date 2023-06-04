<template>
  <!-- Шаблон диалоговой формы для просмотра информации о мероприятие -->
  <Dialog
    :style="{ width: '1000px' }"
    header="Информация о мероприятие"
    :modal="true"
    class="p-fluid"
  >
    <!-- Вложенная диалоговая форма для редактирования оборудования в мероприятие -->
    <Dialog
      v-model:visible="visibleEditCompositionDialog"
      :style="{ width: '450px' }"
      header="Редактирование"
      :modal="true"
      class="p-fluid"
    >
      <div class="field align-items-center ml-4">
        <label for="date_complete" class="mb-3">Дата выполнения</label>
        <Calendar
          style="p-calendar"
          v-model="actionData.dateComplete"
          class="w-full md:w-10rem"
          dateOnly
          showIcon
          placeholder="дд.мм.гггг"
          mask="99.99.9999"
        />
      </div>

      <div class="field align-items-center ml-4 w-15rem">
        <label for="action_composition_state" class="mb-3"
          >Статус выполнения</label
        >
        <Dropdown
          id="action_composition_state"
          v-model="actionData.actionCompositionState"
          :options="actionCompositionStateList"
          optionLabel="action_composition_state_name"
          placeholder="Выберите статус"
          :class="{
            'p-invalid': submitted && !actionData.actionCompositionState,
          }"
        >
          <template #option="slotProps">
            <div v-if="slotProps.option.action_composition_state_name">
              <span>{{ slotProps.option.action_composition_state_name }}</span>
            </div>
            <span v-else>
              {{ slotProps.placeholder }}
            </span>
          </template>
          <small
            class="p-error"
            v-if="submitted && !actionData.actionCompositionState"
          >
          </small>
        </Dropdown>
      </div>

      <div class="field align-items-center ml-4 w-25rem">
        <label for="action_note" class="mb-3">Примечание</label>
        <Textarea
          id="action_note"
          v-model="actionData.actionCompositionNote"
          required="true"
          rows="4"
          cols="30"
          :class="{
            'p-invalid': submitted && !actionData.actionCompositionNote,
          }"
        />
        <small
          class="p-error"
          v-if="submitted && !actionData.actionCompositionNote"
        >
          Укажите примечание.
        </small>
      </div>

      <template #footer>
        <Button label="Сохранить" icon="pi pi-check" text @click="saveUpdate" />
      </template>
    </Dialog>
    <!-- Блок с выводом информации о текущем мероприятие -->
    <div class="card">
      <div class="flex align-items-stretch flex-wrap">
        <div class="field align-items-center w-12rem">
          <label
            for="action_id"
            class="mb-3 font-bold bg-indigo-400 p-2 text-white border-round-lg"
            >Номер мероприятия</label
          >
          <label
            id="action_id"
            class="w-full p-2 md:w-9rem border-1 font-bold text-xl border-solid border-gray-500 border-round-lg"
          >
            {{ selectedAction.action_id }}
          </label>
        </div>

        <div class="field align-items-center ml-5 w-12rem">
          <label
            for="action_type_name"
            class="mb-3 font-bold bg-indigo-400 p-2 text-white border-round-lg"
            >Тип мероприятия</label
          >
          <label
            id="action_group_name"
            class="w-full p-2 md:w-9rem border-1 font-bold text-xl border-solid border-gray-500 border-round-lg"
          >
            {{ selectedAction.actionType.action_type_name }}
          </label>
        </div>

        <div class="field align-items-center ml-5 w-12rem">
          <label
            for="employee_last_name"
            class="mb-3 font-bold bg-indigo-400 p-2 text-white border-round-lg"
            >Ответственный</label
          >
          <label
            id="employee_last_name"
            class="w-full p-2 md:w-12rem border-1 font-bold text-xl border-solid border-gray-500 border-round-lg"
          >
            <span>{{
              selectedAction.user.employee.employee_last_name +
              " " +
              selectedAction.user.employee.employee_first_name[0] +
              "." +
              " " +
              selectedAction.user.employee.employee_father_name[0] +
              "."
            }}</span>
          </label>
        </div>

        <div class="field align-items-center ml-6 w-15rem">
          <label
            for="action_state_name"
            class="mb-3 font-bold bg-indigo-400 p-2 text-white border-round-lg"
            >Состояние мероприятия</label
          >
          <label
            id="action_state_name"
            class="w-full p-2 md:w-10rem border-1 font-bold text-xl border-solid border-gray-500 border-round-lg"
          >
            {{ selectedAction.actionState.action_state_name }}
          </label>
        </div>

        <div class="field align-items-center">
          <label
            for="date_entry"
            class="mb-3 font-bold bg-indigo-400 p-2 text-white border-round-lg"
            >Дата внесения</label
          >
          <label
            id="date_entry"
            class="w-full p-2 md:w-8rem ml-5 border-1 font-bold text-xl border-solid border-gray-500 border-round-lg"
          >
            {{ formatDate(selectedAction.date_entry) }}
          </label>
        </div>

        <div class="field align-items-center ml-6">
          <label
            for="date_begin"
            class="mb-3 font-bold bg-indigo-400 p-2 text-white border-round-lg"
            >Дата начала</label
          >
          <label
            id="date_begin"
            class="w-full p-2 md:w-8rem ml-5 border-1 font-bold text-xl border-solid border-gray-500 border-round-lg"
          >
            {{ formatDate(selectedAction.date_begin) }}
          </label>
        </div>

        <div class="field align-items-center ml-6">
          <label
            for="date_end"
            class="mb-3 font-bold bg-indigo-400 p-2 text-white border-round-lg"
            >Дата окончания</label
          >
          <label
            id="date_end"
            class="w-full p-2 md:w-8rem ml-5 border-1 font-bold text-xl border-solid border-gray-500 border-round-lg"
          >
            {{ formatDate(selectedAction.date_end) }}
          </label>
        </div>

        <div class="field align-items-center">
          <label
            for="action_note"
            class="mb-3 font-bold bg-indigo-400 p-2 text-white border-round-lg"
            >Примечание</label
          >
          <label
            id="action_note"
            class="w-full p-2 md:w-22rem ml-5 border-1 font-bold text-base border-solid border-gray-500 border-round-lg"
          >
            {{ selectedAction.action_note }}
          </label>
        </div>
      </div>
    </div>
    <!-- Блок с выводом информации об объекте текущего мероприятия -->
    <div class="field mt-3">
      <label class="font-bold text-xl">Информация об объекте</label>
    </div>
    <div class="card">
      <div class="flex align-items-stretch flex-wrap">
        <div class="field align-items-center w-12rem">
          <label
            for="well_name"
            class="mb-3 font-bold bg-indigo-400 p-2 text-white border-round-lg"
            >Наименование</label
          >
          <label
            id="well_name"
            class="w-full p-2 md:w-8rem border-1 font-bold text-xl border-solid border-gray-500 border-round-lg"
          >
            {{ selectedAction.well.well_name }}
          </label>
        </div>

        <div class="field align-items-center ml-2 w-12rem">
          <label
            for="company_name"
            class="mb-3 font-bold bg-indigo-400 p-2 text-white border-round-lg"
            >Компания</label
          >
          <label
            id="company_name"
            class="w-full p-2 md:w-12rem border-1 font-bold text-xl border-solid border-gray-500 border-round-lg"
          >
            {{ selectedAction.well.company.company_name }}
          </label>
        </div>

        <div class="field align-items-center ml-6 w-12rem">
          <label
            for="field_name"
            class="mb-3 font-bold bg-indigo-400 p-2 text-white border-round-lg"
            >Месторождение</label
          >
          <label
            id="field_name"
            class="w-full p-2 md:w-12rem border-1 font-bold text-xl border-solid border-gray-500 border-round-lg"
          >
            {{ selectedAction.well.company.field.field_name }}
          </label>
        </div>

        <div class="field align-items-center ml-6 w-12rem">
          <label
            for="well_state_name"
            class="mb-3 font-bold bg-indigo-400 p-2 text-white border-round-lg"
            >Состояние</label
          >
          <label
            id="field_name"
            class="w-full p-2 md:w-10rem border-1 font-bold text-xl border-solid border-gray-500 border-round-lg"
          >
            {{ selectedAction.well.wellState.well_state_name }}
          </label>
        </div>
      </div>
    </div>
    <!-- Блок с выводом списка оборудования текущего мероприятия -->
    <div class="field mt-3">
      <label class="font-bold text-xl">Информация об оборудование</label>
    </div>
    <div class="card">
      <DataTable
        class="pt-1 p-datatable-sm"
        paginator
        v-model:selection="selectedActionComposition"
        selectionMode="single"
        :rows="5"
        :value="actionCompositionList"
        dataKey="action_composition_id"
        showGridlines
      >
        <Column
          style="max-width: 10rem"
          header="Инвентарный номер"
          field="equipment.inventory_number"
          sortable
        >
          <template #body="{ data }">
            {{ data.equipment.inventory_number }}
          </template>
        </Column>

        <Column
          style="max-width: 10rem"
          header="Категория"
          field="equipment.equipmentModel.equipmentClass.equipmentCategory.equipment_category_name"
          sortable
        >
          <template #body="{ data }">
            {{
              data.equipment.equipmentModel.equipmentClass.equipmentCategory
                .equipment_category_name
            }}
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
          header="Модель"
          field="equipment.equipmentModel.equipment_model_name"
          sortable
        >
          <template #body="{ data }">
            {{ data.equipment.equipmentModel.equipment_model_name }}
          </template>
        </Column>

        <Column
          style="max-width: 9rem"
          header="Заводской номер"
          field="equipment.factory_number"
          sortable
        >
          <template #body="{ data }">
            {{ data.equipment.factory_number }}
          </template>
        </Column>

        <Column
          style="max-width: 12rem"
          header="Дата выполнения"
          field="date_complete"
          dataType="date"
          sortable
        >
          <template #body="{ data }">
            {{ data.date_complete }}
          </template>
        </Column>

        <Column
          style="max-width: 10rem"
          field="actionCompositionState.action_composition_state_name"
          sortable
          header="Состояние"
        >
          <template #body="slotProps">
            <Tag
              :value="
                slotProps.data.actionCompositionState
                  .action_composition_state_name
              "
              :severity="getSeverity(slotProps.data)"
            />
          </template>
        </Column>
        <Column
          :exportable="false"
          style="min-width: 8rem"
          bodyStyle="text-align:center"
        >
          <template #body="slotProps">
            <Button
              icon="pi pi-pencil"
              outlined
              rounded
              class="mr-2"
              @click="editActionComposition(slotProps.data)"
            />
          </template>
        </Column>
      </DataTable>
    </div>

    <template #footer>
      <Button label="Редактировать" icon="pi pi-pencil" text @click="" />
    </template>
  </Dialog>
</template>

<script>
import ActionCompositionService from "../../../services/ActionCompositionService";
import ActionCompositionStateService from "../../../services/ActionCompositionStateService";

export default {
  props: {
    selectedAction: {},
  },
  data() {
    return {
      submitted: false,
      visibleEditCompositionDialog: false,
      visibleEditDialog: false,
      selectedActionComposition: {},
      actionCompositionList: [],
      actionCompositionStateList: [],
      dateComplete: null,
      actionData: {
        actionCompositionState: null,
        dateComplete: null,
        actionCompositionNote: null,
      },
    };
  },
  methods: {
    formatDate(value) {
      return new Date(value).toLocaleDateString();
    },
    getActionCompisitionListByAction: async function () {
      const actionId = this.selectedAction.action_id;
      const data = await ActionCompositionService.getListByAction(actionId);
      this.actionCompositionList = data;
    },
    getActionCompositionStateList: async function () {
      const data = await ActionCompositionStateService.getList();
      this.actionCompositionStateList = data;
    },
    // Логика обновления выбранного оборудования текущего мероприятия
    updateActionComposition: async function () {
      const actionCompositionId =
        this.selectedActionComposition.action_composition_id;
      const actionCompositionStateId =
        this.actionData.actionCompositionState.action_composition_state_id;
      const requestData = {
        date_complete: this.actionData.dateComplete.toLocaleDateString(),
        action_composition_note: this.actionData.actionCompositionNote,
      };
      await ActionCompositionService.updateState(
        actionCompositionId,
        actionCompositionStateId,
        requestData
      );
    },
    // Проверки и вызов метода для обновление оборудования текущего мероприятия
    saveUpdate() {
      this.submitted = true;
      if (
        this.actionData.actionCompositionState === null &&
        this.actionData.dateComplete === null
      ) {
        this.$toast.add({
          severity: "info",
          summary: "Внимание",
          detail: "Заполните пропущенные поля",
          group: "br",
          life: 3000,
        });
      } else {
        this.$confirm.require({
          message: "Вы точно хотите внести изменения?",
          header: "Подтверждение изменений",
          icon: "pi pi-info-circle",
          acceptClass: "p-button-danger",
          accept: async () => {
            await this.updateActionComposition();
            await this.getActionCompisitionListByAction();
            this.clearData();
            this.$toast.add({
              severity: "success",
              summary: "Выполнено",
              detail: "Запись изменена",
              life: 3000,
            });
          },
          reject: () => {
            this.$toast.add({
              severity: "error",
              summary: "Отмена",
              detail: "Отмена изменений",
              group: "br",
              life: 3000,
            });
          },
        });
      }
    },
    editActionComposition(actionComposition) {
      this.clearData();
      this.visibleEditCompositionDialog = true;
      this.selectedActionComposition = actionComposition;
      this.actionData.dateComplete = actionComposition.date_complete;
      this.actionData.actionCompositionState =
        actionComposition.actionCompositionState;
      this.actionData.actionCompositionNote =
        actionComposition.action_composition_note;
    },
    editEquipmentInActionComposition: async function () {
      this.showData();
      await this.updateActionComposition();
      await this.getActionCompisitionListByAction();
      this.clearData();
      this.$toast.add({
        severity: "success",
        summary: "Выполнено",
        detail: "Запись успешно изменена",
        life: 3000,
      });
    },
    clearData() {
      this.submitted = false;
      this.visibleEditCompositionDialog = false;
      this.actionData.actionCompositionState = null;
      this.actionData.dateComplete = null;
      this.actionData.actionCompositionNote = null;
    },
    getSeverity(actionComposition) {
      switch (
        actionComposition.actionCompositionState.action_compisition_state_name
      ) {
        case "Внесено":
          return "danger";

        case "Завершено":
          return "success";

        default:
          return null;
      }
    },
  },
  beforeUpdate() {
    this.getActionCompisitionListByAction();
    this.getActionCompositionStateList();
  },
};
</script>

