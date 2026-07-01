import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AppointmentDetails from './pages/AppointmentDetails';
import Register from './pages/Register'
import Verify from './pages/Verify'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/agendamentos/:id' element={<AppointmentDetails />} />
        <Route path='/registro' element={<Register />} />
        <Route path='/verificar' element={<Verify />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
