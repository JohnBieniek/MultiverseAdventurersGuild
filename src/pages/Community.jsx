import './pages.css'

function Community() {
  return (
    <div className="page community-page">
      <h1>Community</h1>
      
      <section className="community-section">
        <h2>Join Our Community</h2>
        <p>Connect with fellow adventurers and share your stories.</p>
        <div className="community-links">
          <a href="#" className="community-link">Discord Server</a>
          <a href="#" className="community-link">Forum</a>
          <a href="#" className="community-link">Social Media</a>
        </div>
      </section>

      <section className="community-section">
        <h2>Community Guidelines</h2>
        <p>Replace with your community rules and code of conduct from your Wix site.</p>
      </section>

      <section className="community-section">
        <h2>Events & Meetups</h2>
        <p>Add your scheduled events, campaigns, and community gatherings here.</p>
      </section>
    </div>
  )
}

export default Community
