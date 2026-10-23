import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

afterEach(() => cleanup())

// jsdom has no layout, so it doesn't implement IntersectionObserver. Header (scroll spy) and About (in-view
// animations) create one on mount; this no-op stand-in lets them render. Nothing here asserts on scrolling.
class IntersectionObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return []
  }
}
globalThis.IntersectionObserver = IntersectionObserverStub
