'use client'

import { useEffect, useRef } from 'react'
import { createClient } from '@/app/utils/supabase/client'

export function ViewTracker({ announcementId }: { announcementId: string }) {
  const tracked = useRef(false)

  useEffect(() => {
    // Prevent double-firing in React 18 Strict Mode during development
    if (tracked.current) return
    tracked.current = true

    const supabase = createClient()
    // Trigger the secure RPC function to bypass database Row Level Security policies!
    supabase.rpc('increment_announcement_view', { announcement_id: announcementId }).then(({ error }) => {
      if (error) console.error("Could not + vc:", error.message)
    })
  }, [announcementId])

  return null
}
