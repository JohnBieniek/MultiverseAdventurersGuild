function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function normalizeReferenceName(name) {
  return name
    .replace(/\([^)]*\)/g, '')
    .replace(/\.$/, '')
    .trim()
}

function cardAnchor(type, name) {
  return `${type}-${slugify(name)}`
}

const fieldLabels = [
  'Strengths',
  'Strength',
  'Weaknesses',
  'Weakness',
  'Talents',
  'Preferred talents',
  'Preferred Talents',
  'Common Archetypes',
  'Common archetypes',
  'Personality',
  'Rep',
  'The real deal',
  'Real Deal',
  'Description',
  'Mechanic',
  'Mechanics',
  'Scores',
  'Example Name',
  'Expertise'
]

const speciesNames = [
  'Cyborg',
  'Dwarf',
  'Elves',
  'Fairy',
  'Gnomes',
  'Giants',
  'Halfling',
  'Human',
  'Orc',
  'Sentient AI (SAI)'
]

const referenceAliases = {
  archetype: {
    merc: 'mercenary'
  }
}

const statNames = ['strength', 'dexterity', 'endurance', 'intuition', 'education', 'charisma']

const skillNames = [
  'attack',
  'athletics',
  'influence',
  'knowledge',
  'observation',
  'outdoors',
  'sneak',
  'technology',
  'vehicle'
]

const statSkillAliases = {
  str: 'strength',
  dex: 'dexterity',
  end: 'endurance',
  int: 'intuition',
  edu: 'education',
  cha: 'charisma',
  stealth: 'sneak',
  athletic: 'athletics',
  tech: 'technology',
  'melee attack': 'attack',
  'ranged attack': 'attack',
  'range attack': 'attack',
  'melee weapon': 'attack',
  'ranged weapon': 'attack',
  'range weapon': 'attack',
  'any weapon': 'attack',
  'improvised weapon': 'attack'
}

function statSkillAnchor(type, name) {
  return `${type}-${slugify(name)}`
}

function getStatSkillTarget(name) {
  const normalizedName = normalizeReferenceName(name).toLowerCase()
  const lookupName = statSkillAliases[normalizedName] || normalizedName

  if (statNames.includes(lookupName)) {
    return `#${statSkillAnchor('stat', lookupName)}`
  }

  if (skillNames.includes(lookupName)) {
    return `#${statSkillAnchor('skill', lookupName)}`
  }

  return null
}

function getLines(content) {
  return content
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((line) => line.trim())
}

function isFieldLabel(label) {
  return fieldLabels.some((field) => field.toLowerCase() === label.toLowerCase())
}

function splitTitleLine(line) {
  const match = line.match(/^(.{2,45}?)(?:\s*-\s*|:\s+)(.+)$/)

  if (!match) {
    return null
  }

  const name = match[1].trim().replace(/:$/, '')

  if (isFieldLabel(name)) {
    return null
  }

  return {
    name,
    description: match[2].trim()
  }
}

function nextNonEmptyLine(lines, index) {
  for (let i = index + 1; i < lines.length; i += 1) {
    if (lines[i]) {
      return lines[i]
    }
  }

  return ''
}

function isSpeciesStart(line) {
  const title = splitTitleLine(line)
  return Boolean(title && speciesNames.includes(title.name))
}

function isArchetypeStart(lines, index) {
  if (!splitTitleLine(lines[index])) {
    return false
  }

  return /^Scores:?$/i.test(nextNonEmptyLine(lines, index))
}

function isTalentStart(lines, index) {
  const line = lines[index]
  const title = line.replace(/:$/, '')

  if (
    !line ||
    title.length > 48 ||
    isFieldLabel(title) ||
    (line.includes(':') && !line.endsWith(':'))
  ) {
    return false
  }

  const next = nextNonEmptyLine(lines, index)
  return /^(Description|Mechanic|Mechanics)\s*[:-]/i.test(next)
}

