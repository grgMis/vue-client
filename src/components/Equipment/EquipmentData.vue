<template>
  <Toast position="bottom-right" group="br" />
  <ConfirmDialog />
  <!--Диалоговая форма добавления оборудования-->
  <Dialog
    v-model:visible="visibleAddDialog"
    :style="{ width: '450px' }"
    header="Оборудование"
    :modal="true"
    class="p-fluid"
  >
    <div class="field">
      <label for="factory_number">Заводской номер</label>
      <InputText
        id="factory_number"
        v-model.trim="equipmentData.factory_number"
        required="true"
        :class="{ 'p-invalid': submitted && !equipmentData.factory_number }"
      />
      <small class="p-error" v-if="submitted && !equipmentData.factory_number">
        Укажите заводской номер.
      </small>
    </div>
    <div class="field">
      <label for="inventory_number">Инвентарный номер</label>
      <InputText
        id="inventory_number"
        v-model.trim="equipmentData.inventory_number"
        required="true"
        :class="{ 'p-invalid': submitted && !equipmentData.inventory_number }"
      />
      <small
        class="p-error"
        v-if="submitted && !equipmentData.inventory_number"
      >
        Укажите инвентарный номер.
      </small>
    </div>

    <div class="field">
      <label for="equipment_class_name" class="mb-3">Класс</label>
      <Dropdown
        id="equipment_class_name"
        v-model="equipmentData.equipmentClass"
        :options="classList"
        @change="getModelList"
        filter
        optionLabel="equipment_class_name"
        placeholder="Выберите класс"
        :class="{ 'p-invalid': submitted && !equipmentData.equipmentClass }"
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
          v-if="submitted && !equipmentData.equipmentClass"
        >
        </small>
      </Dropdown>
    </div>

    <div class="field">
      <label for="equipment_model_name" class="mb-3">Модель</label>
      <Dropdown
        id="equipment_model_name"
        v-model="equipmentData.equipmentModel"
        :options="modelList"
        optionLabel="equipment_model_name"
        placeholder="Выберите модель"
        :class="{ 'p-invalid': submitted && !equipmentData.equipmentModel }"
      >
        <template #option="slotProps">
          <div v-if="slotProps.option.equipment_model_name">
            <span>{{ slotProps.option.equipment_model_name }}</span>
          </div>
          <span v-else>
            {{ slotProps.placeholder }}
          </span>
        </template>
        <small
          class="p-error"
          v-if="submitted && !equipmentData.equipmentModel"
        >
        </small>
      </Dropdown>
    </div>

    <div class="field">
      <label for="equipment_state_name" class="mb-3">Состояние</label>
      <Dropdown
        id="equipment_state_name"
        v-model="equipmentData.equipmentState"
        :options="equipmentStateList"
        optionLabel="equipment_state_name"
        placeholder="Выберите состояние"
        :class="{ 'p-invalid': submitted && !equipmentData.equipmentState }"
      >
        <template #option="slotProps">
          <div v-if="slotProps.option.equipment_state_name">
            <span>{{ slotProps.option.equipment_state_name }}</span>
          </div>
          <span v-else>
            {{ slotProps.placeholder }}
          </span>
        </template>
        <small
          class="p-error"
          v-if="submitted && !equipmentData.equipmentState"
        >
        </small>
      </Dropdown>
    </div>

    <template #footer>
      <Button
        label="Сохранить"
        icon="pi pi-check"
        text
        @click="saveEquipment"
      />
    </template>
  </Dialog>
  <!--Диалоговая форма редактирования оборудования-->
  <Dialog
    v-model:visible="visibleEditDialog"
    :style="{ width: '450px' }"
    header="Редактирование"
    :modal="true"
    class="p-fluid"
  >
    <div class="field">
      <label for="factory_number">Заводской номер</label>
      <InputText
        id="factory_number"
        :value="equipmentData.factory_number"
        @input="equipmentData.factory_number = $event.target.value"
        required="true"
        :class="{ 'p-invalid': submitted && !equipmentData.factory_number }"
      />
      <small class="p-error" v-if="submitted && !equipmentData.factory_number">
        Укажите заводской номер.
      </small>
    </div>

    <div class="field">
      <label for="inventory_number">Инвентарный номер</label>
      <InputText
        id="inventory_number"
        :value="equipmentData.inventory_number"
        @input="equipmentData.inventory_number = $event.target.value"
        required="true"
        :class="{ 'p-invalid': submitted && !equipmentData.inventory_number }"
      />
      <small
        class="p-error"
        v-if="submitted && !equipmentData.inventory_number"
      >
        Укажите инвентарный номер.
      </small>
    </div>

    <div class="field">
      <label for="equipment_class_name" class="mb-3">Класс оборудования</label>
      <Dropdown
        id="equipment_class_name"
        v-model="equipmentData.equipmentClass"
        :options="classList"
        @change="getEditModelList"
        optionLabel="equipment_class_name"
        placeholder="Выберите класс"
        :class="{ 'p-invalid': submitted && !equipmentData.equipmentClass }"
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
          v-if="submitted && !equipmentData.equipmentClass"
        >
        </small>
      </Dropdown>
    </div>

    <div class="field">
      <label for="equipment_model_name" class="mb-3">Модель оборудования</label>
      <Dropdown
        id="equipment_model_name"
        v-model="equipmentData.equipmentModel"
        :options="modelList"
        optionLabel="equipment_model_name"
        placeholder="Выберите модель"
        :class="{ 'p-invalid': submitted && !equipmentData.equipmentModel }"
      >
        <template #option="slotProps">
          <div v-if="slotProps.option.equipment_model_name">
            <span>{{ slotProps.option.equipment_model_name }}</span>
          </div>
          <span v-else>
            {{ slotProps.placeholder }}
          </span>
        </template>
        <small
          class="p-error"
          v-if="submitted && !equipmentData.equipmentModel"
        >
        </small>
      </Dropdown>
    </div>

    <div class="field">
      <label for="equipment_state_name" class="mb-3">Состояние</label>
      <Dropdown
        id="equipment_state_name"
        v-model="equipmentData.equipmentState"
        :options="equipmentStateList"
        optionLabel="equipment_state_name"
        placeholder="Выберите состояние"
        :class="{ 'p-invalid': submitted && !equipmentData.equipmentState }"
      >
        <template #option="slotProps">
          <div v-if="slotProps.option.equipment_state_name">
            <span>{{ slotProps.option.equipment_state_name }}</span>
          </div>
          <span v-else>
            {{ slotProps.placeholder }}
          </span>
        </template>
        <small
          class="p-error"
          v-if="submitted && !equipmentData.equipmentState"
        >
        </small>
      </Dropdown>
    </div>

    <template #footer>
      <Button label="Сохранить" icon="pi pi-check" text @click="updateData" />
    </template>
  </Dialog>
  <!--Меню для взаимодействия со списком оборудования-->
  <Toolbar>
    <template #start>
      <span class="font-bold text-3xl text-indigo-500">Оборудование</span>
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
  <!--Вывод списка оборудования-->
  <DataTable
    class="pt-1 p-datatable-sm"
    paginator
    :rows="20"
    v-model:selection="selectedEquipment"
    v-model:filters="filters"
    :value="filterByDate"
    selectionMode="single"
    dataKey="equipment_id"
    filterDisplay="row"
    showGridlines
  >
    <template #empty> Оборудование не найдено. </template>
    <Column
      style="max-width: 10rem"
      header="Инвентарный номер"
      field="inventory_number"
      filterField="inventory_number"
      sortable
      :showFilterMenu="false"
    >
      <template #body="{ data }">
        {{ data.inventory_number }}
      </template>
      <template #filter="{ filterModel, filterCallback }">
        <InputText
          style="max-width: 10rem"
          class="p-column-filter p-inputtext-sm"
          v-model="filterModel.value"
          type="text"
          @input="filterCallback()"
          placeholder="Поиск"
          showClear
        />
      </template>
    </Column>

    <Column
      style="max-width: 10rem"
      header="Категория"
      field="equipmentModel.equipmentClass.equipmentCategory.equipment_category_name"
      filterField="equipmentModel.equipmentClass.equipmentCategory.equipment_category_name"
      sortable
      :showFilterMenu="false"
    >
      <template #body="{ data }">
        {{
          data.equipmentModel.equipmentClass.equipmentCategory
            .equipment_category_name
        }}
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
          placeholder="Поиск"
        >
          <template #option="slotProps">
            <div>
              <span>{{ slotProps.option.equipment_category_name }}</span>
            </div>
          </template>
        </Dropdown>
      </template>
    </Column>

    <Column
      style="max-width: 10rem"
      header="Класс"
      field="equipmentModel.equipmentClass.equipment_class_name"
      filterField="equipmentModel.equipmentClass.equipment_class_name"
      sortable
      :showFilterMenu="false"
    >
      <template #body="{ data }">
        {{ data.equipmentModel.equipmentClass.equipment_class_name }}
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
      header="Модель"
      field="equipmentModel.equipment_model_name"
      sortable
    >
      <template #body="{ data }">
        {{ data.equipmentModel.equipment_model_name }}
      </template>
    </Column>

    <Column
      style="max-width: 9rem"
      header="Заводской номер"
      field="factory_number"
      sortable
    >
      <template #body="{ data }">
        {{ data.factory_number }}
      </template>
    </Column>

    <Column
      style="max-width: 13rem"
      header="Дата добавления"
      field="date_entry"
      dataType="date"
      :showFilterMenu="false"
      sortable
    >
      <template #body="{ data }">
        {{ formatDate(data.date_entry) }}
      </template>
      <template #filter="{}">
        <Calendar
          v-model="filterDateEntry"
          dateFormat="dd.mm.yy"
          placeholder="дд-мм-гггг"
          showIcon
          showButtonBar
          style="width: 10rem"
        />
      </template>
    </Column>

    <Column
      style="max-width: 10rem"
      field="equipmentState.equipment_state_name"
      filterField="equipmentState.equipment_state_name"
      sortable
      header="Состояние"
      :showFilterMenu="false"
    >
      <template #body="slotProps">
        <Tag
          :value="slotProps.data.equipmentState.equipment_state_name"
          :severity="getSeverity(slotProps.data)"
        />
      </template>
      <template #filter="{ filterModel, filterCallback }">
        <Dropdown
          class="p-column-filter"
          style="width: 165px"
          :showClear="true"
          v-model="filterModel.value"
          @change="filterCallback()"
          :options="equipmentStateList"
          optionLabel="equipment_state_name"
          optionValue="equipment_state_name"
          placeholder="Поиск"
        >
          <template #option="slotProps">
            <div>
              <span>{{ slotProps.option.equipment_state_name }}</span>
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
import EquipmentService from "../../services/EquipmentService";
import EquipmentModelService from "../../services/EquipmentModelService";
import EquipmentStateService from "../../services/EquipmentStateService";

