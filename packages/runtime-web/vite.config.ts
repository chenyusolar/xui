import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [vue(), dts()],
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['vue', '@xui/core'],
      output: {
        globals: { vue: 'Vue', '@xui/core': 'XuiCore' },
      },
    },
  },
})
