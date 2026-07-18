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
const weaponStyleByArchetype = {
  Barbarian: 'fantasy', 'Bounty Hunter': 'modern', Brainiac: 'science', Cleric: 'mystic', Commando: 'modern', Criminal: 'street', Druid: 'mystic', 'Eco Terrorist': 'modern', 'Ex-Company Man': 'cyber', 'Ex-Cop': 'modern', 'Ex-Military': 'modern', Face: 'elegant', Fixer: 'cyber', Ganger: 'street', 'Gonzo Journalist': 'modern', Gunslinger: 'western', Hacker: 'cyber', 'Mad Bomber': 'cyber', Mage: 'mystic', Mercenary: 'modern', Monk: 'martial', Ninja: 'martial', Performer: 'mystic', 'Private Eye/Investigator': 'street', Screamer: 'cyber', Shaman: 'mystic', Smuggler: 'cyber', Sniper: 'modern', Spy: 'elegant', 'Street Doc': 'cyber', 'Street Samurai': 'martial', Warlock: 'mystic',
}
const weaponStylePools = {
  modern: {
    'Unarmed / Tiny Melee': ['Knuckle-Duster', 'Palm Sap', 'Garrote Wire', 'Weighted Gloves'],
    'Light Melee': ['Gerber StrongArm Knife', 'CRKT Folding Blade', 'Ontario Machete Knife', 'Ceramic Covert Blade'],
    'Medium Melee': ['ASP Telescoping Baton', 'Estwing Camp Axe', 'Tramontina Machete', 'Lead-Filled Tire Thumper'],
    'Heavy Melee': ['Halligan Breaching Bar', 'Two-Handed Fire Axe', 'Sledgehammer', 'Hydraulic Rescue Ram'],
    'Holdout Ranged': ['Bond Arms Derringer', 'Piexon Pepper Pistol', 'Taser 10', 'Walther PPK'],
    'Compact Ranged': ['Uzi Pro', 'Mossberg Shockwave', 'MP7 Personal Defense Weapon', 'Kel-Tec Sub2000'],
    'Longarm Ranged': ['M4A1 Carbine', 'Remington 870 Shotgun', 'Steyr Scout Rifle', 'SIG MCX Spear'],
    'Heavy Ranged': ['Barrett M82 Rifle', 'M240 Machine Gun', 'Milkor Grenade Launcher', 'CheyTac Intervention'],
  },
  fantasy: {
    'Unarmed / Tiny Melee': ['Brass Knuckles', 'Boar-Tusk Punch Dagger', 'Leather Cestus', 'Weighted Handwraps'],
    'Light Melee': ['Elven Leafblade', 'Dwarven Belt Axe', 'Orcish Skinning Knife', 'Halfling Thorn Dirk'],
    'Medium Melee': ['Ironwood War Club', 'Northman Bearded Axe', 'Moonsteel Longsword', 'Bronze-Headed Warhammer'],
    'Heavy Melee': ['Trollbone Maul', 'Executioner Greatsword', 'Twin-Bearded Greataxe', 'Ogre-Forged War Pick'],
    'Holdout Ranged': ['Sleeve Hand Crossbow', 'Rune-Carved Throwing Axe', 'Alchemist Fire Flask', 'Sling of River Stones'],
    'Compact Ranged': ['Elven Recurve Bow', 'Dwarven Repeating Crossbow', 'Goblin Crankbow', 'Nomad Horse Bow'],
    'Longarm Ranged': ['Yew Longbow', 'Arbalest', 'Dragonbone Greatbow', 'Runelock Thunderstaff'],
    'Heavy Ranged': ['Siege Arbalest', 'Portable Ballista', 'Dwarven Thunder Cannon', 'Giant-Sinew Warbow'],
  },
  cyber: {
    'Unarmed / Tiny Melee': ['Shock Knuckles', 'Monowire Garrote', 'Cyberclaw Talons', 'Kinetic Palm Implant'],
    'Light Melee': ['Monofilament Shiv', 'Ceramic Data Knife', 'Vibro-Kukri', 'Retractable Wrist Blade'],
    'Medium Melee': ['Arc-Baton', 'Carbon Edge Machete', 'Powered Breach Hammer', 'Chrome Shock Cane'],
    'Heavy Melee': ['Servo-Assisted Sledge', 'Plasma Greatblade', 'Industrial Ripper Axe', 'Gravitic Breach Ram'],
    'Holdout Ranged': ['Needle Flechette Pistol', 'Palm Laser', 'Smartlinked Holdout', 'Sleeve Taser'],
    'Compact Ranged': ['Kestrel Machine Pistol', 'Ronin Smart SMG', 'Cut-Down Plasma Blaster', 'Coilgun Personal Defense Weapon'],
    'Longarm Ranged': ['Ares Pulse Carbine', 'Caseless Assault Rifle', 'Rail-Assisted Battle Rifle', 'Smartchoke Combat Shotgun'],
    'Heavy Ranged': ['Portable Rail Cannon', 'Rotary Flechette Gun', 'Plasma Support Cannon', 'Micro-Missile Rack'],
  },
  mystic: {
    'Unarmed / Tiny Melee': ['Ghost-Touch Handwraps', 'Runed Prayer Beads', 'Astral Claws', 'Elemental Knuckle Seal'],
    'Light Melee': ['Moon-Silver Athame', 'Saint’s Reliquary Dagger', 'Thorned Ritual Sickle', 'Crystal Wand-Blade'],
    'Medium Melee': ['Starwood Focus Staff', 'Sun-Disc Warhammer', 'Spirit-Bound Scimitar', 'Runesong Spear'],
    'Heavy Melee': ['Doom-Bell Maul', 'Archmage’s Greatstaff', 'Demon-Iron Greatblade', 'Worldroot Poleaxe'],
    'Holdout Ranged': ['Witchfire Dart', 'Bottled Lightning', 'Spectral Thorn', 'Saint’s Judgment Bolt'],
    'Compact Ranged': ['Moonbeam Shortbow', 'Hexbolt Repeater', 'Elemental Wand Array', 'Spirit-Horn Blaster'],
    'Longarm Ranged': ['Sunray Longstaff', 'Cometstring Longbow', 'Stormcaller Rod', 'Dragon-Breath Scepter'],
    'Heavy Ranged': ['Meteor Invocation', 'Void-Cannon Focus', 'Celestial Ballista', 'Leviathan-Bone Thunderstaff'],
  },
  science: {
    'Unarmed / Tiny Melee': ['Gravitic Push Glove', 'Sonic Palm Emitter', 'Kinetic Lab Gauntlet', 'Stun-Field Ring'],
    'Light Melee': ['Laser Scalpel', 'Diamond Molecular Cutter', 'Cryogenic Sample Blade', 'Plasma Dissection Wand'],
    'Medium Melee': ['Telescoping Logic Staff', 'Graviton Calibration Rod', 'Electromagnetic Probe', 'Powered Research Tripod'],
    'Heavy Melee': ['Reactor-Core Maul', 'Mass-Driver Test Rig', 'Containment Polearm', 'Industrial Gravity Hammer'],
    'Holdout Ranged': ['Palm Beam Emitter', 'Sonic Test Pistol', 'Microcoil Accelerator', 'Particle Sampling Gun'],
    'Compact Ranged': ['Prototype Pulse Projector', 'Cryo-Foam Launcher', 'Portable Tesla Array', 'Compact Mass Driver'],
    'Longarm Ranged': ['Experimental Rail Rifle', 'Directed-Energy Carbine', 'Long-Baseline Particle Beam', 'Variable-Frequency Laser'],
    'Heavy Ranged': ['Antimatter Test Cannon', 'Portable Hadron Projector', 'Gravitic Siege Lens', 'Fusion Lance'],
  },
  street: {
    'Unarmed / Tiny Melee': ['Roll of Quarters', 'Leather Sap', 'Piano-Wire Garrote', 'Brass Knuckles'],
    'Light Melee': ['Italian Switchblade', 'Boot Knife', 'Box-Cutter Shiv', 'Straight-Razor Blade'],
    'Medium Melee': ['Blackthorn Walking Stick', 'Weighted Baseball Bat', 'Cut-Down Crowbar', 'Chain-Wrapped Club'],
    'Heavy Melee': ['Firehouse Axe', 'Railroad Sledge', 'Concrete Breaker', 'Two-Handed Crowbar'],
    'Holdout Ranged': ['Snub-Nose .38', 'Vest-Pocket Derringer', 'Stun Gun', 'Pepper Pistol'],
    'Compact Ranged': ['MAC-10 Machine Pistol', 'Sawed-Off Coach Gun', 'Skorpion SMG', 'Short Tactical Shotgun'],
    'Longarm Ranged': ['Police Surplus Carbine', 'Pump-Action Shotgun', 'Hunting Rifle', 'Lever-Action Rifle'],
    'Heavy Ranged': ['Belt-Fed Street Sweeper', 'Anti-Materiel Rifle', 'Improvised Grenade Launcher', 'Tripod Machine Gun'],
  },
  elegant: {
    'Unarmed / Tiny Melee': ['Signet-Ring Knuckles', 'Silk Garrote', 'Jeweled Hatpin', 'Sleeve Sap'],
    'Light Melee': ['Damascus Stiletto', 'Ivory-Handle Dirk', 'Corsican Vendetta Knife', 'Silver Letter Opener'],
    'Medium Melee': ['Sword Cane', 'Basket-Hilt Rapier', 'Duelling Saber', 'Lacquered War Fan'],
    'Heavy Melee': ['Ceremonial Greatsword', 'Gilded Poleaxe', 'Executioner’s Parade Blade', 'Grandmaster Warhammer'],
    'Holdout Ranged': ['Pearl-Grip Derringer', 'Cufflink Dart Pistol', 'Lipstick Taser', 'Monogrammed Pocket Pistol'],
    'Compact Ranged': ['Diplomatic-Case SMG', 'Engraved Machine Pistol', 'Opera-Cloak Shotgun', 'Gold-Inlaid Carbine'],
    'Longarm Ranged': ['Gentleman’s Express Rifle', 'Royal Guard Carbine', 'Fine Over-Under Shotgun', 'Engraved Hunting Rifle'],
    'Heavy Ranged': ['Elephant Gun', 'Royal Arsenal Machine Gun', 'Gilded Anti-Materiel Rifle', 'Ceremonial Grenade Launcher'],
  },
  western: {
    'Unarmed / Tiny Melee': ['Brass Knuckle Duster', 'Rawhide Blackjack', 'Boot-Hidden Push Dagger', 'Weighted Riding Gloves'],
    'Light Melee': ['Buffalo-Horn Bowie', 'Arkansas Toothpick', 'Bone-Handle Skinner', 'Frontier Boot Knife'],
    'Medium Melee': ['Weathered Cavalry Saber', 'Trail Boss Hatchet', 'Mesquite War Club', 'Railroad Spike Hammer'],
    'Heavy Melee': ['Prospector Sledge', 'Buffalo Rifle Stock Club', 'Logging Greataxe', 'Long-Handle Pickaxe'],
    'Holdout Ranged': ['Remington Double Derringer', 'Colt Sheriff’s Model', 'Smith & Wesson Schofield', 'Pepperbox Pistol'],
    'Compact Ranged': ['Mare’s Leg Carbine', 'Coach Gun', 'Volcanic Repeating Pistol', 'Cut-Down Winchester'],
    'Longarm Ranged': ['Winchester 1873', 'Sharps Buffalo Rifle', 'Henry Repeating Rifle', 'Colt Lightning Carbine'],
    'Heavy Ranged': ['Gatling Gun', 'Buffalo-Bore Wall Gun', 'Dynamite Projector', 'Tripod Maxim Gun'],
  },
  martial: {
    'Unarmed / Tiny Melee': ['Iron Palm', 'Tiger Claw', 'Stone Fist Handwraps', 'Meteor Hammer Knuckles'],
    'Light Melee': ['Shadow Kunai', 'White-Handle Tanto', 'Butterfly Sword', 'Dragon-Tooth Karambit'],
    'Medium Melee': ['Night-Reed Katana', 'Seven-Ring Staff', 'Jade Jian', 'Black-Oak Nunchaku'],
    'Heavy Melee': ['Temple Guandao', 'Horse-Cutting Zanbato', 'Iron Monk Spade', 'Great Tetsubo'],
    'Holdout Ranged': ['Whisper Shuriken', 'Sleeve Darts', 'Rope-Dart Needle', 'Blinding Egg Bomb'],
    'Compact Ranged': ['Lacquered Shortbow', 'Repeating Hand Crossbow', 'Hidden Matchlock', 'Windlass Dartcaster'],
    'Longarm Ranged': ['Yumi Warbow', 'Monastery Longbow', 'Tanegashima Rifle', 'Heavy Repeating Crossbow'],
    'Heavy Ranged': ['Hwacha Rocket Rack', 'Siege Yumi', 'Portable Fire-Lance Battery', 'Temple Thunder Cannon'],
  },
}
const archetypeWeaponVariants = {
  'Gonzo Journalist': [
    ['Boot-Hidden Penknife', 'Pressroom Letter Opener', 'Darkroom Utility Blade', 'Ceramic Editorial Knife', 'Reporter’s Multitool Blade'],
    ['Armored Camera Monopod', 'Broadcast Microphone Boom', 'Steel Camera Tripod', 'Lead-Lined Equipment Case', 'Satellite-Uplink Mast'],
    ['Press-Pass Derringer', 'Pocket Pepper Spray', 'Civilian Taser', 'Flashbulb Stunner', 'Sonic Recorder Burst'],
  ],
}
const characterDataVersion = 0
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
const weaponLoadoutMarker = archetypeName => `${characterDataVersion}:${archetypeName}`
const populateArchetypeWeapons = (existingWeapons, archetypeName) => {
  const weapons = existingWeapons.filter(weapon => weapon.source !== 'archetype').map(weapon => ({ ...weapon }))
  const usedNames = new Set()
  ;(weaponLoadouts[archetypeName] || []).forEach(([defaultName, type], slotIndex) => {
    const style = weaponStyleByArchetype[archetypeName] || 'modern'
    const specificPool = archetypeWeaponVariants[archetypeName]?.[slotIndex]
    const generalPool = [defaultName, ...(weaponStylePools[style]?.[type] || weaponStylePools.modern[type] || [])]
    const pool = (specificPool || generalPool).filter(name => !usedNames.has(name))
    const name = pool[Math.floor(Math.random() * pool.length)] || defaultName
    usedNames.add(name)
    const weapon = { id: crypto.randomUUID(), name, type, enhancement: 0, notes: weaponNotesByType[type] || 'Archetype starting weapon.', source: 'archetype' }
    const emptyIndex = weapons.findIndex(entry => !entry.name?.trim() && !entry.notes?.trim() && !number(entry.enhancement))
    if (emptyIndex >= 0) weapons[emptyIndex] = { ...weapon, id: weapons[emptyIndex].id || weapon.id }
    else weapons.push(weapon)
  })
  return weapons
}
const archetypeItemLoadouts = {
  Barbarian: [['Bearskin War Cloak', '(+3) Strength — The heavy trophy cloak reflects a life built around raw power.'], ['Iron-Shod Trail Boots', '(+2) Endurance — Made for punishing marches through hostile country.'], ['Ancestor-Totem Necklace', '(+1) Intuition — Carved tokens reinforce instinct and inherited warnings.']],
  'Bounty Hunter': [['Targeting Monocle', '(+3) Observation — Highlights tells, tracks, and wanted faces.'], ['Reinforced Pursuit Coat', '(+2) Endurance — Built to survive long hunts and violent arrests.'], ['Restraint and Warrant Kit', '(+1) Influence — Makes authority look convincing even far from home.']],
  Brainiac: [['Thesis-Archive Mnemonic Crown', '(+3) Education — Its dense personal annotations preserve years of advanced study.'], ['Predictive Lens Array', '(+2) Intuition — Models likely outcomes from incomplete evidence.'], ['Pocket Omnilibrary', '(+1) Knowledge — A carefully curated reference collection reflects relentless research habits.']],
  Cleric: [['Consecrated Vestments', '(+3) Charisma — Invests the wearer with visible spiritual authority.'], ['Reliquary of Steadfast Hearts', '(+2) Endurance — A reminder to endure suffering in service to others.'], ['Illuminated Prayer Book', '(+1) Education — Preserves doctrine, rites, and healing traditions.']],
  Commando: [['Tactical Assault Harness', '(+3) Dexterity — Keeps ammunition and tools exactly where trained hands expect them.'], ['Ballistic Combat Armor', '(+2) Endurance — Designed for sustained operations under fire.'], ['Encrypted Squad Radio', '(+1) Influence — Supports precise commands and coordinated action.']],
  Criminal: [['Chameleon-Lined Coat', '(+3) Sneak — Breaks up the wearer’s outline during illicit work.'], ['Professional Lock Roll', '(+2) Technology — Holds bypass tools for mechanical and electronic security.'], ['Burner Identity Wallet', '(+1) Influence — Provides convincing names, credentials, and cover stories.']],
  Druid: [['Mantle of Living Leaves', '(+3) Outdoors — Changes with the terrain and carries the scent of the wild.'], ['Beast-Speech Fetish', '(+2) Intuition — Helps interpret animal behavior and natural warnings.'], ['Ironroot Walking Staff', '(+1) Endurance — Supports long travel through trackless country.']],
  'Eco Terrorist': [['Rebreather of the Last Forest', '(+3) Endurance — Filters smoke, toxins, and industrial waste.'], ['Seed-Bomb Bandolier', '(+2) Outdoors — Carries aggressive restorative plants for damaged terrain.'], ['Scrambled Protest Commlink', '(+1) Influence — Coordinates cells while resisting surveillance.']],
  'Ex-Company Man': [['Executive Neural Assistant', '(+3) Education — Retains corporate procedures, contacts, and proprietary knowledge.'], ['Armored Business Coat', '(+2) Endurance — Discreet protection from hostile negotiations.'], ['Obsolete Platinum Credentials', '(+1) Influence — Old access still opens doors when displayed confidently.']],
  'Ex-Cop': [['Retired Detective Badge', '(+3) Influence — Still carries weight with civilians and some authorities.'], ['Forensic Field Kit', '(+2) Observation — Reveals trace evidence others overlook.'], ['Concealable Patrol Vest', '(+1) Endurance — Familiar protection for dangerous interviews.']],
  'Ex-Military': [['Veteran Smartlink', '(+3) Dexterity — Familiar targeting hardware turns drilled movement into precision.'], ['Service Load-Bearing Rig', '(+2) Endurance — Distributes equipment across long operations.'], ['Unit Challenge Coin', '(+1) Influence — Establishes shared service and hard-earned credibility.']],
  Face: [['Tailored Chameleon Wardrobe', '(+3) Charisma — Always presents the right image for the room.'], ['Whisper Coaching Earpiece', '(+2) Influence — Supplies names, etiquette, and conversational openings.'], ['Microexpression Contact Lenses', '(+1) Intuition — Makes subtle reactions easier to read.']],
  Fixer: [['Black Ledger', '(+3) Influence — Records favors, debts, leverage, and who can source the impossible.'], ['Ghost-Key Commlink', '(+2) Technology — Reaches specialists through protected channels.'], ['Many-Pocket Negotiator Coat', '(+1) Charisma — Conceals samples, credentials, gifts, and emergency bribes.']],
  Ganger: [['Colors of the Old Block', '(+3) Influence — Signals history, loyalty, and dangerous connections.'], ['Street-Rigged Reflex Booster', '(+2) Dexterity — Crude augmentation tuned for sudden violence.'], ['Scarred Armored Hoodie', '(+1) Endurance — Everyday protection reinforced by experience.']],
  'Gonzo Journalist': [['Truth-Catcher Camera', '(+3) Observation — Records evidence through chaos, censorship, and dimensional distortion.'], ['Press Pass Collection', '(+2) Influence — Opens scenes that should be closed to outsiders.'], ['Stimulant-Lined Field Jacket', '(+1) Endurance — Keeps a reporter moving long after good judgment quits.']],
  Gunslinger: [['Quickdraw Holster Array', '(+3) Dexterity — Positions every sidearm for practiced speed.'], ['Duelist’s Longcoat', '(+2) Charisma — Turns confidence and reputation into part of the weapon.'], ['Gunsmith’s Personal Toolkit', '(+1) Technology — Keeps a varied arsenal tuned and reliable.']],
  Hacker: [['Ghostline Neural Implant', '(+3) Technology — Provides direct, low-latency access to hostile systems.'], ['Hand-Built Black-Ice Deck', '(+2) Education — Its custom code and annotated exploits demonstrate deep systems training.'], ['Mirror-Shade AR Lenses', '(+1) Observation — Overlays networks, cameras, and data trails onto the physical world.']],
  'Mad Bomber': [['Demolition Savant Goggles', '(+3) Technology — Calculates blast pressure, timing, and structural failure points.'], ['Blast-Blanket Greatcoat', '(+2) Endurance — Protects against fragments and regrettable experiments.'], ['Remote Detonator Rings', '(+1) Dexterity — Allows precise triggering without fumbling for controls.']],
  Mage: [['Mnemonic Grimoire', '(+3) Education — Reorganizes itself around the spell currently being researched.'], ['Leyline Compass', '(+2) Intuition — Points toward magical pressure, instability, and hidden workings.'], ['Runed Focus Staff', '(+1) Influence — Makes practiced arcane authority unmistakable.']],
  Mercenary: [['Modular Contract Armor', '(+3) Endurance — Configured for surviving whichever war currently pays.'], ['Threat-Priority Visor', '(+2) Observation — Marks firing lanes, ambush points, and valuable targets.'], ['Escrow Contract Slate', '(+1) Influence — Documents terms and reminds employers that professionals get paid.']],
  Monk: [['Weighted Meditation Beads', '(+3) Intuition — Centers breath, timing, and awareness under pressure.'], ['Hand-Wrapped Prayer Sash', '(+2) Dexterity — Supports disciplined strikes and controlled movement.'], ['Pilgrim’s Sandals', '(+1) Endurance — Built for quiet travel across punishing distances.']],
  Ninja: [['Boots of the Empty Step', '(+3) Sneak — Soften footfalls and leave almost no trace.'], ['Shadow-Silk Shinobi Suit', '(+2) Dexterity — Moves without snagging, shining, or betraying motion.'], ['Climbing Claws and Silk Line', '(+1) Athletics — Turn walls, roofs, and rafters into ordinary routes.']],
  Performer: [['Resonant Signature Instrument', '(+3) Charisma — Projects a distinctive presence across any venue.'], ['Mood-Reading Stage Lenses', '(+2) Intuition — Tracks the emotional current of a crowd.'], ['Infinite Costume Trunk', '(+1) Influence — Produces the right look for persuasion, disguise, or spectacle.']],
  'Private Eye/Investigator': [['Rainproof Evidence Coat', '(+3) Observation — Organizes notebooks, samples, and the details nobody else kept.'], ['Caseboard Tablet', '(+2) Intuition — Connects suspects, motives, places, and contradictions.'], ['Battered Investigator License', '(+1) Influence — Provides just enough legitimacy to keep asking questions.']],
  Screamer: [['Overclocked Control Yoke', '(+3) Vehicle — Translates tiny movements into violent acceleration.'], ['Impact-Gel Racing Suit', '(+2) Endurance — Makes crashes survivable enough to try again.'], ['Reflex-Tuned Driving Gloves', '(+1) Dexterity — Improve grip and split-second control.']],
  Shaman: [['Ancestor Mask', '(+3) Intuition — Helps the wearer listen to spirits, taboos, and unseen relationships.'], ['Medicine Bundle', '(+2) Outdoors — Holds ritual plants, bones, pigments, and practical remedies.'], ['Talking Drum', '(+1) Influence — Carries messages to communities both living and dead.']],
  Smuggler: [['False-Bottom Cargo Coat', '(+3) Sneak — Conceals contraband in extradimensional seams.'], ['Route-Scrambler Nav Unit', '(+2) Vehicle — Finds unofficial lanes and constantly changes the recorded path.'], ['Customs-Friendly Forgery Wallet', '(+1) Influence — Supplies manifests and permits that survive a quick inspection.']],
  Sniper: [['Rangefinding Ghost Scope', '(+3) Observation — Corrects distance, motion, weather, and dimensional drift.'], ['Adaptive Camouflage Cloak', '(+2) Sneak — Blends into terrain while the wearer remains still.'], ['Breath-Control Biofeedback Patch', '(+1) Endurance — Slows pulse and steadies long periods on target.']],
  Spy: [['Thousand-Face Disguise Mesh', '(+3) Influence — Alters features, voice, posture, and apparent identity.'], ['Counter-Surveillance Cufflinks', '(+2) Observation — Detect tails, transmitters, and compromised rooms.'], ['Memory-Vault Implant', '(+1) Education — Encrypts intelligence behind constructed identities.']],
  'Street Doc': [['Veteran’s Back-Alley Trauma Rig', '(+3) Education — Its expert organization and field modifications reflect extensive medical training.'], ['Diagnostic AR Implant', '(+2) Technology — Identifies injuries, toxins, implants, and treatment options.'], ['Bloodproof Field Apron', '(+1) Endurance — Built for exhausting work in terrible conditions.']],
  'Street Samurai': [['Reflex-Accelerator Spine', '(+3) Dexterity — Converts intent into movement before hesitation can interfere.'], ['Armored Neo-Samurai Jacket', '(+2) Endurance — Combines street style with serious protection.'], ['Honor-Code Memory Token', '(+1) Influence — Makes promises, employers, and betrayals impossible to forget.']],
  Warlock: [['Patron’s Whispering Signet', '(+3) Charisma — Carries a fragment of an unsettling otherworldly presence.'], ['Forbidden Pact Grimoire', '(+2) Education — Records names, prices, loopholes, and dangerous invocations.'], ['Chain of Binding Oaths', '(+1) Endurance — A physical reminder of power endured and debts still owed.']],
}
const archetypeItemVariations = {
  Barbarian: [['Mammoth-Bone Grip Wraps', '(+2) Athletics — Give powerful hands purchase during climbs, grapples, and brutal labor.'], ['Smoke-Reading War Paint', '(+1) Outdoors — Traditional pigments encode weather signs and hunting wisdom.']],
  'Bounty Hunter': [['Fugitive-Scent Sampler', '(+2) Outdoors — Tracks quarry through biological traces across unfamiliar terrain.'], ['Interrogator’s Voice Modulator', '(+1) Charisma — Makes quiet questions carry an unmistakable threat.']],
  Brainiac: [['Thought-Speed Stylus', '(+2) Technology — Captures calculations as quickly as they occur.'], ['Academic Citation Familiar', '(+1) Influence — Supplies credentials and authoritative references during debate.']],
  Cleric: [['Annotated Pilgrim’s Mercy Kit', '(+2) Education — Handwritten treatment notes record practical lessons learned through service.'], ['Bell of Revealed Spirits', '(+1) Observation — Rings differently near curses, hauntings, and concealed suffering.']],
  Commando: [['Grip-Memory Combat Gloves', '(+2) Attack — Reinforce drilled weapon handling under stress.'], ['Terrain-Mapping Knee Display', '(+1) Observation — Keeps squad routes and danger zones in view.']],
  Criminal: [['Silent-Sole Getaway Shoes', '(+2) Dexterity — Built for quick exits through alleys, rooftops, and service corridors.'], ['Marked-Card Data Deck', '(+1) Intuition — Helps spot scams because every common trick is already encoded.']],
  Druid: [['Boots of Elvenkind', '(+2) Sneak — Muffle movement through leaves, stone, and living undergrowth.'], ['Weatherwise Acorn Charm', '(+1) Observation — Changes texture before storms and ecological disturbances.']],
  'Eco Terrorist': [['Corporate-Toxin Analyzer', '(+2) Technology — Identifies pollutants and traces them back to industrial sources.'], ['Climber’s Living-Vine Harness', '(+1) Athletics — Grows fresh holds while scaling facilities and old-growth trees.']],
  'Ex-Company Man': [['Hostile-Takeover Briefcase', '(+2) Influence — Contains leverage files and polished negotiation tools.'], ['Quarterly-Forecast Optics', '(+1) Intuition — Trained prediction software highlights risk and opportunity.']],
  'Ex-Cop': [['Dog-Eared Procedure Handbook', '(+2) Education — Margins filled with case notes show hard-earned knowledge of law and procedure.'], ['Patrol-Grade Pursuit Boots', '(+1) Athletics — Made for stairs, alleys, crowds, and suspects who run.']],
  'Ex-Military': [['Field-Repair Multitool', '(+2) Technology — Reflects cross-training in weapons, vehicles, and communications.'], ['Sandtable Projection Bracer', '(+1) Intuition — Turns terrain and enemy movement into tactical possibilities.']],
  Face: [['Scent-of-the-Occasion Atomizer', '(+2) Charisma — Produces a culturally appropriate, memorable first impression.'], ['Etiquette Academy Notes', '(+1) Education — Meticulous annotations cover titles, customs, rivalries, and forbidden topics.']],
  Fixer: [['Favor-Market AR Overlay', '(+2) Influence — Shows who owes whom and which introduction has value.'], ['Black-Market Appraiser’s Handbook', '(+1) Education — Personal notes document rare goods, counterfeits, and illicit supply chains.']],
  Ganger: [['Graffiti-Route AR Mask', '(+2) Outdoors — Reads street markings as territory maps and danger warnings.'], ['Knuckle-Plated Smart Gloves', '(+1) Attack — Reinforce close violence without looking like formal weapons.']],
  'Gonzo Journalist': [['Lie-Heat Microphone', '(+2) Intuition — Flags vocal stress while the questions keep coming.'], ['All-Terrain Broadcast Boots', '(+1) Athletics — Keep the reporter upright while chasing the story.']],
  Gunslinger: [['Ricochet Calculator Lens', '(+2) Attack — Maps improbable firing angles in real time.'], ['Dust-Trail Riding Boots', '(+1) Vehicle — Equally comfortable with horses, bikes, and alien mounts.']],
  Hacker: [['Red-Pill Exploit Library', '(+2) Technology — Carries a different suite of forbidden intrusion tools each session.'], ['Deja-Vu Packet Analyzer', '(+1) Observation — Spots repeated code, simulated environments, and hidden network loops.']],
  'Mad Bomber': [['Explosives Chemistry Field Manual', '(+2) Education — Stained formulas and force calculations document years of study and experimentation.'], ['Clockmaker’s Tremor Dampers', '(+1) Dexterity — Steady the hands during delicate assembly and disarming.']],
  Mage: [['Spell-Geometry Monocle', '(+2) Technology — Treats wards and rituals as systems that can be debugged.'], ['Apprentice-Singed Robes', '(+1) Endurance — Evidence of surviving the practical portion of magical education.']],
  Mercenary: [['Employer-Agnostic Smartlink', '(+2) Attack — Adapts to whatever weapons the current contract supplies.'], ['Campaign-Worn Marching Boots', '(+1) Athletics — Carry a professional through another battlefield and another retreat.']],
  Monk: [['Echoing Temple Handwraps', '(+2) Attack — Preserve the rhythm of thousands of practiced strikes.'], ['Tea Set of Patient Questions', '(+1) Influence — Makes difficult conversations slower and more honest.']],
  Ninja: [['Moonless Smoke Capsules', '(+2) Observation — Control sight lines and reveal movement inside the cloud.'], ['Sleeve of Balanced Tools', '(+1) Technology — Holds compact solutions for locks, traps, and alarms.']],
  Performer: [['Applause-Looping Vocal Implant', '(+2) Technology — Tunes voice and sound to impossible venues.'], ['Backstage Whisper Network', '(+1) Observation — Feeds the performer gossip, cues, and changes in the room.']],
  'Private Eye/Investigator': [['Cigarette-Case Audio Spectrometer', '(+2) Technology — Records voices and isolates sounds hidden in noisy scenes.'], ['Shoeleather of Endless Leads', '(+1) Endurance — Built for long surveillance and one more interview.']],
  Screamer: [['Corner-Predicting Visor', '(+2) Intuition — Anticipates traffic, terrain, and opponents before the turn arrives.'], ['Engine-Song Diagnostic Implant', '(+1) Technology — Hears mechanical trouble as changes in pitch.']],
  Shaman: [['Spirit-Track Moccasins', '(+2) Observation — Reveal footprints left by beings without physical bodies.'], ['Taboo-Knot Cord', '(+1) Education — Records obligations and warnings that must not be forgotten.']],
  Smuggler: [['Whisperdrive Engine Tuner', '(+2) Technology — Coaxes quieter performance from almost any transport.'], ['Poker-Face Biofeedback Ring', '(+1) Charisma — Keeps pulse and expression steady during inspections.']],
  Sniper: [['Soundless Field Mat', '(+2) Endurance — Supports motionless observation for hours.'], ['Wind-Ghost Prayer Ribbons', '(+1) Intuition — Make tiny air currents visible before a shot.']],
  Spy: [['Dead-Drop Fountain Pen', '(+2) Technology — Encrypts and transfers intelligence through ordinary gestures.'], ['Poison-Taster Dental Implant', '(+1) Endurance — Identifies common toxins before the dose becomes fatal.']],
  'Street Doc': [['Pain-Partition Neural Clip', '(+2) Endurance — Keeps the doctor functional through exhaustion and injury.'], ['No-Questions Prescription Pad', '(+1) Influence — Opens supply rooms and reassures nervous patients.']],
  'Street Samurai': [['Threat-Outline Cybereyes', '(+2) Observation — Mark concealed weapons and imminent movement.'], ['Magnetic Rooftop Tabi', '(+1) Sneak — Grip steel architecture without scraping or slipping.']],
  Warlock: [['Hellglass Eye', '(+2) Intuition — Reveals bargains, bindings, and the attention of distant powers.'], ['Ashen Summoner’s Coat', '(+1) Sneak — Swallows light and the traces left by forbidden rituals.']],
}
const itemLoadoutMarker = archetypeName => `${characterDataVersion}:${archetypeName}`
const populateArchetypeItems = (existingItems, archetypeName) => {
  const traits = existingItems.filter(item => item.source === 'archetype' || item.source === 'archetype-trait').map(item => ({ ...item, source: 'archetype-trait' }))
  const items = existingItems.filter(item => !['archetype', 'archetype-trait', 'archetype-item'].includes(item.source)).map(item => ({ ...item }))
  const candidates = [...(archetypeItemLoadouts[archetypeName] || []), ...(archetypeItemVariations[archetypeName] || [])]
  const selectedItems = candidates.map(candidate => ({ candidate, order: Math.random() })).sort((a, b) => a.order - b.order).slice(0, 3).map(entry => entry.candidate)
  selectedItems.forEach(([name, description]) => {
    const item = { id: crypto.randomUUID(), name, description, source: 'archetype-item' }
    const emptyIndex = items.findIndex(entry => !entry.name?.trim() && !String(entry.description || '').trim() && !String(entry.bonus || '').trim() && !entry.appliesTo?.trim())
    if (emptyIndex >= 0) items[emptyIndex] = { ...item, id: items[emptyIndex].id || item.id }
    else items.push(item)
  })
  return [...items, ...traits]
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
  const buffOptionNames = new Set(lines.map(line => line.match(/^Buff Option:\s*(.+)$/i)?.[1]?.replace(/:$/, '')).filter(Boolean))
  const buffsStart = lines.findIndex(line => /^Buffs:$/i.test(line))
  const firstBuffOption = lines.findIndex((line, index) => index > buffsStart && /^Buff Option:/i.test(line))
  const buffsBlock = buffsStart >= 0 ? lines.slice(buffsStart + 1, firstBuffOption >= 0 ? firstBuffOption : lines.length) : []
  const buffsDescription = buffsBlock.find(line => /^Description:/i.test(line)) || ''
  const buffDuration = (buffsDescription.match(/\b(?:They|Buffs)\s+last\s+(.+?)(?=,|\.|;|$)/i)?.[1] || '').replace(/^one\b/i, '1')
  return headings.map((heading, index) => {
    const block = lines.slice(heading.index + 1, headings[index + 1]?.index ?? lines.length).filter(Boolean)
    const description = block.find(line => /^Description:/i.test(line))?.replace(/^Description:\s*/i, '') || ''
    const mechanic = block.find(line => /^Mechanics?:/i.test(line))?.replace(/^Mechanics?:\s*/i, '') || ''
    const durationText = (block.find(line => /^Duration:/i.test(line)) || '').replace(/^Duration:\s*/i, '')
    const durationNote = durationText.match(/\s*\(((?:Special )?note:[\s\S]+)\)\s*$/i)?.[1] || ''
    const parsedDuration = durationNote ? durationText.replace(/\s*\((?:Special )?note:[\s\S]+\)\s*$/i, '').trim() : durationText
    const duration = parsedDuration || (buffOptionNames.has(heading.name) ? buffDuration : '')
    const details = block.filter(line => /^(Action|Cost|Energy Cost):/i.test(line))
    const joined = block.join(' ')
    const minimum = joined.match(/Minimum Force\s*(?:is\s*)?(\d)/i)?.[1]
    const maximum = joined.match(/Maximum Force\s*(?:is\s*)?(\d)/i)?.[1]
    const forceLimit = minimum && maximum ? `Force ${minimum}–${maximum}` : minimum ? `Minimum Force ${minimum}` : maximum ? `Maximum Force ${maximum}` : 'Standard Energy'
    return { name: heading.name, ability: [forceLimit, ...details].join(' • '), duration, notes: [description, mechanic, durationNote].filter(Boolean).join(' — ') }
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
    return { type: line.split(' - ')[0].trim(), category: (block.find(value => /^Category:/i.test(value)) || '').replace(/^Category:\s*/i, ''), example: (block.find(value => /^Example Name:/i.test(value)) || '').replace(/^Example Name:\s*/i, ''), expertise: (block.find(value => /^Expertise:/i.test(value)) || '').replace(/^Expertise:\s*/i, '') }
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
const talentAllowanceForLevel = level => {
  const currentLevel = Math.max(0, Math.min(10, number(level)))
  if (currentLevel === 0) return 0
  return 2 + [3, 5, 7, 9].filter(milestone => currentLevel >= milestone).length
}
const populateArchetypeTalents = (existingTalents, archetype, maximumTalents) => {
  const talents = existingTalents.filter(talent => talent.source !== 'archetype').filter(talent => talent.name?.trim() || talent.ability?.trim() || talent.duration?.trim() || talent.notes?.trim()).map(talent => ({ ...talent }))
  archetype.preferredTalents.forEach(requestedName => {
    if (talents.filter(talent => talent.name?.trim()).length >= maximumTalents) return
    const catalogTalent = talentCatalog.find(talent => talent.name.toLowerCase() === requestedName.toLowerCase())
    if (!catalogTalent) return
    const talent = { id: crypto.randomUUID(), name: catalogTalent.name, ability: catalogTalent.ability, duration: catalogTalent.duration, notes: catalogTalent.notes, source: 'archetype' }
    const emptyIndex = talents.findIndex(entry => !entry.name?.trim() && !entry.ability?.trim() && !entry.duration?.trim() && !entry.notes?.trim())
    if (emptyIndex >= 0) talents[emptyIndex] = { ...talent, id: talents[emptyIndex].id || talent.id }
    else talents.push(talent)
  })
  const remainingTalentRows = Math.max(0, maximumTalents - talents.length)
  if (remainingTalentRows) talents.push(...blankRows(remainingTalentRows, { name: '', ability: '', duration: '', notes: '', source: 'level-progression' }))
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
  talents: [],
  items: blankRows(2, { name: '', bonus: '', appliesTo: '' }),
  contacts: blankRows(2, { name: '', role: '' }), notes: '', updatedAt: Date.now(),
  talentRowsGrantedForLevel: 0, removedBlankTalentRows: 0,
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
  const [pendingArchetype, setPendingArchetype] = useState('')
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
      if (row.duration?.trim()) return row
      const catalogTalent = talentCatalog.find(talent => talent.name === row.name)
      if (!catalogTalent?.duration) return row
      changed = true
      return { ...row, duration: catalogTalent.duration }
    })
    const archetype = archetypeOptions.find(option => option.name === character.archetype)
    const talentAllowance = talentAllowanceForLevel(character.level)
    const previousTalentAllowance = character.talentRowsGrantedForLevel
    let talentRowsGrantedForLevel = previousTalentAllowance
    let removedBlankTalentRows = character.removedBlankTalentRows
    if (removedBlankTalentRows == null) {
      const missingTalentRows = Math.max(0, talentAllowance - talents.length)
      if (missingTalentRows) talents = [...talents, ...blankRows(missingTalentRows, { name: '', ability: '', duration: '', notes: '', source: 'level-progression' })]
      removedBlankTalentRows = 0
      changed = true
    }
    if (previousTalentAllowance == null) {
      talentRowsGrantedForLevel = talentAllowance
      changed = true
    } else if (talentAllowance > previousTalentAllowance) {
      talents = [...talents, ...blankRows(talentAllowance - previousTalentAllowance, { name: '', ability: '', duration: '', notes: '', source: 'level-progression' })]
      talentRowsGrantedForLevel = talentAllowance
      changed = true
    } else if (talentAllowance < previousTalentAllowance) {
      let rowsToRetract = previousTalentAllowance - talentAllowance
      talents = [...talents]
      for (let index = talents.length - 1; index >= 0 && rowsToRetract > 0; index -= 1) {
        const talent = talents[index]
        const blank = !talent.name?.trim() && !talent.ability?.trim() && !talent.duration?.trim() && !talent.notes?.trim()
        if (!blank && !['archetype', 'level-progression'].includes(talent.source)) continue
        talents.splice(index, 1)
        rowsToRetract -= 1
      }
      talentRowsGrantedForLevel = talentAllowance
      changed = true
    }
    let items = character.items
    const needsWeaponLoadout = Boolean(archetype && character.weaponLoadoutAppliedFor !== weaponLoadoutMarker(character.archetype))
    const weapons = needsWeaponLoadout ? populateArchetypeWeapons(character.weapons, character.archetype) : character.weapons
    if (needsWeaponLoadout) changed = true
    const needsItemLoadout = Boolean(archetype && character.itemLoadoutAppliedFor !== itemLoadoutMarker(character.archetype))
    if (needsItemLoadout) { items = populateArchetypeItems(items, character.archetype); changed = true }
    if (changed) setCharacter(current => ({ ...current, talents, items, weapons, talentRowsGrantedForLevel, removedBlankTalentRows, weaponLoadoutAppliedFor: needsWeaponLoadout ? weaponLoadoutMarker(character.archetype) : current.weaponLoadoutAppliedFor, itemLoadoutAppliedFor: needsItemLoadout ? itemLoadoutMarker(character.archetype) : current.itemLoadoutAppliedFor, updatedAt: Date.now() }))
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
      const manualItems = current.items.filter(item => !['archetype', 'archetype-trait', 'archetype-item'].includes(item.source))
      const items = populateArchetypeItems(manualItems, preset.name)
      preset.traits.forEach(({ name, description }) => {
        const trait = { id: crypto.randomUUID(), name, description, source: 'archetype-trait' }
        const emptyIndex = items.findIndex(item => !item.name?.trim() && !String(item.description || '').trim() && !String(item.bonus || '').trim() && !item.appliesTo?.trim())
        if (emptyIndex >= 0) items[emptyIndex] = { ...trait, id: items[emptyIndex].id || trait.id }
        else items.push(trait)
      })
      const weapons = populateArchetypeWeapons(current.weapons, preset.name)
      const talents = populateArchetypeTalents(current.talents, preset, talentAllowanceForLevel(current.level))
      const contacts = current.contacts.filter(contact => contact.source !== 'archetype').map(contact => ({ ...contact }))
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
        items, weapons, talents, contacts, talentRowsGrantedForLevel: Math.max(number(current.talentRowsGrantedForLevel), talentAllowanceForLevel(current.level)), weaponLoadoutAppliedFor: weaponLoadoutMarker(preset.name), itemLoadoutAppliedFor: itemLoadoutMarker(preset.name), updatedAt: Date.now(),
      }
    })
    flash(`${preset.name} starting scores, skills, and traits applied`)
  }
  const chooseArchetype = name => {
    if (archetypeOptions.some(option => option.name === name)) setPendingArchetype(name)
    else update(['archetype'], name)
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
    const blob = new Blob([JSON.stringify(character)], { type: 'application/x-mag-character' })
    const url = URL.createObjectURL(blob); const link = document.createElement('a')
    const fileName = (character.name || 'Hero').replace(/[<>:"/\\|?*]+/g, '-').trim() || 'Hero'
    link.href = url; link.download = `${fileName}.MAGHero`; link.click(); URL.revokeObjectURL(url)
  }
  const checkRoll = (label, modifier, target = '') => {
    const natural = rollDie(20); const total = natural + number(modifier); const tn = target === '' ? null : number(target)
    setRoll({ kind: 'check', label, natural, modifier: number(modifier), total, tn,
      result: natural === 20 ? 'Critical success!' : natural === 1 ? 'Critical failure!' : tn == null ? '' : total >= tn ? 'Success!' : 'Failure' })
  }
  const quickDieRoll = sides => {
    const natural = rollDie(sides)
    setRoll({ kind: 'die', label: `d${sides}`, die: sides, natural, modifier: 0, total: natural })
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
      <input ref={fileRef} className="visually-hidden" type="file" onChange={importFile} />
    </div>
    <section className="saved-library"><h2>Saved Heroes</h2>{characters.length === 0 ? <div className="empty-state"><strong>No saved Heroes yet</strong><span>Your characters stay in this browser using local storage.</span></div> : <div className="character-grid">{characters.map(hero => <article className="character-card" key={hero.id}><div><span>LEVEL {hero.level || 0}</span><h3>{hero.name}</h3><p>{[hero.species, hero.archetype].filter(Boolean).join(' • ') || 'Unwritten legend'}</p></div><div className="card-actions"><button className="primary" onClick={() => setCharacter(structuredClone(hero))}>Load</button><button className="danger" onClick={() => remove(hero.id)}>Delete</button></div></article>)}</div>}</section>
    {notice && <div className="toast">{notice}</div>}
  </div>

  const skillTotal = (key, stat) => number(character.stats[stat]) + Object.values(character.skills[key]).reduce((sum, value) => sum + number(value), 0)
  const combatSlots = 1 + (computed.level >= 4 ? 1 : 0) + (computed.level >= 7 ? 1 : 0)
  const talentsAcquired = Math.max(talentAllowanceForLevel(computed.level), character.talents.length)
  const addRow = (key, shape) => update([key], [...character[key], { ...shape, id: crypto.randomUUID() }])
  const deleteRow = (key, id) => update([key], character[key].filter(row => row.id !== id))
  const deleteTalent = row => setCharacter(current => ({ ...current, talents: current.talents.filter(talent => talent.id !== row.id), removedBlankTalentRows: row.name?.trim() || row.ability?.trim() || row.duration?.trim() || row.notes?.trim() ? current.removedBlankTalentRows : number(current.removedBlankTalentRows) + 1, updatedAt: Date.now() }))
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
    <div className="sheet-toolbar"><button onClick={() => setCharacter(null)}>← Heroes</button><div className="toolbar-title"><strong>{character.name || 'Unnamed Hero'}</strong><span>Level {computed.level}</span></div><button onClick={() => setCharacter(newCharacter())}>New</button><button onClick={() => fileRef.current.click()}><span className="load-label-full">Load File</span><span className="load-label-mobile">Load</span></button><button onClick={exportCharacter}>Export</button><label className="autosave-toggle"><input type="checkbox" checked={character.autoSave !== false} onChange={e => setAutoSave(e.target.checked)}/><span>Autosave</span></label><button className="primary" onClick={save}>Save</button><input ref={fileRef} className="visually-hidden" type="file" onChange={importFile} /></div>
    <header className="sheet-header"><img src="/multiverse%20adventurers%20guild%20icon.png" alt="Guild shield"/><div><span className="eyebrow sheet-eyebrow">MULTIVERSE ADVENTURERS GUILD</span><h1>Character Sheet</h1></div><div className="identity-fields">
      <Field label="Hero name" value={character.name} onChange={v => update(['name'], v)} wide/><IdentityChoice label="Species" value={character.species} options={speciesNames} onChange={v => update(['species'], v)}/><IdentityChoice label="Archetype" value={character.archetype} options={archetypeOptions.map(option => option.name)} onChange={chooseArchetype}/><Field label="Level" type="number" min="0" max="10" value={character.level} onChange={v => update(['level'], v)}/><Field label="XP" type="number" min="0" value={character.xp} onChange={v => update(['xp'], v)}/><div className="quick-dice" aria-label="Quick dice rolls"><span>Roll a Die</span>{[4,6,8,10,20].map(sides=><button type="button" key={sides} onClick={()=>quickDieRoll(sides)}>d{sides}</button>)}</div></div></header>

    <section className="sheet-section vitals"><SectionTitle icon="⚔" title="Combat Summary" subtitle="Move 30 feet each turn. One reaction per round."/><div className="vital-grid">
      <Vital label="Initiative" value={signed(computed.initiative)} roll={() => checkRoll('Initiative', computed.initiative)}/><Vital label="HP" editable value={character.currentHp} max={computed.maxHp} onChange={v => update(['currentHp'], v)}/><DefenseVital value={computed.defense} bonus={character.defenseBonus} rating={character.defenseRating} onBonus={value => update(['defenseBonus'], value)} onRating={value => update(['defenseRating'], value)}/><Vital label="Resilience" value={signed(computed.resilience)} roll={() => checkRoll('Resilience', computed.resilience)}/><Vital label="Ego" value={signed(computed.ego)} roll={() => checkRoll('Ego', computed.ego)}/><Vital label="Energy" editable value={character.currentEnergy} max={computed.maxEnergy} onChange={v => update(['currentEnergy'], v)}/><Vital label="Max Force" value={computed.maxForce}/></div>
    </section>

    <div className="sheet-columns"><section className="sheet-section"><SectionTitle icon="▥" title="Stats" subtitle="Starting array: +3, +2, +1, 0, 0, −1. Each choice can only be used once, except 0 twice."/><div className="stat-list">{stats.map(([key, label, short, Icon]) => <div className="stat-row" key={key}><div className="stat-name"><Icon/><strong>{label} <span>({short})</span></strong></div><SkillScoreControl label={`${label} score`} value={character.stats[key]} options={[-1, 0, 1, 2, 3]} isOptionDisabled={option => statOptionUnavailable(key, option)} onChange={v => update(['stats', key], v)}/><button className="roll-button" onClick={() => checkRoll(label, character.stats[key])}>Roll</button></div>)}</div></section>
      <section className="sheet-section skills">
        <SectionTitle icon="★" title="Skills" subtitle="Starting array: +2, +2, +1, +1, +1, 0, 0, 0, −1"/>
        <div className="skill-head"><span>Skill</span><span>Stat</span><span>Ability</span><span>Modifier</span><span>Buffs</span><span>Debuffs</span><span>Total</span></div>
        {skillDefs.map(([key, label, defaultStat, Icon]) => {
          const total = skillTotal(key, defaultStat)
          const statDefinition = stats.find(([statKey]) => statKey === defaultStat)
          const statName = statDefinition?.[1]
          const statShort = statDefinition?.[2]
          const statScore = character.stats[defaultStat]
          return <div className="skill-row" key={key}>
            <strong className="skill-name"><Icon/><span>{label} <small className="skill-stat-full">({statName})</small><small className="skill-stat-short">({statShort})</small></span></strong>
            <div className="skill-field"><small>Stat</small><output className="skill-stat">{signed(statScore)}</output></div>
            <div className="skill-field"><small>Ability</small><SkillScoreControl label={`${label} ability`} value={character.skills[key].ability} options={[-1, 0, 1, 2]} isOptionDisabled={option => skillOptionUnavailable(key, option)} onChange={v => update(['skills', key, 'ability'], v)}/></div>
            {['modifier','buffs','debuffs'].map(field => <div className="skill-field" key={field}><small>{field === 'modifier' ? 'Modifier' : field === 'buffs' ? 'Buffs' : 'Debuffs'}</small><NumberInput value={character.skills[key][field]} onChange={v => update(['skills', key, field], field === 'debuffs' ? -Math.abs(number(v)) : v)}/></div>)}
            <div className="skill-total"><div className="skill-total-actions"><div className="skill-total-value"><small>Total</small><output>{signed(total)}</output></div><button className="roll-button" onClick={() => checkRoll(label, total)}>Roll</button></div></div>
          </div>
        })}
      </section></div>

    <section className="sheet-section"><SectionTitle icon="✦" title="Attack" subtitle="Attack skill applies to melee and ranged attacks"/><div className="attack-summary"><label className="field attack-control"><span><span className="attack-label-full">Attack skill</span><span className="attack-label-short">Skill</span></span><SkillScoreControl label="Attack skill" value={character.attackSkill} options={[-1, 0, 1, 2]} isOptionDisabled={option => skillOptionUnavailable('attack', option)} onChange={v => update(['attackSkill'], v)}/></label><label className="field attack-control"><span><span className="attack-label-full">Modifier</span><span className="attack-label-short">Mod</span></span><input type="number" value={character.attackModifier} onChange={e => update(['attackModifier'], e.target.value)}/></label><AttackEquation label="Melee" statLabel="Strength" stat={character.stats.strength} attack={character.attackSkill} modifier={character.attackModifier}/><AttackEquation label="Ranged" statLabel="Dexterity" stat={character.stats.dexterity} attack={character.attackSkill} modifier={character.attackModifier}/></div></section>

    <EditableTable title="Weapons" icon="⚔" rows={character.weapons} add={() => addRow('weapons', { name: '', type: weaponTypes[0][0], enhancement: 0, notes: '' })} remove={id => deleteRow('weapons', id)} columns={['Name','Type','Enhancement','Damage','Notes','']}>
      {(row, i) => {
        const weaponType = weaponTypes.find(type => type[0] === row.type) || weaponTypes[0]
        const damageStat = weaponType[1] === 'melee' ? character.stats.strength : character.stats.dexterity
        const damageModifier = number(damageStat) + number(row.enhancement)
        return <><label className="weapon-field"><span>Name</span><input aria-label="Weapon name" value={row.name} onChange={e => update(['weapons',i,'name'],e.target.value)}/></label><label className="weapon-field"><span>Type</span><select aria-label="Weapon type" value={row.type} onChange={e => update(['weapons',i,'type'],e.target.value)}>{weaponTypes.map(type => <option key={type[0]}>{type[0]}</option>)}</select></label><label className="weapon-field"><span>Enhancement</span><NumberInput value={row.enhancement} onChange={v => update(['weapons',i,'enhancement'],v)}/></label><label className="weapon-field"><span>Damage</span><output className="weapon-damage">d{weaponType[2]} {signed(damageModifier)}</output></label><label className="weapon-field weapon-notes"><span>Notes</span><AutoTextarea maxLines={2} value={row.notes} onChange={value => update(['weapons',i,'notes'],value)}/></label><div className="row-actions"><button className="roll-button" onClick={() => attackRoll(row)}>Attack</button><button className="icon-button" onClick={() => deleteRow('weapons',row.id)}>×</button></div></>
      }}
    </EditableTable>
    <EditableTable title="Talents" icon="✹" subtitle={`Talents Acquired: ${talentsAcquired}\u00a0\u00a0\u00a0\u00a0Combat Slots: ${combatSlots}`} rows={character.talents} add={() => addRow('talents',{name:'',ability:'',duration:'',notes:''})} columns={['Talent','Ability / Cost','Duration','Notes','']}>
      {(row,i)=><><label className="talent-field"><span>Talent</span><TalentControl value={row.name} onChange={value=>selectTalent(i,value)}/></label><label className="talent-field"><span>Ability / Cost</span><input value={row.ability} onChange={e=>update(['talents',i,'ability'],e.target.value)}/></label><label className="talent-field"><span>Duration</span><input value={row.duration || ''} onChange={e=>update(['talents',i,'duration'],e.target.value)}/></label><label className="talent-field"><span>Notes</span><AutoTextarea fitOnMobile value={row.notes || ''} onChange={value=>update(['talents',i,'notes'],value)}/></label><button className="icon-button" onClick={()=>deleteTalent(row)}>×</button></>}
    </EditableTable>
    <EditableTable title="Items & Traits" icon="⚗" rows={character.items} add={() => addRow('items',{name:'',description:''})} columns={['Item / Trait','Description','']}>
      {(row,i)=><><input aria-label="Item or trait" placeholder="Item / Trait" value={row.name} onChange={e=>update(['items',i,'name'],e.target.value)}/><AutoTextarea placeholder="Description" value={row.description ?? [row.bonus,row.appliesTo].filter(Boolean).join(' — ')} onChange={value=>update(['items',i,'description'],value)}/><button className="icon-button" onClick={()=>deleteRow('items',row.id)}>×</button></>}
    </EditableTable>
    <div className="sheet-columns lower"><EditableTable title="Contacts" icon="♟" subtitle={`You begin with 3 + Charisma (${Math.max(0, 3 + number(character.stats.charisma))}) Contacts.`} rows={character.contacts} add={() => addRow('contacts',{name:'',role:''})} columns={['Name','Relationship / Role','']}>{(row,i)=><><label className="contact-field"><span>Name</span><input aria-label="Contact name" placeholder="Contact name" value={row.name} onChange={e=>update(['contacts',i,'name'],e.target.value)}/></label><label className="contact-field"><span>Role</span><ContactRoleChoice value={row.role} onChange={value=>setContactRole(i,value)}/></label><button className="icon-button" onClick={()=>deleteRow('contacts',row.id)}>×</button></>}</EditableTable><section className="sheet-section notes"><SectionTitle icon="✎" title="Session Notes"/><textarea value={character.notes} onChange={e=>update(['notes'],e.target.value)} placeholder="Conditions, mission clues, inventory, reminders…"/></section></div>
    {notice && <div className="toast">{notice}</div>}
    {roll && <RollModal roll={roll} close={() => setRoll(null)} damage={() => damageRoll(roll)}/>}
    {pendingArchetype && <ArchetypePrompt
      name={pendingArchetype}
      close={() => setPendingArchetype('')}
      chooseOnly={name => { update(['archetype'], name); setPendingArchetype('') }}
      applyDefaults={name => { applyArchetype(name); setPendingArchetype('') }}
    />}
  </div>
}

function Field({ label, onChange, wide, ...props }) { return <label className={`field ${wide ? 'wide' : ''}`}><span>{label}</span><input {...props} onChange={e => onChange(e.target.value)}/></label> }
function IdentityChoice({ label, value, options, onChange }) { const existing = options.includes(value); const [custom, setCustom] = useState(Boolean(value) && !existing); useEffect(() => { if (existing) setCustom(false) }, [existing]); const choose = event => { if (event.target.value === '__custom__') { onChange(''); setCustom(true) } else onChange(event.target.value) }; return <label className="field identity-choice"><span>{label}</span>{custom ? <div className="identity-custom"><input autoFocus aria-label={`Custom ${label}`} value={value} placeholder={`Enter custom ${label.toLowerCase()}`} onChange={e => onChange(e.target.value)}/><select className="custom-list-trigger" aria-label={`Choose ${label} from list`} value="" onChange={choose}><option value="" disabled></option>{options.map(option => <option value={option} key={option}>{option}</option>)}</select></div> : <select aria-label={`Choose ${label}`} value={existing ? value : ''} onChange={choose}><option value="" disabled>Choose</option><option value="__custom__">Custom {label.toLowerCase()}…</option>{options.map(option => <option value={option} key={option}>{option}</option>)}</select>}</label> }
function ContactRoleChoice({ value, onChange }) { const existing = contactTypes.includes(value); const expertise = contactCatalog.find(contact => contact.type === value)?.expertise || ''; const [custom, setCustom] = useState(Boolean(value) && !existing); useEffect(() => { if (existing) setCustom(false) }, [existing]); const choose = event => { if (event.target.value === '__custom__') { onChange(''); setCustom(true) } else onChange(event.target.value) }; return <div className="contact-role-control" data-tooltip={expertise ? `Expertise: ${expertise}` : ''} title={expertise}>{custom ? <div className="identity-custom"><input autoFocus aria-label="Custom contact role" value={value} placeholder="Enter custom role" onChange={event => onChange(event.target.value)}/><select className="custom-list-trigger" aria-label="Choose contact type from list" value="" onChange={choose}><option value="" disabled></option>{contactTypes.map(option => <option value={option} key={option}>{option}</option>)}</select></div> : <select aria-label="Contact role" value={existing ? value : ''} onChange={choose}><option value="" disabled>Choose contact type</option><option value="__custom__">Custom contact role…</option>{contactTypes.map(option => <option value={option} key={option}>{option}</option>)}</select>}</div> }
function NumberInput({ value, onChange }) { return <input className="number-input" type="number" value={value} onChange={e => onChange(e.target.value)}/> }
function AttackEquation({ label, statLabel, stat, attack, modifier }) { const total = number(stat) + number(attack) + number(modifier); const statShort = statLabel === 'Strength' ? 'STR' : 'DEX'; return <div className="attack-equation"><h3>{label}</h3><div className="attack-equation-values"><span><small><span className="attack-label-full">{statLabel}</span><span className="attack-label-short">{statShort}</span></small><strong>{signed(stat)}</strong></span><span><small><span className="attack-label-full">Attack Skill</span><span className="attack-label-short">Skill</span></small><strong>{signed(attack)}</strong></span><span><small><span className="attack-label-full">Modifier</span><span className="attack-label-short">Mod</span></small><strong>{signed(modifier)}</strong></span><span className="attack-equation-total"><small>Total</small><strong>{signed(total)}</strong></span></div></div> }
function AutoTextarea({ value, onChange, maxLines = 4, placeholder = '', fitOnMobile = false }) {
  const ref = useRef(null)
  const resize = element => {
    if (!element) return
    element.style.height = '0px'
    const styles = window.getComputedStyle(element)
    const lineHeight = parseFloat(styles.lineHeight) || 18
    const chrome = ['paddingTop', 'paddingBottom', 'borderTopWidth', 'borderBottomWidth'].reduce((total, property) => total + (parseFloat(styles[property]) || 0), 0)
    const maximum = fitOnMobile && window.matchMedia('(max-width: 700px)').matches ? Infinity : lineHeight * maxLines + chrome
    element.style.height = `${Math.min(element.scrollHeight, maximum)}px`
    element.style.overflowY = element.scrollHeight > maximum ? 'auto' : 'hidden'
  }
  useEffect(() => resize(ref.current), [value, maxLines, fitOnMobile])
  useEffect(() => {
    if (!ref.current || !window.ResizeObserver) return undefined
    const observer = new ResizeObserver(() => resize(ref.current))
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return <textarea ref={ref} className="auto-textarea" rows="1" value={value} placeholder={placeholder} onChange={event => { onChange(event.target.value); window.requestAnimationFrame(() => resize(event.target)) }}/>
}
function SkillScoreControl({ label, value, options, onChange, isOptionDisabled = () => false }) { const hasPreset = value !== '' && options.includes(number(value)); const [custom, setCustom] = useState(value !== '' && !hasPreset); useEffect(() => { if (hasPreset) setCustom(false) }, [hasPreset]); const choose = event => { if (event.target.value === '__custom__') { onChange(''); setCustom(true) } else onChange(event.target.value) }; return custom ? <div className="identity-custom"><input autoFocus aria-label={`${label} custom value`} type="number" min="-4" max="4" value={value} onChange={event => onChange(event.target.value)}/><select className="custom-list-trigger" aria-label={`${label} preset list`} value="" onChange={choose}><option value="" disabled></option>{options.map(option => <option value={option} key={option} disabled={isOptionDisabled(option)}>{signed(option)}</option>)}</select></div> : <select aria-label={label} value={hasPreset ? number(value) : ''} onChange={choose}><option value="" disabled>Choose</option><option value="__custom__">Custom…</option>{options.map(option => <option value={option} key={option} disabled={isOptionDisabled(option)}>{signed(option)}</option>)}</select> }
function TalentControl({ value, onChange }) { return <div className="talent-control"><select aria-label="Choose a talent" value={talentNames.includes(value) ? value : ''} onChange={e => onChange(e.target.value)}><option value="">Choose a talent</option>{talentNames.map(name => <option value={name} key={name}>{name}</option>)}</select></div> }
function SectionTitle({ title, subtitle }) { const startingArray = title === 'Stats' || title === 'Skills' ? subtitle : ''; const reminders = { 'Combat Summary': 'Move 30 feet each turn, even if you attack. Take one reaction per round. Free actions: talk, draw a weapon, or step 5 feet.', Attack: 'One Skill is used for both melee and ranged attacks. Talents can add damage.', Skills: 'You can activate one Skill per turn.', Contacts: subtitle || 'You begin with 3 + Charisma Contacts.', Talents: 'You can activate two Talents per turn. Sustained combat Talents occupy Combat Slots: one at level 0, plus one at levels 4 and 7.', 'Items & Traits': 'Items explain why your Stats and Skills look the way they do. They do not change numbers; they describe your Hero through equipment, Species, Archetype, and background. Examples: (+2) Strength — Giant Species; (−1) Sneak — loud, heavy boots. Treat them like character-defining gear without a price tag. Traits describe your Hero’s personality, beliefs, habits, and complications. Use them as roleplaying prompts; they do not change numbers unless a rule specifically says otherwise.', Weapons: 'You can have as many weapons as you like. You can attack once each turn, or move an extra 30 feet instead.' }; const note = reminders[title] || (startingArray ? '' : subtitle); const Icon = sectionIcons[title] || FaStar; return <div className="section-title"><h2 title={startingArray || undefined}><span><Icon/></span>{title}</h2>{(startingArray || note) && <p className={!note ? 'starting-array-only' : undefined}>{startingArray && <span className="starting-array-note">{startingArray} </span>}{note}</p>}{title === 'Talents' && subtitle && <strong className="section-metric">{subtitle}</strong>}</div> }
function Vital({ label, value, max, editable, onChange, roll, children }) { const Icon = vitalIcons[label]; return <div className="vital">{Icon && <Icon className="vital-icon"/>}<span>{label}</span>{editable && max !== undefined ? <div className="vital-combined"><input aria-label={`${label} current`} type="number" value={value} onChange={e=>onChange(e.target.value)}/><span>/</span><strong aria-label={`${label} maximum`}>{max}</strong></div> : editable ? <input type="number" value={value} onChange={e=>onChange(e.target.value)}/> : roll ? <div className="vital-roll-value"><strong>{value}</strong><button className="roll-button" onClick={roll}>Roll</button></div> : <strong>{value}</strong>}{children}</div> }
function DefenseVital({ value, bonus, rating, onBonus, onRating }) { return <div className="vital defense-vital"><FaShieldAlt className="vital-icon"/><span>Defense</span><div className="defense-controls"><label><span>Bonus</span><input aria-label="Bonus" type="number" value={bonus} onChange={event => onBonus(event.target.value)}/></label><strong aria-label="Defense total">{value}</strong><label><span>Rating</span><input aria-label="Rating" type="number" value={rating} onChange={event => onRating(event.target.value)}/></label></div></div> }
function EditableTable({ title, icon, subtitle, rows, columns, add, children }) { const slug = title.toLowerCase().replaceAll(' & ', '-').replaceAll(' ', '-'); return <section className={`sheet-section editable-table table-${slug}`}><SectionTitle icon={icon} title={title} subtitle={subtitle}/><div className="table-head">{columns.map((column,i)=><span key={`${column}-${i}`}>{column}</span>)}</div>{rows.map((row,i)=><div className="table-row" key={row.id}>{children(row,i)}</div>)}<button className="add-row" onClick={add}>＋ Add {title.replace(/s$/, '')}</button>{title === 'Talents' && <ForceTable/>}</section> }
function ForceTable() { return <div className="force-table"><h3>Force Activation Costs</h3><div className="force-row force-head"><span>Force</span><span>Sustained</span><span>One-shot</span></div>{[[1,1,1],[2,4,2],[3,9,4],[4,16,8]].map(([force,sustained,oneShot]) => <div className="force-row" key={force}><strong>F{force}</strong><span>{sustained} Energy</span><span>{oneShot} Energy</span></div>)}<p>One-shots last for one roll or immediate use and do not occupy a Talent Slot.</p></div> }
function RollModal({ roll, close, damage }) { const success = roll.result?.includes('Success') || roll.result?.includes('success') || roll.hit; const displayDie = roll.kind === 'damage' || roll.kind === 'die' ? roll.die : 20; return createPortal(<div className="modal-backdrop" onMouseDown={e => e.target===e.currentTarget && close()}><div className={`roll-modal ${success ? 'success' : ''}`} role="dialog" aria-modal="true"><button className="modal-close" onClick={close}>×</button><span className="eyebrow">{roll.kind === 'damage' ? 'DAMAGE ROLL' : roll.kind === 'attack' ? 'ATTACK ROLL' : roll.kind === 'die' ? 'DIE ROLL' : 'D20 CHECK'}</span><h2>{roll.label}</h2><div className={`die-result die-d${displayDie}`}>{roll.natural}</div>{roll.kind !== 'die' && <div className="roll-math"><span>Die <strong>{roll.natural}</strong></span><span>Modifier <strong>{signed(roll.modifier)}</strong></span><span>Total <strong>{roll.total}</strong></span>{roll.tn != null && <span>Target <strong>{roll.tn}</strong></span>}</div>}{roll.kind === 'attack' && <h3>{roll.natural === 20 ? 'Critical hit!' : roll.natural === 1 ? 'Critical miss!' : roll.tn == null ? 'Attack rolled' : roll.hit ? 'Hit!' : 'Miss'}</h3>}{roll.result && <h3>{roll.result}</h3>}{roll.critical && <p>Critical hit: maximum d{roll.die} damage.</p>}{roll.kind === 'attack' && roll.hit && <button className="primary damage-button" onClick={damage}>Roll d{roll.die} Damage</button>}</div></div>, document.body) }
function ArchetypePrompt({ name, close, chooseOnly, applyDefaults }) { return createPortal(<div className="modal-backdrop" onMouseDown={event => event.target === event.currentTarget && close()}><div className="archetype-prompt" role="dialog" aria-modal="true" aria-labelledby="archetype-prompt-title"><button type="button" className="modal-close" onClick={close}>×</button><span className="eyebrow">ARCHETYPE SETUP</span><h2 id="archetype-prompt-title">Use the {name} starting package?</h2><p>The starting package fills suggested Stats, Skills, Talents, weapons, Items, Traits, and Contacts appropriate to your level. Existing custom entries are preserved wherever possible.</p><div className="archetype-prompt-actions"><button type="button" onClick={() => chooseOnly(name)}>Choose Archetype Only</button><button type="button" className="primary" onClick={() => applyDefaults(name)}>Use Starting Package</button></div></div></div>, document.body) }
export default CharacterSheet
