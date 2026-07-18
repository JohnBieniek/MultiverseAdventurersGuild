import { useEffect, useMemo, useRef, useState } from 'react'
import { FaAsterisk, FaBolt, FaBookOpen, FaBrain, FaBullseye, FaCar, FaChartBar, FaCommentDots, FaCrosshairs, FaDumbbell, FaEye, FaFistRaised, FaFlask, FaHandPaper, FaHeart, FaHeartbeat, FaLightbulb, FaMagic, FaMicrochip, FaRunning, FaShieldAlt, FaSmile, FaStar, FaStickyNote, FaSun, FaTree, FaUserSecret, FaUsers } from 'react-icons/fa'
import { GiBiceps, GiBroadsword, GiCrossedAxes, GiCrossedSwords } from 'react-icons/gi'
import talentsText from '../content/players/talents.txt?raw'
import speciesText from '../content/players/species.txt?raw'
import archetypesText from '../content/players/archetypes.txt?raw'
import './CharacterSheet.css'

const STORE_KEY = 'mag-playable-characters-v1'
const ACTIVE_CHARACTER_KEY = 'mag-active-character-v1'
const stats = [
  ['strength', 'Strength', 'STR', GiBiceps], ['dexterity', 'Dexterity', 'DEX', FaHandPaper],
  ['endurance', 'Endurance', 'END', FaHeart], ['intuition', 'Intuition', 'INT', FaBrain],
  ['education', 'Education', 'EDU', FaBookOpen], ['charisma', 'Charisma', 'CHA', FaCommentDots],
]
const skillDefs = [
  ['athletics', 'Athletics', 'endurance', FaRunning], ['influence', 'Influence', 'charisma', FaSmile],
  ['knowledge', 'Knowledge', 'education', FaLightbulb], ['observation', 'Observation', 'intuition', FaEye],
  ['outdoors', 'Outdoors', 'intuition', FaTree], ['sneak', 'Sneak', 'dexterity', FaUserSecret],
  ['technology', 'Technology', 'education', FaMicrochip], ['vehicle', 'Vehicle', 'dexterity', FaCar],
]
const sectionIcons = { 'Combat Summary': GiBroadsword, Stats: FaChartBar, Skills: FaStar, Attack: GiCrossedAxes, Weapons: GiCrossedSwords, Talents: FaAsterisk, 'Items & Traits': FaFlask, Contacts: FaUsers, 'Session Notes': FaStickyNote }
const vitalIcons = { Initiative: FaCrosshairs, HP: FaHeartbeat, Defense: FaShieldAlt, Resilience: FaHeart, Ego: FaBrain, Energy: FaBolt, 'Max Force': FaSun }
const startingStatArray = [3, 2, 1, 0, 0, -1]
const weaponTypes = [
  ['Unarmed / Tiny Melee', 'melee', 4, 0], ['Light Melee', 'melee', 6, 0],
  ['Medium Melee', 'melee', 8, 0], ['Heavy Melee', 'melee', 10, -2],
  ['Holdout Ranged', 'ranged', 4, 0], ['Compact Ranged', 'ranged', 6, 0],
  ['Longarm Ranged', 'ranged', 8, 0], ['Heavy Ranged', 'ranged', 10, 0],
]
const weaponLoadouts = {
  Barbarian: [['Notched Seax','Light Melee'],['Stonehead War Club','Medium Melee'],['Worldsplitter Greataxe','Heavy Melee'],['Iron Throwing Axe','Holdout Ranged']],
  'Bounty Hunter': [['Capture Knife','Light Melee'],['Arc-Cuff Shock Baton','Medium Melee'],['Sleeve Dartcaster','Holdout Ranged'],['Tracker Carbine','Longarm Ranged']],
  Brainiac: [['Laser Scalpel','Light Melee'],['Telescoping Logic Staff','Medium Melee'],['Palm-Sized Beam Emitter','Holdout Ranged']],
  Cleric: [['Consecrated Dirk','Light Melee'],['Reliquary Warhammer','Medium Melee'],['Bolt of Judgment','Holdout Ranged']],
  Commando: [['Black-Ops Combat Knife','Light Melee'],['Tactical Tomahawk','Medium Melee'],['Suppressed Service Pistol','Holdout Ranged'],['Modular Assault Rifle','Longarm Ranged']],
  Criminal: [['Spring-Loaded Switchblade','Light Melee'],['Weighted Tire Thumper','Medium Melee'],['Filed-Off Snub Revolver','Holdout Ranged']],
  Druid: [['Moon-Crescent Sickle','Light Melee'],['Living Oak Staff','Medium Melee'],['Thornspitter Seedpod','Holdout Ranged']],
  'Eco Terrorist': [['Fieldcraft Knife','Light Melee'],['Brush-Clearing Machete','Medium Melee'],['Recurve Hunting Bow','Compact Ranged']],
  'Ex-Company Man': [['Monofilament Letter Opener','Light Melee'],['Executive Shock Cane','Medium Melee'],['Biometric Holdout Pistol','Holdout Ranged']],
  'Ex-Cop': [['Patrol Utility Knife','Light Melee'],['Expandable Riot Baton','Medium Melee'],['Department-Issue Sidearm','Holdout Ranged'],['Less-Lethal Riot Shotgun','Longarm Ranged']],
  'Ex-Military': [['Trench Knife','Light Melee'],['Entrenching Tool','Medium Melee'],['Veteran\'s Service Pistol','Holdout Ranged'],['Battle-Worn Pulse Rifle','Longarm Ranged']],
  Face: [['Jeweled Stiletto','Light Melee'],['Silver-Headed Sword Cane','Medium Melee'],['Pearl-Grip Pocket Pistol','Holdout Ranged']],
  Fixer: [['Ledger Knife','Light Melee'],['Chrome Pipe Wrench','Medium Melee'],['Unregistered Compact Pistol','Holdout Ranged']],
  Ganger: [['Neon-Edged Kukri','Light Melee'],['Chain-Wrapped Slugger','Medium Melee'],['Homemade Zip Gun','Holdout Ranged'],['Spraypainted Machine Pistol','Compact Ranged']],
  'Gonzo Journalist': [['Boot-Hidden Penknife','Light Melee'],['Armored Camera Monopod','Medium Melee'],['Press-Pass Derringer','Holdout Ranged']],
  Gunslinger: [['Buffalo-Horn Bowie Knife','Light Melee'],['Weathered Cavalry Saber','Medium Melee'],['Last-Chance Derringer','Holdout Ranged'],['Silver-Comet Revolver','Holdout Ranged'],['Mesa Wind Lever Rifle','Longarm Ranged']],
  Hacker: [['Ceramic Data Knife','Light Melee'],['Overclocked Shock Baton','Medium Melee'],['Ghost-Key Smart Pistol','Holdout Ranged']],
  'Mad Bomber': [['Demolition Knife','Light Melee'],['Blast-Shield Crowbar','Medium Melee'],['Jury-Rigged Grenade Launcher','Compact Ranged']],
  Mage: [['Runed Athame','Light Melee'],['Astrolabe Staff','Medium Melee'],['Prismatic Force Dart','Holdout Ranged']],
  Mercenary: [['Contractor Combat Knife','Light Melee'],['Carbon-Steel Machete','Medium Melee'],['Reliable Heavy Pistol','Holdout Ranged'],['Short-Barrel Battle Carbine','Longarm Ranged']],
  Monk: [['Iron Palm Technique','Unarmed / Tiny Melee'],['Seven-Ring Temple Staff','Medium Melee']],
  Ninja: [['Shadowglass Kunai','Light Melee'],['Night-Reed Katana','Medium Melee'],['Whispering Shuriken','Holdout Ranged'],['Lacquered Shortbow','Compact Ranged']],
  Performer: [['Tuning-Fork Dagger','Light Melee'],['Ironwood Battle Lute','Medium Melee'],['Shattering High Note','Holdout Ranged']],
  'Private Eye/Investigator': [['Casebook Switchblade','Light Melee'],['Lead-Cored Walking Cane','Medium Melee'],['Rainy-Night Revolver','Holdout Ranged']],
  Screamer: [['Pit-Crew Utility Blade','Light Melee'],['Torque-Bar Club','Medium Melee'],['Dashboard-Locked Autopistol','Holdout Ranged']],
  Shaman: [['Ancestor-Bone Knife','Light Melee'],['Totem-Crowned Spirit Staff','Medium Melee'],['Vengeful Spirit Dart','Holdout Ranged']],
  Smuggler: [['Vacuum-Sealed Vibroknife','Light Melee'],['Cargo-Bay Collapsible Baton','Medium Melee'],['Customs-Runner Holdout','Holdout Ranged'],['Cut-Down Boarding Blaster','Compact Ranged']],
  Sniper: [['Silent Field Knife','Light Melee'],['Climber\'s Hatchet','Medium Melee'],['Close-Defense Sidearm','Holdout Ranged'],['Horizon-Piercer Rifle','Heavy Ranged']],
  Spy: [['Sleeve-Hidden Garrote','Unarmed / Tiny Melee'],['Diplomat\'s Concealed Rapier','Medium Melee'],['Cufflink Flechette Pistol','Holdout Ranged']],
  'Street Doc': [['Trauma Scalpel','Light Melee'],['Defibrillator Shock Baton','Medium Melee'],['Mercy-Dart Tranquilizer','Holdout Ranged']],
  'Street Samurai': [['White-Handle Tanto','Light Melee'],['Crimson Circuit Katana','Medium Melee'],['Clan-Locked Smart Pistol','Holdout Ranged'],['Ronin Compact SMG','Compact Ranged']],
  Warlock: [['Pact-Signed Sacrificial Dagger','Light Melee'],['Void-Iron Hexblade','Medium Melee'],['Eldritch Starbolt','Holdout Ranged']],
}
const populateArchetypeWeapons = (existingWeapons, archetypeName) => {
  const weapons = existingWeapons.filter(weapon => weapon.source !== 'archetype').map(weapon => ({ ...weapon }))
  ;(weaponLoadouts[archetypeName] || []).forEach(([name, type]) => {
    const weapon = { id: crypto.randomUUID(), name, type, enhancement: 0, notes: '', source: 'archetype' }
    const emptyIndex = weapons.findIndex(entry => !entry.name?.trim() && !entry.notes?.trim() && !number(entry.enhancement))
    if (emptyIndex >= 0) weapons[emptyIndex] = { ...weapon, id: weapons[emptyIndex].id || weapon.id }
    else weapons.push(weapon)
  })
  return weapons
}
const number = value => Number(value) || 0
const talentCatalog = (() => {
  const lines = talentsText.split(/\r?\n/).map(line => line.trim())
  const headings = []
  lines.forEach((line, index) => {
    const buff = line.match(/^Buff Option:\s*(.+)$/i)
    if (buff) { headings.push({ name: buff[1].replace(/:$/, ''), index }); return }
    const next = lines.slice(index + 1).find(Boolean) || ''
    if (line && /^Description:/i.test(next) && !line.includes(': ')) headings.push({ name: line.replace(/:$/, ''), index })
  })
  return headings.map((heading, index) => {
    const block = lines.slice(heading.index + 1, headings[index + 1]?.index ?? lines.length).filter(Boolean)
    const description = block.find(line => /^Description:/i.test(line))?.replace(/^Description:\s*/i, '') || ''
    const mechanic = block.find(line => /^Mechanics?:/i.test(line))?.replace(/^Mechanics?:\s*/i, '') || ''
    const details = block.filter(line => /^(Action|Duration|Cost|Energy Cost):/i.test(line))
    const joined = block.join(' ')
    const minimum = joined.match(/Minimum Force\s*(?:is\s*)?(\d)/i)?.[1]
    const maximum = joined.match(/Maximum Force\s*(?:is\s*)?(\d)/i)?.[1]
    const forceLimit = minimum && maximum ? `Force ${minimum}–${maximum}` : minimum ? `Minimum Force ${minimum}` : maximum ? `Maximum Force ${maximum}` : 'Standard Force Energy'
    return { name: heading.name, ability: [forceLimit, ...details].join(' • '), notes: [description, mechanic].filter(Boolean).join(' — ') }
  }).filter((talent, index, all) => all.findIndex(item => item.name === talent.name) === index).sort((a, b) => a.name.localeCompare(b.name))
})()
const talentNames = talentCatalog.map(talent => talent.name)
const speciesNames = (() => {
  const lines = speciesText.split(/\r?\n/).map(line => line.trim())
  return lines.map((line, index) => ({ line, next: lines.slice(index + 1).find(Boolean) || '' })).filter(({ line, next }) => line.includes(' - ') && /^Rep:/i.test(next)).map(({ line }) => line.split(' - ')[0].trim()).sort((a, b) => a.localeCompare(b))
})()
const archetypeOptions = (() => {
  const lines = archetypesText.split(/\r?\n/).map(line => line.trim())
  const headings = lines.map((line, index) => ({ line, index })).filter(({ line, index }) => line.includes(' - ') && /^Scores:/i.test(lines.slice(index + 1).find(Boolean) || ''))
  return headings.map(({ line, index }, headingIndex) => {
    const end = headings[headingIndex + 1]?.index ?? lines.length
    const block = lines.slice(index, end)
    const scoresLine = block.find(entry => /^Scores:/i.test(entry)) || ''
    const strengths = (block.find(entry => /^Strengths:/i.test(entry)) || '').replace(/^Strengths:\s*/i, '').split(',').map(value => value.trim())
    const weaknesses = (block.find(entry => /^Weaknesses:/i.test(entry)) || '').replace(/^Weaknesses:\s*/i, '').split(',').map(value => value.trim())
    const personalityIndex = block.findIndex(entry => /^Personality:/i.test(entry))
    const traits = block.slice(personalityIndex < 0 ? block.length : personalityIndex).map(entry => entry.replace(/^Personality:\s*/i, '')).map(entry => { const match = entry.match(/^(.+?)\s+-\s+(.+)$/); return match ? { name: match[1].trim(), description: match[2].trim() } : null }).filter(Boolean)
    return {
      name: line.split(' - ')[0].trim(), strengths, weaknesses, traits,
      stats: Object.fromEntries(stats.map(([key, label]) => [key, number(scoresLine.match(new RegExp(`${label}\\s+([+-]?\\d+)`, 'i'))?.[1])])),
    }
  }).sort((a, b) => a.name.localeCompare(b.name))
})()
const blankRows = (count, shape) => Array.from({ length: count }, () => ({ ...shape, id: crypto.randomUUID() }))
const newCharacter = () => ({
  id: crypto.randomUUID(), name: 'New Hero', species: '', archetype: '', level: 0, xp: 0,
  stats: Object.fromEntries(stats.map(([key]) => [key, ''])),
  skills: Object.fromEntries(skillDefs.map(([key]) => [key, { ability: 0, modifier: 0, buffs: 0, debuffs: 0 }])),
  attackSkill: 0, attackModifier: 0, defenseBonus: 0, defenseRating: 0,
  currentHp: 10, temporaryHp: 0, currentEnergy: 0,
  weapons: blankRows(2, { name: '', type: 'Unarmed / Tiny Melee', enhancement: 0, notes: '' }),
  talents: blankRows(2, { name: '', ability: '', notes: '' }),
  items: blankRows(2, { name: '', bonus: '', appliesTo: '' }),
  contacts: blankRows(2, { name: '', role: '' }), notes: '', updatedAt: Date.now(),
  autoSave: true,
})
const signed = value => `${number(value) >= 0 ? '+' : ''}${number(value)}`
const rollDie = sides => Math.floor(Math.random() * sides) + 1

