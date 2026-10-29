import { useEffect, useRef, useState } from 'react'

const primaryItems = [
  'About us',
  'Lawyers',
  'Public',
  'Admissions',
  'Media',
  'CPD',
  'Member login',
  'Membership',
  'Careers',
  'Advertise',
]

const primaryTargets: Partial<Record<string, string>> = {
  'About us': '#what-we-do',
  Media: '#media',
  Careers: '#career-support',
}

const aboutItems = [
  'What We Do',
  'Council 2025',
  'Executive Committee 2025',
  'Presidents & Honorary Members',
  'Award Recipients',
  'Secretariat 2025',
  'Standing Committees 2025',
  'Practice Areas',
  'Support Schemes',
  'Membership Privileges',
]

function SocialLinks({ light = false }: { light?: boolean }) {
  return (
    <div
      className={`social-contact flex items-center gap-5 ${light ? 'text-offwhite' : 'text-gold'}`}
    >
      <div className="flex items-center gap-2.5" aria-label="Social media">
        {['facebook', 'instagram', 'linkedin'].map((network) => (
          <span
            key={network}
            className="grid size-5 place-items-center"
            role="img"
            aria-label={network}
          >
            <span
              className="social-icon"
              style={{ maskImage: `url('/assets/social-${network}-gold.svg')` }}
              aria-hidden="true"
            />
          </span>
        ))}
      </div>
      <span aria-hidden="true">|</span>
      <span className="whitespace-nowrap text-base font-semibold uppercase tracking-[0.01em]">
        Contact us
      </span>
    </div>
  )
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchUnavailable, setSearchUnavailable] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (!menuOpen) return

    const dialog = dialogRef.current
    if (!dialog) return

    const previousOverflow = document.body.style.overflow
    const previousFocus = document.activeElement
    dialog.showModal()
    document.body.style.overflow = 'hidden'

    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
      if (previousFocus instanceof HTMLElement)
        previousFocus.focus({ preventScroll: true })
    }
  }, [menuOpen])

  const closeMenu = () => {
    setMenuOpen(false)
    setSearchUnavailable(false)
  }

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Lexora home">
          <img src="/assets/lexora-logo.png" alt="Lexora Law Partners" />
        </a>
        <div className="header-socials">
          <SocialLinks />
        </div>
        <div className="hero-rail bg-charcoal">
          <button
            className="menu-toggle grid size-12 place-items-center"
            type="button"
            aria-label="Open navigation menu"
            aria-controls="navigation-menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <img src="/assets/menu-hamburger.svg" alt="" />
          </button>
          <a
            className="scroll-cue flex flex-col items-center gap-2.5 text-center text-xs uppercase text-white"
            href="#what-we-do"
          >
            <span>
              Scroll
              <br />
              down
            </span>
            <img src="/assets/scroll-down.svg" alt="" />
          </a>
        </div>
      </header>

      <dialog
        id="navigation-menu"
        ref={dialogRef}
        className="navigation-dialog"
        aria-label="Main navigation"
        onCancel={(event) => {
          event.preventDefault()
          closeMenu()
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeMenu()
        }}
      >
        <div className="navigation-panel bg-charcoal text-offwhite">
          <button
            className="menu-close grid size-12 place-items-center"
            type="button"
            aria-label="Close navigation menu"
            onClick={closeMenu}
          >
            <img src="/assets/menu-close.svg" alt="" />
          </button>
          <div className="navigation-socials">
            <SocialLinks light />
          </div>
          <img
            className="navigation-scales"
            src="/assets/navigation-scales-export.png"
            alt=""
          />
          <div className="navigation-content relative z-10">
            <form
              className="navigation-search flex items-center gap-5 border-b border-offwhite/40"
              onSubmit={(event) => {
                event.preventDefault()
                setSearchUnavailable(true)
              }}
            >
              <picture className="shrink-0">
                <source
                  media="(max-width: 1023px)"
                  srcSet="/assets/search-mobile.svg"
                />
                <img src="/assets/search-desktop.svg" alt="" />
              </picture>
              <input
                className="min-w-0 flex-1 bg-transparent text-lg placeholder:text-offwhite/60 focus:outline-none"
                type="search"
                aria-label="Search"
                aria-describedby={searchUnavailable ? 'navigation-search-status' : undefined}
                placeholder="Search here"
                onChange={() => setSearchUnavailable(false)}
                onKeyDown={(event) => {
                  if (event.key === 'Escape') {
                    event.preventDefault()
                    closeMenu()
                  }
                }}
              />
              <p id="navigation-search-status" className="navigation-search-message" role="status">
                {searchUnavailable ? 'Search is unavailable' : ''}
              </p>
            </form>
            <nav className="navigation-lists grid" aria-label="Primary">
              <ul className="primary-navigation flex flex-col gap-[15px] font-display text-[30px] uppercase">
                {primaryItems.map((item, index) => (
                  <li key={item}>
                    {primaryTargets[item] ? (
                      <a
                        className={index === 0 ? 'text-gold underline decoration-1 underline-offset-4' : undefined}
                        href={primaryTargets[item]}
                        onClick={closeMenu}
                      >
                        {item}
                      </a>
                    ) : (
                      <span aria-disabled="true">{item}</span>
                    )}
                  </li>
                ))}
              </ul>
              <ul
                className="about-navigation flex-col gap-2.5 text-base leading-[30px]"
                aria-label="About us"
              >
                {aboutItems.map((item, index) => (
                  <li key={item}>
                    {index === 0 ? (
                      <a href="#what-we-do" onClick={closeMenu}>
                        {item}
                      </a>
                    ) : (
                      <span aria-disabled="true">{item}</span>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </dialog>
    </>
  )
}
