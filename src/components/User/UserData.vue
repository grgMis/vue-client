<template>
  <Toast position="bottom-right" group="br" />
  <ConfirmDialog />
  <!--Диалоговая форма добавления пользователя-->
  <Dialog
    v-model:visible="visibleAddDialog"
    :style="{ width: '450px' }"
    header="Добавление пользователя"
    :modal="true"
    class="p-fluid"
  >
    <div class="field">
      <label for="user_login">Логин</label>
      <InputText
        id="user_login"
        v-model.trim="userData.userLogin"
        required="true"
        :class="{
          'p-invalid': submitted && !userData.userLogin,
        }"
      />
      <small class="p-error" v-if="submitted && !userData.userLogin">
        Укажите логин.
      </small>
    </div>

    <div class="field">
      <label for="user_password">Пароль</label>
      <InputText
        id="user_password"
        v-model.trim="userData.userPassword"
        required="true"
        :class="{
          'p-invalid': submitted && !userData.userPassword,
        }"
      />
      <small class="p-error" v-if="submitted && !userData.userPassword">
        Укажите пароль.
      </small>
    </div>

    <div class="field">
      <label for="employee_last_name" class="mb-3">Сотрудник</label>
      <Dropdown
        id="employee_last_name"
        v-model="userData.employee"
        :options="employeeList"
        filter
        optionLabel="employee_last_name"
        placeholder="Сотрудник"
        :class="{
          'p-invalid': submitted && !userData.employee,
        }"
      >
        <template #option="slotProps">
          <div v-if="slotProps.option.employee_last_name">
            <span>{{
              slotProps.option.employee_last_name +
              " " +
              slotProps.option.employee_first_name[0] +
              "." +
              " " +
              slotProps.option.employee_father_name[0] +
              "."
            }}</span>
          </div>
          <span v-else>
            {{ slotProps.placeholder }}
          </span>
        </template>
        <small class="p-error" v-if="submitted && !userData.employee"> </small>
      </Dropdown>
    </div>

    <div class="field">
      <label for="user_role_name" class="mb-3">Роль пользователя</label>
      <Dropdown
        id="user_role_name"
        v-model="userData.userRole"
        :options="userRoleList"
        optionLabel="user_role_name"
        placeholder="Выберите роль"
        :class="{
          'p-invalid': submitted && !userData.userRole,
        }"
      >
        <template #option="slotProps">
          <div v-if="slotProps.option.user_role_name">
            <span>{{ slotProps.option.user_role_name }}</span>
          </div>
          <span v-else>
            {{ slotProps.placeholder }}
          </span>
        </template>
        <small class="p-error" v-if="submitted && !userData.userRole"> </small>
      </Dropdown>
    </div>

    <template #footer>
      <Button label="Сохранить" icon="pi pi-check" text @click="saveData" />
    </template>
  </Dialog>
  <!--Диалоговая форма редактирвания пользователя-->
  <Dialog
    v-model:visible="visibleEditDialog"
    :style="{ width: '450px' }"
    header="Редактирование пользователя"
    :modal="true"
    class="p-fluid"
  >
    <div class="field">
      <label for="user_login">Логин</label>
      <InputText
        id="user_login"
        :value="userData.userLogin"
        @input="userData.userLogin = $event.target.value"
        required="true"
        :class="{
          'p-invalid': submitted && !userData.userLogin,
        }"
      />
      <small class="p-error" v-if="submitted && !userData.userLogin">
        Укажите логин.
      </small>
    </div>

    <div class="field">
      <label for="user_password">Пароль</label>
      <InputText
        id="user_password"
        :value="userData.userPassword"
        @input="userData.userPassword = $event.target.value"
        required="true"
        :class="{
          'p-invalid': submitted && !userData.userPassword,
        }"
      />
      <small class="p-error" v-if="submitted && !userData.userPassword">
        Укажите пароль.
      </small>
    </div>

    <div class="field">
      <label for="employee_last_name" class="mb-3">Сотрудник</label>
      <Dropdown
        id="employee_last_name"
        v-model="userData.employee"
        :options="employeeList"
        optionLabel="employee_last_name"
        placeholder="Сотрудник"
        :class="{
          'p-invalid': submitted && !userData.employee,
        }"
      >
        <template #option="slotProps">
          <div v-if="slotProps.option.employee_last_name">
            <span>{{
              slotProps.option.employee_last_name +
              " " +
              slotProps.option.employee_first_name[0] +
              "." +
              " " +
              slotProps.option.employee_father_name[0] +
              "."
            }}</span>
          </div>
          <span v-else>
            {{ slotProps.placeholder }}
          </span>
        </template>
        <small class="p-error" v-if="submitted && !userData.employee"> </small>
      </Dropdown>
    </div>

    <div class="field">
      <label for="user_role_name" class="mb-3">Роль пользователя</label>
      <Dropdown
        id="user_role_name"
        v-model="userData.userRole"
        :options="userRoleList"
        optionLabel="user_role_name"
        placeholder="Выберите роль"
        :class="{
          'p-invalid': submitted && !userData.userRole,
        }"
      >
        <template #option="slotProps">
          <div v-if="slotProps.option.user_role_name">
            <span>{{ slotProps.option.user_role_name }}</span>
          </div>
          <span v-else>
            {{ slotProps.placeholder }}
          </span>
        </template>
        <small class="p-error" v-if="submitted && !userData.userRole"> </small>
      </Dropdown>
    </div>

    <template #footer>
      <Button label="Сохранить" icon="pi pi-check" text @click="updateData" />
    </template>
  </Dialog>
  <!--Меню для взаимодействия со списком пользователей-->
  <Toolbar>
    <template #start>
      <span class="font-bold text-3xl text-indigo-500"
        >Список пользователей</span
      >
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
  <!--Вывод списка пользователей оборудования-->
  <DataTable
    class="pt-1 p-datatable-sm"
    v-model:selection="selectedUser"
    v-model:filters="filters"
    :value="userList"
    filterDisplay="row"
    selectionMode="single"
    dataKey="user_id"
    showGridlines
    paginator
    :rows="23"
    :globalFilterFields="[
      'employee.employee_last_name',
      'employee.employeePost.employee_post_name',
    ]"
  >
    <template #empty> Список пользователей не найден. </template>
    <Column
      style="max-width: 10rem"
      header="Номер пользователя"
      field="user_id"
      sortable
    >
      <template #body="{ data }">
        {{ data.user_id }}
      </template>
    </Column>

    <Column style="max-width: 10rem" header="Логин" field="user_login" sortable>
      <template #body="{ data }">
        {{ data.user_login }}
      </template>
    </Column>

    <Column
      style="max-width: 10rem"
      header="Пароль"
      field="user_password"
      sortable
    >
      <template #body="{ data }">
        {{ data.user_password }}
      </template>
    </Column>

    <Column
      style="max-width: 10rem"
      header="Фамилия"
      field="employee.employee_last_name"
      filterField="employee.employee_last_name"
      sortable
    >
      <template #body="{ data }">
        {{ data.employee.employee_last_name }}
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
      header="Имя"
      field="employee.employee_first_name"
      sortable
    >
      <template #body="{ data }">
        {{ data.employee.employee_first_name }}
      </template>
    </Column>

    <Column
      style="max-width: 10rem"
      header="Отчество"
      field="employee.employee_father_name"
      sortable
    >
      <template #body="{ data }">
        {{ data.employee.employee_father_name }}
      </template>
    </Column>

    <Column
      style="max-width: 10rem"
      header="Должность"
      field="employee.employeePost.employee_post_name"
      filterField="employee.employeePost.employee_post_name"
      sortable
      :showFilterMenu="false"
    >
      <template #body="{ data }">
        {{ data.employee.employeePost.employee_post_name }}
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

    <Column
      style="max-width: 10rem"
      header="Должность"
      field="userRole.user_role_name"
      sortable
    >
      <template #body="{ data }">
        {{ data.userRole.user_role_name }}
      </template>
    </Column>
  </DataTable>
