import {
  createApp 
} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Varlet from '@varlet/ui'
import '@varlet/ui/es/style'
import jQuery from 'jquery'
import axios from 'axios'
import VueAxios from 'vue-axios'

const $ = jQuery
window.$ = $

createApp(App)
  .use(store)
  .use(router)
  .use(Varlet)
  .use(VueAxios, axios)
  .mount('#app')
