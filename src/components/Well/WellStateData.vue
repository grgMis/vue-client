<template>
  <Toast position="bottom-right" group="br" />
  <ConfirmDialog />
  <!--Диалоговая форма добавления состояния объекта-->
  <Dialog
    v-model:visible="visibleAddDialog"
    :style="{ width: '450px' }"
    header="Добавление состояния компании"
    :modal="true"
    class="p-fluid"
  >
    <div class="field">
      <label for="well_state_name">Наименование</label>
      <InputText
        id="well_state_name"
        v-model.trim="wellStateData.well_state_name"
        required="true"
        :class="{
          'p-invalid': submitted && !wellStateData.well_state_name,
        }"
      />
      <small class="p-error" v-if="submitted && !wellStateData.well_state_name">
        Укажите наименование.
      </small>
    </div>

    <template #footer>
      <Button label="Сохранить" icon="pi pi-check" text @click="saveData" />
    </template>
  </Dialog>
  <!--Диалоговая форма редактирования состояния объекта-->
  <Dialog
    v-model:visible="visibleEditDialog"
    :style="{ width: '450px' }"
    header="Редактирование состояния компании"
    :modal="true"
    class="p-fluid"
  >
    <div class="field">
      <label for="well_state_name">Наименование</label>
      <InputText
        id="dept_type_name"
        :value="wellStateData.well_state_name"
        @input="wellStateData.well_state_name = $event.target.value"
        required="true"
        :class="{
          'p-invalid': submitted && !wellStateData.well_state_name,
        }"
      />
      <small class="p-error" v-if="submitted && !wellStateData.well_state_name">
        Укажите наименование.
      </small>
    </div>

    <template #footer>
      <Button label="Сохранить" icon="pi pi-check" text @click="updateData" />
    </template>
  </Dialog>
  <!--Меню взаимодействия со списком состояний объектов-->
  <Toolbar>
    <template #start>
      <span class="font-bold text-3xl text-indigo-500">Состояние компании</span>
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
  <!--Вывод списка состояний объектов-->
  <DataTable
    class="pt-1 p-datatable-sm"
    v-model:selection="selectedWellState"
    :value="wellStateList"
    selectionMode="single"
    dataKey="well_state_id"
    showGridlines
  >
    <Column
      style="max-width: 10rem"
      header="Идентификатор"
      field="well_state_id"
      sortable
    >
      <template #body="{ data }">
        {{ data.well_state_id }}
      </template>
    </Column>

    <Column
      style="max-width: 10rem"
      header="Наименование"
      field="well_state_name"
      sortable
    >
      <template #body="{ data }">
        {{ data.well_state_name }}
      </template>
    </Column>
  </DataTable>
</template>

<script>
import WellStateService from "../../services/WellStateService";

export default {
  name: "WellState",
  data() {
    return {
      visibleAddDialog: false,
      visibleEditDialog: false,
      submitted: false,
      wellStateList: [],
      selectedWellState: null,
      wellStateData: {
        well_state_name: null,
      },
      createData: [],
    };
  },
  methods: {
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
      this.getWellStateList();
			this.selectedWellState = null;
    },
    showAddData() {
      this.visibleAddDialog = true;
    },
    showEditData() {
      if (this.selectedWellState === null) {
        this.$toast.add({
          severity: "info",
          summary: "Внимание",
          detail: "Выберите состояние для редактирования",
          group: "br",
          life: 3000,
        });
      } else {
        this.visibleEditDialog = true;
        this.wellStateData.well_state_name =
          this.selectedWellState.well_state_name;
      }
    },
    // Логика добавления состояния объектов
    createWellState: async function () {
      const requestData = {
        well_state_name: this.wellStateData.well_state_name,
      };
      const data = await WellStateService.create(requestData);
      this.createData = data;
      console.log(this.createData);
    },
    // Проверка и вызов метода добавления состояния объектов
    saveData() {
      this.submitted = true;
      if (this.wellStateData.well_state_name !== null) {
        this.createWellState();
        this.getWellStateList();
        this.$toast.add({
          severity: "success",
          summary: "Успешно",
          detail: "Состояние добавлено",
          group: "br",
          life: 3000,
        });
        this.wellStateData = {
          well_state_name: null,
        };
      }
    },
		// Логика редактирования состояния объектов
    updateWellState: async function () {
      const wellStateId = this.selectedWellState.well_state_id;
      const requestData = {
        well_state_name: this.wellStateData.well_state_name,
      };
      await WellStateService.update(wellStateId, requestData);
      this.getWellStateList();
      this.selectedWellState = null;
    },
		// Проверка и вызов метода редактирования состояния объектов
    updateData() {
      this.submitted = true;
      console.log(this.wellStateData);
      if (this.wellStateData.well_state_name !== "") {
        this.$confirm.require({
          message: "Вы точно хотите изменить выбранную запись?",
          header: "Подтверждение изменения",
          icon: "pi pi-info-circle",
          acceptClass: "p-button-danger",
          accept: () => {
            this.updateWellState();
            this.getWellStateList();
            this.wellStateData = {
              well_state_name: null,
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
		// Логика удаления состояния объектов
    deleteWellState: async function () {
      const selectedId = this.selectedWellState.well_state_id;
      await WellStateService.delete(selectedId);
      this.getWellStateList();
      this.selectedWellState = null;
    },
		// Проверка и вызов метода удаления состояния объектов
    deleteData() {
      if (this.selectedWellState === null) {
        this.$toast.add({
          severity: "info",
          summary: "Внимание",
          detail: "Выберите состояние для удаления",
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
            this.deleteWellState();
            this.getWellStateList();
            this.$toast.add({
              severity: "success",
              summary: "Выполнено",
              detail: "Запись удалена",
              life: 3000,
            });
          },
          reject: () => {
            this.selectedWellState = null;
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
    this.getWellStateList();
  },
};
</script>