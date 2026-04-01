export type { PlatformAPI, PlatformName, RequestOptions, StorageAPI, NavigationAPI } from './platform'
export { platform, getPlatform, setPlatform } from './platform-impl'
export {
  ref, computed, watch, watchEffect, reactive, readonly,
  toRefs, toRef, nextTick, onMounted, onUnmounted, onBeforeMount,
  provide, inject
} from './reactive'
export type { Ref, ComputedRef, Reactive, WritableComputedRef } from './reactive'
export { setLocale, getLocale, t, addLocale, mergeMessages, getLocaleMessages, zhCN, enUS, jaJP, koKR } from './i18n'
export type { Locale, LocaleMessages, XuiLocale } from './i18n'
