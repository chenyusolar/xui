# XUI - Cross-platform UI Framework

> **一套代码，自动适配 Web / H5 / App（FMX WebView）/ 小程序**

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

## 核心特性

- **完全自研**：不依赖 uni-app / Taro 等第三方框架，架构完全可控
- **跨端编译**：一套 Vue3 SFC 代码，通过编译器输出不同平台产物
- **FMX 深度集成**：Delphi/FMX WebView 原生支持，JS ↔ Delphi 双向通信
- **小程序编译**：Vue SFC → WXML / WXSS / JS 自动转换（含事件绑定）
- **23+ 组件库**：Button / Card / List / Input / Modal / Tabs / Form / Table / Select / Picker / DatePicker / Row / Col / VirtualList 等
- **国际化 i18n**：内置 zh-CN / en-US / ja-JP / ko-KR，支持自定义语言包
- **动画系统**：10 种预设动画 + `useAnimation` / `useStaggerAnimation` composables
- **主题系统**：CSS 变量 + 运行时主题切换（light / dark / auto），5 种主题色
- **CLI 工具**：`xui create` / `xui dev` / `xui build` 一键操作
- **测试覆盖**：Vitest 单元测试，核心模块 + 编译器 + 组件均有测试
- **Monorepo 架构**：pnpm workspace + Turbo 构建，模块化清晰

---

## 项目架构

```
xui-project/
├── packages/
│   ├── core/             # 核心运行时
│   │   ├── platform.ts        # 平台类型定义
│   │   ├── platform-impl.ts   # 平台实现（Web/Mini/FMX）
│   │   ├── reactive.ts        # 响应式 API 导出
│   │   └── i18n.ts            # 国际化（zh-CN/en-US/ja-JP/ko-KR）
│   │
│   ├── runtime-web/      # Web 渲染器
│   │   └── view→div, text→span, image→img
│   │
│   ├── runtime-fmx/      # FMX WebView 适配层
│   │   ├── bridge.ts          # JS ↔ Delphi 双向通信
│   │   └── index.ts           # 导出 + install
│   │
│   ├── runtime-mini/     # 小程序编译器
│   │   └── compiler.ts        # SFC → WXML/WXSS/JS 转换
│   │
│   ├── compiler/         # 跨端编译器（Vite 插件）
│   │   ├── transformer.ts     # AST 转换引擎（含事件绑定转换）
│   │   └── plugin.ts          # Vite 插件入口
│   │
│   ├── components/       # UI 组件库（23 个组件）
│   │   ├── Button/ Card/ List/ Input/ Modal/
│   │   ├── Tabs/ Badge/ Avatar/ Grid/ Switch/
│   │   ├── Tag/ Loading/ Divider/ NavBar/
│   │   ├── Progress/ Popup/ Table/ Form/
│   │   ├── Select/ Picker/ DatePicker/
│   │   ├── Row/ Col/ VirtualList/
│   │   └── index.ts           # 统一导出 + install
│   │
│   ├── animations/       # 动画系统
│   │   ├── XAnimation.vue     # 动画组件（10 种预设）
│   │   └── composables/       # useAnimation / useStaggerAnimation
│   │
│   ├── themes/           # 主题系统
│   │   ├── default.css        # 默认主题（light）
│   │   ├── dark.css           # 暗色主题
│   │   └── useTheme.ts        # 运行时主题 API
│   │
│   └── cli/              # 脚手架工具
│       └── commands/          # create / build / dev
│
├── examples/
│   ├── demo/             # 完整演示应用（展示所有组件）
│   └── fmx-app/          # Delphi FMX 集成示例
│
├── turbo.json            # Turbo 构建配置
├── pnpm-workspace.yaml   # pnpm workspace
└── tsconfig.base.json    # 共享 TS 配置
```

---

## 快速开始

### 环境要求

- Node.js >= 18.0
- pnpm >= 9.0

### 1. 安装依赖

```bash
pnpm install
```

### 2. 构建所有包

```bash
pnpm build
```

### 3. 运行测试

```bash
pnpm test
```

### 4. 启动开发服务器

```bash
# 根目录启动所有 dev
pnpm dev

# 或单独启动 demo
cd examples/demo
pnpm dev
```

### 5. 构建不同平台

```bash
# Web
xui build --target web

# FMX WebView
xui build --target fmx

# 小程序
xui build --target mini
```

### 6. 使用 CLI 创建新项目

```bash
# 创建项目
xui create my-app --template web

# 开发
cd my-app
xui dev

# 构建
xui build --target web
xui build --target fmx
xui build --target mini
```

---

## 核心设计

