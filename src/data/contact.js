// Contact form fields. Error messages are the original site's, word for word.
export const contactFields = [
  {
    name: 'nombre',
    label: 'Nombre',
    type: 'text',
    autoComplete: 'given-name',
    requiredMessage: 'Por favor, ingresa su nombre.',
  },
  {
    name: 'apellidos',
    label: 'Apellidos',
    type: 'text',
    autoComplete: 'family-name',
    requiredMessage: 'Por favor, ingresa sus apellidos.',
  },
  {
    name: 'email',
    label: 'Correo electrónico',
    type: 'email',
    autoComplete: 'email',
    requiredMessage: 'Por favor, ingresa su correo electrónico.',
    invalidMessage: 'Por favor, ingresa un correo electrónico válido.',
  },
  {
    name: 'mensaje',
    label: 'Mensaje',
    type: 'textarea',
    requiredMessage: 'Por favor, ingresa un mensaje.',
  },
]

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Returns the error message for one field, or '' when the value is valid.
export function validateField(field, value) {
  const trimmed = value.trim()
  if (trimmed === '') return field.requiredMessage
  if (field.type === 'email' && !EMAIL_PATTERN.test(trimmed)) return field.invalidMessage
  return ''
}
