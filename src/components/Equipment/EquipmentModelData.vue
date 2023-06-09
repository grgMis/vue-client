<template>
  <Toast position="bottom-right" group="br" />
  <ConfirmDialog />
  <!--Диалоговая форма добавления модели оборудования-->
  <Dialog
    v-model:visible="visibleAddDialog"
    :style="{ width: '450px' }"
    header="Добавление модели"
    :modal="true"
    class="p-fluid"
  >
    <div class="field">
      <label for="equipment_model_name">Наименование</label>
      <InputText
        id="equipment_model_name"
        v-model.trim="equipmentModelData.equipment_model_name"
        required="true"
        :class="{
          'p-invalid': submitted && !equipmentModelData.equipment_model_name,
        }"
      />
      <small
        class="p-error"
        v-if="submitted && !equipmentModelData.equipment_model_name"
      >
        Укажите наименование.
      </small>
    </div>

    <div class="field">
      <label for="equipment_class_name" class="mb-3">Класс оборудования</label>
      <Dropdown
        id="equipment_class_name"
        v-model="equipmentModelData.equipmentClass"
        :options="equipmentClassList"
        optionLabel="equipment_class_name"
        filter
        placeholder="Выберите класс"
        :class="{
          'p-invalid': submitted && !equipmentModelData.equipmentClass,
        }"
      >
        <template #option="slotProps">
          <div v-if="slotProps.option.equipment_class_name">
            <span>{{ slotProps.option.equipment_class_name }}</span>
          </div>
          <span v-else>
            {{ slotProps.placeholder }}
          </span>
        </template>
        <small
          class="p-error"
          v-if="submitted && !equipmentModelData.equipmentClass"
        >
        </small>
      </Dropdown>
    </div>

    <template #footer>
      <Button label="Сохранить" icon="pi pi-check" text @click="saveData" />
    </template>
  </Dialog>
  <!--Диалоговая форма редактирования модели оборудования-->
  <Dialog
    v-model:visible="visibleEditDialog"
    :style="{ width: '450px' }"
    header="Редактирование модель"
    :modal="true"
    class="p-fluid"
  >
    <div class="field">
      <label for="equipment_model_name">Наименование</label>
      <InputText
        id="equipment_model_name"
        :value="equipmentModelData.equipment_model_name"
        @input="equipmentModelData.equipment_model_name = $event.target.value"
        required="true"
        :class="{
          'p-invalid': submitted && !equipmentModelData.equipment_model_name,
        }"
      />
      <small
        class="p-error"
        v-if="submitted && !equipmentModelData.equipment_model_name"
      >
        Укажите наименование.
      </small>
    </div>

    <div class="field">
      <label for="equipment_class_name" class="mb-3">Класс оборудования</label>
      <Dropdown
        id="equipment_class_name"
        v-model="equipmentModelData.equipmentClass"
        :options="equipmentClassList"
        optionLabel="equipment_class_name"
        placeholder="Выберите класс"
        :class="{
          'p-invalid': submitted && !equipmentModelData.equipmentClass,
        }"
      >
        <template #option="slotProps">
          <div v-if="slotProps.option.equipment_class_name">
            <span>{{ slotProps.option.equipment_class_name }}</span>
          </div>
          <span v-else>
            {{ slotProps.placeholder }}
          </span>
        </template>
        <small
          class="p-error"
          v-if="submitted && !equipmentModelData.equipmentClass"
        >
        </small>
      </Dropdown>
    </div>

    <template #footer>
      <Button label="Сохранить" icon="pi pi-check" text @click="updateData" />
    </template>
  </Dialog>
  <!--Меню для взаимодействия со списком моделей-->
  <Toolbar>
    <template #start>
      <span class="font-bold text-3xl text-indigo-500">Модели</span>
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
  <!--Вывод списка моделей-->
  <DataTable
    class="pt-1 p-datatable-sm"
    v-model:selection="selectedModel"
    v-model:filters="filters"
    :value="equipmentModelList"
    paginator
    :rows="23"
    filterDisplay="row"
    selectionMode="single"
    dataKey="equipment_model_id"
    showGridlines
    :globalFilterFields="[
      'equipmentClass.equipment_class_name',
      'equipmentClass.equipmentCategory.equipment_category_name',
    ]"
  >
    <template #empty> Модели оборудования не найдены. </template>
    <Column
      style="max-width: 10rem"
      header="Идентификатор"
      field="equipment_model_id"
      sortable
    >
      <template #body="{ data }">
        {{ data.equipment_model_id }}
      </template>
    </Column>

    <Column
      style="max-width: 10rem"
      header="Наименование"
      field="equipment_model_name"
      sortable
    >
      <template #body="{ data }">
        {{ data.equipment_model_name }}
      </template>
    </Column>

    <Column
      style="max-width: 10rem"
      header="Класс"
      field="equipmentClass.equipment_class_name"
      filterField="equipmentClass.equipment_class_name"
      sortable
      :showFilterMenu="false"
    >
      <template #body="{ data }">
        {{ data.equipmentClass.equipment_class_name }}
      </template>
      <template #filter="{ filterModel, filterCallback }">
        <Dropdown
          class="p-column-filter"
          style="width: 165px"
          :showClear="true"
          v-model="filterModel.value"
          @change="filterCallback()"
          :options="equipmentClassList"
          filter
          optionLabel="equipment_class_name"
          optionValue="equipment_class_name"
          placeholder="Поиск"
        >
          <template #option="slotProps">
            <div>
              <span>{{ slotProps.option.equipment_class_name }}</span>
            </div>
          </template>
        </Dropdown>
      </template>
    </Column>

    <Column
      style="max-width: 10rem"
      header="Категория"
      field="equipmentClass.equipmentCategory.equipment_category_name"
      filterField="equipmentClass.equipmentCategory.equipment_category_name"
      sortable
      :showFilterMenu="false"
    >
      <template #body="{ data }">
        {{ data.equipmentClass.equipmentCategory.equipment_category_name }}
      </template>
      <template #filter="{ filterModel, filterCallback }">
        <Dropdown
          class="p-column-filter"
          style="width: 165px"
          :showClear="true"
          v-model="filterModel.value"
          @change="filterCallback()"
          :options="equipmentCategoryList"
          optionLabel="equipment_category_name"
          optionValue="equipment_category_name"
          placeholder="Категория"
        >
          <template #option="slotProps">
            <div>
              <span>{{ slotProps.option.equipment_category_name }}</span>
            </div>
          </template>
        </Dropdown>
      </template>
    </Column>
  </DataTable>