### 跨端标签映射

不使用 HTML 原生标签，使用统一的跨端标签：

```vue
<!-- 你的代码 -->
<view class="container">
  <text>Hello</text>
  <image src="logo.png" />
</view>
```

编译输出：

| 平台 | `<view>` | `<text>` | `<image>` |
|------|----------|----------|-----------|
| Web | `<div>` | `<span>` | `<img>` |
| 小程序 | `<view>` | `<text>` | `<image>` |
| FMX | `<div>` | `<span>` | `<img>` |

### 统一平台 API

```ts
import { platform } from '@xui/core'

// 自动检测当前平台，调用对应平台原生 API
await platform.request({ url: '/api/data', method: 'POST', data: { foo: 'bar' } })

platform.storage.set('user', { name: 'Alice' })
const user = platform.storage.get('user')

platform.navigation.push('/detail', { id: 123 })
platform.navigation.back()

// 平台判断
if (platform.isWeb) { /* Web 特有逻辑 */ }
if (platform.isMini) { /* 小程序特有逻辑 */ }
if (platform.isFmx) { /* FMX 特有逻辑 */ }
```

### 样式单位自动转换

```css
.x-btn {
  padding: 12px;
  margin: 8px;
  font-size: 14px;
}
```

编译器自动转换：

| 平台 | 输出 |
|------|------|
| Web | `12px` / `8px` / `14px` |
| 小程序 | `24rpx` / `16rpx` / `28rpx` |
| FMX | `12px` / `8px` / `14px` |

---

## 组件库

### 基础组件

| 组件 | 标签 | 说明 |
|------|------|------|
| `XButton` | 按钮 | type / size / loading / disabled / block / icon |
| `XInput` | 输入框 | label / error / clearable / prefix / suffix / maxlength |
| `XSwitch` | 开关 | checked / disabled / size |
| `XTag` | 标签 | type / size / bordered / closable / custom color |
| `XBadge` | 徽标 | count / dot / max / showZero |
| `XAvatar` | 头像 | src / name / icon / size / shape / bgColor |
| `XDivider` | 分割线 | type / orientation / title / color |
| `XLoading` | 加载指示器 | text / size / fullscreen |
| `XProgress` | 进度条 | percent / type / size / striped / animated / showText |

### 布局组件

| 组件 | 标签 | 说明 |
|------|------|------|
| `XCard` | 卡片 | title / bordered / hoverable / extra / footer |
| `XGrid` | 网格布局 | columns / gap / clickable |
| `XList` | 列表 | dataSource / clickable / 自定义 item |
| `XTable` | 表格 | columns / bordered / striped / hoverable / 自定义 cell |
| `XNavBar` | 导航栏 | fixed / showBack / bgColor / 左右插槽 |
| `XRow` | 行布局 | gutter / justify / align / wrap |
| `XCol` | 列布局 | span / offset / xs/sm/md/lg/xl 响应式 |
| `XVirtualList` | 虚拟列表 | 大数据量滚动优化，自动回收 DOM |

### 反馈组件

| 组件 | 标签 | 说明 |
|------|------|------|
| `XModal` | 对话框 | title / size / maskClosable / 自定义 footer |
| `XPopup` | 弹出层 | position（bottom/top/left/right/center）/ size |
| `XTabs` | 标签页 | line / card 类型 / 自定义 tab 内容 |

### 表单组件

| 组件 | 标签 | 说明 |
|------|------|------|
| `XForm` | 表单 | fields / validation / labelPosition / actions |
| `XSelect` | 下拉选择 | options / disabled / clearable / 搜索 |
| `XPicker` | 选择器 | 多列滚动选择，底部弹出 |
| `XDatePicker` | 日期选择 | date/datetime/year-month/time 四种模式 |

---

## 国际化（i18n）

```ts
import { setLocale, t, zhCN, enUS } from '@xui/core'

// 切换语言
setLocale('en-US')

// 组件内使用
const loadingText = t('xui.button.loading') // "Loading..."

// 添加自定义语言包
import { addLocale } from '@xui/core'
addLocale({
  name: 'fr-FR',
  messages: {
    'xui.button.loading': 'Chargement...',
    'xui.picker.cancel': 'Annuler',
    'xui.picker.confirm': 'Confirmer',
  },
})
setLocale('fr-FR')
```

内置语言：`zh-CN` / `en-US` / `ja-JP` / `ko-KR`

---

## 动画系统

### 组件用法

```vue
<template>
  <!-- 基础淡入淡出 -->
  <XAnimation type="fade">
    <view v-if="visible">Content</view>
  </XAnimation>

  <!-- 滑入动画 -->
  <XAnimation type="slide-up" :duration="500">
    <XCard>Slide Up</XCard>
  </XAnimation>
</template>
```

