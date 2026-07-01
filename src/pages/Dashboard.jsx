import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import StatusBadge from '../components/StatusBadge'
import StatCard from '../components/StatCard'

function Dashboard() {
  const [appointments, setAppointments] = useState([])
  const [erro, setErro] = useState('')
  const [view, setView] = useState(window.innerWidth < 640 ? 'grid' : 'table')
  const navigate = useNavigate()
  const userName = localStorage.getItem('userName') || 'Profissional'

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setView('grid')
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await fetch(`${import.meta.env.VITE_API_URL}/appointments`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        if (!response.ok) throw new Error('Não foi possível carregar os agendamentos.')
        const data = await response.json()
        setAppointments(data)
      } catch (err) {
        setErro(err.message)
      }
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

        {erro && (
          <div className='bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-6'>
            {erro}
          </div>
        )}

        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6'>
          <StatCard label='Total' value={total} suffix='agendamentos' />
          <StatCard label='Hoje' value={hoje} suffix='atendimentos' />
          <StatCard label='Pendentes' value={pendentes} suffix='para realizar' variant='green' />
        </div>

        <div className='bg-white border border-gray-200 rounded-xl'>
          <div className='px-6 py-4 border-b border-gray-100 flex items-center justify-between'>
            <h2 className='text-sm font-medium text-gray-600'>Lista de agendamentos</h2>
            <div className='flex gap-1'>
              <button
                onClick={() => setView('table')}
                className={`p-1.5 rounded-md transition-colors ${view === 'table' ? 'bg-gray-100 text-[#1a1a18]' : 'text-gray-400 hover:text-gray-600'}`}
                title='Visualização em tabela'
              >
                <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' viewBox='0 0 16 16'>
                  <path d='M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm15 2h-4v3h4zm0 4h-4v3h4zm0 4h-4v3h3a1 1 0 0 0 1-1zm-5 3v-3H6v3zm-5 0v-3H1v2a1 1 0 0 0 1 1zm-4-4h4V8H1zm0-4h4V4H1zm5-3v3h4V4zm4 4H6v3h4z'/>
                </svg>
              </button>
              <button
                onClick={() => setView('grid')}
                className={`p-1.5 rounded-md transition-colors ${view === 'grid' ? 'bg-gray-100 text-[#1a1a18]' : 'text-gray-400 hover:text-gray-600'}`}
                title='Visualização em grade'
              >
                <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' viewBox='0 0 16 16'>
                  <path d='M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5zm8 0A1.5 1.5 0 0 1 10.5 9h3A1.5 1.5 0 0 1 15 10.5v3A1.5 1.5 0 0 1 13.5 15h-3A1.5 1.5 0 0 1 9 13.5z'/>
                </svg>
              </button>
            </div>
          </div>

          {view === 'table' ? (
            <div className='overflow-x-auto'>
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
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6'>
              {appointments.map(a => {
                const data = new Date(a.dateTime).toLocaleString('pt-BR', {
                  day: '2-digit', month: '2-digit', year: 'numeric',
                  hour: '2-digit', minute: '2-digit'
                }).replace(',', ' às')
                return (
                  <div key={a._id} className='border border-gray-200 rounded-xl p-4 flex flex-col gap-3'>
                    <div className='flex items-start justify-between'>
                      <p className='text-sm font-medium text-[#1a1a18]'>{a.customer?.name}</p>
                      <StatusBadge status={a.status} />
                    </div>
                    <div>
                      <p className='text-xs text-gray-400'>Serviço</p>
                      <p className='text-sm text-gray-600'>{a.serviceType}</p>
                    </div>
                    <div>
                      <p className='text-xs text-gray-400'>Data e hora</p>
                      <p className='text-sm text-gray-600'>{data}</p>
                    </div>
                    <button
                      onClick={() => navigate(`/agendamentos/${a._id}`)}
                      className='mt-auto text-sm px-3 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 w-full'
                    >
                      Ver detalhes
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
