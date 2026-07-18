import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-bottom">
        <p><span>&copy; {new Date().getFullYear()} Multiverse Adventurers Guild.</span>{' '}<span className="footer-rights">All rights reserved.</span></p>
      </div>
    </footer>
  )
}

export default Footer
