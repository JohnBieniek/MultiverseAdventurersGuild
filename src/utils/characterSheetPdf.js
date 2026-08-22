import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

const ink = [31, 42, 36]
const green = [38, 82, 62]
const gold = [188, 139, 55]
const paper = [250, 248, 240]
const number = value => Number(value) || 0
const signed = value => `${number(value) >= 0 ? '+' : ''}${number(value)}`
const text = value => String(value ?? '').trim() || '—'
const safeName = value => (value || 'Hero').replace(/[<>:"/\\|?*]+/g, '-').trim() || 'Hero'

export function downloadCharacterSheetPdf({ character, computed, stats, skills, weaponTypes }) {
  const doc = new jsPDF({ unit: 'pt', format: 'letter', compress: true })
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 38
  const contentWidth = pageWidth - (margin * 2)
  let y = margin

  const addPage = () => { doc.addPage(); y = margin }
  const ensure = height => { if (y + height > pageHeight - 42) addPage() }
  const section = (title, detail = '') => {
    ensure(34)
    doc.setFillColor(...green)
    doc.roundedRect(margin, y, contentWidth, 26, 4, 4, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFont('helvetica', 'bold'); doc.setFontSize(14)
    doc.text(title, margin + 10, y + 18)
    if (detail) { doc.setFont('helvetica', 'normal'); doc.setFontSize(12); doc.text(detail, pageWidth - margin - 10, y + 18, { align: 'right' }) }
    doc.setTextColor(...ink)
    y += 32
  }
  const table = (head, body, widths = {}) => {
    autoTable(doc, {
      startY: y, margin: { left: margin, right: margin, bottom: 42 },
      head: [head], body, theme: 'grid',
      styles: { font: 'helvetica', fontSize: 12, cellPadding: 5, textColor: ink, lineColor: [205, 211, 204], lineWidth: .5, overflow: 'linebreak' },
      headStyles: { fillColor: paper, textColor: green, fontStyle: 'bold', fontSize: 12 },
      alternateRowStyles: { fillColor: [253, 252, 247] },
      columnStyles: widths,
    })
    y = doc.lastAutoTable.finalY + 10
  }

  doc.setFillColor(...green); doc.rect(0, 0, pageWidth, 112, 'F')
  doc.setFillColor(...gold); doc.rect(0, 108, pageWidth, 4, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFont('helvetica', 'bold'); doc.setFontSize(14)
  doc.text('MULTIVERSE ADVENTURERS GUILD', margin, 34)
  doc.setFontSize(25); doc.text(text(character.name), margin, 66)
  doc.setFont('helvetica', 'normal'); doc.setFontSize(14)
  doc.text([text(character.species), text(character.archetype)].join('  •  '), margin, 91)
  doc.setFont('helvetica', 'bold'); doc.text(`LEVEL ${computed.level}`, pageWidth - margin, 48, { align: 'right' })
  doc.setFont('helvetica', 'normal'); doc.text(`Total XP ${number(character.totalXp)}   •   Unspent ${number(character.unspentXp)}`, pageWidth - margin, 75, { align: 'right' })
  doc.setTextColor(...ink); y = 132

  section('Combat Summary')
  table(['Initiative', 'HP', 'Defense', 'Resilience', 'Ego', 'Energy', 'Max Force'], [[
    signed(computed.initiative), `${number(character.currentHp)} / ${computed.maxHp}`, computed.defense,
    signed(computed.resilience), signed(computed.ego), `${number(character.currentEnergy)} / ${computed.maxEnergy}`, computed.maxForce,
  ]])

  section('Stats & Skills')
  const skillRows = skills.map(([key, label, statKey]) => {
    const entry = character.skills[key] || {}
    const statLabel = stats.find(([candidate]) => candidate === statKey)?.[2] || statKey
    const total = number(character.stats[statKey]) + Object.values(entry).reduce((sum, value) => sum + number(value), 0)
    return [label, statLabel, signed(entry.ability), signed(entry.modifier), signed(entry.buffs), signed(entry.debuffs), signed(total)]
  })
  table(['Stat', 'Score', 'Skill', 'Stat', 'Ability', 'Mod / Buff / Debuff', 'Total'], stats.map(([key, label], index) => {
    const skill = skillRows[index] || ['', '', '', '', '', '', '']
    return [label, signed(character.stats[key]), skill[0], skill[1], skill[2], `${skill[3]} / ${skill[4]} / ${skill[5]}`, skill[6]]
  }), { 0: { cellWidth: 72 }, 1: { cellWidth: 42 }, 2: { cellWidth: 80 }, 3: { cellWidth: 38 }, 4: { cellWidth: 48 }, 6: { cellWidth: 42 } })
  if (skillRows.length > stats.length) table(['Skill', 'Stat', 'Ability', 'Modifier', 'Buffs', 'Debuffs', 'Total'], skillRows.slice(stats.length))

  section('Attack')
  const attack = number(character.attackSkill)
  table(['Attack Skill', 'Melee Modifier', 'Melee Total', 'Ranged Modifier', 'Ranged Total'], [[signed(attack), signed(character.meleeAttackModifier), signed(number(character.stats.strength) + attack + number(character.meleeAttackModifier)), signed(character.rangedAttackModifier), signed(number(character.stats.dexterity) + attack + number(character.rangedAttackModifier))]])

  section('Weapons')
  table(['Name', 'Type', 'Enhancement', 'Damage', 'Notes'], (character.weapons || []).map(weapon => {
    const type = weaponTypes.find(([name]) => name === weapon.type) || weaponTypes[0]
    const stat = type[1] === 'melee' ? character.stats.strength : character.stats.dexterity
    return [text(weapon.name), text(weapon.type), signed(weapon.enhancement), `d${type[2]} ${signed(number(stat) + number(weapon.enhancement))}`, text(weapon.notes)]
  }), { 0: { cellWidth: 90 }, 1: { cellWidth: 105 }, 2: { cellWidth: 75 }, 3: { cellWidth: 70 } })

  section('Talents', `Combat Slots: ${computed.slots}`)
  table(['Talent', 'Ability / Cost', 'Duration', 'Notes'], (character.talents || []).map(row => [text(row.name), text(row.ability), text(row.duration), text(row.notes)]), { 0: { cellWidth: 115 }, 1: { cellWidth: 105 }, 2: { cellWidth: 80 } })

  section('Items & Traits')
  table(['Item / Trait', 'Description'], (character.items || []).map(row => [text(row.name), text(row.description ?? [row.bonus, row.appliesTo].filter(Boolean).join(' — '))]), { 0: { cellWidth: 155 } })

  section('Contacts')
  table(['Name', 'Relationship / Role'], (character.contacts || []).map(row => [text(row.name), text(row.role)]), { 0: { cellWidth: 180 } })

  if (String(character.notes || '').trim()) {
    section('Session Notes')
    doc.setFont('helvetica', 'normal'); doc.setFontSize(14)
    const lines = doc.splitTextToSize(character.notes, contentWidth - 16)
    const lineHeight = 18
    lines.forEach(line => { ensure(lineHeight); doc.text(line, margin + 8, y + 13); y += lineHeight })
  }

  const pages = doc.getNumberOfPages()
  for (let page = 1; page <= pages; page += 1) {
    doc.setPage(page); doc.setDrawColor(...gold); doc.line(margin, pageHeight - 29, pageWidth - margin, pageHeight - 29)
    doc.setFont('helvetica', 'normal'); doc.setFontSize(12); doc.setTextColor(90, 98, 92)
    doc.text(`${text(character.name)}  •  Character Sheet`, margin, pageHeight - 15)
    doc.text(`${page} / ${pages}`, pageWidth - margin, pageHeight - 15, { align: 'right' })
  }
  doc.save(`${safeName(character.name)}-Character-Sheet.pdf`)
}
