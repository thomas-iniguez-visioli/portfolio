import './main.css'

import { createApp,Vue } from 'vue'
import { createPinia } from 'pinia'
import VueLogger from 'vuejs-logger';
const isProduction = process.env.NODE_ENV === 'production';
 
const options = {
    isEnabled: true,
    logLevel : isProduction ? 'error' : 'debug',
    stringifyArguments : false,
    showLogLevel : true,
    showMethodName : true,
    separator: '|',
    showConsoleColors: true
};
 
Vue.use(VueLogger, options);
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
