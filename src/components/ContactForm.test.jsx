import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

// FORMSPREE_ID is read when the module loads, so each test stubs the env and imports a fresh copy.
async function renderForm(formspreeId) {
  vi.stubEnv('VITE_FORMSPREE_ID', formspreeId)
  vi.resetModules()
  const { default: ContactForm } = await import('./ContactForm')
  const user = userEvent.setup()
  render(<ContactForm />)
  return { user }
}

const field = (label) => screen.getByLabelText(label)
const submit = () => screen.getByRole('button', { name: /^(enviar|enviando…)$/i })

async function fillValidForm(user) {
  await user.type(field('Nombre'), 'Ana')
  await user.type(field('Apellidos'), 'Mora Solís')
  await user.type(field('Correo electrónico'), 'ana@example.com')
  await user.type(field('Mensaje'), 'Quiero una demo.')
}

describe('ContactForm validation', () => {
  it('shows all four errors on an empty submit and focuses Nombre', async () => {
    const { user } = await renderForm('')
    await user.click(submit())

    expect(field('Nombre')).toHaveAccessibleDescription('Por favor, ingresa su nombre.')
    expect(field('Apellidos')).toHaveAccessibleDescription('Por favor, ingresa sus apellidos.')
    expect(field('Correo electrónico')).toHaveAccessibleDescription('Por favor, ingresa su correo electrónico.')
    expect(field('Mensaje')).toHaveAccessibleDescription('Por favor, ingresa un mensaje.')
    for (const label of ['Nombre', 'Apellidos', 'Correo electrónico', 'Mensaje']) {
      expect(field(label)).toBeInvalid()
    }
    expect(field('Nombre')).toHaveFocus()
  })

  it('rejects an invalid email and focuses it', async () => {
    const { user } = await renderForm('')
    await fillValidForm(user)
    await user.clear(field('Correo electrónico'))
    await user.type(field('Correo electrónico'), 'ana@correo')
    await user.click(submit())

    expect(field('Correo electrónico')).toHaveAccessibleDescription('Por favor, ingresa un correo electrónico válido.')
    expect(field('Correo electrónico')).toHaveFocus()
    expect(field('Nombre')).toBeValid()
  })

  it('clears a field error as soon as the field is corrected', async () => {
    const { user } = await renderForm('')
    await user.click(submit())
    expect(field('Nombre')).toBeInvalid()

    await user.type(field('Nombre'), 'Ana')

    expect(field('Nombre')).toBeValid()
    expect(field('Nombre')).not.toHaveAccessibleDescription()
    expect(screen.queryByText('Por favor, ingresa su nombre.')).not.toBeInTheDocument()
    // Fields the user hasn't touched keep their errors
    expect(field('Apellidos')).toBeInvalid()
  })
})

describe('ContactForm without a Formspree ID (demo mode)', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  it('says it is a demo and sends nothing', async () => {
    const { user } = await renderForm('')
    expect(screen.getByText(/este formulario no está conectado/i)).toBeInTheDocument()

    await fillValidForm(user)
    await user.click(submit())

    expect(screen.getByRole('status')).toHaveTextContent('Modo demostración: no se envió nada.')
    expect(fetch).not.toHaveBeenCalled()
  })
})

describe('ContactForm with a Formspree ID', () => {
  it('posts to Formspree as JSON-accepting request and clears the form on success', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true }))
    const { user } = await renderForm('test-id')
    expect(screen.queryByText(/este formulario no está conectado/i)).not.toBeInTheDocument()

    await fillValidForm(user)
    await user.click(submit())

    expect(await screen.findByText('¡Gracias! Tu mensaje fue enviado.')).toBeInTheDocument()
    expect(fetch).toHaveBeenCalledTimes(1)
    const [url, options] = fetch.mock.calls[0]
    expect(url).toBe('https://formspree.io/f/test-id')
    expect(options).toMatchObject({ method: 'POST', headers: { Accept: 'application/json' } })
    expect(options.body.get('email')).toBe('ana@example.com')
    for (const label of ['Nombre', 'Apellidos', 'Correo electrónico', 'Mensaje']) {
      expect(field(label)).toHaveValue('')
    }
  })

  it('keeps what the user typed and offers the email when sending fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 500 }))
    const { user } = await renderForm('test-id')

    await fillValidForm(user)
    await user.click(submit())

    expect(await screen.findByText(/No pudimos enviar tu mensaje/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'info@vetegramcr.com' })).toHaveAttribute(
      'href',
      'mailto:info@vetegramcr.com',
    )
    expect(field('Nombre')).toHaveValue('Ana')
    expect(field('Mensaje')).toHaveValue('Quiero una demo.')
  })

  it('shows the sending state and ignores a second submit while waiting', async () => {
    let resolveFetch
    vi.stubGlobal(
      'fetch',
      vi.fn(() => new Promise((resolve) => (resolveFetch = resolve))),
    )
    const { user } = await renderForm('test-id')

    await fillValidForm(user)
    await user.click(submit())
    expect(submit()).toHaveTextContent('Enviando…')
    expect(submit()).toHaveAttribute('aria-disabled', 'true')

    await user.click(submit())
    expect(fetch).toHaveBeenCalledTimes(1)

    resolveFetch({ ok: true })
    expect(await screen.findByText('¡Gracias! Tu mensaje fue enviado.')).toBeInTheDocument()
  })
})
