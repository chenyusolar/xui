import { resolve } from 'node:path'
import { existsSync } from 'node:fs'
import { execSync } from 'node:child_process'
import chalk from 'chalk'
import ora from 'ora'

export async function buildProject(options: { target?: string; outDir?: string }) {
  const { target = 'web', outDir = 'dist' } = options
  const cwd = process.cwd()

  const viteConfig = findViteConfig(cwd)
  if (!viteConfig) {
    console.error(chalk.red('No vite.config.ts found! Please run this command in an XUI project.'))
    process.exit(1)
  }

  const spinner = ora(`Building for ${target}...`).start()

  try {
    process.env.XUI_TARGET = target

    const outDirFlag = target === 'mini' ? 'dist-mini' : outDir

    execSync(`vite build --outDir ${outDirFlag}`, {
      stdio: 'inherit',
      env: { ...process.env, XUI_TARGET: target },
    })

    spinner.succeed(chalk.green(`Build completed for ${target}!`))
    console.log(chalk.cyan(`\nOutput directory: ${outDirFlag}/`))

    if (target === 'mini') {
      console.log(chalk.yellow('\nMini Program build complete!'))
      console.log(chalk.white('Open the dist-mini/ folder in WeChat DevTools.'))
    } else if (target === 'fmx') {
      console.log(chalk.yellow('\nFMX WebView build complete!'))
      console.log(chalk.white('Point your EdgeBrowser to the dist/ folder.'))
    }

  } catch (error) {
    spinner.fail(chalk.red('Build failed'))
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
