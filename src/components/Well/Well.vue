<template>
  <Toast position="bottom-right" group="br" />
  <ConfirmDialog />
  <Dialog
    v-model:visible="visibleAddDialog"
    :style="{ width: '450px' }"
    header="Добавление объекта"
    :modal="true"
    class="p-fluid"
  >
    <div class="field">
      <label for="well_name">Наименование</label>
      <InputText
        id="well_name"
        v-model.trim="wellData.well_name"
        required="true"
        :class="{
          'p-invalid': submitted && !wellData.well_name,
        }"
      />
      <small class="p-error" v-if="submitted && !wellData.well_name">
        Укажите наименование.
      </small>
    </div>

    <div class="dept">
      <label for="dept_name" class="mb-3">Компании</label>
      <Dropdown
        id="dept_name"
        v-model="wellData.dept"
        :options="deptList"
        optionLabel="dept_name"
        placeholder="Выберите компанию"
        :class="{
          'p-invalid': submitted && !wellData.dept,
        }"
      >
        <template #option="slotProps">
          <div v-if="slotProps.option.dept_name">
            <span>{{ slotProps.option.dept_name }}</span>
          </div>
          <span v-else>
            {{ slotProps.placeholder }}
          </span>
        </template>
        <small class="p-error" v-if="submitted && !wellData.dept"> </small>
      </Dropdown>
    </div>

    <div class="field">
      <label for="well_state_name" class="mb-3">Состояние</label>
      <Dropdown
        id="well_state_name"
        v-model="wellData.wellState"
        :options="wellStateList"
        optionLabel="well_state_name"
        placeholder="Выберите состояние"
        :class="{
          'p-invalid': submitted && !wellData.wellState,
        }"
      >
        <template #option="slotProps">
          <div v-if="slotProps.option.well_state_name">
            <span>{{ slotProps.option.well_state_name }}</span>
          </div>
          <span v-else>
            {{ slotProps.placeholder }}
          </span>
        </template>
        <small class="p-error" v-if="submitted && !wellData.wellState"> </small>
      </Dropdown>
    </div>

    <template #footer>
      <Button label="Сохранить" icon="pi pi-check" text @click="saveData" />
    </template>
  </Dialog>

  <Dialog
    v-model:visible="visibleEditDialog"
    :style="{ width: '450px' }"
    header="Редактирование объекта"
    :modal="true"
    class="p-fluid"
  >
    <div class="field">
      <label for="well_name">Наименование</label>
      <InputText
        id="well_name"
        :value="wellData.well_name"
        @input="wellData.well_name = $event.target.value"
        required="true"
        :class="{
          'p-invalid': submitted && !wellData.well_name,
        }"
      />
      <small class="p-error" v-if="submitted && !wellData.well_name">
        Укажите наименование.
      </small>
    </div>

    <div class="field">
      <label for="dept_name" class="mb-3">Компания</label>
      <Dropdown
        id="dept_name"
        v-model="wellData.dept"
        :options="deptList"
        optionLabel="dept_name"
        placeholder="Выберите компанию"
        :class="{
          'p-invalid': submitted && !wellData.dept,
        }"
      >
        <template #option="slotProps">
          <div v-if="slotProps.option.dept_name">
            <span>{{ slotProps.option.dept_name }}</span>
          </div>
          <span v-else>
            {{ slotProps.placeholder }}
          </span>
        </template>
        <small class="p-error" v-if="submitted && !wellData.dept_name"> </small>
      </Dropdown>
    </div>

    <div class="field">
      <label for="well_state_name" class="mb-3">Состояние</label>
      <Dropdown
        id="well_state_name"
        v-model="wellData.wellState"
        :options="wellStateList"
        optionLabel="well_state_name"
        placeholder="Выберите состояние"
        :class="{
          'p-invalid': submitted && !wellData.wellState,
        }"
      >
        <template #option="slotProps">
          <div v-if="slotProps.option.well_state_name">
            <span>{{ slotProps.option.well_state_name }}</span>
          </div>
          <span v-else>
            {{ slotProps.placeholder }}
          </span>
        </template>
        <small class="p-error" v-if="submitted && !wellData.wellState"> </small>
      </Dropdown>
    </div>

    <template #footer>
      <Button label="Сохранить" icon="pi pi-check" text @click="updateData" />
    </template>
  </Dialog>

  <Toolbar>
    <template #start>
      <span class="font-bold text-3xl">Объект</span>
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
    v-model:selection="selectedWell"
    v-model:filters="filters"
    :value="wellList"
    selectionMode="single"
    dataKey="well_id"
    filterDisplay="row"
    showGridlines
    :globalFilterFields="[
      'dept.dept_name',
      'wellState.well_state_name',
      'date_entry',
    ]"
  >
    <Column
      style="max-width: 10rem"
      header="Идентификатор"
      field="well_id"
      sortable
    >
      <template #body="{ data }">
        {{ data.well_id }}
      </template>
    </Column>

    <Column style="max-width: 10rem" header="Наименование" field="d" sortable>
      <template #body="{ data }">
        {{ data.well_name }}
      </template>
    </Column>

    <Column
      style="max-width: 10rem"
      header="Компания"
      filterField="dept.dept_name"
      sortable
      :showFilterMenu="false"
    >
      <template #body="{ data }">
        {{ data.dept.dept_name }}
      </template>
      <template #filter="{ filterModel, filterCallback }">
        <Dropdown
          class="p-column-filter"
          style="width: 165px"
          :showClear="true"
          v-model="filterModel.value"
          @change="filterCallback()"
          :options="deptList"
          optionLabel="dept_name"
          optionValue="dept_name"
          placeholder="Компания"
        >
          <template #option="slotProps">
            <div>
              <span>{{ slotProps.option.dept_name }}</span>
            </div>
          </template>
        </Dropdown>
      </template>
    </Column>

    <Column
      style="max-width: 10rem"
      header="Состояние"
      filterField="wellState.well_state_name"
      sortable
      :showFilterMenu="false"
    >
      <template #body="{ data }">
        {{ data.wellState.well_state_name }}
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

    <Column
      style="max-width: 12rem"
      header="Дата добавления"
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
  </DataTable>
