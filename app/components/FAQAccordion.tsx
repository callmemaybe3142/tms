'use client'
import { useState } from 'react'

interface FAQItem { q: string; a: string }

export default function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => (
        <div
          key={i}
          className="rounded-xl border border-[#1B5954]/15 overflow-hidden"
        >
          <button
            id={`faq-item-${i}`}
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-6 py-4 text-left bg-white hover:bg-[#FAF7F0]
              transition-colors duration-200"
            aria-expanded={open === i}
          >
            <span className="font-medium text-[#1B5954] text-sm sm:text-base pr-4">{item.q}</span>
            <span className={`flex-shrink-0 w-6 h-6 rounded-full border border-[#C9A84C]/60 flex items-center justify-center
              transition-transform duration-300 ${open === i ? 'rotate-45 bg-[#C9A84C] border-[#C9A84C]' : ''}`}>
              <svg className={`w-3 h-3 ${open === i ? 'text-white' : 'text-[#C9A84C]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
              </svg>
            </span>
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${open === i ? 'max-h-96' : 'max-h-0'}`}>
            <p className="px-6 py-4 text-[#4a6361] text-sm leading-relaxed bg-[#FAF7F0] border-t border-[#1B5954]/10">
              {item.a}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
