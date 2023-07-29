import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import { checkInRealMobile } from './utils'

import i18n from './language'

// 按需引入 mock和vconsole
if(process.env.NODE_ENV !== 'production') {
  import('./mock')
    .then(module => {
      module.initMock()
    }).catch(err => {
      console.log('mock-error', err);
    })
  import('vconsole')
    .then(log => {
      checkInRealMobile() && new log.default()
    })
    .catch(err => {
      console.log('log-err', err);
    })
}


const app = createApp(App)
app.use(router)
app.use(i18n)

app.mount('#app')

const unmounApp = app.unmount 

app.unmount = () => {
  i18n.dispose()
  unmounApp()
}
