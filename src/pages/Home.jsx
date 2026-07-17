import { Link } from 'react-router-dom'
import './pages.css'

function Home() {
  return (
    <div className="page home-page">
      <section className="home-intro">
        <img
          className="hero-knight"
          src="/rifle-knight.avif"
          alt="Rifle knight"
        />
        <div className="hero">
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
        <Link className="content-card" to="/rules">
          <h2>Rules</h2>
          <p>Keep shared rulings and table procedures easy to find.</p>
        </Link>
        <Link className="content-card" to="/players">
          <h2>Players</h2>
          <p>Resources for characters, table expectations, and getting ready to play.</p>
        </Link>
        <Link className="content-card" to="/gm">
          <h2>Game Masters</h2>
          <p>Tools, notes, and guidance for running sessions across the multiverse.</p>
        </Link>
      </section>
    </div>
  )
}

export default Home
