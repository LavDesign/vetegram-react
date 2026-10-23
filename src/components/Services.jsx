import { ChevronLeft, ChevronRight } from 'lucide-react'
import { services, servicesIntro } from '../data/services'
import { useCarousel } from '../hooks/useCarousel'
import ServiceCard from './ServiceCard'

const TRACK_ID = 'services-slides'

const arrowClassName =
  'grid size-11 shrink-0 place-items-center rounded-full bg-accent text-ink shadow-[0_14px_25px_-10px_#92b4d0] transition-colors duration-300 hover:bg-white xl:absolute xl:top-[calc(50%-1.75rem)] xl:-translate-y-1/2'

function Services() {
  const { trackRef, activeIndex, lastIndex, goTo, next, prev, handleKeyDown } = useCarousel(services.length)
  // Autoplay removed on purpose (usability and WCAG 2.2.2): the original's auto-advance is replaced
  // by manual navigation only, like the Hero.

  return (
    <section id="servicios" aria-labelledby="servicios-title" className="bg-ink pt-16 pb-12 text-white">
      <div className="mx-auto max-w-6xl px-4">
        <h2 id="servicios-title" className="text-center text-[2.8rem] font-semibold md:text-[3.4375rem]">
          {servicesIntro.title}
        </h2>
        <p className="mx-auto mt-8 text-center text-xl md:w-3/5">{servicesIntro.description}</p>

        <div
          role="region"
          aria-roledescription="carrusel"
          aria-label="Servicios"
          onKeyDown={handleKeyDown}
          className="relative mt-8 xl:px-14"
        >
          <ul
            id={TRACK_ID}
            ref={trackRef}
            aria-label="Tarjetas de servicios"
            // Focusable so keyboard users can scroll it (axe: scrollable-region-focusable); arrow keys are handled by the region
            tabIndex={0}
            className="flex snap-x snap-mandatory gap-6 focus-visible:-outline-offset-4 overflow-x-auto overscroll-x-contain py-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {services.map((service, index) => (
              <li
                key={service.id}
                aria-roledescription="tarjeta"
                aria-label={`${index + 1} de ${services.length}`}
                className="shrink-0 basis-full snap-start md:basis-[calc((100%-1.5rem)/2)] lg:basis-[calc((100%-3rem)/3)]"
              >
                <ServiceCard {...service} />
              </li>
            ))}
          </ul>

          {/* Arrows sit beside the track only from xl: below that they'd share the right edge with the fixed
              "Volver arriba" button. Left-aligned on mobile, centred on tablet, for the same reason. */}
          <div className="mt-2 flex items-center justify-start gap-2 md:justify-center">
            <button
              type="button"
              onClick={prev}
              aria-label="Servicio anterior"
              aria-controls={TRACK_ID}
              className={`${arrowClassName} xl:left-0`}
            >
              <ChevronLeft aria-hidden="true" className="size-7" />
            </button>
            <div className="flex">
              {Array.from({ length: lastIndex + 1 }, (_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`Mostrar desde el servicio ${index + 1}`}
                  aria-current={index === activeIndex ? 'true' : undefined}
                  aria-controls={TRACK_ID}
                  className="group grid h-11 w-6 place-items-center"
                >
                  <span
                    className={`h-1.5 w-4 rounded-full transition-colors duration-200 ${
                      index === activeIndex ? 'bg-accent' : 'bg-white/60 group-hover:bg-white'
                    }`}
                  />
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={next}
              aria-label="Servicio siguiente"
              aria-controls={TRACK_ID}
              className={`${arrowClassName} xl:right-0`}
            >
              <ChevronRight aria-hidden="true" className="size-7" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services
