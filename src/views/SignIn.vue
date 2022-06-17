<template>
  <div class="bg-login-page flex justify-content-center">
    <Toast />
    <div class="col-6 justify-content-center mt-8">
      <h1 class="text-center mb-4 text-color-custom">Sign in</h1>
      <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
        <div class="input-field">
          <InputText
            id="name"
            class="border-round-sm p-inputtext-lg"
            v-model="v$.name.$model"
            :class="{
              'p-invalid': v$.name.$invalid && submitted,
            }"
            placeholder="Username"
          />

          <small
            v-if="(v$.name.$invalid && submitted) || v$.name.$pending.$response"
            class="p-error text-sm font-italic font-bold"
            >{{
              v$.name.required.$message.replace("Value", "* Username")
            }}</small
          >
        </div>
        <div class="input-field">
          <Password
            id="password"
            class="p-inputtext-lg"
            v-model="v$.password.$model"
            :class="{ 'p-invalid': v$.password.$invalid && submitted }"
            placeholder="Password"
            toggleMask
            :feedback="false"
          />
          <small
            v-if="
              (v$.password.$invalid && submitted) ||
              v$.password.$pending.$response
            "
            class="p-error text-sm font-italic font-bold"
            >{{
              v$.password.required.$message.replace("Value", "* Password")
            }}</small
          >
        </div>
        <div class="field"></div>
        <div class="btn">
          <Button
            type="submit"
            class="btn-submit text-center p-button-rounded w-full mt-3"
            label="SUBMIT"
          />
        </div>
        <div class="footer mt-7 text-center text-lg">
          <p class="mb-2">Don't have an account yet?</p>
          <router-link
            to="/sign-up"
            class="text-hover no-underline font-bold font-italic"
          >
            Create account
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "SignIn",
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      name: "",
      password: "",
      submitted: false,
    };
  },
  computed: { ...mapGetters(["listUser"]) },

  validations() {
    return {
      name: {
        required,
      },

      password: {
        required,
      },
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    ...mapActions(["fetchUsers"]),
    handleSubmit(isFormValid) {
      this.submitted = true;

      if (!isFormValid) {
        return;
      }
      const res = this.userLogin(this.name, this.password);

      if (res) {
        localStorage.setItem("user", this.name);
        this.$router.push("/dashboard");
      } else {
        this.$toast.add({
          severity: "error",
          summary: "Error ",
          detail: "Username or password incorrect",
          life: 3000,
        });
      }
    },
    userLogin(username, password) {
      const res = this.listUser.find(
        (user) => user.username === username && user.password === password
      );
      return res;
    },

    resetForm() {
      this.name = "";
      this.email = "";
      this.password = "";
      this.submitted = false;
    },
  },
};
</script>

<style scoped >
.text-color-custom {
  color: #7c8ee3;
}
input {
  width: 100%;
  background: rgba(255, 255, 255, 0.08) !important;
}

.input-field {
  margin: 15px 0;
}

.btn-submit {
  background: rgba(214, 204, 225, 1) !important;
  padding: 8px 0;
}
.btn-submit span {
  font-weight: bold;
}
.btn-submit:hover span {
  color: #7c8ee3;
}
.text-hover {
  color: #7c8ee3;
}

.text-hover:hover {
  color: #1d39c5;
}
</style>