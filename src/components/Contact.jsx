import catDog from '../assets/images/cat-dog.webp'
import { contact } from '../data/site'
import ContactForm from './ContactForm'

function Contact() {
  return (
    <section
      id="contacto"
      aria-labelledby="contacto-title"
      style={{ backgroundImage: `url(${catDog})` }}
      className="bg-white bg-[length:min(100%,700px)_auto] bg-bottom bg-no-repeat px-4 pt-12 pb-[min(72vw,500px)] md:pt-25 lg:min-h-[105svh] lg:bg-auto lg:bg-[position:right_-104px_bottom] lg:px-0 lg:pb-12 parallax:bg-fixed"
    >
      {/* Semi-transparent ink box; 85% (not the original 50%) keeps white text at AA contrast over the photo */}
      <div className="mx-auto max-w-[570px] rounded-[10px] bg-ink/85 p-5 text-white md:p-8 lg:mx-0 lg:ml-[70px]">
        <h2 id="contacto-title" className="text-[2.1875rem] font-bold md:text-[2.8125rem]">
          Contáctanos
        </h2>
        <address className="mt-3 leading-7 not-italic">
          <a href={`mailto:${contact.email}`} className="transition-colors duration-300 hover:text-accent">
            {contact.email}
          </a>
          <br />
          Teléfono:{' '}
          <a href={contact.phoneHref} className="transition-colors duration-300 hover:text-accent">
            {contact.phone}
          </a>
          <br />
          {contact.region}
        </address>
        <ContactForm />
      </div>
    </section>
  )
}

export default Contact
