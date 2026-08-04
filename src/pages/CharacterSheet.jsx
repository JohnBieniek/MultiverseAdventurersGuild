import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { FaAsterisk, FaBolt, FaBookOpen, FaBrain, FaCar, FaChartBar, FaCommentDots, FaCrosshairs, FaEye, FaFlask, FaHandPaper, FaHeart, FaHeartbeat, FaLightbulb, FaMicrochip, FaRunning, FaShieldAlt, FaSmile, FaStar, FaStickyNote, FaSun, FaTree, FaUserSecret, FaUsers } from 'react-icons/fa'
import { GiBiceps, GiBroadsword, GiCrossedAxes, GiCrossedSwords } from 'react-icons/gi'
import talentsText from '../content/players/talents.txt?raw'
import speciesText from '../content/players/species.txt?raw'
import archetypesText from '../content/players/archetypes.txt?raw'
import contactsText from '../content/players/contacts.txt?raw'
import { randomCharacterName } from '../data/characterNames'
import { archetypeTraitPools, speciesTraitPools } from '../data/randomTraits'
import './CharacterSheet.css'

const STORE_KEY = 'mag-playable-characters-v1'
const ACTIVE_CHARACTER_KEY = 'mag-active-character-v1'
const NEW_CHARACTER_COMMAND_KEY = 'mag-new-character-command-v1'
const stats = [
  ['strength', 'Strength', 'STR', GiBiceps, 'Your ability to lift, hit hard, and manipulate the world through physical means. Strength powers melee attacks and feats of raw force.'],
  ['dexterity', 'Dexterity', 'DEX', FaHandPaper, 'Your precision, coordination, and control. Dexterity helps you strike accurately, hit weak spots, sneak, and handle ranged weapons or vehicles.'],
  ['endurance', 'Endurance', 'END', FaHeart, 'Your stamina, toughness, and ability to keep going through pain, fatigue, injury, illness, and other physically grueling conditions. It also affects Hit Points.'],
  ['intuition', 'Intuition', 'INT', FaBrain, 'Your instincts and ability to notice patterns, read a situation, solve problems, and reach conclusions without relying only on formal learning.'],
  ['education', 'Education', 'EDU', FaBookOpen, 'What you have learned through school, training, research, or life experience. Education helps you recall facts and apply specialized knowledge.'],
  ['charisma', 'Charisma', 'CHA', FaCommentDots, 'Your force of personality and ability to connect with or sway others through persuasion, intimidation, performance, or fast talk. It also affects Contacts.'],
]
const attackSkillDescription = 'Make attacks and use offensive Talents. Buy Attack once; it applies to melee attacks using Strength and ranged attacks using Dexterity. Each Hero starts with a +1 modifier in either Melee or Ranged Attack. Improve that modifier one step at a time by spending 1 XP for +1, 4 XP for +2, 9 XP for +3, and 16 XP for +4.'
const skillDefs = [
  ['athletics', 'Athletics', 'endurance', FaRunning, 'Climb, jump, swim, grapple, resist knockback, endure physical hazards, and perform other demanding physical tasks.'],
  ['influence', 'Influence', 'charisma', FaSmile, 'Persuade, intimidate, interrogate, deceive, perform, impersonate, and otherwise shape what people think or do.'],
  ['knowledge', 'Knowledge', 'education', FaLightbulb, 'Recall learned topics, research unfamiliar subjects, and understand academic, historical, cultural, or magical theory.'],
  ['observation', 'Observation', 'intuition', FaEye, 'Notice details, spot danger or hidden clues, read your surroundings, and perceive things others might miss.'],
  ['outdoors', 'Outdoors', 'intuition', FaTree, 'Track creatures, survive in the wild, navigate unfamiliar terrain, find resources, and understand natural environments.'],
  ['sneak', 'Sneak', 'dexterity', FaUserSecret, 'Move unseen or unheard, use sleight of hand, infiltrate secure places, conceal objects, and create convincing disguises.'],
  ['technology', 'Technology', 'education', FaMicrochip, 'Hack systems, practice medicine, operate or repair devices, engineer solutions, disable traps, and search digital networks.'],
  ['vehicle', 'Vehicle', 'dexterity', FaCar, 'Drive, pilot, ride, maneuver, or control vehicles and mounts—from cars and horses to aircraft and starships.'],
]
const sectionIcons = { 'Combat Summary': GiBroadsword, Stats: FaChartBar, Skills: FaStar, Attack: GiCrossedAxes, Weapons: GiCrossedSwords, Talents: FaAsterisk, 'Items & Traits': FaFlask, Contacts: FaUsers, 'Session Notes': FaStickyNote }
const sectionGuideLinks = { 'Combat Summary': '/rules#combat', Stats: '/players#stats', Skills: '/players#skills', Attack: '/players#skill-attack', Weapons: '/players#weapons', Talents: '/players#talents', 'Items & Traits': '/players#equipment', Contacts: '/players#contacts' }
const vitalIcons = { Initiative: FaCrosshairs, HP: FaHeartbeat, Defense: FaShieldAlt, Resilience: FaHeart, Ego: FaBrain, Energy: FaBolt, 'Max Force': FaSun }
const vitalRuleLinks = { Initiative: '/rules#combat-initiative', HP: '/players#hp', Defense: '/players#defense-defense', Resilience: '/players#defense-resilience', Ego: '/players#defense-ego', Energy: '/rules#level-progression-force-energy-and-talents', 'Max Force': '/rules#level-progression-force-energy-and-talents' }
const startingStatArray = [3, 2, 1, 0, 0, -1]
const startingSkillArray = [2, 2, 1, 1, 1, 0, 0, 0, -1]
const defenseUpgradeCosts = { 2: 2, 3: 2, 4: 4, 5: 4, 6: 8, 7: 8 }
const defenseXpSpent = rating => Object.entries(defenseUpgradeCosts).reduce((total, [score, cost]) => total + (number(rating) >= number(score) ? cost : 0), 0)
const levelUpBenefits = {
  1: { automatic: 'Gain 2 Talents. Your base HP becomes 16 and maximum Energy becomes 3.', choice: 'Choose one free Level benefit: +1 melee or ranged Attack modifier, +1 Defense, or 1 additional Talent.' },
  2: { automatic: 'Unlock Force 2 Talents. Your base HP becomes 22 and maximum Energy becomes 6.' },
  3: { automatic: 'Gain 1 Talent. Your base HP becomes 28 and maximum Energy becomes 9.' },
  4: { automatic: 'Gain a second sustained Combat Talent Slot. Your base HP becomes 34 and maximum Energy becomes 12.', choice: 'Choose one free Level benefit: +1 melee or ranged Attack modifier, +1 Defense, or 1 additional Talent.' },
  5: { automatic: 'Unlock Force 3 Talents and gain 1 Talent. Your base HP becomes 40 and maximum Energy becomes 15.' },
  6: { automatic: 'Your base HP becomes 46 and maximum Energy becomes 18.', choice: 'Choose one free Level benefit: +1 melee or ranged Attack modifier, +1 Defense, or 1 additional Talent.' },
  7: { automatic: 'Gain a third sustained Combat Talent Slot and 1 Talent. Your base HP becomes 52 and maximum Energy becomes 21.' },
  8: { automatic: 'Your base HP becomes 58 and maximum Energy becomes 24.', choice: 'Choose one free Level benefit: +1 melee or ranged Attack modifier, +1 Defense, or 1 additional Talent.' },
  9: { automatic: 'Unlock Force 4 Talents and gain 1 Talent. Your base HP becomes 64 and maximum Energy becomes 27.' },
  10: { automatic: 'Your base HP becomes 70, maximum Energy becomes 30, and you reach the final Guild rank.' },
}
const xpSpendingHelp = 'XP available to purchase improvements. Stats, Skills, and each Attack modifier cost 1 XP for +1, 4 XP for +2, 9 XP for +3, and 16 XP for +4; buy each step separately. Defense ratings +2 through +7 cost 2, 2, 4, 4, 8, and 8 XP. Talents cost 5 XP each. Additional Energy costs 2 XP per point. Subtract purchases from Unspent XP; Total XP and Level do not decrease.'
const weaponTypes = [
  ['Unarmed / Tiny Melee', 'melee', 4, 0], ['Light Melee', 'melee', 6, 0],
  ['Medium Melee', 'melee', 8, 0], ['Heavy Melee', 'melee', 10, -2],
  ['Holdout Ranged', 'ranged', 4, 0], ['Compact Ranged', 'ranged', 6, 0],
  ['Longarm Ranged', 'ranged', 8, 0], ['Heavy Ranged', 'ranged', 10, 0],
]
const weaponLoadouts = {
  Barbarian: [['Notched Seax','Light Melee'],['Stonehead War Club','Medium Melee'],['Worldsplitter Greataxe','Heavy Melee'],['Iron Throwing Axe','Holdout Ranged']],
  'Bounty Hunter': [['Capture Knife','Light Melee'],['Arc-Cuff Shock Baton','Medium Melee'],['Sleeve Dartcaster','Holdout Ranged'],['Tracker Carbine','Longarm Ranged']],
  Scientist: [['Laser Scalpel','Light Melee'],['Telescoping Logic Staff','Medium Melee'],['Palm-Sized Beam Emitter','Holdout Ranged']],
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
const suppliedDescriptorOptions = {
  "MELEE": {
    "name": "Melee Weapon",
    "types": {
      "hardwired": [
        "Cyber Arm Blade",
        "Monofilament Whip",
        "Power Fist",
        "Vibroblade",
        "Energy Baton"
      ],
      "wetwired": [
        "Bone Density Mod",
        "Bio-Enhanced Reflex Strikes",
        "Muscle Fiber Overcharge",
        "Clawed Limb Mod"
      ],
      "magic": [
        "Flaming Sword",
        "Shadow Blade",
        "Arcane Hammer",
        "Holy Weapon",
        "Spirit Strike"
      ],
      "species": [
        "Orcish War Axe",
        "Dwarven Hammer",
        "Elven Rapier",
        "Giant’s Club"
      ],
      "archetype": [
        "Soldier’s Combat Training",
        "Gladiator’s Mastery",
        "Brawler’s Technique",
        "Knight’s Discipline"
      ],
      "chemical": [
        "Adrenaline Booster",
        "Combat Stimulant",
        "Strength Serum",
        "Berserker Compound"
      ]
    },
    "standard": [
      "Combat Knife",
      "Short Sword",
      "Broad Sword",
      "Greatsword",
      "War Hammer",
      "Poleaxe",
      "Shock Glove",
      "Monofilament Whip",
      "Power Fist",
      "Bio-talon",
      "Vibro-Dagger",
      "Rune Blade",
      "Mace",
      "Ceramic Kukri",
      "Hookblade",
      "Longword",
      "2-Handed Sword",
      "Katana"
    ],
    "improvised": []
  },
  "RNG": {
    "name": "Ranged Weapons",
    "types": {
      "hardwired": [
        "Smartgun Link",
        "Auto-Target Scope",
        "Cyber Optic Reticle",
        "Stabilizer Arm",
        "Drone-Assisted Rifle"
      ],
      "wetwired": [
        "Reflex Nerve Mod",
        "Bio-Steady Grip",
        "Enhanced Eye–Hand Coordination",
        "Muscle Stabilization Therapy"
      ],
      "magic": [
        "Lightning Bow",
        "Wand of Firebolts",
        "Magic Missile Focus",
        "Elemental Shot Rune",
        "Spellgun",
        "Elemental Attack (Fire, Electricity, Water, Cold, Wind)",
        "Harm Talent"
      ],
      "species": [
        "Elven Archer Lineage",
        "Dwarven Crossbow Craft",
        "Orcish Throwing Instinct"
      ],
      "archetype": [
        "Marksman’s Training",
        "Sniper’s Discipline",
        "Hunter’s Technique",
        "Gunfighter’s Style"
      ],
      "chemical": [
        "Focus Serum",
        "Reflex Booster",
        "Combat Drug",
        "Aim Enhancer Compound"
      ]
    },
    "standard": [
      "Throwing Knife",
      "Sling",
      "Shortbow",
      "Longbow",
      "Crossbow",
      "Hand Crossbow",
      "Recurve Bow",
      "Blowgun",
      "Dart Gun",
      "Light Pistol",
      "Heavy Pistol",
      "Revolver",
      "Shotgun",
      "Submachine Gun",
      "Assault Rifle",
      "Hunting Rifle",
      "Sniper Rifle",
      "Tranquilizer Gun",
      "Energy Carbine",
      "Laz Gun/Rifle"
    ],
    "improvised": []
  },
  "UNM": {
    "name": "Unarmed",
    "types": {
      "hardwired": [
        "Cyber Fist",
        "Hydraulic Arm",
        "Reinforced Knuckles",
        "Shock Gauntlet",
        "Servo-Driven Strike System"
      ],
      "wetwired": [
        "Bone Density Mod",
        "Bio-Electric Pulse Gland",
        "Reflex Muscle Enhancement",
        "Adrenal Surge Node"
      ],
      "magic": [
        "Fist of Flame",
        "Lightning Punch",
        "Divine Smite Strike",
        "Ki-Infused Blow",
        "Spirit Claw"
      ],
      "species": [
        "Orcish Brawler Lineage",
        "Giant’s Grip"
      ],
      "archetype": [
        "Monk’s Discipline",
        "Brawler’s Technique",
        "Martial Artist’s Focus",
        "Street Fighter Training"
      ],
      "chemical": [
        "Combat Stimulant",
        "Reflex Enhancer",
        "Pain Suppressant Serum",
        "Muscle Boost Compound"
      ]
    },
    "standard": [],
    "improvised": [
      "Broken Bottle",
      "Lead Pipe",
      "Crowbar",
      "Chair Leg",
      "Frying Pan",
      "Baseball Bat",
      "Wrench",
      "Glass Shard",
      "Belt with Buckle",
      "Chain",
      "Rope with Knot",
      "Heavy Book",
      "Rock / Brick",
      "Garden Hoe",
      "Rusted Nails (in a rag)",
      "Metal Flashlight",
      "Broken Chair",
      "Folding Chair",
      "Steel Cable Coil",
      "Iron Rod",
      "Spray Can & Lighter (improvised incendiary)",
      "Tin Can with Nails (shrapnel)",
      "Sharp Spoon",
      "club",
      "staff."
    ]
  },
  "ARM": {
    "name": "Armor",
    "types": {
      "hardwired": [
        "Power Armor",
        "Reactive Plating",
        "Servo-Assisted Exosuit",
        "Ballistic Mesh Weave",
        "Kinetic Dampening Field"
      ],
      "wetwired": [
        "Bio-Reinforced Skin",
        "Gene-Toughened Tissue",
        "Adaptive Muscle Layer",
        "Organic Armor Growth"
      ],
      "magic": [
        "Enchanted Armor",
        "Shielding Ward",
        "Mystic Barrier",
        "Stoneskin Rune",
        "Holy Aegis"
      ],
      "species": [
        "Dwarven Forgeplate",
        "Orcish Battlehide",
        "Giant’s Endurance"
      ],
      "archetype": [
        "Soldier’s Training",
        "Knight’s Discipline",
        "Guardian’s Stance",
        "Gladiator’s Conditioning"
      ],
      "chemical": [
        "Dermal Hardener Serum",
        "Pain Suppressant",
        "Combat Stimulant",
        "Resilience Drug"
      ]
    },
    "standard": [
      "Padded Armor",
      "Leather Armor",
      "Reinforced Jacket",
      "Chain Shirt",
      "Kevlar Vest",
      "Chainmail",
      "Tactical Armor",
      "Scale Mail",
      "Breastplate",
      "Combat Suit",
      "Half-Plate",
      "Powered Vest",
      "Full Plate",
      "Riot Armor",
      "Exo-Frame Suit",
      "Stealth Weave Suit",
      "Ballistic Coat",
      "Nano-Mesh Armor",
      "Environmental Suit",
      "dodgy",
      "shield"
    ],
    "improvised": []
  },
  "ST": {
    "name": "Strength",
    "types": {
      "hardwired": [
        "Cyberarm",
        "Hydraulic Muscles",
        "Servo-Boost Frame",
        "Exo-Skeleton Ring",
        "Reinforced Bone Lattice",
        "Power Gauntlet"
      ],
      "wetwired": [
        "Vat-Grown Muscles",
        "Gene-Spliced Tendons",
        "Regenerative Hormone Pump",
        "Bone Density Serum"
      ],
      "magic": [
        "Blessing of Giants",
        "Strength of the Bear",
        "Titan’s Tattoo",
        "War God’s Favor",
        "Enchanted Gauntlets",
        "Rune of Might"
      ],
      "species": [
        "Orcish Bulk",
        "Giant Heritage",
        "Dwarven Endurance"
      ],
      "archetype": [
        "Barbarian’s Fury",
        "Soldier’s Training",
        "Martial Conditioning",
        "Brawler’s Build"
      ],
      "chemical": [
        "Combat Stims",
        "Adrenaline Injector",
        "Titan Serum",
        "Muscle Fiber Tonic",
        "Combat Drug"
      ]
    },
    "standard": [],
    "improvised": []
  },
  "DX": {
    "name": "Dexterity",
    "types": {
      "hardwired": [
        "Neural Reflex Booster",
        "Motion-Assisted Joints",
        "Cyber Reflex Spine",
        "Balance Gyro",
        "Smartgrip Fingers",
        "Targeting Reticle"
      ],
      "wetwired": [
        "Reflex Gland Enhancement",
        "Gene-Tuned Nervous System",
        "Adrenal Reflex Pump",
        "Tendon Reinforcement Therapy"
      ],
      "magic": [
        "Cat’s Grace",
        "Boots of Balance",
        "Spirit of Wind",
        "Enchanted Reflex Rune",
        "Chrono-Sense Tattoo"
      ],
      "species": [
        "Elven Agility",
        "Fey Reflexes"
      ],
      "archetype": [
        "Gunslinger’s Draw",
        "Acrobat’s Flow",
        "Rogue’s Precision",
        "Duelist’s Stance"
      ],
      "chemical": [
        "Reflex Stims",
        "Focus Tonic",
        "Combat Neuro-Accelerant",
        "Reaction Mod"
      ]
    },
    "standard": [],
    "improvised": []
  },
  "EN": {
    "name": "Endurance",
    "types": {
      "hardwired": [
        "Subdermal Armor",
        "Reinforced Skeleton",
        "Cyber-Heart",
        "Internal Cooling System",
        "Respiratory Filters",
        "Nanite Repair Mesh"
      ],
      "wetwired": [
        "Gene-Stabilized Metabolism",
        "Bio-Regen Tissues",
        "Enhanced Immune Matrix",
        "Hormonal Resilience Therapy"
      ],
      "magic": [
        "Aura of Vitality",
        "Enduring Spirit",
        "Stonehide Charm",
        "Blessing of Fortitude",
        "Regeneration Tattoo"
      ],
      "species": [
        "Dwarven Constitution",
        "Giant’s Stamina",
        "Orcish Toughness"
      ],
      "archetype": [
        "Soldier’s Discipline",
        "Monk’s Conditioning",
        "Survivor’s Grit",
        "Marathoner’s Training"
      ],
      "chemical": [
        "Pain Suppressant",
        "Enduro-Drug",
        "Metabolic Booster",
        "Combat Stimulant",
        "Blood Oxygen Enhancer"
      ]
    },
    "standard": [],
    "improvised": []
  },
  "INU": {
    "name": "Intuition",
    "types": {
      "hardwired": [
        "Predictive Algorithm Implant",
        "Tactical HUD",
        "Sensory Sync Node",
        "Neural Pattern Reader",
        "Micro-AI Assistant"
      ],
      "wetwired": [
        "Gene-Tuned Perception",
        "Neuro-Adaptive Cortex",
        "Instinct Reinforcement Therapy",
        "Empathic Sensory Mod"
      ],
      "magic": [
        "Third Eye Rune",
        "Divination Charm",
        "Spirit Insight",
        "Precognition Tattoo",
        "Foresight Blessing"
      ],
      "species": [
        "Elven Awareness",
        "Fey Perception"
      ],
      "archetype": [
        "Investigator’s Instinct",
        "Scout’s Awareness",
        "Gambler’s Read",
        "Detective’s Hunch"
      ],
      "chemical": [
        "Focus Enhancer",
        "Clarity Serum",
        "Neural Accelerator",
        "Sensory Boost Compound"
      ]
    },
    "standard": [],
    "improvised": []
  },
  "EDU": {
    "name": "Education",
    "types": {
      "hardwired": [
        "Datajack Interface",
        "Knowledge Chipset",
        "Memory Storage Implant",
        "Neural Uplink",
        "Cognitive Augmentor"
      ],
      "wetwired": [
        "Gene-Boosted Memory",
        "Cognitive Optimization Therapy",
        "Neural Growth Enhancement",
        "Bio-Learning Adaptation"
      ],
      "magic": [
        "Tome of Wisdom",
        "Scholar’s Rune",
        "Arcane Insight",
        "Blessing of Knowledge",
        "Lorekeeper’s Tattoo"
      ],
      "species": [
        "Elven Scholar Lineage",
        "Dwarven Craft Memory"
      ],
      "archetype": [
        "Academic Training",
        "Researcher’s Discipline",
        "Engineer’s Schooling",
        "Historian’s Study"
      ],
      "chemical": [
        "Nootropic Compound",
        "Focus Serum",
        "Neural Enhancer",
        "Study Stimulant"
      ]
    },
    "standard": [],
    "improvised": []
  },
  "CHA": {
    "name": "Charisma",
    "types": {
      "hardwired": [
        "Voice Modulator",
        "Emotion Projection Implant",
        "Facial Sculpt Mod",
        "Holo-Aura Projector",
        "Neural Empathy Synth"
      ],
      "wetwired": [
        "Pheromone Regulation",
        "Emotional Resonance Gland",
        "Bio-Aesthetic Enhancement",
        "Empathic Neuro-Sync"
      ],
      "magic": [
        "Charm Spell",
        "Aura of Command",
        "Enchantment Sigil",
        "Glamour Rune",
        "Spirit of Persuasion"
      ],
      "species": [
        "Elven Grace",
        "Fey Presence"
      ],
      "archetype": [
        "Diplomat’s Training",
        "Performer’s Flair",
        "Leader’s Bearing",
        "Con Artist’s Confidence"
      ],
      "chemical": [
        "Social Enhancer",
        "Charisma Booster",
        "Confidence Serum",
        "Empathy Stimulant",
        "Skills"
      ]
    },
    "standard": [],
    "improvised": []
  },
  "ATK": {
    "name": "Attack",
    "types": {
      "hardwired": [
        "Smartgun Link",
        "Targeting Reticle",
        "Cyber-Optic Scope",
        "Servo Arm",
        "Weapon Sync Implant"
      ],
      "wetwired": [
        "Reflex-Splice Tendons",
        "Precision Muscle Mod",
        "Neural Strike Pathway",
        "Combat Instinct Gland"
      ],
      "magic": [
        "Weapon of Power",
        "Flaming Blade",
        "Arcane Strike",
        "Lightning Touch",
        "Channelled Smite"
      ],
      "species": [
        "Orcish Fury",
        "Giant’s Might"
      ],
      "archetype": [
        "Soldier’s Training",
        "Duelist’s Discipline",
        "Hunter’s Aim",
        "Gladiator’s Focus"
      ],
      "chemical": [
        "Rage Injector",
        "Adrenal Surge",
        "Combat Stimulant",
        "Focus Serum"
      ]
    },
    "standard": [],
    "improvised": []
  },
  "INF": {
    "name": "Influence",
    "types": {
      "hardwired": [
        "Neural Persuasion Chip",
        "Vocal Modulator",
        "Emotion Mapping Implant",
        "Eye Contact Optimizer",
        "Empathy Synthesizer"
      ],
      "wetwired": [
        "Pheromone Control Gland",
        "Empathic Resonance Therapy",
        "Gene-Tuned Presence",
        "Neurochemical Rapport Mod"
      ],
      "magic": [
        "Aura of Command",
        "Silver Tongue Spell",
        "Enchantment Sigil",
        "Glamour Ward",
        "Charm Rune"
      ],
      "species": [
        "Elven Charm",
        "Fey Diplomacy"
      ],
      "archetype": [
        "Politician’s Tact",
        "Diplomat’s Training",
        "Negotiator’s Patience",
        "Performer’s Charisma"
      ],
      "chemical": [
        "Confidence Booster",
        "Social Enhancer",
        "Truth Serum",
        "Influence Compound"
      ]
    },
    "standard": [],
    "improvised": []
  },
  "KNW": {
    "name": "Knowledge",
    "types": {
      "hardwired": [
        "Datajack Uplink",
        "Infochip Archive",
        "Cognitive Processor",
        "Research AI Link",
        "Neural Database Implant"
      ],
      "wetwired": [
        "Gene-Boosted Memory",
        "Cognitive Expansion Therapy",
        "Bio-Learning Enhancement",
        "Neural Pattern Optimizer"
      ],
      "magic": [
        "Tome of Secrets",
        "Lore Rune",
        "Arcane Insight",
        "Divination Sigil",
        "Blessing of Wisdom"
      ],
      "species": [
        "Dwarven Craft Lore",
        "Elven History"
      ],
      "archetype": [
        "Scholar’s Study",
        "Investigator’s Training",
        "Engineer’s Research",
        "Historian’s Discipline"
      ],
      "chemical": [
        "Nootropic Injection",
        "Focus Compound",
        "Learning Serum",
        "Clarity Stimulant"
      ]
    },
    "standard": [],
    "improvised": []
  },
  "OBS": {
    "name": "Observation",
    "types": {
      "hardwired": [
        "Cyber Optics",
        "Multi-Spectrum Scanner",
        "Audio Filter Implant",
        "Sensor Array",
        "Targeting HUD"
      ],
      "wetwired": [
        "Gene-Tuned Eyes",
        "Enhanced Sensory Cortex",
        "Pheromone Detection Gland",
        "Reflexive Perception Node"
      ],
      "magic": [
        "True Sight Rune",
        "Clairvoyance Charm",
        "Diviner’s Focus",
        "Eagle Eye Enchantment",
        "Spirit Sight"
      ],
      "species": [
        "Elven Eyes",
        "Dwarven Detail Sense"
      ],
      "archetype": [
        "Detective’s Focus",
        "Hunter’s Awareness",
        "Scout’s Vigilance",
        "Sniper’s Patience"
      ],
      "chemical": [
        "Focus Enhancer",
        "Perception Booster",
        "Awareness Drug",
        "Sensory Stimulant"
      ]
    },
    "standard": [],
    "improvised": []
  },
  "OUT": {
    "name": "Outdoors",
    "types": {
      "hardwired": [
        "Environmental Filter Implant",
        "Climate Suit Interface",
        "Terrain Scanner",
        "GPS Neural Link",
        "Drone Pathfinder"
      ],
      "wetwired": [
        "Adaptive Physiology",
        "Thermal Regulation Gland",
        "Enhanced Lung Capacity",
        "Bio-Camouflage Skin"
      ],
      "magic": [
        "Nature’s Blessing",
        "Hunter’s Mark",
        "Beast Tongue Rune",
        "Druidic Ward",
        "Weather Sense Charm"
      ],
      "species": [
        "Elven Survival Instincts",
        "Orcish Endurance",
        "Dwarven Pathfinder"
      ],
      "archetype": [
        "Ranger’s Training",
        "Explorer’s Instinct",
        "Hunter’s Discipline",
        "Survivalist’s Craft"
      ],
      "chemical": [
        "Endurance Booster",
        "Adrenaline Surge",
        "Anti-Fatigue Compound",
        "Focus Serum"
      ]
    },
    "standard": [],
    "improvised": []
  },
  "SNK": {
    "name": "Sneak",
    "types": {
      "hardwired": [
        "Optical Camouflage Implant",
        "Sound Dampening Pads",
        "Thermal Masking Mesh",
        "Cloak Field Generator",
        "Stealth Subroutine"
      ],
      "wetwired": [
        "Adaptive Skin Pigmentation",
        "Silent Respiration Mod",
        "Flex-Muscle Gene Mod",
        "Pheromone Suppression Gland"
      ],
      "magic": [
        "Invisibility Spell",
        "Shadow Walk",
        "Silence Ward",
        "Illusion Veil",
        "Ghost Step Charm"
      ],
      "species": [
        "Halfling Nimbleness",
        "Elven Shadowstep"
      ],
      "archetype": [
        "Thief’s Training",
        "Assassin’s Patience",
        "Scout’s Evasion",
        "Spy’s Discipline"
      ],
      "chemical": [
        "Reflex Suppressant",
        "Stealth Serum",
        "Nerve Calmer",
        "Focus Injection"
      ]
    },
    "standard": [],
    "improvised": []
  },
  "TECH": {
    "name": "Technology",
    "types": {
      "hardwired": [
        "Cyber Interface Jack",
        "Neural Uplink",
        "Drone Control Modulator",
        "Tech Manipulator Arm",
        "Circuit Integration Implant"
      ],
      "wetwired": [
        "Gene-Linked Neural Pathway",
        "Bio-Interface Growth",
        "Organic Processor Node",
        "Adaptive Synapse Bridge"
      ],
      "magic": [
        "Arcane Circuit",
        "Infused Device",
        "Enchanted Gear",
        "Spell-Powered Machine"
      ],
      "species": [
        "Dwarven Engineer",
        "Constructed Heritage",
        "Machineborn"
      ],
      "archetype": [
        "Mechanic’s Training",
        "Engineer’s Discipline",
        "Inventor’s Craft",
        "Hacker’s Expertise"
      ],
      "chemical": [
        "Focus Stimulant",
        "Logic Enhancer",
        "Neural Drive Compound",
        "Productivity Booster"
      ]
    },
    "standard": [],
    "improvised": []
  },
  "VEH": {
    "name": "Vehicle",
    "types": {
      "hardwired": [
        "Neural Drive Link",
        "Vehicle Control Modulator",
        "Gyro-Balance Implant",
        "Motion Sync Harness",
        "Pilot Interface Chip"
      ],
      "wetwired": [
        "Reflex Sync Gland",
        "Bio-Adapted Inner Ear",
        "Endurance Conditioning Therapy",
        "Enhanced Vestibular Mod"
      ],
      "magic": [
        "Pilot’s Blessing",
        "Wind Guidance Charm",
        "Mechanized Familiar",
        "Speed Rune",
        "Arcane Stabilizer"
      ],
      "species": [
        "Dwarven Mechanist",
        "Orcish Driver",
        "Faerie Sky Pilot"
      ],
      "archetype": [
        "Driver’s Training",
        "Ace Pilot Discipline",
        "Wheelman’s Reflex",
        "Racer’s Instinct"
      ],
      "chemical": [
        "Focus Injector",
        "Reaction Enhancer",
        "Combat Drive Stimulant",
        "Clarity Serum",
        "Health Mods"
      ]
    },
    "standard": [],
    "improvised": []
  }
}
const descriptorTypesByStyle = {
  modern: ['hardwired', 'chemical', 'archetype'],
  fantasy: ['magic', 'wetwired', 'archetype'],
  cyber: ['hardwired', 'wetwired', 'chemical', 'archetype'],
  mystic: ['magic', 'wetwired', 'archetype'],
  science: ['hardwired', 'wetwired', 'chemical', 'archetype'],
  street: ['chemical', 'hardwired', 'archetype'],
  elegant: ['magic', 'hardwired', 'archetype'],
  western: ['chemical', 'archetype'],
  martial: ['magic', 'wetwired', 'chemical', 'archetype'],
}
const speciesDescriptorTerms = {
  Cyborg: ['cyber', 'machineborn', 'constructed'],
  Dwarf: ['dwarf', 'dwarven'],
  Elf: ['elf', 'elven'],
  Fairy: ['fairy', 'faerie', 'fey'],
  Gnome: ['gnome', 'gnomish'],
  Giant: ['giant'],
  Halfling: ['halfling'],
  Human: ['human'],
  Orc: ['orc', 'orcish'],
  SAI: ['machineborn', 'constructed'],
}
const archetypeDescriptorTerms = {
  Barbarian: ['barbarian', 'berserker', 'brawler', 'gladiator', 'survivor', 'martial'],
  'Bounty Hunter': ['hunter', 'ranger', 'scout', 'investigator'],
  Scientist: ['academic', 'researcher', 'scholar', 'historian', 'engineer', 'inventor'],
  Cleric: ['cleric', 'healer', 'guardian', 'paladin', 'devotion'],
  Commando: ['soldier', 'marksman', 'combat', 'defender', 'guardian'],
  Criminal: ['rogue', 'thief', 'con artist', 'brawler', 'wheelman', 'gambler'],
  Druid: ['druid', 'ranger', 'hunter', 'survivalist', 'explorer'],
  'Eco Terrorist': ['ranger', 'survivalist', 'infiltrator', 'saboteur', 'explorer'],
  'Ex-Company Man': ['diplomat', 'leader', 'negotiator', 'academic', 'spy'],
  'Ex-Cop': ['detective', 'investigator', 'soldier', 'marksman', 'guardian'],
  'Ex-Military': ['soldier', 'combat', 'marksman', 'defender', 'survivor', 'marathoner'],
  Face: ['diplomat', 'performer', 'leader', 'con artist', 'politician', 'negotiator', 'actor'],
  Fixer: ['negotiator', 'con artist', 'politician', 'mechanic', 'diplomat'],
  Ganger: ['street fighter', 'brawler', 'wheelman', 'gunfighter', 'survivor'],
  'Gonzo Journalist': ['investigator', 'researcher', 'detective', 'explorer'],
  Gunslinger: ['gunslinger', 'gunfighter', 'marksman', 'duelist'],
  Hacker: ['hacker', 'engineer', 'inventor', 'researcher', 'mechanic'],
  'Mad Bomber': ['engineer', 'inventor', 'mechanic', 'saboteur'],
  Mage: ['mage', 'illusionist', 'mystic', 'scholar', 'mentalist'],
  Mercenary: ['soldier', 'combat', 'marksman', 'gladiator', 'survivor'],
  Monk: ['monk', 'martial artist', 'acrobat', 'mystic', 'discipline'],
  Ninja: ['ninja', 'assassin', 'infiltrator', 'shadow dancer', 'acrobat', 'scout'],
  Performer: ['performer', 'actor', 'acrobat', 'diplomat'],
  'Private Eye/Investigator': ['investigator', 'detective', 'researcher', 'mentalist'],
  Screamer: ['driver', 'pilot', 'wheelman', 'racer', 'mechanic'],
  Shaman: ['mystic', 'healer', 'oracle', 'druid'],
  Smuggler: ['pilot', 'driver', 'wheelman', 'infiltrator', 'negotiator'],
  Sniper: ['sniper', 'marksman', 'hunter', 'scout'],
  Spy: ['spy', 'infiltrator', 'assassin', 'actor', 'master of disguise'],
  'Street Doc': ['medic', 'healer', 'field surgeon', 'researcher'],
  'Street Samurai': ['duelist', 'martial artist', 'soldier', 'guardian', 'combat'],
  Warlock: ['mystic', 'mage', 'illusionist', 'mentalist'],
}
const speciesDescriptorMatches = (name, species) => (speciesDescriptorTerms[species] || []).some(term => name.toLowerCase().includes(term))
const archetypeDescriptorMatches = (name, archetypeName) => (archetypeDescriptorTerms[archetypeName] || []).some(term => name.toLowerCase().includes(term))
const descriptorMatchesCharacter = (name, descriptorType, archetypeName, species) => descriptorType === 'species'
  ? speciesDescriptorMatches(name, species)
  : descriptorType !== 'archetype' || archetypeDescriptorMatches(name, archetypeName)
const descriptorTypesFor = (archetypeName, species) => {
  const style = weaponStyleByArchetype[archetypeName] || 'modern'
  return [...(descriptorTypesByStyle[style] || descriptorTypesByStyle.modern), ...(species ? ['species'] : [])]
}
const suppliedWeaponStandardByType = {
  'Unarmed / Tiny Melee': suppliedDescriptorOptions.UNM.improvised,
  'Light Melee': ['Combat Knife', 'Short Sword', 'Shock Glove', 'Bio-talon', 'Vibro-Dagger', 'Ceramic Kukri', 'Hookblade'],
  'Medium Melee': ['Broad Sword', 'War Hammer', 'Poleaxe', 'Rune Blade', 'Mace', 'Longword', 'Katana', 'Baseball Bat', 'Crowbar', 'Lead Pipe', 'Frying Pan', 'Wrench', 'Chair Leg', 'Chain', 'Staff'],
  'Heavy Melee': ['Greatsword', '2-Handed Sword', 'Rock / Brick', 'Folding Chair', 'Steel Cable Coil', 'Iron Rod'],
  'Holdout Ranged': ['Throwing Knife', 'Sling', 'Hand Crossbow', 'Blowgun', 'Dart Gun', 'Light Pistol'],
  'Compact Ranged': ['Shortbow', 'Recurve Bow', 'Heavy Pistol', 'Revolver', 'Submachine Gun', 'Tranquilizer Gun'],
  'Longarm Ranged': ['Longbow', 'Crossbow', 'Shotgun', 'Assault Rifle', 'Hunting Rifle', 'Energy Carbine', 'Laz Gun/Rifle'],
  'Heavy Ranged': ['Sniper Rifle'],
}
const suppliedWeaponNames = (archetypeName, type, species) => {
  const family = type === 'Unarmed / Tiny Melee' ? suppliedDescriptorOptions.UNM : type.includes('Melee') ? suppliedDescriptorOptions.MELEE : suppliedDescriptorOptions.RNG
  const typeNames = descriptorTypesFor(archetypeName, species).flatMap(descriptorType => {
    const names = family.types[descriptorType] || []
    return names.filter(name => descriptorMatchesCharacter(name, descriptorType, archetypeName, species))
  })
  return [...typeNames, ...(suppliedWeaponStandardByType[type] || [])]
}
const weaponStyleByArchetype = {
  Barbarian: 'fantasy', 'Bounty Hunter': 'modern', Scientist: 'science', Cleric: 'mystic', Commando: 'modern', Criminal: 'street', Druid: 'mystic', 'Eco Terrorist': 'modern', 'Ex-Company Man': 'cyber', 'Ex-Cop': 'modern', 'Ex-Military': 'modern', Face: 'elegant', Fixer: 'cyber', Ganger: 'street', 'Gonzo Journalist': 'modern', Gunslinger: 'western', Hacker: 'cyber', 'Mad Bomber': 'cyber', Mage: 'mystic', Mercenary: 'modern', Monk: 'martial', Ninja: 'martial', Performer: 'mystic', 'Private Eye/Investigator': 'street', Screamer: 'cyber', Shaman: 'mystic', Smuggler: 'cyber', Sniper: 'modern', Spy: 'elegant', 'Street Doc': 'cyber', 'Street Samurai': 'martial', Warlock: 'mystic',
}
const multiverseWeaponMakers = ['Abyssal Crown', 'Aetherline', 'Amber Circuit', 'Andromeda Forge', 'Ash Meridian', 'Astral Loom', 'Black Comet', 'Brass Horizon', 'Broken Halo', 'Cinder Vault', 'Clockwork Sun', 'Crimson Orbit', 'Dawn Engine', 'Deepwell', 'Dragon Gate', 'Dreaming Anvil', 'Eclipse Foundry', 'Ember Choir', 'Farstar', 'Fifth Moon', 'Glass Citadel', 'Gravestone Works', 'Green Nova', 'Hollow Crown', 'Iron Nebula', 'Ivory Signal', 'Jade Tempest', 'Last Parallax', 'Lightning Archive', 'Lost Atlas', 'Midnight Assembly', 'Mirror Forge', 'Ninefold', 'Obsidian Choir', 'Orichalcum Works', 'Pale Meteor', 'Phoenix Circuit', 'Quantum Pilgrim', 'Redshift', 'Riftwalker', 'Silver Labyrinth', 'Skygrave', 'Solar Reliquary', 'Starless Sea', 'Stormglass', 'Thorn Engine', 'Titan Wake', 'Umbral Foundry', 'Void Lantern', 'Worldroot']
const nameOffset = name => [...name].reduce((total, character) => total + character.charCodeAt(0), 0)
const selectionsForName = (name, values, count) => Array.from({ length: count }, (_, index) => values[(nameOffset(name) + index * 11) % values.length])
const expandWeaponNames = names => {
  const makerUses = new Map()
  return names.flatMap(name => {
    const variants = selectionsForName(name, multiverseWeaponMakers, 4).map(selectedMaker => {
      const start = multiverseWeaponMakers.indexOf(selectedMaker)
      const maker = Array.from({ length: multiverseWeaponMakers.length }, (_, offset) => multiverseWeaponMakers[(start + offset) % multiverseWeaponMakers.length])
        .find(candidate => (makerUses.get(candidate) || 0) < 3) || selectedMaker
      makerUses.set(maker, (makerUses.get(maker) || 0) + 1)
      return `${maker} ${name}`
    })
    return [name, ...variants]
  })
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
    'Unarmed / Tiny Melee': ['Ghost-Touch Handwraps', 'Runed Prayer Beads', 'Astral Claws', 'Elemental Knuckle Seal', 'Shocking Grasp', 'Chill Touch', 'Flame Palm', 'Thunderclap', 'Vampiric Grasp'],
    'Light Melee': ['Moon-Silver Athame', 'Saint’s Reliquary Dagger', 'Thorned Ritual Sickle', 'Crystal Wand-Blade', 'Frost Knife', 'Witchlight Edge', 'Spectral Fang', 'Ember Dagger', 'Moon-Shard Blade'],
    'Medium Melee': ['Starwood Focus Staff', 'Sun-Disc Warhammer', 'Spirit-Bound Scimitar', 'Runesong Spear', 'Lightning Blade', 'Icebrand', 'Solar Saber', 'Gravewind Sword', 'Storm-Forged Scimitar'],
    'Heavy Melee': ['Doom-Bell Maul', 'Archmage’s Greatstaff', 'Demon-Iron Greatblade', 'Worldroot Poleaxe', 'Meteor Maul', 'Thunderhead Greatblade', 'Avalanche Axe', 'Infernal Cleaver', 'Worldbreaker Staff'],
    'Holdout Ranged': ['Witchfire Dart', 'Bottled Lightning', 'Spectral Thorn', 'Saint’s Judgment Bolt', 'Zap', 'Spark Dart', 'Frostbite', 'Ghost Needle', 'Ember Snap'],
    'Compact Ranged': ['Moonbeam Shortbow', 'Hexbolt Repeater', 'Elemental Wand Array', 'Spirit-Horn Blaster', 'Firebolt', 'Acid Arrow', 'Shadow Lance', 'Thunder Orb', 'Spirit Shot'],
    'Longarm Ranged': ['Sunray Longstaff', 'Cometstring Longbow', 'Stormcaller Rod', 'Dragon-Breath Scepter', 'Ice Beam', 'Chain Lightning', 'Solar Ray', 'Winter Spear', 'Dragonfire Bolt'],
    'Heavy Ranged': ['Meteor Invocation', 'Void-Cannon Focus', 'Celestial Ballista', 'Leviathan-Bone Thunderstaff', 'Meteor Swarm', 'Disintegration Ray', 'Heaven’s Thunder', 'Cataclysm Wave', 'Starfall Barrage'],
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
    'Holdout Ranged': ['Borderland Double Derringer', 'Sheriff’s Short-Barrel Revolver', 'Schofield-Pattern Sidearm', 'Pepperbox Pistol'],
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
  Barbarian: [
    ['Notched Seax', 'Wolf-Tooth Skinner', 'Rimefang Dirk', 'Boar-Tusk Scramasax', 'Ashwood Hunting Knife'],
    ['Stonehead War Club', 'Mammoth-Rib Maul', 'Thunder-Oak Cudgel', 'Skullsplitter Mace', 'Bear-Claw Hammer'],
    ['Worldsplitter Greataxe', 'Frost-Giant Cleaver', 'Avalanche Maul', 'Red Winter Greatsword', 'Clanbreaker Axe'],
    ['Iron Throwing Axe', 'Raven-Feather Franciska', 'Stormstone Hurling Hammer', 'Wolf-Moon Tomahawk', 'Bone-Handled Throwing Knife'],
  ],
  'Bounty Hunter': [
    ['Capture Knife', 'Warrant-Edge Cutter', 'Tracker’s Skinning Blade', 'Bail-Jumper Shiv', 'Live-Capture Talon'],
    ['Arc-Cuff Shock Baton', 'Restraint-Rig Truncheon', 'Skiptrace Stun Rod', 'Marshal’s Capture Club', 'Fugitive Hook'],
    ['Sleeve Dartcaster', 'Warrant-Tag Needler', 'Bounty Seal Holdout', 'Sleeper-Dart Palmgun', 'Last-Chance Stunner'],
    ['Tracker Carbine', 'Skiptrace Repeater', 'Long-Warrant Rifle', 'Quarry Mark Carbine', 'Dead-or-Alive Longarm'],
  ],
  Scientist: [
    ['Laser Scalpel', 'Molecular Sample Knife', 'Cryo-Edge Dissector', 'Photon Microcutter', 'Monofilament Lab Blade'],
    ['Telescoping Logic Staff', 'Graviton Calibration Rod', 'Proof-by-Induction Baton', 'Field-Theory Resonator', 'Collapsible Research Staff'],
    ['Palm-Sized Beam Emitter', 'Pocket Particle Projector', 'Hypothesis Tester', 'Microcoil Demonstrator', 'Portable Ray Apparatus'],
  ],
  Cleric: [
    ['Consecrated Dirk', 'Mercy Blade', 'Pilgrim’s Reliquary Knife', 'Saintbone Lancet', 'Votive Flame Dagger'],
    ['Reliquary Warhammer', 'Bell of Final Rites', 'Sanctuary Mace', 'Martyr’s Crozier', 'Dawn-Chapel Hammer'],
    ['Bolt of Judgment', 'Saint’s Rebuke', 'Halo Shard', 'Vesper Lance', 'Litany of Fire'],
  ],
  Commando: [
    ['Black-Ops Combat Knife', 'Night-Insertion Blade', 'SERE Field Knife', 'Silent Entry Cutter', 'Squad-Breacher Tanto'],
    ['Tactical Tomahawk', 'Close-Quarters Breach Axe', 'Boarding Baton', 'Entrenching Hammer', 'Shock-Entry Machete'],
    ['Suppressed Service Pistol', 'Low-Signature Sidearm', 'Mission Clock Holdout', 'Wet-Work Pistol', 'Ghost-Team Handgun'],
    ['Modular Assault Rifle', 'Squad Automatic Carbine', 'Overwatch Battle Rifle', 'Mission-Adaptive Longarm', 'Breach-Team Rifle'],
  ],
  Criminal: [
    ['Spring-Loaded Switchblade', 'Evidence-Bag Razor', 'Back-Alley Stiletto', 'Lockup Shiv', 'Getaway Knife'],
    ['Weighted Tire Thumper', 'Debt-Collector’s Baton', 'Safehouse Crowbar', 'Bookmaker’s Sap', 'Alleyway Slugger'],
    ['Filed-Off Snub Revolver', 'Burner Pistol', 'Untraceable Pocket Gun', 'Drop-Piece Derringer', 'Getaway Holdout'],
  ],
  Druid: [
    ['Moon-Crescent Sickle', 'Mistletoe Pruning Blade', 'Briarhook Knife', 'Antler-Handled Seax', 'Green Moon Sickle'],
    ['Living Oak Staff', 'Rootspeaker Cudgel', 'Storm-Bent Shepherd’s Crook', 'Ironbark Quarterstaff', 'Standing-Stone Maul'],
    ['Thornspitter Seedpod', 'Wasp-Nest Sling', 'Bramble Dart', 'Sunseed Burst', 'Sporecap Stinger'],
  ],
  'Eco Terrorist': [
    ['Fieldcraft Knife', 'Pipeline Cutter', 'Rewilding Machete', 'Saboteur’s Pruning Blade', 'Clearcut Scalpel'],
    ['Brush-Clearing Machete', 'Bolt-Cutter War Club', 'Barricade Sledge', 'Tree-Spike Hammer', 'Refinery Wrench'],
    ['Recurve Hunting Bow', 'Dronehunter Crossbow', 'Ranger’s Takedown Bow', 'Silent Protest Launcher', 'Canopy Shortbow'],
  ],
  'Ex-Company Man': [
    ['Monofilament Letter Opener', 'Severance-Package Blade', 'Boardroom Ceramic Knife', 'Golden-Parachute Stiletto', 'Hostile-Takeover Cutter'],
    ['Executive Shock Cane', 'Compliance Baton', 'Corner-Office Walking Stick', 'Acquisition Hammer', 'Performance-Review Rod'],
    ['Biometric Holdout Pistol', 'Executive Protection Sidearm', 'Expense-Account Derringer', 'Shareholder’s Veto', 'Golden-Handcuff Pistol'],
  ],
  'Ex-Cop': [
    ['Patrol Utility Knife', 'Evidence-Room Cutter', 'Old Precinct Blade', 'Backup Rescue Knife', 'Badge-Notched Folder'],
    ['Expandable Riot Baton', 'Retired Patrol Truncheon', 'Crowd-Control Tonfa', 'Interrogation-Room Sap', 'Blue-Line Nightstick'],
    ['Department-Issue Sidearm', 'Off-Duty Backup Pistol', 'Evidence-Locker Revolver', 'Plainclothes Holdout', 'Retirement-Plaque Pistol'],
    ['Less-Lethal Riot Shotgun', 'Old Precinct Carbine', 'Barricade Response Gun', 'Patrol-Rack Shotgun', 'Fugitive Taskforce Rifle'],
  ],
  'Ex-Military': [
    ['Trench Knife', 'Demobilized Bayonet', 'Unit-Issue Fighting Blade', 'Campaign Utility Knife', 'Veteran’s Boot Dagger'],
    ['Entrenching Tool', 'Breaching Hatchet', 'Field-Sapper Hammer', 'Mess-Hall Cleaver', 'Decommissioned Shock Baton'],
    ['Veteran’s Service Pistol', 'War-Trophy Sidearm', 'Unit-Armorer’s Handgun', 'Last-Magazine Pistol', 'Campaign Holdout'],
    ['Battle-Worn Pulse Rifle', 'Demilled Service Carbine', 'Old-Regiment Battle Rifle', 'Campaign-Surplus Longarm', 'Unit-Marked Assault Gun'],
  ],
  Face: [
    ['Jeweled Stiletto', 'Corsage Needle', 'Diplomat’s Letter Opener', 'Gala-Night Dirk', 'Perfume-Vial Blade'],
    ['Silver-Headed Sword Cane', 'Salon Duelling Saber', 'Ambassador’s War Fan', 'Velvet-Rope Cane', 'Courtier’s Foil'],
    ['Pearl-Grip Pocket Pistol', 'Opera-Box Derringer', 'Champagne-Cork Stunner', 'Cufflink Dartcaster', 'Invitation-Only Holdout'],
  ],
  Fixer: [
    ['Ledger Knife', 'Favor-Cutting Razor', 'Broker’s Sample Blade', 'Contract Shiv', 'Introduction Fee'],
    ['Chrome Pipe Wrench', 'Negotiator’s Persuader', 'Supply-Chain Crowbar', 'Collection-Day Baton', 'Market-Maker Club'],
    ['Unregistered Compact Pistol', 'Escrow Holdout', 'Brokered Sidearm', 'No-Questions Handgun', 'Finder’s Fee'],
  ],
  Ganger: [
    ['Neon-Edged Kukri', 'Block-Color Switchblade', 'Tagger’s Razor', 'Corner-Crew Karambit', 'Turf-Line Shiv'],
    ['Chain-Wrapped Slugger', 'Street-Sign Cleaver', 'Corner-Store Bat', 'Graffiti-Crew Crowbar', 'Block Captain’s Club'],
    ['Homemade Zip Gun', 'Shoebox Derringer', 'Corner Holdout', 'Tape-Grip Pistol', 'One-Shot Special'],
    ['Spraypainted Machine Pistol', 'Block-War SMG', 'Stolen Patrol Carbine', 'Crew-Color Scattergun', 'Drive-By Compact'],
  ],
  'Gonzo Journalist': [
    ['Boot-Hidden Penknife', 'Pressroom Letter Opener', 'Darkroom Utility Blade', 'Ceramic Editorial Knife', 'Reporter’s Multitool Blade'],
    ['Armored Camera Monopod', 'Broadcast Microphone Boom', 'Steel Camera Tripod', 'Lead-Lined Equipment Case', 'Satellite-Uplink Mast'],
    ['Press-Pass Derringer', 'Pocket Pepper Spray', 'Civilian Taser', 'Flashbulb Stunner', 'Sonic Recorder Burst'],
  ],
  Gunslinger: [
    ['Buffalo-Horn Bowie Knife', 'Coyote-Fang Skinner', 'Riverboat Dirk', 'Boot-Hill Toothpick', 'Silver-Mine Bowie'],
    ['Weathered Cavalry Saber', 'Railroad Camp Hatchet', 'Marshal’s Sabre', 'Comanche Moon War Club', 'Dust-Trail Machete'],
    ['Last-Chance Derringer', 'Sleeve-Hidden Pepperbox', 'Gambler’s Palmgun', 'Undertaker’s Backup', 'Ace-in-the-Hole'],
    ['Silver-Comet Revolver', 'High-Noon Sixgun', 'Widowmaker Peacemaker', 'Red Mesa Hand Cannon', 'Graveyard Shift Revolver'],
    ['Mesa Wind Lever Rifle', 'Long-Ride Winchester', 'Buffalo Trail Rifle', 'Canyon Echo Repeater', 'Sunset Territory Longarm'],
  ],
  Hacker: [
    ['Ceramic Data Knife', 'Rootkit Shiv', 'Air-Gap Cutter', 'Kernel-Panic Blade', 'Backdoor Scalpel'],
    ['Overclocked Shock Baton', 'Firewall Breaker', 'Packet-Loss Truncheon', 'Admin-Access Rod', 'Crashloop Club'],
    ['Ghost-Key Smart Pistol', 'Zero-Day Holdout', 'Black-Ice Needler', 'Proxychain Pistol', 'Kill-Switch Sidearm'],
  ],
  'Mad Bomber': [
    ['Demolition Knife', 'Fuse-Cutting Razor', 'Blasting-Cap Crimper', 'Wirestripper Shiv', 'Det-Cord Blade'],
    ['Blast-Shield Crowbar', 'Bunker-Buster Sledge', 'Ordnance Wrench', 'Cratermaker Hammer', 'Misfire Baton'],
    ['Jury-Rigged Grenade Launcher', 'Mailbox Mortar', 'Laughing Fuse Projector', 'Remote Surprise', 'Shrapnel Choir'],
  ],
  Mage: [
    ['Runed Athame', 'Comet-Iron Ritual Knife', 'Mnemonic Wandblade', 'Seven-Sigil Dagger', 'Leyline Lancet'],
    ['Astrolabe Staff', 'Paradox Rod', 'Nine-Sphere Scepter', 'World-Axis Quarterstaff', 'Grimoire-Bound Cane'],
    ['Prismatic Force Dart', 'Thesis of Flame', 'Sigilbolt', 'Arcane Rebuttal', 'Falling-Star Hex'],
  ],
  Mercenary: [
    ['Contractor Combat Knife', 'Invoice-Notched Blade', 'Hazard-Pay Kukri', 'Campaign Utility Cutter', 'Retainer’s Fighting Knife'],
    ['Carbon-Steel Machete', 'Breach-Clause Hatchet', 'Contract War Club', 'Overtime Sledge', 'Hostile-Worksite Baton'],
    ['Reliable Heavy Pistol', 'Escrow Sidearm', 'Contract-Killer Handgun', 'Hazard-Bonus Revolver', 'Final-Payment Pistol'],
    ['Short-Barrel Battle Carbine', 'Campaign Contractor Rifle', 'Clause-Seventeen Shotgun', 'Retainer Battle Gun', 'Paid-in-Full Longarm'],
  ],
  Monk: [
    ['Iron Palm Technique', 'Stone-Bell Fist', 'Empty-Hand Thunder', 'Five-Animal Strike', 'Quiet Mountain Hand'],
    ['Seven-Ring Temple Staff', 'Pilgrim’s Ironwood Pole', 'Echoing Monastery Cane', 'Hundred-Step Quarterstaff', 'Abbot’s Moon Staff'],
  ],
  Ninja: [
    ['Shadowglass Kunai', 'Moonless Tanto', 'Silent-Reed Karambit', 'Roof-Tile Blade', 'Ink-Black Shuriken Knife'],
    ['Night-Reed Katana', 'Rain-Cut Ninjatō', 'Hidden-Clan Kusarigama', 'Crane-Shadow Staff', 'No-Moon Wakizashi'],
    ['Whispering Shuriken', 'Sleeve-Star Volley', 'Poisoned Hairpin', 'Smoke-Egg Dart', 'Cicada Needle'],
    ['Lacquered Shortbow', 'Rooftop Repeating Crossbow', 'Silent Matchlock', 'Black-Bamboo Bow', 'Windless Dartcaster'],
  ],
  Performer: [
    ['Tuning-Fork Dagger', 'Backstage Prop Knife', 'Encore Stiletto', 'Conductor’s Razor', 'Finale Blade'],
    ['Ironwood Battle Lute', 'Orchestra-Pit Maul', 'Stage-Crook Staff', 'Grand Piano Leg', 'Applause Baton'],
    ['Shattering High Note', 'Thunderous Encore', 'Cutting Refrain', 'Glassbreaking Aria', 'Final-Chord Burst'],
  ],
  'Private Eye/Investigator': [
    ['Casebook Switchblade', 'Evidence-Tag Knife', 'Raincoat Razor', 'Cold-Case Dirk', 'Desk-Drawer Blade'],
    ['Lead-Cored Walking Cane', 'Stakeout Sap', 'Stakeout Tire Iron', 'Case-Closing Crowbar', 'Third-Floor Nightstick'],
    ['Rainy-Night Revolver', 'Desk-Drawer Automatic', 'Cold-Case Holdout', 'Unmarked Sidearm', 'Last-Clue Pistol'],
  ],
  Screamer: [
    ['Pit-Crew Utility Blade', 'Crash-Cage Cutter', 'Redline Knife', 'Trackside Rescue Blade', 'Fuel-Line Razor'],
    ['Torque-Bar Club', 'Piston-Rod Baton', 'Pit-Lane Wrench', 'Axle-Shaft Maul', 'Roll-Cage Breaker'],
    ['Dashboard-Locked Autopistol', 'Glovebox Handgun', 'Starting-Grid Holdout', 'Checkered-Flag Pistol', 'Road-Rage Sidearm'],
  ],
  Shaman: [
    ['Ancestor-Bone Knife', 'Dreamwalker Sickle', 'Spirit-Name Blade', 'Totem-Carving Dirk', 'Ghostroad Athame'],
    ['Totem-Crowned Spirit Staff', 'Thunderbird Crook', 'Ancestor-Voice Drumstick', 'Worldtree Branch', 'Medicine-Wheel Hammer'],
    ['Vengeful Spirit Dart', 'Ancestor’s Warning', 'Ghost-Eagle Feather', 'Dreaming Serpent Bolt', 'Totem-Flame Spark'],
  ],
  Smuggler: [
    ['Vacuum-Sealed Vibroknife', 'Customs-Slit Blade', 'Cargo-Tape Cutter', 'Hidden-Compartment Shiv', 'Manifest Razor'],
    ['Cargo-Bay Collapsible Baton', 'Dockworker’s Persuader', 'False-Bottom Crowbar', 'Airlock Wrench', 'Freight-Hook Club'],
    ['Customs-Runner Holdout', 'Checkpoint Derringer', 'Manifest-Case Pistol', 'Sleeper-Cabin Sidearm', 'Contraband Needler'],
    ['Cut-Down Boarding Blaster', 'Cargo-Deck Scattergun', 'Blockade-Runner Carbine', 'Hidden-Crate SMG', 'Freeport Boarding Gun'],
  ],
  Sniper: [
    ['Fairbairn-Sykes Fighting Knife', 'Hide-Site Utility Blade', 'Wind-Reading Skinner', 'Observation-Post Dirk', 'Long-Wait Knife'],
    ['Estwing Camp Axe', 'Blind-Cutting Hatchet', 'Tripod Hammer', 'Range-Stake Tomahawk', 'Spotter’s Machete'],
    ['Kestrel .45 Pistol', 'Hideout Backup Gun', 'Spotter’s Sidearm', 'Close-Range Insurance', 'Last-Position Holdout'],
    ['Barrett M82 Anti-Materiel Rifle', 'Horizon-Piercer Rifle', 'One-Mile Verdict', 'Ghost-Wind Cannon', 'Counter-Sniper Longshot'],
  ],
  Spy: [
    ['Sleeve-Hidden Garrote', 'Watchband Monowire', 'Buttonhole Blade', 'Dead-Drop Razor', 'Opera-Glove Strangler'],
    ['Diplomat’s Concealed Rapier', 'Embassy Sword Cane', 'False-Passport Saber', 'Attaché-Case Baton', 'Ballroom Foil'],
    ['Cufflink Flechette Pistol', 'Lipstick Needler', 'Passport-Stamp Derringer', 'Dead-Drop Holdout', 'Embassy Escape Pistol'],
  ],
  'Street Doc': [
    ['Trauma Scalpel', 'Bone-Saw Fighting Blade', 'Suture Cutter', 'Back-Alley Lancet', 'Triage Knife'],
    ['Defibrillator Shock Baton', 'Trauma-Bay Crutch', 'Oxygen-Tank Club', 'Surgical Mallet', 'Ambulance Pry Bar'],
    ['Mercy-Dart Tranquilizer', 'Anesthetic Needler', 'Triage Pistol', 'No-Questions Sedative Gun', 'Emergency-Room Holdout'],
  ],
  'Street Samurai': [
    ['White-Handle Tanto', 'Neon-Clan Wakizashi', 'Honor-Debt Blade', 'Chrome Petal Knife', 'Ronin’s Last Tanto'],
    [
      'Crimson Circuit Katana', 'Clanless Moon Katana', 'Neon Shogun Katana', 'Ghostwire Katana',
      'Chrome Chrysanthemum Katana', 'Midnight Ronin Katana', 'Red Dragon Katana', 'Stormcode Katana',
      'Black Lotus Katana', 'Razor-Sun Katana', 'Static Oni Katana', 'Jade Serpent Katana',
      'Blood-Rain Katana', 'Void Blossom Katana', 'Last Honor Katana', 'Silver Kitsune Katana',
      'Burning Shrine Katana', 'Night-Circuit Katana', 'Grave Neon Katana', 'Thousand-Cut Katana',
    ],
    ['Clan-Locked Smart Pistol', 'Ronin’s Backup Sidearm', 'Honor-Code Holdout', 'Shrine-Gate Needler', 'Chrome Chrysanthemum Pistol'],
    ['Ronin Compact SMG', 'Dojo-War Machine Pistol', 'Clan Banner Carbine', 'Shogunate Street Sweeper', 'Neon Daimyo SMG'],
  ],
  Warlock: [
    ['Pact-Signed Sacrificial Dagger', 'Debt-Collector’s Athame', 'Patron-Tooth Knife', 'Oathblood Dirk', 'Fine-Print Blade'],
    ['Void-Iron Hexblade', 'Infernal Clause Greatsword', 'Patron’s Black Cane', 'Debtchain Flail', 'Covenant Breaker'],
    ['Eldritch Starbolt', 'Patron’s Displeasure', 'Hell-Signed Dart', 'Void Contract Missile', 'Usurer’s Flame'],
  ],
}
const minimumWeaponNamesPerType = 20
const weaponNamePool = (archetypeName, type, extraNames = [], species = '') => {
  const style = weaponStyleByArchetype[archetypeName] || 'modern'
  const baseNames = weaponStylePools[style]?.[type] || weaponStylePools.modern[type] || []
  const names = [...new Set([...expandWeaponNames([...extraNames, ...baseNames]), ...suppliedWeaponNames(archetypeName, type, species)])]
  if (import.meta.env.DEV && names.length < minimumWeaponNamesPerType) console.warn(`${archetypeName} should have at least ${minimumWeaponNamesPerType} names for ${type}`)
  return names
}
const generatedWeaponNamesForType = (archetypeName, type, species = '') => {
  const loadout = weaponLoadouts[archetypeName] || []
  const extras = loadout.flatMap(([defaultName, loadoutType], slotIndex) => loadoutType === type ? (archetypeWeaponVariants[archetypeName]?.[slotIndex] || [defaultName]) : [])
  return weaponNamePool(archetypeName, type, extras, species)
}
const weaponNameIsUnedited = (weapon, archetypeName, species = '') => {
  if (weapon.nameCustomized) return false
  if (!weapon.name?.trim()) return true
  if (weapon.generatedName) return weapon.name === weapon.generatedName
  return weapon.source === 'archetype' && generatedWeaponNamesForType(archetypeName, weapon.type, species).includes(weapon.name)
}
const characterDataVersion = archetypeName => archetypeName === 'Street Samurai' ? 2 : 1
const weaponNotesByType = {
  'Unarmed / Tiny Melee': 'Automatically concealed.',
  'Light Melee': 'Automatically concealed.',
  'Medium Melee': 'TN 15 Observation to conceal.',
  'Heavy Melee': 'Cannot be concealed; −2 Defense while using it.',
  'Holdout Ranged': 'Range: Short (30 feet). Automatically concealed.',
  'Compact Ranged': 'Range: 60 feet. TN 15 Observation to conceal.',
  'Longarm Ranged': 'Range: 120 feet. TN 12 Observation to conceal.',
  'Heavy Ranged': 'Range: Line of sight. Cannot be concealed; must be fired from a braced position.',
}
const legacyGeneratedWeaponNotes = {
  'Holdout Ranged': 'Automatically concealed.',
  'Compact Ranged': 'TN 15 Observation to conceal.',
  'Longarm Ranged': 'TN 12 Observation to conceal.',
  'Heavy Ranged': 'Cannot be concealed; must be fired from a braced position.',
}
const weaponNotesAreUnedited = weapon => {
  if (weapon.notesCustomized) return false
  if (!weapon.notes?.trim()) return true
  if (weapon.generatedNotes != null) return weapon.notes === weapon.generatedNotes
  return weapon.notes === weaponNotesByType[weapon.type] || weapon.notes === legacyGeneratedWeaponNotes[weapon.type]
}
const weaponLoadoutMarker = (archetypeName, species = '') => `${characterDataVersion(archetypeName)}:${archetypeName}:${species}`
const populateArchetypeWeapons = (existingWeapons, archetypeName, species = '') => {
  const weapons = existingWeapons.filter(weapon => weapon.source !== 'archetype').map(weapon => ({ ...weapon }))
  const usedNames = new Set()
  ;(weaponLoadouts[archetypeName] || []).forEach(([defaultName, type], slotIndex) => {
    const specificPool = archetypeWeaponVariants[archetypeName]?.[slotIndex]
    const katanaOnly = archetypeName === 'Street Samurai' && type === 'Medium Melee'
    const specificNames = specificPool?.length ? (katanaOnly ? specificPool : expandWeaponNames(specificPool)) : []
    const pool = (katanaOnly ? specificNames : [...specificNames, ...weaponNamePool(archetypeName, type, [defaultName], species)]).filter(name => !usedNames.has(name))
    const name = pool[Math.floor(Math.random() * pool.length)] || defaultName
    usedNames.add(name)
    const generatedNotes = weaponNotesByType[type] || 'Archetype starting weapon.'
    const weapon = { id: crypto.randomUUID(), name, generatedName: name, nameCustomized: false, type, enhancement: 0, notes: generatedNotes, generatedNotes, notesCustomized: false, source: 'archetype' }
    const emptyIndex = weapons.findIndex(entry => !entry.name?.trim() && !entry.notes?.trim() && !number(entry.enhancement))
    if (emptyIndex >= 0) weapons[emptyIndex] = { ...weapon, id: weapons[emptyIndex].id || weapon.id }
    else weapons.push(weapon)
  })
  return weapons
}
const archetypeItemLoadouts = {
  Barbarian: [['Bearskin War Cloak', '(+3) Strength — The heavy trophy cloak reflects a life built around raw power.'], ['Iron-Shod Trail Boots', '(+2) Endurance — Made for punishing marches through hostile country.'], ['Ancestor-Totem Necklace', '(+1) Intuition — Carved tokens reinforce instinct and inherited warnings.']],
  'Bounty Hunter': [['Targeting Monocle', '(+3) Observation — Highlights tells, tracks, and wanted faces.'], ['Reinforced Pursuit Coat', '(+2) Endurance — Built to survive long hunts and violent arrests.'], ['Restraint and Warrant Kit', '(+1) Influence — Makes authority look convincing even far from home.']],
  Scientist: [['Thesis-Archive Mnemonic Crown', '(+3) Education — Its dense personal annotations preserve years of advanced study.'], ['Predictive Lens Array', '(+2) Intuition — Models likely outcomes from incomplete evidence.'], ['Pocket Omnilibrary', '(+1) Knowledge — A carefully curated reference collection reflects relentless research habits.']],
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
  Scientist: [['Thought-Speed Stylus', '(+2) Technology — Captures calculations as quickly as they occur.'], ['Academic Citation Familiar', '(+1) Influence — Supplies credentials and authoritative references during debate.']],
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
const suppliedScoreDescriptorTargets = [
  ['ST', 'strength', 'Strength'], ['DX', 'dexterity', 'Dexterity'], ['EN', 'endurance', 'Endurance'],
  ['INU', 'intuition', 'Intuition'], ['EDU', 'education', 'Education'], ['CHA', 'charisma', 'Charisma'],
  ['ATK', 'attack', 'Attack'], ['INF', 'influence', 'Influence'], ['KNW', 'knowledge', 'Knowledge'],
  ['OBS', 'observation', 'Observation'], ['OUT', 'outdoors', 'Outdoors'], ['SNK', 'sneak', 'Sneak'],
  ['TECH', 'technology', 'Technology'], ['VEH', 'vehicle', 'Vehicle'], ['ARM', 'defense', 'Defense'],
]
const descriptorMethodDescriptions = {
  hardwired: 'Installed machinery converts intent into consistent, precisely controlled performance.',
  wetwired: 'Engineered organic changes make the enhanced response feel instinctive rather than externally assisted.',
  magic: 'A sustained supernatural effect reinforces the capability whenever practiced effort reaches its limit.',
  species: 'A species-linked tradition or physical inheritance provides a distinctive foundation for the talent.',
  archetype: 'Specialized experience turns repeated training into reliable performance under pressure.',
  chemical: 'A controlled enhancement regimen temporarily pushes the body or mind beyond its ordinary response.',
  standard: 'Purpose-built protection and practical construction make the benefit dependable without exotic enhancement.',
}
const descriptorScorePurposes = {
  strength: 'It supports lifting, forceful movement, and powerful close combat.',
  dexterity: 'It sharpens balance, coordination, reaction time, and fine control.',
  endurance: 'It sustains effort and protects the body through pain, fatigue, and hostile conditions.',
  intuition: 'It accelerates pattern recognition and helps danger register before conscious analysis catches up.',
  education: 'It preserves learned information and makes specialized training easier to retrieve and apply.',
  charisma: 'It strengthens presence, emotional projection, and the confidence needed to command attention.',
  attack: 'It makes offensive timing and weapon placement more accurate when a fight becomes chaotic.',
  influence: 'It improves social reading and helps words land with the intended pressure or reassurance.',
  knowledge: 'It organizes research and recall so obscure facts become useful at the moment they matter.',
  observation: 'It reveals small changes, concealed threats, and evidence that ordinary attention overlooks.',
  outdoors: 'It improves navigation, environmental adaptation, tracking, and survival away from settled ground.',
  sneak: 'It suppresses the signs of movement and helps the user exploit cover, timing, and distraction.',
  technology: 'It supports rapid diagnosis, interface control, repair, and manipulation of unfamiliar systems.',
  vehicle: 'It synchronizes perception and control during difficult maneuvers, unstable terrain, and high speed.',
  defense: 'It absorbs, redirects, or avoids incoming force before a solid hit can cause serious harm.',
}
const descriptorVariationDetails = [
  'The effect remains subtle until the character is tested.',
  'Careful calibration keeps the assistance from overwhelming practiced judgment.',
  'Its limitations are understood well enough to be useful rather than reckless.',
  'Repeated use has made the response part of the character’s normal rhythm.',
  'The benefit is most visible when circumstances become unpredictable.',
  'Maintenance and discipline keep the advantage reliable between missions.',
  'The design favors controlled responses over dramatic but wasteful output.',
  'Long familiarity lets the character compensate for its few remaining weaknesses.',
  'A deliberately narrow focus prevents the benefit from becoming a dangerous crutch.',
  'The response strengthens gradually as stress rises instead of activating all at once.',
  'Its feedback is clear enough to guide action without demanding attention.',
  'Field repairs have made it less elegant but more dependable than the original design.',
  'The character has practiced with it until activation requires almost no conscious thought.',
  'Redundant safeguards preserve the benefit when one component or technique fails.',
  'It performs best during sustained effort rather than a single uncontrolled burst.',
  'Personal adjustments make the response difficult for anybody else to reproduce.',
  'Its construction prioritizes survival and repeatable results over comfort.',
  'The advantage comes from consistency rather than replacing the character’s own decisions.',
  'A conservative operating limit leaves enough reserve for emergencies.',
  'Experience has taught exactly when to trust the assistance and when to ignore it.',
  'The mechanism remains useful across different environments without constant adjustment.',
]
const suppliedItemCandidates = (archetypeName, species = '') => suppliedScoreDescriptorTargets.flatMap(([code, score, label]) => {
  const category = suppliedDescriptorOptions[code]
  if (!category) return []
  const typed = descriptorTypesFor(archetypeName, species).flatMap(descriptorType => {
    const names = category.types[descriptorType] || []
    const allowedNames = names.filter(name => descriptorMatchesCharacter(name, descriptorType, archetypeName, species))
    return allowedNames.map((name, index) => [
      name,
      `(+3) ${label} — ${descriptorMethodDescriptions[descriptorType]} ${descriptorScorePurposes[score]} ${descriptorVariationDetails[index % descriptorVariationDetails.length]}`,
    ])
  })
  const standardArmor = code === 'ARM' ? category.standard.map((name, index) => [
    name,
    `(+3) ${label} — ${descriptorMethodDescriptions.standard} ${descriptorScorePurposes[score]} ${descriptorVariationDetails[index % descriptorVariationDetails.length]}`,
  ]) : []
  return [...typed, ...standardArmor]
})
const itemDataVersion = 3
const itemLoadoutMarker = archetypeName => `${itemDataVersion}:${archetypeName}`
const multiverseItemModels = ['Aetherwake', 'Amberlight', 'Ashfall', 'Astral Key', 'Blackglass', 'Brightcoil', 'Cinderheart', 'Clockstar', 'Crimson Echo', 'Dawnchime', 'Deepwell', 'Dreamwire', 'Eclipse', 'Emberline', 'Evernight', 'Farstar', 'Ghostkey', 'Glasswing', 'Gravemark', 'Greenfire', 'Hollow Sun', 'Iron Halo', 'Ivory Pulse', 'Jade Signal', 'Kingshade', 'Lightning Thread', 'Lost Compass', 'Midnight Bell', 'Mirrorwake', 'Moonspoke', 'Ninefold', 'Obsidian Hymn', 'Orichalcum', 'Pale Comet', 'Phoenix', 'Quantum Rose', 'Redshift', 'Riftglass', 'Silver Thorn', 'Skyfire', 'Solaris', 'Starfall', 'Stormkey', 'Sunspoke', 'Thornlight', 'Titan Song', 'Umbral', 'Voidlight', 'Wayfinder', 'Worldroot']
const itemVariationDetails = [
  'Its calibration shifts subtly with the wearer’s habits.',
  'A responsive lining adjusts after each successful use.',
  'Embedded guides correct small mistakes before they compound.',
  'Its feedback remains quiet enough to avoid distraction.',
  'The mechanism favors practiced choices over automatic control.',
  'Fine adjustments occur only when the situation demands them.',
  'A stored baseline helps it recognize meaningful deviations.',
  'Its assistance tapers smoothly as the wearer finds their rhythm.',
  'The design remains effective across unfamiliar environments.',
]
const uniqueItemDescription = (baseDescription, variationIndex) => {
  const match = baseDescription.match(/^(\([^)]+\)\s+([A-Za-z]+))\s+[^A-Za-z0-9]+\s+/)
  const prefix = match?.[1] || ''
  const explanation = (match ? baseDescription.slice(match[0].length) : baseDescription).trim().replace(/[.\s]+$/, '')
  const detail = itemVariationDetails[variationIndex % itemVariationDetails.length]
  return `${prefix ? `${prefix} — ` : ''}${explanation}. ${detail}`
}
const expandItemCandidates = candidates => {
  const modelUses = new Map()
  return candidates.flatMap(candidate => {
    const variants = selectionsForName(candidate[0], multiverseItemModels, 9).map((selectedModel, variationIndex) => {
      const start = multiverseItemModels.indexOf(selectedModel)
      const model = Array.from({ length: multiverseItemModels.length }, (_, offset) => multiverseItemModels[(start + offset) % multiverseItemModels.length])
        .find(candidateModel => (modelUses.get(candidateModel) || 0) < 3) || selectedModel
      modelUses.set(model, (modelUses.get(model) || 0) + 1)
      return [`${model} ${candidate[0]}`, uniqueItemDescription(candidate[1], variationIndex)]
    })
    return [candidate, ...variants]
  })
}
const itemScoreDetails = description => {
  const match = description.match(/^\(\+(\d+)\)\s+([A-Za-z]+)/)
  return { bonus: number(match?.[1]), score: match?.[2]?.toLowerCase() || '' }
}
const itemScoreCoverage = ([, description]) => itemScoreDetails(description).score
const fitItemToScores = (candidate, scoreValues) => {
  const { bonus, score } = itemScoreDetails(candidate[1])
  const scoreValue = number(scoreValues[score])
  if (!score || scoreValue <= 0) return null
  const fittedBonus = Math.min(Math.max(1, bonus), scoreValue)
  return [candidate[0], candidate[1].replace(/^\(\+\d+\)/, `(+${fittedBonus})`)]
}
const itemScoresForCharacter = character => ({
  ...Object.fromEntries(stats.map(([key]) => [key, number(character.stats?.[key])])),
  ...Object.fromEntries(skillDefs.map(([key]) => [key, number(character.skills?.[key]?.ability)])),
  attack: number(character.attackSkill),
  defense: number(character.defenseRating),
})
const populateArchetypeItems = (existingItems, archetypeName, scoreValues, species = '') => {
  const traits = existingItems.filter(item => ['archetype', 'archetype-trait', 'species-trait'].includes(item.source)).map(item => ({ ...item, source: item.source === 'species-trait' ? item.source : 'archetype-trait' }))
  const items = existingItems.filter(item => !['archetype', 'archetype-trait', 'species-trait', 'archetype-item'].includes(item.source)).map(item => ({ ...item }))
  const candidates = [...expandItemCandidates([...(archetypeItemLoadouts[archetypeName] || []), ...(archetypeItemVariations[archetypeName] || [])]), ...suppliedItemCandidates(archetypeName, species)]
    .map(candidate => fitItemToScores(candidate, scoreValues))
    .filter(Boolean)
  const selectedItems = []
  const coveredScores = new Set()
  const selectedNames = new Set()
  shuffled(candidates).forEach(candidate => {
    const coverage = itemScoreCoverage(candidate)
    if (selectedItems.length >= 3 || selectedNames.has(candidate[0]) || (coverage && coveredScores.has(coverage))) return
    selectedItems.push(candidate)
    selectedNames.add(candidate[0])
    if (coverage) coveredScores.add(coverage)
  })
  selectedItems.forEach(([name, description]) => {
    const item = { id: crypto.randomUUID(), name, description, source: 'archetype-item' }
    const emptyIndex = items.findIndex(entry => !entry.name?.trim() && !String(entry.description || '').trim() && !String(entry.bonus || '').trim() && !entry.appliesTo?.trim())
    if (emptyIndex >= 0) items[emptyIndex] = { ...item, id: items[emptyIndex].id || item.id }
    else items.push(item)
  })
  return [...items, ...traits]
}
const number = value => Number(value) || 0
const abbreviateTalentDuration = value => String(value || '').replace(/\bminutes?\b/gi, 'min')
const talentCatalog = (() => {
  const lines = talentsText.split(/\r?\n/).map(line => line.trim())
  const headings = []
  lines.forEach((line, index) => {
    const buff = line.match(/^Buff Option:\s*(.+)$/i)
    if (buff) { headings.push({ name: buff[1].replace(/:$/, ''), index }); return }
    const next = lines.slice(index + 1).find(Boolean) || ''
    if (line && /^Description:/i.test(next) && !line.includes(': ') && !/^Buffs:?$/i.test(line)) headings.push({ name: line.replace(/:$/, ''), index })
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
    const duration = abbreviateTalentDuration(parsedDuration || (buffOptionNames.has(heading.name) ? buffDuration : ''))
    const details = block.filter(line => /^(Action|Cost|Energy Cost):/i.test(line))
    const joined = block.join(' ')
    const minimum = joined.match(/Minimum Force\s*(?:is\s*)?(\d)/i)?.[1]
    const maximum = joined.match(/Maximum Force\s*(?:is\s*)?(\d)/i)?.[1]
    const forceLimit = minimum && maximum ? `Force ${minimum}–${maximum}` : minimum ? `Minimum Force ${minimum}` : maximum ? `Maximum Force ${maximum}` : 'Standard Energy'
    return { name: heading.name, ability: [forceLimit, ...details].join(' • '), duration, notes: [description, mechanic, durationNote].filter(Boolean).join(' — ') }
  }).filter((talent, index, all) => all.findIndex(item => item.name === talent.name) === index).sort((a, b) => a.name.localeCompare(b.name))
})()
const talentNames = talentCatalog.map(talent => talent.name)
const traitsFromBlock = block => {
  const personalityIndex = block.findIndex(entry => /^Personality Traits:/i.test(entry))
  return block.slice(personalityIndex < 0 ? block.length : personalityIndex)
    .map(entry => entry.replace(/^Personality Traits:\s*/i, ''))
    .map(entry => { const match = entry.match(/^(.+?)\s+-\s+(.+)$/); return match ? { name: match[1].trim(), description: match[2].trim() } : null })
    .filter(Boolean)
}
const speciesOptions = (() => {
  const lines = speciesText.split(/\r?\n/).map(line => line.trim())
  const headings = lines.map((line, index) => ({ line, index, next: lines.slice(index + 1).find(Boolean) || '' })).filter(({ line, next }) => line.includes(' - ') && /^Rep:/i.test(next))
  return headings.map(({ line, index }, headingIndex) => {
    const block = lines.slice(index, headings[headingIndex + 1]?.index ?? lines.length)
    return {
      name: line.split(' - ')[0].trim(),
      description: line.slice(line.indexOf(' - ') + 3).trim(),
      reputation: (block.find(entry => /^Rep:/i.test(entry)) || '').replace(/^Rep:\s*/i, ''),
      reality: (block.find(entry => /^The Real Deal:/i.test(entry)) || '').replace(/^The Real Deal:\s*/i, ''),
      traits: traitsFromBlock(block),
    }
  }).sort((a, b) => a.name.localeCompare(b.name))
})()
const speciesNames = speciesOptions.map(species => species.name)
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
  const theme = contactNameThemes[category] || contactNameThemes['Information contacts']
  const offset = [...type].reduce((total, character) => total + character.charCodeAt(0), 0) % 5
  const names = [...(specializedContactNames[type] || []), ...(example ? [example] : [])]
  if (theme.names) theme.names.forEach((_, index) => { const candidate = theme.names[(index + offset) % theme.names.length]; if (!names.includes(candidate)) names.push(candidate) })
  const givenNames = contactGivenNames[category] || contactGivenNames['Information contacts']
  const surnames = contactSurnames[category] || contactSurnames['Information contacts']
  givenNames.forEach((givenName, givenIndex) => surnames.forEach((_, surnameIndex) => {
    const candidate = `${givenName} ${surnames[(surnameIndex + givenIndex + offset) % surnames.length]}`
    if (names.length < 125 && !names.includes(candidate)) names.push(candidate)
  }))
  return [type, names.slice(0, 125)]
}))
const archetypeContactRoles = {
  Barbarian: ['Wilderness scout', 'Monster handler', 'Caravan master', 'Witch', 'Ferryman'],
  'Bounty Hunter': ['Informant', 'Fixer', 'Detective', 'Fence', 'Monster bounty clerk', 'Getaway driver'],
  Scientist: ['Librarian', 'Engineer', 'Artifact appraiser', 'Occult researcher', 'Portal technician'],
  Cleric: ['Temple priest', 'Exorcist', 'Resurrection specialist', 'Spirit medium', 'Cult defector'],
  Commando: ['Guild quartermaster', 'Spy handler', 'Demolitions expert', 'Mission handler', 'Pilot'],
  Criminal: ['Fence', 'Forger', 'Corrupt official', 'Crime boss', 'Safecracker', 'Street doctor'],
  Druid: ['Wilderness scout', 'Witch', 'Monster handler', 'Spirit medium', 'Expedition outfitter'],
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
const versatileContactRoles = ['Bartender', 'Fixer', 'Informant', 'Retired adventurer', 'Mission handler', 'Guild quartermaster', 'Street doctor', 'Journalist', 'Courier', 'Mechanic', 'Pilot', 'Diplomat', 'Fence', 'Wilderness scout', 'Artifact appraiser', 'Detective', 'Engineer', 'Smuggler', 'Librarian', 'Forger']
const contactRolesForArchetype = archetypeName => {
  const preferredRoles = archetypeContactRoles[archetypeName] || []
  const offset = [...archetypeName].reduce((total, character) => total + character.charCodeAt(0), 0) % versatileContactRoles.length
  const rotatedRoles = versatileContactRoles.map((_, index) => versatileContactRoles[(index + offset) % versatileContactRoles.length])
  const roles = [...new Set([...preferredRoles, ...rotatedRoles])].slice(0, 15)
  if (import.meta.env.DEV && roles.length < 15) console.warn(`${archetypeName} should have 15 contact roles`)
  return roles
}
const shuffled = values => values.map(value => ({ value, order: Math.random() })).sort((a, b) => a.order - b.order).map(entry => entry.value)
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
    const traits = traitsFromBlock(block)
    return {
      name: line.split(' - ')[0].trim(), description: line.slice(line.indexOf(' - ') + 3).trim(), strengths, weaknesses, preferredTalents, traits,
      stats: Object.fromEntries(stats.map(([key, label]) => [key, number(scoresLine.match(new RegExp(`${label}\\s+([+-]?\\d+)`, 'i'))?.[1])])),
    }
  }).sort((a, b) => a.name.localeCompare(b.name))
})()
const archetypeQuiz = {
  start: { question: 'Where do you want your Hero to make the greatest impact?', answers: [['In the heart of a fight', 'combat'], ['Through knowledge or special powers', 'expertise'], ['Through people, secrets, or connections', 'social']] },
  combat: { question: 'What kind of conflict sounds most exciting?', answers: [['Close-quarters action', 'close'], ['Firearms and distance', 'ranged'], ['Fighting for a cause', 'cause']] },
  close: { question: 'What drives your close-combat style?', answers: [['Raw force and survival', 'closeRaw'], ['Discipline, precision, and identity', 'closePrecision']] },
  closeRaw: { question: 'Where did that toughness come from?', answers: [['Ancient fury and the wild', { result: 'Barbarian' }], ['Hard lessons on the street', { result: 'Ganger' }]] },
  closePrecision: { question: 'How should your fighting style look to others?', answers: [['Calm, disciplined, and spiritual', { result: 'Monk' }], ['Hidden, silent, and surgical', { result: 'Ninja' }], ['Bold, chromed, and honor-bound', { result: 'Street Samurai' }]] },
  ranged: { question: 'What matters most when the shooting starts?', answers: [['The perfect shot or chosen target', 'precisionShot'], ['Training, teamwork, or professional force', 'organizedForce']] },
  precisionShot: { question: 'Why are you lining up the shot?', answers: [['To bring in a specific quarry', { result: 'Bounty Hunter' }], ['To win a dramatic showdown', { result: 'Gunslinger' }], ['To strike unseen from far away', { result: 'Sniper' }]] },
  organizedForce: { question: 'What shaped your combat training?', answers: [['Elite operations and mission discipline', { result: 'Commando' }], ['A former badge or uniform', 'formerService'], ['Paid contracts and practical survival', { result: 'Mercenary' }]] },
  formerService: { question: 'Which institution did you leave behind?', answers: [['Law enforcement', { result: 'Ex-Cop' }], ['The military', { result: 'Ex-Military' }]] },
  cause: { question: 'What cause gives your violence meaning?', answers: [['Faith, duty, or sacred purpose', { result: 'Cleric' }], ['Protecting nature from exploitation', { result: 'Eco Terrorist' }]] },
  expertise: { question: 'What kind of power or expertise calls to you?', answers: [['Magic, nature, or spirits', 'mysticPath'], ['Science, machines, or medicine', 'techPath'], ['Investigation, truth, or performance', 'storyPath']] },
  mysticPath: { question: 'Where does your supernatural power come from?', answers: [['The living natural world', { result: 'Druid' }], ['Spirits or dangerous entities', 'spiritPath'], ['Study and deliberate spellcraft', { result: 'Mage' }]] },
  spiritPath: { question: 'What is your relationship with the otherworldly?', answers: [['I guide and bargain with spirits', { result: 'Shaman' }], ['I accepted power with a price', { result: 'Warlock' }]] },
  techPath: { question: 'What do you want technology to help you do?', answers: [['Discover, invent, or experiment', 'researchPath'], ['Control complex systems', 'systemsPath'], ['Keep people alive under pressure', { result: 'Street Doc' }]] },
  researchPath: { question: 'What does a breakthrough look like to you?', answers: [['A new answer that changes understanding', { result: 'Scientist' }], ['A spectacular reaction with a short fuse', { result: 'Mad Bomber' }]] },
  systemsPath: { question: 'Which systems do you want at your fingertips?', answers: [['Networks, code, and digital security', { result: 'Hacker' }], ['Vehicles, engines, and remote machines', { result: 'Screamer' }]] },
  storyPath: { question: 'How do you uncover or shape the truth?', answers: [['Command attention and move an audience', { result: 'Performer' }], ['Chase the story into dangerous places', { result: 'Gonzo Journalist' }], ['Work the clues one quiet case at a time', { result: 'Private Eye/Investigator' }]] },
  social: { question: 'How do you prefer to influence the world?', answers: [['Charm people face to face', { result: 'Face' }], ['Operate through secrets and hidden identities', 'secretsPath'], ['Build power through underground networks', 'networkPath']] },
  secretsPath: { question: 'What kind of secrets do you carry?', answers: [['Carefully constructed covers and missions', { result: 'Spy' }], ['Corporate knowledge from a former life', { result: 'Ex-Company Man' }]] },
  networkPath: { question: 'What role do you play in the underground economy?', answers: [['I take what opportunity puts in reach', { result: 'Criminal' }], ['I connect the person who needs it to the person who has it', { result: 'Fixer' }], ['I move forbidden people and goods', { result: 'Smuggler' }]] },
}
const randomStartingTraits = (speciesName, archetype, usedNames = new Set()) => {
  const speciesExamples = speciesOptions.find(option => option.name === speciesName)?.traits || []
  const speciesCandidates = shuffled([...(speciesExamples || []), ...(speciesTraitPools[speciesName] || [])]).map(trait => ({ ...trait, source: 'species-trait' }))
  const archetypeCandidates = shuffled([...(archetype.traits || []), ...(archetypeTraitPools[archetype.name] || [])]).map(trait => ({ ...trait, source: 'archetype-trait' }))
  const selected = []
  const pick = candidates => candidates.find(trait => !usedNames.has(trait.name) && !selected.some(chosen => chosen.name === trait.name))
  const speciesTrait = pick(speciesCandidates)
  if (speciesTrait) selected.push(speciesTrait)
  const archetypeTrait = pick(archetypeCandidates)
  if (archetypeTrait) selected.push(archetypeTrait)
  const thirdTrait = pick(shuffled([...speciesCandidates, ...archetypeCandidates]))
  if (thirdTrait) selected.push(thirdTrait)
  return selected
}
const attackFocusForArchetype = archetype => {
  const strengths = (archetype?.strengths || []).join(' ').toLowerCase()
  const hasMeleeFocus = /\bmelee\b/.test(strengths)
  const hasRangedFocus = /\b(range|ranged)\b/.test(strengths)
  if (hasRangedFocus && !hasMeleeFocus) return 'ranged'
  if (hasMeleeFocus && !hasRangedFocus) return 'melee'
  return number(archetype?.stats?.dexterity) > number(archetype?.stats?.strength) ? 'ranged' : 'melee'
}
if (import.meta.env.DEV) {
  archetypeOptions.forEach(({ name }) => {
    weaponTypes.forEach(([type]) => weaponNamePool(name, type))
    contactRolesForArchetype(name).forEach(role => {
      if (!contactNamePools[role]) console.warn(`${name} has an unknown contact role: ${role}`)
    })
  })
  Object.entries(weaponLoadouts).forEach(([archetypeName, loadout]) => {
    const variants = archetypeWeaponVariants[archetypeName] || []
    if (variants.length !== loadout.length || variants.some(names => names.length < 5)) console.warn(`${archetypeName} should have five curated names for every weapon slot`)
  })
}
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
const xpForLevel = level => Math.max(0, Math.min(10, number(level))) * 10
const levelForXp = xp => Math.max(0, Math.min(10, Math.floor(number(xp) / 10)))
const normalizeXpTracking = character => {
  const legacyXp = number(character.xp)
  const legacyXpWasSet = character.xpManuallySet ?? legacyXp !== 0
  return {
    ...character,
    archetype: character.archetype === 'Brainiac' ? 'Scientist' : character.archetype,
    attackSkill: character.attackSkill ?? character.skills?.attack?.ability ?? '',
    totalXp: character.totalXp ?? legacyXp,
    unspentXp: character.unspentXp ?? legacyXp,
    totalXpManuallySet: character.totalXpManuallySet ?? legacyXpWasSet,
    unspentXpManuallySet: character.unspentXpManuallySet ?? legacyXpWasSet,
  }
}
const newCharacter = () => ({
  id: crypto.randomUUID(), name: 'New Hero', species: '', speciesSource: '', archetype: '', level: 0,
  totalXp: 0, unspentXp: 0, totalXpManuallySet: false, unspentXpManuallySet: false,
  stats: Object.fromEntries(stats.map(([key]) => [key, ''])),
  skills: Object.fromEntries(skillDefs.map(([key]) => [key, { ability: '', modifier: 0, buffs: 0, debuffs: 0 }])),
  attackSkill: '', meleeAttackModifier: 0, rangedAttackModifier: 0, defenseBonus: 0, defenseRating: 1, defenseCostVersion: 1,
  currentHp: 10, temporaryHp: 0, currentEnergy: 0,
  weapons: blankRows(2, { name: '', type: 'Unarmed / Tiny Melee', enhancement: 0, notes: '' }),
  talents: [],
  items: blankRows(2, { name: '', bonus: '', appliesTo: '' }),
  contacts: blankRows(3, { name: '', role: '' }), notes: '', updatedAt: Date.now(),
  talentRowsGrantedForLevel: 0, removedBlankTalentRows: 0,
  autoSave: true,
})
const signed = value => `${number(value) >= 0 ? '+' : ''}${number(value)}`
const skillEntryTotal = skill => Object.values(skill || {}).reduce((sum, value) => sum + number(value), 0)
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
      return active ? normalizeXpTracking(structuredClone(active)) : null
    } catch { return null }
  })
  const [roll, setRoll] = useState(null)
  const [pendingArchetype, setPendingArchetype] = useState('')
  const [showArchetypeQuiz, setShowArchetypeQuiz] = useState(false)
  const [pendingDelete, setPendingDelete] = useState(null)
  const [notice, setNotice] = useState('')
  const [showWelcome, setShowWelcome] = useState(false)
  const [levelUp, setLevelUp] = useState(null)
  const [deathwatch, setDeathwatch] = useState(null)
  const fileRef = useRef(null)
  const totalXpEditValue = useRef(null)
  const totalXpLastValue = useRef(null)
  const totalXpAppliedIncrease = useRef(0)
  const totalXpArrowChange = useRef(false)
  const lastCommandAttackRef = useRef(null)

  useEffect(() => {
    if (character) localStorage.setItem(ACTIVE_CHARACTER_KEY, character.id)
    else localStorage.removeItem(ACTIVE_CHARACTER_KEY)
  }, [character])

  useEffect(() => {
    const createCommandHero = event => {
      let requested = event?.detail
      if (!requested) {
        try { requested = JSON.parse(sessionStorage.getItem(NEW_CHARACTER_COMMAND_KEY)) } catch { requested = null }
      }
      if (!requested) return
      sessionStorage.removeItem(NEW_CHARACTER_COMMAND_KEY)
      const hero = newCharacter()
      const requestedName = String(requested.name || '').trim()
      const requestedSpecies = String(requested.species || '').trim()
      const requestedArchetype = String(requested.archetype || '').trim()
      if (requestedName) { hero.name = requestedName; hero.characterNameSource = 'user' }
      if (requestedSpecies) { hero.species = knownCommandOption(speciesNames, requestedSpecies); hero.speciesSource = 'user' }
      if (requestedArchetype) hero.archetype = knownCommandOption(archetypeOptions.map(option => option.name), requestedArchetype)
      setDeathwatch(null)
      setShowWelcome(false)
      setCharacter(hero)
    }
    window.addEventListener('mag-create-character', createCommandHero)
    createCommandHero()
    return () => window.removeEventListener('mag-create-character', createCommandHero)
  }, [])

  useEffect(() => {
    const openSavedCharacter = event => {
      const saved = characters.find(hero => hero.id === event.detail?.id)
      if (saved) setCharacter(normalizeXpTracking(structuredClone(saved)))
    }
    window.addEventListener('mag-open-character', openSavedCharacter)
    return () => window.removeEventListener('mag-open-character', openSavedCharacter)
  }, [characters])

  useEffect(() => {
    if (!character) return
    let changed = false
    let talents = character.talents.map(row => {
      const abbreviatedDuration = abbreviateTalentDuration(row.duration)
      if (abbreviatedDuration !== (row.duration || '')) { changed = true; return { ...row, duration: abbreviatedDuration } }
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
    const needsWeaponLoadout = Boolean(archetype && character.weaponLoadoutAppliedFor !== weaponLoadoutMarker(character.archetype, character.species))
    let weapons = needsWeaponLoadout ? populateArchetypeWeapons(character.weapons, character.archetype, character.species) : character.weapons
    if (needsWeaponLoadout) changed = true
    weapons = weapons.map(weapon => {
      if (weapon.source !== 'archetype' || weapon.notes !== legacyGeneratedWeaponNotes[weapon.type]) return weapon
      changed = true
      return { ...weapon, notes: weaponNotesByType[weapon.type] }
    })
    const needsItemLoadout = Boolean(archetype && character.itemLoadoutAppliedFor !== itemLoadoutMarker(character.archetype))
    if (needsItemLoadout) { items = populateArchetypeItems(items, character.archetype, itemScoresForCharacter(character), character.species); changed = true }
    let meleeAttackModifier = character.meleeAttackModifier
    let rangedAttackModifier = character.rangedAttackModifier
    if (meleeAttackModifier == null || rangedAttackModifier == null) {
      const focus = attackFocusForArchetype(archetype)
      const legacyModifier = Math.max(1, number(character.attackModifier))
      meleeAttackModifier = focus === 'melee' ? legacyModifier : 0
      rangedAttackModifier = focus === 'ranged' ? legacyModifier : 0
      changed = true
    }
    let defenseRating = character.defenseRating
    let defenseCostVersion = character.defenseCostVersion
    if (defenseCostVersion == null) {
      defenseRating = number(defenseRating) + 1
      defenseCostVersion = 1
      changed = true
    }
    if (changed) setCharacter(current => ({ ...current, talents, items, weapons, meleeAttackModifier, rangedAttackModifier, defenseRating, defenseCostVersion, talentRowsGrantedForLevel, removedBlankTalentRows, weaponLoadoutAppliedFor: needsWeaponLoadout ? weaponLoadoutMarker(character.archetype, character.species) : current.weaponLoadoutAppliedFor, itemLoadoutAppliedFor: needsItemLoadout ? itemLoadoutMarker(character.archetype) : current.itemLoadoutAppliedFor, updatedAt: Date.now() }))
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
      defense: 10 + number(character.defenseBonus) + number(character.defenseRating),
      resilience: number(character.defenseBonus) + number(s.strength) + number(s.dexterity) + number(s.endurance),
      ego: number(character.defenseBonus) + number(s.intuition) + number(s.education) + number(s.charisma),
    }
  }, [character])

  useEffect(() => {
    if (!character) return undefined
    const commandKey = value => String(value || '').toLowerCase().replace(/[^a-z0-9]/g, '')
    const commandDistance = (leftValue, rightValue) => {
      const left = commandKey(leftValue)
      const right = commandKey(rightValue)
      const row = Array.from({ length: right.length + 1 }, (_, index) => index)
      for (let leftIndex = 1; leftIndex <= left.length; leftIndex += 1) {
        let diagonal = row[0]
        row[0] = leftIndex
        for (let rightIndex = 1; rightIndex <= right.length; rightIndex += 1) {
          const above = row[rightIndex]
          row[rightIndex] = Math.min(row[rightIndex] + 1, row[rightIndex - 1] + 1, diagonal + (left[leftIndex - 1] === right[rightIndex - 1] ? 0 : 1))
          diagonal = above
        }
      }
      return row[right.length]
    }
    const commandPhonetic = value => String(value || '').toLowerCase().match(/[a-z]+/g)?.map(word => {
      const codes = { b: '1', f: '1', p: '1', v: '1', c: '2', g: '2', j: '2', k: '2', q: '2', s: '2', x: '2', z: '2', d: '3', t: '3', l: '4', m: '5', n: '5', r: '6' }
      let previous = codes[word[0]] || ''
      let tail = ''
      for (const letter of word.slice(1)) {
        const code = codes[letter] || ''
        if (code && code !== previous) tail += code
        previous = code
      }
      return `${tail}000`.slice(0, 3)
    }).join('-') || ''
    const knownCommandOption = (options, requestedValue) => {
      const spokenAliases = { sigh: 'SAI (Sentient AI)', sai: 'SAI (Sentient AI)', sentientai: 'SAI (Sentient AI)' }
      const aliased = spokenAliases[commandKey(requestedValue)]
      if (aliased && options.includes(aliased)) return aliased
      const exact = options.find(option => commandKey(option) === commandKey(requestedValue))
      if (exact) return exact
      const ranked = options.map(option => ({ option, distance: commandDistance(option, requestedValue) })).sort((left, right) => left.distance - right.distance)
      const closest = ranked[0]
      const requestedLength = commandKey(requestedValue).length
      const uniqueClosest = closest && ranked.filter(candidate => candidate.distance === closest.distance).length === 1
      if (uniqueClosest && closest.distance <= 2 && closest.distance / Math.max(requestedLength, commandKey(closest.option).length, 1) <= .25) return closest.option
      const requestedPhonetic = commandPhonetic(requestedValue)
      const phoneticMatches = ranked.filter(candidate => commandPhonetic(candidate.option) === requestedPhonetic
        && candidate.distance <= Math.max(2, Math.ceil(Math.max(requestedLength, commandKey(candidate.option).length) * .5)))
      return requestedPhonetic && phoneticMatches.length === 1 ? phoneticMatches[0].option : requestedValue
    }
    const findTalent = query => {
      const key = commandKey(query)
      return talentCatalog.find(talent => commandKey(talent.name) === key) || talentCatalog.filter(talent => commandKey(talent.name).includes(key) || key.includes(commandKey(talent.name))).find(() => true)
    }
    const commandWords = value => String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim().split(/\s+/).filter(Boolean)
    const orderedWordSubset = (candidate, query) => {
      const candidateWords = commandWords(candidate)
      const queryWords = commandWords(query)
      if (!queryWords.length) return false
      let candidateIndex = 0
      return queryWords.every(queryWord => {
        const matchIndex = candidateWords.findIndex((candidateWord, index) => index >= candidateIndex && (candidateWord.includes(queryWord) || queryWord.includes(candidateWord)))
        if (matchIndex < 0) return false
        candidateIndex = matchIndex + 1
        return true
      })
    }
    const approximateSubstringDistance = (candidateValue, queryValue) => {
      const candidate = commandKey(candidateValue)
      const query = commandKey(queryValue)
      if (query.length < 4 || !candidate) return Infinity
      let closest = commandDistance(candidate, query)
      const minimumLength = Math.max(2, query.length - 2)
      const maximumLength = Math.min(candidate.length, query.length + 2)
      for (let length = minimumLength; length <= maximumLength; length += 1) {
        for (let start = 0; start + length <= candidate.length; start += 1) {
          closest = Math.min(closest, commandDistance(candidate.slice(start, start + length), query))
          if (closest === 0) return 0
        }
      }
      return closest
    }
    const findWeapons = query => {
      const key = commandKey(query)
      if (!key) return []
      return character.weapons.map(weapon => {
        const name = commandKey(weapon.name)
        const type = commandKey(weapon.type)
        let score = Infinity
        if (name === key) score = 0
        else if (type === key) score = 1
        else if (name.includes(key)) score = 2 + ((name.length - key.length) / Math.max(name.length, 1))
        else if (orderedWordSubset(weapon.name, query)) score = 2.99
        else if (type.includes(key) || key.includes(type)) score = 3 + (Math.abs(type.length - key.length) / Math.max(type.length, key.length, 1))
        else if (orderedWordSubset(weapon.type, query)) score = 3.75
        else {
          const substringDistance = approximateSubstringDistance(weapon.name, query)
          if (substringDistance <= Math.max(1, Math.ceil(key.length * .25))) score = 3.8 + (substringDistance / Math.max(key.length, 1))
          else {
            const distance = commandDistance(weapon.name, query)
            const length = Math.max(name.length, key.length, 1)
            if (distance <= Math.max(2, Math.ceil(length * .25)) && distance / length <= .3) score = 4 + (distance / length)
          }
        }
        return { weapon, score }
      }).filter(match => Number.isFinite(match.score)).sort((left, right) => left.score - right.score)
    }
    const handleCommand = event => {
      const request = event.detail || {}
      const reply = message => request.reply?.(message)
      if (request.intent === 'read-vital') {
        const vital = commandKey(request.vital)
        const values = { health: `${character.currentHp} of ${computed.maxHp} HP`, hp: `${character.currentHp} of ${computed.maxHp} HP`, hitpoints: `${character.currentHp} of ${computed.maxHp} HP`, status: `${character.currentHp} of ${computed.maxHp} HP`, ego: `${signed(computed.ego)} Ego`, defense: `${computed.defense} Defense`, resilience: `${signed(computed.resilience)} Resilience`, energy: `${character.currentEnergy} of ${computed.maxEnergy} Energy`, maxenergy: `${computed.maxEnergy} Maximum Energy`, maxforce: `Maximum Force ${computed.maxForce}`, attackskill: `${signed(character.attackSkill)} Attack Skill`, meleeattackmodifier: `${signed(character.meleeAttackModifier)} Melee Attack modifier`, rangedattackmodifier: `${signed(character.rangedAttackModifier)} Ranged Attack modifier`, level: `Level ${computed.level}`, xp: `${character.unspentXp} Unspent XP and ${character.totalXp} Total XP`, totalxp: `${character.totalXp} Total XP`, unspentxp: `${character.unspentXp} Unspent XP` }
        reply(values[vital] ? `${character.name} has ${values[vital]}.` : `I do not know the character value ${request.vital}.`)
        return
      }
      if (request.intent === 'read-score') {
        const requestedKey = commandKey(request.score)
        const stat = stats.find(([key, label, short]) => [key, label, short].some(value => commandKey(value) === requestedKey))
        if (stat) { reply(`${character.name} has ${signed(character.stats[stat[0]])} ${stat[1]}.`); return }
        const skill = skillDefs.find(([key, label]) => [key, label].some(value => commandKey(value) === requestedKey))
        if (skill) {
          const statScore = number(character.stats[skill[2]])
          const ability = skillEntryTotal(character.skills[skill[0]])
          reply(`${character.name} has ${signed(statScore + ability)} ${skill[1]} total: ${signed(statScore)} from ${stats.find(([key]) => key === skill[2])?.[1] || skill[2]} and ${signed(ability)} from Skill adjustments.`)
          return
        }
        reply(`I could not find a Stat or Skill named ${request.score}.`)
        return
      }
      if (request.intent === 'preview-energy' || request.intent === 'change-energy') {
        const currentValue = number(character.currentEnergy)
        const amount = Math.max(0, number(request.amount))
        const calculated = request.operation === 'set' ? amount : currentValue + (request.operation === 'subtract' ? -amount : amount)
        const nextValue = Math.max(0, Math.min(computed.maxEnergy, calculated))
        if (request.intent === 'preview-energy') { reply(`Change Energy from ${currentValue} to ${nextValue}? Maximum Energy is ${computed.maxEnergy}.`); return }
        setCharacter(current => ({ ...current, currentEnergy: nextValue, updatedAt: Date.now() }))
        reply(`Energy changed from ${currentValue} to ${nextValue}. Maximum Energy is ${computed.maxEnergy}.`)
        return
      }
      if (request.intent === 'read-identity') {
        const name = character.name?.trim() || 'Unnamed Hero'
        const species = character.species?.trim() || 'no Species selected'
        const archetype = character.archetype?.trim() || 'no Archetype selected'
        const values = { name: `${character.name ? `Your Hero's name is ${name}` : 'Your Hero has no name selected'}.`, species: character.species ? `${name}'s Species is ${species}.` : `${name} has no Species selected.`, archetype: character.archetype ? `${name}'s Archetype is ${archetype}.` : `${name} has no Archetype selected.`, all: `${name}. Species: ${species}. Archetype: ${archetype}.` }
        reply(values[request.field] || values.all)
        return
      }
      if (request.intent === 'read-options') {
        if (request.list === 'skills') reply(`The Skills are Attack, ${skillDefs.map(([, label]) => label).join(', ')}. Attack has its own section and applies to both melee and ranged attacks.`)
        else if (request.list === 'stats') reply(`The Stats are ${stats.map(([, label]) => label).join(', ')}.`)
        else reply(`I could not find the available options for ${request.list}.`)
        return
      }
      if (request.intent === 'read-attack-total') {
        const melee = request.mode === 'melee'
        const statLabel = melee ? 'Strength' : 'Dexterity'
        const stat = number(melee ? character.stats.strength : character.stats.dexterity)
        const modifier = number(melee ? character.meleeAttackModifier : character.rangedAttackModifier)
        const total = stat + number(character.attackSkill) + modifier
        reply(`${melee ? 'Melee' : 'Ranged'} total to hit is ${signed(total)}: ${signed(stat)} ${statLabel}, ${signed(character.attackSkill)} Attack Skill, and ${signed(modifier)} ${melee ? 'Melee' : 'Ranged'} Attack modifier.`)
        return
      }
      if (request.intent === 'read-weapon') {
        const matches = findWeapons(String(request.weapon || '').replace(/\s+weapon$/i, ''))
        if (!matches.length) { reply(`I could not find a carried weapon matching ${request.weapon}.`); return }
        const bestRank = Math.floor(matches[0].score)
        const bestMatches = matches.filter(match => Math.floor(match.score) === bestRank)
        if (bestMatches.length > 1) { reply(`${request.weapon} matches more than one carried weapon: ${bestMatches.map(match => match.weapon.name || match.weapon.type).join(', ')}. Say more of the weapon's name.`); return }
        const weapon = matches[0].weapon
        const type = weaponTypes.find(item => item[0] === weapon.type) || weaponTypes[0]
        const statLabel = type[1] === 'melee' ? 'Strength' : 'Dexterity'
        const stat = number(type[1] === 'melee' ? character.stats.strength : character.stats.dexterity)
        const enhancement = number(weapon.enhancement)
        const damageModifier = stat + enhancement
        const damage = `d${type[2]} ${signed(damageModifier)}`
        if (request.damageOnly) { reply(`${weapon.name || type[0]} deals ${damage} damage: ${signed(stat)} ${statLabel} and ${signed(enhancement)} Enhancement.`); return }
        reply(`${weapon.name || 'Unnamed weapon'}. Type: ${type[0]}. Damage: ${damage}. Enhancement: ${signed(enhancement)}. Notes: ${weapon.notes?.trim() || 'None listed.'}`)
        return
      }
      if (request.intent === 'preview-add-weapon' || request.intent === 'add-weapon') {
        const requestedType = commandKey(request.type)
        const aliases = {
          unarmed: 'Unarmed / Tiny Melee', unarmedtiny: 'Unarmed / Tiny Melee', unarmedtinymelee: 'Unarmed / Tiny Melee', unarmedmelee: 'Unarmed / Tiny Melee', tiny: 'Unarmed / Tiny Melee', tinymelee: 'Unarmed / Tiny Melee',
          light: 'Light Melee', lightmelee: 'Light Melee', medium: 'Medium Melee', mediummelee: 'Medium Melee', heavymelee: 'Heavy Melee',
          holdout: 'Holdout Ranged', holdoutranged: 'Holdout Ranged', compact: 'Compact Ranged', compactranged: 'Compact Ranged', longarm: 'Longarm Ranged', longarmranged: 'Longarm Ranged', heavyranged: 'Heavy Ranged',
        }
        const type = aliases[requestedType] || weaponTypes.find(([label]) => commandKey(label) === requestedType)?.[0] || (!requestedType ? weaponTypes[Math.floor(Math.random() * weaponTypes.length)][0] : '')
        if (!type) { reply(`I could not identify the weapon type ${request.type}. Try light melee, medium melee, heavy melee, holdout, compact, longarm, or heavy ranged.`); return }
        const customName = String(request.name || '').trim().replace(/\b\w/g, letter => letter.toUpperCase())
        if (request.intent === 'preview-add-weapon') { reply(`Add ${customName ? `${customName}, a ${type} weapon` : `a generated ${type} weapon`}, to ${character.name}?`); return }
        const usedNames = new Set(character.weapons.map(weapon => weapon.name).filter(Boolean))
        let availableNames
        if (character.archetype === 'Street Samurai' && type === 'Medium Melee') {
          availableNames = weaponLoadouts['Street Samurai'].flatMap(([, loadoutType], index) => loadoutType === type ? (archetypeWeaponVariants['Street Samurai']?.[index] || []) : []).filter(name => !usedNames.has(name))
        } else availableNames = generatedWeaponNamesForType(character.archetype, type, character.species).filter(name => !usedNames.has(name))
        const generatedName = availableNames[Math.floor(Math.random() * availableNames.length)] || generatedWeaponNamesForType(character.archetype, type, character.species)[0] || type
        const name = customName || generatedName
        const generatedNotes = weaponNotesByType[type] || ''
        const weapon = { id: crypto.randomUUID(), name, generatedName: customName ? '' : name, nameCustomized: Boolean(customName), type, enhancement: 0, notes: generatedNotes, generatedNotes, notesCustomized: false, source: 'command' }
        setCharacter(current => ({ ...current, weapons: [...current.weapons, weapon], updatedAt: Date.now() }))
        reply(`${name}, a ${type} weapon, was added to ${character.name}. ${generatedNotes}`)
        return
      }
      if (request.intent === 'preview-identity' || request.intent === 'change-identity') {
        const field = ['name', 'species', 'archetype'].includes(request.field) ? request.field : ''
        if (!field || !String(request.value || '').trim()) { reply('Tell me whether to change the name, Species, or Archetype and what its new value should be.'); return }
        const requestedValue = String(request.value).trim()
        const options = field === 'species' ? speciesNames : field === 'archetype' ? archetypeOptions.map(option => option.name) : []
        const canonicalValue = knownCommandOption(options, requestedValue)
        const currentValue = String(character[field] || '').trim() || 'not selected'
        const label = field === 'name' ? 'name' : field === 'species' ? 'Species' : 'Archetype'
        if (request.intent === 'preview-identity') { reply(`Change ${label} from ${currentValue} to ${canonicalValue}?`); return }
        setCharacter(current => ({ ...current, [field]: canonicalValue, ...(field === 'name' ? { characterNameSource: 'user' } : {}), ...(field === 'species' ? { speciesSource: 'user' } : {}), updatedAt: Date.now() }))
        reply(`${label} changed from ${currentValue} to ${canonicalValue}.`)
        return
      }
      if (request.intent === 'read-list') {
        const list = commandKey(request.list)
        const named = entries => entries.map(entry => entry.name?.trim()).filter(Boolean)
        if (list === 'talents') {
          const names = named(character.talents)
          reply(names.length ? `${character.name}'s Talents are ${names.join(', ')}.` : `${character.name} has no Talents listed.`)
        } else if (list === 'contacts') {
          const contacts = character.contacts.filter(contact => contact.name?.trim() || contact.role?.trim()).map(contact => [contact.name, contact.role].filter(Boolean).join(', '))
          reply(contacts.length ? `${character.name}'s Contacts are ${contacts.join('; ')}.` : `${character.name} has no Contacts listed.`)
        } else if (list === 'weapons') {
          const weapons = character.weapons.filter(weapon => weapon.name?.trim()).map(weapon => `${weapon.name}, ${weapon.type}`)
          reply(weapons.length ? `${character.name}'s weapons are ${weapons.join('; ')}.` : `${character.name} has no weapons listed.`)
        } else if (list === 'itemsandtraits') {
          const entries = character.items.filter(item => item.name?.trim()).map(item => `${item.name}${String(item.source || '').includes('trait') ? ', Trait' : ', Item'}`)
          reply(entries.length ? `${character.name}'s Items and Traits are ${entries.join('; ')}.` : `${character.name} has no Items or Traits listed.`)
        } else if (list === 'traits') {
          const traits = named(character.items.filter(item => String(item.source || '').includes('trait')))
          reply(traits.length ? `${character.name}'s Traits are ${traits.join(', ')}.` : `${character.name} has no generated Traits identified. Check the Items and Traits section for custom entries.`)
        } else if (list === 'items') {
          const items = named(character.items.filter(item => !String(item.source || '').includes('trait')))
          reply(items.length ? `${character.name}'s Items are ${items.join(', ')}.` : `${character.name} has no Items listed.`)
        } else reply(`I could not read the list ${request.list}.`)
        return
      }
      if (request.intent === 'preview-progression' || request.intent === 'change-progression') {
        const operation = request.operation || 'set'
        const amount = Math.max(0, number(request.amount))
        const currentValue = request.key === 'level' ? number(character.level) : request.key === 'unspent-xp' ? number(character.unspentXp) : number(character.totalXp)
        let nextValue = operation === 'set' ? amount : currentValue + (operation === 'subtract' ? -amount : amount)
        nextValue = request.key === 'level' ? Math.max(0, Math.min(10, nextValue)) : Math.max(0, nextValue)
        const label = request.key === 'level' ? 'Level' : request.key === 'unspent-xp' ? 'Unspent XP' : 'Total XP'
        if (request.intent === 'preview-progression') {
          reply(`Change ${label} from ${currentValue} to ${nextValue}?`)
          return
        }
        if (request.key === 'level') {
          setCharacter(current => {
            const normalized = normalizeXpTracking(current)
            return { ...normalized, level: nextValue, totalXp: normalized.totalXpManuallySet ? normalized.totalXp : xpForLevel(nextValue), unspentXp: normalized.totalXpManuallySet || normalized.unspentXpManuallySet ? normalized.unspentXp : xpForLevel(nextValue), talentRowsGrantedForLevel: Math.max(number(normalized.talentRowsGrantedForLevel), talentAllowanceForLevel(nextValue)), updatedAt: Date.now() }
          })
        } else if (request.key === 'unspent-xp') {
          setCharacter(current => ({ ...current, unspentXp: nextValue, unspentXpManuallySet: true, updatedAt: Date.now() }))
        } else {
          const increase = Math.max(0, nextValue - currentValue)
          const nextLevel = Math.max(number(character.level), levelForXp(nextValue))
          setCharacter(current => ({ ...current, level: Math.max(number(current.level), levelForXp(nextValue)), totalXp: nextValue, unspentXp: increase ? number(current.unspentXp) + increase : current.unspentXp, totalXpManuallySet: true, updatedAt: Date.now() }))
        }
        reply(`${label} changed from ${currentValue} to ${nextValue}.`)
        return
      }
      if (request.intent === 'preview-score' || request.intent === 'change-score') {
        const requestedKey = commandKey(request.score)
        const operation = request.operation || 'set'
        const amount = number(request.amount)
        const stat = stats.find(([key, label, short]) => [key, label, short].some(value => commandKey(value) === requestedKey))
        const skill = skillDefs.find(([key, label]) => [key, label].some(value => commandKey(value) === requestedKey))
        let kind = request.kind
        if (!kind || kind === 'score') kind = stat ? 'stat' : skill ? 'skill' : request.score === 'attack' ? 'attack' : ''
        let label = request.score
        let currentValue
        let nextValue
        if (kind === 'defense') {
          label = 'Defense Rating'
          currentValue = number(character.defenseRating)
          nextValue = operation === 'set' ? amount : currentValue + (operation === 'subtract' ? -amount : amount)
          nextValue = Math.max(1, Math.min(7, nextValue))
        } else if (kind === 'melee-attack-modifier' || kind === 'ranged-attack-modifier') {
          label = kind === 'melee-attack-modifier' ? 'Melee Attack modifier' : 'Ranged Attack modifier'
          currentValue = number(kind === 'melee-attack-modifier' ? character.meleeAttackModifier : character.rangedAttackModifier)
          nextValue = operation === 'set' ? amount : currentValue + (operation === 'subtract' ? -amount : amount)
          nextValue = Math.max(-4, Math.min(4, nextValue))
        } else if (kind === 'stat' && stat) {
          label = stat[1]
          currentValue = number(character.stats[stat[0]])
          nextValue = operation === 'set' ? amount : currentValue + (operation === 'subtract' ? -amount : amount)
          nextValue = Math.max(-4, Math.min(4, nextValue))
        } else if (kind === 'skill' && skill) {
          label = skill[1]
          currentValue = number(character.skills[skill[0]].ability)
          nextValue = operation === 'set' ? amount : currentValue + (operation === 'subtract' ? -amount : amount)
          nextValue = Math.max(-4, Math.min(4, nextValue))
        } else if (kind === 'skill-component' && skill) {
          const component = ['ability', 'modifier', 'buffs', 'debuffs'].includes(request.component) ? request.component : 'ability'
          const componentLabel = component === 'buffs' ? 'Buff' : component === 'debuffs' ? 'Debuff' : component[0].toUpperCase() + component.slice(1)
          label = `${skill[1]} ${componentLabel}`
          currentValue = number(character.skills[skill[0]][component])
          if (component === 'debuffs') {
            const currentMagnitude = Math.abs(currentValue)
            const nextMagnitude = operation === 'set' ? Math.abs(amount) : currentMagnitude + (operation === 'subtract' ? -Math.abs(amount) : Math.abs(amount))
            nextValue = -Math.max(0, nextMagnitude)
          } else {
            nextValue = operation === 'set' ? amount : currentValue + (operation === 'subtract' ? -amount : amount)
            if (component === 'ability') nextValue = Math.max(-4, Math.min(4, nextValue))
          }
        } else if (kind === 'attack' || requestedKey === 'attack' || requestedKey === 'attackskill') {
          kind = 'attack'
          label = 'Attack Skill'
          currentValue = number(character.attackSkill)
          nextValue = operation === 'set' ? amount : currentValue + (operation === 'subtract' ? -amount : amount)
          nextValue = Math.max(-4, Math.min(4, nextValue))
        } else { reply(`I could not find a Stat or Skill named ${request.score}.`); return }
        if (request.intent === 'preview-score') {
          const cost = kind === 'defense' ? defenseUpgradeCosts[nextValue] : nextValue > 0 ? nextValue ** 2 : 0
          reply(`Change ${label} from ${signed(currentValue)} to ${signed(nextValue)}?${nextValue > currentValue && cost ? ` The listed XP cost for that rating is ${cost} XP; update Unspent XP if this is a purchase.` : ''}`)
          return
        }
        setCharacter(current => {
          const copy = structuredClone(current)
          if (kind === 'defense') copy.defenseRating = nextValue
          else if (kind === 'melee-attack-modifier') copy.meleeAttackModifier = nextValue
          else if (kind === 'ranged-attack-modifier') copy.rangedAttackModifier = nextValue
          else if (kind === 'stat') copy.stats[stat[0]] = nextValue
          else if (kind === 'skill') copy.skills[skill[0]].ability = nextValue
          else if (kind === 'skill-component') copy.skills[skill[0]][request.component] = nextValue
          else copy.attackSkill = nextValue
          copy.updatedAt = Date.now()
          return copy
        })
        reply(`${label} changed from ${signed(currentValue)} to ${signed(nextValue)}.`)
        return
      }
      if (request.intent === 'preview-health' || request.intent === 'change-health') {
        const requestedAmount = request.operation === 'set' ? number(request.amount) : Math.max(0, number(request.amount))
        const amount = requestedAmount * (request.operation === 'subtract' ? -1 : 1)
        const next = Math.max(-1, Math.min(computed.maxHp, request.operation === 'set' ? requestedAmount : number(character.currentHp) + amount))
        if (request.intent === 'preview-health') reply(`${request.operation === 'subtract' ? 'Apply' : 'Restore'} ${Math.abs(amount)} HP to ${character.name}? Current health ${character.currentHp}. New health ${next}.`)
        else {
          const startingDeathClock = number(character.currentHp) >= 0 && next === -1
          changeCurrentHp(next, { audioOnly: startingDeathClock })
          reply(startingDeathClock
            ? `${character.name} has dropped to negative 1 HP. Death Clock started at zero. At the end of the turn, say roll Endurance, or say first aid if a teammate helps.`
            : `${request.operation === 'set' ? `Health set to ${next}` : request.operation === 'subtract' ? `${Math.abs(amount)} damage applied` : `${Math.abs(amount)} health restored`}. ${character.name} has ${next} of ${computed.maxHp} HP remaining.`)
        }
        return
      }
      if (request.intent === 'death-clock-action') {
        if (!deathwatch || deathwatch.mode !== 'audio' || deathwatch.phase === 'resolved') { reply('There is no active audio Death Clock.'); return }
        const resolveAudioDeathClock = (clock, introduction, updates = {}) => {
          const deathRoll = rollDie(6)
          const outcome = deathRoll < clock ? 'dead' : 'stable'
          setDeathwatch(current => ({ ...current, ...updates, clock, phase: 'resolved', deathRoll, outcome }))
          if (outcome === 'stable') setCharacter(current => ({ ...current, currentHp: 0, updatedAt: Date.now() }))
          reply(`${introduction} Rolling the death die automatically. Result: ${deathRoll}. ${deathRoll} is ${outcome === 'dead' ? 'less than' : 'not less than'} the Death Clock of ${clock}. ${character.name} ${outcome === 'dead' ? 'dies' : 'stabilizes at zero HP'}.`)
        }
        if (request.action === 'first-aid') {
          if (deathwatch.phase !== 'endurance') { reply('The Death Clock has already stopped. Say roll death die.'); return }
          resolveAudioDeathClock(deathwatch.clock, `First aid stops the Death Clock at ${deathwatch.clock}.`, { stopReason: 'A teammate provided first aid.' })
          return
        }
        if (request.action === 'endurance') {
          if (deathwatch.phase !== 'endurance') { reply('The Death Clock has already stopped. Say roll death die.'); return }
          const natural = rollDie(20)
          const modifier = number(character.stats.endurance)
          const total = natural + modifier
          const success = natural === 20 || (natural !== 1 && total >= 11)
          const nextClock = success ? deathwatch.clock : deathwatch.clock + 1
          const checks = [...deathwatch.checks, { natural, modifier, total, success }]
          if (success) resolveAudioDeathClock(nextClock, `Endurance roll: ${natural} on the die, ${signed(modifier)} modifier, total ${total}. Success. The Death Clock stops at ${nextClock}.`, { stopReason: 'Endurance check succeeded.', checks })
          else {
            setDeathwatch(current => ({ ...current, clock: nextClock, phase: 'endurance', stopReason: '', checks }))
            reply(`Endurance roll: ${natural} on the die, ${signed(modifier)} modifier, total ${total}. Failure. The Death Clock increases to ${nextClock}. Say roll Endurance again, or say first aid.`)
          }
          return
        }
        if (request.action === 'death-roll') {
          if (deathwatch.phase !== 'death-roll') { reply('The Death Clock is still running. Say roll Endurance, or say first aid.'); return }
          const deathRoll = rollDie(6)
          const outcome = deathRoll < deathwatch.clock ? 'dead' : 'stable'
          setDeathwatch(current => ({ ...current, phase: 'resolved', deathRoll, outcome }))
          if (outcome === 'stable') setCharacter(current => ({ ...current, currentHp: 0, updatedAt: Date.now() }))
          reply(`Death die result: ${deathRoll}. ${deathRoll} is ${outcome === 'dead' ? 'less than' : 'not less than'} the Death Clock of ${deathwatch.clock}. ${character.name} ${outcome === 'dead' ? 'dies' : 'stabilizes at zero HP'}.`)
          return
        }
      }
      if (request.intent === 'explain-entry') {
        const key = commandKey(String(request.entry || '').replace(/\s+weapon$/i, ''))
        const candidates = [
          ...character.weapons.filter(weapon => weapon.name?.trim()).map(weapon => {
            const type = weaponTypes.find(item => item[0] === weapon.type) || weaponTypes[0]
            const stat = number(type[1] === 'melee' ? character.stats.strength : character.stats.dexterity)
            const damage = `d${type[2]} ${signed(stat + number(weapon.enhancement))}`
            return { kind: 'Weapon', name: weapon.name, aliases: [weapon.type], description: `Type: ${weapon.type}. Damage: ${damage}. Enhancement: ${signed(weapon.enhancement)}. Notes: ${weapon.notes?.trim() || 'None listed.'}` }
          }),
          ...character.items.filter(item => item.name?.trim()).map(item => ({ kind: String(item.source || '').includes('trait') ? 'Trait' : 'Item', name: item.name, description: item.description || 'No description is listed.' })),
          ...talentCatalog.map(talent => ({ kind: 'Talent', name: talent.name, description: `${talent.ability ? `${talent.ability}. ` : ''}${talent.notes || 'No additional description is available.'}${talent.duration ? ` Duration: ${talent.duration}.` : ''}` })),
          ...archetypeOptions.map(archetype => ({ kind: 'Archetype', name: archetype.name, description: `${archetype.description}${archetype.strengths.filter(Boolean).length ? ` Strengths: ${archetype.strengths.join(', ')}.` : ''}${archetype.weaknesses.filter(Boolean).length ? ` Weaknesses: ${archetype.weaknesses.join(', ')}.` : ''}` })),
          ...speciesOptions.map(species => ({ kind: 'Species', name: species.name, aliases: species.name.startsWith('SAI') ? ['SAI', 'Sigh', 'Sentient AI'] : [], description: [species.description, species.reputation && `Reputation: ${species.reputation}`, species.reality && `The real story: ${species.reality}`].filter(Boolean).join(' ') })),
        ]
        const entryKeys = entry => [entry.name, ...(entry.aliases || [])].map(commandKey)
        const exact = candidates.filter(entry => entryKeys(entry).includes(key))
        const partial = exact.length ? exact : candidates.filter(entry => entryKeys(entry).some(entryKey => entryKey.includes(key) || key.includes(entryKey)))
        let matches = partial
        if (!matches.length && key) {
          const ranked = candidates.map(entry => {
            const distances = entryKeys(entry).filter(Boolean).map(entryKey => commandDistance(entryKey, key))
            const distance = Math.min(...distances)
            const length = Math.max(key.length, ...entryKeys(entry).map(entryKey => entryKey.length), 1)
            return { entry, distance, ratio: distance / length }
          }).filter(match => match.distance <= Math.max(2, Math.ceil(key.length * .25)) && match.ratio <= .3)
            .sort((left, right) => left.ratio - right.ratio || left.distance - right.distance)
          if (ranked.length) {
            const best = ranked[0]
            matches = ranked.filter(match => match.distance === best.distance && Math.abs(match.ratio - best.ratio) < .03).map(match => match.entry)
          }
        }
        if (!matches.length) { reply(`I could not find a Weapon, Item, Trait, Talent, Archetype, or Species matching ${request.entry}.`); return }
        if (matches.length > 1) { reply(`${request.entry} matches ${matches.map(entry => `${entry.name}, ${entry.kind}`).join('; ')}. Say more of the name.`); return }
        const entry = matches[0]
        reply(`${entry.name}. ${entry.kind}. ${entry.description}`)
        return
      }
      if (request.intent === 'explain-talent' || request.intent === 'preview-add-talent' || request.intent === 'add-talent') {
        const talent = findTalent(request.talent)
        if (!talent) { reply(`I could not find a Talent named ${request.talent}.`); return }
        if (request.intent === 'explain-talent') { reply(`${talent.name}. ${talent.ability ? `${talent.ability}. ` : ''}${talent.notes || 'No additional description is available.'}${talent.duration ? ` Duration: ${talent.duration}.` : ''}`); return }
        if (character.talents.some(entry => commandKey(entry.name) === commandKey(talent.name))) { reply(`${character.name} already has ${talent.name}.`); return }
        if (request.intent === 'preview-add-talent') { reply(`Add ${talent.name} to ${character.name}'s Talents? Purchased Talents normally cost 5 XP.`); return }
        setCharacter(current => ({ ...current, talents: [...current.talents, { ...talent, id: crypto.randomUUID(), source: 'command' }], updatedAt: Date.now() }))
        reply(`${talent.name} added to ${character.name}. Remember to subtract 5 XP if this Talent was purchased.`)
        return
      }
      if (request.intent === 'roll-expression') {
        const expression = String(request.expression || '').toLowerCase()
        const terms = expression.match(/[+-]?(?:(?:\d*)d\d+|\d+)/g) || []
        let diceCount = 0
        let total = 0
        const details = []
        for (const rawTerm of terms) {
          const sign = rawTerm.startsWith('-') ? -1 : 1
          const term = rawTerm.replace(/^[+-]/, '')
          if (/d/i.test(term)) {
            const [countText, sidesText] = term.split('d')
            const count = countText ? Number(countText) : 1
            const sides = Number(sidesText)
            if (!Number.isInteger(count) || count < 1 || count > 100 || !Number.isInteger(sides) || sides < 2 || sides > 1000 || diceCount + count > 100) {
              reply('Dice expressions may use up to 100 dice, with die sizes from d2 through d1000.')
              return
            }
            const rolls = Array.from({ length: count }, () => rollDie(sides))
            const subtotal = rolls.reduce((sum, roll) => sum + roll, 0) * sign
            diceCount += count
            total += subtotal
            details.push(`${sign < 0 ? 'minus ' : ''}${count}d${sides} rolled ${rolls.join(', ')}`)
          } else {
            const modifier = Number(term) * sign
            total += modifier
            details.push(`${modifier >= 0 ? 'plus ' : 'minus '}${Math.abs(modifier)}`)
          }
        }
        if (!terms.length) { reply(`I could not understand the dice expression ${request.expression}.`); return }
        reply(`${expression} result: ${details.join('; ')}. Total ${total}.`)
        return
      }
      if (request.intent === 'roll-die') {
        const sides = Math.max(2, Math.min(100, number(request.sides)))
        const result = rollDie(sides)
        reply(`d${sides} result: ${result}.`)
        return
      }
      if (request.intent === 'roll-check') {
        const cleanedCheck = String(request.check || '').replace(/^(?:a|an|my|the)\s+/i, '').replace(/\s+(?:skill|stat)?\s*(?:check|test|roll)$/i, '').trim()
        const key = commandKey(cleanedCheck)
        const vitalModifiers = { ego: computed.ego, resilience: computed.resilience, initiative: computed.initiative }
        let label = cleanedCheck
        let modifier = vitalModifiers[key]
        if (modifier == null) {
          const skill = skillDefs.find(([skillKey, skillLabel]) => commandKey(skillKey) === key || commandKey(skillLabel) === key)
          if (skill) { label = skill[1]; modifier = number(character.stats[skill[2]]) + skillEntryTotal(character.skills[skill[0]]) }
        }
        if (modifier == null) {
          const stat = stats.find(([statKey, statLabel, short]) => [statKey, statLabel, short].some(value => commandKey(value) === key))
          if (stat) { label = stat[1]; modifier = number(character.stats[stat[0]]) }
        }
        if (modifier == null) { reply(`I could not find a roll named ${request.check}.`); return }
        const natural = rollDie(20)
        const total = natural + number(modifier)
        reply(`${label} roll: ${natural} on the die, ${signed(modifier)} modifier, total ${total}.`)
        return
      }
      if (request.intent === 'roll-weapon') {
        const matches = findWeapons(request.weapon)
        if (!matches.length) { reply(`I could not find a carried weapon matching ${request.weapon}.`); return }
        const bestRank = Math.floor(matches[0].score)
        const bestMatches = matches.filter(match => Math.floor(match.score) === bestRank)
        if (bestMatches.length > 1) { reply(`${request.weapon} matches more than one carried weapon: ${bestMatches.map(match => match.weapon.name || match.weapon.type).join(', ')}. Say more of the weapon's name.`); return }
        const weapon = matches[0].weapon
        const type = weaponTypes.find(item => item[0] === weapon.type) || weaponTypes[0]
        const stat = type[1] === 'melee' ? character.stats.strength : character.stats.dexterity
        const attackModifier = type[1] === 'melee' ? character.meleeAttackModifier : character.rangedAttackModifier
        const modifier = number(stat) + number(character.attackSkill) + number(attackModifier)
        const natural = rollDie(20)
        const total = natural + modifier
        const attack = { kind: 'attack', label: weapon.name || type[0], natural, modifier, total, tn: null, hit: natural !== 1, weapon, die: type[2], stat: number(stat) }
        lastCommandAttackRef.current = attack
        reply(`${attack.label} attack roll: ${natural} on the die, ${signed(modifier)} modifier, total ${total}.${natural === 20 ? ' Critical hit.' : natural === 1 ? ' Critical miss.' : ''} Say roll damage to roll its damage.`)
        return
      }
      if (request.intent === 'roll-damage') {
        const attack = lastCommandAttackRef.current
        if (!attack) { reply('Roll an attack with a weapon before asking to roll damage.'); return }
        const dieResult = attack.natural === 20 ? attack.die : rollDie(attack.die)
        const modifier = attack.stat + number(attack.weapon.enhancement)
        const total = dieResult + modifier
        reply(`${attack.label} damage: ${dieResult} on the d${attack.die}, ${signed(modifier)} modifier, total ${total}.${attack.natural === 20 ? ' Critical damage used the maximum die result.' : ''}`)
      }
    }
    window.addEventListener('mag-character-command', handleCommand)
    return () => window.removeEventListener('mag-character-command', handleCommand)
  }, [character, computed, deathwatch])

  const update = (path, value) => setCharacter(current => {
    const copy = structuredClone(current)
    let target = copy
    path.slice(0, -1).forEach(key => { target = target[key] })
    target[path.at(-1)] = value
    copy.updatedAt = Date.now()
    return copy
  })
  const changeCurrentHp = (value, { audioOnly = false } = {}) => {
    const nextHp = Math.max(-1, Math.min(number(computed.maxHp), number(value)))
    if (number(character.currentHp) >= 0 && nextHp === -1) {
      setDeathwatch({ clock: 0, phase: 'endurance', checks: [], stopReason: '', deathRoll: null, outcome: '', mode: audioOnly ? 'audio' : 'visual' })
    }
    setCharacter(current => ({ ...current, currentHp: nextHp, updatedAt: Date.now() }))
  }
  const setLevel = level => {
    const nextLevel = Math.max(0, Math.min(10, number(level)))
    if (nextLevel > number(character.level)) setLevelUp(nextLevel)
    setCharacter(current => {
    const normalized = normalizeXpTracking(current)
    return {
      ...normalized,
      level,
      totalXp: normalized.totalXpManuallySet ? normalized.totalXp : xpForLevel(level),
      unspentXp: normalized.totalXpManuallySet || normalized.unspentXpManuallySet ? normalized.unspentXp : xpForLevel(level),
      updatedAt: Date.now(),
    }
    })
  }
  const setTotalXp = totalXp => {
    const editStartingTotal = totalXpEditValue.current ?? number(character.totalXp)
    if (totalXp === '') {
      setCharacter(current => ({ ...current, totalXp, totalXpManuallySet: true, updatedAt: Date.now() }))
      return
    }
    const nextTotal = Math.max(0, number(totalXp))
    const nextLevel = Math.max(number(character.level), levelForXp(nextTotal))
    if (nextLevel > number(character.level)) setLevelUp(nextLevel)
    let unspentDifference
    if (totalXpArrowChange.current) {
      unspentDifference = nextTotal - (totalXpLastValue.current ?? editStartingTotal)
      totalXpEditValue.current = nextTotal
      totalXpAppliedIncrease.current = 0
    } else {
      const desiredIncrease = Math.max(0, nextTotal - editStartingTotal)
      unspentDifference = Math.max(0, desiredIncrease - totalXpAppliedIncrease.current)
      totalXpAppliedIncrease.current += unspentDifference
    }
    totalXpLastValue.current = nextTotal
    totalXpArrowChange.current = false
    setCharacter(current => ({
      ...current,
      level: Math.max(number(current.level), levelForXp(nextTotal)),
      totalXp,
      unspentXp: unspentDifference ? Math.max(0, number(current.unspentXp) + unspentDifference) : current.unspentXp,
      totalXpManuallySet: true,
      updatedAt: Date.now(),
    }))
  }
  const setUnspentXp = unspentXp => setCharacter(current => ({
    ...current,
    unspentXp,
    unspentXpManuallySet: true,
    updatedAt: Date.now(),
  }))
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
  const setSpecies = species => setCharacter(current => ({
    ...current,
    species,
    speciesSource: 'user',
    updatedAt: Date.now(),
  }))
  const setCharacterName = name => setCharacter(current => ({
    ...current,
    name,
    characterNameSource: 'user',
    updatedAt: Date.now(),
  }))
  const setWeaponName = (index, name) => setCharacter(current => {
    const copy = structuredClone(current)
    copy.weapons[index].name = name
    copy.weapons[index].nameCustomized = true
    copy.updatedAt = Date.now()
    return copy
  })
  const setWeaponNotes = (index, notes) => setCharacter(current => {
    const copy = structuredClone(current)
    copy.weapons[index].notes = notes
    copy.weapons[index].notesCustomized = true
    copy.updatedAt = Date.now()
    return copy
  })
  const setWeaponType = (index, type) => setCharacter(current => {
    const copy = structuredClone(current)
    const weapon = copy.weapons[index]
    const refreshName = weaponNameIsUnedited(weapon, current.archetype, current.species)
    const refreshNotes = weaponNotesAreUnedited(weapon)
    weapon.type = type
    if (refreshNotes) {
      weapon.notes = weaponNotesByType[type] || ''
      weapon.generatedNotes = weapon.notes
      weapon.notesCustomized = false
    }
    if (refreshName) {
      const usedNames = new Set(copy.weapons.filter((_, weaponIndex) => weaponIndex !== index).map(entry => entry.name).filter(Boolean))
      const availableNames = generatedWeaponNamesForType(current.archetype, type, current.species).filter(name => !usedNames.has(name))
      const name = availableNames[Math.floor(Math.random() * availableNames.length)] || generatedWeaponNamesForType(current.archetype, type, current.species)[0] || ''
      weapon.name = name
      weapon.generatedName = name
      weapon.nameCustomized = false
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
      const userSelectedSpecies = Boolean(current.species?.trim() && current.speciesSource === 'user')
      const randomSpeciesChoices = speciesNames.filter(speciesName => speciesName !== current.species)
      const species = userSelectedSpecies
        ? current.species
        : randomSpeciesChoices[Math.floor(Math.random() * randomSpeciesChoices.length)] || speciesNames[0] || ''
      const manualItems = current.items.filter(item => !['archetype', 'archetype-trait', 'species-trait', 'archetype-item'].includes(item.source))
      const packageItemScores = { ...preset.stats, ...allocation, defense: Math.max(1, number(current.defenseRating)) }
      const items = populateArchetypeItems(manualItems, preset.name, packageItemScores, species)
      const usedItemNames = new Set(items.map(item => item.name?.trim()).filter(Boolean))
      randomStartingTraits(species, preset, usedItemNames).forEach(({ name, description, source }) => {
        const trait = { id: crypto.randomUUID(), name, description, source }
        const emptyIndex = items.findIndex(item => !item.name?.trim() && !String(item.description || '').trim() && !String(item.bonus || '').trim() && !item.appliesTo?.trim())
        if (emptyIndex >= 0) items[emptyIndex] = { ...trait, id: items[emptyIndex].id || trait.id }
        else items.push(trait)
      })
      const weapons = populateArchetypeWeapons(current.weapons, preset.name, species)
      const talents = populateArchetypeTalents(current.talents, preset, talentAllowanceForLevel(current.level))
      const attackFocus = attackFocusForArchetype(preset)
      let contacts = current.contacts.filter(contact => contact.source !== 'archetype').map(contact => ({ ...contact }))
      const requiredContacts = Math.max(0, 3 + number(preset.stats.charisma))
      const roles = shuffled(contactRolesForArchetype(preset.name))
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
      contacts = contacts.filter(contact => contact.name?.trim() || contact.role?.trim())
      const userSelectedName = current.characterNameSource === 'user' || (current.characterNameSource == null && current.name?.trim() && current.name !== 'New Hero')
      const characterName = userSelectedName ? current.name : randomCharacterName(species, preset.name) || current.name
      return {
        ...current, name: characterName, characterNameSource: userSelectedName ? 'user' : 'starting-package',
        species, speciesSource: userSelectedSpecies ? 'user' : 'starting-package',
        archetype: preset.name, stats: { ...current.stats, ...preset.stats },
        attackSkill: allocation.attack,
        meleeAttackModifier: attackFocus === 'melee' ? 1 : 0,
        rangedAttackModifier: attackFocus === 'ranged' ? 1 : 0,
        skills: Object.fromEntries(skillDefs.map(([key]) => [key, { ...current.skills[key], ability: allocation[key] }])),
        items, weapons, talents, contacts, talentRowsGrantedForLevel: Math.max(number(current.talentRowsGrantedForLevel), talentAllowanceForLevel(current.level)), weaponLoadoutAppliedFor: weaponLoadoutMarker(preset.name, species), itemLoadoutAppliedFor: itemLoadoutMarker(preset.name), updatedAt: Date.now(),
      }
    })
    flash(`${preset.name} starting scores, skills, and traits applied`)
  }
  const chooseArchetype = name => {
    if (name === 'Help me choose!') { setShowArchetypeQuiz(true); return }
    if (archetypeOptions.some(option => option.name === name)) setPendingArchetype(name)
    else update(['archetype'], name)
  }
  const flash = text => { setNotice(text); window.setTimeout(() => setNotice(''), 2200) }
  const remove = () => {
    if (!pendingDelete) return
    const next = characters.filter(item => item.id !== pendingDelete.id)
    setCharacters(next)
    localStorage.setItem(STORE_KEY, JSON.stringify(next))
    setPendingDelete(null)
  }
  const importFile = event => {
    const file = event.target.files?.[0]; if (!file) return
    const reader = new FileReader()
    reader.onload = () => { try {
      const data = JSON.parse(reader.result)
      if (!data.name || !data.stats || !data.skills) throw new Error()
      setCharacter({ ...newCharacter(), ...normalizeXpTracking(data), id: crypto.randomUUID(), updatedAt: Date.now() }); flash('Character imported')
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
  const createHero = () => {
    setCharacter(newCharacter())
    setShowWelcome(true)
  }
  const attackRoll = weapon => {
    const type = weaponTypes.find(item => item[0] === weapon.type) || weaponTypes[0]
    const stat = type[1] === 'melee' ? character.stats.strength : character.stats.dexterity
    const attackModifier = type[1] === 'melee' ? character.meleeAttackModifier : character.rangedAttackModifier
    const modifier = number(stat) + number(character.attackSkill) + number(attackModifier)
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
      <div className="library-actions"><button className="primary" onClick={createHero}>＋ Create New Hero</button><button onClick={() => fileRef.current.click()}>⇧ Upload Character</button></div>
      <input ref={fileRef} className="visually-hidden" type="file" onChange={importFile} />
    </div>
    <section className="saved-library"><h2>Saved Heroes</h2>{characters.length === 0 ? <div className="empty-state"><strong>No saved Heroes yet</strong><span>Your characters stay in this browser using local storage.</span></div> : <div className="character-grid">{characters.map(hero => <article className="character-card" key={hero.id}><div><span>LEVEL {hero.level || 0}</span><h3>{hero.name}</h3><p>{[hero.species, hero.archetype].filter(Boolean).join(' • ') || 'Unwritten legend'}</p></div><div className="card-actions"><button className="primary" onClick={() => setCharacter(normalizeXpTracking(structuredClone(hero)))}>Load</button><button className="danger" onClick={() => setPendingDelete({ id: hero.id, name: hero.name })}>Delete</button></div></article>)}</div>}</section>
    {notice && <div className="toast">{notice}</div>}
    {showWelcome && <CharacterSheetWelcome close={() => setShowWelcome(false)}/>}
    {pendingDelete && <ConfirmModal
      eyebrow="DELETE HERO"
      title={`Delete ${pendingDelete.name || 'this Hero'}?`}
      message="This permanently removes the locally saved character from this browser."
      confirmLabel="Delete Character"
      close={() => setPendingDelete(null)}
      confirm={remove}
      destructive
    />}
  </div>

  const skillTotal = (key, stat) => number(character.stats[stat]) + skillEntryTotal(character.skills[key])
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
    <div className="sheet-toolbar"><button onClick={() => setCharacter(null)}>← Heroes</button><div className="toolbar-title"><strong>{character.name || 'Unnamed Hero'}</strong><span>Level {computed.level}</span></div><button onClick={createHero}>New</button><button onClick={() => fileRef.current.click()}><span className="load-label-full">Load File</span><span className="load-label-mobile">Load</span></button><button onClick={exportCharacter}>Export</button><label className="autosave-toggle"><input type="checkbox" checked={character.autoSave !== false} onChange={e => setAutoSave(e.target.checked)}/><span>Autosave</span></label><button className="primary" onClick={save}>Save</button><input ref={fileRef} className="visually-hidden" type="file" onChange={importFile} /></div>
    <header className="sheet-header"><img src="/multiverse%20adventurers%20guild%20icon.png" alt="Guild shield"/><div><span className="eyebrow sheet-eyebrow">MULTIVERSE ADVENTURERS GUILD</span><h1>Character Sheet</h1></div><div className="identity-fields">
      <Field label="Hero name" value={character.name} onChange={setCharacterName} wide/>
      <IdentityChoice label="Species" href="/players#species" help="Species describes what kind of being your Hero is. It is primarily a roleplaying choice and does not limit your Stats or Skills." value={character.species} options={speciesNames} onChange={setSpecies}/>
      <IdentityChoice label="Archetype" href="/players#archetypes" help="An Archetype is a flexible example of a character style. Use its starting package, customize it, or build your own." value={character.archetype} options={['Help me choose!', ...archetypeOptions.map(option => option.name)]} tooltip={archetypeOptions.find(option => option.name === character.archetype)?.description} onChange={chooseArchetype} allowReselect/>
      <div className="identity-utility-row">
        <Field label="Level" href="/rules#level-progression-force-energy-and-talents" help="Level is based on Total XP earned. Level 0 is 0–9 XP, Level 1 begins at 10 XP, and every additional 10 XP grants another Level, up to Level 10 at 100 XP. Spending XP does not lower your Level." type="number" min="0" max="10" value={character.level} onChange={setLevel}/>
        <Field label="Total XP" href="/rules#level-progression-force-energy-and-talents" help="All XP your Hero has earned. Total XP never decreases and determines Level: every 10 Total XP grants one Level." type="number" min="0" value={character.totalXp} onFocus={() => { totalXpEditValue.current = number(character.totalXp); totalXpLastValue.current = number(character.totalXp); totalXpAppliedIncrease.current = 0 }} onKeyDown={event => { if (event.key === 'ArrowUp' || event.key === 'ArrowDown') totalXpArrowChange.current = true }} onKeyUp={() => { totalXpArrowChange.current = false }} onMouseDown={event => { const bounds = event.currentTarget.getBoundingClientRect(); if (event.clientX >= bounds.right - 24) totalXpArrowChange.current = true }} onMouseUp={() => { totalXpArrowChange.current = false }} onBlur={() => { totalXpEditValue.current = null; totalXpLastValue.current = null; totalXpAppliedIncrease.current = 0; totalXpArrowChange.current = false }} onChange={setTotalXp}/>
        <Field label="Unspent XP" href="/rules#level-progression-force-energy-and-talents" help={xpSpendingHelp} type="number" min="0" value={character.unspentXp} onChange={setUnspentXp}/>
        <div className="quick-dice" aria-label="Quick dice rolls"><span>Roll a Die</span>{[4,6,8,10,20].map(sides=><button type="button" key={sides} onClick={()=>quickDieRoll(sides)}>d{sides}</button>)}</div>
      </div>
    </div></header>

    <section className="sheet-section vitals"><SectionTitle icon="⚔" title="Combat Summary" subtitle="Move 30 feet each turn. One reaction per round."/><div className="vital-grid">
      <Vital label="Initiative" value={signed(computed.initiative)} roll={() => checkRoll('Initiative', computed.initiative)}/><HpVital value={character.currentHp} max={computed.maxHp} onChange={changeCurrentHp}/><DefenseVital value={computed.defense} bonus={character.defenseBonus} rating={character.defenseRating} onBonus={value => update(['defenseBonus'], value)} onRating={value => update(['defenseRating'], value)}/><Vital label="Resilience" value={signed(computed.resilience)} roll={() => checkRoll('Resilience', computed.resilience)}/><Vital label="Ego" value={signed(computed.ego)} roll={() => checkRoll('Ego', computed.ego)}/><Vital label="Energy" editable value={character.currentEnergy} max={computed.maxEnergy} onChange={v => update(['currentEnergy'], v)}/><Vital label="Max Force" value={computed.maxForce}/></div>
    </section>

    <div className="sheet-columns"><section className="sheet-section"><SectionTitle icon="▥" title="Stats" subtitle="Starting array: +3, +2, +1, 0, 0, −1. Each choice can only be used once, except 0 twice."/><div className="stat-list">{stats.map(([key, label, short, Icon, description]) => <div className="stat-row" key={key}><div className="stat-name"><Icon/><strong><a className="sheet-reference-link" href={`/players#stat-${key}`}>{label} <span>({short})</span></a></strong><InfoTooltip label={label} description={description}/></div><SkillScoreControl label={`${label} score`} value={character.stats[key]} options={[-1, 0, 1, 2, 3]} isOptionDisabled={option => statOptionUnavailable(key, option)} onChange={v => update(['stats', key], v)}/><button className="roll-button" onClick={() => checkRoll(label, character.stats[key])}>Roll</button></div>)}</div></section>
      <section className="sheet-section skills">
        <SectionTitle icon="★" title="Skills" subtitle="Starting array: +2, +2, +1, +1, +1, 0, 0, 0, −1. Assign each value to one Skill, including Attack. Use +2 twice, +1 three times, 0 three times, and −1 once."/>
        <div className="skill-head"><span>Skill</span><span>Stat</span><span>Ability</span><span>Modifier</span><span>Buffs</span><span>Debuffs</span><span>Total</span></div>
        {skillDefs.map(([key, label, defaultStat, Icon, description]) => {
          const total = skillTotal(key, defaultStat)
          const statDefinition = stats.find(([statKey]) => statKey === defaultStat)
          const statName = statDefinition?.[1]
          const statShort = statDefinition?.[2]
          const statScore = character.stats[defaultStat]
          return <div className="skill-row" key={key}>
            <div className="skill-name"><Icon/><strong><a className="sheet-reference-link" href={`/players#skill-${key}`}><span>{label} <small className="skill-stat-full">({statName})</small><small className="skill-stat-short">({statShort})</small></span></a></strong><InfoTooltip label={label} description={description}/></div>
            <div className="skill-field"><small>Stat</small><output className="skill-stat">{signed(statScore)}</output></div>
            <div className={`skill-field skill-ability-field ${character.skills[key].ability === '' ? 'is-empty' : ''}`}><small>Ability</small><SkillScoreControl label={`${label} ability`} value={character.skills[key].ability} options={[-1, 0, 1, 2]} isOptionDisabled={option => skillOptionUnavailable(key, option)} onChange={v => update(['skills', key, 'ability'], v)}/></div>
            {['modifier','buffs','debuffs'].map(field => <div className="skill-field" key={field}><small>{field === 'modifier' ? 'Modifier' : field === 'buffs' ? 'Buffs' : 'Debuffs'}</small><NumberInput value={character.skills[key][field]} onChange={v => update(['skills', key, field], field === 'debuffs' ? -Math.abs(number(v)) : v)}/></div>)}
            <div className="skill-total"><div className="skill-total-actions"><div className="skill-total-value"><small>Total</small><output>{signed(total)}</output></div><button className="roll-button" onClick={() => checkRoll(label, total)}>Roll</button></div></div>
          </div>
        })}
      </section></div>

    <section className="sheet-section"><SectionTitle icon="✦" title="Attack" subtitle="Attack skill applies to melee and ranged attacks"/><div className="attack-summary"><label className="field attack-control"><span><a className="sheet-reference-link" href="/players#skill-attack"><span className="attack-label-full">Attack skill</span><span className="attack-label-short">Skill</span></a><InfoTooltip label="Attack" description={attackSkillDescription}/></span><SkillScoreControl label="Attack skill" value={character.attackSkill} options={[-1, 0, 1, 2]} isOptionDisabled={option => skillOptionUnavailable('attack', option)} onChange={v => update(['attackSkill'], v)}/></label><div className="field attack-control"><span>Attack modifiers</span><div className="attack-modifier-fields"><label><small>Melee</small><input aria-label="Melee attack modifier" type="number" value={character.meleeAttackModifier} onChange={e => update(['meleeAttackModifier'], e.target.value)}/></label><label><small>Ranged</small><input aria-label="Ranged attack modifier" type="number" value={character.rangedAttackModifier} onChange={e => update(['rangedAttackModifier'], e.target.value)}/></label></div></div><AttackEquation label="Melee" statLabel="Strength" stat={character.stats.strength} attack={character.attackSkill} modifier={character.meleeAttackModifier}/><AttackEquation label="Ranged" statLabel="Dexterity" stat={character.stats.dexterity} attack={character.attackSkill} modifier={character.rangedAttackModifier}/></div></section>

    <EditableTable title="Weapons" icon="⚔" rows={character.weapons} add={() => addRow('weapons', { name: '', type: weaponTypes[0][0], enhancement: 0, notes: '' })} remove={id => deleteRow('weapons', id)} columns={['Name','Type','Enhancement','Damage','Notes','']}>
      {(row, i) => {
        const weaponType = weaponTypes.find(type => type[0] === row.type) || weaponTypes[0]
        const damageStat = weaponType[1] === 'melee' ? character.stats.strength : character.stats.dexterity
        const damageModifier = number(damageStat) + number(row.enhancement)
        return <><label className="weapon-field"><span>Name</span><input aria-label="Weapon name" value={row.name} onChange={e => setWeaponName(i,e.target.value)}/></label><label className="weapon-field"><span>Type</span><select aria-label="Weapon type" value="__current__" onChange={e => setWeaponType(i,e.target.value)}><option value="__current__" hidden>{row.type}</option>{weaponTypes.map(type => <option key={type[0]} value={type[0]}>{type[0]}</option>)}</select></label><label className="weapon-field"><span>Enhancement</span><NumberInput value={row.enhancement} onChange={v => update(['weapons',i,'enhancement'],v)}/></label><label className="weapon-field"><span>Damage</span><output className="weapon-damage">d{weaponType[2]} {signed(damageModifier)}</output></label><label className="weapon-field weapon-notes"><span>Notes</span><AutoTextarea maxLines={2} value={row.notes} onChange={value => setWeaponNotes(i,value)}/></label><div className="row-actions"><button className="roll-button" onClick={() => attackRoll(row)}>Attack</button><button className="icon-button" onClick={() => deleteRow('weapons',row.id)}>×</button></div></>
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
    {showWelcome && <CharacterSheetWelcome close={() => setShowWelcome(false)}/>}
    {levelUp && <LevelUpModal level={levelUp} close={() => setLevelUp(null)}/>}
    {roll && <RollModal roll={roll} close={() => setRoll(null)} damage={() => damageRoll(roll)}/>}
    {deathwatch && deathwatch.mode !== 'audio' && <DeathwatchModal heroName={character.name || 'The Hero'} endurance={character.stats.endurance} state={deathwatch} setState={setDeathwatch} onStabilize={() => update(['currentHp'], 0)} close={() => setDeathwatch(null)}/>}
    {showArchetypeQuiz && (
      <ArchetypeQuizModal close={() => setShowArchetypeQuiz(false)} complete={name => { setShowArchetypeQuiz(false); setPendingArchetype(name) }}/>
    )}
    {pendingArchetype && <ArchetypePrompt
      name={pendingArchetype}
      close={() => setPendingArchetype('')}
      chooseOnly={name => { update(['archetype'], name); setPendingArchetype('') }}
      applyDefaults={name => { applyArchetype(name); setPendingArchetype('') }}
    />}
  </div>
}

function Field({ label, onChange, wide, help = '', href = '', ...props }) { return <label className={`field ${wide ? 'wide' : ''}`}><span className="field-label">{href ? <a className="sheet-reference-link" href={href}>{label}</a> : label}{help && <InfoTooltip label={label} description={help}/>}</span><input {...props} onChange={e => onChange(e.target.value)}/></label> }
function InfoTooltip({ label, description }) { return <button type="button" className="info-tooltip" aria-label={`What does ${label} do?`} data-tooltip={description}>?</button> }
function IdentityChoice({ label, value, options, tooltip = '', help = '', href = '', onChange, allowReselect = false }) { const existing = options.includes(value); const [custom, setCustom] = useState(Boolean(value) && !existing); useEffect(() => { if (existing) setCustom(false) }, [existing]); const choose = event => { if (event.target.value === '__custom__') { onChange(''); setCustom(true) } else onChange(event.target.value) }; const option = name => <option value={name} key={name}>{name}</option>; const helpOption = options.includes('Help me choose!'); const listedOptions = options.filter(name => name !== 'Help me choose!'); const selectedValue = allowReselect && existing ? '__current__' : existing ? value : ''; return <label className="field identity-choice" data-tooltip={tooltip}><span className="field-label">{href ? <a className="sheet-reference-link" href={href}>{label}</a> : label}{help && <InfoTooltip label={label} description={help}/>}</span>{custom ? <div className="identity-custom"><input autoFocus={!window.matchMedia('(max-width: 768px)').matches} aria-label={`Custom ${label}`} value={value} placeholder={`Enter custom ${label.toLowerCase()}`} onChange={e => onChange(e.target.value)}/><select className="custom-list-trigger" aria-label={`Choose ${label} from list`} value="" onChange={choose}><option value="" disabled></option>{helpOption && option('Help me choose!')}{listedOptions.map(option)}</select></div> : <select aria-label={`Choose ${label}`} value={selectedValue} onChange={choose}>{allowReselect && existing && <option value="__current__" hidden>{value}</option>}<option value="" disabled>Choose</option>{helpOption && option('Help me choose!')}<option value="__custom__">Custom {label.toLowerCase()}…</option>{listedOptions.map(option)}</select>}</label> }
function ContactRoleChoice({ value, onChange }) { const existing = contactTypes.includes(value); const expertise = contactCatalog.find(contact => contact.type === value)?.expertise || ''; const [custom, setCustom] = useState(Boolean(value) && !existing); useEffect(() => { if (existing) setCustom(false) }, [existing]); const choose = event => { if (event.target.value === '__custom__') { onChange(''); setCustom(true) } else onChange(event.target.value) }; return <div className="contact-role-control" data-tooltip={expertise ? `Expertise: ${expertise}` : ''}>{custom ? <div className="identity-custom"><input autoFocus={!window.matchMedia('(max-width: 768px)').matches} aria-label="Custom contact role" value={value} placeholder="Enter custom role" onChange={event => onChange(event.target.value)}/><select className="custom-list-trigger" aria-label="Choose contact type from list" value="" onChange={choose}><option value="" disabled></option>{contactTypes.map(option => <option value={option} key={option}>{option}</option>)}</select></div> : <select aria-label="Contact role" value={existing ? value : ''} onChange={choose}><option value="" disabled>Choose contact type</option><option value="__custom__">Custom contact role…</option>{contactTypes.map(option => <option value={option} key={option}>{option}</option>)}</select>}</div> }
function NumberInput({ value, onChange }) { return <input className="number-input" type="number" value={value} onChange={e => onChange(e.target.value)}/> }
function AttackEquation({ label, statLabel, stat, attack, modifier }) { const total = number(stat) + number(attack) + number(modifier); const statShort = statLabel === 'Strength' ? 'STR' : 'DEX'; return <div className="attack-equation"><h3>{label}</h3><div className="attack-equation-values"><span><small><span className="attack-label-full">{statLabel}</span><span className="attack-label-short">{statShort}</span></small><strong>{signed(stat)}</strong></span><span><small><span className="attack-label-full">Skill</span><span className="attack-label-short">Skill</span></small><strong>{signed(attack)}</strong></span><span><small><span className="attack-label-full">Modifier</span><span className="attack-label-short">Mod</span></small><strong>{signed(modifier)}</strong></span><span className="attack-equation-total"><small>Total</small><strong>{signed(total)}</strong></span></div></div> }
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
function SkillScoreControl({ label, value, options, onChange, isOptionDisabled = () => false }) { const hasPreset = value !== '' && options.includes(number(value)); const [custom, setCustom] = useState(value !== '' && !hasPreset); useEffect(() => { if (hasPreset) setCustom(false) }, [hasPreset]); const choose = event => { if (event.target.value === '__custom__') { onChange(''); setCustom(true) } else onChange(event.target.value) }; return custom ? <div className="identity-custom"><input autoFocus={!window.matchMedia('(max-width: 768px)').matches} aria-label={`${label} custom value`} type="number" min="-4" max="4" value={value} onChange={event => onChange(event.target.value)}/><select className="custom-list-trigger" aria-label={`${label} preset list`} value="" onChange={choose}><option value="" disabled></option>{options.map(option => <option value={option} key={option} disabled={isOptionDisabled(option)}>{signed(option)}</option>)}</select></div> : <select aria-label={label} value={hasPreset ? number(value) : ''} onChange={choose}><option value="" disabled>Choose</option><option value="__custom__">Custom…</option>{options.map(option => <option value={option} key={option} disabled={isOptionDisabled(option)}>{signed(option)}</option>)}</select> }
function TalentControl({ value, onChange }) { return <div className="talent-control"><select aria-label="Choose a talent" value={talentNames.includes(value) ? value : ''} onChange={e => onChange(e.target.value)}><option value="">Choose a talent</option>{talentNames.map(name => <option value={name} key={name}>{name}</option>)}</select></div> }
function SectionTitle({ title, subtitle }) {
  const startingArray = title === 'Stats' || title === 'Skills' ? subtitle : ''
  const talentHelp = title === 'Talents' ? 'You automatically gain 2 Talents at Level 1, then 1 more at Levels 3, 5, 7, and 9. At Levels 1, 4, 6, and 8, you may also choose 1 Talent instead of the Attack or Defense Level benefit. You can purchase additional eligible Talents for 5 XP each.' : ''
  const reminders = { 'Combat Summary': 'Move 30 feet each turn, even if you attack. Take one reaction per round. Free actions: talk, draw a weapon, or step 5 feet.', Attack: 'One Skill is used for both melee and ranged attacks.', Skills: 'You can activate one Skill per turn.', Contacts: subtitle || 'You begin with 3 + Charisma Contacts.', Talents: 'You can activate two Talents per turn. Sustained combat Talents occupy Combat Slots: one at level 0, plus one at levels 4 and 7.', 'Items & Traits': 'Items explain why your Stats and Skills look the way they do. They do not change numbers; they describe your Hero through equipment, Species, Archetype, and background. Examples: (+2) Strength — Giant Species; (−1) Sneak — loud, heavy boots. Treat them like character-defining gear without a price tag. Traits describe your Hero’s personality, beliefs, habits, and complications. Use them as roleplaying prompts; they do not change numbers unless a rule specifically says otherwise.', Weapons: 'You can have as many weapons as you like. You can attack once each turn, or move an extra 30 feet instead. Improvised ranged weapon attacks deal 1d4−1.' }
  const note = reminders[title] || (startingArray ? '' : subtitle)
  const Icon = sectionIcons[title] || FaStar
  const guideLink = sectionGuideLinks[title]
  const heading = <><span><Icon/></span>{title}</>
  return <div className="section-title"><h2>{guideLink ? <a className="section-guide-link" href={guideLink}>{heading}</a> : heading}{startingArray && <InfoTooltip label={`${title} starting array`} description={startingArray}/>} {talentHelp && <InfoTooltip label="Talent progression" description={talentHelp}/>}</h2>{note && <p>{note}</p>}{title === 'Talents' && subtitle && <strong className="section-metric">{subtitle}</strong>}</div>
}
function Vital({ label, value, max, editable, onChange, roll, children }) { const Icon = vitalIcons[label]; return <div className="vital"><div className="vital-heading">{Icon && <Icon className="vital-icon"/>}<a className="vital-rule-link" href={vitalRuleLinks[label]}>{label}</a></div>{editable && max !== undefined ? <div className="vital-combined"><input aria-label={`${label} current`} type="number" value={value} onChange={e=>onChange(e.target.value)}/><span>/</span><strong aria-label={`${label} maximum`}>{max}</strong></div> : editable ? <input type="number" value={value} onChange={e=>onChange(e.target.value)}/> : roll ? <div className="vital-roll-value"><strong>{value}</strong><button className="roll-button" onClick={roll}>Roll</button></div> : <strong>{value}</strong>}{children}</div> }
function HpVital({ value, max, onChange }) {
  const [amount, setAmount] = useState(0)
  const apply = () => onChange(Math.max(-1, Math.min(number(max), number(value) + number(amount))))
  return <div className="vital hp-vital"><div className="vital-heading"><FaHeartbeat className="vital-icon"/><a className="vital-rule-link" href={vitalRuleLinks.HP}>HP</a></div><div className="vital-combined"><input aria-label="HP current" type="number" value={value} onChange={event => onChange(event.target.value)}/><span>/</span><strong aria-label="HP maximum">{max}</strong></div><div className="hp-adjuster" aria-label="Adjust HP"><button type="button" className="hp-step" aria-label="Decrease HP adjustment" onClick={() => setAmount(current => number(current) - 1)}>−</button><input aria-label="HP adjustment amount" type="number" value={amount} onChange={event => setAmount(event.target.value)}/><button type="button" className="hp-step" aria-label="Increase HP adjustment" onClick={() => setAmount(current => number(current) + 1)}>+</button><button type="button" className="hp-apply" onClick={apply}>Apply</button></div></div>
}
function DefenseVital({ value, bonus, rating, onBonus, onRating }) {
  const normalizedRating = number(rating)
  const nextCost = defenseUpgradeCosts[normalizedRating + 1]
  return <div className="vital defense-vital"><div className="vital-heading"><FaShieldAlt className="vital-icon"/><a className="vital-rule-link" href={vitalRuleLinks.Defense}>Defense</a><InfoTooltip label="Defense" description="An attacker must meet or exceed your Defense to hit you. Your total includes the purchased Rating and any temporary Modifier."/></div><div className="defense-controls"><label><span>Modifier</span><input aria-label="Defense modifier" title="Temporary or situational Defense adjustment" type="number" value={bonus} onChange={event => onBonus(event.target.value)}/></label><strong aria-label="Defense total">{value}</strong><label><span>Rating</span><input aria-label="Defense rating" title="Permanent purchased Defense rating; see the XP cost below" type="number" min="1" max="7" value={rating} onChange={event => onRating(event.target.value)}/></label></div><small className="defense-xp-summary">{defenseXpSpent(normalizedRating)} XP spent{nextCost ? ` · Next +1: ${nextCost} XP` : ' · Maximum rating'}</small></div>
}
function EditableTable({ title, icon, subtitle, rows, columns, add, children }) { const slug = title.toLowerCase().replaceAll(' & ', '-').replaceAll(' ', '-'); return <section className={`sheet-section editable-table table-${slug}`}><SectionTitle icon={icon} title={title} subtitle={subtitle}/><div className="table-head">{columns.map((column,i)=><span key={`${column}-${i}`}>{column}</span>)}</div>{rows.map((row,i)=><div className="table-row" key={row.id}>{children(row,i)}</div>)}<button className="add-row" onClick={add}>＋ Add {title.replace(/s$/, '')}</button>{title === 'Talents' && <ForceTable/>}</section> }
function ForceTable() { return <div className="force-table"><h3>Force Activation Costs</h3><div className="force-row force-head"><span>Force</span><span>Sustained</span><span>One-shot</span></div>{[[1,1,1],[2,4,2],[3,9,4],[4,16,8]].map(([force,sustained,oneShot]) => <div className="force-row" key={force}><strong>F{force}</strong><span>{sustained} Energy</span><span>{oneShot} Energy</span></div>)}<p>One-shots last for one roll or immediate use and do not occupy a Talent Slot.</p></div> }
function RollModal({ roll, close, damage }) { const success = roll.result?.includes('Success') || roll.result?.includes('success') || roll.hit; const displayDie = roll.kind === 'damage' || roll.kind === 'die' ? roll.die : 20; return createPortal(<div className="modal-backdrop" onMouseDown={e => e.target===e.currentTarget && close()}><div className={`roll-modal ${success ? 'success' : ''}`} role="dialog" aria-modal="true"><button className="modal-close" onClick={close}>×</button><span className="eyebrow">{roll.kind === 'damage' ? 'DAMAGE ROLL' : roll.kind === 'attack' ? 'ATTACK ROLL' : roll.kind === 'die' ? 'DIE ROLL' : 'D20 CHECK'}</span><h2>{roll.label}</h2><div className={`die-result die-d${displayDie}`}>{roll.natural}</div>{roll.kind !== 'die' && <div className="roll-math"><span>Die <strong>{roll.natural}</strong></span><span>Modifier <strong>{signed(roll.modifier)}</strong></span><span>Total <strong>{roll.total}</strong></span>{roll.tn != null && <span>Target <strong>{roll.tn}</strong></span>}</div>}{roll.kind === 'attack' && <h3>{roll.natural === 20 ? 'Critical hit!' : roll.natural === 1 ? 'Critical miss!' : roll.tn == null ? 'Attack rolled' : roll.hit ? 'Hit!' : 'Miss'}</h3>}{roll.result && <h3>{roll.result}</h3>}{roll.critical && <p>Critical hit: maximum d{roll.die} damage.</p>}{roll.kind === 'attack' && roll.hit && <button className="primary damage-button" onClick={damage}>Roll d{roll.die} Damage</button>}</div></div>, document.body) }
function DeathwatchModal({ heroName, endurance, state, setState, onStabilize, close }) {
  const rollEndurance = () => {
    const natural = rollDie(20)
    const modifier = number(endurance)
    const total = natural + modifier
    const success = natural === 20 || (natural !== 1 && total >= 11)
    setState(current => ({ ...current, clock: success ? current.clock : current.clock + 1, phase: success ? 'death-roll' : 'endurance', stopReason: success ? 'Endurance check succeeded.' : '', checks: [...current.checks, { natural, modifier, total, success }] }))
  }
  const firstAid = () => setState(current => ({ ...current, phase: 'death-roll', stopReason: 'A teammate provided first aid.' }))
  const resolveDeathwatch = () => {
    const deathRoll = rollDie(6)
    const outcome = deathRoll < state.clock ? 'dead' : 'stable'
    setState(current => ({ ...current, phase: 'resolved', deathRoll, outcome }))
    if (outcome === 'stable') onStabilize()
  }
  const latestCheck = state.checks.at(-1)
  return createPortal(<div className="modal-backdrop"><div className={`archetype-prompt deathwatch-modal ${state.outcome || ''}`} role="alertdialog" aria-modal="true" aria-labelledby="deathwatch-title" aria-describedby="deathwatch-description"><span className="eyebrow">DEATH CLOCK</span><h2 id="deathwatch-title">The Death Clock is ticking.</h2><p id="deathwatch-description"><strong>{heroName}</strong> has dropped to −1 HP and is dying.</p><div className="deathwatch-clock"><span>Death Clock</span><strong>{state.clock}</strong></div>{latestCheck && <div className={`deathwatch-check ${latestCheck.success ? 'success' : 'failure'}`}><strong>Endurance: {latestCheck.natural} {signed(latestCheck.modifier)} = {latestCheck.total}</strong><span>{latestCheck.success ? 'Success—the Death Clock stops.' : `Failure—the Death Clock increases to ${state.clock}.`}</span></div>}{state.phase === 'endurance' && <><p>At the end of each turn, make an Endurance TN11 roll. A failure increases the Death Clock by 1.</p><div className="deathwatch-actions"><button type="button" className="primary" autoFocus onClick={rollEndurance}>Roll Endurance TN11</button><button type="button" onClick={firstAid}>Teammate Provides First Aid</button></div></>}{state.phase === 'death-roll' && <><p>{state.stopReason} Roll a d6. If it is less than the Death Clock, {heroName} dies; otherwise, {heroName} stabilizes.</p><button type="button" className="primary deathwatch-resolve" autoFocus onClick={resolveDeathwatch}>Roll the d6</button></>}{state.phase === 'resolved' && <><div className="deathwatch-result"><span>d6 result</span><strong>{state.deathRoll}</strong><h3>{state.outcome === 'dead' ? `${heroName} dies.` : `${heroName} stabilizes.`}</h3><p>{state.deathRoll} {state.outcome === 'dead' ? 'is less than' : 'is not less than'} the Death Clock of {state.clock}.</p></div><button type="button" className="primary deathwatch-resolve" autoFocus onClick={close}>Return to Sheet</button></>}</div></div>, document.body)
}
function LevelUpModal({ level, close }) {
  const benefits = levelUpBenefits[level] || { automatic: 'Your Level has increased.' }
  useEffect(() => {
    const dismiss = event => { if (event.key === 'Escape') close() }
    window.addEventListener('keydown', dismiss)
    return () => window.removeEventListener('keydown', dismiss)
  }, [close])
  return createPortal(<div className="modal-backdrop" onMouseDown={event => event.target === event.currentTarget && close()}><div className="archetype-prompt level-up-modal" role="dialog" aria-modal="true" aria-labelledby="level-up-title"><button type="button" className="modal-close" aria-label="Close level up guide" autoFocus onClick={close}>×</button><span className="eyebrow">LEVEL UP</span><h2 id="level-up-title">You reached Level {level}!</h2><div className="level-up-grid"><section><h3>Automatically gained</h3><p>{benefits.automatic}</p>{benefits.choice && <div className="level-up-choice"><strong>Make your Level choice</strong><p>{benefits.choice}</p></div>}<p>Your maximum HP updates automatically and includes your Endurance bonus. Add or choose any granted Talents on the sheet. You may also switch your Talents whenever you reach a new Level.</p></section><section><h3>Spend Unspent XP</h3><ul><li><strong>Stats, Skills, and each Attack modifier:</strong> +1 costs 1 XP, +2 costs 4 XP, +3 costs 9 XP, and +4 costs 16 XP. Buy each step separately.</li><li><strong>Defense ratings +2 through +7:</strong> 2, 2, 4, 4, 8, and 8 XP respectively.</li><li><strong>Talent:</strong> 5 XP each, within your unlocked Force Level.</li><li><strong>Energy:</strong> 2 XP per additional point.</li></ul><p>Subtract purchases from Unspent XP, not Total XP. Total XP determines your Level and never decreases.</p></section></div><div className="level-up-actions"><a href="/rules#level-progression-force-energy-and-talents">Read the full Level rules</a><button type="button" className="primary" onClick={close}>Update My Hero</button></div></div></div>, document.body)
}
function CharacterSheetWelcome({ close }) {
  useEffect(() => {
    const dismiss = event => { if (event.key === 'Escape') close() }
    window.addEventListener('keydown', dismiss)
    return () => window.removeEventListener('keydown', dismiss)
  }, [close])
  return createPortal(<div className="modal-backdrop" onMouseDown={event => event.target === event.currentTarget && close()}><div className="archetype-prompt sheet-welcome" role="dialog" aria-modal="true" aria-labelledby="sheet-welcome-title" aria-describedby="sheet-welcome-intro"><button type="button" className="modal-close" aria-label="Close character sheet instructions" autoFocus onClick={close}>×</button><span className="eyebrow">NEW HERO GUIDE</span><h2 id="sheet-welcome-title">Build your Hero your way</h2><p id="sheet-welcome-intro" className="sheet-welcome-intro">You can create every detail yourself or choose an Archetype and let the sheet provide a complete starting package. Nothing is permanent—you can edit any result.</p><div className="sheet-welcome-grid"><section><h3>Choose a starting path</h3><p><strong>Build manually:</strong> Choose a Species, assign Stats and Skills, select Contacts and weapons, then describe your Hero with Items and personality Traits.</p><p><strong>Use an Archetype:</strong> Choose a familiar character style and select <em>Use Starting Package</em> to fill everything you need. “Help me choose!” can guide you.</p><p><strong>Make it custom:</strong> You can enter your own Archetype. Archetypes are examples, not hard boundaries on who your Hero can become.</p></section><section><h3>Set your core abilities</h3><p>Assign every value in the Stat and Skill starting arrays. Attack is also a Skill, with its own selector in the Attack section.</p><p>Choose whether your starting Attack modifier applies to melee or ranged attacks. You can improve both later.</p><p>Defense, HP, Energy, and other combat values are tracked in the Combat Summary.</p></section><section><h3>Describe and equip your Hero</h3><p><strong>Weapons</strong> define how you deal damage. <strong>Contacts</strong> are people you can call on. <strong>Items</strong> explain your capabilities, while <strong>Traits</strong> capture personality, beliefs, habits, and complications.</p><p>Generated entries are suggestions. Rename, replace, add, or remove them until the character feels right.</p></section><section><h3>Grow with XP</h3><p>Level 0 Heroes begin without Talents. You gain some Talents automatically as you level and may purchase more for 5 XP each.</p><p>Spend XP to improve Stats, Skills, Defense, and melee or ranged Attack modifiers. Additional Energy costs 2 XP per point.</p><p>Total XP determines Level; spending your unspent XP does not delay advancement.</p></section></div><button type="button" className="primary sheet-welcome-start" onClick={close}>Start Building</button></div></div>, document.body)
}
function ArchetypeQuizModal({ close, complete }) {
  const [nodeKey, setNodeKey] = useState('start')
  const [history, setHistory] = useState([])
  const node = archetypeQuiz[nodeKey]
  const choose = destination => {
    if (destination.result) { complete(destination.result); return }
    setHistory(current => [...current, nodeKey])
    setNodeKey(destination)
  }
  const back = () => setHistory(current => {
    const previous = current.at(-1)
    if (previous) setNodeKey(previous)
    return current.slice(0, -1)
  })
  return createPortal(<div className="modal-backdrop" onMouseDown={event => event.target === event.currentTarget && close()}><div className="archetype-prompt archetype-quiz" role="dialog" aria-modal="true" aria-labelledby="archetype-quiz-title"><button type="button" className="modal-close" aria-label="Close archetype chooser" onClick={close}>×</button><span className="eyebrow">HELP ME CHOOSE</span><small className="quiz-progress">Question {history.length + 1}</small><h2 id="archetype-quiz-title">{node.question}</h2><div className="archetype-quiz-answers">{node.answers.map(([label, destination]) => <button type="button" key={label} onClick={() => choose(destination)}>{label}</button>)}</div>{history.length > 0 && <button type="button" className="quiz-back" onClick={back}>← Back</button>}</div></div>, document.body)
}
function ArchetypePrompt({ name, close, chooseOnly, applyDefaults }) { return createPortal(<div className="modal-backdrop" onMouseDown={event => event.target === event.currentTarget && close()}><div className="archetype-prompt" role="dialog" aria-modal="true" aria-labelledby="archetype-prompt-title"><button type="button" className="modal-close" onClick={close}>×</button><span className="eyebrow">ARCHETYPE SETUP</span><h2 id="archetype-prompt-title">Use the {name} starting package?</h2><p>The starting package fills suggested Stats, Skills, Talents, weapons, Items, Traits, and Contacts appropriate to your level. Existing custom entries are preserved wherever possible.</p><div className="archetype-prompt-actions"><button type="button" onClick={() => chooseOnly(name)}>Choose Archetype Only</button><button type="button" className="primary" onClick={() => applyDefaults(name)}>Use Starting Package</button></div></div></div>, document.body) }
function ConfirmModal({ eyebrow, title, message, confirmLabel, close, confirm, destructive = false }) { return createPortal(<div className="modal-backdrop" onMouseDown={event => event.target === event.currentTarget && close()}><div className="archetype-prompt" role="alertdialog" aria-modal="true" aria-labelledby="confirmation-modal-title" aria-describedby="confirmation-modal-description"><button type="button" className="modal-close" aria-label="Close" onClick={close}>×</button><span className="eyebrow">{eyebrow}</span><h2 id="confirmation-modal-title">{title}</h2><p id="confirmation-modal-description">{message}</p><div className="archetype-prompt-actions"><button type="button" onClick={close}>Cancel</button><button type="button" className={destructive ? 'danger-confirm' : 'primary'} onClick={confirm}>{confirmLabel}</button></div></div></div>, document.body) }
export default CharacterSheet
