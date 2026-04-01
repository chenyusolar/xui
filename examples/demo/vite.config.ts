import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { xuiCompiler } from '@xui/compiler'

export default defineConfig({
  plugins: [
    vue(),
    xuiCompiler({
      autoPlatform: true,
    }),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
