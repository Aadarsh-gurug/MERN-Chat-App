import './App.css'
import AuthProvider from './context/AuthProvider'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Register from './pages/Register'
import Login from './pages/Login'
import { Toaster } from 'react-hot-toast'
import PrivateRoutes from './components/PrivateRoutes'

const App = () => {
  return (
    <AuthProvider>
      <Navbar />
      <Toaster />
      <Routes>
        <Route path='/' element={<PrivateRoutes><Home /></PrivateRoutes>} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </AuthProvider>
  )
}

export default App