const services = [
  { title: 'Firm Closure Dates', image: 'service-calendar-monochrome.png' },
  {
    title: 'Pro Bono Services',
    image: 'service-pro-bono-desktop-export.png',
    mobileImage: 'service-pro-bono-mobile-export.png',
  },
  {
    title: "Members' Library",
    image: 'service-members-library-desktop-export.png',
    mobileImage: 'service-members-library-mobile-export.png',
  },
  {
    title: 'Specialists Directory',
    image: 'service-specialists-directory-export.png',
  },
]

export default function Services() {
  return (
    <section
      id="services"
      className="grid grid-cols-2 lg:grid-cols-4"
      aria-label="Statutory functions and services"
    >
      {services.map((service, index) => (
        <article
          key={service.title}
          className={`service-card relative ${index === 1 ? 'service-card-featured' : ''}`}
          aria-labelledby={`service-${index}`}
        >
          <div className="service-body relative isolate overflow-hidden">
            <picture className="absolute inset-0 -z-10">
              {service.mobileImage && (
                <source
                  media="(max-width: 1023px)"
                  srcSet={`/assets/${service.mobileImage}`}
                />
              )}
              <img
                className="service-image size-full object-cover"
                src={`/assets/${service.image}`}
                alt=""
                loading="lazy"
              />
            </picture>
            <div
              className="service-overlay absolute inset-0 -z-10"
              aria-hidden="true"
            />
            <p className="service-number text-lg leading-[30px]">
              {String(index + 1).padStart(2, '0')}
            </p>
            <h3 id={`service-${index}`} className="service-title font-display">
              <span className="block">
                {service.title.slice(0, service.title.lastIndexOf(' '))}
              </span>{' '}
              <span className="block">
                {service.title.slice(service.title.lastIndexOf(' ') + 1)}
              </span>
            </h3>
            {index === 1 && (
              <p className="service-description hidden text-lg leading-[30px] lg:block">
                Lorem ipsum dolor sit amet Lorem ipsum
              </p>
            )}
          </div>
          <div
            className="service-action flex items-center gap-2.5"
            aria-hidden="true"
          >
            {index === 1 && (
              <span className="service-more hidden text-lg font-semibold uppercase tracking-[0.01em] lg:inline">
                More detail
              </span>
            )}
            <span className="cta-arrow service-arrow">
              <img
                src={`/assets/arrow-${index === 1 ? 'offwhite' : 'charcoal'}.svg`}
                alt=""
              />
            </span>
            {index === 1 && (
              <span className="cta-arrow service-mobile-arrow">
                <img src="/assets/arrow-charcoal.svg" alt="" />
              </span>
            )}
          </div>
        </article>
      ))}
    </section>
  )
}
