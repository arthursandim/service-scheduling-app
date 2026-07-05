const statusConfig = {
  scheduled: { label: 'Agendado', dot: 'bg-[#3d7a52]', badge: 'bg-[#edf5f0] text-[#3d7a52]' },
  completed: { label: 'Concluído', dot: 'bg-gray-400', badge: 'bg-gray-100 text-gray-500' },
  cancelled: { label: 'Cancelado', dot: 'bg-red-400', badge: 'bg-red-50 text-red-500' },
}

function StatusBadge({ status }) {
  const config = statusConfig[status] || statusConfig.scheduled
  return (
    <span data-testid='status-badge' className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${config.badge}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`}></span>
      {config.label}
    </span>
  )
}

export default StatusBadge
