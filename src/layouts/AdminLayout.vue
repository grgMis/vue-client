<template>
  <div>
    <Menubar>
      <template #start>
        <Button
          icon="pi pi-bars"
          style="color: gray"
          outlined
          @click="visible = true"
        />
      </template>
    </Menubar>
    <div class="card flex justify-content-center">
      <Sidebar v-model:visible="visible" class="w-full md:w-15rem lg:w-15rem">
        <div class="card flex justify-content-center">
          <Menu :model="items" />
        </div>
      </Sidebar>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      items: [
        {
          label: "Оборудование",
          items: [
            {
              label: "Список",
              to: "/admin/equipment",
            },
            {
              label: "Модели",
              to: "/admin/equipment-model",
            },
            {
              label: "Классы",
              to: "/admin/equipment-class",
            },
            {
              label: "Категории",
              to: "/admin/equipment-category",
            },
            {
              label: "Состояния",
              to: "/admin/equipment-state",
            },
          ],
        },
        {
          label: "Объекты",
          items: [
            {
              label: "Текущее оборудование",
              to: "/admin/current-equipment",
            },
            {
              label: "Список",
              to: "/admin/well",
            },
            {
              label: "Компании",
              to: "/admin/company",
            },
            {
              label: "Месторождения",
              to: "/admin/field",
            },
            {
              label: "Состояния",
              to: "/admin/well-state",
            },
          ],
        },
        {
          label: "Мероприятия",
          items: [
            {
              label: "Список",
              to: "/admin/action",
            },
            {
              label: "Типы",
              to: "/admin/action-type",
            },
            {
              label: "Состояния",
              to: "/admin/action-state",
            },
          ],
        },
      ],
    };
  },
};
</script>