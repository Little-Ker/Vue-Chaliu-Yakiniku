import {
  createApp 
} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

// fontello
import '../src/assets/fontello/css/fontello.css'

// scss
import '@/assets/scss/_all.scss'

// swiper
import 'swiper/css'
import 'swiper/css/effect-fade'

const $ = require('jquery')
window.$ = $

createApp(App).use(store).use(router).use(VueAxios, axios).mount('#app')