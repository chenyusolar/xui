#!/usr/bin/env node

import { Command } from 'commander'
import { createProject } from '../dist/commands/create.js'
import { buildProject } from '../dist/commands/build.js'
import { devProject } from '../dist/commands/dev.js'

const program = new Command()

program
  .name('xui')
  .description('XUI - Cross-platform UI framework CLI')
  .version('0.1.0')

program
  .command('create <name>')
  .description('Create a new XUI project')
  .option('-t, --template <type>', 'Project template (web, fmx, mini)', 'web')
  .action(createProject)

program
  .command('build')
  .description('Build the project for target platform')
  .option('--target <platform>', 'Target platform (web, fmx, mini)', 'web')
  .option('--out-dir <dir>', 'Output directory', 'dist')
  .action(buildProject)

program
  .command('dev')
  .description('Start development server')
  .option('--target <platform>', 'Target platform (web, fmx, mini)', 'web')
  .option('--port <port>', 'Development server port', '5173')
  .option('--host', 'Expose to network', false)
  .action(devProject)

program.parse()
