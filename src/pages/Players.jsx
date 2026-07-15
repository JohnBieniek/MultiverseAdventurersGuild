import GuidePage from '../components/GuidePage'
import './pages.css'

const sections = [
  {
    title: 'How to Play',
    body: 'Players describe what their heroes attempt, ask clear questions about the scene, and roll when the outcome is uncertain. The goal is to make bold choices, share the spotlight, and build the adventure together.'
  },
  {
    title: 'Species',
    body: 'Species describes the origin, biology, culture, or manufactured design of a hero. Choose traits that shape how the character moves through the world without limiting who they can become.'
  },
  {
    title: 'Archetypes',
    body: 'Archetypes are broad heroic roles such as champion, trickster, scholar, guardian, mystic, or specialist. They give players a quick way to understand how a character contributes during danger, discovery, and negotiation.'
  },
  {
    title: 'Stats',
    body: 'Stats measure a hero’s core capabilities and help determine how they approach risky moments. Strong stats should point toward signature actions while weaker stats create interesting complications.'
  },
  {
    title: 'Skills',
    body: 'Skills represent training, practice, and hard-earned instincts. Use them when a hero leans on expertise such as tracking, hacking, persuasion, medicine, spellcraft, piloting, or battlefield awareness.'
  },
  {
    title: 'Defenses',
    body: 'Defenses protect heroes from physical harm, mental pressure, social manipulation, and supernatural effects. They help the table resolve attacks quickly while still leaving room for clever tactics.'
  },
  {
    title: 'HP',
    body: 'HP tracks how much punishment a hero can take before they are in real trouble. Losing HP should make danger feel immediate, but it should also create dramatic chances for allies to intervene.'
  },
  {
    title: 'Contacts',
    body: 'Contacts are allies, rivals, informants, patrons, and familiar faces who can open doors across the multiverse. A good contact has useful knowledge, a clear personality, and a reason to ask for something in return.'
  },
  {
    title: 'Weapons',
    body: 'Weapons cover everything from six-shooters and plasma rifles to enchanted blades and improvised tools. Pick weapons that fit the hero’s style and give the GM useful clues about the action scenes players want.'
  },
  {
    title: 'Reputation',
    body: 'Reputation records how factions, settlements, and legends react to a hero’s deeds. It can earn trust, provoke old enemies, or turn a simple introduction into a major story moment.'
  },
  {
    title: 'Equipment',
    body: 'Equipment includes the tools, armor, travel gear, relics, and strange devices that help heroes survive unusual worlds. The best gear gives players new options instead of solving every problem for them.'
  },
  {
    title: 'Talents',
    body: 'Talents are special tricks, powers, and defining techniques that set a hero apart. Use them to reinforce the character fantasy and create memorable moments during play.'
  },
  {
    title: 'Character Sheet',
    body: 'The character sheet gathers the hero’s identity, numbers, gear, bonds, and story notes in one place. Keep it current so the table can move quickly when the action starts.'
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