### 支持的动画类型

| 动画 | 描述 | 适用场景 |
|------|------|----------|
| `fade` | 淡入淡出 | 通用显示/隐藏 |
| `slide-up` | 从下向上滑入 | 底部弹窗、列表项 |
| `slide-down` | 从上向下滑入 | 下拉菜单、通知 |
| `slide-left` | 从右向左滑入 | 页面切换 |
| `slide-right` | 从左向右滑入 | 页面切换 |
| `zoom` | 缩放淡入 | 对话框、图片预览 |
| `scale` | 弹性缩放 | 按钮点击、徽标 |
| `bounce` | 弹跳进入 | 通知、提示 |
| `flip` | 3D 翻转 | 卡片翻转 |
| `rotate` | 旋转进入 | 加载指示器 |

### Composable 用法

```ts
import { useAnimation, useStaggerAnimation } from '@xui/animations'

const { elementRef, fadeIn, fadeOut, slideIn, scaleIn, stop } = useAnimation({
  duration: 300,
  easing: 'ease',
})

fadeIn()
slideIn('up')

// 列表交错动画
const { visibleItems, showAll, hideAll } = useStaggerAnimation(10, {
  staggerDelay: 50,
  duration: 300,
})
```

---

## 主题系统

### 运行时主题切换

```ts
import { useTheme } from '@xui/themes'

const { isDark, setMode, setColor } = useTheme()

setMode('dark')
setColor('purple')
setMode('auto') // 自动跟随系统
```

### CSS 变量体系

```css
/* 颜色 */
--xui-color-primary: #1677ff;
--xui-color-success: #52c41a;
--xui-color-warning: #faad14;
--xui-color-danger: #ff4d4f;
--xui-color-text: #1f1f1f;
--xui-color-bg: #ffffff;
--xui-color-border: #f0f0f0;

/* 圆角 */
--xui-border-radius-sm: 4px;
--xui-border-radius-md: 8px;
--xui-border-radius-lg: 12px;

/* 字体 */
--xui-font-size-xs: 11px;
--xui-font-size-sm: 12px;
--xui-font-size-md: 14px;
--xui-font-size-lg: 16px;

/* 阴影 */
--xui-shadow-sm: 0 1px 2px rgba(0,0,0,0.04);
--xui-shadow-md: 0 2px 8px rgba(0,0,0,0.06);
--xui-shadow-lg: 0 4px 16px rgba(0,0,0,0.1);

/* 间距 */
--xui-spacing-xs: 4px;
--xui-spacing-sm: 8px;
--xui-spacing-md: 12px;
--xui-spacing-lg: 16px;

/* 层级 */
--xui-z-index-modal: 500;
--xui-z-index-tooltip: 700;

/* 过渡 */
--xui-transition-fast: 150ms ease;
--xui-transition-normal: 300ms ease;
--xui-transition-slow: 500ms ease;
```

### 主题色预设

| 颜色 | 主色 | 背景色 |
|------|------|--------|
| `blue` | `#1677ff` | `#e6f4ff` |
| `green` | `#52c41a` | `#f6ffed` |
| `purple` | `#722ed1` | `#f9f0ff` |
| `orange` | `#fa8c16` | `#fff7e6` |
| `red` | `#f5222d` | `#fff1f0` |

---

## FMX 集成

### Delphi 端（完整示例）

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
    procedure HandleRequest(const Payload: TJSONObject);
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
    // 根据 type 分发处理
    HandleXuiMessage(JSON);
  finally
    JSON.Free;
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

// 监听 Delphi 推送的消息
bridge.onMessage('notification', (payload) => {
  console.log('Notification:', payload)
})

// 存储（由 Delphi 管理持久化）
bridge.invoke('storage_set', { key: 'token', value: 'xxx' })
const token = await bridge.invoke('storage_get', { key: 'token' })
```

---

## 编译器

### Vite 插件配置

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { xuiCompiler } from '@xui/compiler'

export default defineConfig({
  plugins: [
    vue(),
    xuiCompiler({
      target: 'web',        // 'web' | 'fmx' | 'mini'
      autoPlatform: true,   // 从 XUI_TARGET 环境变量自动检测
    }),
  ],
})
```

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

### 小程序事件绑定转换

