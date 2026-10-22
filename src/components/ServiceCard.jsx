function ServiceCard({ title, text, image, alt }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[15px] bg-white text-ink shadow-[0_14px_22px_-9px_#bbcbd8]">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={alt}
          width="900"
          height="600"
          loading="lazy"
          decoding="async"
          className="aspect-[3/2] w-full object-cover transition-transform duration-200 ease-linear motion-safe:group-hover:scale-110"
        />
        {/* Blue gradient that fades in on hover, as in the original */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-[-45deg] from-[rgba(6,190,244,0.75)] to-[rgba(45,112,253,0.6)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      </div>
      <div className="px-6 pt-3 pb-8">
        <h3 className="text-center text-[1.625rem] font-bold italic">{title}</h3>
        <p className="mt-3 text-lg leading-7 md:text-xl">{text}</p>
      </div>
    </article>
  )
}

export default ServiceCard
