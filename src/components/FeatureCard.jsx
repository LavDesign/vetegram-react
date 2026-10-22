function FeatureCard({ icon: Icon, title, text }) {
  return (
    <li className="group text-center">
      {/* Tailwind v4 `scale-*` sets the standalone `scale` property, so it has to be listed in the transition */}
      <div className="mx-auto mb-6 grid size-[170px] place-items-center rounded-full border-8 border-accent text-ocean transition-[transform,scale,color,border-color] duration-300 ease-out group-focus-within:text-accent group-hover:text-accent motion-safe:group-focus-within:scale-110 motion-safe:group-hover:scale-110">
        <Icon aria-hidden="true" className="size-20" strokeWidth={1.75} />
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-2 text-lg">{text}</p>
    </li>
  )
}

export default FeatureCard
