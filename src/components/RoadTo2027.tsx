export default function RoadTo2027() {
  return (
    <section id="road-to-2027" className="road-section relative isolate" aria-labelledby="road-title">
      <div className="road-texture" aria-hidden="true" />
      <p className="section-label font-display uppercase text-burgundy underline underline-offset-4">Road to 2027</p>
      <h2 id="road-title" className="road-title font-display uppercase">
        Celebrating a Legacy, Journeying to the Future
      </h2>
      <div className="road-layout">
        <ol className="road-years flex items-center font-display font-medium" aria-label="Anniversary timeline years">
          <li className="road-year-featured">2025</li>
          <li>2026</li>
          <li>2027</li>
        </ol>
        <img className="road-image" src="/assets/road-to-2027-legal-meeting-export.png"
          alt="Legal professionals shaking hands beside scales of justice" loading="lazy" />
        <div className="road-copy">
          <h3 className="font-semibold">A new beginning - Laying the groundwork for our future</h3>
          <p>
            As we embark on our journey towards LawSoc’s 60th anniversary, 2025
            marks the beginning of our refreshed digital presence. This year,
            we’re reimagining how we connect with members — through new digital
            tools, enhanced services, and stories from the legal community.
          </p>
        </div>
      </div>
    </section>
  )
}
