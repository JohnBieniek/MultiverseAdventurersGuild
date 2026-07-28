import { execFileSync } from 'node:child_process'
import fs from 'node:fs'

if (fs.existsSync(new URL('../.git', import.meta.url))) {
  execFileSync('git', ['config', 'core.hooksPath', '.githooks'], { stdio: 'inherit' })
}
