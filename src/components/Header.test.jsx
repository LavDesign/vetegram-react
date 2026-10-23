import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import Header from './Header'

// jsdom doesn't load Tailwind, so "open" is checked through aria-expanded, the state the toggle exposes.
const toggle = () => screen.getByRole('button', { name: 'Menú' })

describe('Header mobile menu', () => {
  it('opens and closes with the toggle button', async () => {
    const user = userEvent.setup()
    render(<Header />)
    expect(toggle()).toHaveAttribute('aria-expanded', 'false')
    expect(toggle()).toHaveAttribute('aria-controls', 'main-menu')

    await user.click(toggle())
    expect(toggle()).toHaveAttribute('aria-expanded', 'true')

    await user.click(toggle())
    expect(toggle()).toHaveAttribute('aria-expanded', 'false')
  })

  it('closes on Escape and returns focus to the toggle', async () => {
    const user = userEvent.setup()
    render(<Header />)

    await user.click(toggle())
    await user.tab()
    expect(screen.getByRole('link', { name: 'Inicio' })).toHaveFocus()

    await user.keyboard('{Escape}')
    expect(toggle()).toHaveAttribute('aria-expanded', 'false')
    expect(toggle()).toHaveFocus()
  })

  it('closes after choosing a section', async () => {
    const user = userEvent.setup()
    render(<Header />)

    await user.click(toggle())
    await user.click(screen.getByRole('link', { name: 'Servicios' }))
    expect(toggle()).toHaveAttribute('aria-expanded', 'false')
  })
})
