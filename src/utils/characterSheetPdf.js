import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

const PAGE = [612, 792]
const green = rgb(.055, .22, .12), gold = rgb(.73, .54, .22), ink = rgb(.08, .11, .09), pale = rgb(.97, .96, .92), line = rgb(.75, .79, .76), white = rgb(1, 1, 1)
const number = value => Number(value) || 0
const signed = value => `${number(value) >= 0 ? '+' : ''}${number(value)}`
const signedEntry = value => value === '' || value == null ? '' : signed(value)
const text = value => String(value ?? '').trim()
const safeName = value => (value || 'Hero').replace(/[<>:"/\\|?*]+/g, '-').trim() || 'Hero'

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

  const section = (ctx, title, x, top, width, height, icon = '') => {
    const { page, H, write } = ctx
    page.drawRectangle({ x, y: H - top - height, width, height, borderColor: line, borderWidth: 1, color: white })
    page.drawRectangle({ x, y: H - top - 30, width: Math.min(width, 205), height: 30, color: green })
    if (icon) { page.drawCircle({ x: x + 17, y: H - top - 15, size: 10, color: white }); write(icon, x + 10, top + 7, 12, bold, green) }
    write(title, x + (icon ? 32 : 10), top + 7, 14, bold, white)
    return top + 30
  }
  const valueBox = (ctx, label, value, x, top, width, height = 48) => {
    const { page, H, write } = ctx
    write(label.toUpperCase(), x, top, 12, bold, ink)
    page.drawRectangle({ x, y: H - top - height - 17, width, height, borderColor: line, borderWidth: 1, color: white })
    const shown = fit(bold, value, 14, width - 8); const tw = bold.widthOfTextAtSize(shown, 14)
    write(shown, x + Math.max(4, (width - tw) / 2), top + 17 + ((height - 14) / 2), 14, bold)
  }
  const table = (ctx, x, top, widths, headers, rows, rowHeight = 30) => {
    const { page, H, write } = ctx; const total = widths.reduce((sum, width) => sum + width, 0)
    page.drawRectangle({ x, y: H - top - 24, width: total, height: 24, color: pale, borderColor: line, borderWidth: .7 })
    let cx = x
    headers.forEach((header, index) => { write(fit(bold, header.toUpperCase(), 12, widths[index] - 8), cx + 4, top + 6, 12, bold); cx += widths[index] })
    rows.forEach((row, rowIndex) => {
      const rowTop = top + 24 + (rowIndex * rowHeight); cx = x
      page.drawRectangle({ x, y: H - rowTop - rowHeight, width: total, height: rowHeight, color: rowIndex % 2 ? pale : white, borderColor: line, borderWidth: .5 })
      row.forEach((cell, index) => { if (index) page.drawLine({ start: { x: cx, y: H - rowTop }, end: { x: cx, y: H - rowTop - rowHeight }, thickness: .5, color: line }); write(fit(regular, cell, 12, widths[index] - 8), cx + 4, rowTop + ((rowHeight - 12) / 2), 12); cx += widths[index] })
    })
  }

  const first = addPage(1, true)
  const form = pdf.getForm()
  const addXpField = (label, value, name, x) => {
    first.write(label, x, 88, 12, bold, green)
    const field = form.createTextField(name); field.setText(String(number(value))); field.addToPage(first.page, { x: x + 62, y: first.H - 104, width: 52, height: 23, font: regular, textColor: ink, backgroundColor: white, borderColor: line, borderWidth: 1 }); field.setFontSize(14)
  }
  addXpField('TOTAL XP', character.totalXp, 'total_xp', 352); addXpField('UNSPENT XP', character.unspentXp, 'unspent_xp', 470)

  section(first, 'COMBAT SUMMARY', 24, 120, 564, 112, 'C')
  const combat = [['Initiative', signed(computed.initiative)], ['HP', `${number(character.currentHp)} / ${computed.maxHp}`], ['Defense', computed.defense], ['Resilience', signed(computed.resilience)], ['Ego', signed(computed.ego)], ['Energy', `${number(character.currentEnergy)} / ${computed.maxEnergy}`], ['Max Force', computed.maxForce]]
  combat.forEach(([label, value], index) => valueBox(first, label, value, 34 + (index * 79), 160, 68, 39))

  section(first, 'ATTACK', 24, 244, 564, 118, 'A')
  const attack = number(character.attackSkill)
  ;[['Attack Skill', signedEntry(character.attackSkill)], ['Melee Mod', signedEntry(character.meleeAttackModifier)], ['Melee Total', signed(number(character.stats.strength) + attack + number(character.meleeAttackModifier))], ['Ranged Mod', signedEntry(character.rangedAttackModifier)], ['Ranged Total', signed(number(character.stats.dexterity) + attack + number(character.rangedAttackModifier))]].forEach(([label, value], index) => valueBox(first, label, value, 37 + (index * 110), 286, 96, 42))

  section(first, 'STATS', 24, 374, 180, 368, 'S')
  table(first, 30, 414, [116, 48], ['Stat', 'Score'], stats.map(([key, label, short]) => [`${label} (${short})`, signedEntry(character.stats[key])]), 50)
  section(first, 'SKILLS', 216, 374, 372, 368, '*')
  const skillRows = skills.map(([key, label, statKey]) => { const entry = character.skills[key] || {}; const statShort = stats.find(([candidate]) => candidate === statKey)?.[2] || ''; const total = number(character.stats[statKey]) + Object.values(entry).reduce((sum, value) => sum + number(value), 0); return [label, statShort, signedEntry(entry.ability), signedEntry(entry.modifier), signedEntry(entry.buffs), signedEntry(entry.debuffs), signed(total)] })
  table(first, 222, 414, [84, 39, 48, 50, 43, 54, 42], ['Skill', 'Stat', 'Ability', 'Mod', 'Buffs', 'Debuffs', 'Total'], skillRows, 37)

  const second = addPage(2)
  const weaponRows = (character.weapons || []).slice(0, 6).map(weapon => { const type = weaponTypes.find(([name]) => name === weapon.type) || weaponTypes[0]; const stat = type[1] === 'melee' ? character.stats.strength : character.stats.dexterity; return [text(weapon.name), text(weapon.type), `d${type[2]} ${signed(number(stat) + number(weapon.enhancement))}`, text(weapon.notes)] })
  while (weaponRows.length < 6) weaponRows.push(['', '', '', ''])
  section(second, 'WEAPONS', 24, 66, 564, 236, 'W'); table(second, 30, 106, [150, 145, 82, 175], ['Weapon', 'Type', 'Damage', 'Notes'], weaponRows, 30)

  const talentRows = (character.talents || []).slice(0, 6).map(row => [text(row.name), text(row.ability), text(row.duration), text(row.notes)])
  while (talentRows.length < 6) talentRows.push(['', '', '', ''])
  section(second, 'TALENTS', 24, 314, 564, 236, 'T'); table(second, 30, 354, [150, 130, 90, 182], ['Talent', 'Ability / Cost', 'Duration', 'Notes'], talentRows, 30)

  const itemRows = (character.items || []).slice(0, 4).map(row => [text(row.name), text(row.description ?? [row.bonus, row.appliesTo].filter(Boolean).join(' - '))])
  const contactRows = (character.contacts || []).slice(0, 4).map(row => [text(row.name), text(row.role)])
  while (itemRows.length < 4) itemRows.push(['', '']); while (contactRows.length < 4) contactRows.push(['', ''])
  section(second, 'ITEMS & TRAITS', 24, 562, 276, 142, 'I'); table(second, 30, 602, [105, 159], ['Name', 'Description'], itemRows, 23)
  section(second, 'CONTACTS', 312, 562, 276, 142, 'C'); table(second, 318, 602, [105, 159], ['Name', 'Relationship / Role'], contactRows, 23)
  section(second, 'SESSION NOTES', 24, 714, 564, 48, 'N')
  second.write(fit(regular, text(character.notes).replace(/\s+/g, ' '), 12, 520), 58, 747, 12, regular)

  const bytes = await pdf.save()
  const blob = new Blob([bytes], { type: 'application/pdf' }); const url = URL.createObjectURL(blob); const link = document.createElement('a')
  link.href = url; link.download = `${safeName(character.name)}-Character-Sheet.pdf`; link.click(); window.setTimeout(() => URL.revokeObjectURL(url), 1000)
}
