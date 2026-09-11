import assert from 'node:assert/strict'
import { PDFDocument, StandardFonts } from 'pdf-lib'
import { pdfText } from '../src/utils/pdfText.js'

const pdf = await PDFDocument.create()
const font = await pdf.embedFont(StandardFonts.Helvetica)
const original = 'Cannot be concealed; −2 Defense while using it.'
assert.throws(() => font.widthOfTextAtSize(original, 10), /WinAnsi/)
assert.equal(pdfText(font, original), 'Cannot be concealed; -2 Defense while using it.')
assert.equal(pdfText(font, 'Renée’s café — £5'), 'Renée’s café — £5')
assert.equal(pdfText(font, 'Cafe\u0301\r\n−2 → ≥3'), 'Café\n-2 -> >=3')

const page = pdf.addPage()
const form = pdf.getForm()
for (const [index, value] of [original, 'Hero 🐉 漢字', 'Łukasz\n≤ 2', 'Notes: −1\nNext turn'].entries()) {
  const normalized = pdfText(font, value)
  for (const line of normalized.split('\n')) assert.doesNotThrow(() => font.widthOfTextAtSize(line, 10))
  page.drawText(normalized, { font, size: 10 })
  const field = form.createTextField(`regression_${index}`)
  field.enableMultiline()
  field.setText(normalized)
  field.addToPage(page, { font, x: 10, y: 100 + index * 50, width: 400, height: 40 })
}
form.updateFieldAppearances(font)
const bytes = await pdf.save()
assert.equal((await PDFDocument.load(bytes)).getForm().getTextField('regression_0').getText(), pdfText(font, original))
console.log('PDF text regression checks passed, including saved form appearances.')
