import './pages.css'

function Home() {
  return (
    <div className="page home-page">
      <section className="hero">
        <h1>Welcome to the Multiverse Adventurers Guild</h1>
        <p>Join adventurers from across infinite worlds in epic quests and legendary tales</p>
        <button className="cta-button">Join Our Guild</button>
      </section>

      <section className="featured-content">
        <div className="content-card">
          <h2>🗺️ Explore Adventures</h2>
          <p>Discover epic campaigns spanning multiple universes and dimensions.</p>
        </div>
        <div className="content-card">
          <h2>👥 Connect With Others</h2>
          <p>Meet fellow adventurers and build lasting friendships across the multiverse.</p>
        </div>
        <div className="content-card">
          <h2>📖 Share Stories</h2>
          <p>Chronicle your adventures and inspire others with your legendary tales.</p>
        </div>
      </section>

      <section className="latest-news">
        <h2>Latest Updates</h2>
        <p>Replace this with your latest news, events, and announcements from your Wix site.</p>
      </section>
    </div>
  )
}

export default Home
