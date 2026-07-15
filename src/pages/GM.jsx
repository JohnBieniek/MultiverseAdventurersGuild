import GuidePage from '../components/GuidePage'
import './pages.css'

const sections = [
  {
    title: 'The Guild',
    body: 'The Guild gives the campaign a shared home base, a reason for unlikely heroes to work together, and a steady source of missions. Use it as a launch point, a political force, or a mystery in its own right.'
  },
  {
    title: 'Basics',
    body: 'The GM frames scenes, presents consequences, asks what the heroes do, and calls for rolls when failure would matter. Keep the table moving by making stakes clear before the dice hit the table.'
  },
  {
    title: 'Levels',
    body: 'Levels show how heroes grow after meaningful adventures. Advancement should reward daring choices, completed objectives, hard lessons, and the relationships players build along the way.'
  },
  {
    title: 'Rolls',
    body: 'Rolls resolve uncertain outcomes when both success and failure would change the story. Before rolling, decide what is at risk, what a strong success looks like, and how complications might enter the scene.'
  },
  {
    title: 'Credits',
    body: 'Credits represent spendable wealth, favors, access, and mission pay. Use them to make choices about supplies, bribes, repairs, and rare opportunities feel grounded without turning play into bookkeeping.'
  },
  {
    title: 'Loot',
    body: 'Loot should tell a story about where it came from and what trouble it may cause. Give treasure abilities, limitations, or strings attached so rewards become hooks for future play.'
  },
  {
    title: 'Death',
    body: 'Death and defeat should be handled clearly before they happen. When a hero falls, give the table space for consequences, rescue attempts, sacrifices, or legacy choices that respect the moment.'
  },
  {
    title: 'NPC Creation',
    body: 'Create NPCs around a need, a want, and a memorable detail. Most only need a motive, a useful skill, and one thing that makes them easy for players to recognize later.'
  },
  {
    title: 'Adventures',
    body: 'Adventures work best when they start with a problem, pressure, and several possible paths forward. Prepare locations, factions, clocks, and rewards instead of trying to script every answer.'
  },
  {
    title: 'History',
    body: 'History gives weight to strange ruins, old wars, famous heroes, and forbidden technology. Reveal it through discoveries and consequences rather than long explanations.'
  },
  {
    title: 'Factions',
    body: 'Factions create motion in the world while the heroes are elsewhere. Give each faction a goal, a resource, a fear, and a line they are willing or unwilling to cross.'
  }
]

function GM() {
  return (
    <GuidePage
      title="GM"
      intro="Game Master references for running missions, shaping the multiverse, and keeping play moving."
      sections={sections}
    />
  )
}

export default GM
