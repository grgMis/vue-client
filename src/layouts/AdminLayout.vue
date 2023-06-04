<template>
  <div>
    <ConfirmPopup group="demo" />
    <Toast position="bottom-right" group="br" />
    <Menubar class="bg-indigo-600">
      <template #start>
        <Button
					class="text-indigo-50"
          icon="pi pi-bars"
          style="color: gray"
          outlined
          @click="visible = true"
        />
        <label class="font-bold text-3xl ml-3 text-indigo-50">Панель администратора</label>
      </template>
      <template #end>
        <label class="font-bold text-xl mr-3 text-indigo-50">
          {{
            currentUser.employee.employee_last_name +
            " " +
            currentUser.employee.employee_first_name[0] +
            "." +
            " " +
            currentUser.employee.employee_father_name[0] +
            "."
          }}
        </label>
        <Button
          class="mr-2 text-indigo-50"
          icon="pi pi-sign-out"
          style="color: gray"
          outlined
          @click="signOut"
        />
      </template>
    </Menubar>
    <div class="card flex justify-content-center">
      <Sidebar v-model:visible="visible" class="w-full md:w-15rem lg:w-15rem">
        <div class="card flex justify-content-center">
          <Menu
						:model="items" />
        </div>
      </Sidebar>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import router from "../router/index";

export default {
  data() {
    return {
      visible: false,
      currentUser: null,
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
  methods: {
    getCurrentUser() {
      this.currentUser = JSON.parse(localStorage.getItem("user"));
    },
    signOut(event) {
      this.$confirm.require({
        target: event.currentTarget,
        group: "demo",
        message: "Вы точно хотите выйти?",
        icon: "pi pi-question-circle",
        acceptIcon: "pi pi-check",
        rejectIcon: "pi pi-times",
        accept: () => {
          router.push("/login");
          localStorage.removeItem("user");
        },
        reject: () => {
          this.$toast.add({
            severity: "info",
            group: "br",
            summary: "Отмена выхода",
            life: 3000,
          });
        },
      });
    },
  },
  created() {
    this.getCurrentUser();
  },
};
</script>