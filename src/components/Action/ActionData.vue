<template>
  <Toast position="bottom-right" group="br" />
  <ConfirmDialog />

  <Dialog
    v-model:visible="visibleEntryDialog"
    :style="{ width: '1000px' }"
    header="Установка оборудования"
    :modal="true"
    class="p-fluid"
  >
    <div class="card">
      <div class="flex align-items-stretch flex-wrap">
        <div class="field align-items-center">
          <label for="well_name" class="mb-3">Объект</label>
          <Dropdown
            id="well_name"
            v-model="selectedData.selectedWell"
            :options="wellList"
            optionLabel="well_name"
            placeholder="Выберите объект"
            class="w-full md:w-10rem"
            :class="{ 'p-invalid': submitted && !dialogData.well }"
          >
            <template #option="slotProps">
              <div v-if="slotProps.option.well_name">
                <span>{{ slotProps.option.well_name }}</span>
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
            <small class="p-error" v-if="submitted && !dialogData.well">
            </small>
          </Dropdown>
        </div>

        <div class="field align-items-center ml-4">
          <label for="well_state_name" class="mb-3">Состояние объекта</label>
          <Dropdown
            id="well_state_name"
            v-model="selectedData.selectedWellState"
            :options="dialogData.wellStateList"
            optionLabel="well_state_name"
            placeholder="Выберите состояние объекта"
            class="w-full md:w-10rem"
            :class="{
              'p-invalid': submitted && !selectedData.selectedWellState,
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
            <small
              class="p-error"
              v-if="submitted && !selectedData.selectedWellState"
            >
            </small>
          </Dropdown>
        </div>

        <div class="field align-items-center ml-4">
          <label for="equipment_state_name" class="mb-3"
            >Состояние оборудования</label
          >
          <Dropdown
            id="equipment_state_name"
            v-model="selectedData.selectedEquipmentState"
            :options="dialogData.equipmentStateList"
            optionLabel="equipment_state_name"
            placeholder="Выберите состояние оборудования"
            class="w-full md:w-10rem"
            :class="{
              'p-invalid': submitted && !selectedData.selectedEquipmentState,
            }"
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
              v-if="submitted && !selectedData.selectedEquipmentState"
            >
            </small>
          </Dropdown>
        </div>

        <div class="field align-items-center ml-4">
          <label for="action_group_sysname" class="mb-3"
            >Группа мероприятия</label
          >
          <Dropdown
            id="action_group_sysname"
            v-model="dialogData.actionGroup"
            :options="actionGroupList"
            @change="getActionTypeListByGroup"
            optionLabel="action_group_sysname"
            placeholder="Выберите группу"
            class="w-full md:w-10rem"
            :class="{ 'p-invalid': submitted && !dialogData.actionGroup }"
          >
            <template #option="slotProps">
              <div v-if="slotProps.option.action_group_sysname">
                <span>{{ slotProps.option.action_group_sysname }}</span>
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
            <small class="p-error" v-if="submitted && !dialogData.actionGroup">
            </small>
          </Dropdown>
        </div>

        <div class="field align-items-center ml-4">
          <label for="action_type_sysname" class="mb-3">Тип мероприятия</label>
          <Dropdown
            id="action_type_sysname"
            v-model="actionData.actionType"
            :options="dialogData.actionTypeListByGroup"
            optionLabel="action_type_sysname"
            placeholder="Выберите тип"
            class="w-full md:w-10rem"
            :class="{ 'p-invalid': submitted && !actionData.actionType }"
          >
            <template #option="slotProps">
              <div v-if="slotProps.option.action_type_sysname">
                <span>{{ slotProps.option.action_type_sysname }}</span>
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
            <small class="p-error" v-if="submitted && !actionData.actionType">
            </small>
          </Dropdown>
        </div>

        <div class="field align-items-center ml-4">
          <label for="action_state_name" class="mb-3">Состояние</label>
          <Dropdown
            id="action_state_name"
            v-model="actionData.actionState"
            :options="actionStateList"
            optionLabel="action_state_name"
            placeholder="Выберите состояние"
            class="w-full md:w-10rem"
            :class="{ 'p-invalid': submitted && !actionData.actionState }"
          >
            <template #option="slotProps">
              <div v-if="slotProps.option.action_state_name">
                <span>{{ slotProps.option.action_state_name }}</span>
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
            <small class="p-error" v-if="submitted && !actionData.actionState">
            </small>
          </Dropdown>
        </div>

        <div class="field align-items-center">
          <label for="date_begin">Дата окончания</label>
          <Calendar
            v-model="actionData.date_begin"
            showIcon
            placeholder="дд.мм.гггг"
            mask="99.99.9999"
          />
        </div>

        <div class="field align-items-center ml-4">
          <label for="date_end">Дата окончания</label>
          <Calendar
            v-model="actionData.date_end"
            showIcon
            placeholder="дд.мм.гггг"
            mask="99.99.9999"
          />
        </div>

        <div class="field align-items-center ml-4">
          <label for="action_note">Примечание</label>
          <Textarea
            id="action_note"
            v-model="actionData.action_note"
            required="true"
            rows="5"
            cols="30"
          />
        </div>
      </div>
    </div>

    <div class="field">
      <DataTable
        class="pt-1 p-datatable-sm h-30rem"
        v-model:selection="selectedData.selectedEquipment"
        v-model:filters="filtersEntryDialog"
        :value="dialogData.equipmentListByState"
        selectionMode="single"
        dataKey="equipment_id"
        filterDisplay="row"
        showGridlines
        :globalFilterFields="[
          'inventory_name',
          'equipmentModel.equipmentClass.equipmentCategory.equipment_category_name',
        ]"
      >
        <Column
          style="max-width: 10rem"
          header="Инвентарный номер"
          field="inventory_number"
          filterField="inventory_name"
          sortable
          :showFilterMenu="false"
        >
          <template #body="{ data }">
            {{ data.inventory_number }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              class="p-column-filter p-inputtext-sm w-full md:w-10rem"
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
        >
          <template #body="{ data }">
            {{
              data.equipmentModel.equipmentClass.equipmentCategory
                .equipment_category_name
            }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <Dropdown
              class="p-column-filter w-full md:w-10rem"
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
          style="max-width: 10rem"
          header="Класс"
          field="equipmentModel.equipmentClass.equipment_class_name"
          sortable
        >
          <template #body="{ data }">
            {{ data.equipmentModel.equipmentClass.equipment_class_name }}
          </template>
        </Column>

        <Column
          style="max-width: 10rem"
          header="Состояние"
          field="equipmentState.equipment_state_name"
          sortable
        >
          <template #body="{ data }">
            {{ data.equipmentState.equipment_state_name }}
          </template>
        </Column>
      </DataTable>
    </div>

    <template #footer>
      <Button label="Сохранить" icon="pi pi-check" text @click="createEntry" />
    </template>
  </Dialog>

  <Dialog
    v-model:visible="visibleRepairDialog"
    :style="{ width: '1000px' }"
    header="Ремонт оборудования"
    :modal="true"
    class="p-fluid"
  >
    <div class="card">
      <div class="flex align-items-stretch flex-wrap">
        <div class="field align-items-center">
          <label for="well_name" class="mb-3">Объект</label>
          <Dropdown
            id="well_name"
            v-model="dialogData.well"
            :options="wellList"
            @change="getWellEquipListByWell"
            optionLabel="well_name"
            placeholder="Выберите объект"
            class="w-full md:w-10rem"
            :class="{ 'p-invalid': submitted && !dialogData.well }"
          >
            <template #option="slotProps">
              <div v-if="slotProps.option.well_name">
                <span>{{ slotProps.option.well_name }}</span>
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
            <small class="p-error" v-if="submitted && !dialogData.well">
            </small>
          </Dropdown>
        </div>

        <div class="field align-items-center ml-4">
          <label for="action_group_sysname" class="mb-3"
            >Группа мероприятия</label
          >
          <Dropdown
            id="action_group_sysname"
            v-model="dialogData.actionGroup"
            :options="actionGroupList"
            @change="getActionTypeListByGroup"
            optionLabel="action_group_sysname"
            placeholder="Выберите группу"
            class="w-full md:w-10rem"
            :class="{ 'p-invalid': submitted && !dialogData.actionGroup }"
          >
            <template #option="slotProps">
              <div v-if="slotProps.option.action_group_sysname">
                <span>{{ slotProps.option.action_group_sysname }}</span>
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
            <small class="p-error" v-if="submitted && !dialogData.actionGroup">
            </small>
          </Dropdown>
        </div>

        <div class="field align-items-center ml-4">
          <label for="action_type_sysname" class="mb-3">Тип мероприятия</label>
          <Dropdown
            id="action_type_sysname"
            v-model="actionData.actionType"
            :options="dialogData.actionTypeListByGroup"
            optionLabel="action_type_sysname"
            placeholder="Выберите тип"
            class="w-full md:w-10rem"
            :class="{ 'p-invalid': submitted && !actionData.actionType }"
          >
            <template #option="slotProps">
              <div v-if="slotProps.option.action_type_sysname">
                <span>{{ slotProps.option.action_type_sysname }}</span>
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
            <small class="p-error" v-if="submitted && !actionData.actionType">
            </small>
          </Dropdown>
        </div>

        <div class="field align-items-center ml-4">
          <label for="action_state_name" class="mb-3">Состояние</label>
          <Dropdown
            id="action_state_name"
            v-model="actionData.actionState"
            :options="actionStateList"
            optionLabel="action_state_name"
            placeholder="Выберите состояние"
            class="w-full md:w-10rem"
            :class="{ 'p-invalid': submitted && !actionData.actionState }"
          >
            <template #option="slotProps">
              <div v-if="slotProps.option.action_state_name">
                <span>{{ slotProps.option.action_state_name }}</span>
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
            <small class="p-error" v-if="submitted && !actionData.actionState">
            </small>
          </Dropdown>
        </div>

        <div class="field align-items-center ml-4">
          <label for="date_begin">Дата окончания</label>
          <Calendar
            v-model="actionData.date_begin"
            showIcon
            dateFormat="dd-mm-yy"
            placeholder="дд-мм-гггг"
            mask="99-99-9999"
          />
        </div>

        <div class="field align-items-center">
          <label for="date_end">Дата окончания</label>
          <Calendar
            v-model="actionData.date_end"
            showIcon
            dateFormat="dd-mm-yy"
            placeholder="дд-мм-гггг"
            mask="99-99-9999"
          />
        </div>

        <div class="field align-items-center ml-4">
          <label for="action_note">Примечание</label>
          <Textarea
            id="action_note"
            v-model="actionData.action_note"
            required="true"
            rows="5"
            cols="30"
          />
        </div>
      </div>
    </div>

    <div class="field">
      <DataTable
        class="pt-1 p-datatable-sm h-30rem"
        v-model:selection="selectedData.selectedWellEquip"
        v-model:filters="filtersRepairDialog"
        :value="dialogData.wellEquipListByWell"
        selectionMode="single"
        dataKey="well_equipment_id"
        filterDisplay="row"
        showGridlines
        :globalFilterFields="[
          'equipment.inventory_name',
          'equipment.equipmentModel.equipmentClass.equipmentCategory.equipment_category_name',
        ]"
      >
        <Column
          style="max-width: 10rem"
          header="Инвентарный номер"
          field="inventory_number"
          filterField="equipment.inventory_name"
          sortable
          :showFilterMenu="false"
        >
          <template #body="{ data }">
            {{ data.equipment.inventory_number }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              class="p-column-filter p-inputtext-sm w-full md:w-10rem"
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
          field="equipment.equipmentModel.equipmentClass.equipmentCategory.equipment_category_name"
          filterField="equipment.equipmentModel.equipmentClass.equipmentCategory.equipment_category_name"
          sortable
        >
          <template #body="{ data }">
            {{
              data.equipment.equipmentModel.equipmentClass.equipmentCategory
                .equipment_category_name
            }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <Dropdown
              class="p-column-filter w-full md:w-10rem"
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

        <Column
          style="max-width: 10rem"
          header="Модель"
          field="equipment.equipmentModel.equipment_model_name"
          sortable
        >
          <template #body="{ data }">
            {{ data.equipment.equipmentModel.equipment_model_name }}
          </template>
        </Column>

        <Column
          style="max-width: 10rem"
          header="Класс"
          field="equipment.equipmentModel.equipmentClass.equipment_class_name"
          sortable
        >
          <template #body="{ data }">
            {{
              data.equipment.equipmentModel.equipmentClass.equipment_class_name
            }}
          </template>
        </Column>

        <Column
          style="max-width: 10rem"
          header="Состояние"
          field="equipment.equipmentState.equipment_state_name"
          sortable
        >
          <template #body="{ data }">
            {{ data.equipment.equipmentState.equipment_state_name }}
          </template>
        </Column>
      </DataTable>
    </div>

    <template #footer>
      <Button label="Сохранить" icon="pi pi-check" text @click="createRepair" />
    </template>
  </Dialog>

  <Toolbar>
    <template #start>
      <span class="font-bold text-3xl">Мероприятия</span>
    </template>
    <template #end>
      <Button
        label="Установка"
        @click="showEntry"
        icon="pi pi-plus"
        class="mr-2"
        style="color: gray"
        outlined
      />
      <Button
        label="Ремонт"
        @click="showRepair"
        icon="pi pi-wrench"
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
    paginator
    :rows="19"
    v-model:selection="selectedAction"
    v-model:filters="filters"
    :value="actionList"
    selectionMode="single"
    dataKey="action_id"
    filterDisplay="row"
    showGridlines
    :globalFilterFields="[
      'wellEquipment.well.well_name',
      'wellEquipment.equipment.inventory_number',
      'wellEquipment.equipment.equipmentModel.equipmentClass.equipment_class_name',
      'actionType.action_type_sysname',
      'actionType.actionGroup.action_group_sysname',
      'actionState.action_state_name',
    ]"
  >
    <Column
      style="max-width: 10rem"
      header="Объект"
      field="wellEquipment.well.well_name"
      filterField="wellEquipment.well.well_name"
      sortable
      :showFilterMenu="false"
    >
      <template #body="{ data }">
        {{ data.wellEquipment.well.well_name }}
      </template>
      <template #filter="{ filterModel, filterCallback }">
        <Dropdown
          class="p-column-filter w-full md:w-10rem"
          :showClear="true"
          v-model="filterModel.value"
          @change="filterCallback()"
          :options="wellList"
          optionLabel="well_name"
          optionValue="well_name"
          placeholder="Объект"
        >
          <template #option="slotProps">
            <div>
              <span>{{ slotProps.option.well_name }}</span>
            </div>
          </template>
        </Dropdown>
      </template>
    </Column>

    <Column
      style="max-width: 10rem"
      header="Инвентарный номер"
      field="wellEquipment.equipment.inventory_number"
      filterField="wellEquipment.equipment.inventory_number"
      sortable
      :showFilterMenu="false"
    >
      <template #body="{ data }">
        {{ data.wellEquipment.equipment.inventory_number }}
      </template>
      <template #filter="{ filterModel, filterCallback }">
        <InputText
          class="p-column-filter p-inputtext-sm w-full md:w-10rem"
          v-model="filterModel.value"
          type="text"
          @input="filterCallback()"
          placeholder="Поиск"
        />
      </template>
    </Column>

    <Column
      style="max-width: 10rem"
      header="Класс"
      field="wellEquipment.equipment.equipmentModel.equipmentClass.equipment_class_name"
      filterField="wellEquipment.equipment.equipmentModel.equipmentClass.equipment_class_name"
      sortable
      :showFilterMenu="false"
    >
      <template #body="{ data }">
        {{
          data.wellEquipment.equipment.equipmentModel.equipmentClass
            .equipment_class_name
        }}
      </template>
      <template #filter="{ filterModel, filterCallback }">
        <Dropdown
          class="p-column-filter w-full md:w-10rem"
          :showClear="true"
          v-model="filterModel.value"
          @change="filterCallback()"
          :options="equipmentClassList"
          optionLabel="equipment_class_name"
          optionValue="equipment_class_name"
          placeholder="Класс"
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
      header="Тип мероприятия"
      field="actionType.action_type_sysname"
      filterField="actionType.action_type_sysname"
      sortable
      :showFilterMenu="false"
    >
      <template #body="{ data }">
        {{ data.actionType.action_type_name }}
      </template>
      <template #filter="{ filterModel, filterCallback }">
        <InputText
          class="p-column-filter p-inputtext-sm w-full md:w-10rem"
          v-model="filterModel.value"
          type="text"
          @input="filterCallback()"
          placeholder="Поиск"
        />
      </template>
    </Column>

    <Column
      style="max-width: 10rem"
      header="Группа мероприятия"
      field="actionType.actionGroup.action_group_sysname"
      filterField="actionType.actionGroup.action_group_sysname"
      sortable
      :showFilterMenu="false"
    >
      <template #body="{ data }">
        {{ data.actionType.actionGroup.action_group_name }}
      </template>
      <template #filter="{ filterModel, filterCallback }">
        <Dropdown
          class="p-column-filter w-full md:w-10rem"
          :showClear="true"
          v-model="filterModel.value"
          @change="filterCallback()"
          :options="actionGroupList"
          optionLabel="actionGroup"
          optionValue="action_group_sysname"
          placeholder="Класс"
        >
          <template #option="slotProps">
            <div>
              <span>{{ slotProps.option.action_group_sysname }}</span>
            </div>
          </template>
        </Dropdown>
      </template>
    </Column>

    <Column
      style="max-width: 12rem"
      header="Дата начала"
      field="date_begin"
      dataType="date"
      :showFilterMenu="false"
      sortable
    >
      <template #body="{ data }">
        {{ data.date_begin }}
      </template>
    </Column>

    <Column
      style="max-width: 12rem"
      header="Дата окончания"
      field="date_end"
      dataType="date"
      :showFilterMenu="false"
      sortable
    >
      <template #body="{ data }">
        {{ data.date_end }}
      </template>
    </Column>

    <Column
      style="max-width: 10rem"
      header="Состояние"
      field="actionState.action_state_name"
      filterField="actionState.action_state_name"
      sortable
      :showFilterMenu="false"
    >
      <template #body="slotProps">
        <Tag
          :value="slotProps.data.actionState.action_state_name"
          :severity="getSeverity(slotProps.data)"
        />
      </template>
      <template #filter="{ filterModel, filterCallback }">
        <Dropdown
          class="p-column-filter w-full md:w-10rem"
          :showClear="true"
          v-model="filterModel.value"
          @change="filterCallback()"
          :options="actionStateList"
          optionLabel="action_state_name"
          optionValue="action_state_name"
          placeholder="Состояние"
        >
          <template #option="slotProps">
            <div>
              <span>{{ slotProps.option.action_state_name }}</span>
            </div>
          </template>
        </Dropdown>
      </template>
    </Column>
  </DataTable>
</template>


<script>
import { FilterMatchMode, FilterOperator } from "primevue/api";
import ActionService from "../../services/ActionService";
import WellService from "../../services/WellService";
import WellEquipmentService from "../../services/WellEquipmentService";
import WellStateService from "../../services/WellStateService";
import ActionTypeService from "../../services/ActionTypeService";
import ActionGroupService from "../../services/ActionGroupService";
import ActionStateService from "../../services/ActionStateService";
import EquipmentService from "../../services/EquipmentService";
import EquipmentClassService from "../../services/EquipmentClassService";
import EquipmentCategoryService from "../../services/EquipmentCategoryService";
import EquipmentStateService from "../../services/EquipmentStateService";

export default {
  name: "Action",
  data() {
    return {
      visibleRepairDialog: false,
      visibleEntryDialog: false,
      visibleEditDialog: false,
      submitted: false,
      createData: [],
      actionList: [],
      selectedAction: null,
      actionData: {
        date_begin: '',
        date_end: '',
        action_note: null,
        wellEquipment: null,
        actionType: null,
        actionState: null,
      },
      wellList: [],
      equipmentList: [],
      equipmentClassList: [],
      equipmentCategoryList: [],
      actionTypeList: [],
      actionGroupList: [],
      actionStateList: [],
      filters: {
        "wellEquipment.well.well_name": {
          value: null,
          matchMode: FilterMatchMode.EQUALS,
        },
        "wellEquipment.equipment.inventory_number": {
          value: null,
          matchMode: FilterMatchMode.CONTAINS,
        },
        "wellEquipment.equipment.equipmentModel.equipmentClass.equipment_class_name":
          {
            value: null,
            matchMode: FilterMatchMode.EQUALS,
          },
        "actionType.action_type_sysname": {
          value: null,
          matchMode: FilterMatchMode.CONTAINS,
        },
        "actionType.actionGroup.action_group_sysname": {
          value: null,
          matchMode: FilterMatchMode.EQUALS,
        },
        "actionState.action_state_name": {
          value: null,
          matchMode: FilterMatchMode.EQUALS,
        },
      },
      dialogData: {
        wellEquipListByWell: [],
        actionTypeListByGroup: [],
        well: [],
        actionGroup: [],
        equipmentListByState: [],
        wellEquipmentListByEquip: [],
        wellStateList: [],
        equipmentStateList: [],
        createdWellEquipment: {},
      },
      selectedData: {
        selectedWellState: {},
        selectedEquipmentState: {},
        selectedWell: {},
        selectedEquipment: null,
        selectedWellEquip: null,
      },
      filtersRepairDialog: {
        "equipment.inventory_name": {
          value: null,
          matchMode: FilterMatchMode.CONTAINS,
        },
        "equipment.equipmentModel.equipmentClass.equipmentCategory.equipment_category_name":
          {
            value: null,
            matchMode: FilterMatchMode.EQUALS,
          },
      },
      filtersEntryDialog: {
        inventory_name: {
          value: null,
          matchMode: FilterMatchMode.CONTAINS,
        },
        "equipmentModel.equipmentClass.equipmentCategory.equipment_category_name":
          {
            value: null,
            matchMode: FilterMatchMode.EQUALS,
          },
      },
    };
  },
  methods: {
    getActionList: async function () {
      const data = await ActionService.getList();
      this.actionList = data;
      console.log(this.actionList);
    },
    getWellList: async function () {
      const data = await WellService.getList();
      this.wellList = data;
      console.log(this.wellList);
    },

    getEquipmentList: async function () {
      const data = await EquipmentService.getList();
      this.equipmentList = data;
      console.log(this.equipmentList);
    },
    getEquipmentClassList: async function () {
      const data = await EquipmentClassService.getList();
      this.equipmentClassList = data;
      console.log(this.equipmentClassList);
    },
    getEquipmentCategoryList: async function () {
      const data = await EquipmentCategoryService.getList();
      this.equipmentCategoryList = data;
      console.log(this.equipmentCategoryList);
    },

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
    getActionStateList: async function () {
      const data = await ActionStateService.getList();
      this.actionStateList = data;
      console.log(this.actionStateList);
    },
    createWellEquipment: async function () {
      const wellId = this.selectedData.selectedWell.well_id;
      const equipmentId = this.selectedData.selectedEquipment.equipment_id;
      const wellEquipData = await WellEquipmentService.create(wellId, equipmentId);
      this.dialogData.createdWellEquipment = wellEquipData;
      console.log(this.dialogData.createdWellEquipment);
      const wellEquipmentId = this.dialogData.createdWellEquipment.well_equipment_id;
      const actionTypeId = this.actionData.actionType.action_type_id;
      const actionStateId = this.actionData.actionState.action_state_id;
      const requestData = {
        date_begin: this.actionData.date_begin,
        date_end: this.actionData.date_end,
        action_note: this.actionData.action_note,
      };
      const data = await ActionService.create(
        wellEquipmentId,
        actionTypeId,
        actionStateId,
        requestData
      );
      this.createData = data;
      console.log(this.createData);
    },
    updateEquipmentState: async function () {
      const equipmentId = this.selectedData.selectedEquipment.equipment_id;
      const equipmentStateId =
        this.selectedData.selectedEquipmentState.equipment_state_id;
      const data = await EquipmentService.updateState(
        equipmentId,
        equipmentStateId
      );
      this.createData = data;
      console.log(this.createData);
    },
    updateWellState: async function () {
      const wellId = this.selectedData.selectedWell.well_id;
      const wellStateId = this.selectedData.selectedWellState.well_state_id;
      const data = await WellService.updateState(wellId, wellStateId);
      this.createData = data;
      console.log(this.createData);
    },
    getEquipmentStateList: async function () {
      const data = await EquipmentStateService.getList();
      this.dialogData.equipmentStateList = data;
      console.log(this.dialogData.equipmentStateList);
    },
    getWellStateList: async function () {
      const data = await WellStateService.getList();
      this.dialogData.wellStateList = data;
      console.log(this.dialogData.wellStateList);
    },
    getEquipmentListByState: async function () {
      const equipmentStateId = 1;
      const data = await EquipmentService.getListByState(equipmentStateId);
      this.dialogData.equipmentListByState = data;
      console.log(this.dialogData.equipmentListByState);
    },
    getWellEquipListByWell: async function () {
      const wellId = this.dialogData.well.well_id;
      const data = await WellEquipmentService.getListByWell(wellId);
      this.dialogData.wellEquipListByWell = data;
      console.log(this.dialogData.wellEquipListByWell);
    },
    getWellEquipListByEquip: async function () {
      const equipmentId = this.selectedData.selectedEquipment.equipment_id;
      const data = await WellEquipmentService.getListByEquip(equipmentId);
      this.dialogData.wellEquipmentListByEquip = data;
      console.log(this.dialogData.wellEquipmentListByEquip);
    },
    getActionTypeListByGroup: async function () {
      const actionGroupId = this.dialogData.actionGroup.action_group_id;
      const data = await ActionTypeService.getListByGroup(actionGroupId);
      this.dialogData.actionTypeListByGroup = data;
      console.log(this.dialogData.actionTypeListByGroup);
    },
    createActionRepair: async function () {
      const wellEquipmentId = this.actionData.wellEquipment.well_equipment_id;
      const actionTypeId = this.actionData.actionType.action_type_id;
      const actionStateId = this.actionData.actionState.action_state_id;
      const requestData = {
        date_begin: this.actionData.date_begin,
        date_end: this.actionData.date_end,
        action_note: this.actionData.action_note,
      };
      const data = await ActionService.create(
        wellEquipmentId,
        actionTypeId,
        actionStateId,
        requestData
      );
      this.createData = data;
      console.log(this.createData);
    },
    updateAction: async function () {
      const actionId = this.selectedAction.action_id;
      const wellEquipmentId = this.actionData.wellEquipment.well_equipment_id;
      const actionTypeId = this.actionData.actionTypeId.action_type_id;
      const actionStateId = this.actionData.actionStateId.action_state_id;
      const requestData = {
        date_begin: this.actionData.date_begin,
        date_end: this.actionData.date_end,
        action_note: this.actionData.action_note,
      };
      await ActionService.update(
        actionId,
        wellEquipmentId,
        actionTypeId,
        actionStateId,
        requestData
      );
      this.selectedAction = null;
    },
    deleteAction: async function () {
      const selectedId = this.selectedAction.action_id;
      await ActionService.delete(selectedId);
      this.selectedAction = null;
    },
    createRepair() {
      this.submitted = true;
      this.selectedData.selectedWellEquip = this.actionData.wellEquipment;
      if (
        this.actionData.wellEquipment !== null &&
        this.actionData.actionType !== null &&
        this.actionData.actionState !== null
      ) {
        this.createActionRepair();
        this.getActionList();
        this.submitted = false;
        this.$toast.add({
          severity: "success",
          summary: "Successful",
          group: "br",
          detail: "Мероприятие добавлено",
          life: 3000,
        });
        this.resetData();
      }
    },
    createEntry() {
      this.createWellEquipment();
      this.updateEquipmentState();
      this.updateWellState();
      this.visibleEntryDialog = false;
    },
    resetData() {
      this.actionData = {
        date_begin: null,
        date_end: null,
        action_note: null,
        wellEquipment: null,
        actionType: null,
        actionState: null,
      };
      this.dialogData = {
        wellEquipListByWell: [],
        actionTypeListByGroup: [],
        well: [],
        actionGroup: [],
        equipmentListByState: [],
        wellEquipmentListByEquip: [],
      };
      this.selectedData = {
        selectedWellState: {},
        selectedEquipmentState: {},
        selectedWell: {},
        selectedEquipment: null,
        selectedWellEquip: null,
      };
    },
    refreshData() {
      this.$toast.add({
        severity: "success",
        summary: "Внимание",
        detail: "Данные перезагружены",
        group: "br",
        life: 3000,
      });
      this.getActionList();
      this.resetData();
    },
    showRepair() {
      this.getActionStateList();
      this.getActionGroupList();
      this.visibleRepairDialog = true;
    },
    showEntry() {
      this.getActionStateList();
      this.getEquipmentListByState();
      this.getWellStateList();
      this.getEquipmentStateList();
      this.visibleEntryDialog = true;
    },
    getSeverity(action) {
      switch (action.actionState.action_state_name) {
        case "Активно":
          return "danger";

        case "Завершено":
          return "success";

        default:
          return null;
      }
    },
  },
  mounted() {
    this.getActionList();
    this.getWellList();
    this.getEquipmentList();
    this.getEquipmentClassList();
    this.getEquipmentCategoryList();
    this.getActionTypeList();
    this.getActionGroupList();
  },
};
</script>