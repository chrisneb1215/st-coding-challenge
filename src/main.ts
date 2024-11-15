import { createApp } from 'vue'

import App from '@/App.vue'
import Icon from '@/components/Icon.vue'
import '@jsonforms/vue-vanilla/vanilla.css'
import '@progress/kendo-theme-default/dist/all.css'
import '@/style.scss'

const app = createApp(App)

/** Global Components */
app.component('Icon', Icon)

app.mount('#app')
