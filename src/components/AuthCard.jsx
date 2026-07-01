function AuthCard({ children }) {
  return (
    <div className='min-h-screen bg-[#f5f5f3] flex items-center justify-center'>
      <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-sm'>
        <div className='flex items-center gap-3 mb-6'>
          <div className='w-9 h-9 bg-[#3d7a52] rounded-xl flex items-center justify-center text-white'>
            📅
          </div>
          <div>
            <p className='font-semibold text-[#1a1a18]'>Sandim Jardinagem</p>
            <p className='text-xs text-gray-400'>Gestão de agendamentos</p>
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}

export default AuthCard
