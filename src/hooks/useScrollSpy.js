import { useEffect, useState } from 'react'

// Returns the id of the section that crosses the middle of the viewport.
export function useScrollSpy(ids) {
  const [activeId, setActiveId] = useState(ids[0])
  const key = ids.join(',')

  useEffect(() => {
    const sections = key
      .split(',')
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    // A zero-height band at 50% of the viewport: only one section can touch it.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: '-50% 0px -50% 0px' },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [key])

  return activeId
}
