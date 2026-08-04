import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useLocation, useNavigate } from 'react-router-dom'
import './CommandInterface.css'

const STORE_KEY = 'mag-playable-characters-v1'
const ACTIVE_CHARACTER_KEY = 'mag-active-character-v1'
const SPEECH_KEY = 'mag-command-spoken-responses-v1'
const NEW_CHARACTER_COMMAND_KEY = 'mag-new-character-command-v1'
const WHISPER_MODEL = 'onnx-community/whisper-base.en'
const commonCharacterCommands = [
  'Create new character',
  'Read action economy',
  'Set species to Cyborg',
  'Set archetype to Street Samurai',
  'What are my weapons?',
  'What are my items?',
  'What does (item name) do?',
  'What are my traits?',
  'What are my talents?',
  'What does (talent name) do?',
  'Who are my contacts?',
  'What is my health?',
  'Take 4 damage',
  'Heal 6 health',
  'Attack with my medium melee weapon',
  'Roll damage',
  'Roll 1d20+1d4+3',
  'Set level to 1',
  'Roll Ego',
  'What is my defense?',
]

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
  { label: 'NPC Creation', path: '/gm#npc-creation', terms: 'npc npcs non player character non player characters npc creation' },
  { label: 'Character Sheets', path: '/character-sheet', terms: 'characters heroes sheet hp health defense experience xp weapons talents contacts' },
  { label: 'Contact Us', path: '/contact', terms: 'contact email feedback message' },
]

