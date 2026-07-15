function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function GuidePage({ title, intro, sections }) {
  return (
    <div className="page guide-page">
      <header className="guide-header">
        <h1>{title}</h1>
        <p>{intro}</p>
      </header>

      <nav className="guide-subnav" aria-label={`${title} sections`}>
        {sections.map((section) => (
          <a key={section.title} href={`#${slugify(section.title)}`}>
            {section.title}
          </a>
        ))}
      </nav>

      <div className="guide-sections">
        {sections.map((section) => (
          <section
            key={section.title}
            id={slugify(section.title)}
            className="basic-section guide-section"
          >
            <h2>{section.title}</h2>
            <p>{section.body}</p>
          </section>
        ))}
      </div>
    </div>
  )
}

export default GuidePage
