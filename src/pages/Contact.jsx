import { useState } from 'react'
import './pages.css'

const contactEmail = 'multiverseadventurersguild@gmail.com'

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const handleChange = event => setFormData(current => ({ ...current, [event.target.name]: event.target.value }))
  const handleSubmit = event => {
    event.preventDefault()
    const subject = `Message from ${formData.name}`
    const body = [formData.message, '', `From: ${formData.name}`, `Reply to: ${formData.email}`].join('\n')
    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return <div className="page contact-page">
    <header className="contact-header"><span>CONTACT</span><h1>Contact Us</h1><p>Questions, feedback, and reports from across the multiverse are welcome.</p></header>
    <div className="contact-container">
      <form className="contact-form" onSubmit={handleSubmit}>
        <label className="form-group" htmlFor="contact-name"><span>Name</span><input type="text" id="contact-name" name="name" autoComplete="name" value={formData.name} onChange={handleChange} required/></label>
        <label className="form-group" htmlFor="contact-email"><span>Email</span><input type="email" id="contact-email" name="email" autoComplete="email" value={formData.email} onChange={handleChange} required/></label>
        <label className="form-group contact-message" htmlFor="contact-message"><span>Message</span><textarea id="contact-message" name="message" rows="6" value={formData.message} onChange={handleChange} required/></label>
        <button type="submit" className="submit-button">Send Message</button>
      </form>
      <aside className="contact-info"><h2>Reach us directly</h2><p>If you prefer, open your email app and write to us directly.</p><a href={`mailto:${contactEmail}`}>{contactEmail}</a></aside>
    </div>
  </div>
}

export default Contact
