<template>
  <Toast position="bottom-right" group="br" />
  <ConfirmDialog />
  <!--Диалоговая форма добавления должности сотрудника-->
  <Dialog
    v-model:visible="visibleAddDialog"
    :style="{ width: '450px' }"
    header="Добавление должности сотрудника"
    :modal="true"
    class="p-fluid"
  >
    <div class="field">
      <label for="employee_post_name">Наименование</label>
      <InputText
        id="employee_post_name"
        v-model.trim="employeePostData.employeePostName"
        required="true"
        :class="{
          'p-invalid': submitted && !employeePostData.employeePostName,
        }"
      />
      <small
        class="p-error"
        v-if="submitted && !employeePostData.employeePostName"
      >
        Укажите наименование.
      </small>
    </div>

    <template #footer>
      <Button label="Сохранить" icon="pi pi-check" text @click="saveData" />
    </template>
  </Dialog>
  <!--Диалоговая форма редактирования должности сотрудника-->
  <Dialog
    v-model:visible="visibleEditDialog"
    :style="{ width: '450px' }"
    header="Редактирование должности сотрудника"
    :modal="true"
    class="p-fluid"
  >
    <div class="field">
      <label for="employee_post_name">Наименование</label>
      <InputText
        id="employee_post_name"
        :value="employeePostData.employeePostName"
        @input="employeePostData.employeePostName = $event.target.value"
        required="true"
        :class="{
          'p-invalid': submitted && !employeePostData.employeePostName,
        }"
      />
      <small
        class="p-error"
        v-if="submitted && !employeePostData.employeePostName"
      >
        Укажите наименование.
      </small>
    </div>

    <template #footer>
      <Button label="Сохранить" icon="pi pi-check" text @click="updateData" />
    </template>
  </Dialog>
  <!--Меню для взаимодействия со списком должностей сотрудников-->
  <Toolbar>
    <template #start>
      <span class="font-bold text-3xl text-indigo-500">Должности сотрудников</span>
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
  <!--Вывод списка должностей сотрудников-->
  <DataTable
    class="pt-1 p-datatable-sm"
    v-model:selection="selectedEmployeePost"
    :value="employeePostList"
    selectionMode="single"
    dataKey="employee_post_id"
    showGridlines
  >
    <template #empty> Список должностей сотрудников не найден. </template>
    <Column
      style="max-width: 10rem"
      header="Идентификатор"
      field="employee_post_id"
      sortable
    >
      <template #body="{ data }">
        {{ data.employee_post_id }}
      </template>
    </Column>

    <Column
      style="max-width: 10rem"
      header="Наименование"
      field="employee_post_name"
      sortable
    >
      <template #body="{ data }">
        {{ data.employee_post_name }}
      </template>
    </Column>
  </DataTable>
</template>

<script>
import EmployeePostService from "../../services/EmployeePostService";

export default {
  name: "EmployeePost",
  data() {
    return {
      visibleAddDialog: false,
      visibleEditDialog: false,
      submitted: false,
      employeePostList: [],
      selectedEmployeePost: null,
      employeePostData: {
        employeePostName: null,
      },
    };
  },
  methods: {
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
      this.getEmployeePostList();
			this.selectedEmployeePost = null;
    },
    showAddData() {
			this.employeePostData.employeePostName = null;
      this.visibleAddDialog = true;
    },
    showEditData() {
      if (this.selectedEmployeePost === null) {
        this.$toast.add({
          severity: "info",
          summary: "Внимание",
          detail: "Выберите должность сотрудника для редактирования",
          group: "br",
          life: 3000,
        });
      } else {
        this.visibleEditDialog = true;
        this.employeePostData.employeePostName =
          this.selectedEmployeePost.employee_post_name;
      }
    },
    // Логика добавления должности сотрудника
    createEmployeePost: async function () {
      const requestData = {
        employee_post_name: this.employeePostData.employeePostName,
      };
      await EmployeePostService.create(requestData);
    },
    // Проверка и вызов метода добавления должности сотрудника
    saveData: async function () {
      this.submitted = true;
      if (this.employeePostData.employeePostName !== null) {
        await this.createEmployeePost();
        await this.getEmployeePostList();
        this.$toast.add({
          severity: "success",
          summary: "Успешно",
          detail: "Должность сотрудника добавлена",
          group: "br",
          life: 3000,
        });
        this.employeePostData.employeePostName = null;
      }
    },
		// Логика редактирования должности сотрудника
    updateEmployeePost: async function () {
      const employeePostId = this.selectedEmployeePost.employee_post_id;
      const requestData = {
        employee_post_name: this.employeePostData.employeePostName,
      };
      await EmployeePostService.update(employeePostId, requestData);
      this.getEmployeePostList();
      this.selectedEmployeePost = null;
    },
		// Проверка и вызов метода редактирования должности сотрудника
    updateData() {
      this.submitted = true;
      if (this.employeePostData.employeePostName !== "") {
        this.$confirm.require({
          message: "Вы точно хотите изменить выбранную запись?",
          header: "Подтверждение изменения",
          icon: "pi pi-info-circle",
          acceptClass: "p-button-danger",
          accept: async () => {
            await this.updateEmployeePost();
            await this.getEmployeePostList();
            this.employeePostData.employeePostName = null;
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
		// Логика удаления должности сотрудника
    deleteEmployeePost: async function () {
      const employeePostId = this.selectedEmployeePost.employee_post_id;
      await EmployeePostService.delete(employeePostId);
      this.getEmployeePostList();
      this.selectedEmployeePost = null;
    },
		// Проверка и вызов метода удаления должности сотрудника
    deleteData() {
      if (this.selectedEmployeePost === null) {
        this.$toast.add({
          severity: "info",
          summary: "Внимание",
          detail: "Выберите должность сотрудника для удаления",
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
            await this.deleteEmployeePost();
            await this.getEmployeePostList();
            this.$toast.add({
              severity: "success",
              summary: "Выполнено",
              detail: "Запись удалена",
              life: 3000,
            });
          },
          reject: () => {
            this.selectedEmployeePost = null;
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
    this.getEmployeePostList();
  },
};
</script>