const guideSlug = title => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const guideTopics = [
  { title: 'Core Rules', aliases: ['rules', 'core rules', 'game rules'], path: '/rules', overview: 'Core Rules. Available sections are Rolls, Action Economy, Level Progression, Movement, Healing, Assisting, Combat, Credits, and Vehicles.' },
  ...['Rolls', 'Action Economy', 'Level Progression', 'Movement', 'Healing', 'Assisting', 'Combat', 'Credits', 'Vehicles'].map(title => ({ title, aliases: [title, `${title} rules`, `core ${title}`], path: `/rules#${guideSlug(title)}` })),
  ...[['Attack Action', 'action-economy'], ['Skill Action', 'action-economy'], ['Move Action', 'action-economy'], ['Free Action', 'action-economy'], ['Combat Talent Activation', 'action-economy'], ['Reaction', 'action-economy'], ['Prone', 'action-economy'], ['Cover', 'action-economy'], ['Tripped', 'action-economy'], ['Disarm', 'action-economy'], ['Vehicle Attack', 'vehicles'], ['Vehicle Offense', 'vehicles'], ['Vehicle Defense', 'vehicles'], ['Stand Pat', 'vehicles'], ['Flee Pursue', 'vehicles']].map(([title, section]) => ({ title, aliases: [title, title.replace(/^vehicle\s+/i, 'vehicles ')], path: `/rules#${section}-${guideSlug(title.replace(/^vehicle\s+/i, ''))}` })),
  { title: 'Player Rules', aliases: ['player rules', 'players rules', 'player guide', 'players guide'], path: '/players', overview: 'Player Rules. Available sections are How to Play, Species, Archetypes, Stats, Skills, Defenses, HP, Contacts, Weapons, Reputation, Equipment, and Talents.' },
  ...['How to Play', 'Species', 'Archetypes', 'Stats', 'Skills', 'Defenses', 'HP', 'Contacts', 'Weapons', 'Reputation', 'Equipment', 'Talents'].map(title => ({ title, aliases: [title, `player ${title}`, `players ${title}`], path: `/players#${guideSlug(title)}` })),
  { title: 'GM Rules', aliases: ['gm rules', 'game master rules', 'gm guide', 'game master guide'], path: '/gm', overview: 'Game Master Rules. Available sections are The Guild, Basics, Levels, Rolls, Credits, Loot, Death, NPC Creation, Creature Compendium, Adventures, History, and Factions.' },
  ...['The Guild', 'Basics', 'Levels', 'Rolls', 'Credits', 'Loot', 'Death', 'NPC Creation', 'Creature Compendium', 'Adventures', 'History', 'Factions'].map(title => ({ title, aliases: [title, `gm ${title}`, `game master ${title}`, ...(title === 'Death' ? ['hero death'] : [])], path: `/gm#${guideSlug(title)}` })),
  { title: 'Items and Traits', aliases: ['items and traits', 'items traits'], path: '/players#equipment' },
]
const guideSourceFiles = import.meta.glob('../content/{rules,players,gm}/*.txt', { eager: true, query: '?raw', import: 'default' })
const generatedGuideTopics = Object.entries(guideSourceFiles).flatMap(([filePath, source]) => {
  const pathMatch = filePath.match(/\/content\/(rules|players|gm)\/([^/]+)\.txt$/)
  if (!pathMatch) return []
  const [, guide, fileName] = pathMatch
  if (guide === 'players' && ['backstory', 'create-your-hero'].includes(fileName)) return []
  const pagePath = guide === 'rules' ? '/rules' : guide === 'players' ? '/players' : '/gm'
  const sectionSlug = guide === 'players' && fileName === 'roleplaying' ? 'how-to-play' : fileName
  const lines = String(source || '').split(/\r?\n/).map(line => line.trim()).filter(Boolean)
  const ignoredLabels = /^(?:description|mechanic|mechanics|strengths?|weaknesses?|preferred talents?|talents?|personality traits?|category|example name|scores?|range|action|targets?|force|minor version|major version|mass version)$/i
  return lines.flatMap((line, index) => {
    const titled = line.match(/^(.{2,45}?)(?:\s+-\s+|:\s+)(.+)$/)
    const title = titled?.[1]?.trim() || line.replace(/[.:\s]+$/, '')
    const nextLine = lines[index + 1] || ''
    const standaloneHeading = line.length < 48 && !line.endsWith('.') && !line.includes(',') && !/^[-+*]\s/.test(line) && !/^[-+]?\d|^[-+]?\(/.test(line) && nextLine.length > 0
    if ((!titled && !standaloneHeading) || ignoredLabels.test(title) || title.length < 3) return []
    const singular = title.endsWith('s') ? title.slice(0, -1) : title
    return [{ title, lookup: title, aliases: [...new Set([title, singular])], path: `${pagePath}#${sectionSlug}-${guideSlug(title)}` }]
  })
})
guideTopics.push(...generatedGuideTopics)

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
const guideHomophones = { role: 'roll', roles: 'rolls', row: 'roll', rows: 'rolls', heel: 'heal', heeling: 'healing', aide: 'aid', dye: 'die', dyeing: 'dying', brake: 'break', brakes: 'breaks', coarse: 'course', site: 'sight', stationary: 'stationery', principle: 'principal', faze: 'phase' }
const guideQueryVariants = query => {
  const normalized = normalize(query)
  const corrected = normalized.split(' ').map(word => guideHomophones[word] || word).join(' ')
  return [...new Set([normalized, corrected])]
}
const matchingRuleTopic = query => guideTopics.flatMap(topic => topic.aliases.flatMap(alias => guideQueryVariants(query).map((variant, index) => ({ topic, score: characterMatchScore(alias, variant) + index * .05 })))).filter(match => Number.isFinite(match.score)).sort((left, right) => left.score - right.score)[0]?.topic
const numberWords = { zero: 0, one: 1, two: 2, to: 2, too: 2, three: 3, four: 4, for: 4, five: 5, six: 6, seven: 7, eight: 8, ate: 8, nine: 9, ten: 10, eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17, eighteen: 18, nineteen: 19, twenty: 20 }
const ordinalWords = { zeroth: 0, first: 1, second: 2, third: 3, fourth: 4, fifth: 5, sixth: 6, seventh: 7, eighth: 8, ninth: 9, tenth: 10 }
const spokenNumber = value => /^\d+$/.test(String(value)) ? Number(value) : numberWords[normalize(value)]
const signedSpokenNumber = value => {
  const normalized = normalize(value)
  const negative = /^(?:minus|negative)\s+/.test(normalized)
  const unsigned = normalized.replace(/^(?:minus|negative|plus|positive)\s+/, '')
  const amount = spokenNumber(unsigned)
  return amount == null ? undefined : amount * (negative ? -1 : 1)
}
const cleanSpeechTranscript = value => String(value || '').trim().replace(/^(?:(?:\[[^\]]+\]|\([^)]*\))\s*)+/g, '').trim()
const isNonSpeechTranscript = value => {
  const transcript = String(value || '').trim()
  if (!transcript || /^(?:\[[^\]]+\]|\([^)]*\))$/i.test(transcript)) return true
  return /^(?:audio (?:cut off|cuts? out)|applause|background noise|blank audio|clapping|gavel bangs?|laughter|laughing|music|noise|silence|static)$/i.test(normalize(transcript))
}
let listeningToneContext = null
const playListeningTone = kind => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    if (!AudioContext) return
    if (!listeningToneContext || listeningToneContext.state === 'closed') listeningToneContext = new AudioContext()
    const context = listeningToneContext
    const schedule = () => {
      const notes = kind === 'start' ? [523.25, 659.25] : [587.33, 440]
      notes.forEach((frequency, index) => {
        const startsAt = context.currentTime + .025 + index * .105
        const oscillator = context.createOscillator()
        const gain = context.createGain()
        oscillator.type = 'sine'
        oscillator.frequency.setValueAtTime(frequency, startsAt)
        gain.gain.setValueAtTime(.0001, startsAt)
        gain.gain.exponentialRampToValueAtTime(.045, startsAt + .018)
        gain.gain.exponentialRampToValueAtTime(.0001, startsAt + .095)
        oscillator.connect(gain)
        gain.connect(context.destination)
        oscillator.start(startsAt)
        oscillator.stop(startsAt + .1)
      })
    }
    if (context.state === 'suspended') context.resume().then(schedule).catch(() => {})
    else schedule()
  } catch { /* Audio cues are optional when a browser blocks synthesized audio. */ }
}

