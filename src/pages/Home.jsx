import './pages.css'

function Home() {
  return (
    <div className="page home-page">
      <section className="hero">
        <h1>Welcome to the Multiverse Adventurers Guild</h1>
        <p>A home base for game masters, players, table rules, and guild contact details.</p>
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

      <section className="latest-news">
        <h2>Guild Updates</h2>
        <p>Use this space for announcements, schedule notes, and important changes.</p>
      </section>
    </div>
  )
}

export default Home
