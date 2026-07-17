import Guide from '../components/Guide'
import theGuild from '../content/gm/the-guild.txt?raw'
import basics from '../content/gm/basics.txt?raw'
import levels from '../content/gm/levels.txt?raw'
import rolls from '../content/gm/rolls.txt?raw'
import credits from '../content/gm/credits.txt?raw'
import loot from '../content/gm/loot.txt?raw'
import death from '../content/gm/death.txt?raw'
import npcCreation from '../content/gm/npc-creation.txt?raw'
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
