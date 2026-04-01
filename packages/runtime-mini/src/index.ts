export { transformSFC, transformCss, transformHtml } from '@xui/compiler'
export {
  processVueFile,
  generateAppJs,
  generateAppJson,
  generatePageJs,
  generatePageJson,
  generateProjectConfig,
  transformTemplateToWxml,
  transformStylesToWxss,
} from './compiler'
export type {
  MiniAppConfig,
  MiniPageConfig,
} from './compiler'
