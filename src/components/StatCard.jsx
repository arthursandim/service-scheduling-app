function StatCard({ label, value, suffix, variant = 'default' }) {
  const isGreen = variant === 'green'
  return (
    <div className={`border rounded-xl p-5 ${isGreen ? 'bg-[#edf5f0] border-[#c8dfd0]' : 'bg-white border-gray-200'}`}>
      <p className={`text-xs uppercase tracking-wide mb-2 ${isGreen ? 'text-[#7ab890]' : 'text-gray-400'}`}>{label}</p>
      <p className={`text-3xl font-bold ${isGreen ? 'text-[#3d7a52]' : 'text-[#1a1a18]'}`}>{value}</p>
      <p className={`text-sm mt-1 ${isGreen ? 'text-[#7ab890]' : 'text-gray-400'}`}>{suffix}</p>
    </div>
  )
}

export default StatCard
