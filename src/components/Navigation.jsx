import { Link } from 'react-router-dom'
import { useLayoutEffect, useRef } from 'react'
import CommandInterface from './CommandInterface'
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

    const updateNavLayout = () => {
      const container = nav.querySelector('.nav-container')
      const logo = nav.querySelector('.nav-logo')
      const menu = nav.querySelector('.nav-menu')
      const command = nav.querySelector('.command-trigger')

      if (!container || !logo || !menu || !command || window.innerWidth <= 768) {
        nav.classList.remove('nav-stacked')
        updateNavHeight()
        return
      }

      const containerStyle = window.getComputedStyle(container)
      const menuStyle = window.getComputedStyle(menu)
      const items = [...menu.children]
      const menuGap = Number.parseFloat(menuStyle.columnGap) || 0
      const gridGap = Number.parseFloat(containerStyle.columnGap) || 0
      const horizontalPadding =
        (Number.parseFloat(containerStyle.paddingLeft) || 0) +
        (Number.parseFloat(containerStyle.paddingRight) || 0)
      const menuWidth = items.reduce((width, item) => width + item.getBoundingClientRect().width, 0) +
        Math.max(0, items.length - 1) * menuGap
      const requiredWidth = horizontalPadding + logo.scrollWidth + menuWidth +
        command.getBoundingClientRect().width + gridGap * 2

      nav.classList.toggle('nav-stacked', nav.clientWidth < Math.ceil(requiredWidth) + 8)
      updateNavHeight()
    }

    updateNavLayout()

    const observer = new ResizeObserver(updateNavLayout)
    observer.observe(nav)
    window.addEventListener('resize', updateNavLayout)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', updateNavLayout)
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
            <Link to="/gm" className="nav-link"><span className="gm-label-full">Game Masters</span><span className="gm-label-mobile">GMs</span></Link>
          </li>
          <li className="nav-item">
            <Link to="/character-sheet" className="nav-link">Characters</Link>
          </li>
        </ul>
        <CommandInterface />
      </div>
    </nav>
  )
}

export default Navigation
