<template>
  <view class="demo-app">
    <XNavBar title="XUI Demo" :fixed="false" />

    <view class="demo-header">
      <text class="demo-title">XUI Demo</text>
      <text class="demo-subtitle">Cross-platform UI Framework</text>
    </view>

    <XCard title="Buttons" class="demo-section">
      <view class="demo-row">
        <XButton type="primary">Primary</XButton>
        <XButton type="success">Success</XButton>
        <XButton type="warning">Warning</XButton>
        <XButton type="danger">Danger</XButton>
        <XButton>Default</XButton>
      </view>
      <view class="demo-row">
        <XButton size="small" type="primary">Small</XButton>
        <XButton size="medium" type="primary">Medium</XButton>
        <XButton size="large" type="primary">Large</XButton>
      </view>
      <view class="demo-row">
        <XButton type="primary" loading>Loading</XButton>
        <XButton type="primary" disabled>Disabled</XButton>
        <XButton type="primary" block>Block Button</XButton>
      </view>
    </XCard>

    <XCard title="Inputs" class="demo-section">
      <XInput v-model="textInput" label="Text Input" placeholder="Enter text..." clearable />
      <XInput v-model="emailInput" label="Email" type="email" placeholder="Enter email..." />
      <XInput v-model="passwordInput" label="Password" type="password" placeholder="Enter password..." />
      <XInput label="With Error" placeholder="Invalid input..." error="This field is required" />
    </XCard>

    <XCard title="Tags & Badges" class="demo-section">
      <view class="demo-row">
        <XTag label="Default" />
        <XTag label="Primary" type="primary" />
        <XTag label="Success" type="success" />
        <XTag label="Warning" type="warning" />
        <XTag label="Danger" type="danger" />
      </view>
      <view class="demo-row">
        <XBadge :count="5">
          <XButton type="primary">Messages</XButton>
        </XBadge>
        <XBadge :count="99" :max="99">
          <XButton type="danger">Notifications</XButton>
        </XBadge>
        <XBadge dot>
          <XButton type="success">Updates</XButton>
        </XBadge>
      </view>
    </XCard>

    <XCard title="Avatars" class="demo-section">
      <view class="demo-row">
        <XAvatar name="John Doe" size="small" />
        <XAvatar name="Jane Smith" size="medium" />
        <XAvatar name="Bob Wilson" size="large" />
        <XAvatar icon="👤" bgColor="#52c41a" />
      </view>
      <view class="demo-row">
        <XAvatar name="A" shape="circle" bgColor="#1677ff" />
        <XAvatar name="B" shape="circle" bgColor="#52c41a" />
        <XAvatar name="C" shape="circle" bgColor="#722ed1" />
        <XAvatar name="D" shape="circle" bgColor="#fa8c16" />
        <XAvatar name="E" shape="square" bgColor="#f5222d" />
      </view>
      <view class="demo-row" style="margin-top: 8px;">
        <XAvatar name="张" shape="circle" size="large" bgColor="#1890ff" />
        <XAvatar name="李" shape="circle" size="large" bgColor="#13c2c2" />
        <XAvatar name="王" shape="circle" size="large" bgColor="#722ed1" />
      </view>
    </XCard>

    <XCard title="Switch" class="demo-section">
      <view class="demo-row">
        <XSwitch v-model:checked="switch1" />
        <XSwitch v-model:checked="switch2" size="small" />
        <XSwitch v-model:checked="switch3" disabled />
      </view>
    </XCard>

    <XCard title="Tabs" class="demo-section">
      <XTabs :tabs="tabItems" :active-key="activeTab" @change="activeTab = $event">
        <template #tab-0>
          <text>Tab 1 content - This is the first tab panel.</text>
        </template>
        <template #tab-1>
          <text>Tab 2 content - This is the second tab panel.</text>
        </template>
        <template #tab-2>
          <text>Tab 3 content - This is the third tab panel.</text>
        </template>
      </XTabs>
    </XCard>

    <XCard title="List" class="demo-section">
      <XList :data-source="listData" clickable @item-click="handleItemClick">
        <template #item="{ item }">
          <view class="demo-list-item">
            <XAvatar :name="item.name" size="small" />
            <view class="demo-list-item-content">
              <text class="demo-list-item-title">{{ item.name }}</text>
              <text class="demo-list-item-desc">{{ item.desc }}</text>
            </view>
          </view>
        </template>
      </XList>
    </XCard>

    <XCard title="Grid" class="demo-section">
      <XGrid :data-source="gridData" :columns="3" clickable>
        <template #item="{ item }">
          <view class="demo-grid-item">
            <text class="demo-grid-icon">{{ item.icon }}</text>
            <text class="demo-grid-text">{{ item.label }}</text>
          </view>
        </template>
      </XGrid>
    </XCard>

    <XCard title="Images" class="demo-section">
      <text class="demo-section-title">Normal</text>
      <view class="demo-row">
        <XImage src="https://picsum.photos/200/150" width="120px" height="90px" shape="rounded" />
        <XImage src="https://picsum.photos/201/150" width="120px" height="90px" shape="rounded" />
        <XImage src="https://picsum.photos/202/150" width="120px" height="90px" shape="rounded" />
      </view>
      <text class="demo-section-title">Circle</text>
      <view class="demo-row">
        <XImage src="https://picsum.photos/100/100" width="80px" height="80px" shape="circle" />
        <XImage src="https://picsum.photos/101/100" width="80px" height="80px" shape="circle" />
        <XImage src="https://picsum.photos/102/100" width="80px" height="80px" shape="circle" />
      </view>
      <text class="demo-section-title">Rounded</text>
      <view class="demo-row">
        <XImage src="https://picsum.photos/300/200" width="200px" height="133px" shape="rounded" />
      </view>
      <text class="demo-section-title">Fit Modes</text>
      <view class="demo-row">
        <view class="demo-image-mode">
          <XImage src="https://picsum.photos/200/300" width="120px" height="90px" shape="rounded" mode="aspectFit" />
          <text>aspectFit</text>
        </view>
        <view class="demo-image-mode">
          <XImage src="https://picsum.photos/200/300" width="120px" height="90px" shape="rounded" mode="aspectFill" />
          <text>aspectFill</text>
        </view>
      </view>
    </XCard>

    <XCard title="Modal" class="demo-section">
      <view class="demo-row">
        <XButton type="primary" @click="showModal = true">Open Modal</XButton>
        <XButton type="success" @click="showModalSmall = true">Small Modal</XButton>
        <XButton type="warning" @click="showModalLarge = true">Large Modal</XButton>
      </view>
      <XModal v-model:visible="showModal" title="XUI Modal">
        <text>This is a modal dialog component with zoom animation.</text>
      </XModal>
      <XModal v-model:visible="showModalSmall" title="Small Modal" size="small">
        <text>This is a small modal dialog.</text>
      </XModal>
      <XModal v-model:visible="showModalLarge" title="Large Modal" size="large">
        <text>This is a large modal dialog with more space for content.</text>
        <view class="demo-modal-content">
          <XInput label="Name" placeholder="Enter your name..." />
          <XInput label="Email" placeholder="Enter your email..." />
        </view>
      </XModal>
    </XCard>

    <XCard title="Divider" class="demo-section">
      <text>Content above</text>
      <XDivider title="Section" />
      <text>Content below</text>
    </XCard>

    <XCard title="Swiper / Banner" class="demo-section">
      <text class="demo-section-title">Swiper (Auto Play)</text>
      <XSwiper height="180px" :autoplay="true" :interval="3000">
        <XSwiperItem>
          <XImage src="https://picsum.photos/800/400?random=1" width="100%" height="100%" mode="aspectFill" shape="rounded" />
        </XSwiperItem>
        <XSwiperItem>
          <XImage src="https://picsum.photos/800/400?random=2" width="100%" height="100%" mode="aspectFill" shape="rounded" />
        </XSwiperItem>
        <XSwiperItem>
          <XImage src="https://picsum.photos/800/400?random=3" width="100%" height="100%" mode="aspectFill" shape="rounded" />
        </XSwiperItem>
      </XSwiper>

      <text class="demo-section-title">With Arrows</text>
      <XSwiper height="160px" :autoplay="false" :show-arrow="true">
        <XSwiperItem>
          <XImage src="https://picsum.photos/800/400?random=4" width="100%" height="100%" mode="aspectFill" shape="rounded" />
        </XSwiperItem>
        <XSwiperItem>
          <XImage src="https://picsum.photos/800/400?random=5" width="100%" height="100%" mode="aspectFill" shape="rounded" />
        </XSwiperItem>
      </XSwiper>

      <text class="demo-section-title">Banner Variants</text>
      <view style="display: flex; flex-direction: column; gap: 8px; margin-top: 8px;">
        <XBanner title="Information" description="This is an informational banner" icon="ℹ" variant="info" />
        <XBanner title="Success" description="Operation completed successfully" icon="✓" variant="success" />
        <XBanner title="Warning" description="Please check your input" icon="⚠" variant="warning" />
        <XBanner title="Error" description="Something went wrong" icon="✕" variant="error" show-close />
        <XBanner description="Banner with action button" icon="📢" variant="info" action-text="View" @action="console.log('action clicked')" />
      </view>
    </XCard>

    <XCard title="NavBar" class="demo-section">
      <text class="demo-section-title">Basic</text>
      <view class="demo-navbar-wrapper">
        <XNavBar title="Basic NavBar" :fixed="false" />
      </view>
      <text class="demo-section-title">With Back Button</text>
      <view class="demo-navbar-wrapper">
        <XNavBar title="With Back" :fixed="false" show-back @back="console.log('back')" />
      </view>
      <text class="demo-section-title">Custom Color</text>
      <view class="demo-navbar-wrapper">
        <XNavBar title="Blue Theme" :fixed="false" bg-color="#1677ff" text-color="#fff" />
      </view>
      <text class="demo-section-title">Dark Theme</text>
      <view class="demo-navbar-wrapper">
        <XNavBar title="Dark NavBar" :fixed="false" bg-color="#1f1f1f" text-color="#fff" show-back />
      </view>
    </XCard>

    <XCard title="TabBar" class="demo-section">
      <text class="demo-section-title">Default Tabs</text>
      <XTabBar v-model="activeBottomTab" :fixed="false" />
      <text class="demo-section-title">Custom Tabs</text>
      <XTabBar
        v-model="activeBottomTab2"
        :fixed="false"
        :tabs="customTabs"
        active-color="#52c41a"
      />
    </XCard>

    <view class="demo-footer">
      <text class="demo-footer-text">Built with XUI Framework</text>
    </view>

    <XTabBar v-model="activeBottomTab" :tabs="bottomTabs" @change="handleTabChange" />
  </view>
