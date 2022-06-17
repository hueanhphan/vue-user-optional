<template>
  <!-- <h1 class="text-center text-color-custom mt-4 mb-5">Dashboard</h1> -->
  <div class="flex justify-content-center mt-5">
    <h2 class="text-3xl mr-3">Hello {{ username }}</h2>
    <Button label="Log out" @click="handleLogout" />
  </div>
  <h1 class="text-center mt-5 mb-5 text-color-custom">User Management</h1>
  <TableUsers />
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TableUsers from "../components/TableUsers.vue";
export default {
  name: "DashBoard",
  components: { TableUsers },
  data() {
    return {
      username: "",
    };
  },
  computed: {
    ...mapGetters(["listUser"]),
  },
  mounted() {
    // this.$toast.add({
    //   severity: "success",
    //   summary: "Success Message",
    //   detail: "Message Content",
    //   life: 3000,
    // });
    this.username = localStorage.getItem("user");
  },
  methods: {
    ...mapActions(["fetchUsers"]),
    handleLogout() {
      localStorage.clear();
      this.$router.push("/sign-in");
    },
  },
  created() {
    this.fetchUsers();
  },
};
</script>

<style scope>
.text-color-custom {
  color: #7c8ee3;
}
</style>