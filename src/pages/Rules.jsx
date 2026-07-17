import Guide from '../components/Guide'
import rolls from '../content/rules/rolls.txt?raw'
import actionEconomy from '../content/rules/action-economy.txt?raw'
import levelProgression from '../content/rules/level-progression.txt?raw'
import movement from '../content/rules/movement.txt?raw'
import healing from '../content/rules/healing.txt?raw'
import assisting from '../content/rules/assisting.txt?raw'
import combat from '../content/rules/combat.txt?raw'
import credits from '../content/rules/credits.txt?raw'
import vehicles from '../content/rules/vehicles.txt?raw'
import './pages.css'

const sections = [
  {
    title: 'Rolls',
    content: rolls
  },
  {
    title: 'Action Economy',
    content: actionEconomy
  },
  {
    title: 'Level Progression',
    content: levelProgression
  },
  {
    title: 'Movement',
    content: movement
  },
  {
    title: 'Healing',
    content: healing
  },
  {
    title: 'Assisting',
    content: assisting
  },
  {
    title: 'Combat',
    content: combat
  },
  {
    title: 'Credits',
    content: credits
  },
  {
    title: 'Vehicles',
    content: vehicles
  }
]

function Rules() {
  return (
    <Guide
      title="Rules"
      intro="Core table references for resolving action, managing risk, and keeping scenes moving."
      sections={sections}
    />
  )
}

export default Rules
