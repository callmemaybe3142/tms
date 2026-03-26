import { AnnouncementForm } from '../AnnouncementForm'
import { createClient } from '@/app/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function NewAnnouncementPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  return (
    <div className="max-w-6xl w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-[#1B5954] font-bold mb-2">Create Announcement</h1>
        <p className="text-gray-600">Draft a new official notice for the TEALAND Medical School community.</p>
      </div>
      <AnnouncementForm />
    </div>
  )
}
