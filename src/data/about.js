import { CalendarCheck, ClipboardPlus, HandHeart, HeartPulse } from 'lucide-react'

export const about = {
  eyebrow: 'Te contamos',
  title: '¿Qué es Vetegram?',
  description:
    'Somos una empresa desarrolladora de soluciones tecnológicas para el sector veterinario. En el corazón de nuestra misión se encuentra el compromiso con la salud y bienestar animal y nos enorgullece ofrecer un sistema veterinario integral que transforma la manera en que las clínicas y profesionales gestionan el cuidado de sus pacientes. Además, los dueños de los peluditos se sentirán confiados de poder dar seguimiento al estado de salud de sus mascotitas.',
}

// TODO: replace with Vetegram's real copy (the original site only had lorem ipsum here).
export const aboutAccordion = [
  {
    id: 'responsabilidad',
    title: 'Responsabilidad social',
    content: 'Texto temporal: aquí irá cómo Vetegram contribuye al bienestar animal y a la comunidad veterinaria.',
  },
  {
    id: 'mision',
    title: 'Misión',
    content: 'Texto temporal: aquí irá la misión de Vetegram.',
  },
  {
    id: 'servicios-valor',
    title: 'Servicios de valor agregado',
    content: 'Texto temporal: aquí irán los servicios adicionales que Vetegram ofrece a las clínicas.',
  },
]

export const aboutFeatures = [
  {
    icon: HeartPulse,
    title: 'Registro de Pacientes',
    text: 'Crea y mantiene perfiles detallados de cada paciente',
  },
  {
    icon: ClipboardPlus,
    title: 'Historial clínico',
    text: 'Almacena de forma segura y accesible las historias clínicas digitales',
  },
  {
    icon: CalendarCheck,
    title: 'Gestión eficiente de citas',
    text: 'Fácil programación de citas y recordatorios automáticos',
  },
  {
    icon: HandHeart,
    title: 'Soporte Continuo',
    text: 'Aseguramos el correcto funcionamiento del sistema.',
  },
]
