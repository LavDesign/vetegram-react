import { useEffect, useState } from 'react'

// Tracks whether the referenced element is on screen; flips back to false when it leaves,
// so entrance animations replay on every visit (same as the original site).
export function useInView(ref, threshold = 0.5) {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold })
    observer.observe(element)
    return () => observer.disconnect()
  }, [ref, threshold])

  return inView
}
