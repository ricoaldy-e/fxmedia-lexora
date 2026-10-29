import { useCallback, useEffect, useRef, useState } from 'react'
import './News.css'

type Article = {
  id: string
  title: string
  date: string
  url: string
  thumbnail: string | null
  excerpt: string
  byline: string
}

type NewsState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'ready'; articles: Article[] }

const dateFormat = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC',
})

// Share only an in-flight request, including React StrictMode's effect replay.
let pendingRequest: Promise<Article[]> | undefined
function isArticle(value: unknown): value is Article {
  if (typeof value !== 'object' || value === null) return false
  const article = value as Partial<Article>
  return typeof article.id === 'string' && typeof article.title === 'string' &&
    typeof article.date === 'string' && Number.isFinite(Date.parse(article.date)) &&
    typeof article.url === 'string' && article.url.startsWith('https://') &&
    (article.thumbnail === null || typeof article.thumbnail === 'string') &&
    typeof article.excerpt === 'string' && typeof article.byline === 'string'
}

function loadNews() {
  pendingRequest ??= fetch('/.netlify/functions/news', {
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(15000),
  }).then(async response => {
    if (!response.ok) throw new Error('News unavailable')
    const data = await response.json()
    if (!data || !Array.isArray(data.articles)) throw new Error('Invalid news response')
    if (!data.articles.every(isArticle)) throw new Error('Invalid article metadata')
    return data.articles as Article[]
  }).finally(() => { pendingRequest = undefined })
  return pendingRequest
}

function NewsImage({ thumbnail }: { thumbnail: string | null }) {
  const [failed, setFailed] = useState(false)
  return (
    <div className="news-image">
      {thumbnail && !failed ? (
        <img src={thumbnail} alt="" loading="lazy" onError={() => setFailed(true)} />
      ) : (
        <span className="news-image-fallback">Image unavailable</span>
      )}
    </div>
  )
}

