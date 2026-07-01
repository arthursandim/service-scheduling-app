import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../components/Header'
import StatusBadge from '../components/StatusBadge'

function AppointmentDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [appointment, setAppointment] = useState(null)
  const userName = localStorage.getItem('userName') || 'Profissional'

  useEffect(() => {
    const fetchAppointment = async () => {
      const token = localStorage.getItem('token')
      const response = await fetch(`${import.meta.env.VITE_API_URL}/appointments/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await response.json()
      setAppointment(data)
    }
    fetchAppointment()
  }, [id])

  const handleCancel = async () => {
    const token = localStorage.getItem('token')
    await fetch(`${import.meta.env.VITE_API_URL}/appointments/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: 'cancelled' })
    })
    navigate('/dashboard')
  }

  const handleComplete = async () => {
    const token = localStorage.getItem('token')
    await fetch(`${import.meta.env.VITE_API_URL}/appointments/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: 'completed' })
    })
    navigate('/dashboard')
  }

  if (!appointment) return null

  const data = new Date(appointment.dateTime).toLocaleString('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  }).replace(',', ' às')
  const podeAlterar = appointment.status === 'scheduled'

  return (
    <div className='min-h-screen bg-[#f5f5f3]'>
      <Header userName={userName} />
      <div className='max-w-3xl mx-auto px-6 py-8'>
        <button
          onClick={() => navigate('/dashboard')}
          className='text-sm text-gray-400 hover:text-gray-600 mb-6 flex items-center gap-1'
        >
          ‹ Voltar para agendamentos
        </button>

        <div className='flex items-start justify-between mb-6'>
          <div>
            <h1 className='text-2xl font-bold text-[#1a1a18]'>Detalhes do agendamento</h1>
            <p className='text-sm text-gray-400'>{appointment.serviceType}</p>
          </div>
          <StatusBadge status={appointment.status} />
        </div>

        <div className='bg-white border border-gray-200 rounded-xl p-6 mb-4'>
          <p className='text-xs text-gray-400 uppercase tracking-wide mb-4'>Informações do cliente</p>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4'>
            <div>
              <p className='text-xs text-gray-400 mb-1'>Nome</p>
              <p className='text-sm font-medium text-[#1a1a18]'>{appointment.customer?.name}</p>
            </div>
            <div>
              <p className='text-xs text-gray-400 mb-1'>Telefone</p>
              <p className='text-sm font-medium text-[#3d7a52]'>{appointment.customer?.phone}</p>
            </div>
          </div>
          <div>
            <p className='text-xs text-gray-400 mb-1'>Endereço</p>
            <p className='text-sm font-medium text-[#1a1a18]'>{appointment.customer?.address}</p>
          </div>

          <hr className='my-4 border-gray-100' />

          <p className='text-xs text-gray-400 uppercase tracking-wide mb-4'>Detalhes do serviço</p>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <div>
              <p className='text-xs text-gray-400 mb-1'>Tipo de serviço</p>
              <p className='text-sm font-medium text-[#1a1a18]'>{appointment.serviceType}</p>
            </div>
            <div>
              <p className='text-xs text-gray-400 mb-1'>Data e hora</p>
              <p className='text-sm font-medium text-[#1a1a18]'>{data}</p>
            </div>
          </div>
        </div>

        {podeAlterar ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
            <button
              onClick={handleCancel}
              className='py-3 rounded-xl border border-red-200 text-red-500 text-sm font-medium hover:bg-red-50'
            >
              Cancelar agendamento
            </button>
            <button
              onClick={handleComplete}
              className='py-3 rounded-xl bg-[#3d7a52] text-white text-sm font-medium hover:bg-[#336644]'
            >
              Marcar como concluído
            </button>
          </div>
        ) : (
          <div className='bg-white border border-gray-200 rounded-xl p-4 text-center'>
            <p className='text-sm text-gray-400'>Este agendamento não pode mais ser alterado.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AppointmentDetails
