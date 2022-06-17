import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import storeConfigs from "./store/index.store";
import { createStore } from "vuex";
import router from "./router";

import "primevue/resources/themes/saga-blue/theme.css"; //theme
import "primevue/resources/primevue.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";

import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Menubar from "primevue/menubar";
import TabMenu from "primevue/tabmenu";
import ToastService from "primevue/toastservice";
import Toast from "primevue/toast";
import Dialog from "primevue/dialog";

const app = createApp(App);
const store = createStore(storeConfigs);

app.component("Button", Button);
app.component("InputText", InputText);
app.component("Password", Password);
app.component("Menubar", Menubar);
app.component("TabMenu", TabMenu);
app.component("Toast", Toast);
app.component("Dialog", Dialog);

app.use(router);
app.use(PrimeVue);
app.use(store);
app.use(ToastService);
app.mount("#app");
