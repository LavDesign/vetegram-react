import { CircleAlert } from 'lucide-react'
import { useState } from 'react'
import { contactFields, validateField } from '../data/contact'
import { contact } from '../data/site'

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID
const emptyValues = Object.fromEntries(contactFields.map((field) => [field.name, '']))

// The global focus outline uses currentColor (ink), invisible on the dark box, so fields use the accent instead
const inputClassName =
  'block w-full rounded-[10px] border-2 bg-white px-5 text-base text-ink transition-colors duration-300 focus:border-accent focus-visible:outline-accent'

function ContactForm() {
  const [values, setValues] = useState(emptyValues)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error | demo

  const handleChange = (field) => (event) => {
    const { value } = event.target
    setValues((current) => ({ ...current, [field.name]: value }))
    // Only re-check a field that already shows an error, so the message clears as soon as it's fixed.
    if (errors[field.name]) setErrors((current) => ({ ...current, [field.name]: validateField(field, value) }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (status === 'sending') return
    const form = event.currentTarget
    const nextErrors = Object.fromEntries(
      contactFields.map((field) => [field.name, validateField(field, values[field.name])]),
    )
    setErrors(nextErrors)
    const firstInvalid = contactFields.find((field) => nextErrors[field.name])
    if (firstInvalid) {
      setStatus('idle')
      form.elements.namedItem(firstInvalid.name).focus()
      return
    }

    if (!FORMSPREE_ID) {
      setStatus('demo')
      return
    }

    setStatus('sending')
    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      })
      if (!response.ok) throw new Error(`Formspree responded ${response.status}`)
      setValues(emptyValues)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const sending = status === 'sending'

  return (
    <form noValidate onSubmit={handleSubmit} className="mt-6 space-y-4">
      {!FORMSPREE_ID && (
        <p className="rounded-[10px] border border-brand/60 px-4 py-2 text-sm">
          <strong>Modo demostración:</strong> este formulario no está conectado y no envía mensajes.
        </p>
      )}

      {contactFields.map((field) => {
        const error = errors[field.name]
        const errorId = `${field.name}-error`
        const sharedProps = {
          id: field.name,
          name: field.name,
          value: values[field.name],
          onChange: handleChange(field),
          'aria-invalid': error ? true : undefined,
          'aria-describedby': error ? errorId : undefined,
          className: `${inputClassName} ${error ? 'border-rose-300' : 'border-brand'}`,
        }
        return (
          <div key={field.name}>
            <label htmlFor={field.name} className="mb-1 block font-medium">
              {field.label}
            </label>
            {field.type === 'textarea' ? (
              <textarea {...sharedProps} rows={4} className={`${sharedProps.className} py-2.5`} />
            ) : (
              <input
                {...sharedProps}
                type={field.type}
                autoComplete={field.autoComplete}
                className={`${sharedProps.className} h-11`}
              />
            )}
            {error && (
              <p id={errorId} className="mt-1.5 flex items-center gap-1.5 text-rose-300">
                <CircleAlert aria-hidden="true" className="size-4 shrink-0" />
                {error}
              </p>
            )}
          </div>
        )
      })}

      {/* Honeypot: hidden from people and assistive tech; bots that fill it get dropped by Formspree */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label htmlFor="_gotcha">No llenes este campo</label>
        <input id="_gotcha" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        // aria-disabled instead of disabled: a disabled button drops keyboard focus to <body> mid-submit
        aria-disabled={sending || undefined}
        className="mx-auto block h-14 rounded-full bg-brand px-12 font-bold text-ink shadow-[inset_12px_0_0_0_var(--color-accent)] transition-[background-color,box-shadow] duration-300 hover:bg-accent hover:shadow-none aria-disabled:cursor-not-allowed aria-disabled:opacity-70"
      >
        {sending ? 'Enviando…' : 'Enviar'}
      </button>

      <div role="status" aria-live="polite">
        {status === 'success' && <p className="font-medium">¡Gracias! Tu mensaje fue enviado.</p>}
        {status === 'error' && (
          <p className="font-medium text-rose-300">
            No pudimos enviar tu mensaje. Escríbenos a{' '}
            <a href={`mailto:${contact.email}`} className="underline hover:text-accent">
              {contact.email}
            </a>
            .
          </p>
        )}
        {status === 'demo' && (
          <p className="font-medium">
            Modo demostración: no se envió nada. Para escribirnos, usa{' '}
            <a href={`mailto:${contact.email}`} className="underline hover:text-accent">
              {contact.email}
            </a>
            .
          </p>
        )}
      </div>
    </form>
  )
}

export default ContactForm
