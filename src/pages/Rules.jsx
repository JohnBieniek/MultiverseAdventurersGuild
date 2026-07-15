import GuidePage from '../components/GuidePage'
import './pages.css'

const sections = [
  {
    title: 'Rolls',
    body: 'Roll when the outcome is uncertain and the result would matter. Name the risk first so everyone understands what success, failure, and partial progress could mean.'
  },
  {
    title: 'Action Economy',
    body: 'Action economy keeps turns fair and readable. Each character should have a clear chance to move, act, react, and contribute without one turn swallowing the whole scene.'
  },
  {
    title: 'Level Progression',
    body: 'Level progression marks a hero’s growth after major discoveries, victories, sacrifices, or completed missions. New options should expand what a character can try, not erase old challenges.'
  },
  {
    title: 'Movement',
    body: 'Movement covers positioning, travel, chases, climbing, swimming, flying, and shifting through unusual terrain. Use distances when they matter and clear fictional positioning when they do not.'
  },
  {
    title: 'Healing',
    body: 'Healing restores heroes through rest, treatment, powers, supplies, or safe downtime. It should reduce pressure while still making injuries, lost time, and scarce resources meaningful.'
  },
  {
    title: 'Assisting',
    body: 'Assisting lets one hero improve another hero’s chance by creating an opening, sharing expertise, or taking on part of the risk. The helper should describe what they do and what it might cost.'
  },
  {
    title: 'Combat',
    body: 'Combat should focus on choices, stakes, and changing conditions. Mix threats, objectives, terrain, and consequences so fights are more than trading attacks until one side falls.'
  },
  {
    title: 'Credits',
    body: 'Credits track practical buying power for gear, lodging, favors, transport, and unusual services. Prices should support the story and help players decide what matters most.'
  },
  {
    title: 'Vehicles',
    body: 'Vehicles include mounts, starships, motorcycles, spellcraft, walking tanks, and anything else that changes scale. Give vehicles strengths, flaws, and scenes where they can shine.'
  }
]

function Rules() {
  return (
    <GuidePage
      title="Rules"
      intro="Core table references for resolving action, managing risk, and keeping scenes moving."
      sections={sections}
    />
  )
}

export default Rules
