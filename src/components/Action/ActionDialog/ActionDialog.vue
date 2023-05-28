<template>
  <Dialog
    :style="{ width: '1000px' }"
    header="Создание мероприятия"
    :modal="true"
    class="p-fluid"
  >
    <Toast position="bottom-right" group="br" />
    <div class="card">
      <div class="flex align-items-stretch flex-wrap">
        <div class="field align-items-center ml-4">
          <label for="well_name" class="mb-3">Объект</label>
          <Dropdown
            id="well_name"
            v-model="selectedData.selectedWell"
            :options="wellList"
            filter
            optionLabel="well_name"
            placeholder="Объект"
            class="w-full md:w-15rem"
            :class="{ 'p-invalid': submitted && !selectedData.selectedWell }"
          >
            <template #option="slotProps">
              <div v-if="slotProps.option.well_name">
                <span>{{ slotProps.option.well_name }}</span>
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
            <small
              class="p-error"
              v-if="submitted && !selectedData.selectedWell"
            >
            </small>
          </Dropdown>
        </div>

        <div class="field align-items-center ml-4">
          <label for="employee_last_name" class="mb-3">Ответственный</label>
          <Dropdown
            id="employee_last_name"
            v-model="selectedData.selectedUser"
            :options="userList"
            filter
            optionLabel="employee.employee_last_name"
            placeholder="Сотрудник"
            class="w-full md:w-15rem"
            :class="{ 'p-invalid': submitted && !selectedData.selectedUser }"
          >
            <template #option="slotProps">
              <div v-if="slotProps.option.employee.employee_last_name">
                <span>{{
                  slotProps.option.employee.employee_last_name +
                  " " +
                  slotProps.option.employee.employee_first_name[0] +
                  "." +
                  " " +
                  slotProps.option.employee.employee_father_name[0] +
                  "."
                }}</span>
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
            <small
              class="p-error"
              v-if="submitted && !selectedData.selectedUser"
            >
            </small>
          </Dropdown>
        </div>

        <div class="field align-items-center ml-4">
          <label for="date_begin" class="mb-3">Дата начала</label>
          <Calendar
            style="p-calendar"
            v-model="selectedData.dateBegin"
            class="w-full md:w-10rem"
            dateOnly
            showIcon
            placeholder="дд.мм.гггг"
            mask="99.99.9999"
          />
        </div>

        <div class="field align-items-center ml-4">
          <label for="date_end" class="mb-3">Дата окончания</label>
          <Calendar
            style="p-calendar"
            v-model="selectedData.dateEnd"
            class="w-full md:w-10rem"
            dateOnly
            showIcon
            placeholder="дд.мм.гггг"
            mask="99.99.9999"
          />
        </div>

        <div class="field align-items-center ml-4">
          <label for="action_note" class="mb-3">Примечание</label>
          <Textarea
            id="action_note"
            v-model="selectedData.actionNote"
            required="true"
            rows="4"
            cols="30"
          />
        </div>

        <div class="field align-items-center ml-4 mx-3 my-3 mt-8">
          <Button
            label="Очистить"
            @click="clearData()"
            class="w-full md:w-10rem mt-8"
            icon="pi pi-eraser"
            text
          />
        </div>
      </div>
    </div>

    <div class="card">
      <TabView class="tabview-custom">
        <TabPanel>
          <template #header>
            <i class="pi pi-plus mr-2"></i>
            <span>Монтаж</span>
          </template>
          <EntryTemplate
            :selectedWell="selectedData.selectedWell"
            :selectedUser="selectedData.selectedUser"
            :dateBegin="selectedData.dateBegin"
            :dateEnd="selectedData.dateEnd"
            :actionNote="selectedData.actionNote"
          >
          </EntryTemplate>
        </TabPanel>
        <TabPanel>
          <template #header>
            <i class="pi pi-times mr-2"></i>
            <span>Демонтаж</span>
          </template>
        </TabPanel>
        <TabPanel>
          <template #header>
            <i class="pi pi-wrench mr-2"></i>
            <span>Ремонт</span>
          </template>
        </TabPanel>
      </TabView>
    </div>
  </Dialog>
</template>

<script>
import WellService from "../../../services/WellService";
import UserService from "../../../services/UserService";

export default {
  data() {
    return {
      wellList: [],
      userList: [],
      selectedData: {
        selectedWell: null,
        selectedUser: null,
        dateBegin: null,
        dateEnd: null,
        actionNote: null,
      },
    };
  },
  methods: {
    getWellList: async function () {
      const data = await WellService.getList();
      this.wellList = data;
    },
    getUserList: async function () {
      const data = await UserService.getList();
      this.userList = data;
    },
    clearData() {
      this.selectedData.selectedWell = null;
      (this.selectedData.selectedUser = null),
        (this.selectedData.dateBegin = null);
      this.selectedData.dateEnd = null;
      this.selectedData.actionNote = null;
    },
  },
  mounted() {
    this.getWellList();
    this.getUserList();
  },
};
</script>