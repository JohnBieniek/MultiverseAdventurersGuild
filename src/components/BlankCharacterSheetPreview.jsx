import { useEffect, useState } from 'react'
import { createBlankCharacterSheetPdf } from '../utils/characterSheetPdf'

export default function BlankCharacterSheetPreview() {
  const [url, setUrl] = useState('')
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let cancelled = false
    let objectUrl
    createBlankCharacterSheetPdf().then(bytes => {
      if (cancelled) return
      objectUrl = URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' }))
      setUrl(objectUrl)
    }).catch(() => { if (!cancelled) setFailed(true) })
    return () => {
      cancelled = true
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [])

  if (!url) return <p role="status">{failed ? 'Preview unavailable. Use Download Character Sheet below.' : 'Preparing blank character sheet…'}</p>

  return (
    <div className="guide-media">
      <iframe className="guide-sheet-preview" src={url} title="Blank Multiverse Adventurers Guild character sheet" />
    </div>
  )
}
