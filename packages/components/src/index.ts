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
export { default as XErrorBoundary } from './ErrorBoundary/ErrorBoundary.vue'

import type { App, Plugin } from 'vue'

const components: { name: string; comp: () => Promise<any> }[] = [
  { name: 'XButton', comp: () => import('./Button/Button.vue') },
  { name: 'XCard', comp: () => import('./Card/Card.vue') },
  { name: 'XList', comp: () => import('./List/List.vue') },
  { name: 'XInput', comp: () => import('./Input/Input.vue') },
  { name: 'XModal', comp: () => import('./Modal/Modal.vue') },
  { name: 'XTabs', comp: () => import('./Tabs/Tabs.vue') },
  { name: 'XBadge', comp: () => import('./Badge/Badge.vue') },
  { name: 'XAvatar', comp: () => import('./Avatar/Avatar.vue') },
  { name: 'XGrid', comp: () => import('./Grid/Grid.vue') },
  { name: 'XSwitch', comp: () => import('./Switch/Switch.vue') },
  { name: 'XTag', comp: () => import('./Tag/Tag.vue') },
  { name: 'XLoading', comp: () => import('./Loading/Loading.vue') },
  { name: 'XDivider', comp: () => import('./Divider/Divider.vue') },
  { name: 'XNavBar', comp: () => import('./NavBar/NavBar.vue') },
  { name: 'XProgress', comp: () => import('./Progress/Progress.vue') },
  { name: 'XPopup', comp: () => import('./Popup/Popup.vue') },
  { name: 'XTable', comp: () => import('./Table/Table.vue') },
  { name: 'XForm', comp: () => import('./Form/Form.vue') },
  { name: 'XSelect', comp: () => import('./Select/Select.vue') },
  { name: 'XPicker', comp: () => import('./Picker/Picker.vue') },
  { name: 'XDatePicker', comp: () => import('./DatePicker/DatePicker.vue') },
  { name: 'XRow', comp: () => import('./Row/Row.vue') },
  { name: 'XCol', comp: () => import('./Col/Col.vue') },
  { name: 'XVirtualList', comp: () => import('./VirtualList/VirtualList.vue') },
  { name: 'XImage', comp: () => import('./Image/Image.vue') },
  { name: 'XErrorBoundary', comp: () => import('./ErrorBoundary/ErrorBoundary.vue') },
]

export async function install(app: App) {
  for (const { name, comp } of components) {
    const module = await comp()
    app.component(name, module.default)
  }
}

export const XuiComponents: Plugin = { install: install as any }
