import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthCard from '../components/AuthCard'
import FormInput from '../components/FormInput'

function Register() {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [erro, setErro] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErro('')
        if (!nome.trim()) { setErro('O nome é obrigatório.'); return }
        if (!email.trim()) { setErro('O e-mail é obrigatório.'); return }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setErro('Digite um e-mail válido.'); return }
        if (!senha) { setErro('A senha é obrigatória.'); return }
        if (senha.length < 8) { setErro('A senha deve ter pelo menos 8 caracteres.'); return }
        setLoading(true)
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: nome, email, password: senha })
            })
            const data = await response.json()
            if (!response.ok) throw new Error(data.message || 'Erro ao criar conta')
            navigate('/verificar?email=' + email)
        } catch (err) {
            setErro(err.message)
            setLoading(false)
        }
    }

    return (
        <AuthCard>
            <h1 className='text-xl font-bold text-[#1a1a18] mb-1'>Criar conta</h1>
            <p className='text-sm text-gray-400 mb-6'>Preencha os dados para criar sua conta</p>

            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <FormInput
                    label='Nome'
                    placeholder='Seu nome'
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    testId='name-input'
                />
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
                    disabled={loading}
                    data-testid='register-button'
                    className='bg-[#3d7a52] text-white rounded-lg py-2 text-sm font-medium hover:bg-[#336644] transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                >
                    {loading ? 'Criando...' : 'Criar conta'}
                </button>
            </form>

            <p className='text-sm text-center text-gray-400 mt-4'>
                Já tem conta?{' '}
                <a href='/login' className='text-[#3d7a52] font-medium'>Entrar</a>
            </p>
        </AuthCard>
    )
}

export default Register
