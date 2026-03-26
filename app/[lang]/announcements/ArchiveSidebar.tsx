'use client'

import React, { useState } from 'react'
import Link from 'next/link'

type ArchiveData = {
  year: number
  months: number[]
}

type Props = {
  archiveData: ArchiveData[]
  currentYear: number | null
  currentMonth: number | null
  lang: string
}

const monthNamesEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const monthNamesMy = ['ဇန်နဝါရီ', 'ဖေဖော်ဝါရီ', 'မတ်', 'ဧပြီ', 'မေ', 'ဇွန်', 'ဇူလိုင်', 'သြဂုတ်', 'စက်တင်ဘာ', 'အောက်တိုဘာ', 'နိုဝင်ဘာ', 'ဒီဇင်ဘာ']

export function ArchiveSidebar({ archiveData, currentYear, currentMonth, lang }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const isAll = !currentYear && !currentMonth
  const monthNames = lang === 'my' ? monthNamesMy : monthNamesEn

  // Expand the current year by default
  const [expandedYears, setExpandedYears] = useState<Set<number>>(new Set(currentYear ? [currentYear] : []))

  const toggleYear = (yr: number) => {
    setExpandedYears(prev => {
      const next = new Set(prev)
      if (next.has(yr)) next.delete(yr)
      else next.add(yr)
      return next
    })
  }

  const Content = (
    <div className="flex flex-col gap-2">
      <Link 
        href={`/${lang}/announcements`}
        onClick={() => setIsOpen(false)}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isAll ? 'bg-[#1B5954] text-white' : 'text-gray-700 hover:bg-gray-100'}`}
      >
        {lang === 'my' ? 'အားလုံးပြပါ' : 'All Announcements'}
      </Link>

      <div className="mt-4 flex flex-col gap-2">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-4 mb-1">
          {lang === 'my' ? 'အချိန်အလိုက်ရှာရန်' : 'Filter by Date'}
        </h3>
        
        {archiveData.map((data) => {
          const isExpanded = expandedYears.has(data.year)
          return (
            <div key={data.year} className="flex flex-col">
              <button 
                onClick={() => toggleYear(data.year)}
                className="flex items-center justify-between px-4 py-2 text-sm font-bold text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <span>{data.year}</span>
                <span className={`text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}>▼</span>
              </button>
              
              {isExpanded && (
                <div className="flex flex-col pl-4 mt-1 border-l-2 border-gray-100 ml-6 gap-1">
                  {data.months.map((m) => {
                    const isActive = currentYear === data.year && currentMonth === m
                    return (
                      <Link
                        key={m}
                        href={`/${lang}/announcements?year=${data.year}&month=${m}`}
                        onClick={() => setIsOpen(false)}
                        className={`px-4 py-1.5 rounded-lg text-sm transition-colors ${isActive ? 'bg-[#C9A84C]/20 text-[#1B5954] font-bold' : 'text-gray-600 hover:bg-gray-100'}`}
                      >
                        {monthNames[m - 1]}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="md:hidden w-full mb-6">
        <button 
          onClick={() => setIsOpen(true)}
          className="w-full bg-white border border-gray-200 text-gray-800 font-semibold py-3 rounded-xl shadow-sm flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
          {lang === 'my' ? 'စီစစ်ရန်' : 'Filter Announcements'}
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-72 shrink-0 bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-fit sticky top-24">
        {Content}
      </aside>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl overflow-y-auto p-6 flex flex-col animate-slide-in-right">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-serif font-bold text-[#1B5954]">
                {lang === 'my' ? 'ရွေးချယ်ရန်' : 'Filter'}
              </h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-800 w-8 h-8 flex items-center justify-center text-xl bg-gray-100 rounded-full">
                ×
              </button>
            </div>
            {Content}
          </div>
        </div>
      )}
    </>
  )
}
