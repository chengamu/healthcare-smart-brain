import { createApp } from "vue"
import router from "./router"
import App from "./App.vue"
import "normalize.css"
import "./style.css"
import '@fortawesome/fontawesome-free/css/all.css';
import directive from './directive' // directive
let app = createApp(App)
// 绑定指令
directive(app)
app.use(router).mount("#app")
