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
        <label class="font-bold text-3xl ml-3 text-indigo-50">Панель оператора</label>
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
          outlined
          @click="signOut"
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
              label: "Текущее оборудование",
              to: "/operator/current-equipment",
            },
						{
              label: "Список",
              to: "/operator/equipment",
            },
						{
              label: "Модели",
              to: "/operator/equipment-model",
            },
            {
              label: "Отчет",
              to: "/operator/current-equipment-report",
            },
          ],
        },
				{
          label: "Объекты",
          items: [
            {
              label: "Список",
              to: "/operator/well",
            },
          ],
        },
				{
          label: "Мероприятия",
          items: [
            {
              label: "Список",
              to: "/operator/action",
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