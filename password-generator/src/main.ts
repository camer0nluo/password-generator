import './assets/main.css'

import { faCopy, faEye, faEyeSlash, faRotateRight } from '@fortawesome/free-solid-svg-icons'

import App from './App.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { library } from '@fortawesome/fontawesome-svg-core'
import router from './router'

library.add(faEye, faEyeSlash, faCopy, faRotateRight)

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(createPinia())
app.use(router)

app.mount('#app')
