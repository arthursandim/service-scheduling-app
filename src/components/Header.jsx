import { useNavigate } from 'react-router-dom'

function Header({ userName }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <header className='bg-white border-b border-gray-200'>
      <div className='max-w-5xl mx-auto px-6 py-4 flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div className='w-8 h-8 bg-[#3d7a52] rounded-lg flex items-center justify-center text-white text-sm'>
            📅
          </div>
          <span className='font-semibold text-[#1a1a18]'>Sandim Jardinagem</span>
        </div>
        <div className='flex items-center gap-4'>
          <span className='text-sm text-gray-500'>
            Olá, <span className='font-semibold text-[#1a1a18]'>{userName}</span>
          </span>
          <button
            onClick={handleLogout}
            className='text-sm px-3 py-1 border border-gray-200 rounded-md text-gray-600 hover:bg-gray-50'
          >
            Sair
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
