<template>
  <Toast position="bottom-right" group="br" />
  <ConfirmDialog />
  <Dialog
    v-model:visible="visibleAddDialog"
    :style="{ width: '450px' }"
    header="Добавление группы мероприятий"
    :modal="true"
    class="p-fluid"
  >
    <div class="field">
      <label for="action_group_name">Наименование</label>
      <InputText
        id="action_group_name"
        v-model.trim="actionGroupData.action_group_name"
        required="true"
        :class="{
          'p-invalid': submitted && !actionGroupData.action_group_name,
        }"
      />
      <small
        class="p-error"
        v-if="submitted && !actionGroupData.action_group_name"
      >
        Укажите наименование.
      </small>
    </div>

    <div class="field">
      <label for="action_group_sysname">Системное имя</label>
      <InputText
        id="action_group_sysname"
        v-model.trim="actionGroupData.action_group_sysname"
        required="true"
        :class="{
          'p-invalid': submitted && !actionGroupData.action_group_sysname,
        }"
      />
      <small
        class="p-error"
        v-if="submitted && !actionGroupData.action_group_sysname"
      >
        Укажите системное имя.
      </small>
    </div>

    <template #footer>
      <Button label="Сохранить" icon="pi pi-check" text @click="saveData" />
    </template>
  </Dialog>

  <Dialog
    v-model:visible="visibleEditDialog"
    :style="{ width: '450px' }"
    header="Редактирование группы мероприятий"
    :modal="true"
    class="p-fluid"
  >
    <div class="field">
      <label for="action_group_name">Наименование</label>
      <InputText
        id="action_group_name"
        :value="actionGroupData.action_group_name"
        @input="actionGroupData.action_group_name = $event.target.value"
        required="true"
        :class="{
          'p-invalid': submitted && !actionGroupData.action_group_name,
        }"
      />
      <small
        class="p-error"
        v-if="submitted && !actionGroupData.action_group_name"
      >
        Укажите наименование.
      </small>
    </div>

    <div class="field">
      <label for="action_group_sysname">Системное имя</label>
      <InputText
        id="action_group_sysname"
        :value="actionGroupData.action_group_sysname"
        @input="actionGroupData.action_group_sysname = $event.target.value"
        required="true"
        :class="{
          'p-invalid': submitted && !actionGroupData.action_group_sysname,
        }"
      />
      <small
        class="p-error"
        v-if="submitted && !actionGroupData.action_group_sysname"
      >
        Укажите системное имя.
      </small>
    </div>

    <template #footer>
      <Button label="Сохранить" icon="pi pi-check" text @click="updateData" />
    </template>
  </Dialog>

  <Toolbar>
    <template #start>
      <span class="font-bold text-3xl">Группы мероприятий</span>
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
    v-model:selection="selectedActionGroup"
    :value="actionGroupList"
    selectionMode="single"
    dataKey="action_group_id"
    showGridlines
  >
    <Column
      style="max-width: 10rem"
      header="Идентификатор"
      field="action_group_id"
      sortable
    >
      <template #body="{ data }">
        {{ data.action_group_id }}
      </template>
    </Column>

    <Column
      style="max-width: 10rem"
      header="Наименование"
      field="action_group_name"
      sortable
    >
      <template #body="{ data }">
        {{ data.action_group_name }}
      </template>
    </Column>

    <Column
      style="max-width: 10rem"
      header="Системное имя"
      field="action_group_sysname"
      sortable
    >
      <template #body="{ data }">
        {{ data.action_group_sysname }}
      </template>
    </Column>
  </DataTable>
</template>

<script>
import ActionGroupService from "../../services/ActionGroupService";

export default {
  name: "ActionGroup",
  data() {
    return {
      visibleAddDialog: false,
      visibleEditDialog: false,
      submitted: false,
      actionGroupList: [],
      selectedActionGroup: null,
      actionGroupData: {
        action_group_name: null,
        action_group_sysname: null,
      },
      createData: [],
    };
  },
  methods: {
    getActionGroupList: async function () {
      const data = await ActionGroupService.getList();
      this.actionGroupList = data;
      console.log(this.actionGroupList);
    },
    refreshData() {
      this.$toast.add({
        severity: "success",
        summary: "Внимание",
        detail: "Данные перезагружены",
        group: "br",
        life: 3000,
      });
      this.getActionGroupList();
    },
    showAddData() {
      this.visibleAddDialog = true;
    },
    showEditData() {
      if (this.selectedActionGroup === null) {
        this.$toast.add({
          severity: "info",
          summary: "Внимание",
          detail: "Выберите группу для редактирования",
          group: "br",
          life: 3000,
        });
      } else {
        this.visibleEditDialog = true;
        this.actionGroupData.action_group_name =
          this.selectedActionGroup.action_group_name;
        this.actionGroupData.action_group_sysname =
          this.selectedActionGroup.action_group_sysname;
      }
    },
    saveData() {
      this.submitted = true;
      if (
        this.actionGroupData.action_group_name !== null &&
        this.actionGroupData.action_group_sysname !== null
      ) {
        this.createActionGroup();
        this.getActionGroupList();
        this.$toast.add({
          severity: "success",
          summary: "Успешно",
          detail: "Группа добавлена",
          group: "br",
          life: 3000,
        });
        this.actionGroupData = {
          action_group_name: null,
          action_group_sysname: null,
        };
      }
    },
    createActionGroup: async function () {
      const requestData = {
        action_group_name: this.actionGroupData.action_group_name,
        action_group_sysname: this.actionGroupData.action_group_sysname,
      };
      const data = await ActionGroupService.create(requestData);
      this.createData = data;
      console.log(this.createData);
    },
    updateData() {
      this.submitted = true;
      console.log(this.actionGroupData);
      if (
        this.actionGroupData.action_group_name !== "" &&
        this.actionGroupData.action_group_sysname !== ""
      ) {
        this.$confirm.require({
          message: "Вы точно хотите изменить выбранную запись?",
          header: "Подтверждение изменения",
          icon: "pi pi-info-circle",
          acceptClass: "p-button-danger",
          accept: () => {
            this.updateActionGroup();
            this.getActionGroupList();
            this.actionGroupData = {
              action_group_name: null,
              action_group_sysname: null,
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
    updateActionGroup: async function () {
      const actionGroupId = this.selectedActionGroup.action_group_id;
      const requestData = {
        action_group_name: this.actionGroupData.action_group_name,
        action_group_sysname: this.actionGroupData.action_group_sysname,
      };
      await ActionGroupService.update(actionGroupId, requestData);
      this.getActionGroupList();
      this.selectedActionGroup = null;
    },
    deleteData() {
      if (this.selectedActionGroup === null) {
        this.$toast.add({
          severity: "info",
          summary: "Внимание",
          detail: "Выберите группу для удаления",
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
            this.deleActionGroup();
            this.getActionGroupList();
            this.$toast.add({
              severity: "success",
              summary: "Выполнено",
              detail: "Запись удалена",
              life: 3000,
            });
          },
          reject: () => {
            this.selectedActionGroup = null;
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
    deleActionGroup: async function () {
      const selectedId = this.selectedActionGroup.action_group_id;
      await ActionGroupService.delete(selectedId);
      this.getActionGroupList();
      this.selectedActionGroup = null;
    },
  },
  mounted() {
    this.getActionGroupList();
  },
};
</script>