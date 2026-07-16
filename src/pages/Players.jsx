import GuidePage from '../components/GuidePage'
import howToPlay from '../content/players/roleplaying.txt?raw'
import species from '../content/players/species.txt?raw'
import archetypes from '../content/players/archetypes.txt?raw'
import stats from '../content/players/stats.txt?raw'
import skills from '../content/players/skills.txt?raw'
import defenses from '../content/players/defenses.txt?raw'
import hp from '../content/players/hp.txt?raw'
import contacts from '../content/players/contacts.txt?raw'
import weapons from '../content/players/weapons.txt?raw'
import reputation from '../content/players/reputation.txt?raw'
import equipment from '../content/players/equipment.txt?raw'
import talents from '../content/players/talents.txt?raw'
import './pages.css'

const sections = [
  {
    title: 'How to Play',
    content: howToPlay,
    image: {
      src: '/character-sheet.png',
      alt: 'Multiverse Adventurers Guild character sheet'
    },
    download: {
      href: '/character-sheet.pdf',
      filename: 'multiverse-adventurers-guild-character-sheet.pdf',
      label: 'Download Character Sheet'
    }
  },
  {
    title: 'Species',
    content: species,
    cardType: 'species'
  },
  {
    title: 'Archetypes',
    content: archetypes,
    cardType: 'archetype'
  },
  {
    title: 'Stats',
    content: stats
  },
  {
    title: 'Skills',
    content: skills
  },
  {
    title: 'Defenses',
    content: defenses
  },
  {
    title: 'HP',
    content: hp
  },
  {
    title: 'Contacts',
    content: contacts,
    cardType: 'contact'
  },
  {
    title: 'Weapons',
    content: weapons
  },
  {
    title: 'Reputation',
    content: reputation,
    cardType: 'reputation'
  },
  {
    title: 'Equipment',
    content: equipment
  },
  {
    title: 'Talents',
    content: talents,
    cardType: 'talent'
  }
]

function Players() {
  return (
    <GuidePage
      title="Players"
      intro="Player-facing references for building heroes, understanding the table, and jumping into adventure."
      sections={sections}
    />
  )
}

export default Players
