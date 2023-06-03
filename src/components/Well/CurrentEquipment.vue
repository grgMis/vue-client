<template>
  <Toast position="bottom-right" group="br" />
  <ConfirmDialog />
  <Dialog
    v-model:visible="visibleInfoDialog"
    :style="{ width: '1000px' }"
    header="Текущее оборудование"
    :modal="true"
    class="p-fluid"
  >
    <div class="card mb-3">
      <label class="font-bold text-2xl"
        >Объект: {{ selectedWell.well_name }}</label
      >
    </div>
    <div class="card">
      <TabView class="tabview-custom">
        <TabPanel>
          <template #header>
            <span>Наземное</span>
          </template>
					<GroundTemplate
						:selectedWell="selectedWell">
					</GroundTemplate>
        </TabPanel>
        <TabPanel>
          <template #header>
            <span>ГНО</span>
          </template>
					<DownholeTemplate
						:selectedWell="selectedWell"
					>
					</DownholeTemplate>
        </TabPanel>
        <TabPanel>
          <template #header>
            <span>Электрическое</span>
          </template>
					<ElectricalTemplate
						:selectedWell="selectedWell"
					>
					</ElectricalTemplate>
        </TabPanel>
        <TabPanel>
          <template #header>
            <span>Метрологическое</span>
          </template>
					<MetrologyTemplate
						:selectedWell="selectedWell"
					>	
					</MetrologyTemplate>
        </TabPanel>
      </TabView>
    </div>
  </Dialog>

  <Toolbar>
    <template #start>
      <span class="font-bold text-3xl text-indigo-700"
        >Текущее оборудование</span
      >
    </template>
    <template #end>
      <Button
        @click="refreshData"
        icon="pi pi-refresh"
        class="mr-2 font-bold"
      />
    </template>
  </Toolbar>

  <DataTable
    class="pt-1 p-datatable-sm"
    v-model:selection="selectedWell"
    v-model:filters="filters"
    @dblclick="showInfo"
    :value="wellList"
    selectionMode="single"
    dataKey="well_id"
    filterDisplay="row"
    showGridlines
    paginator
    :rows="20"
    :globalFilterFields="[
      'company.company_name',
      'company.field.field_name',
      'wellState.well_state_name',
      'date_entry',
    ]"
  >
    <Column style="max-width: 10rem" header="Наименование" field="d" sortable>
      <template #body="{ data }">
        {{ data.well_name }}
      </template>
    </Column>

    <Column
      style="max-width: 10rem"
      header="Компания"
      field="company.company_name"
      filterField="company.company_name"
      sortable
      :showFilterMenu="false"
    >
      <template #body="{ data }">
        {{ data.company.company_name }}
      </template>
      <template #filter="{ filterModel, filterCallback }">
        <Dropdown
          class="p-column-filter"
          style="width: 165px"
          :showClear="true"
          v-model="filterModel.value"
          @change="filterCallback()"
          :options="companyList"
          optionLabel="company_name"
          optionValue="company_name"
          placeholder="Компания"
        >
          <template #option="slotProps">
            <div>
              <span>{{ slotProps.option.company_name }}</span>
            </div>
          </template>
        </Dropdown>
      </template>
    </Column>

    <Column
      style="max-width: 10rem"
      header="Месторождение"
      field="company.field.field_name"
      filterField="company.field.field_name"
      sortable
      :showFilterMenu="false"
    >
      <template #body="{ data }">
        {{ data.company.field.field_name }}
      </template>
      <template #filter="{ filterModel, filterCallback }">
        <Dropdown
          class="p-column-filter"
          style="width: 165px"
          :showClear="true"
          v-model="filterModel.value"
          @change="filterCallback()"
          :options="fieldList"
          optionLabel="field_name"
          optionValue="field_name"
          placeholder="Месторождения"
        >
          <template #option="slotProps">
            <div>
              <span>{{ slotProps.option.field_name }}</span>
            </div>
          </template>
        </Dropdown>
      </template>
    </Column>

    <Column
      style="max-width: 12rem"
      header="Дата внесения"
      field="date_entry"
      filterField="date_entry"
      dataType="date"
      :showFilterMenu="false"
      sortable
    >
      <template #body="{ data }">
        {{ data.date_entry }}
      </template>
      <template #filter="{ filterModel }">
        <Calendar
          v-model="filterModel.value"
          dateFormat="dd-mm-yy"
          placeholder="дд-мм-гггг"
          mask="99-99-9999"
          style="width: 7rem"
        />
      </template>
    </Column>

    <Column
      style="max-width: 10rem"
      header="Состояние"
      field="wellState.well_state_name"
      filterField="wellState.well_state_name"
      sortable
      :showFilterMenu="false"
    >
      <template #body="slotProps">
        <Tag
          :value="slotProps.data.wellState.well_state_name"
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
          :options="wellStateList"
          optionLabel="well_state_name"
          optionValue="well_state_name"
          placeholder="Состояние"
        >
          <template #option="slotProps">
            <div>
              <span>{{ slotProps.option.well_state_name }}</span>
            </div>
          </template>
        </Dropdown>
      </template>
    </Column>
  </DataTable>
</template>

<script>
import { FilterMatchMode, FilterOperator } from "primevue/api";
import WellService from "../../services/WellService";
import CompanyService from "../../services/CompanyService";
import FieldService from "../../services/FieldService";
import WellStateService from "../../services/WellStateService";

export default {
  name: "CurrentEquipment",
  data() {
    return {
      visibleInfoDialog: false,
      wellList: [],
      selectedWell: null,
      companyList: [],
      fieldList: [],
      wellStateList: [],
      filters: {
        "company.company_name": {
          value: null,
          matchMode: FilterMatchMode.EQUALS,
        },
        "company.field.field_name": {
          value: null,
          matchMode: FilterMatchMode.EQUALS,
        },
        "wellState.well_state_name": {
          value: null,
          matchMode: FilterMatchMode.EQUALS,
        },
        date_entry: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
        },
      },
    };
  },
  methods: {
    showInfo() {
      this.visibleInfoDialog = true;
    },
    getWellList: async function () {
      const data = await WellService.getList();
      this.wellList = data;
    },
    getCompanyList: async function () {
      const data = await CompanyService.getList();
      this.companyList = data;
    },
    getFieldList: async function () {
      const data = await FieldService.getList();
      this.fieldList = data;
    },
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
      this.getWellList();
    },
    getSeverity(well) {
      switch (well.wellState.well_state_name) {
        case "Активно":
          return "success";

        case "Не активно":
          return "warning";

        case "Простой":
          return "danger";

        default:
          return null;
      }
    },
  },
  mounted() {
    this.getWellList();
    this.getCompanyList();
    this.getWellStateList();
    this.getFieldList();
  },
};
</script>