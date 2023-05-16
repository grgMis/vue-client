<template>
  <Toast position="bottom-right" group="br" />
  <ConfirmDialog />
  <Dialog
    v-model:visible="visibleAddDialog"
    :style="{ width: '450px' }"
    header="Добавление компании"
    :modal="true"
    class="p-fluid"
  >
    <div class="field">
      <label for="dept_name">Наименование</label>
      <InputText
        id="dept_name"
        v-model.trim="deptData.dept_name"
        required="true"
        :class="{
          'p-invalid': submitted && !deptData.dept_name,
        }"
      />
      <small class="p-error" v-if="submitted && !deptData.dept_name">
        Укажите наименование.
      </small>
    </div>

    <div class="field">
      <label for="dept_type_name" class="mb-3">Тип компании</label>
      <Dropdown
        id="dept_type_name"
        v-model="deptData.deptType"
        :options="deptTypeList"
        optionLabel="dept_type_name"
        placeholder="Выберите тип компании"
        :class="{
          'p-invalid': submitted && !deptData.deptType,
        }"
      >
        <template #option="slotProps">
          <div v-if="slotProps.option.dept_type_name">
            <span>{{ slotProps.option.dept_type_name }}</span>
          </div>
          <span v-else>
            {{ slotProps.placeholder }}
          </span>
        </template>
        <small class="p-error" v-if="submitted && !deptData.deptType"> </small>
      </Dropdown>
    </div>

    <div class="field">
      <label for="field_name" class="mb-3">Месторождение</label>
      <Dropdown
        id="field_name"
        v-model="deptData.field"
        :options="fieldList"
        optionLabel="field_name"
        placeholder="Выберите месторождение"
        :class="{
          'p-invalid': submitted && !deptData.field,
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
        <small class="p-error" v-if="submitted && !deptData.field"> </small>
      </Dropdown>
    </div>

    <template #footer>
      <Button label="Сохранить" icon="pi pi-check" text @click="saveData" />
    </template>
  </Dialog>

  <Dialog
    v-model:visible="visibleEditDialog"
    :style="{ width: '450px' }"
    header="Редактирование компании"
    :modal="true"
    class="p-fluid"
  >
    <div class="field">
      <label for="dept_name">Наименование</label>
      <InputText
        id="dept_name"
        :value="deptData.dept_name"
        @input="deptData.dept_name = $event.target.value"
        required="true"
        :class="{
          'p-invalid': submitted && !deptData.dept_name,
        }"
      />
      <small class="p-error" v-if="submitted && !deptData.dept_name">
        Укажите наименование.
      </small>
    </div>

    <div class="field">
      <label for="dept_type_name" class="mb-3">Тип компании</label>
      <Dropdown
        id="dept_type_name"
        v-model="deptData.deptType"
        :options="deptTypeList"
        optionLabel="dept_type_name"
        placeholder="Выберите тип компании"
        :class="{
          'p-invalid': submitted && !deptData.deptType,
        }"
      >
        <template #option="slotProps">
          <div v-if="slotProps.option.dept_type_name">
            <span>{{ slotProps.option.dept_type_name }}</span>
          </div>
          <span v-else>
            {{ slotProps.placeholder }}
          </span>
        </template>
        <small class="p-error" v-if="submitted && !deptData.deptType"> </small>
      </Dropdown>
    </div>

    <div class="field">
      <label for="field_name" class="mb-3">Месторождение</label>
      <Dropdown
        id="field_name"
        v-model="deptData.field"
        :options="fieldList"
        optionLabel="field_name"
        placeholder="Выберите месторождение"
        :class="{
          'p-invalid': submitted && !deptData.field,
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
        <small class="p-error" v-if="submitted && !deptData.field"> </small>
      </Dropdown>
    </div>

    <template #footer>
      <Button label="Сохранить" icon="pi pi-check" text @click="updateData" />
    </template>
  </Dialog>

  <Toolbar>
    <template #start>
      <span class="font-bold text-3xl">Компании</span>
    </template>
    <template #end>
      <Button
        label="Добавить"
        @click="showAddData"
        icon="pi pi-plus"
        class="mr-2"
        style="color: gray"
        outlined
      />
      <Button
        label="Изменить"
        @click="showEditData"
        icon="pi pi-pencil"
        class="mr-2"
        style="color: gray"
        outlined
      />
      <Button
        label="Удалить"
        @click="deleteData"
        icon="pi pi-times"
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
    v-model:selection="selectedDept"
    v-model:filters="filters"
    :value="deptList"
    selectionMode="single"
    dataKey="dept_id"
    filterDisplay="row"
    showGridlines
    :globalFilterFields="['field.field_name', 'deptType.dept_type_name', 'date_entry']"
  >
    <Column
      style="max-width: 10rem"
      header="Идентификатор"
      field="dept_id"
      sortable
    >
      <template #body="{ data }">
        {{ data.dept_id }}
      </template>
    </Column>

    <Column 
			style="max-width: 10rem" 
			header="Наименование" 
			field="dept_name" 
			sortable>
      <template #body="{ data }">
        {{ data.dept_name }}
      </template>
    </Column>

    <Column
      style="max-width: 10rem"
      header="Тип компании"
			field="deptType.dept_type_name"
      filterField="deptType.dept_type_name"
      sortable
      :showFilterMenu="false"
    >
      <template #body="{ data }">
        {{ data.deptType.dept_type_name }}
      </template>
      <template #filter="{ filterModel, filterCallback }">
        <Dropdown
          class="p-column-filter"
          style="width: 165px"
          :showClear="true"
          v-model="filterModel.value"
          @change="filterCallback()"
          :options="deptTypeList"
          optionLabel="dept_type_name"
          optionValue="dept_type_name"
          placeholder="Тип компании"
        >
          <template #option="slotProps">
            <div>
              <span>{{ slotProps.option.dept_type_name }}</span>
            </div>
          </template>
        </Dropdown>
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
      filterField="date_entry"
      dataType="date"
      :showFilterMenu="false"
      sortable
    >
      <template #body="{ data }">
        {{ data.date_entry }}
      </template>
      <template #filter="{ filterModel }">
        <Calendar
          v-model="filterModel.value"
          dateFormat="dd-mm-yy"
          placeholder="дд-мм-гггг"
          mask="99-99-9999"
          style="width: 7rem"
        />
      </template>
    </Column>
  </DataTable>
