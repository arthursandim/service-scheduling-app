function FormInput({ label, type = 'text', placeholder, value, onChange, maxLength, className = '', testId }) {
  return (
    <div className='flex flex-col gap-1'>
      <label className='text-sm text-gray-500'>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        className={`border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#3d7a52] ${className}`}
        data-testid={testId}
      />
    </div>
  )
}

export default FormInput
