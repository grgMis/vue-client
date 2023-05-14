<template>
  <Toast position="bottom-right" group="br"/>
  <ConfirmDialog />
  <Dialog
    v-model:visible="visibleAddDialog"
    :style="{ width: '450px' }"
    header="Добавление категории"
    :modal="true"
    class="p-fluid"
  >
    <div class="field">
      <label for="equipment_category_name">Наименование</label>
      <InputText
        id="equipment_category_name"
        v-model.trim="equipmentCategoryData.equipment_category_name"
        required="true"
        :class="{
          'p-invalid':
            submitted && !equipmentCategoryData.equipment_category_name,
        }"
      />
      <small
        class="p-error"
        v-if="submitted && !equipmentCategoryData.equipment_category_name"
      >
        Укажите наименование.
      </small>
    </div>

    <div class="field">
      <label for="equipment_category_sysname">Системное имя</label>
      <InputText
        id="equipment_category_sysname"
        v-model.trim="equipmentCategoryData.equipment_category_sysname"
        required="true"
        :class="{
          'p-invalid':
            submitted && !equipmentCategoryData.equipment_category_sysname,
        }"
      />
      <small
        class="p-error"
        v-if="submitted && !equipmentCategoryData.equipment_category_sysname"
      >
        Укажите системное имя.
      </small>
    </div>

    <template #footer>
      <Button label="Сохранить" icon="pi pi-check" text @click="saveData" />
    </template>
  </Dialog>

  <Dialog
    v-model:visible="visibleEditDialog"
    :style="{ width: '450px' }"
    header="Редактирование категории"
    :modal="true"
    class="p-fluid"
  >
    <div class="field">
      <label for="equipment_category_name">Наименование</label>
      <InputText
        id="equipment_category_name"
        :value="equipmentCategoryData.equipment_category_name"
        @input="
          equipmentCategoryData.equipment_category_name = $event.target.value
        "
        required="true"
        :class="{
          'p-invalid':
            submitted && !equipmentCategoryData.equipment_category_name,
        }"
      />
      <small
        class="p-error"
        v-if="submitted && !equipmentCategoryData.equipment_category_name"
      >
        Укажите наименование.
      </small>
    </div>

    <div class="field">
      <label for="equipment_category_sysname">Системное имя</label>
      <InputText
        id="equipment_category_sysname"
        :value="equipmentCategoryData.equipment_category_sysname"
        @input="
          equipmentCategoryData.equipment_category_sysname = $event.target.value
        "
        required="true"
        :class="{
          'p-invalid':
            submitted && !equipmentCategoryData.equipment_category_sysname,
        }"
      />
      <small
        class="p-error"
        v-if="submitted && !equipmentCategoryData.equipment_category_sysname"
      >
        Укажите системное имя.
      </small>
    </div>

    <template #footer>
      <Button label="Сохранить" icon="pi pi-check" text @click="updateData" />
    </template>
  </Dialog>

  <Toolbar>
    <template #start>
      <span class="font-bold text-3xl">Категории</span>
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
    v-model:selection="selectedCategory"
    :value="equipmentCategoryList"
    selectionMode="single"
    dataKey="equipment_category_id"
    showGridlines
  >
    <Column
      style="max-width: 10rem"
      header="Идентификатор"
      field="equipment_category_id"
      sortable
    >
      <template #body="{ data }">
        {{ data.equipment_category_id }}
      </template>
    </Column>

    <Column
      style="max-width: 10rem"
      header="Наименование"
      field="equipment_category_name"
      sortable
    >
      <template #body="{ data }">
        {{ data.equipment_category_name }}
      </template>
    </Column>

    <Column
      style="max-width: 10rem"
      header="Системное имя"
      field="equipment_category_sysname"
      sortable
    >
      <template #body="{ data }">
        {{ data.equipment_category_sysname }}
      </template>
    </Column>
  </DataTable>
</template>

<script>
import EquipmentCategoryService from '../../services/EquipmentCategoryService';

