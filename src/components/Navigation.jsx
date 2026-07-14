import { Link } from 'react-router-dom'
import './Navigation.css'

function Navigation() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <img
            src="/multiverse%20adventurers%20guild%20icon.png"
            alt=""
            className="nav-logo-icon"
          />
          <span>Multiverse Adventurers Guild</span>
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link">About</Link>
          </li>
          <li className="nav-item">
            <Link to="/character-creation" className="nav-link">Character Creation</Link>
          </li>
          <li className="nav-item">
            <Link to="/adventures" className="nav-link">Adventures</Link>
          </li>
          <li className="nav-item">
            <Link to="/community" className="nav-link">Community</Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link">Contact</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navigation
