import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { FaAsterisk, FaBolt, FaBookOpen, FaBrain, FaBullseye, FaCar, FaChartBar, FaCommentDots, FaCrosshairs, FaDumbbell, FaEye, FaFistRaised, FaFlask, FaHandPaper, FaHeart, FaHeartbeat, FaLightbulb, FaMagic, FaMicrochip, FaRunning, FaShieldAlt, FaSmile, FaStar, FaStickyNote, FaSun, FaTree, FaUserSecret, FaUsers } from 'react-icons/fa'
import { GiBiceps, GiBroadsword, GiCrossedAxes, GiCrossedSwords } from 'react-icons/gi'
import talentsText from '../content/players/talents.txt?raw'
import speciesText from '../content/players/species.txt?raw'
import archetypesText from '../content/players/archetypes.txt?raw'
import contactsText from '../content/players/contacts.txt?raw'
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
const startingSkillArray = [2, 2, 1, 1, 1, 0, 0, 0, -1]
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
  Sniper: [['Fairbairn-Sykes Fighting Knife','Light Melee'],['Estwing Camp Axe','Medium Melee'],['Kestrel .45 Pistol','Holdout Ranged'],['Barrett M82 Anti-Materiel Rifle','Heavy Ranged']],
  Spy: [['Sleeve-Hidden Garrote','Unarmed / Tiny Melee'],['Diplomat\'s Concealed Rapier','Medium Melee'],['Cufflink Flechette Pistol','Holdout Ranged']],
  'Street Doc': [['Trauma Scalpel','Light Melee'],['Defibrillator Shock Baton','Medium Melee'],['Mercy-Dart Tranquilizer','Holdout Ranged']],
  'Street Samurai': [['White-Handle Tanto','Light Melee'],['Crimson Circuit Katana','Medium Melee'],['Clan-Locked Smart Pistol','Holdout Ranged'],['Ronin Compact SMG','Compact Ranged']],
  Warlock: [['Pact-Signed Sacrificial Dagger','Light Melee'],['Void-Iron Hexblade','Medium Melee'],['Eldritch Starbolt','Holdout Ranged']],
}
const weaponLoadoutVersion = 3
const weaponNotesByType = {
  'Unarmed / Tiny Melee': 'Automatically concealed.',
  'Light Melee': 'Automatically concealed.',
  'Medium Melee': 'TN 15 Observation to conceal.',
  'Heavy Melee': 'Cannot be concealed; −2 Defense while using it.',
  'Holdout Ranged': 'Automatically concealed.',
  'Compact Ranged': 'TN 15 Observation to conceal.',
  'Longarm Ranged': 'TN 12 Observation to conceal.',
  'Heavy Ranged': 'Cannot be concealed; must be fired from a braced position.',
}
const weaponLoadoutMarker = archetypeName => `${weaponLoadoutVersion}:${archetypeName}`
const populateArchetypeWeapons = (existingWeapons, archetypeName) => {
  const weapons = existingWeapons.filter(weapon => weapon.source !== 'archetype').map(weapon => ({ ...weapon }))
  ;(weaponLoadouts[archetypeName] || []).forEach(([name, type]) => {
    const weapon = { id: crypto.randomUUID(), name, type, enhancement: 0, notes: weaponNotesByType[type] || 'Archetype starting weapon.', source: 'archetype' }
    const emptyIndex = weapons.findIndex(entry => !entry.name?.trim() && !entry.notes?.trim() && !number(entry.enhancement))
    if (emptyIndex >= 0) weapons[emptyIndex] = { ...weapon, id: weapons[emptyIndex].id || weapon.id }
    else weapons.push(weapon)
  })
  return weapons
}
const number = value => Number(value) || 0
const cleanTalentAbility = value => String(value || '').split(' • ').filter(part => !/^Duration:/i.test(part.trim())).join(' • ')
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
    const duration = (block.find(line => /^Duration:/i.test(line)) || '').replace(/^Duration:\s*/i, '')
    const details = block.filter(line => /^(Action|Cost|Energy Cost):/i.test(line))
    const joined = block.join(' ')
    const minimum = joined.match(/Minimum Force\s*(?:is\s*)?(\d)/i)?.[1]
    const maximum = joined.match(/Maximum Force\s*(?:is\s*)?(\d)/i)?.[1]
    const forceLimit = minimum && maximum ? `Force ${minimum}–${maximum}` : minimum ? `Minimum Force ${minimum}` : maximum ? `Maximum Force ${maximum}` : 'Standard Energy'
    return { name: heading.name, ability: [forceLimit, ...details].join(' • '), duration, notes: [description, mechanic].filter(Boolean).join(' — ') }
  }).filter((talent, index, all) => all.findIndex(item => item.name === talent.name) === index).sort((a, b) => a.name.localeCompare(b.name))
})()
const talentNames = talentCatalog.map(talent => talent.name)
const speciesNames = (() => {
  const lines = speciesText.split(/\r?\n/).map(line => line.trim())
  return lines.map((line, index) => ({ line, next: lines.slice(index + 1).find(Boolean) || '' })).filter(({ line, next }) => line.includes(' - ') && /^Rep:/i.test(next)).map(({ line }) => line.split(' - ')[0].trim()).sort((a, b) => a.localeCompare(b))
})()
const contactCatalog = (() => {
  const lines = contactsText.split(/\r?\n/).map(line => line.trim())
  const headings = lines.map((line, index) => ({ line, index })).filter(({ line, index }) => line.includes(' - ') && /^Category:/i.test(lines.slice(index + 1).find(Boolean) || ''))
  return headings.map(({ line, index }, entryIndex) => {
    const block = lines.slice(index + 1, headings[entryIndex + 1]?.index ?? lines.length)
    return { type: line.split(' - ')[0].trim(), category: (block.find(value => /^Category:/i.test(value)) || '').replace(/^Category:\s*/i, ''), example: (block.find(value => /^Example Name:/i.test(value)) || '').replace(/^Example Name:\s*/i, '') }
  }).sort((a, b) => a.type.localeCompare(b.type))
})()
const contactTypes = contactCatalog.map(contact => contact.type)
const contactNameThemes = {
  'Street and underworld contacts': { names: ['The Fox', 'Knuckles', 'Velvet Knife', 'Switch', 'Saint Zero', 'Blackwire', 'Two-Coins', 'Red Jack', 'Nightglass', 'Locke', 'The Magpie', 'Nine Lives', 'Copperhead', 'Mister Lucky', 'Blue Mercy', 'The Locksmith', 'Glassjaw', 'Silk', 'Dead Letter', 'The Bishop', 'Crow', 'Razor Anne', 'Quiet Ivan', 'Moth', 'Gold Teeth'] },
  'Magical and supernatural contacts': { first: ['Aster', 'Morrow', 'Seraphine', 'Thorne', 'Ysabet'], last: ['Ashveil', 'Moonwake', 'Graves', 'Starling', 'Wyrd'] },
  'Medical and technical contacts': { first: ['Dr. Nova', 'Patch', 'Ilya', 'Sable', 'Torque'], last: ['Voss', 'Quill', 'Hexley', 'Rook', 'Mek'] },
  'Government and authority contacts': { first: ['Avery', 'Cassian', 'Imani', 'Lucien', 'Mara'], last: ['Vale', 'Sterling', 'Kade', 'Thorne', 'Navarro'] },
  'Guild-specific contacts': { first: ['Bishop', 'Caldera', 'Echo', 'Moxie', 'Orion'], last: ['Vane', 'Brass', 'Wayfinder', 'Cross', 'Peregrine'] },
  'Information contacts': { first: ['Cipher', 'Dahlia', 'Ink', 'Milo', 'Vesper'], last: ['Grey', 'Ledger', 'Finch', 'Sable', 'Whisper'] },
  'Social and political contacts': { first: ['Ambrose', 'Celeste', 'Juno', 'Octavia', 'Rafi'], last: ['Bellacourt', 'Damaris', 'Montrose', 'Solari', 'Vey'] },
  'Travel and logistics contacts': { first: ['Atlas', 'Briar', 'Jax', 'Nell', 'Roan'], last: ['Farwind', 'Kestrel', 'North', 'Skylark', 'Wayne'] },
}
const contactGivenNames = {
  'Magical and supernatural contacts': ['Aster', 'Morrow', 'Seraphine', 'Thorne', 'Ysabet', 'Elowen', 'Caelum', 'Isolde', 'Orin', 'Virelai', 'Nimue', 'Corvin', 'Lysandra', 'Fenric', 'Maelis', 'Oberon', 'Rhiannon', 'Sorin', 'Tamsin', 'Vaela', 'Wulfric', 'Xanthe', 'Zephyr', 'Amaranthe', 'Bastien'],
  'Medical and technical contacts': ['Nova', 'Ilya', 'Sable', 'Torque', 'Anika', 'Bex', 'Ciro', 'Dax', 'Elian', 'Fara', 'Gideon', 'Hana', 'Jiro', 'Keira', 'Levon', 'Mina', 'Niko', 'Oona', 'Pavel', 'Quin', 'Rhea', 'Tarek', 'Uma', 'Vikram', 'Zadie'],
  'Government and authority contacts': ['Avery', 'Cassian', 'Imani', 'Lucien', 'Mara', 'Beatrix', 'Conrad', 'Diana', 'Evander', 'Farah', 'Gareth', 'Helena', 'Jonas', 'Katerina', 'Lorenzo', 'Nadia', 'Osric', 'Priya', 'Quentin', 'Rosalind', 'Stefan', 'Theresa', 'Ulysses', 'Valeria', 'Warren'],
  'Guild-specific contacts': ['Bishop', 'Caldera', 'Echo', 'Moxie', 'Orion', 'Aegis', 'Brindle', 'Cobalt', 'Dagger', 'Ember', 'Flint', 'Gambit', 'Hawkeye', 'Indigo', 'Jubilee', 'Kodiak', 'Lancer', 'Meridian', 'Nimbus', 'Onyx', 'Peregrine', 'Quarry', 'Rook', 'Sundown', 'Tempest'],
  'Information contacts': ['Cipher', 'Dahlia', 'Ink', 'Milo', 'Vesper', 'Arden', 'Bram', 'Cleo', 'Dexter', 'Esme', 'Felix', 'Greer', 'Hollis', 'Iris', 'Jasper', 'Kit', 'Linnea', 'Marcel', 'Noemi', 'Odessa', 'Percival', 'Reed', 'Sybil', 'Tristan', 'Wren'],
  'Social and political contacts': ['Ambrose', 'Celeste', 'Juno', 'Octavia', 'Rafi', 'Alistair', 'Bianca', 'Cosima', 'Dominic', 'Estella', 'Fabian', 'Genevieve', 'Hadrian', 'Ines', 'Julian', 'Khadija', 'Leander', 'Margot', 'Nikolai', 'Ophelia', 'Paloma', 'Roderick', 'Sabine', 'Theodore', 'Vivienne'],
  'Travel and logistics contacts': ['Atlas', 'Briar', 'Jax', 'Nell', 'Roan', 'Alden', 'Bodhi', 'Calla', 'Drake', 'Eamon', 'Freya', 'Griffin', 'Heath', 'Idris', 'Kellan', 'Lark', 'Magnus', 'Neve', 'Otto', 'Piper', 'Rowan', 'Selka', 'Tobin', 'Una', 'West'],
}
const contactSurnames = {
  'Magical and supernatural contacts': ['Ashveil', 'Moonwake', 'Gravesend', 'Starbloom', 'Wyrdwood', 'Blackbriar', 'Cinderhex', 'Dreamtide', 'Eldergloom', 'Frostwhisper', 'Gloamspire', 'Hollowmere', 'Ivythorn', 'Jadefire', 'Kingshade', 'Loreweaver', 'Mistmantle', 'Nevermoor', 'Omenwood', 'Pyrevale', 'Quicksilver', 'Runebloom', 'Spellwater', 'Twilight', 'Veilborn'],
  'Medical and technical contacts': ['Voss', 'Quill', 'Hexley', 'Rooke', 'Meklin', 'Arclight', 'Baines', 'Circuit', 'Dynamo', 'Edison', 'Flux', 'Gantry', 'Hardwire', 'Ionis', 'Joule', 'Kepler', 'Lovelace', 'Mach', 'Newton', 'Ohm', 'Pascal', 'Relay', 'Sprocket', 'Turing', 'Volta'],
  'Government and authority contacts': ['Vale', 'Sterling', 'Kade', 'Navarro', 'Aldridge', 'Bancroft', 'Carmine', 'Delacroix', 'Everett', 'Fairfax', 'Grantham', 'Hargrove', 'Ivers', 'Justice', 'Kensington', 'Lockwood', 'Marchand', 'Norwood', 'Ortega', 'Prescott', 'Redmond', 'Sinclair', 'Templeton', 'Underhill', 'Whitaker'],
  'Guild-specific contacts': ['Vane', 'Brass', 'Wayfinder', 'Cross', 'Peregrine', 'Banner', 'Compass', 'Dawnguard', 'Evermark', 'Forgehand', 'Goldcrest', 'Highroad', 'Ironseal', 'Journeyman', 'Keystone', 'Longwatch', 'Mainsail', 'Northstar', 'Oathkeeper', 'Pathfinder', 'Questor', 'Ravenshield', 'Stronghold', 'Trailblazer', 'Vanguard'],
  'Information contacts': ['Grey', 'Ledger', 'Finch', 'Sable', 'Whisper', 'Archive', 'Blackwell', 'Clue', 'Dossier', 'Evidence', 'Footnote', 'Gazette', 'Headline', 'Index', 'Journal', 'Keynote', 'Leads', 'Marginalia', 'Newswire', 'Observer', 'Proof', 'Question', 'Record', 'Source', 'Tipline'],
  'Social and political contacts': ['Bellacourt', 'Damaris', 'Montrose', 'Solari', 'Vey', 'Armitage', 'Beaumont', 'Cavalieri', 'Devereaux', 'Escarra', 'Fontaine', 'Gainsborough', 'Hollingsworth', 'Imperiali', 'Jourdain', 'Kingsley', 'Laurent', 'Medici', 'Novak', 'Pemberton', 'Richelieu', 'StJames', 'Talleyrand', 'Valmont', 'Wellington'],
  'Travel and logistics contacts': ['Farwind', 'Kestrel', 'North', 'Skylark', 'Wayne', 'Anchorage', 'Bridgewater', 'Compassrose', 'Downriver', 'Eastward', 'Fleetfoot', 'Greenway', 'Highpass', 'Ironroad', 'Jetstream', 'Knapsack', 'Longhaul', 'Mooring', 'Nightroad', 'Overland', 'Portage', 'Roadstead', 'Southbound', 'Trackless', 'Westward'],
}
const specializedContactNames = {
  Witch: ['Agatha Blackthorn', 'Baba Mirelda', 'Circe Ashroot', 'Elspeth Crow', 'Hecate Voss', 'Morgana Briar', 'Rowena Nightshade', 'Sycorax Vale', 'Tabitha Hex', 'Winifred Graves', 'Ysolde Moon', 'Belladonna Wren', 'Cerridwen Frost', 'Desdemona Reed', 'Eudora Hollow', 'Griselda Bone', 'Hazel Croft', 'Lilith Hawthorn', 'Melisande Gloom', 'Nimue Blackwater', 'Opal Thistle', 'Petra Wolfsbane', 'Ravenna Dusk', 'Selene Candlewick', 'Zora Hemlock'],
  'Fey emissary': ['Aelthir-of-the-Dew', 'Brindlecap', 'Caerwyn Silverleaf', 'Dandelion-in-Winter', 'Eirlys Moondance', 'Fable Thistledown', 'Gossamer Vex', 'Hush-of-the-Hollow', 'Iriandel Starbloom', 'Juniper Neverlost', 'Kithri Mossbell', 'Larkspur Twice-Born', 'Mab-of-the-Mirrors', 'Nettle Quicklaugh', 'Oberielle Dawnpetal', 'Puck-of-Seven-Doors', 'Quillan Greenmantle', 'Rhoswen Mothwing', 'Sable Underbough', 'Tatterdemalion Blue', 'Umbriel Foxglove', 'Vervain Goldsong', 'Whisper-on-the-Wind', 'Xylia Dreamthorn', 'Yarrow Candlemoon'],
  Hacker: ['Null', 'Trinity', 'Morpheus', 'Cipher', 'Switch', 'Ghostroot', 'ZeroCool', 'Kernel Panic', 'White Rabbit', 'Backdoor', 'Deadlock', 'Glitch', 'Hex', 'Icebreaker', 'Jailbird', 'KillSwitch', 'Mainframe', 'Nightcode', 'Packet Witch', 'Root', 'Syntax', 'Trace', 'Vector', 'Wiretap', 'Zion'],
  Necromancer: ['Acheron Black', 'Bellamy Crypt', 'Corvus Dread', 'Drusilla Mourn', 'Erebus Nightfall', 'Faust Ossuary', 'Grimm Pall', 'Helena Mortis', 'Iskander Bone', 'Jezebel Dirge', 'Karn Sepulcher', 'Lazarus Vile', 'Mordecai Tomb', 'Nyx Sorrow', 'Orcus Gallow', 'Persephone Shade', 'Quillon Carrion', 'Ravenna Blight', 'Silas Wormwood', 'Thanatos Crow', 'Ulric Doom', 'Vesper Noose', 'Wednesday Rot', 'Xerxes Dust', 'Zillah Bane'],
  Oracle: ['Aletheia Glass', 'Blind Amon', 'Cassandra Nine', 'Delphi Rain', 'Eidolon Veil', 'Fate-of-Ash', 'Glimpse Meridian', 'Horizon Blue', 'Ione Tomorrow', 'Janus Twice', 'Kismet Pale', 'Lumen Omen', 'Moira Thread', 'Nostrad Vale', 'Oneiros Waking', 'Pythia Smoke', 'Quintessence Dawn', 'Revelation Snow', 'Sibyl Red', 'Tomorrow Never', 'Urd Well', 'Vision Marrow', 'Wyrd Unspoken', 'Xenia Stars', 'Yestera Bloom'],
  'Spirit medium': ['Amity Bell', 'Blythe Candle', 'Constance Knock', 'Dora Whisper', 'Ephraim Table', 'Florence Hush', 'Gideon Rattle', 'Honora Séance', 'Ianthe Chime', 'Jonquil Lantern', 'Keziah Veil', 'Lenora Still', 'Miriam Echo', 'Nolan Tallow', 'Ottilie Trance', 'Prudence Wisp', 'Rosamund Locket', 'Silvanus Murmur', 'Temperance Lace', 'Uriel Vigil', 'Verity Parlour', 'Wilhelmina Shade', 'Xavier Planchette', 'Yvette Spirit', 'Zebulon Wake'],
  'Ghost informant': ['Ashes', 'Blue Lady', 'Cold Tom', 'Drowned Anne', 'Empty Chair', 'Flicker', 'Grey Boy', 'Hanged Jack', 'Ivory Widow', 'Jenny-in-the-Wall', 'Knocking Man', 'Last Breath', 'Mourning Child', 'No-Face', 'Old Scratch', 'Pale Rider', 'Quiet Bride', 'Ragged King', 'Smoke', 'Thin Man', 'Unburied', 'Velvet Ghost', 'Weeping Rose', 'Yesterday', 'Zero Hour'],
  'Time traveler': ['After', 'Anachron', 'Before', 'Clockwise', 'Continuum', 'Daybreak-7', 'Epoch', 'Elsewhen', 'Future Perfect', 'Hourglass', 'Janus-12', 'Last Tuesday', 'Loop', 'Meridian-0', 'Neverwhen', 'Next Year', 'Paradox', 'Retrograde', 'Secondhand', 'Soon', 'Tachyon', 'Tomorrow-9', 'Tuesday Again', 'When', 'Yesterday-Prime'],
  'Cult leader': ['Apostle Veyra', 'Brother Zenith', 'Chosen Orison', 'Daughter Radiant', 'Elder Seraph', 'Father Halcyon', 'Hierophant Lux', 'Mother Dominion', 'Oracle Ascendant', 'Pastor Rapture', 'Preceptor Sol', 'Prophet Auric', 'Reverend Ecstasy', 'Saint Vesper', 'Shepherd Crown', 'Sister Mercy', 'Speaker Eternal', 'The Anointed', 'Voice Celestial', 'Abbot Triumph', 'Canon Glory', 'Deacon Promise', 'Guru Sublime', 'Imam Infinite', 'Pontiff Dawn'],
}
const contactNamePools = Object.fromEntries(contactCatalog.map(({ type, category, example }) => {
  if (specializedContactNames[type]) return [type, specializedContactNames[type]]
  const theme = contactNameThemes[category] || contactNameThemes['Information contacts']
  const offset = [...type].reduce((total, character) => total + character.charCodeAt(0), 0) % 5
  const names = example ? [example] : []
  if (theme.names) theme.names.forEach((name, index) => { const candidate = theme.names[(index + offset) % theme.names.length]; if (names.length < 25 && !names.includes(candidate)) names.push(candidate) })
  else (contactGivenNames[category] || contactGivenNames['Information contacts']).forEach((givenName, index, givenNames) => { const selectedIndex = (index + offset) % givenNames.length; const selectedGivenName = givenNames[selectedIndex]; const selectedSurname = (contactSurnames[category] || contactSurnames['Information contacts'])[selectedIndex]; const candidate = `${selectedGivenName} ${selectedSurname}`; const existingParts = names.map(name => name.toLowerCase().split(/\s+/)); const repeatsName = existingParts.some(parts => parts[0] === selectedGivenName.toLowerCase() || parts.at(-1) === selectedSurname.toLowerCase()); if (names.length < 25 && !repeatsName) names.push(candidate) })
  return [type, names.slice(0, 25)]
}))
const archetypeContactRoles = {
  Barbarian: ['Wilderness scout', 'Shaman', 'Caravan master', 'Witch', 'Ferryman'],
  'Bounty Hunter': ['Informant', 'Fixer', 'Detective', 'Fence', 'Monster bounty clerk', 'Getaway driver'],
  Brainiac: ['Librarian', 'Engineer', 'Artifact appraiser', 'Occult researcher', 'Portal technician'],
  Cleric: ['Temple priest', 'Exorcist', 'Resurrection specialist', 'Spirit medium', 'Cult defector'],
  Commando: ['Guild quartermaster', 'Spy handler', 'Demolitions expert', 'Mission handler', 'Pilot'],
  Criminal: ['Fence', 'Forger', 'Corrupt official', 'Crime boss', 'Safecracker', 'Street doctor'],
  Druid: ['Wilderness scout', 'Witch', 'Monster handler', 'Shaman', 'Expedition outfitter'],
  'Eco Terrorist': ['Protest organizer', 'Wilderness scout', 'Revolutionary', 'Demolitions expert', 'Street doctor'],
  'Ex-Company Man': ['Fixer', 'Corrupt official', 'Spy handler', 'Guild lawyer', 'Mission handler'],
  'Ex-Cop': ['Detective', 'Informant', 'Judge', 'Prison warden', 'Street doctor'],
  'Ex-Military': ['Guild quartermaster', 'Mission handler', 'Pilot', 'Demolitions expert', 'Street doctor'],
  Cog: ['Engineer', 'Mechanic', 'Portal technician', 'Hacker', 'Artificer'],
  Face: ['Fixer', 'Diplomat', 'Journalist', 'Noble', 'Sponsorship agent', 'Bartender'],
  Fixer: ['Informant', 'Fence', 'Crime boss', 'Smuggler', 'Corrupt official', 'Mission handler'],
  Ganger: ['Street doctor', 'Crime boss', 'Getaway driver', 'Fence', 'Informant'],
  'Gonzo Journalist': ['Journalist', 'Informant', 'Bartender', 'Private investigator', 'Courier'],
  Gunslinger: ['Retired adventurer', 'Monster bounty clerk', 'Bartender', 'Guild quartermaster', 'Caravan master'],
  Hacker: ['Hacker', 'Fixer', 'Mechanic', 'Forger', 'Informant'],
  'Mad Bomber': ['Demolitions expert', 'Engineer', 'Fence', 'Alchemist', 'Smuggler'],
  Mage: ['Wizard', 'Occult researcher', 'Artifact appraiser', 'Artificer', 'Planar navigator'],
  Mercenary: ['Mission handler', 'Guild quartermaster', 'Fixer', 'Pilot', 'Street doctor'],
  Monk: ['Temple priest', 'Retired adventurer', 'Wilderness scout', 'Diplomat', 'Spirit medium'],
  Ninja: ['Spy handler', 'Forger', 'Locksmith', 'Informant', 'Fence'],
  Performer: ['Sponsorship agent', 'Bartender', 'Noble', 'Journalist', 'Patron', 'Fixer'],
  'Private Eye/Investigator': ['Detective', 'Journalist', 'Informant', 'Bartender', 'Corrupt official'],
  Screamer: ['Mechanic', 'Getaway driver', 'Pilot', 'Smuggler', 'Street doctor'],
  Shaman: ['Spirit medium', 'Witch', 'Wilderness scout', 'Exorcist', 'Fey emissary'],
  Smuggler: ['Fence', 'Border agent', 'Ship captain', 'Forger', 'Corrupt official', 'Pilot'],
  Sniper: ['Spy handler', 'Guild quartermaster', 'Wilderness scout', 'Fixer', 'Street doctor'],
  Spy: ['Spy handler', 'Diplomat', 'Forger', 'Informant', 'Interdimensional customs liaison'],
  'Street Doc': ['Street doctor', 'Poison specialist', 'Prosthetist (cybernetic or magical)', 'Alchemist', 'Fixer'],
  'Street Samurai': ['Fixer', 'Mechanic', 'Fence', 'Street doctor', 'Crime boss'],
  Warlock: ['Cult leader', 'Occult researcher', 'Necromancer', 'Fey emissary', 'Artifact appraiser'],
}
const contactNameKey = name => {
  const words = String(name).trim().toLowerCase().split(/\s+/)
  if (['the', 'dr.', 'doctor', 'mister', 'miss', 'captain'].includes(words[0])) return words.slice(0, 2).join(' ')
  return words[0] || ''
}
const contactSurnameKey = name => String(name).trim().toLowerCase().split(/\s+/).at(-1) || ''
const randomContactName = (role, usedNames = new Set()) => {
  const pool = contactNamePools[role] || []
  const usedKeys = new Set([...usedNames].map(contactNameKey))
  const usedSurnames = new Set([...usedNames].map(contactSurnameKey))
  const available = pool.filter(name => !usedNames.has(name) && !usedKeys.has(contactNameKey(name)) && !usedSurnames.has(contactSurnameKey(name)))
  const choices = available
  return choices.length ? choices[Math.floor(Math.random() * choices.length)] : ''
}
const archetypeOptions = (() => {
  const lines = archetypesText.split(/\r?\n/).map(line => line.trim())
  const headings = lines.map((line, index) => ({ line, index })).filter(({ line, index }) => line.includes(' - ') && /^Scores:/i.test(lines.slice(index + 1).find(Boolean) || ''))
  return headings.map(({ line, index }, headingIndex) => {
    const end = headings[headingIndex + 1]?.index ?? lines.length
    const block = lines.slice(index, end)
    const scoresLine = block.find(entry => /^Scores:/i.test(entry)) || ''
    const strengths = (block.find(entry => /^Strengths:/i.test(entry)) || '').replace(/^Strengths:\s*/i, '').split(',').map(value => value.trim())
    const weaknesses = (block.find(entry => /^Weaknesses:/i.test(entry)) || '').replace(/^Weaknesses:\s*/i, '').split(',').map(value => value.trim())
    const preferredTalents = (block.find(entry => /^(Preferred Talents|Talents):/i.test(entry)) || '').replace(/^(Preferred Talents|Talents):\s*/i, '').split(',').map(value => value.trim()).filter(Boolean)
    const personalityIndex = block.findIndex(entry => /^Personality:/i.test(entry))
    const traits = block.slice(personalityIndex < 0 ? block.length : personalityIndex).map(entry => entry.replace(/^Personality:\s*/i, '')).map(entry => { const match = entry.match(/^(.+?)\s+-\s+(.+)$/); return match ? { name: match[1].trim(), description: match[2].trim() } : null }).filter(Boolean)
    return {
      name: line.split(' - ')[0].trim(), strengths, weaknesses, preferredTalents, traits,
      stats: Object.fromEntries(stats.map(([key, label]) => [key, number(scoresLine.match(new RegExp(`${label}\\s+([+-]?\\d+)`, 'i'))?.[1])])),
    }
  }).sort((a, b) => a.name.localeCompare(b.name))
})()
const talentLoadoutVersion = 1
const talentLoadoutMarker = archetypeName => `${talentLoadoutVersion}:${archetypeName}`
const populateArchetypeTalents = (existingTalents, archetype) => {
  const talents = existingTalents.filter(talent => talent.source !== 'archetype').map(talent => ({ ...talent }))
  archetype.preferredTalents.forEach(requestedName => {
    const catalogTalent = talentCatalog.find(talent => talent.name.toLowerCase() === requestedName.toLowerCase())
    if (!catalogTalent) return
    const talent = { id: crypto.randomUUID(), name: catalogTalent.name, ability: catalogTalent.ability, duration: catalogTalent.duration, notes: catalogTalent.notes, source: 'archetype' }
    const emptyIndex = talents.findIndex(entry => !entry.name?.trim() && !entry.ability?.trim() && !entry.duration?.trim() && !entry.notes?.trim())
    if (emptyIndex >= 0) talents[emptyIndex] = { ...talent, id: talents[emptyIndex].id || talent.id }
    else talents.push(talent)
  })
  return talents
}
const blankRows = (count, shape) => Array.from({ length: count }, () => ({ ...shape, id: crypto.randomUUID() }))
const newCharacter = () => ({
  id: crypto.randomUUID(), name: 'New Hero', species: '', archetype: '', level: 0, xp: 0,
  stats: Object.fromEntries(stats.map(([key]) => [key, ''])),
  skills: Object.fromEntries(skillDefs.map(([key]) => [key, { ability: '', modifier: 0, buffs: 0, debuffs: 0 }])),
  attackSkill: '', attackModifier: 0, defenseBonus: 0, defenseRating: 0,
  currentHp: 10, temporaryHp: 0, currentEnergy: 0,
  weapons: blankRows(2, { name: '', type: 'Unarmed / Tiny Melee', enhancement: 0, notes: '' }),
  talents: blankRows(2, { name: '', ability: '', duration: '', notes: '' }),
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
    let talents = character.talents.map(row => {
      const talent = talentCatalog.find(option => option.name === row.name)
      if (!talent) return row
      const ability = cleanTalentAbility(row.ability || talent.ability).replaceAll('Standard Force Energy', 'Standard Energy')
      const duration = row.duration || talent.duration
      const notes = row.notes || talent.notes
      if (ability !== row.ability || duration !== row.duration || notes !== row.notes) changed = true
      return { ...row, ability, duration, notes }
    })
    const archetype = archetypeOptions.find(option => option.name === character.archetype)
    const needsTalentLoadout = Boolean(archetype && character.talentLoadoutAppliedFor !== talentLoadoutMarker(character.archetype))
    if (needsTalentLoadout) { talents = populateArchetypeTalents(talents, archetype); changed = true }
    const items = character.items.map(row => {
      const trait = archetype?.traits.find(option => option.name === row.name)
      const legacyArchetypeRow = row.source === 'archetype' || row.bonus === 'Archetype trait' || row.appliesTo === character.archetype || /^Archetype trait\s*[—-]/i.test(row.description || '')
      if (!trait || !legacyArchetypeRow) return row
      if (row.description === trait.description && !row.bonus && !row.appliesTo) return row
      changed = true
      return { ...row, description: trait.description, bonus: '', appliesTo: '', source: 'archetype' }
    })
    const needsWeaponLoadout = Boolean(archetype && character.weaponLoadoutAppliedFor !== weaponLoadoutMarker(character.archetype))
    const weapons = needsWeaponLoadout ? populateArchetypeWeapons(character.weapons, character.archetype) : character.weapons
    if (needsWeaponLoadout) changed = true
    if (changed) setCharacter(current => ({ ...current, talents, items, weapons, talentLoadoutAppliedFor: needsTalentLoadout ? talentLoadoutMarker(character.archetype) : current.talentLoadoutAppliedFor, weaponLoadoutAppliedFor: needsWeaponLoadout ? weaponLoadoutMarker(character.archetype) : current.weaponLoadoutAppliedFor, updatedAt: Date.now() }))
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
  const setContactRole = (index, role) => setCharacter(current => {
    const copy = structuredClone(current)
    const contact = copy.contacts[index]
    contact.role = role
    if (!contact.name?.trim() && contactNamePools[role]) {
      const usedNames = new Set(copy.contacts.map(entry => entry.name).filter(Boolean))
      contact.name = randomContactName(role, usedNames)
    }
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
      const talents = populateArchetypeTalents(current.talents, preset)
      const contacts = current.contacts.map(contact => ({ ...contact }))
      const requiredContacts = Math.max(0, 3 + number(preset.stats.charisma))
      const roles = archetypeContactRoles[preset.name] || ['Fixer', 'Informant', 'Retired adventurer', 'Mission handler', 'Bartender']
      const usedNames = new Set(contacts.map(contact => contact.name).filter(Boolean))
      let populatedContacts = contacts.filter(contact => contact.name?.trim() || contact.role?.trim()).length
      for (let roleIndex = 0; populatedContacts < requiredContacts; roleIndex += 1) {
        const role = roles[roleIndex % roles.length]
        const generated = { id: crypto.randomUUID(), name: randomContactName(role, usedNames), role, source: 'archetype' }
        usedNames.add(generated.name)
        const emptyIndex = contacts.findIndex(contact => !contact.name?.trim() && !contact.role?.trim())
        if (emptyIndex >= 0) contacts[emptyIndex] = { ...generated, id: contacts[emptyIndex].id || generated.id }
        else contacts.push(generated)
        populatedContacts += 1
      }
      return {
        ...current, archetype: preset.name, stats: { ...current.stats, ...preset.stats },
        attackSkill: allocation.attack,
        skills: Object.fromEntries(skillDefs.map(([key]) => [key, { ...current.skills[key], ability: allocation[key] }])),
        items, weapons, talents, contacts, talentLoadoutAppliedFor: talentLoadoutMarker(preset.name), weaponLoadoutAppliedFor: weaponLoadoutMarker(preset.name), updatedAt: Date.now(),
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
    <div className="library-hero"><span className="eyebrow">PLAY AT THE TABLE</span><h1>Playable Character Sheet</h1><p className="library-intro">Build a Hero, bring back a locally saved character, or import one from another device.</p><p className="library-storage-note">Characters are stored only on this device in your browser. Clearing site data or browser storage, resetting the browser, or using private browsing may remove them. To protect a Hero or move them between devices, load the character and export a backup copy.</p>
      <div className="library-actions"><button className="primary" onClick={() => setCharacter(newCharacter())}>＋ Create New Hero</button><button onClick={() => fileRef.current.click()}>⇧ Upload Character</button></div>
      <input ref={fileRef} className="visually-hidden" type="file" accept=".json,.mag-character.json,application/json" onChange={importFile} />
    </div>
    <section className="saved-library"><h2>Saved Heroes</h2>{characters.length === 0 ? <div className="empty-state"><strong>No saved Heroes yet</strong><span>Your characters stay in this browser using local storage.</span></div> : <div className="character-grid">{characters.map(hero => <article className="character-card" key={hero.id}><div><span>LEVEL {hero.level || 0}</span><h3>{hero.name}</h3><p>{[hero.species, hero.archetype].filter(Boolean).join(' • ') || 'Unwritten legend'}</p></div><div className="card-actions"><button className="primary" onClick={() => setCharacter(structuredClone(hero))}>Load</button><button className="danger" onClick={() => remove(hero.id)}>Delete</button></div></article>)}</div>}</section>
    {notice && <div className="toast">{notice}</div>}
  </div>

  const skillTotal = (key, stat) => number(character.stats[stat]) + Object.values(character.skills[key]).reduce((sum, value) => sum + number(value), 0)
  const combatSlots = 1 + (computed.level >= 4 ? 1 : 0) + (computed.level >= 7 ? 1 : 0)
  const addRow = (key, shape) => update([key], [...character[key], { ...shape, id: crypto.randomUUID() }])
  const deleteRow = (key, id) => update([key], character[key].filter(row => row.id !== id))
  const selectTalent = (index, name) => {
    const talent = talentCatalog.find(option => option.name === name)
    setCharacter(current => {
      const copy = structuredClone(current)
      copy.talents[index] = { ...copy.talents[index], name, ability: talent?.ability || '', duration: talent?.duration || '', notes: talent?.notes || '' }
      copy.updatedAt = Date.now()
      return copy
    })
  }
  const statOptionUnavailable = (currentKey, option) => {
    const available = startingStatArray.filter(value => value === option).length
    const usedByOtherStats = stats.filter(([key]) => key !== currentKey && character.stats[key] !== '').filter(([key]) => number(character.stats[key]) === option).length
    return usedByOtherStats >= available
  }
  const skillOptionUnavailable = (currentKey, option) => {
    const available = startingSkillArray.filter(value => value === option).length
    const assignments = [['attack', character.attackSkill], ...skillDefs.map(([key]) => [key, character.skills[key].ability])]
    const usedByOtherSkills = assignments.filter(([key, value]) => key !== currentKey && value !== '').filter(([, value]) => number(value) === option).length
    return usedByOtherSkills >= available
  }
  return <div className="sheet-page">
    <div className="sheet-toolbar"><button onClick={() => setCharacter(null)}>← Heroes</button><div className="toolbar-title"><strong>{character.name || 'Unnamed Hero'}</strong><span>Level {computed.level}</span></div><button onClick={() => setCharacter(newCharacter())}>New</button><button onClick={() => fileRef.current.click()}>Load File</button><button onClick={exportCharacter}>Export</button><label className="autosave-toggle"><input type="checkbox" checked={character.autoSave !== false} onChange={e => setAutoSave(e.target.checked)}/><span>Autosave</span></label><button className="primary" onClick={save}>Save</button><input ref={fileRef} className="visually-hidden" type="file" accept="application/json,.json" onChange={importFile} /></div>
    <header className="sheet-header"><img src="/multiverse%20adventurers%20guild%20icon.png" alt="Guild shield"/><div><span className="eyebrow sheet-eyebrow">MULTIVERSE ADVENTURERS GUILD</span><h1>Character Sheet</h1></div><div className="identity-fields">
      <Field label="Hero name" value={character.name} onChange={v => update(['name'], v)} wide/><IdentityChoice label="Species" value={character.species} options={speciesNames} onChange={v => update(['species'], v)}/><IdentityChoice label="Archetype" value={character.archetype} options={archetypeOptions.map(option => option.name)} onChange={applyArchetype}/><Field label="Level" type="number" min="0" max="10" value={character.level} onChange={v => update(['level'], v)}/><Field label="XP" type="number" min="0" value={character.xp} onChange={v => update(['xp'], v)}/></div></header>

    <section className="sheet-section vitals"><SectionTitle icon="⚔" title="Combat Summary" subtitle="Move 30 feet each turn. One reaction per round."/><div className="vital-grid">
      <Vital label="Initiative" value={signed(computed.initiative)} roll={() => checkRoll('Initiative', computed.initiative)}/><Vital label="HP" editable value={character.currentHp} max={computed.maxHp} onChange={v => update(['currentHp'], v)}/><DefenseVital value={computed.defense} bonus={character.defenseBonus} rating={character.defenseRating} onBonus={value => update(['defenseBonus'], value)} onRating={value => update(['defenseRating'], value)}/><Vital label="Resilience" value={signed(computed.resilience)} roll={() => checkRoll('Resilience', computed.resilience)}/><Vital label="Ego" value={signed(computed.ego)} roll={() => checkRoll('Ego', computed.ego)}/><Vital label="Energy" editable value={character.currentEnergy} max={computed.maxEnergy} onChange={v => update(['currentEnergy'], v)}/><Vital label="Max Force" value={computed.maxForce}/></div>
    </section>

    <div className="sheet-columns"><section className="sheet-section"><SectionTitle icon="▥" title="Stats" subtitle="Starting array: +3, +2, +1, 0, 0, −1. Each choice can only be used once, except 0 twice."/><div className="stat-list">{stats.map(([key, label, short, Icon]) => <div className="stat-row" key={key}><div className="stat-name"><Icon/><strong>{label} <span>({short})</span></strong></div><SkillScoreControl label={`${label} score`} value={character.stats[key]} options={[-1, 0, 1, 2, 3]} isOptionDisabled={option => statOptionUnavailable(key, option)} onChange={v => update(['stats', key], v)}/><button className="roll-button" onClick={() => checkRoll(label, character.stats[key])}>Roll</button></div>)}</div></section>
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
            <SkillScoreControl label={`${label} ability`} value={character.skills[key].ability} options={[-1, 0, 1, 2]} isOptionDisabled={option => skillOptionUnavailable(key, option)} onChange={v => update(['skills', key, 'ability'], v)}/>
            {['modifier','buffs','debuffs'].map(field => <NumberInput key={field} value={character.skills[key][field]} onChange={v => update(['skills', key, field], field === 'debuffs' ? -Math.abs(number(v)) : v)}/>)}
            <div className="skill-total"><output>{signed(total)}</output><button className="roll-button" onClick={() => checkRoll(label, total)}>Roll</button></div>
          </div>
        })}
      </section></div>

    <section className="sheet-section"><SectionTitle icon="✦" title="Attack" subtitle="Attack skill applies to melee and ranged attacks"/><div className="attack-summary"><label className="field attack-control"><span>Attack skill</span><SkillScoreControl label="Attack skill" value={character.attackSkill} options={[-1, 0, 1, 2]} isOptionDisabled={option => skillOptionUnavailable('attack', option)} onChange={v => update(['attackSkill'], v)}/></label><label className="field attack-control"><span>Modifier</span><input type="number" value={character.attackModifier} onChange={e => update(['attackModifier'], e.target.value)}/></label><AttackEquation label="Melee" statLabel="Strength" stat={character.stats.strength} attack={character.attackSkill} modifier={character.attackModifier}/><AttackEquation label="Ranged" statLabel="Dexterity" stat={character.stats.dexterity} attack={character.attackSkill} modifier={character.attackModifier}/></div></section>

    <EditableTable title="Weapons" icon="⚔" rows={character.weapons} add={() => addRow('weapons', { name: '', type: weaponTypes[0][0], enhancement: 0, notes: '' })} remove={id => deleteRow('weapons', id)} columns={['Name','Type','Enhancement','Damage','Notes','']}>
      {(row, i) => {
        const weaponType = weaponTypes.find(type => type[0] === row.type) || weaponTypes[0]
        const damageStat = weaponType[1] === 'melee' ? character.stats.strength : character.stats.dexterity
        const damageModifier = number(damageStat) + number(row.enhancement)
        return <><input aria-label="Weapon name" value={row.name} onChange={e => update(['weapons',i,'name'],e.target.value)}/><select aria-label="Weapon type" value={row.type} onChange={e => update(['weapons',i,'type'],e.target.value)}>{weaponTypes.map(type => <option key={type[0]}>{type[0]}</option>)}</select><NumberInput value={row.enhancement} onChange={v => update(['weapons',i,'enhancement'],v)}/><output className="weapon-damage">d{weaponType[2]} {signed(damageModifier)}</output><input aria-label="Weapon notes" value={row.notes} onChange={e => update(['weapons',i,'notes'],e.target.value)}/><div className="row-actions"><button className="roll-button" onClick={() => attackRoll(row)}>Attack</button><button className="icon-button" onClick={() => deleteRow('weapons',row.id)}>×</button></div></>
      }}
    </EditableTable>
    <EditableTable title="Talents" icon="✹" subtitle={`Combat Slots: ${combatSlots}`} rows={character.talents} add={() => addRow('talents',{name:'',ability:'',duration:'',notes:''})} columns={['Talent','Ability / Cost','Duration','Notes','']}>
      {(row,i)=><><TalentControl value={row.name} onChange={value=>selectTalent(i,value)}/><input value={row.ability} onChange={e=>update(['talents',i,'ability'],e.target.value)}/><input value={row.duration || ''} onChange={e=>update(['talents',i,'duration'],e.target.value)}/><AutoTextarea value={row.notes || ''} onChange={value=>update(['talents',i,'notes'],value)}/><button className="icon-button" onClick={()=>deleteRow('talents',row.id)}>×</button></>}
    </EditableTable>
    <EditableTable title="Items & Traits" icon="⚗" rows={character.items} add={() => addRow('items',{name:'',description:''})} columns={['Item / Trait','Description','']}>
      {(row,i)=><><input value={row.name} onChange={e=>update(['items',i,'name'],e.target.value)}/><AutoTextarea value={row.description ?? [row.bonus,row.appliesTo].filter(Boolean).join(' — ')} onChange={value=>update(['items',i,'description'],value)}/><button className="icon-button" onClick={()=>deleteRow('items',row.id)}>×</button></>}
    </EditableTable>
    <div className="sheet-columns lower"><EditableTable title="Contacts" icon="♟" subtitle={`You begin with 3 + Charisma (${Math.max(0, 3 + number(character.stats.charisma))}) Contacts.`} rows={character.contacts} add={() => addRow('contacts',{name:'',role:''})} columns={['Name','Relationship / Role','']}>{(row,i)=><><input value={row.name} onChange={e=>update(['contacts',i,'name'],e.target.value)}/><ContactRoleChoice value={row.role} onChange={value=>setContactRole(i,value)}/><button className="icon-button" onClick={()=>deleteRow('contacts',row.id)}>×</button></>}</EditableTable><section className="sheet-section notes"><SectionTitle icon="✎" title="Session Notes"/><textarea value={character.notes} onChange={e=>update(['notes'],e.target.value)} placeholder="Conditions, mission clues, inventory, reminders…"/></section></div>
    {notice && <div className="toast">{notice}</div>}{roll && <RollModal roll={roll} close={() => setRoll(null)} damage={() => damageRoll(roll)}/>} 
  </div>
}

function Field({ label, onChange, wide, ...props }) { return <label className={`field ${wide ? 'wide' : ''}`}><span>{label}</span><input {...props} onChange={e => onChange(e.target.value)}/></label> }
function IdentityChoice({ label, value, options, onChange }) { const existing = options.includes(value); const [custom, setCustom] = useState(Boolean(value) && !existing); useEffect(() => { if (existing) setCustom(false) }, [existing]); const choose = event => { if (event.target.value === '__custom__') { onChange(''); setCustom(true) } else onChange(event.target.value) }; return <label className="field identity-choice"><span>{label}</span>{custom ? <div className="identity-custom"><input autoFocus aria-label={`Custom ${label}`} value={value} placeholder={`Enter custom ${label.toLowerCase()}`} onChange={e => onChange(e.target.value)}/><select className="custom-list-trigger" aria-label={`Choose ${label} from list`} value="" onChange={choose}><option value="" disabled></option>{options.map(option => <option value={option} key={option}>{option}</option>)}</select></div> : <select value={existing ? value : ''} onChange={choose}><option value="" disabled>Choose {label.toLowerCase()}</option><option value="__custom__">Custom {label.toLowerCase()}…</option>{options.map(option => <option value={option} key={option}>{option}</option>)}</select>}</label> }
function ContactRoleChoice({ value, onChange }) { const existing = contactTypes.includes(value); const [custom, setCustom] = useState(Boolean(value) && !existing); useEffect(() => { if (existing) setCustom(false) }, [existing]); const choose = event => { if (event.target.value === '__custom__') { onChange(''); setCustom(true) } else onChange(event.target.value) }; return custom ? <div className="identity-custom contact-role-choice"><input autoFocus aria-label="Custom contact role" value={value} placeholder="Enter custom role" onChange={event => onChange(event.target.value)}/><select className="custom-list-trigger" aria-label="Choose contact type from list" value="" onChange={choose}><option value="" disabled></option>{contactTypes.map(option => <option value={option} key={option}>{option}</option>)}</select></div> : <select aria-label="Contact role" value={existing ? value : ''} onChange={choose}><option value="" disabled>Choose contact type</option><option value="__custom__">Custom contact role…</option>{contactTypes.map(option => <option value={option} key={option}>{option}</option>)}</select> }
function NumberInput({ value, onChange }) { return <input className="number-input" type="number" value={value} onChange={e => onChange(e.target.value)}/> }
function AttackEquation({ label, statLabel, stat, attack, modifier }) { const total = number(stat) + number(attack) + number(modifier); return <div className="attack-equation"><h3>{label}</h3><div className="attack-equation-values"><span><small>{statLabel}</small><strong>{signed(stat)}</strong></span><span><small>Attack Skill</small><strong>{signed(attack)}</strong></span><span><small>Modifier</small><strong>{signed(modifier)}</strong></span><span className="attack-equation-total"><small>Total</small><strong>{signed(total)}</strong></span></div></div> }
function AutoTextarea({ value, onChange }) {
  const ref = useRef(null)
  const resize = element => {
    if (!element) return
    element.style.height = '0px'
    const styles = window.getComputedStyle(element)
    const lineHeight = parseFloat(styles.lineHeight) || 18
    const chrome = ['paddingTop', 'paddingBottom', 'borderTopWidth', 'borderBottomWidth'].reduce((total, property) => total + (parseFloat(styles[property]) || 0), 0)
    const maximum = lineHeight * 4 + chrome
    element.style.height = `${Math.min(element.scrollHeight, maximum)}px`
    element.style.overflowY = element.scrollHeight > maximum ? 'auto' : 'hidden'
  }
  useEffect(() => resize(ref.current), [value])
  useEffect(() => {
    if (!ref.current || !window.ResizeObserver) return undefined
    const observer = new ResizeObserver(() => resize(ref.current))
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return <textarea ref={ref} className="auto-textarea" rows="1" value={value} onChange={event => { onChange(event.target.value); window.requestAnimationFrame(() => resize(event.target)) }}/>
}
function SkillScoreControl({ label, value, options, onChange, isOptionDisabled = () => false }) { const hasPreset = value !== '' && options.includes(number(value)); const [custom, setCustom] = useState(value !== '' && !hasPreset); useEffect(() => { if (hasPreset) setCustom(false) }, [hasPreset]); const choose = event => { if (event.target.value === '__custom__') { onChange(''); setCustom(true) } else onChange(event.target.value) }; return custom ? <div className="identity-custom"><input autoFocus aria-label={`${label} custom value`} type="number" min="-4" max="4" value={value} onChange={event => onChange(event.target.value)}/><select className="custom-list-trigger" aria-label={`${label} preset list`} value="" onChange={choose}><option value="" disabled></option>{options.map(option => <option value={option} key={option} disabled={isOptionDisabled(option)}>{signed(option)}</option>)}</select></div> : <select aria-label={label} value={hasPreset ? number(value) : ''} onChange={choose}><option value="" disabled>Choose</option><option value="__custom__">Custom…</option>{options.map(option => <option value={option} key={option} disabled={isOptionDisabled(option)}>{signed(option)}</option>)}</select> }
function TalentControl({ value, onChange }) { return <div className="talent-control"><select aria-label="Choose a talent" value={talentNames.includes(value) ? value : ''} onChange={e => onChange(e.target.value)}><option value="">Choose a talent</option>{talentNames.map(name => <option value={name} key={name}>{name}</option>)}</select></div> }
function SectionTitle({ title, subtitle }) { const startingArray = title === 'Stats' || title === 'Skills' ? subtitle : ''; const reminders = { 'Combat Summary': 'Move 30 feet each turn, even if you attack. Take one reaction per round. Free actions: talk, draw a weapon, or step 5 feet.', Attack: 'One Skill is used for both melee and ranged attacks. Talents can add damage.', Skills: 'You can activate one Skill per turn.', Contacts: subtitle || 'You begin with 3 + Charisma Contacts.', Talents: 'You can activate two Talents per turn. Sustained combat Talents occupy your available Combat Slots.', 'Items & Traits': 'Items explain why your Stats and Skills look the way they do. They do not change numbers; they describe your Hero through equipment, Species, Archetype, and background. Examples: (+2) Strength — Giant Species; (−1) Sneak — loud, heavy boots. Treat them like character-defining gear without a price tag. Traits describe your Hero’s personality, beliefs, habits, and complications. Use them as roleplaying prompts; they do not change numbers unless a rule specifically says otherwise.', Weapons: 'You can attack once each turn, or move an extra 30 feet instead.' }; const note = reminders[title] || (startingArray ? '' : subtitle); const Icon = sectionIcons[title] || FaStar; return <div className="section-title"><h2 title={startingArray || undefined}><span><Icon/></span>{title}</h2>{(startingArray || note) && <p className={!note ? 'starting-array-only' : undefined}>{startingArray && <span className="starting-array-note">{startingArray} </span>}{note}</p>}{title === 'Talents' && subtitle && <strong className="section-metric">{subtitle}</strong>}</div> }
function Vital({ label, value, max, editable, onChange, roll, children }) { const Icon = vitalIcons[label]; return <div className="vital">{Icon && <Icon className="vital-icon"/>}<span>{label}</span>{editable && max !== undefined ? <div className="vital-combined"><input aria-label={`${label} current`} type="number" value={value} onChange={e=>onChange(e.target.value)}/><span>/</span><strong aria-label={`${label} maximum`}>{max}</strong></div> : editable ? <input type="number" value={value} onChange={e=>onChange(e.target.value)}/> : roll ? <div className="vital-roll-value"><strong>{value}</strong><button className="roll-button" onClick={roll}>Roll</button></div> : <strong>{value}</strong>}{children}</div> }
function DefenseVital({ value, bonus, rating, onBonus, onRating }) { return <div className="vital defense-vital"><FaShieldAlt className="vital-icon"/><span>Defense</span><div className="defense-controls"><label><span>Bonus</span><input aria-label="Bonus" type="number" value={bonus} onChange={event => onBonus(event.target.value)}/></label><strong aria-label="Defense total">{value}</strong><label><span>Rating</span><input aria-label="Rating" type="number" value={rating} onChange={event => onRating(event.target.value)}/></label></div></div> }
function EditableTable({ title, icon, subtitle, rows, columns, add, children }) { const slug = title.toLowerCase().replaceAll(' & ', '-').replaceAll(' ', '-'); return <section className={`sheet-section editable-table table-${slug}`}><SectionTitle icon={icon} title={title} subtitle={subtitle}/><div className="table-head">{columns.map((column,i)=><span key={`${column}-${i}`}>{column}</span>)}</div>{rows.map((row,i)=><div className="table-row" key={row.id}>{children(row,i)}</div>)}<button className="add-row" onClick={add}>＋ Add {title.replace(/s$/, '')}</button>{title === 'Talents' && <ForceTable/>}</section> }
function ForceTable() { return <div className="force-table"><h3>Force Activation Costs</h3><div className="force-row force-head"><span>Force</span><span>Sustained</span><span>One-shot</span></div>{[[1,1,1],[2,4,2],[3,9,4],[4,16,8]].map(([force,sustained,oneShot]) => <div className="force-row" key={force}><strong>F{force}</strong><span>{sustained} Energy</span><span>{oneShot} Energy</span></div>)}<p>One-shots last for one roll or immediate use and do not occupy a Talent Slot.</p></div> }
function RollModal({ roll, close, damage }) { const success = roll.result?.includes('Success') || roll.result?.includes('success') || roll.hit; return createPortal(<div className="modal-backdrop" onMouseDown={e => e.target===e.currentTarget && close()}><div className={`roll-modal ${success ? 'success' : ''}`} role="dialog" aria-modal="true"><button className="modal-close" onClick={close}>×</button><span className="eyebrow">{roll.kind === 'damage' ? 'DAMAGE ROLL' : roll.kind === 'attack' ? 'ATTACK ROLL' : 'D20 CHECK'}</span><h2>{roll.label}</h2><div className="die-result">{roll.natural}</div><div className="roll-math"><span>Die <strong>{roll.natural}</strong></span><span>Modifier <strong>{signed(roll.modifier)}</strong></span><span>Total <strong>{roll.total}</strong></span>{roll.tn != null && <span>Target <strong>{roll.tn}</strong></span>}</div>{roll.kind === 'attack' && <h3>{roll.natural === 20 ? 'Critical hit!' : roll.natural === 1 ? 'Critical miss!' : roll.tn == null ? 'Attack rolled' : roll.hit ? 'Hit!' : 'Miss'}</h3>}{roll.result && <h3>{roll.result}</h3>}{roll.critical && <p>Critical hit: maximum d{roll.die} damage.</p>}{roll.kind === 'attack' && roll.hit && <button className="primary damage-button" onClick={damage}>Roll d{roll.die} Damage</button>}</div></div>, document.body) }
export default CharacterSheet
