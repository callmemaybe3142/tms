import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getDictionary, hasLocale, type Locale } from '@/app/lib/dictionaries'
import { createClient } from '@/app/utils/supabase/server'
import removeMarkdown from 'remove-markdown'
import { ArchiveSidebar } from './ArchiveSidebar'

export const metadata: Metadata = { title: 'Announcements' }

// Helper to determine start and end dates of a month
function getMonthRange(year: number, month: number) {
  const start = new Date(year, month - 1, 1).toISOString()
  const end = new Date(year, month, 0, 23, 59, 59, 999).toISOString()
  return { start, end }
}

export default async function AnnouncementsPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>
  searchParams: Promise<{ page?: string; year?: string; month?: string }>
}) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang as Locale)
  const t = dict.announcements
  const supabase = await createClient()

  const awaitedSearchParams = await searchParams
  const page = parseInt(awaitedSearchParams.page || '1', 10)
  const currentYear = awaitedSearchParams.year ? parseInt(awaitedSearchParams.year, 10) : null
  const currentMonth = awaitedSearchParams.month ? parseInt(awaitedSearchParams.month, 10) : null

  // 1. Fetch only dates of all announcements to dynamically compute the sidebar tree
  const { data: allDates } = await supabase.from('announcements').select('created_at').order('created_at', { ascending: false })

  const archiveMap = new Map<number, Set<number>>()
  if (allDates) {
    allDates.forEach(d => {
      const dbDate = new Date(d.created_at)
      const yr = dbDate.getFullYear()
      const mo = dbDate.getMonth() + 1
      if (!archiveMap.has(yr)) archiveMap.set(yr, new Set())
      archiveMap.get(yr)!.add(mo)
    })
  }

  // Convert the generated Map to structured objects for the React Client Component
  const archiveData = Array.from(archiveMap.entries()).map(([year, monthSet]) => ({
    year,
    months: Array.from(monthSet).sort((a, b) => b - a) // Sort months descending
  })).sort((a, b) => b.year - a.year) // Sort years descending

  // 2. Fetch Paginated Announcements Query Setup
  const pageSize = 30
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  let query = supabase
    .from('announcements')
    .select('*, author_id(username)', { count: 'exact' })
    .order('created_at', { ascending: false })

  // Apply Time Filters
  if (currentYear && currentMonth) {
    const { start, end } = getMonthRange(currentYear, currentMonth)
    query = query.gte('created_at', start).lte('created_at', end)
  }

  // Execute Filtered Fetch
  const { data: announcements, count } = await query.range(from, to)

  const totalPages = count ? Math.ceil(count / pageSize) : 0

  return (
    <>
      <section className="bg-[#1B5954] py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-0.5 bg-[#C9A84C]" />
            <span className="text-[#C9A84C] text-sm font-semibold tracking-widest uppercase">Official Notices</span>
            <span className="w-8 h-0.5 bg-[#C9A84C]" />
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-white font-bold mb-4">{t.heroTitle}</h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">{t.heroSub}</p>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-[#FAF7F0] min-h-[50vh]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row gap-8 items-start">

          <ArchiveSidebar archiveData={archiveData} currentYear={currentYear} currentMonth={currentMonth} lang={lang} />

          <div className="flex-1 w-full shrink">
            {(!announcements || announcements.length === 0) ? (
              <div className="text-center py-20 bg-white rounded-xl border border-gray-100 shadow-sm">
                <h2 className="font-serif text-3xl text-[#1B5954] font-bold mb-4">No content found</h2>
                <p className="text-[#4a6361] text-lg leading-relaxed">There are no announcements matching your selected date range.</p>
                <div className="mt-10 h-0.5 w-24 bg-[#C9A84C] mx-auto" />
              </div>
            ) : (
              <div className="flex flex-col gap-12 sm:gap-16">
                {announcements.map((post) => {
                  const plainText = removeMarkdown(post.content)
                  const trimmedContent = plainText.length > 200 ? plainText.slice(0, 200) + '...' : plainText

                  return (
                    <article key={post.id} className="group relative grid grid-cols-1 sm:grid-cols-[1fr_200px] gap-6 sm:gap-12 items-start border-b border-gray-200 pb-12 sm:pb-16 last:border-0 hover:bg-white/40 p-4 -mx-4 rounded-xl transition-colors">
                      <div className="flex flex-col items-start">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-6 h-6 rounded-full bg-[#1B5954] text-white flex items-center justify-center text-[10px] font-bold uppercase transition-colors">
                            {post.author_id?.username ? post.author_id.username[0] : 'T'}
                          </div>
                          <span className="text-sm font-medium text-gray-900">
                            {post.author_id?.username || 'Admin'}
                          </span>
                          <span className="text-gray-400 text-xs px-1">•</span>
                          <time className="text-sm text-gray-500" dateTime={post.created_at}>
                            {new Date(post.created_at).toLocaleDateString(lang === 'my' ? 'my-MM' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </time>
                        </div>

                        <h2 className="font-serif text-2xl font-bold text-[#0e2e2c] mb-3 group-hover:text-[#1B5954] transition-colors line-clamp-5">
                          <Link href={`/${lang}/announcements/${post.id}`}>
                            <span className="absolute inset-0 z-10" />
                            {post.title}
                          </Link>
                        </h2>

                        <p className="text-gray-600 leading-relaxed line-clamp-3 mb-4 text-base">
                          {trimmedContent}
                        </p>

                        <div className="flex items-center gap-4 text-xs font-semibold text-gray-400 mt-auto pt-2">
                          <span className="bg-gray-100 px-2 py-1 rounded-full uppercase tracking-wider text-[10px] text-gray-500">Notice</span>
                          <span>{Math.ceil(post.content.length / 800) || 1} min read</span>
                        </div>
                      </div>

                      <div className={`aspect-video sm:aspect-[4/3] w-full relative rounded-lg overflow-hidden shadow-sm ${(!post.photos || post.photos.length === 0) ? 'bg-[#1B5954]/5 p-6 flex items-center justify-center' : 'bg-gray-100'}`}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={post.photos && post.photos.length > 0 ? post.photos[0] : '/images/logo-tms.png'}
                          alt={post.title}
                          className={`w-full h-full group-hover:scale-105 transition-transform duration-500 ${post.photos && post.photos.length > 0 ? 'object-cover' : 'object-contain opacity-40'}`}
                        />
                      </div>
                    </article>
                  )
                })}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-16 flex items-center justify-center gap-4 border-t border-gray-200 pt-8">
                {page > 1 ? (
                  <Link href={`/${lang}/announcements?page=${page - 1}${currentYear ? `&year=${currentYear}&month=${currentMonth}` : ''}`} className="px-5 py-2.5 text-sm font-semibold text-[#1B5954] bg-white border border-[#1B5954]/20 rounded-full hover:bg-[#1B5954] hover:text-white transition-all shadow-sm">
                    &larr; Previous
                  </Link>
                ) : (
                  <span className="px-5 py-2.5 text-sm text-gray-400 bg-gray-50 border border-gray-200 rounded-full cursor-not-allowed">
                    &larr; Previous
                  </span>
                )}

                <span className="text-sm font-medium text-gray-500 px-4">
                  {page} / {totalPages}
                </span>

                {page < totalPages ? (
                  <Link href={`/${lang}/announcements?page=${page + 1}${currentYear ? `&year=${currentYear}&month=${currentMonth}` : ''}`} className="px-5 py-2.5 text-sm font-semibold text-[#1B5954] bg-white border border-[#1B5954]/20 rounded-full hover:bg-[#1B5954] hover:text-white transition-all shadow-sm">
                    Next &rarr;
                  </Link>
                ) : (
                  <span className="px-5 py-2.5 text-sm font-medium text-gray-400 bg-gray-50 border border-gray-200 rounded-full cursor-not-allowed">
                    Next &rarr;
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
