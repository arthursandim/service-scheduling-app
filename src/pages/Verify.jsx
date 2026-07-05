import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthCard from '../components/AuthCard'
import FormInput from '../components/FormInput'

function Verify() {
  const [codigo, setCodigo] = useState('')
  const [erro, setErro] = useState('')
  const [mensagem, setMensagem] = useState('')
  const navigate = useNavigate()

  const params = new URLSearchParams(window.location.search)
  const email = params.get('email')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErro('')
    if (!codigo) {
      setErro('Digite o código de verificação.')
      return
    }
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/verify/${codigo}`)
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Código inválido')
      localStorage.setItem('token', data.token)
      localStorage.setItem('userName', data.name)
      navigate('/dashboard')
    } catch (err) {
      setErro(err.message)
    }
  }

  const handleResend = async () => {
    setErro('')
    setMensagem('')
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/resend-verification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Erro ao reenviar')
      setMensagem('Novo código enviado para o seu email.')
    } catch (err) {
      setErro(err.message)
    }
  }

  return (
    <AuthCard>
      <h1 className='text-xl font-bold text-[#1a1a18] mb-1'>Confirme sua conta</h1>
      <p className='text-sm text-gray-400 mb-6'>
        Digite o código de 6 dígitos enviado para <span className='font-medium text-[#1a1a18]'>{email}</span>
      </p>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <FormInput
          label='Código de verificação'
          placeholder='000000'
          maxLength={6}
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          className='tracking-widest text-center text-lg'
          testId='verify-code-input'
        />

        {erro && <p className='text-sm text-red-500' data-testid='error-message'>{erro}</p>}
        {mensagem && <p className='text-sm text-green-600' data-testid='success-message'>{mensagem}</p>}

        <button
          type='submit'
          data-testid='verify-button'
          className='bg-[#3d7a52] text-white rounded-lg py-2 text-sm font-medium hover:bg-[#336644] transition-colors'
        >
          Confirmar
        </button>
      </form>

      <p className='text-sm text-center text-gray-400 mt-4'>
        Não recebeu o código?{' '}
        <button onClick={handleResend} className='text-[#3d7a52] font-medium cursor-pointer'>Reenviar</button>
      </p>

      <p className='text-sm text-center text-gray-400 mt-2'>
        <a href='/login' className='text-[#3d7a52] font-medium'>Voltar para o login</a>
      </p>
    </AuthCard>
  )
}

export default Verify