function isContactStart(lines, index) {
  return Boolean(
    splitTitleLine(lines[index]) &&
      lines.slice(index + 1, index + 4).some((line) => /^Example Name:/i.test(line))
  )
}

function isReputationStart(lines, index) {
  return Boolean(
    splitTitleLine(lines[index]) &&
      lines.slice(index + 1, index + 4).some((line) => /^Example Name:/i.test(line))
  )
}

function splitCards(content, type) {
  const lines = getLines(content)
  const intro = []
  const cards = []
  let activeCard = null

  lines.forEach((line, index) => {
    const startsCard =
      (type === 'species' && isSpeciesStart(line)) ||
      (type === 'archetype' && isArchetypeStart(lines, index)) ||
      (type === 'talent' && isTalentStart(lines, index)) ||
      (type === 'contact' && isContactStart(lines, index)) ||
      (type === 'reputation' && isReputationStart(lines, index))

    if (startsCard) {
      if (activeCard) {
        cards.push(activeCard)
      }

      if (type === 'talent') {
        activeCard = {
          name: line.replace(/:$/, ''),
          description: '',
          lines: []
        }
      } else {
        const title = splitTitleLine(line)
        activeCard = {
          name: title.name,
          description: title.description,
          lines: []
        }
      }

      return
    }

    if (activeCard) {
      activeCard.lines.push(line)
    } else if (line) {
      intro.push(line)
    }
  })

  if (activeCard) {
    cards.push(activeCard)
  }

  return { intro, cards }
}

function renderInlineText(text) {
  const labelMatch = text.match(/^([A-Za-z][A-Za-z ]{1,28}(?:\s+\([^)]*\))?)(?::|\s+-)\s*(.+)$/)

  if (labelMatch) {
    return (
      <>
        <strong>{labelMatch[1]}:</strong> {labelMatch[2]}
      </>
    )
  }

  return text
}

function getTextBlockAnchor(sectionTitle, line) {
  const section = sectionTitle.toLowerCase()
  const match = line.match(/^([A-Za-z]+)(?:\s+\([^)]*\))?(?::|\s+-)/)

  if (!match) {
    return null
  }

  const name = match[1].toLowerCase()

  if (section === 'stats' && statNames.includes(name)) {
    return statSkillAnchor('stat', name)
  }

  if (section === 'skills' && skillNames.includes(name)) {
    return statSkillAnchor('skill', name)
  }

  return null
}

