import { useEffect, useState } from 'react'
import { createBlankCharacterSheetPdf } from '../utils/characterSheetPdf'
import { renderPdfFirstPage } from '../utils/pdfPreview'

export default function BlankCharacterSheetPreview() {
  const [url, setUrl] = useState('')
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let cancelled = false
    let objectUrl
    createBlankCharacterSheetPdf().then(renderPdfFirstPage).then(blob => {
      if (cancelled) return
      objectUrl = URL.createObjectURL(blob)
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
      <img src={url} width="1224" height="1584" alt="First page of the blank Multiverse Adventurers Guild character sheet" />
    </div>
  )
}
