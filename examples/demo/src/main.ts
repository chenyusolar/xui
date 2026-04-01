import { createApp } from 'vue'
import App from './App.vue'
import { XuiComponents } from '@xui/components'
import '@xui/components/style.css'

const app = createApp(App)
app.use(XuiComponents)
app.mount('#app')