function renderTextBlocks(content, sectionTitle) {
  const lines = getLines(content).filter(Boolean)

  return (
    <div className="guide-text-blocks">
      {lines.map((line, index) => {
        const next = lines[index + 1] || ''
        const isSubhead =
          line.length < 48 &&
          !line.endsWith('.') &&
          !line.includes(',') &&
          !/^[-+]?[\d(]/.test(line) &&
          !/^Description|Mechanic/i.test(line) &&
          next.length > 0

        if (isSubhead) {
          return (
            <h3 key={`${line}-${index}`} className="guide-inline-heading">
              {line}
            </h3>
          )
        }

        const anchor = getTextBlockAnchor(sectionTitle, line)

        return (
          <p
            key={`${line}-${index}`}
            id={anchor || undefined}
            className={anchor ? 'guide-linked-entry' : undefined}
          >
            {renderInlineText(line)}
          </p>
        )
      })}
    </div>
  )
}

function renderChip(label, item, cardIndex) {
  const isStatSkillField = /strength|weakness/i.test(label)

  if (isStatSkillField) {
    const statSkillHref = getStatSkillTarget(item)

    if (statSkillHref) {
      return (
        <a key={item} href={statSkillHref}>
          {item}
        </a>
      )
    }
  }

  const targetType = /archetype/i.test(label) ? 'archetype' : 'talent'
  const normalizedName = normalizeReferenceName(item)
  const lookupName =
    referenceAliases[targetType]?.[normalizedName.toLowerCase()] || normalizedName.toLowerCase()
  const href = cardIndex.get(`${targetType}:${lookupName}`)

  if (href) {
    return (
      <a key={item} href={href}>
        {item}
      </a>
    )
  }

  return <span key={item}>{item}</span>
}

function renderCardField(line, index, cardIndex) {
  if (!line) {
    return null
  }

  const field = line.match(/^([A-Za-z][A-Za-z ]{1,28})(?::|\s+-)\s*(.*)$/)

  if (field && isFieldLabel(field[1])) {
    const label = field[1]
    const value = field[2]
    const isChipField = /strength|weakness|talent|archetype/i.test(label)
    const isReferenceField = /strength|weakness|talent|archetype/i.test(label)

    return (
      <div key={`${line}-${index}`} className="guide-card-field">
        <strong>{label}</strong>
        {value && isChipField ? (
          <div className="guide-chip-list">
            {value
              .split(',')
              .map((item) => item.trim())
              .filter(Boolean)
              .map((item) => (
                isReferenceField ? renderChip(label, item, cardIndex) : <span key={item}>{item}</span>
              ))}
          </div>
        ) : (
          value && <p>{value}</p>
        )}
      </div>
    )
  }

  return <p key={`${line}-${index}`}>{renderInlineText(line)}</p>
}

function renderCards(content, type, cardIndex) {
  const { intro, cards } = splitCards(content, type)

  return (
    <div className={`guide-card-layout guide-card-layout-${type}`}>
      <aside className="guide-item-sidebar" aria-label={`${type} list`}>
        <h3>{type === 'archetype' ? 'Archetypes' : `${type.charAt(0).toUpperCase()}${type.slice(1)}s`}</h3>
        <nav>
          {cards.map((card) => (
            <a key={card.name} href={`#${cardAnchor(type, card.name)}`}>
              {card.name}
            </a>
          ))}
        </nav>
      </aside>

      <div className="guide-card-main">
        {intro.length > 0 && (
          <div className="guide-card-intro">
            {intro.map((line, index) => (
              <p key={`${line}-${index}`}>{renderInlineText(line)}</p>
            ))}
          </div>
        )}

        <div className="guide-card-grid">
          {cards.map((card) => (
            <article
              key={card.name}
              id={cardAnchor(type, card.name)}
              className="guide-info-card"
            >
              <h3>{card.name}</h3>
              {card.description && <p className="guide-card-summary">{card.description}</p>}
              <div className="guide-card-body">
                {card.lines.map((line, index) => renderCardField(line, index, cardIndex))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

function buildCardIndex(sections) {
  const cardIndex = new Map()

  sections.forEach((section) => {
    if (!section.content || !section.cardType) {
      return
    }

    const { cards } = splitCards(section.content, section.cardType)

    cards.forEach((card) => {
      const fullName = card.name.replace(/\.$/, '').trim().toLowerCase()
      const normalizedName = normalizeReferenceName(card.name).toLowerCase()
      const href = `#${cardAnchor(section.cardType, card.name)}`

      cardIndex.set(`${section.cardType}:${fullName}`, href)

      if (!cardIndex.has(`${section.cardType}:${normalizedName}`)) {
        cardIndex.set(`${section.cardType}:${normalizedName}`, href)
      }
    })
  })

  return cardIndex
}

function renderSectionContent(section, cardIndex) {
  return (
    <>
      {section.content ? (
        section.cardType ? (
          renderCards(section.content, section.cardType, cardIndex)
        ) : (
          renderTextBlocks(section.content, section.title)
        )
      ) : (
        <p>{section.body}</p>
      )}

      {section.image && (
        <div className="guide-media">
          <img src={section.image.src} alt={section.image.alt} />
        </div>
      )}

      {section.download && (
        <a
          className="guide-download-button"
          href={section.download.href}
          download={section.download.filename}
        >
          {section.download.label}
        </a>
      )}
    </>
  )
}

function GuidePage({ title, intro, sections }) {
  const cardIndex = buildCardIndex(sections)

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
            {renderSectionContent(section, cardIndex)}
          </section>
        ))}
      </div>
    </div>
  )
}

export default GuidePage
