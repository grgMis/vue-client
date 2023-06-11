<template>
  <Toast position="bottom-right" group="br" />
  <ConfirmDialog />
  <!--Диалоговая форма создания мероприятия-->
  <ActionDialog v-model:visible="visibleActionDialog"></ActionDialog>
  <!--Диалоговая форма просмотра и редактирования информации о мероприятие-->
  <ActionInfoDialog
    v-model:visible="visibleInfoDialog"
    :selectedAction="selectedAction"
  >
  </ActionInfoDialog>
  <!--Диалоговая форма просмотра информации о мероприятие-->
  <ActionInfoOnlyDialog
    v-model:visible="visibleInfoOnlyDialog"
    :selectedAction="selectedAction"
  >
  </ActionInfoOnlyDialog>
  <!--Меню для взаимодействия со списком мероприятий-->
  <Toolbar>
    <template #start>
      <span class="font-bold text-3xl text-indigo-500"> Мероприятия </span>
    </template>
    <template #end>
      <Button
        label="Создать"
        @click="showActionDialog"
        icon="pi pi-plus"
        class="mr-2 bg-indigo-500"
      />
      <Button
        @click="refreshData"
        icon="pi pi-refresh"
        class="mr-2 bg-indigo-500"
      />
    </template>
  </Toolbar>
  <!--Вывод списка мероприятий-->
  <DataTable
    class="pt-1 p-datatable-sm"
    paginator
    @dblclick="showInfo"
    :rows="20"
    v-model:selection="selectedAction"
    v-model:filters="filters"
    :value="filterByDate"
    selectionMode="single"
    dataKey="action_id"
    filterDisplay="row"
    showGridlines
    :globalFilterFields="[
      'well.well_name',
      'user.employee.employee_last_name',
      'actionType.action_type_name',
      'actionState.action_state_name',
    ]"
  >
    <template #empty> Мероприятия не найдены. </template>
    <Column
      style="max-width: 10rem"
      header="Объект"
      field="well.well_name"
      filterField="well.well_name"
      sortable
      :showFilterMenu="false"
    >
      <template #body="{ data }">
        {{ data.well.well_name }}
      </template>
      <template #filter="{ filterModel, filterCallback }">
        <Dropdown
          class="p-column-filter w-full md:w-9rem"
          :showClear="true"
          v-model="filterModel.value"
          @change="filterCallback()"
          :options="wellList"
          optionLabel="well_name"
          optionValue="well_name"
          placeholder="Поиск"
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
      header="Тип мероприятия"
      field="actionType.action_type_name"
      filterField="actionType.action_type_name"
      sortable
      :showFilterMenu="false"
    >
      <template #body="{ data }">
        {{ data.actionType.action_type_name }}
      </template>
      <template #filter="{ filterModel, filterCallback }">
        <InputText
          class="p-column-filter p-inputtext-sm w-full md:w-9rem"
          v-model="filterModel.value"
          type="text"
          @input="filterCallback()"
          placeholder="Поиск"
        />
      </template>
    </Column>

    <Column
      style="max-width: 10rem"
      header="Ответственный"
      field="user.employee.employee_last_name"
      filterField="user.employee.employee_last_name"
      sortable
      :showFilterMenu="false"
    >
      <template #body="{ data }">
        {{
          data.user.employee.employee_last_name +
          " " +
          data.user.employee.employee_first_name[0] +
          "." +
          " " +
          data.user.employee.employee_father_name[0] +
          "."
        }}
      </template>
      <template #filter="{ filterModel, filterCallback }">
        <InputText
          class="p-column-filter p-inputtext-sm w-full md:w-9rem"
          v-model="filterModel.value"
          type="text"
          @input="filterCallback()"
          placeholder="Поиск"
        />
      </template>
    </Column>

    <Column
      style="max-width: 12rem"
      header="Дата внесения"
      field="date_entry"
      dataType="date"
      :showFilterMenu="false"
      sortable
    >
      <template #body="{ data }">
        {{ formatDate(data.date_entry) }}
      </template>
      <template #filter="{}">
        <Calendar
          v-model="filterDateEntry"
          dateFormat="dd.mm.yy"
          placeholder="дд-мм-гггг"
          showIcon
          showButtonBar
          style="width: 10rem"
        />
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
        <template v-if="data.date_begin !== null">
          {{ formatDate(data.date_begin) }}
        </template>
      </template>
      <template #filter="{}">
        <Calendar
          v-model="filterDateBegin"
          dateFormat="dd.mm.yy"
          placeholder="дд-мм-гггг"
          showIcon
          showButtonBar
          style="width: 10rem"
        />
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
        <template v-if="data.date_end !== null">
          {{ formatDate(data.date_end) }}
        </template>
      </template>
      <template #filter="{}">
        <Calendar
          v-model="filterDateEnd"
          dateFormat="dd.mm.yy"
          placeholder="дд-мм-гггг"
          showIcon
          showButtonBar
          style="width: 10rem"
        />
      </template>
    </Column>

    <Column
      style="max-width: 10rem"
      header="Статус"
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
          class="p-column-filter w-full md:w-9rem"
          :showClear="true"
          v-model="filterModel.value"
          @change="filterCallback()"
          :options="actionStateList"
          optionLabel="action_state_name"
          optionValue="action_state_name"
          placeholder="Поиск"
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
import { FilterMatchMode } from "primevue/api";
import ActionService from "../../services/ActionService";
import WellService from "../../services/WellService";
import ActionStateService from "../../services/ActionStateService";

