import './pages.css'
import './Support.css'

function Support() {
  return (
    <div className="page support-page">
      <section className="support-header">
        <h1>Support the Guild</h1>
        <p>Help us continue creating amazing content for our community</p>
      </section>

      <section className="support-grid">
        <div className="support-card">
          <div className="support-icon">🗳️</div>
          <h2>Vote for Us</h2>
          <p>Help us climb the rankings on comic voting sites. Your votes keep us in the spotlight!</p>
          <a href="#" className="support-button">Vote Now</a>
        </div>

        <div className="support-card">
          <div className="support-icon">❤️</div>
          <h2>Donate</h2>
          <p>Support our creators directly and help fund future episodes and special projects.</p>
          <a href="#" className="support-button">Make a Donation</a>
        </div>

        <div className="support-card">
          <div className="support-icon">🛍️</div>
          <h2>Shop</h2>
          <p>Purchase exclusive merchandise and help support the Guild while you're at it!</p>
          <a href="/shop" className="support-button">Visit Shop</a>
        </div>

        <div className="support-card">
          <div className="support-icon">👥</div>
          <h2>Become a Patron</h2>
          <p>Join our patron community and get exclusive perks, early access, and special content.</p>
          <a href="#" className="support-button">Learn More</a>
        </div>
      </section>

      <section className="support-info">
        <h2>Why Support Us?</h2>
        <div className="info-grid">
          <div className="info-card">
            <h3>Quality Content</h3>
            <p>Your support enables us to maintain high quality art and storytelling standards.</p>
          </div>
          <div className="info-card">
            <h3>Regular Updates</h3>
            <p>Consistent funding means more frequent episode releases and special features.</p>
          </div>
          <div className="info-card">
            <h3>Community Growth</h3>
            <p>Together we build an amazing community of adventurers and creators.</p>
          </div>
          <div className="info-card">
            <h3>Creative Freedom</h3>
            <p>Your support allows us to tell the stories we're passionate about.</p>
          </div>
        </div>
      </section>

      <section className="voting-sites">
        <h2>Vote on Comic Sites</h2>
        <p>Help us reach new readers by voting on these popular comic ranking sites:</p>
        <div className="voting-links">
          <a href="#" className="vote-link">Comic Top Sites</a>
          <a href="#" className="vote-link">Webtoon Rankings</a>
          <a href="#" className="vote-link">Comic Directory</a>
          <a href="#" className="vote-link">Creator Network</a>
        </div>
      </section>

      <section className="gratitude">
        <h2>Thank You!</h2>
        <p>Whether you vote, donate, shop, or simply share our work with others, we appreciate your support!</p>
        <p>You are the heart and soul of the Multiverse Adventurers Guild.</p>
      </section>
    </div>
  )
}

export default Support
