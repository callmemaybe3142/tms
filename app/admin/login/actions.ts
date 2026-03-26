'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/app/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  // Use the standard schema: email and password
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    redirect('/admin/login?message=Could not authenticate user')
  }

  revalidatePath('/admin', 'layout')
  redirect('/admin')
}
