import { createApp } from "vue"
import Cookies from 'js-cookie'
import router from "./router"
import App from "./App.vue"
import store from './store'
import "normalize.css"
import "./style.css"
import '@fortawesome/fontawesome-free/css/all.css';
import directive from './directive' // directive

import ElementPlus from 'element-plus'
import locale from 'element-plus/lib/locale/lang/zh-cn' // 中文语言
import 'element-plus/dist/index.css'

// svg图标
import 'virtual:svg-icons-register'
import SvgIcon from '@/components/SvgIcon/index.vue'
import elementIcons from '@/components/SvgIcon/svgicon'


let app = createApp(App)

app.use(router)
app.use(store)
app.use(elementIcons)
app.component('svg-icon', SvgIcon)

directive(app)

// 使用element-plus 并且设置全局的大小
app.use(ElementPlus, {
    locale: locale,
    // 支持 large、default、small
    size: Cookies.get('size') || 'default'
})

app.mount('#app')