export default {
  name: "Equipment",
  data() {
    return {
      visibleAddDialog: false,
      visibleEditDialog: false,
      submitted: false,
      filterDateEntry: null,
      modelList: [],
      classList: [],
      equipmentData: {
        factory_number: null,
        inventory_number: null,
        equipmentModel: null,
        equipmentClass: null,
        equipmentState: null,
      },
      createData: [],
      equipmentList: [],
      equipmentModelList: [],
      equipmentClassList: [],
      equipmentCategoryList: [],
      equipmentStateList: [],
      selectedEquipment: null,
      filters: {
        "equipmentModel.equipmentClass.equipmentCategory.equipment_category_name":
          { value: null, matchMode: FilterMatchMode.EQUALS },
        "equipmentModel.equipmentClass.equipment_class_name": {
          value: null,
          matchMode: FilterMatchMode.EQUALS,
        },
        "equipmentState.equipment_state_name": {
          value: null,
          matchMode: FilterMatchMode.EQUALS,
        },
        inventory_number: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
    };
  },
  methods: {
    formatDate(value) {
      return new Date(value).toLocaleDateString();
    },
    getEquipmentList: async function () {
      const data = await EquipmentService.getList();
      this.equipmentList = data;
    },
    getEquipmentModelList: async function () {
      const data = await EquipmentModelService.getList();
      this.equipmentModelList = data;
    },
    getEquipmentCategoryList: async function () {
      const data = await EquipmentCategoryService.getList();
      this.equipmentCategoryList = data;
    },
    getEquipmentClassList: async function () {
      const data = await EquipmentClassService.getList();
      this.equipmentClassList = data;
    },
    getEquipmentStateList: async function () {
      const data = await EquipmentStateService.getList();
      this.equipmentStateList = data;
    },
    getModelList: async function () {
      const equipmentClassId =
        this.equipmentData.equipmentClass.equipment_class_id;
      if (equipmentClassId === null) {
        const data = await EquipmentModelService.getList();
        this.modelList = data;
      } else {
        const data = await EquipmentModelService.getListByEquipClass(
          equipmentClassId
        );
        this.modelList = data;
      }
    },
    getEditModelList: async function () {
      this.equipmentData.equipmentModel = null;
      const equipmentClassId =
        this.equipmentData.equipmentClass.equipment_class_id;
      if (equipmentClassId === null) {
        const data = await EquipmentModelService.getList();
        this.modelList = data;
      } else {
        const data = await EquipmentModelService.getListByEquipClass(
          equipmentClassId
        );
        this.modelList = data;
      }
    },
    getClassList: async function () {
      const data = await EquipmentClassService.getList();
      this.classList = data;
    },
    refreshData() {
      this.$toast.add({
        severity: "success",
        summary: "Внимание",
        detail: "Данные перезагружены",
        group: "br",
        life: 3000,
      });
      this.equipmentData = {
        factory_number: null,
        inventory_number: null,
        equipmentModel: null,
        equipmentClass: null,
        equipment_state_id: 1,
      };
      this.getEquipmentList();
			this.selectedEquipment = null;
    },
    showAddData() {
      this.visibleAddDialog = true;
      this.clearData();
    },
    showEditData() {
      if (this.selectedEquipment === null) {
        this.$toast.add({
          severity: "info",
          summary: "Внимание",
          detail: "Выберите оборудование для редактирования",
          group: "br",
          life: 3000,
        });
      } else {
        this.visibleEditDialog = true;
        this.equipmentData.inventory_number =
          this.selectedEquipment.inventory_number;
        this.equipmentData.factory_number =
          this.selectedEquipment.factory_number;
        this.equipmentData.equipmentModel =
          this.selectedEquipment.equipmentModel;
        this.equipmentData.equipmentClass =
          this.selectedEquipment.equipmentModel.equipmentClass;
        this.equipmentData.equipmentState =
          this.selectedEquipment.equipmentState;
        this.getModelList();
      }
    },
    // Логика добавления оборудования
    createEquipment: async function () {
      const equipmentModelId =
        this.equipmentData.equipmentModel.equipment_model_id;
      const equipmentStateId =
        this.equipmentData.equipmentState.equipment_state_id;
      const requestData = {
        factory_number: this.equipmentData.factory_number,
        inventory_number: this.equipmentData.inventory_number,
      };
      const data = await EquipmentService.create(
        equipmentModelId,
        equipmentStateId,
        requestData
      );
      this.createData = data;
    },
    // Проверка и вызов метода добавления оборудования
    saveEquipment: async function () {
      this.submitted = true;
      if (
        this.equipmentData.factory_number !== null &&
        this.equipmentData.inventory_number !== null
      ) {
        if (
          this.equipmentData.equipmentModel !== null &&
          this.equipmentData.equipmentClass !== null
        ) {
          try {
            await this.createEquipment();
            await this.getEquipmentList();
            this.clearData();
            this.$toast.add({
              severity: "success",
              summary: "Успешно",
              group: "br",
              detail: "Оборудование добавлено",
              life: 3000,
            });
          } catch (ex) {
            this.$toast.add({
              severity: "error",
              summary: "Внимание",
              group: "br",
              detail: ex.response.data.message,
              life: 3000,
            });
          }
        }
      }
    },
    // Логика редактирования оборудования
    updateData() {
      this.submitted = true;
      console.log(this.equipmentData);
      if (
        this.equipmentData.factory_number !== "" &&
        this.equipmentData.inventory_number !== "" &&
        this.equipmentData.equipmentModel !== null
      ) {
        this.$confirm.require({
          message: "Вы точно хотите изменить выбранную запись?",
          header: "Подтверждение изменения",
          icon: "pi pi-info-circle",
          acceptClass: "p-button-danger",
          accept: async () => {
            await this.updateEquipment();
            await this.getEquipmentList();
            this.submitted = false;
            this.equipmentData = {
              factory_number: null,
              inventory_number: null,
              equipmentModel: null,
              equipmentClass: null,
              equipmentState: null,
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
    // Проверка и вызов метода редактирования оборудования
    updateEquipment: async function () {
      const equipmentId = this.selectedEquipment.equipment_id;
      const equipmentModelId =
        this.equipmentData.equipmentModel.equipment_model_id;
      const equipmentStateId =
        this.equipmentData.equipmentState.equipment_state_id;
      const requestData = {
        factory_number: this.equipmentData.factory_number,
        inventory_number: this.equipmentData.inventory_number,
      };
      await EquipmentService.update(
        equipmentId,
        equipmentModelId,
        equipmentStateId,
        requestData
      );
      this.selectedEquipment = null;
    },
		// Логика удаления оборудования
    deleteEquipment: async function () {
      const selectedId = this.selectedEquipment.equipment_id;
      await EquipmentService.delete(selectedId);
      this.selectedEquipment = null;
    },
		// Проверка и вызов метода удаления оборудования
    deleteData() {
      if (this.selectedEquipment === null) {
        this.$toast.add({
          severity: "info",
          summary: "Внимание",
          detail: "Выберите оборудование для удаления",
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
            this.deleteEquipment();
            this.getEquipmentList();
            this.$toast.add({
              severity: "success",
              summary: "Выполнено",
              detail: "Запись удалена",
              life: 3000,
            });
          },
          reject: () => {
            this.selectedEquipment = null;
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
    clearData() {
      (this.submitted = false),
        (this.modelList = []),
        (this.equipmentData.factory_number = null),
        (this.equipmentData.inventory_number = null),
        (this.equipmentData.equipmentModel = null),
        (this.equipmentData.equipmentClass = null),
        (this.equipmentData.equipmentState = null);
    },
    getSeverity(equipment) {
      switch (equipment.equipmentState.equipment_state_name) {
        case "Установлено":
          return "success";

        case "Не установлено":
          return "warning";

        case "Ремонт":
          return "danger";

        default:
          return null;
      }
    },
  },
  mounted() {
    this.getEquipmentList();
    this.getEquipmentModelList();
    this.getEquipmentCategoryList();
    this.getEquipmentClassList();
    this.getEquipmentStateList();
    this.getClassList();
  },
  computed: {
    // Фильтр оборудования по дате внесения
    filterByDate() {
      if (this.filterDateEntry === null) {
        return this.equipmentList;
      } else {
        return this.equipmentList.filter(
          (e) =>
            this.formatDate(e.date_entry) ===
            this.formatDate(this.filterDateEntry)
        );
      }
    },
  },
};
</script>