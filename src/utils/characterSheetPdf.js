import { PDFDocument, StandardFonts, TextAlignment, rgb } from 'pdf-lib'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { FaAsterisk, FaBolt, FaBookOpen, FaBrain, FaCar, FaChartBar, FaCommentDots, FaCrosshairs, FaEye, FaFistRaised, FaFlask, FaHandPaper, FaHeart, FaHeartbeat, FaHeartBroken, FaLightbulb, FaMicrochip, FaRunning, FaShieldAlt, FaSmile, FaStar, FaStickyNote, FaSun, FaTree, FaUserSecret, FaUsers } from 'react-icons/fa'
import { GiBiceps, GiBowArrow, GiBroadsword, GiCrossedAxes, GiCrossedSwords } from 'react-icons/gi'

const PAGE = [612, 792]
const green = rgb(24 / 255, 61 / 255, 40 / 255), ink = rgb(.08, .11, .09), pale = rgb(248 / 255, 237 / 255, 212 / 255), line = rgb(.75, .79, .76), white = rgb(1, 1, 1)
const number = value => Number(value) || 0
const signed = value => `${number(value) >= 0 ? '+' : ''}${number(value)}`
const signedEntry = value => value === '' || value == null ? '' : signed(value)
const temporaryEntry = value => number(value) === 0 ? '' : signed(value)
const text = value => String(value ?? '').trim()
const safeName = value => (value || 'Hero').replace(/[<>:"/\\|?*]+/g, '-').trim() || 'Hero'
const iconComponents = {
  combat: GiBroadsword, attack: GiCrossedAxes, stats: FaChartBar, skills: FaStar, weapons: GiCrossedSwords,
  talents: FaAsterisk, items: FaFlask, contacts: FaUsers, notes: FaStickyNote,
  initiative: FaCrosshairs, hp: FaHeartbeat, defense: FaShieldAlt, resilience: FaHeartBroken, ego: FaBrain, energy: FaBolt, maxForce: FaSun,
  meleeAttack: FaFistRaised, rangedAttack: GiBowArrow,
  strength: GiBiceps, dexterity: FaHandPaper, endurance: FaHeart, intuition: FaBrain, education: FaBookOpen, charisma: FaCommentDots,
  athletics: FaRunning, influence: FaSmile, knowledge: FaLightbulb, observation: FaEye, outdoors: FaTree, sneak: FaUserSecret, technology: FaMicrochip, vehicle: FaCar,
}

const renderIcon = (Icon, color = '#183d28') => new Promise((resolve, reject) => {
  const svg = renderToStaticMarkup(createElement(Icon, { color, size: 64, xmlns: 'http://www.w3.org/2000/svg' }))
  const image = new Image(); image.onload = () => { const canvas = document.createElement('canvas'); canvas.width = 64; canvas.height = 64; const context = canvas.getContext('2d'); context.drawImage(image, 0, 0, 64, 64); canvas.toBlob(blob => blob ? blob.arrayBuffer().then(resolve, reject) : reject(new Error('Icon rendering failed')), 'image/png') }; image.onerror = reject; image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
})

const fit = (font, value, size, width) => {
  const source = text(value)
  if (font.widthOfTextAtSize(source, size) <= width) return source
  let result = source
  while (result && font.widthOfTextAtSize(`${result}...`, size) > width) result = result.slice(0, -1)
  return result ? `${result}...` : ''
}

export async function downloadCharacterSheetPdf({ character, computed, stats, skills, weaponTypes }) {
  const pdf = await PDFDocument.create()
  const regular = await pdf.embedFont(StandardFonts.Helvetica)
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold)
  const form = pdf.getForm()
  const icons = {}
  const headerIcons = {}
  await Promise.all(Object.entries(iconComponents).map(async ([key, Icon]) => { try { icons[key] = await pdf.embedPng(await renderIcon(Icon)) } catch { icons[key] = null } }))
  await Promise.all(Object.entries(iconComponents).map(async ([key, Icon]) => { try { headerIcons[key] = await pdf.embedPng(await renderIcon(Icon, '#ffffff')) } catch { headerIcons[key] = null } }))
  let logo
  try { logo = await pdf.embedPng(await fetch('/multiverse%20adventurers%20guild%20icon.png').then(response => response.arrayBuffer())) } catch { logo = null }

  const addPage = (pageNumber, fullHeader = false) => {
    const page = pdf.addPage(PAGE)
    const H = page.getHeight()
    const write = (value, x, top, size = 12, font = regular, color = ink, options = {}) => page.drawText(String(value), { x, y: H - top - size, size, font, color, ...options })
    if (fullHeader) {
      page.drawRectangle({ x: 0, y: H - 76, width: 612, height: 76, color: pale })
      if (logo) page.drawImage(logo, { x: 24, y: H - 65, width: 50, height: 50 })
      write('MULTIVERSE', 84, 9, 18, bold, green); write('ADVENTURERS GUILD', 84, 30, 13, bold, green); write('Character Sheet', 84, 49, 11, bold, ink)
    }
    return { page, H, write }
  }

  const addTextField = (ctx, name, value, x, top, width, height, fontSize = 12, multiline = false) => {
    const field = form.createTextField(name)
    field.setText(String(value ?? '')); if (multiline) field.enableMultiline()
    field.addToPage(ctx.page, { x, y: ctx.H - top - height, width, height, font: regular, textColor: ink, backgroundColor: white, borderColor: line, borderWidth: 1 })
    field.setFontSize(fontSize)
    return field
  }

  const section = (ctx, title, x, top, width, height, iconKey = '', note = '', headerHeight = 30) => {
    const { page, H, write } = ctx
    page.drawRectangle({ x, y: H - top - height, width, height, borderColor: line, borderWidth: 1, color: white })
    const titleWidth = Math.min(width, 205)
    const compact = headerHeight < 30; const iconSize = compact ? 16 : 18; const titleSize = compact ? 12 : 10
    page.drawRectangle({ x, y: H - top - headerHeight, width: titleWidth, height: headerHeight, color: green })
    if (headerIcons[iconKey]) page.drawImage(headerIcons[iconKey], { x: x + 8, y: H - top - ((headerHeight + iconSize) / 2), width: iconSize, height: iconSize })
    write(title, x + (headerIcons[iconKey] ? (compact ? 30 : 34) : 10), top + ((headerHeight - titleSize) / 2) - 1, titleSize, bold, white)
    if (note && width - titleWidth > 90) {
      const available = width - titleWidth - 16; const words = note.split(' ')
      const wrap = size => { const lines = []; let current = ''; words.forEach(word => { const candidate = current ? `${current} ${word}` : word; if (bold.widthOfTextAtSize(candidate, size) <= available || !current) current = candidate; else { lines.push(current); current = word } }); if (current) lines.push(current); return lines }
      let noteSize = compact ? 10 : 12; let lines = wrap(noteSize)
      while (lines.length > 2 && noteSize > 8) { noteSize -= 1; lines = wrap(noteSize) }
      const lineStep = compact ? 9 : 12
      lines.slice(0, 2).forEach((value, index) => write(index === 1 && lines.length > 2 ? fit(bold, lines.slice(1).join(' '), noteSize, available) : value, x + titleWidth + 8, top + (compact ? 1 : 3) + (index * lineStep), noteSize, bold))
    }
    return top + headerHeight
  }
  const valueBox = (ctx, label, value, x, top, width, height = 48, fieldName = '') => {
    const { write } = ctx
    const heading = label.toUpperCase()
    write(heading, x + ((width - bold.widthOfTextAtSize(heading, 12)) / 2), top, 12, bold, ink)
    addTextField(ctx, fieldName, value, x, top + 17, width, height, 14).setAlignment(TextAlignment.Center)
  }
  const table = (ctx, x, top, widths, headers, rows, rowHeight = 30, rowIconKeys = [], fieldPrefix = '', editableColumns = [], alternatingRows = true) => {
    const { page, H, write } = ctx; const total = widths.reduce((sum, width) => sum + width, 0)
    page.drawRectangle({ x, y: H - top - 12, width: total, height: 12, color: pale, borderColor: line, borderWidth: .7 })
    let cx = x
    headers.forEach((header, index) => { write(fit(bold, header.toUpperCase(), 10, widths[index] - 4), cx + 2, top + 1, 10, bold); cx += widths[index] })
    rows.forEach((row, rowIndex) => {
      const rowTop = top + 12 + (rowIndex * rowHeight); cx = x
      page.drawRectangle({ x, y: H - rowTop - rowHeight, width: total, height: rowHeight, color: alternatingRows && rowIndex % 2 ? pale : white, borderColor: line, borderWidth: .5 })
      row.forEach((cell, index) => { if (index) page.drawLine({ start: { x: cx, y: H - rowTop }, end: { x: cx, y: H - rowTop - rowHeight }, thickness: .5, color: line }); const rowIcon = index === 0 ? icons[rowIconKeys[rowIndex]] : null; if (rowIcon) page.drawImage(rowIcon, { x: cx + 5, y: H - rowTop - ((rowHeight + 17) / 2), width: 17, height: 17 }); const inset = rowIcon ? 26 : 4; if (editableColumns.includes(index)) { const field = addTextField(ctx, `${fieldPrefix}_${rowIndex}_${index}`, cell, cx + 1, rowTop + 1, widths[index] - 2, rowHeight - 2, 12); if ((fieldPrefix === 'skill' && index >= 2) || (fieldPrefix === 'stat' && index === 1)) field.setAlignment(TextAlignment.Center) } else write(fit(regular, cell, 12, widths[index] - inset - 4), cx + inset, rowTop + ((rowHeight - 12) / 2), 12); cx += widths[index] })
    })
  }

  const padRows = (rows, minimum, blank) => { const next = [...rows]; while (next.length < minimum) next.push([...blank]); return next }
  const weaponRows = padRows((character.weapons || []).filter(weapon => text(weapon.name) || text(weapon.notes) || number(weapon.enhancement)).slice(0, 6).map(weapon => { const type = weaponTypes.find(([name]) => name === weapon.type) || weaponTypes[0]; const stat = type[1] === 'melee' ? character.stats.strength : character.stats.dexterity; return [text(weapon.name), text(weapon.type), signedEntry(weapon.enhancement), `d${type[2]} ${signed(number(stat) + number(weapon.enhancement))}`, text(weapon.notes)] }), 6, ['', '', '', '', ''])

  const first = addPage(1, true)
  const labeledField = (label, value, name, x, top, width) => {
    first.write(label, x + ((width - bold.widthOfTextAtSize(label, 9)) / 2), top, 9, bold, green)
    addTextField(first, name, value, x, top + 11, width, 16, 9).setAlignment(TextAlignment.Center)
  }
  first.write(fit(bold, character.name || 'Unnamed Hero', 15, 236), 352, 7, 15, bold, green)
  first.write(fit(regular, [text(character.species), text(character.archetype)].filter(Boolean).join(' / '), 10, 236), 352, 27, 10, regular)
  labeledField('LEVEL', computed.level, 'level', 352, 43, 54); labeledField('TOTAL XP', character.totalXp, 'total_xp', 414, 43, 76); labeledField('UNSPENT XP', character.unspentXp, 'unspent_xp', 498, 43, 90)

  section(first, 'COMBAT SUMMARY', 24, 82, 564, 70, 'combat', 'Move 30 feet each turn, even if you attack. Take one reaction per round. Free actions: talk, draw a weapon, or step 5 feet.', 22)
  const combat = [['Initiative', signed(computed.initiative)], ['HP', `       / ${computed.maxHp}`], ['Defense', computed.defense], ['Resilience', signed(computed.resilience)], ['Ego', signed(computed.ego)], ['Energy', `       / ${computed.maxEnergy}`], ['Max Force', computed.maxForce]]
  const combatIconKeys = { Initiative: 'initiative', HP: 'hp', Defense: 'defense', Resilience: 'resilience', Ego: 'ego', Energy: 'energy', 'Max Force': 'maxForce' }
  let combatX = 30
  combat.forEach(([label, value]) => {
    const width = label === 'Defense' ? 96 : 68
    const combatIcon = icons[combatIconKeys[label]]
    const heading = label.toUpperCase(); const headingWidth = bold.widthOfTextAtSize(heading, 8); const headingX = combatX + ((width - headingWidth - (combatIcon ? 15 : 0)) / 2)
    if (combatIcon) first.page.drawImage(combatIcon, { x: headingX, y: first.H - 119, width: 12, height: 12 })
    if (label === 'Defense') {
      first.write(heading, headingX + (combatIcon ? 15 : 0), 109, 8, bold, ink)
      const defenseEntries = [['MOD', signedEntry(character.defenseBonus)], ['TOTAL', computed.defense], ['RATING', signedEntry(character.defenseRating)]]
      defenseEntries.forEach(([entryLabel, entryValue], index) => { const fieldX = combatX + (index * 34); first.write(entryLabel, fieldX + ((28 - bold.widthOfTextAtSize(entryLabel, 6)) / 2), 120, 6, bold, ink); addTextField(first, `combat_defense_${entryLabel.toLowerCase()}`, entryValue, fieldX, 128, 28, 17, 8).setAlignment(TextAlignment.Center) })
    } else {
      first.write(heading, headingX + (combatIcon ? 15 : 0), 109, 8, bold, ink)
      addTextField(first, `combat_${label.toLowerCase().replace(' ', '_')}`, value, combatX, 124, width, 21, 9).setAlignment(TextAlignment.Center)
    }
    combatX += width + 8
  })

  section(first, 'ATTACK', 24, 158, 564, 96, 'attack', 'One Skill is used for both melee and ranged attacks.', 22)
  const attack = number(character.attackSkill)
  const attackEquation = (label, statLabel, stat, modifier, x, prefix, iconKey) => {
    first.page.drawRectangle({ x, y: first.H - 247, width: 221, height: 65, borderColor: line, borderWidth: 1, color: white })
    const attackIcon = icons[iconKey]; const labelWidth = bold.widthOfTextAtSize(label, 11); const labelX = x + ((221 - labelWidth - (attackIcon ? 18 : 0)) / 2)
    if (attackIcon) first.page.drawImage(attackIcon, { x: labelX, y: first.H - 198, width: 14, height: 14 })
    first.write(label, labelX + (attackIcon ? 18 : 0), 185, 11, bold, green)
    const entries = [[statLabel, signedEntry(stat)], ['SKILL', signedEntry(character.attackSkill)], ['MOD', signedEntry(modifier)], ['TOTAL', signed(number(stat) + attack + number(modifier))]]
    const positions = [x + 10, x + 63, x + 116, x + 173]
    entries.forEach(([entryLabel, value], index) => { const fieldWidth = index === 3 ? 38 : 36; first.write(entryLabel, positions[index] + ((fieldWidth - bold.widthOfTextAtSize(entryLabel, 7)) / 2), 200, 7, bold, ink); addTextField(first, `${prefix}_${index}`, value, positions[index], 210, fieldWidth, 29, 10).setAlignment(TextAlignment.Center) })
    first.write('+', x + 52, 219, 10, bold); first.write('+', x + 105, 219, 10, bold); first.write('=', x + 159, 219, 10, bold)
  }
  first.write('ATTACK SKILL', 34 + ((82 - bold.widthOfTextAtSize('ATTACK SKILL', 9)) / 2), 188, 9, bold, ink)
  addTextField(first, 'attack_skill', signedEntry(character.attackSkill), 34, 210, 82, 29, 10).setAlignment(TextAlignment.Center)
  attackEquation('MELEE ATTACK (STR)', 'STR', character.stats.strength, character.meleeAttackModifier, 128, 'melee_attack', 'meleeAttack')
  attackEquation('RANGED ATTACK (DEX)', 'DEX', character.stats.dexterity, character.rangedAttackModifier, 357, 'ranged_attack', 'rangedAttack')

  const skillRowHeight = 21
  const statRowHeight = (skills.length * skillRowHeight) / stats.length
  section(first, 'STATS', 24, 260, 156, 34 + (stats.length * statRowHeight), 'stats', '', 22)
  table(first, 24, 282, [96, 60], ['Stat', 'Score'], stats.map(([key, label]) => [label, signedEntry(character.stats[key])]), statRowHeight, stats.map(([key]) => key), 'stat', [1], false)
  section(first, 'SKILLS', 184, 260, 404, 34 + (skills.length * skillRowHeight), 'skills', 'You can activate one Skill per turn.', 22)
  const skillRows = skills.map(([key, label, statKey]) => { const entry = character.skills[key] || {}; const statShort = stats.find(([candidate]) => candidate === statKey)?.[2] || ''; const total = number(character.stats[statKey]) + Object.values(entry).reduce((sum, value) => sum + number(value), 0); return [label, statShort, signedEntry(character.stats[statKey]), signedEntry(entry.ability), temporaryEntry(entry.buffs), temporaryEntry(entry.debuffs), signed(total)] })
  table(first, 184, 282, [98, 36, 45, 53, 57, 68, 47], ['Skill', 'Stat', 'Score', 'Ability', 'Buffs', 'Debuffs', 'Total'], skillRows, skillRowHeight, skills.map(([key]) => key), 'skill', [2, 3, 4, 5, 6], false)

  const weaponTop = 474; const weaponWidths = [275, 125, 100, 64]; const weaponRowHeight = 44; const weaponHeaderHeight = 22; const weaponLineHeight = 21
  section(first, 'WEAPONS', 24, weaponTop, 564, 34 + (weaponRows.length * weaponRowHeight), 'weapons', 'You can attack once each turn, or move an extra 30 feet instead.', weaponHeaderHeight)
  first.page.drawRectangle({ x: 24, y: first.H - weaponTop - 34, width: 564, height: 12, color: pale, borderColor: line, borderWidth: .7 })
  let weaponHeaderX = 24
  ;['Weapon', 'Type', 'Enhancement', 'Damage'].forEach((header, index) => { first.write(header.toUpperCase(), weaponHeaderX + 3, weaponTop + 23, 10, bold); weaponHeaderX += weaponWidths[index] })
  weaponRows.forEach((row, rowIndex) => {
    const rowTop = weaponTop + 34 + (rowIndex * weaponRowHeight)
    first.page.drawRectangle({ x: 24, y: first.H - rowTop - weaponRowHeight, width: 564, height: weaponRowHeight, color: white, borderColor: line, borderWidth: .5 })
    let fieldX = 24
    row.slice(0, 4).forEach((value, index) => { if (index) first.page.drawLine({ start: { x: fieldX, y: first.H - rowTop }, end: { x: fieldX, y: first.H - rowTop - weaponLineHeight }, thickness: .5, color: line }); addTextField(first, `weapon_${rowIndex}_${index}`, value, fieldX + 1, rowTop, weaponWidths[index] - 2, weaponLineHeight, 11); fieldX += weaponWidths[index] })
    first.page.drawLine({ start: { x: 24, y: first.H - rowTop - weaponLineHeight }, end: { x: 588, y: first.H - rowTop - weaponLineHeight }, thickness: .5, color: line })
    addTextField(first, `weapon_${rowIndex}_notes`, row[4], 25, rowTop + weaponLineHeight, 562, weaponRowHeight - weaponLineHeight, 10)
  })

  const second = addPage(2)
  const talentAllowance = number(computed.level) === 0 ? 0 : 2 + [3, 5, 7, 9].filter(level => number(computed.level) >= level).length
  const talentsAcquired = Math.max(talentAllowance, (character.talents || []).length)
  const talentRows = padRows((character.talents || []).filter(row => [row.name, row.ability, row.duration, row.notes].some(text)).map(row => [text(row.name), text(row.ability), text(row.duration), text(row.notes)]), 6, ['', '', '', ''])
  const itemRows = padRows((character.items || []).filter(row => [row.name, row.description, row.bonus, row.appliesTo].some(text)).map(row => [text(row.name), text(row.description ?? [row.bonus, row.appliesTo].filter(Boolean).join(' - '))]), 4, ['', ''])
  const contactRows = padRows((character.contacts || []).filter(row => [row.name, row.role].some(text)).slice(0, 6).map(row => [text(row.name), text(row.role)]), 6, ['', ''])
  const requestedRowSpace = (talentRows.length * 64) + (itemRows.length * 40) + (contactRows.length * 16)
  const detailScale = Math.min(1, 640 / requestedRowSpace)
  const talentRowHeight = Math.floor(64 * detailScale); const itemRowHeight = Math.floor(40 * detailScale); const contactRowHeight = Math.floor(16 * detailScale)
  const blockHeight = (rows, rowHeight) => 34 + (rows.length * rowHeight)
  let detailTop = 24
  const talentsHeight = blockHeight(talentRows, talentRowHeight)
  section(second, 'TALENTS', 24, detailTop, 564, talentsHeight, 'talents', `You can activate two Talents per turn. Talents Acquired: ${talentsAcquired}    Combat Slots: ${computed.slots}.`, 22)
  const talentWidths = [220, 190, 154]; const talentLineHeight = Math.max(14, Math.floor(talentRowHeight * .32))
  second.page.drawRectangle({ x: 24, y: second.H - detailTop - 34, width: 564, height: 12, color: pale, borderColor: line, borderWidth: .7 })
  let talentHeaderX = 24
  ;['Talent', 'Ability / Cost', 'Duration'].forEach((header, index) => { second.write(header.toUpperCase(), talentHeaderX + 3, detailTop + 23, 10, bold); talentHeaderX += talentWidths[index] })
  talentRows.forEach((row, rowIndex) => {
    const rowTop = detailTop + 34 + (rowIndex * talentRowHeight); let fieldX = 24
    second.page.drawRectangle({ x: 24, y: second.H - rowTop - talentRowHeight, width: 564, height: talentRowHeight, color: white, borderColor: line, borderWidth: .5 })
    row.slice(0, 3).forEach((value, index) => { if (index) second.page.drawLine({ start: { x: fieldX, y: second.H - rowTop }, end: { x: fieldX, y: second.H - rowTop - talentLineHeight }, thickness: .5, color: line }); addTextField(second, `talent_${rowIndex}_${index}`, value, fieldX + 1, rowTop, talentWidths[index] - 2, talentLineHeight, 8); fieldX += talentWidths[index] })
    second.page.drawLine({ start: { x: 24, y: second.H - rowTop - talentLineHeight }, end: { x: 588, y: second.H - rowTop - talentLineHeight }, thickness: .5, color: line })
    addTextField(second, `talent_${rowIndex}_notes`, row[3], 25, rowTop + talentLineHeight, 562, talentRowHeight - talentLineHeight, 7.5, true)
  })
  detailTop += talentsHeight + 6
  const itemsHeight = blockHeight(itemRows, itemRowHeight)
  section(second, 'ITEMS & TRAITS', 24, detailTop, 564, itemsHeight, 'items', 'Items explain why your Stats and Skills look the way they do. Traits describe your Hero’s personality, beliefs, habits, and complications.', 22)
  second.page.drawRectangle({ x: 24, y: second.H - detailTop - 34, width: 564, height: 12, color: pale, borderColor: line, borderWidth: .7 })
  second.write('NAME', 27, detailTop + 23, 10, bold); second.write('DESCRIPTION', 207, detailTop + 23, 10, bold)
  itemRows.forEach((row, rowIndex) => { const rowTop = detailTop + 34 + (rowIndex * itemRowHeight); second.page.drawRectangle({ x: 24, y: second.H - rowTop - itemRowHeight, width: 564, height: itemRowHeight, color: white, borderColor: line, borderWidth: .5 }); second.page.drawLine({ start: { x: 204, y: second.H - rowTop }, end: { x: 204, y: second.H - rowTop - itemRowHeight }, thickness: .5, color: line }); addTextField(second, `item_${rowIndex}_0`, row[0], 25, rowTop + 1, 178, itemRowHeight - 2, 9); addTextField(second, `item_${rowIndex}_1`, row[1], 205, rowTop + 1, 382, itemRowHeight - 2, 9, true) })
  detailTop += itemsHeight + 6
  const contactsHeight = blockHeight(contactRows, contactRowHeight)
  section(second, 'CONTACTS', 24, detailTop, 564, contactsHeight, 'contacts', `You begin with 3 + Charisma (${Math.max(0, 3 + number(character.stats.charisma))}) Contacts.`, 22)
  second.page.drawRectangle({ x: 24, y: second.H - detailTop - 34, width: 564, height: 12, color: pale, borderColor: line, borderWidth: .7 })
  second.write('NAME', 27, detailTop + 23, 10, bold); second.write('RELATIONSHIP / ROLE', 227, detailTop + 23, 10, bold)
  contactRows.forEach((row, rowIndex) => { const rowTop = detailTop + 34 + (rowIndex * contactRowHeight); second.page.drawRectangle({ x: 24, y: second.H - rowTop - contactRowHeight, width: 564, height: contactRowHeight, color: white, borderColor: line, borderWidth: .5 }); second.page.drawLine({ start: { x: 224, y: second.H - rowTop }, end: { x: 224, y: second.H - rowTop - contactRowHeight }, thickness: .5, color: line }); addTextField(second, `contact_${rowIndex}_0`, row[0], 25, rowTop + 1, 198, contactRowHeight - 2, 9); addTextField(second, `contact_${rowIndex}_1`, row[1], 225, rowTop + 1, 362, contactRowHeight - 2, 9) })

  const third = addPage(3)
  section(third, 'NOTES', 24, 24, 564, 596, 'notes', '', 22)
  addTextField(third, 'session_notes', character.notes, 25, 47, 562, 572, 10, true)

  const forceRows = [['F1', '1 Energy', '1 Energy'], ['F2', '4 Energy', '2 Energy'], ['F3', '9 Energy', '4 Energy'], ['F4', '16 Energy', '8 Energy']]
  section(third, 'FORCE ACTIVATION COSTS', 24, 626, 564, 146, 'talents', 'One-shots last for one roll or immediate use and never occupy a slot.', 22)
  table(third, 24, 648, [120, 220, 224], ['Force', 'Sustained', 'One-shot'], forceRows, 28, [], '', [], false)

  form.updateFieldAppearances(regular)
  const bytes = await pdf.save()
  const blob = new Blob([bytes], { type: 'application/pdf' }); const url = URL.createObjectURL(blob); const link = document.createElement('a')
  link.href = url; link.download = `${safeName(character.name)}-Character-Sheet.pdf`; link.click(); window.setTimeout(() => URL.revokeObjectURL(url), 1000)
}
