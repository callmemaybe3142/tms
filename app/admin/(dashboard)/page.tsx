import { createClient } from '@/app/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function AdminDashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (profile?.role === 'writer') {
    redirect('/admin/news_articles')
  }

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-serif text-[#1B5954] font-bold mb-2">Welcome Back, {profile?.username || 'Admin'}!</h1>
      <p className="text-gray-600 mb-8">Manage the Tealand Medical School website directly from this portal.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="w-12 h-12 bg-green-50 text-green-600 rounded-lg flex items-center justify-center mb-4 text-xl">
            A
          </div>
          <h3 className="font-bold text-gray-900 mb-1">Announcements</h3>
          <p className="text-sm text-gray-500 mb-4">You have access to manage urgent official notices and alerts.</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4 text-xl">
            N
          </div>
          <h3 className="font-bold text-gray-900 mb-1">News & Articles</h3>
          <p className="text-sm text-gray-500 mb-4">You can write, draft, and publish stories about the university.</p>
        </div>
      </div>
    </div>
  )
}
