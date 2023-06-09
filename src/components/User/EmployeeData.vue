<template>
  <Toast position="bottom-right" group="br" />
  <ConfirmDialog />
  <!--Диалоговая форма добавления сотрудника-->
  <Dialog
    v-model:visible="visibleAddDialog"
    :style="{ width: '450px' }"
    header="Добавление сотрудника"
    :modal="true"
    class="p-fluid"
  >
    <div class="field">
      <label for="employee_last_name">Фамилия</label>
      <InputText
        id="employee_last_name"
        v-model.trim="employeeData.employeeLastName"
        required="true"
        :class="{
          'p-invalid': submitted && !employeeData.employeeLastName,
        }"
      />
      <small class="p-error" v-if="submitted && !employeeData.employeeLastName">
        Укажите фамилию.
      </small>
    </div>

    <div class="field">
      <label for="employee_first_name">Имя</label>
      <InputText
        id="employee_first_name"
        v-model.trim="employeeData.employeeFirstName"
        required="true"
        :class="{
          'p-invalid': submitted && !employeeData.employeeFirstName,
        }"
      />
      <small
        class="p-error"
        v-if="submitted && !employeeData.employeeFirstName"
      >
        Укажите имя.
      </small>
    </div>

    <div class="field">
      <label for="employee_father_name">Отчество</label>
      <InputText
        id="employee_father_name"
        v-model.trim="employeeData.employeeFatherName"
        required="true"
        :class="{
          'p-invalid': submitted && !employeeData.employeeFatherName,
        }"
      />
      <small
        class="p-error"
        v-if="submitted && !employeeData.employeeFatherName"
      >
        Укажите отчество.
      </small>
    </div>

    <div class="field">
      <label for="employee_post_name" class="mb-3">Должность сотрудника</label>
      <Dropdown
        id="employee_post_name"
        v-model="employeeData.employeePost"
        :options="employeePostList"
        optionLabel="employee_post_name"
        placeholder="Выберите должность"
        :class="{
          'p-invalid': submitted && !employeeData.employeePost,
        }"
      >
        <template #option="slotProps">
          <div v-if="slotProps.option.employee_post_name">
            <span>{{ slotProps.option.employee_post_name }}</span>
          </div>
          <span v-else>
            {{ slotProps.placeholder }}
          </span>
        </template>
        <small class="p-error" v-if="submitted && !employeeData.employeePost">
        </small>
      </Dropdown>
    </div>

    <template #footer>
      <Button label="Сохранить" icon="pi pi-check" text @click="saveData" />
    </template>
  </Dialog>
  <!--Диалоговая форма редактирвания сотрудника-->
  <Dialog
    v-model:visible="visibleEditDialog"
    :style="{ width: '450px' }"
    header="Редактирование сотрудника"
    :modal="true"
    class="p-fluid"
  >
    <div class="field">
      <label for="employee_last_name">Фамилия</label>
      <InputText
        id="employee_last_name"
        :value="employeeData.employeeLastName"
        @input="employeeData.employeeLastName = $event.target.value"
        required="true"
        :class="{
          'p-invalid': submitted && !employeeData.employeeLastName,
        }"
      />
      <small class="p-error" v-if="submitted && !employeeData.employeeLastName">
        Укажите фамилию.
      </small>
    </div>

    <div class="field">
      <label for="employee_first_name">Имя</label>
      <InputText
        id="employee_first_name"
        :value="employeeData.employeeFirstName"
        @input="employeeData.employeeFirstName = $event.target.value"
        required="true"
        :class="{
          'p-invalid': submitted && !employeeData.employeeFirstName,
        }"
      />
      <small
        class="p-error"
        v-if="submitted && !employeeData.employeeFirstName"
      >
        Укажите имя.
      </small>
    </div>

    <div class="field">
      <label for="employee_father_name">Отчество</label>
      <InputText
        id="employee_father_name"
        :value="employeeData.employeeFatherName"
        @input="employeeData.employeeFatherName = $event.target.value"
        required="true"
        :class="{
          'p-invalid': submitted && !employeeData.employeeFatherName,
        }"
      />
      <small
        class="p-error"
        v-if="submitted && !employeeData.employeeFatherName"
      >
        Укажите отчество.
      </small>
    </div>

    <div class="field">
      <label for="employee_post_name" class="mb-3">Должность сотрудника</label>
      <Dropdown
        id="employee_post_name"
        v-model="employeeData.employeePost"
        :options="employeePostList"
        optionLabel="employee_post_name"
        placeholder="Выберите должность"
        :class="{
          'p-invalid': submitted && !employeeData.employeePost,
        }"
      >
        <template #option="slotProps">
          <div v-if="slotProps.option.employee_post_name">
            <span>{{ slotProps.option.employee_post_name }}</span>
          </div>
          <span v-else>
            {{ slotProps.placeholder }}
          </span>
        </template>
        <small class="p-error" v-if="submitted && !employeeData.employeePost">
        </small>
      </Dropdown>
    </div>

    <template #footer>
      <Button label="Сохранить" icon="pi pi-check" text @click="updateData" />
    </template>
  </Dialog>
  <!--Меню для взаимодействия со списком сотрудников-->
  <Toolbar>
    <template #start>
      <span class="font-bold text-3xl text-indigo-500">Список сотрудников</span>
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
  <!--Вывод списка классов оборудования-->
  <DataTable
    class="pt-1 p-datatable-sm"
    v-model:selection="selectedEmployee"
    v-model:filters="filters"
    :value="employeeList"
    filterDisplay="row"
    selectionMode="single"
    dataKey="employee_id"
    showGridlines
    paginator
    :rows="23"
    :globalFilterFields="['employeePost.employee_post_name']"
  >
    <template #empty> Классы оборудования не найдены. </template>
    <Column
      style="max-width: 10rem"
      header="Номер сотрудника"
      field="employee_id"
      sortable
    >
      <template #body="{ data }">
        {{ data.employee_id }}
      </template>
    </Column>

    <Column
      style="max-width: 10rem"
      header="Фамилия"
      field="employee_last_name"
      sortable
    >
      <template #body="{ data }">
        {{ data.employee_last_name }}
      </template>
    </Column>

    <Column
      style="max-width: 10rem"
      header="Имя"
      field="employee_first_name"
      sortable
    >
      <template #body="{ data }">
        {{ data.employee_first_name }}
      </template>
    </Column>

    <Column
      style="max-width: 10rem"
      header="Отчество"
      field="employee_father_name"
      sortable
    >
      <template #body="{ data }">
        {{ data.employee_father_name }}
      </template>
    </Column>

    <Column
      style="max-width: 10rem"
      header="Должность"
      field="employeePost.employee_post_name"
      filterField="employeePost.employee_post_name"
      sortable
      :showFilterMenu="false"
    >
      <template #body="{ data }">
        {{ data.employeePost.employee_post_name }}
      </template>
      <template #filter="{ filterModel, filterCallback }">
        <Dropdown
          class="p-column-filter"
          style="width: 165px"
          :showClear="true"
          v-model="filterModel.value"
          @change="filterCallback()"
          :options="employeePostList"
          optionLabel="employee_post_name"
          optionValue="employee_post_name"
          placeholder="Поиск"
        >
          <template #option="slotProps">
            <div>
              <span>{{ slotProps.option.employee_post_name }}</span>
            </div>
          </template>
        </Dropdown>
      </template>
    </Column>
  </DataTable>
