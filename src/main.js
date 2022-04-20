import { createApp } from 'vue/dist/vue.esm-bundler.js'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

import '@/permission'

createApp(App).use(store).use(store).use(router).use(Antd).mount('#app')
