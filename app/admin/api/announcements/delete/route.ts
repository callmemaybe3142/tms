import { createClient } from '@/app/utils/supabase/server'
import { deleteAnnouncement } from '@/app/admin/(dashboard)/announcements/actions'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { id } = await req.json()
    await deleteAnnouncement(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: `Failed ${error}` }, { status: 500 })
  }
}
