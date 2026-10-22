import About from './components/About'
import BackToTop from './components/BackToTop'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'

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
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}

export default App
