import { createClient } from '@/app/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function POST() {
  const supabase = await createClient()

  const { error } = await supabase.auth.signOut()

  if (!error) {
    redirect('/admin/login')
  }

  // If there's an error redirect back with error message
  redirect('/admin/login?message=Could not sign out')
}
