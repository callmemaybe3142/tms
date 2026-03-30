export default function AdminLoading() {
  return (
    <div className="w-full min-h-[50vh] bg-white flex flex-col items-center justify-center animate-in fade-in duration-300">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-4 border-[#1B5954]/10" />
        <div className="absolute inset-0 rounded-full border-4 border-[#1B5954] border-t-transparent animate-spin" />
      </div>
      <p className="mt-4 text-[#1B5954] font-medium text-xs tracking-widest uppercase">
        Loading...
      </p>
    </div>
  )
}
