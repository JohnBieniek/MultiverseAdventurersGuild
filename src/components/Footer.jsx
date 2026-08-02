import { useState } from 'react'
import './Footer.css'
import appVersion from '../data/appVersion.js'

const contactEmail = 'multiverseadventurersguild@gmail.com'

function Footer() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const update = event => setFormData(current => ({ ...current, [event.target.name]: event.target.value }))
  const submit = event => {
    event.preventDefault()
    const subject = `Message from ${formData.name}`
    const body = [formData.message, '', `From: ${formData.name}`, `Reply to: ${formData.email}`].join('\n')
    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <footer className="footer" id="contact">
      <div className="footer-contact">
        <div className="footer-contact-intro">
          <span className="footer-eyebrow">CONTACT</span>
          <h2>Send a message to the Guild</h2>
          <p>Questions, feedback, and reports from across the multiverse are welcome.</p>
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
        </div>
        <form className="footer-contact-form" onSubmit={submit}>
          <label><span>Name</span><input type="text" name="name" autoComplete="name" value={formData.name} onChange={update} required/></label>
          <label><span>Email</span><input type="email" name="email" autoComplete="email" value={formData.email} onChange={update} required/></label>
          <label className="footer-message"><span>Message</span><textarea name="message" rows="3" value={formData.message} onChange={update} required/></label>
          <button type="submit">Send Message</button>
        </form>
      </div>
      <div className="footer-bottom">
        <div className="footer-line">
          <p><span>&copy; {new Date().getFullYear()} Multiverse Adventurers Guild.</span>{' '}<span className="footer-rights">All rights reserved.</span></p>
          <span className="footer-version">{appVersion}</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
