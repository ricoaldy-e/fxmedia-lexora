const supportEntries = [
  { category: 'Lawyer', title: 'Feedback on Law Reforms' },
  { category: 'Public', title: 'Alternative Dispute Resolution Schemes' },
  { category: 'Lawyer', title: "Members' Support Schemes" },
  { category: 'Lawyer', title: 'Future Lawyering Research Portal' },
]

export default function LegalSupport() {
  return (
    <section id="legal-support" className="legal-section relative isolate" aria-labelledby="legal-title">
      <div className="legal-texture" aria-hidden="true"><div /></div>
      <div className="legal-heading flex justify-between">
        <p className="section-label font-display uppercase text-burgundy underline underline-offset-4">Legal Support</p>
        <h2 id="legal-title" className="font-display uppercase">Guiding you through every steps</h2>
      </div>
      <ul className="legal-list flex flex-col">
        {supportEntries.map((entry) => (
          <li className="legal-row grid" key={entry.title}>
            <span className="legal-category grid place-items-center bg-charcoal font-display text-paper">{entry.category}</span>
            <span className="legal-entry flex items-center justify-between"
              aria-disabled="true" title="Destination unavailable">
              <span className="min-w-0 flex-1 truncate">{entry.title}</span>
              <span className="cta-arrow legal-entry-arrow" aria-hidden="true"><img src="/assets/arrow-offwhite.svg" alt="" /></span>
            </span>
          </li>
        ))}
      </ul>
      <div className="legal-more flex justify-center">
        <button className="inline-flex items-center gap-2.5 text-lg font-semibold uppercase tracking-[0.01em] text-gold"
          type="button" disabled title="Destination unavailable">
          Explore more support
          <span className="cta-arrow" aria-hidden="true"><img src="/assets/arrow-gold.svg" alt="" /></span>
        </button>
      </div>
      <div className="legal-paper-edge" aria-hidden="true">
        <div className="legal-paper-cutout" />
        <img className="legal-paper-mobile" src="/assets/legal-paper-mask-mobile.svg" alt="" loading="lazy" />
      </div>
      <div className="legal-accent-clip" aria-hidden="true"><img src="/assets/paper-edge-accent.svg" alt="" /></div>
    </section>
  )
}
