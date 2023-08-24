import {
  createApp 
} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAxios from 'vue-axios'
import axios from 'axios'

// 導入 mock 資料
import './mock/index'

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