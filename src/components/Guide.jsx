import { useLayoutEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

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
  'Minor Version',
  'Major Version',
  'Mass Version',
  'Range',
  'Action',
  'Out of Combat',
  'Targets',
  'Self-Only',
  'Scores',
  'Category',
  'Example Name',
  'Expertise'
]

const speciesNames = [
  'Cyborg',
  'Dwarf',
  'Elf',
  'Fairy',
  'Gnome',
  'Giant',
  'Halfling',
  'Human',
  'Orc',
  'SAI (Sentient AI)'
]

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

const guideSectionLinks = {
  concept: '#archetypes',
  'dice decide uncertain outcomes': '/gm#rolls',
  gear: '#equipment',
  'player contacts': '/players#contacts',
  reputation: '#reputation',
  skills: '#skills',
  stats: '#stats',
  talents: '#talents'
}

const standaloneLineLinks = {
  'Braced.': '#weapon-braced',
  'Reputation in the world': '#reputation'
}

const forcedInlineSubheads = new Set([
  'how to navigate the rules'
])

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
  'improvised weapon': 'attack'
}

const weaponReferenceTargets = {
  'any melee weapon': '#weapons',
  'any weapon': '#weapons',
  'melee': '#weapons',
  'melee weapon': '#weapons',
  'range weapon': '#weapons',
  'ranged weapon': '#weapons'
}

const cardTypeLabels = {
  archetype: 'Archetypes',
  contact: 'Contacts',
  reputation: 'Reputations',
  species: 'Species',
  talent: 'Talents',
  weapon: 'Weapons'
}

function statSkillAnchor(type, name) {
  return `${type}-${slugify(name)}`
}

function getStatSkillTarget(name) {
  const normalizedName = normalizeReferenceName(name).toLowerCase()
  const weaponHref = weaponReferenceTargets[normalizedName]

  if (weaponHref) {
    return weaponHref
  }

  const lookupName = statSkillAliases[normalizedName] || normalizedName

  if (statNames.includes(lookupName)) {
    return `#${statSkillAnchor('stat', lookupName)}`
  }

  if (skillNames.includes(lookupName)) {
    return `#${statSkillAnchor('skill', lookupName)}`
  }

  return null
}

