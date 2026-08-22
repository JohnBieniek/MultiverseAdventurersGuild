import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { FaAsterisk, FaBookOpen, FaBrain, FaCar, FaChartBar, FaCommentDots, FaEye, FaFlask, FaHandPaper, FaHeart, FaLightbulb, FaMicrochip, FaRunning, FaSmile, FaStar, FaStickyNote, FaTree, FaUserSecret, FaUsers } from 'react-icons/fa'
import { GiBiceps, GiBroadsword, GiCrossedAxes, GiCrossedSwords } from 'react-icons/gi'

const PAGE = [612, 792]
const green = rgb(.055, .22, .12), gold = rgb(.73, .54, .22), ink = rgb(.08, .11, .09), pale = rgb(.97, .96, .92), line = rgb(.75, .79, .76), white = rgb(1, 1, 1)
const number = value => Number(value) || 0
const signed = value => `${number(value) >= 0 ? '+' : ''}${number(value)}`
const signedEntry = value => value === '' || value == null ? '' : signed(value)
const text = value => String(value ?? '').trim()
const safeName = value => (value || 'Hero').replace(/[<>:"/\\|?*]+/g, '-').trim() || 'Hero'
const iconComponents = {
  combat: GiBroadsword, attack: GiCrossedAxes, stats: FaChartBar, skills: FaStar, weapons: GiCrossedSwords,
  talents: FaAsterisk, items: FaFlask, contacts: FaUsers, notes: FaStickyNote,
  strength: GiBiceps, dexterity: FaHandPaper, endurance: FaHeart, intuition: FaBrain, education: FaBookOpen, charisma: FaCommentDots,
  athletics: FaRunning, influence: FaSmile, knowledge: FaLightbulb, observation: FaEye, outdoors: FaTree, sneak: FaUserSecret, technology: FaMicrochip, vehicle: FaCar,
}

const renderIcon = Icon => new Promise((resolve, reject) => {
  const svg = renderToStaticMarkup(createElement(Icon, { color: '#0e381f', size: 64, xmlns: 'http://www.w3.org/2000/svg' }))
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
  const icons = {}
  await Promise.all(Object.entries(iconComponents).map(async ([key, Icon]) => { try { icons[key] = await pdf.embedPng(await renderIcon(Icon)) } catch { icons[key] = null } }))
  let logo
  try { logo = await pdf.embedPng(await fetch('/multiverse%20adventurers%20guild%20icon.png').then(response => response.arrayBuffer())) } catch { logo = null }

  const addPage = (pageNumber, fullHeader = false) => {
    const page = pdf.addPage(PAGE)
    const H = page.getHeight()
    const write = (value, x, top, size = 12, font = regular, color = ink, options = {}) => page.drawText(String(value), { x, y: H - top - size, size, font, color, ...options })
    if (fullHeader) {
      page.drawRectangle({ x: 0, y: H - 104, width: 612, height: 104, color: pale })
      page.drawRectangle({ x: 0, y: H - 108, width: 612, height: 4, color: gold })
      if (logo) page.drawImage(logo, { x: 24, y: H - 93, width: 70, height: 70 })
      write('MULTIVERSE', 104, 20, 24, bold, green); write('ADVENTURERS GUILD', 104, 48, 17, bold, green); write('CHARACTER SHEET', 104, 72, 14, bold, ink)
      write(fit(bold, character.name || 'Unnamed Hero', 18, 230), 352, 19, 18, bold)
      write([text(character.species), text(character.archetype)].filter(Boolean).join(' / '), 352, 46, 12, regular)
      write(`LEVEL ${computed.level}`, 352, 72, 12, bold)
    } else {
      page.drawRectangle({ x: 0, y: H - 52, width: 612, height: 52, color: green })
      if (logo) page.drawImage(logo, { x: 22, y: H - 45, width: 36, height: 36 })
      write('MULTIVERSE ADVENTURERS GUILD', 68, 15, 16, bold, white)
      write(fit(bold, character.name || 'Unnamed Hero', 14, 190), 382, 16, 14, bold, white)
    }
    write(`PAGE ${pageNumber} OF 2`, 500, 770, 12, regular, green)
    return { page, H, write }
  }

  const section = (ctx, title, x, top, width, height, iconKey = '') => {
    const { page, H, write } = ctx
    page.drawRectangle({ x, y: H - top - height, width, height, borderColor: line, borderWidth: 1, color: white })
    page.drawRectangle({ x, y: H - top - 30, width: Math.min(width, 205), height: 30, color: green })
    if (icons[iconKey]) page.drawImage(icons[iconKey], { x: x + 8, y: H - top - 24, width: 18, height: 18 })
    write(title, x + (icons[iconKey] ? 34 : 10), top + 7, 14, bold, white)
    return top + 30
  }
  const valueBox = (ctx, label, value, x, top, width, height = 48) => {
    const { page, H, write } = ctx
    write(label.toUpperCase(), x, top, 12, bold, ink)
    page.drawRectangle({ x, y: H - top - height - 17, width, height, borderColor: line, borderWidth: 1, color: white })
    const shown = fit(bold, value, 14, width - 8); const tw = bold.widthOfTextAtSize(shown, 14)
    write(shown, x + Math.max(4, (width - tw) / 2), top + 17 + ((height - 14) / 2), 14, bold)
  }
  const table = (ctx, x, top, widths, headers, rows, rowHeight = 30, rowIconKeys = []) => {
    const { page, H, write } = ctx; const total = widths.reduce((sum, width) => sum + width, 0)
    page.drawRectangle({ x, y: H - top - 24, width: total, height: 24, color: pale, borderColor: line, borderWidth: .7 })
    let cx = x
    headers.forEach((header, index) => { write(fit(bold, header.toUpperCase(), 12, widths[index] - 4), cx + 2, top + 6, 12, bold); cx += widths[index] })
    rows.forEach((row, rowIndex) => {
      const rowTop = top + 24 + (rowIndex * rowHeight); cx = x
      page.drawRectangle({ x, y: H - rowTop - rowHeight, width: total, height: rowHeight, color: rowIndex % 2 ? pale : white, borderColor: line, borderWidth: .5 })
      row.forEach((cell, index) => { if (index) page.drawLine({ start: { x: cx, y: H - rowTop }, end: { x: cx, y: H - rowTop - rowHeight }, thickness: .5, color: line }); const rowIcon = index === 0 ? icons[rowIconKeys[rowIndex]] : null; if (rowIcon) page.drawImage(rowIcon, { x: cx + 5, y: H - rowTop - ((rowHeight + 17) / 2), width: 17, height: 17 }); const inset = rowIcon ? 26 : 4; write(fit(regular, cell, 12, widths[index] - inset - 4), cx + inset, rowTop + ((rowHeight - 12) / 2), 12); cx += widths[index] })
    })
  }

  const first = addPage(1, true)
  const form = pdf.getForm()
  const addXpField = (label, value, name, x) => {
    first.write(label, x, 88, 12, bold, green)
    const field = form.createTextField(name); field.setText(String(number(value))); field.addToPage(first.page, { x: x + 62, y: first.H - 104, width: 52, height: 23, font: regular, textColor: ink, backgroundColor: white, borderColor: line, borderWidth: 1 }); field.setFontSize(14)
  }
  addXpField('TOTAL XP', character.totalXp, 'total_xp', 352); addXpField('UNSPENT XP', character.unspentXp, 'unspent_xp', 470)

  section(first, 'COMBAT SUMMARY', 24, 120, 564, 112, 'combat')
  const combat = [['Initiative', signed(computed.initiative)], ['HP', `${number(character.currentHp)} / ${computed.maxHp}`], ['Defense', computed.defense], ['Resilience', signed(computed.resilience)], ['Ego', signed(computed.ego)], ['Energy', `${number(character.currentEnergy)} / ${computed.maxEnergy}`], ['Max Force', computed.maxForce]]
  combat.forEach(([label, value], index) => valueBox(first, label, value, 34 + (index * 79), 160, 68, 39))

  section(first, 'ATTACK', 24, 244, 564, 118, 'attack')
  const attack = number(character.attackSkill)
  ;[['Attack Skill', signedEntry(character.attackSkill)], ['Melee Mod', signedEntry(character.meleeAttackModifier)], ['Melee Total', signed(number(character.stats.strength) + attack + number(character.meleeAttackModifier))], ['Ranged Mod', signedEntry(character.rangedAttackModifier)], ['Ranged Total', signed(number(character.stats.dexterity) + attack + number(character.rangedAttackModifier))]].forEach(([label, value], index) => valueBox(first, label, value, 37 + (index * 110), 286, 96, 42))

  section(first, 'STATS', 24, 374, 160, 368, 'stats')
  table(first, 30, 414, [106, 42], ['Stat', 'Score'], stats.map(([key, label, short]) => [`${label} (${short})`, signedEntry(character.stats[key])]), 50, stats.map(([key]) => key))
  section(first, 'SKILLS', 196, 374, 392, 368, 'skills')
  const skillRows = skills.map(([key, label, statKey]) => { const entry = character.skills[key] || {}; const statShort = stats.find(([candidate]) => candidate === statKey)?.[2] || ''; const total = number(character.stats[statKey]) + Object.values(entry).reduce((sum, value) => sum + number(value), 0); return [label, statShort, signedEntry(entry.ability), signedEntry(entry.modifier), signedEntry(entry.buffs), signedEntry(entry.debuffs), signed(total)] })
  table(first, 202, 414, [85, 34, 51, 63, 44, 61, 42], ['Skill', 'Stat', 'Ability', 'Modifier', 'Buffs', 'Debuffs', 'Total'], skillRows, 37, skills.map(([key]) => key))

  const second = addPage(2)
  const weaponRows = (character.weapons || []).map(weapon => { const type = weaponTypes.find(([name]) => name === weapon.type) || weaponTypes[0]; const stat = type[1] === 'melee' ? character.stats.strength : character.stats.dexterity; return [text(weapon.name), text(weapon.type), `d${type[2]} ${signed(number(stat) + number(weapon.enhancement))}`, text(weapon.notes)] })
  const talentRows = (character.talents || []).map(row => [text(row.name), text(row.ability), text(row.duration), text(row.notes)])
  const itemRows = (character.items || []).map(row => [text(row.name), text(row.description ?? [row.bonus, row.appliesTo].filter(Boolean).join(' - '))])
  const contactRows = (character.contacts || []).map(row => [text(row.name), text(row.role)])
  if (!weaponRows.length) weaponRows.push(['', '', '', '']); if (!talentRows.length) talentRows.push(['', '', '', '']); if (!itemRows.length) itemRows.push(['', '']); if (!contactRows.length) contactRows.push(['', ''])
  const rowUnits = weaponRows.length + talentRows.length + Math.max(itemRows.length, contactRows.length)
  const detailRowHeight = Math.max(18, Math.min(24, Math.floor(374 / rowUnits)))
  const blockHeight = rows => 64 + (rows.length * detailRowHeight)
  let detailTop = 66
  const weaponsHeight = blockHeight(weaponRows)
  section(second, 'WEAPONS', 24, detailTop, 564, weaponsHeight, 'weapons'); table(second, 30, detailTop + 40, [150, 145, 82, 175], ['Weapon', 'Type', 'Damage', 'Notes'], weaponRows, detailRowHeight)
  detailTop += weaponsHeight + 10
  const talentsHeight = blockHeight(talentRows)
  section(second, 'TALENTS', 24, detailTop, 564, talentsHeight, 'talents'); table(second, 30, detailTop + 40, [150, 130, 90, 182], ['Talent', 'Ability / Cost', 'Duration', 'Notes'], talentRows, detailRowHeight)
  detailTop += talentsHeight + 10
  const pairedHeight = 64 + (Math.max(itemRows.length, contactRows.length) * detailRowHeight)
  section(second, 'ITEMS & TRAITS', 24, detailTop, 276, pairedHeight, 'items'); table(second, 30, detailTop + 40, [105, 159], ['Name', 'Description'], itemRows, detailRowHeight)
  section(second, 'CONTACTS', 312, detailTop, 276, pairedHeight, 'contacts'); table(second, 318, detailTop + 40, [105, 159], ['Name', 'Relationship / Role'], contactRows, detailRowHeight)
  detailTop += pairedHeight + 10
  const notesHeight = Math.max(90, 762 - detailTop)
  section(second, 'SESSION NOTES', 24, detailTop, 564, notesHeight, 'notes')
  const noteWords = text(character.notes).replace(/\s+/g, ' ').split(' ').filter(Boolean); const noteLines = []; let noteLine = ''
  noteWords.forEach(word => { const candidate = noteLine ? `${noteLine} ${word}` : word; if (regular.widthOfTextAtSize(candidate, 12) <= 520) noteLine = candidate; else { noteLines.push(noteLine); noteLine = word } }); if (noteLine) noteLines.push(noteLine)
  const visibleNoteLines = Math.max(1, Math.floor((notesHeight - 42) / 16))
  noteLines.slice(0, visibleNoteLines).forEach((note, index) => second.write(note, 36, detailTop + 39 + (index * 16), 12, regular))

  const bytes = await pdf.save()
  const blob = new Blob([bytes], { type: 'application/pdf' }); const url = URL.createObjectURL(blob); const link = document.createElement('a')
  link.href = url; link.download = `${safeName(character.name)}-Character-Sheet.pdf`; link.click(); window.setTimeout(() => URL.revokeObjectURL(url), 1000)
}
