export { XButton } from './Button'
export { XCard } from './Card'
export { XList } from './List'
export { XInput } from './Input'
export { XModal } from './Modal'
export { XTabs, type TabItem } from './Tabs'
export { XBadge } from './Badge'
export { XAvatar } from './Avatar'
export { XGrid } from './Grid'
export { XSwitch } from './Switch'
export { XTag } from './Tag'
export { XLoading } from './Loading'
export { XDivider } from './Divider'
export { XNavBar } from './NavBar'
export { XProgress } from './Progress'
export { XPopup } from './Popup'
export { XTable, type TableColumn } from './Table'
export { XForm, type FormField } from './Form'
export { XSelect, type SelectOption } from './Select'
export { XPicker, type PickerOption } from './Picker'
export { XDatePicker, type DatePickerType, type DateValueType } from './DatePicker'
export { XRow } from './Row'
export { XCol } from './Col'
export { XVirtualList, type VirtualItem } from './VirtualList'
export { XImage } from './Image'
export { XSwiper, XSwiperItem } from './Swiper'
export { XBanner } from './Banner'
export { XTabBar, type TabBarItem } from './TabBar'
export { default as XErrorBoundary } from './ErrorBoundary/ErrorBoundary.vue'

import type { App, Plugin } from 'vue'
import { XButton } from './Button'
import { XCard } from './Card'
import { XList } from './List'
import { XInput } from './Input'
import { XModal } from './Modal'
import { XTabs } from './Tabs'
import { XBadge } from './Badge'
import { XAvatar } from './Avatar'
import { XGrid } from './Grid'
import { XSwitch } from './Switch'
import { XTag } from './Tag'
import { XLoading } from './Loading'
import { XDivider } from './Divider'
import { XNavBar } from './NavBar'
import { XProgress } from './Progress'
import { XPopup } from './Popup'
import { XTable } from './Table'
import { XForm } from './Form'
import { XSelect } from './Select'
import { XPicker } from './Picker'
import { XDatePicker } from './DatePicker'
import { XRow } from './Row'
import { XCol } from './Col'
import { XVirtualList } from './VirtualList'
import { XImage } from './Image'
import { XSwiper, XSwiperItem } from './Swiper'
import { XBanner } from './Banner'
import { XTabBar } from './TabBar'
import XErrorBoundary from './ErrorBoundary/ErrorBoundary.vue'

export function install(app: App) {
  app.component('XButton', XButton)
  app.component('XCard', XCard)
  app.component('XList', XList)
  app.component('XInput', XInput)
  app.component('XModal', XModal)
  app.component('XTabs', XTabs)
  app.component('XBadge', XBadge)
  app.component('XAvatar', XAvatar)
  app.component('XGrid', XGrid)
  app.component('XSwitch', XSwitch)
  app.component('XTag', XTag)
  app.component('XLoading', XLoading)
  app.component('XDivider', XDivider)
  app.component('XNavBar', XNavBar)
  app.component('XProgress', XProgress)
  app.component('XPopup', XPopup)
  app.component('XTable', XTable)
  app.component('XForm', XForm)
  app.component('XSelect', XSelect)
  app.component('XPicker', XPicker)
  app.component('XDatePicker', XDatePicker)
  app.component('XRow', XRow)
  app.component('XCol', XCol)
  app.component('XVirtualList', XVirtualList)
  app.component('XImage', XImage)
  app.component('XSwiper', XSwiper)
  app.component('XSwiperItem', XSwiperItem)
  app.component('XBanner', XBanner)
  app.component('XTabBar', XTabBar)
  app.component('XErrorBoundary', XErrorBoundary)
}

export const XuiComponents: Plugin = { install }
