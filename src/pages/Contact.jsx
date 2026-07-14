import { useState } from 'react'
import './pages.css'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Thank you for your message! We will get back to you soon.')
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <div className="page contact-page">
      <h1>Contact Us</h1>
      <p>Have questions or want to join the guild? Get in touch!</p>

      <div className="contact-container">
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit" className="submit-button">Send Message</button>
        </form>

        <div className="contact-info">
          <h2>Other Ways to Reach Us</h2>
          <p>
            Email: <a href="mailto:multiverseadventurersguild@gmail.com">multiverseadventurersguild@gmail.com</a>
          </p>
          <p>Discord: Join our Discord server for instant communication</p>
          <p>Replace with your actual contact information from your Wix site.</p>
        </div>
      </div>
    </div>
  )
}

export default Contact
