<template>
  <div class="flex justify-content-center">
    <div class="col-6 justify-content-center mt-8">
      <h1 class="text-center mb-5 text-color-custom">Sign Up</h1>
      <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
        <div class="field">
          <InputText
            id="name"
            class="border-round-sm p-inputtext-lg"
            v-model="v$.name.$model"
            :class="{
              'p-invalid': v$.name.$invalid && submitted,
            }"
            aria-describedby="name-error"
            placeholder="Username"
          />
          <span v-if="v$.name.$error && submitted">
            <span
              id="name-error"
              v-for="(error, index) of v$.name.$errors"
              :key="index"
            >
              <small class="p-error text-sm font-italic font-bold">{{
                error.$message
              }}</small>
            </span>
          </span>
          <small
            v-else-if="
              (v$.name.$invalid && submitted) || v$.name.$pending.$response
            "
            class="p-error text-sm font-italic font-bold"
            >{{
              v$.name.required.$message.replace("Value", "* Username")
            }}</small
          >
        </div>
        <div class="field">
          <div class="p-input-icon-right">
            <i class="pi pi-envelope" />
            <InputText
              id="email"
              class="border-round-sm p-inputtext-lg"
              v-model="v$.email.$model"
              :class="{ 'p-invalid': v$.email.$invalid && submitted }"
              aria-describedby="email-error"
              placeholder="Email"
            />
          </div>
          <span v-if="v$.email.$error && submitted">
            <span
              id="email-error"
              v-for="(error, index) of v$.email.$errors"
              :key="index"
            >
              <small class="p-error text-sm font-italic font-bold">{{
                error.$message
              }}</small>
            </span>
          </span>
          <small
            v-else-if="
              (v$.email.$invalid && submitted) || v$.email.$pending.$response
            "
            class="p-error font-italic text-sm font-bold"
            >{{ v$.email.required.$message.replace("Value", "* Email") }}</small
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
            aria-describedby="password-error"
            :feedback="false"
          />
          <span v-if="v$.password.$error && submitted">
            <span
              id="password-error"
              v-for="(error, index) of v$.password.$errors"
              :key="index"
            >
              <small class="p-error text-sm font-italic font-bold">{{
                error.$message
              }}</small>
            </span>
          </span>
          <small
            v-else-if="
              (v$.password.$invalid && submitted) ||
              v$.password.$pending.$response
            "
            class="p-error text-sm font-italic font-bold"
            >{{
              v$.password.required.$message.replace("Value", "* Password")
            }}</small
          >
        </div>
        <Button
          type="submit"
          class="btn-submit text-center p-button-rounded mt-5"
          label="SUBMIT"
        />
      </form>
      <Toast />
    </div>
  </div>
</template>

<script>
import { helpers, maxLength, required, email } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { mapActions, mapGetters } from "vuex";
const alpha = helpers.regex(
  /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/
);
export default {
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      name: "",
      email: "",
      password: "",
      submitted: false,
    };
  },
  computed: { ...mapGetters(["listUser"]) },
  validations() {
    return {
      name: {
        required,
        maxLength: helpers.withMessage(
          "* Username limit 10 characters",
          maxLength(10)
        ),
      },
      email: {
        required,
        email,
      },

      password: {
        required,
        alpha: helpers.withMessage(
          "* Password minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character",
          alpha
        ),
      },
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    ...mapActions(["addUser", "fetchUsers"]),
    handleSubmit(isFormValid) {
      this.submitted = true;

      if (!isFormValid) {
        return;
      }
      const user = this.userSignUp(this.name);

      if (user) {
        this.$toast.add({
          severity: "error",
          summary: "Error Message",
          detail: `Username  available`,
          life: 3000,
        });
        return;
      }
      const newUser = {
        username: this.name,
        password: this.password,
        email: this.email,
      };

      this.addUser(newUser);
      this.showSuccess();
      this.$router.push("/sign-in");
    },
    userSignUp(username) {
      const res = this.listUser.find((user) => user.username === username);

      return res;
    },
    resetForm() {
      this.name = "";
      this.email = "";
      this.password = "";
      this.submitted = false;
    },
    showSuccess() {
      this.$toast.add({
        severity: "success",
        summary: "Success Message",
        detail: "Message Content",
        life: 3000,
      });
    },
  },
};
</script>

<style >
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
</style>
