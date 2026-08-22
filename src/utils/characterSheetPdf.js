import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

const ink = [31, 42, 36], green = [38, 82, 62], gold = [188, 139, 55], paper = [250, 248, 240]
const number = value => Number(value) || 0
const signed = value => `${number(value) >= 0 ? '+' : ''}${number(value)}`
const signedEntry = value => value === '' || value == null ? '' : signed(value)
const text = value => String(value ?? '').trim()
const safeName = value => (value || 'Hero').replace(/[<>:"/\\|?*]+/g, '-').trim() || 'Hero'
const loadImage = source => new Promise((resolve, reject) => { const image = new Image(); image.onload = () => resolve(image); image.onerror = reject; image.src = source })

const drawStar = (doc, x, y, radius = 7) => {
  const points = Array.from({ length: 10 }, (_, index) => { const angle = (-Math.PI / 2) + (index * Math.PI / 5); const distance = index % 2 ? radius * .42 : radius; return [x + Math.cos(angle) * distance, y + Math.sin(angle) * distance] })
  points.forEach(([px, py], index) => { const [nextX, nextY] = points[(index + 1) % points.length]; doc.line(px, py, nextX, nextY) })
}
const drawIcon = (doc, kind, x, y) => {
  doc.setDrawColor(...green); doc.setFillColor(...green); doc.setLineWidth(1.5)
  if (kind === 'skills') return drawStar(doc, x, y)
  if (kind === 'strength') { doc.line(x - 7, y + 5, x - 2, y - 2); doc.line(x - 2, y - 2, x + 2, y + 2); doc.circle(x + 5, y - 2, 3); doc.line(x + 2, y + 2, x + 7, y + 5); return }
  if (kind === 'dexterity') { doc.line(x - 6, y + 6, x - 4, y - 4); doc.line(x - 2, y + 3, x, y - 6); doc.line(x + 1, y + 3, x + 4, y - 5); doc.line(x + 3, y + 4, x + 7, y - 2); return }
  if (kind === 'endurance') { doc.circle(x, y, 6); doc.line(x - 4, y, x - 1, y); doc.line(x - 1, y, x + 1, y - 3); doc.line(x + 1, y - 3, x + 3, y + 3); doc.line(x + 3, y + 3, x + 6, y + 3); return }
  if (kind === 'intuition') { doc.circle(x, y - 2, 5); doc.line(x - 3, y + 4, x + 3, y + 4); doc.line(x - 2, y + 7, x + 2, y + 7); return }
  if (kind === 'education') { doc.rect(x - 7, y - 6, 6, 12); doc.rect(x + 1, y - 6, 6, 12); doc.line(x, y - 5, x, y + 6); return }
  if (kind === 'charisma') { doc.circle(x, y - 1, 6); doc.circle(x - 2, y - 2, .5, 'F'); doc.circle(x + 2, y - 2, .5, 'F'); doc.line(x - 3, y + 2, x + 3, y + 2); return }
  if (['combat', 'attack', 'weapons'].includes(kind)) { doc.line(x - 6, y + 6, x + 5, y - 5); doc.line(x - 3, y + 6, x + 7, y - 4); doc.line(x + 2, y - 5, x + 6, y - 1); return }
  if (kind === 'talents') { doc.circle(x, y, 3); for (let i = 0; i < 8; i += 1) { const a = i * Math.PI / 4; doc.line(x + Math.cos(a) * 5, y + Math.sin(a) * 5, x + Math.cos(a) * 8, y + Math.sin(a) * 8) } return }
  if (kind === 'items') { doc.line(x - 4, y - 7, x + 4, y - 7); doc.line(x - 2, y - 7, x - 2, y - 2); doc.line(x + 2, y - 7, x + 2, y - 2); doc.line(x - 2, y - 2, x - 6, y + 7); doc.line(x + 2, y - 2, x + 6, y + 7); doc.line(x - 6, y + 7, x + 6, y + 7); return }
  if (kind === 'contacts') { doc.circle(x - 3, y - 3, 3); doc.circle(x + 4, y - 2, 2.5); doc.line(x - 8, y + 6, x + 1, y + 6); doc.line(x + 1, y + 5, x + 8, y + 5); return }
  if (kind === 'notes') { doc.rect(x - 6, y - 7, 12, 14); doc.line(x - 3, y - 3, x + 3, y - 3); doc.line(x - 3, y + 1, x + 3, y + 1); return }
  doc.circle(x, y, 6)
}

export async function downloadCharacterSheetPdf({ character, computed, stats, skills, weaponTypes }) {
  const doc = new jsPDF({ unit: 'pt', format: 'letter', compress: true })
  const pageWidth = doc.internal.pageSize.getWidth(), pageHeight = doc.internal.pageSize.getHeight(), margin = 38, contentWidth = pageWidth - (margin * 2)
  let y = margin
  const addPage = () => { doc.addPage(); y = margin }
  const ensure = height => { if (y + height > pageHeight - 42) addPage() }
  const section = (title, icon, detail = '') => {
    ensure(34); doc.setFillColor(...green); doc.roundedRect(margin, y, contentWidth, 28, 4, 4, 'F'); doc.setFillColor(255, 255, 255); doc.circle(margin + 15, y + 14, 10, 'F'); drawIcon(doc, icon, margin + 15, y + 14)
    doc.setTextColor(255, 255, 255); doc.setFont('helvetica', 'bold'); doc.setFontSize(14); doc.text(title, margin + 31, y + 19)
    if (detail) { doc.setFont('helvetica', 'normal'); doc.setFontSize(12); doc.text(detail, pageWidth - margin - 10, y + 19, { align: 'right' }) }
    doc.setTextColor(...ink); y += 34
  }
  const table = (head, body, widths = {}, options = {}) => {
    autoTable(doc, { startY: y, margin: { left: margin, right: margin, bottom: 42 }, head: [head], body, theme: 'grid', styles: { font: 'helvetica', fontSize: 12, cellPadding: 5, textColor: ink, lineColor: [205, 211, 204], lineWidth: .5, overflow: 'linebreak' }, headStyles: { fillColor: paper, textColor: green, fontStyle: 'bold', fontSize: 12 }, alternateRowStyles: { fillColor: [253, 252, 247] }, columnStyles: widths, ...options })
    y = doc.lastAutoTable.finalY + 10
  }

  doc.setFillColor(...green); doc.rect(0, 0, pageWidth, 126, 'F'); doc.setFillColor(...gold); doc.rect(0, 122, pageWidth, 4, 'F')
  try { const logo = await loadImage('/multiverse%20adventurers%20guild%20icon.png'); doc.addImage(logo, 'PNG', margin, 19, 76, 76) } catch { /* Keep generating if the image is unavailable. */ }
  doc.setTextColor(255, 255, 255); doc.setFont('helvetica', 'bold'); doc.setFontSize(14); doc.text('MULTIVERSE ADVENTURERS GUILD', margin + 90, 35)
  doc.setFontSize(25); doc.text(text(character.name) || 'Character Sheet', margin + 90, 68); doc.setFont('helvetica', 'normal'); doc.setFontSize(14); doc.text([text(character.species), text(character.archetype)].filter(Boolean).join('  /  '), margin + 90, 94)
  doc.setFont('helvetica', 'bold'); doc.text(`LEVEL ${computed.level}`, pageWidth - margin, 31, { align: 'right' })
  const addXpField = (label, value, x, fieldName) => {
    doc.setFontSize(12); doc.text(label, x, 53); const field = new doc.AcroForm.TextField(); field.fieldName = fieldName; field.Rect = [x, 59, 78, 27]; field.value = String(number(value)); field.defaultValue = field.value; field.fontSize = 14; field.textAlign = 'center'; field.showWhenPrinted = true; doc.addField(field)
  }
  addXpField('TOTAL XP', character.totalXp, pageWidth - margin - 174, 'total_xp'); addXpField('UNSPENT XP', character.unspentXp, pageWidth - margin - 78, 'unspent_xp')
  doc.setTextColor(...ink); y = 145

  section('Combat Summary', 'combat'); table(['Initiative', 'HP', 'Defense', 'Resilience', 'Ego', 'Energy', 'Max Force'], [[signed(computed.initiative), `${number(character.currentHp)} / ${computed.maxHp}`, computed.defense, signed(computed.resilience), signed(computed.ego), `${number(character.currentEnergy)} / ${computed.maxEnergy}`, computed.maxForce]])
  section('Stats', 'strength'); table(['', 'Stat', 'Score'], stats.map(([key, label]) => ['', label, signedEntry(character.stats[key])]), { 0: { cellWidth: 28 }, 2: { cellWidth: 90, overflow: 'hidden' } }, { didDrawCell: data => { if (data.section === 'body' && data.column.index === 0) drawIcon(doc, stats[data.row.index][0], data.cell.x + 14, data.cell.y + (data.cell.height / 2)) } })

  section('Skills', 'skills', 'All skills'); const skillRows = skills.map(([key, label, statKey]) => { const entry = character.skills[key] || {}; const statLabel = stats.find(([candidate]) => candidate === statKey)?.[2] || statKey; const total = number(character.stats[statKey]) + Object.values(entry).reduce((sum, value) => sum + number(value), 0); return ['', label, statLabel, signedEntry(entry.ability), signedEntry(entry.modifier), signedEntry(entry.buffs), signedEntry(entry.debuffs), signed(total)] })
  table(['', 'Skill', 'Stat', 'Ability', 'Modifier', 'Buffs', 'Debuffs', 'Total'], skillRows, { 0: { cellWidth: 25 }, 1: { cellWidth: 85 }, 2: { cellWidth: 38 }, 3: { cellWidth: 52 }, 4: { cellWidth: 55 }, 5: { cellWidth: 45 }, 6: { cellWidth: 55 }, 7: { cellWidth: 45 } }, { didDrawCell: data => { if (data.section === 'body' && data.column.index === 0) drawIcon(doc, 'skills', data.cell.x + 13, data.cell.y + (data.cell.height / 2), 5) } })

  section('Attack', 'attack'); const attack = number(character.attackSkill); table(['Attack Skill', 'Melee Modifier', 'Melee Total', 'Ranged Modifier', 'Ranged Total'], [[signedEntry(character.attackSkill), signedEntry(character.meleeAttackModifier), signed(number(character.stats.strength) + attack + number(character.meleeAttackModifier)), signedEntry(character.rangedAttackModifier), signed(number(character.stats.dexterity) + attack + number(character.rangedAttackModifier))]])
  section('Weapons', 'weapons'); table(['Name', 'Type', 'Enhancement', 'Damage', 'Notes'], (character.weapons || []).map(weapon => { const type = weaponTypes.find(([name]) => name === weapon.type) || weaponTypes[0]; const stat = type[1] === 'melee' ? character.stats.strength : character.stats.dexterity; return [text(weapon.name), text(weapon.type), signedEntry(weapon.enhancement), `d${type[2]} ${signed(number(stat) + number(weapon.enhancement))}`, text(weapon.notes)] }), { 0: { cellWidth: 90 }, 1: { cellWidth: 105 }, 2: { cellWidth: 75 }, 3: { cellWidth: 70 } })
  section('Talents', 'talents', `Combat Slots: ${computed.slots}`); table(['Talent', 'Ability / Cost', 'Duration', 'Notes'], (character.talents || []).map(row => [text(row.name), text(row.ability), text(row.duration), text(row.notes)]), { 0: { cellWidth: 115 }, 1: { cellWidth: 105 }, 2: { cellWidth: 80 } })
  section('Items & Traits', 'items'); table(['Item / Trait', 'Description'], (character.items || []).map(row => [text(row.name), text(row.description ?? [row.bonus, row.appliesTo].filter(Boolean).join(' - '))]), { 0: { cellWidth: 155 } })
  section('Contacts', 'contacts'); table(['Name', 'Relationship / Role'], (character.contacts || []).map(row => [text(row.name), text(row.role)]), { 0: { cellWidth: 180 } })
  if (text(character.notes)) { section('Session Notes', 'notes'); doc.setFont('helvetica', 'normal'); doc.setFontSize(14); doc.splitTextToSize(character.notes, contentWidth - 16).forEach(line => { ensure(18); doc.text(line, margin + 8, y + 13); y += 18 }) }

  const pages = doc.getNumberOfPages(); for (let page = 1; page <= pages; page += 1) { doc.setPage(page); doc.setDrawColor(...gold); doc.line(margin, pageHeight - 29, pageWidth - margin, pageHeight - 29); doc.setFont('helvetica', 'normal'); doc.setFontSize(12); doc.setTextColor(90, 98, 92); doc.text(`${text(character.name) || 'Hero'}  /  Character Sheet`, margin, pageHeight - 15); doc.text(`${page} / ${pages}`, pageWidth - margin, pageHeight - 15, { align: 'right' }) }
  doc.save(`${safeName(character.name)}-Character-Sheet.pdf`)
}
