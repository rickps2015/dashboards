import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import 'animate.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// Importando icones
import { 
    faUserSecret, 
    faMagnifyingGlass, 
    faStar, 
    faChevronRight, 
    faChevronLeft, 
    faHouse, 
    faMoon, 
    faSun, 
    faSpinner,
    faDownload,
} from '@fortawesome/free-solid-svg-icons'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Adicionando icones
library.add(
    faUserSecret, 
    faMagnifyingGlass, 
    faStar, 
    faChevronRight, 
    faChevronLeft, 
    faHouse, 
    faMoon, 
    faSun, 
    faSpinner,
    faDownload,
    )
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
