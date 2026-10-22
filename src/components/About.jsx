import { useRef } from 'react'
import catToy from '../assets/images/cat-toy.webp'
import catPlaying from '../assets/images/cat-02.webp'
import { about, aboutAccordion, aboutFeatures } from '../data/about'
import { useInView } from '../hooks/useInView'
import Accordion from './Accordion'
import FeatureCard from './FeatureCard'

function About() {
  const picturesRef = useRef(null)
  const picturesInView = useInView(picturesRef)

  return (
    <section id="nosotros" aria-labelledby="nosotros-title" className="overflow-hidden bg-white pt-10 pb-16 text-ink">
      <div className="mx-auto max-w-6xl px-4">
        <h2 id="nosotros-title" className="mb-8 text-center text-[2.8rem] font-semibold md:text-[3.4375rem]">
          {about.eyebrow}
        </h2>

        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-8">
            <h3 className="text-center text-[2rem] italic">{about.title}</h3>
            <p className="mt-4 mb-8 text-center text-[1.375rem]">{about.description}</p>
            <Accordion items={aboutAccordion} />
          </div>

          {/* Decorative pair: the toy dangles from the right edge while the cat reaches for it */}
          <div ref={picturesRef} className="relative mx-auto w-full max-w-sm md:col-span-4 md:max-w-none">
            <img
              src={catToy}
              alt=""
              width="800"
              height="800"
              loading="lazy"
              decoding="async"
              className={`absolute top-0 -right-[30%] w-[85%] origin-bottom -rotate-10 md:-right-[45%] md:w-full ${
                picturesInView ? 'motion-safe:animate-bounce-twice' : ''
              }`}
            />
            <img
              src={catPlaying}
              alt=""
              width="600"
              height="1088"
              loading="lazy"
              decoding="async"
              className={`relative mt-[38%] w-[70%] md:mt-[55%] md:w-[85%] ${picturesInView ? 'motion-safe:animate-shake-y' : ''}`}
            />
          </div>
        </div>

        <ul className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {aboutFeatures.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </ul>
      </div>
    </section>
  )
}

export default About
