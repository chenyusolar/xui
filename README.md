# XUI - 跨平台 UI 框架

> 一套 Vue3 代码，自动适配 Web / 小程序 / FMX WebView

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D18.0-green.svg)](https://nodejs.org)
[![Vue](https://img.shields.io/badge/vue-3.5-brightgreen.svg)](https://vuejs.org)
[![pnpm](https://img.shields.io/badge/pnpm-workspace-orange.svg)](https://pnpm.io)

---

## 为什么选择 XUI？

| 对比项 | uni-app | Taro | **XUI** |
|--------|---------|------|---------|
| 框架依赖 | 强绑定 | 需适配 | **零依赖，完全自研** |
| 代码可控 | 黑盒 | 部分可控 | **100% 源码可控** |
| FMX 支持 | ❌ | ❌ | ✅ 原生集成 |
| 小程序 | ✅ | ✅ | ✅ 编译输出 |
| Web | ✅ | ✅ | ✅ 原生渲染 |
| 扩展性 | 受限 | 受限 | **无限制，可加任意能力** |

---

## 项目架构

```
xui-project/
├── packages/
│   ├── core/                # 核心运行时
│   ├── compiler/            # 跨端编译器（Vite 插件）
│   ├── runtime-web/         # Web 渲染器
│   ├── runtime-mini/        # 小程序编译器
│   ├── runtime-fmx/         # FMX WebView 适配层
│   ├── components/          # UI 组件库（26 个组件）
│   ├── animations/          # 动画系统
│   ├── themes/              # 主题系统
│   └── cli/                 # 脚手架工具
├── examples/
│   ├── demo/                # 演示应用
│   └── fmx-app/             # FMX 集成示例
├── docs/
│   └── manual.md            # 详细使用手册
└── pnpm-workspace.yaml      # pnpm workspace
```

---

## 快速开始

### 环境要求

- Node.js >= 18.0
- pnpm >= 9.0

### 安装与构建

```bash
pnpm install
pnpm build
```

### 运行测试

```bash
pnpm test
```

### 在项目中使用

```bash
npm install @xui/core @xui/components @xui/animations @xui/themes
```

```ts
// main.ts
import { createApp } from 'vue'
import XUI from '@xui/components'
import '@xui/components/dist/components.css'

const app = createApp(App)
app.use(XUI)
app.mount('#app')
```

---

## 跨端开发

### 跨端标签

| 标签 | Web 输出 | 小程序输出 |
|------|----------|-----------|
| `<view>` | `<div>` | `<view>` |
| `<text>` | `<span>` | `<text>` |
| `<image>` | `<img>` | `<image>` |

### 跨端事件

| Vue 语法 | 小程序输出 |
|----------|-----------|
| `@click` | `bindtap` |
| `@input` | `bindinput` |
| `@change` | `bindchange` |
| `v-for` | `wx:for` |
| `v-if` | `wx:if` |

### 平台 API

```ts
import { platform } from '@xui/core'

// 网络请求
const data = await platform.request({ url: '/api/data', method: 'POST', data: { foo: 'bar' } })

// 本地存储
await platform.storage.set('user', { name: 'Alice' })
const user = await platform.storage.get('user')

// 页面导航
platform.navigation.push('/detail', { id: 123 })
platform.navigation.back()

// 平台判断
if (platform.isWeb) { /* Web 逻辑 */ }
if (platform.isMini) { /* 小程序逻辑 */ }
if (platform.isFmx) { /* FMX 逻辑 */ }
```

### 样式单位转换

```css
.x-btn { padding: 12px; font-size: 14px; }
```

| 平台 | 输出 |
|------|------|
| Web | `12px` / `14px` |
| 小程序 | `24rpx` / `28rpx` |
| FMX | `12px` / `14px` |

---

## 核心设计

### 编译流程

```
.vue SFC
   │
   ▼
┌─────────────┐
│  SFC 解析    │  分离 template / script / style
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ 标签转换     │  view→div / text→span / image→img
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ 事件绑定转换  │  @click→bindtap / v-for→wx:for / v-if→wx:if
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ 样式转换     │  px→rpx（小程序）
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ 脚本转换     │  导入路径替换 / 平台 API 注入
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ 目标平台输出 │  HTML / WXML / JS
└─────────────┘
```

### Vite 插件配置

```ts
// vite.config.ts
import { xuiCompiler } from '@xui/compiler'

export default defineConfig({
  plugins: [
    vue(),
    xuiCompiler({
      target: 'web',       // 'web' | 'mini' | 'fmx'
      unitRatio: 2,        // px→rpx 转换比例
    }),
  ],
})
```

---

## 组件库（26 个组件）

### 基础组件

| 组件 | 说明 |
|------|------|
| `XButton` | 按钮 - type/size/loading/disabled/block/icon |
| `XInput` | 输入框 - label/error/clearable/prefix/suffix |
| `XSwitch` | 开关 - checked/disabled/size |
| `XTag` | 标签 - type/size/closable/custom color |
| `XBadge` | 徽标 - count/dot/max/showZero |
| `XAvatar` | 头像 - src/name/icon/size/shape |
| `XDivider` | 分割线 - type/orientation/title |
| `XLoading` | 加载 - text/size/fullscreen |
| `XProgress` | 进度条 - percent/type/size/striped/animated |
| `XImage` | 图片 - lazy/mode/shape/skeleton |

### 布局组件

| 组件 | 说明 |
|------|------|
| `XCard` | 卡片 - title/bordered/hoverable/extra/footer |
| `XGrid` | 宫格 - columns/gap/clickable |
| `XList` | 列表 - dataSource/clickable/custom item |
| `XTable` | 表格 - columns/bordered/striped/custom cell |
| `XNavBar` | 导航栏 - fixed/showBack/bgColor |
| `XRow` / `XCol` | 栅格布局 - span/offset/gutter/响应式 |
| `XVirtualList` | 虚拟列表 - 大数据量滚动优化 |

### 反馈组件

| 组件 | 说明 |
|------|------|
| `XModal` | 对话框 - title/size/maskClosable/custom footer |
| `XPopup` | 弹出层 - position(5种)/size/closable |
| `XTabs` | 标签页 - line/card 类型 |
| `XErrorBoundary` | 错误边界 - error 捕获 + fallback + retry |

### 表单组件

| 组件 | 说明 |
|------|------|
| `XForm` | 表单 - fields/validation/labelPosition |
| `XSelect` | 下拉选择 - options/disabled/clearable |
| `XPicker` | 滚动选择器 - 多列选择 |
| `XDatePicker` | 日期选择 - date/datetime/year-month/time |

### 使用示例

```vue
<template>
  <XCard title="表单示例">
    <XInput v-model="form.name" label="姓名" />
    <XSelect v-model="form.gender" :options="genders" placeholder="请选择" />
    <XSwitch v-model="form.agreed" />
    <XDatePicker v-model="form.date" type="date" />
  </XCard>
  <XButton type="primary" @click="handleSubmit">提交</XButton>
</template>

<script setup>
const form = ref({ name: '', gender: '', agreed: false, date: null })
const genders = [
  { label: '男', value: 'male' },
  { label: '女', value: 'female' },
]
</script>
```

---

## 动画系统

### 组件用法

```vue
<XAnimation type="fade">
  <view v-if="visible">淡入淡出</view>
</XAnimation>

<XAnimation type="slide-up" :duration="500">
  <view>从下方滑入</view>
</XAnimation>
```

支持动画类型：`fade` / `slide-up` / `slide-down` / `slide-left` / `slide-right` / `zoom` / `scale` / `bounce` / `flip` / `rotate`

### Composable 用法

```ts
import { useAnimation, useStaggerAnimation } from '@xui/animations'

const { elementRef, fadeIn, fadeOut, slideIn, scaleIn, stop } = useAnimation()

// 列表交错动画
const { visibleItems, showAll, hideAll } = useStaggerAnimation(10, {
  staggerDelay: 50,
  duration: 300,
})
```

---

## 主题系统

```ts
import { useTheme } from '@xui/themes'

const { isDark, setMode, setColor, setBorderRadius } = useTheme()

setMode('dark')      // 暗色模式
setMode('light')     // 亮色模式
setMode('auto')      // 跟随系统
setColor('purple')   // 切换主题色
setBorderRadius('lg') // 修改圆角
```

主题色预设：`blue` / `green` / `purple` / `orange` / `red`

CSS 变量可在自定义样式中使用：

```css
.custom {
  color: var(--xui-color-primary);
  background: var(--xui-color-primary-bg);
  border-radius: var(--xui-border-radius-md);
  font-size: var(--xui-font-size-md);
  box-shadow: var(--xui-shadow-md);
}
```

---

## 国际化（i18n）

内置 `zh-CN` / `en-US` / `ja-JP` / `ko-KR`

```ts
import { setLocale, t, addLocale } from '@xui/core'

setLocale('en-US')
t('xui.button.loading')  // "Loading..."

// 添加自定义语言
addLocale({ name: 'fr-FR', messages: { 'xui.button.loading': 'Chargement...' } })
setLocale('fr-FR')
```

---

## FMX 集成

### Delphi 端

```pascal
unit MainFrm;

interface

uses
  Winapi.Windows, System.SysUtils, Vcl.Forms, Vcl.Edge, System.JSON;

type
  TForm1 = class(TForm)
    EdgeBrowser1: TEdgeBrowser;
    procedure FormCreate(Sender: TObject);
    procedure EdgeBrowser1WebMessageReceived(Sender: TCustomEdgeBrowser;
      Args: TWebMessageReceivedEventArgs);
  private
    procedure HandleXuiMessage(const Msg: TJSONObject);
    procedure SendResponse(const ResponseId: string; const Data: TJSONObject);
  end;

var
  Form1: TForm1;

implementation

{$R *.dfm}

procedure TForm1.FormCreate(Sender: TObject);
begin
  EdgeBrowser1.Align := alClient;
  EdgeBrowser1.Navigate('file:///app/dist/index.html');
end;

procedure TForm1.EdgeBrowser1WebMessageReceived(Sender: TCustomEdgeBrowser;
  Args: TWebMessageReceivedEventArgs);
var
  MsgStr: string;
  JSON: TJSONObject;
begin
  MsgStr := Args.TryGetWebMessageAsString;
  JSON := TJSONObject.ParseJSONValue(MsgStr) as TJSONObject;
  try
    HandleXuiMessage(JSON);
  finally
    JSON.Free;
  end;
end;

procedure TForm1.HandleXuiMessage(const Msg: TJSONObject);
var
  MsgType, ResponseId: string;
begin
  MsgType := Msg.GetValue<string>('type');
  ResponseId := Msg.GetValue<string>('_id');

  if MsgType = 'request' then
  begin
    // 处理网络请求，返回结果
    // ...
    SendResponse(ResponseId, ResultData);
  end
  else if MsgType = 'storage_get' then
  begin
    // 从 Delphi 存储中读取数据
    SendResponse(ResponseId, StoredData);
  end;
end;

procedure TForm1.SendResponse(const ResponseId: string; const Data: TJSONObject);
var
  Response: TJSONObject;
begin
  Response := TJSONObject.Create;
  Response.AddPair('type', 'response');
  Response.AddPair('_id', ResponseId);
  Response.AddPair('payload', Data);
  EdgeBrowser1.ExecuteScript(
    'window.chrome.webview.postMessage(' + Response.ToString + ')'
  );
  Response.Free;
end;

end.
```

### JS 端

```ts
import { getFmxBridge, initFmxEnvironment } from '@xui/runtime-fmx'

initFmxEnvironment()
const bridge = getFmxBridge()

// 请求 Delphi 执行 HTTP 请求
const data = await bridge.invoke('request', {
  url: 'https://api.example.com/data',
  method: 'GET',
})

// 存储
await bridge.invoke('storage_set', { key: 'token', value: 'xxx' })
const token = await bridge.invoke('storage_get', { key: 'token' })

// 导航
bridge.send('nav_push', { url: '/detail' })
bridge.send('nav_back', { delta: 1 })

// 监听 Delphi 推送的消息
bridge.onMessage('notification', (payload) => {
  console.log('收到通知:', payload)
})
```

---

## CLI 工具

```bash
# 创建项目
xui create my-app --template web

# 启动开发服务器
cd my-app && xui dev --port 3000

# 构建
xui build --target web    # Web
xui build --target mini   # 小程序
xui build --target fmx    # FMX WebView
```

---

## 测试覆盖

| 包 | 测试文件 | 用例数 |
|----|----------|--------|
| `@xui/core` | platform + i18n | 14 ✅ |
| `@xui/compiler` | transformer | 12 ✅ |
| `@xui/runtime-mini` | compiler | 7 ✅ |
| `@xui/components` | 8 个组件 | 52 ✅ |
| **总计** | | **85 ✅** |

---

## License

[MIT](LICENSE)
