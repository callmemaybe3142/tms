'use client'

import React from 'react'

export function DeleteButton({ id }: { id: string }) {
  const handleDelete = async (formData: FormData) => {
    if (!window.confirm('Are you sure you want to completely delete this and its photos?')) {
      return
    }

    try {
      const response = await fetch(`/admin/api/announcements/delete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      if (response.ok) {
        window.location.reload()
      } else {
        alert('Failed to delete!')
      }
    } catch (e) {
      alert('Error occurred.')
    }
  }

  return (
    <form action={handleDelete} className="inline">
      <button type="submit" className="text-red-500 hover:text-red-700 font-medium px-2 py-1 transition-colors">
        Delete
      </button>
    </form>
  )
}
