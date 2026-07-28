import fs from 'node:fs'
import { archetypeTraitPools, speciesTraitPools } from '../src/data/randomTraits.js'

const expectedSpecies = ['Cyborg', 'Dwarf', 'Elf', 'Fairy', 'Gnome', 'Giant', 'Halfling', 'Human', 'Orc', 'SAI']
const expectedArchetypes = [
  'Barbarian', 'Bounty Hunter', 'Brainiac', 'Cleric', 'Commando', 'Criminal', 'Druid', 'Eco Terrorist',
  'Ex-Company Man', 'Ex-Cop', 'Ex-Military', 'Face', 'Fixer', 'Ganger', 'Gonzo Journalist', 'Gunslinger',
  'Hacker', 'Mad Bomber', 'Mage', 'Mercenary', 'Monk', 'Ninja', 'Performer', 'Private Eye/Investigator',
  'Screamer', 'Shaman', 'Smuggler', 'Sniper', 'Spy', 'Street Doc', 'Street Samurai', 'Warlock',
]
const normalize = value => value.toLowerCase().normalize('NFKD').replace(/[^\p{L}\p{N}]+/gu, ' ').trim()
const failures = []

const validateCategories = (label, pools, expected) => {
  const actual = Object.keys(pools)
  const missing = expected.filter(name => !actual.includes(name))
  const extra = actual.filter(name => !expected.includes(name))
  if (missing.length) failures.push(`${label} pools missing: ${missing.join(', ')}`)
  if (extra.length) failures.push(`${label} pools unexpected: ${extra.join(', ')}`)
  expected.forEach(name => {
    if (pools[name]?.length !== 10) failures.push(`${label} "${name}" has ${pools[name]?.length ?? 0} traits instead of 10`)
  })
}

validateCategories('Species', speciesTraitPools, expectedSpecies)
validateCategories('Archetype', archetypeTraitPools, expectedArchetypes)

const entries = [
  ...Object.entries(speciesTraitPools).flatMap(([category, traits]) => traits.map(trait => ({ ...trait, pool: `Species/${category}` }))),
  ...Object.entries(archetypeTraitPools).flatMap(([category, traits]) => traits.map(trait => ({ ...trait, pool: `Archetype/${category}` }))),
]
const findDuplicates = field => {
  const seen = new Map()
  entries.forEach(entry => {
    const key = normalize(entry[field])
    if (!seen.has(key)) seen.set(key, [])
    seen.get(key).push(`${entry.pool}: ${entry[field]}`)
  })
  return [...seen.values()].filter(matches => matches.length > 1)
}

for (const field of ['name', 'description']) {
  for (const duplicate of findDuplicates(field)) failures.push(`Duplicate ${field}: ${duplicate.join(' | ')}`)
}
entries.forEach(entry => {
  if (!entry.name?.trim() || !entry.description?.trim()) failures.push(`Blank trait content in ${entry.pool}`)
  if (!/[.!?]$/.test(entry.description)) failures.push(`Description needs terminal punctuation: ${entry.pool}: ${entry.name}`)
})

const titleStopWords = new Set(['a', 'an', 'and', 'as', 'the', 'of', 'before', 'after', 'first', 'last', 'no', 'one', 'only'])
const titleTokenUses = new Map()
entries.forEach(entry => {
  const tokens = normalize(entry.name.replace(/[’']/g, '')).split(' ').filter(token => token && !titleStopWords.has(token))
  new Set(tokens).forEach(token => {
    if (!titleTokenUses.has(token)) titleTokenUses.set(token, [])
    titleTokenUses.get(token).push(`${entry.pool}: ${entry.name}`)
  })
})
for (const [token, uses] of titleTokenUses) {
  if (uses.length > 3) failures.push(`Overused trait-title root "${token}" (${uses.length}): ${uses.join(' | ')}`)
}

const existingRuleNames = new Set(
  ['species.txt', 'archetypes.txt']
    .flatMap(file => fs.readFileSync(new URL(`../src/content/players/${file}`, import.meta.url), 'utf8').split(/\r?\n/))
    .map(line => line.match(/^(.+?)\s+-\s+.+$/)?.[1]?.trim())
    .filter(Boolean)
    .map(normalize),
)
entries.forEach(entry => {
  if (existingRuleNames.has(normalize(entry.name))) failures.push(`New trait repeats an existing rules entry: ${entry.pool}: ${entry.name}`)
})

if (failures.length) {
  console.error(failures.join('\n'))
  process.exitCode = 1
} else {
  console.log(`Validated ${entries.length} unique authored traits across ${expectedSpecies.length} Species and ${expectedArchetypes.length} Archetypes.`)
}
