import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useLocation, useNavigate } from 'react-router-dom'
import './CommandInterface.css'

const STORE_KEY = 'mag-playable-characters-v1'
const ACTIVE_CHARACTER_KEY = 'mag-active-character-v1'
const SPEECH_KEY = 'mag-command-spoken-responses-v1'
const VOSK_MODEL_URL = 'https://ccoreilly.github.io/vosk-browser/models/vosk-model-small-en-us-0.15.tar.gz'

const destinations = [
  { label: 'Home', path: '/', terms: 'home welcome guild start' },
  { label: 'Rules', path: '/rules', terms: 'rules dice rolls combat initiative action economy level progression force energy vehicles credits' },
  { label: 'Players', path: '/players', terms: 'players create hero character creation' },
  { label: 'Talents', path: '/players#talents', terms: 'talents powers spells abilities healing heal arcane force' },
  { label: 'Skills', path: '/players#skills', terms: 'skills attack athletics sneak observation influence technology outdoors vehicle' },
  { label: 'Weapons', path: '/players#weapons', terms: 'weapons melee ranged damage range holdout compact longarm heavy' },
  { label: 'Species', path: '/players#species', terms: 'species ancestry race' },
  { label: 'Archetypes', path: '/players#archetypes', terms: 'archetypes character type class role' },
  { label: 'Contacts', path: '/players#contacts', terms: 'contacts allies people information' },
  { label: 'Game Masters', path: '/gm', terms: 'game master gm creatures monsters minions adventures' },
  { label: 'Character Sheets', path: '/character-sheet', terms: 'characters heroes sheet hp health defense experience xp weapons talents contacts' },
  { label: 'Contact Us', path: '/contact', terms: 'contact email feedback message' },
]

