import { useEffect, useRef, useState } from 'react'

// Shared logic for the scroll-snap carousels. The scroll position is the source of truth:
// swipes, buttons and keys all just scroll the track, and the active index is read back from it.
// Works with any number of visible slides; `lastIndex` is the last position the track can scroll to.
export function useCarousel(count) {
  const trackRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [lastIndex, setLastIndex] = useState(count - 1)

  useEffect(() => {
    const track = trackRef.current
    let frame = 0

    const measure = () => {
      const [first, second] = track.children
      const step = second ? second.offsetLeft - first.offsetLeft : track.clientWidth
      const maxScroll = track.scrollWidth - track.clientWidth
      setActiveIndex(Math.round(track.scrollLeft / step))
      setLastIndex(Math.round(maxScroll / step))
    }
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(measure)
    }

    measure()
    track.addEventListener('scroll', onScroll, { passive: true })
    const resizeObserver = new ResizeObserver(onScroll)
    resizeObserver.observe(track)
    return () => {
      cancelAnimationFrame(frame)
      track.removeEventListener('scroll', onScroll)
      resizeObserver.disconnect()
    }
  }, [])

  // Wraps around at both ends, like the original sliders.
  const goTo = (index) => {
    const track = trackRef.current
    const target = index > lastIndex ? 0 : index < 0 ? lastIndex : index
    const left = track.children[target].offsetLeft - track.children[0].offsetLeft
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    track.scrollTo({ left, behavior: reduceMotion ? 'instant' : 'smooth' })
  }

  const next = () => goTo(activeIndex + 1)
  const prev = () => goTo(activeIndex - 1)

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      prev()
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      next()
    }
  }

  return { trackRef, activeIndex, lastIndex, goTo, next, prev, handleKeyDown }
}