| Vue 语法 | 小程序输出 |
|----------|-----------|
| `@click="handleClick"` | `bindtap="handleClick"` |
| `@input="onInput"` | `bindinput="onInput"` |
| `@change="onChange"` | `bindchange="onChange"` |
| `v-for="item in list"` | `wx:for="{{list}}" wx:key="item.id \|\| index"` |
| `v-if="show"` | `wx:if="{{show}}"` |
| `v-else-if="other"` | `wx:elif="{{other}}"` |
| `v-else` | `wx:else` |
| `:class="cls"` | `class="{{cls}}"` |
| `:style="sty"` | `style="{{sty}}"` |

---

## 测试

```bash
# 运行所有测试
pnpm test

# 运行特定包测试
cd packages/core && pnpm test
cd packages/compiler && pnpm test
cd packages/components && pnpm test

# 监听模式
cd packages/core && pnpm test:watch
```

当前覆盖：

| 包 | 测试文件 | 用例数 | 状态 |
|----|----------|--------|------|
| `@xui/core` | platform.test.ts | 6 | ✅ |
| `@xui/core` | i18n.test.ts | 8 | ✅ |
| `@xui/compiler` | transformer.test.ts | 12 | ✅ |
| `@xui/components` | Button.test.ts | 9 | ✅ |
| `@xui/components` | Card.test.ts | 7 | ✅ |
| **总计** | | **42** | **✅** |

---

## 开发路线图

### 已完成 ✅

- [x] 核心架构 & 平台抽象（Web / Mini / FMX）
- [x] Web 渲染器（view/text/image/scroll-view/button/input）
- [x] 跨端编译器（Vite 插件 + SFC 转换 + 事件绑定）
- [x] UI 组件库（23 个组件）
- [x] CLI 脚手架（create / dev / build）
- [x] FMX WebView 集成（JS ↔ Delphi 双向通信）
- [x] 小程序编译器（WXML/WXSS/JS 转换 + 事件绑定）
- [x] 动画系统（10 种动画 + composables）
- [x] 主题系统（CSS 变量 + 运行时切换 + 5 种主题色）
- [x] 国际化 i18n（zh-CN / en-US / ja-JP / ko-KR）
- [x] 响应式布局（XRow / XCol 栅格系统）
- [x] 虚拟列表（XVirtualList）
- [x] 测试覆盖（Vitest，42 个用例）

### 规划中 🚧

- [ ] 更多组件（Calendar / Upload / Tree / TreeSelect / Cascader / Rate / Slider）
- [ ] 小程序运行时适配（完整生命周期 + 自定义组件注册）
- [ ] 无障碍（a11y）支持
- [ ] 文档站点（VitePress）
- [ ] 组件 Playground
- [ ] E2E 测试（Playwright）
- [ ] 图片懒加载
- [ ] 发布到 npm

---

## 存在的问题

### 🔴 严重问题

| # | 问题 | 影响 | 解决建议 |
|---|------|------|----------|
| 1 | **编译器使用正则替换而非 AST** | 复杂模板（嵌套标签、动态属性）可能转换错误 | 升级为 `@vue/compiler-sfc` 解析 AST，逐节点转换 |
| 2 | **小程序不支持自定义组件注册** | 组件库无法在小程序中复用，只能输出页面级代码 | 实现 `usingComponents` 自动生成 + 组件编译逻辑 |
| 3 | **小程序事件参数传递缺失** | `@click="handleClick(item)"` 无法正确转换 | 需要实现 `data-*` 属性注入 + 事件代理层 |
| 4 | **组件测试依赖 `@vue/test-utils` 但未安装** | 组件测试无法运行 | 添加 `@vue/test-utils` 到 components 包 devDependencies |

### 🟡 中等问题

| # | 问题 | 影响 | 解决建议 |
|---|------|------|----------|
| 5 | **FMX 存储 API 异步不完整** | `storage.get` 在 FMX 中返回 null 而非 Promise | 实现完整的 request-response 往返机制 |
| 6 | **样式单位转换过于简单** | `12px → 24rpx` 硬编码乘 2，不同设计稿基准不同 | 支持配置设计稿宽度（375/750），动态计算比例 |
| 7 | **组件按需加载未实现** | 全量引入所有组件，bundle 体积大 | 支持 `import { XButton } from '@xui/components/Button'` |
| 8 | **XVirtualList 不支持动态高度** | 所有 item 必须等高，实际场景不通用 | 实现动态高度测量 + 缓存机制 |
| 9 | **XPicker 触摸滚动未实现** | `touchstart/touchmove/touchend` 为空函数 | 实现滚动吸附 + 惯性滚动逻辑 |

### 🟢 轻微问题

