import { ChevronLeft, ChevronRight } from 'lucide-react'
import { heroSlides } from '../data/hero'
import { useCarousel } from '../hooks/useCarousel'

const TRACK_ID = 'hero-slides'

function Hero() {
  const { trackRef, activeIndex, goTo, next, prev, handleKeyDown } = useCarousel(heroSlides.length)

  return (
    <section
      id="inicio"
      aria-roledescription="carrusel"
      aria-label="Presentación de Vetegram"
      onKeyDown={handleKeyDown}
      className="bg-ink pt-16 text-white md:pt-25"
    >
      <div className="relative">
        <ul
          id={TRACK_ID}
          ref={trackRef}
          aria-label="Diapositivas"
          className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {heroSlides.map((slide, index) => {
            const active = index === activeIndex
            const Title = index === 0 ? 'h1' : 'h2'
            return (
              <li
                key={slide.id}
                aria-roledescription="diapositiva"
                aria-label={`${index + 1} de ${heroSlides.length}`}
                className="relative h-[60svh] min-h-96 w-full shrink-0 snap-start overflow-hidden md:h-[90svh]"
              >
                <img
                  src={slide.image}
                  alt={slide.alt}
                  fetchPriority={index === 0 ? 'high' : undefined}
                  decoding="async"
                  className="absolute inset-0 size-full object-cover"
                />
                {/* Semi-transparent oval behind the caption, as in the original */}
                <div
                  aria-hidden="true"
                  className={`absolute top-0 -left-[45%] h-full w-[145%] rounded-[45%] bg-ink/65 lg:-left-[480px] lg:h-[1000px] lg:w-[1250px] ${
                    active ? 'motion-safe:animate-fade-in-left' : ''
                  }`}
                />
                <div className="absolute inset-0 flex items-center justify-center px-14 text-center md:px-20 lg:items-start lg:justify-start lg:pt-60 lg:pl-24 lg:text-left">
                  <div className="max-w-[650px]">
                    <Title
                      className={`text-3xl font-semibold italic md:text-5xl lg:text-[3.4375rem] lg:leading-tight ${
                        active ? 'motion-safe:animate-back-in-left' : ''
                      }`}
                    >
                      {slide.title}
                    </Title>
                    <p
                      className={`mt-2 text-lg font-medium md:mt-4 md:text-xl ${
                        active ? 'motion-safe:animate-back-in-left' : ''
                      }`}
                    >
                      {slide.text}
                    </p>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>

        <button
          type="button"
          onClick={prev}
          aria-label="Diapositiva anterior"
          aria-controls={TRACK_ID}
          className="absolute top-1/2 left-2 grid size-11 place-items-center rounded-full bg-ink/50 transition-colors duration-200 hover:bg-accent hover:text-ink -translate-y-1/2 md:left-4"
        >
          <ChevronLeft aria-hidden="true" className="size-7" />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Diapositiva siguiente"
          aria-controls={TRACK_ID}
          className="absolute top-1/2 right-2 grid size-11 place-items-center rounded-full bg-ink/50 transition-colors duration-200 hover:bg-accent hover:text-ink -translate-y-1/2 md:right-4"
        >
          <ChevronRight aria-hidden="true" className="size-7" />
        </button>

        <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Ir a la diapositiva ${index + 1}`}
              aria-current={index === activeIndex ? 'true' : undefined}
              aria-controls={TRACK_ID}
              className="group grid h-6 w-11 place-items-center"
            >
              <span
                className={`h-1.5 w-full rounded-full transition-colors duration-200 ${
                  index === activeIndex ? 'bg-accent' : 'bg-white/60 group-hover:bg-white'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero
