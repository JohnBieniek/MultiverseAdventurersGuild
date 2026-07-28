// 500 literal Cyborg identities with globally distinct name tokens.
const cyborgNames = [
  {
    "name": "Warhide Bimbolt",
    "identity": "Warhide",
    "heritage": "Bimbolt",
    "archetype": "Barbarian",
    "origin": "Gnome",
    "style": "heritage"
  },
  {
    "name": "Ragecoil Dornovar",
    "identity": "Ragecoil",
    "heritage": "Dornovar",
    "archetype": "Barbarian",
    "origin": "Dwarf",
    "style": "heritage"
  },
  {
    "name": "Mammoth Corawick",
    "identity": "Mammoth",
    "heritage": "Corawick",
    "archetype": "Barbarian",
    "origin": "Halfling",
    "style": "heritage"
  },
  {
    "name": "Redaxis Lumiglint",
    "identity": "Redaxis",
    "heritage": "Lumiglint",
    "archetype": "Barbarian",
    "origin": "Fairy",
    "style": "heritage"
  },
  {
    "name": "Ironium Mokug",
    "identity": "Ironium",
    "heritage": "Mokug",
    "archetype": "Barbarian",
    "origin": "Orc",
    "style": "heritage"
  },
  {
    "name": "Bonequake Mornahild",
    "identity": "Bonequake",
    "heritage": "Mornahild",
    "archetype": "Barbarian",
    "origin": "Giant",
    "style": "heritage"
  },
  {
    "name": "Wildheart Sereorin",
    "identity": "Wildheart",
    "heritage": "Sereorin",
    "archetype": "Barbarian",
    "origin": "Elf",
    "style": "heritage"
  },
  {
    "name": "Feral Zaradan",
    "identity": "Feral",
    "heritage": "Zaradan",
    "archetype": "Barbarian",
    "origin": "Human",
    "style": "heritage"
  },
  {
    "name": "Blooded Bimsprocket",
    "identity": "Blooded",
    "heritage": "Bimsprocket",
    "archetype": "Barbarian",
    "origin": "Gnome",
    "style": "heritage"
  },
  {
    "name": "Thunderex Dornadar",
    "identity": "Thunderex",
    "heritage": "Dornadar",
    "archetype": "Barbarian",
    "origin": "Dwarf",
    "style": "heritage"
  },
  {
    "name": "Untamed Corameadow",
    "identity": "Untamed",
    "heritage": "Corameadow",
    "archetype": "Barbarian",
    "origin": "Halfling",
    "style": "heritage"
  },
  {
    "name": "Ashenyn Lumiwhim",
    "identity": "Ashenyn",
    "heritage": "Lumiwhim",
    "archetype": "Barbarian",
    "origin": "Fairy",
    "style": "heritage"
  },
  {
    "name": "Savage Mokmokzug",
    "identity": "Savage",
    "heritage": "Mokmokzug",
    "archetype": "Barbarian",
    "origin": "Orc",
    "style": "heritage"
  },
  {
    "name": "Feralos Mornavorn",
    "identity": "Feralos",
    "heritage": "Mornavorn",
    "archetype": "Barbarian",
    "origin": "Giant",
    "style": "heritage"
  },
  {
    "name": "Deadyx Sereeth",
    "identity": "Deadyx",
    "heritage": "Sereeth",
    "archetype": "Bounty Hunter",
    "origin": "Elf",
    "style": "heritage"
  },
  {
    "name": "Warrant Zarasen",
    "identity": "Warrant",
    "heritage": "Zarasen",
    "archetype": "Bounty Hunter",
    "origin": "Human",
    "style": "heritage"
  },
  {
    "name": "Longtrail Bimcog",
    "identity": "Longtrail",
    "heritage": "Bimcog",
    "archetype": "Bounty Hunter",
    "origin": "Gnome",
    "style": "heritage"
  },
  {
    "name": "Coldzen Dornrik",
    "identity": "Coldzen",
    "heritage": "Dornrik",
    "archetype": "Bounty Hunter",
    "origin": "Dwarf",
    "style": "heritage"
  },
  {
    "name": "Lastion Corabarrow",
    "identity": "Lastion",
    "heritage": "Corabarrow",
    "archetype": "Bounty Hunter",
    "origin": "Halfling",
    "style": "heritage"
  },
  {
    "name": "Hound Lumilark",
    "identity": "Hound",
    "heritage": "Lumilark",
    "archetype": "Bounty Hunter",
    "origin": "Fairy",
    "style": "heritage"
  },
  {
    "name": "Verdict Mokzun",
    "identity": "Verdict",
    "heritage": "Mokzun",
    "archetype": "Bounty Hunter",
    "origin": "Orc",
    "style": "heritage"
  },
  {
    "name": "Relentle Mornamund",
    "identity": "Relentle",
    "heritage": "Mornamund",
    "archetype": "Bounty Hunter",
    "origin": "Giant",
    "style": "heritage"
  },
  {
    "name": "Marked Sereune",
    "identity": "Marked",
    "heritage": "Sereune",
    "archetype": "Bounty Hunter",
    "origin": "Elf",
    "style": "heritage"
  },
  {
    "name": "Patient Zaraev",
    "identity": "Patient",
    "heritage": "Zaraev",
    "archetype": "Bounty Hunter",
    "origin": "Human",
    "style": "heritage"
  },
  {
    "name": "Finalium Bimwickspark",
    "identity": "Finalium",
    "heritage": "Bimwickspark",
    "archetype": "Bounty Hunter",
    "origin": "Gnome",
    "style": "heritage"
  },
  {
    "name": "Ironboun Dornek",
    "identity": "Ironboun",
    "heritage": "Dornek",
    "archetype": "Bounty Hunter",
    "origin": "Dwarf",
    "style": "heritage"
  },
  {
    "name": "Trailw Corastead",
    "identity": "Trailw",
    "heritage": "Corastead",
    "archetype": "Bounty Hunter",
    "origin": "Halfling",
    "style": "heritage"
  },
  {
    "name": "Relentleix Lumibelle",
    "identity": "Relentleix",
    "heritage": "Lumibelle",
    "archetype": "Bounty Hunter",
    "origin": "Fairy",
    "style": "heritage"
  },
  {
    "name": "Afterth Mokrak",
    "identity": "Afterth",
    "heritage": "Mokrak",
    "archetype": "Brainiac",
    "origin": "Orc",
    "style": "heritage"
  },
  {
    "name": "Deepex Mornayra",
    "identity": "Deepex",
    "heritage": "Mornayra",
    "archetype": "Brainiac",
    "origin": "Giant",
    "style": "heritage"
  },
  {
    "name": "Brightora Sereiel",
    "identity": "Brightora",
    "heritage": "Sereiel",
    "archetype": "Brainiac",
    "origin": "Elf",
    "style": "heritage"
  },
  {
    "name": "Corollar Zaraval",
    "identity": "Corollar",
    "heritage": "Zaraval",
    "archetype": "Brainiac",
    "origin": "Human",
    "style": "heritage"
  },
  {
    "name": "Mnemonic Bimdocket",
    "identity": "Mnemonic",
    "heritage": "Bimdocket",
    "archetype": "Brainiac",
    "origin": "Gnome",
    "style": "heritage"
  },
  {
    "name": "Longos Dornund",
    "identity": "Longos",
    "heritage": "Dornund",
    "archetype": "Brainiac",
    "origin": "Dwarf",
    "style": "heritage"
  },
  {
    "name": "Second Coracroft",
    "identity": "Second",
    "heritage": "Coracroft",
    "archetype": "Brainiac",
    "origin": "Halfling",
    "style": "heritage"
  },
  {
    "name": "Recursiv Lumimoth",
    "identity": "Recursiv",
    "heritage": "Lumimoth",
    "archetype": "Brainiac",
    "origin": "Fairy",
    "style": "heritage"
  },
  {
    "name": "Lucidous Mokakzug",
    "identity": "Lucidous",
    "heritage": "Mokakzug",
    "archetype": "Brainiac",
    "origin": "Orc",
    "style": "heritage"
  },
  {
    "name": "Peerless Mornaskar",
    "identity": "Peerless",
    "heritage": "Mornaskar",
    "archetype": "Brainiac",
    "origin": "Giant",
    "style": "heritage"
  },
  {
    "name": "Abstract Sereyra",
    "identity": "Abstract",
    "heritage": "Sereyra",
    "archetype": "Brainiac",
    "origin": "Elf",
    "style": "heritage"
  },
  {
    "name": "Cerebral Zaraian",
    "identity": "Cerebral",
    "heritage": "Zaraian",
    "archetype": "Brainiac",
    "origin": "Human",
    "style": "heritage"
  },
  {
    "name": "Exacting Bimwhistle",
    "identity": "Exacting",
    "heritage": "Bimwhistle",
    "archetype": "Brainiac",
    "origin": "Gnome",
    "style": "heritage"
  },
  {
    "name": "Recursivis Dorngrim",
    "identity": "Recursivis",
    "heritage": "Dorngrim",
    "archetype": "Brainiac",
    "origin": "Dwarf",
    "style": "heritage"
  },
  {
    "name": "Mercyum Coravale",
    "identity": "Mercyum",
    "heritage": "Coravale",
    "archetype": "Cleric",
    "origin": "Halfling",
    "style": "heritage"
  },
  {
    "name": "Reliquar Lumifizz",
    "identity": "Reliquar",
    "heritage": "Lumifizz",
    "archetype": "Cleric",
    "origin": "Fairy",
    "style": "heritage"
  },
  {
    "name": "Vigilium Mokthar",
    "identity": "Vigilium",
    "heritage": "Mokthar",
    "archetype": "Cleric",
    "origin": "Orc",
    "style": "heritage"
  },
  {
    "name": "Lastune Mornagrom",
    "identity": "Lastune",
    "heritage": "Mornagrom",
    "archetype": "Cleric",
    "origin": "Giant",
    "style": "heritage"
  },
  {
    "name": "Graceeon Sereiora",
    "identity": "Graceeon",
    "heritage": "Sereiora",
    "archetype": "Cleric",
    "origin": "Elf",
    "style": "heritage"
  },
  {
    "name": "Absoluti Zarayan",
    "identity": "Absoluti",
    "heritage": "Zarayan",
    "archetype": "Cleric",
    "origin": "Human",
    "style": "heritage"
  },
  {
    "name": "Kindly Bimgleam",
    "identity": "Kindly",
    "heritage": "Bimgleam",
    "archetype": "Cleric",
    "origin": "Gnome",
    "style": "heritage"
  },
  {
    "name": "Consecra Dornvar",
    "identity": "Consecra",
    "heritage": "Dornvar",
    "archetype": "Cleric",
    "origin": "Dwarf",
    "style": "heritage"
  },
  {
    "name": "Penitent Corafen",
    "identity": "Penitent",
    "heritage": "Corafen",
    "archetype": "Cleric",
    "origin": "Halfling",
    "style": "heritage"
  },
  {
    "name": "Radiantyn Lumipetal",
    "identity": "Radiantyn",
    "heritage": "Lumipetal",
    "archetype": "Cleric",
    "origin": "Fairy",
    "style": "heritage"
  },
  {
    "name": "Hallowed Mokgarzug",
    "identity": "Hallowed",
    "heritage": "Mokgarzug",
    "archetype": "Cleric",
    "origin": "Orc",
    "style": "heritage"
  },
  {
    "name": "Faithful Mornavald",
    "identity": "Faithful",
    "heritage": "Mornavald",
    "archetype": "Cleric",
    "origin": "Giant",
    "style": "heritage"
  },
  {
    "name": "Reverent Sereanor",
    "identity": "Reverent",
    "heritage": "Sereanor",
    "archetype": "Cleric",
    "origin": "Elf",
    "style": "heritage"
  },
  {
    "name": "Consecraian Zaraora",
    "identity": "Consecraian",
    "heritage": "Zaraora",
    "archetype": "Cleric",
    "origin": "Human",
    "style": "heritage"
  },
  {
    "name": "Breachpo Bimbolta",
    "identity": "Breachpo",
    "heritage": "Bimbolta",
    "archetype": "Commando",
    "origin": "Gnome",
    "style": "heritage"
  },
  {
    "name": "Hard Dornovara",
    "identity": "Hard",
    "heritage": "Dornovara",
    "archetype": "Commando",
    "origin": "Dwarf",
    "style": "heritage"
  },
  {
    "name": "Overwatc Corawicka",
    "identity": "Overwatc",
    "heritage": "Corawicka",
    "archetype": "Commando",
    "origin": "Halfling",
    "style": "heritage"
  },
  {
    "name": "Fireteam Lumiglinta",
    "identity": "Fireteam",
    "heritage": "Lumiglinta",
    "archetype": "Commando",
    "origin": "Fairy",
    "style": "heritage"
  },
  {
    "name": "Firstara Mokuga",
    "identity": "Firstara",
    "heritage": "Mokuga",
    "archetype": "Commando",
    "origin": "Orc",
    "style": "heritage"
  },
  {
    "name": "Stack Mornahilda",
    "identity": "Stack",
    "heritage": "Mornahilda",
    "archetype": "Commando",
    "origin": "Giant",
    "style": "heritage"
  },
  {
    "name": "Blackum Sereorina",
    "identity": "Blackum",
    "heritage": "Sereorina",
    "archetype": "Commando",
    "origin": "Elf",
    "style": "heritage"
  },
  {
    "name": "Tactical Zaradana",
    "identity": "Tactical",
    "heritage": "Zaradana",
    "archetype": "Commando",
    "origin": "Human",
    "style": "heritage"
  },
  {
    "name": "Ballisti Bimsprocketa",
    "identity": "Ballisti",
    "heritage": "Bimsprocketa",
    "archetype": "Commando",
    "origin": "Gnome",
    "style": "heritage"
  },
  {
    "name": "Forward Dornadara",
    "identity": "Forward",
    "heritage": "Dornadara",
    "archetype": "Commando",
    "origin": "Dwarf",
    "style": "heritage"
  },
  {
    "name": "Hardened Corameadowa",
    "identity": "Hardened",
    "heritage": "Corameadowa",
    "archetype": "Commando",
    "origin": "Halfling",
    "style": "heritage"
  },
  {
    "name": "Silentix Lumiwhima",
    "identity": "Silentix",
    "heritage": "Lumiwhima",
    "archetype": "Commando",
    "origin": "Fairy",
    "style": "heritage"
  },
  {
    "name": "Missionus Mokmoka",
    "identity": "Missionus",
    "heritage": "Mokmoka",
    "archetype": "Commando",
    "origin": "Orc",
    "style": "heritage"
  },
  {
    "name": "Tacticalex Mornavorna",
    "identity": "Tacticalex",
    "heritage": "Mornavorna",
    "archetype": "Commando",
    "origin": "Giant",
    "style": "heritage"
  },
  {
    "name": "Nightora Sereetha",
    "identity": "Nightora",
    "heritage": "Sereetha",
    "archetype": "Criminal",
    "origin": "Elf",
    "style": "heritage"
  },
  {
    "name": "False Zarasena",
    "identity": "False",
    "heritage": "Zarasena",
    "archetype": "Criminal",
    "origin": "Human",
    "style": "heritage"
  },
  {
    "name": "Clean Bimcoga",
    "identity": "Clean",
    "heritage": "Bimcoga",
    "archetype": "Criminal",
    "origin": "Gnome",
    "style": "heritage"
  },
  {
    "name": "Lockstep Dornrika",
    "identity": "Lockstep",
    "heritage": "Dornrika",
    "archetype": "Criminal",
    "origin": "Dwarf",
    "style": "heritage"
  },
  {
    "name": "Blackyx Corabarrowa",
    "identity": "Blackyx",
    "heritage": "Corabarrowa",
    "archetype": "Criminal",
    "origin": "Halfling",
    "style": "heritage"
  },
  {
    "name": "Inside Lumilarka",
    "identity": "Inside",
    "heritage": "Lumilarka",
    "archetype": "Criminal",
    "origin": "Fairy",
    "style": "heritage"
  },
  {
    "name": "Quietous Mokzuna",
    "identity": "Quietous",
    "heritage": "Mokzuna",
    "archetype": "Criminal",
    "origin": "Orc",
    "style": "heritage"
  },
  {
    "name": "Unlisted Mornamunda",
    "identity": "Unlisted",
    "heritage": "Mornamunda",
    "archetype": "Criminal",
    "origin": "Giant",
    "style": "heritage"
  },
  {
    "name": "Stolen Sereunea",
    "identity": "Stolen",
    "heritage": "Sereunea",
    "archetype": "Criminal",
    "origin": "Elf",
    "style": "heritage"
  },
  {
    "name": "Ghosted Zaraeva",
    "identity": "Ghosted",
    "heritage": "Zaraeva",
    "archetype": "Criminal",
    "origin": "Human",
    "style": "heritage"
  },
  {
    "name": "Crooked Bimwicka",
    "identity": "Crooked",
    "heritage": "Bimwicka",
    "archetype": "Criminal",
    "origin": "Gnome",
    "style": "heritage"
  },
  {
    "name": "Hiddenis Dorneka",
    "identity": "Hiddenis",
    "heritage": "Dorneka",
    "archetype": "Criminal",
    "origin": "Dwarf",
    "style": "heritage"
  },
  {
    "name": "Namelessum Corasteada",
    "identity": "Namelessum",
    "heritage": "Corasteada",
    "archetype": "Criminal",
    "origin": "Halfling",
    "style": "heritage"
  },
  {
    "name": "Unlistedaxis Lumibellea",
    "identity": "Unlistedaxis",
    "heritage": "Lumibellea",
    "archetype": "Criminal",
    "origin": "Fairy",
    "style": "heritage"
  },
  {
    "name": "Greenium Mokraka",
    "identity": "Greenium",
    "heritage": "Mokraka",
    "archetype": "Druid",
    "origin": "Orc",
    "style": "heritage"
  },
  {
    "name": "Rootsong Mornayraa",
    "identity": "Rootsong",
    "heritage": "Mornayraa",
    "archetype": "Druid",
    "origin": "Giant",
    "style": "heritage"
  },
  {
    "name": "Wildeon Sereiela",
    "identity": "Wildeon",
    "heritage": "Sereiela",
    "archetype": "Druid",
    "origin": "Elf",
    "style": "heritage"
  },
  {
    "name": "Rainix Zaravala",
    "identity": "Rainix",
    "heritage": "Zaravala",
    "archetype": "Druid",
    "origin": "Human",
    "style": "heritage"
  },
  {
    "name": "Oldus Bimdocketa",
    "identity": "Oldus",
    "heritage": "Bimdocketa",
    "archetype": "Druid",
    "origin": "Gnome",
    "style": "heritage"
  },
  {
    "name": "Thornwak Dornunda",
    "identity": "Thornwak",
    "heritage": "Dornunda",
    "archetype": "Druid",
    "origin": "Dwarf",
    "style": "heritage"
  },
  {
    "name": "Mosshear Coracrofta",
    "identity": "Mosshear",
    "heritage": "Coracrofta",
    "archetype": "Druid",
    "origin": "Halfling",
    "style": "heritage"
  },
  {
    "name": "Verdant Lumimotha",
    "identity": "Verdant",
    "heritage": "Lumimotha",
    "archetype": "Druid",
    "origin": "Fairy",
    "style": "heritage"
  },
  {
    "name": "Seasonal Mokaka",
    "identity": "Seasonal",
    "heritage": "Mokaka",
    "archetype": "Druid",
    "origin": "Orc",
    "style": "heritage"
  },
  {
    "name": "Livingos Mornaskara",
    "identity": "Livingos",
    "heritage": "Mornaskara",
    "archetype": "Druid",
    "origin": "Giant",
    "style": "heritage"
  },
  {
    "name": "Primal Sereyraa",
    "identity": "Primal",
    "heritage": "Sereyraa",
    "archetype": "Druid",
    "origin": "Elf",
    "style": "heritage"
  },
  {
    "name": "Overgrow Zaraiana",
    "identity": "Overgrow",
    "heritage": "Zaraiana",
    "archetype": "Druid",
    "origin": "Human",
    "style": "heritage"
  },
  {
    "name": "Earthen Bimwhistlea",
    "identity": "Earthen",
    "heritage": "Bimwhistlea",
    "archetype": "Druid",
    "origin": "Gnome",
    "style": "heritage"
  },
  {
    "name": "Verdantzen Dorngrima",
    "identity": "Verdantzen",
    "heritage": "Dorngrima",
    "archetype": "Druid",
    "origin": "Dwarf",
    "style": "heritage"
  },
  {
    "name": "Greenion Coravalea",
    "identity": "Greenion",
    "heritage": "Coravalea",
    "archetype": "Eco Terrorist",
    "origin": "Halfling",
    "style": "heritage"
  },
  {
    "name": "Lastrix Lumifizza",
    "identity": "Lastrix",
    "heritage": "Lumifizza",
    "archetype": "Eco Terrorist",
    "origin": "Fairy",
    "style": "heritage"
  },
  {
    "name": "Toxic Mokthara",
    "identity": "Toxic",
    "heritage": "Mokthara",
    "archetype": "Eco Terrorist",
    "origin": "Orc",
    "style": "heritage"
  },
  {
    "name": "Seed Mornagroma",
    "identity": "Seed",
    "heritage": "Mornagroma",
    "archetype": "Eco Terrorist",
    "origin": "Giant",
    "style": "heritage"
  },
  {
    "name": "Clearcut Sereioraa",
    "identity": "Clearcut",
    "heritage": "Sereioraa",
    "archetype": "Eco Terrorist",
    "origin": "Elf",
    "style": "heritage"
  },
  {
    "name": "Rewild Zarayana",
    "identity": "Rewild",
    "heritage": "Zarayana",
    "archetype": "Eco Terrorist",
    "origin": "Human",
    "style": "heritage"
  },
  {
    "name": "Ash Bimgleama",
    "identity": "Ash",
    "heritage": "Bimgleama",
    "archetype": "Eco Terrorist",
    "origin": "Gnome",
    "style": "heritage"
  },
  {
    "name": "Radical Dornvara",
    "identity": "Radical",
    "heritage": "Dornvara",
    "archetype": "Eco Terrorist",
    "origin": "Dwarf",
    "style": "heritage"
  },
  {
    "name": "Restorat Corafena",
    "identity": "Restorat",
    "heritage": "Corafena",
    "archetype": "Eco Terrorist",
    "origin": "Halfling",
    "style": "heritage"
  },
  {
    "name": "Unbroken Lumipetala",
    "identity": "Unbroken",
    "heritage": "Lumipetala",
    "archetype": "Eco Terrorist",
    "origin": "Fairy",
    "style": "heritage"
  },
  {
    "name": "Vengeful Mokgara",
    "identity": "Vengeful",
    "heritage": "Mokgara",
    "archetype": "Eco Terrorist",
    "origin": "Orc",
    "style": "heritage"
  },
  {
    "name": "Canopy Mornavalda",
    "identity": "Canopy",
    "heritage": "Mornavalda",
    "archetype": "Eco Terrorist",
    "origin": "Giant",
    "style": "heritage"
  },
  {
    "name": "Watershe Sereanora",
    "identity": "Watershe",
    "heritage": "Sereanora",
    "archetype": "Eco Terrorist",
    "origin": "Elf",
    "style": "heritage"
  },
  {
    "name": "Radicalyn Zaraoraa",
    "identity": "Radicalyn",
    "heritage": "Zaraoraa",
    "archetype": "Eco Terrorist",
    "origin": "Human",
    "style": "heritage"
  },
  {
    "name": "Goldenial Bimboltb",
    "identity": "Goldenial",
    "heritage": "Bimboltb",
    "archetype": "Ex-Company Man",
    "origin": "Gnome",
    "style": "heritage"
  },
  {
    "name": "Exit Dornovarb",
    "identity": "Exit",
    "heritage": "Dornovarb",
    "archetype": "Ex-Company Man",
    "origin": "Dwarf",
    "style": "heritage"
  },
  {
    "name": "Hostile Corawickb",
    "identity": "Hostile",
    "heritage": "Corawickb",
    "archetype": "Ex-Company Man",
    "origin": "Halfling",
    "style": "heritage"
  },
  {
    "name": "Oldian Lumiglintb",
    "identity": "Oldian",
    "heritage": "Lumiglintb",
    "archetype": "Ex-Company Man",
    "origin": "Fairy",
    "style": "heritage"
  },
  {
    "name": "Severanc Mokugb",
    "identity": "Severanc",
    "heritage": "Mokugb",
    "archetype": "Ex-Company Man",
    "origin": "Orc",
    "style": "heritage"
  },
  {
    "name": "Boardroo Mornahildb",
    "identity": "Boardroo",
    "heritage": "Mornahildb",
    "archetype": "Ex-Company Man",
    "origin": "Giant",
    "style": "heritage"
  },
  {
    "name": "Proxy Sereorinb",
    "identity": "Proxy",
    "heritage": "Sereorinb",
    "archetype": "Ex-Company Man",
    "origin": "Elf",
    "style": "heritage"
  },
  {
    "name": "Executiv Zaradanb",
    "identity": "Executiv",
    "heritage": "Zaradanb",
    "archetype": "Ex-Company Man",
    "origin": "Human",
    "style": "heritage"
  },
  {
    "name": "Disavowe Bimsprocketb",
    "identity": "Disavowe",
    "heritage": "Bimsprocketb",
    "archetype": "Ex-Company Man",
    "origin": "Gnome",
    "style": "heritage"
  },
  {
    "name": "Corporat Dornadarb",
    "identity": "Corporat",
    "heritage": "Dornadarb",
    "archetype": "Ex-Company Man",
    "origin": "Dwarf",
    "style": "heritage"
  },
  {
    "name": "Legacy Corameadowb",
    "identity": "Legacy",
    "heritage": "Corameadowb",
    "archetype": "Ex-Company Man",
    "origin": "Halfling",
    "style": "heritage"
  },
  {
    "name": "Platin Lumiwhimb",
    "identity": "Platin",
    "heritage": "Lumiwhimb",
    "archetype": "Ex-Company Man",
    "origin": "Fairy",
    "style": "heritage"
  },
  {
    "name": "Offbook Mokmokb",
    "identity": "Offbook",
    "heritage": "Mokmokb",
    "archetype": "Ex-Company Man",
    "origin": "Orc",
    "style": "heritage"
  },
  {
    "name": "Executivune Mornavornb",
    "identity": "Executivune",
    "heritage": "Mornavornb",
    "archetype": "Ex-Company Man",
    "origin": "Giant",
    "style": "heritage"
  },
  {
    "name": "Coldeon Sereethb",
    "identity": "Coldeon",
    "heritage": "Sereethb",
    "archetype": "Ex-Cop",
    "origin": "Elf",
    "style": "heritage"
  },
  {
    "name": "Oldix Zarasenb",
    "identity": "Oldix",
    "heritage": "Zarasenb",
    "archetype": "Ex-Cop",
    "origin": "Human",
    "style": "heritage"
  },
  {
    "name": "Blueus Bimcogb",
    "identity": "Blueus",
    "heritage": "Bimcogb",
    "archetype": "Ex-Cop",
    "origin": "Gnome",
    "style": "heritage"
  },
  {
    "name": "Finalex Dornrikb",
    "identity": "Finalex",
    "heritage": "Dornrikb",
    "archetype": "Ex-Cop",
    "origin": "Dwarf",
    "style": "heritage"
  },
  {
    "name": "Beatwalk Corabarrowb",
    "identity": "Beatwalk",
    "heritage": "Corabarrowb",
    "archetype": "Ex-Cop",
    "origin": "Halfling",
    "style": "heritage"
  },
  {
    "name": "Thinyn Lumilarkb",
    "identity": "Thinyn",
    "heritage": "Lumilarkb",
    "archetype": "Ex-Cop",
    "origin": "Fairy",
    "style": "heritage"
  },
  {
    "name": "Case Mokzunb",
    "identity": "Case",
    "heritage": "Mokzunb",
    "archetype": "Ex-Cop",
    "origin": "Orc",
    "style": "heritage"
  },
  {
    "name": "Retiredos Mornamundb",
    "identity": "Retiredos",
    "heritage": "Mornamundb",
    "archetype": "Ex-Cop",
    "origin": "Giant",
    "style": "heritage"
  },
  {
    "name": "Watchful Sereuneb",
    "identity": "Watchful",
    "heritage": "Sereuneb",
    "archetype": "Ex-Cop",
    "origin": "Elf",
    "style": "heritage"
  },
  {
    "name": "Procedur Zaraevb",
    "identity": "Procedur",
    "heritage": "Zaraevb",
    "archetype": "Ex-Cop",
    "origin": "Human",
    "style": "heritage"
  },
  {
    "name": "Dogged Bimwickb",
    "identity": "Dogged",
    "heritage": "Bimwickb",
    "archetype": "Ex-Cop",
    "origin": "Gnome",
    "style": "heritage"
  },
  {
    "name": "Streetwi Dornekb",
    "identity": "Streetwi",
    "heritage": "Dornekb",
    "archetype": "Ex-Cop",
    "origin": "Dwarf",
    "style": "heritage"
  },
  {
    "name": "Unbadged Corasteadb",
    "identity": "Unbadged",
    "heritage": "Corasteadb",
    "archetype": "Ex-Cop",
    "origin": "Halfling",
    "style": "heritage"
  },
  {
    "name": "Retiredrix Lumibelleb",
    "identity": "Retiredrix",
    "heritage": "Lumibelleb",
    "archetype": "Ex-Cop",
    "origin": "Fairy",
    "style": "heritage"
  },
  {
    "name": "Oldara Mokrakb",
    "identity": "Oldara",
    "heritage": "Mokrakb",
    "archetype": "Ex-Military",
    "origin": "Orc",
    "style": "heritage"
  },
  {
    "name": "Campaign Mornayrab",
    "identity": "Campaign",
    "heritage": "Mornayrab",
    "archetype": "Ex-Military",
    "origin": "Giant",
    "style": "heritage"
  },
  {
    "name": "Unit Sereielb",
    "identity": "Unit",
    "heritage": "Sereielb",
    "archetype": "Ex-Military",
    "origin": "Elf",
    "style": "heritage"
  },
  {
    "name": "Marchste Zaravalb",
    "identity": "Marchste",
    "heritage": "Zaravalb",
    "archetype": "Ex-Military",
    "origin": "Human",
    "style": "heritage"
  },
  {
    "name": "Lastium Bimdocketb",
    "identity": "Lastium",
    "heritage": "Bimdocketb",
    "archetype": "Ex-Military",
    "origin": "Gnome",
    "style": "heritage"
  },
  {
    "name": "Field Dornundb",
    "identity": "Field",
    "heritage": "Dornundb",
    "archetype": "Ex-Military",
    "origin": "Dwarf",
    "style": "heritage"
  },
  {
    "name": "Veteran Coracroftb",
    "identity": "Veteran",
    "heritage": "Coracroftb",
    "archetype": "Ex-Military",
    "origin": "Halfling",
    "style": "heritage"
  },
  {
    "name": "Decorate Lumimothb",
    "identity": "Decorate",
    "heritage": "Lumimothb",
    "archetype": "Ex-Military",
    "origin": "Fairy",
    "style": "heritage"
  },
  {
    "name": "Battlew Mokakb",
    "identity": "Battlew",
    "heritage": "Mokakb",
    "archetype": "Ex-Military",
    "origin": "Orc",
    "style": "heritage"
  },
  {
    "name": "Discharg Mornaskarb",
    "identity": "Discharg",
    "heritage": "Mornaskarb",
    "archetype": "Ex-Military",
    "origin": "Giant",
    "style": "heritage"
  },
  {
    "name": "Regiment Sereyrab",
    "identity": "Regiment",
    "heritage": "Sereyrab",
    "archetype": "Ex-Military",
    "origin": "Elf",
    "style": "heritage"
  },
  {
    "name": "Service Zaraianb",
    "identity": "Service",
    "heritage": "Zaraianb",
    "archetype": "Ex-Military",
    "origin": "Human",
    "style": "heritage"
  },
  {
    "name": "Frontlin Bimwhistleb",
    "identity": "Frontlin",
    "heritage": "Bimwhistleb",
    "archetype": "Ex-Military",
    "origin": "Gnome",
    "style": "heritage"
  },
  {
    "name": "Decorateos Dorngrimb",
    "identity": "Decorateos",
    "heritage": "Dorngrimb",
    "archetype": "Ex-Military",
    "origin": "Dwarf",
    "style": "heritage"
  },
  {
    "name": "Prime Coravaleb",
    "identity": "Prime",
    "heritage": "Coravaleb",
    "archetype": "Cog",
    "origin": "Halfling",
    "style": "heritage"
  },
  {
    "name": "Fine Lumifizzb",
    "identity": "Fine",
    "heritage": "Lumifizzb",
    "archetype": "Cog",
    "origin": "Fairy",
    "style": "heritage"
  },
  {
    "name": "Maker Moktharb",
    "identity": "Maker",
    "heritage": "Moktharb",
    "archetype": "Cog",
    "origin": "Orc",
    "style": "heritage"
  },
  {
    "name": "Clockhea Mornagromb",
    "identity": "Clockhea",
    "heritage": "Mornagromb",
    "archetype": "Cog",
    "origin": "Giant",
    "style": "heritage"
  },
  {
    "name": "True Sereiorab",
    "identity": "True",
    "heritage": "Sereiorab",
    "archetype": "Cog",
    "origin": "Elf",
    "style": "heritage"
  },
  {
    "name": "Brightrix Zarayanb",
    "identity": "Brightrix",
    "heritage": "Zarayanb",
    "archetype": "Cog",
    "origin": "Human",
    "style": "heritage"
  },
  {
    "name": "Masterwo Bimgleamb",
    "identity": "Masterwo",
    "heritage": "Bimgleamb",
    "archetype": "Cog",
    "origin": "Gnome",
    "style": "heritage"
  },
  {
    "name": "Calibrat Dornvarb",
    "identity": "Calibrat",
    "heritage": "Dornvarb",
    "archetype": "Cog",
    "origin": "Dwarf",
    "style": "heritage"
  },
  {
    "name": "Precisio Corafenb",
    "identity": "Precisio",
    "heritage": "Corafenb",
    "archetype": "Cog",
    "origin": "Halfling",
    "style": "heritage"
  },
  {
    "name": "Handbuil Lumipetalb",
    "identity": "Handbuil",
    "heritage": "Lumipetalb",
    "archetype": "Cog",
    "origin": "Fairy",
    "style": "heritage"
  },
  {
    "name": "Ingeniou Mokgarb",
    "identity": "Ingeniou",
    "heritage": "Mokgarb",
    "archetype": "Cog",
    "origin": "Orc",
    "style": "heritage"
  },
  {
    "name": "Tempered Mornavaldb",
    "identity": "Tempered",
    "heritage": "Mornavaldb",
    "archetype": "Cog",
    "origin": "Giant",
    "style": "heritage"
  },
  {
    "name": "Artifice Sereanorb",
    "identity": "Artifice",
    "heritage": "Sereanorb",
    "archetype": "Cog",
    "origin": "Elf",
    "style": "heritage"
  },
  {
    "name": "Calibratix Zaraorab",
    "identity": "Calibratix",
    "heritage": "Zaraorab",
    "archetype": "Cog",
    "origin": "Human",
    "style": "heritage"
  },
  {
    "name": "Firstus Bimboltc",
    "identity": "Firstus",
    "heritage": "Bimboltc",
    "archetype": "Face",
    "origin": "Gnome",
    "style": "heritage"
  },
  {
    "name": "Velvetex Dornovarc",
    "identity": "Velvetex",
    "heritage": "Dornovarc",
    "archetype": "Face",
    "origin": "Dwarf",
    "style": "heritage"
  },
  {
    "name": "Spotligh Corawickc",
    "identity": "Spotligh",
    "heritage": "Corawickc",
    "archetype": "Face",
    "origin": "Halfling",
    "style": "heritage"
  },
  {
    "name": "Openyn Lumiglintc",
    "identity": "Openyn",
    "heritage": "Lumiglintc",
    "archetype": "Face",
    "origin": "Fairy",
    "style": "heritage"
  },
  {
    "name": "Easy Mokugc",
    "identity": "Easy",
    "heritage": "Mokugc",
    "archetype": "Face",
    "origin": "Orc",
    "style": "heritage"
  },
  {
    "name": "Good Mornahildc",
    "identity": "Good",
    "heritage": "Mornahildc",
    "archetype": "Face",
    "origin": "Giant",
    "style": "heritage"
  },
  {
    "name": "Silveryx Sereorinc",
    "identity": "Silveryx",
    "heritage": "Sereorinc",
    "archetype": "Face",
    "origin": "Elf",
    "style": "heritage"
  },
  {
    "name": "Magnetic Zaradanc",
    "identity": "Magnetic",
    "heritage": "Zaradanc",
    "archetype": "Face",
    "origin": "Human",
    "style": "heritage"
  },
  {
    "name": "Tailored Bimsprocketc",
    "identity": "Tailored",
    "heritage": "Bimsprocketc",
    "archetype": "Face",
    "origin": "Gnome",
    "style": "heritage"
  },
  {
    "name": "Charming Dornadarc",
    "identity": "Charming",
    "heritage": "Dornadarc",
    "archetype": "Face",
    "origin": "Dwarf",
    "style": "heritage"
  },
  {
    "name": "Polished Corameadowc",
    "identity": "Polished",
    "heritage": "Corameadowc",
    "archetype": "Face",
    "origin": "Halfling",
    "style": "heritage"
  },
  {
    "name": "Graci Lumiwhimc",
    "identity": "Graci",
    "heritage": "Lumiwhimc",
    "archetype": "Face",
    "origin": "Fairy",
    "style": "heritage"
  },
  {
    "name": "Beloved Mokmokc",
    "identity": "Beloved",
    "heritage": "Mokmokc",
    "archetype": "Face",
    "origin": "Orc",
    "style": "heritage"
  },
  {
    "name": "Magneticis Mornavornc",
    "identity": "Magneticis",
    "heritage": "Mornavornc",
    "archetype": "Face",
    "origin": "Giant",
    "style": "heritage"
  },
  {
    "name": "Openum Sereethc",
    "identity": "Openum",
    "heritage": "Sereethc",
    "archetype": "Fixer",
    "origin": "Elf",
    "style": "heritage"
  },
  {
    "name": "Rare Zarasenc",
    "identity": "Rare",
    "heritage": "Zarasenc",
    "archetype": "Fixer",
    "origin": "Human",
    "style": "heritage"
  },
  {
    "name": "Favor Bimcogc",
    "identity": "Favor",
    "heritage": "Bimcogc",
    "archetype": "Fixer",
    "origin": "Gnome",
    "style": "heritage"
  },
  {
    "name": "Right Dornrikc",
    "identity": "Right",
    "heritage": "Dornrikc",
    "archetype": "Fixer",
    "origin": "Dwarf",
    "style": "heritage"
  },
  {
    "name": "Back Corabarrowc",
    "identity": "Back",
    "heritage": "Corabarrowc",
    "archetype": "Fixer",
    "origin": "Halfling",
    "style": "heritage"
  },
  {
    "name": "Supply Lumilarkc",
    "identity": "Supply",
    "heritage": "Lumilarkc",
    "archetype": "Fixer",
    "origin": "Fairy",
    "style": "heritage"
  },
  {
    "name": "Handshak Mokzunc",
    "identity": "Handshak",
    "heritage": "Mokzunc",
    "archetype": "Fixer",
    "origin": "Orc",
    "style": "heritage"
  },
  {
    "name": "Connecte Mornamundc",
    "identity": "Connecte",
    "heritage": "Mornamundc",
    "archetype": "Fixer",
    "origin": "Giant",
    "style": "heritage"
  },
  {
    "name": "Resource Sereunec",
    "identity": "Resource",
    "heritage": "Sereunec",
    "archetype": "Fixer",
    "origin": "Elf",
    "style": "heritage"
  },
  {
    "name": "Wholesal Zaraevc",
    "identity": "Wholesal",
    "heritage": "Zaraevc",
    "archetype": "Fixer",
    "origin": "Human",
    "style": "heritage"
  },
  {
    "name": "Discrete Bimwickc",
    "identity": "Discrete",
    "heritage": "Bimwickc",
    "archetype": "Fixer",
    "origin": "Gnome",
    "style": "heritage"
  },
  {
    "name": "Brokered Dornekc",
    "identity": "Brokered",
    "heritage": "Dornekc",
    "archetype": "Fixer",
    "origin": "Dwarf",
    "style": "heritage"
  },
  {
    "name": "Wellstoc Corasteadc",
    "identity": "Wellstoc",
    "heritage": "Corasteadc",
    "archetype": "Fixer",
    "origin": "Halfling",
    "style": "heritage"
  },
  {
    "name": "Connecteian Lumibellec",
    "identity": "Connecteian",
    "heritage": "Lumibellec",
    "archetype": "Fixer",
    "origin": "Fairy",
    "style": "heritage"
  },
  {
    "name": "Block Mokrakc",
    "identity": "Block",
    "heritage": "Mokrakc",
    "archetype": "Ganger",
    "origin": "Orc",
    "style": "heritage"
  },
  {
    "name": "Corner Mornayrac",
    "identity": "Corner",
    "heritage": "Mornayrac",
    "archetype": "Ganger",
    "origin": "Giant",
    "style": "heritage"
  },
  {
    "name": "Oldion Sereielc",
    "identity": "Oldion",
    "heritage": "Sereielc",
    "archetype": "Ganger",
    "origin": "Elf",
    "style": "heritage"
  },
  {
    "name": "Streetrix Zaravalc",
    "identity": "Streetrix",
    "heritage": "Zaravalc",
    "archetype": "Ganger",
    "origin": "Human",
    "style": "heritage"
  },
  {
    "name": "Blockborn Bimdocketc",
    "identity": "Blockborn",
    "heritage": "Bimdocketc",
    "archetype": "Ganger",
    "origin": "Gnome",
    "style": "heritage"
  },
  {
    "name": "Home Dornundc",
    "identity": "Home",
    "heritage": "Dornundc",
    "archetype": "Ganger",
    "origin": "Dwarf",
    "style": "heritage"
  },
  {
    "name": "Alley Coracroftc",
    "identity": "Alley",
    "heritage": "Coracroftc",
    "archetype": "Ganger",
    "origin": "Halfling",
    "style": "heritage"
  },
  {
    "name": "Local Lumimothc",
    "identity": "Local",
    "heritage": "Lumimothc",
    "archetype": "Ganger",
    "origin": "Fairy",
    "style": "heritage"
  },
  {
    "name": "Scarred Mokakc",
    "identity": "Scarred",
    "heritage": "Mokakc",
    "archetype": "Ganger",
    "origin": "Orc",
    "style": "heritage"
  },
  {
    "name": "Loyal Mornaskarc",
    "identity": "Loyal",
    "heritage": "Mornaskarc",
    "archetype": "Ganger",
    "origin": "Giant",
    "style": "heritage"
  },
  {
    "name": "Neighbor Sereyrac",
    "identity": "Neighbor",
    "heritage": "Sereyrac",
    "archetype": "Ganger",
    "origin": "Elf",
    "style": "heritage"
  },
  {
    "name": "Graffiti Zaraianc",
    "identity": "Graffiti",
    "heritage": "Zaraianc",
    "archetype": "Ganger",
    "origin": "Human",
    "style": "heritage"
  },
  {
    "name": "Concrete Bimwhistlec",
    "identity": "Concrete",
    "heritage": "Bimwhistlec",
    "archetype": "Ganger",
    "origin": "Gnome",
    "style": "heritage"
  },
  {
    "name": "Localex Dorngrimc",
    "identity": "Localex",
    "heritage": "Dorngrimc",
    "archetype": "Ganger",
    "origin": "Dwarf",
    "style": "heritage"
  },
  {
    "name": "Hot Coravalec",
    "identity": "Hot",
    "heritage": "Coravalec",
    "archetype": "Gonzo Journalist",
    "origin": "Halfling",
    "style": "heritage"
  },
  {
    "name": "Deadline Lumifizzc",
    "identity": "Deadline",
    "heritage": "Lumifizzc",
    "archetype": "Gonzo Journalist",
    "origin": "Fairy",
    "style": "heritage"
  },
  {
    "name": "Byline Moktharc",
    "identity": "Byline",
    "heritage": "Moktharc",
    "archetype": "Gonzo Journalist",
    "origin": "Orc",
    "style": "heritage"
  },
  {
    "name": "Truth Mornagromc",
    "identity": "Truth",
    "heritage": "Mornagromc",
    "archetype": "Gonzo Journalist",
    "origin": "Giant",
    "style": "heritage"
  },
  {
    "name": "Front Sereiorac",
    "identity": "Front",
    "heritage": "Sereiorac",
    "archetype": "Gonzo Journalist",
    "origin": "Elf",
    "style": "heritage"
  },
  {
    "name": "Live Zarayanc",
    "identity": "Live",
    "heritage": "Zarayanc",
    "archetype": "Gonzo Journalist",
    "origin": "Human",
    "style": "heritage"
  },
  {
    "name": "Unfiltered Bimgleamc",
    "identity": "Unfiltered",
    "heritage": "Bimgleamc",
    "archetype": "Gonzo Journalist",
    "origin": "Gnome",
    "style": "heritage"
  },
  {
    "name": "Breaking Dornvarc",
    "identity": "Breaking",
    "heritage": "Dornvarc",
    "archetype": "Gonzo Journalist",
    "origin": "Dwarf",
    "style": "heritage"
  },
  {
    "name": "Uncensor Corafenc",
    "identity": "Uncensor",
    "heritage": "Corafenc",
    "archetype": "Gonzo Journalist",
    "origin": "Halfling",
    "style": "heritage"
  },
  {
    "name": "Embedded Lumipetalc",
    "identity": "Embedded",
    "heritage": "Lumipetalc",
    "archetype": "Gonzo Journalist",
    "origin": "Fairy",
    "style": "heritage"
  },
  {
    "name": "Fearless Mokgarc",
    "identity": "Fearless",
    "heritage": "Mokgarc",
    "archetype": "Gonzo Journalist",
    "origin": "Orc",
    "style": "heritage"
  },
  {
    "name": "Eyewitness Mornavaldc",
    "identity": "Eyewitness",
    "heritage": "Mornavaldc",
    "archetype": "Gonzo Journalist",
    "origin": "Giant",
    "style": "heritage"
  },
  {
    "name": "Unedited Sereanorc",
    "identity": "Unedited",
    "heritage": "Sereanorc",
    "archetype": "Gonzo Journalist",
    "origin": "Elf",
    "style": "heritage"
  },
  {
    "name": "Breakingaxis Zaraorac",
    "identity": "Breakingaxis",
    "heritage": "Zaraorac",
    "archetype": "Gonzo Journalist",
    "origin": "Human",
    "style": "heritage"
  },
  {
    "name": "Highium Bimboltd",
    "identity": "Highium",
    "heritage": "Bimboltd",
    "archetype": "Gunslinger",
    "origin": "Gnome",
    "style": "heritage"
  },
  {
    "name": "Quick",
    "identity": "Quick",
    "archetype": "Gunslinger",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Lasteon",
    "identity": "Lasteon",
    "archetype": "Gunslinger",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Longix",
    "identity": "Longix",
    "archetype": "Gunslinger",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Deadus",
    "identity": "Deadus",
    "archetype": "Gunslinger",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Longex",
    "identity": "Longex",
    "archetype": "Gunslinger",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Sightline",
    "identity": "Sightline",
    "archetype": "Gunslinger",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Fastdraw",
    "identity": "Fastdraw",
    "archetype": "Gunslinger",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Truehand",
    "identity": "Truehand",
    "archetype": "Gunslinger",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Dustborn",
    "identity": "Dustborn",
    "archetype": "Gunslinger",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Steady",
    "identity": "Steady",
    "archetype": "Gunslinger",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Lonesome",
    "identity": "Lonesome",
    "archetype": "Gunslinger",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Frontierous",
    "identity": "Frontierous",
    "archetype": "Gunslinger",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Fastdrawzen",
    "identity": "Fastdrawzen",
    "archetype": "Gunslinger",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Rootion",
    "identity": "Rootion",
    "archetype": "Hacker",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Zerorix",
    "identity": "Zerorix",
    "archetype": "Hacker",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Side",
    "identity": "Side",
    "archetype": "Hacker",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Nullis",
    "identity": "Nullis",
    "archetype": "Hacker",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Coldum",
    "identity": "Coldum",
    "archetype": "Hacker",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Dark",
    "identity": "Dark",
    "archetype": "Hacker",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Freeware",
    "identity": "Freeware",
    "archetype": "Hacker",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Encrypte",
    "identity": "Encrypte",
    "archetype": "Hacker",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Rooted",
    "identity": "Rooted",
    "archetype": "Hacker",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Airgappe",
    "identity": "Airgappe",
    "archetype": "Hacker",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Recursivus",
    "identity": "Recursivus",
    "archetype": "Hacker",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Unpatche",
    "identity": "Unpatche",
    "archetype": "Hacker",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Jailbrok",
    "identity": "Jailbrok",
    "archetype": "Hacker",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Encrypteyn",
    "identity": "Encrypteyn",
    "archetype": "Hacker",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Finalial",
    "identity": "Finalial",
    "archetype": "Mad Bomber",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Blast",
    "identity": "Blast",
    "archetype": "Mad Bomber",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Ticktock",
    "identity": "Ticktock",
    "archetype": "Mad Bomber",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Redian",
    "identity": "Redian",
    "archetype": "Mad Bomber",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Aftersho",
    "identity": "Aftersho",
    "archetype": "Mad Bomber",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Controll",
    "identity": "Controll",
    "archetype": "Mad Bomber",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Loud",
    "identity": "Loud",
    "archetype": "Mad Bomber",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Volatile",
    "identity": "Volatile",
    "archetype": "Mad Bomber",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Timed",
    "identity": "Timed",
    "archetype": "Mad Bomber",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Shaped",
    "identity": "Shaped",
    "archetype": "Mad Bomber",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Detonat",
    "identity": "Detonat",
    "archetype": "Mad Bomber",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Unstable",
    "identity": "Unstable",
    "archetype": "Mad Bomber",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Explosiv",
    "identity": "Explosiv",
    "archetype": "Mad Bomber",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Volatileune",
    "identity": "Volatileune",
    "archetype": "Mad Bomber",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Spellfra",
    "identity": "Spellfra",
    "archetype": "Mage",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Leyline",
    "identity": "Leyline",
    "archetype": "Mage",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Runewire",
    "identity": "Runewire",
    "archetype": "Mage",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Brightex",
    "identity": "Brightex",
    "archetype": "Mage",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Arcane",
    "identity": "Arcane",
    "archetype": "Mage",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Mana",
    "identity": "Mana",
    "archetype": "Mage",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Nineial",
    "identity": "Nineial",
    "archetype": "Mage",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Enchante",
    "identity": "Enchante",
    "archetype": "Mage",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Thaumic",
    "identity": "Thaumic",
    "archetype": "Mage",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Runed",
    "identity": "Runed",
    "archetype": "Mage",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Mystic",
    "identity": "Mystic",
    "archetype": "Mage",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Aetheric",
    "identity": "Aetheric",
    "archetype": "Mage",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Sorcerou",
    "identity": "Sorcerou",
    "archetype": "Mage",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Enchanterix",
    "identity": "Enchanterix",
    "archetype": "Mage",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Paygrade",
    "identity": "Paygrade",
    "archetype": "Mercenary",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Contract",
    "identity": "Contract",
    "archetype": "Mercenary",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Escrow",
    "identity": "Escrow",
    "archetype": "Mercenary",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Soldier",
    "identity": "Soldier",
    "archetype": "Mercenary",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Hazard",
    "identity": "Hazard",
    "archetype": "Mercenary",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Cashfire",
    "identity": "Cashfire",
    "archetype": "Mercenary",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Terms",
    "identity": "Terms",
    "archetype": "Mercenary",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Professi",
    "identity": "Professi",
    "archetype": "Mercenary",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Retained",
    "identity": "Retained",
    "archetype": "Mercenary",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Freelanc",
    "identity": "Freelanc",
    "archetype": "Mercenary",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Expensiv",
    "identity": "Expensiv",
    "archetype": "Mercenary",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Contractyn",
    "identity": "Contractyn",
    "archetype": "Mercenary",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Battlepa",
    "identity": "Battlepa",
    "archetype": "Mercenary",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Professios",
    "identity": "Professios",
    "archetype": "Mercenary",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Stillyx",
    "identity": "Stillyx",
    "archetype": "Monk",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Emptyian",
    "identity": "Emptyian",
    "archetype": "Monk",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Quietune",
    "identity": "Quietune",
    "archetype": "Monk",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Sevenzen",
    "identity": "Sevenzen",
    "archetype": "Monk",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Centerli",
    "identity": "Centerli",
    "archetype": "Monk",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Patientrix",
    "identity": "Patientrix",
    "archetype": "Monk",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Openara",
    "identity": "Openara",
    "archetype": "Monk",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Centered",
    "identity": "Centered",
    "archetype": "Monk",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Discipl",
    "identity": "Discipl",
    "archetype": "Monk",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Weightle",
    "identity": "Weightle",
    "archetype": "Monk",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Mindful",
    "identity": "Mindful",
    "archetype": "Monk",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Templeune",
    "identity": "Templeune",
    "archetype": "Monk",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Untroubl",
    "identity": "Untroubl",
    "archetype": "Monk",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Emptyix",
    "identity": "Emptyix",
    "archetype": "Ninja",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Moonless",
    "identity": "Moonless",
    "archetype": "Ninja",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Silkex",
    "identity": "Silkex",
    "archetype": "Ninja",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Hiddenora",
    "identity": "Hiddenora",
    "archetype": "Ninja",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Nocturne",
    "identity": "Nocturne",
    "archetype": "Ninja",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Roofline",
    "identity": "Roofline",
    "archetype": "Ninja",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Quietos",
    "identity": "Quietos",
    "archetype": "Ninja",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Unseen",
    "identity": "Unseen",
    "archetype": "Ninja",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Soundles",
    "identity": "Soundles",
    "archetype": "Ninja",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Veiled",
    "identity": "Veiled",
    "archetype": "Ninja",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Patientzen",
    "identity": "Patientzen",
    "archetype": "Ninja",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Midnightion",
    "identity": "Midnightion",
    "archetype": "Ninja",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Smokecla",
    "identity": "Smokecla",
    "archetype": "Ninja",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Songbird",
    "identity": "Songbird",
    "archetype": "Performer",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Encore",
    "identity": "Encore",
    "archetype": "Performer",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Brightum",
    "identity": "Brightum",
    "archetype": "Performer",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Headlineaxis",
    "identity": "Headlineaxis",
    "archetype": "Performer",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Velvetium",
    "identity": "Velvetium",
    "archetype": "Performer",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Standing",
    "identity": "Standing",
    "archetype": "Performer",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Stagefir",
    "identity": "Stagefir",
    "archetype": "Performer",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Resonant",
    "identity": "Resonant",
    "archetype": "Performer",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Melodic",
    "identity": "Melodic",
    "archetype": "Performer",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Dazzling",
    "identity": "Dazzling",
    "archetype": "Performer",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Virtuoso",
    "identity": "Virtuoso",
    "archetype": "Performer",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Showstop",
    "identity": "Showstop",
    "archetype": "Performer",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Harmonicial",
    "identity": "Harmonicial",
    "archetype": "Performer",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Loose",
    "identity": "Loose",
    "archetype": "Private Eye/Investigator",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Rainyx",
    "identity": "Rainyx",
    "archetype": "Private Eye/Investigator",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Casefile",
    "identity": "Casefile",
    "archetype": "Private Eye/Investigator",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Nightous",
    "identity": "Nightous",
    "archetype": "Private Eye/Investigator",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Missing",
    "identity": "Missing",
    "archetype": "Private Eye/Investigator",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Shoeleat",
    "identity": "Shoeleat",
    "archetype": "Private Eye/Investigator",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Hardrix",
    "identity": "Hardrix",
    "archetype": "Private Eye/Investigator",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Inquirin",
    "identity": "Inquirin",
    "archetype": "Private Eye/Investigator",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Tenaciou",
    "identity": "Tenaciou",
    "archetype": "Private Eye/Investigator",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Observan",
    "identity": "Observan",
    "archetype": "Private Eye/Investigator",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Raincoat",
    "identity": "Raincoat",
    "archetype": "Private Eye/Investigator",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Suspicio",
    "identity": "Suspicio",
    "archetype": "Private Eye/Investigator",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Methodic",
    "identity": "Methodic",
    "archetype": "Private Eye/Investigator",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Redline",
    "identity": "Redline",
    "archetype": "Screamer",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Ampstorm",
    "identity": "Ampstorm",
    "archetype": "Screamer",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Overstee",
    "identity": "Overstee",
    "archetype": "Screamer",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Burnout",
    "identity": "Burnout",
    "archetype": "Screamer",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Fast",
    "identity": "Fast",
    "archetype": "Screamer",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Slipstre",
    "identity": "Slipstre",
    "archetype": "Screamer",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Greenial",
    "identity": "Greenial",
    "archetype": "Screamer",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Overcloc",
    "identity": "Overcloc",
    "archetype": "Screamer",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Turbocha",
    "identity": "Turbocha",
    "archetype": "Screamer",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Roadborn",
    "identity": "Roadborn",
    "archetype": "Screamer",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Fullthro",
    "identity": "Fullthro",
    "archetype": "Screamer",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Cornerwi",
    "identity": "Cornerwi",
    "archetype": "Screamer",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Highocta",
    "identity": "Highocta",
    "archetype": "Screamer",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Spiritrix",
    "identity": "Spiritrix",
    "archetype": "Shaman",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Ancestor",
    "identity": "Ancestor",
    "archetype": "Shaman",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Dreamis",
    "identity": "Dreamis",
    "archetype": "Shaman",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Ghostum",
    "identity": "Ghostum",
    "archetype": "Shaman",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Totem",
    "identity": "Totem",
    "archetype": "Shaman",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Other",
    "identity": "Other",
    "archetype": "Shaman",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Veilune",
    "identity": "Veilune",
    "archetype": "Shaman",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Ancestra",
    "identity": "Ancestra",
    "archetype": "Shaman",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Visiona",
    "identity": "Visiona",
    "archetype": "Shaman",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Spiritb",
    "identity": "Spiritb",
    "archetype": "Shaman",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Trancebo",
    "identity": "Trancebo",
    "archetype": "Shaman",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Ritual",
    "identity": "Ritual",
    "archetype": "Shaman",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Dreamingyn",
    "identity": "Dreamingyn",
    "archetype": "Shaman",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Falseial",
    "identity": "Falseial",
    "archetype": "Smuggler",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Quietum",
    "identity": "Quietum",
    "archetype": "Smuggler",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Openyx",
    "identity": "Openyx",
    "archetype": "Smuggler",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Hiddenian",
    "identity": "Hiddenian",
    "archetype": "Smuggler",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Nightune",
    "identity": "Nightune",
    "archetype": "Smuggler",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Freezen",
    "identity": "Freezen",
    "archetype": "Smuggler",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Customsion",
    "identity": "Customsion",
    "archetype": "Smuggler",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Unmanife",
    "identity": "Unmanife",
    "archetype": "Smuggler",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Contraba",
    "identity": "Contraba",
    "archetype": "Smuggler",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Borderle",
    "identity": "Borderle",
    "archetype": "Smuggler",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Unsearch",
    "identity": "Unsearch",
    "archetype": "Smuggler",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Offroute",
    "identity": "Offroute",
    "archetype": "Smuggler",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Sealed",
    "identity": "Sealed",
    "archetype": "Smuggler",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Farune",
    "identity": "Farune",
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
    "name": "Coldix",
    "identity": "Coldix",
    "archetype": "Sniper",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Longus",
    "identity": "Longus",
    "archetype": "Sniper",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Stillex",
    "identity": "Stillex",
    "archetype": "Sniper",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Lastora",
    "identity": "Lastora",
    "archetype": "Sniper",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Wind",
    "identity": "Wind",
    "archetype": "Sniper",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Distantial",
    "identity": "Distantial",
    "archetype": "Sniper",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Patientos",
    "identity": "Patientos",
    "archetype": "Sniper",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Motionle",
    "identity": "Motionle",
    "archetype": "Sniper",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Farseein",
    "identity": "Farseein",
    "archetype": "Sniper",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Measured",
    "identity": "Measured",
    "archetype": "Sniper",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Silentzen",
    "identity": "Silentzen",
    "archetype": "Sniper",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Secondion",
    "identity": "Secondion",
    "archetype": "Spy",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Deeprix",
    "identity": "Deeprix",
    "archetype": "Spy",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Falseara",
    "identity": "Falseara",
    "archetype": "Spy",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Deadis",
    "identity": "Deadis",
    "archetype": "Spy",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Double",
    "identity": "Double",
    "archetype": "Spy",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Quietaxis",
    "identity": "Quietaxis",
    "archetype": "Spy",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Unknown",
    "identity": "Unknown",
    "archetype": "Spy",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Covert",
    "identity": "Covert",
    "archetype": "Spy",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Diplomateon",
    "identity": "Diplomateon",
    "archetype": "Spy",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Unmade",
    "identity": "Unmade",
    "archetype": "Spy",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Classifi",
    "identity": "Classifi",
    "archetype": "Spy",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Counterf",
    "identity": "Counterf",
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
    "name": "Nightyn",
    "identity": "Nightyn",
    "archetype": "Street Doc",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Mercyial",
    "identity": "Mercyial",
    "archetype": "Street Doc",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Backos",
    "identity": "Backos",
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
    "name": "Lastian",
    "identity": "Lastian",
    "archetype": "Street Doc",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Bloodlig",
    "identity": "Bloodlig",
    "archetype": "Street Doc",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Nozen",
    "identity": "Nozen",
    "archetype": "Street Doc",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Clinical",
    "identity": "Clinical",
    "archetype": "Street Doc",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Sterile",
    "identity": "Sterile",
    "archetype": "Street Doc",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Lifehold",
    "identity": "Lifehold",
    "archetype": "Street Doc",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Emergenc",
    "identity": "Emergenc",
    "archetype": "Street Doc",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Unlicens",
    "identity": "Unlicens",
    "archetype": "Street Doc",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Surgical",
    "identity": "Surgical",
    "archetype": "Street Doc",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Chrome",
    "identity": "Chrome",
    "archetype": "Street Samurai",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Honor",
    "identity": "Honor",
    "archetype": "Street Samurai",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Neon",
    "identity": "Neon",
    "archetype": "Street Samurai",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Clanless",
    "identity": "Clanless",
    "archetype": "Street Samurai",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Redus",
    "identity": "Redus",
    "archetype": "Street Samurai",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Lastex",
    "identity": "Lastex",
    "archetype": "Street Samurai",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Steel",
    "identity": "Steel",
    "archetype": "Street Samurai",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Cybernet",
    "identity": "Cybernet",
    "archetype": "Street Samurai",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Oathboun",
    "identity": "Oathboun",
    "archetype": "Street Samurai",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Ronin",
    "identity": "Ronin",
    "archetype": "Street Samurai",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Neonyx",
    "identity": "Neonyx",
    "archetype": "Street Samurai",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Honorbou",
    "identity": "Honorbou",
    "archetype": "Street Samurai",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Bladebor",
    "identity": "Bladebor",
    "archetype": "Street Samurai",
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
    "name": "Patronion",
    "identity": "Patronion",
    "archetype": "Warlock",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Blackrix",
    "identity": "Blackrix",
    "archetype": "Warlock",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Debt",
    "identity": "Debt",
    "archetype": "Warlock",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Hell",
    "identity": "Hell",
    "archetype": "Warlock",
    "origin": "Dwarf",
    "style": "self-chosen"
  },
  {
    "name": "Bound",
    "identity": "Bound",
    "archetype": "Warlock",
    "origin": "Halfling",
    "style": "self-chosen"
  },
  {
    "name": "Forbidde",
    "identity": "Forbidde",
    "archetype": "Warlock",
    "origin": "Fairy",
    "style": "self-chosen"
  },
  {
    "name": "Pactboun",
    "identity": "Pactboun",
    "archetype": "Warlock",
    "origin": "Orc",
    "style": "self-chosen"
  },
  {
    "name": "Eldritch",
    "identity": "Eldritch",
    "archetype": "Warlock",
    "origin": "Giant",
    "style": "self-chosen"
  },
  {
    "name": "Oathscareon",
    "identity": "Oathscareon",
    "archetype": "Warlock",
    "origin": "Elf",
    "style": "self-chosen"
  },
  {
    "name": "Infernal",
    "identity": "Infernal",
    "archetype": "Warlock",
    "origin": "Human",
    "style": "self-chosen"
  },
  {
    "name": "Whispere",
    "identity": "Whispere",
    "archetype": "Warlock",
    "origin": "Gnome",
    "style": "self-chosen"
  },
  {
    "name": "Accursed",
    "identity": "Accursed",
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

const tokens = cyborgNames.flatMap(entry => entry.name.split(/\s+/).map(token => token.replace(/[^\p{L}\p{N}]/gu, '').toLowerCase()).filter(Boolean))
const count = style => cyborgNames.filter(entry => entry.style === style).length
if (cyborgNames.length !== 500 || new Set(cyborgNames.map(entry => entry.name)).size !== 500) throw new Error('Cyborg identities must be unique')
if (new Set(tokens).size !== tokens.length) throw new Error('Cyborg name tokens must not repeat')
if (count('designation') !== 50 || count('heritage') !== 225 || count('self-chosen') !== 225) throw new Error('Cyborg identity-style proportions are invalid')
if (cyborgNames.some(entry => entry.name.split(/\s+/).length > 2)) throw new Error('Cyborg identities may not exceed two parts')

export default cyborgNames
