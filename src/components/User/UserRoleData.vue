<template>
  <Toast position="bottom-right" group="br" />
  <ConfirmDialog />
  <!--Диалоговая форма добавления роли пользователя-->
  <Dialog
    v-model:visible="visibleAddDialog"
    :style="{ width: '450px' }"
    header="Добавление роли пользователя"
    :modal="true"
    class="p-fluid"
  >
    <div class="field">
      <label for="user_role_name">Наименование</label>
      <InputText
        id="user_role_name"
        v-model.trim="userRoleData.userRoleName"
        required="true"
        :class="{
          'p-invalid': submitted && !userRoleData.userRoleName,
        }"
      />
      <small
        class="p-error"
        v-if="submitted && !userRoleData.userRoleName"
      >
        Укажите наименование.
      </small>
    </div>

    <template #footer>
      <Button label="Сохранить" icon="pi pi-check" text @click="saveData" />
    </template>
  </Dialog>
  <!--Диалоговая форма редактирования роли пользователя-->
  <Dialog
    v-model:visible="visibleEditDialog"
    :style="{ width: '450px' }"
    header="Редактирование роли пользователя"
    :modal="true"
    class="p-fluid"
  >
    <div class="field">
      <label for="user_role_name">Наименование</label>
      <InputText
        id="user_role_name"
        :value="userRoleData.userRoleName"
        @input="userRoleData.userRoleName = $event.target.value"
        required="true"
        :class="{
          'p-invalid': submitted && !userRoleData.userRoleName,
        }"
      />
      <small
        class="p-error"
        v-if="submitted && !userRoleData.userRoleName"
      >
        Укажите наименование.
      </small>
    </div>

    <template #footer>
      <Button label="Сохранить" icon="pi pi-check" text @click="updateData" />
    </template>
  </Dialog>
  <!--Меню для взаимодействия со списком ролей пользователей-->
  <Toolbar>
    <template #start>
      <span class="font-bold text-3xl text-indigo-500">Роли пользователей</span>
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
  <!--Вывод списка ролей пользователей-->
  <DataTable
    class="pt-1 p-datatable-sm"
    v-model:selection="selectedUserRole"
    :value="userRoleList"
    selectionMode="single"
    dataKey="user_role_id"
    showGridlines
  >
    <template #empty> Список ролей пользователей не найден. </template>
    <Column
      style="max-width: 10rem"
      header="Идентификатор"
      field="user_role_id"
      sortable
    >
      <template #body="{ data }">
        {{ data.user_role_id }}
      </template>
    </Column>

    <Column
      style="max-width: 10rem"
      header="Наименование"
      field="user_role_name"
      sortable
    >
      <template #body="{ data }">
        {{ data.user_role_name }}
      </template>
    </Column>
  </DataTable>
</template>

<script>
import UserRoleService from "../../services/UserRoleService";

export default {
  name: "UserRole",
  data() {
    return {
      visibleAddDialog: false,
      visibleEditDialog: false,
      submitted: false,
      userRoleList: [],
      selectedUserRole: null,
      userRoleData: {
        userRoleName: null,
      },
    };
  },
  methods: {
    getUserRoleList: async function () {
      const data = await UserRoleService.getList();
      this.userRoleList = data;
    },
    refreshData() {
      this.$toast.add({
        severity: "success",
        summary: "Внимание",
        detail: "Данные перезагружены",
        group: "br",
        life: 3000,
      });
      this.getUserRoleList();
			this.selectedUserRole = null;
    },
    showAddData() {
			this.userRoleData.userRoleName = null;
      this.visibleAddDialog = true;
    },
    showEditData() {
      if (this.selectedUserRole === null) {
        this.$toast.add({
          severity: "info",
          summary: "Внимание",
          detail: "Выберите роль пользователя для редактирования",
          group: "br",
          life: 3000,
        });
      } else {
        this.visibleEditDialog = true;
        this.userRoleData.userRoleName =
          this.selectedUserRole.user_role_name;
      }
    },
    // Логика добавления роли пользователя
    createUserRole: async function () {
      const requestData = {
        user_role_name: this.userRoleData.userRoleName,
      };
      await UserRoleService.create(requestData);
    },
    // Проверка и вызов метода добавления роли пользователя
    saveData: async function () {
      this.submitted = true;
      if (this.userRoleData.userRoleName !== null) {
        await this.createUserRole();
        await this.getUserRoleList();
        this.$toast.add({
          severity: "success",
          summary: "Успешно",
          detail: "Роль пользователя добавлена",
          group: "br",
          life: 3000,
        });
        this.userRoleData.userRoleName = null;
      }
    },
		// Логика редактирования роли пользователя
    updateUserRole: async function () {
      const userRoleId = this.selectedUserRole.user_role_id;
      const requestData = {
        user_role_name: this.userRoleData.userRoleName,
      };
      await UserRoleService.update(userRoleId, requestData);
      this.getUserRoleList();
      this.selectedUserRole = null;
    },
		// Проверка и вызов метода редактирования роли пользователя
    updateData() {
      this.submitted = true;
      if (this.userRoleData.userRoleName !== "") {
        this.$confirm.require({
          message: "Вы точно хотите изменить выбранную запись?",
          header: "Подтверждение изменения",
          icon: "pi pi-info-circle",
          acceptClass: "p-button-danger",
          accept: async () => {
            await this.updateUserRole();
            await this.getUserRoleList();
            this.userRoleData.userRoleName = null;
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
		// Логика удаления роли пользователя
    deleteUserRole: async function () {
      const userRoleId = this.selectedUserRole.user_role_id;
      await UserRoleService.delete(userRoleId);
      this.getUserRoleList();
      this.selectedUserRole = null;
    },
		// Проверка и вызов метода удаления роли пользователя
    deleteData() {
      if (this.selectedUserRole === null) {
        this.$toast.add({
          severity: "info",
          summary: "Внимание",
          detail: "Выберите роль пользователя для удаления",
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
            await this.deleteUserRole();
            await this.getUserRoleList();
            this.$toast.add({
              severity: "success",
              summary: "Выполнено",
              detail: "Запись удалена",
              life: 3000,
            });
          },
          reject: () => {
            this.selectedUserRole = null;
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
    this.getUserRoleList();
  },
};
</script>