</template>

<script>
import { FilterMatchMode, FilterOperator } from "primevue/api";
import WellService from "../../services/WellService";
import DeptService from "../../services/DeptService";
import WellStateService from "../../services/WellStateService";

export default {
  name: "Well",
  data() {
    return {
      visibleAddDialog: false,
      visibleEditDialog: false,
      submitted: false,
      wellList: [],
      deptList: [],
      wellStateList: [],
      selectedWell: null,
      wellData: {
        well_name: null,
        dept: null,
        wellState: null,
      },
      filters: {
        "dept.dept_name": {
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
      createData: [],
    };
  },
  methods: {
    getWellList: async function () {
      const data = await WellService.getList();
      this.wellList = data;
      console.log(this.wellList);
    },
    getDeptList: async function () {
      const data = await DeptService.getList();
      this.deptList = data;
      console.log(this.deptList);
    },
    getWellStateList: async function () {
      const data = await WellStateService.getList();
      this.wellStateList = data;
      console.log(this.wellStateList);
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
    showAddData() {
      this.visibleAddDialog = true;
    },
    showEditData() {
      if (this.selectedWell === null) {
        this.$toast.add({
          severity: "info",
          summary: "Внимание",
          detail: "Выберите объект для редактирования",
          group: "br",
          life: 3000,
        });
      } else {
        this.visibleEditDialog = true;
        this.wellData.well_name = this.selectedWell.well_name;
        this.wellData.dept = this.selectedWell.dept;
        this.wellData.wellState = this.selectedWell.wellState;
      }
    },
    saveData() {
      this.submitted = true;
      if (
        this.wellData.well_name !== null &&
        this.wellData.dept !== null &&
        this.wellData.wellState !== null
      ) {
        this.createWell();
        this.getWellList();
        this.$toast.add({
          severity: "success",
          summary: "Успешно",
          detail: "Объект добавлена",
          group: "br",
          life: 3000,
        });
        this.wellData = {
          well_name: null,
          dept: null,
          wellState: null,
        };
      }
    },
    createWell: async function () {
      const deptId = this.wellData.dept.dept_id;
      const wellStateId = this.wellData.wellState.well_state_id;
      const requestData = {
        well_name: this.wellData.well_name,
      };
      const data = await WellService.create(deptId, wellStateId, requestData);
      this.createData = data;
      console.log(this.createData);
    },
    updateData() {
      this.submitted = true;
      console.log(this.wellData);
      if (
        this.wellData.well_name !== "" &&
        this.wellData.dept !== null &&
        this.wellData.wellState !== null
      ) {
        this.$confirm.require({
          message: "Вы точно хотите изменить выбранную запись?",
          header: "Подтверждение изменения",
          icon: "pi pi-info-circle",
          acceptClass: "p-button-danger",
          accept: () => {
            this.updateWell();
            this.getWellList();
            this.wellData = {
              well_name: null,
              dept: null,
              wellState: null,
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
    updateWell: async function () {
      const wellId = this.selectedWell.well_id;
      const deptId = this.wellData.dept.dept_id;
      const wellStateId = this.wellData.wellState.well_state_id;
      const requestData = {
        well_name: this.wellData.well_name,
      };
      await WellService.update(wellId, deptId, wellStateId, requestData);
      this.getWellList();
      this.selectedWell = null;
    },
    deleteData() {
      if (this.selectedWell === null) {
        this.$toast.add({
          severity: "info",
          summary: "Внимание",
          detail: "Выберите объект для удаления",
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
            this.deleteWell();
            this.getWellList();
            this.$toast.add({
              severity: "success",
              summary: "Выполнено",
              detail: "Запись удалена",
              life: 3000,
            });
          },
          reject: () => {
            this.selectedWell = null;
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
    deleteWell: async function () {
      const selectedId = this.selectedWell.well_id;
      await WellService.delete(selectedId);
      this.getWellList();
      this.selectedWell = null;
    },
  },
  mounted() {
    this.getWellList();
    this.getDeptList();
    this.getWellStateList();
  },
};
</script>