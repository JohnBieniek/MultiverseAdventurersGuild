import './pages.css'
import './Blog.css'

function Blog() {
  const posts = [
    {
      id: 1,
      title: 'Episode 5 Released!',
      date: 'July 14, 2024',
      excerpt: 'The Orc Raid episode is now live! Check out the epic battle scene we\'ve been working on.',
      category: 'Release',
    },
    {
      id: 2,
      title: 'Meet the Creative Team',
      date: 'July 7, 2024',
      excerpt: 'Learn about the talented artists and writers behind the Multiverse Adventurers Guild.',
      category: 'Community',
    },
    {
      id: 3,
      title: 'Fan Art Spotlight',
      date: 'June 30, 2024',
      excerpt: 'We\'re featuring amazing artwork from our community members this month!',
      category: 'Features',
    },
    {
      id: 4,
      title: 'Upcoming Events',
      date: 'June 23, 2024',
      excerpt: 'Join us for virtual panel discussions, character creation workshops, and more!',
      category: 'Events',
    },
    {
      id: 5,
      title: 'Behind the Scenes: Writing Process',
      date: 'June 16, 2024',
      excerpt: 'An inside look at how we develop story arcs and character development.',
      category: 'Behind the Scenes',
    },
    {
      id: 6,
      title: 'New Merchandise Available',
      date: 'June 9, 2024',
      excerpt: 'Check out our new character art prints and limited edition enamel pins!',
      category: 'Shop',
    },
  ]

  return (
    <div className="page blog-page">
      <section className="blog-header">
        <h1>Guild Chronicles</h1>
        <p>News, updates, and stories from the Multiverse Adventurers Guild</p>
      </section>

      <section className="blog-posts">
        {posts.map(post => (
          <article key={post.id} className="blog-card">
            <div className="blog-header-card">
              <h2>{post.title}</h2>
              <p className="blog-meta">{post.date} • {post.category}</p>
            </div>
            <p className="blog-excerpt">{post.excerpt}</p>
            <button className="read-more">Read Full Post</button>
          </article>
        ))}
      </section>

      <section className="blog-footer">
        <h2>Stay Updated</h2>
        <p>Subscribe to our newsletter for the latest news and exclusive updates!</p>
        <div className="subscribe-form">
          <input type="email" placeholder="Enter your email address" />
          <button className="subscribe-btn">Subscribe</button>
        </div>
      </section>
    </div>
  )
}

export default Blog
