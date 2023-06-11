<template>
  <Toast position="bottom-right" group="br" />
  <ConfirmDialog />
  <!--Меню для взаимодействия со списком оборудования-->
  <Toolbar>
    <template #start>
      <span class="font-bold text-3xl text-indigo-500">Оборудование</span>
    </template>
    <template #end>
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
      filterDateEntry: null,
      modelList: [],
      classList: [],
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
      console.log(this.equipmentList);
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
    clearData() {
      this.submitted = false;
      this.modelList = [];
      this.equipmentData.factory_number = null;
      this.equipmentData.inventory_number = null;
      this.equipmentData.equipmentModel = null;
      this.equipmentData.equipmentClass = null;
      this.equipmentData.equipmentState = null;
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