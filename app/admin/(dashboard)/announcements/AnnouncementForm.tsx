'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { createClient } from '@/app/utils/supabase/client'
import { saveAnnouncementAction } from './actions'

type Props = {
  initialData?: {
    id: string
    title: string
    content: string
    created_at: string
    photos: string[]
  }
}

export function AnnouncementForm({ initialData }: Props) {
  const router = useRouter()
  const supabase = createClient()
  
  const [recordId] = useState(initialData?.id || crypto.randomUUID())
  const [title, setTitle] = useState(initialData?.title || '')
  const [content, setContent] = useState(initialData?.content || '')
  const [createdAt, setCreatedAt] = useState<Date>(
    initialData?.created_at ? new Date(initialData.created_at) : new Date()
  )
  const [existingPhotos, setExistingPhotos] = useState<string[]>(initialData?.photos || [])
  const [newFiles, setNewFiles] = useState<File[]>([])
  const [newFileUrls, setNewFileUrls] = useState<string[]>([])
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorText, setErrorText] = useState('')

  // Fullscreen Photo Viewer State
  const [viewingPhoto, setViewingPhoto] = useState<string | null>(null)

  useEffect(() => {
    // Generate an ID if creating new so we can upload photos properly
    return () => {
      // Clean up object URLs on unmount
      newFileUrls.forEach(url => URL.revokeObjectURL(url))
    }
  }, [newFileUrls])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const files = Array.from(e.target.files)
    
    // Validate 5MB limit
    const MAX_SIZE = 5 * 1024 * 1024
    const validFiles = files.filter(f => {
      if (f.size > MAX_SIZE) {
        alert(`File ${f.name} is too large. Maximum size is 5MB.`)
        return false
      }
      return true
    })

    const urls = validFiles.map(f => URL.createObjectURL(f))
    setNewFiles(prev => [...prev, ...validFiles])
    setNewFileUrls(prev => [...prev, ...urls])
  }

  const removeNewFile = (index: number) => {
    URL.revokeObjectURL(newFileUrls[index])
    setNewFiles(prev => prev.filter((_, i) => i !== index))
    setNewFileUrls(prev => prev.filter((_, i) => i !== index))
  }

  const removeExistingPhoto = (url: string) => {
    setExistingPhotos(prev => prev.filter(p => p !== url))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorText('')

    try {
      // 1. Upload new files to Supabase Storage
      const uploadedUrls: string[] = []
      
      for (const file of newFiles) {
        const ext = file.name.split('.').pop()
        const safeName = `${crypto.randomUUID()}.${ext}`
        const path = `announcements/${recordId}/${safeName}`

        const { data, error: uploadError } = await supabase.storage
          .from('tealand-media')
          .upload(path, file, { upsert: true })

        if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`)

        // Get public URL
        const { data: publicUrlData } = supabase.storage
          .from('tealand-media')
          .getPublicUrl(path)
          
        uploadedUrls.push(publicUrlData.publicUrl)
      }

      // 2. Combine existing + newly uploaded
      const finalPhotos = [...existingPhotos, ...uploadedUrls]

      // 3. Save to database via Server Action
      await saveAnnouncementAction(
        recordId,
        title,
        content,
        createdAt.toISOString(),
        finalPhotos
      )

      router.push('/admin/announcements')
      router.refresh()
    } catch (err: any) {
      setErrorText(err.message || 'An unexpected error occurred')
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* Lightbox / Fullscreen Viewer */}
      {viewingPhoto && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm cursor-zoom-out"
          onClick={() => setViewingPhoto(null)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={viewingPhoto} 
            alt="Fullscreen View" 
            className="max-w-full max-h-[90vh] object-contain shadow-2xl rounded"
          />
          <button 
            type="button"
            onClick={() => setViewingPhoto(null)}
            className="absolute top-6 right-6 text-white/70 hover:text-white bg-black/50 hover:bg-black/70 rounded-full w-10 h-10 flex items-center justify-center transition-all text-xl"
            aria-label="Close"
          >
            ×
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-4xl">
        {errorText && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
            {errorText}
          </div>
        )}

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                required
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#C9A84C] focus:ring-[#C9A84C] sm:text-sm px-4 py-2 border"
                placeholder="Announcement Title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <DatePicker
                selected={createdAt}
                onChange={(date: Date | null) => date && setCreatedAt(date)}
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#C9A84C] focus:ring-[#C9A84C] sm:text-sm px-4 py-2 border"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <textarea
              required
              rows={10}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#C9A84C] focus:ring-[#C9A84C] sm:text-sm px-4 py-2 border resize-y"
              placeholder="Write the announcement details here..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Photos (Max 5MB each)
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#C9A84C]/10 file:text-[#C9A84C] hover:file:bg-[#C9A84C]/20"
            />
            
            {/* Display attached photos */}
            {(existingPhotos.length > 0 || newFiles.length > 0) && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {existingPhotos.map((url) => (
                  <div key={url} className="relative group">
                    <div 
                      className="aspect-video bg-gray-100 rounded-lg overflow-hidden relative cursor-zoom-in"
                      onClick={() => setViewingPhoto(url)}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={url} alt="Uploaded" className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105" />
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeExistingPhoto(url);
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold shadow-md hover:bg-red-600 transition-transform scale-0 group-hover:scale-100"
                    >
                      ×
                    </button>
                  </div>
                ))}
                
                {newFiles.map((file, i) => (
                  <div key={i} className="relative group">
                    <div 
                      className="aspect-video bg-gray-100 rounded-lg overflow-hidden relative border border-gray-200 cursor-zoom-in group-hover:border-[#C9A84C] transition-colors"
                      onClick={() => setViewingPhoto(newFileUrls[i])}
                    >
                      {/* Preview Image */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={newFileUrls[i]} alt="Preview" className="object-cover w-full h-full opacity-50 transition-transform duration-300 group-hover:scale-105" />
                      
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center pointer-events-none">
                        <span className="text-xs text-black font-medium truncate w-full bg-white/70 px-1 rounded shadow-sm">{file.name}</span>
                        <span className="text-[10px] text-gray-800 font-medium bg-white/70 px-1 rounded mt-1 shadow-sm">({Math.round(file.size/1024)} KB)</span>
                      </div>
                      <span className="absolute top-1 left-1 text-[9px] bg-blue-100/90 text-blue-700 font-bold px-1.5 py-0.5 rounded shadow">NEW</span>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeNewFile(i);
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold shadow-md hover:bg-red-600 transition-transform scale-0 group-hover:scale-100"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => router.push('/admin/announcements')}
              className="px-5 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 bg-[#1B5954] text-white rounded-lg hover:bg-[#143f3c] transition-colors text-sm font-medium disabled:opacity-50 flex items-center gap-2 shadow"
            >
              {isSubmitting ? 'Saving...' : 'Save Announcement'}
            </button>
          </div>
        </div>
      </form>
    </>
  )
}