</template>

<script>
import { FilterMatchMode, FilterOperator } from "primevue/api";
import DeptService from "../../services/DeptService";
import DeptTypeService from "../../services/DeptTypeService";
import FieldService from "../../services/FieldService";

export default {
  name: "Dept",
  data() {
    return {
      visibleAddDialog: false,
      visibleEditDialog: false,
      submitted: false,
      deptList: [],
      fieldList: [],
      deptTypeList: [],
      selectedDept: null,
      deptData: {
        dept_type_name: null,
        field: null,
        deptType: null,
      },
      filters: {
        "field.field_name": {
          value: null,
          matchMode: FilterMatchMode.EQUALS,
        },
        "deptType.dept_type_name": {
          value: null,
          matchMode: FilterMatchMode.EQUALS,
        },
        date_entry: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
        },
      },
      createData: [],
    };
  },
  methods: {
    getDeptList: async function () {
      const data = await DeptService.getList();
      this.deptList = data;
      console.log(this.deptList);
    },
    getFieldList: async function () {
      const data = await FieldService.getList();
      this.fieldList = data;
      console.log(this.fieldList);
    },
    getDeptTypeList: async function () {
      const data = await DeptTypeService.getList();
      this.deptTypeList = data;
      console.log(this.deptTypeList);
    },
    refreshData() {
      this.$toast.add({
        severity: "success",
        summary: "Внимание",
        detail: "Данные перезагружены",
        group: "br",
        life: 3000,
      });
      this.getDeptList();
    },
    showAddData() {
      this.visibleAddDialog = true;
    },
    showEditData() {
      if (this.selectedDept === null) {
        this.$toast.add({
          severity: "info",
          summary: "Внимание",
          detail: "Выберите компанию для редактирования",
          group: "br",
          life: 3000,
        });
      } else {
        this.visibleEditDialog = true;
        this.deptData.dept_name = this.selectedDept.dept_name;
        this.deptData.field = this.selectedDept.field;
        this.deptData.deptType = this.selectedDept.deptType;
      }
    },
    saveData() {
      this.submitted = true;
      if (
        this.deptData.dept_name !== null &&
        this.deptData.field !== null &&
        this.deptData.deptType !== null
      ) {
        this.createDept();
        this.getDeptList();
        this.$toast.add({
          severity: "success",
          summary: "Успешно",
          detail: "Компания добавлена",
          group: "br",
          life: 3000,
        });
        this.deptData = {
          dept_name: null,
          field: null,
          deptType: null,
        };
      }
    },
    createDept: async function () {
      const deptTypeId = this.deptData.deptType.dept_type_id;
      const fieldId = this.deptData.field.field_id;
      const requestData = {
        dept_name: this.deptData.dept_name,
      };
      const data = await DeptService.create(deptTypeId, fieldId, requestData);
      this.createData = data;
      console.log(this.createData);
    },
    updateData() {
      this.submitted = true;
      console.log(this.deptData);
      if (
        this.deptData.dept_name !== "" &&
        this.deptData.field !== null &&
        this.deptData.deptType !== null
      ) {
        this.$confirm.require({
          message: "Вы точно хотите изменить выбранную запись?",
          header: "Подтверждение изменения",
          icon: "pi pi-info-circle",
          acceptClass: "p-button-danger",
          accept: () => {
            this.updateDept();
            this.getDeptList();
            this.deptData = {
              dept_name: null,
              field: null,
              deptType: null,
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
    updateDept: async function () {
      const deptId = this.selectedDept.dept_id;
      const deptTypeId = this.deptData.deptType.dept_type_id;
      const fieldId = this.deptData.field.field_id;
      const requestData = {
        dept_name: this.deptData.dept_name,
      };
      await DeptService.update(deptId, deptTypeId, fieldId, requestData);
      this.getDeptList();
      this.selectedDept = null;
    },
    deleteData() {
      if (this.selectedDept === null) {
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
            this.deleteDept();
            this.getDeptList();
            this.$toast.add({
              severity: "success",
              summary: "Выполнено",
              detail: "Запись удалена",
              life: 3000,
            });
          },
          reject: () => {
            this.selectedDept = null;
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
    deleteDept: async function () {
      const selectedId = this.selectedDept.dept_id;
      await DeptService.delete(selectedId);
      this.getDeptList();
      this.selectedCategory = null;
    },
  },
  mounted() {
    this.getDeptList();
    this.getFieldList();
    this.getDeptTypeList();
  },
};
</script>