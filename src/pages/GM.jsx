import Guide from '../components/Guide'
import theGuild from '../content/gm/the-guild.txt?raw'
import basics from '../content/gm/basics.txt?raw'
import levels from '../content/gm/levels.txt?raw'
import rolls from '../content/gm/rolls.txt?raw'
import credits from '../content/gm/credits.txt?raw'
import loot from '../content/gm/loot.txt?raw'
import death from '../content/gm/death.txt?raw'
import npcCreation from '../content/gm/npc-creation.txt?raw'
import creatureCompendium from '../content/gm/creature-compendium.txt?raw'
import adventures from '../content/gm/adventures.txt?raw'
import history from '../content/gm/history.txt?raw'
import factions from '../content/gm/factions.txt?raw'
import './pages.css'

const sections = [
  {
    title: 'The Guild',
    subtitle: 'Welcome to the Gateway to Adventure!',
    content: theGuild
  },
  {
    title: 'Basics',
    content: basics
  },
  {
    title: 'Levels',
    content: levels
  },
  {
    title: 'Rolls',
    content: rolls
  },
  {
    title: 'Credits',
    content: credits
  },
  {
    title: 'Loot',
    content: loot
  },
  {
    title: 'Death',
    content: death
  },
  {
    title: 'NPC Creation',
    content: npcCreation
  },
  {
    title: 'Creature Compendium',
    content: creatureCompendium,
    creatureCards: [
      {
        name: 'Giant',
        summary: 'A brutally strong threat balanced by poor agility and limited education.',
        fields: [['Attack', '+6'], ['Damage', 'd12'], ['AV', '12'], ['HP', '12'], ['Stats', 'STR +8, DEX −1, END +3, INT 0, EDU −3, CHA −2'], ['Skills', 'Melee +1'], ['Enhancements', '+1'], ['Talents', 'Fly F3 (permanent)']]
      },
      {
        name: 'Werewolf',
        summary: 'A relentless supernatural hunter that closes distance quickly and shrugs off ordinary wounds.',
        fields: [['Attack', '+5'], ['Damage', 'd8 claws or d10 bite'], ['AV', '13'], ['HP', '18'], ['Stats', 'STR +4, DEX +3, END +4, INT +2, EDU −2, CHA −1'], ['Skills', 'Observation +3, Outdoors +3, Sneak +2'], ['Talents', 'Regeneration F2 (permanent), Super Speed F1']]
      },
      {
        name: 'Cyber Oozer',
        summary: 'Escaped smart matter that digests machines, flows through vents, and rewrites damaged circuitry into itself.',
        fields: [['Attack', '+3'], ['Damage', 'd10 corrosive pseudopod'], ['AV', '9'], ['HP', '24'], ['Stats', 'STR +3, DEX −2, END +6, INT +1, EDU +2, CHA −4'], ['Skills', 'Technology +3, Sneak +2'], ['Talents', 'Shapechange F2 (permanent), Harm F2'], ['Special', 'A successful hit against armor or machinery gives the target −1 AV until repaired.']]
      }
    ]
  },
  {
    title: 'Adventures',
    content: adventures
  },
  {
    title: 'History',
    content: history
  },
  {
    title: 'Factions',
    content: factions
  }
]

function GM() {
  return (
    <Guide
      title="GM"
      intro="Game Master references for running missions, shaping the multiverse, and keeping play moving."
      sections={sections}
    />
  )
}

export default GM
