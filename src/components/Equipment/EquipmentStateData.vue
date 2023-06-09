<template>
  <Toast position="bottom-right" group="br" />
  <ConfirmDialog />
  <!--Диалоговая форма добавления состояния оборудования-->
  <Dialog
    v-model:visible="visibleAddDialog"
    :style="{ width: '450px' }"
    header="Добавление состояния"
    :modal="true"
    class="p-fluid"
  >
    <div class="field">
      <label for="equipment_state_name">Наименование</label>
      <InputText
        id="equipment_state_name"
        v-model.trim="equipmentStateData.equipment_state_name"
        required="true"
        :class="{
          'p-invalid': submitted && !equipmentStateData.equipment_state_name,
        }"
      />
      <small
        class="p-error"
        v-if="submitted && !equipmentStateData.equipment_state_name"
      >
        Укажите наименование.
      </small>
    </div>

    <template #footer>
      <Button label="Сохранить" icon="pi pi-check" text @click="saveData" />
    </template>
  </Dialog>
  <!--Диалоговая форма редактирования состояния оборудования-->
  <Dialog
    v-model:visible="visibleEditDialog"
    :style="{ width: '450px' }"
    header="Редактирование состояния"
    :modal="true"
    class="p-fluid"
  >
    <div class="field">
      <label for="equipment_state_name">Наименование</label>
      <InputText
        id="equipment_state_name"
        :value="equipmentStateData.equipment_state_name"
        @input="equipmentStateData.equipment_state_name = $event.target.value"
        required="true"
        :class="{
          'p-invalid': submitted && !equipmentStateData.equipment_state_name,
        }"
      />
      <small
        class="p-error"
        v-if="submitted && !equipmentStateData.equipment_state_name"
      >
        Укажите наименование.
      </small>
    </div>

    <template #footer>
      <Button label="Сохранить" icon="pi pi-check" text @click="updateData" />
    </template>
  </Dialog>
  <!--Меню для взаимодействия со списком состояния оборудования-->
  <Toolbar>
    <template #start>
      <span class="font-bold text-3xl text-indigo-500">Состояния</span>
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
  <!--Вывод списка состояния оборудования-->
  <DataTable
    class="pt-1 p-datatable-sm"
    v-model:selection="selectedState"
    :value="equipmentStateList"
    selectionMode="single"
    dataKey="equipment_state_id"
    showGridlines
  >
    <template #empty> Список состояний не найден. </template>
    <Column
      style="max-width: 10rem"
      header="Идентификатор"
      field="equipment_state_id"
      sortable
    >
      <template #body="{ data }">
        {{ data.equipment_state_id }}
      </template>
    </Column>

    <Column
      style="max-width: 10rem"
      header="Наименование"
      field="equipment_state_name"
      sortable
    >
      <template #body="{ data }">
        {{ data.equipment_state_name }}
      </template>
    </Column>
  </DataTable>
</template>

<script>
import EquipmentStateService from "../../services/EquipmentStateService";

export default {
  name: "EquipmentState",
  data() {
    return {
      visibleAddDialog: false,
      visibleEditDialog: false,
      submitted: false,
      equipmentStateList: [],
      selectedState: null,
      equipmentStateData: {
        equipment_state_name: null,
      },
      createData: [],
    };
  },
  methods: {
    getEquipmentStateList: async function () {
      const data = await EquipmentStateService.getList();
      this.equipmentStateList = data;
    },
    refreshData() {
      this.$toast.add({
        severity: "success",
        summary: "Внимание",
        detail: "Данные перезагружены",
        group: "br",
        life: 3000,
      });
      this.getEquipmentStateList();
			this.selectedState = null;
    },
    showAddData() {
      this.visibleAddDialog = true;
    },
    showEditData() {
      if (this.selectedState === null) {
        this.$toast.add({
          severity: "info",
          summary: "Внимание",
          detail: "Выберите состояние для редактирования",
          group: "br",
          life: 3000,
        });
      } else {
        this.visibleEditDialog = true;
        this.equipmentStateData.equipment_state_name =
          this.selectedState.equipment_state_name;
      }
    },
    // Логика добавления состояния оборудования
    createEquipmentState: async function () {
      const requestData = {
        equipment_state_name: this.equipmentStateData.equipment_state_name,
      };
      const data = await EquipmentStateService.create(requestData);
      this.createData = data;
      console.log(this.createData);
    },
    // Проверка и вызов метода добавления состояния оборудования
    saveData: async function () {
      this.submitted = true;
      if (this.equipmentStateData.equipment_state_name !== null) {
        await this.createEquipmentState();
        await this.getEquipmentStateList();
        this.$toast.add({
          severity: "success",
          summary: "Успешно",
          detail: "Состояние добавлено",
          group: "br",
          life: 3000,
        });
        this.equipmentStateData = {
          equipment_state_name: null,
        };
      }
    },
		// Логика редактирования состояния оборудования
    updateEquipmentState: async function () {
      const equipmentStateId = this.selectedState.equipment_state_id;
      const requestData = {
        equipment_state_name: this.equipmentStateData.equipment_state_name,
      };
      await EquipmentStateService.update(equipmentStateId, requestData);
      this.getEquipmentStateList();
      this.selectedState = null;
    },
		// Проверка и вызов метода редактирования состояния оборудования
    updateData() {
      this.submitted = true;
      console.log(this.equipmentStateData);
      if (this.equipmentStateData.equipment_state_name !== "") {
        this.$confirm.require({
          message: "Вы точно хотите изменить выбранную запись?",
          header: "Подтверждение изменения",
          icon: "pi pi-info-circle",
          acceptClass: "p-button-danger",
          accept: () => {
            this.updateEquipmentState();
            this.getEquipmentStateList();
            this.equipmentStateData = {
              equipment_state_name: null,
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
		// Логика удаления состояния оборудования
    deleteEquipmentState: async function () {
      const selectedId = this.selectedState.equipment_state_id;
      await EquipmentStateService.delete(selectedId);
      this.getEquipmentStateList();
      this.selectedState = null;
    },
		// Проверка и вызов метода удаления состояния оборудования
    deleteData() {
      if (this.selectedState === null) {
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
            this.deleteEquipmentState();
            this.getEquipmentStateList();
            this.$toast.add({
              severity: "success",
              summary: "Выполнено",
              detail: "Запись удалена",
              life: 3000,
            });
          },
          reject: () => {
            this.selectedState = null;
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
    this.getEquipmentStateList();
  },
};
</script>