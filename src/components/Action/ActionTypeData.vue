<template>
  <Toast position="bottom-right" group="br"/>
  <ConfirmDialog />
  <Dialog
    v-model:visible="visibleAddDialog"
    :style="{ width: '450px' }"
    header="Добавление типа мероприятия"
    :modal="true"
    class="p-fluid"
  >
    <div class="field">
      <label for="action_type_name">Наименование</label>
      <InputText
        id="action_type_name"
        v-model.trim="actionTypeData.action_type_name"
        required="true"
        :class="{
          'p-invalid': submitted && !actionTypeData.action_type_name,
        }"
      />
      <small
        class="p-error"
        v-if="submitted && !actionTypeData.action_type_name"
      >
        Укажите наименование.
      </small>
    </div>

    <div class="field">
      <label for="action_type_sysname">Системное имя</label>
      <InputText
        id="action_type_name"
        v-model.trim="actionTypeData.action_type_sysname"
        required="true"
        :class="{
          'p-invalid': submitted && !actionTypeData.action_type_sysname,
        }"
      />
      <small
        class="p-error"
        v-if="submitted && !actionTypeData.action_type_sysname"
      >
        Укажите системное имя.
      </small>
    </div>

    <div class="field">
      <label for="action_group_name" class="mb-3"
        >Группа мероприятия</label
      >
      <Dropdown
        id="action_group_name"
        v-model="actionTypeData.actionGroup"
        :options="actionGroupList"
        optionLabel="action_group_name"
        placeholder="Выберите группу"
        :class="{
          'p-invalid': submitted && !actionTypeData.actionGroup,
        }"
      >
        <template #option="slotProps">
          <div v-if="slotProps.option.action_group_name">
            <span>{{ slotProps.option.action_group_name }}</span>
          </div>
          <span v-else>
            {{ slotProps.placeholder }}
          </span>
        </template>
        <small
          class="p-error"
          v-if="submitted && !actionTypeData.actionGroup"
        >
        </small>
      </Dropdown>
    </div>

    <template #footer>
      <Button label="Сохранить" icon="pi pi-check" text @click="saveData" />
    </template>
  </Dialog>

  <Dialog
    v-model:visible="visibleEditDialog"
    :style="{ width: '450px' }"
    header="Редактирование типа мероприятия"
    :modal="true"
    class="p-fluid"
  >
    <div class="field">
      <label for="action_type_name">Наименование</label>
      <InputText
        id="action_type_name"
        :value="actionTypeData.action_type_name"
        @input="actionTypeData.action_type_name = $event.target.value"
        required="true"
        :class="{
          'p-invalid': submitted && !actionTypeData.action_type_name,
        }"
      />
      <small
        class="p-error"
        v-if="submitted && !actionTypeData.action_type_name"
      >
        Укажите наименование.
      </small>
    </div>

    <div class="field">
      <label for="action_type_sysname">Системное имя</label>
      <InputText
        id="action_type_sysname"
        :value="actionTypeData.action_type_sysname"
        @input="
          actionTypeData.action_type_sysname = $event.target.value
        "
        required="true"
        :class="{
          'p-invalid': submitted && !actionTypeData.action_type_sysname,
        }"
      />
      <small
        class="p-error"
        v-if="submitted && !actionTypeData.action_type_sysname"
      >
        Укажите системное имя.
      </small>
    </div>

    <div class="field">
      <label for="action_group_name" class="mb-3"
        >Группа оборудования</label
      >
      <Dropdown
        id="action_group_name"
        v-model="actionTypeData.actionGroup"
        :options="actionGroupList"
        optionLabel="action_group_name"
        placeholder="Выберите группу"
        :class="{
          'p-invalid': submitted && !actionTypeData.actionGroup,
        }"
      >
        <template #option="slotProps">
          <div v-if="slotProps.option.action_group_name">
            <span>{{ slotProps.option.action_group_name }}</span>
          </div>
          <span v-else>
            {{ slotProps.placeholder }}
          </span>
        </template>
        <small
          class="p-error"
          v-if="submitted && !actionTypeData.actionGroup"
        >
        </small>
      </Dropdown>
    </div>

    <template #footer>
      <Button label="Сохранить" icon="pi pi-check" text @click="updateData" />
    </template>
  </Dialog>

  <Toolbar>
    <template #start>
      <span class="font-bold text-3xl">Типы мероприятий</span>
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
    v-model:selection="selectedActionType"
    v-model:filters="filters"
    :value="actionTypeList"
    filterDisplay="row"
    selectionMode="single"
    dataKey="action_type_id"
    showGridlines
    :globalFilterFields="['actionGroup.action_group_name']"
  >
    <Column
      style="max-width: 10rem"
      header="Идентификатор"
      field="action_type_id"
      sortable
    >
      <template #body="{ data }">
        {{ data.action_type_id }}
      </template>
    </Column>

    <Column
      style="max-width: 10rem"
      header="Наименование"
      field="action_type_name"
      sortable
    >
      <template #body="{ data }">
        {{ data.action_type_name }}
      </template>
    </Column>

    <Column
      style="max-width: 10rem"
      header="Системное имя"
      field="action_type_sysname"
      sortable
    >
      <template #body="{ data }">
        {{ data.action_type_sysname }}
      </template>
    </Column>

    <Column
      style="max-width: 10rem"
      header="Группа"
			field="actionGroup.action_group_name"
      filterField="actionGroup.action_group_name"
      sortable
      :showFilterMenu="false"
    >
      <template #body="{ data }">
        {{ data.actionGroup.action_group_name }}
      </template>
      <template #filter="{ filterModel, filterCallback }">
        <Dropdown
          class="p-column-filter"
          style="width: 165px"
          :showClear="true"
          v-model="filterModel.value"
          @change="filterCallback()"
          :options="actionGroupList"
          optionLabel="action_group_name"
          optionValue="action_group_name"
          placeholder="Группа"
        >
          <template #option="slotProps">
            <div>
              <span>{{ slotProps.option.action_group_name }}</span>
            </div>
          </template>
        </Dropdown>
      </template>
    </Column>
  </DataTable>
