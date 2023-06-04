<template>
  <Toast position="bottom-right" group="br" />
  <ConfirmDialog />
  <!--Диалоговая форма добавления компании-->
  <Dialog
    v-model:visible="visibleAddDialog"
    :style="{ width: '450px' }"
    header="Добавление компании"
    :modal="true"
    class="p-fluid"
  >
    <div class="field">
      <label for="company_name">Наименование</label>
      <InputText
        id="company_name"
        v-model.trim="companyData.company_name"
        required="true"
        :class="{
          'p-invalid': submitted && !companyData.company_name,
        }"
      />
      <small class="p-error" v-if="submitted && !companyData.company_name">
        Укажите наименование.
      </small>
    </div>

    <div class="field">
      <label for="field_name" class="mb-3">Месторождение</label>
      <Dropdown
        id="field_name"
        v-model="companyData.field"
        :options="fieldList"
        optionLabel="field_name"
        placeholder="Выберите месторождение"
        :class="{
          'p-invalid': submitted && !companyData.field,
        }"
      >
        <template #option="slotProps">
          <div v-if="slotProps.option.field_name">
            <span>{{ slotProps.option.field_name }}</span>
          </div>
          <span v-else>
            {{ slotProps.placeholder }}
          </span>
        </template>
        <small class="p-error" v-if="submitted && !companyData.field"> </small>
      </Dropdown>
    </div>

    <template #footer>
      <Button label="Сохранить" icon="pi pi-check" text @click="saveData" />
    </template>
  </Dialog>
  <!--Диалоговая форма редактирования компании-->
  <Dialog
    v-model:visible="visibleEditDialog"
    :style="{ width: '450px' }"
    header="Редактирование компании"
    :modal="true"
    class="p-fluid"
  >
    <div class="field">
      <label for="company_name">Наименование</label>
      <InputText
        id="company_name"
        :value="companyData.company_name"
        @input="companyData.company_name = $event.target.value"
        required="true"
        :class="{
          'p-invalid': submitted && !companyData.company_name,
        }"
      />
      <small class="p-error" v-if="submitted && !companyData.company_name">
        Укажите наименование.
      </small>
    </div>

    <div class="field">
      <label for="field_name" class="mb-3">Месторождение</label>
      <Dropdown
        id="field_name"
        v-model="companyData.field"
        :options="fieldList"
        optionLabel="field_name"
        placeholder="Выберите месторождение"
        :class="{
          'p-invalid': submitted && !companyData.field,
        }"
      >
        <template #option="slotProps">
          <div v-if="slotProps.option.field_name">
            <span>{{ slotProps.option.field_name }}</span>
          </div>
          <span v-else>
            {{ slotProps.placeholder }}
          </span>
        </template>
        <small class="p-error" v-if="submitted && !companyData.field"> </small>
      </Dropdown>
    </div>

    <template #footer>
      <Button label="Сохранить" icon="pi pi-check" text @click="updateData" />
    </template>
  </Dialog>
  <!--Меню для взаимодействия со списком компаний-->
  <Toolbar>
    <template #start>
      <span class="font-bold text-3xl text-indigo-500">Компании</span>
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
  <!--Вывод списка компний-->
  <DataTable
    class="pt-1 p-datatable-sm"
    v-model:selection="selectedCompany"
    v-model:filters="filters"
    :value="filterByDate"
    selectionMode="single"
    dataKey="company_id"
    filterDisplay="row"
    showGridlines
    :globalFilterFields="['field.field_name', 'date_entry']"
  >
    <template #empty> Компании не найдены. </template>
    <Column
      style="max-width: 10rem"
      header="Идентификатор"
      field="company_id"
      sortable
    >
      <template #body="{ data }">
        {{ data.company_id }}
      </template>
    </Column>

    <Column
      style="max-width: 10rem"
      header="Наименование"
      field="company_name"
      sortable
    >
      <template #body="{ data }">
        {{ data.company_name }}
      </template>
    </Column>

    <Column
      style="max-width: 10rem"
      header="Месторождение"
      field="field.field_name"
      filterField="field.field_name"
      sortable
      :showFilterMenu="false"
    >
      <template #body="{ data }">
        {{ data.field.field_name }}
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
          placeholder="Месторождение"
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
  </DataTable>
