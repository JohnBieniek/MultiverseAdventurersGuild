const MODEL_PREFIX = '/model-proxy/'
const ALLOWED_MODEL = 'onnx-community/whisper-base.en/'

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    if (!url.pathname.startsWith(MODEL_PREFIX)) return env.ASSETS.fetch(request)
    if (!['GET', 'HEAD'].includes(request.method)) return new Response('Method not allowed', { status: 405 })

    const modelPath = decodeURIComponent(url.pathname.slice(MODEL_PREFIX.length))
    if (!modelPath.startsWith(ALLOWED_MODEL) || modelPath.includes('..')) return new Response('Model not allowed', { status: 403 })

    const upstreamUrl = new URL(modelPath, 'https://huggingface.co/')
    upstreamUrl.search = url.search
    const headers = new Headers()
    const range = request.headers.get('Range')
    if (range) headers.set('Range', range)
    const upstream = await fetch(upstreamUrl, { method: request.method, headers, redirect: 'follow' })
    const responseHeaders = new Headers(upstream.headers)
    responseHeaders.set('Cache-Control', 'public, max-age=31536000, immutable')
    responseHeaders.delete('Set-Cookie')
    return new Response(upstream.body, { status: upstream.status, statusText: upstream.statusText, headers: responseHeaders })
  },
}
