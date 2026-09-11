const characterSets = new WeakMap()
const replacements = { '−': '-', '‐': '-', '‑': '-', '→': '->', '←': '<-', '≥': '>=', '≤': '<=', '≠': '!=', '\t': ' ' }

// Standard PDF fonts use WinAnsi. Normalize export text without changing saved heroes.
export function pdfText(font, value) {
  if (!characterSets.has(font)) characterSets.set(font, new Set(font.getCharacterSet()))
  const supported = characterSets.get(font)
  return Array.from(String(value ?? '').normalize('NFC').replace(/\r\n?/g, '\n'), character => {
    if (character === '\n') return character
    if (replacements[character]) return replacements[character]
    if (supported.has(character.codePointAt(0))) return character
    const fallback = character.normalize('NFKD').replace(/\p{Mark}/gu, '')
    return Array.from(fallback, letter => supported.has(letter.codePointAt(0)) ? letter : '?').join('')
  }).join('')
}