function CharacterSheet() {
  const [characters, setCharacters] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORE_KEY)) || [] } catch { return [] }
  })
  const [character, setCharacter] = useState(() => {
    try {
      const activeId = localStorage.getItem(ACTIVE_CHARACTER_KEY)
      const saved = JSON.parse(localStorage.getItem(STORE_KEY)) || []
      const active = saved.find(hero => hero.id === activeId)
      return active ? structuredClone(active) : null
    } catch { return null }
  })
  const [roll, setRoll] = useState(null)
  const [notice, setNotice] = useState('')
  const fileRef = useRef(null)

  useEffect(() => {
    if (character) localStorage.setItem(ACTIVE_CHARACTER_KEY, character.id)
    else localStorage.removeItem(ACTIVE_CHARACTER_KEY)
  }, [character])

  useEffect(() => {
    if (!character) return
    let changed = false
    const talents = character.talents.map(row => {
      const talent = talentCatalog.find(option => option.name === row.name)
      if (!talent) return row
      const ability = row.ability || talent.ability
      const notes = row.notes || talent.notes
      if (ability !== row.ability || notes !== row.notes) changed = true
      return { ...row, ability, notes }
    })
    const archetype = archetypeOptions.find(option => option.name === character.archetype)
    const items = character.items.map(row => {
      const trait = archetype?.traits.find(option => option.name === row.name)
      const legacyArchetypeRow = row.source === 'archetype' || row.bonus === 'Archetype trait' || row.appliesTo === character.archetype || /^Archetype trait\s*[—-]/i.test(row.description || '')
      if (!trait || !legacyArchetypeRow) return row
      if (row.description === trait.description && !row.bonus && !row.appliesTo) return row
      changed = true
      return { ...row, description: trait.description, bonus: '', appliesTo: '', source: 'archetype' }
    })
    const needsWeaponLoadout = Boolean(archetype && character.weaponLoadoutAppliedFor !== character.archetype)
    const weapons = needsWeaponLoadout ? populateArchetypeWeapons(character.weapons, character.archetype) : character.weapons
    if (needsWeaponLoadout) changed = true
    if (changed) setCharacter(current => ({ ...current, talents, items, weapons, weaponLoadoutAppliedFor: needsWeaponLoadout ? character.archetype : current.weaponLoadoutAppliedFor, updatedAt: Date.now() }))
  }, [character])

  useEffect(() => {
    if (!character || character.autoSave === false) return
    setCharacters(current => {
      const saved = { ...character, updatedAt: Date.now() }
      const next = [...current.filter(item => item.id !== saved.id), saved].sort((a, b) => b.updatedAt - a.updatedAt)
      localStorage.setItem(STORE_KEY, JSON.stringify(next))
      return next
    })
  }, [character])

  const computed = useMemo(() => {
    if (!character) return {}
    const s = character.stats
    const level = Math.max(0, Math.min(10, number(character.level)))
    const maxHp = 10 + (6 * level) + (number(s.endurance) * (level + 1))
    return {
      level, maxHp, maxEnergy: level * 3,
      maxForce: level >= 9 ? 4 : level >= 5 ? 3 : level >= 2 ? 2 : 1,
      slots: level >= 7 ? 3 : level >= 4 ? 2 : 1,
      initiative: number(s.intuition),
      defense: 11 + number(character.defenseBonus) + number(character.defenseRating),
      resilience: number(character.defenseBonus) + number(s.strength) + number(s.dexterity) + number(s.endurance),
      ego: number(character.defenseBonus) + number(s.intuition) + number(s.education) + number(s.charisma),
    }
  }, [character])

  const update = (path, value) => setCharacter(current => {
    const copy = structuredClone(current)
    let target = copy
    path.slice(0, -1).forEach(key => { target = target[key] })
    target[path.at(-1)] = value
    copy.updatedAt = Date.now()
    return copy
  })
  const save = () => {
    const saved = { ...character, currentHp: Math.min(number(character.currentHp), computed.maxHp), updatedAt: Date.now() }
    const next = [...characters.filter(item => item.id !== saved.id), saved].sort((a, b) => b.updatedAt - a.updatedAt)
    localStorage.setItem(STORE_KEY, JSON.stringify(next)); setCharacters(next); setCharacter(saved); flash('Character saved locally')
  }
  const setAutoSave = checked => {
    const saved = { ...character, autoSave: checked, updatedAt: Date.now() }
    const next = [...characters.filter(item => item.id !== saved.id), saved].sort((a, b) => b.updatedAt - a.updatedAt)
    localStorage.setItem(STORE_KEY, JSON.stringify(next)); setCharacters(next); setCharacter(saved)
    flash(checked ? 'Autosave enabled' : 'Autosave disabled for this Hero')
  }
  const applyArchetype = name => {
    const preset = archetypeOptions.find(option => option.name === name)
    if (!preset) { update(['archetype'], name); return }
    const skillKeys = ['attack', ...skillDefs.map(([key]) => key)]
    const matchSkill = value => {
      const normalized = value.toLowerCase()
      if (/attack|weapon/.test(normalized)) return 'attack'
      return skillDefs.find(([, label]) => normalized.includes(label.toLowerCase()))?.[0]
    }
    const strong = [...new Set(preset.strengths.map(matchSkill).filter(Boolean))]
    const weak = [...new Set(preset.weaknesses.map(matchSkill).filter(key => key && !strong.includes(key)))]
    const allocation = Object.fromEntries(skillKeys.map(key => [key, 0]))
    strong.slice(0, 2).forEach(key => { allocation[key] = 2 })
    const weakKey = weak[0] || skillKeys.find(key => !strong.includes(key)); allocation[weakKey] = -1
    const remaining = skillKeys.filter(key => allocation[key] === 0 && key !== weakKey)
    const priority = [...weak.slice(1), ...remaining.filter(key => !weak.includes(key))]
    priority.slice(0, 3).forEach(key => { allocation[key] = 0 })
    priority.slice(3, 6).forEach(key => { allocation[key] = 1 })
    setCharacter(current => {
      const items = current.items.filter(item => item.source !== 'archetype').map(item => ({ ...item }))
      preset.traits.forEach(({ name, description }) => {
        const trait = { id: crypto.randomUUID(), name, description, source: 'archetype' }
        const emptyIndex = items.findIndex(item => !item.name?.trim() && !String(item.description || '').trim() && !String(item.bonus || '').trim() && !item.appliesTo?.trim())
        if (emptyIndex >= 0) items[emptyIndex] = { ...trait, id: items[emptyIndex].id || trait.id }
        else items.push(trait)
      })
      const weapons = populateArchetypeWeapons(current.weapons, preset.name)
      return {
        ...current, archetype: preset.name, stats: { ...current.stats, ...preset.stats },
        attackSkill: allocation.attack,
        skills: Object.fromEntries(skillDefs.map(([key]) => [key, { ...current.skills[key], ability: allocation[key] }])),
        items, weapons, weaponLoadoutAppliedFor: preset.name, updatedAt: Date.now(),
      }
    })
    flash(`${preset.name} starting scores, skills, and traits applied`)
  }
  const flash = text => { setNotice(text); window.setTimeout(() => setNotice(''), 2200) }
  const remove = id => {
    if (!window.confirm('Delete this locally saved character?')) return
    const next = characters.filter(item => item.id !== id); setCharacters(next); localStorage.setItem(STORE_KEY, JSON.stringify(next))
  }
  const importFile = event => {
    const file = event.target.files?.[0]; if (!file) return
    const reader = new FileReader()
    reader.onload = () => { try {
      const data = JSON.parse(reader.result)
      if (!data.name || !data.stats || !data.skills) throw new Error()
      setCharacter({ ...newCharacter(), ...data, id: crypto.randomUUID(), updatedAt: Date.now() }); flash('Character imported')
    } catch { flash('That file is not a valid MAG character') } }
    reader.readAsText(file); event.target.value = ''
  }
  const exportCharacter = () => {
    const blob = new Blob([JSON.stringify(character, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob); const link = document.createElement('a')
    link.href = url; link.download = `${character.name || 'hero'}.mag-character.json`; link.click(); URL.revokeObjectURL(url)
  }
  const checkRoll = (label, modifier, target = '') => {
    const natural = rollDie(20); const total = natural + number(modifier); const tn = target === '' ? null : number(target)
    setRoll({ kind: 'check', label, natural, modifier: number(modifier), total, tn,
      result: natural === 20 ? 'Critical success!' : natural === 1 ? 'Critical failure!' : tn == null ? '' : total >= tn ? 'Success!' : 'Failure' })
  }
  const attackRoll = weapon => {
    const type = weaponTypes.find(item => item[0] === weapon.type) || weaponTypes[0]
    const stat = type[1] === 'melee' ? character.stats.strength : character.stats.dexterity
    const modifier = number(stat) + number(character.attackSkill) + number(character.attackModifier)
    const natural = rollDie(20), total = natural + modifier
    setRoll({ kind: 'attack', label: weapon.name || type[0], natural, modifier, total, tn: null,
      hit: natural !== 1, weapon, die: type[2], stat: number(stat) })
  }
  const damageRoll = attack => {
    const result = attack.natural === 20 ? attack.die : rollDie(attack.die)
    const modifier = attack.stat + number(attack.weapon.enhancement)
    setRoll({ kind: 'damage', label: `${attack.label} damage`, die: attack.die, natural: result, modifier, total: result + modifier, critical: attack.natural === 20 })
  }

  if (!character) return <div className="sheet-page sheet-library">
    <div className="library-hero"><span className="eyebrow">PLAY AT THE TABLE</span><h1>Playable Character Sheet</h1><p>Build a Hero, bring back a locally saved character, or import one from another device.</p>
      <div className="library-actions"><button className="primary" onClick={() => setCharacter(newCharacter())}>＋ Create New Hero</button><button onClick={() => fileRef.current.click()}>⇧ Upload Character</button></div>
      <input ref={fileRef} className="visually-hidden" type="file" accept=".json,.mag-character.json,application/json" onChange={importFile} />
    </div>
    <section className="saved-library"><h2>Saved Heroes</h2>{characters.length === 0 ? <div className="empty-state"><strong>No saved Heroes yet</strong><span>Your characters stay in this browser using local storage.</span></div> : <div className="character-grid">{characters.map(hero => <article className="character-card" key={hero.id}><div><span>LEVEL {hero.level || 0}</span><h3>{hero.name}</h3><p>{[hero.species, hero.archetype].filter(Boolean).join(' • ') || 'Unwritten legend'}</p></div><div className="card-actions"><button className="primary" onClick={() => setCharacter(structuredClone(hero))}>Load</button><button className="danger" onClick={() => remove(hero.id)}>Delete</button></div></article>)}</div>}</section>
    {notice && <div className="toast">{notice}</div>}
  </div>

  const skillTotal = (key, stat) => number(character.stats[stat]) + Object.values(character.skills[key]).reduce((sum, value) => sum + number(value), 0)
  const addRow = (key, shape) => update([key], [...character[key], { ...shape, id: crypto.randomUUID() }])
  const deleteRow = (key, id) => update([key], character[key].filter(row => row.id !== id))
  const selectTalent = (index, name) => {
    const talent = talentCatalog.find(option => option.name === name)
    setCharacter(current => {
      const copy = structuredClone(current)
      copy.talents[index] = { ...copy.talents[index], name, ability: talent?.ability || '', notes: talent?.notes || '' }
      copy.updatedAt = Date.now()
      return copy
    })
  }
  const statOptionUnavailable = (currentKey, option) => {
    const available = startingStatArray.filter(value => value === option).length
    const usedByOtherStats = stats.filter(([key]) => key !== currentKey && character.stats[key] !== '').filter(([key]) => number(character.stats[key]) === option).length
    return usedByOtherStats >= available
  }
  return <div className="sheet-page">
    <div className="sheet-toolbar"><button onClick={() => setCharacter(null)}>← Heroes</button><div className="toolbar-title"><strong>{character.name || 'Unnamed Hero'}</strong><span>Level {computed.level}</span></div><button onClick={() => setCharacter(newCharacter())}>New</button><button onClick={() => fileRef.current.click()}>Load File</button><button onClick={exportCharacter}>Export</button><label className="autosave-toggle"><input type="checkbox" checked={character.autoSave !== false} onChange={e => setAutoSave(e.target.checked)}/><span>Autosave</span></label><button className="primary" onClick={save}>Save</button><input ref={fileRef} className="visually-hidden" type="file" accept="application/json,.json" onChange={importFile} /></div>
    <header className="sheet-header"><img src="/multiverse%20adventurers%20guild%20icon.png" alt="Guild shield"/><div><span className="eyebrow">MULTIVERSE ADVENTURERS GUILD</span><h1>Character Sheet</h1></div><div className="identity-fields">
      <Field label="Hero name" value={character.name} onChange={v => update(['name'], v)} wide/><IdentityChoice label="Species" value={character.species} options={speciesNames} onChange={v => update(['species'], v)}/><IdentityChoice label="Archetype" value={character.archetype} options={archetypeOptions.map(option => option.name)} onChange={applyArchetype}/><Field label="Level" type="number" min="0" max="10" value={character.level} onChange={v => update(['level'], v)}/><Field label="XP" type="number" min="0" value={character.xp} onChange={v => update(['xp'], v)}/></div></header>

    <section className="sheet-section vitals"><SectionTitle icon="⚔" title="Combat Summary" subtitle="Move 30 feet each turn. One reaction per round."/><div className="vital-grid">
      <Vital label="Initiative" value={signed(computed.initiative)} roll={() => checkRoll('Initiative', computed.initiative)}/><Vital label="HP" editable value={character.currentHp} max={computed.maxHp} onChange={v => update(['currentHp'], v)}/><Vital label="Defense" value={computed.defense}/><Vital label="Resilience" value={signed(computed.resilience)} roll={() => checkRoll('Resilience', computed.resilience)}/><Vital label="Ego" value={signed(computed.ego)} roll={() => checkRoll('Ego', computed.ego)}/><Vital label="Energy" editable value={character.currentEnergy} max={computed.maxEnergy} onChange={v => update(['currentEnergy'], v)}/><Vital label="Max Force" value={computed.maxForce}/></div>
    </section>

    <div className="sheet-columns"><section className="sheet-section"><SectionTitle icon="▥" title="Stats" subtitle="Starting array: +3, +2, +1, 0, 0, −1. Each choice can only be used once, except 0 twice."/><div className="stat-list">{stats.map(([key, label, short, Icon]) => <div className="stat-row" key={key}><div className="stat-name"><Icon/><strong>{label} <span>({short})</span></strong></div><ScoreControl label={`${label} score`} value={character.stats[key]} options={[-1, 0, 1, 2, 3]} isOptionDisabled={option => statOptionUnavailable(key, option)} onChange={v => update(['stats', key], v)}/><button className="roll-button" onClick={() => checkRoll(label, character.stats[key])}>Roll</button></div>)}</div></section>
      <section className="sheet-section skills">
        <SectionTitle icon="★" title="Skills" subtitle="Starting array: +2, +2, +1, +1, +1, 0, 0, 0, −1"/>
        <div className="skill-head"><span>Skill</span><span>Stat</span><span>Ability</span><span>Mod</span><span>Buff</span><span>Debuff</span><span>Total</span></div>
        {skillDefs.map(([key, label, defaultStat, Icon]) => {
          const total = skillTotal(key, defaultStat)
          const statName = stats.find(([statKey]) => statKey === defaultStat)?.[1]
          const statScore = character.stats[defaultStat]
          return <div className="skill-row" key={key}>
            <strong className="skill-name"><Icon/><span>{label} <small>({statName})</small></span></strong>
            <output className="skill-stat">{signed(statScore)}</output>
            <ScoreControl label={`${label} ability`} value={character.skills[key].ability} options={[-1, 0, 1, 2]} onChange={v => update(['skills', key, 'ability'], v)}/>
            {['modifier','buffs','debuffs'].map(field => <NumberInput key={field} value={character.skills[key][field]} onChange={v => update(['skills', key, field], field === 'debuffs' ? -Math.abs(number(v)) : v)}/>)}
            <div className="skill-total"><output>{signed(total)}</output><button className="roll-button" onClick={() => checkRoll(label, total)}>Roll</button></div>
          </div>
        })}
      </section></div>

    <section className="sheet-section"><SectionTitle icon="✦" title="Attack" subtitle="Attack skill applies to melee and ranged attacks"/><div className="attack-summary"><label className="field"><span>Attack skill</span><ScoreControl label="Attack skill" value={character.attackSkill} options={[-1, 0, 1, 2]} onChange={v => update(['attackSkill'], v)}/></label><Field label="Modifier" type="number" value={character.attackModifier} onChange={v => update(['attackModifier'], v)}/><div><span>Melee total</span><strong>{signed(number(character.stats.strength) + number(character.attackSkill) + number(character.attackModifier))}</strong></div><div><span>Ranged total</span><strong>{signed(number(character.stats.dexterity) + number(character.attackSkill) + number(character.attackModifier))}</strong></div><Field label="Defense bonus" type="number" value={character.defenseBonus} onChange={v => update(['defenseBonus'], v)}/><Field label="Defense rating" type="number" value={character.defenseRating} onChange={v => update(['defenseRating'], v)}/></div></section>

    <EditableTable title="Weapons" icon="⚔" rows={character.weapons} add={() => addRow('weapons', { name: '', type: weaponTypes[0][0], enhancement: 0, notes: '' })} remove={id => deleteRow('weapons', id)} columns={['Name','Type','Enhancement','Notes','']}>{(row, i) => <><input aria-label="Weapon name" value={row.name} onChange={e => update(['weapons',i,'name'],e.target.value)}/><select aria-label="Weapon type" value={row.type} onChange={e => update(['weapons',i,'type'],e.target.value)}>{weaponTypes.map(type => <option key={type[0]}>{type[0]}</option>)}</select><NumberInput value={row.enhancement} onChange={v => update(['weapons',i,'enhancement'],v)}/><input aria-label="Weapon notes" value={row.notes} onChange={e => update(['weapons',i,'notes'],e.target.value)}/><div className="row-actions"><button className="roll-button" onClick={() => attackRoll(row)}>Attack</button><button className="icon-button" onClick={() => deleteRow('weapons',row.id)}>×</button></div></>}</EditableTable>
    <div className="sheet-columns lower">
      <EditableTable title="Talents" icon="✹" rows={character.talents} add={() => addRow('talents',{name:'',ability:'',notes:''})} columns={['Talent','Ability / Cost','Notes','']}>
        {(row,i)=><><TalentControl value={row.name} onChange={value=>selectTalent(i,value)}/><input value={row.ability} onChange={e=>update(['talents',i,'ability'],e.target.value)}/><input value={row.notes} onChange={e=>update(['talents',i,'notes'],e.target.value)}/><button className="icon-button" onClick={()=>deleteRow('talents',row.id)}>×</button></>}
      </EditableTable>
      <EditableTable title="Items & Traits" icon="⚗" rows={character.items} add={() => addRow('items',{name:'',description:''})} columns={['Item / Trait','Description','']}>
        {(row,i)=><><input value={row.name} onChange={e=>update(['items',i,'name'],e.target.value)}/><textarea rows="2" value={row.description ?? [row.bonus,row.appliesTo].filter(Boolean).join(' — ')} onChange={e=>update(['items',i,'description'],e.target.value)}/><button className="icon-button" onClick={()=>deleteRow('items',row.id)}>×</button></>}
      </EditableTable>
    </div>
    <div className="sheet-columns lower"><EditableTable title="Contacts" icon="♟" rows={character.contacts} add={() => addRow('contacts',{name:'',role:''})} columns={['Name','Relationship / Role','']}>{(row,i)=><><input value={row.name} onChange={e=>update(['contacts',i,'name'],e.target.value)}/><input value={row.role} onChange={e=>update(['contacts',i,'role'],e.target.value)}/><button className="icon-button" onClick={()=>deleteRow('contacts',row.id)}>×</button></>}</EditableTable><section className="sheet-section notes"><SectionTitle icon="✎" title="Session Notes"/><textarea value={character.notes} onChange={e=>update(['notes'],e.target.value)} placeholder="Conditions, mission clues, inventory, reminders…"/></section></div>
    {notice && <div className="toast">{notice}</div>}{roll && <RollModal roll={roll} close={() => setRoll(null)} damage={() => damageRoll(roll)}/>} 
  </div>
}

function Field({ label, onChange, wide, ...props }) { return <label className={`field ${wide ? 'wide' : ''}`}><span>{label}</span><input {...props} onChange={e => onChange(e.target.value)}/></label> }
function IdentityChoice({ label, value, options, onChange }) { const existing = options.includes(value); const [custom, setCustom] = useState(Boolean(value) && !existing); useEffect(() => { if (existing) setCustom(false) }, [existing]); const choose = event => { if (event.target.value === '__custom__') { onChange(''); setCustom(true) } else onChange(event.target.value) }; return <label className="field identity-choice"><span>{label}</span>{custom ? <div className="identity-custom"><input autoFocus aria-label={`Custom ${label}`} value={value} placeholder={`Enter custom ${label.toLowerCase()}`} onChange={e => onChange(e.target.value)}/><select className="custom-list-trigger" aria-label={`Choose ${label} from list`} value="" onChange={choose}><option value="" disabled></option>{options.map(option => <option value={option} key={option}>{option}</option>)}</select></div> : <select value={existing ? value : ''} onChange={choose}><option value="" disabled>Choose {label.toLowerCase()}</option><option value="__custom__">Custom {label.toLowerCase()}…</option>{options.map(option => <option value={option} key={option}>{option}</option>)}</select>}</label> }
function NumberInput({ value, onChange }) { return <input className="number-input" type="number" value={value} onChange={e => onChange(e.target.value)}/> }
function ScoreControl({ label, value, options, onChange, isOptionDisabled = () => false }) { const hasPreset = value !== '' && options.includes(number(value)); return <div className="score-control"><select aria-label={`${label} preset`} value={hasPreset ? number(value) : ''} onChange={e => onChange(e.target.value)}><option value="">Custom</option>{options.map(option => <option value={option} key={option} disabled={isOptionDisabled(option)}>{signed(option)}</option>)}</select><input aria-label={`${label} custom value`} type="number" min="-4" max="4" value={value} onChange={e => onChange(e.target.value)}/></div> }
function TalentControl({ value, onChange }) { return <div className="talent-control"><select aria-label="Choose a talent" value={talentNames.includes(value) ? value : ''} onChange={e => onChange(e.target.value)}><option value="">Choose a talent</option>{talentNames.map(name => <option value={name} key={name}>{name}</option>)}</select></div> }
function SectionTitle({ title, subtitle }) { const reminders = { 'Combat Summary': 'Move 30 feet each turn, even if you attack. Take one reaction per round. Free actions: talk, draw a weapon, or step 5 feet.', Attack: 'One Skill is used for both melee and ranged attacks. Talents can add damage.', Skills: `${subtitle} You can activate one Skill per turn.`, Talents: 'You can activate two Talents per turn. Sustained combat Talents occupy your available Talent Slots.', Weapons: 'You can attack once each turn, or move an extra 30 feet instead.' }; const note = reminders[title] || subtitle; const Icon = sectionIcons[title] || FaStar; return <div className="section-title"><h2><span><Icon/></span>{title}</h2>{note && <p>{note}</p>}</div> }
function Vital({ label, value, max, editable, onChange, roll }) { const Icon = vitalIcons[label]; return <div className="vital">{Icon && <Icon className="vital-icon"/>}<span>{label}</span>{editable && max !== undefined ? <div className="vital-combined"><input aria-label={`${label} current`} type="number" value={value} onChange={e=>onChange(e.target.value)}/><span>/</span><strong aria-label={`${label} maximum`}>{max}</strong></div> : editable ? <input type="number" value={value} onChange={e=>onChange(e.target.value)}/> : <strong>{value}</strong>}{roll && <button className="roll-button" onClick={roll}>Roll</button>}</div> }
function EditableTable({ title, icon, rows, columns, add, children }) { const slug = title.toLowerCase().replaceAll(' & ', '-').replaceAll(' ', '-'); return <section className={`sheet-section editable-table table-${slug}`}><SectionTitle icon={icon} title={title}/><div className="table-head">{columns.map((column,i)=><span key={`${column}-${i}`}>{column}</span>)}</div>{rows.map((row,i)=><div className="table-row" key={row.id}>{children(row,i)}</div>)}<button className="add-row" onClick={add}>＋ Add {title.replace(/s$/, '')}</button>{title === 'Talents' && <ForceTable/>}</section> }
function ForceTable() { return <div className="force-table"><h3>Force Activation Costs</h3><div className="force-row force-head"><span>Force</span><span>Sustained</span><span>One-shot</span></div>{[[1,1,1],[2,4,2],[3,9,4],[4,16,8]].map(([force,sustained,oneShot]) => <div className="force-row" key={force}><strong>F{force}</strong><span>{sustained} Energy</span><span>{oneShot} Energy</span></div>)}<p>One-shots last for one roll or immediate use and do not occupy a Talent Slot.</p></div> }
function RollModal({ roll, close, damage }) { const success = roll.result?.includes('Success') || roll.result?.includes('success') || roll.hit; return <div className="modal-backdrop" onMouseDown={e => e.target===e.currentTarget && close()}><div className={`roll-modal ${success ? 'success' : ''}`} role="dialog" aria-modal="true"><button className="modal-close" onClick={close}>×</button><span className="eyebrow">{roll.kind === 'damage' ? 'DAMAGE ROLL' : roll.kind === 'attack' ? 'ATTACK ROLL' : 'D20 CHECK'}</span><h2>{roll.label}</h2><div className="die-result">{roll.natural}</div><div className="roll-math"><span>Die <strong>{roll.natural}</strong></span><span>Modifier <strong>{signed(roll.modifier)}</strong></span><span>Total <strong>{roll.total}</strong></span>{roll.tn != null && <span>Target <strong>{roll.tn}</strong></span>}</div>{roll.kind === 'attack' && <h3>{roll.natural === 20 ? 'Critical hit!' : roll.natural === 1 ? 'Critical miss!' : roll.tn == null ? 'Attack rolled' : roll.hit ? 'Hit!' : 'Miss'}</h3>}{roll.result && <h3>{roll.result}</h3>}{roll.critical && <p>Critical hit: maximum d{roll.die} damage.</p>}{roll.kind === 'attack' && roll.hit && <button className="primary damage-button" onClick={damage}>Roll d{roll.die} Damage</button>}</div></div> }
export default CharacterSheet