function NewsSkeleton() {
  return (
    <>
      <p className="sr-only" role="status">Loading the latest news…</p>
      <div className="news-track news-skeleton-track" aria-hidden="true">
        {[0, 1, 2].map(index => (
          <div className="news-slide news-card news-skeleton-card" key={index}>
            <div className="news-image news-skeleton-block" />
            <div className="news-card-copy">
              <div className="news-date"><span className="news-skeleton-block news-skeleton-date" /></div>
              <div className="news-card-title news-skeleton-lines">
                <span className="news-skeleton-block" /><span className="news-skeleton-block" />
              </div>
              <div className="news-excerpt news-skeleton-lines">
                <span className="news-skeleton-block" /><span className="news-skeleton-block" /><span className="news-skeleton-block" />
              </div>
              <div className="news-byline"><span className="news-skeleton-block news-skeleton-byline" /></div>
              <div className="news-read-more"><span className="news-skeleton-block news-skeleton-action" /></div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default function News() {
  const [state, setState] = useState<NewsState>({ status: 'loading' })
  const [attempt, setAttempt] = useState(0)
  const [position, setPosition] = useState({ first: 0, visible: 1 })
  const [rotationEnabled, setRotationEnabled] = useState(() => !matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [reducedMotion, setReducedMotion] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [hovered, setHovered] = useState(false)
  const [pageVisible, setPageVisible] = useState(() => !document.hidden)
  const trackRef = useRef<HTMLUListElement>(null)
  const firstRef = useRef(0)
  const pointerRotationRef = useRef(false)

  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)')
    function updateMotion() {
      setReducedMotion(preference.matches)
      if (preference.matches) setRotationEnabled(false)
    }
    function updateVisibility() { setPageVisible(!document.hidden) }
    preference.addEventListener('change', updateMotion)
    document.addEventListener('visibilitychange', updateVisibility)
    return () => {
      preference.removeEventListener('change', updateMotion)
      document.removeEventListener('visibilitychange', updateVisibility)
    }
  }, [])

  useEffect(() => {
    let active = true
    loadNews().then(
      articles => { if (active) setState({ status: 'ready', articles }) },
      () => { if (active) setState({ status: 'error' }) },
    )
    return () => { active = false }
  }, [attempt])

  const count = state.status === 'ready' ? state.articles.length : 0

  useEffect(() => {
    const track = trackRef.current
    if (!track || count === 0) return

    function measure() {
      if (!track) return
      const card = track.firstElementChild as HTMLElement | null
      if (!card) return
      const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0
      const step = card.getBoundingClientRect().width + gap
      const visible = Math.round((track.clientWidth + gap) / step)
      const first = Math.min(Math.max(0, count - visible), Math.round(track.scrollLeft / step))
      firstRef.current = first
      if (first >= Math.max(0, count - visible)) setRotationEnabled(false)
      setPosition(previous => previous.first === first && previous.visible === visible
        ? previous : { first, visible })
    }

    const observer = new ResizeObserver(() => {
      // Re-align the current item after changing between the 1/2/3-card layouts.
      const card = track.firstElementChild as HTMLElement | null
      if (card) {
        const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0
        const step = card.getBoundingClientRect().width + gap
        const visible = Math.round((track.clientWidth + gap) / step)
        const first = Math.max(0, Math.min(firstRef.current, count - visible))
        track.scrollTo({ left: first * step, behavior: 'instant' })
      }
      measure()
    })
    observer.observe(track)
    track.addEventListener('scroll', measure, { passive: true })
    measure()
    return () => { observer.disconnect(); track.removeEventListener('scroll', measure) }
  }, [count])

  const move = useCallback((direction: number) => {
    const track = trackRef.current
    const card = track?.firstElementChild as HTMLElement | null
    if (!track || !card) return
    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0
    const step = card.getBoundingClientRect().width + gap
    const next = Math.max(0, Math.min(count - position.visible, Math.round(track.scrollLeft / step) + direction))
    track.scrollTo({ left: next * step, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
  }, [count, position.visible])

  const atEnd = count > 0 && position.first >= Math.max(0, count - position.visible)

  useEffect(() => {
    if (atEnd || !rotationEnabled || hovered || !pageVisible || reducedMotion || count <= position.visible) return
    const timer = window.setTimeout(() => move(1), 6000)
    return () => window.clearTimeout(timer)
  }, [atEnd, rotationEnabled, hovered, pageVisible, reducedMotion, count, position.visible, position.first, move])

  function manualMove(direction: number) {
    setRotationEnabled(false)
    move(direction)
  }

  function retry() {
    setState({ status: 'loading' })
    setAttempt(value => value + 1)
  }

  return (
    <section id="media" className="news-section" aria-labelledby="news-title" aria-roledescription="carousel"
      onPointerEnter={event => { if (event.pointerType !== 'touch') setHovered(true) }}
      onPointerLeave={() => setHovered(false)}
      onFocusCapture={() => setRotationEnabled(false)}>
      <div className="news-heading-row">
        <h2 id="news-title" className="section-label font-display uppercase text-burgundy underline underline-offset-4">
          Media &amp; press
        </h2>
        {count > 0 && (
          <div className="news-controls" role="group" aria-label="News carousel controls">
            <button type="button" aria-label={rotationEnabled ? 'Pause news autoplay' : 'Play news autoplay'}
              aria-controls="news-track" disabled={reducedMotion || count <= position.visible || atEnd}
              title={reducedMotion ? 'Autoplay is off while reduced motion is enabled' : undefined}
              onPointerDown={() => { pointerRotationRef.current = rotationEnabled }}
              onClick={event => {
                // Pointer intent is captured before focus stops rotation; keyboard Play remains explicit.
                setRotationEnabled(!(event.detail === 0 ? rotationEnabled : pointerRotationRef.current))
              }}>
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                {rotationEnabled ? <path d="M7 5h3v14H7zm7 0h3v14h-3z" /> : <path d="m8 5 11 7-11 7z" />}
              </svg>
            </button>
            <button type="button" aria-label="Previous news" aria-controls="news-track"
              disabled={position.first === 0} onClick={() => manualMove(-1)}>
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 12H4m7-7-7 7 7 7" /></svg>
            </button>
            <button type="button" aria-label="Next news" aria-controls="news-track"
              disabled={position.first >= count - position.visible} onClick={() => manualMove(1)}>
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 12h16m-7-7 7 7-7 7" /></svg>
            </button>
          </div>
        )}
      </div>

      {state.status === 'loading' && <NewsSkeleton />}
      {state.status === 'error' && (
        <div className="news-message" role="alert">
          <p>We couldn’t load the news right now. Please try again shortly.</p>
          <button className="news-retry" type="button" onClick={retry}>Try again</button>
        </div>
      )}
      {state.status === 'ready' && count === 0 && (
        <p className="news-message" role="status">No news is available right now. Please check back soon.</p>
      )}
      {state.status === 'ready' && count > 0 && (
        <>
          <ul id="news-track" className="news-track" ref={trackRef} aria-label="Latest Guardian articles"
            onPointerDown={() => setRotationEnabled(false)} onWheel={() => setRotationEnabled(false)}>
            {state.articles.map((article, index) => (
              <li className="news-slide" key={article.id}>
                <article className="news-card" aria-labelledby={`news-article-${index}`}>
                  <NewsImage thumbnail={article.thumbnail} />
                  <div className="news-card-copy">
                    <time className="news-date" dateTime={article.date}>{dateFormat.format(new Date(article.date))}</time>
                    <h3 id={`news-article-${index}`} className="news-card-title font-display uppercase">{article.title}</h3>
                    <p className="news-excerpt">{article.excerpt}</p>
                    {article.byline && <p className="news-byline">{article.byline}</p>}
                    <a className="news-read-more" href={article.url} target="_blank" rel="noopener noreferrer">
                      Read more <span className="sr-only">about {article.title} (opens in a new tab)</span>
                      <span className="cta-arrow" aria-hidden="true"><img src="/assets/arrow-gold.svg" alt="" /></span>
                    </a>
                  </div>
                </article>
              </li>
            ))}
          </ul>
          <p className="news-position" role="status" aria-live={rotationEnabled ? 'off' : 'polite'} aria-atomic="true">
            Articles {position.first + 1}–{Math.min(count, position.first + position.visible)} of {count}
          </p>
        </>
      )}
      <a className="news-attribution" href="https://www.theguardian.com/" target="_blank" rel="noopener noreferrer">
        <img src="/assets/powered-by-the-guardian.png" width="140" height="45" alt="Powered by The Guardian (opens in a new tab)" />
      </a>
    </section>
  )
}
