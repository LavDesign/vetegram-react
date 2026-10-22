import { ChevronDown } from 'lucide-react'
import { useId, useState } from 'react'

// One panel open at a time; the first starts open. Clicking the open item closes it.
function Accordion({ items }) {
  const baseId = useId()
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const open = index === openIndex
        const buttonId = `${baseId}-button-${index}`
        const panelId = `${baseId}-panel-${index}`
        return (
          <div key={item.id}>
            <h4>
              <button
                type="button"
                id={buttonId}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? -1 : index)}
                className={`flex w-full items-center justify-between gap-4 rounded-full px-6 py-3 text-left font-semibold uppercase transition-colors duration-200 hover:bg-accent hover:text-ink focus-visible:outline-ink ${
                  open ? 'bg-accent text-ink' : 'bg-ink text-white'
                }`}
              >
                {item.title}
                <ChevronDown
                  aria-hidden="true"
                  className={`size-5 shrink-0 transition-transform duration-300 motion-reduce:transition-none ${
                    open ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </h4>
            {/* grid-rows 0fr -> 1fr animates height; inert keeps the closed panel out of tab order and the a11y tree */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              inert={!open}
              className={`grid transition-[grid-template-rows] duration-300 motion-reduce:transition-none ${
                open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-6 pt-4 pb-2 text-lg font-light">{item.content}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Accordion
