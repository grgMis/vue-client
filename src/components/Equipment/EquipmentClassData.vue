<template>
  <Toast position="bottom-right" group="br" />
  <ConfirmDialog />
  <!--Диалоговая форма добавления класса оборудования-->
  <Dialog
    v-model:visible="visibleAddDialog"
    :style="{ width: '450px' }"
    header="Добавление класса"
    :modal="true"
    class="p-fluid"
  >
    <div class="field">
      <label for="equipment_class_name">Наименование</label>
      <InputText
        id="equipment_class_name"
        v-model.trim="equipmentClassData.equipment_class_name"
        required="true"
        :class="{
          'p-invalid': submitted && !equipmentClassData.equipment_class_name,
        }"
      />
      <small
        class="p-error"
        v-if="submitted && !equipmentClassData.equipment_class_name"
      >
        Укажите наименование.
      </small>
    </div>

    <div class="field">
      <label for="equipment_class_sysname">Системное имя</label>
      <InputText
        id="equipment_class_sysname"
        v-model.trim="equipmentClassData.equipment_class_sysname"
        required="true"
        :class="{
          'p-invalid': submitted && !equipmentClassData.equipment_class_sysname,
        }"
      />
      <small
        class="p-error"
        v-if="submitted && !equipmentClassData.equipment_class_sysname"
      >
        Укажите системное имя.
      </small>
    </div>

    <div class="field">
      <label for="equipment_category_name" class="mb-3"
        >Категория оборудования</label
      >
      <Dropdown
        id="equipment_category_name"
        v-model="equipmentClassData.equipmentCategory"
        :options="equipmentCategoryList"
        optionLabel="equipment_category_name"
        placeholder="Выберите категорию"
        :class="{
          'p-invalid': submitted && !equipmentClassData.equipmentCategory,
        }"
      >
        <template #option="slotProps">
          <div v-if="slotProps.option.equipment_category_name">
            <span>{{ slotProps.option.equipment_category_name }}</span>
          </div>
          <span v-else>
            {{ slotProps.placeholder }}
          </span>
        </template>
        <small
          class="p-error"
          v-if="submitted && !equipmentClassData.equipmentCategory"
        >
        </small>
      </Dropdown>
    </div>

    <template #footer>
      <Button label="Сохранить" icon="pi pi-check" text @click="saveData" />
    </template>
  </Dialog>
  <!--Диалоговая форма редактирвания класса оборудования-->
  <Dialog
    v-model:visible="visibleEditDialog"
    :style="{ width: '450px' }"
    header="Редактирование класса"
    :modal="true"
    class="p-fluid"
  >
    <div class="field">
      <label for="equipment_class_name">Наименование</label>
      <InputText
        id="equipment_class_name"
        :value="equipmentClassData.equipment_class_name"
        @input="equipmentClassData.equipment_class_name = $event.target.value"
        required="true"
        :class="{
          'p-invalid': submitted && !equipmentClassData.equipment_class_name,
        }"
      />
      <small
        class="p-error"
        v-if="submitted && !equipmentClassData.equipment_class_name"
      >
        Укажите наименование.
      </small>
    </div>

    <div class="field">
      <label for="equipment_class_sysname">Системное имя</label>
      <InputText
        id="equipment_class_sysname"
        :value="equipmentClassData.equipment_class_sysname"
        @input="
          equipmentClassData.equipment_class_sysname = $event.target.value
        "
        required="true"
        :class="{
          'p-invalid': submitted && !equipmentClassData.equipment_class_sysname,
        }"
      />
      <small
        class="p-error"
        v-if="submitted && !equipmentClassData.equipment_class_sysname"
      >
        Укажите системное имя.
      </small>
    </div>

    <div class="field">
      <label for="equipment_category_name" class="mb-3"
        >Категория оборудования</label
      >
      <Dropdown
        id="equipment_category_name"
        v-model="equipmentClassData.equipmentCategory"
        :options="equipmentCategoryList"
        optionLabel="equipment_category_name"
        placeholder="Выберите категорию"
        :class="{
          'p-invalid': submitted && !equipmentClassData.equipmentCategory,
        }"
      >
        <template #option="slotProps">
          <div v-if="slotProps.option.equipment_category_name">
            <span>{{ slotProps.option.equipment_category_name }}</span>
          </div>
          <span v-else>
            {{ slotProps.placeholder }}
          </span>
        </template>
        <small
          class="p-error"
          v-if="submitted && !equipmentClassData.equipmentCategory"
        >
        </small>
      </Dropdown>
    </div>

    <template #footer>
      <Button label="Сохранить" icon="pi pi-check" text @click="updateData" />
    </template>
  </Dialog>
  <!--Меню для взаимодействия со списком классов оборудования-->
  <Toolbar>
    <template #start>
      <span class="font-bold text-3xl text-indigo-500">Классы</span>
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
  <!--Вывод списка классов оборудования-->
  <DataTable
    class="pt-1 p-datatable-sm"
    v-model:selection="selectedClass"
    v-model:filters="filters"
    :value="equipmentClassList"
    filterDisplay="row"
    selectionMode="single"
    dataKey="equipment_class_id"
    showGridlines
    paginator
    :rows="23"
    :globalFilterFields="['equipmentCategory.equipment_category_name']"
  >
    <template #empty> Классы оборудования не найдены. </template>
    <Column
      style="max-width: 10rem"
      header="Идентификатор"
      field="equipment_class_id"
      sortable
    >
      <template #body="{ data }">
        {{ data.equipment_class_id }}
      </template>
    </Column>

    <Column
      style="max-width: 10rem"
      header="Наименование"
      field="equipment_class_name"
      sortable
    >
      <template #body="{ data }">
        {{ data.equipment_class_name }}
      </template>
    </Column>

    <Column
      style="max-width: 10rem"
      header="Системное имя"
      field="equipment_class_sysname"
      sortable
    >
      <template #body="{ data }">
        {{ data.equipment_class_sysname }}
      </template>
    </Column>

    <Column
      style="max-width: 10rem"
      header="Категория"
      field="equipmentCategory.equipment_category_name"
      filterField="equipmentCategory.equipment_category_name"
      sortable
      :showFilterMenu="false"
    >
      <template #body="{ data }">
        {{ data.equipmentCategory.equipment_category_name }}
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

