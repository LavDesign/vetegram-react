import About from './components/About'
import BackToTop from './components/BackToTop'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import { navLinks } from './data/site'

// Temporary placeholder section for the part not migrated yet.
const placeholderLinks = navLinks.filter((link) => link.id === 'contacto')

function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:font-bold focus:text-ink"
      >
        Saltar al contenido
      </a>
      <Header />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <Hero />
        <About />
        <Services />
        {placeholderLinks.map((link) => (
          <section
            key={link.id}
            id={link.id}
            aria-labelledby={`${link.id}-title`}
            className="flex min-h-svh items-center justify-center bg-ocean px-4 text-white"
          >
            <h2 id={`${link.id}-title`} className="text-4xl font-semibold italic md:text-5xl">
              {link.label}
            </h2>
          </section>
        ))}
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}

export default App
