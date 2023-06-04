<template>
  <Toast position="bottom-right" group="br" />
  <ConfirmDialog />
  <!--Диалоговая форма добавления объектов-->
  <Dialog
    v-model:visible="visibleAddDialog"
    :style="{ width: '450px' }"
    header="Добавление объекта"
    :modal="true"
    class="p-fluid"
  >
    <div class="field">
      <label for="well_name">Наименование</label>
      <InputText
        id="well_name"
        v-model.trim="wellData.well_name"
        required="true"
        :class="{
          'p-invalid': submitted && !wellData.well_name,
        }"
      />
      <small class="p-error" v-if="submitted && !wellData.well_name">
        Укажите наименование.
      </small>
    </div>

    <div class="field">
      <label for="company_name" class="mb-3">Компании</label>
      <Dropdown
        id="company_name"
        v-model="wellData.company"
        :options="companyList"
        optionLabel="company_name"
        placeholder="Выберите компанию"
        :class="{
          'p-invalid': submitted && !wellData.company,
        }"
      >
        <template #option="slotProps">
          <div v-if="slotProps.option.company_name">
            <span>{{ slotProps.option.company_name }}</span>
          </div>
          <span v-else>
            {{ slotProps.placeholder }}
          </span>
        </template>
        <small class="p-error" v-if="submitted && !wellData.company"> </small>
      </Dropdown>
    </div>

    <div class="field">
      <label for="well_state_name" class="mb-3">Состояние</label>
      <Dropdown
        id="well_state_name"
        v-model="wellData.wellState"
        :options="wellStateList"
        optionLabel="well_state_name"
        placeholder="Выберите состояние"
        :class="{
          'p-invalid': submitted && !wellData.wellState,
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
        <small class="p-error" v-if="submitted && !wellData.wellState"> </small>
      </Dropdown>
    </div>

    <template #footer>
      <Button label="Сохранить" icon="pi pi-check" text @click="saveData" />
    </template>
  </Dialog>
  <!--Диалоговая форма редактирования объектов-->
  <Dialog
    v-model:visible="visibleEditDialog"
    :style="{ width: '450px' }"
    header="Редактирование объекта"
    :modal="true"
    class="p-fluid"
  >
    <div class="field">
      <label for="well_name">Наименование</label>
      <InputText
        id="well_name"
        :value="wellData.well_name"
        @input="wellData.well_name = $event.target.value"
        required="true"
        :class="{
          'p-invalid': submitted && !wellData.well_name,
        }"
      />
      <small class="p-error" v-if="submitted && !wellData.well_name">
        Укажите наименование.
      </small>
    </div>

    <div class="field">
      <label for="company_name" class="mb-3">Компания</label>
      <Dropdown
        id="company_name"
        v-model="wellData.company"
        :options="companyList"
        optionLabel="company_name"
        placeholder="Выберите компанию"
        :class="{
          'p-invalid': submitted && !wellData.company,
        }"
      >
        <template #option="slotProps">
          <div v-if="slotProps.option.company_name">
            <span>{{ slotProps.option.company_name }}</span>
          </div>
          <span v-else>
            {{ slotProps.placeholder }}
          </span>
        </template>
        <small class="p-error" v-if="submitted && !wellData.company_name">
        </small>
      </Dropdown>
    </div>

    <div class="field">
      <label for="well_state_name" class="mb-3">Состояние</label>
      <Dropdown
        id="well_state_name"
        v-model="wellData.wellState"
        :options="wellStateList"
        optionLabel="well_state_name"
        placeholder="Выберите состояние"
        :class="{
          'p-invalid': submitted && !wellData.wellState,
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
        <small class="p-error" v-if="submitted && !wellData.wellState"> </small>
      </Dropdown>
    </div>

    <template #footer>
      <Button label="Сохранить" icon="pi pi-check" text @click="updateData" />
    </template>
  </Dialog>
  <!--Меню для взаимодействия со списком объектов-->
  <Toolbar>
    <template #start>
      <span class="font-bold text-3xl text-indigo-500">Объект</span>
    </template>
    <template #end>
      <Button
        label="Добавить"
        @click="showAddData"
        icon="pi pi-plus"
        class="mr-2 bg-indigo-500"
      />
      <Button
        label="Изменить"
        @click="showEditData"
        icon="pi pi-pencil"
        class="mr-2 bg-indigo-500"
      />
      <Button
        label="Удалить"
        @click="deleteData"
        icon="pi pi-times"
        class="mr-2 bg-indigo-500"
      />
      <Button
        @click="refreshData"
        icon="pi pi-refresh"
        class="mr-2 bg-indigo-500"
      />
    </template>
  </Toolbar>
  <!--Вывод списка объектов-->
  <DataTable
    class="pt-1 p-datatable-sm"
    v-model:selection="selectedWell"
    v-model:filters="filters"
    :value="filterByDate"
    selectionMode="single"
    dataKey="well_id"
    filterDisplay="row"
    showGridlines
    :globalFilterFields="[
      'well_name',
      'company.company_name',
      'company.field.field_name',
      'wellState.well_state_name',
      'date_entry',
    ]"
  >
    <template #empty> Скважины не найдены. </template>
    <Column
      style="max-width: 10rem"
      header="Идентификатор"
      field="well_id"
      sortable
    >
      <template #body="{ data }">
        {{ data.well_id }}
      </template>
    </Column>

    <Column
      style="max-width: 10rem"
      header="Наименование"
      field="well_name"
      filterField="well_name"
      sortable
      :showFilterMenu="false"
    >
      <template #body="{ data }">
        {{ data.well_name }}
      </template>
      <template #filter="{ filterModel, filterCallback }">
        <InputText
          style="max-width: 10rem"
          class="p-column-filter p-inputtext-sm"
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
      header="Компания"
      field="company.company_name"
      filterField="company.company_name"
      sortable
      :showFilterMenu="false"
    >
      <template #body="{ data }">
        {{ data.company.company_name }}
      </template>
      <template #filter="{ filterModel, filterCallback }">
        <Dropdown
          class="p-column-filter"
          style="width: 165px"
          :showClear="true"
          v-model="filterModel.value"
          @change="filterCallback()"
          :options="companyList"
          optionLabel="company_name"
          optionValue="company_name"
          placeholder="Компания"
        >
          <template #option="slotProps">
            <div>
              <span>{{ slotProps.option.company_name }}</span>
            </div>
          </template>
        </Dropdown>
      </template>
    </Column>

    <Column
      style="max-width: 10rem"
      header="Месторождение"
      field="company.field.field_name"
      filterField="company.field.field_name"
      sortable
      :showFilterMenu="false"
    >
      <template #body="{ data }">
        {{ data.company.field.field_name }}
      </template>
      <template #filter="{ filterModel, filterCallback }">
        <Dropdown
          class="p-column-filter"
          style="width: 165px"
          :showClear="true"
          v-model="filterModel.value"
          @change="filterCallback()"
          :options="fieldList"
          optionLabel="field_name"
          optionValue="field_name"
          placeholder="Месторождения"
        >
          <template #option="slotProps">
            <div>
              <span>{{ slotProps.option.field_name }}</span>
            </div>
          </template>
        </Dropdown>
      </template>
    </Column>

    <Column
      style="max-width: 12rem"
      header="Дата добавления"
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
      style="max-width: 10rem"
      header="Состояние"
      field="wellState.well_state_name"
      filterField="wellState.well_state_name"
      sortable
      :showFilterMenu="false"
    >
      <template #body="slotProps">
        <Tag
          :value="slotProps.data.wellState.well_state_name"
          :severity="getSeverity(slotProps.data)"
        />
      </template>
      <template #filter="{ filterModel, filterCallback }">
        <Dropdown
          class="p-column-filter"
          style="width: 165px"
          :showClear="true"
          v-model="filterModel.value"
          @change="filterCallback()"
          :options="wellStateList"
          optionLabel="well_state_name"
          optionValue="well_state_name"
          placeholder="Состояние"
        >
          <template #option="slotProps">
            <div>
              <span>{{ slotProps.option.well_state_name }}</span>
            </div>
          </template>
        </Dropdown>
      </template>
    </Column>
  </DataTable>
