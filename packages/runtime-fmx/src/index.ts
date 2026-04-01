import { View, Text, Image, ScrollView, Button, Input } from '@xui/runtime-web'
import { getFmxBridge, initFmxEnvironment } from './bridge'

export { View, Text, Image, ScrollView, Button, Input }
export { getFmxBridge, initFmxEnvironment, FmxWebViewBridge } from './bridge'
export type { FmxMessage, FmxBridge } from './bridge'

import type { App } from 'vue'

export function install(app: App) {
  initFmxEnvironment()
  app.component('View', View)
  app.component('Text', Text)
  app.component('Image', Image)
  app.component('ScrollView', ScrollView)
  app.component('Button', Button)
  app.component('Input', Input)
}
