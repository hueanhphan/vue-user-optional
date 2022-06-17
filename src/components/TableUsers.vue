<template>
  <div class="data-table">
    <div class="mb-3 p-fluid">
      <span class="p-input-icon-left">
        <i class="pi pi-search" />
        <InputText
          placeholder="Keyword Search"
          v-model="filters1['username'].value"
        />
      </span>
    </div>
    <Toast />
    <DataTable
      class="p-datatable-sm"
      :value="listUser"
      stripedRows
      responsiveLayout="scroll"
      :paginator="true"
      :rows="10"
      showGridlines
      filterDisplay="menu"
      v-model:filters="filters1"
    >
      <Column field="id" header="STT" :sortable="true"></Column>
      <Column field="username" header="Username" :sortable="true"></Column>
      <Column field="password" header="Password"></Column>
      <Column field="email" header="Email"></Column>
      <Column :exportable="false" style="min-width: 8rem">
        <template #body="slotProps">
          <Button
            icon="pi pi-pencil"
            class="p-button-rounded p-button-success mr-2"
            @click="editUser(slotProps.data)"
          />
          <Button
            icon="pi pi-trash"
            class="p-button-rounded p-button-warning"
            @click="confirmDeleteUser(slotProps.data)"
          />
        </template>
      </Column>
    </DataTable>
  </div>
  <Dialog
    v-model:visible="productDialog"
    :style="{ width: '450px' }"
    header="Edit User"
    :modal="true"
    class="p-fluid"
  >
    <div class="field">
      <label for="name">Username</label>
      <InputText
        id="name"
        v-model.trim="user.username"
        required="true"
        autofocus
        :class="{ 'p-invalid': submitted && !user.username }"
      />
      <small class="p-error" v-if="submitted && !user.username"
        >Name is required.</small
      >
    </div>
    <div class="field">
      <label for="name">Password</label>
      <InputText
        id="name"
        v-model.trim="user.password"
        required="true"
        autofocus
        :class="{ 'p-invalid': submitted && !user.password }"
      />
      <small class="p-error" v-if="submitted && !user.password"
        >Name is required.</small
      >
    </div>
    <div class="field">
      <label for="name">Email</label>
      <InputText
        id="name"
        v-model.trim="user.email"
        required="true"
        autofocus
        :class="{ 'p-invalid': submitted && !user.email }"
      />
      <small class="p-error" v-if="submitted && !user.email"
        >Name is required.</small
      >
    </div>

    <template #footer>
      <Button
        label="Cancel"
        icon="pi pi-times"
        class="p-button-text"
        @click="hideDialog"
      />
      <Button
        label="Save"
        icon="pi pi-check"
        class="p-button-text"
        @click="saveUser"
      />
    </template>
  </Dialog>
  <Dialog
    v-model:visible="deleteProductDialog"
    :style="{ width: '450px' }"
    header="Confirm"
    :modal="true"
  >
    <div class="confirmation-content">
      <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
      <span v-if="user"
        >Are you sure you want to delete <b>{{ user.username }}</b
        >?</span
      >
    </div>
    <template #footer>
      <Button
        label="No"
        icon="pi pi-times"
        class="p-button-text"
        @click="deleteProductDialog = false"
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        class="p-button-text"
        @click="handleDeleteUser"
      />
    </template>
  </Dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup";
import Row from "primevue/row";
import { FilterMatchMode } from "primevue/api";
export default {
  name: "TableUsers",
  components: { DataTable, Column, ColumnGroup, Row },
  data() {
    return {
      filters1: {
        username: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
      productDialog: false,
      user: {},
      submitted: false,
      deleteProductDialog: false,
    };
  },
  methods: {
    ...mapActions(["fetchUsers", "deleteUser", "updateUser"]),
    confirmDeleteUser(user) {
      this.user = user;

      this.deleteProductDialog = true;
    },
    handleDeleteUser() {
      console.log("delete");
      this.deleteUser(this.user.id);

      this.$toast.add({
        severity: "success",
        summary: "Successful",
        detail: "User Deleted",
        life: 3000,
      });
      this.deleteProductDialog = false;
      this.product = {};
    },
    editUser(user) {
      this.user = { ...user };
      this.productDialog = true;
    },
    hideDialog() {
      this.productDialog = false;
      this.submitted = false;
    },
    saveUser() {
      this.submitted = true;
      if (
        this.user.username.trim() &&
        this.user.password.trim() &&
        this.user.email.trim()
      ) {
        this.updateUser(this.user);
        this.$toast.add({
          severity: "success",
          summary: "Success Message",
          detail: "Save success",
          life: 3000,
        });
        this.productDialog = false;
        this.user = {};
      }
    },
  },
  created() {
    this.fetchUsers();
  },
  computed: {
    ...mapGetters(["listUser"]),
  },
};
</script>

<style scope>
.data-table {
  width: 80%;
  margin: 0 auto;
}
</style>