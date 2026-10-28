export default function CareerSupport() {
  return (
    <section id="career-support" className="career-section relative isolate" aria-labelledby="career-title">
      <div className="career-backdrop" aria-hidden="true">
        <img className="career-office" src="/assets/career-office-background-export.png" alt="" loading="lazy" />
        <picture className="career-ribbon">
          <source media="(max-width: 1023px)" srcSet="/assets/career-ribbon-mobile.svg" />
          <img src="/assets/career-ribbon-desktop.svg" alt="" />
        </picture>
      </div>
      <div className="career-copy flex">
        <picture className="career-briefcase shrink-0" aria-hidden="true">
          <source media="(max-width: 1023px)" srcSet="/assets/career-briefcase-mobile.svg" />
          <img src="/assets/career-briefcase-desktop.svg" alt="" />
        </picture>
        <div className="career-copy-text flex flex-col items-start">
          <h2 id="career-title" className="font-display">Support for your career growth</h2>
          <p>A guidance on career and work related issues</p>
          <button className="career-action inline-flex items-center gap-2.5 font-semibold uppercase tracking-[0.01em] text-gold"
            type="button" disabled title="Destination unavailable">
            Find career
            <picture className="career-arrow" aria-hidden="true">
              <source media="(max-width: 1023px)" srcSet="/assets/career-arrow-mobile.svg" />
              <img src="/assets/arrow-gold.svg" alt="" />
            </picture>
          </button>
        </div>
      </div>
      <div className="career-phone" aria-hidden="true">
        <img className="career-hand" src="/assets/career-phone-monochrome.png" alt="" loading="lazy" />
        <div className="career-screen"><img src="/assets/career-phone-screen.jpg" alt="" loading="lazy" /></div>
        <img className="career-badge career-badge-building" src="/assets/career-badge-building.svg" alt="" />
        <img className="career-badge career-badge-courthouse" src="/assets/career-badge-courthouse.svg" alt="" />
        <img className="career-badge career-badge-gavel" src="/assets/career-badge-gavel.svg" alt="" />
      </div>
    </section>
  )
}
