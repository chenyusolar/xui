import { createWriteStream, existsSync, writeFileSync } from 'node:fs'
import { mkdir, readdir, copyFile } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import chalk from 'chalk'
import ora from 'ora'

export async function createProject(name: string, options: { template?: string }) {
  const { template = 'web' } = options
  const targetDir = resolve(process.cwd(), name)

  if (existsSync(targetDir)) {
    console.error(chalk.red(`Directory ${name} already exists!`))
    process.exit(1)
  }

  const spinner = ora('Creating XUI project...').start()

  try {
    await mkdir(targetDir, { recursive: true })
    await mkdir(join(targetDir, 'src'), { recursive: true })
    await mkdir(join(targetDir, 'public'), { recursive: true })

    const files = generateProjectFiles(name, template)

    for (const [filename, content] of Object.entries(files)) {
      const filePath = join(targetDir, filename)
      const dir = filePath.substring(0, filePath.lastIndexOf('/'))
      await mkdir(dir, { recursive: true })
      writeFileSync(filePath, content)
    }

    spinner.succeed(chalk.green(`Project ${name} created successfully!`))

    console.log(chalk.cyan('\nNext steps:'))
    console.log(chalk.white(`  cd ${name}`))
    console.log(chalk.white('  pnpm install'))
    console.log(chalk.white('  pnpm dev\n'))

    console.log(chalk.cyan('Build for different platforms:'))
    console.log(chalk.white('  pnpm build:web    # Web'))
    console.log(chalk.white('  pnpm build:fmx    # FMX WebView'))
    console.log(chalk.white('  pnpm build:mini   # Mini Program\n'))

  } catch (error) {
    spinner.fail(chalk.red('Failed to create project'))
    console.error(error)
    process.exit(1)
  }
}

function generateProjectFiles(name: string, template: string): Record<string, string> {
  return {
    'package.json': JSON.stringify({
      name,
      version: '0.1.0',
      private: true,
      type: 'module',
      scripts: {
        dev: 'xui dev',
        'build:web': 'xui build --target web',
        'build:fmx': 'xui build --target fmx',
        'build:mini': 'xui build --target mini',
      },
      dependencies: {
        vue: '^3.5.0',
        '@xui/core': 'latest',
        '@xui/runtime-web': 'latest',
        '@xui/components': 'latest',
      },
      devDependencies: {
        '@xui/compiler': 'latest',
        '@vitejs/plugin-vue': '^5.2.0',
        vite: '^6.0.0',
        typescript: '^5.7.0',
      },
    }, null, 2),

    'vite.config.ts': `import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { xuiCompiler } from '@xui/compiler'

export default defineConfig({
  plugins: [
    vue(),
    xuiCompiler({
      target: '${template}',
      autoPlatform: true,
    }),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
`,

    'tsconfig.json': JSON.stringify({
      compilerOptions: {
        target: 'ES2020',
        useDefineForClassFields: true,
        module: 'ESNext',
        lib: ['ES2020', 'DOM', 'DOM.Iterable'],
        skipLibCheck: true,
        moduleResolution: 'bundler',
        allowImportingTsExtensions: true,
        isolatedModules: true,
        moduleDetection: 'force',
        noEmit: true,
        jsx: 'preserve',
        strict: true,
        noUnusedLocals: true,
        noUnusedParameters: true,
        noFallthroughCasesInSwitch: true,
      },
      include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.vue'],
    }, null, 2),

    'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${name}</title>
</head>
<body>
  <div id="app"></div>
  <script type="module" src="/src/main.ts"></script>
</body>
</html>
`,

    'src/main.ts': `import { createApp } from 'vue'
import App from './App.vue'
import { setPlatform } from '@xui/core'

setPlatform('${template}')

const app = createApp(App)
app.mount('#app')
`,

    'src/App.vue': `<template>
  <view class="app">
    <XCard title="Welcome to XUI">
      <view class="demo-content">
        <XButton type="primary" @click="handleClick">Click Me</XButton>
        <XInput v-model="text" placeholder="Type something..." />
        <XText>{{ text || 'Hello XUI!' }}</XText>
      </view>
    </XCard>
  </view>
</template>

<script setup lang="ts">
import { ref } from '@xui/core'

const text = ref('')

const handleClick = () => {
  console.log('Button clicked!')
}
</script>

<style>
.app {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.demo-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
`,

    'src/env.d.ts': `/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
`,
  }
}
