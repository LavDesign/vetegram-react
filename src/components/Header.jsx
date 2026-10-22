import { useEffect, useRef, useState } from 'react'
import logo from '../assets/logo-yellow.svg'
import { navLinks } from '../data/site'
import { useScrolled } from '../hooks/useScrolled'
import { useScrollSpy } from '../hooks/useScrollSpy'

const MENU_ID = 'main-menu'
const sectionIds = navLinks.map((link) => link.id)
// Desktop layout: two links, the centered logo, two links (equal widths keep the logo centered).
const leftLinks = navLinks.slice(0, 2)
const rightLinks = navLinks.slice(2)

function NavItem({ link, active, onSelect }) {
  return (
    <li className="md:flex">
      <a
        href={`#${link.id}`}
        onClick={onSelect}
        aria-current={active ? 'true' : undefined}
        className={`flex w-full items-center px-4 py-3 font-bold transition-colors duration-200 hover:bg-accent focus-visible:-outline-offset-4 md:w-32 md:justify-center md:py-0 lg:w-36 ${
          active ? 'bg-accent' : ''
        }`}
      >
        {link.label}
      </a>
    </li>
  )
}

function Header() {
  const scrolled = useScrolled(10)
  const activeId = useScrollSpy(sectionIds)
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleRef = useRef(null)

  useEffect(() => {
    if (!menuOpen) return
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)
  const renderItem = (link) => (
    <NavItem key={link.id} link={link} active={activeId === link.id} onSelect={closeMenu} />
  )

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-brand text-ink transition-shadow duration-300 ${
        scrolled
          ? 'shadow-[0_5px_10px_0_rgba(138,155,165,0.15)]'
          : 'shadow-[0_10px_30px_0_rgba(138,155,165,0.15)]'
      }`}
    >
      <nav aria-label="Principal" className="mx-auto max-w-6xl">
        {/* Mobile bar: logo on the left, menu toggle on the right */}
        <div className="flex items-center justify-between px-4 py-2 md:hidden">
          <a href="#inicio" onClick={closeMenu}>
            <img src={logo} alt="Vetegram" className="h-12 w-auto" />
          </a>
          <button
            ref={toggleRef}
            type="button"
            aria-label="Menú"
            aria-expanded={menuOpen}
            aria-controls={MENU_ID}
            onClick={() => setMenuOpen((open) => !open)}
            className="flex size-11 flex-col items-center justify-center gap-1.5"
          >
            <span
              className={`h-0.5 w-6 bg-ink transition-transform duration-300 motion-reduce:transition-none ${
                menuOpen ? 'translate-y-2 rotate-45' : ''
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-ink transition-opacity duration-300 motion-reduce:transition-none ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-ink transition-transform duration-300 motion-reduce:transition-none ${
                menuOpen ? '-translate-y-2 -rotate-45' : ''
              }`}
            />
          </button>
        </div>

        <ul
          id={MENU_ID}
          className={`${menuOpen ? 'flex' : 'hidden'} flex-col pb-4 md:flex md:flex-row md:items-stretch md:justify-center md:pb-0`}
        >
          {leftLinks.map(renderItem)}
          <li className="hidden md:flex">
            <a href="#inicio" className="flex items-center px-6 py-1.5">
              <img
                src={logo}
                alt="Vetegram"
                className={`w-auto transition-[height] duration-300 motion-reduce:transition-none ${
                  scrolled ? 'h-15.5' : 'h-22'
                }`}
              />
            </a>
          </li>
          {rightLinks.map(renderItem)}
        </ul>
      </nav>
    </header>
  )
}

export default Header
