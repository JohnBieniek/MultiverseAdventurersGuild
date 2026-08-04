import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'
import appVersion from '../data/appVersion.js'

function Footer() {
  const [showMobileVersion, setShowMobileVersion] = useState(false)
  const holdTimer = useRef(null)
  const hideTimer = useRef(null)
  const cancelHold = () => clearTimeout(holdTimer.current)
  const startHold = () => {
    cancelHold()
    clearTimeout(hideTimer.current)
    holdTimer.current = setTimeout(() => {
      setShowMobileVersion(true)
      hideTimer.current = setTimeout(() => setShowMobileVersion(false), 2500)
    }, 600)
  }
  useEffect(() => () => {
    clearTimeout(holdTimer.current)
    clearTimeout(hideTimer.current)
  }, [])

  return (
    <footer className="footer">
      <div className="footer-bottom">
        <div className="footer-line">
          <Link className="footer-contact-link" to="/contact">Contact Us</Link>
          <p className="footer-copyright" onPointerDown={startHold} onPointerUp={cancelHold} onPointerCancel={cancelHold} onPointerLeave={cancelHold} onContextMenu={event => event.preventDefault()}><span>&copy; {new Date().getFullYear()} Multiverse Adventurers Guild.</span>{' '}<span className="footer-rights">All rights reserved.</span></p>
          <span className={`footer-version${showMobileVersion ? ' is-mobile-revealed' : ''}`}>{appVersion}</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