export default {
  name: "Action",
  data() {
    return {
      submitted: false,
      visibleInfoDialog: false,
      visibleInfoOnlyDialog: false,
      visibleActionDialog: false,

      filterDateEntry: null,
      filterDateBegin: null,
      filterDateEnd: null,

      createData: [],
      actionList: [],
      selectedAction: null,
      actionData: {
        date_begin: "",
        date_end: "",
        action_note: null,
        well: null,
        user: null,
        actionType: null,
        actionState: null,
      },
      wellList: [],
      actionStateList: [],
      filters: {
        "well.well_name": {
          value: null,
          matchMode: FilterMatchMode.EQUALS,
        },
        "user.employee.employee_last_name": {
          value: null,
          matchMode: FilterMatchMode.CONTAINS,
        },
        "actionType.action_type_name": {
          value: null,
          matchMode: FilterMatchMode.CONTAINS,
        },
        "actionState.action_state_name": {
          value: null,
          matchMode: FilterMatchMode.EQUALS,
        },
      },
    };
  },
  methods: {
    formatDate(value) {
      return new Date(value).toLocaleDateString();
    },
    showActionDialog() {
      this.visibleActionDialog = true;
    },
    showInfo() {
      if (this.selectedAction.actionState.action_state_id === 3) {
        this.visibleInfoDialog = true;
      } else {
        this.visibleInfoOnlyDialog = true;
      }
    },
    getActionList: async function () {
      const data = await ActionService.getList();
      this.actionList = data;
    },
    getWellList: async function () {
      const data = await WellService.getList();
      this.wellList = data;
    },
    getActionStateList: async function () {
      const data = await ActionStateService.getList();
      this.actionStateList = data;
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
      this.selectedAction = null;
    },
    getSeverity(action) {
      switch (action.actionState.action_state_name) {
        case "Активно":
          return "danger";

        case "Закрыто":
          return "success";

        case "Завершено":
          return "warning";

        default:
          return null;
      }
    },
  },
  mounted() {
    this.getActionList();
    this.getWellList();
    this.getActionStateList();
  },
  computed: {
    // Фильтрация списка мероприятий по датам
    filterByDate() {
      // Фильтрация по дате внесенния мероприятия
      if (this.filterDateEntry !== null) {
        return this.actionList.filter(
          (a) =>
            this.formatDate(a.date_entry) ===
            this.formatDate(this.filterDateEntry)
        );
      }
      // Фильтрация по дате начала мероприятия
      else if (this.filterDateBegin !== null && this.filterDateEnd === null) {
        return this.actionList.filter(
          (a) =>
            this.formatDate(a.date_begin) ===
            this.formatDate(this.filterDateBegin)
        );
      }
      // Фильтрация по дате окончания мероприятия
      else if (this.filterDateBegin === null && this.filterDateEnd !== null) {
        return this.actionList.filter(
          (a) =>
            this.formatDate(a.date_end) === this.formatDate(this.filterDateEnd)
        );
      }
      // Фильтрация по диапозону дат начала и окончания мероприятия
      else if (this.filterDateBegin !== null && this.filterDateEnd !== null) {
        return this.actionList.filter(
          (a) =>
            this.formatDate(a.date_begin) >=
              this.formatDate(this.filterDateBegin) &&
            this.formatDate(a.date_end) <= this.formatDate(this.filterDateEnd)
        );
      }
      // Список мероприятий без фильтров
      else {
        return this.actionList;
      }
    },
  },
};
</script>