</template>

<script>
import { FilterMatchMode } from "primevue/api";
import UserService from "../../services/UserService";
import UserRoleService from "../../services/UserRoleService";
import EmployeeService from "../../services/EmployeeService";
import EmployeePostService from "../../services/EmployeePostService";

export default {
  name: "User",
  data() {
    return {
      visibleAddDialog: false,
      visibleEditDialog: false,
      submitted: false,
      userList: [],
      userRoleList: [],
      employeeList: [],
      employeePostList: [],
      selectedUser: null,
      userData: {
        employee: null,
        userRole: null,
        userLogin: null,
        userPassword: null,
      },
      filters: {
        "employee.employee_last_name": {
          value: null,
          matchMode: FilterMatchMode.CONTAINS,
        },
        "employee.employeePost.employee_post_name": {
          value: null,
          matchMode: FilterMatchMode.EQUALS,
        },
      },
    };
  },
  methods: {
    getUserList: async function () {
      const data = await UserService.getList();
      this.userList = data;
    },
    getUserRoleList: async function () {
      const data = await UserRoleService.getList();
      this.userRoleList = data;
    },
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
      this.getUserList();
      this.selectedUser = null;
    },
    showAddData() {
      this.userData.employee = null;
      this.userData.userRole = null;
      this.userData.userLogin = null;
      this.userData.userPassword = null;
      this.visibleAddDialog = true;
    },
    showEditData() {
      if (this.selectedUser === null) {
        this.$toast.add({
          severity: "info",
          summary: "Внимание",
          detail: "Выберите пользователя для редактирования",
          group: "br",
          life: 3000,
        });
      } else {
        this.visibleEditDialog = true;
        this.userData.employee = this.selectedUser.employee;
        this.userData.userRole = this.selectedUser.userRole;
        this.userData.userLogin = this.selectedUser.user_login;
        this.userData.userPassword = this.selectedUser.user_password;
      }
    },
    // Логика добавления пользователя
    createUser: async function () {
      const userRoleId = this.userData.userRole.user_role_id;
      const employeeId = this.userData.employee.employee_id;
      const requestData = {
        user_login: this.userData.userLogin,
        user_password: this.userData.userPassword,
      };
      await UserService.create(userRoleId, employeeId, requestData);
    },
    // Проверка и вызов метода добавления пользователя
    saveData: async function () {
      this.submitted = true;
      if (
        this.userData.employee !== null &&
        this.userData.userRole !== null &&
        this.userData.userLogin !== null &&
        this.userData.userPassword !== null
      ) {
        try {
          await this.createUser();
          await this.getUserList();
          this.submitted = false;
          this.$toast.add({
            severity: "success",
            summary: "Успешно",
            detail: "Пользователь добавлен",
            group: "br",
            life: 3000,
          });
          this.userData = {
            employee: null,
            userRole: null,
            userLogin: null,
            userPassword: null,
          };
        } catch (ex) {
          this.$toast.add({
            severity: "error",
            summary: "Внимание",
            group: "br",
            detail: "Пользователь уже существует",
            life: 3000,
          });
        }
      }
    },
    // Логика редактирования пользователя
    updateUser: async function () {
      const userId = this.selectedUser.user_id;
      const userRoleId = this.userData.userRole.user_role_id;
      const employeeId = this.userData.employee.employee_id;
      const requestData = {
        user_login: this.userData.userLogin,
        user_password: this.userData.userPassword,
      };
      await UserService.update(userId, userRoleId, employeeId, requestData);
      this.selectedUser = null;
    },
    // Проверка и вызов метода редатирования пользователя
    updateData() {
      this.submitted = true;
      if (
        this.userData.employee !== "" &&
        this.userData.userRole !== "" &&
        this.userData.userLogin !== "" &&
        this.userData.userPassword !== ""
      ) {
        this.$confirm.require({
          message: "Вы точно хотите изменить выбранную запись?",
          header: "Подтверждение изменения",
          icon: "pi pi-info-circle",
          acceptClass: "p-button-danger",
          accept: async () => {
            await this.updateUser();
            await this.getUserList();
            this.submitted = false;
            this.userData = {
              employee: null,
              userRole: null,
              userLogin: null,
              userPassword: null,
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
    // Логика удаления пользователя
    deleteUser: async function () {
      const userId = this.selectedUser.user_id;
      await UserService.delete(userId);
      this.getUserList();
      this.selectedUser = null;
    },
    // Проверка и вызов метода удаления пользователя
    deleteData() {
      if (this.selectedUser === null) {
        this.$toast.add({
          severity: "info",
          summary: "Внимание",
          detail: "Выберите пользователя для удаления",
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
            await this.deleteUser();
            await this.getUserList();
            this.$toast.add({
              severity: "success",
              summary: "Выполнено",
              detail: "Запись удалена",
              life: 3000,
            });
          },
          reject: () => {
            this.selectedUser = null;
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
    this.getUserList();
    this.getUserRoleList();
    this.getEmployeeList();
    this.getEmployeePostList();
  },
};
</script>