import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useLocation, useNavigate } from 'react-router-dom'
import './CommandInterface.css'

const STORE_KEY = 'mag-playable-characters-v1'
const ACTIVE_CHARACTER_KEY = 'mag-active-character-v1'
const SPEECH_KEY = 'mag-command-spoken-responses-v1'

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
  const keepListeningRef = useRef(false)
  const lastResponseRef = useRef('')
  const speechActiveRef = useRef(false)
  const speechGenerationRef = useRef(0)
  const ignoreSpeechUntilRef = useRef(0)
  const restartTimerRef = useRef(null)
  const pendingActionRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [command, setCommand] = useState('')
  const [status, setStatus] = useState('')
  const [results, setResults] = useState([])
  const [listening, setListening] = useState(false)
  const [spoken, setSpoken] = useState(() => localStorage.getItem(SPEECH_KEY) === 'true')
  const [pendingAction, setPendingAction] = useState(null)
  const recognitionSupported = typeof window !== 'undefined' && Boolean(window.SpeechRecognition || window.webkitSpeechRecognition)
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
  const speak = message => {
    if (!spoken || !window.speechSynthesis) return
    const generation = speechGenerationRef.current + 1
    speechGenerationRef.current = generation
    speechActiveRef.current = true
    ignoreSpeechUntilRef.current = Infinity
    recognitionRef.current?.abort()
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(message)
    const finished = () => {
      if (speechGenerationRef.current !== generation) return
      speechActiveRef.current = false
      ignoreSpeechUntilRef.current = Date.now() + 900
      if (keepListeningRef.current) resumeRecognition(950)
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
    recognitionRef.current?.stop()
    window.speechSynthesis?.cancel()
    setListening(false)
    setOpen(false)
    window.setTimeout(() => triggerRef.current?.focus(), 0)
  }
  const completeNavigation = (path, message, character = null) => {
    keepListeningRef.current = false
    recognitionRef.current?.stop()
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
    respond(matches.length ? `Found ${matches.length} result${matches.length === 1 ? '' : 's'} for ${term}.` : `I could not find ${term}. Try Talents, Skills, Weapons, Rules, or a saved Hero's name.`)
  }
  const execute = rawCommand => {
    const original = String(rawCommand || '').trim()
    const spokenCommand = original.replace(/[?.!,]+$/, '')
    const value = normalize(original)
    setCommand(original)
    setResults([])
    if (!value) { respond('Type or speak a command first.'); return }
    if (['confirm', 'confirm action', 'do it', 'apply it'].includes(value) && pendingActionRef.current) {
      respond(characterCommand(pendingActionRef.current))
      pendingActionRef.current = null
      setPendingAction(null)
      return
    }
    if (['cancel', 'never mind', 'nevermind'].includes(value) && pendingActionRef.current) { pendingActionRef.current = null; setPendingAction(null); respond('Action cancelled.'); return }
    if (['cancel', 'close', 'never mind', 'nevermind'].includes(value)) { close(); return }
    if (['repeat', 'say that again', 'read again'].includes(value)) { speak(lastResponseRef.current || 'There is nothing to repeat yet.'); return }
    if (['help', 'what can i say', 'commands'].includes(value)) {
      respond(onCharacterSheet ? 'On a Character Sheet you can ask about health, Ego, Defense, Resilience, Energy, XP, or Talents; roll dice, Skills, defenses, weapon attacks, and damage; add a Talent; heal; or take damage. State changes ask for confirmation.' : 'You can open a saved Hero by name, open app sections, or search the app. Try: open character Roderick, go to Talents, open Rules, or search for healing.')
      return
    }
    if (onCharacterSheet) {
      const setScoreMatch = spokenCommand.match(/^(?:set|change|update)\s+(?:my\s+)?(.+?)\s+(?:to|at)\s+((?:minus|negative|plus|positive)?\s*(?:\d+|[a-z]+))$/i)
      const adjustScoreMatch = spokenCommand.match(/^(increase|raise|improve|decrease|lower|reduce)\s+(?:my\s+)?(.+?)(?:\s+by\s+((?:minus|negative|plus|positive)?\s*(?:\d+|[a-z]+)))?$/i)
      const addToScoreMatch = spokenCommand.match(/^add\s+((?:minus|negative|plus|positive)?\s*(?:\d+|[a-z]+))\s+to\s+(?:my\s+)?(.+)$/i)
      if (setScoreMatch || adjustScoreMatch || addToScoreMatch) {
        let score = setScoreMatch?.[1] || adjustScoreMatch?.[2] || addToScoreMatch?.[2]
        let kind = 'score'
        if (/defen[cs]e(?:\s+rating)?$/i.test(score)) { kind = 'defense'; score = 'defense' }
        else if (/\s+skill$/i.test(score)) { kind = /attack/i.test(score) ? 'attack' : 'skill'; score = score.replace(/\s+skill$/i, '') }
        else if (/\s+stat$/i.test(score)) { kind = 'stat'; score = score.replace(/\s+stat$/i, '') }
        const amountText = setScoreMatch?.[2] || adjustScoreMatch?.[3] || addToScoreMatch?.[1] || 'one'
        const amount = signedSpokenNumber(amountText)
        if (amount == null) { respond(`I could not determine the new value in ${original}.`); return }
        const operation = setScoreMatch ? 'set' : /^(?:decrease|lower|reduce)$/i.test(adjustScoreMatch?.[1] || '') ? 'subtract' : 'add'
        const pending = { intent: 'change-score', kind, score, operation, amount: Math.abs(amount) }
        if (operation === 'set') pending.amount = amount
        const preview = characterCommand({ ...pending, intent: 'preview-score' })
        if (/^Change /i.test(preview)) {
          pendingActionRef.current = pending
          setPendingAction(pending)
          setResults([{ label: 'Confirm', detail: 'Apply this score change', action: 'confirm' }, { label: 'Cancel', detail: 'Leave the score unchanged', action: 'cancel' }])
        }
        respond(preview)
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
        pendingActionRef.current = pending
        setPendingAction(pending)
        setResults([{ label: 'Confirm', detail: 'Apply this HP change', action: 'confirm' }, { label: 'Cancel', detail: 'Leave HP unchanged', action: 'cancel' }])
        respond(characterCommand({ intent: 'preview-health', operation, amount }))
        return
      }
      const addTalentMatch = spokenCommand.match(/^(?:add|learn|give me|take)\s+(?:the\s+)?(?:talent\s+)?(.+?)(?:\s+talent)?$/i)
      if (addTalentMatch && /talent/i.test(original)) {
        const pending = { intent: 'add-talent', talent: addTalentMatch[1] }
        const preview = characterCommand({ intent: 'preview-add-talent', talent: addTalentMatch[1] })
        if (/^Add /i.test(preview)) {
          pendingActionRef.current = pending
          setPendingAction(pending)
          setResults([{ label: 'Confirm', detail: 'Add this Talent', action: 'confirm' }, { label: 'Cancel', detail: 'Do not add it', action: 'cancel' }])
        }
        respond(preview)
        return
      }
      const explainTalentMatch = spokenCommand.match(/^(?:what does|what is|explain|read)\s+(?:the\s+)?(.+?)(?:\s+talent)?(?:\s+do)?$/i)
      if (explainTalentMatch && !/^(?:my\s+)?(?:health|hp|ego|defense|resilience|energy|level|xp|experience)/i.test(explainTalentMatch[1])) {
        respond(characterCommand({ intent: 'explain-talent', talent: explainTalentMatch[1] }))
        return
      }
      const readVitalMatch = spokenCommand.match(/^(?:what(?:'s| is)|how much|read|tell me)(?:\s+is)?\s+(?:my\s+)?(?:current\s+)?(health|hp|hit\s*points?|status|ego|defense|resilience|energy|level|xp|experience(?:\s+points?)?)$/i)
      if (readVitalMatch || /^(?:how am i doing|what is my condition|status)$/i.test(spokenCommand)) {
        const requestedVital = readVitalMatch?.[1] || 'status'
        const vital = /^experience/.test(normalize(requestedVital)) ? 'xp' : requestedVital
        respond(characterCommand({ intent: 'read-vital', vital }))
        return
      }
      const dieMatch = spokenCommand.match(/^roll(?:\s+a)?\s+d(\d+)$/i)
      if (dieMatch) { respond(characterCommand({ intent: 'roll-die', sides: dieMatch[1] })); return }
      if (/^roll(?:\s+the)?\s+damage$/i.test(spokenCommand)) { respond(characterCommand({ intent: 'roll-damage' })); return }
      const weaponMatch = spokenCommand.match(/^roll(?:\s+to\s+hit|\s+an?\s+attack)?\s+with\s+(?:my\s+|the\s+)?(.+?)(?:\s+weapon)?$/i)
      if (weaponMatch) { respond(characterCommand({ intent: 'roll-weapon', weapon: weaponMatch[1] })); return }
      const rollMatch = spokenCommand.match(/^roll(?:\s+my)?\s+(.+)$/i)
      if (rollMatch) { respond(characterCommand({ intent: 'roll-check', check: rollMatch[1] })); return }
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

  const toggleListening = () => {
    if (!recognitionSupported) { respond('Voice recognition is not supported by this browser. You can still type commands.'); return }
    if (listening) {
      keepListeningRef.current = false
      recognitionRef.current?.stop()
      setListening(false)
      respond('Listening stopped.')
      return
    }
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new Recognition()
    let announcedStart = false
    let retryDelay = 200
    let networkRetries = 0
    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = document.documentElement.lang || 'en-US'
    recognition.onstart = () => {
      setListening(true)
      if (!announcedStart) { setStatus('Listening.'); announcedStart = true }
    }
    recognition.onresult = event => {
      if (speechActiveRef.current || Date.now() < ignoreSpeechUntilRef.current) return
      const transcript = event.results[event.results.length - 1][0].transcript
      retryDelay = 200
      networkRetries = 0
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
      if (event.error === 'network' && keepListeningRef.current && networkRetries < 5) {
        networkRetries += 1
        retryDelay = Math.min(4000, 500 * networkRetries)
        setStatus(`Speech service temporarily unavailable. Retrying listening (${networkRetries} of 5).`)
        return
      }
      keepListeningRef.current = false
      setListening(false)
      const errors = {
        'not-allowed': 'Microphone access was denied. Allow microphone access in your browser settings, then try again. You can still type commands.',
        'service-not-allowed': 'This browser blocked its speech-recognition service. You can still type commands or try a supported browser.',
        'audio-capture': 'No working microphone was available. Check the selected microphone and operating-system permissions, then try again.',
        network: 'The browser speech-recognition service could not connect after five retries. Check your connection or type the command instead.',
        'language-not-supported': 'The browser does not support speech recognition for the current language. You can still type commands.',
      }
      respond(errors[event.error] || `Voice listening stopped because the browser reported ${event.error || 'an unknown error'}. Try again or type the command.`)
    }
    recognition.onend = () => {
      if (speechActiveRef.current) return
      if (keepListeningRef.current) {
        setListening(true)
        resumeRecognition(Math.max(retryDelay, ignoreSpeechUntilRef.current - Date.now()))
      } else setListening(false)
    }
    recognitionRef.current = recognition
    keepListeningRef.current = true
    recognition.start()
  }

  useEffect(() => () => {
    keepListeningRef.current = false
    speechGenerationRef.current += 1
    window.clearTimeout(restartTimerRef.current)
    recognitionRef.current?.abort()
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
    if (result.action === 'confirm' && pendingActionRef.current) {
      respond(characterCommand(pendingActionRef.current))
      pendingActionRef.current = null
      setPendingAction(null)
      setResults([])
      return
    }
    if (result.action === 'cancel') {
      pendingActionRef.current = null
      setPendingAction(null)
      setResults([])
      respond('Action cancelled.')
      return
    }
    completeNavigation(result.path, `${result.label} opened.`, result.character)
  }
  const exampleCommand = text => { setCommand(text); inputRef.current?.focus() }
  return <>
    <button ref={triggerRef} type="button" className="command-trigger" aria-label="Open game commands" onClick={() => setOpen(true)}>⌘ <span>Command</span></button>
    <div className="visually-hidden" role="status" aria-live="polite" aria-atomic="true">{status}</div>
    {open && createPortal(<div className="command-backdrop" onMouseDown={event => event.target === event.currentTarget && close()}><section className="command-dialog" role="dialog" aria-modal="true" aria-labelledby="command-title"><button type="button" className="command-close" aria-label="Close game commands" onClick={close}>×</button><span className="command-eyebrow">GAME COMMANDS</span><h2 id="command-title">What would you like to do?</h2><form onSubmit={event => { event.preventDefault(); execute(command) }}><label htmlFor="command-input">Type or speak a command</label><div className="command-entry"><input ref={inputRef} id="command-input" type="text" autoComplete="off" value={command} onChange={event => setCommand(event.target.value)} placeholder={onCharacterSheet ? 'Roll to hit with my katana' : 'Open character Roderick'}/><button type="submit">Run</button></div></form><div className="command-options"><button type="button" className={listening ? 'is-listening' : ''} aria-pressed={listening} onClick={toggleListening}>{listening ? '■ Stop listening' : '● Start listening'}</button><label><input type="checkbox" checked={spoken} onChange={event => { const enabled = event.target.checked; setSpoken(enabled); localStorage.setItem(SPEECH_KEY, String(enabled)) }}/><span>Speak responses aloud</span></label></div><div className="command-status" role="status" aria-live="polite" aria-atomic="true">{status}</div>{results.length > 0 && <div className="command-results" aria-label="Command results">{results.map(result => <button type="button" key={`${result.action || result.path}-${result.label}`} onClick={() => chooseResult(result)}><strong>{result.label}</strong><span>{result.detail}</span></button>)}</div>}{onCharacterSheet ? <details className="character-command-guide" open><summary>Common Character Sheet commands</summary><div className="command-examples"><button type="button" onClick={() => exampleCommand('What is my health?')}>What is my health?</button><button type="button" onClick={() => exampleCommand('Take 6 damage')}>Take 6 damage</button><button type="button" onClick={() => exampleCommand('Heal 4 health')}>Heal 4 health</button><button type="button" onClick={() => exampleCommand('Roll Ego')}>Roll Ego</button><button type="button" onClick={() => exampleCommand('Roll a d4')}>Roll a d4</button><button type="button" onClick={() => exampleCommand('Roll to hit with medium melee weapon')}>Attack with medium melee</button><button type="button" onClick={() => exampleCommand('Roll damage')}>Roll damage</button><button type="button" onClick={() => exampleCommand('What does Aim do?')}>Explain Aim</button><button type="button" onClick={() => exampleCommand('Add Talent Aim')}>Add Talent Aim</button></div><p>Also ask for Defense, Resilience, Energy, Level, XP, Initiative, or any Skill roll. Weapon attacks can use a weapon name or type.</p></details> : <div className="command-examples"><strong>Try a command</strong><button type="button" onClick={() => exampleCommand('Open my character sheet')}>Open my character sheet</button><button type="button" onClick={() => exampleCommand('Go to Talents')}>Go to Talents</button><button type="button" onClick={() => exampleCommand('Search for healing')}>Search for healing</button><button type="button" onClick={() => execute('Help')}>Help</button></div>}{!recognitionSupported && <p className="command-support-note">Voice recognition is unavailable in this browser. Typed commands and spoken responses still work.</p>}</section></div>, document.body)}
  </>
}

export default CommandInterface
