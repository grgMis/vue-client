<template>
  <Toast position="bottom-right" group="br" />
  <ConfirmDialog />
  <Dialog
    v-model:visible="visibleAddDialog"
    :style="{ width: '450px' }"
    header="Добавление типа мероприятия"
    :modal="true"
    class="p-fluid"
  >
    <div class="field">
      <label for="action_type_name">Наименование</label>
      <InputText
        id="action_type_name"
        v-model.trim="actionTypeData.action_type_name"
        required="true"
        :class="{
          'p-invalid': submitted && !actionTypeData.action_type_name,
        }"
      />
      <small
        class="p-error"
        v-if="submitted && !actionTypeData.action_type_name"
      >
        Укажите наименование.
      </small>
    </div>

    <template #footer>
      <Button label="Сохранить" icon="pi pi-check" text @click="saveData" />
    </template>
  </Dialog>

  <Dialog
    v-model:visible="visibleEditDialog"
    :style="{ width: '450px' }"
    header="Редактирование типа мероприятия"
    :modal="true"
    class="p-fluid"
  >
    <div class="field">
      <label for="action_type_name">Наименование</label>
      <InputText
        id="action_type_name"
        :value="actionTypeData.action_type_name"
        @input="actionTypeData.action_type_name = $event.target.value"
        required="true"
        :class="{
          'p-invalid': submitted && !actionTypeData.action_type_name,
        }"
      />
      <small
        class="p-error"
        v-if="submitted && !actionTypeData.action_type_name"
      >
        Укажите наименование.
      </small>
    </div>

    <template #footer>
      <Button label="Сохранить" icon="pi pi-check" text @click="updateData" />
    </template>
  </Dialog>

  <Toolbar>
    <template #start>
      <span class="font-bold text-3xl">Типы мероприятий</span>
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
    v-model:selection="selectedActionType"
    :value="actionTypeList"
    selectionMode="single"
    dataKey="action_type_id"
    showGridlines
  >
    <Column
      style="max-width: 10rem"
      header="Идентификатор"
      field="action_type_id"
      sortable
    >
      <template #body="{ data }">
        {{ data.action_type_id }}
      </template>
    </Column>

    <Column
      style="max-width: 10rem"
      header="Наименование"
      field="action_type_name"
      sortable
    >
      <template #body="{ data }">
        {{ data.action_type_name }}
      </template>
    </Column>
  </DataTable>
</template>

<script>
import ActionTypeService from "../../services/ActionTypeService";

export default {
  name: "ActionType",
  data() {
    return {
      visibleAddDialog: false,
      visibleEditDialog: false,
      submitted: false,
      actionTypeList: [],
      selectedActionType: null,
      actionTypeData: {
        action_type_name: null,
      },
      createData: [],
    };
  },
  methods: {
    getActionTypeList: async function () {
      const data = await ActionTypeService.getList();
      this.actionTypeList = data;
      console.log(this.actionTypeList);
    },
    refreshData() {
      this.$toast.add({
        severity: "success",
        summary: "Внимание",
        detail: "Данные перезагружены",
        group: "br",
        life: 3000,
      });
      this.getActionTypeList();
    },
    showAddData() {
      this.visibleAddDialog = true;
    },
    showEditData() {
      if (this.selectedActionType === null) {
        this.$toast.add({
          severity: "info",
          summary: "Внимание",
          detail: "Выберите тип для редактирования",
          group: "br",
          life: 3000,
        });
      } else {
        this.visibleEditDialog = true;
        this.actionTypeData.action_type_name =
          this.selectedActionType.action_type_name;
      }
    },
    saveData: async function () {
      this.submitted = true;
      if (this.actionTypeData.action_type_name !== null) {
        await this.createActionType();
        await this.getActionTypeList();
        this.submitted = false;
        this.$toast.add({
          severity: "success",
          summary: "Успешно",
          detail: "Тип добавлен",
          group: "br",
          life: 3000,
        });
        this.actionTypeData = {
          action_type_name: null,
          action_type_sysname: null,
        };
      }
    },
    createActionType: async function () {
      const requestData = {
        action_type_name: this.actionTypeData.action_type_name,
      };
      const data = await ActionTypeService.create(requestData);
      this.createData = data;
      console.log(this.createData);
    },
    updateData() {
      this.submitted = true;
      console.log(this.actionTypeData);
      if (this.actionTypeData.action_type_name !== "") {
        this.$confirm.require({
          message: "Вы точно хотите изменить выбранную запись?",
          header: "Подтверждение изменения",
          icon: "pi pi-info-circle",
          acceptClass: "p-button-danger",
          accept: async () => {
            await this.updateActionType();
            await this.getActionTypeList();
            this.submitted = false;
            this.actionTypeData = {
              action_type_name: null,
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
    updateActionType: async function () {
      const actionTypeId = this.selectedActionType.action_type_id;
      const requestData = {
        action_type_name: this.actionTypeData.action_type_name,
      };
      await ActionTypeService.update(actionTypeId, requestData);
      this.getActionTypeList();
      this.selectedActionType = null;
    },
    deleteData() {
      if (this.selectedActionType === null) {
        this.$toast.add({
          severity: "info",
          summary: "Внимание",
          detail: "Выберите тип для удаления",
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
            this.deleteActionType();
            this.getActionTypeList();
            this.$toast.add({
              severity: "success",
              summary: "Выполнено",
              detail: "Запись удалена",
              life: 3000,
            });
          },
          reject: () => {
            this.selectedActionType = null;
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
    deleteActionType: async function () {
      const selectedId = this.selectedActionType.action_type_id;
      await ActionTypeService.delete(selectedId);
      this.getActionTypeList();
      this.selectedActionType = null;
    },
  },
  mounted() {
    this.getActionTypeList();
  },
};
</script>