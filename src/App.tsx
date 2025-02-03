import '@/styles/app.css'
import LogInForm from './components/LogInForm'
import RegistrationForm from './components/RegistrationForm'
import Profile from './components/Profile'
import { useAuth } from '@/context/AuthContext'

function App() {
  const { user } = useAuth();

  return (
    <div className='w-screen bg-gray-700 h-[85vh] flex justify-center items-center'>
      {user ? <Profile /> : (
        <div className="space-y-6">
          <RegistrationForm />
          <LogInForm />
        </div>
      )}
    </div>
  )
}

export default App
