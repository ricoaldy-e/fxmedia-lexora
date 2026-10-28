export default function Anniversary() {
  return (
    <section
      className="anniversary relative isolate bg-charcoal text-offwhite"
      aria-labelledby="anniversary-title"
    >
      <img
        className="anniversary-photo"
        src="/assets/anniversary-delegation-monochrome.png"
        alt="Delegation gathered at the Lexora anniversary celebration"
        loading="lazy"
      />
      <div
        className="anniversary-tint absolute inset-0 -z-10 mix-blend-multiply"
        aria-hidden="true"
      />
      <picture className="anniversary-ribbon" aria-hidden="true">
        <source
          media="(max-width: 1023px)"
          srcSet="/assets/anniversary-ribbon-mobile.svg"
        />
        <img src="/assets/anniversary-ribbon-desktop.svg" alt="" />
      </picture>
      <h2
        id="anniversary-title"
        className="anniversary-heading font-display uppercase"
      >
        <span className="anniversary-celebrating">Celebrating</span>
        <span className="anniversary-number">60</span>
        <span className="anniversary-suffix">th</span>
        <span className="anniversary-word">anniversary</span>
      </h2>
      <button
        className="anniversary-video flex flex-col items-center"
        type="button"
        disabled
        aria-describedby="video-unavailable"
        title="Video unavailable"
      >
        <span className="relative grid size-[60px] place-items-center">
          <img
            className="absolute inset-0"
            src="/assets/video-play-disc.svg"
            alt=""
          />
          <img
            className="video-triangle relative"
            src="/assets/video-play-triangle.svg"
            alt=""
          />
        </span>
        <span className="mt-4 whitespace-nowrap text-xs leading-[15px] uppercase tracking-[0.01em]">
          Play video
        </span>
      </button>
      <p id="video-unavailable" className="sr-only">
        Video unavailable.
      </p>
      <div className="anniversary-paper-edge" aria-hidden="true">
        <div />
      </div>
    </section>
  )
}