</template>

<script>
import { FilterMatchMode } from "primevue/api";
import CompanyService from "../../services/CompanyService";
import FieldService from "../../services/FieldService";

export default {
  name: "company",
  data() {
    return {
      visibleAddDialog: false,
      visibleEditDialog: false,
      filterDateEntry: null,
      submitted: false,
      companyList: [],
      fieldList: [],
      selectedCompany: null,
      companyData: {
        company_name: null,
        field: null,
      },
      filters: {
        "field.field_name": {
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
    getCompanyList: async function () {
      const data = await CompanyService.getList();
      this.companyList = data;
    },
    getFieldList: async function () {
      const data = await FieldService.getList();
      this.fieldList = data;
    },
    refreshData() {
      this.$toast.add({
        severity: "success",
        summary: "Внимание",
        detail: "Данные перезагружены",
        group: "br",
        life: 3000,
      });
      this.getCompanyList();
			this.selectedCompany = null;
    },
    showAddData() {
      this.visibleAddDialog = true;
    },
    showEditData() {
      if (this.selectedCompany === null) {
        this.$toast.add({
          severity: "info",
          summary: "Внимание",
          detail: "Выберите компанию для редактирования",
          group: "br",
          life: 3000,
        });
      } else {
        this.visibleEditDialog = true;
        this.companyData.company_name = this.selectedCompany.company_name;
        this.companyData.field = this.selectedCompany.field;
      }
    },
    // Логика добавления компании
    createCompany: async function () {
      const fieldId = this.companyData.field.field_id;
      const requestData = {
        company_name: this.companyData.company_name,
      };
      const data = await CompanyService.create(fieldId, requestData);
      this.createData = data;
      console.log(this.createData);
    },
    // Проверка и вызов метода добавления компании
    saveData() {
      this.submitted = true;
      if (
        this.companyData.company_name !== null &&
        this.companyData.field !== null
      ) {
        this.createCompany();
        this.getCompanyList();
        this.$toast.add({
          severity: "success",
          summary: "Успешно",
          detail: "Компания добавлена",
          group: "br",
          life: 3000,
        });
        this.companyData = {
          company_name: null,
          field: null,
        };
      }
    },
    // Логика редактирования компании
    updateCompany: async function () {
      const companyId = this.selectedCompany.company_id;
      const fieldId = this.companyData.field.field_id;
      const requestData = {
        company_name: this.companyData.company_name,
      };
      await CompanyService.update(companyId, fieldId, requestData);
      this.getCompanyList();
      this.selectedCompany = null;
    },
    // Проверка и вызов метода редактирования компании
    updateData() {
      this.submitted = true;
      console.log(this.companyData);
      if (
        this.companyData.company_name !== "" &&
        this.companyData.field !== null
      ) {
        this.$confirm.require({
          message: "Вы точно хотите изменить выбранную запись?",
          header: "Подтверждение изменения",
          icon: "pi pi-info-circle",
          acceptClass: "p-button-danger",
          accept: () => {
            this.updateCompany();
            this.getCompanyList();
            this.companyData = {
              company_name: null,
              field: null,
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
		// Логика удаления компании
    deleteCompany: async function () {
      const selectedId = this.selectedcompany.company_id;
      await CompanyService.delete(selectedId);
      this.getCompanyList();
      this.selectedCompany = null;
    },
		// Проверка и вызов метода удаления компании
    deleteData() {
      if (this.selectedCompany === null) {
        this.$toast.add({
          severity: "info",
          summary: "Внимание",
          detail: "Выберите компанию для удаления",
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
            this.deleteCompany();
            this.getCompanyList();
            this.$toast.add({
              severity: "success",
              summary: "Выполнено",
              detail: "Запись удалена",
              life: 3000,
            });
          },
          reject: () => {
            this.selectedCompany = null;
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
  },
  mounted() {
    this.getCompanyList();
    this.getFieldList();
  },
  computed: {
		// Фильтрация списка компании по дате внесения
    filterByDate() {
      if (this.filterDateEntry === null) {
        return this.companyList;
      } else {
        return this.companyList.filter(
          (c) =>
            this.formatDate(c.date_entry) ===
            this.formatDate(this.filterDateEntry)
        );
      }
    },
  },
};
</script>