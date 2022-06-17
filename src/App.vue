<template>
  <div>
    <Menubar :model="items" class="border-none" />

    <router-view></router-view>
  </div>
</template>

<script>
import Home from "./views/Home.vue";
export default {
  components: { Home },
  name: "App",

  data() {
    return {
      items: [
        { label: "Home", icon: "pi pi-fw pi-home", to: "/" },
        {
          label: "Sign In",
          icon: "pi pi-user",
          to: "/sign-in",
        },
        { label: "Sign Up", icon: "pi pi-fw pi-pencil", to: "/sign-up" },
      ],
    };
  },
};
</script>

<style>
* {
  margin: 0;
}
body {
  background-image: url("./assets/images/bg1.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  margin: 0;
  min-height: 100vh;
}
</style>