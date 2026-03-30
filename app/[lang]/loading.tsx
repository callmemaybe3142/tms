export default function Loading() {
  return (
    <div className="w-full min-h-[60vh] bg-[#FAF7F0] flex flex-col items-center justify-center animate-in fade-in duration-500">
      <div className="relative w-16 h-16">
        {/* Track */}
        <div className="absolute inset-0 rounded-full border-4 border-[#1B5954]/10" />
        {/* Spinner */}
        <div className="absolute inset-0 rounded-full border-4 border-[#C9A84C] border-t-transparent animate-spin" />
        {/* Core Dot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#1B5954] rounded-full animate-pulse" />
      </div>
      <p className="mt-6 text-[#1B5954] font-bold text-xs tracking-[0.2em] uppercase animate-pulse">
        Loading...
      </p>
    </div>
  )
}
