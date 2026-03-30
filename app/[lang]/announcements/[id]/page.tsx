import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { createClient } from '@/app/utils/supabase/server'
import { hasLocale } from '@/app/lib/dictionaries'
import { PhotoGallery } from './PhotoGallery'
import { ScrollToTop } from './ScrollToTop'
import { ViewTracker } from './ViewTracker'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const supabase = await createClient()
  const { data } = await supabase.from('announcements').select('title, photos').eq('id', id).single()

  if (!data) return { title: 'Announcement Not Found' }
  
  const ogImage = data.photos && data.photos.length > 0 ? data.photos[0] : '/images/logo-tms.png'

  return { 
    title: data.title,
    openGraph: {
      title: data.title,
      images: [
        {
          url: ogImage,
          alt: data.title,
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      images: [ogImage],
    }
  }
}

export default async function AnnouncementDetailPage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>
}) {
  const { lang, id } = await params

  if (!hasLocale(lang)) notFound()

  const supabase = await createClient()

  // 1. Fetch Announcement Details
  const { data: post, error } = await supabase
    .from('announcements')
    .select('*, author_id(username)')
    .eq('id', id)
    .single()

  if (error || !post) {
    notFound()
  }

  // 2. Prepare View Count for instant UI rendering
  // Actual database mutation has been securely offset to the ViewTracker component using a Supabase Postgres RPC to bypass RLS failures safely.
  const newViewCount = (post.view_count || 0) + 1

  return (
    <article className="bg-[#FAF7F0] min-h-screen pb-24">
      {/* Article Header (Medium Style) */}
      <header className="max-w-3xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-10">
        <Link href={`/${lang}/announcements`} className="inline-flex items-center text-[#1B5954] hover:text-[#C9A84C] transition-colors font-medium mb-10 text-sm">
          &larr; Back to Announcements
        </Link>

        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#0e2e2c] leading-[1.2] mb-8">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 text-gray-500 border-b border-gray-200/60 pb-8">
          <div className="w-12 h-12 rounded-full bg-[#1B5954]/10 text-[#1B5954] flex items-center justify-center text-xl font-bold uppercase shadow-sm border border-[#1B5954]/20">
            {post.author_id?.username ? post.author_id.username[0] : 'A'}
          </div>

          <div className="flex flex-col">
            <span className="font-semibold text-gray-900 tracking-wide text-[15px]">
              {post.author_id?.username || 'Tealand Medical School Admin'}
            </span>
            <div className="flex items-center gap-2 text-sm mt-0.5 text-gray-400 font-medium">
              <span>{Math.ceil(post.content.length / 800)} min read</span>
              <span>•</span>
              <time dateTime={post.created_at} className="uppercase tracking-wider text-[11px]">
                {new Date(post.created_at).toLocaleDateString(lang === 'my' ? 'my-MM' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </time>
              <span>•</span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                {newViewCount}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6">

        {/* Markdown Typography Container */}
        <section className="prose prose-lg prose-[#1B5954] max-w-none 
          prose-headings:font-serif prose-headings:text-[#0e2e2c] 
          prose-a:text-[#C9A84C] prose-a:no-underline hover:prose-a:underline
          prose-img:rounded-xl prose-img:shadow-md
          prose-blockquote:border-l-[#C9A84C] prose-blockquote:bg-[#1B5954]/5 prose-blockquote:py-1 prose-blockquote:pr-4 prose-blockquote:rounded-r-lg
          prose-hr:border-gray-200">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </section>

        {/* Cover Photo Galleries */}
        <PhotoGallery photos={post.photos || []} />

        {/* Footer of the article */}
        <div className="mt-20 flex justify-center border-t border-gray-200/60 pt-10">
          <div className="w-16 h-1 bg-[#C9A84C]" />
        </div>
      </main>

      {/* Floating Scroll To Top Button */}
      <ScrollToTop />
      
      {/* Invisible Secure View Counter (bypasses RLS and NextJS Caching) */}
      <ViewTracker announcementId={id} />
    </article>
  )
}
