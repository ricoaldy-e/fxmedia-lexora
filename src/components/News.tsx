import { useEffect, useRef, useState } from 'react'
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

export default function News() {
  const [state, setState] = useState<NewsState>({ status: 'loading' })
  const [attempt, setAttempt] = useState(0)
  const [position, setPosition] = useState({ first: 0, visible: 1 })
  const trackRef = useRef<HTMLUListElement>(null)
  const firstRef = useRef(0)

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

  function move(direction: number) {
    const track = trackRef.current
    const card = track?.firstElementChild as HTMLElement | null
    if (!track || !card) return
    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0
    const step = card.getBoundingClientRect().width + gap
    const next = Math.max(0, Math.min(count - position.visible, Math.round(track.scrollLeft / step) + direction))
    track.scrollTo({ left: next * step, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
  }

  function retry() {
    setState({ status: 'loading' })
    setAttempt(value => value + 1)
  }

  return (
    <section id="media" className="news-section" aria-labelledby="news-title">
      <div className="news-heading-row">
        <h2 id="news-title" className="section-label font-display uppercase text-burgundy underline underline-offset-4">
          Media &amp; press
        </h2>
        {count > 0 && (
          <div className="news-controls" aria-label="News carousel controls">
            <button type="button" aria-label="Previous news" aria-controls="news-track"
              disabled={position.first === 0} onClick={() => move(-1)}>
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 12H4m7-7-7 7 7 7" /></svg>
            </button>
            <button type="button" aria-label="Next news" aria-controls="news-track"
              disabled={position.first >= count - position.visible} onClick={() => move(1)}>
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 12h16m-7-7 7 7-7 7" /></svg>
            </button>
          </div>
        )}
      </div>

      {state.status === 'loading' && <p className="news-message" role="status">Loading the latest news…</p>}
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
          <ul id="news-track" className="news-track" ref={trackRef} aria-label="Latest Guardian articles">
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
          <p className="news-position" role="status" aria-live="polite" aria-atomic="true">
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
