<template>
  <Toast position="bottom-right" group="br" />
  <ConfirmDialog />
  <!--Диалоговая форма добавления месторождения-->
  <Dialog
    v-model:visible="visibleAddDialog"
    :style="{ width: '450px' }"
    header="Добавление месторождения"
    :modal="true"
    class="p-fluid"
  >
    <div class="field">
      <label for="field_name">Наименование</label>
      <InputText
        id="field_name"
        v-model.trim="fieldData.field_name"
        required="true"
        :class="{
          'p-invalid': submitted && !fieldData.field_name,
        }"
      />
      <small class="p-error" v-if="submitted && !fieldData.field_name">
        Укажите наименование.
      </small>
    </div>

    <template #footer>
      <Button label="Сохранить" icon="pi pi-check" text @click="saveData" />
    </template>
  </Dialog>
  <!--Диалоговая форма редактирования месторождения-->
  <Dialog
    v-model:visible="visibleEditDialog"
    :style="{ width: '450px' }"
    header="Редактирование месторождения"
    :modal="true"
    class="p-fluid"
  >
    <div class="field">
      <label for="field_name">Наименование</label>
      <InputText
        id="field_name"
        :value="fieldData.field_name"
        @input="fieldData.field_name = $event.target.value"
        required="true"
        :class="{
          'p-invalid': submitted && !fieldData.field_name,
        }"
      />
      <small class="p-error" v-if="submitted && !fieldData.field_name">
        Укажите наименование.
      </small>
    </div>

    <template #footer>
      <Button label="Сохранить" icon="pi pi-check" text @click="updateData" />
    </template>
  </Dialog>
  <!--Меню для взаимодействия со списком месторождений-->
  <Toolbar>
    <template #start>
      <span class="font-bold text-3xl text-indigo-500">Месторождение</span>
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
  <!--Вывод списка месторождений-->
  <DataTable
    class="pt-1 p-datatable-sm"
    v-model:selection="selectedField"
    :value="fieldList"
    selectionMode="single"
    dataKey="filed_id"
    showGridlines
  >
    <Column
      style="max-width: 10rem"
      header="Идентификатор"
      field="field_id"
      sortable
    >
      <template #body="{ data }">
        {{ data.field_id }}
      </template>
    </Column>

    <Column
      style="max-width: 10rem"
      header="Наименование"
      field="field_name"
      sortable
    >
      <template #body="{ data }">
        {{ data.field_name }}
      </template>
    </Column>
  </DataTable>
</template>

<script>
import FieldService from "../../services/FieldService";

export default {
  name: "Field",
  data() {
    return {
      visibleAddDialog: false,
      visibleEditDialog: false,
      submitted: false,
      fieldList: [],
      selectedField: null,
      fieldData: {
        field_name: null,
      },
      createData: [],
    };
  },
  methods: {
    getFieldList: async function () {
      const data = await FieldService.getList();
      this.fieldList = data;
    },
    refreshData() {
      this.$toast.add({
        severity: "success",
        summary: "Внимание",
        detail: "Данные перезагружены",
        group: "br",
        life: 3000,
      });
      this.getFieldList();
			this.selectedField = null;
    },
    showAddData() {
      this.visibleAddDialog = true;
    },
    showEditData() {
      if (this.selectedField === null) {
        this.$toast.add({
          severity: "info",
          summary: "Внимание",
          detail: "Выберите месторождение для редактирования",
          group: "br",
          life: 3000,
        });
      } else {
        this.visibleEditDialog = true;
        this.fieldData.field_name = this.selectedField.field_name;
      }
    },
    // Логика добавления месторождения
    createField: async function () {
      const requestData = {
        field_name: this.fieldData.field_name,
      };
      const data = await FieldService.create(requestData);
      this.createData = data;
      console.log(this.createData);
    },
    // Проверка и вызов метода добавления месторождения
    saveData() {
      this.submitted = true;
      if (this.fieldData.field_name !== null) {
        this.createField();
        this.getFieldList();
        this.$toast.add({
          severity: "success",
          summary: "Успешно",
          detail: "Месторождение добавлено",
          group: "br",
          life: 3000,
        });
        this.fieldData = {
          field_name: null,
        };
      }
    },
    // Логика редактирования месторождения
    updateField: async function () {
      const fieldId = this.selectedField.field_id;
      const requestData = {
        field_name: this.fieldData.field_name,
      };
      await FieldService.update(fieldId, requestData);
      this.getFieldList();
      this.selectedField = null;
    },
    // Проверка и вызов метода редактирования месторождения
    updateData() {
      this.submitted = true;
      console.log(this.fieldData);
      if (this.fieldData.field_name !== "") {
        this.$confirm.require({
          message: "Вы точно хотите изменить выбранную запись?",
          header: "Подтверждение изменения",
          icon: "pi pi-info-circle",
          acceptClass: "p-button-danger",
          accept: () => {
            this.updateField();
            this.getFieldList();
            this.fieldData = {
              field_name: null,
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
		// Логика удаления месторождения
    deleteField: async function () {
      const selectedId = this.selectedField.field_id;
      await FieldService.delete(selectedId);
      this.getFieldList();
      this.selectedField = null;
    },
		// Проверка и вызов метода удаления месторождения
    deleteData() {
      if (this.selectedField === null) {
        this.$toast.add({
          severity: "info",
          summary: "Внимание",
          detail: "Выберите месторождение для удаления",
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
            this.deleteField();
            this.getFieldList();
            this.$toast.add({
              severity: "success",
              summary: "Выполнено",
              detail: "Запись удалена",
              life: 3000,
            });
          },
          reject: () => {
            this.selectedField = null;
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
    this.getFieldList();
  },
};
</script>