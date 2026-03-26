import { login } from './actions'
import Image from 'next/image'
import Link from 'next/link'
import { SubmitButton } from './SubmitButton'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ message: string }>
}) {
  const { message } = await searchParams

  return (
    <div className="flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="w-full max-w-md space-y-8 bg-white p-10 rounded-xl shadow-lg border border-gray-100">
        <div className="flex flex-col items-center">
          <div className="relative w-20 h-20 mb-4">
            <Image src="/images/logo-tms.png" alt="Logo" fill className="object-contain" priority />
          </div>
          <h2 className="text-center text-3xl font-serif font-bold text-[#1B5954]">
            Admin Portal
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 uppercase tracking-widest">
            Tealand Medical School
          </p>
        </div>
        
        <form className="mt-8 space-y-6" action={login}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="relative block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-[#C9A84C] sm:text-sm sm:leading-6"
                placeholder="editor@tms.edu.mm"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="relative block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-[#C9A84C] sm:text-sm sm:leading-6"
                placeholder="••••••••"
              />
            </div>
          </div>

          {message && (
            <p className="text-sm bg-red-50 text-red-500 p-3 rounded text-center font-medium">
              {message}
            </p>
          )}

          <div>
            <SubmitButton />
          </div>
        </form>

        <div className="mt-6 text-center">
          <Link href="/" className="text-sm font-medium text-[#C9A84C] hover:text-[#e0c06a] transition-colors">
            &larr; Back to Main Website
          </Link>
        </div>
      </div>
    </div>
  )
}
