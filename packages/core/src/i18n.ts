export type Locale = 'zh-CN' | 'en-US' | 'ja-JP' | 'ko-KR'

export interface LocaleMessages {
  [key: string]: string
}

export interface XuiLocale {
  name: Locale
  messages: LocaleMessages
}

const zhCN: XuiLocale = {
  name: 'zh-CN',
  messages: {
    'xui.button.loading': '加载中...',
    'xui.input.placeholder': '请输入',
    'xui.select.placeholder': '请选择',
    'xui.select.empty': '暂无选项',
    'xui.datePicker.title': '选择日期',
    'xui.datePicker.placeholder': '请选择日期',
    'xui.picker.cancel': '取消',
    'xui.picker.confirm': '确定',
    'xui.modal.cancel': '取消',
    'xui.modal.confirm': '确定',
    'xui.table.empty': '暂无数据',
    'xui.form.required': '不能为空',
    'xui.form.validateFail': '验证失败',
    'xui.loading.text': '加载中...',
  },
}

const enUS: XuiLocale = {
  name: 'en-US',
  messages: {
    'xui.button.loading': 'Loading...',
    'xui.input.placeholder': 'Enter text...',
    'xui.select.placeholder': 'Please select',
    'xui.select.empty': 'No options',
    'xui.datePicker.title': 'Select Date',
    'xui.datePicker.placeholder': 'Select date',
    'xui.picker.cancel': 'Cancel',
    'xui.picker.confirm': 'Confirm',
    'xui.modal.cancel': 'Cancel',
    'xui.modal.confirm': 'OK',
    'xui.table.empty': 'No data',
    'xui.form.required': 'is required',
    'xui.form.validateFail': 'Validation failed',
    'xui.loading.text': 'Loading...',
  },
}

const jaJP: XuiLocale = {
  name: 'ja-JP',
  messages: {
    'xui.button.loading': '読み込み中...',
    'xui.input.placeholder': '入力してください',
    'xui.select.placeholder': '選択してください',
    'xui.select.empty': 'オプションなし',
    'xui.datePicker.title': '日付を選択',
    'xui.datePicker.placeholder': '日付を選択',
    'xui.picker.cancel': 'キャンセル',
    'xui.picker.confirm': '確認',
    'xui.modal.cancel': 'キャンセル',
    'xui.modal.confirm': 'OK',
    'xui.table.empty': 'データなし',
    'xui.form.required': 'は必須です',
    'xui.form.validateFail': '検証に失敗しました',
    'xui.loading.text': '読み込み中...',
  },
}

const koKR: XuiLocale = {
  name: 'ko-KR',
  messages: {
    'xui.button.loading': '로딩 중...',
    'xui.input.placeholder': '입력하세요',
    'xui.select.placeholder': '선택하세요',
    'xui.select.empty': '옵션 없음',
    'xui.datePicker.title': '날짜 선택',
    'xui.datePicker.placeholder': '날짜 선택',
    'xui.picker.cancel': '취소',
    'xui.picker.confirm': '확인',
    'xui.modal.cancel': '취소',
    'xui.modal.confirm': '확인',
    'xui.table.empty': '데이터 없음',
    'xui.form.required': '필수 항목입니다',
    'xui.form.validateFail': '검증 실패',
    'xui.loading.text': '로딩 중...',
  },
}

const locales: Record<Locale, XuiLocale> = {
  'zh-CN': zhCN,
  'en-US': enUS,
  'ja-JP': jaJP,
  'ko-KR': koKR,
}

let currentLocale: Locale = 'zh-CN'
let customMessages: LocaleMessages = {}

export function setLocale(locale: Locale) {
  currentLocale = locale
}

export function getLocale(): Locale {
  return currentLocale
}

export function t(key: string): string {
  return customMessages[key] ?? locales[currentLocale]?.messages[key] ?? key
}

export function addLocale(locale: XuiLocale) {
  locales[locale.name] = locale
}

export function mergeMessages(messages: LocaleMessages) {
  customMessages = { ...customMessages, ...messages }
}

export function getLocaleMessages(locale?: Locale): LocaleMessages {
  const target = locale || currentLocale
  return { ...locales[target]?.messages, ...customMessages }
}

export { zhCN, enUS, jaJP, koKR }