function splitListItems(value) {
  const items = []
  let current = ''
  let depth = 0

  for (const char of value) {
    if (char === '(') {
      depth += 1
    } else if (char === ')' && depth > 0) {
      depth -= 1
    }

    if (char === ',' && depth === 0) {
      if (current.trim()) {
        items.push(current.trim())
      }
      current = ''
    } else {
      current += char
    }
  }

  if (current.trim()) {
    items.push(current.trim())
  }

  return items
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

function splitTitleLine(line, { allowFieldLabelName = false } = {}) {
  const match = line.match(/^(.{2,45}?)(?:\s+-\s+|:\s+)(.+)$/)

  if (!match) {
    return null
  }

  const name = match[1].trim().replace(/:$/, '')

  if (!allowFieldLabelName && isFieldLabel(name)) {
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

  return lines
    .slice(index + 1, index + 4)
    .some((line) => /^Scores\s*:/i.test(line))
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
  const line = lines[index]
  const nextLine = lines[index + 1] || ''

  return Boolean(
    /\s+-\s+/.test(line) &&
      splitTitleLine(line, { allowFieldLabelName: true }) &&
      /^Category:/i.test(nextLine) &&
      lines.slice(index + 2, index + 5).some((line) => /^Example Name:/i.test(line))
  )
}

function isReputationStart(lines, index) {
  return Boolean(
    splitTitleLine(lines[index]) &&
      lines.slice(index + 1, index + 4).some((line) => /^Expertise:/i.test(line))
  )
}

function isWeaponStart(lines, index) {
  const line = lines[index]

  return Boolean(
    /\s+-\s+/.test(line) &&
      splitTitleLine(line) &&
      lines.slice(index + 1, index + 5).some((line) => /^Category:/i.test(line))
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
      (type === 'reputation' && isReputationStart(lines, index)) ||
      (type === 'weapon' && isWeaponStart(lines, index))

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
        const title = splitTitleLine(line, { allowFieldLabelName: type === 'contact' })
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
  if (standaloneLineLinks[text]) {
    return <a href={standaloneLineLinks[text]}>{text}</a>
  }

  const labelMatch = text.match(/^([A-Za-z][A-Za-z '/-]{1,34}(?:\s+\([^)]*\))?)(?::|\s+-)\s*(.+)$/)

  if (labelMatch) {
    const label = labelMatch[1]
    const sectionHref = guideSectionLinks[label.toLowerCase()]
    const renderedLabel = sectionHref ? <a href={sectionHref}>{label}</a> : label

    return (
      <>
        <strong>{renderedLabel}:</strong> {labelMatch[2]}
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

  if (section === 'defenses' && ['defense', 'resilience', 'ego'].includes(name)) {
    return `defense-${name}`
  }

  return null
}

function isInlineSubhead(line, nextLine) {
  const normalizedLine = line.replace(/[.:\s]+$/, '').toLowerCase()

  if (forcedInlineSubheads.has(normalizedLine)) {
    return true
  }

  return (
    line.length < 48 &&
    !line.endsWith('.') &&
    !line.includes(',') &&
    !/^[-+*]\s/.test(line) &&
    !/^[-+]?[\d(]/.test(line) &&
    !/^Description|Mechanic/i.test(line) &&
    nextLine.length > 0
  )
}

function isFactionStatBlockStart(line) {
  return /^[A-Z]{2,4}\s+Force\s+\d+\s+/.test(line)
}

function isFactionSectionStart(lines, index) {
  return /^The\s+/.test(lines[index]) && /^Motto:/i.test(lines[index + 1] || '')
}

function parseForceEnergyCost(line) {
  const match = line.match(/^(Force\s+\d+\s+\(F\d+\)):\s+(\d+)\s+energy sustained,\s+(\d+)\s+energy as a one-shot\.$/i)

  if (!match) {
    return null
  }

  return {
    force: match[1],
    sustained: match[2],
    oneShot: match[3]
  }
}

function renderSectionMedia(section) {
  if (!section.image && !section.download) {
    return null
  }

  return (
    <>
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

function renderForceEnergyTable(rows, index) {
  return (
    <div key={`force-energy-costs-${index}`} className="guide-table-wrap">
      <table className="guide-table">
        <thead>
          <tr>
            <th>Force</th>
            <th>Sustained</th>
            <th>One-Shot</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.force}>
              <td>{row.force}</td>
              <td>{row.sustained} energy</td>
              <td>{row.oneShot} energy</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function renderFactionStatCard(name, lines, index) {
  return (
    <article key={`${name}-${index}`} className="guide-info-card guide-stat-card">
      <h3>{name}</h3>
      <div className="guide-card-body">
        {lines.map((line, lineIndex) => (
          <p key={`${line}-${lineIndex}`}>{renderInlineText(line)}</p>
        ))}
      </div>
    </article>
  )
}

function renderSkillCard(line, exampleLine, index, sectionTitle) {
  const name = line.match(/^([^(:]+)(?:\s*\([^)]+\))?:/)?.[1]?.trim() || 'Skill'
  const anchor = getTextBlockAnchor(sectionTitle, line)
  const items = exampleLine.replace(/^Example Items:\s*/i, '').split('|').map((item) => item.trim()).filter(Boolean)

  return (
    <article key={`${name}-${index}`} id={anchor || undefined} className="guide-skill-card">
      <p className="guide-skill-description">{renderInlineText(line)}</p>
      <div className="guide-skill-examples">
        <strong>Example items</strong>
        <div className="guide-skill-item-list">
          {items.map((item) => <span key={item}>{item}</span>)}
        </div>
      </div>
    </article>
  )
}

function renderTextBlocks(content, sectionTitle, section) {
  const lines = getLines(content).filter(Boolean)
  const elements = []

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index]

    const isSkillEntry = sectionTitle === 'Skills' && /^(?:Attack|Athletics|Influence|Knowledge|Observation|Outdoors|Sneak|Technology|Vehicle)\b.*:/.test(line)
    const isStatEntry = sectionTitle === 'Stats' && /^(?:Strength|Dexterity|Endurance|Intuition|Education|Charisma)\b.*:/.test(line)

    if ((isSkillEntry || isStatEntry) && /^Example Items:/i.test(lines[index + 1] || '')) {
      elements.push(renderSkillCard(line, lines[index + 1], index, sectionTitle))
      index += 1
      continue
    }

    if (sectionTitle === 'Factions' && isFactionStatBlockStart(line)) {
      const cardLines = []
      let cursor = index + 1

      while (
        cursor < lines.length &&
        !isFactionStatBlockStart(lines[cursor]) &&
        !isFactionSectionStart(lines, cursor)
      ) {
        cardLines.push(lines[cursor])
        cursor += 1
      }

      elements.push(renderFactionStatCard(line, cardLines, index))
      index = cursor - 1
      continue
    }

    if (line === '[character-sheet]') {
      elements.push(
        <div key={`${line}-${index}`} className="guide-inline-media">
          {renderSectionMedia(section)}
        </div>
      )
      continue
    }

    const next = lines[index + 1] || ''
    if (/^Force Energy Costs:?$/i.test(line)) {
      const tableRows = []
      let cursor = index + 1

      while (cursor < lines.length) {
        const row = parseForceEnergyCost(lines[cursor])

        if (!row) {
          break
        }

        tableRows.push(row)
        cursor += 1
      }

      elements.push(
        <h3 key={`${line}-${index}`} id={`${slugify(sectionTitle)}-${slugify(line.replace(/:$/, ''))}`} className="guide-inline-heading">
          {line.replace(/:$/, '')}
        </h3>
      )

      if (tableRows.length > 0) {
        elements.push(renderForceEnergyTable(tableRows, index))
        index = cursor - 1
        continue
      }
    }

    if (
      sectionTitle === 'History' &&
      line === 'The Guild' &&
      next === 'To map and preserve timelines in flux'
    ) {
      elements.push(
        <h3 key={`${line}-${index}`} className="guide-inline-heading">
          {line}
          <span className="guide-section-subtitle">{next}</span>
        </h3>
      )
      index += 1
      continue
    }

    if (isInlineSubhead(line, next)) {
      elements.push(
        <h3 key={`${line}-${index}`} id={`${slugify(sectionTitle)}-${slugify(line)}`} className="guide-inline-heading">
          {line}
        </h3>
      )
      continue
    }

    const anchor = getTextBlockAnchor(sectionTitle, line)

    elements.push(
      <p
        key={`${line}-${index}`}
        id={anchor || undefined}
        className={anchor ? 'guide-linked-entry' : undefined}
      >
        {renderInlineText(line)}
      </p>
    )
  }

  return <div className="guide-text-blocks">{elements}</div>
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
  const href = cardIndex.get(`${targetType}:${normalizedName.toLowerCase()}`)

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
    const isReferenceField = /strength|weakness|talent|archetype/i.test(label)

    return (
      <div key={`${line}-${index}`} className="guide-card-field">
        <strong>{label}</strong>
        {value && isReferenceField ? (
          <div className="guide-chip-list">
            {splitListItems(value).map((item) => renderChip(label, item, cardIndex))}
          </div>
        ) : (
          value && <p>{value}</p>
        )}
      </div>
    )
  }

  return <p key={`${line}-${index}`}>{renderInlineText(line)}</p>
}

function parseCardFields(lines) {
  return lines.reduce((fields, line) => {
    const field = line.match(/^([A-Za-z][A-Za-z ]{1,28})(?::|\s+-)\s*(.*)$/)

    if (field && isFieldLabel(field[1])) {
      fields.push({
        label: field[1],
        value: field[2]
      })
    } else if (line) {
      fields.push({
        label: '',
        value: line
      })
    }

    return fields
  }, [])
}

function splitSubcards(lines) {
  const bodyLines = []
  const subcards = []
  let activeSubcard = null

  lines.forEach((line) => {
    const subcardMatch = line.match(/^Buff Option:\s*(.+)$/i)

    if (subcardMatch) {
      if (activeSubcard) {
        subcards.push(activeSubcard)
      }

      activeSubcard = {
        name: subcardMatch[1].trim(),
        lines: []
      }
      return
    }

    if (activeSubcard) {
      activeSubcard.lines.push(line)
    } else {
      bodyLines.push(line)
    }
  })

  if (activeSubcard) {
    subcards.push(activeSubcard)
  }

  return { bodyLines, subcards }
}

function renderWeaponCard(card) {
  const fields = parseCardFields(card.lines)

  return (
    <article
      key={card.name}
      id={cardAnchor('weapon', card.name)}
      className="guide-info-card guide-weapon-card"
    >
      <h3>{card.name}</h3>
      {card.description && <p className="guide-card-summary">{card.description}</p>}

      {fields.length > 0 && (
        <div className="guide-weapon-details">
          {fields.map((field, index) => (
            field.label ? (
              <p key={`${field.label}-${index}`}>
                <strong>{field.label}:</strong> {renderInlineText(field.value)}
              </p>
            ) : (
              <p key={`${field.value}-${index}`}>{renderInlineText(field.value)}</p>
            )
          ))}
        </div>
      )}
    </article>
  )
}

function renderInfoCard(card, type, cardIndex) {
  const { bodyLines, subcards } = splitSubcards(card.lines)

  return (
    <article
      key={card.name}
      id={cardAnchor(type, card.name)}
      className="guide-info-card"
    >
      <h3>{card.name}</h3>
      {card.description && <p className="guide-card-summary">{card.description}</p>}
      <div className="guide-card-body">
        {bodyLines.map((line, index) => renderCardField(line, index, cardIndex))}
      </div>

      {subcards.length > 0 && (
        <div className="guide-subcard-grid">
          {subcards.map((subcard) => (
            <article
              key={subcard.name}
              id={cardAnchor(type, subcard.name)}
              className="guide-subcard"
            >
              <h4>{subcard.name}</h4>
              <div className="guide-card-body">
                {subcard.lines.map((line, index) => renderCardField(line, index, cardIndex))}
              </div>
            </article>
          ))}
        </div>
      )}
    </article>
  )
}

function getCardFieldValue(card, fieldName) {
  const fieldPrefix = new RegExp(`^${fieldName}:\\s*(.+)$`, 'i')
  const fieldLine = card.lines.find((line) => fieldPrefix.test(line))
  return fieldLine?.match(fieldPrefix)?.[1]?.trim() || ''
}

function buildCardElements(cards, type, cardIndex) {
  const elements = []
  let hasShownFightingStylesHeading = false

  cards.forEach((card) => {
    if (
      type === 'weapon' &&
      !hasShownFightingStylesHeading &&
      getCardFieldValue(card, 'Category').toLowerCase() === 'fighting style'
    ) {
      elements.push(
        <h3 key="weapon-fighting-styles-heading" className="guide-card-group-heading">
          Fighting Styles
        </h3>
      )
      hasShownFightingStylesHeading = true
    }

    elements.push(
      type === 'weapon' ? (
        renderWeaponCard(card)
      ) : (
        renderInfoCard(card, type, cardIndex)
      )
    )
  })

  return elements
}

function renderCards(content, type, cardIndex) {
  const { intro, cards } = splitCards(content, type)

  return (
    <div className={`guide-card-layout guide-card-layout-${type}`}>
      <aside className="guide-item-sidebar" aria-label={`${type} list`}>
        <h3>{cardTypeLabels[type] || `${type.charAt(0).toUpperCase()}${type.slice(1)}`}</h3>
        <nav>
          {cards.map((card) => {
            const subcards = splitSubcards(card.lines).subcards

            return (
              <div key={card.name} className="guide-sidebar-link-group">
                <a href={`#${cardAnchor(type, card.name)}`}>
                  {card.name}
                </a>
                {subcards.map((subcard) => (
                  <a
                    key={subcard.name}
                    className="guide-sidebar-subitem"
                    href={`#${cardAnchor(type, subcard.name)}`}
                  >
                    {subcard.name}
                  </a>
                ))}
              </div>
            )
          })}
        </nav>
      </aside>

      <div className="guide-card-main">
        {intro.length > 0 && (
          <div className="guide-card-intro">
            {intro.map((line, index) => (
              isInlineSubhead(line, intro[index + 1] || '') ? (
                <h3 key={`${line}-${index}`} className="guide-inline-heading">
                  {line}
                </h3>
              ) : (
                <p key={`${line}-${index}`}>{renderInlineText(line)}</p>
              )
            ))}
          </div>
        )}

        <div className="guide-card-grid">
          {buildCardElements(cards, type, cardIndex)}
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

      splitSubcards(card.lines).subcards.forEach((subcard) => {
        const fullSubcardName = subcard.name.replace(/\.$/, '').trim().toLowerCase()
        const normalizedSubcardName = normalizeReferenceName(subcard.name).toLowerCase()
        const subcardHref = `#${cardAnchor(section.cardType, subcard.name)}`

        cardIndex.set(`${section.cardType}:${fullSubcardName}`, subcardHref)

        if (!cardIndex.has(`${section.cardType}:${normalizedSubcardName}`)) {
          cardIndex.set(`${section.cardType}:${normalizedSubcardName}`, subcardHref)
        }
      })
    })
  })

  return cardIndex
}

function renderSectionContent(section, cardIndex) {
  const hasInlineMedia = section.content?.includes('[character-sheet]')

  return (
    <>
      {section.content ? (
        section.cardType ? (
          renderCards(section.content, section.cardType, cardIndex)
        ) : (
          renderTextBlocks(section.content, section.title, section)
        )
      ) : (
        <p>{section.body}</p>
      )}

      {!hasInlineMedia && renderSectionMedia(section)}
    </>
  )
}

function Guide({ title, intro, sections }) {
  const cardIndex = buildCardIndex(sections)
  const subnavRef = useRef(null)
  const location = useLocation()

  useLayoutEffect(() => {
    const subnav = subnavRef.current

    if (!subnav) {
      return undefined
    }

    const updateSubnavHeight = () => {
      document.documentElement.style.setProperty('--guide-subnav-height', `${subnav.offsetHeight}px`)
    }

    updateSubnavHeight()

    const observer = new ResizeObserver(updateSubnavHeight)
    observer.observe(subnav)
    window.addEventListener('resize', updateSubnavHeight)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', updateSubnavHeight)
      document.documentElement.style.removeProperty('--guide-subnav-height')
    }
  }, [sections])

  useLayoutEffect(() => {
    if (!location.hash) {
      return undefined
    }

    const targetId = decodeURIComponent(location.hash.slice(1))
    const frame = window.requestAnimationFrame(() => {
      const target = document.getElementById(targetId)

      if (!target) {
        return
      }

      const navbarHeight = document.querySelector('.navbar')?.getBoundingClientRect().height || 0
      const subnavHeight = subnavRef.current?.getBoundingClientRect().height || 0
      const targetTop = window.scrollY + target.getBoundingClientRect().top
      window.scrollTo({ top: Math.max(0, targetTop - navbarHeight - subnavHeight - 16), behavior: 'auto' })
    })

    return () => window.cancelAnimationFrame(frame)
  }, [location.hash, sections])

  return (
    <div className="page guide">
      <header className="guide-header">
        <h1>{title}</h1>
        <p>{intro}</p>
      </header>

      <nav ref={subnavRef} className="guide-subnav" aria-label={`${title} sections`}>
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
            <h2>
              {section.title}
              {section.subtitle && (
                <span className="guide-section-subtitle">{section.subtitle}</span>
              )}
            </h2>
            {renderSectionContent(section, cardIndex)}
          </section>
        ))}
      </div>
    </div>
  )
}

export default Guide
