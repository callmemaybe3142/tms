import { createClient } from '@/app/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  // 1. Verify User Session
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) {
    redirect('/admin/login')
  }

  // 2. Fetch User Profile to get Role
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()
    
  // Default to writer if no profile is found just in case
  const role = profile?.role || 'writer'
  const isWriter = role === 'writer'

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top Header / Navbar */}
      <header className="bg-[#1B5954] text-white shadow-md z-10 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            {/* Branding */}
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8">
                <Image src="/images/logo-tms.png" alt="Logo" fill className="object-contain" />
              </div>
              <span className="font-serif font-bold text-[#C9A84C] tracking-wide">TMS Admin</span>
            </div>
            
            {/* Navigation (Hidden for writers) */}
            {!isWriter && (
              <nav className="hidden sm:flex items-center gap-6">
                <Link href="/admin" className="text-white/80 hover:text-white text-sm font-medium transition-colors">
                  Dashboard
                </Link>
                <Link href="/admin/announcements" className="text-white/80 hover:text-white text-sm font-medium transition-colors">
                  Announcements
                </Link>
                <Link href="/admin/news_articles" className="text-white/80 hover:text-white text-sm font-medium transition-colors">
                  News & Articles
                </Link>
              </nav>
            )}

            {/* Profile & Logout */}
            <div className="flex items-center gap-4 border-l border-white/20 pl-4">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-sm font-medium leading-none">{profile?.username || user.email}</span>
                <span className="text-xs text-[#C9A84C] font-bold uppercase tracking-widest leading-none mt-1">
                  {role}
                </span>
              </div>
              <form action="/admin/auth/signout" method="post">
                <button
                  type="submit"
                  className="px-3 py-1.5 text-xs font-semibold border border-white/30 rounded hover:bg-white/10 transition-colors"
                >
                  Log Out
                </button>
              </form>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation for Admins/Editors */}
        {!isWriter && (
          <nav className="sm:hidden flex items-center justify-center gap-4 pb-3 px-4 border-t border-white/10 pt-3 bg-[#1B5954]">
            <Link href="/admin" className="text-white/80 hover:text-white text-sm font-medium transition-colors">
              Dash
            </Link>
            <Link href="/admin/announcements" className="text-white/80 hover:text-white text-sm font-medium transition-colors">
              Announcements
            </Link>
            <Link href="/admin/news_articles" className="text-white/80 hover:text-white text-sm font-medium transition-colors">
              News
            </Link>
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  )
}
