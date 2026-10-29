const unavailable = 'News is temporarily unavailable. Please try again shortly.'

const entities: Record<string, string> = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ',
  ndash: '–', mdash: '—', lsquo: '‘', rsquo: '’', ldquo: '“', rdquo: '”',
  hellip: '…', pound: '£', euro: '€', copy: '©', bull: '•', middot: '·',
}

function plainText(value: unknown) {
  if (typeof value !== 'string') return ''
  return value
    .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&(#x[\da-f]+|#\d+|[a-z]+);/gi, (match, entity: string) => {
      if (!entity.startsWith('#')) return entities[entity] ?? match
      const code = entity[1].toLowerCase() === 'x'
        ? Number.parseInt(entity.slice(2), 16)
        : Number.parseInt(entity.slice(1), 10)
      return code > 0 && code <= 0x10ffff && !(code >= 0xd800 && code <= 0xdfff)
        ? String.fromCodePoint(code)
        : ' '
    })
    .replace(/\s+/g, ' ')
    .trim()
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function httpsUrl(value: unknown, allowedHost: string) {
  if (typeof value !== 'string') return null
  try {
    const url = new URL(value)
    return url.protocol === 'https:' && !url.username && !url.password &&
      (url.hostname === allowedHost || url.hostname.endsWith(`.${allowedHost}`))
      ? url.href : null
  } catch {
    return null
  }
}

function normalizeArticle(value: unknown) {
  if (!isRecord(value) || value.type !== 'article') return null
  const fields = isRecord(value.fields) ? value.fields : {}
  const title = plainText(value.webTitle)
  const url = httpsUrl(value.webUrl, 'theguardian.com')
  const date = typeof value.webPublicationDate === 'string' ? value.webPublicationDate : ''
  const excerpt = plainText(fields.trailText) || plainText(fields.standfirst)
  // Missing thumbnails use the card's neutral fallback; incomplete text is backfilled.
  if (!title || !url || !Number.isFinite(Date.parse(date)) || !excerpt) return null
  return {
    id: typeof value.id === 'string' ? value.id : url,
    title, date, url, excerpt,
    category: plainText(value.sectionName) || null,
    thumbnail: httpsUrl(fields.thumbnail, 'guim.co.uk'),
    byline: plainText(fields.byline),
  }
}

function json(body: unknown, status = 200) {
  return Response.json(body, {
    status,
    headers: {
      'Cache-Control': status === 200 ? 'public, max-age=300' : 'no-store',
      'Netlify-CDN-Cache-Control': status === 200
        ? 'public, durable, max-age=900, stale-while-revalidate=60' : 'no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  })
}

export default async function news(request: Request) {
  if (request.method !== 'GET') {
    return new Response(null, { status: 405, headers: { Allow: 'GET', 'Cache-Control': 'no-store' } })
  }

  const key = process.env.GUARDIAN_API_KEY?.trim()
  if (!key) return json({ error: unavailable }, 503)

  // A fixed upstream request: callers cannot forward arbitrary queries or URLs.
  const url = new URL('https://content.guardianapis.com/search')
  url.search = new URLSearchParams({
    'api-key': key,
    'order-by': 'newest',
    'page-size': '30',
    'show-fields': 'thumbnail,trailText,standfirst,byline',
  }).toString()

  try {
    const response = await fetch(url, {
      headers: { Accept: 'application/json' },
      redirect: 'error',
      signal: AbortSignal.timeout(10000),
    })
    if (!response.ok) return json({ error: unavailable }, 502)
    const data: unknown = await response.json()
    if (!isRecord(data) || !isRecord(data.response) ||
      data.response.status !== 'ok' || !Array.isArray(data.response.results)) {
      return json({ error: unavailable }, 502)
    }

    const articles = data.response.results.map(normalizeArticle)
      .filter(article => article !== null)
      .filter((article, index, all) => all.findIndex(other => other.url === article.url) === index)
      .slice(0, 12)
    return json({ articles })
  } catch {
    // Upstream exceptions can contain the authenticated URL. Never return or log them.
    return json({ error: unavailable }, 502)
  }
}
