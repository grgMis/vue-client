<template>
  <Toast position="bottom-right" group="br" />
  <ConfirmDialog />
  <!--Меню для взаимодействия со списком оборудования-->
  <Toolbar>
    <template #start>
      <span class="font-bold text-3xl text-indigo-500">Отчет</span>
    </template>
    <template #end>
      <Dropdown
        id="well_name"
        v-model="selectedWell"
        :options="wellList"
        filter
        optionLabel="well_name"
        placeholder="Выберите объект"
        :class="{ 'p-invalid': submitted && !selectedWell }"
      >
        <template #option="slotProps">
          <div v-if="slotProps.option.well_name">
            <span>{{ slotProps.option.well_name }}</span>
          </div>
          <span v-else>
            {{ slotProps.placeholder }}
          </span>
        </template>
        <small class="p-error" v-if="submitted && !selectedWell"> </small>
      </Dropdown>
      <Button
        @click="showCurrentEquipmentByWell"
        icon="pi pi-search"
        class="mr-2 ml-5 bg-indigo-500"
      />
      <Button
        @click="createPDF"
        icon="pi pi-file-pdf"
        class="mr-2 ml-2 bg-indigo-500"
      />
    </template>
  </Toolbar>
  <!--Вывод списка оборудования-->
  <div id="element-to-convert">
    <Toolbar>
      <template #start>
        <span class="font-bold text-3xl">
          Текущее оборудование объекта {{ this.wellName }}
          {{ this.currentDate }}</span
        >
      </template>
    </Toolbar>
    <DataTable
      class="pt-1 p-datatable-sm"
      :value="currentEquipmentList"
      dataKey="well_equipment_id"
      showGridlines
    >
      <template #empty>Оборудование не найдено.</template>

      <Column
        style="max-width: 10rem"
        header="Инвентарный номер"
        field="equipment.inventory_number"
      >
        <template #body="{ data }">
          {{ data.equipment.inventory_number }}
        </template>
      </Column>

      <Column
        style="max-width: 10rem"
        header="Заводской номер"
        field="equipment.factory_number"
      >
        <template #body="{ data }">
          {{ data.equipment.factory_number }}
        </template>
      </Column>

      <Column
        style="max-width: 10rem"
        header="Модель"
        field="equipment.equipmentModel.equipment_model_name"
      >
        <template #body="{ data }">
          {{ data.equipment.equipmentModel.equipment_model_name }}
        </template>
      </Column>

      <Column
        style="max-width: 10rem"
        header="Класс"
        field="equipment.equipmentModel.equipmentClass.equipment_class_name"
      >
        <template #body="{ data }">
          {{
            data.equipment.equipmentModel.equipmentClass.equipment_class_name
          }}
        </template>
      </Column>

      <Column
        style="max-width: 10rem"
        header="Категория"
        field="equipment.equipmentModel.equipmentClass.equipmentCategory.equipment_category_name"
      >
        <template #body="{ data }">
          {{
            data.equipment.equipmentModel.equipmentClass.equipmentCategory
              .equipment_category_name
          }}
        </template>
      </Column>

      <Column
        style="max-width: 10rem"
        header="Состояние"
        field="equipment.equipmentState.equipment_state_name"
      >
        <template #body="{ data }">
          {{ data.equipment.equipmentState.equipment_state_name }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
import html2pdf from "html2pdf.js";
import WellEquipmentService from "../../services/WellEquipmentService";
import WellService from "../../services/WellService";

export default {
  name: "CurrentEquipmentReport",
  data() {
    return {
      submitted: false,
      currentEquipmentList: [],
      wellList: [],
      selectedWell: null,
      wellName: "",
      currentDate: "",
    };
  },
  methods: {
    getCurrentEquipmentList: async function () {
      const wellId = this.selectedWell.well_id;
      const data = await WellEquipmentService.getListByWell(wellId);
      this.currentEquipmentList = data;
    },
    getWellList: async function () {
      const data = await WellService.getList();
      this.wellList = data;
      console.log(this.wellList);
    },
    showCurrentEquipmentByWell() {
      this.submitted = true;
      if (this.selectedWell === null) {
        this.$toast.add({
          severity: "info",
          summary: "Внимание",
          detail: "Выберите объект",
          group: "br",
          life: 3000,
        });
      } else {
        this.wellName = this.selectedWell.well_name;
        this.currentDate = new Date().toLocaleDateString();
        this.getCurrentEquipmentList();
        this.submitted = false;
        this.$toast.add({
          severity: "success",
          summary: `Объект - [${this.selectedWell.well_name}]`,
          detail: "Оборудование успешно загружено",
          group: "br",
          life: 3000,
        });
      }
    },
    createPDF() {
      if (this.currentEquipmentList.length === 0) {
        this.$toast.add({
          severity: "info",
          summary: "Внимание",
          detail: "Список оборудования пуст",
          group: "br",
          life: 3000,
        });
      }
      if (
        this.currentEquipmentList !== null &&
        this.currentEquipmentList.length !== 0
      ) {
        this.exportToPDF();
        this.$toast.add({
          severity: "success",
          summary: "Успешно",
          detail: "Отчет создан",
          group: "br",
          life: 3000,
        });
      }
    },
    exportToPDF() {
      const currentDate = new Date().toLocaleDateString();
      var element = document.getElementById("element-to-convert");
      var opt = {
        margin: 1,
        filename: `оборудование-объекта-${this.wellName}-${currentDate}.pdf`,
        jsPDF: { unit: "pc", format: "letter", orientation: "portrait" },
      };
      html2pdf(element, opt);
    },
  },
  mounted() {
    this.getWellList();
  },
};
</script>