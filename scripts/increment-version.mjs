import fs from 'node:fs'

const versionFile = new URL('../src/data/appVersion.js', import.meta.url)
const source = fs.readFileSync(versionFile, 'utf8')
const match = source.match(/appVersion = 'v(\d+)\.(\d+)\.(\d+)'/)

if (!match) {
  throw new Error('Could not read the app version from src/data/appVersion.js')
}

const [, major, minor, patch] = match
const nextVersion = `v${major}.${minor}.${Number(patch) + 1}`

if (process.argv.includes('--check')) {
  console.log(`Next app version: ${nextVersion}`)
} else {
  fs.writeFileSync(versionFile, `const appVersion = '${nextVersion}'\n\nexport default appVersion\n`)
  console.log(`App version incremented to ${nextVersion}`)
}
