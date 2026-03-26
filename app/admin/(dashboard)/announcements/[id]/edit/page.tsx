import { AnnouncementForm } from '../../AnnouncementForm'
import { createClient } from '@/app/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function EditAnnouncementPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const { data: announcement, error } = await supabase
    .from('announcements')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !announcement) {
    return <div className="text-red-500 font-bold text-center mt-10">Announcement not found!</div>
  }

  return (
    <div className="max-w-6xl w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-[#1B5954] font-bold mb-2">Edit Announcement</h1>
        <p className="text-gray-600">Update the existing notice. Photos can be managed below.</p>
      </div>
      <AnnouncementForm initialData={announcement} />
    </div>
  )
}
