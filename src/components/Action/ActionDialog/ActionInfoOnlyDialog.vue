<template>
  <!-- Шаблон диалоговой формы для просмотра информации о мероприятие -->
  <Dialog
    :style="{ width: '1000px' }"
    header="Информация о мероприятие"
    :modal="true"
    class="p-fluid"
  >
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
            <template v-if="selectedAction.date_entry !== null">
              {{ formatDate(selectedAction.date_entry) }}
            </template>
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
            <template v-if="selectedAction.date_begin !== null">
              {{ formatDate(selectedAction.date_begin) }}
            </template>
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
            <template v-if="selectedAction.date_end !== null">
              {{ formatDate(selectedAction.date_end) }}
            </template>
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
            class="w-full p-2 md:w-22rem ml-5 font-bold text-base"
          >
            {{ selectedAction.action_note }}
          </label>
        </div>
      </div>
    </div>
    <!-- Блок с выводом информации об объекте текущего мероприятия -->
    <div class="card">
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
    </div>
    <!-- Блок с выводом списка оборудования текущего мероприятия -->
    <div class="card">
      <div class="field mt-3">
        <label class="font-bold text-xl">Информация об оборудование</label>
      </div>
      <div class="card">
        <DataTable
          class="pt-1 p-datatable-sm"
          paginator
          :rows="4"
          :value="actionCompositionList"
          dataKey="action_composition_id"
          showGridlines
        >
          <template #empty> Оборудование не найдено. </template>
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
                data.equipment.equipmentModel.equipmentClass
                  .equipment_class_name
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
              <template v-if="data.date_complete !== null">
                {{ formatDate(data.date_complete) }}
              </template>
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
        </DataTable>
      </div>
    </div>
  </Dialog>
</template>

<script>
import ActionCompositionService from "../../../services/ActionCompositionService";

export default {
  props: {
    selectedAction: {},
  },
  data() {
    return {
      actionCompositionList: [],
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
    getSeverity(actionComposition) {
      switch (
        actionComposition.actionCompositionState.action_composition_state_name
      ) {
        case "Внесено":
          return "info";

        case "Активно":
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
  },
};
</script>

