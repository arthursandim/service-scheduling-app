import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import StatusBadge from '../components/StatusBadge'
import StatCard from '../components/StatCard'

function Dashboard() {
  const [appointments, setAppointments] = useState([])
  const navigate = useNavigate()
  const userName = localStorage.getItem('userName') || 'Profissional'

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = localStorage.getItem('token')
      const response = await fetch(`${import.meta.env.VITE_API_URL}/appointments`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await response.json()
      setAppointments(data)
    }
    fetchAppointments()
  }, [])

  const total = appointments.length
  const hoje = appointments.filter(a => {
    const data = new Date(a.dateTime)
    const agora = new Date()
    return data.toDateString() === agora.toDateString()
  }).length
  const pendentes = appointments.filter(a => a.status === 'scheduled').length

  return (
    <div className='min-h-screen bg-[#f5f5f3]'>
      <Header userName={userName} />
      <div className='max-w-5xl mx-auto px-6 py-8'>
        <h1 className='text-2xl font-bold text-[#1a1a18]'>Agendamentos</h1>
        <p className='text-sm text-gray-400 mb-6'>Seus atendimentos de serviços de jardinagem</p>

        <div className='grid grid-cols-3 gap-4 mb-6'>
          <StatCard label='Total' value={total} suffix='agendamentos' />
          <StatCard label='Hoje' value={hoje} suffix='atendimentos' />
          <StatCard label='Pendentes' value={pendentes} suffix='para realizar' variant='green' />
        </div>

        <div className='bg-white border border-gray-200 rounded-xl'>
          <div className='px-6 py-4 border-b border-gray-100'>
            <h2 className='text-sm font-medium text-gray-600'>Lista de agendamentos</h2>
          </div>
          <table className='w-full'>
            <thead>
              <tr className='text-xs text-gray-400 uppercase tracking-wide'>
                <th className='text-left px-6 py-3'>Cliente</th>
                <th className='text-left px-6 py-3'>Serviço</th>
                <th className='text-left px-6 py-3'>Data e Hora</th>
                <th className='text-left px-6 py-3'>Status</th>
                <th className='px-6 py-3'></th>
              </tr>
            </thead>
            <tbody>
              {appointments.map(a => {
                const data = new Date(a.dateTime).toLocaleString('pt-BR', {
                  day: '2-digit', month: '2-digit', year: 'numeric',
                  hour: '2-digit', minute: '2-digit'
                }).replace(',', ' às')
                return (
                  <tr key={a._id} className='border-t border-gray-100'>
                    <td className='px-6 py-4 text-sm font-medium text-[#1a1a18]'>{a.customer?.name}</td>
                    <td className='px-6 py-4 text-sm text-gray-500'>{a.serviceType}</td>
                    <td className='px-6 py-4 text-sm text-gray-500'>{data}</td>
                    <td className='px-6 py-4'>
                      <StatusBadge status={a.status} />
                    </td>
                    <td className='px-6 py-4 text-right'>
                      <button
                        onClick={() => navigate(`/agendamentos/${a._id}`)}
                        className='text-sm px-3 py-1 border border-gray-200 rounded-md text-gray-600 hover:bg-gray-50'
                      >
                        Ver detalhes
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
