# XUI 使用手册

> XUI - 跨平台 UI 框架，支持 Web / H5 / 小程序 / FMX WebView

**目录**

- [快速开始](#快速开始)
- [核心 API](#核心-api)
- [跨平台开发](#跨平台开发)
- [组件库](#组件库)
- [动画系统](#动画系统)
- [主题系统](#主题系统)
- [国际化](#国际化)
- [CLI 工具](#cli-工具)
- [小程序开发](#小程序开发)
- [FMX 集成](#fmx-集成)

---

## 快速开始

### 环境要求

- Node.js >= 18.0
- pnpm >= 9.0

### 安装

```bash
# 克隆项目
git clone <repo-url>
cd xui-project

# 安装依赖
pnpm install

# 构建所有包
pnpm build
```

### 创建新项目

```bash
# 使用 CLI 创建
xui create my-app --template web

# 进入项目
cd my-app

# 启动开发
xui dev

# 构建
xui build --target web   # Web
xui build --target mini  # 小程序
xui build --target fmx   # FMX WebView
```

### 在已有项目中使用

```bash
npm install @xui/core @xui/components @xui/animations @xui/themes
```

---

## 核心 API

### 平台检测与切换

```ts
import { platform, getPlatform, setPlatform } from '@xui/core'

// 自动检测当前平台
console.log(platform.name)  // 'web' | 'mini' | 'fmx'

// 判断平台
if (platform.isWeb) {
  console.log('运行在 Web 环境')
}
if (platform.isMini) {
  console.log('运行在小程序环境')
}
if (platform.isFmx) {
  console.log('运行在 FMX WebView 环境')
}

// 手动设置平台（通常不需要）
setPlatform('web')
```

### 网络请求

```ts
// 统一网络请求 API
const data = await platform.request({
  url: '/api/users',
  method: 'POST',
  data: { name: 'Alice', age: 18 },
  header: { 'Authorization': 'Bearer xxx' },
  timeout: 10000,
})
```

**平台差异：**
- Web：使用 `fetch`
- 小程序：使用 `wx.request`
- FMX：通过 `chrome.webview.postMessage` 发送给 Delphi

### 本地存储

```ts
// 设置数据
await platform.storage.set('user', { name: 'Alice', age: 18 })

// 获取数据
const user = await platform.storage.get('user')

// 删除数据
await platform.storage.remove('user')

// 清空
await platform.storage.clear()
```

**平台差异：**
- Web：`localStorage`（同步）
- 小程序：`wx.getStorageSync` / `wx.setStorageSync`（同步）
- FMX：通过 Promise 异步调用 Delphi 存储 API

### 页面导航

```ts
// 跳转到新页面
platform.navigation.push('/pages/detail/main', { id: 123 })

// 替换当前页面
platform.navigation.replace('/pages/index/main')

// 返回
platform.navigation.back()
platform.navigation.back(2)  // 返回多层
```

### 响应式

XUI 导出完整的 Vue 3 响应式 API：

```ts
import { ref, computed, watch, reactive } from '@xui/core'

// 响应式变量
const count = ref(0)
count.value++

// 计算属性
const doubled = computed(() => count.value * 2)

// 监听
watch(count, (newVal, oldVal) => {
  console.log(`count changed: ${oldVal} -> ${newVal}`)
})

// 响应式对象
const state = reactive({ name: 'Alice', age: 18 })
state.name = 'Bob'
```

---

## 跨平台开发

### 跨端标签映射

| Vue 模板标签 | Web/FMX 输出 | 小程序输出 |
|-------------|-------------|-----------|
| `<view>` | `<div>` | `<view>` |
| `<text>` | `<span>` | `<text>` |
| `<image>` | `<img>` | `<image>` |
| `<scroll-view>` | `<div style="overflow:auto">` | `<scroll-view>` |
| `<button>` | `<button>` | `<button>` |
| `<input>` | `<input>` | `<input>` |

### 示例

```vue
<template>
  <view class="container">
    <text class="title">Hello XUI</text>
    <image src="/assets/logo.png" />
    <button @click="handleClick">点击</button>
  </view>
</template>

<!-- Web 输出 -->
<div class="container">
  <span class="title">Hello XUI</span>
  <img src="/assets/logo.png" />
  <button>点击</button>
</div>

<!-- 小程序输出 -->
<view class="container">
  <text class="title">Hello XUI</text>
  <image src="/assets/logo.png" />
  <button>点击</button>
</view>
```

### 条件渲染

```vue
<!-- Vue 模板 -->
<view v-if="show">显示</view>
<view v-else>隐藏</view>
<view v-show="visible">切换显示</view>

<!-- Web/FMX 输出 -->
<div v-if="show">显示</div>
<div v-else>隐藏</div>
<div v-show="visible">切换显示</div>

<!-- 小程序输出 -->
<view wx:if="{{show}}">显示</view>
<view wx:else>隐藏</view>
<view wx:if="{{visible}}">切换显示</view>
```

### 列表渲染

```vue
<!-- Vue 模板 -->
<view v-for="item in list" :key="item.id">
  <text>{{ item.name }}</text>
</view>

<!-- 小程序输出 -->
<view wx:for="{{list}}" wx:for-item="item" wx:key="item.id">
  <text>{{item.name}}</text>
</view>
```

### 事件处理

```vue
<!-- Vue 模板 -->
<button @click="handleClick">点击</button>
<input @input="onInput" @change="onChange" />

<!-- 小程序输出 -->
<button bindtap="handleClick">点击</button>
<input bindinput="onInput" bindchange="onChange" />
```

### 样式单位

XUI 编译器会自动转换 px 到 rpx（小程序专用单位）：

```vue
<template>
  <view class="box">
    <text>Box</text>
  </view>
</template>

<style>
.box {
  padding: 12px;        /* Web: 12px, 小程序: 24rpx */
  font-size: 14px;       /* Web: 14px, 小程序: 28rpx */
  border-radius: 8px;   /* Web: 8px, 小程序: 16rpx */
}
</style>
```

可通过配置修改转换比例：

```ts
// vite.config.ts
xuiCompiler({
  unitRatio: 1,  // 1px = 1rpx (默认是 2)
})
```

---

## 组件库

### 引入组件

**全局引入（推荐）**

```ts
import { createApp } from 'vue'
import XUI from '@xui/components'
import '@xui/components/dist/components.css'

const app = createApp(App)
app.use(XUI)
```

**按需引入**

```ts
import { XButton, XInput, XModal } from '@xui/components'
```

**异步安装（首屏优化）**

```ts
import { install } from '@xui/components'

// 安装单个组件
await install('Button')

// 安装多个组件
await install(['Button', 'Input', 'Modal'])
```

### Button 按钮

**基础用法**

```vue
<XButton>默认按钮</XButton>
<XButton type="primary">主要按钮</XButton>
<XButton type="success">成功按钮</XButton>
<XButton type="warning">警告按钮</XButton>
<XButton type="danger">危险按钮</XButton>
```

**按钮尺寸**

```vue
<XButton size="small">小按钮</XButton>
<XButton size="medium">中按钮</XButton>
<XButton size="large">大按钮</XButton>
```

**禁用状态**

```vue
<XButton disabled>禁用按钮</XButton>
```

**加载状态**

```vue
<XButton loading>加载中...</XButton>
<XButton :loading="isLoading" @click="handleClick">提交</XButton>
```

**图标按钮**

```vue
<XButton icon="search">搜索</XButton>
<XButton icon="plus">新建</XButton>
<XButton icon="delete" type="danger">删除</XButton>
```

**通栏按钮**

```vue
<XButton block>通栏按钮</XButton>
```

**事件**

```vue
<XButton @click="handleClick" @dblclick="handleDblClick">
  点击我
</XButton>
```

**属性**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| type | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'default'` | `'default'` | 按钮类型 |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | 按钮尺寸 |
| disabled | `boolean` | `false` | 是否禁用 |
| loading | `boolean` | `false` | 是否加载中 |
| icon | `string` | - | 图标名称 |
| block | `boolean` | `false` | 是否通栏 |
| native-type | `'button' \| 'submit' \| 'reset'` | `'button'` | 原生按钮类型 |

---

### Card 卡片

**基础用法**

```vue
<XCard>
  <template #title>卡片标题</template>
  卡片内容区域
  <template #footer>卡片底部</template>
</XCard>
```

**带标题和额外操作**

```vue
<XCard title="用户信息" extra="查看全部">
  <view>卡片内容</view>
</XCard>
```

**可点击卡片**

```vue
<XCard hoverable @click="handleCardClick">
  <view>鼠标悬停时有阴影效果</view>
</XCard>
```

**带边框**

```vue
<XCard bordered>
  <view>带边框的卡片</view>
</XCard>
```

**属性**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | `string` | - | 卡片标题 |
| extra | `string` | - | 右上角额外内容 |
| bordered | `boolean` | `false` | 是否有边框 |
| hoverable | `boolean` | `false` | 是否有悬停效果 |

**插槽**

| 插槽 | 说明 |
|------|------|
| default | 默认内容 |
| title | 自定义标题区域 |
| extra | 自定义右上角内容 |
| footer | 自定义底部区域 |

---

### Input 输入框

**基础用法**

```vue
<XInput v-model="value" placeholder="请输入文本" />
```

**密码输入**

```vue
<XInput v-model="password" type="password" placeholder="请输入密码" />
```

**禁用状态**

```vue
<XInput v-model="value" disabled placeholder="禁用状态" />
```

**带标签**

```vue
<XInput v-model="username" label="用户名" placeholder="请输入用户名" />
<XInput v-model="email" label="邮箱" type="email" placeholder="请输入邮箱" />
```

**带错误提示**

```vue
<XInput v-model="value" error="输入格式不正确" placeholder="请输入" />
```

**带前缀/后缀**

```vue
<XInput v-model="value" prefix="search" placeholder="搜索..." />
<XInput v-model="value" suffix="设置" placeholder="请输入" />
```

**可清除**

```vue
<XInput v-model="value" clearable placeholder="可清除的输入框" />
```

**输入长度限制**

```vue
<XInput v-model="value" :maxlength="10" show-count placeholder="最多10个字符" />
```

**事件**

```vue
<XInput
  v-model="value"
  @input="onInput"
  @change="onChange"
  @focus="onFocus"
  @blur="onBlur"
  @clear="onClear"
/>
```

**属性**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| modelValue / v-model | `string \| number` | - | 绑定的值 |
| type | `'text' \| 'password' \| 'email' \| 'number' \| 'tel'` | `'text'` | 输入框类型 |
| placeholder | `string` | - | 占位文本 |
| disabled | `boolean` | `false` | 是否禁用 |
| readonly | `boolean` | `false` | 是否只读 |
| label | `string` | - | 标签文本 |
| error | `string` | - | 错误提示 |
| prefix | `string` | - | 前缀图标/文本 |
| suffix | `string` | - | 后缀图标/文本 |
| clearable | `boolean` | `false` | 是否可清除 |
| maxlength | `number` | - | 最大长度 |
| show-count | `boolean` | `false` | 是否显示计数 |

**事件**

| 事件 | 参数 | 说明 |
|------|------|------|
| input | `(value: string \| number)` | 输入时触发 |
| change | `(value: string \| number)` | 内容变化时触发 |
| focus | `(e: Event)` | 获得焦点时触发 |
| blur | `(e: Event)` | 失去焦点时触发 |
| clear | `()` | 点击清除按钮时触发 |

---

### Modal 对话框

**基础用法**

```vue
<XModal v-model:visible="showModal" title="提示">
  <view>这是一个模态对话框</view>
</XModal>
```

**内容区域**

```vue
<XModal v-model:visible="showModal" title="确认操作">
  <view>确定要删除这个项目吗？此操作不可撤销。</view>
  <template #footer>
    <XButton @click="showModal = false">取消</XButton>
    <XButton type="danger" @click="confirmDelete">确定</XButton>
  </template>
</XModal>
```

**隐藏底部**

```vue
<XModal v-model:visible="showModal" title="提示" :show-footer="false">
  <view>没有底部的对话框</view>
</XModal>
```

**点击遮罩关闭**

```vue
<XModal v-model:visible="showModal" :mask-closable="true">
  <view>点击遮罩可以关闭</view>
</XModal>
```

**可关闭**

```vue
<XModal v-model:visible="showModal" :closable="true">
  <view>显示关闭按钮</view>
</XModal>
```

**对话框尺寸**

```vue
<XModal v-model:visible="showModal" size="small">小尺寸</XModal>
<XModal v-model:visible="showModal" size="medium">中等尺寸</XModal>
<XModal v-model:visible="showModal" size="large">大尺寸</XModal>
```

**属性**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| visible / v-model:visible | `boolean` | `false` | 是否显示 |
| title | `string` | - | 标题 |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | 尺寸 |
| width | `string` | - | 自定义宽度 |
| mask-closable | `boolean` | `true` | 点击遮罩是否关闭 |
| closable | `boolean` | `false` | 是否显示关闭按钮 |
| show-footer | `boolean` | `true` | 是否显示底部 |

**插槽**

| 插槽 | 说明 |
|------|------|
| default | 对话框内容 |
| footer | 自定义底部区域 |

**事件**

| 事件 | 参数 | 说明 |
|------|------|------|
| update:visible | `(val: boolean)` | 关闭时触发 |
| close | `()` | 关闭时触发 |
| cancel | `()` | 点击取消时触发 |
| confirm | `()` | 点击确定时触发 |

---

### Tabs 标签页

**基础用法**

```vue
<XTabs v-model:active-key="activeTab">
  <XTabs.Panel key="tab1" title="标签1">
    <view>内容1</view>
  </XTabs.Panel>
  <XTabs.Panel key="tab2" title="标签2">
    <view>内容2</view>
  </XTabs.Panel>
  <XTabs.Panel key="tab3" title="标签3">
    <view>内容3</view>
  </XTabs.Panel>
</XTabs>
```

**卡片风格**

```vue
<XTabs v-model:active-key="activeTab" type="card">
  <XTabs.Panel key="tab1" title="标签1">
    <view>卡片风格内容</view>
  </XTabs.Panel>
  <XTabs.Panel key="tab2" title="标签2">
    <view>卡片风格内容</view>
  </XTabs.Panel>
</XTabs>
```

**禁用标签**

```vue
<XTabs v-model:active-key="activeTab">
  <XTabs.Panel key="tab1" title="可用标签">
    <view>内容</view>
  </XTabs.Panel>
  <XTabs.Panel key="tab2" title="禁用标签" disabled>
    <view>不会显示</view>
  </XTabs.Panel>
</XTabs>
```

**属性**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| active-key / v-model:active-key | `string` | - | 当前激活的标签 key |
| type | `'line' \| 'card'` | `'line'` | 标签风格 |
| animated | `boolean` | `false` | 是否使用动画 |

**XTabs.Panel 属性**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| key | `string` | - | 唯一标识 |
| title | `string` | - | 标签标题 |
| disabled | `boolean` | `false` | 是否禁用 |

---

### Select 选择器

**基础用法**

```vue
<XSelect
  v-model="selectedValue"
  :options="options"
  placeholder="请选择"
/>

<script setup>
const selectedValue = ref('')
const options = [
  { label: '选项1', value: 1 },
  { label: '选项2', value: 2 },
  { label: '选项3', value: 3, disabled: true },
]
</script>
```

**可清除**

```vue
<XSelect v-model="selectedValue" :options="options" clearable placeholder="可清除的选择器" />
```

**禁用**

```vue
<XSelect v-model="selectedValue" :options="options" disabled placeholder="禁用状态" />
```

**事件**

```vue
<XSelect
  v-model="selectedValue"
  :options="options"
  @change="handleChange"
  placeholder="请选择"
/>

<script setup>
const handleChange = (value, option) => {
  console.log('选中值:', value)
  console.log('选中项:', option)
}
</script>
```

**属性**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| modelValue / v-model | `string \| number` | - | 绑定的值 |
| options | `SelectOption[]` | `[]` | 选项列表 |
| placeholder | `string` | - | 占位文本 |
| disabled | `boolean` | `false` | 是否禁用 |
| clearable | `boolean` | `false` | 是否可清除 |

**SelectOption 类型**

```ts
interface SelectOption {
  label: string      // 显示文本
  value: string | number  // 值
  disabled?: boolean  // 是否禁用
}
```

---

### DatePicker 日期选择器

**基础用法**

```vue
<XDatePicker v-model="date" />
```

**日期时间选择**

```vue
<XDatePicker v-model="datetime" type="datetime" />
```

**年月选择**

```vue
<XDatePicker v-model="yearMonth" type="year-month" />
```

**时间选择**

```vue
<XDatePicker v-model="time" type="time" />
```

**自定义格式**

```vue
<XDatePicker v-model="date" format="YYYY/MM/DD" />
<XDatePicker v-model="datetime" format="YYYY-MM-DD HH:mm:ss" />
```

**日期范围**

```vue
<XDatePicker v-model="date" :min-date="minDate" :max-date="maxDate" />

<script setup>
const minDate = new Date(2020, 0, 1)
const maxDate = new Date(2030, 11, 31)
</script>
```

**属性**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| modelValue / v-model | `Date \| string \| null` | - | 绑定的日期值 |
| type | `'date' \| 'datetime' \| 'year-month' \| 'time'` | `'date'` | 选择器类型 |
| placeholder | `string` | - | 占位文本 |
| format | `string` | - | 日期格式 |
| min-date | `Date` | - | 最小日期 |
| max-date | `Date` | - | 最大日期 |
| disabled | `boolean` | `false` | 是否禁用 |

---

### Picker 滚动选择器

**基础用法**

```vue
<XPicker
  v-model:visible="showPicker"
  :columns="columns"
  @confirm="onConfirm"
  @cancel="onCancel"
/>

<script setup>
const showPicker = ref(false)
const columns = [
  [{ label: '北京', value: 'bj' }, { label: '上海', value: 'sh' }],
  [{ label: '朝阳区', value: 'cy' }, { label: '海淀区', value: 'hd' }],
]
</script>
```

**单列选择**

```vue
<XPicker
  v-model:visible="showPicker"
  :columns="singleColumn"
  @confirm="onConfirm"
/>

<script setup>
const singleColumn = [[
  { label: '2024年', value: 2024 },
  { label: '2025年', value: 2025 },
  { label: '2026年', value: 2026 },
]]
</script>
```

---

### Form 表单

**基础用法**

```vue
<XForm @submit="onSubmit" @reset="onReset">
  <XForm.Item label="用户名" name="username" required>
    <XInput v-model="formData.username" placeholder="请输入用户名" />
  </XForm.Item>
  <XForm.Item label="邮箱" name="email" required>
    <XInput v-model="formData.email" type="email" placeholder="请输入邮箱" />
  </XForm.Item>
  <XForm.Item label="简介" name="bio">
    <XInput v-model="formData.bio" type="textarea" placeholder="请输入简介" />
  </XForm.Item>
</XForm>
```

**使用字段配置**

```vue
<XForm
  :fields="fields"
  v-model="formData"
  @submit="onSubmit"
/>

<script setup>
const fields = [
  { name: 'username', label: '用户名', type: 'input', required: true },
  { name: 'password', label: '密码', type: 'password', required: true },
  { name: 'gender', label: '性别', type: 'select', options: [...] },
]
</script>
```

**表单验证**

```vue
<XForm :fields="fields" :rules="rules" v-model="formData" @submit="onSubmit" />

<script setup>
const rules = {
  username: [
    { required: true, message: '用户名不能为空' },
    { min: 3, max: 20, message: '用户名长度3-20个字符' },
  ],
  email: [
    { required: true, message: '邮箱不能为空' },
    { type: 'email', message: '邮箱格式不正确' },
  ],
}
</script>
```

**XForm.Item 属性**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| label | `string` | - | 标签文本 |
| name | `string` | - | 字段名称 |
| required | `boolean` | `false` | 是否必填 |
| label-position | `'top' \| 'left'` | `'top'` | 标签位置 |

---

### Table 表格

**基础用法**

```vue
<XTable
  :columns="columns"
  :data-source="dataList"
  :key-field="'id'"
  @row-click="onRowClick"
/>

<script setup>
const columns = [
  { title: '姓名', dataIndex: 'name' },
  { title: '年龄', dataIndex: 'age' },
  { title: '城市', dataIndex: 'city' },
]

const dataList = [
  { id: 1, name: 'Alice', age: 18, city: '北京' },
  { id: 2, name: 'Bob', age: 20, city: '上海' },
]
</script>
```

**带边框**

```vue
<XTable :columns="columns" :data-source="dataList" bordered />
```

**斑马纹**

```vue
<XTable :columns="columns" :data-source="dataList" striped />
```

**可点击行**

```vue
<XTable :columns="columns" :data-source="dataList" clickable @row-click="onRowClick" />
```

**自定义单元格**

```vue
<XTable :columns="columns" :data-source="dataList">
  <template #bodyCell="{ column, record }">
    <text v-if="column.dataIndex === 'action'">
      <XButton size="small" @click.stop="handleEdit(record)">编辑</XButton>
    </text>
    <text v-else>{{ record[column.dataIndex] }}</text>
  </template>
</XTable>
```

**属性**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| columns | `TableColumn[]` | `[]` | 列配置 |
| data-source | `T[]` | `[]` | 数据源 |
| key-field | `string` | `'id'` | 主键字段 |
| bordered | `boolean` | `false` | 是否带边框 |
| striped | `boolean` | `false` | 是否斑马纹 |
| hoverable | `boolean` | `false` | 是否悬停高亮 |
| clickable | `boolean` | `false` | 行是否可点击 |

**TableColumn 类型**

```ts
interface TableColumn {
  title: string        // 列标题
  dataIndex: string    // 数据字段
  width?: number       // 列宽度
  align?: 'left' | 'center' | 'right'  // 对齐方式
}
```

---

### List 列表

**基础用法**

```vue
<XList
  :data-source="dataList"
  title-field="name"
  description-field="desc"
  extra-field="tag"
  clickable
  @item-click="onItemClick"
/>

<script setup>
const dataList = [
  { id: 1, name: '标题1', desc: '描述信息', tag: '标签' },
  { id: 2, name: '标题2', desc: '描述信息', tag: '标签' },
]
</script>
```

**带边框**

```vue
<XList :data-source="dataList" bordered>
  <template #item="{ item, index }">
    <view>{{ item.name }} - {{ item.desc }}</view>
  </template>
</XList>
```

**自定义项**

```vue
<XList :data-source="dataList">
  <template #item="{ item, index }">
    <view class="custom-item">
      <text class="title">{{ item.name }}</text>
      <text class="desc">{{ item.desc }}</text>
    </view>
  </template>
  <template #footer>
    <text>这是列表底部</text>
  </template>
</XList>
```

**属性**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| data-source | `T[]` | `[]` | 数据源 |
| key-field | `keyof T & string` | `'id'` | 主键字段 |
| title-field | `keyof T & string` | `'title'` | 标题字段 |
| description-field | `keyof T & string` | `'description'` | 描述字段 |
| extra-field | `keyof T & string` | - | 额外信息字段 |
| bordered | `boolean` | `false` | 是否带边框 |
| clickable | `boolean` | `false` | 项是否可点击 |
| active-index | `number` | `-1` | 当前激活索引 |

---

### Grid 宫格

**基础用法**

```vue
<XGrid :data-source="gridData" :columns="3" :gap="10">
  <template #item="{ item }">
    <view class="grid-item">
      <text>{{ item.title }}</text>
    </view>
  </template>
</XGrid>

<script setup>
const gridData = [
  { title: '图标1' },
  { title: '图标2' },
  { title: '图标3' },
  { title: '图标4' },
  { title: '图标5' },
  { title: '图标6' },
]
</script>
```

**可点击**

```vue
<XGrid :data-source="gridData" :columns="4" clickable @item-click="onItemClick" />
```

**属性**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| data-source | `T[]` | `[]` | 数据源 |
| columns | `number` | `2` | 列数 |
| gap | `number` | `8` | 间距(px) |
| clickable | `boolean` | `false` | 项是否可点击 |

---

### Row & Col 栅格布局

**基础用法**

```vue
<XRow :gutter="16">
  <XCol :span="12"><view class="col">col-12</view></XCol>
  <XCol :span="12"><view class="col">col-12</view></XCol>
</XRow>

<XRow :gutter="16">
  <XCol :span="8"><view class="col">col-8</view></XCol>
  <XCol :span="8"><view class="col">col-8</view></XCol>
  <XCol :span="8"><view class="col">col-8</view></XCol>
</XRow>
```

**响应式**

```vue
<XRow :gutter="16">
  <XCol :span="24" :md="12" :lg="8">
    <view>响应式列</view>
  </XCol>
</XRow>
```

**XCol 属性**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| span | `number` | `24` | 栅格占位（24栏制） |
| offset | `number` | `0` | 左侧间隔 |
| xs | `number \| { span, offset }` | - | 超小屏幕响应式 |
| sm | `number \| { span, offset }` | - | 小屏幕响应式 |
| md | `number \| { span, offset }` | - | 中等屏幕响应式 |
| lg | `number \| { span, offset }` | - | 大屏幕响应式 |
| xl | `number \| { span, offset }` | - | 超大屏幕响应式 |

---

### Badge 徽标

**基础用法**

```vue
<XBadge :count="5">
  <view class="box">内容</view>
</XBadge>
```

**小红点**

```vue
<XBadge dot>
  <view class="box">内容</view>
</XBadge>
```

**显示零**

```vue
<XBadge :count="0" show-zero>
  <view class="box">内容</view>
</XBadge>
```

**最大数值**

```vue
<XBadge :count="100" :max="99">
  <view class="box">内容</view>
</XBadge>
```

**属性**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| count | `number` | `0` | 徽标数字 |
| max | `number` | `99` | 最大显示数值 |
| dot | `boolean` | `false` | 是否显示红点 |
| show-zero | `boolean` | `false` | 是否显示零 |

---

### Avatar 头像

**基础用法**

```vue
<XAvatar src="/assets/user.png" />
<XAvatar name="Alice" />
<XAvatar icon="user" />
```

**尺寸**

```vue
<XAvatar src="/assets/user.png" size="small" />
<XAvatar src="/assets/user.png" size="medium" />
<XAvatar src="/assets/user.png" size="large" />
<XAvatar src="/assets/user.png" :size="60" />
```

**形状**

```vue
<XAvatar src="/assets/user.png" shape="circle" />
<XAvatar src="/assets/user.png" shape="square" />
```

**属性**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| src | `string` | - | 图片地址 |
| name | `string` | - | 显示名字（生成首字母） |
| icon | `string` | - | 图标名称 |
| size | `'small' \| 'medium' \| 'large' \| number` | `'medium'` | 尺寸 |
| shape | `'circle' \| 'square'` | `'circle'` | 形状 |
| bg-color | `string` | - | 背景颜色 |

---

### Tag 标签

**基础用法**

```vue
<XTag>默认标签</XTag>
<XTag type="primary">主要</XTag>
<XTag type="success">成功</XTag>
<XTag type="warning">警告</XTag>
<XTag type="danger">危险</XTag>
```

**尺寸**

```vue
<XTag size="small">小标签</XTag>
<XTag size="medium">中标签</XTag>
<XTag size="large">大标签</XTag>
```

**可关闭**

```vue
<XTag closable @close="handleClose">可关闭标签</XTag>
```

**自定义颜色**

```vue
<XTag color="#ff6600">橙色标签</XTag>
<XTag color="rgb(0, 128, 255)">蓝色标签</XTag>
```

**属性**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| type | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger'` | `'default'` | 类型 |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | 尺寸 |
| closable | `boolean` | `false` | 是否可关闭 |
| bordered | `boolean` | `true` | 是否有边框 |
| color | `string` | - | 自定义颜色 |

---

### Switch 开关

**基础用法**

```vue
<XSwitch v-model="checked" />
```

**禁用状态**

```vue
<XSwitch v-model="checked" disabled />
```

**尺寸**

```vue
<XSwitch v-model="checked" size="small" />
<XSwitch v-model="checked" size="medium" />
<XSwitch v-model="checked" size="large" />
```

**事件**

```vue
<XSwitch v-model="checked" @change="onChange" />

<script setup>
const onChange = (checked) => {
  console.log('开关状态:', checked)
}
</script>
```

**属性**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| checked / v-model | `boolean` | `false` | 是否选中 |
| disabled | `boolean` | `false` | 是否禁用 |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | 尺寸 |

---

### Progress 进度条

**基础用法**

```vue
<XProgress :percent="30" />
```

**显示文字**

```vue
<XProgress :percent="75" show-text />
<XProgress :percent="75" :show-text="false" />
```

**类型**

```vue
<XProgress :percent="50" type="line" />
<XProgress :percent="50" type="circle" />
```

**尺寸**

```vue
<XProgress :percent="60" size="small" />
<XProgress :percent="60" size="medium" />
<XProgress :percent="60" size="large" />
```

**条纹动画**

```vue
<XProgress :percent="70" striped animated />
```

**属性**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| percent | `number` | `0` | 进度值(0-100) |
| type | `'line' \| 'circle'` | `'line'` | 类型 |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | 尺寸 |
| show-text | `boolean` | `false` | 是否显示进度文字 |
| striped | `boolean` | `false` | 是否条纹 |
| animated | `boolean` | `false` | 是否动画 |

---

### Loading 加载

**基础用法**

```vue
<XLoading />
```

**带文字**

```vue
<XLoading text="加载中..." />
```

**全屏加载**

```vue
<XLoading :fullscreen="true" text="页面加载中..." />
```

**属性**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| text | `string` | - | 加载文本 |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | 尺寸 |
| fullscreen | `boolean` | `false` | 是否全屏 |

---

### Divider 分割线

**基础用法**

```vue
<text>上文</text>
<XDivider />
<text>下文</text>
```

**带文字**

```vue
<XDivider title="或" />
```

**垂直分割**

```vue
<text>选项1</text>
<XDivider type="vertical" />
<text>选项2</text>
<XDivider type="vertical" />
<text>选项3</text>
```

**对齐方式**

```vue
<XDivider title="居中" orientation="center" />
<XDivider title="左侧" orientation="left" />
<XDivider title="右侧" orientation="right" />
```

**属性**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| type | `'horizontal' \| 'vertical'` | `'horizontal'` | 方向 |
| orientation | `'left' \| 'center' \| 'right'` | `'center'` | 文字对齐 |
| title | `string` | - | 分割线文字 |
| color | `string` | `'#f0f0f0'` | 颜色 |

---

### NavBar 导航栏

**基础用法**

```vue
<XNavBar title="页面标题" />
```

**显示返回按钮**

```vue
<XNavBar title="详情页" show-back @back="handleBack" />
```

**固定顶部**

```vue
<XNavBar title="固定导航" fixed />
```

**自定义颜色**

```vue
<XNavBar title="自定义颜色" bg-color="#1677ff" />
```

**左右插槽**

```vue
<XNavBar title="自定义导航">
  <template #left>
    <view class="back-btn" @click="handleBack">返回</view>
  </template>
  <template #right>
    <view class="share-btn">分享</view>
  </template>
</XNavBar>
```

**属性**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | `string` | - | 导航标题 |
| show-back | `boolean` | `false` | 是否显示返回按钮 |
| fixed | `boolean` | `false` | 是否固定顶部 |
| bg-color | `string` | `'#fff'` | 背景颜色 |

---

### Popup 弹出层

**基础用法**

```vue
<XPopup v-model:visible="showPopup" title="弹出框标题">
  <view>这是弹出内容</view>
</XPopup>
```

**位置**

```vue
<XPopup v-model:visible="showPopup" position="bottom">底部弹出</XPopup>
<XPopup v-model:visible="showPopup" position="top">顶部弹出</XPopup>
<XPopup v-model:visible="showPopup" position="left">左侧弹出</XPopup>
<XPopup v-model:visible="showPopup" position="right">右侧弹出</XPopup>
<XPopup v-model:visible="showPopup" position="center">居中弹出</XPopup>
```

**尺寸**

```vue
<XPopup v-model:visible="showPopup" size="small">小尺寸</XPopup>
<XPopup v-model:visible="showPopup" size="medium">中尺寸</XPopup>
<XPopup v-model:visible="showPopup" size="large">大尺寸</XPopup>
<XPopup v-model:visible="showPopup" size="full">全屏</XPopup>
```

**点击遮罩关闭**

```vue
<XPopup v-model:visible="showPopup" :mask-closable="true">
  <view>点击遮罩关闭</view>
</XPopup>
```

**属性**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| visible / v-model:visible | `boolean` | `false` | 是否显示 |
| position | `'bottom' \| 'top' \| 'left' \| 'right' \| 'center'` | `'bottom'` | 弹出位置 |
| size | `'small' \| 'medium' \| 'large' \| 'full'` | `'medium'` | 弹出尺寸 |
| title | `string` | - | 标题 |
| closable | `boolean` | `true` | 是否显示关闭按钮 |
| mask-closable | `boolean` | `true` | 点击遮罩是否关闭 |
| show-header | `boolean` | `false` | 是否显示头部 |

---

### VirtualList 虚拟列表

**基础用法**

```vue
<XVirtualList
  :data-source="longList"
  :item-size="60"
  :height="400"
>
  <template #item="{ item, index }">
    <view class="list-item">
      <text>{{ item.title }}</text>
    </view>
  </template>
</XVirtualList>

<script setup>
const longList = Array.from({ length: 1000 }, (_, i) => ({
  id: i,
  title: `列表项 ${i + 1}`,
}))
</script>
```

**属性**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| data-source | `T[]` | `[]` | 数据源 |
| item-size | `number` | `60` | 每项高度(px) |
| height | `number` | `400` | 列表容器高度(px) |
| buffer-size | `number` | `5` | 缓冲数量 |

---

### Image 图片

**基础用法**

```vue
<XImage src="/assets/logo.png" />
```

**填充模式**

```vue
<XImage src="/assets/logo.png" mode="aspectFit" />
<XImage src="/assets/logo.png" mode="aspectFill" />
<XImage src="/assets/logo.png" mode="scaleToFill" />
<XImage src="/assets/logo.png" mode="widthFix" />
<XImage src="/assets/logo.png" mode="heightFix" />
```

**懒加载**

```vue
<XImage src="/assets/logo.png" lazy-load />
```

**圆角/圆形**

```vue
<XImage src="/assets/logo.png" shape="round" />
<XImage src="/assets/logo.png" shape="rounded" :border-radius="8" />
```

**属性**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| src | `string` | - | 图片地址 |
| alt | `string` | - | 占位文本 |
| mode | `'scaleToFill' \| 'aspectFit' \| 'aspectFill' \| 'widthFix' \| 'heightFix'` | `'scaleToFill'` | 填充模式 |
| lazy-load | `boolean` | `false` | 是否懒加载 |
| shape | `'square' \| 'rounded' \| 'circle'` | `'square'` | 形状 |
| width | `string \| number` | - | 宽度 |
| height | `string \| number` | - | 高度 |

---

### XSwiper 轮播图

**基础用法**

```vue
<XSwiper height="180px">
  <XSwiperItem>
    <XImage src="/banner1.jpg" width="100%" height="100%" mode="aspectFill" />
  </XSwiperItem>
  <XSwiperItem>
    <XImage src="/banner2.jpg" width="100%" height="100%" mode="aspectFill" />
  </XSwiperItem>
  <XSwiperItem>
    <XImage src="/banner3.jpg" width="100%" height="100%" mode="aspectFill" />
  </XSwiperItem>
</XSwiper>
```

**关闭自动播放**

```vue
<XSwiper height="160px" :autoplay="false" :show-arrow="true">
  <XSwiperItem>
    <XImage src="/slide1.jpg" width="100%" height="100%" mode="aspectFill" />
  </XSwiperItem>
  <XSwiperItem>
    <XImage src="/slide2.jpg" width="100%" height="100%" mode="aspectFill" />
  </XSwiperItem>
</XSwiper>
```

**属性**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| modelValue | `number` | `0` | 当前激活索引 |
| autoplay | `boolean` | `true` | 是否自动播放 |
| interval | `number` | `3000` | 自动播放间隔(ms) |
| duration | `number` | `300` | 切换动画时长(ms) |
| height | `string` | `'200px'` | 轮播高度 |
| showDots | `boolean` | `true` | 是否显示指示点 |
| showArrow | `boolean` | `false` | 是否显示箭头 |
| loop | `boolean` | `true` | 是否循环播放 |

**事件**

| 事件 | 参数 | 说明 |
|------|------|------|
| change | `(index: number)` | 切换时触发 |

**功能**
- 触摸滑动切换
- 自动播放
- 指示点导航
- 左右箭头导航
- 支持循环播放

---

### XBanner 通知条

**基础用法**

```vue
<XBanner title="Information" description="This is an informational banner" icon="ℹ" variant="info" />
<XBanner title="Success" description="Operation completed successfully" icon="✓" variant="success" />
<XBanner title="Warning" description="Please check your input" icon="⚠" variant="warning" />
<XBanner title="Error" description="Something went wrong" icon="✕" variant="error" />
```

**可关闭**

```vue
<XBanner title="Warning" description="Warning message" icon="⚠" variant="warning" show-close @close="handleClose" />
```

**带操作按钮**

```vue
<XBanner description="Banner with action" icon="📢" variant="info" action-text="View" @action="handleClick" />
```

**自定义操作**

```vue
<XBanner title="Custom" description="With custom action slot" variant="success">
  <template #action>
    <XButton size="small" type="success">立即查看</XButton>
  </template>
</XBanner>
```

**属性**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | `string` | - | 标题 |
| description | `string` | - | 描述文本 |
| icon | `string` | - | 图标 |
| variant | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | 通知类型 |
| showClose | `boolean` | `false` | 是否显示关闭按钮 |
| actionText | `string` | - | 操作按钮文字 |

**事件**

| 事件 | 参数 | 说明 |
|------|------|------|
| close | `()` | 点击关闭时触发 |
| action | `()` | 点击操作按钮时触发 |

**插槽**

| 插槽 | 说明 |
|------|------|
| action | 自定义操作区域 |

---

### XTabBar 底部菜单

**基础用法（默认4个Tab）**

```vue
<XTabBar v-model="activeTab" />

<script setup>
const activeTab = ref('home')
</script>
```

**自定义 Tab 列表**

```vue
<XTabBar
  v-model="activeTab"
  :tabs="customTabs"
/>

<script setup>
const activeTab = ref('home')
const customTabs = [
  { key: 'home', label: '首页', icon: '🏠' },
  { key: 'message', label: '消息', icon: '💬' },
  { key: 'discover', label: '发现', icon: '🔍' },
  { key: 'mine', label: '我的', icon: '👤' },
]
</script>
```

**带徽标**

```vue
<XTabBar
  v-model="activeTab"
  :tabs="tabsWithBadge"
/>

<script setup>
const activeTab = ref('home')
const tabsWithBadge = [
  { key: 'home', label: '首页', icon: '🏠' },
  { key: 'message', label: '消息', icon: '💬', badge: 5 },
  { key: 'discover', label: '发现', icon: '🔍', dot: true },
  { key: 'mine', label: '我的', icon: '👤' },
]
</script>
```

**自定义颜色**

```vue
<XTabBar
  v-model="activeTab"
  active-color="#52c41a"
  inactive-color="#999"
  bg-color="#fff"
/>
```

**非固定模式**

```vue
<XTabBar v-model="activeTab" :fixed="false" />
```

**属性**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| modelValue | `string` | - | 当前选中的 tab key |
| tabs | `TabBarItem[]` | 默认4个 | Tab 列表配置 |
| fixed | `boolean` | `true` | 是否固定在底部 |
| bgColor | `string` | `'#fff'` | 背景色 |
| activeColor | `string` | `'#1677ff'` | 选中时颜色 |
| inactiveColor | `string` | `'#999'` | 未选中颜色 |

**TabBarItem 类型**

```ts
interface TabBarItem {
  key: string         // 唯一标识
  label: string       // 显示文字
  icon: string        // 图标
  activeIcon?: string // 选中时图标
  badge?: number      // 数字徽标
  dot?: boolean       // 红点徽标
}
```

**事件**

| 事件 | 参数 | 说明 |
|------|------|------|
| update:modelValue | `(value: string)` | 切换时触发 |
| change | `(value: string, index: number)` | 切换时触发 |

**功能**
- 固定底部显示
- 自定义图标和文字
- 数字徽标（>99 显示 99+）
- 红点徽标
- 可配置颜色

---

### ErrorBoundary 错误边界

**基础用法**

```vue
<XErrorBoundary @error="onError">
  <SomeComponent />
</XErrorBoundary>

<script setup>
const onError = (error, instance, info) => {
  console.error('捕获到错误:', error)
}
</script>
```

**自定义降级 UI**

```vue
<XErrorBoundary fallback="加载失败，点击重试" @retry="handleRetry">
  <SomeComponent />
</XErrorBoundary>

<XErrorBoundary @error="onError">
  <template #fallback>
    <view class="custom-fallback">
      <text>出错了</text>
      <XButton @click="handleRetry">重试</XButton>
    </view>
  </template>
  <SomeComponent />
</XErrorBoundary>
```

**手动重置**

```vue
<XErrorBoundary ref="errorBoundary">
  <SomeComponent />
</XErrorBoundary>

// 手动重置
errorBoundary.value.reset()
```

**属性**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| fallback | `string` | `'Something went wrong'` | 降级文案 |

**事件**

| 事件 | 参数 | 说明 |
|------|------|------|
| error | `(error: Error, instance: any, info: string)` | 捕获错误时触发 |

---

## 动画系统

### XAnimation 组件

**基础用法**

```vue
<XAnimation type="fade">
  <view v-if="visible">淡入淡出</view>
</XAnimation>

<XAnimation type="slide-up">
  <view v-if="visible">上滑进入</view>
</XAnimation>
```

**动画类型**

| 类型 | 说明 |
|------|------|
| `fade` | 淡入淡出 |
| `slide-up` | 从下方滑入 |
| `slide-down` | 从上方滑入 |
| `slide-left` | 从右侧滑入 |
| `slide-right` | 从左侧滑入 |
| `zoom` | 缩放 |
| `scale` | 缩放（与 zoom 类似） |
| `bounce` | 弹跳 |
| `flip` | 翻转 |
| `rotate` | 旋转 |

**自定义时长**

```vue
<XAnimation type="fade" :duration="500">
  <view>500ms 动画</view>
</XAnimation>
```

**组合动画**

```vue
<XAnimation type="fade" :duration="300">
  <XAnimation type="slide-up" :duration="500">
    <view>两个动画组合</view>
  </XAnimation>
</XAnimation>
```

**属性**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| type | 动画类型字符串 | - | 动画类型 |
| duration | `number` | `300` | 动画时长(ms) |
| appear | `boolean` | `false` | 是否应用初始动画 |

---

### useAnimation Composable

**基础用法**

```vue
<script setup>
import { useAnimation } from '@xui/animations'

const { elementRef, fadeIn, fadeOut, stop } = useAnimation()

// 绑定到元素
const handleClick = async () => {
  await fadeIn()
  // 动画完成
}
</script>

<template>
  <view :ref="elementRef" class="box">动画元素</view>
  <XButton @click="handleClick">执行动画</XButton>
</template>
```

**内置动画方法**

| 方法 | 说明 |
|------|------|
| `fadeIn()` | 淡入 |
| `fadeOut()` | 淡出 |
| `slideIn(direction)` | 滑动进入（up/down/left/right） |
| `scaleIn()` | 缩放进入 |
| `stop()` | 停止动画 |

**完整示例**

```vue
<script setup>
import { useAnimation } from '@xui/animations'

const {
  elementRef,
  isAnimating,
  fadeIn,
  fadeOut,
  slideIn,
  scaleIn,
  animate,
  stop,
  reset,
} = useAnimation({
  duration: 300,
  easing: 'ease-out',
})

const handleFadeIn = () => fadeIn()
const handleSlideUp = () => slideIn('up')
const handleCustom = () => {
  animate([
    { opacity: 0, transform: 'translateY(20px)' },
    { opacity: 1, transform: 'translateY(0)' },
  ])
}
</script>

<template>
  <view :ref="elementRef" class="animated-box">内容</view>
  <XButton @click="handleFadeIn" :disabled="isAnimating">淡入</XButton>
  <XButton @click="handleSlideUp" :disabled="isAnimating">上滑</XButton>
  <XButton @click="handleCustom" :disabled="isAnimating">自定义动画</XButton>
  <XButton @click="stop">停止</XButton>
</template>
```

---

### useStaggerAnimation 列表交错动画

**基础用法**

```vue
<script setup>
import { useStaggerAnimation } from '@xui/animations'

const {
  visibleItems,
  showAll,
  hideAll,
  showItem,
  hideItem,
} = useStaggerAnimation(5, {
  staggerDelay: 50,  // 每个元素延迟 50ms
  duration: 300,
})
</script>

<template>
  <view v-for="item in visibleItems" :key="item.id" class="list-item">
    {{ item.name }}
  </view>
  <XButton @click="showAll">显示全部</XButton>
  <XButton @click="hideAll">隐藏全部</XButton>
</template>
```

---

## 主题系统

### 快速开始

```ts
import { useTheme } from '@xui/themes'

const { isDark, setMode, setColor } = useTheme()

// 切换主题模式
setMode('light')   // 亮色模式
setMode('dark')    // 暗色模式
setMode('auto')    // 跟随系统

// 切换主题色
setColor('blue')   // 蓝色（默认）
setColor('green')  // 绿色
setColor('purple') // 紫色
setColor('orange') // 橙色
setColor('red')    // 红色
```

### 主题配置

```ts
import { useTheme } from '@xui/themes'

const {
  config,
  isDark,
  setMode,
  setColor,
  setBorderRadius,
  setFontSize,
  setCustomVar,
  reset,
} = useTheme({
  mode: 'light',
  color: 'blue',
  borderRadius: 'md',  // 'sm' | 'md' | 'lg'
  fontSize: 'normal',  // 'compact' | 'normal' | 'relaxed'
})
```

### CSS 变量

XUI 使用 CSS 变量实现主题，可以在任何 CSS 中使用：

```css
/* 颜色 */
.my-component {
  color: var(--xui-color-primary);
  background: var(--xui-color-primary-bg);
}

/* 圆角 */
.card {
  border-radius: var(--xui-border-radius-md);
}

/* 字体 */
.text {
  font-size: var(--xui-font-size-md);
  font-family: var(--xui-font-family);
}

/* 阴影 */
.box {
  box-shadow: var(--xui-shadow-md);
}

/* 间距 */
.spacing {
  padding: var(--xui-spacing-md);
}
```

**颜色变量**

| 变量 | 说明 |
|------|------|
| `--xui-color-primary` | 主色 |
| `--xui-color-primary-hover` | 主色悬停 |
| `--xui-color-primary-active` | 主色激活 |
| `--xui-color-primary-bg` | 主色背景 |
| `--xui-color-success` | 成功色 |
| `--xui-color-warning` | 警告色 |
| `--xui-color-danger` | 危险色 |
| `--xui-color-text` | 主文本色 |
| `--xui-color-text-secondary` | 次要文本 |
| `--xui-color-text-placeholder` | 占位文本 |
| `--xui-color-bg` | 背景色 |
| `--xui-color-bg-secondary` | 次要背景 |
| `--xui-color-border` | 边框色 |

---

## 国际化

### 设置语言

```ts
import { setLocale, getLocale, t } from '@xui/core'

// 设置语言
setLocale('zh-CN')  // 简体中文
setLocale('en-US')  // 英文
setLocale('ja-JP')   // 日语
setLocale('ko-KR')   // 韩语

// 获取当前语言
console.log(getLocale())  // 'zh-CN'

// 翻译
console.log(t('xui.button.loading'))  // '加载中...'
console.log(t('xui.input.placeholder'))  // '请输入'
```

### 自定义语言

```ts
import { addLocale, setLocale, LocaleMessages } from '@xui/core'

const customLocale: LocaleMessages = {
  'xui.button.loading': 'Chargement...',
  'xui.input.placeholder': 'Entrez le texte...',
}

addLocale({
  name: 'fr-FR',
  messages: customLocale,
})

setLocale('fr-FR')
```

### 合并翻译

```ts
import { mergeMessages } from '@xui/core'

mergeMessages({
  'xui.button.loading': 'Loading...',
  'xui.form.required': 'This field is required',
})
```

### 组件中使用

```vue
<script setup lang="ts">
import { t } from '@xui/core'

const loadingText = t('xui.button.loading')
const placeholder = t('xui.input.placeholder')
</script>

<template>
  <XButton loading>{{ loadingText }}</XButton>
  <XInput :placeholder="placeholder" />
</template>
```

### 内置翻译 Key

| Key | 说明 |
|-----|------|
| `xui.button.loading` | 按钮加载中 |
| `xui.input.placeholder` | 输入框占位符 |
| `xui.select.placeholder` | 选择器占位符 |
| `xui.select.empty` | 选择器空选项 |
| `xui.datePicker.title` | 日期选择器标题 |
| `xui.datePicker.placeholder` | 日期选择器占位符 |
| `xui.picker.cancel` | 选择器取消 |
| `xui.picker.confirm` | 选择器确认 |
| `xui.modal.cancel` | 模态框取消 |
| `xui.modal.confirm` | 模态框确认 |
| `xui.table.empty` | 表格空数据 |
| `xui.form.required` | 表单必填提示 |
| `xui.form.validateFail` | 表单验证失败 |
| `xui.loading.text` | 加载文本 |

---

## CLI 工具

### 创建项目

```bash
# 创建 Web 项目
xui create my-web-app --template web

# 创建小程序项目
xui create my-mini-app --template mini

# 创建 FMX 项目
xui create my-fmx-app --template fmx
```

### 开发服务器

```bash
# 启动 Web 开发服务器
xui dev

# 指定端口
xui dev --port 3000

# 指定主机（暴露到网络）
xui dev --host

# 指定目标平台
xui dev --target mini
```

### 构建

```bash
# 构建 Web
xui build --target web

# 构建小程序
xui build --target mini

# 构建 FMX
xui build --target fmx

# 指定输出目录
xui build --target web --out-dir dist
```

---

## 小程序开发

### 配置

在 `vite.config.ts` 中配置小程序编译：

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { xuiCompiler } from '@xui/compiler'

export default defineConfig({
  plugins: [
    vue(),
    xuiCompiler({
      target: 'mini',
      unitRatio: 2,  // 设计稿宽度 / 375
    }),
  ],
})
```

### 页面配置

```json
{
  "pages": [
    "pages/index/main",
    "pages/detail/main",
    "pages/user/main"
  ],
  "window": {
    "navigationBarTitleText": "XUI App",
    "navigationBarBackgroundColor": "#ffffff",
    "backgroundColor": "#f5f5f5"
  },
  "tabBar": {
    "color": "#666666",
    "selectedColor": "#1677ff",
    "backgroundColor": "#ffffff",
    "list": [
      { "pagePath": "pages/index/main", "text": "首页" },
      { "pagePath": "pages/user/main", "text": "我的" }
    ]
  }
}
```

### TabBar 页面

确保 TabBar 页面放在 `pages` 目录下，非 TabBar 页面放在其他目录。

### 组件注册

小程序需要注册使用到的 XUI 组件：

```json
{
  "usingComponents": {
    "x-button": "@xui/components/dist/button/index",
    "x-input": "@xui/components/dist/input/index",
    "x-modal": "@xui/components/dist/modal/index"
  }
}
```

---

## FMX 集成

### Delphi 端配置

1. 在 FireMonkey 项目中添加 `EdgeBrowser` 组件
2. 设置 `WebBrowserKind` 为 `Edge`
3. 订阅 `OnWebMessageReceived` 事件

```delphi
procedure TForm1.EdgeBrowser1WebMessageReceived(Sender: TCustomEdgeBrowser;
  const AWebMessage: string);
var
  LJson: TJSONValue;
  LMessageType: string;
  LPayload: TJSONObject;
  LId: string;
begin
  LJson := TJSONObject.ParseJSONValue(AWebMessage);
  if LJson = nil then Exit;

  try
    LMessageType := LJson.GetValue<string>('type');
    LPayload := LJson.GetValue<TJSONObject>('payload');
    LId := LJson.GetValue<string>('_id');

    if LMessageType = 'request' then
      HandleRequest(LPayload, LId)
    else if LMessageType = 'storage_get' then
      HandleStorageGet(LPayload, LId)
    else if LMessageType = 'storage_set' then
      HandleStorageSet(LPayload, LId);
  finally
    LJson.Free;
  end;
end;
```

### JavaScript 端调用

```ts
import { initFmxEnvironment, getFmxBridge } from '@xui/runtime-fmx'

// 初始化
initFmxEnvironment()

// 获取桥接器
const bridge = getFmxBridge()

// 网络请求
const data = await bridge.invoke('request', {
  url: 'https://api.example.com/data',
  method: 'GET',
})

// 存储
await bridge.invoke('storage_set', { key: 'user', value: { name: 'Alice' } })
const user = await bridge.invoke('storage_get', { key: 'user' })

// 导航
bridge.send('nav_push', { url: '/detail' })
bridge.send('nav_back', { delta: 1 })

// 监听消息
bridge.onMessage('notification', (payload) => {
  console.log('收到通知:', payload)
})

bridge.offMessage('notification')
```

### FMX 平台 API

| API | 说明 |
|-----|------|
| `bridge.invoke('request', options)` | 发送请求，返回 Promise |
| `bridge.invoke('storage_get', { key })` | 获取存储 |
| `bridge.invoke('storage_set', { key, value })` | 设置存储 |
| `bridge.invoke('storage_remove', { key })` | 删除存储 |
| `bridge.invoke('storage_clear')` | 清空存储 |
| `bridge.send('nav_push', { url })` | 导航到新页面 |
| `bridge.send('nav_replace', { url })` | 替换当前页面 |
| `bridge.send('nav_back', { delta })` | 返回 |
| `bridge.onMessage(type, callback)` | 监听消息 |
| `bridge.offMessage(type)` | 取消监听 |

---

## 常见问题

### Q: 如何处理平台差异？

使用 `platform` 对象判断平台：

```ts
import { platform } from '@xui/core'

if (platform.isWeb) {
  // Web 特有逻辑
} else if (platform.isMini) {
  // 小程序特有逻辑
} else if (platform.isFmx) {
  // FMX 特有逻辑
}
```

### Q: 如何在运行时切换平台？

```ts
import { setPlatform } from '@xui/core'

setPlatform('mini')  // 手动设置
```

### Q: 如何自定义编译输出？

在 `vite.config.ts` 中配置：

```ts
xuiCompiler({
  target: 'web',
  autoPlatform: true,
  unitRatio: 2,
})
```

### Q: 如何调试小程序？

使用微信开发者工具打开编译输出目录，在工具中进行调试。

### Q: 如何在非 Vue 文件中使用 i18n？

```ts
import { t } from '@xui/core'

const text = t('xui.button.loading')
```

---

## API 参考

### @xui/core

| 导出 | 类型 | 说明 |
|------|------|------|
| `platform` | `PlatformAPI` | 平台 API |
| `getPlatform` | `() => PlatformAPI` | 获取平台实例 |
| `setPlatform` | `(name: PlatformName) => void` | 设置平台 |
| `setLocale` | `(locale: Locale) => void` | 设置语言 |
| `getLocale` | `() => Locale` | 获取当前语言 |
| `t` | `(key: string) => string` | 翻译函数 |
| `addLocale` | `(locale: XuiLocale) => void` | 添加语言 |
| `mergeMessages` | `(messages: LocaleMessages) => void` | 合并翻译 |
| `ref, computed, watch...` | Vue 响应式 API | Vue 组合式 API |

### @xui/components

所有组件默认导出，详见上方组件文档。

### @xui/animations

| 导出 | 类型 | 说明 |
|------|------|------|
| `XAnimation` | `Component` | 动画组件 |
| `useAnimation` | `Composable` | 动画 Composable |
| `useStaggerAnimation` | `Composable` | 列表交错动画 |

### @xui/themes

| 导出 | 类型 | 说明 |
|------|------|------|
| `useTheme` | `Composable` | 主题 Composable |
| `applyThemeDirectly` | `(config: Partial<ThemeConfig>) => void` | 直接应用主题 |

### @xui/compiler

| 导出 | 类型 | 说明 |
|------|------|------|
| `xuiCompiler` | `VitePlugin` | Vite 插件 |
| `transformSFC` | `(options: TransformOptions) => TransformResult` | SFC 转换 |
| `transformCss` | `(css: string, target: TargetPlatform) => string` | CSS 转换 |
| `transformHtml` | `(html: string, target: TargetPlatform) => string` | HTML 转换 |

---

**版本**: 0.1.0  
**最后更新**: 2026-04-01
