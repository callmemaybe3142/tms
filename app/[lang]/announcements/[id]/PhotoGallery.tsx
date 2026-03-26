'use client'

import React, { useState } from 'react'

export function PhotoGallery({ photos }: { photos: string[] }) {
  const [viewingPhoto, setViewingPhoto] = useState<string | null>(null)

  if (!photos || photos.length === 0) return null

  return (
    <>
      <div className="mb-14 mt-12 grid gap-6">
        {photos.map((url: string, index: number) => (
          <div 
            key={index} 
            className="w-full relative rounded-xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm cursor-zoom-in group flex justify-center"
            onClick={() => setViewingPhoto(url)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={url}
              alt={`Exhibit ${index + 1}`}
              className="max-h-[70vh] w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
            />
            {/* View full screen overlay hint */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center pointer-events-none">
              <span className="bg-black/60 text-white text-sm px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                Click to expand
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox / Fullscreen Viewer */}
      {viewingPhoto && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 sm:p-8 backdrop-blur-md cursor-zoom-out"
          onClick={() => setViewingPhoto(null)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={viewingPhoto} 
            alt="Fullscreen View" 
            className="max-w-full max-h-full object-contain shadow-2xl rounded"
          />
          <button 
            type="button"
            onClick={() => setViewingPhoto(null)}
            className="absolute top-6 right-6 text-white/70 hover:text-white bg-black/50 hover:bg-black/70 rounded-full w-12 h-12 flex items-center justify-center transition-all text-2xl"
            aria-label="Close"
          >
            ×
          </button>
        </div>
      )}
    </>
  )
}
