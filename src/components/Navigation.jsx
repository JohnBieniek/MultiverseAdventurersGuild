import { Link } from 'react-router-dom'
import { useLayoutEffect, useRef } from 'react'
import './Navigation.css'

function Navigation() {
  const navRef = useRef(null)

  useLayoutEffect(() => {
    const nav = navRef.current

    if (!nav) {
      return undefined
    }

    const updateNavHeight = () => {
      document.documentElement.style.setProperty('--site-nav-height', `${nav.offsetHeight}px`)
    }

    updateNavHeight()

    const observer = new ResizeObserver(updateNavHeight)
    observer.observe(nav)
    window.addEventListener('resize', updateNavHeight)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', updateNavHeight)
    }
  }, [])

  return (
    <nav ref={navRef} className="navbar">
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
            <Link to="/rules" className="nav-link">Rules</Link>
          </li>
          <li className="nav-item">
            <Link to="/players" className="nav-link">Players</Link>
          </li>
          <li className="nav-item">
            <Link to="/gm" className="nav-link">Game Masters</Link>
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
