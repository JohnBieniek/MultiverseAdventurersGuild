import './pages.css'

function Home() {
  return (
    <div className="page home-page">
      <section className="hero">
        <img
          className="hero-knight"
          src="/rifle-knight.avif"
          alt="Rifle knight"
        />
        <div className="hero-copy">
          <h1>Welcome to the Multiverse Adventurers Guild</h1>
          <p>
            Time is fracturing. The Multiverse is at risk of destruction. Join the
            Multiverse Adventurers Guild, a tabletop role-playing game to play any
            Hero: Cowboy, Cyborg. Wizard, Super Hero from any setting, time, or
            era. The possibilities are endless.
          </p>
        </div>
      </section>

      <section className="featured-content">
        <div className="content-card">
          <h2>GM</h2>
          <p>Tools, notes, and guidance for running sessions across the multiverse.</p>
        </div>
        <div className="content-card">
          <h2>Players</h2>
          <p>Resources for characters, table expectations, and getting ready to play.</p>
        </div>
        <div className="content-card">
          <h2>Rules</h2>
          <p>Keep shared rulings and table procedures easy to find.</p>
        </div>
      </section>
    </div>
  )
}

export default Home
