export default function Introduction() {
  return (
    <section
      id="what-we-do"
      className="introduction relative isolate scroll-mt-8"
      aria-labelledby="introduction-title"
    >
      <div
        className="introduction-texture absolute inset-0 -z-10"
        aria-hidden="true"
      />
      <div className="introduction-content relative">
        <span
          className="introduction-quote absolute font-display font-medium"
          aria-hidden="true"
        >
          “
        </span>
        <p className="section-label font-display uppercase text-burgundy underline underline-offset-4">
          What We Do
        </p>
        <h2
          id="introduction-title"
          className="introduction-title font-display uppercase"
        >
          We carry out various statutory functions
        </h2>
        <p className="introduction-description">
          The mission of the Lexora is to serve its members and the public by
          sustaining an independent bar which upholds the rule of law and
          ensures access to justice
          <span className="hidden lg:inline">
            . As part of its mission in ensuring access to justice for the
            needy, the Lexora has established&nbsp;Pro Bono SG...
          </span>
          <span className="lg:hidden"> ...</span>{' '}
          <span className="introduction-read-more font-semibold text-gold">Read more</span>
        </p>
      </div>
    </section>
  )
}
