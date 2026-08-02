import { Link } from 'react-router-dom'
import './Footer.css'
import appVersion from '../data/appVersion.js'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-bottom">
        <div className="footer-line">
          <Link className="footer-contact-link" to="/contact">Contact Us</Link>
          <p><span>&copy; {new Date().getFullYear()} Multiverse Adventurers Guild.</span>{' '}<span className="footer-rights">All rights reserved.</span></p>
          <span className="footer-version">{appVersion}</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