</template>

<script>
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import ActionTypeService from '../../services/ActionTypeService'
import ActionGroupService from '../../services/ActionGroupService';

export default {
  name: 'ActionType',
  data() {
    return {
      visibleAddDialog: false,
      visibleEditDialog: false,
      submitted: false,
      actionTypeList: [],
      actionGroupList: [],
      selectedActionType: null,
      actionTypeData: {
        actionGroup: null,
        action_type_name: null,
        action_type_sysname: null,
      },
      filters: {
        'actionGroup.action_group_name': {
          value: null,
          matchMode: FilterMatchMode.EQUALS,
        },
      },
      createData: [],
    };
  },
  methods: {
    getActionTypeList: async function () {
      const data = await ActionTypeService.getList();
      this.actionTypeList = data;
      console.log(this.actionTypeList);
    },
    getActionGroupList: async function () {
      const data = await ActionGroupService.getList();
      this.actionGroupList = data;
      console.log(this.actionGroupList);
    },
    refreshData() {
      this.$toast.add({
        severity: 'success',
        summary: 'Внимание',
        detail: 'Данные перезагружены',
				group: 'br',
        life: 3000,
      });
      this.getActionTypeList();
    },
    showAddData() {
      this.visibleAddDialog = true;
    },
    showEditData() {
      if (this.selectedActionType === null) {
        this.$toast.add({
          severity: 'info',
          summary: 'Внимание',
          detail: 'Выберите тип для редактирования',
					group: 'br',
          life: 3000,
        });
      } else {
        this.visibleEditDialog = true;
        this.actionTypeData.actionGroup =
          this.selectedActionType.actionGroup;
        this.actionTypeData.action_type_name =
          this.selectedActionType.action_type_name;
        this.actionTypeData.action_type_sysname =
          this.selectedActionType.action_type_sysname;
      }
    },
    saveData() {
      this.submitted = true;
      if (
        this.actionTypeData.action_type_name !== null &&
        this.actionTypeData.action_type_sysname !== null &&
        this.actionTypeData.actionGroup !== null
      ) {
        this.createActionType();
        this.getActionTypeList();
        this.$toast.add({
          severity: 'success',
          summary: 'Успешно',
          detail: 'Тип добавлен',
					group: 'br',
          life: 3000,
        });
        this.actionTypeData = {
          actionGroup: null,
          action_type_name: null,
          action_type_sysname: null,
        };
      }
    },
    createActionType: async function () {
      const actionGroupId =
        this.actionTypeData.actionGroup.action_group_id;
      const requestData = {
        action_type_name: this.actionTypeData.action_type_name,
        action_type_sysname:
          this.actionTypeData.action_type_sysname,
      };
      const data = await ActionTypeService.create(
        actionGroupId,
        requestData
      );
      this.createData = data;
      console.log(this.createData);
    },
    updateData() {
      this.submitted = true;
      console.log(this.actionTypeData);
      if (
        this.actionTypeData.action_type_name !== '' &&
        this.actionTypeData.action_type_sysname !== ''
      ) {
        this.$confirm.require({
          message: 'Вы точно хотите изменить выбранную запись?',
          header: 'Подтверждение изменения',
          icon: 'pi pi-info-circle',
          acceptClass: 'p-button-danger',
          accept: () => {
            this.updateActionType();
            this.getActionTypeList();
            this.actionTypeData = {
              actionGroup: null,
              action_type_name: null,
              action_type_sysname: null,
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
    updateActionType: async function () {
      const actionTypeId = this.selectedActionType.action_type_id;
      const actionGroupId =
        this.actionTypeData.actionGroup.action_group_id;
      const requestData = {
        action_type_name: this.actionTypeData.action_type_name,
        action_type_sysname:
          this.actionTypeData.action_type_sysname,
      };
      await ActionTypeService.update(
        actionTypeId,
        actionGroupId,
        requestData
      );
      this.getActionTypeList();
      this.selectedActionType = null;
    },
    deleteData() {
      if (this.selectedActionType === null) {
        this.$toast.add({
          severity: 'info',
          summary: 'Внимание',
          detail: 'Выберите тип для удаления',
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
            this.deleteActionType();
            this.getActionTypeList();
            this.$toast.add({
              severity: 'success',
              summary: 'Выполнено',
              detail: 'Запись удалена',
              life: 3000,
            });
          },
          reject: () => {
            this.selectedActionType = null;
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
    deleteActionType: async function () {
      const selectedId = this.selectedActionType.action_type_id;
      await ActionTypeService.delete(selectedId);
      this.getActionTypeList();
      this.selectedActionType = null;
    },
  },
  mounted() {
    this.getActionTypeList();
    this.getActionGroupList();
  },
};
</script>