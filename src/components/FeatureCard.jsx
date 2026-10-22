function FeatureCard({ icon: Icon, title, text }) {
  return (
    <li className="group text-center">
      <div className="mx-auto mb-6 grid size-[170px] place-items-center rounded-full border-8 border-accent text-ocean transition-[transform,color] duration-200 ease-in-out group-hover:text-accent motion-safe:group-hover:scale-120">
        <Icon aria-hidden="true" className="size-20" strokeWidth={1.75} />
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-2 text-lg">{text}</p>
    </li>
  )
}

export default FeatureCard
