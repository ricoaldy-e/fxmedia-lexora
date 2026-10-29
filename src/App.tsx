import { useEffect, useRef } from 'react'
import Hero from './components/Hero'
import Introduction from './components/Introduction'
import Services from './components/Services'
import Anniversary from './components/Anniversary'
import News from './components/News'
import RoadTo2027 from './components/RoadTo2027'
import LegalSupport from './components/LegalSupport'
import CareerSupport from './components/CareerSupport'
import Footer from './components/Footer'
import './components/HomepageSections.css'

function App() {
  const mainRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const main = mainRef.current
    const motion = matchMedia('(prefers-reduced-motion: reduce)')
    if (!main || motion.matches || typeof IntersectionObserver !== 'function') return

    const sections = Array.from(main.querySelectorAll<HTMLElement>(
      '#what-we-do, #services, .anniversary, #road-to-2027, #legal-support, #media, #career-support',
    ))
    const pending = new Set<HTMLElement>()
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) reveal(entry.target as HTMLElement)
      })
    }, { rootMargin: '0px 0px -40px 0px', threshold: 0 })

    function reveal(section: HTMLElement, immediate = false) {
      if (!pending.delete(section)) return
      if (immediate) section.removeAttribute('data-entrance')
      else section.dataset.entrance = 'visible'
      observer.unobserve(section)
    }

    function revealHash(hash: string) {
      const target = document.getElementById(hash.slice(1))
      if (target) pending.forEach(section => {
        if (section.contains(target)) reveal(section, true)
      })
    }
    function handleAnchor(event: MouseEvent) {
      if (event.target instanceof Element) {
        const link = event.target.closest<HTMLAnchorElement>('a[href^="#"]')
        if (link) revealHash(link.hash)
      }
    }
    function handleHashChange() { revealHash(location.hash) }
    function handleFocus(event: FocusEvent) {
      if (event.target instanceof Node) {
        const target = event.target
        pending.forEach(section => {
          if (section.contains(target)) reveal(section, true)
        })
      }
    }
    function handleMotionChange() {
      if (motion.matches) {
        pending.forEach(section => reveal(section, true))
        observer.disconnect()
      }
    }

    sections.forEach(section => {
      const bounds = section.getBoundingClientRect()
      // Content already on screen stays visible, including restored scroll positions.
      if (bounds.top < innerHeight && bounds.bottom > 0) return
      section.dataset.entrance = 'pending'
      pending.add(section)
      observer.observe(section)
    })
    revealHash(location.hash)
    document.addEventListener('click', handleAnchor, true)
    window.addEventListener('hashchange', handleHashChange)
    main.addEventListener('focusin', handleFocus)
    motion.addEventListener('change', handleMotionChange)

    return () => {
      observer.disconnect()
      pending.clear()
      document.removeEventListener('click', handleAnchor, true)
      window.removeEventListener('hashchange', handleHashChange)
      main.removeEventListener('focusin', handleFocus)
      motion.removeEventListener('change', handleMotionChange)
      sections.forEach(section => section.removeAttribute('data-entrance'))
    }
  }, [])

  return (
    <>
      <a className="skip-link" href="#what-we-do">
        Skip to content
      </a>
      <main ref={mainRef}>
        <Hero />
        <Introduction />
        <Services />
        <Anniversary />
        <RoadTo2027 />
        <LegalSupport />
        <div className="press-region"><News /></div>
        <CareerSupport />
      </main>
      <Footer />
    </>
  )
}

export default App
