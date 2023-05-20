<template>
  <Dialog
    :style="{ width: '1000px' }"
    header="Информация о мероприятие"
    :modal="true"
    class="p-fluid"
  >
    <Dialog
      v-model:visible="visibleEditDialog"
      :style="{ width: '450px' }"
      header="Редактирование"
      :modal="true"
      class="p-fluid"
    >
      <Toast position="bottom-right" group="br" />
      <div class="field">
        <label for="date_begin" class="mb-3">Дата начала</label>
        <Calendar
          class="p-calendar w-full md:w-10rem"
          v-model="actionData.date_begin"
          showIcon
          placeholder="дд.мм.гггг"
          mask="99.99.9999"
        />
      </div>

      <div class="field">
        <label for="date_end" class="mb-3">Дата окончания</label>
        <Calendar
          class="p-calendar w-full md:w-10rem"
          v-model="actionData.date_end"
          showIcon
          placeholder="дд.мм.гггг"
          mask="99.99.9999"
        />
      </div>

      <div class="field">
        <label for="action_note" class="mb-3">Примечание</label>
        <Textarea
          id="action_note"
          v-model="actionData.action_note"
          required="true"
          rows="3"
          cols="30"
        />
      </div>

      <div class="field">
        <label for="action_state_name" class="mb-3">Состояние</label>
        <Dropdown
          id="action_state_name"
          class="w-full md:w-13rem"
          v-model="actionData.actionState"
          :options="actionStateList"
          optionLabel="action_state_name"
          placeholder="Состояние"
        >
        </Dropdown>
      </div>

      <template #footer>
        <Button label="Сохранить" icon="pi pi-check" text @click="updateData" />
      </template>
    </Dialog>

    <div class="card">
      <div class="flex align-items-stretch flex-wrap">
        <div class="field align-items-center w-12rem">
          <label for="action_type_name" class="mb-3">Тип мероприятия</label>
          <InputText
            id="action_type_name"
            class="w-full md:w-12rem"
            :value="selectedAction.actionType.action_type_name"
            disabled
          />
        </div>

        <div class="field align-items-center ml-4 w-12rem">
          <label for="action_group_name" class="mb-3">Группа мероприятия</label>
          <InputText
            id="action_group_name"
            class="w-full md:w-12rem"
            :value="selectedAction.actionType.actionGroup.action_group_name"
            disabled
          />
        </div>

        <div class="field align-items-center ml-4 w-12rem">
          <label for="action_state_name" class="mb-3"
            >Состояние мероприятия</label
          >
          <InputText
            id="action_state_name"
            class="w-full md:w-12rem"
            :value="selectedAction.actionState.action_state_name"
            disabled
          />
        </div>

        <div class="field align-items-center ml-6">
          <label for="date_begin" class="mb-3">Дата начала</label>
          <Calendar
            class="p-calendar w-full md:w-10rem"
            v-model="selectedAction.date_begin"
            showIcon
            placeholder="дд.мм.гггг"
            mask="99.99.9999"
            disabled
          />
        </div>

        <div class="field align-items-center ml-6">
          <label for="date_end" class="mb-3">Дата окончания</label>
          <Calendar
            class="p-calendar w-full md:w-10rem"
            v-model="selectedAction.date_end"
            showIcon
            placeholder="дд.мм.гггг"
            mask="99.99.9999"
            disabled
          />
        </div>

        <div class="field align-items-center">
          <label for="action_note" class="mb-3">Примечание</label>
          <Textarea
            id="action_note"
            v-model="selectedAction.action_note"
            required="true"
            rows="3"
            cols="30"
            disabled
          />
        </div>
      </div>
    </div>

    <div class="field mt-3">
      <label class="font-bold text-xl">Информация об объекте</label>
    </div>
    <div class="card">
      <div class="flex align-items-stretch flex-wrap">
        <div class="field align-items-center w-12rem">
          <label for="well_name" class="mb-3">Наименование</label>
          <InputText
            id="well_name"
            class="w-full md:w-12rem"
            :value="selectedAction.wellEquipment.well.well_name"
            disabled
          />
        </div>

        <div class="field align-items-center ml-4 w-12rem">
          <label for="dept_name" class="mb-3">Компания</label>
          <InputText
            id="dept_name"
            class="w-full md:w-12rem"
            :value="selectedAction.wellEquipment.well.dept.dept_name"
            disabled
          />
        </div>

        <div class="field align-items-center ml-4 w-12rem">
          <label for="field_name" class="mb-3">Месторождение</label>
          <InputText
            id="field_name"
            class="w-full md:w-12rem"
            :value="selectedAction.wellEquipment.well.dept.field.field_name"
            disabled
          />
        </div>

        <div class="field align-items-center ml-4 w-12rem">
          <label for="well_state_name" class="mb-3">Состояние</label>
          <InputText
            id="well_state_name"
            class="w-full md:w-12rem"
            :value="selectedAction.wellEquipment.well.wellState.well_state_name"
            disabled
          />
        </div>
      </div>
    </div>

    <div class="field mt-3">
      <label class="font-bold text-xl">Информация об оборудование</label>
    </div>
    <div class="card">
      <div class="flex align-items-stretch flex-wrap">
        <div class="field align-items-center w-12rem">
          <label for="inventory_number" class="mb-3">Инвентарный номер</label>
          <InputText
            id="inventory_number"
            class="w-full md:w-12rem"
            :value="selectedAction.wellEquipment.equipment.inventory_number"
            disabled
          />
        </div>

        <div class="field align-items-center ml-4 w-12rem">
          <label for="factory_number" class="mb-3">Заводской номер</label>
          <InputText
            id="factory_number"
            class="w-full md:w-12rem"
            :value="selectedAction.wellEquipment.equipment.factory_number"
            disabled
          />
        </div>

        <div class="field align-items-center ml-4 w-12rem">
          <label for="equipment_model_name" class="mb-3">Модель</label>
          <InputText
            id="equipment_model_name"
            class="w-full md:w-12rem"
            :value="
              selectedAction.wellEquipment.equipment.equipmentModel
                .equipment_model_name
            "
            disabled
          />
        </div>

        <div class="field align-items-center ml-4 w-12rem">
          <label for="equipment_class_name" class="mb-3">Класс</label>
          <InputText
            id="equipment_class_name"
            class="w-full md:w-12rem"
            :value="
              selectedAction.wellEquipment.equipment.equipmentModel
                .equipmentClass.equipment_class_name
            "
            disabled
          />
        </div>

        <div class="field align-items-center ml-4 w-12rem">
          <label for="equipment_category_name" class="mb-3">Категория</label>
          <InputText
            id="equipment_category_name"
            class="w-full md:w-12rem"
            :value="
              selectedAction.wellEquipment.equipment.equipmentModel
                .equipmentClass.equipmentCategory.equipment_category_name
            "
            disabled
          />
        </div>

        <div class="field align-items-center w-12rem">
          <label for="equipment_state_name" class="mb-3">Состояние</label>
          <InputText
            id="equipment_state_name"
            class="w-full md:w-12rem"
            :value="
              selectedAction.wellEquipment.equipment.equipmentState
                .equipment_state_name
            "
            disabled
          />
        </div>
      </div>
    </div>

    <template #footer>
      <Button
        label="Редактировать"
        icon="pi pi-pencil"
        text
        @click="showEditDialog"
      />
    </template>
  </Dialog>
