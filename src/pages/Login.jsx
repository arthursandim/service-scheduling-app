import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErro('')
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: senha })
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Erro ao entrar')
      localStorage.setItem('token', data.token)
      localStorage.setItem('userName', data.name)
      navigate('/dashboard')
    } catch (err) {
      setErro(err.message)
    }
  }

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

        <h1 className='text-xl font-bold text-[#1a1a18] mb-1'>Bem-vindo</h1>
        <p className='text-sm text-gray-400 mb-6'>Entre na sua conta para gerenciar seus atendimentos</p>

        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <div className='flex flex-col gap-1'>
            <label className='text-sm text-gray-500'>E-mail</label>
            <input
              type='email'
              placeholder='seu@email.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#3d7a52]'
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label className='text-sm text-gray-500'>Senha</label>
            <input
              type='password'
              placeholder='••••••••'
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className='border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#3d7a52]'
            />
          </div>

          {erro && <p className='text-sm text-red-500'>{erro}</p>}

          <button
            type='submit'
            className='bg-[#3d7a52] text-white rounded-lg py-2 text-sm font-medium hover:bg-[#336644] transition-colors'
          >
            Entrar
          </button>
        </form>

        <p className='text-sm text-center text-gray-400 mt-4'>
          Não tem conta?{' '}
          <a href='/registro' className='text-[#3d7a52] font-medium'>Criar conta</a>
        </p>
      </div>
    </div>
  )
}

export default Login
