import './pages.css'
import './Archive.css'

function Archive() {
  const episodes = [
    { id: 1, title: 'Episode 0: Prologue', description: 'The beginning of the multiverse adventure', panels: 12 },
    { id: 2, title: 'Episode 1: Trouble in Knolton', description: 'The first real challenge emerges', panels: 18 },
    { id: 3, title: 'Episode 2: Overconfidence', description: 'A lesson learned the hard way', panels: 15 },
    { id: 4, title: 'Episode 3: The Silver Lotus', description: 'An ancient artifact awakens', panels: 22 },
    { id: 5, title: 'Episode 4: The Shadow World Invader', description: 'A threat from another dimension', panels: 20 },
    { id: 6, title: 'Episode 5: Orc Raid!', description: 'An unexpected assault on the guild', panels: 25 },
  ]

  return (
    <div className="page archive-page">
      <section className="archive-header">
        <h1>Comic Archive</h1>
        <p>Explore all episodes of the Multiverse Adventurers Guild saga</p>
      </section>

      <section className="episodes-grid">
        {episodes.map(episode => (
          <div key={episode.id} className="episode-card">
            <div className="episode-image">📖</div>
            <h3>{episode.title}</h3>
            <p>{episode.description}</p>
            <p className="panel-count">{episode.panels} panels</p>
            <button className="read-button">Read Episode</button>
          </div>
        ))}
      </section>

      <section className="archive-info">
        <h2>Latest Episodes</h2>
        <p>New episodes are posted regularly. Subscribe to stay updated on the latest adventures!</p>
        <button className="subscribe-button">Subscribe to Updates</button>
      </section>
    </div>
  )
}

export default Archive
