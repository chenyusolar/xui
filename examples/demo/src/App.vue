<template>
  <view class="demo-app">
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

    <XCard title="Modal" class="demo-section">
      <XButton type="primary" @click="showModal = true">Open Modal</XButton>
      <XModal v-model:visible="showModal" title="XUI Modal">
        <text>This is a modal dialog component.</text>
      </XModal>
    </XCard>

    <XCard title="Divider" class="demo-section">
      <text>Content above</text>
      <XDivider title="Section" />
      <text>Content below</text>
    </XCard>

    <view class="demo-footer">
      <text class="demo-footer-text">Built with XUI Framework</text>
    </view>
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
</style>
