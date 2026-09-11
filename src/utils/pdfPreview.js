import pdfLibraryUrl from 'pdfjs-dist/build/pdf.min.mjs?url'
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'

export async function renderPdfFirstPage(bytes) {
  const { getDocument, GlobalWorkerOptions } = await import(/* @vite-ignore */ pdfLibraryUrl)
  GlobalWorkerOptions.workerSrc = pdfWorkerUrl
  const task = getDocument({ data: bytes, useSystemFonts: true })
  try {
    const pdf = await task.promise
    const page = await pdf.getPage(1)
    const viewport = page.getViewport({ scale: 2 })
    const canvas = document.createElement('canvas')
    canvas.width = Math.ceil(viewport.width)
    canvas.height = Math.ceil(viewport.height)
    await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise
    return await new Promise((resolve, reject) => {
      canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error('Could not render character sheet preview')), 'image/png')
    })
  } finally {
    await task.destroy()
  }
}
