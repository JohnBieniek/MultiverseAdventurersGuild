// 1,000 Cyborg identities, with every archetype/origin combination represented at exactly twice its base count.
const cyborgNames = [
  {
    "name": "Aftershock",
    "identity": "Aftershock",
    "archetype": "Barbarian",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Berserker",
    "identity": "Berserker",
    "archetype": "Barbarian",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Bloodrush",
    "identity": "Bloodrush",
    "archetype": "Barbarian",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Breakstone",
    "identity": "Breakstone",
    "archetype": "Barbarian",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Clamor",
    "identity": "Clamor",
    "archetype": "Barbarian",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Earthshaker",
    "identity": "Earthshaker",
    "archetype": "Barbarian",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Grimhide",
    "identity": "Grimhide",
    "archetype": "Barbarian",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Hardcase",
    "identity": "Hardcase",
    "archetype": "Barbarian",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Warhide",
    "identity": "Warhide",
    "archetype": "Barbarian",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Ragecoil",
    "identity": "Ragecoil",
    "archetype": "Barbarian",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Mammoth",
    "identity": "Mammoth",
    "archetype": "Barbarian",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Bonequake",
    "identity": "Bonequake",
    "archetype": "Barbarian",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Wildheart",
    "identity": "Wildheart",
    "archetype": "Barbarian",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Feral",
    "identity": "Feral",
    "archetype": "Barbarian",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Blackstamp",
    "identity": "Blackstamp",
    "archetype": "Bounty Hunter",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Catchwire",
    "identity": "Catchwire",
    "archetype": "Bounty Hunter",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Deadletter",
    "identity": "Deadletter",
    "archetype": "Bounty Hunter",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Gravesight",
    "identity": "Gravesight",
    "archetype": "Bounty Hunter",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Manacle",
    "identity": "Manacle",
    "archetype": "Bounty Hunter",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Quarry",
    "identity": "Quarry",
    "archetype": "Bounty Hunter",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Reckoner",
    "identity": "Reckoner",
    "archetype": "Bounty Hunter",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Tracehound",
    "identity": "Tracehound",
    "archetype": "Bounty Hunter",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Warrant",
    "identity": "Warrant",
    "archetype": "Bounty Hunter",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Longtrail",
    "identity": "Longtrail",
    "archetype": "Bounty Hunter",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Hound",
    "identity": "Hound",
    "archetype": "Bounty Hunter",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Verdict",
    "identity": "Verdict",
    "archetype": "Bounty Hunter",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Marked",
    "identity": "Marked",
    "archetype": "Bounty Hunter",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Patient",
    "identity": "Patient",
    "archetype": "Bounty Hunter",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Abacus",
    "identity": "Abacus",
    "archetype": "Brainiac",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Brightmind",
    "identity": "Brightmind",
    "archetype": "Brainiac",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Cerebrum",
    "identity": "Cerebrum",
    "archetype": "Brainiac",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Deepthink",
    "identity": "Deepthink",
    "archetype": "Brainiac",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Foresight",
    "identity": "Foresight",
    "archetype": "Brainiac",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Logician",
    "identity": "Logician",
    "archetype": "Brainiac",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Polymath",
    "identity": "Polymath",
    "archetype": "Brainiac",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Theorem",
    "identity": "Theorem",
    "archetype": "Brainiac",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Intellection",
    "identity": "Intellection",
    "archetype": "Brainiac",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Ratiocinator",
    "identity": "Ratiocinator",
    "archetype": "Brainiac",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Cognition",
    "identity": "Cognition",
    "archetype": "Brainiac",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Second",
    "identity": "Second",
    "archetype": "Brainiac",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Peerless",
    "identity": "Peerless",
    "archetype": "Brainiac",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Abstract",
    "identity": "Abstract",
    "archetype": "Brainiac",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Absolver",
    "identity": "Absolver",
    "archetype": "Cleric",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Benediction",
    "identity": "Benediction",
    "archetype": "Cleric",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Censer",
    "identity": "Censer",
    "archetype": "Cleric",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Gracekeeper",
    "identity": "Gracekeeper",
    "archetype": "Cleric",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Hallow",
    "identity": "Hallow",
    "archetype": "Cleric",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Mercyhand",
    "identity": "Mercyhand",
    "archetype": "Cleric",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Reliquary",
    "identity": "Reliquary",
    "archetype": "Cleric",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Vesper",
    "identity": "Vesper",
    "archetype": "Cleric",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Sacrament",
    "identity": "Sacrament",
    "archetype": "Cleric",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Chaplain",
    "identity": "Chaplain",
    "archetype": "Cleric",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Ordained",
    "identity": "Ordained",
    "archetype": "Cleric",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Kindly",
    "identity": "Kindly",
    "archetype": "Cleric",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Penitent",
    "identity": "Penitent",
    "archetype": "Cleric",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Faithful",
    "identity": "Faithful",
    "archetype": "Cleric",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Beachhead",
    "identity": "Beachhead",
    "archetype": "Commando",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Breachline",
    "identity": "Breachline",
    "archetype": "Commando",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Hardpoint",
    "identity": "Hardpoint",
    "archetype": "Commando",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Overwatch",
    "identity": "Overwatch",
    "archetype": "Commando",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Trailblazer",
    "identity": "Trailblazer",
    "archetype": "Commando",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Shockfront",
    "identity": "Shockfront",
    "archetype": "Commando",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Strongpoint",
    "identity": "Strongpoint",
    "archetype": "Commando",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Vanguard",
    "identity": "Vanguard",
    "archetype": "Commando",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Hard",
    "identity": "Hard",
    "archetype": "Commando",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Fireteam",
    "identity": "Fireteam",
    "archetype": "Commando",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Stack",
    "identity": "Stack",
    "archetype": "Commando",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Tactical",
    "identity": "Tactical",
    "archetype": "Commando",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Ballistic",
    "identity": "Ballistic",
    "archetype": "Commando",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Forward",
    "identity": "Forward",
    "archetype": "Commando",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Underledger",
    "identity": "Underledger",
    "archetype": "Criminal",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Contraband",
    "identity": "Contraband",
    "archetype": "Criminal",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Ghostprint",
    "identity": "Ghostprint",
    "archetype": "Criminal",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Lockpick",
    "identity": "Lockpick",
    "archetype": "Criminal",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Nightwork",
    "identity": "Nightwork",
    "archetype": "Criminal",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Outlaw",
    "identity": "Outlaw",
    "archetype": "Criminal",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Pilfer",
    "identity": "Pilfer",
    "archetype": "Criminal",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Smokescreen",
    "identity": "Smokescreen",
    "archetype": "Criminal",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "False",
    "identity": "False",
    "archetype": "Criminal",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Clean",
    "identity": "Clean",
    "archetype": "Criminal",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Lockstep",
    "identity": "Lockstep",
    "archetype": "Criminal",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Inside",
    "identity": "Inside",
    "archetype": "Criminal",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Unlisted",
    "identity": "Unlisted",
    "archetype": "Criminal",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Stolen",
    "identity": "Stolen",
    "archetype": "Criminal",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Bramble",
    "identity": "Bramble",
    "archetype": "Druid",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Cloudroot",
    "identity": "Cloudroot",
    "archetype": "Druid",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Greenward",
    "identity": "Greenward",
    "archetype": "Druid",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Cloudherald",
    "identity": "Cloudherald",
    "archetype": "Druid",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Seedheart",
    "identity": "Seedheart",
    "archetype": "Druid",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Thornwake",
    "identity": "Thornwake",
    "archetype": "Druid",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Wildwood",
    "identity": "Wildwood",
    "archetype": "Druid",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Winterbloom",
    "identity": "Winterbloom",
    "archetype": "Druid",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Rootsong",
    "identity": "Rootsong",
    "archetype": "Druid",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Mossheart",
    "identity": "Mossheart",
    "archetype": "Druid",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Verdant",
    "identity": "Verdant",
    "archetype": "Druid",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Seasonal",
    "identity": "Seasonal",
    "archetype": "Druid",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Primal",
    "identity": "Primal",
    "archetype": "Druid",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Overgrowth",
    "identity": "Overgrowth",
    "archetype": "Druid",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Blightbane",
    "identity": "Blightbane",
    "archetype": "Eco Terrorist",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Reclaimer",
    "identity": "Reclaimer",
    "archetype": "Eco Terrorist",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Sporestorm",
    "identity": "Sporestorm",
    "archetype": "Eco Terrorist",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Wildjustice",
    "identity": "Wildjustice",
    "archetype": "Eco Terrorist",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Worldscar",
    "identity": "Worldscar",
    "archetype": "Eco Terrorist",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Toxic",
    "identity": "Toxic",
    "archetype": "Eco Terrorist",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Seed",
    "identity": "Seed",
    "archetype": "Eco Terrorist",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Clearcut",
    "identity": "Clearcut",
    "archetype": "Eco Terrorist",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Rewild",
    "identity": "Rewild",
    "archetype": "Eco Terrorist",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Ash",
    "identity": "Ash",
    "archetype": "Eco Terrorist",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Restoration",
    "identity": "Restoration",
    "archetype": "Eco Terrorist",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Unbroken",
    "identity": "Unbroken",
    "archetype": "Eco Terrorist",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Vengeful",
    "identity": "Vengeful",
    "archetype": "Eco Terrorist",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Canopy",
    "identity": "Canopy",
    "archetype": "Eco Terrorist",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Buyout",
    "identity": "Buyout",
    "archetype": "Ex-Company Man",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Deadstock",
    "identity": "Deadstock",
    "archetype": "Ex-Company Man",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Severance",
    "identity": "Severance",
    "archetype": "Ex-Company Man",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Shareholder",
    "identity": "Shareholder",
    "archetype": "Ex-Company Man",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Turncoat",
    "identity": "Turncoat",
    "archetype": "Ex-Company Man",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Writeoff",
    "identity": "Writeoff",
    "archetype": "Ex-Company Man",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Boardroom",
    "identity": "Boardroom",
    "archetype": "Ex-Company Man",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Corneroffice",
    "identity": "Corneroffice",
    "archetype": "Ex-Company Man",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Exit",
    "identity": "Exit",
    "archetype": "Ex-Company Man",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Hostile",
    "identity": "Hostile",
    "archetype": "Ex-Company Man",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Intermediary",
    "identity": "Intermediary",
    "archetype": "Ex-Company Man",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Disavowed",
    "identity": "Disavowed",
    "archetype": "Ex-Company Man",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Corporate",
    "identity": "Corporate",
    "archetype": "Ex-Company Man",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Legacy",
    "identity": "Legacy",
    "archetype": "Ex-Company Man",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Backbadge",
    "identity": "Backbadge",
    "archetype": "Ex-Cop",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Bluefall",
    "identity": "Bluefall",
    "archetype": "Ex-Cop",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Gumshoe",
    "identity": "Gumshoe",
    "archetype": "Ex-Cop",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Coldcase",
    "identity": "Coldcase",
    "archetype": "Ex-Cop",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Oldshield",
    "identity": "Oldshield",
    "archetype": "Ex-Cop",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Precinct",
    "identity": "Precinct",
    "archetype": "Ex-Cop",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Renegade",
    "identity": "Renegade",
    "archetype": "Ex-Cop",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Watchman",
    "identity": "Watchman",
    "archetype": "Ex-Cop",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Beatwalker",
    "identity": "Beatwalker",
    "archetype": "Ex-Cop",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Case",
    "identity": "Case",
    "archetype": "Ex-Cop",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Procedural",
    "identity": "Procedural",
    "archetype": "Ex-Cop",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Dogged",
    "identity": "Dogged",
    "archetype": "Ex-Cop",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Streetwise",
    "identity": "Streetwise",
    "archetype": "Ex-Cop",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Unbadged",
    "identity": "Unbadged",
    "archetype": "Ex-Cop",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Battleworn",
    "identity": "Battleworn",
    "archetype": "Ex-Military",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Campaigner",
    "identity": "Campaigner",
    "archetype": "Ex-Military",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Dogtag",
    "identity": "Dogtag",
    "archetype": "Ex-Military",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Lastpost",
    "identity": "Lastpost",
    "archetype": "Ex-Military",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Mustang",
    "identity": "Mustang",
    "archetype": "Ex-Military",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Retread",
    "identity": "Retread",
    "archetype": "Ex-Military",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Veteran",
    "identity": "Veteran",
    "archetype": "Ex-Military",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Unit",
    "identity": "Unit",
    "archetype": "Ex-Military",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Marchsteel",
    "identity": "Marchsteel",
    "archetype": "Ex-Military",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Field",
    "identity": "Field",
    "archetype": "Ex-Military",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Decorated",
    "identity": "Decorated",
    "archetype": "Ex-Military",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Discharged",
    "identity": "Discharged",
    "archetype": "Ex-Military",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Regiment",
    "identity": "Regiment",
    "archetype": "Ex-Military",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Service",
    "identity": "Service",
    "archetype": "Ex-Military",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Caliper",
    "identity": "Caliper",
    "archetype": "Cog",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Clockmind",
    "identity": "Clockmind",
    "archetype": "Cog",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Finegrain",
    "identity": "Finegrain",
    "archetype": "Cog",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Measure",
    "identity": "Measure",
    "archetype": "Cog",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Plumbline",
    "identity": "Plumbline",
    "archetype": "Cog",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Primework",
    "identity": "Primework",
    "archetype": "Cog",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Tolerance",
    "identity": "Tolerance",
    "archetype": "Cog",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Truelevel",
    "identity": "Truelevel",
    "archetype": "Cog",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Fine",
    "identity": "Fine",
    "archetype": "Cog",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Maker",
    "identity": "Maker",
    "archetype": "Cog",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "True",
    "identity": "True",
    "archetype": "Cog",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Masterwork",
    "identity": "Masterwork",
    "archetype": "Cog",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Calibrator",
    "identity": "Calibrator",
    "archetype": "Cog",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Handbuilt",
    "identity": "Handbuilt",
    "archetype": "Cog",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Allure",
    "identity": "Allure",
    "archetype": "Face",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Charmcraft",
    "identity": "Charmcraft",
    "archetype": "Face",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Dawnprime",
    "identity": "Dawnprime",
    "archetype": "Face",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Magnetism",
    "identity": "Magnetism",
    "archetype": "Face",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Silvertongue",
    "identity": "Silvertongue",
    "archetype": "Face",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Velvetvoice",
    "identity": "Velvetvoice",
    "archetype": "Face",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Winsome",
    "identity": "Winsome",
    "archetype": "Face",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Spotlight",
    "identity": "Spotlight",
    "archetype": "Face",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Easy",
    "identity": "Easy",
    "archetype": "Face",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Good",
    "identity": "Good",
    "archetype": "Face",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Tailored",
    "identity": "Tailored",
    "archetype": "Face",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Polished",
    "identity": "Polished",
    "archetype": "Face",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Graci",
    "identity": "Graci",
    "archetype": "Face",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Beloved",
    "identity": "Beloved",
    "archetype": "Face",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Broker",
    "identity": "Broker",
    "archetype": "Fixer",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Crossroads",
    "identity": "Crossroads",
    "archetype": "Fixer",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Favorbank",
    "identity": "Favorbank",
    "archetype": "Fixer",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Dealwire",
    "identity": "Dealwire",
    "archetype": "Fixer",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Middleman",
    "identity": "Middleman",
    "archetype": "Fixer",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Openline",
    "identity": "Openline",
    "archetype": "Fixer",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Switchboard",
    "identity": "Switchboard",
    "archetype": "Fixer",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Waymaker",
    "identity": "Waymaker",
    "archetype": "Fixer",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Linkmaster",
    "identity": "Linkmaster",
    "archetype": "Fixer",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Rare",
    "identity": "Rare",
    "archetype": "Fixer",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Right",
    "identity": "Right",
    "archetype": "Fixer",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Back",
    "identity": "Back",
    "archetype": "Fixer",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Supply",
    "identity": "Supply",
    "archetype": "Fixer",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Resourceful",
    "identity": "Resourceful",
    "archetype": "Fixer",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Backalley",
    "identity": "Backalley",
    "archetype": "Ganger",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Wardboss",
    "identity": "Wardboss",
    "archetype": "Ganger",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Hardknuckle",
    "identity": "Hardknuckle",
    "archetype": "Ganger",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Localboy",
    "identity": "Localboy",
    "archetype": "Ganger",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Turfguard",
    "identity": "Turfguard",
    "archetype": "Ganger",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Yardboss",
    "identity": "Yardboss",
    "archetype": "Ganger",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Rumblejack",
    "identity": "Rumblejack",
    "archetype": "Ganger",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Block",
    "identity": "Block",
    "archetype": "Ganger",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Home",
    "identity": "Home",
    "archetype": "Ganger",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Alley",
    "identity": "Alley",
    "archetype": "Ganger",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Scarred",
    "identity": "Scarred",
    "archetype": "Ganger",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Loyal",
    "identity": "Loyal",
    "archetype": "Ganger",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Neighbor",
    "identity": "Neighbor",
    "archetype": "Ganger",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Graffiti",
    "identity": "Graffiti",
    "archetype": "Ganger",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Dateline",
    "identity": "Dateline",
    "archetype": "Gonzo Journalist",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Eyewitness",
    "identity": "Eyewitness",
    "archetype": "Gonzo Journalist",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Frontpage",
    "identity": "Frontpage",
    "archetype": "Gonzo Journalist",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Hotcopy",
    "identity": "Hotcopy",
    "archetype": "Gonzo Journalist",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Livewire",
    "identity": "Livewire",
    "archetype": "Gonzo Journalist",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Newsbreak",
    "identity": "Newsbreak",
    "archetype": "Gonzo Journalist",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Truthhound",
    "identity": "Truthhound",
    "archetype": "Gonzo Journalist",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Unedited",
    "identity": "Unedited",
    "archetype": "Gonzo Journalist",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Hot",
    "identity": "Hot",
    "archetype": "Gonzo Journalist",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Byline",
    "identity": "Byline",
    "archetype": "Gonzo Journalist",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Live",
    "identity": "Live",
    "archetype": "Gonzo Journalist",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Unfiltered",
    "identity": "Unfiltered",
    "archetype": "Gonzo Journalist",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Uncensored",
    "identity": "Uncensored",
    "archetype": "Gonzo Journalist",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Embedded",
    "identity": "Embedded",
    "archetype": "Gonzo Journalist",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Quickbrace",
    "identity": "Quickbrace",
    "archetype": "Gunslinger",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Deadeye",
    "identity": "Deadeye",
    "archetype": "Gunslinger",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Gunmetal",
    "identity": "Gunmetal",
    "archetype": "Gunslinger",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Hairtrigger",
    "identity": "Hairtrigger",
    "archetype": "Gunslinger",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Highnoon",
    "identity": "Highnoon",
    "archetype": "Gunslinger",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Longshot",
    "identity": "Longshot",
    "archetype": "Gunslinger",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Sidewinder",
    "identity": "Sidewinder",
    "archetype": "Gunslinger",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Peacemaker",
    "identity": "Peacemaker",
    "archetype": "Gunslinger",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Ricochet",
    "identity": "Ricochet",
    "archetype": "Gunslinger",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Sightline",
    "identity": "Sightline",
    "archetype": "Gunslinger",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Fastdraw",
    "identity": "Fastdraw",
    "archetype": "Gunslinger",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Truehand",
    "identity": "Truehand",
    "archetype": "Gunslinger",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Dustborn",
    "identity": "Dustborn",
    "archetype": "Gunslinger",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Steady",
    "identity": "Steady",
    "archetype": "Gunslinger",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Backdoor",
    "identity": "Backdoor",
    "archetype": "Hacker",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Cipherpunk",
    "identity": "Cipherpunk",
    "archetype": "Hacker",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Wakecycle",
    "identity": "Wakecycle",
    "archetype": "Hacker",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Nullroot",
    "identity": "Nullroot",
    "archetype": "Hacker",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Packetknife",
    "identity": "Packetknife",
    "archetype": "Hacker",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Daybreaker",
    "identity": "Daybreaker",
    "archetype": "Hacker",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Side",
    "identity": "Side",
    "archetype": "Hacker",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Dark",
    "identity": "Dark",
    "archetype": "Hacker",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Freeware",
    "identity": "Freeware",
    "archetype": "Hacker",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Cryptsealed",
    "identity": "Cryptsealed",
    "archetype": "Hacker",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Rooted",
    "identity": "Rooted",
    "archetype": "Hacker",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Airgapped",
    "identity": "Airgapped",
    "archetype": "Hacker",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Unpatched",
    "identity": "Unpatched",
    "archetype": "Hacker",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Jailbroken",
    "identity": "Jailbroken",
    "archetype": "Hacker",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Blastcap",
    "identity": "Blastcap",
    "archetype": "Mad Bomber",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Deadman",
    "identity": "Deadman",
    "archetype": "Mad Bomber",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Firecracker",
    "identity": "Firecracker",
    "archetype": "Mad Bomber",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Fusebox",
    "identity": "Fusebox",
    "archetype": "Mad Bomber",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Hotwire",
    "identity": "Hotwire",
    "archetype": "Mad Bomber",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Warhead",
    "identity": "Warhead",
    "archetype": "Mad Bomber",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Redbutton",
    "identity": "Redbutton",
    "archetype": "Mad Bomber",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Timer",
    "identity": "Timer",
    "archetype": "Mad Bomber",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Ticktock",
    "identity": "Ticktock",
    "archetype": "Mad Bomber",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Loud",
    "identity": "Loud",
    "archetype": "Mad Bomber",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Volatile",
    "identity": "Volatile",
    "archetype": "Mad Bomber",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Timed",
    "identity": "Timed",
    "archetype": "Mad Bomber",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Shaped",
    "identity": "Shaped",
    "archetype": "Mad Bomber",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Detonator",
    "identity": "Detonator",
    "archetype": "Mad Bomber",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Arcanist",
    "identity": "Arcanist",
    "archetype": "Mage",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Hexlight",
    "identity": "Hexlight",
    "archetype": "Mage",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Leywalker",
    "identity": "Leywalker",
    "archetype": "Mage",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Manaforge",
    "identity": "Manaforge",
    "archetype": "Mage",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Runesmith",
    "identity": "Runesmith",
    "archetype": "Mage",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Spellbound",
    "identity": "Spellbound",
    "archetype": "Mage",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Thaumaturge",
    "identity": "Thaumaturge",
    "archetype": "Mage",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Witchwire",
    "identity": "Witchwire",
    "archetype": "Mage",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Leyline",
    "identity": "Leyline",
    "archetype": "Mage",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Runewire",
    "identity": "Runewire",
    "archetype": "Mage",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Mana",
    "identity": "Mana",
    "archetype": "Mage",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Enchanted",
    "identity": "Enchanted",
    "archetype": "Mage",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Runed",
    "identity": "Runed",
    "archetype": "Mage",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Mystic",
    "identity": "Mystic",
    "archetype": "Mage",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Freeblade",
    "identity": "Freeblade",
    "archetype": "Mercenary",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Gunhand",
    "identity": "Gunhand",
    "archetype": "Mercenary",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Payday",
    "identity": "Payday",
    "archetype": "Mercenary",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Retainer",
    "identity": "Retainer",
    "archetype": "Mercenary",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Soldier",
    "identity": "Soldier",
    "archetype": "Mercenary",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Warbond",
    "identity": "Warbond",
    "archetype": "Mercenary",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Hiredgun",
    "identity": "Hiredgun",
    "archetype": "Mercenary",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Paygrade",
    "identity": "Paygrade",
    "archetype": "Mercenary",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Escrow",
    "identity": "Escrow",
    "archetype": "Mercenary",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Hazard",
    "identity": "Hazard",
    "archetype": "Mercenary",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Cashfire",
    "identity": "Cashfire",
    "archetype": "Mercenary",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Terms",
    "identity": "Terms",
    "archetype": "Mercenary",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Professional",
    "identity": "Professional",
    "archetype": "Mercenary",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Freelancer",
    "identity": "Freelancer",
    "archetype": "Mercenary",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Centerline",
    "identity": "Centerline",
    "archetype": "Monk",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Emptyhand",
    "identity": "Emptyhand",
    "archetype": "Monk",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Evenstep",
    "identity": "Evenstep",
    "archetype": "Monk",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Flowstate",
    "identity": "Flowstate",
    "archetype": "Monk",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Stillwater",
    "identity": "Stillwater",
    "archetype": "Monk",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Truebalance",
    "identity": "Truebalance",
    "archetype": "Monk",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Ironcalm",
    "identity": "Ironcalm",
    "archetype": "Monk",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Wayfarer",
    "identity": "Wayfarer",
    "archetype": "Monk",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Equanimity",
    "identity": "Equanimity",
    "archetype": "Monk",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Koan",
    "identity": "Koan",
    "archetype": "Monk",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Discipline",
    "identity": "Discipline",
    "archetype": "Monk",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Weightless",
    "identity": "Weightless",
    "archetype": "Monk",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Mindful",
    "identity": "Mindful",
    "archetype": "Monk",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Moonblade",
    "identity": "Moonblade",
    "archetype": "Ninja",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Veilstrike",
    "identity": "Veilstrike",
    "archetype": "Ninja",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Quietknife",
    "identity": "Quietknife",
    "archetype": "Ninja",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Shadowless",
    "identity": "Shadowless",
    "archetype": "Ninja",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Softfall",
    "identity": "Softfall",
    "archetype": "Ninja",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Whisperstep",
    "identity": "Whisperstep",
    "archetype": "Ninja",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Shuriken",
    "identity": "Shuriken",
    "archetype": "Ninja",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Silkblade",
    "identity": "Silkblade",
    "archetype": "Ninja",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Moonless",
    "identity": "Moonless",
    "archetype": "Ninja",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Nocturne",
    "identity": "Nocturne",
    "archetype": "Ninja",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Roofline",
    "identity": "Roofline",
    "archetype": "Ninja",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Unseen",
    "identity": "Unseen",
    "archetype": "Ninja",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Soundless",
    "identity": "Soundless",
    "archetype": "Ninja",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Applause",
    "identity": "Applause",
    "archetype": "Performer",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Curtaincall",
    "identity": "Curtaincall",
    "archetype": "Performer",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Ovation",
    "identity": "Ovation",
    "archetype": "Performer",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Headliner",
    "identity": "Headliner",
    "archetype": "Performer",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Showstopper",
    "identity": "Showstopper",
    "archetype": "Performer",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Songbird",
    "identity": "Songbird",
    "archetype": "Performer",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Encore",
    "identity": "Encore",
    "archetype": "Performer",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Standing",
    "identity": "Standing",
    "archetype": "Performer",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Stagefire",
    "identity": "Stagefire",
    "archetype": "Performer",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Resonant",
    "identity": "Resonant",
    "archetype": "Performer",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Melodic",
    "identity": "Melodic",
    "archetype": "Performer",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Dazzling",
    "identity": "Dazzling",
    "archetype": "Performer",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Virtuoso",
    "identity": "Virtuoso",
    "archetype": "Performer",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Cluefinder",
    "identity": "Cluefinder",
    "archetype": "Private Eye/Investigator",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Greycell",
    "identity": "Greycell",
    "archetype": "Private Eye/Investigator",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Hunch",
    "identity": "Hunch",
    "archetype": "Private Eye/Investigator",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Lamplight",
    "identity": "Lamplight",
    "archetype": "Private Eye/Investigator",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "LooseThread",
    "identity": "LooseThread",
    "archetype": "Private Eye/Investigator",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Questioner",
    "identity": "Questioner",
    "archetype": "Private Eye/Investigator",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Sleuth",
    "identity": "Sleuth",
    "archetype": "Private Eye/Investigator",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Tellmark",
    "identity": "Tellmark",
    "archetype": "Private Eye/Investigator",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Casefile",
    "identity": "Casefile",
    "archetype": "Private Eye/Investigator",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Missing",
    "identity": "Missing",
    "archetype": "Private Eye/Investigator",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Shoeleather",
    "identity": "Shoeleather",
    "archetype": "Private Eye/Investigator",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Inquisitive",
    "identity": "Inquisitive",
    "archetype": "Private Eye/Investigator",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Tenacious",
    "identity": "Tenacious",
    "archetype": "Private Eye/Investigator",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Sonicboom",
    "identity": "Sonicboom",
    "archetype": "Screamer",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Feedback",
    "identity": "Feedback",
    "archetype": "Screamer",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Howler",
    "identity": "Howler",
    "archetype": "Screamer",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Loudmouth",
    "identity": "Loudmouth",
    "archetype": "Screamer",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Overtone",
    "identity": "Overtone",
    "archetype": "Screamer",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Shriek",
    "identity": "Shriek",
    "archetype": "Screamer",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Thunderlung",
    "identity": "Thunderlung",
    "archetype": "Screamer",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Redline",
    "identity": "Redline",
    "archetype": "Screamer",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Ampstorm",
    "identity": "Ampstorm",
    "archetype": "Screamer",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Limiterless",
    "identity": "Limiterless",
    "archetype": "Screamer",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Burnout",
    "identity": "Burnout",
    "archetype": "Screamer",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Fast",
    "identity": "Fast",
    "archetype": "Screamer",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Overclocked",
    "identity": "Overclocked",
    "archetype": "Screamer",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Forebear",
    "identity": "Forebear",
    "archetype": "Shaman",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Dreamwalker",
    "identity": "Dreamwalker",
    "archetype": "Shaman",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Omen",
    "identity": "Omen",
    "archetype": "Shaman",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Spiritbridge",
    "identity": "Spiritbridge",
    "archetype": "Shaman",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Totemheart",
    "identity": "Totemheart",
    "archetype": "Shaman",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Trance",
    "identity": "Trance",
    "archetype": "Shaman",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Visionquest",
    "identity": "Visionquest",
    "archetype": "Shaman",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Soulkeeper",
    "identity": "Soulkeeper",
    "archetype": "Shaman",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Medicinewheel",
    "identity": "Medicinewheel",
    "archetype": "Shaman",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Psychopomp",
    "identity": "Psychopomp",
    "archetype": "Shaman",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Ancestor",
    "identity": "Ancestor",
    "archetype": "Shaman",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Other",
    "identity": "Other",
    "archetype": "Shaman",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Ritual",
    "identity": "Ritual",
    "archetype": "Shaman",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Undernet",
    "identity": "Undernet",
    "archetype": "Smuggler",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Cargojack",
    "identity": "Cargojack",
    "archetype": "Smuggler",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Freeport",
    "identity": "Freeport",
    "archetype": "Smuggler",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Hiddenhold",
    "identity": "Hiddenhold",
    "archetype": "Smuggler",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Slipstream",
    "identity": "Slipstream",
    "archetype": "Smuggler",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Waybill",
    "identity": "Waybill",
    "archetype": "Smuggler",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Moonrunner",
    "identity": "Moonrunner",
    "archetype": "Smuggler",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Starcargo",
    "identity": "Starcargo",
    "archetype": "Smuggler",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Lowsign",
    "identity": "Lowsign",
    "archetype": "Smuggler",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Unmanifested",
    "identity": "Unmanifested",
    "archetype": "Smuggler",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Borderless",
    "identity": "Borderless",
    "archetype": "Smuggler",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Unsearchable",
    "identity": "Unsearchable",
    "archetype": "Smuggler",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Offroute",
    "identity": "Offroute",
    "archetype": "Smuggler",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Farpoint",
    "identity": "Farpoint",
    "archetype": "Sniper",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Longglass",
    "identity": "Longglass",
    "archetype": "Sniper",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Marksman",
    "identity": "Marksman",
    "archetype": "Sniper",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Onebreath",
    "identity": "Onebreath",
    "archetype": "Sniper",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Pinpoint",
    "identity": "Pinpoint",
    "archetype": "Sniper",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Windreader",
    "identity": "Windreader",
    "archetype": "Sniper",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Bullseye",
    "identity": "Bullseye",
    "archetype": "Sniper",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Killzone",
    "identity": "Killzone",
    "archetype": "Sniper",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Rangefinder",
    "identity": "Rangefinder",
    "archetype": "Sniper",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "One",
    "identity": "One",
    "archetype": "Sniper",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Wind",
    "identity": "Wind",
    "archetype": "Sniper",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Motionless",
    "identity": "Motionless",
    "archetype": "Sniper",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Farseeing",
    "identity": "Farseeing",
    "archetype": "Sniper",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Alias",
    "identity": "Alias",
    "archetype": "Spy",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Coverstory",
    "identity": "Coverstory",
    "archetype": "Spy",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "DeadDrop",
    "identity": "DeadDrop",
    "archetype": "Spy",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Mole",
    "identity": "Mole",
    "archetype": "Spy",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Sleeper",
    "identity": "Sleeper",
    "archetype": "Spy",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Tradecraft",
    "identity": "Tradecraft",
    "archetype": "Spy",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Cryptonym",
    "identity": "Cryptonym",
    "archetype": "Spy",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Cutout",
    "identity": "Cutout",
    "archetype": "Spy",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Double",
    "identity": "Double",
    "archetype": "Spy",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Unknown",
    "identity": "Unknown",
    "archetype": "Spy",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Unmade",
    "identity": "Unmade",
    "archetype": "Spy",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Classified",
    "identity": "Classified",
    "archetype": "Spy",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Counterfeit",
    "identity": "Counterfeit",
    "archetype": "Spy",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Bonepatch",
    "identity": "Bonepatch",
    "archetype": "Street Doc",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Lifeline",
    "identity": "Lifeline",
    "archetype": "Street Doc",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Pulsecheck",
    "identity": "Pulsecheck",
    "archetype": "Street Doc",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Trauma",
    "identity": "Trauma",
    "archetype": "Street Doc",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Suture",
    "identity": "Suture",
    "archetype": "Street Doc",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Triage",
    "identity": "Triage",
    "archetype": "Street Doc",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Bonesaw",
    "identity": "Bonesaw",
    "archetype": "Street Doc",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Medkit",
    "identity": "Medkit",
    "archetype": "Street Doc",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Clinical",
    "identity": "Clinical",
    "archetype": "Street Doc",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Sterile",
    "identity": "Sterile",
    "archetype": "Street Doc",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Lifehold",
    "identity": "Lifehold",
    "archetype": "Street Doc",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Emergency",
    "identity": "Emergency",
    "archetype": "Street Doc",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Unlicensed",
    "identity": "Unlicensed",
    "archetype": "Street Doc",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "ChromeRonin",
    "identity": "ChromeRonin",
    "archetype": "Street Samurai",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Honorbound",
    "identity": "Honorbound",
    "archetype": "Street Samurai",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "NeonBlade",
    "identity": "NeonBlade",
    "archetype": "Street Samurai",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "RedSteel",
    "identity": "RedSteel",
    "archetype": "Street Samurai",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "SwordSaint",
    "identity": "SwordSaint",
    "archetype": "Street Samurai",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "WarriorCode",
    "identity": "WarriorCode",
    "archetype": "Street Samurai",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "ZeroMercy",
    "identity": "ZeroMercy",
    "archetype": "Street Samurai",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Bushido",
    "identity": "Bushido",
    "archetype": "Street Samurai",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Edgewalker",
    "identity": "Edgewalker",
    "archetype": "Street Samurai",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Clanless",
    "identity": "Clanless",
    "archetype": "Street Samurai",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Steel",
    "identity": "Steel",
    "archetype": "Street Samurai",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Cybernetic",
    "identity": "Cybernetic",
    "archetype": "Street Samurai",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Ronin",
    "identity": "Ronin",
    "archetype": "Street Samurai",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Ashpact",
    "identity": "Ashpact",
    "archetype": "Warlock",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Debtkeeper",
    "identity": "Debtkeeper",
    "archetype": "Warlock",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Demonbound",
    "identity": "Demonbound",
    "archetype": "Warlock",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Hellmark",
    "identity": "Hellmark",
    "archetype": "Warlock",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Oathbreaker",
    "identity": "Oathbreaker",
    "archetype": "Warlock",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Voidbargain",
    "identity": "Voidbargain",
    "archetype": "Warlock",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Nethermark",
    "identity": "Nethermark",
    "archetype": "Warlock",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Covenanter",
    "identity": "Covenanter",
    "archetype": "Warlock",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Pactwire",
    "identity": "Pactwire",
    "archetype": "Warlock",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Debt",
    "identity": "Debt",
    "archetype": "Warlock",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Hell",
    "identity": "Hell",
    "archetype": "Warlock",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Bound",
    "identity": "Bound",
    "archetype": "Warlock",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Forbidden",
    "identity": "Forbidden",
    "archetype": "Warlock",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Anvilrage",
    "identity": "Anvilrage",
    "archetype": "Barbarian",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Bailiff",
    "identity": "Bailiff",
    "archetype": "Bounty Hunter",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Analyst",
    "identity": "Analyst",
    "archetype": "Brainiac",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Anointed",
    "identity": "Anointed",
    "archetype": "Cleric",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Assaultline",
    "identity": "Assaultline",
    "archetype": "Commando",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Backroom",
    "identity": "Backroom",
    "archetype": "Criminal",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Barkskin",
    "identity": "Barkskin",
    "archetype": "Druid",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Ashrevolt",
    "identity": "Ashrevolt",
    "archetype": "Eco Terrorist",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Acquisition",
    "identity": "Acquisition",
    "archetype": "Ex-Company Man",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Blueghost",
    "identity": "Blueghost",
    "archetype": "Ex-Cop",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Afteraction",
    "identity": "Afteraction",
    "archetype": "Ex-Military",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Artificer",
    "identity": "Artificer",
    "archetype": "Cog",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Alluring",
    "identity": "Alluring",
    "archetype": "Face",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Brokerage",
    "identity": "Brokerage",
    "archetype": "Fixer",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Alleyborn",
    "identity": "Alleyborn",
    "archetype": "Ganger",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Broadcastor",
    "identity": "Broadcastor",
    "archetype": "Gonzo Journalist",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Backstrap",
    "identity": "Backstrap",
    "archetype": "Gunslinger",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Backdoorer",
    "identity": "Backdoorer",
    "archetype": "Hacker",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Blastmaker",
    "identity": "Blastmaker",
    "archetype": "Mad Bomber",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Arcweaver",
    "identity": "Arcweaver",
    "archetype": "Mage",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Bountyblade",
    "identity": "Bountyblade",
    "archetype": "Mercenary",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Balanceborn",
    "identity": "Balanceborn",
    "archetype": "Monk",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Blacklotus",
    "identity": "Blacklotus",
    "archetype": "Ninja",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Ariachrome",
    "identity": "Ariachrome",
    "archetype": "Performer",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Casehound",
    "identity": "Casehound",
    "archetype": "Private Eye/Investigator",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Amplifier",
    "identity": "Amplifier",
    "archetype": "Screamer",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Ancestorlink",
    "identity": "Ancestorlink",
    "archetype": "Shaman",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Backroute",
    "identity": "Backroute",
    "archetype": "Smuggler",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Breathhold",
    "identity": "Breathhold",
    "archetype": "Sniper",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Aliasmaker",
    "identity": "Aliasmaker",
    "archetype": "Spy",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "BackalleyMD",
    "identity": "BackalleyMD",
    "archetype": "Street Doc",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Bladerunner",
    "identity": "Bladerunner",
    "archetype": "Street Samurai",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Ashcontract",
    "identity": "Ashcontract",
    "archetype": "Warlock",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Boulderfist",
    "identity": "Boulderfist",
    "archetype": "Barbarian",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Blacknotice",
    "identity": "Blacknotice",
    "archetype": "Bounty Hunter",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Axion",
    "identity": "Axion",
    "archetype": "Brainiac",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Beaconheart",
    "identity": "Beaconheart",
    "archetype": "Cleric",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Battlelink",
    "identity": "Battlelink",
    "archetype": "Commando",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Blackmarket",
    "identity": "Blackmarket",
    "archetype": "Criminal",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Bloomheart",
    "identity": "Bloomheart",
    "archetype": "Druid",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Blightfoe",
    "identity": "Blightfoe",
    "archetype": "Eco Terrorist",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Blackbudget",
    "identity": "Blackbudget",
    "archetype": "Ex-Company Man",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Brokenshield",
    "identity": "Brokenshield",
    "archetype": "Ex-Cop",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Battlememory",
    "identity": "Battlememory",
    "archetype": "Ex-Military",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Calibrated",
    "identity": "Calibrated",
    "archetype": "Cog",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Brightpresence",
    "identity": "Brightpresence",
    "archetype": "Face",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Connective",
    "identity": "Connective",
    "archetype": "Fixer",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Blockcaptain",
    "identity": "Blockcaptain",
    "archetype": "Ganger",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Bylineburner",
    "identity": "Bylineburner",
    "archetype": "Gonzo Journalist",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Bulletwise",
    "identity": "Bulletwise",
    "archetype": "Gunslinger",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Breakchain",
    "identity": "Breakchain",
    "archetype": "Barbarian",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Bronzeblood",
    "identity": "Bronzeblood",
    "archetype": "Barbarian",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Cragwrath",
    "identity": "Cragwrath",
    "archetype": "Barbarian",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Dreadmaul",
    "identity": "Dreadmaul",
    "archetype": "Barbarian",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Earthrend",
    "identity": "Earthrend",
    "archetype": "Barbarian",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Emberhide",
    "identity": "Emberhide",
    "archetype": "Barbarian",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Ferocity",
    "identity": "Ferocity",
    "archetype": "Barbarian",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Stonepulse",
    "identity": "Stonepulse",
    "archetype": "Barbarian",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Furywake",
    "identity": "Furywake",
    "archetype": "Barbarian",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Gritstone",
    "identity": "Gritstone",
    "archetype": "Barbarian",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Havoc",
    "identity": "Havoc",
    "archetype": "Barbarian",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Ironroar",
    "identity": "Ironroar",
    "archetype": "Barbarian",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Mountainblood",
    "identity": "Mountainblood",
    "archetype": "Barbarian",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Rampage",
    "identity": "Rampage",
    "archetype": "Barbarian",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Bloodhound",
    "identity": "Bloodhound",
    "archetype": "Bounty Hunter",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Bountymark",
    "identity": "Bountymark",
    "archetype": "Bounty Hunter",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Brasswarrant",
    "identity": "Brasswarrant",
    "archetype": "Bounty Hunter",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Catcher",
    "identity": "Catcher",
    "archetype": "Bounty Hunter",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Chaintrail",
    "identity": "Chaintrail",
    "archetype": "Bounty Hunter",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Coldtrail",
    "identity": "Coldtrail",
    "archetype": "Bounty Hunter",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Deadreckon",
    "identity": "Deadreckon",
    "archetype": "Bounty Hunter",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Fugitivebane",
    "identity": "Fugitivebane",
    "archetype": "Bounty Hunter",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Hardproof",
    "identity": "Hardproof",
    "archetype": "Bounty Hunter",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Manhunter",
    "identity": "Manhunter",
    "archetype": "Bounty Hunter",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Redledger",
    "identity": "Redledger",
    "archetype": "Bounty Hunter",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Retributor",
    "identity": "Retributor",
    "archetype": "Bounty Hunter",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Scentlock",
    "identity": "Scentlock",
    "archetype": "Bounty Hunter",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Surecapture",
    "identity": "Surecapture",
    "archetype": "Bounty Hunter",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Brightlogic",
    "identity": "Brightlogic",
    "archetype": "Brainiac",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Cerebralist",
    "identity": "Cerebralist",
    "archetype": "Brainiac",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Conjecture",
    "identity": "Conjecture",
    "archetype": "Brainiac",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Cortexian",
    "identity": "Cortexian",
    "archetype": "Brainiac",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Deduction",
    "identity": "Deduction",
    "archetype": "Brainiac",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Deepreason",
    "identity": "Deepreason",
    "archetype": "Brainiac",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Forecaster",
    "identity": "Forecaster",
    "archetype": "Brainiac",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Ideamaker",
    "identity": "Ideamaker",
    "archetype": "Brainiac",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Intellect",
    "identity": "Intellect",
    "archetype": "Brainiac",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Loreengine",
    "identity": "Loreengine",
    "archetype": "Brainiac",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Mindvault",
    "identity": "Mindvault",
    "archetype": "Brainiac",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Proofsmith",
    "identity": "Proofsmith",
    "archetype": "Brainiac",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Rationale",
    "identity": "Rationale",
    "archetype": "Brainiac",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Savant",
    "identity": "Savant",
    "archetype": "Brainiac",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Blessing",
    "identity": "Blessing",
    "archetype": "Cleric",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Canon",
    "identity": "Canon",
    "archetype": "Cleric",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Dawnmercy",
    "identity": "Dawnmercy",
    "archetype": "Cleric",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Devotion",
    "identity": "Devotion",
    "archetype": "Cleric",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Faithguard",
    "identity": "Faithguard",
    "archetype": "Cleric",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Gracewire",
    "identity": "Gracewire",
    "archetype": "Cleric",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Haloheart",
    "identity": "Haloheart",
    "archetype": "Cleric",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Hymnkeeper",
    "identity": "Hymnkeeper",
    "archetype": "Cleric",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Lightbearer",
    "identity": "Lightbearer",
    "archetype": "Cleric",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Mendicant",
    "identity": "Mendicant",
    "archetype": "Cleric",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Penance",
    "identity": "Penance",
    "archetype": "Cleric",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Prayersteel",
    "identity": "Prayersteel",
    "archetype": "Cleric",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Saintwire",
    "identity": "Saintwire",
    "archetype": "Cleric",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Shrineward",
    "identity": "Shrineward",
    "archetype": "Cleric",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Breacher",
    "identity": "Breacher",
    "archetype": "Commando",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Commandpoint",
    "identity": "Commandpoint",
    "archetype": "Commando",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Dropzone",
    "identity": "Dropzone",
    "archetype": "Commando",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Fireteamlead",
    "identity": "Fireteamlead",
    "archetype": "Commando",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Forwardbase",
    "identity": "Forwardbase",
    "archetype": "Commando",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Hardtarget",
    "identity": "Hardtarget",
    "archetype": "Commando",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Infiltrator",
    "identity": "Infiltrator",
    "archetype": "Commando",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Missionlock",
    "identity": "Missionlock",
    "archetype": "Commando",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "PathfinderPrime",
    "identity": "PathfinderPrime",
    "archetype": "Commando",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Raidborn",
    "identity": "Raidborn",
    "archetype": "Commando",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Shocktrooper",
    "identity": "Shocktrooper",
    "archetype": "Commando",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Spearpoint",
    "identity": "Spearpoint",
    "archetype": "Commando",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Strikeleader",
    "identity": "Strikeleader",
    "archetype": "Commando",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Tacticalmind",
    "identity": "Tacticalmind",
    "archetype": "Commando",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Burglar",
    "identity": "Burglar",
    "archetype": "Criminal",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Contrabandist",
    "identity": "Contrabandist",
    "archetype": "Criminal",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Crimewave",
    "identity": "Crimewave",
    "archetype": "Criminal",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Fencehand",
    "identity": "Fencehand",
    "archetype": "Criminal",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Getaway",
    "identity": "Getaway",
    "archetype": "Criminal",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Heistborn",
    "identity": "Heistborn",
    "archetype": "Criminal",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Insidejob",
    "identity": "Insidejob",
    "archetype": "Criminal",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Larceny",
    "identity": "Larceny",
    "archetype": "Criminal",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Outlawcode",
    "identity": "Outlawcode",
    "archetype": "Criminal",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Safecracker",
    "identity": "Safecracker",
    "archetype": "Criminal",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Shadowdeal",
    "identity": "Shadowdeal",
    "archetype": "Criminal",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Underworld",
    "identity": "Underworld",
    "archetype": "Criminal",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Kingpin",
    "identity": "Kingpin",
    "archetype": "Criminal",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Cutpurse",
    "identity": "Cutpurse",
    "archetype": "Criminal",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Canopyguard",
    "identity": "Canopyguard",
    "archetype": "Druid",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Earthsong",
    "identity": "Earthsong",
    "archetype": "Druid",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Fernwake",
    "identity": "Fernwake",
    "archetype": "Druid",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Greenwarden",
    "identity": "Greenwarden",
    "archetype": "Druid",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Groveborn",
    "identity": "Groveborn",
    "archetype": "Druid",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Leafspeaker",
    "identity": "Leafspeaker",
    "archetype": "Druid",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Mosscloak",
    "identity": "Mosscloak",
    "archetype": "Druid",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Rainroot",
    "identity": "Rainroot",
    "archetype": "Druid",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Seedkeeper",
    "identity": "Seedkeeper",
    "archetype": "Druid",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Soilbound",
    "identity": "Soilbound",
    "archetype": "Druid",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Thornkin",
    "identity": "Thornkin",
    "archetype": "Druid",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Treepulse",
    "identity": "Treepulse",
    "archetype": "Druid",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Verdancy",
    "identity": "Verdancy",
    "archetype": "Druid",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Wildgrowth",
    "identity": "Wildgrowth",
    "archetype": "Druid",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Earthvengeance",
    "identity": "Earthvengeance",
    "archetype": "Eco Terrorist",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Ecorage",
    "identity": "Ecorage",
    "archetype": "Eco Terrorist",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Greenavenger",
    "identity": "Greenavenger",
    "archetype": "Eco Terrorist",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Habitatwrath",
    "identity": "Habitatwrath",
    "archetype": "Eco Terrorist",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Naturestrike",
    "identity": "Naturestrike",
    "archetype": "Eco Terrorist",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Poisonroot",
    "identity": "Poisonroot",
    "archetype": "Eco Terrorist",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Reclamation",
    "identity": "Reclamation",
    "archetype": "Eco Terrorist",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Sabotage",
    "identity": "Sabotage",
    "archetype": "Eco Terrorist",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Seedbomb",
    "identity": "Seedbomb",
    "archetype": "Eco Terrorist",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Sporewar",
    "identity": "Sporewar",
    "archetype": "Eco Terrorist",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Thornjustice",
    "identity": "Thornjustice",
    "archetype": "Eco Terrorist",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Toxinscourge",
    "identity": "Toxinscourge",
    "archetype": "Eco Terrorist",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Verdantfury",
    "identity": "Verdantfury",
    "archetype": "Eco Terrorist",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Wildreprisal",
    "identity": "Wildreprisal",
    "archetype": "Eco Terrorist",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Boardbreaker",
    "identity": "Boardbreaker",
    "archetype": "Ex-Company Man",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Buyoutking",
    "identity": "Buyoutking",
    "archetype": "Ex-Company Man",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Corporateghost",
    "identity": "Corporateghost",
    "archetype": "Ex-Company Man",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Deadportfolio",
    "identity": "Deadportfolio",
    "archetype": "Ex-Company Man",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Exitclause",
    "identity": "Exitclause",
    "archetype": "Ex-Company Man",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Goldenparachute",
    "identity": "Goldenparachute",
    "archetype": "Ex-Company Man",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Hostiletakeover",
    "identity": "Hostiletakeover",
    "archetype": "Ex-Company Man",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Insider",
    "identity": "Insider",
    "archetype": "Ex-Company Man",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Severancepackage",
    "identity": "Severancepackage",
    "archetype": "Ex-Company Man",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Shareburn",
    "identity": "Shareburn",
    "archetype": "Ex-Company Man",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Stockfall",
    "identity": "Stockfall",
    "archetype": "Ex-Company Man",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Suitbreaker",
    "identity": "Suitbreaker",
    "archetype": "Ex-Company Man",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Terminated",
    "identity": "Terminated",
    "archetype": "Ex-Company Man",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "TradeSecret",
    "identity": "TradeSecret",
    "archetype": "Ex-Company Man",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Casecloser",
    "identity": "Casecloser",
    "archetype": "Ex-Cop",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Coldprecinct",
    "identity": "Coldprecinct",
    "archetype": "Ex-Cop",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Detectivewire",
    "identity": "Detectivewire",
    "archetype": "Ex-Cop",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Evidencehand",
    "identity": "Evidencehand",
    "archetype": "Ex-Cop",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Formerlaw",
    "identity": "Formerlaw",
    "archetype": "Ex-Cop",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Greywatch",
    "identity": "Greywatch",
    "archetype": "Ex-Cop",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Interrogator",
    "identity": "Interrogator",
    "archetype": "Ex-Cop",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Oldpatrol",
    "identity": "Oldpatrol",
    "archetype": "Ex-Cop",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Plainclothes",
    "identity": "Plainclothes",
    "archetype": "Ex-Cop",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Roguebadge",
    "identity": "Roguebadge",
    "archetype": "Ex-Cop",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Streetjustice",
    "identity": "Streetjustice",
    "archetype": "Ex-Cop",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Thinblue",
    "identity": "Thinblue",
    "archetype": "Ex-Cop",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Unsworn",
    "identity": "Unsworn",
    "archetype": "Ex-Cop",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Watchbreaker",
    "identity": "Watchbreaker",
    "archetype": "Ex-Cop",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Campaignborn",
    "identity": "Campaignborn",
    "archetype": "Ex-Military",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Combatvet",
    "identity": "Combatvet",
    "archetype": "Ex-Military",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Demobilized",
    "identity": "Demobilized",
    "archetype": "Ex-Military",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Fieldtested",
    "identity": "Fieldtested",
    "archetype": "Ex-Military",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Formerbrass",
    "identity": "Formerbrass",
    "archetype": "Ex-Military",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Lastmission",
    "identity": "Lastmission",
    "archetype": "Ex-Military",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Musterout",
    "identity": "Musterout",
    "archetype": "Ex-Military",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Oldsoldier",
    "identity": "Oldsoldier",
    "archetype": "Ex-Military",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Retiredgun",
    "identity": "Retiredgun",
    "archetype": "Ex-Military",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Serviceworn",
    "identity": "Serviceworn",
    "archetype": "Ex-Military",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Shellshock",
    "identity": "Shellshock",
    "archetype": "Ex-Military",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Unitghost",
    "identity": "Unitghost",
    "archetype": "Ex-Military",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Warremnant",
    "identity": "Warremnant",
    "archetype": "Ex-Military",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Woundstripe",
    "identity": "Woundstripe",
    "archetype": "Ex-Military",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Clockbrain",
    "identity": "Clockbrain",
    "archetype": "Cog",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Craftmind",
    "identity": "Craftmind",
    "archetype": "Cog",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Exactitude",
    "identity": "Exactitude",
    "archetype": "Cog",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Finework",
    "identity": "Finework",
    "archetype": "Cog",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Gaugehand",
    "identity": "Gaugehand",
    "archetype": "Cog",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Gearwright",
    "identity": "Gearwright",
    "archetype": "Cog",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Handtooled",
    "identity": "Handtooled",
    "archetype": "Cog",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Makerprime",
    "identity": "Makerprime",
    "archetype": "Cog",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Measurewise",
    "identity": "Measurewise",
    "archetype": "Cog",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Precision",
    "identity": "Precision",
    "archetype": "Cog",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Rigbuilder",
    "identity": "Rigbuilder",
    "archetype": "Cog",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Shopborn",
    "identity": "Shopborn",
    "archetype": "Cog",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Tinkersteel",
    "identity": "Tinkersteel",
    "archetype": "Cog",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Toolmaster",
    "identity": "Toolmaster",
    "archetype": "Cog",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Charmengine",
    "identity": "Charmengine",
    "archetype": "Face",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Diplomacy",
    "identity": "Diplomacy",
    "archetype": "Face",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Glamour",
    "identity": "Glamour",
    "archetype": "Face",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Iconic",
    "identity": "Iconic",
    "archetype": "Face",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Impressionmaker",
    "identity": "Impressionmaker",
    "archetype": "Face",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Magnetheart",
    "identity": "Magnetheart",
    "archetype": "Face",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Persuader",
    "identity": "Persuader",
    "archetype": "Face",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Poise",
    "identity": "Poise",
    "archetype": "Face",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Socialite",
    "identity": "Socialite",
    "archetype": "Face",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Starquality",
    "identity": "Starquality",
    "archetype": "Face",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Stylecraft",
    "identity": "Stylecraft",
    "archetype": "Face",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Suave",
    "identity": "Suave",
    "archetype": "Face",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Velvetword",
    "identity": "Velvetword",
    "archetype": "Face",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Warmsmile",
    "identity": "Warmsmile",
    "archetype": "Face",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Dealbroker",
    "identity": "Dealbroker",
    "archetype": "Fixer",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Favortrade",
    "identity": "Favortrade",
    "archetype": "Fixer",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "GoBetween",
    "identity": "GoBetween",
    "archetype": "Fixer",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Handshaker",
    "identity": "Handshaker",
    "archetype": "Fixer",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Introducer",
    "identity": "Introducer",
    "archetype": "Fixer",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Linkmaker",
    "identity": "Linkmaker",
    "archetype": "Fixer",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Matchmaker",
    "identity": "Matchmaker",
    "archetype": "Fixer",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Middlewire",
    "identity": "Middlewire",
    "archetype": "Fixer",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Networkhand",
    "identity": "Networkhand",
    "archetype": "Fixer",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Openchannel",
    "identity": "Openchannel",
    "archetype": "Fixer",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Resourcebroker",
    "identity": "Resourcebroker",
    "archetype": "Fixer",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Rolodex",
    "identity": "Rolodex",
    "archetype": "Fixer",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Switchmaster",
    "identity": "Switchmaster",
    "archetype": "Fixer",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Tradebinder",
    "identity": "Tradebinder",
    "archetype": "Fixer",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Brickfist",
    "identity": "Brickfist",
    "archetype": "Ganger",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Colorsworn",
    "identity": "Colorsworn",
    "archetype": "Ganger",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Cornerboss",
    "identity": "Cornerboss",
    "archetype": "Ganger",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Crewblood",
    "identity": "Crewblood",
    "archetype": "Ganger",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Graffitimark",
    "identity": "Graffitimark",
    "archetype": "Ganger",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Hoodkin",
    "identity": "Hoodkin",
    "archetype": "Ganger",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Neighborhood",
    "identity": "Neighborhood",
    "archetype": "Ganger",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Packleader",
    "identity": "Packleader",
    "archetype": "Ganger",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Rumble",
    "identity": "Rumble",
    "archetype": "Ganger",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Streetmade",
    "identity": "Streetmade",
    "archetype": "Ganger",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Tagger",
    "identity": "Tagger",
    "archetype": "Ganger",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Turfkeeper",
    "identity": "Turfkeeper",
    "archetype": "Ganger",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Vicehand",
    "identity": "Vicehand",
    "archetype": "Ganger",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Wardchief",
    "identity": "Wardchief",
    "archetype": "Ganger",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Cameraeye",
    "identity": "Cameraeye",
    "archetype": "Gonzo Journalist",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Datelinehunter",
    "identity": "Datelinehunter",
    "archetype": "Gonzo Journalist",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Dispatchwire",
    "identity": "Dispatchwire",
    "archetype": "Gonzo Journalist",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Exposé",
    "identity": "Exposé",
    "archetype": "Gonzo Journalist",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Frontliner",
    "identity": "Frontliner",
    "archetype": "Gonzo Journalist",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Headline",
    "identity": "Headline",
    "archetype": "Gonzo Journalist",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Hotpress",
    "identity": "Hotpress",
    "archetype": "Gonzo Journalist",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Livefeed",
    "identity": "Livefeed",
    "archetype": "Gonzo Journalist",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Newsbreaker",
    "identity": "Newsbreaker",
    "archetype": "Gonzo Journalist",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Recordkeeper",
    "identity": "Recordkeeper",
    "archetype": "Gonzo Journalist",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Scoop",
    "identity": "Scoop",
    "archetype": "Gonzo Journalist",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Signalpirate",
    "identity": "Signalpirate",
    "archetype": "Gonzo Journalist",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Storychaser",
    "identity": "Storychaser",
    "archetype": "Gonzo Journalist",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Truthcaster",
    "identity": "Truthcaster",
    "archetype": "Gonzo Journalist",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Cylinder",
    "identity": "Cylinder",
    "archetype": "Gunslinger",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Deadcenter",
    "identity": "Deadcenter",
    "archetype": "Gunslinger",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Drawfast",
    "identity": "Drawfast",
    "archetype": "Gunslinger",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Flintlock",
    "identity": "Flintlock",
    "archetype": "Gunslinger",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Gunfighter",
    "identity": "Gunfighter",
    "archetype": "Gunslinger",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Hammerfall",
    "identity": "Hammerfall",
    "archetype": "Gunslinger",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Holsterborn",
    "identity": "Holsterborn",
    "archetype": "Gunslinger",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Ironshooter",
    "identity": "Ironshooter",
    "archetype": "Gunslinger",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Leadspitter",
    "identity": "Leadspitter",
    "archetype": "Gunslinger",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Pistolero",
    "identity": "Pistolero",
    "archetype": "Gunslinger",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Quickdraw",
    "identity": "Quickdraw",
    "archetype": "Gunslinger",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Ricochetman",
    "identity": "Ricochetman",
    "archetype": "Gunslinger",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Sixgun",
    "identity": "Sixgun",
    "archetype": "Gunslinger",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Smokehand",
    "identity": "Smokehand",
    "archetype": "Gunslinger",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Blackhatbyte",
    "identity": "Blackhatbyte",
    "archetype": "Hacker",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Breachcode",
    "identity": "Breachcode",
    "archetype": "Hacker",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Cipherjack",
    "identity": "Cipherjack",
    "archetype": "Hacker",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Cracker",
    "identity": "Cracker",
    "archetype": "Hacker",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Daemonrider",
    "identity": "Daemonrider",
    "archetype": "Hacker",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Exploit",
    "identity": "Exploit",
    "archetype": "Hacker",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Ghostroot",
    "identity": "Ghostroot",
    "archetype": "Hacker",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Keybreaker",
    "identity": "Keybreaker",
    "archetype": "Hacker",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Malwaremind",
    "identity": "Malwaremind",
    "archetype": "Hacker",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Netraider",
    "identity": "Netraider",
    "archetype": "Hacker",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Packetghost",
    "identity": "Packetghost",
    "archetype": "Hacker",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Rootaccess",
    "identity": "Rootaccess",
    "archetype": "Hacker",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Scriptknife",
    "identity": "Scriptknife",
    "archetype": "Hacker",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Systembane",
    "identity": "Systembane",
    "archetype": "Hacker",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Boomheart",
    "identity": "Boomheart",
    "archetype": "Mad Bomber",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Chargewire",
    "identity": "Chargewire",
    "archetype": "Mad Bomber",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Clockbomb",
    "identity": "Clockbomb",
    "archetype": "Mad Bomber",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Detcord",
    "identity": "Detcord",
    "archetype": "Mad Bomber",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Firestarter",
    "identity": "Firestarter",
    "archetype": "Mad Bomber",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Fuseburner",
    "identity": "Fuseburner",
    "archetype": "Mad Bomber",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Grenadier",
    "identity": "Grenadier",
    "archetype": "Mad Bomber",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Hotcharge",
    "identity": "Hotcharge",
    "archetype": "Mad Bomber",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Ignitioneer",
    "identity": "Ignitioneer",
    "archetype": "Mad Bomber",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Minefield",
    "identity": "Minefield",
    "archetype": "Mad Bomber",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Overpressure",
    "identity": "Overpressure",
    "archetype": "Mad Bomber",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Powderkeg",
    "identity": "Powderkeg",
    "archetype": "Mad Bomber",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Redswitch",
    "identity": "Redswitch",
    "archetype": "Mad Bomber",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Shrapnel",
    "identity": "Shrapnel",
    "archetype": "Mad Bomber",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Cantripwire",
    "identity": "Cantripwire",
    "archetype": "Mage",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Charmcaster",
    "identity": "Charmcaster",
    "archetype": "Mage",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Enchanter",
    "identity": "Enchanter",
    "archetype": "Mage",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Glyphmind",
    "identity": "Glyphmind",
    "archetype": "Mage",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Hexsmith",
    "identity": "Hexsmith",
    "archetype": "Mage",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Leychannel",
    "identity": "Leychannel",
    "archetype": "Mage",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Manaborn",
    "identity": "Manaborn",
    "archetype": "Mage",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Mysticcode",
    "identity": "Mysticcode",
    "archetype": "Mage",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Occultor",
    "identity": "Occultor",
    "archetype": "Mage",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Sigilwarden",
    "identity": "Sigilwarden",
    "archetype": "Mage",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Sorcery",
    "identity": "Sorcery",
    "archetype": "Mage",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Spellengine",
    "identity": "Spellengine",
    "archetype": "Mage",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Wandhand",
    "identity": "Wandhand",
    "archetype": "Mage",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Warpcaster",
    "identity": "Warpcaster",
    "archetype": "Mage",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Cashsoldier",
    "identity": "Cashsoldier",
    "archetype": "Mercenary",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Coinfighter",
    "identity": "Coinfighter",
    "archetype": "Mercenary",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Contractgun",
    "identity": "Contractgun",
    "archetype": "Mercenary",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Freelancegun",
    "identity": "Freelancegun",
    "archetype": "Mercenary",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Goldsword",
    "identity": "Goldsword",
    "archetype": "Mercenary",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Hiredsteel",
    "identity": "Hiredsteel",
    "archetype": "Mercenary",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Paymaster",
    "identity": "Paymaster",
    "archetype": "Mercenary",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Profitwarrior",
    "identity": "Profitwarrior",
    "archetype": "Mercenary",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Retainerblade",
    "identity": "Retainerblade",
    "archetype": "Mercenary",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Risktaker",
    "identity": "Risktaker",
    "archetype": "Mercenary",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Sellblade",
    "identity": "Sellblade",
    "archetype": "Mercenary",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Soldierforhire",
    "identity": "Soldierforhire",
    "archetype": "Mercenary",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Termskeeper",
    "identity": "Termskeeper",
    "archetype": "Mercenary",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Warcontract",
    "identity": "Warcontract",
    "archetype": "Mercenary",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Breathkeeper",
    "identity": "Breathkeeper",
    "archetype": "Monk",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Centered",
    "identity": "Centered",
    "archetype": "Monk",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Calmsteel",
    "identity": "Calmsteel",
    "archetype": "Monk",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Emptyfist",
    "identity": "Emptyfist",
    "archetype": "Monk",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Flowmind",
    "identity": "Flowmind",
    "archetype": "Monk",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Innerquiet",
    "identity": "Innerquiet",
    "archetype": "Monk",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Koanwalker",
    "identity": "Koanwalker",
    "archetype": "Monk",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Meditation",
    "identity": "Meditation",
    "archetype": "Monk",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Palmguard",
    "identity": "Palmguard",
    "archetype": "Monk",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Peacehand",
    "identity": "Peacehand",
    "archetype": "Monk",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Stillpoint",
    "identity": "Stillpoint",
    "archetype": "Monk",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Templebred",
    "identity": "Templebred",
    "archetype": "Monk",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Tranquility",
    "identity": "Tranquility",
    "archetype": "Monk",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Duskblade",
    "identity": "Duskblade",
    "archetype": "Ninja",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Ghostwalk",
    "identity": "Ghostwalk",
    "archetype": "Ninja",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Hiddenedge",
    "identity": "Hiddenedge",
    "archetype": "Ninja",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Kage",
    "identity": "Kage",
    "archetype": "Ninja",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Moonshadow",
    "identity": "Moonshadow",
    "archetype": "Ninja",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Nightpetal",
    "identity": "Nightpetal",
    "archetype": "Ninja",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Quietstep",
    "identity": "Quietstep",
    "archetype": "Ninja",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Roofrunner",
    "identity": "Roofrunner",
    "archetype": "Ninja",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Shadowknife",
    "identity": "Shadowknife",
    "archetype": "Ninja",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Silentfall",
    "identity": "Silentfall",
    "archetype": "Ninja",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Silkstrike",
    "identity": "Silkstrike",
    "archetype": "Ninja",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Smokeveil",
    "identity": "Smokeveil",
    "archetype": "Ninja",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Softfoot",
    "identity": "Softfoot",
    "archetype": "Ninja",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Centerstage",
    "identity": "Centerstage",
    "archetype": "Performer",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Choreograph",
    "identity": "Choreograph",
    "archetype": "Performer",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Crowdpleaser",
    "identity": "Crowdpleaser",
    "archetype": "Performer",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Dancewire",
    "identity": "Dancewire",
    "archetype": "Performer",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Diva",
    "identity": "Diva",
    "archetype": "Performer",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Encorestar",
    "identity": "Encorestar",
    "archetype": "Performer",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Melodymaker",
    "identity": "Melodymaker",
    "archetype": "Performer",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Pulsebeat",
    "identity": "Pulsebeat",
    "archetype": "Performer",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Spotlightborn",
    "identity": "Spotlightborn",
    "archetype": "Performer",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Stagevoice",
    "identity": "Stagevoice",
    "archetype": "Performer",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Starperformer",
    "identity": "Starperformer",
    "archetype": "Performer",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Tempo",
    "identity": "Tempo",
    "archetype": "Performer",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Voxstar",
    "identity": "Voxstar",
    "archetype": "Performer",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Cluewise",
    "identity": "Cluewise",
    "archetype": "Private Eye/Investigator",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Deductor",
    "identity": "Deductor",
    "archetype": "Private Eye/Investigator",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Detailer",
    "identity": "Detailer",
    "archetype": "Private Eye/Investigator",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Evidenceeye",
    "identity": "Evidenceeye",
    "archetype": "Private Eye/Investigator",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Gumshoehard",
    "identity": "Gumshoehard",
    "archetype": "Private Eye/Investigator",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Hunchback",
    "identity": "Hunchback",
    "archetype": "Private Eye/Investigator",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Inquiry",
    "identity": "Inquiry",
    "archetype": "Private Eye/Investigator",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Keeneye",
    "identity": "Keeneye",
    "archetype": "Private Eye/Investigator",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Mysteryman",
    "identity": "Mysteryman",
    "archetype": "Private Eye/Investigator",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Notetaker",
    "identity": "Notetaker",
    "archetype": "Private Eye/Investigator",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Questionmark",
    "identity": "Questionmark",
    "archetype": "Private Eye/Investigator",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Redthread",
    "identity": "Redthread",
    "archetype": "Private Eye/Investigator",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Sleuthwork",
    "identity": "Sleuthwork",
    "archetype": "Private Eye/Investigator",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Bassquake",
    "identity": "Bassquake",
    "archetype": "Screamer",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Decibel",
    "identity": "Decibel",
    "archetype": "Screamer",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Feedbacker",
    "identity": "Feedbacker",
    "archetype": "Screamer",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Howlcore",
    "identity": "Howlcore",
    "archetype": "Screamer",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Loudspeaker",
    "identity": "Loudspeaker",
    "archetype": "Screamer",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Noiseborn",
    "identity": "Noiseborn",
    "archetype": "Screamer",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Overdrive",
    "identity": "Overdrive",
    "archetype": "Screamer",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Pitchbreak",
    "identity": "Pitchbreak",
    "archetype": "Screamer",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Resonator",
    "identity": "Resonator",
    "archetype": "Screamer",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Shoutwire",
    "identity": "Shoutwire",
    "archetype": "Screamer",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Sonicfury",
    "identity": "Sonicfury",
    "archetype": "Screamer",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Soundwall",
    "identity": "Soundwall",
    "archetype": "Screamer",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Subwoofer",
    "identity": "Subwoofer",
    "archetype": "Screamer",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Dreamguide",
    "identity": "Dreamguide",
    "archetype": "Shaman",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Ghostspeaker",
    "identity": "Ghostspeaker",
    "archetype": "Shaman",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Omenreader",
    "identity": "Omenreader",
    "archetype": "Shaman",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Otherworld",
    "identity": "Otherworld",
    "archetype": "Shaman",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Spiritcaller",
    "identity": "Spiritcaller",
    "archetype": "Shaman",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Soulbridge",
    "identity": "Soulbridge",
    "archetype": "Shaman",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Totemwire",
    "identity": "Totemwire",
    "archetype": "Shaman",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Trancewalker",
    "identity": "Trancewalker",
    "archetype": "Shaman",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Visionkeeper",
    "identity": "Visionkeeper",
    "archetype": "Shaman",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Wildoracle",
    "identity": "Wildoracle",
    "archetype": "Shaman",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Worldwalker",
    "identity": "Worldwalker",
    "archetype": "Shaman",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Bonevision",
    "identity": "Bonevision",
    "archetype": "Shaman",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Fetishkeeper",
    "identity": "Fetishkeeper",
    "archetype": "Shaman",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Blackcargo",
    "identity": "Blackcargo",
    "archetype": "Smuggler",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Blockader",
    "identity": "Blockader",
    "archetype": "Smuggler",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Borderghost",
    "identity": "Borderghost",
    "archetype": "Smuggler",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Contrabandrunner",
    "identity": "Contrabandrunner",
    "archetype": "Smuggler",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Customsfoe",
    "identity": "Customsfoe",
    "archetype": "Smuggler",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Falsemanifest",
    "identity": "Falsemanifest",
    "archetype": "Smuggler",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Freighter",
    "identity": "Freighter",
    "archetype": "Smuggler",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Freeporthand",
    "identity": "Freeporthand",
    "archetype": "Smuggler",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Hiddencompartment",
    "identity": "Hiddencompartment",
    "archetype": "Smuggler",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Offbook",
    "identity": "Offbook",
    "archetype": "Smuggler",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Sliproute",
    "identity": "Sliproute",
    "archetype": "Smuggler",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Starhauler",
    "identity": "Starhauler",
    "archetype": "Smuggler",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Underdeck",
    "identity": "Underdeck",
    "archetype": "Smuggler",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Crosshair",
    "identity": "Crosshair",
    "archetype": "Sniper",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Deadstill",
    "identity": "Deadstill",
    "archetype": "Sniper",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Distanceeye",
    "identity": "Distanceeye",
    "archetype": "Sniper",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Farshot",
    "identity": "Farshot",
    "archetype": "Sniper",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Ghostscope",
    "identity": "Ghostscope",
    "archetype": "Sniper",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Highperch",
    "identity": "Highperch",
    "archetype": "Sniper",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Killline",
    "identity": "Killline",
    "archetype": "Sniper",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Longrange",
    "identity": "Longrange",
    "archetype": "Sniper",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Marksight",
    "identity": "Marksight",
    "archetype": "Sniper",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Onebullet",
    "identity": "Onebullet",
    "archetype": "Sniper",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Pinpointshot",
    "identity": "Pinpointshot",
    "archetype": "Sniper",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Scopewise",
    "identity": "Scopewise",
    "archetype": "Sniper",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Stilltrigger",
    "identity": "Stilltrigger",
    "archetype": "Sniper",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Blackfile",
    "identity": "Blackfile",
    "archetype": "Spy",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Clandestine",
    "identity": "Clandestine",
    "archetype": "Spy",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Coveridentity",
    "identity": "Coveridentity",
    "archetype": "Spy",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Doubleagent",
    "identity": "Doubleagent",
    "archetype": "Spy",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Falsepassport",
    "identity": "Falsepassport",
    "archetype": "Spy",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Handler",
    "identity": "Handler",
    "archetype": "Spy",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Intelghost",
    "identity": "Intelghost",
    "archetype": "Spy",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Molecraft",
    "identity": "Molecraft",
    "archetype": "Spy",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Operative",
    "identity": "Operative",
    "archetype": "Spy",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Secretkeeper",
    "identity": "Secretkeeper",
    "archetype": "Spy",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Sleepercell",
    "identity": "Sleepercell",
    "archetype": "Spy",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Undercover",
    "identity": "Undercover",
    "archetype": "Spy",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Whisperagent",
    "identity": "Whisperagent",
    "archetype": "Spy",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Bloodpatch",
    "identity": "Bloodpatch",
    "archetype": "Street Doc",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Bonesetter",
    "identity": "Bonesetter",
    "archetype": "Street Doc",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Clinicghost",
    "identity": "Clinicghost",
    "archetype": "Street Doc",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Fieldsurgeon",
    "identity": "Fieldsurgeon",
    "archetype": "Street Doc",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Lifesaver",
    "identity": "Lifesaver",
    "archetype": "Street Doc",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Medtech",
    "identity": "Medtech",
    "archetype": "Street Doc",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Nightmedic",
    "identity": "Nightmedic",
    "archetype": "Street Doc",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Patchdoc",
    "identity": "Patchdoc",
    "archetype": "Street Doc",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Pulsekeeper",
    "identity": "Pulsekeeper",
    "archetype": "Street Doc",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Quickmedic",
    "identity": "Quickmedic",
    "archetype": "Street Doc",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Sawbones",
    "identity": "Sawbones",
    "archetype": "Street Doc",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Stitchhand",
    "identity": "Stitchhand",
    "archetype": "Street Doc",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Streetclinic",
    "identity": "Streetclinic",
    "archetype": "Street Doc",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Bushidocode",
    "identity": "Bushidocode",
    "archetype": "Street Samurai",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Chromeblade",
    "identity": "Chromeblade",
    "archetype": "Street Samurai",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Clanbreaker",
    "identity": "Clanbreaker",
    "archetype": "Street Samurai",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Honorsteel",
    "identity": "Honorsteel",
    "archetype": "Street Samurai",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Katanaheart",
    "identity": "Katanaheart",
    "archetype": "Street Samurai",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Neonronin",
    "identity": "Neonronin",
    "archetype": "Street Samurai",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Oathblade",
    "identity": "Oathblade",
    "archetype": "Street Samurai",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Redkatana",
    "identity": "Redkatana",
    "archetype": "Street Samurai",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Roninwire",
    "identity": "Roninwire",
    "archetype": "Street Samurai",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Streetblade",
    "identity": "Streetblade",
    "archetype": "Street Samurai",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Swordcode",
    "identity": "Swordcode",
    "archetype": "Street Samurai",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Urbanwarrior",
    "identity": "Urbanwarrior",
    "archetype": "Street Samurai",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Warriorpoet",
    "identity": "Warriorpoet",
    "archetype": "Street Samurai",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Blackpact",
    "identity": "Blackpact",
    "archetype": "Warlock",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Cursebinder",
    "identity": "Cursebinder",
    "archetype": "Warlock",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Debtcollector",
    "identity": "Debtcollector",
    "archetype": "Warlock",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Demonlink",
    "identity": "Demonlink",
    "archetype": "Warlock",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Forbiddenbook",
    "identity": "Forbiddenbook",
    "archetype": "Warlock",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Hellbargain",
    "identity": "Hellbargain",
    "archetype": "Warlock",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Hexdebt",
    "identity": "Hexdebt",
    "archetype": "Warlock",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Netherdeal",
    "identity": "Netherdeal",
    "archetype": "Warlock",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Oathchain",
    "identity": "Oathchain",
    "archetype": "Warlock",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Pactmaker",
    "identity": "Pactmaker",
    "archetype": "Warlock",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Pricekeeper",
    "identity": "Pricekeeper",
    "archetype": "Warlock",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Soulcontract",
    "identity": "Soulcontract",
    "archetype": "Warlock",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Voidcoven",
    "identity": "Voidcoven",
    "archetype": "Warlock",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Riftbreaker",
    "identity": "Riftbreaker",
    "archetype": "Barbarian",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Trackdown",
    "identity": "Trackdown",
    "archetype": "Bounty Hunter",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Thinktank",
    "identity": "Thinktank",
    "archetype": "Brainiac",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Soulminister",
    "identity": "Soulminister",
    "archetype": "Cleric",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Warfront",
    "identity": "Warfront",
    "archetype": "Commando",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Felony",
    "identity": "Felony",
    "archetype": "Criminal",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Woodspirit",
    "identity": "Woodspirit",
    "archetype": "Druid",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Worlddefender",
    "identity": "Worlddefender",
    "archetype": "Eco Terrorist",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Whistleblower",
    "identity": "Whistleblower",
    "archetype": "Ex-Company Man",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Badgefall",
    "identity": "Badgefall",
    "archetype": "Ex-Cop",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Zeroformation",
    "identity": "Zeroformation",
    "archetype": "Ex-Military",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Truecraft",
    "identity": "Truecraft",
    "archetype": "Cog",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Winsomevoice",
    "identity": "Winsomevoice",
    "archetype": "Face",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Underbroker",
    "identity": "Underbroker",
    "archetype": "Fixer",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Yardborn",
    "identity": "Yardborn",
    "archetype": "Ganger",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Witnesswire",
    "identity": "Witnesswire",
    "archetype": "Gonzo Journalist",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Triggerwise",
    "identity": "Triggerwise",
    "archetype": "Gunslinger",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Threadjacker",
    "identity": "Threadjacker",
    "archetype": "Hacker",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Timerborn",
    "identity": "Timerborn",
    "archetype": "Mad Bomber",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Witchlight",
    "identity": "Witchlight",
    "archetype": "Mage",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Wageblade",
    "identity": "Wageblade",
    "archetype": "Mercenary",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Unshaken",
    "identity": "Unshaken",
    "archetype": "Monk",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Starshuriken",
    "identity": "Starshuriken",
    "archetype": "Ninja",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Marquee",
    "identity": "Marquee",
    "archetype": "Performer",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Tellfinder",
    "identity": "Tellfinder",
    "archetype": "Private Eye/Investigator",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Trebleblast",
    "identity": "Trebleblast",
    "archetype": "Screamer",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Ritualist",
    "identity": "Ritualist",
    "archetype": "Shaman",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Waybillghost",
    "identity": "Waybillghost",
    "archetype": "Smuggler",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Targetlock",
    "identity": "Targetlock",
    "archetype": "Sniper",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Deepcover",
    "identity": "Deepcover",
    "archetype": "Spy",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Traumaexpert",
    "identity": "Traumaexpert",
    "archetype": "Street Doc",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Wayofswords",
    "identity": "Wayofswords",
    "archetype": "Street Samurai",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Witchbond",
    "identity": "Witchbond",
    "archetype": "Warlock",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Skullforge",
    "identity": "Skullforge",
    "archetype": "Barbarian",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Wantedman",
    "identity": "Wantedman",
    "archetype": "Bounty Hunter",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Witspark",
    "identity": "Witspark",
    "archetype": "Brainiac",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Consecrator",
    "identity": "Consecrator",
    "archetype": "Cleric",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Beachmaster",
    "identity": "Beachmaster",
    "archetype": "Commando",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "RapSheet",
    "identity": "RapSheet",
    "archetype": "Criminal",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Oakmind",
    "identity": "Oakmind",
    "archetype": "Druid",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Scorchroot",
    "identity": "Scorchroot",
    "archetype": "Eco Terrorist",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Writeoffking",
    "identity": "Writeoffking",
    "archetype": "Ex-Company Man",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Patrolman",
    "identity": "Patrolman",
    "archetype": "Ex-Cop",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Musterghost",
    "identity": "Musterghost",
    "archetype": "Ex-Military",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Workbench",
    "identity": "Workbench",
    "archetype": "Cog",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Charismawire",
    "identity": "Charismawire",
    "archetype": "Face",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Wayfinder",
    "identity": "Wayfinder",
    "archetype": "Fixer",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Gangmark",
    "identity": "Gangmark",
    "archetype": "Ganger",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Presshound",
    "identity": "Presshound",
    "archetype": "Gonzo Journalist",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Western",
    "identity": "Western",
    "archetype": "Gunslinger",
    "origin": "Human",
    "style": "self-chosen"
  }
]

const monikers = cyborgNames.map(entry => entry.identity.replace(/[^\p{L}\p{N}]/gu, '').toLowerCase())
if (import.meta.env.DEV) {
  const issues = []
  if (cyborgNames.length !== 1000 || new Set(monikers).size !== 1000) issues.push('Cyborgs should have 1,000 unique monikers')
  if (cyborgNames.some(entry => entry.style === 'designation' || /^\[.*\]$/.test(entry.name))) issues.push('Cyborg designation names should not be present')
  if (cyborgNames.some(entry => !entry.archetype || !entry.origin)) issues.push('Every Cyborg name should have archetype and origin metadata')
  if (cyborgNames.some(entry => entry.name.trim().split(/\s+/).length > 6)) issues.push('Cyborg names should not exceed six words')
  if (issues.length) console.warn('Cyborg name catalog validation:', issues)
}

export default cyborgNames