</template>

<script>
import { FilterMatchMode } from "primevue/api";
import EquipmentCategoryService from "../../services/EquipmentCategoryService";
import EquipmentClassService from "../../services/EquipmentClassService";
import EquipmentModelService from "../../services/EquipmentModelService";

export default {
  name: "EquipmentModel",
  data() {
    return {
      visibleAddDialog: false,
      visibleEditDialog: false,
      submitted: false,
      equipmentModelList: [],
      equipmentClassList: [],
      equipmentCategoryList: [],
      selectedModel: null,
      equipmentModelData: {
        equipmentClass: null,
        equipment_model_name: null,
      },
      filters: {
        "equipmentClass.equipment_class_name": {
          value: null,
          matchMode: FilterMatchMode.EQUALS,
        },
        "equipmentClass.equipmentCategory.equipment_category_name": {
          value: null,
          matchMode: FilterMatchMode.EQUALS,
        },
      },
      createData: [],
    };
  },
  methods: {
    getEquipmentModelList: async function () {
      const data = await EquipmentModelService.getList();
      this.equipmentModelList = data;
    },
    getEquipmentClassList: async function () {
      const data = await EquipmentClassService.getList();
      this.equipmentClassList = data;
    },
    getEquipmentCategoryList: async function () {
      const data = await EquipmentCategoryService.getList();
      this.equipmentCategoryList = data;
    },
    refreshData() {
      this.$toast.add({
        severity: "success",
        summary: "Внимание",
        detail: "Данные перезагружены",
        group: "br",
        life: 3000,
      });
      this.getEquipmentModelList();
			this.selectedModel = null;
    },
    showAddData() {
      this.visibleAddDialog = true;
    },
    showEditData() {
      if (this.selectedModel === null) {
        this.$toast.add({
          severity: "info",
          summary: "Внимание",
          detail: "Выберите модель для редактирования",
          group: "br",
          life: 3000,
        });
      } else {
        this.visibleEditDialog = true;
        this.equipmentModelData.equipmentClass =
          this.selectedModel.equipmentClass;
        this.equipmentModelData.equipment_model_name =
          this.selectedModel.equipment_model_name;
      }
    },
    // Логика добавления модели оборудования
    createEquipmentModel: async function () {
      const equipmentClassId =
        this.equipmentModelData.equipmentClass.equipment_class_id;
      const requestData = {
        equipment_model_name: this.equipmentModelData.equipment_model_name,
      };
      const data = await EquipmentModelService.create(
        equipmentClassId,
        requestData
      );
      this.createData = data;
      console.log(this.createData);
    },
    // Проверка и вызов метода добавления модели оборудования
    saveData: async function () {
      this.submitted = true;
      if (
        this.equipmentModelData.equipment_model_name !== null &&
        this.equipmentModelData.equipmentClass !== null
      ) {
        await this.createEquipmentModel();
        await this.getEquipmentModelList();
        this.submitted = false;
        this.$toast.add({
          severity: "success",
          summary: "Успешно",
          detail: "Модель добавлена",
          group: "br",
          life: 3000,
        });
        this.equipmentModelData = {
          equipmentClass: null,
          equipment_model_name: null,
          equipment_model_sysname: null,
        };
      }
    },
    // Логика редактирования модели оборудования
    updateEquipmentModel: async function () {
      const equipmentModelId = this.selectedModel.equipment_model_id;
      const equipmentClassId =
        this.equipmentModelData.equipmentClass.equipment_class_id;
      const requestData = {
        equipment_model_name: this.equipmentModelData.equipment_model_name,
      };
      await EquipmentModelService.update(
        equipmentModelId,
        equipmentClassId,
        requestData
      );
      this.getEquipmentModelList();
      this.selectedModel = null;
    },
    // Проверка и вызов метода для редактирования модели обрудования
    updateData() {
      this.submitted = true;
      console.log(this.equipmentModelData);
      if (this.equipmentModelData.equipment_model_name !== "") {
        this.$confirm.require({
          message: "Вы точно хотите изменить выбранную запись?",
          header: "Подтверждение изменения",
          icon: "pi pi-info-circle",
          acceptClass: "p-button-danger",
          accept: async () => {
            await this.updateEquipmentModel();
            await this.getEquipmentModelList();
            this.submitted = false;
            this.equipmentModelData = {
              equipmentClass: null,
              equipment_model_name: null,
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
		// Логика удаления модели оборудования
    deleteEquipmentModel: async function () {
      const selectedId = this.selectedModel.equipment_model_id;
      await EquipmentModelService.delete(selectedId);
      this.getEquipmentModelList();
      this.selectedModel = null;
    },
		// Проверка и вызов метода для удаления модели оборудования
    deleteData() {
      if (this.selectedModel === null) {
        this.$toast.add({
          severity: "info",
          summary: "Внимание",
          detail: "Выберите модель для удаления",
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
            this.deleteEquipmentModel();
            this.getEquipmentModelList();
            this.$toast.add({
              severity: "success",
              summary: "Выполнено",
              detail: "Запись удалена",
              life: 3000,
            });
          },
          reject: () => {
            this.selectedCategory = null;
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
    this.getEquipmentClassList();
    this.getEquipmentCategoryList();
    this.getEquipmentModelList();
  },
};
</script>