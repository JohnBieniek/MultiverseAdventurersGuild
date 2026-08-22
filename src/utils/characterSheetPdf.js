import { PDFDocument, StandardFonts, TextAlignment, rgb } from 'pdf-lib'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { FaAsterisk, FaBookOpen, FaBrain, FaCar, FaChartBar, FaCommentDots, FaEye, FaFlask, FaHandPaper, FaHeart, FaLightbulb, FaMicrochip, FaRunning, FaSmile, FaStar, FaTree, FaUserSecret, FaUsers } from 'react-icons/fa'
import { GiBiceps, GiBroadsword, GiCrossedAxes, GiCrossedSwords } from 'react-icons/gi'

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
  talents: FaAsterisk, items: FaFlask, contacts: FaUsers,
  strength: GiBiceps, dexterity: FaHandPaper, endurance: FaHeart, intuition: FaBrain, education: FaBookOpen, charisma: FaCommentDots,
  athletics: FaRunning, influence: FaSmile, knowledge: FaLightbulb, observation: FaEye, outdoors: FaTree, sneak: FaUserSecret, technology: FaMicrochip, vehicle: FaCar,
}

const renderIcon = Icon => new Promise((resolve, reject) => {
  const svg = renderToStaticMarkup(createElement(Icon, { color: '#183d28', size: 64, xmlns: 'http://www.w3.org/2000/svg' }))
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
  await Promise.all(Object.entries(iconComponents).map(async ([key, Icon]) => { try { icons[key] = await pdf.embedPng(await renderIcon(Icon)) } catch { icons[key] = null } }))
  let logo
  try { logo = await pdf.embedPng(await fetch('/multiverse%20adventurers%20guild%20icon.png').then(response => response.arrayBuffer())) } catch { logo = null }

  const addPage = (pageNumber, fullHeader = false) => {
    const page = pdf.addPage(PAGE)
    const H = page.getHeight()
    const write = (value, x, top, size = 12, font = regular, color = ink, options = {}) => page.drawText(String(value), { x, y: H - top - size, size, font, color, ...options })
    if (fullHeader) {
      page.drawRectangle({ x: 0, y: H - 96, width: 612, height: 96, color: pale })
      if (logo) page.drawImage(logo, { x: 24, y: H - 82, width: 62, height: 62 })
      write('MULTIVERSE', 96, 16, 22, bold, green); write('ADVENTURERS GUILD', 96, 41, 16, bold, green); write('CHARACTER SHEET', 96, 64, 14, bold, ink)
    }
    write(`PAGE ${pageNumber} OF 2`, 500, 770, 12, regular, green)
    return { page, H, write }
  }

  const addTextField = (ctx, name, value, x, top, width, height, fontSize = 12, multiline = false) => {
    const field = form.createTextField(name)
    field.setText(String(value ?? '')); if (multiline) field.enableMultiline()
    field.addToPage(ctx.page, { x, y: ctx.H - top - height, width, height, font: regular, textColor: ink, backgroundColor: white, borderColor: line, borderWidth: 1 })
    field.setFontSize(fontSize)
    return field
  }

  const section = (ctx, title, x, top, width, height, iconKey = '', note = '') => {
    const { page, H, write } = ctx
    page.drawRectangle({ x, y: H - top - height, width, height, borderColor: line, borderWidth: 1, color: white })
    const titleWidth = Math.min(width, 205)
    page.drawRectangle({ x, y: H - top - 30, width: titleWidth, height: 30, color: green })
    if (icons[iconKey]) { page.drawCircle({ x: x + 17, y: H - top - 15, size: 11, color: white }); page.drawImage(icons[iconKey], { x: x + 8, y: H - top - 24, width: 18, height: 18 }) }
    write(title, x + (icons[iconKey] ? 34 : 10), top + 7, 14, bold, white)
    if (note && width - titleWidth > 90) {
      const available = width - titleWidth - 16; const words = note.split(' ')
      const wrap = size => { const lines = []; let current = ''; words.forEach(word => { const candidate = current ? `${current} ${word}` : word; if (bold.widthOfTextAtSize(candidate, size) <= available || !current) current = candidate; else { lines.push(current); current = word } }); if (current) lines.push(current); return lines }
      let noteSize = 12; let lines = wrap(noteSize)
      while (lines.length > 2 && noteSize > 8) { noteSize -= 1; lines = wrap(noteSize) }
      lines.slice(0, 2).forEach((value, index) => write(index === 1 && lines.length > 2 ? fit(bold, lines.slice(1).join(' '), noteSize, available) : value, x + titleWidth + 8, top + 3 + (index * 12), noteSize, bold))
    }
    return top + 30
  }
  const valueBox = (ctx, label, value, x, top, width, height = 48, fieldName = '') => {
    const { write } = ctx
    write(label.toUpperCase(), x, top, 12, bold, ink)
    addTextField(ctx, fieldName, value, x, top + 17, width, height, 14).setAlignment(TextAlignment.Center)
  }
  const table = (ctx, x, top, widths, headers, rows, rowHeight = 30, rowIconKeys = [], fieldPrefix = '', editableColumns = [], alternatingRows = true) => {
    const { page, H, write } = ctx; const total = widths.reduce((sum, width) => sum + width, 0)
    page.drawRectangle({ x, y: H - top - 24, width: total, height: 24, color: pale, borderColor: line, borderWidth: .7 })
    let cx = x
    headers.forEach((header, index) => { write(fit(bold, header.toUpperCase(), 12, widths[index] - 4), cx + 2, top + 6, 12, bold); cx += widths[index] })
    rows.forEach((row, rowIndex) => {
      const rowTop = top + 24 + (rowIndex * rowHeight); cx = x
      page.drawRectangle({ x, y: H - rowTop - rowHeight, width: total, height: rowHeight, color: alternatingRows && rowIndex % 2 ? pale : white, borderColor: line, borderWidth: .5 })
      row.forEach((cell, index) => { if (index) page.drawLine({ start: { x: cx, y: H - rowTop }, end: { x: cx, y: H - rowTop - rowHeight }, thickness: .5, color: line }); const rowIcon = index === 0 ? icons[rowIconKeys[rowIndex]] : null; if (rowIcon) page.drawImage(rowIcon, { x: cx + 5, y: H - rowTop - ((rowHeight + 17) / 2), width: 17, height: 17 }); const inset = rowIcon ? 26 : 4; if (editableColumns.includes(index)) { const field = addTextField(ctx, `${fieldPrefix}_${rowIndex}_${index}`, cell, cx + 1, rowTop + 1, widths[index] - 2, rowHeight - 2, 12); if ((fieldPrefix === 'skill' && index >= 2) || (fieldPrefix === 'stat' && index === 1)) field.setAlignment(TextAlignment.Center) } else write(fit(regular, cell, 12, widths[index] - inset - 4), cx + inset, rowTop + ((rowHeight - 12) / 2), 12); cx += widths[index] })
    })
  }

  const first = addPage(1, true)
  const labeledField = (label, value, name, x, top, width) => {
    first.write(label, x, top, 12, bold, green)
    addTextField(first, name, value, x, top + 14, width, 22, 12)
  }
  first.write(fit(bold, character.name || 'Unnamed Hero', 18, 236), 352, 10, 18, bold, green)
  first.write(fit(regular, [text(character.species), text(character.archetype)].filter(Boolean).join(' / '), 12, 236), 352, 36, 12, regular)
  labeledField('LEVEL', computed.level, 'level', 352, 56, 54); labeledField('TOTAL XP', character.totalXp, 'total_xp', 414, 56, 76); labeledField('UNSPENT XP', character.unspentXp, 'unspent_xp', 498, 56, 90)

  section(first, 'COMBAT SUMMARY', 24, 104, 564, 112, 'combat', 'Move 30 feet each turn, even if you attack. Take one reaction per round. Free actions: talk, draw a weapon, or step 5 feet.')
  const combat = [['Initiative', signed(computed.initiative)], ['HP', `       / ${computed.maxHp}`], ['Defense', computed.defense], ['Resilience', signed(computed.resilience)], ['Ego', signed(computed.ego)], ['Energy', `       / ${computed.maxEnergy}`], ['Max Force', computed.maxForce]]
  combat.forEach(([label, value], index) => valueBox(first, label, value, 34 + (index * 79), 141, 68, 39, `combat_${label.toLowerCase().replace(' ', '_')}`))

  section(first, 'ATTACK', 24, 222, 564, 118, 'attack', 'One Skill is used for both melee and ranged attacks.')
  const attack = number(character.attackSkill)
  ;[['Attack Skill', signedEntry(character.attackSkill)], ['Melee Mod', signedEntry(character.meleeAttackModifier)], ['Melee Total', signed(number(character.stats.strength) + attack + number(character.meleeAttackModifier))], ['Ranged Mod', signedEntry(character.rangedAttackModifier)], ['Ranged Total', signed(number(character.stats.dexterity) + attack + number(character.rangedAttackModifier))]].forEach(([label, value], index) => valueBox(first, label, value, 37 + (index * 110), 259, 96, 42, `attack_${index}`))

  const statRowHeight = (skills.length * 37) / stats.length
  section(first, 'STATS', 24, 346, 156, 54 + (stats.length * statRowHeight), 'stats')
  table(first, 24, 376, [96, 60], ['Stat', 'Score'], stats.map(([key, label]) => [label, signedEntry(character.stats[key])]), statRowHeight, stats.map(([key]) => key), 'stat', [1], false)
  section(first, 'SKILLS', 184, 346, 404, 54 + (skills.length * 37), 'skills', 'You can activate one Skill per turn.')
  const skillRows = skills.map(([key, label, statKey]) => { const entry = character.skills[key] || {}; const statShort = stats.find(([candidate]) => candidate === statKey)?.[2] || ''; const total = number(character.stats[statKey]) + Object.values(entry).reduce((sum, value) => sum + number(value), 0); return [label, statShort, signedEntry(entry.ability), signedEntry(entry.modifier), temporaryEntry(entry.buffs), temporaryEntry(entry.debuffs), signed(total)] })
  table(first, 184, 376, [109, 34, 51, 63, 44, 61, 42], ['Skill', 'Stat', 'Ability', 'Modifier', 'Buffs', 'Debuffs', 'Total'], skillRows, 37, skills.map(([key]) => key), 'skill', [2, 3, 4, 5, 6], false)

  const second = addPage(2)
  const padRows = (rows, minimum, blank) => { const next = [...rows]; while (next.length < minimum) next.push([...blank]); return next }
  const weaponRows = padRows((character.weapons || []).filter(weapon => text(weapon.name) || text(weapon.notes) || number(weapon.enhancement)).map(weapon => { const type = weaponTypes.find(([name]) => name === weapon.type) || weaponTypes[0]; const stat = type[1] === 'melee' ? character.stats.strength : character.stats.dexterity; return [text(weapon.name), text(weapon.type), `d${type[2]} ${signed(number(stat) + number(weapon.enhancement))}`, text(weapon.notes)] }), 6, ['', '', '', ''])
  const talentRows = padRows((character.talents || []).filter(row => [row.name, row.ability, row.duration, row.notes].some(text)).map(row => [text(row.name), text(row.ability), text(row.duration), text(row.notes)]), 6, ['', '', '', ''])
  const itemRows = padRows((character.items || []).filter(row => [row.name, row.description, row.bonus, row.appliesTo].some(text)).map(row => [text(row.name), text(row.description ?? [row.bonus, row.appliesTo].filter(Boolean).join(' - '))]), 4, ['', ''])
  const contactRows = padRows((character.contacts || []).filter(row => [row.name, row.role].some(text)).slice(0, 6).map(row => [text(row.name), text(row.role)]), 6, ['', ''])
  const rowUnits = weaponRows.length + talentRows.length + itemRows.length + contactRows.length
  const detailRowHeight = Math.max(14, Math.min(24, Math.floor(500 / rowUnits)))
  const blockHeight = rows => 54 + (rows.length * detailRowHeight)
  let detailTop = 24
  const weaponsHeight = blockHeight(weaponRows)
  section(second, 'WEAPONS', 24, detailTop, 564, weaponsHeight, 'weapons', 'You can attack once each turn, or move an extra 30 feet instead.'); table(second, 24, detailTop + 30, [150, 122, 63, 229], ['Weapon', 'Type', 'Damage', 'Notes'], weaponRows, detailRowHeight, [], 'weapon', [0, 1, 2, 3])
  detailTop += weaponsHeight + 6
  const talentsHeight = blockHeight(talentRows)
  section(second, 'TALENTS', 24, detailTop, 564, talentsHeight, 'talents', 'You can activate two Talents per turn. Sustained combat Talents occupy Combat Slots: one at level 0, plus one at levels 4 and 7.'); table(second, 24, detailTop + 30, [150, 130, 90, 194], ['Talent', 'Ability / Cost', 'Duration', 'Notes'], talentRows, detailRowHeight, [], 'talent', [0, 1, 2, 3])
  detailTop += talentsHeight + 6
  const itemsHeight = blockHeight(itemRows)
  section(second, 'ITEMS & TRAITS', 24, detailTop, 564, itemsHeight, 'items', 'Items explain why your Stats and Skills look the way they do. Traits describe your Hero’s personality, beliefs, habits, and complications.'); table(second, 24, detailTop + 30, [180, 384], ['Name', 'Description'], itemRows, detailRowHeight, [], 'item', [0, 1])
  detailTop += itemsHeight + 6
  const contactsHeight = blockHeight(contactRows)
  section(second, 'CONTACTS', 24, detailTop, 564, contactsHeight, 'contacts', `You begin with 3 + Charisma (${Math.max(0, 3 + number(character.stats.charisma))}) Contacts.`); table(second, 24, detailTop + 30, [200, 364], ['Name', 'Relationship / Role'], contactRows, detailRowHeight, [], 'contact', [0, 1])

  form.updateFieldAppearances(regular)
  const bytes = await pdf.save()
  const blob = new Blob([bytes], { type: 'application/pdf' }); const url = URL.createObjectURL(blob); const link = document.createElement('a')
  link.href = url; link.download = `${safeName(character.name)}-Character-Sheet.pdf`; link.click(); window.setTimeout(() => URL.revokeObjectURL(url), 1000)
}
