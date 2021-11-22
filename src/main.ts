import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store, key } from './store'
import mitt from 'mitt'
import { VueMasonryPlugin } from 'vue-masonry/src/masonry-vue3.plugin'
import './style.scss'

const emitter = mitt()
const app = createApp(App)
app.config.globalProperties.emitter = emitter
app.use(store, key).use(router).use(VueMasonryPlugin).mount('#app')
