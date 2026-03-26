import { createClient } from '@/app/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function NewsArticlesAdminPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  // All roles (admin, editor, writer) can access this page
  // No explicit role check needed, just rendering

  return (
    <div className="max-w-6xl w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-serif text-[#1B5954] font-bold mb-2">News & Articles</h1>
          <p className="text-gray-600">Draft, edit, and publish stories to the main site.</p>
        </div>
        <button className="px-5 py-2.5 bg-[#1B5954] text-white font-medium text-sm rounded-lg hover:bg-[#143f3c] transition-colors shadow">
          Write Article
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Empty State Showcase */}
        <div className="p-16 text-center border-b border-gray-50">
          <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-gray-200">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
            </svg>
          </div>
          <h3 className="font-bold text-gray-900 text-lg mb-2">Start Writing Your First Story</h3>
          <p className="text-gray-500 max-w-sm mx-auto mb-6">Create compelling articles to engage prospective students and community members.</p>
        </div>

        {/* Future Table Schema Interface */}
        <div className="bg-gray-50/50 p-6">
          <table className="w-full text-left font-sans text-sm">
            <thead className="text-xs text-gray-500 uppercase tracking-wider border-b border-gray-200">
              <tr>
                <th className="pb-3 font-medium">Title</th>
                <th className="pb-3 font-medium">Category</th>
                <th className="pb-3 font-medium">Author</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-400">
              <tr>
                <td className="py-4 italic" colSpan={5}>Data structure ready... Awaiting implementation.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
