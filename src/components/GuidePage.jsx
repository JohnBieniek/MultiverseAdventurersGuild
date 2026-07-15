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
        {sections.map((section, index) => {
          const previous = sections[index - 1]
          const next = sections[index + 1]

          return (
            <section
              key={section.title}
              id={slugify(section.title)}
              className="basic-section guide-section"
            >
              <h2>{section.title}</h2>
              <p>{section.body}</p>

              <div className="section-pager" aria-label={`${section.title} navigation`}>
                {previous ? (
                  <a className="section-page-link previous" href={`#${slugify(previous.title)}`}>
                    <span aria-hidden="true">←</span>
                    <span>{previous.title}</span>
                  </a>
                ) : (
                  <span className="section-page-link placeholder" />
                )}

                {next ? (
                  <a className="section-page-link next" href={`#${slugify(next.title)}`}>
                    <span>{next.title}</span>
                    <span aria-hidden="true">→</span>
                  </a>
                ) : (
                  <span className="section-page-link placeholder" />
                )}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}

export default GuidePage