</template>

<script>
import { FilterMatchMode } from "primevue/api";
import WellService from "../../services/WellService";
import CompanyService from "../../services/CompanyService";
import WellStateService from "../../services/WellStateService";
import FieldService from "../../services/FieldService";

export default {
  name: "Well",
  data() {
    return {
      submitted: false,
      visibleAddDialog: false,
      visibleEditDialog: false,
      filterDateEntry: null,
      wellList: [],
      companyList: [],
      fieldList: [],
      wellStateList: [],
      selectedWell: null,
      wellData: {
        well_name: null,
        company: null,
        wellState: null,
      },
      filters: {
        well_name: {
          value: null,
          matchMode: FilterMatchMode.CONTAINS,
        },
        "company.company_name": {
          value: null,
          matchMode: FilterMatchMode.EQUALS,
        },
        "company.field.field_name": {
          value: null,
          matchMode: FilterMatchMode.EQUALS,
        },
        "wellState.well_state_name": {
          value: null,
          matchMode: FilterMatchMode.EQUALS,
        },
      },
      createData: [],
    };
  },
  methods: {
    formatDate(value) {
      return new Date(value).toLocaleDateString();
    },
    getWellList: async function () {
      const data = await WellService.getList();
      this.wellList = data;
    },
    getCompanyList: async function () {
      const data = await CompanyService.getList();
      this.companyList = data;
    },
    getFieldList: async function () {
      const data = await FieldService.getList();
      this.fieldList = data;
    },
    getWellStateList: async function () {
      const data = await WellStateService.getList();
      this.wellStateList = data;
    },
    refreshData() {
      this.$toast.add({
        severity: "success",
        summary: "Внимание",
        detail: "Данные перезагружены",
        group: "br",
        life: 3000,
      });
      this.getWellList();
			this.selectedWell = null;
    },
    showAddData() {
      this.visibleAddDialog = true;
    },
    showEditData() {
      if (this.selectedWell === null) {
        this.$toast.add({
          severity: "info",
          summary: "Внимание",
          detail: "Выберите объект для редактирования",
          group: "br",
          life: 3000,
        });
      } else {
        this.visibleEditDialog = true;
        this.wellData.well_name = this.selectedWell.well_name;
        this.wellData.company = this.selectedWell.company;
        this.wellData.wellState = this.selectedWell.wellState;
      }
    },
    // Логика добавления объекта
    createWell: async function () {
      const companyId = this.wellData.company.company_id;
      const wellStateId = this.wellData.wellState.well_state_id;
      const requestData = {
        well_name: this.wellData.well_name,
      };
      const data = await WellService.create(
        companyId,
        wellStateId,
        requestData
      );
      this.createData = data;
      console.log(this.createData);
    },
    // Проверка и вызов метода добавления объекта
    saveData: async function () {
      this.submitted = true;
      if (
        this.wellData.well_name !== null &&
        this.wellData.company !== null &&
        this.wellData.wellState !== null
      ) {
        await this.createWell();
        await this.getWellList();
        this.$toast.add({
          severity: "success",
          summary: "Успешно",
          detail: "Объект добавлена",
          group: "br",
          life: 3000,
        });
        this.wellData = {
          well_name: null,
          company: null,
          wellState: null,
        };
      }
    },
    // Логика редактирования объекта
    updateWell: async function () {
      const wellId = this.selectedWell.well_id;
      const companyId = this.wellData.company.company_id;
      const wellStateId = this.wellData.wellState.well_state_id;
      const requestData = {
        well_name: this.wellData.well_name,
      };
      console.log(this.wellData.wellState);
      await WellService.update(wellId, companyId, wellStateId, requestData);
      this.getWellList();
      this.selectedWell = null;
    },
    // Проверка и вызов метода редактирования объекта
    updateData() {
      this.submitted = true;
      console.log(this.wellData);
      if (
        this.wellData.well_name !== "" &&
        this.wellData.company !== null &&
        this.wellData.wellState !== null
      ) {
        this.$confirm.require({
          message: "Вы точно хотите изменить выбранную запись?",
          header: "Подтверждение изменения",
          icon: "pi pi-info-circle",
          acceptClass: "p-button-danger",
          accept: async () => {
            await this.updateWell();
            await this.getWellList();
            this.wellData = {
              well_name: null,
              company: null,
              wellState: null,
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
      }
    },
		// Логика удаления объекта
    deleteWell: async function () {
      const selectedId = this.selectedWell.well_id;
      await WellService.delete(selectedId);
      this.getWellList();
      this.selectedWell = null;
    },
		// Проверка и вызов метода удаления объекта
    deleteData() {
      if (this.selectedWell === null) {
        this.$toast.add({
          severity: "info",
          summary: "Внимание",
          detail: "Выберите объект для удаления",
          group: "br",
          life: 3000,
        });
      } else {
        this.$confirm.require({
          message: "Вы точно хотите удалить выбранную запись?",
          header: "Подтверждение удаления",
          icon: "pi pi-info-circle",
          acceptClass: "p-button-danger",
          accept: () => {
            this.deleteWell();
            this.getWellList();
            this.$toast.add({
              severity: "success",
              summary: "Выполнено",
              detail: "Запись удалена",
              life: 3000,
            });
          },
          reject: () => {
            this.selectedWell = null;
            this.$toast.add({
              severity: "error",
              summary: "Отмена",
              detail: "Отмена удаления",
              group: "br",
              life: 3000,
            });
          },
        });
      }
    },
    getSeverity(well) {
      switch (well.wellState.well_state_name) {
        case "Активно":
          return "success";

        case "Не активно":
          return "warning";

        case "Простой":
          return "danger";

        default:
          return null;
      }
    },
  },
  mounted() {
    this.getWellList();
    this.getCompanyList();
    this.getWellStateList();
    this.getFieldList();
  },
  computed: {
		// Фильтр объекта по дате внесения
    filterByDate() {
      if (this.filterDateEntry === null) {
        return this.wellList;
      } else {
        return this.wellList.filter(
          (w) =>
            this.formatDate(w.date_entry) ===
            this.formatDate(this.filterDateEntry)
        );
      }
    },
  },
};
</script>