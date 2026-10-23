import { useEffect, useRef, useState } from 'react'

// Shared logic for the scroll-snap carousels. The scroll position is the source of truth:
// swipes, buttons and keys all just scroll the track, and the active index is read back from it.
// Works with any number of visible slides; `lastIndex` is the last position the track can scroll to and
// `visibleIndexes` lists the slides that are at least half inside the track right now.
export function useCarousel(count) {
  const trackRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [lastIndex, setLastIndex] = useState(count - 1)
  const [visibleIndexes, setVisibleIndexes] = useState([0])

  useEffect(() => {
    const track = trackRef.current
    let frame = 0

    const measure = () => {
      const [first, second] = track.children
      const step = second ? second.offsetLeft - first.offsetLeft : track.clientWidth
      const maxScroll = track.scrollWidth - track.clientWidth
      setActiveIndex(Math.round(track.scrollLeft / step))
      setLastIndex(Math.round(maxScroll / step))

      const viewStart = track.scrollLeft
      const viewEnd = viewStart + track.clientWidth
      const visible = []
      for (const [index, slide] of [...track.children].entries()) {
        const start = slide.offsetLeft - first.offsetLeft
        const end = start + slide.offsetWidth
        const overlap = Math.min(end, viewEnd) - Math.max(start, viewStart)
        if (overlap > slide.offsetWidth / 2) visible.push(index)
      }
      // Keep the same array while nothing changes so scrolling doesn't re-render on every frame
      setVisibleIndexes((current) => (current.join() === visible.join() ? current : visible))
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

  // Scrolls the slide to the start of the track; slides past `lastIndex` stop at the end, where the browser
  // clamps the scroll, so they come into view alongside the others.
  const goTo = (index) => {
    const track = trackRef.current
    const left = track.children[index].offsetLeft - track.children[0].offsetLeft
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    track.scrollTo({ left, behavior: reduceMotion ? 'instant' : 'smooth' })
  }

  // Arrows wrap around at both ends, like the original sliders.
  const next = () => goTo(activeIndex >= lastIndex ? 0 : activeIndex + 1)
  const prev = () => goTo(activeIndex <= 0 ? lastIndex : activeIndex - 1)

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      prev()
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      next()
    }
  }

  return { trackRef, activeIndex, lastIndex, visibleIndexes, goTo, next, prev, handleKeyDown }
}
