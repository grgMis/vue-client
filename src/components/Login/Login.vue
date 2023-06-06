<template>
  <div>
    <Toast position="top-right" group="tr" />
    <Dialog
      class="p-fluid"
      v-model:visible="visible"
      :position="position"
      modal
      header="Авторизация"
      :style="{ width: '300px' }"
    >
      <div class="field mt-3">
        <label class="font-bold">Логин</label>
        <InputText
          v-model="userLogin"
          :class="{ 'p-invalid': submitted && !userLogin }"
        />
        <small class="p-error" v-if="submitted && !userLogin">
          Заполните поле логина
        </small>
      </div>
      <div class="field mt-3">
        <label class="font-bold">Пароль</label>
        <Password
          v-model="userPassword"
          toggleMask
          :feedback="false"
          :class="{ 'p-invalid': submitted && !userPassword }"
        />
        <small class="p-error" v-if="submitted && !userPassword">
          Заполните поле пароля
        </small>
      </div>
      <template #footer>
        <Button label="Войти" @click="auth" autofocus />
      </template>
    </Dialog>
  </div>
</template>

<script>
import router from "../../router/index";
import UserService from "../../services/UserService";

export default {
  data() {
    return {
      submitted: false,
			user: false,
      position: "top",
      visible: true,
      currentUser: null,
      userLogin: null,
      userPassword: null,
    };
  },
  methods: {
    getCurrentUser: async function () {
      const data = await UserService.getByLogin(this.userLogin);
      this.currentUser = data;
    },
    validatoin: async function () {
      this.submitted = true;
      if (this.userLogin === null || this.userPassword === null) {
        this.$toast.add({
          severity: "info",
          summary: "Внимание",
          group: "tr",
          detail: "Заполните все поля",
          life: 3000,
        });
        return;
      } else {
        await this.getCurrentUser();
        console.log(this.currentUser);
        if (this.currentUser.length === 0) {
          this.$toast.add({
            severity: "error",
            summary: "Ошибка авторизации",
            group: "tr",
            detail: "Пользователь не найден",
            life: 3000,
          });
        } else {
          this.$toast.add({
            severity: "success",
            summary: "Пользователь найден",
            group: "tr",
            life: 3000,
          });
					this.user = true;
        }
      }
    },
    checkUserData() {
			if (this.user === false) {
				return;
			}
      if (this.userPassword !== this.currentUser.user_password) {
        this.$toast.add({
          severity: "error",
          summary: "Ошибка авторизации",
          group: "tr",
          detail: "Неправильный пароль",
          life: 3000,
        });
        return;
      }
      if (this.currentUser.employee.employeePost.employee_post_id === 8) {
        this.$toast.add({
          severity: "success",
          summary: "Успешная авторизация",
          group: "tr",
          detail: `Администратор ${this.currentUser.employee.employee_last_name} ${this.currentUser.employee.employee_first_name[0]}. ${this.currentUser.employee.employee_father_name[0]}.`,
          life: 3000,
        });
        localStorage.setItem("user", JSON.stringify(this.currentUser));
        setTimeout(this.showAdminPage, 3000);
      }
      if (this.currentUser.employee.employeePost.employee_post_id === 1) {
        this.$toast.add({
          severity: "success",
          summary: "Успешная авторизация",
          group: "tr",
          detail: `Оператор ${this.currentUser.employee.employee_last_name} ${this.currentUser.employee.employee_first_name[0]}. ${this.currentUser.employee.employee_father_name[0]}.`,
          life: 3000,
        });
        localStorage.setItem("user", JSON.stringify(this.currentUser));
        setTimeout(this.showOperatorPage, 3000);
      }
      if (this.currentUser.employee.employeePost.employee_post_id === 2) {
        this.$toast.add({
          severity: "success",
          summary: "Успешная авторизация",
          group: "tr",
          detail: `Диспетчер ${this.currentUser.employee.employee_last_name} ${this.currentUser.employee.employee_first_name[0]}. ${this.currentUser.employee.employee_father_name[0]}.`,
          life: 3000,
        });
        localStorage.setItem("user", JSON.stringify(this.currentUser));
        setTimeout(this.showDispatcherPage, 3000);
      }
    },
    auth: async function () {
      await this.validatoin();
      this.checkUserData();
    },
    showAdminPage() {
      router.push("/admin");
    },
		showOperatorPage() {
      router.push("/operator");
    },
    showDispatcherPage() {
      router.push("/dispatcher");
    },
  },
};
</script>