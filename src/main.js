import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from "primevue/config";

// App Theme
import 'primevue/resources/themes/md-light-indigo/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

// Add PrimeFlex
import 'primeflex/primeflex.css';

// PrimeVue Components
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Toolbar from "primevue/toolbar";
import InputText from "primevue/inputtext";
import InputNumber from 'primevue/inputnumber';
import Textarea from "primevue/textarea";
import Button from "primevue/button";
import Row from "primevue/row";
import Sidebar from "primevue/sidebar";
import Menu from "primevue/menu";
import Dialog from "primevue/dialog";
import Toast from "primevue/toast";
import Dropdown from "primevue/dropdown";
import Tag from "primevue/tag";
import Card from "primevue/card";
import SelectButton from 'primevue/selectbutton';
import InlineMessage from 'primevue/inlinemessage';
import ConfirmDialog from 'primevue/confirmdialog';
import Password from 'primevue/password';
import Divider from 'primevue/divider';
import Checkbox from 'primevue/checkbox';

// Router
import router from "./router/index.js";

// Importamos notificaciones
import ToastService from "primevue/toastservice";

import ConfirmationService from 'primevue/confirmationservice';


createApp(App)
    .use(router)
    .use(PrimeVue, { ripple: true })
    .use(ToastService)
    .use(ConfirmationService)
    .component('pv-data-table', DataTable)
    .component("pv-column", Column)
    .component('pv-toolbar', Toolbar)
    .component('pv-input-text', InputText)
    .component('pv-input-number', InputNumber)
    .component('pv-textarea', Textarea)
    .component('pv-button', Button)
    .component('pv-row', Row)
    .component('pv-sidebar', Sidebar)
    .component('pv-menu', Menu)
    .component('pv-dialog', Dialog)
    .component('pv-toast', Toast)
    .component('pv-dropdown', Dropdown)
    .component('pv-tag', Tag)
    .component('pv-card', Card)
    .component('pv-select-button', SelectButton)
    .component('pv-inline-message', InlineMessage)
    .component('pv-confirm-dialog', ConfirmDialog)
    .component('pv-password', Password)
    .component('pv-divider', Divider)
    .component('pv-checkbox', Checkbox)
    .mount('#app')
