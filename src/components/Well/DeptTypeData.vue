<template>
  <Toast position="bottom-right" group="br"/>
  <ConfirmDialog />

  <Dialog
    v-model:visible="visibleAddDialog"
    :style="{ width: '450px' }"
    header="Добавление типа компании"
    :modal="true"
    class="p-fluid"
  >
    <div class="field">
      <label for="dept_type_name">Наименование</label>
      <InputText
        id="dept_type_name"
        v-model.trim="deptTypeData.dept_type_name"
        required="true"
        :class="{
          'p-invalid':
            submitted && !deptTypeData.dept_type_name,
        }"
      />
      <small
        class="p-error"
        v-if="submitted && !deptTypeData.dept_type_name"
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
    header="Редактирование типа компании"
    :modal="true"
    class="p-fluid"
  >
    <div class="field">
      <label for="dept_type_name">Наименование</label>
      <InputText
        id="dept_type_name"
        :value="deptTypeData.dept_type_name"
        @input="
          deptTypeData.dept_type_name = $event.target.value
        "
        required="true"
        :class="{
          'p-invalid':
            submitted && !deptTypeData.dept_type_name,
        }"
      />
      <small
        class="p-error"
        v-if="submitted && !deptTypeData.dept_type_name"
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
      <span class="font-bold text-3xl">Типы компании</span>
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
    v-model:selection="selectedDeptType"
    :value="deptTypeList"
    selectionMode="single"
    dataKey="dept_type_id"
    showGridlines
  >
    <Column
      style="max-width: 10rem"
      header="Идентификатор"
      field="dept_type_id"
      sortable
    >
      <template #body="{ data }">
        {{ data.dept_type_id }}
      </template>
    </Column>

    <Column
      style="max-width: 10rem"
      header="Наименование"
      field="dept_type_name"
      sortable
    >
      <template #body="{ data }">
        {{ data.dept_type_name }}
      </template>
    </Column>

  </DataTable>
</template>

<script>
import DeptTypeService from '../../services/DeptTypeService'

export default {
  name: 'DeptType',
  data() {
    return {
      visibleAddDialog: false,
      visibleEditDialog: false,
      submitted: false,
      deptTypeList: [],
      selectedDeptType: null,
      deptTypeData: {
        dept_type_name: null
      },
      createData: [],
    };
  },
  methods: {
    getDeptTypeList: async function () {
      const data = await DeptTypeService.getList();
      this.deptTypeList = data;
      console.log(this.deptTypeList);
    },
    refreshData() {
      this.$toast.add({
        severity: 'success',
        summary: 'Внимание',
        detail: 'Данные перезагружены',
				group: 'br',
        life: 3000,
      });
      this.getDeptTypeList();
    },
    showAddData() {
      this.visibleAddDialog = true;
    },
    showEditData() {
      if (this.selectedDeptType === null) {
        this.$toast.add({
          severity: 'info',
          summary: 'Внимание',
          detail: 'Выберите тип компании для редактирования',
					group: 'br',
          life: 3000,
        });
      } else {
        this.visibleEditDialog = true;
        this.deptTypeData.dept_type_name =
          this.selectedDeptType.dept_type_name;
      }
    },
    saveData() {
      this.submitted = true;
      if (
        this.deptTypeData.dept_type_name !== null) {
        this.createDeptType();
        this.getDeptTypeList();
        this.$toast.add({
          severity: 'success',
          summary: 'Успешно',
          detail: 'Тип компании добавлено',
					group: 'br',
          life: 3000,
        });
        this.deptTypeData = {
          dept_type_name: null
        };
      }
    },
    createDeptType: async function () {
      const requestData = {
        dept_type_name:
          this.deptTypeData.dept_type_name,
      };
      const data = await DeptTypeService.create(requestData);
      this.createData = data;
      console.log(this.createData);
    },
    updateData() {
      this.submitted = true;
      console.log(this.deptTypeData);
      if (
        this.deptTypeData.dept_type_name !== '') {
        this.$confirm.require({
          message: 'Вы точно хотите изменить выбранную запись?',
          header: 'Подтверждение изменения',
          icon: 'pi pi-info-circle',
          acceptClass: 'p-button-danger',
          accept: () => {
            this.updateDeptType();
            this.getDeptTypeList();
            this.deptTypeData = {
              dept_type_name: null
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
    updateDeptType: async function () {
      const deptTypeId = this.selectedDeptType.dept_type_id;
      const requestData = {
        dept_type_name:
          this.deptTypeData.dept_type_name,
      };
      await DeptTypeService.update(deptTypeId, requestData);
      this.getDeptTypeList();
      this.selectedDeptType = null;
    },
    deleteData() {
      if (this.selectedDeptType === null) {
        this.$toast.add({
          severity: 'info',
          summary: 'Внимание',
          detail: 'Выберите тип компании для удаления',
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
            this.deleteDeptType();
            this.getDeptTypeList();
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
    deleteDeptType: async function () {
      const selectedId = this.selectedDeptType.dept_type_id;
      await DeptTypeService.delete(selectedId);
      this.getDeptTypeList();
      this.selectedDeptType = null;
    },
  },
  mounted() {
    this.getDeptTypeList();
  },
};
</script>