import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import {initMock} from '@/mock'
// import Vconsole from 'vconsole'

// const vconsole = new Vconsole()
// if(process.env.NODE_ENV !== 'production') {
//   initMock()
// }

const app = createApp(App)
app.use(router)

app.mount('#app')