</template>

<script setup lang="ts">
import { ref } from '@xui/core'

const textInput = ref('')
const emailInput = ref('')
const passwordInput = ref('')
const switch1 = ref(true)
const switch2 = ref(false)
const switch3 = ref(false)
const activeTab = ref(0)
const showModal = ref(false)
const showModalSmall = ref(false)
const showModalLarge = ref(false)
const activeBottomTab = ref('home')
const activeBottomTab2 = ref('home')

const bottomTabs = [
  { key: 'home', label: '首页', icon: '🏠' },
  { key: 'tab1', label: '标签1', icon: '📄' },
  { key: 'tab2', label: '标签2', icon: '📂' },
  { key: 'setting', label: '设置', icon: '⚙️' },
]

const customTabs = [
  { key: 'home', label: '主页', icon: '🏡', dot: false },
  { key: 'tab1', label: '消息', icon: '💬', badge: 5 },
  { key: 'tab2', label: '发现', icon: '🔍', dot: true },
  { key: 'setting', label: '我的', icon: '👤' },
]

const handleTabChange = (key: string, index: number) => {
  console.log('Tab changed:', key, index)
}

const tabItems = [
  { key: 0, label: 'Tab 1' },
  { key: 1, label: 'Tab 2' },
  { key: 2, label: 'Tab 3' },
]