</template>

<script>
import { FilterMatchMode } from "primevue/api";
import EmployeePostService from "../../services/EmployeePostService";
import EmployeeService from "../../services/EmployeeService";

export default {
  name: "Employee",
  data() {
    return {
      visibleAddDialog: false,
      visibleEditDialog: false,
      submitted: false,
      employeeList: [],
      employeePostList: [],
      selectedEmployee: null,
      employeeData: {
        employeePost: null,
        employeeFirstName: null,
        employeeLastName: null,
        employeeFatherName: null,
      },
      filters: {
        "employeePost.employee_post_name": {
          value: null,
          matchMode: FilterMatchMode.EQUALS,
        },
      },
    };
  },
  methods: {
    getEmployeeList: async function () {
      const data = await EmployeeService.getList();
      this.employeeList = data;
    },
    getEmployeePostList: async function () {
      const data = await EmployeePostService.getList();
      this.employeePostList = data;
    },
    refreshData() {
      this.$toast.add({
        severity: "success",
        summary: "Внимание",
        detail: "Данные перезагружены",
        group: "br",
        life: 3000,
      });
      this.getEmployeeList();
      this.selectedEmployee = null;
    },
    showAddData() {
      (this.employeeData.employeePost = null),
        (this.employeeData.employeLastName = null),
        (this.employeeData.employeFirstName = null),
        (this.employeeData.employeFatherName = null),
        (this.visibleAddDialog = true);
    },
    showEditData() {
      if (this.selectedEmployee === null) {
        this.$toast.add({
          severity: "info",
          summary: "Внимание",
          detail: "Выберите сотрудника для редактирования",
          group: "br",
          life: 3000,
        });
      } else {
        this.visibleEditDialog = true;
        this.employeeData.employeePost = this.selectedEmployee.employeePost;
        this.employeeData.employeeLastName =
          this.selectedEmployee.employee_last_name;
        this.employeeData.employeeFirstName =
          this.selectedEmployee.employee_first_name;
        this.employeeData.employeeFatherName =
          this.selectedEmployee.employee_father_name;
      }
    },
    // Логика добавления сотрудника
    createEmployee: async function () {
      const employeePostId = this.employeeData.employeePost.employee_post_id;
      const requestData = {
        employee_last_name: this.employeeData.employeeLastName,
        employee_first_name: this.employeeData.employeeFirstName,
        employee_father_name: this.employeeData.employeeFatherName,
      };
      await EmployeeService.create(employeePostId, requestData);
    },
    // Проверка и вызов метода добавления сотрудника
    saveData: async function () {
      this.submitted = true;
      if (
        this.employeeData.employeeLastName !== null &&
        this.employeeData.employeeFirstName !== null &&
        this.employeeData.employeeFatherName !== null &&
        this.employeeData.employeePost !== null
      ) {
        await this.createEmployee();
        await this.getEmployeeList();
        this.submitted = false;
        this.$toast.add({
          severity: "success",
          summary: "Успешно",
          detail: "Сотрудник добавлен",
          group: "br",
          life: 3000,
        });
        this.employeeData = {
          employeePost: null,
          employeeLastName: null,
          employeeFirstName: null,
          employeeFatherName: null,
        };
      }
    },
    // Логика редактирования сотрудника
    updateEmployee: async function () {
      const employeeId = this.selectedEmployee.employee_id;
      const employeePostId = this.employeeData.employeePost.employee_post_id;
      const requestData = {
        employee_last_name: this.employeeData.employeeLastName,
        employee_first_name: this.employeeData.employeeFirstName,
        employee_father_name: this.employeeData.employeeFatherName,
      };
      await EmployeeService.update(employeeId, employeePostId, requestData);
      this.getEmployeeList();
      this.selectedEmployee = null;
    },
    // Проверка и вызов метода редатирования сотрудника
    updateData() {
      this.submitted = true;
      if (
        this.employeeData.employeeLastName !== "" &&
        this.employeeData.employeeFirstName !== "" &&
        this.employeeData.employeeFatherName !== ""
      ) {
        this.$confirm.require({
          message: "Вы точно хотите изменить выбранную запись?",
          header: "Подтверждение изменения",
          icon: "pi pi-info-circle",
          acceptClass: "p-button-danger",
          accept: async () => {
            await this.updateEmployee();
            await this.getEmployeeList();
            this.submitted = false;
            this.employeeData = {
              employeePost: null,
              employeeLastName: null,
              employeeFirstName: null,
              employeeFatherName: null,
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
    // Логика удаления сотрудника
    deleteEmployee: async function () {
      const employeeId = this.selectedEmployee.employee_id;
      await EmployeeService.delete(employeeId);
      this.getEmployeeList();
      this.selectedEmployee = null;
    },
    // Проверка и вызов метода удаления сотрудника
    deleteData() {
      if (this.selectedEmployee === null) {
        this.$toast.add({
          severity: "info",
          summary: "Внимание",
          detail: "Выберите сотрудника для удаления",
          group: "br",
          life: 3000,
        });
      } else {
        this.$confirm.require({
          message: "Вы точно хотите удалить выбранную запись?",
          header: "Подтверждение удаления",
          icon: "pi pi-info-circle",
          acceptClass: "p-button-danger",
          accept: async () => {
            await this.deleteEmployee();
            await this.getEmployeeList();
            this.$toast.add({
              severity: "success",
              summary: "Выполнено",
              detail: "Запись удалена",
              life: 3000,
            });
          },
          reject: () => {
            this.selectedEmployee = null;
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
    this.getEmployeeList();
    this.getEmployeePostList();
  },
};
</script>