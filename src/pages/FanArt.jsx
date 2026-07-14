import './pages.css'
import './FanArt.css'

function FanArt() {
  const fanArtworks = [
    { id: 1, title: 'Epic Battle', artist: 'Artist One', medium: 'Digital' },
    { id: 2, title: 'Character Portrait', artist: 'Artist Two', medium: 'Watercolor' },
    { id: 3, title: 'Landscape Adventure', artist: 'Artist Three', medium: 'Acrylic' },
    { id: 4, title: 'Guild Hall', artist: 'Artist Four', medium: 'Digital' },
    { id: 5, title: 'Magic Spell', artist: 'Artist Five', medium: 'Pencil' },
    { id: 6, title: 'Party of Heroes', artist: 'Artist Six', medium: 'Mixed Media' },
  ]

  return (
    <div className="page fanart-page">
      <section className="fanart-header">
        <h1>Fan Art Gallery</h1>
        <p>Celebrate the creativity of our amazing community</p>
      </section>

      <section className="submission-section">
        <h2>Submit Your Fan Art</h2>
        <p>Have you created amazing artwork inspired by the Multiverse Adventurers Guild?</p>
        <button className="submit-button">Submit Your Creation</button>
      </section>

      <section className="gallery-grid">
        {fanArtworks.map(artwork => (
          <div key={artwork.id} className="art-card">
            <div className="art-image">🎨</div>
            <h3>{artwork.title}</h3>
            <p className="artist">By {artwork.artist}</p>
            <p className="medium">{artwork.medium}</p>
            <button className="view-button">View Full Size</button>
          </div>
        ))}
      </section>

      <section className="gallery-footer">
        <h2>Share Your Talent</h2>
        <p>We love celebrating our community's creativity! Submit your fan art, fan fiction, music, cosplay, and more.</p>
        <p>Contact us at fanart@multiverseadventurersguild.com</p>
      </section>
    </div>
  )
}

export default FanArt