</template>

<script>
import ActionService from "../../../services/ActionService";
import ActionStateService from "../../../services/ActionStateService";

export default {
  props: {
    selectedAction: {},
  },
  data() {
    return {
      visibleEditDialog: false,
      actionStateList: [],
      updateActionData: null,
      actionData: {
        date_begin: null,
        date_end: null,
        action_note: null,
        actionState: null,
      },
    };
  },
  methods: {
    showEditDialog() {
      this.visibleEditDialog = true;
      this.getActionStateList();
      console.log(this.selectedAction.actionState);
      this.actionData.date_begin = this.selectedAction.date_begin;
      this.actionData.date_end = this.selectedAction.date_end;
      this.actionData.action_note = this.selectedAction.action_note;
      this.actionData.actionState = this.selectedAction.actionState;
    },
    getActionStateList: async function () {
      const data = await ActionStateService.getList();
      this.actionStateList = data;
      console.log(this.actionStateList);
    },
    updateActionState: async function () {
      const actionId = this.selectedAction.action_id;
      const actionStateId = this.actionData.actionState.action_state_id;
      const requestData = {
        date_begin: this.actionData.date_begin,
        date_end: this.actionData.date_end,
        action_note: this.actionData.action_note,
      };
      const data = await ActionService.updateState(
        actionId,
        actionStateId,
        requestData
      );
      this.updateActionData = data;
      console.log(this.updateActionData);
    },
    updateData() {
      this.$confirm.require({
        message: "Вы точно хотите изменить выбранную запись?",
        header: "Подтверждение изменения",
        icon: "pi pi-info-circle",
        acceptClass: "p-button-danger",
        accept: () => {
          this.updateActionState();
          this.actionData = {
            date_begin: null,
            date_end: null,
            action_note: null,
          };
          this.visibleEditDialog = false;
          this.$toast.add({
            severity: "success",
            summary: "Выполнено",
            detail: "Запись изменена",
            group: "br",
            life: 3000,
          });
        },
        reject: () => {
          this.$toast.add({
            severity: "error",
            summary: "Отмена",
            detail: "Отмена изменения",
            group: "br",
            life: 3000,
          });
        },
      });
    },
  },
};
</script>