export default {
  name: "EquipmentClass",
  data() {
    return {
      visibleAddDialog: false,
      visibleEditDialog: false,
      submitted: false,
      equipmentClassList: [],
      equipmentCategoryList: [],
      selectedClass: null,
      equipmentClassData: {
        equipmentCategory: null,
        equipment_class_name: null,
        equipment_class_sysname: null,
      },
      filters: {
        "equipmentCategory.equipment_category_name": {
          value: null,
          matchMode: FilterMatchMode.EQUALS,
        },
      },
      createData: [],
    };
  },
  methods: {
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
      this.getEquipmentClassList();
			this.selectedClass = null;
    },
    showAddData() {
      this.visibleAddDialog = true;
    },
    showEditData() {
      if (this.selectedClass === null) {
        this.$toast.add({
          severity: "info",
          summary: "Внимание",
          detail: "Выберите класс для редактирования",
          group: "br",
          life: 3000,
        });
      } else {
        this.visibleEditDialog = true;
        this.equipmentClassData.equipmentCategory =
          this.selectedClass.equipmentCategory;
        this.equipmentClassData.equipment_class_name =
          this.selectedClass.equipment_class_name;
        this.equipmentClassData.equipment_class_sysname =
          this.selectedClass.equipment_class_sysname;
      }
    },
    // Логика добавления класса оборудования
    createEquipmentClass: async function () {
      const equipmentCategoryId =
        this.equipmentClassData.equipmentCategory.equipment_category_id;
      const requestData = {
        equipment_class_name: this.equipmentClassData.equipment_class_name,
        equipment_class_sysname:
          this.equipmentClassData.equipment_class_sysname,
      };
      const data = await EquipmentClassService.create(
        equipmentCategoryId,
        requestData
      );
      this.createData = data;
      console.log(this.createData);
    },
    // Проверка и вызов метода добавления класса оборудования
    saveData: async function () {
      this.submitted = true;
      if (
        this.equipmentClassData.equipment_class_name !== null &&
        this.equipmentClassData.equipment_class_sysname !== null &&
        this.equipmentClassData.equipmentCategory !== null
      ) {
        await this.createEquipmentClass();
        await this.getEquipmentClassList();
        this.submitted = false;
        this.$toast.add({
          severity: "success",
          summary: "Успешно",
          detail: "Класс добавлен",
          group: "br",
          life: 3000,
        });
        this.equipmentClassData = {
          equipmentCategory: null,
          equipment_class_name: null,
          equipment_class_sysname: null,
        };
      }
    },
    // Логика редактирования класса оборудования
    updateEquipmentClass: async function () {
      const equipmentClassId = this.selectedClass.equipment_class_id;
      const equipmentCategoryId =
        this.equipmentClassData.equipmentCategory.equipment_category_id;
      const requestData = {
        equipment_class_name: this.equipmentClassData.equipment_class_name,
        equipment_class_sysname:
          this.equipmentClassData.equipment_class_sysname,
      };
      await EquipmentClassService.update(
        equipmentClassId,
        equipmentCategoryId,
        requestData
      );
      this.getEquipmentClassList();
      this.selectedClass = null;
    },
    // Проверка и вызов метода редатирования класса оборудования
    updateData() {
      this.submitted = true;
      console.log(this.equipmentClassData);
      if (
        this.equipmentClassData.equipment_class_name !== "" &&
        this.equipmentClassData.equipment_class_sysname !== ""
      ) {
        this.$confirm.require({
          message: "Вы точно хотите изменить выбранную запись?",
          header: "Подтверждение изменения",
          icon: "pi pi-info-circle",
          acceptClass: "p-button-danger",
          accept: async () => {
            await this.updateEquipmentClass();
            await this.getEquipmentClassList();
            this.submitted = false;
            this.equipmentClassData = {
              equipmentCategory: null,
              equipment_class_name: null,
              equipment_class_sysname: null,
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
    // Логика удаления класса оборудования
    deleteEquipmentClass: async function () {
      const selectedId = this.selectedClass.equipment_class_id;
      await EquipmentClassService.delete(selectedId);
      this.getEquipmentClassList();
      this.selectedClass = null;
    },
    // Проверка и вызов метода удаления класса оборудования
    deleteData() {
      if (this.selectedClass === null) {
        this.$toast.add({
          severity: "info",
          summary: "Внимание",
          detail: "Выберите класс для удаления",
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
            this.deleteEquipmentClass();
            this.getEquipmentClassList();
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
  },
};
</script>