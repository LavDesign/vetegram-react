import { ChevronUp } from 'lucide-react'
import { useScrolled } from '../hooks/useScrolled'

function BackToTop() {
  const visible = useScrolled(window.innerHeight)

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'instant' : 'smooth' })
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Volver arriba"
      className={`fixed right-6 bottom-6 z-40 grid size-12 place-items-center rounded-full border border-white/40 bg-ink text-white shadow-[0_0_10px_0_rgba(21,38,48,0.4)] transition-[opacity,visibility,background-color,color] duration-300 hover:bg-accent hover:text-ink md:right-8 md:bottom-14 ${
        visible ? 'visible opacity-100' : 'invisible opacity-0'
      }`}
    >
      <ChevronUp aria-hidden="true" className="size-6" />
    </button>
  )
}

export default BackToTop
