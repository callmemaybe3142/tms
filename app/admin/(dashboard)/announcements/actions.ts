'use server'

import { createClient } from '@/app/utils/supabase/server'
import { revalidatePath } from 'next/cache'

function getStoragePath(url: string) {
  const parts = url.split('/tealand-media/')
  if (parts.length > 1) {
    return parts[1]
  }
  return url // fallback
}

export async function deleteAnnouncement(id: string) {
  const supabase = await createClient()

  // 1. Fetch the photos array
  const { data: announcement, error: fetchError } = await supabase
    .from('announcements')
    .select('photos')
    .eq('id', id)
    .single()

  if (fetchError) {
    throw new Error('Could not find announcement to delete')
  }

  // 2. Remove files from storage
  if (announcement.photos && announcement.photos.length > 0) {
    const pathsToRemove = announcement.photos.map(getStoragePath)
    await supabase.storage.from('tealand-media').remove(pathsToRemove)
  }

  // 3. Delete the database row
  const { error: deleteError } = await supabase
    .from('announcements')
    .delete()
    .eq('id', id)

  if (deleteError) {
    throw new Error('Failed to delete announcement')
  }

  revalidatePath('/admin/announcements')
}

export async function saveAnnouncementAction(
  id: string,
  title: string,
  content: string,
  created_at: string,
  photosUrls: string[]
) {
  const supabase = await createClient()

  // Verify Role
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  // We assign author_id only on INSERT based on current session
  const payload: any = {
    title,
    content,
    created_at,
    photos: photosUrls
  }

  // Are we updating an existing announcement or creating a new one?
  const { data: existing } = await supabase.from('announcements').select('id, photos').eq('id', id).maybeSingle()

  if (existing) {
    // UPDATE
    // Check if any old photos were removed during this edit
    const oldPhotos = existing.photos || []
    const newPhotosSet = new Set(photosUrls)
    const removedPhotos = oldPhotos.filter((p: string) => !newPhotosSet.has(p))

    if (removedPhotos.length > 0) {
      const pathsToRemove = removedPhotos.map(getStoragePath)
      await supabase.storage.from('tealand-media').remove(pathsToRemove)
    }

    const { error } = await supabase
      .from('announcements')
      .update(payload)
      .eq('id', id)
    if (error) throw new Error(error.message)
  } else {
    // INSERT
    payload.id = id
    payload.author_id = user.id
    const { error } = await supabase
      .from('announcements')
      .insert(payload)
    if (error) throw new Error(error.message)
  }

  revalidatePath('/admin/announcements')
}
