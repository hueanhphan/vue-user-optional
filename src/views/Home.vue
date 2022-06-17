<template>
  <h1 class="text-color-custom text-center mt-5">Home</h1>
</template>
<script >
import Accordion from "primevue/accordion";

export default {
  name: "Home",
  components: {
    Accordion,
  },
  props: {
    theme: {
      type: String,
      required: false,
      default: "light",
    },
  },
  setup(props, context) {
    console.log(props.theme);
    console.log(context);

    return {};
  },
};
</script>

<style scoped>
.text-color-custom {
  color: #7c8ee3;
}
</style>