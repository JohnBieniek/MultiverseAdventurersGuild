import './pages.css'

function About() {
  return (
    <div className="page about-page">
      <h1>About the Multiverse Adventurers Guild</h1>
      
      <section className="about-section">
        <h2>Our Mission</h2>
        <p>
          Replace this with your guild's mission statement and values from your Wix site.
        </p>
      </section>

      <section className="about-section">
        <h2>Our History</h2>
        <p>
          Add your guild's history, founding story, and how it evolved over time.
        </p>
      </section>

      <section className="about-section">
        <h2>Meet the Team</h2>
        <div className="team-grid">
          <div className="team-member">
            <h3>Team Member Name</h3>
            <p>Role / Position</p>
          </div>
          <div className="team-member">
            <h3>Team Member Name</h3>
            <p>Role / Position</p>
          </div>
          <div className="team-member">
            <h3>Team Member Name</h3>
            <p>Role / Position</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
