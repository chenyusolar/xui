import { resolve } from 'node:path'
import { existsSync } from 'node:fs'
import { execSync } from 'node:child_process'
import chalk from 'chalk'

export async function devProject(options: { target?: string; port?: string; host?: boolean }) {
  const { target = 'web', port = '5173', host = false } = options
  const cwd = process.cwd()

  const viteConfig = findViteConfig(cwd)
  if (!viteConfig) {
    console.error(chalk.red('No vite.config.ts found! Please run this command in an XUI project.'))
    process.exit(1)
  }

  console.log(chalk.cyan(`\nStarting XUI dev server (target: ${target})...`))
  console.log(chalk.gray(`http://localhost:${port}\n`))

  const hostFlag = host ? '--host' : ''

  try {
    execSync(`vite --port ${port} ${hostFlag}`, {
      stdio: 'inherit',
      env: { ...process.env, XUI_TARGET: target },
    })
  } catch (error) {
    console.error(chalk.red('Dev server failed'))
    console.error(error)
    process.exit(1)
  }
}

function findViteConfig(cwd: string): string | null {
  const candidates = ['vite.config.ts', 'vite.config.js', 'vite.config.mts']
  for (const file of candidates) {
    const path = resolve(cwd, file)
    if (existsSync(path)) return path
  }
  return null
}