| # | 问题 | 影响 | 解决建议 |
|---|------|------|----------|
| 10 | **TypeScript 类型警告未完全消除** | d.ts 生成有 warning，但不影响运行 | 修复 generic 组件的类型推断问题 |
| 11 | **CLI 模板生成使用 `writeFileSync`** | 大文件写入可能性能问题，但对脚手架影响小 | 可优化为流式写入 |
| 12 | **demo 示例未引用新组件** | Select/Picker/DatePicker/Row/Col/VirtualList 未展示 | 在 demo App.vue 中添加演示代码 |
| 13 | **无 CHANGELOG** | 版本变更不透明 | 添加 conventional commits + auto changelog |
| 14 | **无 LICENSE 文件** | README 引用了 MIT 但无实际文件 | 添加 LICENSE 文件 |

---

## 进一步开发建议

### 🔴 高优先级（立即做，1-2 周）

| # | 任务 | 原因 | 预计工时 | 风险 |
|---|------|------|----------|------|
| 1 | **编译器升级为 AST 驱动** | 正则替换无法处理边界情况，是框架核心瓶颈 | 5 天 | 高：需要熟悉 @vue/compiler-sfc |
| 2 | **小程序自定义组件支持** | 没有这个能力，组件库在小程序端完全不可用 | 4 天 | 高：需要了解小程序组件规范 |
| 3 | **补充 `@vue/test-utils` 依赖 + 组件测试** | 当前 23 个组件只有 2 个有测试 | 3 天 | 低 |
| 4 | **完善 XPicker 触摸滚动** | 当前 picker 只能点击，无法滑动选择 | 2 天 | 中 |
| 5 | **修复 FMX 存储异步问题** | storage.get 返回 null 导致业务逻辑出错 | 1 天 | 低 |

### 🟡 中优先级（3-4 周）

| # | 任务 | 原因 | 预计工时 | 风险 |
|---|------|------|----------|------|
| 6 | **补充高频组件**（Calendar/Upload/Tree/Cascader/Rate/Slider） | 企业级项目必备 | 5 天 | 低 |
| 7 | **样式单位可配置** | 不同项目设计稿基准不同（375/750/1080） | 2 天 | 低 |
| 8 | **组件按需加载** | 全量引入导致 Web 端 bundle 过大 | 2 天 | 低 |
| 9 | **XVirtualList 动态高度** | 实际场景中 item 高度不固定 | 3 天 | 中 |
| 10 | **图片懒加载组件** | 列表性能优化必备 | 1 天 | 低 |
| 11 | **VitePress 文档站** | 没有文档 = 没有用户 | 4 天 | 低 |

### 🟢 低优先级（1-2 月）

| # | 任务 | 原因 | 预计工时 | 风险 |
|---|------|------|----------|------|
| 12 | **无障碍 a11y** | 企业级产品要求 | 3 天 | 中 |
| 13 | **E2E 测试（Playwright）** | 保证 Web / FMX 行为一致 | 3 天 | 低 |
| 14 | **小程序运行时适配层** | 不只是编译，需要完整生命周期映射 | 1 周 | 高 |
| 15 | **插件系统** | 允许第三方扩展 | 1 周 | 高 |
| 16 | **npm 发布 + CI/CD** | 框架成熟后自然需要 | 1 天 | 低 |

### 💡 架构升级建议

#### 1. 编译器从正则 → AST（最关键）

```ts
// 当前：正则替换（容易出错）
result = result.replace(/v-for="([^"]+)"/g, 'wx:for="{{$1}}"')

// 目标：AST 转换
import { parse } from '@vue/compiler-sfc'
const ast = parse(source)
walkAST(ast.template.ast, (node) => {
  if (node.tag === 'view') node.tag = 'div'
  if (node.props.find(p => p.name === '@click')) {
    // 转换事件绑定
  }
})
```

#### 2. 小程序自定义组件注册

```json
// 自动生成 page.json
{
  "usingComponents": {
    "x-button": "/components/Button/index",
    "x-card": "/components/Card/index",
    "x-input": "/components/Input/index"
  }
}
```

#### 3. FMX 通信协议标准化

```ts
// 定义 JSON-RPC 格式
interface JsonRpcRequest {
  jsonrpc: '2.0'
  id: number
  method: string
  params: Record<string, any>
}

interface JsonRpcResponse {
  jsonrpc: '2.0'
  id: number
  result?: any
  error?: { code: number; message: string }
}
```

#### 4. 组件按需加载

```ts
// 支持单独引入
import { XButton } from '@xui/components/Button'
import { XCard } from '@xui/components/Card'

// 或全量引入
import { XuiComponents } from '@xui/components'
app.use(XuiComponents)
```

---

## License

[MIT](LICENSE)
