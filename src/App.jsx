import logo from './assets/logo-blue.svg'

function App() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-8 bg-ink px-4 text-center">
      <img src={logo} alt="Vetegram" className="w-64 max-w-full sm:w-80" />
      <h1 className="text-4xl font-semibold text-white italic sm:text-5xl">
        Bienvenido a <span className="text-accent">Vetegram</span>
      </h1>
      <p className="text-brand">React + Tailwind setup</p>
    </main>
  )
}

export default App
