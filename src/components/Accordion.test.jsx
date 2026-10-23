import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import Accordion from './Accordion'

const items = [
  { id: 'a', title: 'Primero', content: 'Contenido uno' },
  { id: 'b', title: 'Segundo', content: 'Contenido dos' },
  { id: 'c', title: 'Tercero', content: 'Contenido tres' },
]

const expanded = () => screen.getAllByRole('button').map((button) => button.getAttribute('aria-expanded'))

describe('Accordion', () => {
  it('starts with the first panel open', () => {
    render(<Accordion items={items} />)
    expect(expanded()).toEqual(['true', 'false', 'false'])
    // Closed panels are inert (out of the tab order and the a11y tree in browsers; jsdom doesn't apply inert itself)
    const panel = (name) => document.getElementById(screen.getByRole('button', { name }).getAttribute('aria-controls'))
    expect(panel('Primero')).toHaveTextContent('Contenido uno')
    expect(panel('Primero')).not.toHaveAttribute('inert')
    expect(panel('Segundo')).toHaveAttribute('inert')
    expect(panel('Tercero')).toHaveAttribute('inert')
  })

  it('keeps only one panel open at a time', async () => {
    const user = userEvent.setup()
    render(<Accordion items={items} />)

    await user.click(screen.getByRole('button', { name: 'Segundo' }))
    expect(expanded()).toEqual(['false', 'true', 'false'])

    await user.click(screen.getByRole('button', { name: 'Tercero' }))
    expect(expanded()).toEqual(['false', 'false', 'true'])
  })

  it('closes the open panel when its button is clicked again', async () => {
    const user = userEvent.setup()
    render(<Accordion items={items} />)

    await user.click(screen.getByRole('button', { name: 'Primero' }))
    expect(expanded()).toEqual(['false', 'false', 'false'])
  })

  it('works from the keyboard', async () => {
    const user = userEvent.setup()
    render(<Accordion items={items} />)

    await user.tab()
    await user.tab()
    expect(screen.getByRole('button', { name: 'Segundo' })).toHaveFocus()
    await user.keyboard('{Enter}')
    expect(expanded()).toEqual(['false', 'true', 'false'])
  })
})
