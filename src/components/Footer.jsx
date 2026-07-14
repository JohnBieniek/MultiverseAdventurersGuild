import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Multiverse Adventurers Guild</h3>
          <p>Bringing together adventurers from across the multiverse</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="mailto:multiverseadventurersguild@gmail.com">Contact Us</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Multiverse Adventurers Guild. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
