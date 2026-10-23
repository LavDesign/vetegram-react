import heroClinic from '../assets/images/hero-clinic.webp'
import heroClinicMobile from '../assets/images/hero-clinic-mobile.webp'
import heroWelcome from '../assets/images/hero-welcome.webp'
import heroWelcomeMobile from '../assets/images/hero-welcome-mobile.webp'

// Photos come from Unsplash; credits are listed in the README (M7).
// `imageMobile` is an 800×1000 centre crop: mobile slides are portrait, so the full 1920 px photo was mostly cropped away.
export const heroSlides = [
  {
    id: 'bienvenida',
    image: heroWelcome,
    imageMobile: heroWelcomeMobile,
    alt: 'Un gato y un perro acurrucados sobre la hierba',
    title: 'Bienvenido a Vetegram',
    text: 'Descubre la innovación en el cuidado animal con nuestro sistema veterinario',
  },
  {
    id: 'gestion',
    image: heroClinic,
    imageMobile: heroClinicMobile,
    alt: 'Un gato atigrado y un cachorro descansando juntos en el césped',
    title: 'Facilitamos la gestión de tu clínica',
    text: 'Con herramientas web para un cuidado óptimo de tus pacientes peludos.',
  },
]