const listData = ref([
  { id: 1, name: 'Alice Johnson', desc: 'Frontend Developer' },
  { id: 2, name: 'Bob Smith', desc: 'Backend Engineer' },
  { id: 3, name: 'Carol White', desc: 'UI/UX Designer' },
  { id: 4, name: 'David Brown', desc: 'Product Manager' },
])

const gridData = ref([
  { id: 1, icon: '📱', label: 'Mobile' },
  { id: 2, icon: '🌐', label: 'Web' },
  { id: 3, icon: '💻', label: 'Desktop' },
  { id: 4, icon: '🎮', label: 'Gaming' },
  { id: 5, icon: '📊', label: 'Analytics' },
  { id: 6, icon: '⚙️', label: 'Settings' },
])

const handleItemClick = (item: any) => {
  console.log('Clicked:', item.name)
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background: #f5f7fa;
  color: #1f1f1f;
}

.demo-app {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.demo-header {
  text-align: center;
  padding: 40px 0;
}

.demo-title {
  font-size: 32px;
  font-weight: 700;
  color: #1677ff;
  display: block;
}

.demo-subtitle {
  font-size: 14px;
  color: #8c8c8c;
  margin-top: 8px;
  display: block;
}

.demo-section {
  margin-bottom: 20px;
}

.demo-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  margin-bottom: 12px;
}

.demo-list-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.demo-list-item-content {
  flex: 1;
}

.demo-list-item-title {
  font-size: 14px;
  font-weight: 500;
  color: #1f1f1f;
  display: block;
}

.demo-list-item-desc {
  font-size: 12px;
  color: #8c8c8c;
  margin-top: 4px;
  display: block;
}

.demo-grid-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  background: #fafafa;
  border-radius: 8px;
  transition: transform 0.2s;
}

.demo-grid-item:hover {
  transform: translateY(-2px);
  background: #f0f0f0;
}

.demo-grid-icon {
  font-size: 24px;
  margin-bottom: 8px;
}

.demo-grid-text {
  font-size: 12px;
  color: #595959;
}

.demo-footer {
  text-align: center;
  padding: 40px 0;
}

.demo-footer-text {
  font-size: 12px;
  color: #bfbfbf;
}

.demo-modal-content {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.demo-section-title {
  font-size: 12px;
  color: #8c8c8c;
  margin-bottom: 8px;
  display: block;
}

.demo-image-mode {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.demo-image-mode text {
  font-size: 11px;
  color: #999;
}

.demo-navbar-wrapper {
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 12px;
}
</style>
