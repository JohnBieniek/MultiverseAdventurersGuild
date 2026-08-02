import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
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

const normalize = value => String(value || '').trim().toLowerCase().replace(/[?.!,]/g, '')
const savedCharacters = () => {
  try { return JSON.parse(localStorage.getItem(STORE_KEY)) || [] } catch { return [] }
}

function CommandInterface() {
  const navigate = useNavigate()
  const triggerRef = useRef(null)
  const inputRef = useRef(null)
  const recognitionRef = useRef(null)
  const keepListeningRef = useRef(false)
  const lastResponseRef = useRef('')
  const [open, setOpen] = useState(false)
  const [command, setCommand] = useState('')
  const [status, setStatus] = useState('')
  const [results, setResults] = useState([])
  const [listening, setListening] = useState(false)
  const [spoken, setSpoken] = useState(() => localStorage.getItem(SPEECH_KEY) === 'true')
  const recognitionSupported = typeof window !== 'undefined' && Boolean(window.SpeechRecognition || window.webkitSpeechRecognition)

  const speak = message => {
    if (!spoken || !window.speechSynthesis) return
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(message))
  }
  const respond = message => {
    lastResponseRef.current = message
    setStatus(message)
    speak(message)
  }
  const close = () => {
    keepListeningRef.current = false
    recognitionRef.current?.stop()
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
    const characters = savedCharacters().filter(hero => normalize(hero.name).includes(query)).map(hero => ({ label: hero.name, path: '/character-sheet', character: hero, detail: 'Saved Hero' }))
    const pages = destinations.filter(item => `${normalize(item.label)} ${item.terms}`.includes(query)).map(item => ({ ...item, detail: 'App section' }))
    const matches = [...characters, ...pages].slice(0, 8)
    setResults(matches)
    respond(matches.length ? `Found ${matches.length} result${matches.length === 1 ? '' : 's'} for ${term}.` : `I could not find ${term}. Try Talents, Skills, Weapons, Rules, or a saved Hero's name.`)
  }
  const execute = rawCommand => {
    const original = String(rawCommand || '').trim()
    const value = normalize(original)
    setCommand(original)
    setResults([])
    if (!value) { respond('Type or speak a command first.'); return }
    if (['cancel', 'close', 'never mind', 'nevermind'].includes(value)) { close(); return }
    if (['repeat', 'say that again', 'read again'].includes(value)) { speak(lastResponseRef.current || 'There is nothing to repeat yet.'); return }
    if (['help', 'what can i say', 'commands'].includes(value)) {
      respond('You can open a saved Hero by name, open app sections, or search the app. Try: open character Roderick, go to Talents, open Rules, or search for healing.')
      return
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
    const characterMatch = original.match(/^(?:open|load|show)\s+(?:character\s+)?(.+?)(?:\s+character(?:\s+sheet)?)?$/i)
    if (characterMatch) {
      const requestedName = normalize(characterMatch[1])
      const characters = savedCharacters()
      const exact = characters.find(hero => normalize(hero.name) === requestedName)
      const partial = characters.filter(hero => normalize(hero.name).includes(requestedName))
      const hero = exact || (partial.length === 1 ? partial[0] : null)
      if (hero) { completeNavigation('/character-sheet', `${hero.name}'s character sheet opened.`, hero); return }
      if (partial.length > 1) {
        setResults(partial.map(character => ({ label: character.name, path: '/character-sheet', character, detail: 'Saved Hero' })))
        respond(`I found ${partial.length} matching Heroes. Choose one.`)
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
    recognition.continuous = true
    recognition.interimResults = false
    recognition.lang = document.documentElement.lang || 'en-US'
    recognition.onstart = () => { setListening(true); setStatus('Listening.') }
    recognition.onresult = event => {
      const transcript = event.results[event.results.length - 1][0].transcript
      setCommand(transcript)
      execute(transcript)
    }
    recognition.onerror = event => {
      keepListeningRef.current = false
      setListening(false)
      respond(event.error === 'not-allowed' ? 'Microphone access was denied. You can still type commands.' : 'I could not hear a command. Try again or type it instead.')
    }
    recognition.onend = () => {
      setListening(false)
      if (keepListeningRef.current) {
        try { recognition.start() } catch { keepListeningRef.current = false }
      }
    }
    recognitionRef.current = recognition
    keepListeningRef.current = true
    recognition.start()
  }

  useEffect(() => () => {
    keepListeningRef.current = false
    recognitionRef.current?.abort()
    window.speechSynthesis?.cancel()
  }, [])
  useEffect(() => {
    if (!open) return undefined
    setStatus('Game commands opened. Type a command or activate Start Listening.')
    window.setTimeout(() => inputRef.current?.focus(), 0)
    const dismiss = event => { if (event.key === 'Escape') close() }
    window.addEventListener('keydown', dismiss)
    return () => window.removeEventListener('keydown', dismiss)
  }, [open])

  const chooseResult = result => completeNavigation(result.path, `${result.label} opened.`, result.character)
  return <>
    <button ref={triggerRef} type="button" className="command-trigger" aria-label="Open game commands" onClick={() => setOpen(true)}>⌘ <span>Command</span></button>
    <div className="visually-hidden" role="status" aria-live="polite" aria-atomic="true">{status}</div>
    {open && createPortal(<div className="command-backdrop" onMouseDown={event => event.target === event.currentTarget && close()}><section className="command-dialog" role="dialog" aria-modal="true" aria-labelledby="command-title"><button type="button" className="command-close" aria-label="Close game commands" onClick={close}>×</button><span className="command-eyebrow">GAME COMMANDS</span><h2 id="command-title">What would you like to do?</h2><form onSubmit={event => { event.preventDefault(); execute(command) }}><label htmlFor="command-input">Type or speak a command</label><div className="command-entry"><input ref={inputRef} id="command-input" type="text" autoComplete="off" value={command} onChange={event => setCommand(event.target.value)} placeholder="Open character Roderick"/><button type="submit">Run</button></div></form><div className="command-options"><button type="button" className={listening ? 'is-listening' : ''} aria-pressed={listening} onClick={toggleListening}>{listening ? '■ Stop listening' : '● Start listening'}</button><label><input type="checkbox" checked={spoken} onChange={event => { const enabled = event.target.checked; setSpoken(enabled); localStorage.setItem(SPEECH_KEY, String(enabled)) }}/><span>Speak responses aloud</span></label></div><div className="command-status" role="status" aria-live="polite" aria-atomic="true">{status}</div>{results.length > 0 && <div className="command-results" aria-label="Command results">{results.map(result => <button type="button" key={`${result.path}-${result.label}`} onClick={() => chooseResult(result)}><strong>{result.label}</strong><span>{result.detail}</span></button>)}</div>}<div className="command-examples"><strong>Try a command</strong><button type="button" onClick={() => { setCommand('Open my character sheet'); inputRef.current?.focus() }}>Open my character sheet</button><button type="button" onClick={() => { setCommand('Go to Talents'); inputRef.current?.focus() }}>Go to Talents</button><button type="button" onClick={() => { setCommand('Search for healing'); inputRef.current?.focus() }}>Search for healing</button><button type="button" onClick={() => execute('Help')}>Help</button></div>{!recognitionSupported && <p className="command-support-note">Voice recognition is unavailable in this browser. Typed commands and spoken responses still work.</p>}</section></div>, document.body)}
  </>
}

export default CommandInterface
