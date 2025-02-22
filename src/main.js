import './main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import logger from './logger'
import * as test from './temp'
const app = createApp(App)
console.log(logger)
logger.install(app)
app.use(createPinia()).use(test)
app.use(router)

app.mount('#app')
