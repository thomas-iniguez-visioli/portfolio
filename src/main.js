import './main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import logger from './logger'
const app = createApp(App)

app.use(createPinia()).use(logger)
app.use(router)

app.mount('#app')