export default {
  name: 'EquipmentCategory',
  data() {
    return {
      visibleAddDialog: false,
      visibleEditDialog: false,
      submitted: false,
      equipmentCategoryList: [],
      selectedCategory: null,
      equipmentCategoryData: {
        equipment_category_name: null,
        equipment_category_sysname: null,
      },
      createData: [],
    };
  },
  methods: {
    getEquipmentCategoryList: async function () {
      const data = await EquipmentCategoryService.getList();
      this.equipmentCategoryList = data;
      console.log(this.equipmentCategoryList);
    },
    refreshData() {
      this.$toast.add({
        severity: 'success',
        summary: 'Внимание',
        detail: 'Данные перезагружены',
				group: 'br',
        life: 3000,
      });
      this.getEquipmentCategoryList();
    },
    showAddData() {
      this.visibleAddDialog = true;
    },
    showEditData() {
      if (this.selectedCategory === null) {
        this.$toast.add({
          severity: 'info',
          summary: 'Внимание',
          detail: 'Выберите категорию для редактирования',
					group: 'br',
          life: 3000,
        });
      } else {
        this.visibleEditDialog = true;
        this.equipmentCategoryData.equipment_category_name =
          this.selectedCategory.equipment_category_name;
        this.equipmentCategoryData.equipment_category_sysname =
          this.selectedCategory.equipment_category_sysname;
      }
    },
    saveData() {
      this.submitted = true;
      if (
        this.equipmentCategoryData.equipment_category_name !== null &&
        this.equipmentCategoryData.equipment_category_sysname !== null
      ) {
        this.createEquipmentCategory();
        this.getEquipmentCategoryList();
        this.$toast.add({
          severity: 'success',
          summary: 'Успешно',
          detail: 'Категория добавлена',
					group: 'br',
          life: 3000,
        });
        this.equipmentCategoryData = {
          equipment_category_name: null,
          equipment_category_sysname: null,
        };
      }
    },
    createEquipmentCategory: async function () {
      const requestData = {
        equipment_category_name:
          this.equipmentCategoryData.equipment_category_name,
        equipment_category_sysname:
          this.equipmentCategoryData.equipment_category_name,
      };
      const data = await EquipmentCategoryService.create(requestData);
      this.createData = data;
      console.log(this.createData);
    },
    updateData() {
      this.submitted = true;
      console.log(this.equipmentCategoryData);
      if (
        this.equipmentCategoryData.equipment_category_name !== '' &&
        this.equipmentCategoryData.equipment_category_sysname !== ''
      ) {
        this.$confirm.require({
          message: 'Вы точно хотите изменить выбранную запись?',
          header: 'Подтверждение изменения',
          icon: 'pi pi-info-circle',
          acceptClass: 'p-button-danger',
          accept: () => {
            this.updateEquipmentCategory();
            this.getEquipmentCategoryList();
            this.equipmentCategoryData = {
              equipment_category_name: null,
              equipment_category_sysname: null,
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
    updateEquipmentCategory: async function () {
      const equipmentCategoryId = this.selectedCategory.equipment_category_id;
      const requestData = {
        equipment_category_name:
          this.equipmentCategoryData.equipment_category_name,
        equipment_category_sysname:
          this.equipmentCategoryData.equipment_category_sysname,
      };
      await EquipmentCategoryService.update(equipmentCategoryId, requestData);
      this.getEquipmentCategoryList();
      this.selectedCategory = null;
    },
    deleteData() {
      if (this.selectedCategory === null) {
        this.$toast.add({
          severity: 'info',
          summary: 'Внимание',
          detail: 'Выберите категорию для удаления',
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
            this.deleteEquipmentCategory();
            this.getEquipmentCategoryList();
            this.$toast.add({
              severity: 'success',
              summary: 'Выполнено',
              detail: 'Запись удалена',
              life: 3000,
            });
          },
          reject: () => {
            this.selectedCategory = null;
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
    deleteEquipmentCategory: async function () {
      const selectedId = this.selectedCategory.equipment_category_id;
      await EquipmentCategoryService.delete(selectedId);
      this.getEquipmentCategoryList();
      this.selectedCategory = null;
    },
  },
  mounted() {
    this.getEquipmentCategoryList();
  },
};
</script>