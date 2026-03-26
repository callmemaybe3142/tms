import { createClient } from '@/app/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { DeleteButton } from './DeleteButton'
import removeMarkdown from 'remove-markdown'

export default async function AnnouncementsAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  // Role check: Only "editor" and "admin" can access announcements
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  const role = profile?.role || 'writer'
  if (role !== 'editor' && role !== 'admin') {
    return (
      <div className="p-8 text-center bg-red-50 border border-red-200 rounded-xl max-w-2xl mx-auto mt-12">
        <h2 className="text-2xl font-bold text-red-600 mb-2">Access Denied</h2>
        <p className="text-red-500">You do not have permission to view or manage announcements. Please contact an administrator.</p>
      </div>
    )
  }

  // Pagination Logic
  const params = await searchParams
  const page = parseInt(params.page || '1', 10)
  const pageSize = 5
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  // Fetch paginated announcements
  const { data: announcements, count, error } = await supabase
    .from('announcements')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to)

  if (error) {
    return <div className="p-4 bg-red-50 text-red-500 rounded">Error loading data: {error.message}</div>
  }

  const totalPages = count ? Math.ceil(count / pageSize) : 0

  return (
    <div className="max-w-4xl w-full mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-serif text-[#1B5954] font-bold mb-2">Announcements Feed</h1>
          <p className="text-gray-600">Manage official notices and updates.</p>
        </div>
        <Link href="/admin/announcements/new" className="px-5 py-2.5 bg-[#C9A84C] text-[#0e2e2c] font-bold rounded-lg hover:bg-[#e0c06a] transition-colors shadow whitespace-nowrap">
          + New Announcement
        </Link>
      </div>

      <div className="space-y-6">
        {(!announcements || announcements.length === 0) ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-200">
              <span className="text-gray-400 font-serif text-xl">A</span>
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-2">No Announcements Published</h3>
            <p className="text-gray-500 max-w-sm mx-auto">Click the button above to create your first announcement.</p>
          </div>
        ) : (
          announcements.map((post) => (
            <div key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Post Header */}
              <div className="px-6 py-4 flex items-center justify-between border-b border-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#1B5954]/10 text-[#1B5954] rounded-full flex items-center justify-center font-bold text-lg">
                    A
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 leading-tight">
                      Admin
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(post.created_at).toLocaleString()}
                    </div>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Link href={`/admin/announcements/${post.id}/edit`} className="text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 hover:text-gray-900 px-3 py-1.5 rounded transition-colors font-medium">
                    Edit
                  </Link>
                  <DeleteButton id={post.id} />
                </div>
              </div>

              {/* Post Content */}
              <div className="px-6 py-5">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{post.title}</h3>
                <div className="text-gray-700 whitespace-pre-wrap leading-relaxed text-sm mb-4">
                  {removeMarkdown(post.content).length > 200 
                    ? removeMarkdown(post.content).slice(0, 200) + '...' 
                    : removeMarkdown(post.content)}
                </div>
                
                {/* Post Photos Grid */}
                {post.photos && post.photos.length > 0 && (
                  <div className={`grid gap-2 mt-4 ${
                    post.photos.length === 1 ? 'grid-cols-1' : 
                    post.photos.length === 2 ? 'grid-cols-2' : 
                    'grid-cols-2 sm:grid-cols-3'
                  }`}>
                    {post.photos.map((url: string, index: number) => (
                      <div key={index} className="aspect-square sm:aspect-video rounded-lg overflow-hidden bg-gray-100 relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={url} alt={`Photo ${index + 1}`} className="object-cover w-full h-full" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          {page > 1 ? (
            <Link href={`/admin/announcements?page=${page - 1}`} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              &larr; Previous
            </Link>
          ) : (
            <span className="px-4 py-2 text-sm font-medium text-gray-400 bg-gray-50 rounded-lg cursor-not-allowed">
              &larr; Previous
            </span>
          )}
          
          <span className="text-sm font-medium text-gray-600">
            Page {page} of {totalPages}
          </span>
          
          {page < totalPages ? (
            <Link href={`/admin/announcements?page=${page + 1}`} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              Next &rarr;
            </Link>
          ) : (
            <span className="px-4 py-2 text-sm font-medium text-gray-400 bg-gray-50 rounded-lg cursor-not-allowed">
              Next &rarr;
            </span>
          )}
        </div>
      )}
    </div>
  )
}
