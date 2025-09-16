//import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
//import './style.css'
//import bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css'

import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import './firebase/init';

const app = createApp(App);
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
app.use(router)
app.mount('#app')

//createApp(App).mount('#app')
