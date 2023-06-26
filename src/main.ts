import { createApp } from 'vue'
import ElementPlus from 'element-plus'
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'virtual:svg-icons-register'

import App from '@/App.vue'
import golbalComponents from "@/components";
import '@/styles/index.scss'
import router from '@/router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import store from './store'


const app = createApp(App)
app.use(ElementPlus, { locale: zhCn, })
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
//引入自定义插件对象
app.use(golbalComponents)
app.use(store)
app.use(router)
app.mount('#app')
// console.log(import.meta.env)