const normalize = value => String(value || '').normalize('NFKD').replace(/[\u0300-\u036f]/g, '').trim().toLowerCase().replace(/[^a-z0-9\s'-]/g, '').replace(/\s+/g, ' ')
const compactName = value => normalize(value).replace(/[^a-z0-9]/g, '')
const soundex = value => {
  const letters = normalize(value).replace(/[^a-z]/g, '')
  if (!letters) return ''
  const codes = { b: 1, f: 1, p: 1, v: 1, c: 2, g: 2, j: 2, k: 2, q: 2, s: 2, x: 2, z: 2, d: 3, t: 3, l: 4, m: 5, n: 5, r: 6 }
  let previous = codes[letters[0]] || 0
  let result = letters[0].toUpperCase()
  for (const letter of letters.slice(1)) {
    const code = codes[letter] || 0
    if (code && code !== previous) result += code
    previous = code
  }
  return `${result}000`.slice(0, 4)
}
const phoneticName = value => normalize(value).split(/[\s'-]+/).filter(Boolean).map(soundex).join(' ')
const editDistance = (left, right) => {
  const row = Array.from({ length: right.length + 1 }, (_, index) => index)
  for (let leftIndex = 1; leftIndex <= left.length; leftIndex += 1) {
    let diagonal = row[0]
    row[0] = leftIndex
    for (let rightIndex = 1; rightIndex <= right.length; rightIndex += 1) {
      const above = row[rightIndex]
      row[rightIndex] = Math.min(row[rightIndex] + 1, row[rightIndex - 1] + 1, diagonal + (left[leftIndex - 1] === right[rightIndex - 1] ? 0 : 1))
      diagonal = above
    }
  }
  return row[right.length]
}
const characterMatchScore = (name, query) => {
  const saved = compactName(name)
  const requested = compactName(query)
  if (!saved || !requested) return Infinity
  if (saved === requested) return 0
  if (saved.includes(requested) || requested.includes(saved)) return 1
  const distance = editDistance(saved, requested)
  const savedWords = normalize(name).split(/[\s'-]+/).filter(Boolean)
  const requestedWords = normalize(query).split(/[\s'-]+/).filter(Boolean)
  if (savedWords.length === requestedWords.length && savedWords.every((word, index) => editDistance(word, requestedWords[index]) <= 1)) return 1.5
  if (distance <= 2) return 2 + (distance / Math.max(saved.length, requested.length))
  if (phoneticName(name) === phoneticName(query)) return 2.5
  if (distance <= 4 && distance / Math.max(saved.length, requested.length) <= .32) return 3 + (distance / Math.max(saved.length, requested.length))
  return Infinity
}
const savedCharacters = () => {
  try { return JSON.parse(localStorage.getItem(STORE_KEY)) || [] } catch { return [] }
}
const matchingCharacters = query => savedCharacters().map(character => ({ character, score: characterMatchScore(character.name, query) })).filter(match => Number.isFinite(match.score)).sort((left, right) => left.score - right.score)
const numberWords = { zero: 0, one: 1, two: 2, to: 2, too: 2, three: 3, four: 4, for: 4, five: 5, six: 6, seven: 7, eight: 8, ate: 8, nine: 9, ten: 10, eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17, eighteen: 18, nineteen: 19, twenty: 20 }
const spokenNumber = value => /^\d+$/.test(String(value)) ? Number(value) : numberWords[normalize(value)]
const signedSpokenNumber = value => {
  const normalized = normalize(value)
  const negative = /^(?:minus|negative)\s+/.test(normalized)
  const unsigned = normalized.replace(/^(?:minus|negative|plus|positive)\s+/, '')
  const amount = spokenNumber(unsigned)
  return amount == null ? undefined : amount * (negative ? -1 : 1)
}

function CommandInterface() {
  const navigate = useNavigate()
  const location = useLocation()
  const triggerRef = useRef(null)
  const inputRef = useRef(null)
  const recognitionRef = useRef(null)
  const recognitionRunningRef = useRef(false)
  const keepListeningRef = useRef(false)
  const lastResponseRef = useRef('')
  const speechActiveRef = useRef(false)
  const speechGenerationRef = useRef(0)
  const ignoreSpeechUntilRef = useRef(0)
  const restartTimerRef = useRef(null)
  const mobileCommandTimerRef = useRef(null)
  const localModelRef = useRef(null)
  const localRecognizerRef = useRef(null)
  const localStreamRef = useRef(null)
  const localAudioContextRef = useRef(null)
  const localSourceRef = useRef(null)
  const localProcessorRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [command, setCommand] = useState('')
  const [status, setStatus] = useState('')
  const [results, setResults] = useState([])
  const [listening, setListening] = useState(false)
  const [spoken, setSpoken] = useState(() => localStorage.getItem(SPEECH_KEY) === 'true')
  const localRecognitionSupported = typeof window !== 'undefined' && Boolean(navigator.mediaDevices?.getUserMedia && (window.AudioContext || window.webkitAudioContext) && window.WebAssembly)
  const recognitionSupported = localRecognitionSupported || (typeof window !== 'undefined' && Boolean(window.SpeechRecognition || window.webkitSpeechRecognition))
  const onCharacterSheet = location.pathname === '/character-sheet'

  const characterCommand = request => {
    let response = ''
    window.dispatchEvent(new CustomEvent('mag-character-command', { detail: { ...request, reply: message => { response = message } } }))
    return response || 'Open a saved Hero on the Character Sheet before using that command.'
  }

  const resumeRecognition = (delay = 250) => {
    window.clearTimeout(restartTimerRef.current)
    restartTimerRef.current = window.setTimeout(() => {
      if (!keepListeningRef.current || speechActiveRef.current || !recognitionRef.current) return
      try { recognitionRef.current.start() } catch {
        restartTimerRef.current = window.setTimeout(() => resumeRecognition(0), 300)
      }
    }, delay)
  }
  const stopLocalRecognition = ({ releaseModel = false } = {}) => {
    localProcessorRef.current?.disconnect()
    localSourceRef.current?.disconnect()
    localRecognizerRef.current?.remove()
    localStreamRef.current?.getTracks().forEach(track => track.stop())
    localAudioContextRef.current?.close()
    localProcessorRef.current = null
    localSourceRef.current = null
    localRecognizerRef.current = null
    localStreamRef.current = null
    localAudioContextRef.current = null
    recognitionRunningRef.current = false
    if (releaseModel) {
      localModelRef.current?.terminate()
      localModelRef.current = null
    }
  }
  const speak = message => {
    if (!spoken || !window.speechSynthesis) return
    const generation = speechGenerationRef.current + 1
    speechGenerationRef.current = generation
    speechActiveRef.current = true
    ignoreSpeechUntilRef.current = Infinity
    const localAudioContext = localAudioContextRef.current
    if (localAudioContext?.state === 'running') localAudioContext.suspend().catch(() => {})
    const preserveMobileRecognition = window.matchMedia('(max-width: 768px)').matches && (recognitionRunningRef.current || Boolean(localAudioContext))
    if (!preserveMobileRecognition) recognitionRef.current?.abort()
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(message)
    const finished = () => {
      if (speechGenerationRef.current !== generation) return
      speechActiveRef.current = false
      ignoreSpeechUntilRef.current = Date.now() + 900
      if (keepListeningRef.current && localAudioContext?.state === 'suspended') {
        window.setTimeout(() => localAudioContext.resume().catch(() => {}), 900)
      }
      if (keepListeningRef.current && !recognitionRunningRef.current) resumeRecognition(950)
    }
    utterance.onend = finished
    utterance.onerror = finished
    window.speechSynthesis.speak(utterance)
  }
  const respond = message => {
    lastResponseRef.current = message
    setStatus(message)
    speak(message)
  }
  const close = () => {
    keepListeningRef.current = false
    speechGenerationRef.current += 1
    speechActiveRef.current = false
    window.clearTimeout(restartTimerRef.current)
    window.clearTimeout(mobileCommandTimerRef.current)
    recognitionRef.current?.stop()
    stopLocalRecognition()
    window.speechSynthesis?.cancel()
    setListening(false)
    setOpen(false)
    window.setTimeout(() => triggerRef.current?.focus(), 0)
  }
  const completeNavigation = (path, message, character = null) => {
    keepListeningRef.current = false
    recognitionRef.current?.stop()
    stopLocalRecognition()
    setListening(false)
    if (character) {
      localStorage.setItem(ACTIVE_CHARACTER_KEY, character.id)
      window.dispatchEvent(new CustomEvent('mag-open-character', { detail: { id: character.id } }))
    }
    navigate(path)
    setOpen(false)
    respond(message)
    window.setTimeout(() => {
      const hash = path.includes('#') ? path.slice(path.indexOf('#') + 1) : ''
      const target = (hash && document.getElementById(hash)) || document.querySelector('.main-content h1')
      if (target) { target.tabIndex = -1; target.scrollIntoView({ block: 'start' }); target.focus() }
    }, 100)
  }
  const search = term => {
    const query = normalize(term)
    const characterQuery = query.replace(/^(?:a\s+)?(?:character|hero)\s+/, '')
    const characters = matchingCharacters(characterQuery).map(({ character }) => ({ label: character.name, path: '/character-sheet', character, detail: 'Saved Hero' }))
    const pages = destinations.filter(item => `${normalize(item.label)} ${item.terms}`.includes(query)).map(item => ({ ...item, detail: 'App section' }))
    const matches = [...characters, ...pages].slice(0, 8)
    setResults(matches)
    respond(matches.length ? `Found ${matches.length} result${matches.length === 1 ? '' : 's'} for ${term}.` : `I could not find ${term}.`)
  }
  const execute = rawCommand => {
    const original = String(rawCommand || '').trim()
    const spokenCommand = original.replace(/[?.!,]+$/, '')
    const value = normalize(original)
    setCommand(original)
    setResults([])
    if (!value) { respond('Type or speak a command first.'); return }
    if (['cancel', 'close', 'never mind', 'nevermind'].includes(value)) { close(); return }
    if (['repeat', 'say that again', 'read again'].includes(value)) { speak(lastResponseRef.current || 'There is nothing to repeat yet.'); return }
    if (['help', 'what can i say', 'commands'].includes(value)) {
      respond(onCharacterSheet ? 'On a Character Sheet you can ask about or immediately change your name, Species, Archetype, Level, XP, health, and other scores; roll dice, Skills, defenses, weapon attacks, and damage; add a Talent; heal; or take damage.' : 'You can open a saved Hero by name, open app sections, or search the app. Try: open character Roderick, go to Talents, open Rules, or search for healing.')
      return
    }
    if (onCharacterSheet) {
      const optionListMatch = spokenCommand.match(/^(?:what|which)\s+(skills?|stats?|statistics?)\s+(?:are there|are available|exist|can i use)$/i)
        || spokenCommand.match(/^(?:what|which)\s+are\s+(?:the\s+)?(?:available\s+|all\s+)?(skills?|stats?|statistics?)$/i)
        || spokenCommand.match(/^(?:list|read|name|show|tell me)(?:\s+all|\s+the)?\s+(skills?|stats?|statistics?)$/i)
        || spokenCommand.match(/^(?:available\s+|all\s+)?(skills?|stats?|statistics?)$/i)
      if (optionListMatch) {
        const list = /^skill/i.test(optionListMatch[1]) ? 'skills' : 'stats'
        respond(characterCommand({ intent: 'read-options', list }))
        return
      }
      const combinedItemsMatch = spokenCommand.match(/^(?:list|read|name|show|tell me)(?:\s+all)?\s+(?:of\s+)?(?:my\s+)?items?\s+(?:and|&)\s+traits?$/i)
        || spokenCommand.match(/^(?:what|which)\s+are\s+my\s+items?\s+(?:and|&)\s+traits?$/i)
        || spokenCommand.match(/^(?:what|which)\s+items?\s+(?:and|&)\s+traits?\s+(?:do i have|are listed)$/i)
        || spokenCommand.match(/^my\s+items?\s+(?:and|&)\s+traits?$/i)
      if (combinedItemsMatch) {
        respond(characterCommand({ intent: 'read-list', list: 'items-and-traits' }))
        return
      }
      const listMatch = spokenCommand.match(/^(?:list|read|name|show|tell me)(?:\s+all)?\s+(?:of\s+)?(?:my\s+)?(talents?|contacts?|weapons?|items?|traits?)$/i)
        || spokenCommand.match(/^(?:what|which)\s+(talents?|contacts?|weapons?|items?|traits?)\s+(?:do i have|am i carrying|are listed)$/i)
        || spokenCommand.match(/^(?:what|which|who)\s+are\s+my\s+(talents?|contacts?|weapons?|items?|traits?)$/i)
        || spokenCommand.match(/^my\s+(talents?|contacts?|weapons?|items?|traits?)$/i)
      if (listMatch) {
        const list = normalize(listMatch[1]).replace(/s?$/, 's')
        respond(characterCommand({ intent: 'read-list', list }))
        return
      }
      const weaponTypePattern = String.raw`(unarmed(?:\s*\/\s*tiny)?(?:\s+melee)?|tiny(?:\s+melee)?|light(?:\s+melee)?|medium(?:\s+melee)?|heavy\s+melee|holdout(?:\s+ranged)?|compact(?:\s+ranged)?|long\s*arm(?:\s+ranged)?|heavy\s+ranged)`
      const addWeaponMatch = spokenCommand.match(new RegExp(`^(?:(?:add|create|give me)\\s+)?new\\s+weapon\\s+(.+?)\\s+${weaponTypePattern}$`, 'i'))
        || spokenCommand.match(new RegExp(`^(?:add|create|give me)\\s+(?:a|an)?\\s*(?:${weaponTypePattern}\\s+)?weapon(?:\\s+(?:named|called)\\s+(.+?))?(?:\\s+and\\s+(?:equip|use)\\s+it)?$`, 'i'))
        || spokenCommand.match(new RegExp(`^(?:add|create|give me)\\s+(?:a|an)?\\s*(?:new\\s+)?${weaponTypePattern}(?:\\s+weapon)?(?:\\s+(?:named|called)\\s+(.+?))?(?:\\s+and\\s+(?:equip|use)\\s+it)?$`, 'i'))
        || spokenCommand.match(new RegExp(`^new\\s+${weaponTypePattern}(?:\\s+weapon)?$`, 'i'))
      if (addWeaponMatch) {
        const captures = addWeaponMatch.slice(1).filter(value => value != null)
        const type = captures.find(value => new RegExp(`^${weaponTypePattern}$`, 'i').test(value)) || 'medium melee'
        const name = captures.find(value => value !== type) || ''
        const pending = { intent: 'add-weapon', type, name }
        respond(characterCommand(pending))
        return
      }
      const setIdentityMatch = spokenCommand.match(/^(?:set|change|update)\s+(?:my\s+)?(name|species|archetype)\s+(?:(?:to|two|as)\s+)?(.+)$/i)
        || spokenCommand.match(/^(?:my\s+)?(name|species|archetype)\s+(?:is|should be)\s+(.+)$/i)
      if (setIdentityMatch) {
        const pending = { intent: 'change-identity', field: normalize(setIdentityMatch[1]), value: setIdentityMatch[2].trim() }
        respond(characterCommand(pending))
        return
      }
      const readIdentityMatch = spokenCommand.match(/^(?:what(?:'s| is)|tell me|read|check)\s+(?:my\s+)?(name|species|archetype)$/i)
        || spokenCommand.match(/^(?:what|which)\s+(species|archetype)\s+am\s+i$/i)
        || spokenCommand.match(/^my\s+(name|species|archetype)$/i)
      if (readIdentityMatch || /^(?:who am i|describe my character|describe my hero)$/i.test(spokenCommand)) {
        respond(characterCommand({ intent: 'read-identity', field: readIdentityMatch ? normalize(readIdentityMatch[1]) : 'all' }))
        return
      }
      const readResourceMatch = spokenCommand.match(/^(?:what(?:'s| is)|how much|tell me|read|check)(?:\s+is)?\s+(?:my\s+)?(maximum|max|current)?\s*(force|for|energy)(?:\s+do\s+i\s+have)?$/i)
        || spokenCommand.match(/^my\s+(maximum|max|current)?\s*(force|for|energy)$/i)
      if (readResourceMatch) {
        const resource = /^(?:force|for)$/i.test(readResourceMatch[2]) ? 'force' : 'energy'
        const maximum = /^(?:maximum|max)$/i.test(readResourceMatch[1] || '') || resource === 'force'
        respond(characterCommand({ intent: 'read-vital', vital: maximum ? `max-${resource}` : 'energy' }))
        return
      }
      const setEnergyMatch = spokenCommand.match(/^(?:set|change|update)\s+(?:my\s+)?(?:current\s+)?energy\s+(?:(?:to|two|at)\s+)?(\d+|[a-z]+)$/i)
        || spokenCommand.match(/^(?:increase|raise|improve|decrease|lower|reduce)\s+(?:my\s+)?(?:current\s+)?energy\s+(?:to|two|at)\s+(\d+|[a-z]+)$/i)
      const adjustEnergyMatch = spokenCommand.match(/^(increase|raise|add|gain|restore|recover|decrease|lower|reduce|spend|use)\s+(?:my\s+)?(?:current\s+)?energy(?:\s+by)?\s+(\d+|[a-z]+)$/i)
        || spokenCommand.match(/^(?:add|gain|restore|recover|spend|use)\s+(\d+|[a-z]+)\s+(?:points?\s+of\s+)?energy$/i)
      if (setEnergyMatch || adjustEnergyMatch) {
        const alternateOrder = adjustEnergyMatch && adjustEnergyMatch.length === 2
        const verb = alternateOrder ? spokenCommand.split(/\s+/)[0] : adjustEnergyMatch?.[1]
        const amount = spokenNumber(setEnergyMatch?.[1] || (alternateOrder ? adjustEnergyMatch[1] : adjustEnergyMatch?.[2]))
        if (amount == null) { respond(`I could not determine the Energy amount in ${original}.`); return }
        const operation = setEnergyMatch ? 'set' : /^(?:decrease|lower|reduce|spend|use)$/i.test(verb) ? 'subtract' : 'add'
        const pending = { intent: 'change-energy', operation, amount }
        respond(characterCommand(pending))
        return
      }
      const setProgressMatch = spokenCommand.match(/^(?:set|change|update)\s+(?:my\s+)?(level|total\s+(?:xp|experience(?:\s+points?)?)|unspent\s+(?:xp|experience(?:\s+points?)?)|xp|experience(?:\s+points?)?)\s+(?:(?:to|two|at)\s+)?(\d+|[a-z]+)$/i)
        || spokenCommand.match(/^(?:increase|raise|improve|decrease|lower|reduce)\s+(?:my\s+)?(level|total\s+(?:xp|experience(?:\s+points?)?)|unspent\s+(?:xp|experience(?:\s+points?)?)|xp|experience(?:\s+points?)?)\s+(?:to|two|at)\s+(\d+|[a-z]+)$/i)
      const adjustProgressMatch = spokenCommand.match(/^(increase|raise|add|decrease|lower|reduce)\s+(?:my\s+)?(level|total\s+(?:xp|experience(?:\s+points?)?)|unspent\s+(?:xp|experience(?:\s+points?)?)|xp|experience(?:\s+points?)?)(?:\s+by\s+(\d+|[a-z]+))?$/i)
      if (setProgressMatch || adjustProgressMatch) {
        const label = setProgressMatch?.[1] || adjustProgressMatch?.[2]
        const key = normalize(label).startsWith('level') ? 'level' : normalize(label).startsWith('unspent') ? 'unspent-xp' : 'total-xp'
        const amount = spokenNumber(setProgressMatch?.[2] || adjustProgressMatch?.[3] || 'one')
        if (amount == null) { respond(`I could not determine the new value in ${original}.`); return }
        const operation = setProgressMatch ? 'set' : /^(?:decrease|lower|reduce)$/i.test(adjustProgressMatch[1]) ? 'subtract' : 'add'
        const pending = { intent: 'change-progression', key, operation, amount }
        respond(characterCommand(pending))
        return
      }
      const setHealthMatch = spokenCommand.match(/^(?:set|change|update)\s+(?:my\s+)?(?:current\s+)?(?:health|hp|hit\s*points?)\s+(?:(?:to|two|at)\s+)?(\d+|[a-z]+)$/i)
        || spokenCommand.match(/^(?:increase|raise|decrease|lower|reduce)\s+(?:my\s+)?(?:current\s+)?(?:health|hp|hit\s*points?)\s+(?:to|two|at)\s+(\d+|[a-z]+)$/i)
      if (setHealthMatch) {
        const amount = spokenNumber(setHealthMatch[1])
        if (amount == null) { respond(`I could not determine the health value in ${original}.`); return }
        respond(characterCommand({ intent: 'change-health', operation: 'set', amount }))
        return
      }
      const setScoreMatch = spokenCommand.match(/^(?:set|change|update)\s+(?:my\s+)?(.+?)\s+(?:(?:to|two|at)\s+)?((?:minus|negative|plus|positive)?\s*(?:\d+|[a-z]+))$/i)
        || spokenCommand.match(/^(?:increase|raise|improve|decrease|lower|reduce)\s+(?:my\s+)?(.+?)\s+(?:to|two|at)\s+((?:minus|negative|plus|positive)?\s*(?:\d+|[a-z]+))$/i)
      const adjustScoreMatch = spokenCommand.match(/^(increase|raise|improve|decrease|lower|reduce)\s+(?:my\s+)?(.+?)(?:\s+by\s+((?:minus|negative|plus|positive)?\s*(?:\d+|[a-z]+)))?$/i)
      const addToScoreMatch = spokenCommand.match(/^add\s+((?:minus|negative|plus|positive)?\s*(?:\d+|[a-z]+))\s+to\s+(?:my\s+)?(.+)$/i)
      if (setScoreMatch || adjustScoreMatch || addToScoreMatch) {
        let score = setScoreMatch?.[1] || adjustScoreMatch?.[2] || addToScoreMatch?.[2]
        let kind = 'score'
        if (/^(?:melee|close(?:\s+combat)?)\s+attack\s+(?:modifier|mod)$/i.test(score)) { kind = 'melee-attack-modifier'; score = 'melee attack modifier' }
        else if (/^(?:ranged|range|distance)\s+attack\s+(?:modifier|mod)$/i.test(score)) { kind = 'ranged-attack-modifier'; score = 'ranged attack modifier' }
        else if (/defen[cs]e(?:\s+rating)?$/i.test(score)) { kind = 'defense'; score = 'defense' }
        else if (/\s+(?:skill\s+)?(?:ability|buffs?|debuffs?|modifier|mod)$/i.test(score)) {
          const componentMatch = score.match(/(ability|buffs?|debuffs?|modifier|mod)$/i)
          kind = 'skill-component'
          score = score.replace(/\s+(?:skill\s+)?(?:ability|buffs?|debuffs?|modifier|mod)$/i, '')
          const component = /^buff/i.test(componentMatch[1]) ? 'buffs' : /^debuff/i.test(componentMatch[1]) ? 'debuffs' : /^(?:modifier|mod)$/i.test(componentMatch[1]) ? 'modifier' : 'ability'
          score = score.trim()
          const amountText = setScoreMatch?.[2] || adjustScoreMatch?.[3] || addToScoreMatch?.[1] || 'one'
          const amount = signedSpokenNumber(amountText)
          if (amount == null) { respond(`I could not determine the new value in ${original}.`); return }
          const operation = setScoreMatch ? 'set' : /^(?:decrease|lower|reduce)$/i.test(adjustScoreMatch?.[1] || '') ? 'subtract' : 'add'
          respond(characterCommand({ intent: 'change-score', kind, score, component, operation, amount: operation === 'set' ? amount : Math.abs(amount) }))
          return
        }
        else if (/\s+skill$/i.test(score)) { kind = /attack/i.test(score) ? 'attack' : 'skill'; score = score.replace(/\s+skill$/i, '') }
        else if (/\s+stat$/i.test(score)) { kind = 'stat'; score = score.replace(/\s+stat$/i, '') }
        const amountText = setScoreMatch?.[2] || adjustScoreMatch?.[3] || addToScoreMatch?.[1] || 'one'
        const amount = signedSpokenNumber(amountText)
        if (amount == null) { respond(`I could not determine the new value in ${original}.`); return }
        const operation = setScoreMatch ? 'set' : /^(?:decrease|lower|reduce)$/i.test(adjustScoreMatch?.[1] || '') ? 'subtract' : 'add'
        const pending = { intent: 'change-score', kind, score, operation, amount: Math.abs(amount) }
        if (operation === 'set') pending.amount = amount
        respond(characterCommand(pending))
        return
      }
      const damageMatch = spokenCommand.match(/^(?:i\s+)?(?:(?:take|suffer|receive|lose|remove|subtract)(?:\s+me)?\s+|damage\s+me(?:\s+for)?\s+)(\d+|[a-z]+)(?:\s+(?:from\s+my\s+)?(?:damage|health|hp|hit\s*points?|dealth))?$/i)
      const healMatch = spokenCommand.match(/^(?:i\s+)?(?:heal|restore|add|gain|recover)(?:\s+me)?\s+(\d+|[a-z]+)(?:\s+(?:to\s+my\s+)?(?:health|hp|hit\s*points?))?$/i)
      const healthMatch = damageMatch || healMatch
      if (healthMatch) {
        const amount = spokenNumber(healthMatch[1])
        if (amount == null) { respond(`I could not determine the amount in ${original}.`); return }
        const operation = damageMatch ? 'subtract' : 'add'
        const pending = { intent: 'change-health', operation, amount }
        respond(characterCommand(pending))
        return
      }
      const addTalentMatch = spokenCommand.match(/^(?:add|learn|give me|take)\s+(?:the\s+)?(?:talent\s+)?(.+?)(?:\s+talent)?$/i)
      if (addTalentMatch && /talent/i.test(original)) {
        const pending = { intent: 'add-talent', talent: addTalentMatch[1] }
        respond(characterCommand(pending))
        return
      }
      const attackTotalQuestion = /^(?:what(?:'s| is)|how much|read|tell me|check)(?:\s+is)?\s+/i.test(spokenCommand)
        && /(?:attack|to[ -]?hit|hit\s+bonus|attack\s+bonus|attack\s+total|total\s+attack|total)/i.test(spokenCommand)
        && !/(?:modifier|\bmod\b|skill|damage|weapon)/i.test(spokenCommand)
      const attackTotalModeMatch = spokenCommand.match(/\b(melee|close(?:\s+combat)?|ranged|range|distance)\b/i)
      const shortAttackTotalMatch = spokenCommand.match(/^(?:my\s+)?(melee|close(?:\s+combat)?|ranged|range|distance)\s+(?:(?:attack\s+)?total|to[ -]?hit|hit\s+bonus|attack\s+bonus)$/i)
      if ((attackTotalQuestion && attackTotalModeMatch) || shortAttackTotalMatch) {
        const requestedMode = attackTotalModeMatch?.[1] || shortAttackTotalMatch[1]
        const mode = /^(?:melee|close)/i.test(requestedMode) ? 'melee' : 'ranged'
        respond(characterCommand({ intent: 'read-attack-total', mode }))
        return
      }
      const readWeaponDamageMatch = spokenCommand.match(/^(?:what(?:'s| is)|tell me|read)\s+(?:the\s+)?damage(?:\s+(?:of|for))\s+(?:my\s+|the\s+)?(.+?)(?:\s+weapon)?$/i)
        || spokenCommand.match(/^how\s+much\s+damage\s+does\s+(?:my\s+|the\s+)?(.+?)(?:\s+weapon)?\s+do$/i)
      if (readWeaponDamageMatch) {
        respond(characterCommand({ intent: 'read-weapon', weapon: readWeaponDamageMatch[1], damageOnly: true }))
        return
      }
      const explainEntryMatch = spokenCommand.match(/^(?:what does|what is|explain|read|tell me about)\s+(?:my\s+|the\s+)?(.+?)(?:\s+(?:talent|item|trait))?(?:\s+do)?$/i)
      if (explainEntryMatch && !/^(?:my\s+)?(?:(?:total|unspent|maximum|max|current)\s+)?(?:name|species|archetype|health|hp|ego|defense|resilience|force|energy|level|xp|experience|attack|melee|ranged|range|distance|close)/i.test(explainEntryMatch[1])) {
        respond(characterCommand({ intent: 'explain-entry', entry: explainEntryMatch[1] }))
        return
      }
      const readAttackSkillMatch = spokenCommand.match(/^(?:what(?:'s| is)|how much|read|tell me|check)(?:\s+is)?\s+(?:my\s+)?attack\s+skill$/i)
        || spokenCommand.match(/^my\s+attack\s+skill$/i)
      if (readAttackSkillMatch) {
        respond(characterCommand({ intent: 'read-vital', vital: 'attack-skill' }))
        return
      }
      const readAttackModifierMatch = spokenCommand.match(/^(?:what(?:'s| is)|how much|read|tell me|check)(?:\s+is)?\s+(?:my\s+)?(melee|close(?:\s+combat)?|ranged|range|distance)\s+attack\s+(?:modifier|mod)$/i)
        || spokenCommand.match(/^my\s+(melee|close(?:\s+combat)?|ranged|range|distance)\s+attack\s+(?:modifier|mod)$/i)
      if (readAttackModifierMatch) {
        const vital = /^(?:melee|close)/i.test(readAttackModifierMatch[1]) ? 'melee-attack-modifier' : 'ranged-attack-modifier'
        respond(characterCommand({ intent: 'read-vital', vital }))
        return
      }
      const readVitalMatch = spokenCommand.match(/^(?:what(?:'s| is| are)|how (?:much|many)|read|tell me|get)(?:\s+is)?\s+(?:my\s+)?(?:current\s+)?(health|hp|hit\s*points?|status|ego|defense|resilience|energy|level|total\s+(?:xp|experience(?:\s+points?)?)|unspent\s+(?:xp|experience(?:\s+points?)?)|xp|experience(?:\s+points?)?)(?:\s+do\s+i\s+have)?$/i)
        || spokenCommand.match(/^(?:my\s+)?(?:current\s+)?(health|hp|hit\s*points?|status|ego|defense|resilience|level|total\s+(?:xp|experience(?:\s+points?)?)|unspent\s+(?:xp|experience(?:\s+points?)?)|xp|experience(?:\s+points?)?)$/i)
      if (readVitalMatch || /^(?:how am i doing|what is my condition|status)$/i.test(spokenCommand)) {
        const requestedVital = readVitalMatch?.[1] || 'status'
        const normalizedVital = normalize(requestedVital)
        const vital = normalizedVital.startsWith('total ') ? 'total-xp' : normalizedVital.startsWith('unspent ') ? 'unspent-xp' : /^experience/.test(normalizedVital) ? 'xp' : requestedVital
        respond(characterCommand({ intent: 'read-vital', vital }))
        return
      }
      const diceExpressionMatch = spokenCommand.match(/^roll\s+(.+)$/i)
      if (diceExpressionMatch) {
        const expression = diceExpressionMatch[1].toLowerCase()
          .replace(/\b(?:plus|and)\b/g, '+')
          .replace(/\bminus\b/g, '-')
          .replace(/\b(zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty)\b/g, word => String(numberWords[word]))
          .replace(/\ba\s+(?=d\s*\d)/g, '1')
          .replace(/\s+/g, '')
        if (/^(?:\d*)d\d+(?:[+-](?:(?:\d*)d\d+|\d+))*$/i.test(expression)) {
          respond(characterCommand({ intent: 'roll-expression', expression }))
          return
        }
      }
      const dieMatch = spokenCommand.match(/^roll(?:\s+a)?\s+d(\d+)$/i)
      if (dieMatch) { respond(characterCommand({ intent: 'roll-die', sides: dieMatch[1] })); return }
      if (/^roll(?:\s+the)?\s+damage$/i.test(spokenCommand)) { respond(characterCommand({ intent: 'roll-damage' })); return }
      const weaponMatch = spokenCommand.match(/^(?:roll(?:\s+to\s+hit|\s+an?\s+attack)?|attack|strike|shoot|fire)\s+with\s+(?:my\s+|the\s+)?(.+?)(?:\s+weapon)?$/i)
        || spokenCommand.match(/^use\s+(?:my\s+|the\s+)?(.+?)(?:\s+weapon)?\s+to\s+(?:attack|strike|shoot|fire)$/i)
      if (weaponMatch) { respond(characterCommand({ intent: 'roll-weapon', weapon: weaponMatch[1] })); return }
      const rollMatch = spokenCommand.match(/^roll(?:\s+my)?\s+(.+)$/i)
      if (rollMatch) { respond(characterCommand({ intent: 'roll-check', check: rollMatch[1] })); return }
      const entryResponse = characterCommand({ intent: 'explain-entry', entry: spokenCommand })
      if (!/^I could not find a Weapon, Item, Trait, Talent, Archetype, or Species matching /i.test(entryResponse)) {
        respond(entryResponse)
        return
      }
    }
    const searchMatch = original.match(/^(?:search(?: for)?|find|look for)\s+(.+)$/i)
    if (searchMatch) { search(searchMatch[1]); return }
    const directDestinations = [
      [/^(?:go to|open|show|return to)\s+(?:the\s+)?home(?: page)?$/, destinations[0]],
      [/^(?:go to|open|show)\s+(?:the\s+)?rules$/, destinations[1]],
      [/^(?:go to|open|show)\s+(?:the\s+)?talents?$/, destinations[3]],
      [/^(?:go to|open|show)\s+(?:my\s+)?weapons?$/, destinations[5]],
      [/^(?:go to|open|show)\s+(?:the\s+)?skills?$/, destinations[4]],
      [/^(?:go to|open|show)\s+(?:the\s+)?players?$/, destinations[2]],
      [/^(?:go to|open|show)\s+(?:the\s+)?(?:game masters?|gms?)$/, destinations[9]],
      [/^(?:go to|open|show)\s+(?:my\s+)?character(?: sheet)?$/, destinations[10]],
    ]
    const destination = directDestinations.find(([pattern]) => pattern.test(value))?.[1]
    if (destination) { completeNavigation(destination.path, `${destination.label} opened.`); return }
    const characterMatch = spokenCommand.match(/^(?:please\s+)?(?:open(?:\s+up)?|load|show)\s+(?:the\s+)?(?:(?:character|hero)(?:\s+named)?\s+)?(.+?)(?:['’]s)?(?:\s+(?:character|hero)(?:\s+sheet)?)?$/i)
    if (characterMatch) {
      const matches = matchingCharacters(characterMatch[1])
      const bestScore = matches[0]?.score
      const bestMatches = matches.filter(match => match.score === bestScore)
      const hero = bestMatches.length === 1 ? bestMatches[0].character : null
      if (hero) { completeNavigation('/character-sheet', `${hero.name}'s character sheet opened.`, hero); return }
      if (matches.length > 1) {
        setResults(matches.map(({ character }) => ({ label: character.name, path: '/character-sheet', character, detail: 'Saved Hero' })))
        respond(`I found ${matches.length} matching Heroes. Choose one.`)
        return
      }
      respond(`I could not find a saved Hero named ${characterMatch[1]}.`)
      return
    }
    search(original)
  }

  const toggleListening = async () => {
    if (!recognitionSupported) { respond('Voice recognition is not supported by this browser. You can still type commands.'); return }
    if (listening) {
      keepListeningRef.current = false
      window.clearTimeout(mobileCommandTimerRef.current)
      recognitionRef.current?.stop()
      stopLocalRecognition()
      setListening(false)
      respond('Listening stopped.')
      return
    }
    const mobileRecognition = window.matchMedia('(max-width: 768px)').matches
    if (mobileRecognition && localRecognitionSupported) {
      keepListeningRef.current = true
      setListening(true)
      try {
        setStatus(localModelRef.current ? 'Opening the microphone.' : 'Preparing free on-device voice recognition. The first download is about 41 MB and is cached by your browser.')
        if (!localModelRef.current) {
          const { createModel } = await import('vosk-browser')
          localModelRef.current = await createModel(VOSK_MODEL_URL, -1)
        }
        if (!keepListeningRef.current) return
        const AudioContextClass = window.AudioContext || window.webkitAudioContext
        const audioContext = new AudioContextClass({ sampleRate: 16000 })
        const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, channelCount: 1 } })
        if (!keepListeningRef.current) { stream.getTracks().forEach(track => track.stop()); await audioContext.close(); return }
        const recognizer = new localModelRef.current.KaldiRecognizer(audioContext.sampleRate)
        let transcript = ''
        const queueCommand = text => {
          if (!text || speechActiveRef.current || Date.now() < ignoreSpeechUntilRef.current) return
          transcript = [transcript, text].filter(Boolean).join(' ').trim()
          setCommand(transcript)
          setStatus(`Heard: “${transcript}” Waiting for you to finish.`)
          window.clearTimeout(mobileCommandTimerRef.current)
          mobileCommandTimerRef.current = window.setTimeout(() => {
            const completedCommand = transcript
            transcript = ''
            if (completedCommand && !speechActiveRef.current) execute(completedCommand)
          }, 2200)
        }
        recognizer.on('partialresult', message => {
          const partial = message.result.partial?.trim()
          if (partial && !speechActiveRef.current) setStatus(`Hearing: “${[transcript, partial].filter(Boolean).join(' ')}”`)
        })
        recognizer.on('result', message => queueCommand(message.result.text?.trim()))
        const source = audioContext.createMediaStreamSource(stream)
        const processor = audioContext.createScriptProcessor(4096, 1, 1)
        const silentOutput = audioContext.createGain()
        silentOutput.gain.value = 0
        processor.onaudioprocess = event => {
          if (!speechActiveRef.current && keepListeningRef.current) {
            try { recognizer.acceptWaveform(event.inputBuffer) } catch { /* worker may be shutting down */ }
          }
        }
        source.connect(processor)
        processor.connect(silentOutput)
        silentOutput.connect(audioContext.destination)
        localAudioContextRef.current = audioContext
        localStreamRef.current = stream
        localRecognizerRef.current = recognizer
        localSourceRef.current = source
        localProcessorRef.current = processor
        recognitionRunningRef.current = true
        setStatus('Listening continuously on this device. Press Stop listening when you are done.')
      } catch (error) {
        keepListeningRef.current = false
        recognitionRunningRef.current = false
        stopLocalRecognition()
        setListening(false)
        respond(error?.name === 'NotAllowedError' ? 'Microphone access was denied. Allow it in your browser settings and try again.' : 'Free on-device voice recognition could not start. Check your connection for the first model download, then try again. You can still type commands.')
      }
      return
    }
    if (!navigator.mediaDevices?.getUserMedia) {
      respond('This browser cannot open a microphone stream. You can still type commands.')
      return
    }
    try {
      setStatus('Checking microphone access.')
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const track = stream.getAudioTracks()[0]
      if (!track || track.readyState !== 'live') throw new Error('No live audio track')
      setStatus(`Microphone connected: ${track.label || 'default microphone'}. Starting speech recognition.`)
      stream.getTracks().forEach(currentTrack => currentTrack.stop())
    } catch (error) {
      setListening(false)
      respond(error?.name === 'NotAllowedError' ? 'Microphone access was denied. Allow microphone access in your browser settings, reload the page, and try again.' : 'Chrome could not open a working microphone. Check Windows input settings and Chrome site permissions, then try again.')
      return
    }
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition
    let announcedStart = false
    let retryDelay = 200
    let networkRetries = 0
    let mobileTranscript = ''
    const createRecognition = () => {
      const recognition = new Recognition()
      let replaceAfterEnd = false
      recognition.continuous = mobileRecognition
      recognition.interimResults = false
      recognition.lang = 'en-US'
      recognition.onstart = () => {
        recognitionRunningRef.current = true
        setListening(true)
        if (!announcedStart) { setStatus('Listening.'); announcedStart = true }
      }
      recognition.onaudiostart = () => setStatus('Microphone connected. Listening for audio.')
      recognition.onsoundstart = () => setStatus('Sound detected. Listening for speech.')
      recognition.onspeechstart = () => setStatus('Speech detected. Recognizing command.')
      recognition.onnomatch = () => {
        retryDelay = 300
        setStatus('Audio was detected, but no speech was recognized. Keep listening or try the command again.')
      }
      recognition.onresult = event => {
        if (speechActiveRef.current || Date.now() < ignoreSpeechUntilRef.current) return
        const transcript = event.results[event.results.length - 1][0].transcript.trim()
        retryDelay = 200
        networkRetries = 0
        if (mobileRecognition) {
          mobileTranscript = [mobileTranscript, transcript].filter(Boolean).join(' ')
          setCommand(mobileTranscript)
          setStatus(`Heard: “${mobileTranscript}” Waiting for you to finish.`)
          window.clearTimeout(mobileCommandTimerRef.current)
          mobileCommandTimerRef.current = window.setTimeout(() => {
            const completedCommand = mobileTranscript.trim()
            mobileTranscript = ''
            if (!completedCommand || speechActiveRef.current) return
            execute(completedCommand)
          }, 3000)
          return
        }
        setStatus(`Processing: “${transcript}”`)
        setCommand(transcript)
        execute(transcript)
      }
      recognition.onerror = event => {
        if (event.error === 'no-speech' && keepListeningRef.current) {
          retryDelay = 250
          setStatus('Listening. No speech heard yet.')
          return
        }
        if (event.error === 'aborted') {
          if (keepListeningRef.current && !speechActiveRef.current) { retryDelay = 250; setStatus('Listening.') }
          return
        }
        if (event.error === 'network' && keepListeningRef.current) {
          networkRetries += 1
          retryDelay = Math.min(8000, 500 * networkRetries)
          replaceAfterEnd = true
          setStatus(`The microphone works, but Chrome's speech service could not connect. Keeping listening active and reconnecting. Attempt ${networkRetries}.`)
          return
        }
        keepListeningRef.current = false
        setListening(false)
        const errors = {
          'not-allowed': 'Microphone access was denied. Allow microphone access in your browser settings, then try again. You can still type commands.',
          'service-not-allowed': 'This browser blocked its speech-recognition service. You can still type commands or try a supported browser.',
          'audio-capture': 'No working microphone was available. Check the selected microphone and operating-system permissions, then try again.',
          network: 'The browser speech-recognition service could not connect. Listening will keep trying until you press Stop listening.',
          'language-not-supported': 'The browser does not support speech recognition for en-US. You can still type commands.',
        }
        respond(errors[event.error] || `Voice listening stopped because the browser reported ${event.error || 'an unknown error'}. Try again or type the command.`)
      }
      recognition.onend = () => {
        recognitionRunningRef.current = false
        if (speechActiveRef.current) return
        if (!keepListeningRef.current) { setListening(false); return }
        setListening(true)
        const delay = Math.max(retryDelay, ignoreSpeechUntilRef.current - Date.now())
        if (!replaceAfterEnd) { resumeRecognition(delay); return }
        window.clearTimeout(restartTimerRef.current)
        restartTimerRef.current = window.setTimeout(() => {
          if (!keepListeningRef.current || speechActiveRef.current) return
          const replacement = createRecognition()
          recognitionRef.current = replacement
          try { replacement.start() } catch { resumeRecognition(300) }
        }, delay)
      }
      return recognition
    }
    const recognition = createRecognition()
    recognitionRef.current = recognition
    keepListeningRef.current = true
    recognition.start()
  }

  useEffect(() => () => {
    keepListeningRef.current = false
    speechGenerationRef.current += 1
    window.clearTimeout(restartTimerRef.current)
    window.clearTimeout(mobileCommandTimerRef.current)
    recognitionRef.current?.abort()
    stopLocalRecognition({ releaseModel: true })
    window.speechSynthesis?.cancel()
  }, [])
  useEffect(() => {
    if (!open) return undefined
    setStatus('Game commands opened. Type a command or activate Start Listening.')
    window.setTimeout(() => {
      inputRef.current?.focus()
      if (window.matchMedia('(max-width: 768px)').matches) document.querySelector('.character-command-guide')?.removeAttribute('open')
    }, 0)
    const dismiss = event => { if (event.key === 'Escape') close() }
    window.addEventListener('keydown', dismiss)
    return () => window.removeEventListener('keydown', dismiss)
  }, [open])

  const chooseResult = result => {
    completeNavigation(result.path, `${result.label} opened.`, result.character)
  }
  const exampleCommand = text => { setCommand(text); inputRef.current?.focus() }
  return <>
    <button ref={triggerRef} type="button" className="command-trigger" aria-label="Open game commands" onClick={() => setOpen(true)}>⌘ <span>Command</span></button>
    <div className="visually-hidden" role="status" aria-live="polite" aria-atomic="true">{status}</div>
    {open && createPortal(<div className="command-backdrop" onMouseDown={event => event.target === event.currentTarget && close()}><section className="command-dialog" role="dialog" aria-modal="true" aria-labelledby="command-title"><button type="button" className="command-close" aria-label="Close game commands" onClick={close}>×</button><span className="command-eyebrow">GAME COMMANDS</span><h2 id="command-title">What would you like to do?</h2><form onSubmit={event => { event.preventDefault(); execute(command) }}><label htmlFor="command-input">Type or speak a command</label><div className="command-entry"><input ref={inputRef} id="command-input" type="text" autoComplete="off" value={command} onChange={event => setCommand(event.target.value)} placeholder={onCharacterSheet ? 'Roll to hit with my katana' : 'Open character Roderick'}/><button type="submit">Run</button></div></form><div className="command-options"><button type="button" className={listening ? 'is-listening' : ''} aria-pressed={listening} onClick={toggleListening}>{listening ? '■ Stop listening' : '● Start listening'}</button><label><input type="checkbox" checked={spoken} onChange={event => { const enabled = event.target.checked; setSpoken(enabled); localStorage.setItem(SPEECH_KEY, String(enabled)) }}/><span>Speak responses aloud</span></label></div><div className="command-status" role="status" aria-live="polite" aria-atomic="true">{status}</div>{results.length > 0 && <div className="command-results" aria-label="Command results">{results.map(result => <button type="button" key={`${result.action || result.path}-${result.label}`} onClick={() => chooseResult(result)}><strong>{result.label}</strong><span>{result.detail}</span></button>)}</div>}{onCharacterSheet ? <details className="character-command-guide" open><summary>Common Character Sheet commands</summary><div className="command-examples"><button type="button" onClick={() => exampleCommand('What is my health?')}>What is my health?</button><button type="button" onClick={() => exampleCommand('Take 6 damage')}>Take 6 damage</button><button type="button" onClick={() => exampleCommand('Heal 4 health')}>Heal 4 health</button><button type="button" onClick={() => exampleCommand('What is my maximum Energy?')}>What is my maximum Energy?</button><button type="button" onClick={() => exampleCommand('Spend 2 Energy')}>Spend 2 Energy</button><button type="button" onClick={() => exampleCommand('What is my unspent XP?')}>What is my unspent XP?</button><button type="button" onClick={() => exampleCommand('Increase my level by one')}>Increase my level</button><button type="button" onClick={() => exampleCommand('Roll Ego')}>Roll Ego</button><button type="button" onClick={() => exampleCommand('Roll a d4')}>Roll a d4</button><button type="button" onClick={() => exampleCommand('Roll to hit with medium melee weapon')}>Attack with medium melee</button><button type="button" onClick={() => exampleCommand('Roll damage')}>Roll damage</button><button type="button" onClick={() => exampleCommand('What does Aim do?')}>Explain Aim</button><button type="button" onClick={() => exampleCommand('Add Talent Aim')}>Add Talent Aim</button></div><p>Also ask for Defense, Resilience, current or maximum Energy, maximum Force, Level, Total XP, Unspent XP, Initiative, or any Skill roll. Weapon attacks can use a weapon name or type.</p></details> : <div className="command-examples"><strong>Try a command</strong><button type="button" onClick={() => exampleCommand('Open my character sheet')}>Open my character sheet</button><button type="button" onClick={() => exampleCommand('Go to Talents')}>Go to Talents</button><button type="button" onClick={() => exampleCommand('Search for healing')}>Search for healing</button><button type="button" onClick={() => execute('Help')}>Help</button></div>}{!recognitionSupported && <p className="command-support-note">Voice recognition is unavailable in this browser. Typed commands and spoken responses still work.</p>}</section></div>, document.body)}
  </>
}

export default CommandInterface
