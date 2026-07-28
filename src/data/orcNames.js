// 500 literal Orc identities with varied given-name forms and optional earned titles.
const orcNames = [
  {
    "givenName": "G'ak",
    "form": "apostrophe",
    "name": "G'ak"
  },
  {
    "givenName": "M'zar",
    "form": "apostrophe",
    "name": "M'zar"
  },
  {
    "givenName": "Ug'uk",
    "form": "apostrophe",
    "title": "BattleRaider",
    "name": "Ug'uk BattleRaider"
  },
  {
    "givenName": "Gh'og",
    "form": "apostrophe",
    "title": "GateJaw",
    "name": "Gh'og GateJaw"
  },
  {
    "givenName": "Mok'ik",
    "form": "apostrophe",
    "title": "SiegeFang",
    "name": "Mok'ik SiegeFang"
  },
  {
    "givenName": "Vr'ek",
    "form": "apostrophe",
    "name": "Vr'ek"
  },
  {
    "givenName": "Gr'ash",
    "form": "apostrophe",
    "name": "Gr'ash"
  },
  {
    "givenName": "Rg'ag",
    "form": "apostrophe",
    "title": "WyrmBrother",
    "name": "Rg'ag WyrmBrother"
  },
  {
    "givenName": "Z'usk",
    "form": "apostrophe",
    "title": "BoneBiter",
    "name": "Z'usk BoneBiter"
  },
  {
    "givenName": "K'rag",
    "form": "apostrophe",
    "title": "IronWard",
    "name": "K'rag IronWard"
  },
  {
    "givenName": "Sk'mok",
    "form": "apostrophe",
    "name": "Sk'mok"
  },
  {
    "givenName": "Br'gor",
    "form": "apostrophe",
    "name": "Br'gor"
  },
  {
    "givenName": "Kl'eg",
    "form": "apostrophe",
    "title": "StoneSinger",
    "name": "Kl'eg StoneSinger"
  },
  {
    "givenName": "Th'ar",
    "form": "apostrophe",
    "title": "AshLaugher",
    "name": "Th'ar AshLaugher"
  },
  {
    "givenName": "D'zug",
    "form": "apostrophe",
    "title": "DawnGuard",
    "name": "D'zug DawnGuard"
  },
  {
    "givenName": "Kr'ur",
    "form": "apostrophe",
    "name": "Kr'ur"
  },
  {
    "givenName": "Tr'ok",
    "form": "apostrophe",
    "name": "Tr'ok"
  },
  {
    "givenName": "G'ka",
    "form": "apostrophe",
    "title": "RedEater",
    "name": "G'ka RedEater"
  },
  {
    "givenName": "Mg'gar",
    "form": "apostrophe",
    "title": "WarBreaker",
    "name": "Mg'gar WarBreaker"
  },
  {
    "givenName": "V'az",
    "form": "apostrophe",
    "title": "BlackBane",
    "name": "V'az BlackBane"
  },
  {
    "givenName": "Gl'ak",
    "form": "apostrophe",
    "name": "Gl'ak"
  },
  {
    "givenName": "Mok'zar",
    "form": "apostrophe",
    "name": "Mok'zar"
  },
  {
    "givenName": "Vr'uk",
    "form": "apostrophe",
    "title": "GateWalker",
    "name": "Vr'uk GateWalker"
  },
  {
    "givenName": "Gr'og",
    "form": "apostrophe",
    "title": "SiegeScar",
    "name": "Gr'og SiegeScar"
  },
  {
    "givenName": "Rg'ik",
    "form": "apostrophe",
    "title": "WyrmKeeper",
    "name": "Rg'ik WyrmKeeper"
  },
  {
    "givenName": "Zh'ek",
    "form": "apostrophe",
    "name": "Zh'ek"
  },
  {
    "givenName": "Kh'ash",
    "form": "apostrophe",
    "name": "Kh'ash"
  },
  {
    "givenName": "T'ag",
    "form": "apostrophe",
    "title": "BoneFist",
    "name": "T'ag BoneFist"
  },
  {
    "givenName": "Br'usk",
    "form": "apostrophe",
    "title": "LastDrum",
    "name": "Br'usk LastDrum"
  },
  {
    "givenName": "Kl'rag",
    "form": "apostrophe",
    "title": "StormBorn",
    "name": "Kl'rag StormBorn"
  },
  {
    "givenName": "Th'mok",
    "form": "apostrophe",
    "name": "Th'mok"
  },
  {
    "givenName": "Dr'gor",
    "form": "apostrophe",
    "name": "Dr'gor"
  },
  {
    "givenName": "M'eg",
    "form": "apostrophe",
    "title": "AshWatcher",
    "name": "M'eg AshWatcher"
  },
  {
    "givenName": "Ug'ar",
    "form": "apostrophe",
    "title": "DawnSplitter",
    "name": "Ug'ar DawnSplitter"
  },
  {
    "givenName": "G'zug",
    "form": "apostrophe",
    "title": "RedRaider",
    "name": "G'zug RedRaider"
  },
  {
    "givenName": "Mg'ur",
    "form": "apostrophe",
    "name": "Mg'ur"
  },
  {
    "givenName": "V'ok",
    "form": "apostrophe",
    "name": "V'ok"
  },
  {
    "givenName": "Gl'ka",
    "form": "apostrophe",
    "title": "WarJaw",
    "name": "Gl'ka WarJaw"
  },
  {
    "givenName": "R'gar",
    "form": "apostrophe",
    "title": "BlackFang",
    "name": "R'gar BlackFang"
  },
  {
    "givenName": "Z'az",
    "form": "apostrophe",
    "title": "GraveBrother",
    "name": "Z'az GraveBrother"
  },
  {
    "givenName": "K'ak",
    "form": "apostrophe",
    "name": "K'ak"
  },
  {
    "givenName": "Rg'zar",
    "form": "apostrophe",
    "name": "Rg'zar"
  },
  {
    "givenName": "Zh'uk",
    "form": "apostrophe",
    "title": "SkullBiter",
    "name": "Zh'uk SkullBiter"
  },
  {
    "givenName": "Kh'og",
    "form": "apostrophe",
    "title": "WyrmWard",
    "name": "Kh'og WyrmWard"
  },
  {
    "givenName": "T'ik",
    "form": "apostrophe",
    "title": "BoneSinger",
    "name": "T'ik BoneSinger"
  },
  {
    "givenName": "D'ek",
    "form": "apostrophe",
    "name": "D'ek"
  },
  {
    "givenName": "Kr'ash",
    "form": "apostrophe",
    "name": "Kr'ash"
  },
  {
    "givenName": "Tr'ag",
    "form": "apostrophe",
    "title": "LastLaugher",
    "name": "Tr'ag LastLaugher"
  },
  {
    "givenName": "Dr'usk",
    "form": "apostrophe",
    "title": "StormGuard",
    "name": "Dr'usk StormGuard"
  },
  {
    "givenName": "M'rag",
    "form": "apostrophe",
    "title": "AxeEater",
    "name": "M'rag AxeEater"
  },
  {
    "givenName": "Ug'mok",
    "form": "apostrophe",
    "name": "Ug'mok"
  },
  {
    "givenName": "Gh'gor",
    "form": "apostrophe",
    "name": "Gh'gor"
  },
  {
    "givenName": "Mok'eg",
    "form": "apostrophe",
    "title": "FireBreaker",
    "name": "Mok'eg FireBreaker"
  },
  {
    "givenName": "Vr'ar",
    "form": "apostrophe",
    "title": "ShieldBane",
    "name": "Vr'ar ShieldBane"
  },
  {
    "givenName": "Gl'zug",
    "form": "apostrophe",
    "title": "WarWalker",
    "name": "Gl'zug WarWalker"
  },
  {
    "givenName": "R'ur",
    "form": "apostrophe",
    "name": "R'ur"
  },
  {
    "givenName": "Z'ok",
    "form": "apostrophe",
    "name": "Z'ok"
  },
  {
    "givenName": "K'ka",
    "form": "apostrophe",
    "title": "BlackScar",
    "name": "K'ka BlackScar"
  },
  {
    "givenName": "Sk'gar",
    "form": "apostrophe",
    "title": "GraveKeeper",
    "name": "Sk'gar GraveKeeper"
  },
  {
    "givenName": "Br'az",
    "form": "apostrophe",
    "title": "SkullFist",
    "name": "Br'az SkullFist"
  },
  {
    "givenName": "Kl'ak",
    "form": "apostrophe",
    "name": "Kl'ak"
  },
  {
    "givenName": "T'zar",
    "form": "apostrophe",
    "name": "T'zar"
  },
  {
    "givenName": "D'uk",
    "form": "apostrophe",
    "title": "NightDrum",
    "name": "D'uk NightDrum"
  },
  {
    "givenName": "Kr'og",
    "form": "apostrophe",
    "title": "ChainBorn",
    "name": "Kr'og ChainBorn"
  },
  {
    "givenName": "Tr'ik",
    "form": "apostrophe",
    "title": "LastWatcher",
    "name": "Tr'ik LastWatcher"
  },
  {
    "givenName": "G'ek",
    "form": "apostrophe",
    "name": "G'ek"
  },
  {
    "givenName": "Mg'ash",
    "form": "apostrophe",
    "name": "Mg'ash"
  },
  {
    "givenName": "V'ag",
    "form": "apostrophe",
    "title": "StormSplitter",
    "name": "V'ag StormSplitter"
  },
  {
    "givenName": "Gh'usk",
    "form": "apostrophe",
    "title": "AxeRaider",
    "name": "Gh'usk AxeRaider"
  },
  {
    "givenName": "Mok'rag",
    "form": "apostrophe",
    "title": "FireJaw",
    "name": "Mok'rag FireJaw"
  },
  {
    "givenName": "Vr'mok",
    "form": "apostrophe",
    "name": "Vr'mok"
  },
  {
    "givenName": "Gr'gor",
    "form": "apostrophe",
    "name": "Gr'gor"
  },
  {
    "givenName": "Rg'eg",
    "form": "apostrophe",
    "title": "ShieldFang",
    "name": "Rg'eg ShieldFang"
  },
  {
    "givenName": "Zh'ar",
    "form": "apostrophe",
    "title": "WolfBrother",
    "name": "Zh'ar WolfBrother"
  },
  {
    "givenName": "K'zug",
    "form": "apostrophe",
    "title": "BloodBiter",
    "name": "K'zug BloodBiter"
  },
  {
    "givenName": "Sk'ur",
    "form": "apostrophe",
    "name": "Sk'ur"
  },
  {
    "givenName": "Br'ok",
    "form": "apostrophe",
    "name": "Br'ok"
  },
  {
    "givenName": "Kl'ka",
    "form": "apostrophe",
    "title": "GraveWard",
    "name": "Kl'ka GraveWard"
  },
  {
    "givenName": "Th'gar",
    "form": "apostrophe",
    "title": "SkullSinger",
    "name": "Th'gar SkullSinger"
  },
  {
    "givenName": "Dr'az",
    "form": "apostrophe",
    "title": "NightLaugher",
    "name": "Dr'az NightLaugher"
  },
  {
    "givenName": "M'ak",
    "form": "apostrophe",
    "name": "M'ak"
  },
  {
    "givenName": "Tr'zar",
    "form": "apostrophe",
    "name": "Tr'zar"
  },
  {
    "givenName": "G'uk",
    "form": "apostrophe",
    "title": "ChainGuard",
    "name": "G'uk ChainGuard"
  },
  {
    "givenName": "Mg'og",
    "form": "apostrophe",
    "title": "OathEater",
    "name": "Mg'og OathEater"
  },
  {
    "givenName": "V'ik",
    "form": "apostrophe",
    "title": "TuskBreaker",
    "name": "V'ik TuskBreaker"
  },
  {
    "givenName": "Gl'ek",
    "form": "apostrophe",
    "name": "Gl'ek"
  },
  {
    "givenName": "R'ash",
    "form": "apostrophe",
    "name": "R'ash"
  },
  {
    "givenName": "Z'ag",
    "form": "apostrophe",
    "title": "BattleBane",
    "name": "Z'ag BattleBane"
  },
  {
    "givenName": "Gr'usk",
    "form": "apostrophe",
    "title": "FireWalker",
    "name": "Gr'usk FireWalker"
  },
  {
    "givenName": "Rg'rag",
    "form": "apostrophe",
    "title": "ShieldScar",
    "name": "Rg'rag ShieldScar"
  },
  {
    "givenName": "Zh'mok",
    "form": "apostrophe",
    "name": "Zh'mok"
  },
  {
    "givenName": "Kh'gor",
    "form": "apostrophe",
    "name": "Kh'gor"
  },
  {
    "givenName": "T'eg",
    "form": "apostrophe",
    "title": "WolfKeeper",
    "name": "T'eg WolfKeeper"
  },
  {
    "givenName": "D'ar",
    "form": "apostrophe",
    "title": "BloodFist",
    "name": "D'ar BloodFist"
  },
  {
    "givenName": "Kl'zug",
    "form": "apostrophe",
    "title": "IronDrum",
    "name": "Kl'zug IronDrum"
  },
  {
    "givenName": "Th'ur",
    "form": "apostrophe",
    "name": "Th'ur"
  },
  {
    "givenName": "Dr'ok",
    "form": "apostrophe",
    "name": "Dr'ok"
  },
  {
    "givenName": "M'ka",
    "form": "apostrophe",
    "title": "StoneBorn",
    "name": "M'ka StoneBorn"
  },
  {
    "givenName": "Ug'gar",
    "form": "apostrophe",
    "title": "NightWatcher",
    "name": "Ug'gar NightWatcher"
  },
  {
    "givenName": "Gh'az",
    "form": "apostrophe",
    "title": "ChainSplitter",
    "name": "Gh'az ChainSplitter"
  },
  {
    "givenName": "Mok'ak",
    "form": "apostrophe",
    "name": "Mok'ak"
  },
  {
    "givenName": "V'zar",
    "form": "apostrophe",
    "name": "V'zar"
  },
  {
    "givenName": "Gl'uk",
    "form": "apostrophe",
    "title": "OathRaider",
    "name": "Gl'uk OathRaider"
  },
  {
    "givenName": "R'og",
    "form": "apostrophe",
    "title": "TuskJaw",
    "name": "R'og TuskJaw"
  },
  {
    "givenName": "Z'ik",
    "form": "apostrophe",
    "title": "BattleFang",
    "name": "Z'ik BattleFang"
  },
  {
    "givenName": "K'ek",
    "form": "apostrophe",
    "name": "K'ek"
  },
  {
    "givenName": "Sk'ash",
    "form": "apostrophe",
    "name": "Sk'ash"
  },
  {
    "givenName": "Br'ag",
    "form": "apostrophe",
    "title": "GateBrother",
    "name": "Br'ag GateBrother"
  },
  {
    "givenName": "Kh'usk",
    "form": "apostrophe",
    "title": "SiegeBiter",
    "name": "Kh'usk SiegeBiter"
  },
  {
    "givenName": "T'rag",
    "form": "apostrophe",
    "title": "WolfWard",
    "name": "T'rag WolfWard"
  },
  {
    "givenName": "D'mok",
    "form": "apostrophe",
    "name": "D'mok"
  },
  {
    "givenName": "Kr'gor",
    "form": "apostrophe",
    "name": "Kr'gor"
  },
  {
    "givenName": "Tr'eg",
    "form": "apostrophe",
    "title": "BloodSinger",
    "name": "Tr'eg BloodSinger"
  },
  {
    "givenName": "G'ar",
    "form": "apostrophe",
    "title": "IronLaugher",
    "name": "G'ar IronLaugher"
  },
  {
    "givenName": "M'zug",
    "form": "apostrophe",
    "title": "StoneGuard",
    "name": "M'zug StoneGuard"
  },
  {
    "givenName": "Ug'ur",
    "form": "apostrophe",
    "name": "Ug'ur"
  },
  {
    "givenName": "Gh'ok",
    "form": "apostrophe",
    "name": "Gh'ok"
  },
  {
    "givenName": "Mok'ka",
    "form": "apostrophe",
    "title": "AshEater",
    "name": "Mok'ka AshEater"
  },
  {
    "givenName": "Vr'gar",
    "form": "apostrophe",
    "title": "DawnBreaker",
    "name": "Vr'gar DawnBreaker"
  },
  {
    "givenName": "Gr'az",
    "form": "apostrophe",
    "title": "RedBane",
    "name": "Gr'az RedBane"
  },
  {
    "givenName": "Rg'ak",
    "form": "apostrophe",
    "name": "Rg'ak"
  },
  {
    "givenName": "Z'zar",
    "form": "apostrophe",
    "name": "Z'zar"
  },
  {
    "givenName": "K'uk",
    "form": "apostrophe",
    "title": "TuskWalker",
    "name": "K'uk TuskWalker"
  },
  {
    "givenName": "Sk'og",
    "form": "apostrophe",
    "title": "BattleScar",
    "name": "Sk'og BattleScar"
  },
  {
    "givenName": "Br'ik",
    "form": "apostrophe",
    "title": "GateKeeper",
    "name": "Br'ik GateKeeper"
  },
  {
    "givenName": "Gak",
    "form": "single-syllable",
    "name": "Gak"
  },
  {
    "givenName": "Mzar",
    "form": "single-syllable",
    "name": "Mzar"
  },
  {
    "givenName": "Uguk",
    "form": "single-syllable",
    "title": "SiegeFist",
    "name": "Uguk SiegeFist"
  },
  {
    "givenName": "Ghog",
    "form": "single-syllable",
    "title": "WyrmDrum",
    "name": "Ghog WyrmDrum"
  },
  {
    "givenName": "Mokik",
    "form": "single-syllable",
    "title": "BoneBorn",
    "name": "Mokik BoneBorn"
  },
  {
    "givenName": "Vrek",
    "form": "single-syllable",
    "name": "Vrek"
  },
  {
    "givenName": "Grash",
    "form": "single-syllable",
    "name": "Grash"
  },
  {
    "givenName": "Rgag",
    "form": "single-syllable",
    "title": "IronWatcher",
    "name": "Rgag IronWatcher"
  },
  {
    "givenName": "Zusk",
    "form": "single-syllable",
    "title": "StoneSplitter",
    "name": "Zusk StoneSplitter"
  },
  {
    "givenName": "Krag",
    "form": "single-syllable",
    "title": "AshRaider",
    "name": "Krag AshRaider"
  },
  {
    "givenName": "Skmok",
    "form": "single-syllable",
    "name": "Skmok"
  },
  {
    "givenName": "Brgor",
    "form": "single-syllable",
    "name": "Brgor"
  },
  {
    "givenName": "Kleg",
    "form": "single-syllable",
    "title": "DawnJaw",
    "name": "Kleg DawnJaw"
  },
  {
    "givenName": "Thar",
    "form": "single-syllable",
    "title": "RedFang",
    "name": "Thar RedFang"
  },
  {
    "givenName": "Dzug",
    "form": "single-syllable",
    "title": "WarBrother",
    "name": "Dzug WarBrother"
  },
  {
    "givenName": "Krur",
    "form": "single-syllable",
    "name": "Krur"
  },
  {
    "givenName": "Trok",
    "form": "single-syllable",
    "name": "Trok"
  },
  {
    "givenName": "Gka",
    "form": "single-syllable",
    "title": "BlackBiter",
    "name": "Gka BlackBiter"
  },
  {
    "givenName": "Mggar",
    "form": "single-syllable",
    "title": "GateWard",
    "name": "Mggar GateWard"
  },
  {
    "givenName": "Vaz",
    "form": "single-syllable",
    "title": "SiegeSinger",
    "name": "Vaz SiegeSinger"
  },
  {
    "givenName": "Glak",
    "form": "single-syllable",
    "name": "Glak"
  },
  {
    "givenName": "Mokzar",
    "form": "single-syllable",
    "name": "Mokzar"
  },
  {
    "givenName": "Vruk",
    "form": "single-syllable",
    "title": "WyrmLaugher",
    "name": "Vruk WyrmLaugher"
  },
  {
    "givenName": "Grog",
    "form": "single-syllable",
    "title": "BoneGuard",
    "name": "Grog BoneGuard"
  },
  {
    "givenName": "Rgik",
    "form": "single-syllable",
    "title": "LastEater",
    "name": "Rgik LastEater"
  },
  {
    "givenName": "Zhek",
    "form": "single-syllable",
    "name": "Zhek"
  },
  {
    "givenName": "Khash",
    "form": "single-syllable",
    "name": "Khash"
  },
  {
    "givenName": "Tag",
    "form": "single-syllable",
    "title": "StormBreaker",
    "name": "Tag StormBreaker"
  },
  {
    "givenName": "Brusk",
    "form": "single-syllable",
    "title": "AxeBane",
    "name": "Brusk AxeBane"
  },
  {
    "givenName": "Klrag",
    "form": "single-syllable",
    "title": "DawnWalker",
    "name": "Klrag DawnWalker"
  },
  {
    "givenName": "Thmok",
    "form": "single-syllable",
    "name": "Thmok"
  },
  {
    "givenName": "Drgor",
    "form": "single-syllable",
    "name": "Drgor"
  },
  {
    "givenName": "Meg",
    "form": "single-syllable",
    "title": "RedScar",
    "name": "Meg RedScar"
  },
  {
    "givenName": "Ugar",
    "form": "single-syllable",
    "title": "WarKeeper",
    "name": "Ugar WarKeeper"
  },
  {
    "givenName": "Gzug",
    "form": "single-syllable",
    "title": "BlackFist",
    "name": "Gzug BlackFist"
  },
  {
    "givenName": "Mgur",
    "form": "single-syllable",
    "name": "Mgur"
  },
  {
    "givenName": "Vok",
    "form": "single-syllable",
    "name": "Vok"
  },
  {
    "givenName": "Glka",
    "form": "single-syllable",
    "title": "GraveDrum",
    "name": "Glka GraveDrum"
  },
  {
    "givenName": "Rgar",
    "form": "single-syllable",
    "title": "SkullBorn",
    "name": "Rgar SkullBorn"
  },
  {
    "givenName": "Zaz",
    "form": "single-syllable",
    "title": "WyrmWatcher",
    "name": "Zaz WyrmWatcher"
  },
  {
    "givenName": "Kak",
    "form": "single-syllable",
    "name": "Kak"
  },
  {
    "givenName": "Rgzar",
    "form": "single-syllable",
    "name": "Rgzar"
  },
  {
    "givenName": "Zhuk",
    "form": "single-syllable",
    "title": "BoneSplitter",
    "name": "Zhuk BoneSplitter"
  },
  {
    "givenName": "Khog",
    "form": "single-syllable",
    "title": "LastRaider",
    "name": "Khog LastRaider"
  },
  {
    "givenName": "Tik",
    "form": "single-syllable",
    "title": "StormJaw",
    "name": "Tik StormJaw"
  },
  {
    "givenName": "Dek",
    "form": "single-syllable",
    "name": "Dek"
  },
  {
    "givenName": "Krash",
    "form": "single-syllable",
    "name": "Krash"
  },
  {
    "givenName": "Trag",
    "form": "single-syllable",
    "title": "AxeFang",
    "name": "Trag AxeFang"
  },
  {
    "givenName": "Drusk",
    "form": "single-syllable",
    "title": "FireBrother",
    "name": "Drusk FireBrother"
  },
  {
    "givenName": "Mrag",
    "form": "single-syllable",
    "title": "ShieldBiter",
    "name": "Mrag ShieldBiter"
  },
  {
    "givenName": "Ugmok",
    "form": "single-syllable",
    "name": "Ugmok"
  },
  {
    "givenName": "Ghgor",
    "form": "single-syllable",
    "name": "Ghgor"
  },
  {
    "givenName": "Mokeg",
    "form": "single-syllable",
    "title": "WarWard",
    "name": "Mokeg WarWard"
  },
  {
    "givenName": "Vrar",
    "form": "single-syllable",
    "title": "BlackSinger",
    "name": "Vrar BlackSinger"
  },
  {
    "givenName": "Glzug",
    "form": "single-syllable",
    "title": "GraveLaugher",
    "name": "Glzug GraveLaugher"
  },
  {
    "givenName": "Rur",
    "form": "single-syllable",
    "name": "Rur"
  },
  {
    "givenName": "Zok",
    "form": "single-syllable",
    "name": "Zok"
  },
  {
    "givenName": "Kka",
    "form": "single-syllable",
    "title": "SkullGuard",
    "name": "Kka SkullGuard"
  },
  {
    "givenName": "Skgar",
    "form": "single-syllable",
    "title": "NightEater",
    "name": "Skgar NightEater"
  },
  {
    "givenName": "Braz",
    "form": "single-syllable",
    "title": "ChainBreaker",
    "name": "Braz ChainBreaker"
  },
  {
    "givenName": "Klak",
    "form": "single-syllable",
    "name": "Klak"
  },
  {
    "givenName": "Tzar",
    "form": "single-syllable",
    "name": "Tzar"
  },
  {
    "givenName": "Duk",
    "form": "single-syllable",
    "title": "OathBane",
    "name": "Duk OathBane"
  },
  {
    "givenName": "Krog",
    "form": "single-syllable",
    "title": "StormWalker",
    "name": "Krog StormWalker"
  },
  {
    "givenName": "Trik",
    "form": "single-syllable",
    "title": "AxeScar",
    "name": "Trik AxeScar"
  },
  {
    "givenName": "Gek",
    "form": "single-syllable",
    "name": "Gek"
  },
  {
    "givenName": "Mgash",
    "form": "single-syllable",
    "name": "Mgash"
  },
  {
    "givenName": "Vag",
    "form": "single-syllable",
    "title": "FireKeeper",
    "name": "Vag FireKeeper"
  },
  {
    "givenName": "Ghusk",
    "form": "single-syllable",
    "title": "ShieldFist",
    "name": "Ghusk ShieldFist"
  },
  {
    "givenName": "Mokrag",
    "form": "single-syllable",
    "title": "WolfDrum",
    "name": "Mokrag WolfDrum"
  },
  {
    "givenName": "Vrmok",
    "form": "single-syllable",
    "name": "Vrmok"
  },
  {
    "givenName": "Grgor",
    "form": "single-syllable",
    "name": "Grgor"
  },
  {
    "givenName": "Rgeg",
    "form": "single-syllable",
    "title": "BloodBorn",
    "name": "Rgeg BloodBorn"
  },
  {
    "givenName": "Zhar",
    "form": "single-syllable",
    "title": "GraveWatcher",
    "name": "Zhar GraveWatcher"
  },
  {
    "givenName": "Kzug",
    "form": "single-syllable",
    "title": "SkullSplitter",
    "name": "Kzug SkullSplitter"
  },
  {
    "givenName": "Skur",
    "form": "single-syllable",
    "name": "Skur"
  },
  {
    "givenName": "Brok",
    "form": "single-syllable",
    "name": "Brok"
  },
  {
    "givenName": "Klka",
    "form": "single-syllable",
    "title": "NightRaider",
    "name": "Klka NightRaider"
  },
  {
    "givenName": "Thgar",
    "form": "single-syllable",
    "title": "ChainJaw",
    "name": "Thgar ChainJaw"
  },
  {
    "givenName": "Draz",
    "form": "single-syllable",
    "title": "OathFang",
    "name": "Draz OathFang"
  },
  {
    "givenName": "Mak",
    "form": "single-syllable",
    "name": "Mak"
  },
  {
    "givenName": "Trzar",
    "form": "single-syllable",
    "name": "Trzar"
  },
  {
    "givenName": "Guk",
    "form": "single-syllable",
    "title": "TuskBrother",
    "name": "Guk TuskBrother"
  },
  {
    "givenName": "Mgog",
    "form": "single-syllable",
    "title": "BattleBiter",
    "name": "Mgog BattleBiter"
  },
  {
    "givenName": "Vik",
    "form": "single-syllable",
    "title": "FireWard",
    "name": "Vik FireWard"
  },
  {
    "givenName": "Glek",
    "form": "single-syllable",
    "name": "Glek"
  },
  {
    "givenName": "Rash",
    "form": "single-syllable",
    "name": "Rash"
  },
  {
    "givenName": "Zag",
    "form": "single-syllable",
    "title": "ShieldSinger",
    "name": "Zag ShieldSinger"
  },
  {
    "givenName": "Grusk",
    "form": "single-syllable",
    "title": "WolfLaugher",
    "name": "Grusk WolfLaugher"
  },
  {
    "givenName": "Rgrag",
    "form": "single-syllable",
    "title": "BloodGuard",
    "name": "Rgrag BloodGuard"
  },
  {
    "givenName": "Zhmok",
    "form": "single-syllable",
    "name": "Zhmok"
  },
  {
    "givenName": "Khgor",
    "form": "single-syllable",
    "name": "Khgor"
  },
  {
    "givenName": "Teg",
    "form": "single-syllable",
    "title": "IronEater",
    "name": "Teg IronEater"
  },
  {
    "givenName": "Dar",
    "form": "single-syllable",
    "title": "StoneBreaker",
    "name": "Dar StoneBreaker"
  },
  {
    "givenName": "Klzug",
    "form": "single-syllable",
    "title": "AshBane",
    "name": "Klzug AshBane"
  },
  {
    "givenName": "Thur",
    "form": "single-syllable",
    "name": "Thur"
  },
  {
    "givenName": "Drok",
    "form": "single-syllable",
    "name": "Drok"
  },
  {
    "givenName": "Mka",
    "form": "single-syllable",
    "title": "ChainWalker",
    "name": "Mka ChainWalker"
  },
  {
    "givenName": "Uggar",
    "form": "single-syllable",
    "title": "OathScar",
    "name": "Uggar OathScar"
  },
  {
    "givenName": "Ghaz",
    "form": "single-syllable",
    "title": "TuskKeeper",
    "name": "Ghaz TuskKeeper"
  },
  {
    "givenName": "Mokak",
    "form": "single-syllable",
    "name": "Mokak"
  },
  {
    "givenName": "Vzar",
    "form": "single-syllable",
    "name": "Vzar"
  },
  {
    "givenName": "Gluk",
    "form": "single-syllable",
    "title": "BattleFist",
    "name": "Gluk BattleFist"
  },
  {
    "givenName": "Rog",
    "form": "single-syllable",
    "title": "GateDrum",
    "name": "Rog GateDrum"
  },
  {
    "givenName": "Zik",
    "form": "single-syllable",
    "title": "SiegeBorn",
    "name": "Zik SiegeBorn"
  },
  {
    "givenName": "Kek",
    "form": "single-syllable",
    "name": "Kek"
  },
  {
    "givenName": "Skash",
    "form": "single-syllable",
    "name": "Skash"
  },
  {
    "givenName": "Brag",
    "form": "single-syllable",
    "title": "WolfWatcher",
    "name": "Brag WolfWatcher"
  },
  {
    "givenName": "Khusk",
    "form": "single-syllable",
    "title": "BloodSplitter",
    "name": "Khusk BloodSplitter"
  },
  {
    "givenName": "Dmok",
    "form": "single-syllable",
    "title": "IronRaider",
    "name": "Dmok IronRaider"
  },
  {
    "givenName": "Krgor",
    "form": "single-syllable",
    "name": "Krgor"
  },
  {
    "givenName": "Treg",
    "form": "single-syllable",
    "name": "Treg"
  },
  {
    "givenName": "Gar",
    "form": "single-syllable",
    "title": "StoneJaw",
    "name": "Gar StoneJaw"
  },
  {
    "givenName": "Mzug",
    "form": "single-syllable",
    "title": "AshFang",
    "name": "Mzug AshFang"
  },
  {
    "givenName": "Ugur",
    "form": "single-syllable",
    "title": "DawnBrother",
    "name": "Ugur DawnBrother"
  },
  {
    "givenName": "Ghok",
    "form": "single-syllable",
    "name": "Ghok"
  },
  {
    "givenName": "Mokka",
    "form": "single-syllable",
    "name": "Mokka"
  },
  {
    "givenName": "Vrgar",
    "form": "single-syllable",
    "title": "RedBiter",
    "name": "Vrgar RedBiter"
  },
  {
    "givenName": "Graz",
    "form": "single-syllable",
    "title": "TuskWard",
    "name": "Graz TuskWard"
  },
  {
    "givenName": "Rgak",
    "form": "single-syllable",
    "title": "BattleSinger",
    "name": "Rgak BattleSinger"
  },
  {
    "givenName": "Zzar",
    "form": "single-syllable",
    "name": "Zzar"
  },
  {
    "givenName": "Kuk",
    "form": "single-syllable",
    "name": "Kuk"
  },
  {
    "givenName": "Skog",
    "form": "single-syllable",
    "title": "GateLaugher",
    "name": "Skog GateLaugher"
  },
  {
    "givenName": "Brik",
    "form": "single-syllable",
    "title": "SiegeGuard",
    "name": "Brik SiegeGuard"
  },
  {
    "givenName": "Klek",
    "form": "single-syllable",
    "title": "WyrmEater",
    "name": "Klek WyrmEater"
  },
  {
    "givenName": "Brgor Klrag",
    "form": "two-part",
    "name": "Brgor Klrag"
  },
  {
    "givenName": "Drusk Gluk",
    "form": "two-part",
    "name": "Drusk Gluk"
  },
  {
    "givenName": "Glek Krok",
    "form": "two-part",
    "title": "BoneBreaker",
    "name": "Glek Krok BoneBreaker"
  },
  {
    "givenName": "Skog Zhgor",
    "form": "two-part",
    "title": "LastBane",
    "name": "Skog Zhgor LastBane"
  },
  {
    "givenName": "Trak Ugik",
    "form": "two-part",
    "title": "StoneWalker",
    "name": "Trak Ugik StoneWalker"
  },
  {
    "givenName": "Vka Brgar",
    "form": "two-part",
    "name": "Vka Brgar"
  },
  {
    "givenName": "Skok Vrzug",
    "form": "two-part",
    "name": "Skok Vrzug"
  },
  {
    "givenName": "Trar Trag",
    "form": "two-part",
    "title": "AshScar",
    "name": "Trar Trag AshScar"
  },
  {
    "givenName": "Vmok Zzar",
    "form": "two-part",
    "title": "DawnKeeper",
    "name": "Vmok Zzar DawnKeeper"
  },
  {
    "givenName": "Kusk Trzug",
    "form": "two-part",
    "title": "RedFist",
    "name": "Kusk Trzug RedFist"
  },
  {
    "givenName": "Krek Khrag",
    "form": "two-part",
    "name": "Krek Khrag"
  },
  {
    "givenName": "Mguk Mokog",
    "form": "two-part",
    "name": "Mguk Mokog"
  },
  {
    "givenName": "Kzar Klok",
    "form": "two-part",
    "title": "WarDrum",
    "name": "Kzar Klok WarDrum"
  },
  {
    "givenName": "Traz Keg",
    "form": "two-part",
    "title": "BlackBorn",
    "name": "Traz Keg BlackBorn"
  },
  {
    "givenName": "Vok Gek",
    "form": "two-part",
    "title": "GateWatcher",
    "name": "Vok Gek GateWatcher"
  },
  {
    "givenName": "Zhar Khaz",
    "form": "two-part",
    "name": "Zhar Khaz"
  },
  {
    "givenName": "Krgor Mokar",
    "form": "two-part",
    "name": "Krgor Mokar"
  },
  {
    "givenName": "Mgusk Thag",
    "form": "two-part",
    "title": "SiegeSplitter",
    "name": "Mgusk Thag SiegeSplitter"
  },
  {
    "givenName": "Rgek Vrzar",
    "form": "two-part",
    "title": "WyrmRaider",
    "name": "Rgek Vrzar WyrmRaider"
  },
  {
    "givenName": "Dog Thzug",
    "form": "two-part",
    "title": "BoneJaw",
    "name": "Dog Thzug BoneJaw"
  },
  {
    "givenName": "Mgzar Skmok",
    "form": "two-part",
    "name": "Mgzar Skmok"
  },
  {
    "givenName": "Rggar Mgog",
    "form": "two-part",
    "name": "Rggar Mgog"
  },
  {
    "givenName": "Dok Tka",
    "form": "two-part",
    "title": "LastFang",
    "name": "Dok Tka LastFang"
  },
  {
    "givenName": "Ghar Vrgor",
    "form": "two-part",
    "title": "StormBrother",
    "name": "Ghar Vrgor StormBrother"
  },
  {
    "givenName": "Grmok Drek",
    "form": "two-part",
    "title": "AxeBiter",
    "name": "Grmok Drek AxeBiter"
  },
  {
    "givenName": "Klag Kaz",
    "form": "two-part",
    "name": "Klag Kaz"
  },
  {
    "givenName": "Mokag Ugzug",
    "form": "two-part",
    "name": "Mokag Ugzug"
  },
  {
    "givenName": "Rgik Brusk",
    "form": "two-part",
    "title": "DawnWard",
    "name": "Rgik Brusk DawnWard"
  },
  {
    "givenName": "Tzar Vzar",
    "form": "two-part",
    "title": "RedSinger",
    "name": "Tzar Vzar RedSinger"
  },
  {
    "givenName": "Uggar Dur",
    "form": "two-part",
    "title": "WarLaugher",
    "name": "Uggar Dur WarLaugher"
  },
  {
    "givenName": "Grok Rgmok",
    "form": "two-part",
    "name": "Grok Rgmok"
  },
  {
    "givenName": "Klar Mog",
    "form": "two-part",
    "name": "Klar Mog"
  },
  {
    "givenName": "Uggor Skka",
    "form": "two-part",
    "title": "BlackGuard",
    "name": "Uggor Skka BlackGuard"
  },
  {
    "givenName": "Grrag Rar",
    "form": "two-part",
    "title": "GraveEater",
    "name": "Grrag Rar GraveEater"
  },
  {
    "givenName": "Klash Krash",
    "form": "two-part",
    "title": "SkullBreaker",
    "name": "Klash Krash SkullBreaker"
  },
  {
    "givenName": "Mog Rgak",
    "form": "two-part",
    "name": "Mog Rgak"
  },
  {
    "givenName": "Vrzar Mar",
    "form": "two-part",
    "name": "Vrzar Mar"
  },
  {
    "givenName": "Brgar Zhusk",
    "form": "two-part",
    "title": "NightBane",
    "name": "Brgar Zhusk NightBane"
  },
  {
    "givenName": "Drur Ghuk",
    "form": "two-part",
    "title": "BoneWalker",
    "name": "Drur Ghuk BoneWalker"
  },
  {
    "givenName": "Grur Brur",
    "form": "two-part",
    "title": "LastScar",
    "name": "Grur Brur LastScar"
  },
  {
    "givenName": "Kleg Zgor",
    "form": "two-part",
    "name": "Kleg Zgor"
  },
  {
    "givenName": "Mrag Trik",
    "form": "two-part",
    "name": "Mrag Trik"
  },
  {
    "givenName": "Rash Zhgar",
    "form": "two-part",
    "title": "StormKeeper",
    "name": "Rash Zhgar StormKeeper"
  },
  {
    "givenName": "Brik Gheg",
    "form": "two-part",
    "title": "AxeFist",
    "name": "Brik Gheg AxeFist"
  },
  {
    "givenName": "Drzar Klash",
    "form": "two-part",
    "title": "FireDrum",
    "name": "Drzar Klash FireDrum"
  },
  {
    "givenName": "Glgar Rak",
    "form": "two-part",
    "name": "Glgar Rak"
  },
  {
    "givenName": "Brka Krar",
    "form": "two-part",
    "name": "Brka Krar"
  },
  {
    "givenName": "Drzug Krag",
    "form": "two-part",
    "title": "ShieldBorn",
    "name": "Drzug Krag ShieldBorn"
  },
  {
    "givenName": "Glgor Guk",
    "form": "two-part",
    "title": "WarWatcher",
    "name": "Glgor Guk WarWatcher"
  },
  {
    "givenName": "Skrag Khok",
    "form": "two-part",
    "title": "BlackSplitter",
    "name": "Skrag Khok BlackSplitter"
  },
  {
    "givenName": "Trash Mokmok",
    "form": "two-part",
    "name": "Trash Mokmok"
  },
  {
    "givenName": "Vog Thik",
    "form": "two-part",
    "name": "Vog Thik"
  },
  {
    "givenName": "Skuk Zgar",
    "form": "two-part",
    "title": "GraveRaider",
    "name": "Skuk Zgar GraveRaider"
  },
  {
    "givenName": "Gak Geg",
    "form": "two-part",
    "title": "SkullJaw",
    "name": "Gak Geg SkullJaw"
  },
  {
    "givenName": "Glka Tag",
    "form": "two-part",
    "title": "NightFang",
    "name": "Glka Tag NightFang"
  },
  {
    "givenName": "Kzug Mokak",
    "form": "two-part",
    "name": "Kzug Mokak"
  },
  {
    "givenName": "Treg Tzug",
    "form": "two-part",
    "name": "Treg Tzug"
  },
  {
    "givenName": "Vrag Grrag",
    "form": "two-part",
    "title": "ChainBrother",
    "name": "Vrag Grrag ChainBrother"
  },
  {
    "givenName": "Zhash Druk",
    "form": "two-part",
    "title": "OathBiter",
    "name": "Zhash Druk OathBiter"
  },
  {
    "givenName": "Krik Kok",
    "form": "two-part",
    "title": "StormWard",
    "name": "Krik Kok StormWard"
  },
  {
    "givenName": "Vuk Gleg",
    "form": "two-part",
    "name": "Vuk Gleg"
  },
  {
    "givenName": "Zhaz Dek",
    "form": "two-part",
    "name": "Zhaz Dek"
  },
  {
    "givenName": "Krka Graz",
    "form": "two-part",
    "title": "AxeSinger",
    "name": "Krka Graz AxeSinger"
  },
  {
    "givenName": "Mgzug Dreg",
    "form": "two-part",
    "title": "FireLaugher",
    "name": "Mgzug Dreg FireLaugher"
  },
  {
    "givenName": "Rggor Skag",
    "form": "two-part",
    "title": "ShieldGuard",
    "name": "Rggor Skag ShieldGuard"
  },
  {
    "givenName": "Tusk Ugzar",
    "form": "two-part",
    "name": "Tusk Ugzar"
  },
  {
    "givenName": "Vusk Skzug",
    "form": "two-part",
    "name": "Vusk Skzug"
  },
  {
    "givenName": "Zhek Rmok",
    "form": "two-part",
    "title": "WolfEater",
    "name": "Zhek Rmok WolfEater"
  },
  {
    "givenName": "Duk Krog",
    "form": "two-part",
    "title": "BloodBreaker",
    "name": "Duk Krog BloodBreaker"
  },
  {
    "givenName": "Ghaz Rgka",
    "form": "two-part",
    "title": "IronBane",
    "name": "Ghaz Rgka IronBane"
  },
  {
    "givenName": "Rgka Uggor",
    "form": "two-part",
    "name": "Rgka Uggor"
  },
  {
    "givenName": "Tzug Brek",
    "form": "two-part",
    "name": "Tzug Brek"
  },
  {
    "givenName": "Gheg Glaz",
    "form": "two-part",
    "title": "SkullWalker",
    "name": "Gheg Glaz SkullWalker"
  },
  {
    "givenName": "Rgmok Deg",
    "form": "two-part",
    "title": "NightScar",
    "name": "Rgmok Deg NightScar"
  },
  {
    "givenName": "Thag Zusk",
    "form": "two-part",
    "title": "ChainKeeper",
    "name": "Thag Zusk ChainKeeper"
  },
  {
    "givenName": "Ugik Trzar",
    "form": "two-part",
    "name": "Ugik Trzar"
  },
  {
    "givenName": "Gruk Zhur",
    "form": "two-part",
    "name": "Gruk Zhur"
  },
  {
    "givenName": "Klaz Ghrag",
    "form": "two-part",
    "title": "OathFist",
    "name": "Klaz Ghrag OathFist"
  },
  {
    "givenName": "Mok Klog",
    "form": "two-part",
    "title": "TuskDrum",
    "name": "Mok Klog TuskDrum"
  },
  {
    "givenName": "Rgok Rka",
    "form": "two-part",
    "title": "BattleBorn",
    "name": "Rgok Rka BattleBorn"
  },
  {
    "givenName": "Thar Trgor",
    "form": "two-part",
    "name": "Thar Trgor"
  },
  {
    "givenName": "Ugmok Khash",
    "form": "two-part",
    "name": "Ugmok Khash"
  },
  {
    "givenName": "Zag Ghaz",
    "form": "two-part",
    "title": "FireWatcher",
    "name": "Zag Ghaz FireWatcher"
  },
  {
    "givenName": "Klek Klar",
    "form": "two-part",
    "title": "ShieldSplitter",
    "name": "Klek Klar ShieldSplitter"
  },
  {
    "givenName": "Muk Vrusk",
    "form": "two-part",
    "title": "WolfRaider",
    "name": "Muk Vrusk WolfRaider"
  },
  {
    "givenName": "Raz Thzar",
    "form": "two-part",
    "name": "Raz Thzar"
  },
  {
    "givenName": "Klgar Zur",
    "form": "two-part",
    "name": "Klgar Zur"
  },
  {
    "givenName": "Mur Vgor",
    "form": "two-part",
    "title": "BloodJaw",
    "name": "Mur Vgor BloodJaw"
  },
  {
    "givenName": "Reg Tik",
    "form": "two-part",
    "title": "IronFang",
    "name": "Reg Tik IronFang"
  },
  {
    "givenName": "Brmok Vrgar",
    "form": "two-part",
    "title": "StoneBrother",
    "name": "Brmok Vrgar StoneBrother"
  },
  {
    "givenName": "Gag Thgor",
    "form": "two-part",
    "name": "Gag Thgor"
  },
  {
    "givenName": "Glik Kash",
    "form": "two-part",
    "name": "Glik Kash"
  },
  {
    "givenName": "Brog Mgak",
    "form": "two-part",
    "title": "AshBiter",
    "name": "Brog Mgak AshBiter"
  },
  {
    "givenName": "Mzar Khar",
    "form": "two-part",
    "title": "ChainWard",
    "name": "Mzar Khar ChainWard"
  },
  {
    "givenName": "Rgar Glrag",
    "form": "two-part",
    "title": "OathSinger",
    "name": "Rgar Glrag OathSinger"
  },
  {
    "givenName": "Skur Duk",
    "form": "two-part",
    "name": "Skur Duk"
  },
  {
    "givenName": "Gar Grok",
    "form": "two-part",
    "name": "Gar Grok"
  },
  {
    "givenName": "Glmok Mmok",
    "form": "two-part",
    "title": "TuskLaugher",
    "name": "Glmok Mmok TuskLaugher"
  },
  {
    "givenName": "Khag Skik",
    "form": "two-part",
    "title": "BattleGuard",
    "name": "Khag Skik BattleGuard"
  },
  {
    "givenName": "Trek Vgar",
    "form": "two-part",
    "title": "GateEater",
    "name": "Trek Vgar GateEater"
  },
  {
    "givenName": "Glog Tgor",
    "form": "two-part",
    "name": "Glog Tgor"
  },
  {
    "givenName": "Khak Rgag",
    "form": "two-part",
    "name": "Khak Rgag"
  },
  {
    "givenName": "Trgar Mak",
    "form": "two-part",
    "title": "SiegeBreaker",
    "name": "Trgar Mak SiegeBreaker"
  },
  {
    "givenName": "Vur Rgzug",
    "form": "two-part",
    "title": "WyrmBane",
    "name": "Vur Rgzug WyrmBane"
  },
  {
    "givenName": "Zheg Ugusk",
    "form": "two-part",
    "title": "BloodWalker",
    "name": "Zheg Ugusk BloodWalker"
  },
  {
    "givenName": "Krmok Bruk",
    "form": "two-part",
    "name": "Krmok Bruk"
  },
  {
    "givenName": "Glrag Glok",
    "form": "two-part",
    "name": "Glrag Glok"
  },
  {
    "givenName": "Khash Krmok",
    "form": "two-part",
    "title": "IronScar",
    "name": "Khash Krmok IronScar"
  },
  {
    "givenName": "Krog Zhek",
    "form": "two-part",
    "title": "StoneKeeper",
    "name": "Krog Zhek StoneKeeper"
  },
  {
    "givenName": "Mokak Uggar",
    "form": "two-part",
    "title": "AshFist",
    "name": "Mokak Uggar AshFist"
  },
  {
    "givenName": "Zhgar Breg",
    "form": "two-part",
    "name": "Zhgar Breg"
  },
  {
    "givenName": "Dur Rag",
    "form": "two-part",
    "name": "Dur Rag"
  },
  {
    "givenName": "Mokar Krak",
    "form": "two-part",
    "title": "DawnDrum",
    "name": "Mokar Krak DawnDrum"
  },
  {
    "givenName": "Zhgor Rzug",
    "form": "two-part",
    "title": "RedBorn",
    "name": "Zhgor Rzug RedBorn"
  },
  {
    "givenName": "Dusk Mgmok",
    "form": "two-part",
    "title": "TuskWatcher",
    "name": "Dusk Mgmok TuskWatcher"
  },
  {
    "givenName": "Ghek Khog",
    "form": "two-part",
    "name": "Ghek Khog"
  },
  {
    "givenName": "Rgog Mokka",
    "form": "two-part",
    "name": "Rgog Mokka"
  },
  {
    "givenName": "Thak Klmok",
    "form": "two-part",
    "title": "BattleSplitter",
    "name": "Thak Klmok BattleSplitter"
  },
  {
    "givenName": "Ugka Zek",
    "form": "two-part",
    "title": "GateRaider",
    "name": "Ugka Zek GateRaider"
  },
  {
    "givenName": "Zhka Gaz",
    "form": "two-part",
    "title": "SiegeJaw",
    "name": "Zhka Gaz SiegeJaw"
  },
  {
    "givenName": "Dzug Zheg",
    "form": "two-part",
    "name": "Dzug Zheg"
  },
  {
    "givenName": "Ghgor Vusk",
    "form": "two-part",
    "name": "Ghgor Vusk"
  },
  {
    "givenName": "Grusk Tzar",
    "form": "two-part",
    "title": "WyrmFang",
    "name": "Grusk Tzar WyrmFang"
  },
  {
    "givenName": "Thash Vrur",
    "form": "two-part",
    "title": "BoneBrother",
    "name": "Thash Vrur BoneBrother"
  },
  {
    "givenName": "Ugog Drrag",
    "form": "two-part",
    "title": "LastBiter",
    "name": "Ugog Drrag LastBiter"
  },
  {
    "givenName": "Zak Kog",
    "form": "two-part",
    "name": "Zak Kog"
  },
  {
    "givenName": "Thaz Mgka",
    "form": "two-part",
    "name": "Thaz Mgka"
  },
  {
    "givenName": "Ugok Khmok",
    "form": "two-part",
    "title": "StoneWard",
    "name": "Ugok Khmok StoneWard"
  },
  {
    "givenName": "Zar Grash",
    "form": "two-part",
    "title": "AshSinger",
    "name": "Zar Grash AshSinger"
  },
  {
    "givenName": "Klgor Draz",
    "form": "two-part",
    "title": "DawnLaugher",
    "name": "Klgor Draz DawnLaugher"
  },
  {
    "givenName": "Musk Kar",
    "form": "two-part",
    "name": "Musk Kar"
  },
  {
    "givenName": "Rek Mgag",
    "form": "two-part",
    "name": "Rek Mgag"
  },
  {
    "givenName": "Klik Skzar",
    "form": "two-part",
    "title": "RedGuard",
    "name": "Klik Skzar RedGuard"
  },
  {
    "givenName": "Uguk Vur",
    "form": "two-part",
    "title": "WarEater",
    "name": "Uguk Vur WarEater"
  },
  {
    "givenName": "Zaz Tusk",
    "form": "two-part",
    "title": "BlackBreaker",
    "name": "Zaz Tusk BlackBreaker"
  },
  {
    "givenName": "Brok Rgik",
    "form": "two-part",
    "name": "Brok Rgik"
  },
  {
    "givenName": "Mzug Mka",
    "form": "two-part",
    "name": "Mzug Mka"
  },
  {
    "givenName": "Rgor Skgor",
    "form": "two-part",
    "title": "GraveBane",
    "name": "Rgor Skgor GraveBane"
  },
  {
    "givenName": "Skusk Glash",
    "form": "two-part",
    "title": "SiegeWalker",
    "name": "Skusk Glash SiegeWalker"
  },
  {
    "givenName": "Gash Daz",
    "form": "two-part",
    "title": "WyrmScar",
    "name": "Gash Daz WyrmScar"
  },
  {
    "givenName": "Rik Grar",
    "form": "two-part",
    "name": "Rik Grar"
  },
  {
    "givenName": "Skzar Trusk",
    "form": "two-part",
    "name": "Skzar Trusk"
  },
  {
    "givenName": "Gaz Zhuk",
    "form": "two-part",
    "title": "BoneKeeper",
    "name": "Gaz Zhuk BoneKeeper"
  },
  {
    "givenName": "Glok Ghok",
    "form": "two-part",
    "title": "LastFist",
    "name": "Glok Ghok LastFist"
  },
  {
    "givenName": "Khar Brrag",
    "form": "two-part",
    "title": "StormDrum",
    "name": "Khar Brrag StormDrum"
  },
  {
    "givenName": "Trgor Rik",
    "form": "two-part",
    "name": "Trgor Rik"
  },
  {
    "givenName": "Rmok Trgar",
    "form": "two-part",
    "name": "Rmok Trgar"
  },
  {
    "givenName": "Tag Rggor",
    "form": "two-part",
    "title": "AxeBorn",
    "name": "Tag Rggor AxeBorn"
  },
  {
    "givenName": "Trik Mokag",
    "form": "two-part",
    "title": "DawnWatcher",
    "name": "Trik Mokag DawnWatcher"
  },
  {
    "givenName": "Vzar Klak",
    "form": "two-part",
    "title": "RedSplitter",
    "name": "Vzar Klak RedSplitter"
  },
  {
    "givenName": "Khaz Mokzug",
    "form": "two-part",
    "name": "Khaz Mokzug"
  },
  {
    "givenName": "Krok Thusk",
    "form": "two-part",
    "name": "Krok Thusk"
  },
  {
    "givenName": "Vzug Zuk",
    "form": "two-part",
    "title": "WarRaider",
    "name": "Vzug Zuk WarRaider"
  },
  {
    "givenName": "Kheg Gok",
    "form": "two-part",
    "title": "BlackJaw",
    "name": "Kheg Gok BlackJaw"
  },
  {
    "givenName": "Krrag Zhrag",
    "form": "two-part",
    "title": "GraveFang",
    "name": "Krrag Zhrag GraveFang"
  },
  {
    "givenName": "Mokash Vrek",
    "form": "two-part",
    "name": "Mokash Vrek"
  },
  {
    "givenName": "Zhik Thgar",
    "form": "two-part",
    "name": "Zhik Thgar"
  },
  {
    "givenName": "Dzar Zeg",
    "form": "two-part",
    "title": "SkullBrother",
    "name": "Dzar Zeg SkullBrother"
  },
  {
    "givenName": "Ghgar Gash",
    "form": "two-part",
    "title": "NightBiter",
    "name": "Ghgar Gash NightBiter"
  },
  {
    "givenName": "Khgar Khak",
    "form": "two-part",
    "title": "BoneWard",
    "name": "Khgar Khak BoneWard"
  },
  {
    "givenName": "Krur Mgzug",
    "form": "two-part",
    "name": "Krur Mgzug"
  },
  {
    "givenName": "Mokeg Klag",
    "form": "two-part",
    "name": "Mokeg Klag"
  },
  {
    "givenName": "Rgrag Grog",
    "form": "two-part",
    "title": "LastSinger",
    "name": "Rgrag Grog LastSinger"
  },
  {
    "givenName": "Drag Drok",
    "form": "two-part",
    "title": "StormLaugher",
    "name": "Drag Drok StormLaugher"
  },
  {
    "givenName": "Ghik Kmok",
    "form": "two-part",
    "title": "AxeGuard",
    "name": "Ghik Kmok AxeGuard"
  },
  {
    "givenName": "Grzar Vek",
    "form": "two-part",
    "name": "Grzar Vek"
  },
  {
    "givenName": "Drak Tgar",
    "form": "two-part",
    "name": "Drak Tgar"
  },
  {
    "givenName": "Ghka Vreg",
    "form": "two-part",
    "title": "FireEater",
    "name": "Ghka Vreg FireEater"
  },
  {
    "givenName": "Grzug Mag",
    "form": "two-part",
    "title": "ShieldBreaker",
    "name": "Grzug Mag ShieldBreaker"
  },
  {
    "givenName": "Theg Rgzar",
    "form": "two-part",
    "title": "WolfBane",
    "name": "Theg Rgzar WolfBane"
  },
  {
    "givenName": "Ugrag Ugur",
    "form": "two-part",
    "name": "Ugrag Ugur"
  },
  {
    "givenName": "Zash Skusk",
    "form": "two-part",
    "name": "Zash Skusk"
  },
  {
    "givenName": "Thek Glog",
    "form": "two-part",
    "title": "BlackWalker",
    "name": "Thek Glog BlackWalker"
  },
  {
    "givenName": "Ghog Krka",
    "form": "two-part",
    "title": "GraveScar",
    "name": "Ghog Krka GraveScar"
  },
  {
    "givenName": "Kak Grmok",
    "form": "two-part",
    "title": "SkullKeeper",
    "name": "Kak Grmok SkullKeeper"
  },
  {
    "givenName": "Klka Ghash",
    "form": "two-part",
    "name": "Klka Ghash"
  },
  {
    "givenName": "Ugur Braz",
    "form": "two-part",
    "name": "Ugur Braz"
  },
  {
    "givenName": "Zeg Glar",
    "form": "two-part",
    "title": "NightFist",
    "name": "Zeg Glar NightFist"
  },
  {
    "givenName": "Brrag Dash",
    "form": "two-part",
    "title": "ChainDrum",
    "name": "Brrag Dash ChainDrum"
  },
  {
    "givenName": "Mgag Rzar",
    "form": "two-part",
    "title": "OathBorn",
    "name": "Mgag Rzar OathBorn"
  },
  {
    "givenName": "Zek Trur",
    "form": "two-part",
    "name": "Zek Trur"
  },
  {
    "givenName": "Bruk Rgusk",
    "form": "two-part",
    "name": "Bruk Rgusk"
  },
  {
    "givenName": "Mgak Mokik",
    "form": "two-part",
    "title": "StormWatcher",
    "name": "Mgak Mokik StormWatcher"
  },
  {
    "givenName": "Rka Klka",
    "form": "two-part",
    "title": "AxeSplitter",
    "name": "Rka Klka AxeSplitter"
  },
  {
    "givenName": "Skzug Rgor",
    "form": "two-part",
    "title": "FireRaider",
    "name": "Skzug Rgor FireRaider"
  },
  {
    "givenName": "Geg Trek",
    "form": "two-part",
    "name": "Geg Trek"
  },
  {
    "givenName": "Zgor Zhaz",
    "form": "two-part",
    "name": "Zgor Zhaz"
  },
  {
    "givenName": "Brusk Ghar",
    "form": "two-part",
    "title": "ShieldJaw",
    "name": "Brusk Ghar ShieldJaw"
  },
  {
    "givenName": "Gek Brash",
    "form": "two-part",
    "title": "WolfFang",
    "name": "Gek Brash WolfFang"
  },
  {
    "givenName": "Gluk Vruk",
    "form": "two-part",
    "title": "BloodBrother",
    "name": "Gluk Vruk BloodBrother"
  },
  {
    "givenName": "Tak Thur",
    "form": "two-part",
    "name": "Tak Thur"
  },
  {
    "givenName": "Trka Zrag",
    "form": "two-part",
    "name": "Trka Zrag"
  },
  {
    "givenName": "Glur Mgik",
    "form": "two-part",
    "title": "IronBiter",
    "name": "Glur Mgik IronBiter"
  },
  {
    "givenName": "Tar Khka",
    "form": "two-part",
    "title": "SkullWard",
    "name": "Tar Khka SkullWard"
  },
  {
    "givenName": "Trmok Mokgor",
    "form": "two-part",
    "title": "NightSinger",
    "name": "Trmok Mokgor NightSinger"
  },
  {
    "givenName": "Glusk Drash",
    "form": "two-part",
    "name": "Glusk Drash"
  },
  {
    "givenName": "Khek Kak",
    "form": "two-part",
    "name": "Khek Kak"
  },
  {
    "givenName": "Kruk Mzug",
    "form": "two-part",
    "title": "ChainLaugher",
    "name": "Kruk Mzug ChainLaugher"
  },
  {
    "givenName": "Mokaz Khag",
    "form": "two-part",
    "title": "OathGuard",
    "name": "Mokaz Khag OathGuard"
  },
  {
    "givenName": "Taz Vuk",
    "form": "two-part",
    "title": "TuskEater",
    "name": "Taz Vuk TuskEater"
  },
  {
    "givenName": "Trok Dok",
    "form": "two-part",
    "name": "Trok Dok"
  },
  {
    "givenName": "Vrar Vrrag",
    "form": "two-part",
    "name": "Vrar Vrrag"
  },
  {
    "givenName": "Zhmok Ugek",
    "form": "two-part",
    "title": "BattleBreaker",
    "name": "Zhmok Ugek BattleBreaker"
  },
  {
    "givenName": "Krusk Skgar",
    "form": "two-part",
    "title": "GateBane",
    "name": "Krusk Skgar GateBane"
  },
  {
    "givenName": "Mokek Veg",
    "form": "two-part",
    "title": "ShieldWalker",
    "name": "Mokek Veg ShieldWalker"
  },
  {
    "givenName": "Rguk Tek",
    "form": "two-part",
    "name": "Rguk Tek"
  },
  {
    "givenName": "Krzar Grak",
    "form": "two-part",
    "name": "Krzar Grak"
  },
  {
    "givenName": "Mokgar Krzug",
    "form": "two-part",
    "title": "WolfScar",
    "name": "Mokgar Krzug WolfScar"
  },
  {
    "givenName": "Rgur Kag",
    "form": "two-part",
    "title": "BloodKeeper",
    "name": "Rgur Kag BloodKeeper"
  },
  {
    "givenName": "Drar Ghog",
    "form": "two-part",
    "title": "IronFist",
    "name": "Drar Ghog IronFist"
  },
  {
    "givenName": "Ghmok Brok",
    "form": "two-part",
    "name": "Ghmok Brok"
  },
  {
    "givenName": "Kag Glmok",
    "form": "two-part",
    "name": "Kag Glmok"
  },
  {
    "givenName": "Drash Krik",
    "form": "two-part",
    "title": "StoneDrum",
    "name": "Drash Krik StoneDrum"
  },
  {
    "givenName": "Mokik Rggar",
    "form": "two-part",
    "title": "AshBorn",
    "name": "Mokik Rggar AshBorn"
  },
  {
    "givenName": "Rgzar Ugeg",
    "form": "two-part",
    "title": "ChainWatcher",
    "name": "Rgzar Ugeg ChainWatcher"
  },
  {
    "givenName": "Thgar Skek",
    "form": "two-part",
    "name": "Thgar Skek"
  },
  {
    "givenName": "Ghok Mokzar",
    "form": "two-part",
    "name": "Ghok Mokzar"
  },
  {
    "givenName": "Kar Klzug",
    "form": "two-part",
    "title": "OathSplitter",
    "name": "Kar Klzug OathSplitter"
  },
  {
    "givenName": "Klmok Rusk",
    "form": "two-part",
    "title": "TuskRaider",
    "name": "Klmok Rusk TuskRaider"
  },
  {
    "givenName": "Ugusk Gog",
    "form": "two-part",
    "title": "BattleJaw",
    "name": "Ugusk Gog BattleJaw"
  },
  {
    "givenName": "Kash Zhok",
    "form": "two-part",
    "name": "Kash Zhok"
  },
  {
    "givenName": "Klog Ghmok",
    "form": "two-part",
    "name": "Klog Ghmok"
  },
  {
    "givenName": "Ugzar Thek",
    "form": "two-part",
    "title": "GateFang",
    "name": "Ugzar Thek GateFang"
  },
  {
    "givenName": "Zgar Zaz",
    "form": "two-part",
    "title": "SiegeBrother",
    "name": "Zgar Zaz SiegeBrother"
  },
  {
    "givenName": "Brur Gar",
    "form": "two-part",
    "title": "WyrmBiter",
    "name": "Brur Gar WyrmBiter"
  },
  {
    "givenName": "Ugzug Zhash",
    "form": "two-part",
    "name": "Ugzug Zhash"
  },
  {
    "givenName": "Keg Mgzar",
    "form": "two-part",
    "name": "Keg Mgzar"
  },
  {
    "givenName": "Klrag Tur",
    "form": "two-part",
    "title": "BloodWard",
    "name": "Klrag Tur BloodWard"
  },
  {
    "givenName": "Mgash Mokusk",
    "form": "two-part",
    "title": "IronSinger",
    "name": "Mgash Mokusk IronSinger"
  },
  {
    "givenName": "Rog Mik",
    "form": "two-part",
    "title": "StoneLaugher",
    "name": "Rog Mik StoneLaugher"
  },
  {
    "givenName": "Brzar Kka",
    "form": "two-part",
    "name": "Brzar Kka"
  },
  {
    "givenName": "Ggar Mggor",
    "form": "two-part",
    "name": "Ggar Mggor"
  },
  {
    "givenName": "Rok Khik",
    "form": "two-part",
    "title": "AshGuard",
    "name": "Rok Khik AshGuard"
  },
  {
    "givenName": "Brzug Vraz",
    "form": "two-part",
    "title": "DawnEater",
    "name": "Brzug Vraz DawnEater"
  },
  {
    "givenName": "Ggor Drar",
    "form": "two-part",
    "title": "RedBreaker",
    "name": "Ggor Drar RedBreaker"
  },
  {
    "givenName": "Rrag Zash",
    "form": "two-part",
    "name": "Rrag Zash"
  },
  {
    "givenName": "Tash Uguk",
    "form": "two-part",
    "name": "Tash Uguk"
  },
  {
    "givenName": "Trog Skur",
    "form": "two-part",
    "title": "WarBane",
    "name": "Trog Skur WarBane"
  },
  {
    "givenName": "Vrak Vrag",
    "form": "two-part",
    "title": "BattleWalker",
    "name": "Vrak Vrag BattleWalker"
  },
  {
    "givenName": "Dak Dog",
    "form": "two-part",
    "title": "GateScar",
    "name": "Dak Dog GateScar"
  },
  {
    "givenName": "Gka Grka",
    "form": "two-part",
    "name": "Gka Grka"
  },
  {
    "givenName": "Glzug Mgor",
    "form": "two-part",
    "name": "Glzug Mgor"
  },
  {
    "givenName": "Khgor Kik",
    "form": "two-part",
    "title": "SiegeKeeper",
    "name": "Khgor Kik SiegeKeeper"
  },
  {
    "givenName": "Trrag Glak",
    "form": "two-part",
    "title": "WyrmFist",
    "name": "Trrag Glak WyrmFist"
  },
  {
    "givenName": "Vrash Dar",
    "form": "two-part",
    "title": "BoneDrum",
    "name": "Vrash Dar BoneDrum"
  },
  {
    "givenName": "Zhog Grag",
    "form": "two-part",
    "name": "Zhog Grag"
  },
  {
    "givenName": "Truk Truk",
    "form": "two-part",
    "name": "Truk Truk"
  },
  {
    "givenName": "Vraz Rgur",
    "form": "two-part",
    "title": "LastBorn",
    "name": "Vraz Rgur LastBorn"
  },
  {
    "givenName": "Zhok Ugrag",
    "form": "two-part",
    "title": "StoneWatcher",
    "name": "Zhok Ugrag StoneWatcher"
  },
  {
    "givenName": "Krzug Klik",
    "form": "two-part",
    "title": "AshSplitter",
    "name": "Krzug Klik AshSplitter"
  }
]

const primary = orcNames.map(entry => entry.givenName)
const titled = orcNames.filter(entry => entry.title)
if (orcNames.length !== 500 || new Set(primary).size !== 500) throw new Error('Orcs require 500 unique given names')
if (orcNames.filter(entry => entry.form === 'apostrophe').length !== 125) throw new Error('Only 25% of Orc names may use apostrophes')
if (orcNames.filter(entry => !entry.title).length !== 200) throw new Error('40% of Orc names must omit a title')
if (titled.length !== 300 || new Set(titled.map(entry => entry.title)).size !== 300) throw new Error('Orc earned titles must be unique')

export default orcNames
