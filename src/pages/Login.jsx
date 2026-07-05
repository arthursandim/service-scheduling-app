import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthCard from '../components/AuthCard'
import FormInput from '../components/FormInput'

function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErro('')
    if (!email.trim()) { setErro('O e-mail é obrigatório.'); return }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setErro('Digite um e-mail válido.'); return }
    if (!senha) { setErro('A senha é obrigatória.'); return }
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
    <AuthCard>
      <h1 className='text-xl font-bold text-[#1a1a18] mb-1'>Bem-vindo</h1>
      <p className='text-sm text-gray-400 mb-6'>Entre na sua conta para gerenciar seus atendimentos</p>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <FormInput
          label='E-mail'
          type='email'
          placeholder='seu@email.com'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          testId='email-input'
        />
        <FormInput
          label='Senha'
          type='password'
          placeholder='••••••••'
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          testId='password-input'
        />

        {erro && <p className='text-sm text-red-500' data-testid='error-message'>{erro}</p>}

        <button
          type='submit'
          data-testid='login-button'
          className='bg-[#3d7a52] text-white rounded-lg py-2 text-sm font-medium hover:bg-[#336644] transition-colors'
        >
          Entrar
        </button>
      </form>

      <p className='text-sm text-center text-gray-400 mt-4'>
        Não tem conta?{' '}
        <a href='/registro' className='text-[#3d7a52] font-medium'>Criar conta</a>
      </p>
    </AuthCard>
  )
}

export default Login
