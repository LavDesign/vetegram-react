import dogWalking from '../assets/images/dog-walking.webp'
import grooming1 from '../assets/images/grooming-1.webp'
import grooming2 from '../assets/images/grooming-2.webp'
import marketplace1 from '../assets/images/marketplace-1.webp'
import marketplace2 from '../assets/images/marketplace-2.webp'

export const servicesIntro = {
  title: 'Plataforma de Gestión Veterinaria',
  description:
    'Sistema integral que permite la gestión de pacientes, historias clínicas, citas, facturación electrónica, inventario, reportes contables y otras operaciones clave de una clínica veterinaria.',
}

const groomingText =
  'Plataforma web para gestión de citas para el cuidado y aseo de animales con reservas online en tiempo real, recordatorios automáticos e historiales de visita.'
const marketplaceText =
  'Utilice nuestro exclusivo mercado en línea, diseñado para que usted pueda vender la variedad de productos de su inventario desde nuestra aplicación.'

// Same order as the original slider.
// TODO: cards 3 and 4 repeat Grooming and Marketplace (as in the original); replace with real services.
export const services = [
  {
    id: 'grooming',
    title: 'Grooming',
    text: groomingText,
    image: grooming1,
    alt: 'Un perro pequeño envuelto en una toalla entre burbujas de jabón',
  },
  {
    id: 'marketplace',
    title: 'Marketplace',
    text: marketplaceText,
    image: marketplace1,
    alt: 'Un perro sonriente dentro de un carrito de compras en un supermercado',
  },
  {
    id: 'grooming-2',
    title: 'Grooming',
    text: groomingText,
    image: grooming2,
    alt: 'Un perro frente a dos manos con un peine y unas tijeras',
  },
  {
    id: 'marketplace-2',
    title: 'Marketplace',
    text: marketplaceText,
    image: marketplace2,
    alt: 'Juguetes, premios y un plato de comida para mascotas sobre fondo rosado',
  },
  {
    id: 'paseadores',
    title: 'Paseadores de Perros',
    text: '¿Te preocupa que tu perro esté solo en casa todo el día? ¡Reserva un cuidador de perros para asegurarte de que reciba la atención y el ejercicio que necesita mientras estás fuera!',
    image: dogWalking,
    alt: 'Una persona acaricia a un perro con correa durante un paseo',
  },
]
