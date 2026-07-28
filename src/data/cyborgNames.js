// 500 Cyborg identities: 450 independently chosen monikers and 50 designations.
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
    "name": "Pathfinder",
    "identity": "Pathfinder",
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
    "name": "Ballisti",
    "identity": "Ballisti",
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
    "name": "Raincaller",
    "identity": "Raincaller",
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
    "name": "Mosshear",
    "identity": "Mosshear",
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
    "name": "Overgrow",
    "identity": "Overgrow",
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
    "name": "Restorat",
    "identity": "Restorat",
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
    "name": "Proxy",
    "identity": "Proxy",
    "archetype": "Ex-Company Man",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Disavowe",
    "identity": "Disavowe",
    "archetype": "Ex-Company Man",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Corporat",
    "identity": "Corporat",
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
    "name": "Beatwalk",
    "identity": "Beatwalk",
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
    "name": "Procedur",
    "identity": "Procedur",
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
    "name": "Streetwi",
    "identity": "Streetwi",
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
    "name": "Marchste",
    "identity": "Marchste",
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
    "name": "Decorate",
    "identity": "Decorate",
    "archetype": "Ex-Military",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Discharg",
    "identity": "Discharg",
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
    "name": "Masterwo",
    "identity": "Masterwo",
    "archetype": "Cog",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Calibrat",
    "identity": "Calibrat",
    "archetype": "Cog",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Handbuil",
    "identity": "Handbuil",
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
    "name": "Firstlight",
    "identity": "Firstlight",
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
    "name": "Spotligh",
    "identity": "Spotligh",
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
    "name": "Handshake",
    "identity": "Handshake",
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
    "name": "Resource",
    "identity": "Resource",
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
    "name": "Uncensor",
    "identity": "Uncensor",
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
    "name": "Coldboot",
    "identity": "Coldboot",
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
    "name": "ZeroDay",
    "identity": "ZeroDay",
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
    "name": "Encrypte",
    "identity": "Encrypte",
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
    "name": "Airgappe",
    "identity": "Airgappe",
    "archetype": "Hacker",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Unpatche",
    "identity": "Unpatche",
    "archetype": "Hacker",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Jailbrok",
    "identity": "Jailbrok",
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
    "name": "Payload",
    "identity": "Payload",
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
    "name": "Detonat",
    "identity": "Detonat",
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
    "name": "Enchante",
    "identity": "Enchante",
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
    "name": "Professi",
    "identity": "Professi",
    "archetype": "Mercenary",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Freelanc",
    "identity": "Freelanc",
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
    "name": "Discipl",
    "identity": "Discipl",
    "archetype": "Monk",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Weightle",
    "identity": "Weightle",
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
    "name": "Soundles",
    "identity": "Soundles",
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
    "name": "Stagefir",
    "identity": "Stagefir",
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
    "name": "Shoeleat",
    "identity": "Shoeleat",
    "archetype": "Private Eye/Investigator",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Inquirin",
    "identity": "Inquirin",
    "archetype": "Private Eye/Investigator",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Tenaciou",
    "identity": "Tenaciou",
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
    "name": "Overstee",
    "identity": "Overstee",
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
    "name": "Overcloc",
    "identity": "Overcloc",
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
    "name": "Backchannel",
    "identity": "Backchannel",
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
    "name": "Unmanife",
    "identity": "Unmanife",
    "archetype": "Smuggler",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Borderle",
    "identity": "Borderle",
    "archetype": "Smuggler",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Unsearch",
    "identity": "Unsearch",
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
    "name": "Motionle",
    "identity": "Motionle",
    "archetype": "Sniper",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Farseein",
    "identity": "Farseein",
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
    "name": "Classifi",
    "identity": "Classifi",
    "archetype": "Spy",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Counterf",
    "identity": "Counterf",
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
    "name": "Emergenc",
    "identity": "Emergenc",
    "archetype": "Street Doc",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Unlicens",
    "identity": "Unlicens",
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
    "name": "Cybernet",
    "identity": "Cybernet",
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
    "name": "Forbidde",
    "identity": "Forbidde",
    "archetype": "Warlock",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "[CYB-211]",
    "designation": "CYB-211",
    "archetype": "Barbarian",
    "style": "designation"
  },
  {
    "name": "[AUG.228]",
    "designation": "AUG.228",
    "archetype": "Bounty Hunter",
    "style": "designation"
  },
  {
    "name": "[SYN/245]",
    "designation": "SYN/245",
    "archetype": "Brainiac",
    "style": "designation"
  },
  {
    "name": "[FRAME-262]",
    "designation": "FRAME-262",
    "archetype": "Cleric",
    "style": "designation"
  },
  {
    "name": "[MOD.279]",
    "designation": "MOD.279",
    "archetype": "Commando",
    "style": "designation"
  },
  {
    "name": "[CYB-296]",
    "designation": "CYB-296",
    "archetype": "Criminal",
    "style": "designation"
  },
  {
    "name": "[AUG.313]",
    "designation": "AUG.313",
    "archetype": "Druid",
    "style": "designation"
  },
  {
    "name": "[SYN/330]",
    "designation": "SYN/330",
    "archetype": "Eco Terrorist",
    "style": "designation"
  },
  {
    "name": "[FRAME-347]",
    "designation": "FRAME-347",
    "archetype": "Ex-Company Man",
    "style": "designation"
  },
  {
    "name": "[MOD.364]",
    "designation": "MOD.364",
    "archetype": "Ex-Cop",
    "style": "designation"
  },
  {
    "name": "[CYB-381]",
    "designation": "CYB-381",
    "archetype": "Ex-Military",
    "style": "designation"
  },
  {
    "name": "[AUG.398]",
    "designation": "AUG.398",
    "archetype": "Cog",
    "style": "designation"
  },
  {
    "name": "[SYN/415]",
    "designation": "SYN/415",
    "archetype": "Face",
    "style": "designation"
  },
  {
    "name": "[FRAME-432]",
    "designation": "FRAME-432",
    "archetype": "Fixer",
    "style": "designation"
  },
  {
    "name": "[MOD.449]",
    "designation": "MOD.449",
    "archetype": "Ganger",
    "style": "designation"
  },
  {
    "name": "[CYB-466]",
    "designation": "CYB-466",
    "archetype": "Gonzo Journalist",
    "style": "designation"
  },
  {
    "name": "[AUG.483]",
    "designation": "AUG.483",
    "archetype": "Gunslinger",
    "style": "designation"
  },
  {
    "name": "[SYN/500]",
    "designation": "SYN/500",
    "archetype": "Hacker",
    "style": "designation"
  },
  {
    "name": "[FRAME-517]",
    "designation": "FRAME-517",
    "archetype": "Mad Bomber",
    "style": "designation"
  },
  {
    "name": "[MOD.534]",
    "designation": "MOD.534",
    "archetype": "Mage",
    "style": "designation"
  },
  {
    "name": "[CYB-551]",
    "designation": "CYB-551",
    "archetype": "Mercenary",
    "style": "designation"
  },
  {
    "name": "[AUG.568]",
    "designation": "AUG.568",
    "archetype": "Monk",
    "style": "designation"
  },
  {
    "name": "[SYN/585]",
    "designation": "SYN/585",
    "archetype": "Ninja",
    "style": "designation"
  },
  {
    "name": "[FRAME-602]",
    "designation": "FRAME-602",
    "archetype": "Performer",
    "style": "designation"
  },
  {
    "name": "[MOD.619]",
    "designation": "MOD.619",
    "archetype": "Private Eye/Investigator",
    "style": "designation"
  },
  {
    "name": "[CYB-636]",
    "designation": "CYB-636",
    "archetype": "Screamer",
    "style": "designation"
  },
  {
    "name": "[AUG.653]",
    "designation": "AUG.653",
    "archetype": "Shaman",
    "style": "designation"
  },
  {
    "name": "[SYN/670]",
    "designation": "SYN/670",
    "archetype": "Smuggler",
    "style": "designation"
  },
  {
    "name": "[FRAME-687]",
    "designation": "FRAME-687",
    "archetype": "Sniper",
    "style": "designation"
  },
  {
    "name": "[MOD.704]",
    "designation": "MOD.704",
    "archetype": "Spy",
    "style": "designation"
  },
  {
    "name": "[CYB-721]",
    "designation": "CYB-721",
    "archetype": "Street Doc",
    "style": "designation"
  },
  {
    "name": "[AUG.738]",
    "designation": "AUG.738",
    "archetype": "Street Samurai",
    "style": "designation"
  },
  {
    "name": "[SYN/755]",
    "designation": "SYN/755",
    "archetype": "Warlock",
    "style": "designation"
  },
  {
    "name": "[FRAME-772]",
    "designation": "FRAME-772",
    "archetype": "Barbarian",
    "style": "designation"
  },
  {
    "name": "[MOD.789]",
    "designation": "MOD.789",
    "archetype": "Bounty Hunter",
    "style": "designation"
  },
  {
    "name": "[CYB-806]",
    "designation": "CYB-806",
    "archetype": "Brainiac",
    "style": "designation"
  },
  {
    "name": "[AUG.823]",
    "designation": "AUG.823",
    "archetype": "Cleric",
    "style": "designation"
  },
  {
    "name": "[SYN/840]",
    "designation": "SYN/840",
    "archetype": "Commando",
    "style": "designation"
  },
  {
    "name": "[FRAME-857]",
    "designation": "FRAME-857",
    "archetype": "Criminal",
    "style": "designation"
  },
  {
    "name": "[MOD.874]",
    "designation": "MOD.874",
    "archetype": "Druid",
    "style": "designation"
  },
  {
    "name": "[CYB-891]",
    "designation": "CYB-891",
    "archetype": "Eco Terrorist",
    "style": "designation"
  },
  {
    "name": "[AUG.908]",
    "designation": "AUG.908",
    "archetype": "Ex-Company Man",
    "style": "designation"
  },
  {
    "name": "[SYN/925]",
    "designation": "SYN/925",
    "archetype": "Ex-Cop",
    "style": "designation"
  },
  {
    "name": "[FRAME-942]",
    "designation": "FRAME-942",
    "archetype": "Ex-Military",
    "style": "designation"
  },
  {
    "name": "[MOD.959]",
    "designation": "MOD.959",
    "archetype": "Cog",
    "style": "designation"
  },
  {
    "name": "[CYB-976]",
    "designation": "CYB-976",
    "archetype": "Face",
    "style": "designation"
  },
  {
    "name": "[AUG.993]",
    "designation": "AUG.993",
    "archetype": "Fixer",
    "style": "designation"
  },
  {
    "name": "[SYN/1010]",
    "designation": "SYN/1010",
    "archetype": "Ganger",
    "style": "designation"
  },
  {
    "name": "[FRAME-1027]",
    "designation": "FRAME-1027",
    "archetype": "Gonzo Journalist",
    "style": "designation"
  },
  {
    "name": "[MOD.1044]",
    "designation": "MOD.1044",
    "archetype": "Gunslinger",
    "style": "designation"
  }
]

const monikers = cyborgNames.filter(entry => entry.style !== 'designation').map(entry => entry.identity.replace(/[^\p{L}\p{N}]/gu, '').toLowerCase())
const count = style => cyborgNames.filter(entry => entry.style === style).length
if (cyborgNames.length !== 500 || new Set(cyborgNames.map(entry => entry.name)).size !== 500) throw new Error('Cyborg identities must be unique')
if (new Set(monikers).size !== monikers.length) throw new Error('Cyborg monikers must be independently unique')
if (count('designation') !== 50 || count('self-chosen') !== 450) throw new Error('Cyborg identity-style proportions are invalid')
if (cyborgNames.some(entry => entry.name.split(/\s+/).length > 1)) throw new Error('Cyborg identities must be a single moniker or designation')

export default cyborgNames