function CommandInterface() {
  const navigate = useNavigate()
  const location = useLocation()
  const triggerRef = useRef(null)
  const inputRef = useRef(null)
  const closeButtonRef = useRef(null)
  const recognitionRef = useRef(null)
  const recognitionRunningRef = useRef(false)
  const keepListeningRef = useRef(false)
  const lastResponseRef = useRef('')
  const speechActiveRef = useRef(false)
  const speechGenerationRef = useRef(0)
  const speechUtteranceRef = useRef(null)
  const ignoreSpeechUntilRef = useRef(0)
  const restartTimerRef = useRef(null)
  const mobileCommandTimerRef = useRef(null)
  const pendingHeroCommandRef = useRef('')
  const pendingHeroNeedsNameRef = useRef(false)
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
  const [speaking, setSpeaking] = useState(false)
  const [spoken, setSpoken] = useState(() => localStorage.getItem(SPEECH_KEY) !== 'false')
  const localRecognitionSupported = typeof window !== 'undefined' && Boolean(navigator.mediaDevices?.getUserMedia && (window.AudioContext || window.webkitAudioContext) && window.WebAssembly)
  const recognitionSupported = localRecognitionSupported || (typeof window !== 'undefined' && Boolean(window.SpeechRecognition || window.webkitSpeechRecognition))
  const onCharacterSheet = location.pathname === '/character-sheet'

  const characterCommand = request => {
    let response = ''
    window.dispatchEvent(new CustomEvent('mag-character-command', { detail: { ...request, commandInterfaceOpen: open, reply: message => { response = message } } }))
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
    localRecognizerRef.current?.remove?.()
    localStreamRef.current?.getTracks().forEach(track => track.stop())
    localAudioContextRef.current?.close()
    localProcessorRef.current = null
    localSourceRef.current = null
    localRecognizerRef.current = null
    localStreamRef.current = null
    localAudioContextRef.current = null
    recognitionRunningRef.current = false
    if (releaseModel) {
      localModelRef.current?.dispose?.()
      localModelRef.current = null
    }
  }
  const speak = (message, { force = false } = {}) => {
    if ((!spoken && !force) || !window.speechSynthesis) return
    const generation = speechGenerationRef.current + 1
    speechGenerationRef.current = generation
    speechActiveRef.current = true
    setSpeaking(true)
    ignoreSpeechUntilRef.current = Infinity
    const localAudioContext = localAudioContextRef.current
    const preserveMobileRecognition = window.matchMedia('(max-width: 768px)').matches && (recognitionRunningRef.current || Boolean(localAudioContext))
    if (!preserveMobileRecognition) recognitionRef.current?.abort()
    window.speechSynthesis.cancel()
    const voices = window.speechSynthesis.getVoices()
    const voice = voices.find(candidate => candidate.lang === 'en-US' && candidate.default) || voices.find(candidate => candidate.lang?.toLowerCase().startsWith('en')) || null
    const chunks = String(message || '').replace(/\s+/g, ' ').trim().split(' ').reduce((parts, word) => {
      const current = parts.at(-1) || ''
      if (!current || `${current} ${word}`.length > 240) parts.push(word)
      else parts[parts.length - 1] = `${current} ${word}`
      return parts
    }, [])
    const finished = () => {
      if (speechGenerationRef.current !== generation) return
      speechUtteranceRef.current = null
      speechActiveRef.current = false
      setSpeaking(false)
      ignoreSpeechUntilRef.current = Date.now() + 900
      if (keepListeningRef.current && !recognitionRunningRef.current) resumeRecognition(950)
    }
    const speakChunk = index => {
      if (speechGenerationRef.current !== generation) return
      if (index >= chunks.length) { finished(); return }
      const utterance = new SpeechSynthesisUtterance(chunks[index])
      utterance.voice = voice
      speechUtteranceRef.current = utterance
      utterance.onend = () => speakChunk(index + 1)
      utterance.onerror = finished
      window.speechSynthesis.resume()
      window.speechSynthesis.speak(utterance)
    }
    speakChunk(0)
  }
  const waitForSpeech = (timeout = 10000) => new Promise(resolve => {
    const startedAt = Date.now()
    const check = () => {
      if (!speechActiveRef.current || Date.now() - startedAt >= timeout) { resolve(); return }
      window.setTimeout(check, 100)
    }
    check()
  })
  const respond = message => {
    lastResponseRef.current = message
    setStatus(message)
    speak(message)
  }
  const stopSpeaking = () => {
    speechGenerationRef.current += 1
    speechUtteranceRef.current = null
    speechActiveRef.current = false
    ignoreSpeechUntilRef.current = Date.now() + 300
    window.speechSynthesis?.cancel()
    setSpeaking(false)
    setStatus('Reading stopped.')
  }
  const close = () => {
    keepListeningRef.current = false
    speechGenerationRef.current += 1
    speechActiveRef.current = false
    setSpeaking(false)
    window.clearTimeout(restartTimerRef.current)
    window.clearTimeout(mobileCommandTimerRef.current)
    pendingHeroCommandRef.current = ''
    pendingHeroNeedsNameRef.current = false
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
  const readGuideTopic = topic => {
    keepListeningRef.current = false
    recognitionRef.current?.stop()
    stopLocalRecognition()
    setListening(false)
    navigate(topic.path)
    setOpen(false)
    setStatus(`Opening ${topic.title}.`)
    const readWhenReady = (attempt = 0) => {
      const hash = topic.path.includes('#') ? topic.path.slice(topic.path.indexOf('#') + 1) : ''
      let target = hash ? document.getElementById(hash) : null
      if (!target && topic.lookup) {
        const requested = normalize(topic.lookup)
        target = [...document.querySelectorAll('.guide-section h2, .guide-section h3, .guide-section h4, .guide-linked-entry, .guide-card h3, .guide-section p')]
          .find(element => normalize(element.textContent).startsWith(requested)) || null
      }
      if (!topic.overview && !target && attempt < 20) {
        window.setTimeout(() => readWhenReady(attempt + 1), 100)
        return
      }
      let targetText = target?.innerText?.replace(/\s+/g, ' ').trim() || ''
      if (target?.matches('h2, h3, h4')) {
        const parts = [targetText]
        let sibling = target.nextElementSibling
        while (sibling && !sibling.matches('h2, h3, h4')) {
          const siblingText = sibling.innerText?.replace(/\s+/g, ' ').trim()
          if (siblingText) parts.push(siblingText)
          sibling = sibling.nextElementSibling
        }
        targetText = parts.join('. ')
      }
      const text = topic.overview || targetText || `${topic.title} opened, but its text could not be read.`
      target?.scrollIntoView({ block: 'start' })
      lastResponseRef.current = text
      setStatus(text)
      speak(text, { force: true })
    }
    window.setTimeout(readWhenReady, 100)
  }
  const search = term => {
    const query = normalize(term)
    if (compactName(query) === 'npc' || compactName(query) === 'npcs') {
      completeNavigation('/gm#npc-creation', 'NPC Creation opened.')
      return
    }
    const characterQuery = query.replace(/^(?:a\s+)?(?:character|hero)\s+/, '')
    const characters = matchingCharacters(characterQuery).map(({ character }) => ({ label: character.name, path: '/character-sheet', character, detail: 'Saved Hero' }))
    const pages = destinations.filter(item => `${normalize(item.label)} ${item.terms}`.includes(query)).map(item => ({ ...item, detail: 'App section' }))
    const matches = [...characters, ...pages].slice(0, 8)
    setResults(matches)
    respond(matches.length ? `Found ${matches.length} result${matches.length === 1 ? '' : 's'} for ${term}.` : `I could not find ${term}.`)
  }
  const execute = rawCommand => {
    const original = String(rawCommand || '').trim()
    let spokenCommand = original.replace(/[?.!,]+$/, '').replace(/^role\b/i, 'roll').replace(/^reed\b/i, 'read').replace(/^ad\b/i, 'add').replace(/\band\s+durance\b/gi, 'endurance')
    if (pendingHeroCommandRef.current) {
      if (/^(?:cancel|close|never\s*mind)$/i.test(spokenCommand)) { pendingHeroCommandRef.current = ''; pendingHeroNeedsNameRef.current = false }
      else if (!/^(?:create|make|start|new)\b/i.test(spokenCommand)) {
        spokenCommand = `${pendingHeroCommandRef.current}${pendingHeroNeedsNameRef.current ? ' named' : ''} ${spokenCommand}`.trim()
        pendingHeroCommandRef.current = ''
        pendingHeroNeedsNameRef.current = false
      } else { pendingHeroCommandRef.current = ''; pendingHeroNeedsNameRef.current = false }
    }
    const embeddedCommand = spokenCommand.match(/\b(?:cancel|close|stop|quiet|silence|repeat|help|commands|what|which|who|how|my|list|read|reed|name|show|tell|get|set|change|update|increase|raise|improve|decrease|lower|reduce|add|ad|gain|restore|recover|spend|use|take|suffer|receive|lose|remove|subtract|damage|heal|roll|make|create|start|new|provide|give|apply|first|aid|attack|strike|shoot|fire|search|find|look|go|open|return|load|strength|dexterity|endurance|intuition|education|charisma|athletics|influence|knowledge|observation|outdoors|sneak|technology|vehicle|health|status|ego|defense|resilience|energy|level|xp|experience|skills|stats)\b/i)
    if (embeddedCommand?.index > 0) spokenCommand = spokenCommand.slice(embeddedCommand.index).replace(/^reed\b/i, 'read').replace(/^ad\b/i, 'add')
    const value = normalize(spokenCommand)
    setCommand(original)
    setResults([])
    if (!value) { respond('Type or speak a command first.'); return }
    if (/^(?:stop(?:\s+(?:reading|speaking|talking))?|quiet|silence)$/i.test(spokenCommand)) { stopSpeaking(); return }
    if (keepListeningRef.current && /^(?:(?:create|make|start)\s+(?:a\s+)?(?:new\s+)?|new\s+)(?:hero|character)$/i.test(spokenCommand)) {
      pendingHeroCommandRef.current = spokenCommand
      pendingHeroNeedsNameRef.current = true
      setStatus('Creating a new Hero. Say the Hero’s name.')
      speak('What is the new Hero’s name?')
      return
    }
    if (['cancel', 'close', 'never mind', 'nevermind'].includes(value)) { close(); return }
    if (['repeat', 'say that again', 'read again'].includes(value)) { speak(lastResponseRef.current || 'There is nothing to repeat yet.'); return }
    if (['help', 'what can i say', 'commands'].includes(value)) {
      respond(onCharacterSheet ? 'On a Character Sheet you can ask about or immediately change your name, Species, Archetype, Level, XP, health, and other scores; roll dice, Skills, defenses, weapon attacks, and damage; add a Talent; heal; or take damage.' : 'You can open a saved Hero by name, open app sections, or search the app. Try: open character Roderick, go to Talents, open Rules, or search for healing.')
      return
    }
    const readRuleMatch = spokenCommand.match(/^(?:read|explain|tell me about)\s+(?:the\s+)?(.+?)(?:\s+rules?)?$/i)
    if (readRuleMatch) {
      const topic = matchingRuleTopic(readRuleMatch[1])
      if (topic) {
        readGuideTopic(topic)
        return
      }
    }
    const levelHeroMatch = spokenCommand.match(/^(?:create|make|start)\s+(?:a\s+)?((?:(?:zeroth|first|second|third|fourth|fifth|sixth|seventh|eighth|ninth|tenth|zero|one|two|three|four|five|six|seven|eight|nine|ten|\d+)(?:st|nd|rd|th)?\s+level|level\s+(?:zero|one|two|three|four|five|six|seven|eight|nine|ten|\d+))\b.*)$/i)
    const packageHeroMatch = spokenCommand.match(/^(?:create|make|start)\s+(?:a\s+)?(.+\s+.+)$/i)
    const describedHeroMatch = levelHeroMatch || (packageHeroMatch && !/\b(?:hero|character|weapon|talent|contact|item)\b/i.test(packageHeroMatch[1]) ? packageHeroMatch : null)
    const createHeroMatch = spokenCommand.match(/^(?:create|make|start)\s+(?:a\s+)?(?:new\s+)?(?:hero|character)\b(.*)$/i)
      || spokenCommand.match(/^new\s+(?:hero|character)\b(.*)$/i)
      || describedHeroMatch
    if (createHeroMatch) {
      const details = createHeroMatch[1].replace(/^[,;:\s]+/, '').trim()
      if (describedHeroMatch && !/\b(?:name|named|called)\b/i.test(details)) {
        pendingHeroCommandRef.current = spokenCommand
        pendingHeroNeedsNameRef.current = true
        setStatus(`Creating ${details}. Say the Hero’s name.`)
        speak('What is the new Hero’s name?')
        return
      }
      const levelMatch = details.match(/\b(?:(level)\s+(zero|one|two|three|four|five|six|seven|eight|nine|ten|\d+)|((?:zeroth|first|second|third|fourth|fifth|sixth|seventh|eighth|ninth|tenth|zero|one|two|three|four|five|six|seven|eight|nine|ten|\d+)(?:st|nd|rd|th)?)\s+level)\b/i)
      const levelText = String(levelMatch?.[2] || levelMatch?.[3] || '').toLowerCase().replace(/(?:st|nd|rd|th)$/i, '')
      const requestedLevel = levelText ? (/^\d+$/.test(levelText) ? Number(levelText) : ordinalWords[levelText] ?? numberWords[levelText]) : undefined
      const descriptor = describedHeroMatch ? details.replace(levelMatch?.[0] || '', '').replace(/\b(?:hero|character)\b/i, '').trim() : ''
      const extractDetail = (labels, followingLabels) => {
        const match = details.match(new RegExp(`\\b(?:${labels})(?:\\s+(?:is|of))?\\s+(.+?)(?=[,;]?\\s+(?:${followingLabels})\\b|$)`, 'i'))
        return match?.[1]?.replace(/[,;]+$/, '').trim() || ''
      }
      const namedValue = extractDetail('name|named|called', 'species|archetype')
      const unlabeledName = details.split(/\b(?:species|archetype|name|named|called)\b/i)[0].replace(/[,;]+$/, '').trim()
      const hero = {
        name: namedValue || (describedHeroMatch ? '' : unlabeledName),
        species: extractDetail('species', 'name|named|called|archetype'),
        archetype: extractDetail('archetype', 'name|named|called|species'),
        level: requestedLevel,
        descriptor,
      }
      sessionStorage.setItem(NEW_CHARACTER_COMMAND_KEY, JSON.stringify(hero))
      window.dispatchEvent(new CustomEvent('mag-create-character', { detail: hero }))
      const selected = [hero.name && `named ${hero.name}`, hero.level != null && `Level ${hero.level}`, hero.species && `Species ${hero.species}`, hero.archetype && `Archetype ${hero.archetype}`, hero.descriptor && hero.descriptor].filter(Boolean)
      completeNavigation('/character-sheet', `New Hero created${selected.length ? `, ${selected.join(', ')}` : ''}.`)
      return
    }
    const openHeroMatch = spokenCommand.match(/^(?:please\s+)?(?:open(?:\s+up)?|load|show)\s+(?:the\s+)?(?:(?:character|hero)(?:\s+named)?\s+)?(.+?)(?:['’]s)?(?:\s+(?:character|hero)(?:\s+sheet)?)?$/i)
    const openHeroMatches = openHeroMatch ? matchingCharacters(openHeroMatch[1]) : []
    if (openHeroMatches.length) {
      const bestScore = openHeroMatches[0].score
      const bestMatches = openHeroMatches.filter(match => match.score === bestScore)
      if (bestMatches.length === 1) {
        const hero = bestMatches[0].character
        completeNavigation('/character-sheet', `${hero.name}'s character sheet opened.`, hero)
        return
      }
      setResults(openHeroMatches.map(({ character }) => ({ label: character.name, path: '/character-sheet', character, detail: 'Saved Hero' })))
      respond(`I found ${openHeroMatches.length} matching Heroes. Choose one.`)
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
      const setIdentityMatch = spokenCommand.match(/^(?:set|change|update)\s+(?:(?:my|mine|me|the)\s+)?(?:(?:character|hero)(?:['’]?s)?\s+)?(name|species|race|archetype)\s+(?:(?:to|two|too|as|is|should\s+be)\s+)?(.+)$/i)
        || spokenCommand.match(/^(?:my\s+)?(name|species|race|archetype)\s+(?:is|should be)\s+(.+)$/i)
      if (setIdentityMatch) {
        const requestedField = normalize(setIdentityMatch[1])
        const pending = { intent: 'change-identity', field: requestedField === 'race' ? 'species' : requestedField, value: setIdentityMatch[2].trim() }
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
      const setHealthMatch = spokenCommand.match(/^(?:set|change|update)\s+(?:my\s+)?(?:current\s+)?(?:health|h\s*p|hi[pt]\s*points?)\s+(?:(?:to|two|too|at)\s+)?((?:minus|negative|plus|positive)?\s*(?:\d+|[a-z]+))$/i)
        || spokenCommand.match(/^(?:increase|raise|decrease|lower|reduce)\s+(?:my\s+)?(?:current\s+)?(?:health|h\s*p|hi[pt]\s*points?)\s+(?:to|two|too|at)\s+((?:minus|negative|plus|positive)?\s*(?:\d+|[a-z]+))$/i)
        || spokenCommand.match(/\b(?:health|h\s*p|hi[pt]\s*points?)\s+(?:(?:to|two|too)\s+)?(?:set|change|update)?\s*(?:to|two|too|at)\s+((?:minus|negative|plus|positive)?\s*(?:\d+|[a-z]+))$/i)
      if (setHealthMatch) {
        const amount = signedSpokenNumber(setHealthMatch[1])
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
      const damageMatch = spokenCommand.match(/^(?:i\s+)?(?:(?:take|suffer|receive|lose|remove|subtract)(?:\s+me)?\s+|damage\s+me(?:\s+for)?\s+)(\d+|[a-z]+)(?:\s+(?:from\s+my\s+)?(?:damage|health|h\s*p|hi[pt]\s*points?|dealth))?$/i)
      const healMatch = spokenCommand.match(/^(?:i\s+)?(?:heal|restore|add|gain|recover)(?:\s+me)?\s+(\d+|[a-z]+)(?:\s+(?:to\s+my\s+)?(?:health|h\s*p|hi[pt]\s*points?))?$/i)
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
      const readScoreMatch = spokenCommand.match(/^(?:what(?:'s| is)|how much|read|tell me|check)(?:\s+is)?\s+(?:(?:my|the|this)\s+)?(strength|str|dexterity|dex|endurance|end|intuition|int|education|edu|charisma|cha|athletics|influence|knowledge|observation|outdoors|sneak|technology|vehicle)(?:\s+(?:stat|statistic|skill|score))?$/i)
        || spokenCommand.match(/^(?:(?:my|the|this)\s+)?(strength|str|dexterity|dex|endurance|end|intuition|int|education|edu|charisma|cha|athletics|influence|knowledge|observation|outdoors|sneak|technology|vehicle)(?:\s+(?:stat|statistic|skill|score))?$/i)
      if (readScoreMatch) {
        respond(characterCommand({ intent: 'read-score', score: readScoreMatch[1] }))
        return
      }
      const explainEntryMatch = spokenCommand.match(/^(?:what does|what is|explain|read|tell me about)\s+(?:my\s+|the\s+)?(.+?)(?:\s+(?:talent|item|trait))?(?:\s+do)?$/i)
      if (explainEntryMatch && !/^(?:my\s+)?(?:(?:total|unspent|maximum|max|current)\s+)?(?:name|species|archetype|health|hp|hit\s*points?|status|condition|ego|defense|resilience|force|energy|level|xp|experience|attack|melee|ranged|range|distance|close)/i.test(explainEntryMatch[1])) {
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
      const readVitalMatch = spokenCommand.match(/^(?:what(?:'s| is| are)|how (?:much|many)|read|tell me|get)(?:\s+is)?\s+(?:my\s+)?(?:current\s+)?(health|h\s*p|hi[pt]\s*points?|status|ego|defense|resilience|energy|level|total\s+(?:xp|experience(?:\s+points?)?)|unspent\s+(?:xp|experience(?:\s+points?)?)|xp|experience(?:\s+points?)?)(?:\s+do\s+i\s+have)?$/i)
        || spokenCommand.match(/^(?:my\s+)?(?:current\s+)?(health|h\s*p|hi[pt]\s*points?|status|ego|defense|resilience|level|total\s+(?:xp|experience(?:\s+points?)?)|unspent\s+(?:xp|experience(?:\s+points?)?)|xp|experience(?:\s+points?)?)$/i)
      if (readVitalMatch || /^(?:how am i doing|what is my condition|status)$/i.test(spokenCommand)) {
        const requestedVital = readVitalMatch?.[1] || 'status'
        const normalizedVital = normalize(requestedVital)
        const vital = /^(?:h\s*p|hi[pt]\s*points?)$/.test(normalizedVital) ? 'health' : normalizedVital.startsWith('total ') ? 'total-xp' : normalizedVital.startsWith('unspent ') ? 'unspent-xp' : /^experience/.test(normalizedVital) ? 'xp' : requestedVital
        respond(characterCommand({ intent: 'read-vital', vital }))
        return
      }
      if (/^roll$/i.test(spokenCommand) || /^(?:roll|make)\s+(?:an?\s+)?endurance(?:\s+(?:check|roll))?$/i.test(spokenCommand) || /^roll\s+(?:(?:and|in)\s+)?a\s+dance$/i.test(spokenCommand)) {
        respond(characterCommand({ intent: 'death-clock-action', action: 'endurance' }))
        return
      }
      if (/^(?:first|aid)$/i.test(spokenCommand) || /^(?:provide|use|give|apply)?\s*(?:teammate\s+)?first aid$/i.test(spokenCommand)) {
        respond(characterCommand({ intent: 'death-clock-action', action: 'first-aid' }))
        return
      }
      if (/^roll(?:\s+the|\s+a)?\s+(?:death\s+(?:clock\s+)?(?:die|roll)|d6\s+for\s+(?:the\s+)?death\s+clock)$/i.test(spokenCommand)) {
        respond(characterCommand({ intent: 'death-clock-action', action: 'death-roll' }))
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
      [/^(?:go to|open|show|find|look for)\s+(?:the\s+)?(?:n\s*p\s*c|npcs?|non[- ]player characters?)(?:\s+(?:creation|section))?$/, destinations[10]],
      [/^(?:go to|open|show)\s+(?:my\s+)?character(?: sheet)?$/, destinations[11]],
    ]
    const destination = directDestinations.find(([pattern]) => pattern.test(value))?.[1]
    if (destination) { completeNavigation(destination.path, `${destination.label} opened.`); return }
    if (openHeroMatch) {
      respond(`I could not find a saved Hero named ${openHeroMatch[1]}.`)
      return
    }
    search(original)
  }

  const toggleListening = async () => {
    if (!recognitionSupported) { respond('Voice recognition is not supported by this browser. You can still type commands.'); return }
    if (listening) {
      playListeningTone('stop')
      keepListeningRef.current = false
      window.clearTimeout(mobileCommandTimerRef.current)
      recognitionRef.current?.stop()
      stopLocalRecognition()
      setListening(false)
      setStatus('Listening stopped.')
      return
    }
    playListeningTone('start')
    const mobileRecognition = window.matchMedia('(max-width: 768px)').matches
    let braveBrowser = false
    try { braveBrowser = Boolean(await navigator.brave?.isBrave?.()) } catch { braveBrowser = false }
    const useLocalRecognition = mobileRecognition || braveBrowser
    if (useLocalRecognition && localRecognitionSupported) {
      keepListeningRef.current = true
      setListening(true)
      try {
        setStatus(localModelRef.current ? 'Opening the microphone.' : 'Loading high-accuracy Whisper recognition on this device. The first use downloads and caches the model.')
        if (!localModelRef.current) {
          speak('Whisper is loading on this device. The first download may take a moment.', { force: true })
          const { pipeline, env } = await import('@huggingface/transformers')
          if (!import.meta.env.DEV) env.remoteHost = `${window.location.origin}/model-proxy/`
          const modelProgress = expectedMegabytes => {
            const downloadedByFile = new Map()
            let displayedPercent = 0
            return progress => {
              if (progress.status !== 'progress' || !progress.file) return
              downloadedByFile.set(progress.file, Math.max(downloadedByFile.get(progress.file) || 0, Number(progress.loaded) || 0))
              const downloadedBytes = [...downloadedByFile.values()].reduce((total, loaded) => total + loaded, 0)
              displayedPercent = Math.max(displayedPercent, Math.min(99, Math.floor((downloadedBytes / (expectedMegabytes * 1048576)) * 100)))
              setStatus(`Loading Whisper on this device: ${displayedPercent}%.`)
            }
          }
          let webgpuAvailable = false
          try { webgpuAvailable = Boolean(await navigator.gpu?.requestAdapter()) } catch { webgpuAvailable = false }
          if (webgpuAvailable && !braveBrowser) {
            try {
              localModelRef.current = await pipeline('automatic-speech-recognition', WHISPER_MODEL, { device: 'webgpu', dtype: 'q4', progress_callback: modelProgress(145) })
            } catch (webgpuError) {
              console.warn('Whisper WebGPU initialization failed; retrying with WASM.', webgpuError)
              setStatus('This device could not initialize Whisper with its GPU. Retrying locally with the compatible processor mode.')
            }
          }
          if (!localModelRef.current) localModelRef.current = await pipeline('automatic-speech-recognition', WHISPER_MODEL, { device: 'wasm', dtype: 'q8', progress_callback: modelProgress(80) })
          speak('Whisper has finished loading. Opening the microphone now.', { force: true })
          await waitForSpeech()
        }
        if (!keepListeningRef.current) return
        setStatus('Loading Whisper on this device: 100%. Opening the microphone.')
        const AudioContextClass = window.AudioContext || window.webkitAudioContext
        const audioContext = new AudioContextClass({ sampleRate: 16000 })
        const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, channelCount: 1 } })
        if (!keepListeningRef.current) { stream.getTracks().forEach(track => track.stop()); await audioContext.close(); return }
        const source = audioContext.createMediaStreamSource(stream)
        const processor = audioContext.createScriptProcessor(4096, 1, 1)
        const silentOutput = audioContext.createGain()
        silentOutput.gain.value = 0
        let utteranceChunks = []
        let preRoll = []
        let speechStartedAt = 0
        let lastSpeechAt = 0
        let transcriptionQueue = Promise.resolve()
        const transcribe = chunks => {
          if (!chunks.length) return
          const length = chunks.reduce((total, chunk) => total + chunk.length, 0)
          if (length < audioContext.sampleRate * .3) return
          const audio = new Float32Array(length)
          let offset = 0
          chunks.forEach(chunk => { audio.set(chunk, offset); offset += chunk.length })
          transcriptionQueue = transcriptionQueue.then(async () => {
            if (!keepListeningRef.current) return
            setStatus('Speech captured. Whisper is recognizing the words.')
            const result = await localModelRef.current(audio)
            const rawTranscript = String(result?.text || '').trim()
            const transcript = cleanSpeechTranscript(rawTranscript)
            if (isNonSpeechTranscript(rawTranscript) || !transcript) {
              if (keepListeningRef.current) setStatus('Non-speech audio ignored. Listening for a command.')
              return
            }
            if (!keepListeningRef.current || speechActiveRef.current) {
              if (keepListeningRef.current) setStatus('Listening continuously. Say the command again if it was not recognized.')
              return
            }
            setCommand(transcript)
            setStatus(`Processing: “${transcript}”`)
            execute(transcript)
          }).catch(error => {
            console.error('Whisper could not transcribe the captured sentence.', error)
            if (keepListeningRef.current) setStatus('That sentence could not be recognized. Listening for another command.')
          })
        }
        processor.onaudioprocess = event => {
          if (!speechActiveRef.current && keepListeningRef.current) {
            const chunk = new Float32Array(event.inputBuffer.getChannelData(0))
            const rms = Math.sqrt(chunk.reduce((sum, sample) => sum + (sample * sample), 0) / chunk.length)
            const now = performance.now()
            preRoll.push(chunk)
            if (preRoll.length > 4) preRoll.shift()
            if (rms > .012) {
              if (!speechStartedAt) {
                speechStartedAt = now
                utteranceChunks = [...preRoll]
                setStatus('Speech detected. Keep talking.')
              }
              lastSpeechAt = now
            }
            if (speechStartedAt) utteranceChunks.push(chunk)
            if ((speechStartedAt && now - lastSpeechAt > 1250) || (speechStartedAt && now - speechStartedAt > 20000)) {
              const completed = utteranceChunks
              utteranceChunks = []
              preRoll = []
              speechStartedAt = 0
              lastSpeechAt = 0
              transcribe(completed)
            }
          }
        }
        source.connect(processor)
        processor.connect(silentOutput)
        silentOutput.connect(audioContext.destination)
        localAudioContextRef.current = audioContext
        localStreamRef.current = stream
        localRecognizerRef.current = { remove: () => { utteranceChunks = []; preRoll = [] } }
        localSourceRef.current = source
        localProcessorRef.current = processor
        recognitionRunningRef.current = true
        setStatus('High-accuracy Whisper is listening continuously on this device. Press Stop listening when you are done.')
      } catch (error) {
        console.error('High-accuracy recognition startup failed.', error)
        keepListeningRef.current = false
        recognitionRunningRef.current = false
        stopLocalRecognition()
        setListening(false)
        const detail = String(error?.message || '').toLowerCase()
        const reason = /quota|storage|space|memory|allocation/.test(detail) ? 'The device may not have enough available storage or memory for the model.' : /fetch|network|load|download|http/.test(detail) ? 'The model download failed or was blocked.' : 'The browser could not initialize either its GPU or compatible processor recognition mode.'
        respond(error?.name === 'NotAllowedError' ? 'Microphone access was denied. Allow it in your browser settings and try again.' : `High-accuracy on-device recognition could not start. ${reason} You can still type commands.`)
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
        const rawTranscript = event.results[event.results.length - 1][0].transcript.trim()
        const transcript = cleanSpeechTranscript(rawTranscript)
        if (isNonSpeechTranscript(rawTranscript) || !transcript) {
          setStatus('Non-speech audio ignored. Listening for a command.')
          return
        }
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
    const scrollX = window.scrollX
    const scrollY = window.scrollY
    const bodyStyle = document.body.style.cssText
    const rootOverflow = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.inset = `${-scrollY}px 0 0 ${-scrollX}px`
    document.body.style.width = '100%'
    document.body.style.overflow = 'hidden'
    setStatus('Game commands opened. Type a command or activate Start Listening.')
    window.setTimeout(() => {
      const mobile = window.matchMedia('(max-width: 768px)').matches
      if (!mobile) inputRef.current?.focus()
      if (mobile) {
        inputRef.current?.blur()
        closeButtonRef.current?.focus({ preventScroll: true })
        document.querySelector('.character-command-guide')?.removeAttribute('open')
      }
    }, 0)
    const dismiss = event => { if (event.key === 'Escape') close() }
    window.addEventListener('keydown', dismiss)
    return () => {
      window.removeEventListener('keydown', dismiss)
      document.body.style.cssText = bodyStyle
      document.documentElement.style.overflow = rootOverflow
      window.scrollTo(scrollX, scrollY)
    }
  }, [open])

  const chooseResult = result => {
    completeNavigation(result.path, `${result.label} opened.`, result.character)
  }
  const exampleCommand = text => { setCommand(text); inputRef.current?.focus() }
  const openCommands = () => {
    if (window.matchMedia('(max-width: 768px)').matches && document.activeElement instanceof HTMLElement) document.activeElement.blur()
    setOpen(true)
  }
  return <>
    <button ref={triggerRef} type="button" className="command-trigger" aria-label="Open game commands" onClick={openCommands}>⌘ <span>Command</span></button>
    {speaking && <button type="button" className="speech-stop" onClick={stopSpeaking}>■ Stop reading</button>}
    <div className="visually-hidden" role="status" aria-live="polite" aria-atomic="true">{status}</div>
    {open && createPortal(<div className="command-backdrop" onMouseDown={event => event.target === event.currentTarget && close()}><section className="command-dialog" role="dialog" aria-modal="true" aria-labelledby="command-title"><button ref={closeButtonRef} type="button" className="command-close" aria-label="Close game commands" onClick={close}>×</button><span className="command-eyebrow">GAME COMMANDS</span><h2 id="command-title">What would you like to do?</h2><form onSubmit={event => { event.preventDefault(); execute(command) }}><label htmlFor="command-input">Type or speak a command</label><div className="command-entry"><input ref={inputRef} id="command-input" type="text" autoComplete="off" value={command} onChange={event => setCommand(event.target.value)} placeholder={onCharacterSheet ? 'Roll to hit with my katana' : 'Open character Roderick'}/><button type="submit">Run</button></div></form><div className="command-options"><button type="button" className={listening ? 'is-listening' : ''} aria-pressed={listening} onClick={toggleListening}>{listening ? '■ Stop listening' : '● Start listening'}</button><label><input type="checkbox" checked={spoken} onChange={event => { const enabled = event.target.checked; setSpoken(enabled); localStorage.setItem(SPEECH_KEY, String(enabled)) }}/><span>Speak responses aloud</span></label></div><div className="command-status" role="status" aria-live="polite" aria-atomic="true">{status}</div>{results.length > 0 && <div className="command-results" aria-label="Command results">{results.map(result => <button type="button" key={`${result.action || result.path}-${result.label}`} onClick={() => chooseResult(result)}><strong>{result.label}</strong><span>{result.detail}</span></button>)}</div>}{onCharacterSheet ? <details className="character-command-guide" open><summary>Common Character Sheet commands</summary><div className="command-examples">{commonCharacterCommands.map(example => <button type="button" key={example} onClick={() => exampleCommand(example)}>{example}</button>)}</div></details> : <div className="command-examples"><strong>Try a command</strong><button type="button" onClick={() => exampleCommand('Open my character sheet')}>Open my character sheet</button><button type="button" onClick={() => exampleCommand('Go to Talents')}>Go to Talents</button><button type="button" onClick={() => exampleCommand('Search for healing')}>Search for healing</button><button type="button" onClick={() => execute('Help')}>Help</button></div>}{!recognitionSupported && <p className="command-support-note">Voice recognition is unavailable in this browser. Typed commands and spoken responses still work.</p>}</section></div>, document.body)}
  </>
}

export default CommandInterface
