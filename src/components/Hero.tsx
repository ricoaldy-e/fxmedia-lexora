import Header from './Header'

export default function Hero() {
  return (
    <section
      id="home"
      className="hero relative isolate"
      aria-labelledby="hero-title"
    >
      <div className="hero-scene" aria-hidden="true">
        <img
          src="/assets/hero-marina-bay-monochrome.png"
          alt=""
          fetchPriority="high"
        />
      </div>
      <div className="hero-wash absolute inset-0" aria-hidden="true" />
      <div
        className="hero-red-light absolute inset-0 mix-blend-multiply"
        aria-hidden="true"
      />
      <picture className="hero-ribbon" aria-hidden="true">
        <source
          media="(max-width: 1023px)"
          srcSet="/assets/hero-ribbon-mobile.svg"
        />
        <img src="/assets/hero-ribbon-desktop.svg" alt="" />
      </picture>
      <div className="hero-statue" aria-hidden="true">
        <img
          src="/assets/hero-lady-justice-export.png"
          alt=""
          fetchPriority="high"
        />
        <img
          className="statue-highlight"
          src="/assets/hero-lady-justice-export.png"
          alt=""
        />
      </div>

      <Header />

      <div className="hero-copy absolute">
        <h1
          id="hero-title"
          className="hero-title font-display font-medium uppercase"
        >
          <span>Become an</span>
          <span className="hero-title-indent">
            <span className="text-burgundy">Affiliate</span> of the
          </span>
          <span>Lexora</span>
        </h1>
        <p className="hero-description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
          turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
          fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus
          elit sed risus.Sed dignissim, metus .
        </p>
        <button
          className="hero-cta inline-flex items-center gap-2.5 text-lg font-semibold uppercase tracking-[0.01em] text-gold"
          type="button"
          disabled
          title="Destination unavailable"
        >
          Find Lawyer
          <span className="cta-arrow">
            <img src="/assets/arrow-gold.svg" alt="" />
          </span>
        </button>
      </div>

      <div className="hero-paper-edge" aria-hidden="true">
        <div />
      </div>
    </section>
  )
}
