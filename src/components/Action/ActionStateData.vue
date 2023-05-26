<template>
  <Toast position="bottom-right" group="br"/>
  <ConfirmDialog />

  <Dialog
    v-model:visible="visibleAddDialog"
    :style="{ width: '450px' }"
    header="Добавление состояния"
    :modal="true"
    class="p-fluid"
  >
    <div class="field">
      <label for="action_state_name">Наименование</label>
      <InputText
        id="action_state_name"
        v-model.trim="actionStateData.action_state_name"
        required="true"
        :class="{
          'p-invalid':
            submitted && !actionStateData.action_state_name,
        }"
      />
      <small
        class="p-error"
        v-if="submitted && !actionStateData.action_state_name"
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
    header="Редактирование состояния"
    :modal="true"
    class="p-fluid"
  >
    <div class="field">
      <label for="action_state_name">Наименование</label>
      <InputText
        id="action_state_name"
        :value="actionStateData.action_state_name"
        @input="
          actionStateData.action_state_name = $event.target.value
        "
        required="true"
        :class="{
          'p-invalid':
            submitted && !actionStateData.action_state_name,
        }"
      />
      <small
        class="p-error"
        v-if="submitted && !actionStateData.action_state_name"
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
      <span class="font-bold text-3xl">Состояния</span>
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
    v-model:selection="selectedActionState"
    :value="actionStateList"
    selectionMode="single"
    dataKey="action_state_id"
    showGridlines
  >
    <Column
      style="max-width: 10rem"
      header="Идентификатор"
      field="action_state_id"
      sortable
    >
      <template #body="{ data }">
        {{ data.action_state_id }}
      </template>
    </Column>

    <Column
      style="max-width: 10rem"
      header="Наименование"
      field="action_state_name"
      sortable
    >
      <template #body="{ data }">
        {{ data.action_state_name }}
      </template>
    </Column>

  </DataTable>
</template>

<script>
import ActionStateService from '../../services/ActionStateService'

export default {
  name: 'ActionState',
  data() {
    return {
      visibleAddDialog: false,
      visibleEditDialog: false,
      submitted: false,
      actionStateList: [],
      selectedActionState: null,
      actionStateData: {
        action_state_name: null
      },
      createData: [],
    };
  },
  methods: {
    getActionStateList: async function () {
      const data = await ActionStateService.getList();
      this.actionStateList = data;
      console.log(this.actionStateList);
    },
    refreshData() {
      this.$toast.add({
        severity: 'success',
        summary: 'Внимание',
        detail: 'Данные перезагружены',
				group: 'br',
        life: 3000,
      });
      this.getActionStateList();
    },
    showAddData() {
      this.visibleAddDialog = true;
    },
    showEditData() {
      if (this.selectedActionState === null) {
        this.$toast.add({
          severity: 'info',
          summary: 'Внимание',
          detail: 'Выберите состояние для редактирования',
					group: 'br',
          life: 3000,
        });
      } else {
        this.visibleEditDialog = true;
        this.actionStateData.action_state_name =
          this.selectedActionState.action_state_name;
      }
    },
    saveData: async function () {
      this.submitted = true;
      if (
        this.actionStateData.action_state_name !== null) {
        await this.createActionState();
        await this.getActionStateList();
				this.submitted = false;
        this.$toast.add({
          severity: 'success',
          summary: 'Успешно',
          detail: 'Состояние добавлено',
					group: 'br',
          life: 3000,
        });
        this.actionStateData = {
          action_state_name: null
        };
      }
    },
    createActionState: async function () {
      const requestData = {
        action_state_name:
          this.actionStateData.action_state_name,
      };
      const data = await ActionStateService.create(requestData);
      this.createData = data;
      console.log(this.createData);
    },
    updateData() {
      this.submitted = true;
      console.log(this.actionStateData);
      if (
        this.actionStateData.action_state_name !== '') {
        this.$confirm.require({
          message: 'Вы точно хотите изменить выбранную запись?',
          header: 'Подтверждение изменения',
          icon: 'pi pi-info-circle',
          acceptClass: 'p-button-danger',
          accept: async () => {
            await this.updateActionState();
            await this.getActionStateList();
						this.submitted = false;
            this.actionStateData = {
              action_state_name: null
            };
            this.visibleEditDialog = false;
            this.$toast.add({
              severity: 'success',
              summary: 'Выполнено',
              detail: 'Запись изменена',
							group: 'br',
              life: 3000,
            });
          },
          reject: () => {
            this.$toast.add({
              severity: 'error',
              summary: 'Отмена',
              detail: 'Отмена изменения',
							group: 'br',
              life: 3000,
            });
          },
        });
      }
    },
    updateActionState: async function () {
      const actionStateId = this.selectedActionState.action_state_id;
      const requestData = {
        action_state_name:
          this.actionStateData.action_state_name,
      };
      await ActionStateService.update(actionStateId, requestData);
      this.getActionStateList();
      this.selectedActionState = null;
    },
    deleteData() {
      if (this.selectedActionState === null) {
        this.$toast.add({
          severity: 'info',
          summary: 'Внимание',
          detail: 'Выберите состояние для удаления',
					group: 'br',
          life: 3000,
        });
      } else {
        this.$confirm.require({
          message: 'Вы точно хотите удалить выбранную запись?',
          header: 'Подтверждение удаления',
          icon: 'pi pi-info-circle',
          acceptClass: 'p-button-danger',
          accept: () => {
            this.deleteActionState();
            this.getActionStateList();
            this.$toast.add({
              severity: 'success',
              summary: 'Выполнено',
              detail: 'Запись удалена',
              life: 3000,
            });
          },
          reject: () => {
            this.selectedState = null;
            this.$toast.add({
              severity: 'error',
              summary: 'Отмена',
              detail: 'Отмена удаления',
							group: 'br',
              life: 3000,
            });
          },
        });
      }
    },
    deleteActionState: async function () {
      const selectedId = this.selectedActionState.action_state_id;
      await ActionStateService.delete(selectedId);
      this.getActionStateList();
      this.selectedActionState = null;
    },
  },
  mounted() {
    this.getActionStateList();
  },
};
</script>