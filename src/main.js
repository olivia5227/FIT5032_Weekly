//import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
//import './style.css'
//import bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css'

import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyB6SYteYdwQJwyp_Db_7DrN2nbikYO3xlw",
    authDomain: "week7-yuhan-3f228.firebaseapp.com",
    projectId: "week7-yuhan-3f228",
    storageBucket: "week7-yuhan-3f228.appspot.com",
    messagingSenderId: "885380976442",
    appId: "1:885380976442:web:49dbc92b6654ea09844a03"
  };

  initializeApp(firebaseConfig);

const app = createApp(App);
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
app.use(router)
app.mount('#app')

//createApp(App).mount('#app')
