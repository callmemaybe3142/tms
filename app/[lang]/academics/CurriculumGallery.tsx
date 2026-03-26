'use client'

import React, { useState } from 'react'

export function CurriculumGallery({ images }: { images: string[] }) {
  const [viewingImage, setViewingImage] = useState<string | null>(null)

  return (
    <>
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {images.map((src, idx) => (
          <div 
            key={idx}
            className="group relative w-full h-auto rounded-xl overflow-hidden bg-white border border-[#1B5954]/10 shadow-sm cursor-zoom-in hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            onClick={() => setViewingImage(src)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={src} 
              alt={`Curriculum Part ${idx + 1}`} 
              className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105 bg-gray-50"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-[#1B5954]/10 transition-colors flex items-center justify-center pointer-events-none">
              <span className="bg-[#1B5954] text-white text-xs font-bold px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
                Expand View
              </span>
            </div>
            {/* Number Badge */}
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur w-8 h-8 rounded-full flex items-center justify-center text-[#1B5954] font-bold text-sm shadow-sm border border-[#1B5954]/10">
              {idx + 1}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {viewingImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 sm:p-8 backdrop-blur-md cursor-zoom-out"
          onClick={() => setViewingImage(null)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={viewingImage} 
            alt="Fullscreen View" 
            className="max-w-full max-h-full object-contain shadow-2xl rounded"
          />
          <button 
            type="button"
            onClick={() => setViewingImage(null)}
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
